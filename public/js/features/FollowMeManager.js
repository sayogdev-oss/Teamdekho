'use strict';

class FollowMeManager {
    constructor(roomClient) {
        this.roomClient = roomClient;
    }

    // ####################################################
    // FOLLOW ME
    // ####################################################

    applyPendingFollowMe() {
        if (!this.roomClient._pendingFollowMe) return;
        const { peerId, action } = this.roomClient._pendingFollowMe;
        this.roomClient._pendingFollowMe = null;

        this.roomClient.userLog('info', `${icons.moderator} Moderator has Everyone Follows Me enabled`, 'top-end');

        if (peerId && action) {
            setTimeout(() => {
                if (action === 'pin') {
                    this.followMePin(peerId);
                } else if (action === 'focus') {
                    this.followMeFocus(peerId);
                }
            }, 1000);
        }
    }

    handleFollowMeData = (data) => {
        console.log('SocketOn Follow me', data);
        this.handleFollowMe(data);
    };

    toggleFollowMe(enabled) {
        this.roomClient.isFollowMeActive = enabled;
        this.emitFollowMe({ action: 'toggle', status: enabled });
        if (enabled) {
            if (this.roomClient.isVideoPinned && this.roomClient.pinnedVideoPlayerId) {
                const videoEl = this.roomClient.getId(this.roomClient.pinnedVideoPlayerId);
                const peerId = videoEl ? videoEl.getAttribute('name') : null;
                if (peerId) {
                    this.emitFollowMe({ action: 'pin', peerId: peerId });
                }
            }
            if (isHideALLVideosActive) {
                const focused = this.roomClient.videoMediaContainer.querySelector('[focus-mode]');
                if (focused) {
                    const focusedVideo = focused.querySelector('video[name]');
                    const peerId = focusedVideo ? focusedVideo.getAttribute('name') : null;
                    if (peerId) {
                        this.emitFollowMe({ action: 'focus', peerId: peerId });
                    }
                }
            }
        }
        if (!enabled) {
            this.emitFollowMe({ action: 'unpin' });
            this.emitFollowMe({ action: 'unfocus' });
        }
    }

    emitFollowMe(data) {
        if (!isPresenter) return;
        this.roomClient.socket.emit('followMe', {
            peer_name: this.roomClient.peer_name,
            peer_uuid: this.roomClient.peer_uuid,
            ...data,
        });
    }

    handleFollowMe(data) {
        if (isPresenter) return;

        switch (data.action) {
            case 'toggle':
                data.status
                    ? this.roomClient.userLog('info', `${icons.moderator} Moderator enabled: Everyone Follows Me`, 'top-end')
                    : this.roomClient.userLog('info', `${icons.moderator} Moderator disabled: Everyone Follows Me`, 'top-end');
                break;
            case 'pin':
                this.followMePin(data.peerId);
                break;
            case 'unpin':
                this.followMeUnpin();
                break;
            case 'focus':
                this.followMeFocus(data.peerId);
                break;
            case 'unfocus':
                this.followMeUnfocus(data.peerId);
                break;
            default:
                break;
        }
    }

    followMePin(peerId) {
        if (this.roomClient.isVideoPinned) {
            this.followMeUnpin();
        }
        const videoEl = this.getVideoElementByPeerId(peerId);
        if (videoEl) {
            const btnPn = this.roomClient.getId(`${videoEl.id}__pin`);
            if (btnPn) {
                btnPn.click();
                return;
            }
        }
        console.warn('Follow me pin: no video found for peer', peerId);
    }

    followMeUnpin() {
        if (!this.roomClient.isVideoPinned || !this.roomClient.pinnedVideoPlayerId) return;
        const btnPn = this.roomClient.getId(`${this.roomClient.pinnedVideoPlayerId}__pin`);
        if (btnPn) {
            btnPn.click();
        }
    }

    followMeFocus(peerId) {
        if (isHideALLVideosActive) {
            this.followMeUnfocus();
        }
        const videoEl = this.getVideoElementByPeerId(peerId);
        if (videoEl) {
            const containerId = videoEl.id + '__video';
            const container = this.roomClient.getId(containerId);
            if (container) {
                this.roomClient.toggleFocusMode(containerId);
                return;
            }
        }
        console.warn('Follow me focus: no video found for peer', peerId);
    }

    followMeUnfocus(peerId) {
        if (!isHideALLVideosActive) return;
        const focused = this.roomClient.videoMediaContainer.querySelector('[focus-mode]');
        if (focused) {
            this.roomClient.toggleFocusMode(focused.id);
        }
    }

    getVideoElementByPeerId(peerId) {
        const videos = document.querySelectorAll('video[name]');
        for (const video of videos) {
            if (video.getAttribute('name') === peerId) return video;
        }
        return null;
    }

    // ####################################################
    // HANDLE PEER GEOLOCATION
    // ####################################################

    askPeerGeoLocation(id) {
        const words = id.split('___');
        const peer_id = words[0];
        const cmd = {
            type: 'geoLocation',
            from_peer_name: this.roomClient.peer_name,
            from_peer_id: this.roomClient.peer_id,
            peer_id: peer_id,
            broadcast: false,
        };
        this.roomClient.emitCmd(cmd);
        this.roomClient.peerActionProgress(
            'Geolocation',
            'Geolocation requested. Please wait for confirmation...',
            6000,
            'geolocation'
        );
    }

    sendPeerGeoLocation(peer_id, type, data) {
        const cmd = {
            type: type,
            from_peer_name: this.roomClient.peer_name,
            from_peer_id: this.roomClient.peer_id,
            peer_id: peer_id,
            data: data,
            broadcast: false,
        };
        this.roomClient.emitCmd(cmd);
    }

    confirmPeerGeoLocation(cmd) {
        this.roomClient.sound('notify');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: swalBackground,
            imageUrl: image.geolocation,
            position: 'center',
            title: 'Geo Location',
            html: renderRoomTemplate('popupGeoLocationPromptTemplate', {
                text: {
                    message: `Would you like to share your location to ${cmd.from_peer_name}?`,
                },
            }),
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            result.isConfirmed ? this.getPeerGeoLocation(cmd.from_peer_id) : this.denyPeerGeoLocation(cmd.from_peer_id);
        });
    }

    getPeerGeoLocation(peer_id, options = {}) {
        if ('geolocation' in navigator) {
            const self = this;
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    const geoLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    };
                    console.log('GeoLocation --->', geoLocation);

                    self.sendPeerGeoLocation(peer_id, 'geoLocationOK', geoLocation);
                },
                function (error) {
                    let geoError = error;
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            geoError = 'User denied the request for Geolocation';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            geoError = 'Location information is unavailable';
                            break;
                        case error.TIMEOUT:
                            geoError = 'The request to get user location timed out';
                            break;
                        case error.UNKNOWN_ERROR:
                            geoError = 'An unknown error occurred';
                            break;
                        case 'NOT_SUPPORTED':
                            geoError = 'Geolocation is not supported by this browser';
                            break;
                        default:
                            geoError =
                                'Unable to retrieve your location. Please ensure location services are enabled in your device and browser settings, and try again';
                            break;
                    }
                    if (
                        error.code === error.UNKNOWN_ERROR ||
                        error.code === undefined ||
                        geoError.startsWith('Unable to retrieve')
                    ) {
                        geoError +=
                            ' If the problem persists, check your device and browser location permissions, and ensure you have a clear view of the sky (for GPS)';
                    }
                    self.sendPeerGeoLocation(peer_id, 'geoLocationKO', `${self.roomClient.peer_name}: ${geoError}`);
                    self.roomClient.userLog('warning', geoError, 'top-end', 5000);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                    ...options,
                }
            );
        } else {
            this.sendPeerGeoLocation(
                peer_id,
                'geoLocationKO',
                `${this.roomClient.peer_name}: Geolocation is not supported by this browser`
            );
            this.roomClient.userLog('warning', 'Geolocation is not supported by this browser', 'top-end', 5000);
        }
    }

    denyPeerGeoLocation(peer_id) {
        this.sendPeerGeoLocation(peer_id, 'geoLocationKO', `${this.roomClient.peer_name}: Has declined permission for geolocation`);
    }

    handleGeoPeerLocation(cmd) {
        const geoLocation = cmd.data;
        this.roomClient.sound('notify');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: swalBackground,
            imageUrl: image.geolocation,
            position: 'center',
            title: 'Geo Location',
            html: renderRoomTemplate('popupGeoLocationPromptTemplate', {
                text: {
                    message: `Would you like to open ${cmd.from_peer_name} geolocation?`,
                },
            }),
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) {
                openURL(
                    `https://www.google.com/maps/search/?api=1&query=${geoLocation.latitude},${geoLocation.longitude}`,
                    true
                );
            }
        });
    }

    // ####################################################
    // ROOM NOTIFICATIONS
    // ####################################################

    cleanNotifications() {
        getId('notifyEmailInput').value = '';
        getId('switchNotifyUserJoin').checked = false;
        return true;
    }

    saveNotifications(validate = true) {
        if (validate && !this.isValidNotifications()) return;

        const data = this.getNotificationsData();

        if (!data) return;

        this.setNotificationsData(data);
    }

    setNotificationsData(data) {
        this.roomClient.socket.emit('updateRoomNotifications', data, (response) => {
            response.error
                ? this.cleanNotifications() && this.roomClient.userLog('warning', response.error, 'top-end', 6000)
                : this.roomClient.roomMessage('save_room_notifications', true);
        });
    }

    isValidNotifications() {
        const notifyEmailInput = getId('notifyEmailInput');
        if (!this.roomClient.isValidEmail(notifyEmailInput.value)) {
            notifyEmailInput.value = '';
            this.roomClient.userLog('warning', 'Email not valid', 'top-end', 6000);
            return false;
        }
        return true;
    }

    getNotificationsData() {
        const notifyEmailInput = getId('notifyEmailInput');
        const switchNotifyUserJoin = getId('switchNotifyUserJoin');

        return {
            peer_name: this.roomClient.peer_name,
            peer_uuid: this.roomClient.peer_uuid,
            notifications: {
                mode: {
                    email: notifyEmailInput.value,
                },
                events: {
                    join: switchNotifyUserJoin.checked,
                },
            },
        };
    }
}
