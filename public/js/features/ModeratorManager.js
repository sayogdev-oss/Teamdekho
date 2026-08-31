'use strict';

class ModeratorManager {
    constructor(roomClient) {
        this.roomClient = roomClient;
    }

    toggleCoHost(peerId) {
        const rc = this.roomClient;
        const peerData = rc.peers && rc.peers.get(peerId);
        const isCurrentlyCoHost = peerData?.peer_info?.peer_cohost || false;
        if (isCurrentlyCoHost) {
            rc.socket.emit('removeCoHost', { peerId });
        } else {
            rc.socket.emit('makeCoHost', { peerId });
        }
    }

    peerGuestNotAllowed(action) {
        const rc = this.roomClient;
        console.log('peerGuestNotAllowed', action);
        switch (action) {
            case 'audio':
                rc.userLog('warning', 'Only the presenter or co-host can mute/unmute participants', 'top-end');
                break;
            case 'video':
                rc.userLog('warning', 'Only the presenter or co-host can hide/show participants', 'top-end');
                break;
            case 'screen':
                rc.userLog('warning', 'Only the presenter or co-host can start/stop the screen of participants', 'top-end');
                break;
            default:
                break;
        }
    }

    // ####################################################
    // SEARCH PEER FILTER
    // ####################################################

    searchPeer() {
        const rc = this.roomClient;
        const searchParticipantsFromList = rc.getId('searchParticipantsFromList');
        const searchFilter = (searchParticipantsFromList?.value || '').toUpperCase();
        const participantsList = rc.getId('participantsList');
        const participantsListItems = Array.from(participantsList?.children || []).filter(
            (item) => item.tagName === 'LI'
        );

        for (const li of participantsListItems) {
            const participantName = (
                li.getAttribute('data-to-name') ||
                li.querySelector('.name')?.textContent ||
                ''
            ).toUpperCase();
            const shouldDisplay = participantName.includes(searchFilter);
            li.style.display = shouldDisplay ? '' : 'none';
        }
    }

    // ####################################################
    // FILTER PEER WITH RAISE HAND
    // ####################################################

    toggleRaiseHands() {
        const rc = this.roomClient;
        const participantsList = rc.getId('participantsList');
        const participantsListItems = participantsList.getElementsByTagName('li');

        for (let i = 0; i < participantsListItems.length; i++) {
            const li = participantsListItems[i];
            const hasPulsateClass = li.querySelector('i.pulsate') !== null;
            const shouldDisplay = (hasPulsateClass && !rc.isToggleRaiseHand) || rc.isToggleRaiseHand;
            li.style.display = shouldDisplay ? '' : 'none';
        }
        rc.isToggleRaiseHand = !rc.isToggleRaiseHand;
        setColor(participantsRaiseHandBtn, rc.isToggleRaiseHand ? '#FFD700' : 'white');
    }

    // ####################################################
    // FILTER PEER WITH UNREAD MESSAGES
    // ####################################################

    toggleUnreadMsg() {
        const rc = this.roomClient;
        const participantsList = rc.getId('participantsList');
        const participantsListItems = participantsList.getElementsByTagName('li');

        for (let i = 0; i < participantsListItems.length; i++) {
            const li = participantsListItems[i];
            const shouldDisplay =
                (li.classList.contains('pulsate') && !rc.isToggleUnreadMsg) || rc.isToggleUnreadMsg;
            li.style.display = shouldDisplay ? '' : 'none';
        }
        rc.isToggleUnreadMsg = !rc.isToggleUnreadMsg;
        setColor(participantsUnreadMessagesBtn, rc.isToggleUnreadMsg ? 'lime' : 'white');
    }

    // ####################################################
    // UPDATE ROOM MODERATOR
    // ####################################################

    updateRoomModerator(data) {
        const rc = this.roomClient;
        if (!isRulesActive || isPresenter) {
            const moderator = this.getModeratorData(data);
            rc.socket.emit('updateRoomModerator', moderator);
        }
    }

    updateRoomModeratorALL(data) {
        const rc = this.roomClient;
        if (!isRulesActive || isPresenter) {
            const moderator = this.getModeratorData(data);
            rc.socket.emit('updateRoomModeratorALL', moderator);
        }
    }

    getModeratorData(data) {
        const rc = this.roomClient;
        return {
            peer_name: rc.peer_name,
            peer_uuid: rc.peer_uuid,
            moderator: data,
        };
    }

    handleUpdateRoomModerator(data) {
        const rc = this.roomClient;
        switch (data.type) {
            case 'audio_cant_unmute':
                rc._moderator.audio_cant_unmute = data.status;
                rc._moderator.audio_cant_unmute ? hide(tabAudioDevicesBtn) : show(tabAudioDevicesBtn);
                rc.roomMessage('audio_cant_unmute', data.status);
                break;
            case 'video_cant_unhide':
                rc._moderator.video_cant_unhide = data.status;
                rc._moderator.video_cant_unhide ? hide(tabVideoDevicesBtn) : show(tabVideoDevicesBtn);
                rc.roomMessage('video_cant_unhide', data.status);
                break;
            case 'screen_cant_share':
                rc._moderator.screen_cant_share = data.status;
                rc.roomMessage('screen_cant_share', data.status);
                break;
            case 'chat_cant_privately':
                rc._moderator.chat_cant_privately = data.status;
                rc.roomMessage('chat_cant_privately', data.status);
                break;
            case 'chat_cant_publicly':
                rc._moderator.chat_cant_publicly = data.status;
                rc.roomMessage('chat_cant_publicly', data.status);
                break;
            case 'chat_cant_chatgpt':
                rc._moderator.chat_cant_chatgpt = data.status;
                rc.roomMessage('chat_cant_chatgpt', data.status);
                break;
            case 'media_cant_sharing':
                rc._moderator.media_cant_sharing = data.status;
                rc.roomMessage('media_cant_sharing', data.status);
                break;
            case 'polls_cant_create':
                rc._moderator.polls_cant_create = data.status;
                rc.roomMessage('polls_cant_create', data.status);
                break;
            default:
                break;
        }
    }

    handleUpdateRoomModeratorALL(data) {
        const rc = this.roomClient;
        rc._moderator = data;
        console.log('Update Room Moderator data all', rc._moderator);
    }

    getModerator() {
        const rc = this.roomClient;
        console.log('Get Moderator', rc._moderator);
        return rc._moderator;
    }

    // ####################################################
    // EJECT ALL ON LEAVE ROOM
    // ####################################################

    ejectAllOnLeave() {
        const rc = this.roomClient;
        const cmd = {
            type: 'ejectAll',
            peer_name: rc.peer_name,
            peer_uuid: rc.peer_uuid,
            broadcast: true,
        };
        rc.emitCmd(cmd);
    }
}
window.ModeratorManager = ModeratorManager;