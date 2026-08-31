'use strict';

class RecordingManager {
    /**
     * @param {RoomClient} roomClient
     */
    constructor(roomClient) {
        this.roomClient = roomClient;
        this._isRecording = false;
        this._recStartTs = null;
        this.mediaRecorder = null;
        this.audioRecorder = null;
        this.recScreenStream = null;
        this.recSyncTime = 4000; // milliseconds for chunking
        this.recSyncChunkSize = 1000 * 1024; // 1MB chunk size
        this.recServerFileName = null;
        this.localAudioStream = null;
        this.localVideoStream = null;
        this._lastRecTimeText = '0s'; // Store the last recording time text for popup on stop
    }

    /**
     * Handles displaying a popup when recording is active and the user attempts to leave the room.
     * @returns {void}
     */
    popupRecordingOnLeaveRoom() {
        const rc = this.roomClient;
        Swal.fire({
            position: 'center',
            imageUrl: image.recording,
            title: 'Recording is ON',
            html: renderRoomTemplate('popupRecordingOnLeaveRoomTemplate'),
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        });
    }

    /**
     * Displays advice regarding server-side recording.
     * @returns {void}
     */
    showRecServerSideAdvice() {
        const rc = this.roomClient;
        Swal.fire({
            position: 'center',
            imageUrl: image.recording,
            title: 'Server Sync Recording Enabled',
            html: renderRoomTemplate('popupRecServerSideAdviceTemplate'),
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        });
    }

    /**
     * Toggles the disabled state of video and audio device tabs.
     * @param {boolean} [disabled=false] - Whether to disable the tabs.
     * @returns {void}
     */
    toggleVideoAudioTabs(disabled = false) {
        tabAudioDevicesBtn.disabled = disabled;
        tabVideoDevicesBtn.disabled = disabled;
    }

    /**
     * Handles recording errors.
     * @param {string} error - The error message.
     * @param {boolean} [popupLog=true] - Whether to display the error in a popup.
     * @returns {void}
     */
    handleRecordingError(error, popupLog = true) {
        const rc = this.roomClient;
        this.toggleVideoAudioTabs(false);
        console.error('Recording error', error);
        if (popupLog) rc.userLog('error', 'Recording error: ' + error, 'top-end', 4000);
    }

    /**
     * Returns an array of supported MIME types for MediaRecorder.
     * @returns {Array<string>}
     */
    getSupportedMimeTypes() {
        const possibleTypes = ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/mp4'];
        return possibleTypes.filter((type) => MediaRecorder.isTypeSupported(type));
    }

    /**
     * Initiates the recording process.
     * @returns {Promise<void>}
     */
    async startRecording() {
        const rc = this.roomClient;
        recordedBlobs = [];

        // Toggle Video/Audio tabs
        this.toggleVideoAudioTabs(true);

        // Get supported MIME types and set options
        const supportedMimeTypes = this.getSupportedMimeTypes();
        console.log('MediaRecorder supported options', supportedMimeTypes);

        const options = {
            mimeType: supportedMimeTypes[0],
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 2500000,
        };

        if (rc.audioRecorder) {
            rc.audioRecorder = new MixedAudioRecorder();
            const audioStreams = this.getAudioStreamFromAudioElements();
            console.log('Audio streams tracks --->', audioStreams.getTracks());
            rc.audioRecorder.init(audioStreams);
        }

        try {
            this.isMobileDevice
                ? this.startMobileRecording(options, audioMixerTracks)
                : this.recordingOptions(options, audioMixerTracks);
        } catch (err) {
            this.handleRecordingError('Exception while creating MediaRecorder: ' + err);
        }
    }

    /**
     * Presents recording options to the user (desktop only).
     * @param {object} options - MediaRecorder options.
     * @param {MediaStreamTrack[]} audioMixerTracks - Audio tracks to mix.
     * @returns {void}
     */
    recordingOptions(options, audioMixerTracks) {
        Swal.fire({
            position: 'top',
            imageUrl: image.recording,
            title: 'Recording options',
            text: 'Select the recording type you want to start. Audio will be recorded from all participants.',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Record camera + audio',
            denyButtonText: 'Record screen + audio',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                this.startMobileRecording(options, audioMixerTracks);
            } else if (result.isDenied) {
                this.startDesktopRecording(options, audioMixerTracks);
            }
        });
    }

    /**
     * Starts recording for mobile devices.
     * @param {object} options - MediaRecorder options.
     * @param {MediaStreamTrack[]} audioMixerTracks - Audio tracks to mix.
     * @returns {void}
     */
    startMobileRecording(options, audioMixerTracks) {
        const rc = this.roomClient;
        try {
            // For mobile devices, record local camera stream... + all audio tracks
            const mediaStream = new MediaStream();
            if (rc.localAudioStream) {
                if (rc.rnnoiseManager && rc.rnnoiseManager.RNNoiseProcessor) {
                    rc.localAudioStream.getAudioTracks().forEach((track) => audioMixerTracks.push(track));
                } else {
                    rc.localAudioStream.getAudioTracks().forEach((track) => mediaStream.addTrack(track));
                }
            }
            if (rc.localVideoStream) rc.localVideoStream.getVideoTracks().forEach((track) => mediaStream.addTrack(track));

            rc.mediaRecorder = new MediaRecorder(mediaStream, options);
            this.initRecording();
        } catch (err) {
            this.handleRecordingError('Unable to record the camera + audio: ' + err, false);
        }
    }

    /**
     * Starts recording for desktop devices.
     * @param {object} options - MediaRecorder options.
     * @param {MediaStreamTrack[]} audioMixerTracks - Audio tracks to mix.
     * @returns {void}
     */
    startDesktopRecording(options, audioMixerTracks) {
        const rc = this.roomClient;
        // On desktop devices, record camera or screen/window... + all audio tracks
        const constraints = { video: true };
        navigator.mediaDevices
            .getDisplayMedia(constraints)
            .then((screenStream) => {
                this.recScreenStream = screenStream;
                const mediaStream = new MediaStream();
                // Add any audio tracks that were specifically passed in (e.g. mic stream)
                if (rc.localAudioStream) {
                    if (rc.rnnoiseManager && rc.rnnoiseManager.RNNoiseProcessor) {
                        rc.localAudioStream.getAudioTracks().forEach((track) => audioMixerTracks.push(track));
                    } else {
                        rc.localAudioStream.getAudioTracks().forEach((track) => mediaStream.addTrack(track));
                    }
                }
                screenStream.getTracks().forEach((track) => mediaStream.addTrack(track));

                rc.mediaRecorder = new MediaRecorder(mediaStream, options);
                this.initRecording();
            })
            .catch((err) => {
                this.handleRecordingError('Unable to record the screen + audio: ' + err, false);
            });
    }

    /**
     * Initializes the recording state and starts the MediaRecorder.
     * @returns {void}
     */
    initRecording() {
        const rc = this.roomClient;
        this._isRecording = true;
        this.handleMediaRecorder();
        rc.event(_EVENTS.startRec);
        this.recordingAction(enums.recording.start);
        rc.sound('recStart');
    }

    /**
     * Checks if a MediaStream has an audio track.
     * @param {MediaStream} mediaStream - The media stream to check.
     * @returns {boolean}
     */
    hasAudioTrack(mediaStream) {
        if (!mediaStream) return false;
        return mediaStream.getAudioTracks().length > 0;
    }

    /**
     * Checks if a MediaStream has a video track.
     * @param {MediaStream} mediaStream - The media stream to check.
     * @returns {boolean}
     */
    hasVideoTrack(mediaStream) {
        if (!mediaStream) return false;
        return mediaStream.getVideoTracks().length > 0;
    }

    /**
     * Gets all audio tracks from audio elements in the DOM.
     * @returns {MediaStreamTrack[]}
     */
    getAudioTracksFromAudioElements() {
        const audioElements = document.querySelectorAll('audio');
        let audioTracks = [];
        audioElements.forEach((element) => {
            if (element.srcObject instanceof MediaStream) {
                element.srcObject.getAudioTracks().forEach((track) => audioTracks.push(track));
            }
        });
        return audioTracks;
    }

    /**
     * Gets a mixed audio stream from all audio elements in the DOM.
     * @returns {MediaStream}
     */
    getAudioStreamFromAudioElements() {
        const audioElements = document.querySelectorAll('audio');
        const audioContext = new AudioContext();
        const destination = audioContext.createMediaStreamDestination();

        audioElements.forEach((element) => {
            if (element.srcObject instanceof MediaStream) {
                const source = audioContext.createMediaStreamSource(element.srcObject);
                source.connect(destination);
            }
        });
        // Also include the local microphone track so solo recordings have audio
        if (this.roomClient.localAudioStream) {
            audioContext.createMediaStreamSource(this.roomClient.localAudioStream).connect(destination);
        }
        return destination.stream;
    }

    /**
     * Configures and starts the MediaRecorder.
     * @returns {void}
     */
    handleMediaRecorder() {
        const rc = this.roomClient;
        if (rc.mediaRecorder) {
            this.recServerFileName = this.getServerRecFileName();
            rc.mediaRecorder.addEventListener('start', this.handleMediaRecorderStart);
            rc.mediaRecorder.addEventListener('dataavailable', this.handleMediaRecorderData);
            rc.mediaRecorder.addEventListener('stop', this.handleMediaRecorderStop);
            // Always pass a timeslice so the browser flushes encoded chunks periodically
            // instead of buffering the entire recording in renderer memory.
            // - Server sync: 4 s chunks → fewer HTTP POSTs to /recSync.
            // - Local blob: 1 s chunks → faster internal flush, lighter recorder buffer.
            rc.recording.recSyncServerRecording
                ? rc.mediaRecorder.start(this.recSyncTime)
                : rc.mediaRecorder.start(this.recSyncChunkSize);
        }
    }

    /**
     * Generates a UUID v4 string.
     * @returns {string}
     */
    generateUUIDv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
            (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
        );
    }

    /**
     * Generates a server recording file name.
     * @returns {string}
     */
    getServerRecFileName() {
        const rc = this.roomClient;
        const roomName = rc.room_id.trim();
        const dateTime = getDataTimeStringFormat();
        const uuid = this.generateUUIDv4();
        return `Rec_${roomName}_${dateTime}_${uuid}.webm`;
    }

    /**
     * Handles the 'start' event of the MediaRecorder.
     * @param {Event} evt - The MediaRecorder event.
     * @returns {void}
     */
    handleMediaRecorderStart = (evt) => {
        const rc = this.roomClient;
        console.log('MediaRecorder started: ', evt);
        rc.cleanLastRecordingInfo();
        rc.disableRecordingOptions();
        this._recStartTs = performance.now();
    };

    /**
     * Handles the 'dataavailable' event of the MediaRecorder.
     * @param {BlobEvent} evt - The BlobEvent containing recorded data.
     * @returns {void}
     */
    handleMediaRecorderData = (evt) => {
        const rc = this.roomClient;
        // console.log('MediaRecorder data: ', evt);
        if (evt.data && evt.data.size > 0) {
            rc.recording.recSyncServerRecording ? this.syncRecordingInCloud(evt.data) : recordedBlobs.push(evt.data);
        }
    };

    /**
     * Synchronizes recording data with a cloud server.
     * @param {Blob} data - The Blob containing recording data.
     * @returns {Promise<void>}
     */
    async syncRecordingInCloud(data) {
        const rc = this.roomClient;
        try {
            const arrayBuffer = await data.arrayBuffer();
            const chunk = new Blob([arrayBuffer], { type: data.type });
            // Server sync with duration patch endpoint (webm.js based solution)
            const response = await axios.post(
                `${rc.recording.recSyncServerEndpoint}/recSync?fileName=` + rc.recServerFileName,
                chunk,
                {
                    headers: {
                        'Content-Type': 'application/octet-stream',
                    },
                }
            );
            console.log('Server sync recording chunk response:', response.data);
        } catch (error) {
            console.error('Error syncing recording chunk:', error);
            const errorMessage = 'Failed to sync recording to server';
            userLog('warning', errorMessage, 'top-end', 3000);
            this.stopRecording();
            this.saveLastRecordingInfo('<br/><span class="red">' + errorMessage + '.</span>');
        }
    }

    /**
     * Handles the 'stop' event of the MediaRecorder.
     * @param {Event} evt - The MediaRecorder event.
     * @returns {Promise<void>}
     */
    handleMediaRecorderStop = async (evt) => {
        const rc = this.roomClient;
        try {
            console.log('MediaRecorder stopped: ', evt);
            rc.recording.recSyncServerRecording ? this.handleServerRecordingStop() : this.handleLocalRecordingStop();
            this.disableRecordingOptions(false);

            // If cloud sync is enabled, patch duration on the server
            if (rc.recording.recSyncServerRecording) {
                const durationMs = this._recStartTs ? Math.round(performance.now() - this._recStartTs) : undefined;

                // Option S3: pass duration to your existing finalize endpoint (preferred if it uploads to S3)
                if (rc.recording.recSyncServerToS3) {
                    try {
                        await axios.post(`${rc.recording.recSyncServerEndpoint}/recSyncFinalize`, null, {
                            params: { fileName: rc.recServerFileName, durationMs },
                        });
                        console.log('Server sync recording finalized to S3');
                    } catch (error) {
                        console.error('Error finalizing recording to S3:', error);
                    }
                } else { // Option fix-webm: use the separate fix-webm-duration endpoint
                    try {
                        await axios.post(`${rc.recording.recSyncServerEndpoint}/recSyncFixWebm`, null, {
                            params: { fileName: rc.recServerFileName, durationMs },
                        });
                        console.log('Server sync recording webm duration fixed');
                    } catch (error) {
                        console.error('Error fixing webm duration on server:', error);
                    }
                }
            }
        } catch (error) {
            console.error('Error in handleMediaRecorderStop:', error);
        }
    };

    /**
     * Disables or enables recording options in the UI.
     * @param {boolean} [disabled=true] - Whether to disable the options.
     * @returns {void}
     */
    disableRecordingOptions(disabled = true) {
        switchServerRecording.disabled = disabled;
        this.roomClient.getId('startRecordingBtn').disabled = disabled;
    }

    /**
     * Gets the WebM fixer function from the window object.
     * @returns {function|null}
     */
    getWebmFixerFn() {
        const fn = window.FixWebmDuration;
        return typeof fn === 'function' ? fn : null;
    }

    /**
     * Handles stopping local recording and saving the file.
     * @returns {void}
     */
    handleLocalRecordingStop() {
        const rc = this.roomClient;
        console.log('MediaRecorder Blobs: ', recordedBlobs);

        const dateTime = getDataTimeString();
        const type = recordedBlobs[0].type.includes('mp4') ? 'mp4' : 'webm';
        const rawBlob = new Blob(recordedBlobs, { type: 'video/' + type });
        const recFileName = `Rec_${dateTime}.${type}`;

        const recType = 'Locally';
        const recordingInfo = `
        <br/><br/>
        You can now download the recorded video in your device.
        File name: ${recFileName}
        Duration: ${this._lastRecTimeText}
        `;
        const recordingMsg = `Please wait to be processed, then will be downloaded to your ${currentDevice} device.`;

        this.saveLastRecordingInfo(recordingInfo);
        this.showRecordingInfo(recType, recordingInfo, recordingMsg);

        // Fix WebM duration (only for webm recordings)
        if (type === 'webm') {
            (async () => {
                try {
                    const fix = this.getWebmFixerFn();
                    const durationMs = this._recStartTs ? performance.now() - this._recStartTs : undefined;
                    if (!fix) {
                        console.warn('WebM duration fixer not available. Downloading raw blob.');
                        this.saveRecordingInLocalDevice(rawBlob, recFileName);
                        return;
                    }
                    const finalBlob = await fix(rawBlob, durationMs);
                    this.saveRecordingInLocalDevice(finalBlob, recFileName);
                } catch (error) {
                    console.error('Error fixing WebM duration:', error);
                    rc.userLog('error', 'Error fixing WebM duration: ' + error, 'top-end', 4000);
                    this.saveRecordingInLocalDevice(rawBlob, recFileName);
                }
            })();
        } else {
            // For MP4 or other types, save raw blob
            this.saveRecordingInLocalDevice(rawBlob, recFileName);
        }
    }

    /**
     * Handles stopping server-side recording.
     * @returns {void}
     */
    handleServerRecordingStop() {
        const rc = this.roomClient;
        console.log('MediaRecorder Stop');

        const recType = 'Server';
        const recordingInfo = `
        <br/><br/>
        Your video recording was saved on the server in: ${rc.recServerFileName}.
        Duration: ${this._lastRecTimeText}
        `;
        this.saveLastRecordingInfo(recordingInfo);
        this.showRecordingInfo(recType, recordingInfo);
    }

    /**
     * Saves the last recording information to local storage and updates the UI.
     * @param {string} recordingInfo - HTML string containing recording information.
     * @returns {void}
     */
    saveLastRecordingInfo(recordingInfo) {
        const lastRecordingInfo = document.getElementById('lastRecordingInfo');
        if (lastRecordingInfo) lastRecordingInfo.innerHTML = recordingInfo;
        localStorage.setItem(_LAST_RECORDING_INFO, JSON.stringify({ html: { recordingInfo } }));
    }

    /**
     * Cleans the last recording information from local storage and UI.
     * @returns {void}
     */
    cleanLastRecordingInfo() {
        const lastRecordingInfo = document.getElementById('lastRecordingInfo');
        if (lastRecordingInfo) lastRecordingInfo.innerHTML = '';
        localStorage.removeItem(_LAST_RECORDING_INFO);
    }

    /**
     * Displays recording information in a popup.
     * @param {string} recType - The type of recording (Local or Server).
     * @param {string} recordingInfo - HTML string containing recording information.
     * @param {string} [recordingMsg=''] - Additional message for the recording info.
     * @returns {void}
     */
    showRecordingInfo(recType, recordingInfo, recordingMsg = '') {
        if (!recShowInfo) return;
        Swal.fire({
            position: 'center',
            imageUrl: image.recording,
            title: 'Recording info',
            html: renderRoomTemplate('popupRecordingInfoTemplate', {
                recType: recType,
                recordingMsg: recordingMsg,
            }),
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
        });
    }

    /**
     * Saves the recorded Blob to the local device.
     * @param {Blob} blob - The recorded media Blob.
     * @param {string} recFileName - The name of the file to save.
     * @returns {void}
     */
    saveRecordingInLocalDevice(blob, recFileName) {
        console.log('MediaRecorder Download Blobs');
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = recFileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            console.log(`🔴 Recording FILE: ${recFileName} done 👍`);
            recordedBlobs = [];
        }, 100);
    }

    /**
     * Pauses the active recording.
     * @returns {void}
     */
    pauseRecording() {
        if (this.roomClient.mediaRecorder) {
            this.roomClient.mediaRecorder.pause();
            this.roomClient.event(_EVENTS.pauseRec);
            this.recordingAction('Pause recording');
        }
    }

    /**
     * Resumes a paused recording.
     * @returns {void}
     */
    resumeRecording() {
        if (this.roomClient.mediaRecorder) {
            this.roomClient.mediaRecorder.resume();
            this.roomClient.event(_EVENTS.resumeRec);
            this.recordingAction('Resume recording');
        }
    }

    /**
     * Stops the active recording.
     * @returns {void}
     */
    stopRecording() {
        if (this.roomClient.mediaRecorder) {
            this.toggleVideoAudioTabs(false);
            // Capture the elapsed time text BEFORE stopRec event resets it to '0s'
            const recTimeEl = document.getElementById('recordingStatus');
            this._lastRecTimeText = recTimeEl ? recTimeEl.innerText : '0s';

            this.roomClient.mediaRecorder.stop();
            if (this.audioRecorder) this.audioRecorder.stopMixedAudioStream();
            this.recordingAction(enums.recording.stop);
            this.roomClient.sound('recStop');
        }
    }

    /**
     * Emits a recording action to other participants.
     * @param {string} action - The recording action (e.g., 'start', 'pause', 'resume', 'stop').
     * @returns {void}
     */
    recordingAction(action) {
        const rc = this.roomClient;
        if (!rc.thereAreParticipants()) return;
        rc.socket.emit('recordingAction', {
            peer_name: rc.peer_name,
            peer_uuid: rc.peer_uuid,
            action: action,
        });
    }

    /**
     * Handles incoming recording action data from other participants.
     * @param {object} data - The recording action data.
     * @returns {void}
     */
    handleRecordingAction(data) {
        const rc = this.roomClient;
        console.log('Handle recording action', data);

        const { peer_id, peer_name, peer_avatar, action } = data;

        switch (action) {
            case enums.recording.started:
            case enums.recording.start:
                toastMessage(6000);
                Swal.fire({
                    position: 'top-end',
                    html: renderRoomTemplate('popupRecordingStartedTemplate', {
                        peer_name: peer_name,
                    }),
                    showConfirmButton: false,
                    timer: 3000,
                    background: swalBackground,
                    imageUrl: image.recording,
                    imageWidth: 24,
                    imageHeight: 24,
                    imageAlt: 'Recording icon',
                });
                rc.userLog('info', `${icons.recording} Recording STARTED by ${peer_name}`, 'top-end');
                break;
            case enums.recording.stop:
                toastMessage(3000);
                Swal.fire({
                    position: 'top-end',
                    html: renderRoomTemplate('popupRecordingStoppedTemplate', {
                        peer_name: peer_name,
                    }),
                    showConfirmButton: false,
                    timer: 3000,
                    background: swalBackground,
                    imageUrl: image.recording,
                    imageWidth: 24,
                    imageHeight: 24,
                    imageAlt: 'Recording icon',
                });
                rc.userLog('info', `${icons.recording} Recording STOPPED by ${peer_name}`, 'top-end');
                break;
            case 'Pause recording':
                rc.userLog('info', `${icons.recording} Recording PAUSED by ${peer_name}`, 'top-end');
                this.pauseRecordingIndicator();
                break;
            case 'Resume recording':
                rc.userLog('info', `${icons.recording} Recording RESUMED by ${peer_name}`, 'top-end');
                this.resumeRecordingIndicator();
                break;
            default:
                break;
        }
    }

    /**
     * Saves the current recording if active.
     * @param {string} reason - The reason for saving.
     * @returns {void}
     */
    saveRecording(reason) {
        if (this._isRecording || this.hasActiveRecorder()) {
            console.log(`Save recording: ${reason}`);
            this.stopRecording();
        }
    }

    /**
     * Checks if there's an active MediaRecorder or AudioRecorder.
     * @returns {boolean}
     */
    hasActiveRecorder() {
        const rc = this.roomClient;
        return (rc.mediaRecorder && rc.mediaRecorder.state !== 'inactive') || (this.audioRecorder && this.audioRecorder.isRecording);
    }

    /**
     * Returns all recording indicator elements.
     * @private
     * @returns {NodeListOf<Element>}
     */
    _getRecIndicators() {
        return document.querySelectorAll('.recording-indicator');
    }

    /**
     * Pauses all recording indicators in the UI.
     * @returns {void}
     */
    pauseRecordingIndicator() {
        this._getRecIndicators().forEach((el) => el.classList.add('paused'));
    }

    /**
     * Resumes all recording indicators in the UI.
     * @returns {void}
     */
    resumeRecordingIndicator() {
        this._getRecIndicators().forEach((el) => el.classList.remove('paused'));
    }

    /**
     * Gets the current recording state.
     * @returns {boolean}
     */
    isRecording() {
        return this._isRecording;
    }
}
window.RecordingManager = RecordingManager;
