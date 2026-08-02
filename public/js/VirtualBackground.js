'use strict';

const SEGMENTATION_INPUT_SIZE = 256; // Smaller resolution for MediaPipe input

class VirtualBackground {
    static instance = null;

    constructor() {
        // Ensure only one instance of VirtualBackground exists
        if (VirtualBackground.instance) {
            return VirtualBackground.instance;
        }
        VirtualBackground.instance = this;

        // Check for API support
        this.isSupported = this.checkSupport();
        if (!this.isSupported) {
            console.warn(
                '⚠️ MediaStreamTrackProcessor, MediaStreamTrackGenerator, or TransformStream is not supported in this environment.'
            );
        }

        this.resetState();
    }

    checkSupport() {
        // Check if required APIs are supported
        return Boolean(window.MediaStreamTrackProcessor && window.MediaStreamTrackGenerator && window.TransformStream);
    }

    resetState() {
        // Reset all necessary state variables
        this.segmentation = null;
        this.initialized = false;
        this.pendingFrames = [];
        this.activeProcessor = null;
        this.activeGenerator = null;
        this.isProcessing = false;
        this.gifAnimation = null;
        this.gifCanvas = null;
        this.frameCounter = 0;
        // Calculate adaptive frameSkipRatio based on device capability
        this.frameSkipRatio = this._determineFrameSkipRatio();
        this.lastSegmentationMask = null;
        this.scalingCanvas = null; // New line for reusable canvas
        this.scalingCtx = null;    // New line for reusable context
        this.mainCanvas = null;
        this.mainCtx = null;
        this.maskCanvas = null;
        this.maskCtx = null;
    }

    async initializeSegmentation() {
        // Initialize the segmentation model if not already done
        if (this.initialized) {
            console.log('✅ Segmentation already initialized');
            return;
        }

        try {
            this.segmentation = new SelfieSegmentation({
                locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
            });

            const cores = navigator.hardwareConcurrency || 4;
            const deviceMemory = navigator.deviceMemory || 2;
            const modelSelection = (cores >= 8 && deviceMemory >= 8) ? 1 : 0;

            this.segmentation.setOptions({
                modelSelection, // Dynamic based on device capability (1 for high-end, 0 for light/fast)
                runningMode: 'video', // Smoother segmentation for streaming
                smoothSegmentation: true, // Enables smoother edges
            });

            this.segmentation.onResults(this.handleSegmentationResults.bind(this));

            await this.segmentation.initialize();
            this.initialized = true;
            console.log('✅ Segmentation initialized successfully with modelSelection:', modelSelection);
        } catch (error) {
            console.error('❌ Error initializing segmentation:', error);
            throw error;
        }
    }

    handleSegmentationResults(results) {
        if (!results?.segmentationMask) return;

        this.lastSegmentationMask = results.segmentationMask;

        const pendingFrame = this.pendingFrames.shift();

        if (!pendingFrame) return;

        this.processFrame(
            pendingFrame.videoFrame,
            pendingFrame.controller,
            pendingFrame.imageBitmap,
            pendingFrame.maskHandler,
            this.lastSegmentationMask
        );
    }

    processFrame(videoFrame, controller, imageBitmap, maskHandler, segmentationMask) {
        if (!controller) {
            console.warn('Controller invalid, closing frames');
            this.closeFrames(videoFrame, imageBitmap);
            return;
        }

        try {
            const width = videoFrame.displayWidth;
            const height = videoFrame.displayHeight;

            if (!this.mainCanvas || this.mainCanvas.width !== width || this.mainCanvas.height !== height) {
                this.mainCanvas = new OffscreenCanvas(width, height);
                this.mainCtx = this.mainCanvas.getContext('2d');
            }

            this.mainCtx.clearRect(0, 0, width, height);

            // Apply original frame
            this.mainCtx.drawImage(imageBitmap, 0, 0, width, height);

            // Apply mask processing
            maskHandler(this.mainCtx, this.mainCanvas, segmentationMask, imageBitmap);

            // Create new video frame with the processed content
            const processedFrame = new VideoFrame(this.mainCanvas, {
                timestamp: videoFrame.timestamp,
                alpha: 'keep', // Ensure transparency is preserved
            });

            try {
                // Enqueue the processed frame to continue the stream
                controller.enqueue(processedFrame);
            } catch (enqueueError) {
                console.warn('Failed to enqueue frame', enqueueError);
                // Close the processed frame if enqueue fails
                if (!processedFrame.closed) {
                    processedFrame.close();
                }
            }
        } catch (error) {
            console.error('❌ Frame processing error:', error);
        } finally {
            // Close frames after processing to release resources
            this.closeFrames(videoFrame, imageBitmap);
        }
    }

    /**
     * @private
     * @param {VideoFrame} videoFrame - The video frame to close.
     * @param {ImageBitmap} imageBitmap - The image bitmap to close.
     * @param {ImageBitmap} [scaledImageBitmap=null] - The scaled image bitmap to close (optional).
     * @description Closes video frames and image bitmaps to release resources.
     */
    closeFrames(videoFrame, imageBitmap, scaledImageBitmap = null) {
        if (videoFrame && !videoFrame.closed) {
            videoFrame.close();
        }
        if (imageBitmap && !imageBitmap.closed) {
            imageBitmap.close();
        }
        if (scaledImageBitmap && !scaledImageBitmap.closed) {
            scaledImageBitmap.close();
        }
    }

    /**
     * @private
     * @returns {number} The determined frame skip ratio based on device capabilities.
     * @description Dynamically sets the frameSkipRatio to adapt performance based on CPU cores and device memory.
     */
    _determineFrameSkipRatio() {
        const cores = navigator.hardwareConcurrency || 4; // Default to 4 cores
        const deviceMemory = navigator.deviceMemory || 2; // Default to 2 GB RAM

        let skipRatio = 2; // Default for mid-range

        if (cores >= 8 && deviceMemory >= 8) {
            skipRatio = 1; // High-end device: process every frame
            console.log('Detected high-end device (cores:', cores, 'memory:', deviceMemory, 'GB). Setting frameSkipRatio to', skipRatio);
        } else if (cores >= 4 && deviceMemory >= 4) {
            skipRatio = 2; // Mid-range device: skip every other frame
            console.log('Detected mid-range device (cores:', cores, 'memory:', deviceMemory, 'GB). Setting frameSkipRatio to', skipRatio);
        } else {
            skipRatio = 3; // Low-end device: skip two out of three frames
            console.warn('Detected low-end device (cores:', cores, 'memory:', deviceMemory, 'GB). Setting frameSkipRatio to', skipRatio);
        }

        return skipRatio;
    }

    async processStreamWithSegmentation(videoTrack, maskHandler) {
        // Check if the required APIs are supported
        if (!this.isSupported) {
            throw new Error(
                'MediaStreamTrackProcessor, MediaStreamTrackGenerator, or TransformStream is not supported in this environment.'
            );
        }

        // Stop current processing before starting new one
        await this.stopCurrentProcessor();

        // Initialize segmentation if not already done
        await this.initializeSegmentation();

        // Create new processor and generator for stream transformation
        const processor = new MediaStreamTrackProcessor({ track: videoTrack });
        const generator = new MediaStreamTrackGenerator({ kind: 'video' });

        const transformer = new TransformStream({
            transform: async (videoFrame, controller) => {
                // Recommendation: Removed TASK 3 throttle completely as per feedback.
                // Task 1 (downscaling with reusable canvas) and Task 2 (adaptive skip ratio) 
                // provide sufficient CPU reduction without risking visual background flashes.

                if (!this.segmentation || !this.initialized) {
                    console.warn('⚠️ Segmentation is not initialized, skipping frame.');
                    this.closeFrames(videoFrame);
                    return;
                }

                let imageBitmap = null;
                let scaledImageBitmap = null;

                try {
                    // Create image bitmap from video frame (full resolution)
                    imageBitmap = await createImageBitmap(videoFrame);

                    if (!imageBitmap) {
                        console.warn('⚠️ Failed to create imageBitmap, skipping frame.');
                        this.closeFrames(videoFrame);
                        return;
                    }

                    // TASK 1: Downscale for segmentation model input using reusable OffscreenCanvas
                    if (!this.scalingCanvas) {
                        this.scalingCanvas = new OffscreenCanvas(SEGMENTATION_INPUT_SIZE, SEGMENTATION_INPUT_SIZE);
                        this.scalingCtx = this.scalingCanvas.getContext('2d');
                    }

                    const aspectRatio = imageBitmap.width / imageBitmap.height;
                    let currentScaledWidth = SEGMENTATION_INPUT_SIZE;
                    let currentScaledHeight = SEGMENTATION_INPUT_SIZE;

                    if (imageBitmap.width > imageBitmap.height) {
                        currentScaledHeight = SEGMENTATION_INPUT_SIZE / aspectRatio;
                    } else {
                        currentScaledWidth = SEGMENTATION_INPUT_SIZE * aspectRatio;
                    }

                    if (this.scalingCanvas.width !== currentScaledWidth || this.scalingCanvas.height !== currentScaledHeight) {
                        this.scalingCanvas.width = currentScaledWidth;
                        this.scalingCanvas.height = currentScaledHeight;
                    }

                    this.scalingCtx.clearRect(0, 0, currentScaledWidth, currentScaledHeight);
                    this.scalingCtx.drawImage(imageBitmap, 0, 0, currentScaledWidth, currentScaledHeight);
                    scaledImageBitmap = await createImageBitmap(this.scalingCanvas);

                    if (this.frameCounter % this.frameSkipRatio === 0) {
                        // Process only every Nth frame (adaptive CPU load reduction)
                        this.pendingFrames.push({
                            videoFrame,
                            controller,
                            imageBitmap, // Original full-res image for rendering
                            maskHandler,
                        });

                        // Send the SCALED image to the segmentation model
                        await this.segmentation.send({ image: scaledImageBitmap });
                    } else if (this.lastSegmentationMask) {
                        // Use last segmentation mask for skipped frames with original imageBitmap
                        this.processFrame(videoFrame, controller, imageBitmap, maskHandler, this.lastSegmentationMask);
                    } else {
                        // If no previous mask, just enqueue the original frame
                        controller.enqueue(videoFrame);
                    }

                    this.frameCounter++; // Increment frame counter
                } catch (error) {
                    console.error('❌ Frame transformation error:', error);
                    this.closeFrames(videoFrame, imageBitmap, scaledImageBitmap);
                } finally {
                    if (scaledImageBitmap && !scaledImageBitmap.closed) {
                        scaledImageBitmap.close();
                    }
                }
            },
            flush: () => {
                // Clean up any pending frames when the stream ends
                console.log('Transform stream flushing...');
                this.cleanPendingFrames();
            },
        });

        // Store active streams
        this.activeProcessor = processor;
        this.activeGenerator = generator;
        this.isProcessing = true;

        try {
            // Pipeline error handling without recursive calls
            const pipelinePromise = processor.readable.pipeThrough(transformer).pipeTo(generator.writable);

            // Handle errors without awaiting (prevents blocking and recursion)
            pipelinePromise.catch(() => {
                // Only stop if we're still processing (avoid recursive calls)
                if (this.isProcessing && this.activeProcessor) {
                    console.log('Stopping processor due to pipeline error...');
                    // Don't await this - let it run async to avoid recursion
                    this.stopCurrentProcessor().catch((stopError) => {
                        console.warn('Error during processor cleanup:', stopError);
                    });
                }
            });

            return new MediaStream([generator]);
        } catch (error) {
            console.error('Error setting up processing pipeline', error);
            await this.stopCurrentProcessor();
            throw error;
        }
    }

    cleanPendingFrames() {
        // Close all pending frames to release resources
        while (this.pendingFrames.length) {
            const { videoFrame, imageBitmap } = this.pendingFrames.pop();
            this.closeFrames(videoFrame, imageBitmap);
        }
        this.pendingFrames = [];
        console.log('✅ Cleaned pending frames');
    }

    async stopCurrentProcessor() {
        if (!this.activeProcessor) {
            console.warn('⚠️ No active processing to stop');
            return;
        }

        this.isProcessing = false;
        this.cleanPendingFrames();

        try {
            // Abort the writable stream if it's not locked
            if (this.activeGenerator?.writable && !this.activeGenerator.writable.locked) {
                await this.activeGenerator.writable.abort('Processing stopped');
            }

            // Cancel the readable stream if it's not locked
            if (this.activeProcessor?.readable && !this.activeProcessor.readable.locked) {
                await this.activeProcessor.readable.cancel('Processing stopped');
            }

            console.log('✅ Processor successfully stopped');
        } catch (error) {
            console.error('❌ Processor shutdown error', error);
        } finally {
            // Reset active processor and generator
            this.activeProcessor = null;
            this.activeGenerator = null;
        }
    }

    async applyBlurToWebRTCStream(videoTrack, blurLevel = 10) {
        // Check if the required APIs are supported
        if (!this.isSupported) {
            throw new Error(
                'MediaStreamTrackProcessor, MediaStreamTrackGenerator, or TransformStream is not supported in this environment.'
            );
        }

        // Handler for applying blur effect to the background
        const maskHandler = (ctx, canvas, mask, imageBitmap) => {
            // Keep only the person using the segmentation mask
            ctx.save();
            ctx.globalCompositeOperation = 'destination-in';
            ctx.drawImage(mask, 0, 0, canvas.width, canvas.height);
            ctx.restore();

            // Apply blur to background and draw image behind the person
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.filter = `blur(${blurLevel}px)`;
            ctx.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);
            ctx.restore();
        };

        console.log('✅ Apply Blur.');
        return this.processStreamWithSegmentation(videoTrack, maskHandler);
    }

    async applyVirtualBackgroundToWebRTCStream(videoTrack, imageUrl) {
        // Check if the required APIs are supported
        if (!this.isSupported) {
            throw new Error(
                'MediaStreamTrackProcessor, MediaStreamTrackGenerator, or TransformStream is not supported in this environment.'
            );
        }

        // Determine if the background is a GIF
        const isGif = imageUrl.endsWith('.gif') || imageUrl.startsWith('data:image/gif');
        const background = isGif ? await this.loadGifImage(imageUrl) : await this.loadImage(imageUrl);

        // Handler for applying virtual background
        const maskHandler = (ctx, canvas, mask, imageBitmap) => {
            const width = canvas.width;
            const height = canvas.height;
            if (!this.maskCanvas || this.maskCanvas.width !== width || this.maskCanvas.height !== height) {
                this.maskCanvas = new OffscreenCanvas(width, height);
                this.maskCtx = this.maskCanvas.getContext('2d');
            }

            this.maskCtx.clearRect(0, 0, width, height);
            // Apply slight blur to mask to smooth edges
            this.maskCtx.filter = 'blur(5px)'; // Adjust to control softness
            this.maskCtx.drawImage(mask, 0, 0, width, height);
            this.maskCtx.filter = 'none';

            // Apply the softened mask
            ctx.globalCompositeOperation = 'destination-in';
            ctx.drawImage(this.maskCanvas, 0, 0, width, height);

            // Draw background behind the person
            ctx.globalCompositeOperation = 'destination-over';
            ctx.drawImage(background, 0, 0, width, height);
        };

        console.log('✅ Apply Virtual Background.');
        return this.processStreamWithSegmentation(videoTrack, maskHandler);
    }

    async applyTransparentVirtualBackgroundToWebRTCStream(videoTrack) {
        // Check if the required APIs are supported
        if (!this.isSupported) {
            throw new Error(
                'MediaStreamTrackProcessor, MediaStreamTrackGenerator, or TransformStream is not supported in this environment.'
            );
        }

        // Handler for applying transparency by using only the mask
        const maskHandler = (ctx, canvas, mask, imageBitmap) => {
            const width = canvas.width;
            const height = canvas.height;
            // Clear the canvas (ensures transparency)
            ctx.clearRect(0, 0, width, height);

            // Draw the original frame (so we start with the full image)
            ctx.drawImage(imageBitmap, 0, 0, width, height);

            if (!this.maskCanvas || this.maskCanvas.width !== width || this.maskCanvas.height !== height) {
                this.maskCanvas = new OffscreenCanvas(width, height);
                this.maskCtx = this.maskCanvas.getContext('2d');
            }

            this.maskCtx.clearRect(0, 0, width, height);
            // Blur the mask slightly for softer edges
            this.maskCtx.filter = 'blur(5px)';
            this.maskCtx.drawImage(mask, 0, 0, width, height);
            this.maskCtx.filter = 'none';

            // Apply the mask to keep only the person
            ctx.globalCompositeOperation = 'destination-in';
            ctx.drawImage(this.maskCanvas, 0, 0, width, height);

            // Reset blending mode to normal
            ctx.globalCompositeOperation = 'source-over';
        };

        console.log('✅ Apply Transparent Background');
        return this.processStreamWithSegmentation(videoTrack, maskHandler);
    }

    async loadImage(src) {
        // Load an image from the provided source URL
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = reject;
        });
    }

    async loadGifImage(src) {
        // Load and animate a GIF using gifler
        return new Promise((resolve, reject) => {
            try {
                if (this.gifAnimation) {
                    this.gifAnimation.stop(); // Stop previous animation
                    this.gifAnimation = null;
                }

                if (!this.gifCanvas) {
                    this.gifCanvas = document.createElement('canvas');
                }

                gifler(src).get((animation) => {
                    this.gifAnimation = animation;
                    animation.animateInCanvas(this.gifCanvas); // Start the animation
                    console.log('✅ GIF loaded and animation started.');
                    resolve(this.gifCanvas);
                });
            } catch (error) {
                console.error('❌ Error loading GIF with gifler:', error);
                reject(error);
            }
        });
    }
}
