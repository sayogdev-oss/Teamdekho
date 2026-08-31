'use strict';

class LobbyManager {
    /**
     * @param {RoomClient} roomClient
     */
    constructor(roomClient) {
        this.roomClient = roomClient;
    }

    async roomPassword(data) {
        switch (data.password) {
            case 'OK':
                this.roomClient.RoomPasswordValid = true;
                await this.roomClient.joinAllowed(data.room);
                break;
            case 'KO':
                this.roomClient.RoomPasswordValid = false;
                this.roomIsLocked();
                break;
            default:
                break;
        }
    }

    async roomLobby(data) {
        console.log('LOBBY--->', data);
        switch (data.lobby_status) {
            case 'waiting':
                if (!isRulesActive || isPresenter) {
                    const { peer_id, peer_name, peer_avatar } = data;
                    this.lobbyAddPear({ peer_id, peer_name, peer_avatar });
                    this.roomClient.userLog('info', peer_name + ' wants to join the meeting', 'top-end');
                }
                break;
            case 'accept':
                if (this.lobbyRemovePearForPresenter(data)) {
                    return;
                }
                this.roomClient.RoomLobbyAccepted = true;
                await this.roomClient.joinAllowed(data.room);
                bottomButtons.style.display = 'flex';
                this.showLobbyDecision('accept');
                break;
            case 'reject':
                if (this.lobbyRemovePearForPresenter(data)) {
                    return;
                }
                this.roomClient.RoomLobbyAccepted = false;
                this.showLobbyDecision('reject');
                break;
            default:
                break;
        }
    }

    lobbyRemovePearForPresenter(data) {
        const peers_id = data.peers_id?.length > 0 ? data.peers_id : [data.peer_id];

        // This current pear is in lobby accept request
        // It means that most probably we this pear is eaitin in lobby right now
        // so no need to update lobby list UI modal since there is no one
        if (peers_id.includes(this.roomClient.peer_id)) {
            return false;
        }

        for (const peer_id of peers_id) {
            this.lobbyRemovePear(peer_id);
        }
        return true;
    }

    lobbyAction(id, lobby_status) {
        const words = id.split('___');
        const peer_name = words[0];
        const peer_id = words[1];
        const data = {
            room_id: this.roomClient.room_id,
            peer_id: peer_id,
            peer_name: peer_name,
            lobby_status: lobby_status,
            broadcast: true,
        };
        this.roomClient.socket.emit('roomLobby', data);
        this.lobbyRemovePear(peer_id);
    }

    lobbyAcceptAll() {
        const lobbyPearsIds = this.lobbyGetPeerIds();
        console.log('lobbyAcceptAll', lobbyPearsIds, lobbyPearsIds.length);
        if (lobbyPearsIds.length > 0) {
            const data = this.lobbyGetData('accept', lobbyPearsIds);
            this.roomClient.socket.emit('roomLobby', data);
            this.lobbyRemoveAll();
        } else {
            this.roomClient.userLog('info', 'No participants in lobby detected', 'top-end');
        }
    }

    lobbyRejectAll() {
        const lobbyPearsIds = this.lobbyGetPeerIds();
        if (lobbyPearsIds.length > 0) {
            const data = this.lobbyGetData('reject', lobbyPearsIds);
            this.roomClient.socket.emit('roomLobby', data);
            this.lobbyRemoveAll();
        } else {
            this.roomClient.userLog('info', 'No participants in lobby detected', 'top-end');
        }
    }

    lobbyRemoveAll() {
        this.roomClient.lobbyPears = {};
        this.lobbyRefreshUi();
    }

    lobbyRemoveMe(peer_id) {
        this.lobbyRemovePear(peer_id);
    }

    lobbyAddPear(data) {
        this.roomClient.lobbyPears[data.peer_id] = data;
        this.lobbyRefreshUi();
    }

    lobbyRemovePear(peer_id) {
        delete this.roomClient.lobbyPears[peer_id];
        this.lobbyRefreshUi();
    }

    lobbyRefreshUi() {
        let lobbyTr = this.roomClient.getId('lobbyTbTemplate').innerHTML;
        const lobbyTb = this.roomClient.getId('lobbyTb');

        for (const peer_id of Object.keys(this.roomClient.lobbyPears)) {
            const { peer_name, peer_avatar } = this.roomClient.lobbyPears[peer_id];
            // Security: escape for HTML attribute/text contexts (filterXSS does not encode quotes).
            const displayName = this.roomClient.sanitizeHtml(peer_name);
            const safePeerId = this.roomClient.sanitizeHtml(peer_id);

            const avatarImg =
                peer_avatar && this.roomClient.isValidAvatarURL(peer_avatar)
                    ? peer_avatar
                    : this.roomClient.isValidEmail(peer_name)
                      ? this.roomClient.genGravatar(peer_name, 32)
                      : this.roomClient.genAvatarSvg(peer_name, 32);

            const lobbyAcceptId = `${displayName}___${safePeerId}___lobbyAccept`;
            const lobbyRejectId = `${displayName}___${safePeerId}___lobbyReject`;

            lobbyTr += `
            <tr id='${safePeerId}' class='lobby-row'>
                <td class='lobby-cell lobby-cell--avatar'>
                    <img class='lobby-avatar-img' src="${avatarImg}" alt="${displayName}" />
                </td>
                <td class='lobby-cell lobby-cell--user'>
                    <div class='lobby-user-meta'>
                        <span class='lobby-user-name'>${displayName}</span>
                        <span class='lobby-user-status'>Waiting in lobby</span>
                    </div>
                </td>
                <td class='lobby-cell lobby-cell--action'>
                    <button
                        id='${lobbyAcceptId}'
                        class='lobby-action-btn lobby-action-btn--accept'
                        onclick="rc.lobbyAction(this.id, 'accept')"
                        aria-label='Accept ${displayName}'
                    >${_PEER.acceptPeer}</button>
                </td>
                <td class='lobby-cell lobby-cell--action'>
                    <button
                        id='${lobbyRejectId}'
                        class='lobby-action-btn lobby-action-btn--reject'
                        onclick="rc.lobbyAction(this.id, 'reject')"
                        aria-label='Reject ${displayName}'
                    >${icons.times}</button>
                </td>
            </tr>
            `;

            if (!this.roomClient.isMobileDevice) {
                setTippy(lobbyAcceptId, 'Accept', 'top');
                setTippy(lobbyRejectId, 'Reject', 'top');
            }
        }
        lobbyTb.innerHTML = lobbyTr;
        lobbyHeaderTitle.innerText = 'Lobby users (' + this.lobbyParticipantsCount() + ')';
        this.lobbyToggle();
    }

    lobbyParticipantsCount() {
        return Object.keys(this.roomClient.lobbyPears).length;
    }

    lobbyGetPeerIds() {
        return Object.keys(this.roomClient.lobbyPears);
    }

    lobbyGetData(status, peers_id = []) {
        return {
            room_id: this.roomClient.room_id,
            peer_id: this.roomClient.peer_id,
            peer_name: this.roomClient.peer_name,
            peers_id: peers_id,
            lobby_status: status,
            broadcast: true,
        };
    }

    lobbyToggle() {
        const isAllowed = !isRulesActive || isPresenter;
        if (this.lobbyParticipantsCount() > 0 && isAllowed) {
            lobby.style.display = 'block';
            lobby.style.top = '50%';
            lobby.style.left = '50%';
            if (this.roomClient.isMobileDevice) {
                lobby.style.width = '100%';
                lobby.style.height = '100%';
            }
            this.roomClient.sound('lobby');
        } else {
            lobby.style.display = 'none';
        }
    }

    roomInvalid() {
        this.roomClient.sound('alert');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: swalBackground,
            imageUrl: image.forbidden,
            title: 'Oops, Room not valid',
            text: 'Invalid Room name! Path traversal pattern detected!',
            confirmButtonText: `OK`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then(() => {
            openURL(`/`);
        });
    }

    userRoomNotAllowed() {
        this.roomClient.sound('alert');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: swalBackground,
            imageUrl: image.forbidden,
            title: 'Oops, Room not allowed',
            text: 'This room is not allowed for this user',
            confirmButtonText: `OK`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then(() => {
            openURL(`/`); // Select the new allowed room name for this user and login to join
        });
    }

    userUnauthorized() {
        this.roomClient.sound('alert');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: swalBackground,
            imageUrl: image.forbidden,
            title: 'Oops, Unauthorized',
            text: 'The host has user authentication enabled',
            confirmButtonText: `Login`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then(() => {
            // Login required to join room
            endRoomSession();
            openURL(`/login/?room=${this.roomClient.room_id}`);
        });
    }

    unlockTheRoom() {
        if (room_password) {
            this.roomClient.RoomPassword = room_password;
            let data = {
                action: 'checkPassword',
                password: this.roomClient.RoomPassword,
            };
            this.roomClient.socket.emit('roomAction', data);
        } else {
            Swal.fire({
                allowOutsideClick: false,
                allowEscapeKey: false,
                background: swalBackground,
                imageUrl: image.locked,
                title: 'Oops, Room is Locked',
                input: 'text',
                inputPlaceholder: 'Enter the Room password',
                confirmButtonText: `OK`,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                inputValidator: (pwd) => {
                    if (!pwd) return 'Please enter the Room password';
                    this.roomClient.RoomPassword = pwd;
                },
            }).then(() => {
                let data = {
                    action: 'checkPassword',
                    password: this.roomClient.RoomPassword,
                };
                this.roomClient.socket.emit('roomAction', data);
            });
        }
    }

    roomIsLocked() {
        this.roomClient.sound('eject');
        this.roomClient.event(_EVENTS.roomLock);
        console.log('Room is Locked, try with another one');
        Swal.fire({
            allowOutsideClick: false,
            background: swalBackground,
            position: 'center',
            imageUrl: image.locked,
            title: 'Oops, Wrong Room Password',
            text: 'The room is locked, try with another one.',
            showDenyButton: false,
            confirmButtonText: `Ok`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) this.roomClient.exit();
        });
    }

    presenterNotInRoom() {
        this.roomClient.sound('lobby');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            showDenyButton: true,
            showConfirmButton: false,
            background: swalBackground,
            icon: 'warning',
            title: 'Lobby enabled and no presenter available',
            text: 'A presenter is required to start the meeting. Please try joining again later.',
            denyButtonText: `Leave room`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            timer: 6000,
            timerProgressBar: true,
        }).then(() => {
            this.roomClient.exit();
        });
    }

    waitJoinConfirm() {
        this.roomClient.sound('lobby');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            showDenyButton: true,
            showConfirmButton: false,
            background: swalBackground,
            title: 'Room has lobby enabled',
            html: renderRoomTemplate('popupLobbyWaitJoinTemplate'),
            confirmButtonText: `Ok`,
            denyButtonText: `Leave room`,
            customClass: {
                popup: 'lobby-join-popup',
                htmlContainer: 'lobby-join-popup-html',
                denyButton: 'lobby-join-popup-deny',
            },
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            result.isConfirmed ? (bottomButtons.style.display = 'none') : this.roomClient.exit();
        });
    }

    showLobbyDecision(status) {
        const isAccepted = status === 'accept';

        if (isAccepted) {
            Swal.fire({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 2800,
                timerProgressBar: true,
                background: swalBackground,
                html: renderRoomTemplate('popupLobbyAcceptTemplate'),
                customClass: {
                    popup: 'lobby-join-toast lobby-join-toast--accept',
                    htmlContainer: 'lobby-join-toast-html',
                },
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            });
            return;
        }

        this.roomClient.sound('eject');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: true,
            showDenyButton: false,
            showConfirmButton: true,
            background: swalBackground,
            title: 'Request declined',
            html: renderRoomTemplate('popupLobbyRejectTemplate'),
            confirmButtonText: `Leave room`,
            customClass: {
                popup: 'lobby-join-popup lobby-join-popup--reject',
                htmlContainer: 'lobby-join-popup-html lobby-join-outcome-html',
                confirmButton: 'lobby-join-popup-confirm lobby-join-popup-confirm--reject',
            },
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) {
                this.roomClient.exit();
            }
        });
    }

    isBanned() {
        this.roomClient.sound('alert');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            showDenyButton: false,
            showConfirmButton: true,
            background: swalBackground,
            imageUrl: image.forbidden,
            title: 'Banned',
            text: 'You are banned from this room!',
            confirmButtonText: `Ok`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then(() => {
            this.roomClient.exit();
        });
    }
}
window.LobbyManager = LobbyManager;
