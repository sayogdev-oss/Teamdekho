'use strict';

/**
 * BreakoutRoomManager - Manages breakout room functionality in RoomClient
 */
class BreakoutRoomManager {
    /**
     * @constructor
     * @param {RoomClient} roomClient - Reference to RoomClient instance
     */
    constructor(roomClient) {
        this.roomClient = roomClient;
        this.isBreakoutPinned = false;
    }

    /**
     * Handles incoming breakout room events from the server.
     * @param {object} data - The breakout room data.
     */
    handleBreakoutRoom = (data) => {
        if (data.action === 'assign') {
            this.joinBreakoutRoom(data.breakoutRoom, data.mainRoom, data.duration, data.roomName);
        }
    };

    /**
     * Handles breakout room counts changed event.
     */
    handleBreakoutRoomCountsChanged = () => {
        if (this.roomClient.isBreakoutPanelOpen) this.roomClient.refreshBreakoutPanel();
    };

    /**
     * Handles incoming breakout room messages.
     * @param {object} data - The message data.
     */
    handleBreakoutRoomMessage = (data) => {
        console.log('SocketOn breakoutRoomMessage', data);
        this.roomClient.userLog('info', `<b>${data.peer_name}</b>: ${data.message}`, 'top-end', 8000);
        this.roomClient.sound('notification');
    };

    /**
     * Handles breakout room end event.
     * @param {object} data - The event data.
     */
    handleBreakoutRoomEnd = (data) => {
        console.log('SocketOn breakoutRoomEnd', data);
        this.roomClient.userLog('info', 'Breakout session ended by presenter. Returning to main room...', 'top-end', 4000);
        this.roomClient.sound('notification');
        setTimeout(() => this.roomClient.returnToMainRoom(), 2000);
    };

    /**
     * Handles breakout room countdown event.
     * @param {object} data - The countdown data.
     */
    handleBreakoutRoomCountdown = (data) => {
        console.log('SocketOn breakoutRoomCountdown', data);
        this.roomClient.sound('notification');
        this.roomClient.startBreakoutEndCountdown(data.countdown);
    };

    /**
     * Handles breakout room help request.
     * @param {object} data - The help request data.
     */
    handleBreakoutRoomHelp = (data) => {
        console.log('SocketOn breakoutRoomHelp', data);
        if (!(this.roomClient.isPresenter || this.roomClient.isCoHost)) return;
        this.roomClient.sound('notification');
        const roomIdx = this.roomClient.breakoutRooms.findIndex((r) => r.id === data.breakoutRoom);
        const room = roomIdx !== -1 ? this.roomClient.breakoutRooms[roomIdx] : null;
        const roomLabel = room ? room.name || `Room ${roomIdx + 1}` : data.breakoutRoom;
        this.roomClient.Swal.fire({
            background: this.roomClient.swalBackground,
            position: 'top',
            title: 'Help Requested',
            html: this.roomClient.renderRoomTemplate('popupBreakoutHelpTemplate', {
                text: {
                    peerName: data.peer_name,
                    roomLabel,
                },
            }),
            showDenyButton: true,
            confirmButtonText: `${this.roomClient.icons.signIn} Join Room`,
            denyButtonText: 'Dismiss',
            customClass: {
                popup: 'breakout-swal breakout-swal--help',
                htmlContainer: 'breakout-swal-html',
                confirmButton: 'breakout-swal-confirm breakout-swal-confirm--help',
                denyButton: 'breakout-swal-deny',
            },
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) {
                this.roomClient.presenterJoinBreakoutRoom(data.breakoutRoom);
            }
        });
    };

    /**
     * Joins a breakout room.
     * @param {string} breakoutRoom - The ID of the breakout room.
     * @param {string} mainRoom - The ID of the main room.
     * @param {string} [duration='unlimited'] - The duration of the breakout room.
     * @param {string} [roomName=''] - The display name of the breakout room.
     * @returns {Promise<void>}
     */
    async joinBreakoutRoom(breakoutRoom, mainRoom, duration = 'unlimited', roomName = '') {
        const displayName = roomName || breakoutRoom;
        const durationChip =
            duration && duration !== 'unlimited'
                ? `<div class="breakout-popup-chip">${this.roomClient.icons.clock}<span>${duration}</span></div>`
                : `<div class="breakout-popup-chip breakout-popup-chip--open">${this.roomClient.icons.infinity}<span>No time limit</span></div>`;
        const confirmResult = await this.roomClient.Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: this.roomClient.swalBackground,
            position: 'center',
            title: 'Breakout Room Ready',
            html: this.roomClient.renderRoomTemplate('popupBreakoutJoinTemplate', {
                text: {
                    displayName,
                },
                html: {
                    durationChip,
                },
            }),
            showDenyButton: true,
            confirmButtonText: `${this.roomClient.icons.arrowRight} Join`,
            denyButtonText: 'Stay',
            customClass: {
                popup: 'breakout-swal breakout-swal--join',
                htmlContainer: 'breakout-swal-html',
                confirmButton: 'breakout-swal-confirm breakout-swal-confirm--join',
                denyButton: 'breakout-swal-deny breakout-swal-deny--quiet',
            },
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        });

        if (!confirmResult.isConfirmed) return;

        const baseUrl = `${window.location.origin}/join`;
        const queryParams = new URLSearchParams({
            room: breakoutRoom,
            name: this.roomClient.peer_name,
            audio: this.roomClient.peer_info.peer_audio ? '1' : '0',
            video: this.roomClient.peer_info.peer_video ? '1' : '0',
            notify: '0',
            breakoutMain: mainRoom,
            breakoutName: displayName,
            duration: duration || 'unlimited',
        });
        if (this.roomClient.peer_info.peer_token) queryParams.set('token', this.roomClient.peer_info.peer_token);

        if (typeof this.roomClient.preventExit !== 'undefined') this.roomClient.preventExit = false;
        this.roomClient.exit(true);
        this.roomClient.openURL(`${baseUrl}?${queryParams.toString()}`);
    }

    /**
     * Toggles the pin state of the breakout room panel.
     */
    toggleBreakoutPin() {
        if (this.roomClient.transcription.isPin()) {
            return this.roomClient.userLog('info', 'Please unpin the transcription that appears to be currently pinned', 'top-end');
        }
        if (this.roomClient.isChatPinned) {
            return this.roomClient.userLog('info', 'Please unpin the chat that appears to be currently pinned', 'top-end');
        }
        if (this.roomClient.isPollPinned) {
            return this.roomClient.userLog('info', 'Please unpin the poll that appears to be currently pinned', 'top-end');
        }
        if (this.roomClient.isEditorPinned) {
            return this.roomClient.userLog('info', 'Please unpin the editor that appears to be currently pinned', 'top-end');
        }
        this.isBreakoutPinned ? this.breakoutUnpin() : this.breakoutPin();
        this.roomClient.sound('click');
    }

    /**
     * Pins the breakout room panel.
     */
    breakoutPin() {
        if (!this.roomClient.isVideoPinned) {
            this.roomClient.videoMediaContainer.style.top = 0;
            this.roomClient.videoMediaContainer.style.width = '70%';
            this.roomClient.videoMediaContainer.style.height = '100%';
        }
        if (!this.roomClient.isMobileDevice) this.roomClient.makeUnDraggable(this.roomClient.breakoutPanel, this.roomClient.breakoutPanelHeader);
        this.breakoutPinned();
        this.isBreakoutPinned = true;
        this.roomClient.setColor(this.roomClient.breakoutTogglePin, 'lime');
        this.roomClient.resizeVideoMenuBar();
        this.roomClient.resizeVideoMedia();
    }

    /**
     * Unpins the breakout room panel.
     */
    breakoutUnpin() {
        if (!this.roomClient.isVideoPinned) {
            this.roomClient.videoMediaContainerUnpin();
        }
        this.roomClient.breakoutPanel.classList.remove('panel-slide-in');
        this.breakoutCenter();
        this.isBreakoutPinned = false;
        this.roomClient.setColor(this.roomClient.breakoutTogglePin, 'white');
        this.roomClient.resizeVideoMenuBar();
        this.roomClient.resizeVideoMedia();
        if (!this.roomClient.isMobileDevice) this.roomClient.makeDraggable(this.roomClient.breakoutPanel, this.roomClient.breakoutPanelHeader);
    }

    /**
     * Gets layout elements for the breakout room panel.
     * @returns {object} Layout elements.
     */
    getBreakoutPanelLayoutElements() {
        const body = this.roomClient.breakoutPanel.querySelector('.breakout-panel-body');
        const sections = this.roomClient.breakoutPanel.querySelectorAll('.breakout-section');

        return {
            body,
            roomsSection: sections[0],
            participantsSection: sections[1],
            roomsList: this.roomClient.breakoutPanel.querySelector('.breakout-rooms-list'),
            participantsList: this.roomClient.breakoutPanel.querySelector('.breakout-participants-list'),
        };
    }

    /**
     * Applies pinned layout styles to the breakout room panel.
     */
    breakoutPinned() {
        const { body, roomsSection, participantsSection, roomsList, participantsList } =
            this.getBreakoutPanelLayoutElements();

        this.roomClient.breakoutPanel.style.position = 'absolute';
        this.roomClient.breakoutPanel.style.top = '0';
        this.roomClient.breakoutPanel.style.right = '0';
        this.roomClient.breakoutPanel.style.left = 'auto';
        this.roomClient.breakoutPanel.style.transform = null;
        this.roomClient.breakoutPanel.style.width = '30%';
        this.roomClient.breakoutPanel.style.height = '100%';
        this.roomClient.breakoutPanel.style.maxWidth = '30%';
        this.roomClient.breakoutPanel.style.maxHeight = '100%';
        this.roomClient.breakoutPanel.style.borderRadius = '14px 0 0 14px';

        if (body) {
            body.style.maxHeight = 'calc(100vh - 55px)';
            body.style.height = 'calc(100vh - 55px)';
            body.style.display = 'grid';
            body.style.flex = '1 1 auto';
            body.style.gridTemplateRows = 'auto minmax(0, 1fr) auto minmax(0, 1fr)';
            body.style.gap = '0';
            body.style.minHeight = '0';
            body.style.overflowY = 'hidden';
            body.style.overscrollBehavior = 'contain';
            body.style.scrollbarGutter = '';
        }
        if (roomsSection) {
            roomsSection.style.display = 'flex';
            roomsSection.style.flexDirection = 'column';
            roomsSection.style.minHeight = '0';
            roomsSection.style.overflow = 'hidden';
        }
        if (roomsList) {
            roomsList.style.flex = '1 1 auto';
            roomsList.style.minHeight = '0';
            roomsList.style.maxHeight = 'none';
            roomsList.style.overflowY = 'auto';
            roomsList.style.scrollbarGutter = '';
        }
        if (participantsSection) {
            participantsSection.style.display = 'flex';
            participantsSection.style.flexDirection = 'column';
            participantsSection.style.minHeight = '0';
            participantsSection.style.overflow = 'hidden';
            participantsSection.style.flex = '1 1 auto';
            participantsSection.style.alignSelf = 'stretch';
        }
        if (participantsList) {
            participantsList.style.maxHeight = 'none';
            participantsList.style.flex = '1 1 auto';
            participantsList.style.minHeight = '0';
            participantsList.style.overflowY = 'auto';
            participantsList.style.scrollbarGutter = '';
        }
        this.roomClient.breakoutPanel.classList.remove('panel-slide-in');
        void this.roomClient.breakoutPanel.offsetWidth;
        this.roomClient.breakoutPanel.classList.add('panel-slide-in');
    }

    /**
     * Centers the breakout room panel.
     */
    breakoutCenter() {
        const { body, roomsSection, participantsSection, roomsList, participantsList } =
            this.getBreakoutPanelLayoutElements();

        this.roomClient.breakoutPanel.style.position = 'fixed';
        this.roomClient.breakoutPanel.style.transform = 'translate(-50%, -50%)';
        this.roomClient.breakoutPanel.style.top = '50%';
        this.roomClient.breakoutPanel.style.left = '50%';
        this.roomClient.breakoutPanel.style.right = '';
        this.roomClient.breakoutPanel.style.width = '420px';
        this.roomClient.breakoutPanel.style.height = '';
        this.roomClient.breakoutPanel.style.maxWidth = '95vw';
        this.roomClient.breakoutPanel.style.maxHeight = '85vh';
        this.roomClient.breakoutPanel.style.borderRadius = '16px';

        if (body) {
            body.style.maxHeight = 'calc(85vh - 55px)';
            body.style.height = '';
            body.style.display = '';
            body.style.flex = '';
            body.style.gridTemplateRows = '';
            body.style.gap = '';
            body.style.minHeight = '';
            body.style.overflowY = '';
            body.style.overscrollBehavior = '';
            body.style.scrollbarGutter = '';
        }
        if (roomsSection) {
            roomsSection.style.display = '';
            roomsSection.style.flexDirection = '';
            roomsSection.style.minHeight = '';
            roomsSection.style.overflow = '';
        }
        if (roomsList) {
            roomsList.style.flex = '';
            roomsList.style.minHeight = '';
            roomsList.style.maxHeight = '';
            roomsList.style.overflowY = '';
            roomsList.style.scrollbarGutter = '';
        }
        if (participantsSection) {
            participantsSection.style.display = '';
            participantsSection.style.flexDirection = '';
            participantsSection.style.minHeight = '';
            participantsSection.style.overflow = '';
            participantsSection.style.flex = '';
            participantsSection.style.alignSelf = '';
        }
        if (participantsList) {
            participantsList.style.maxHeight = 'none';
            participantsList.style.flex = '';
            participantsList.style.minHeight = '';
            participantsList.style.overflowY = '';
            participantsList.style.scrollbarGutter = '';
        }
        this.roomClient.breakoutPanel.classList.remove('panel-slide-in');
        void this.roomClient.breakoutPanel.offsetWidth;
        this.roomClient.breakoutPanel.classList.add('panel-slide-in');
    }
}
