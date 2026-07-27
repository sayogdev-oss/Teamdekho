'use strict';

/**
 * RNNoiseManager - Manages RNNoise audio suppression in RoomClient
 */
class RNNoiseManager {
    /**
     * @constructor
     * @param {RoomClient} roomClient - Reference to RoomClient instance
     */
    constructor(roomClient) {
        this.roomClient = roomClient;
    }

    /**
     * Initialize RNNoise suppression
     * @returns {Promise<void>}
     */
    async initRNNoiseSuppression() {
        if (typeof RNNoiseProcessor === 'undefined') {
            console.warn('RNNoiseProcessor is not available.');
            this.handleRNNoiseNotSupported();
            return;
        }

        if (!RNNoiseProcessor.isSupported()) {
            console.warn('RNNoise: AudioWorklet or WebAssembly not supported on this device, skipping.');
            this.handleRNNoiseNotSupported();
            return;
        }

        const supports48k = await RNNoiseProcessor.isSampleRateSupported();
        if (!supports48k) {
            console.warn('RNNoise: device does not support 48 kHz sample rate, skipping.');
            this.handleRNNoiseNotSupported();
            return;
        }

        this.disableRNNoiseSuppression();

        this.roomClient.RNNoiseProcessor = new RNNoiseProcessor();
    }

    /**
     * Handle unsupported RNNoise state
     */
    handleRNNoiseNotSupported() {
        this.roomClient.isRNNoiseSupported = false;

        // Uncheck the toggle so localStorage stays consistent
        if (switchNoiseSuppression) switchNoiseSuppression.checked = false;
        localStorageSettings.mic_noise_suppression = false;
        lS.setSettings(localStorageSettings);

        // Hide the custom noise suppression toggle in audio settings
        elemDisplay('noiseSuppressionButton', false);
    }

    /**
     * Get RNNoise suppression stream
     * @param {MediaStream} stream - Input media stream
     * @returns {Promise<MediaStream>} Processed or original media stream
     */
    async getRNNoiseSuppressionStream(stream) {
        if (!this.roomClient.RNNoiseProcessor) {
            console.warn('RNNoiseProcessor not initialized.');
            return stream;
        }

        try {
            const processedStream = await this.roomClient.RNNoiseProcessor.startProcessing(stream);

            if (localStorageSettings.mic_noise_suppression) {
                this.roomClient.RNNoiseProcessor.toggleNoiseSuppression();
                switchNoiseSuppression.checked = this.roomClient.RNNoiseProcessor.noiseSuppressionEnabled;
            }

            if (typeof labelNoiseSuppression !== 'undefined') {
                labelNoiseSuppression.style.color = this.roomClient.RNNoiseProcessor.noiseSuppressionEnabled ? 'lime' : 'white';
            }

            return processedStream;
        } catch (err) {
            console.warn('RNNoiseProcessor failed, using original stream:', err);
            return stream;
        }
    }

    /**
     * Disable RNNoise suppression
     */
    disableRNNoiseSuppression() {
        if (this.roomClient.RNNoiseProcessor) {
            try {
                this.roomClient.RNNoiseProcessor.stopProcessing();
            } catch (err) {
                // ignore
            }
            this.roomClient.RNNoiseProcessor = null;
            console.warn('RNNoiseProcessor already initialized, stopping previous instance.');
        }
    }
}
