'use strict';

class RTMPManager {
    constructor(roomClient) {
        this.roomClient = roomClient;
        this.selectedRtmpFilename = '';
        this.rtmpFileStreamer = false;
        this.rtmpUrlstreamer = false;
    }

    // ##############################################
    // RTMP Custom Destination
    // ##############################################

    initRtmpCustomDestination() {
        const rc = this.roomClient;
        const rtmpPresets = {
            YouTube: { url: 'rtmp://a.rtmp.youtube.com/live2', placeholder: 'YouTube stream key' },
            Facebook: { url: 'rtmps://live-api-s.facebook.com:443/rtmp', placeholder: 'Facebook stream key' },
            Twitch: { url: 'rtmp://live.twitch.tv/app', placeholder: 'Twitch stream key' },
            Custom: { url: '', placeholder: 'Stream key' },
        };

        const rtmpCustomUrl = rc.getId('rtmpCustomUrl');
        const rtmpCustomStreamKey = rc.getId('rtmpCustomStreamKey');
        const rtmpCustomClear = rc.getId('rtmpCustomClear');

        const showClearButton = () => {
            elemDisplay('rtmpCustomClear', rtmpCustomUrl.value || rtmpCustomStreamKey.value ? true : false);
        };

        const setActivePreset = (activeBtn) => {
            document.querySelectorAll('.btn-rtmp-preset').forEach((btn) => btn.classList.remove('active'));
            activeBtn.classList.add('active');
        };

        rtmpCustomUrl.addEventListener('input', showClearButton);
        rtmpCustomStreamKey.addEventListener('input', showClearButton);

        rc.getId('rtmpPresetYouTube').addEventListener('click', (e) => {
            rtmpCustomUrl.value = rtmpPresets.YouTube.url;
            rtmpCustomStreamKey.placeholder = rtmpPresets.YouTube.placeholder;
            rtmpCustomStreamKey.value = '';
            rtmpCustomStreamKey.focus();
            setActivePreset(e.currentTarget);
            showClearButton();
        });
        rc.getId('rtmpPresetFacebook').addEventListener('click', (e) => {
            rtmpCustomUrl.value = rtmpPresets.Facebook.url;
            rtmpCustomStreamKey.placeholder = rtmpPresets.Facebook.placeholder;
            rtmpCustomStreamKey.value = '';
            rtmpCustomStreamKey.focus();
            setActivePreset(e.currentTarget);
            showClearButton();
        });
        rc.getId('rtmpPresetTwitch').addEventListener('click', (e) => {
            rtmpCustomUrl.value = rtmpPresets.Twitch.url;
            rtmpCustomStreamKey.placeholder = rtmpPresets.Twitch.placeholder;
            rtmpCustomStreamKey.value = '';
            rtmpCustomStreamKey.focus();
            setActivePreset(e.currentTarget);
            showClearButton();
        });
        rc.getId('rtmpPresetCustom').addEventListener('click', (e) => {
            rtmpCustomUrl.value = rtmpPresets.Custom.url;
            rtmpCustomStreamKey.placeholder = rtmpPresets.Custom.placeholder;
            rtmpCustomUrl.placeholder = 'rtmp://your-server/app';
            rtmpCustomStreamKey.value = '';
            rtmpCustomUrl.focus();
            setActivePreset(e.currentTarget);
            showClearButton();
        });

        rtmpCustomClear.addEventListener('click', () => {
            rtmpCustomUrl.value = '';
            rtmpCustomStreamKey.value = '';
            rtmpCustomUrl.placeholder = 'rtmp://a.rtmp.youtube.com/live2';
            rtmpCustomStreamKey.placeholder = 'Stream key';
            document.querySelectorAll('.btn-rtmp-preset').forEach((btn) => btn.classList.remove('active'));
            showClearButton();
        });
    }

    getCustomRtmpUrl() {
        const rtmpCustomUrl = this.roomClient.getId('rtmpCustomUrl')?.value?.trim();
        const rtmpCustomStreamKey = this.roomClient.getId('rtmpCustomStreamKey')?.value?.trim();
        if (rtmpCustomUrl && rtmpCustomStreamKey) {
            const separator = rtmpCustomUrl.endsWith('/') ? '' : '/';
            return rtmpCustomUrl + separator + rtmpCustomStreamKey;
        }
        return null;
    }

    // ##############################################
    // RTMP from FILE
    // ##############################################

    getRTMP() {
        const rc = this.roomClient;
        rc.socket.request('getRTMP').then((filenames) => {
            console.log('RTMP files', filenames);
            if (filenames.length === 0) {
                const fileNameDiv = rc.getId('file-name');
                fileNameDiv.textContent = 'No file found to stream';
                //elemDisplay('startRtmpButton', false);
            }

            //const f = Array.from({ length: 20 }, (_, index) => `My-file-video-to-stream-to-rtmp-server ${index + 1}`);

            const fileListTbody = rc.getId('file-list');
            fileListTbody.innerHTML = '';

            filenames.forEach((filename) => {
                const fileRow = document.createElement('tr');
                const fileCell = document.createElement('td');
                fileCell.textContent = filename;
                fileCell.className = 'file-item';
                fileCell.onclick = () => showFilename(fileCell, filename);
                fileRow.appendChild(fileCell);
                fileListTbody.appendChild(fileRow);
            });

            const self = this;
            function showFilename(clickedItem, filename) {
                const fileNameDiv = rc.getId('file-name');
                fileNameDiv.textContent = `Selected file: ${filename}`;
                self.selectedRtmpFilename = filename;
                const fileItems = document.querySelectorAll('.file-item');
                fileItems.forEach((item) => item.classList.remove('selected'));

                if (clickedItem) {
                    clickedItem.classList.add('selected');
                }
            }
        });
    }

    async startRTMP() {
        const rc = this.roomClient;
        if (!this.isRTMPVideoSupported(filterXSS(this.selectedRtmpFilename))) {
            rc.getId('file-name').textContent = '';
            return rc.userLog(
                'warning',
                "The provided File is not valid. Please ensure it's .mp4, webm or ogg video file",
                'top-end'
            );
        }

        const self = this;
        rc.socket
            .request('startRTMP', {
                file: filterXSS(this.selectedRtmpFilename),
                peer_name: filterXSS(rc.peer_name),
                peer_uuid: filterXSS(rc.peer_uuid),
                customRtmpUrl: this.getCustomRtmpUrl(),
            })
            .then(function (rtmp) {
                rc.event(_EVENTS.startRTMP);
                self.showRTMP(rtmp, 'file');
                self.rtmpFileStreamer = true;
            });
    }

    stopRTMP() {
        if (this.rtmpFileStreamer) {
            this.roomClient.socket.request('stopRTMP');
            this.rtmpFileStreamer = false;
            this.cleanRTMPUrl();
            console.log('RTMP STOP');
            this.roomClient.event(_EVENTS.stopRTMP);
        }
    }

    endRTMP(data) {
        const rtmpMessage = `${data.rtmpUrl} processing finished!`;
        this.rtmpFileStreamer = false;
        this.roomClient.userLog('info', rtmpMessage, 'top-end');
        console.log(rtmpMessage);
        this.cleanRTMPUrl();
        this.roomClient.socket.request('endOrErrorRTMP');
        this.roomClient.event(_EVENTS.endRTMP);
    }

    errorRTMP(data) {
        const rtmpError = `${data.message}`;
        this.rtmpFileStreamer = false;
        this.roomClient.userLog('error', rtmpError, 'top-end');
        console.error(rtmpError);
        this.cleanRTMPUrl();
        this.roomClient.socket.request('endOrErrorRTMP');
        this.roomClient.event(_EVENTS.endRTMP);
    }

    // ##############################################
    // RTMP from URL
    // ##############################################

    startRTMPfromURL(inputVideoURL) {
        const rc = this.roomClient;
        if (!this.isRTMPVideoSupported(filterXSS(inputVideoURL))) {
            rc.getId('rtmpStreamURL').value = '';
            return rc.userLog(
                'warning',
                'The provided URL is not valid. Please ensure it links to an .mp4 video file',
                'top-end'
            );
        }

        const self = this;
        rc.socket
            .request('startRTMPfromURL', {
                inputVideoURL: filterXSS(inputVideoURL),
                peer_name: filterXSS(rc.peer_name),
                peer_uuid: filterXSS(rc.peer_uuid),
                customRtmpUrl: this.getCustomRtmpUrl(),
            })
            .then(function (rtmp) {
                rc.event(_EVENTS.startRTMPfromURL);
                self.showRTMP(rtmp, 'url');
                self.rtmpUrlstreamer = true;
            });
    }

    stopRTMPfromURL() {
        if (this.rtmpUrlstreamer) {
            this.roomClient.socket.request('stopRTMPfromURL');
            this.rtmpUrlstreamer = false;
            this.cleanRTMPUrl();
            console.log('RTMP from URL STOP');
            this.roomClient.event(_EVENTS.stopRTMPfromURL);
        }
    }

    endRTMPfromURL(data) {
        const rtmpMessage = `${data.rtmpUrl} processing finished!`;
        this.rtmpUrlstreamer = false;
        this.roomClient.userLog('info', rtmpMessage, 'top-end');
        console.log(rtmpMessage);
        this.cleanRTMPUrl();
        this.roomClient.socket.request('endOrErrorRTMPfromURL');
        this.roomClient.event(_EVENTS.endRTMPfromURL);
    }

    errorRTMPfromURL(data) {
        const rtmpError = `${data.message}`;
        this.rtmpUrlstreamer = false;
        this.roomClient.userLog('error', rtmpError, 'top-end');
        console.error(rtmpError);
        this.cleanRTMPUrl();
        this.roomClient.socket.request('endOrErrorRTMPfromURL');
        this.roomClient.event(_EVENTS.endRTMPfromURL);
    }

    // ##############################################
    // RTMP common
    // ##############################################

    openRTMPStreamer() {
        const themeColor = encodeURIComponent(themeCustom.color);

        const customRtmpUrl = this.getCustomRtmpUrl();

        const activePreset = document.querySelector('.btn-rtmp-preset.active');
        const streamType = activePreset ? activePreset.textContent.trim() : customRtmpUrl ? 'Custom' : '';

        const options =
            `&vr=${videoQuality.value}` +
            `&vf=${videoFps.value}` +
            `&sf=${screenFps.value}` +
            `&ts=${selectTheme.value}` +
            (themeCustom.keep ? `&tc=${themeColor}` : '') +
            (customRtmpUrl ? `&customRtmpUrl=${encodeURIComponent(customRtmpUrl)}` : '') +
            (streamType ? `&st=${encodeURIComponent(streamType)}` : '');

        const url = `/rtmp?v=${videoSelect.value}&a=${microphoneSelect.value}${options}`;

        openURL(url, true);
    }

    isRTMPVideoSupported(video) {
        if (video.endsWith('.mp4') || video.endsWith('.webm')) return true;
        return false;
    }

    copyRTMPUrl(url) {
        if (!url) return this.roomClient.userLog('info', 'No RTMP URL detected', 'top-end');
        copyToClipboard(url);
    }

    cleanRTMPUrl() {
        const rtmpUrl = this.roomClient.getId('rtmpLiveUrl');
        rtmpUrl.value = '';
        elemDisplay('rtmpUrlLiveContainer', true);
    }

    showRTMP(rtmp, type = 'file') {
        console.log('rtmp', rtmp);

        if (!rtmp) {
            switch (type) {
                case 'file':
                    this.roomClient.event(_EVENTS.endRTMP);
                    break;
                case 'url':
                    this.roomClient.event(_EVENTS.endRTMPfromURL);
                    break;
                default:
                    break;
            }
            return this.roomClient.userLog(
                'warning',
                'Unable to start the RTMP stream. Please ensure the RTMP server is running. If the problem persists, contact the administrator',
                'top-end',
                6000
            );
        }

        const isCustomDestination = this.getCustomRtmpUrl() !== null;

        if (isCustomDestination) {
            elemDisplay('rtmpUrlLiveContainer', false);
        } else {
            elemDisplay('rtmpUrlLiveContainer', true);
            const rtmpUrl = this.roomClient.getId('rtmpLiveUrl');
            rtmpUrl.value = filterXSS(rtmp);
        }

        Swal.fire({
            background: swalBackground,
            imageUrl: image.rtmp,
            position: 'center',
            title: 'LIVE',
            html: isCustomDestination
                ? `<p style="background:transparent; color:rgb(8, 189, 89);">Streaming to external platform</p>`
                : `<p style="background:transparent; color:rgb(8, 189, 89);">${rtmp}</p>`,
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: isCustomDestination ? 'OK' : 'Copy URL',
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed && !isCustomDestination) {
                copyToClipboard(rtmp);
            }
        });
    }
}
