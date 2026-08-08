'use strict';

/**
 * ScreenShareManager - Screen Share Feature Manager for TeamDekho
 * @license AGPLv3
 */

class ScreenShareManager {
    constructor(roomClient) {
        this.roomClient = roomClient;
    }

    shareScreen() {
        if (!this.roomClient.isMobileDevice && (navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia)) {
            this.roomClient.sound('open');
            Swal.fire({
                background: swalBackground,
                position: 'center',
                icon: 'question',
                text: 'Do you want to share your screen?',
                showDenyButton: true,
                confirmButtonText: `Yes`,
                denyButtonText: `No`,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            }).then((result) => {
                if (result.isConfirmed) {
                    startScreenButton.click();
                    console.log('11 ----> Screen is on');
                } else {
                    console.log('11 ----> Screen is on');
                }
            });
        } else {
            console.log('11 ----> Screen is off');
        }
    }

    async produceScreenAudio(stream) {
        try {
            if (this.roomClient.producerLabel.has(mediaType.audioTab)) {
                return console.warn('Producer already exists for this type ' + mediaType.audioTab);
            }

            const track = stream.getAudioTracks()[0];
            const params = {
                track,
                appData: {
                    mediaType: mediaType.audio,
                },
            };

            const producerSa = await this.roomClient.producerTransport.produce(params);

            console.log('PRODUCER SCREEN AUDIO', producerSa);

            this.roomClient.producers.set(producerSa.id, producerSa);
            this.roomClient.producerLabel.set(mediaType.audioTab, producerSa.id);

            console.log('[produceScreenAudio] - PRODUCER LABEL', this.roomClient.producerLabel);

            await this.roomClient.handleProducer(producerSa.id, mediaType.audio, stream);

            producerSa.on('trackended', () => {
                this.roomClient.closeProducer(mediaType.audioTab, 'trackended');
            });

            producerSa.on('transportclose', () => {
                this.roomClient.closeProducer(mediaType.audioTab, 'transportclose');
            });

            producerSa.on('close', () => {
                this.roomClient.closeProducer(mediaType.audioTab, 'close');
            });
        } catch (err) {
            console.error('Produce Screen Audio error:', err);
        }
    }

    getScreenConstraints() {
        const selectedValue = this.roomClient.getSelectedIndexValue(screenFps);
        const customFrameRate = parseInt(selectedValue, 10);

        const screenResolutionMap = this.roomClient.getResolutionMap();

        const [width, height] = screenResolutionMap[screenQuality.value] || [1920, 1080];

        const videoConstraints = {
            width: { ideal: width },
            height: { ideal: height },
            frameRate: { ideal: customFrameRate || 30 },
        };

        return {
            audio: true,
            video: videoConstraints,
        };
    }

    getScreenEncoding() {
        let encodings;
        let codec;

        console.log('SCREEN ENCODING', {
            forceVP8: this.roomClient.forceVP8,
            forceVP9: this.roomClient.forceVP9,
            forceH264: this.roomClient.forceH264,
            forceAV1: this.roomClient.forceAV1,
            numSimulcastStreamsSharing: this.roomClient.numSimulcastStreamsSharing,
            enableSharingLayers: this.roomClient.enableSharingLayers,
            sharingScalabilityMode: this.roomClient.sharingScalabilityMode,
            rtpCapabilitiesCodecs: this.roomClient.device.rtpCapabilities.codecs,
        });

        if (this.roomClient.forceVP8) {
            codec = this.roomClient.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/vp8');
            if (!codec) throw new Error('Desired VP8 codec+configuration is not supported');
        } else if (this.roomClient.forceH264) {
            codec = this.roomClient.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/h264');
            if (!codec) throw new Error('Desired H264 codec+configuration is not supported');
        } else if (this.roomClient.forceVP9) {
            codec = this.roomClient.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/vp9');
            if (!codec) throw new Error('Desired VP9 codec+configuration is not supported');
        } else if (this.roomClient.forceAV1) {
            codec = this.roomClient.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/av1');
            if (!codec) throw new Error('Desired AV1 codec+configuration is not supported');
        }

        if (this.roomClient.enableSharingLayers) {
            console.log('SCREEN SIMULCAST/SVC ENABLED');

            const firstVideoCodec = this.roomClient.device.rtpCapabilities.codecs.find((c) => c.kind === 'video');
            console.log('SCREEN ENCODING: first codec available', { firstVideoCodec: firstVideoCodec });

            if (
                ((this.roomClient.forceVP9 || this.roomClient.forceAV1) && codec) ||
                (firstVideoCodec?.mimeType &&
                    ['video/vp9', 'video/av1'].includes(firstVideoCodec.mimeType.toLowerCase()))
            ) {
                console.log('SCREEN ENCODING: VP9 or AV1 with SVC');
                encodings = [
                    {
                        maxBitrate: 5000000,
                        scalabilityMode: this.roomClient.sharingScalabilityMode || 'L3T3',
                        dtx: true,
                    },
                ];
            } else {
                console.log('SCREEN ENCODING: VP8 or H264 with simulcast.');
                encodings = [
                    {
                        scaleResolutionDownBy: 1,
                        maxBitrate: 5000000,
                        scalabilityMode: this.roomClient.sharingScalabilityMode || 'L1T3',
                        dtx: true,
                    },
                ];
                if (this.roomClient.numSimulcastStreamsSharing > 1) {
                    encodings.unshift({
                        scaleResolutionDownBy: 2,
                        maxBitrate: 1000000,
                        scalabilityMode: this.roomClient.sharingScalabilityMode || 'L1T3',
                        dtx: true,
                    });
                }
                if (this.roomClient.numSimulcastStreamsSharing > 2) {
                    encodings.unshift({
                        scaleResolutionDownBy: 4,
                        maxBitrate: 500000,
                        scalabilityMode: this.roomClient.sharingScalabilityMode || 'L1T3',
                        dtx: true,
                    });
                }
            }
        } else {
            encodings = [
                {
                    scaleResolutionDownBy: 1,
                    maxBitrate: 5000000,
                    dtx: true,
                },
            ];
        }
        return { encodings, codec };
    }

    setIsScreen(status) {
        if (!isBroadcastingEnabled || (isBroadcastingEnabled && isPresenter)) {
            this.roomClient.peer_info.peer_screen = status;
            if (!this.roomClient.peer_info.peer_screen && !this.roomClient.peer_info.peer_video) {
                console.log('Set local screen enabled: ' + status);
                this.roomClient.setVideoOff(this.roomClient.peer_info, false);
                this.roomClient.sendVideoOff();
            }
        }
    }
}
