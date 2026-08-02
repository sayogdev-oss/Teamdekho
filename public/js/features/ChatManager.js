'use strict';

class ChatManager {
    /**
     * @param {RoomClient} roomClient
     */
    constructor(roomClient) {
        this.roomClient = roomClient;
    }

    async toggleChat(fromParticipants = false) {
        const rc = this.roomClient;
        if (!fromParticipants && !BUTTONS.main.chatButton) return;
        const chatRoom = rc.getId('chatRoom');
        chatRoom.classList.toggle('show');
        if (!rc.isChatOpen) {
            await getRoomParticipants();
            hide(chatMinButton);

            if (!rc.isMobileDevice) {
                BUTTONS.chat.chatMaxButton && show(chatMaxButton);
            }
            this.chatCenter();
            rc.sound('open');
            this.showPeerAboutAndMessages(rc.chatPeerId, rc.chatPeerName, rc.chatPeerAvatar);
        }
        isParticipantsListOpen = !isParticipantsListOpen;
        rc.isChatOpen = !rc.isChatOpen;

        if (!rc.isChatOpen) rc.isParticipantsOpen = false;
        this.syncChatToolbarButtons();
        this.updateUnreadCountBadge(rc.chatPeerId || 'all');

        if (rc.isChatPinned) this.chatUnpin();

        if (!rc.isMobileDevice && rc.isChatOpen && this.canBePinned() && isChatPinEnabled) {
            this.toggleChatPin();
        }

        resizeChatRoom();
    }

    updateChatFooterVisibility() {
        const chatFooter = document.querySelector('.chat-message');
        const peopleList = document.querySelector('#plist') || document.querySelector('.people-list');
        if (!chatFooter || !peopleList) return;
        const isFullWidth = window.innerWidth <= 600 && peopleList.offsetWidth >= window.innerWidth * 0.98;
        elemDisplay(chatFooter, !isFullWidth);
    }

    toggleShowParticipants(fromUser = false) {
        const rc = this.roomClient;
        const plist = rc.getId('plist');
        const chat = rc.getId('chat');
        plist.classList.toggle('hidden');
        const isParticipantsListHidden = !rc.isPlistOpen();

        if (!BUTTONS.main.chatButton) {
            elemDisplay(chat.id, false);
            if (isParticipantsListHidden && fromUser) {
                // User clicked X button: close the entire chat panel
                if (rc.isChatOpen) rc.toggleChat(true);
            } else if (!isParticipantsListHidden) {
                // Opening participants: show plist full-width
                plist.style.width = '100%';
                plist.style.position = rc.isMobileDevice ? 'fixed' : 'absolute';
            }
            this.updateChatFooterVisibility();
            return;
        }

        chat.style.marginLeft = isParticipantsListHidden ? 0 : '300px';
        chat.style.borderLeft = isParticipantsListHidden ? 'none' : '1px solid rgba(255, 255, 255, 0.08)';
        if (rc.isChatPinned) elemDisplay(chat.id, isParticipantsListHidden);
        if (!rc.isChatPinned) elemDisplay(chat.id, true);
        this.toggleChatHistorySize(isParticipantsListHidden && (rc.isChatPinned || rc.isChatMaximized));
        plist.style.width = rc.isChatPinned || rc.isMobileDevice ? '100%' : '300px';
        plist.style.position = rc.isMobileDevice ? 'fixed' : 'absolute';
        this.updateChatFooterVisibility();
    }

    async toggleParticipants() {
        const rc = this.roomClient;
        rc.isParticipantsOpen = !rc.isParticipantsOpen;
        this.syncChatToolbarButtons();
        if (!rc.isParticipantsOpen && rc.isChatOpen) {
            rc.toggleChat(true);
            return;
        }
        if (!rc.isChatOpen) {
            await rc.toggleChat(true);
            if (!BUTTONS.main.chatButton) {
                elemDisplay('chat', false);
            }
        }
        if ((isDesktopDevice && rc.isChatPinned) || !isDesktopDevice) {
            this.toggleShowParticipants();
        }
    }

    syncChatToolbarButtons() {
        const rc = this.roomClient;
        const participantsActive = !!rc.isParticipantsOpen && !!rc.isChatOpen;
        const chatActive = !!rc.isChatOpen && !participantsActive;

        const chatBtn = document.getElementById('chatButton');
        if (chatBtn) {
            chatBtn.classList.toggle('is-active', chatActive);
            chatBtn.setAttribute('aria-pressed', chatActive ? 'true' : 'false');
        }
        const pBtn = document.getElementById('participantsButton');
        if (pBtn) {
            pBtn.classList.toggle('is-active', participantsActive);
            pBtn.setAttribute('aria-pressed', participantsActive ? 'true' : 'false');
        }
    }

    toggleChatHistorySize(max = true) {
        const rc = this.roomClient;
        const chatHistory = rc.getId('chatHistory');
        chatHistory.style.minHeight = max ? 'calc(100vh - 270px)' : '430px';
        chatHistory.style.maxHeight = max ? 'calc(100vh - 270px)' : '430px';
    }

    toggleChatPin() {
        const rc = this.roomClient;
        if (transcription.isPin()) {
            return userLog('info', 'Please unpin the transcription that appears to be currently pinned', 'top-end');
        }
        if (rc.isPollPinned) {
            return userLog('info', 'Please unpin the poll that appears to be currently pinned', 'top-end');
        }
        if (rc.isEditorPinned) {
            return userLog('info', 'Please unpin the editor that appears to be currently pinned', 'top-end');
        }
        if (rc.isBreakoutPinned) {
            return userLog('info', 'Please unpin the breakout rooms that appears to be currently pinned', 'top-end');
        }
        rc.isChatPinned ? this.chatUnpin() : this.chatPin();
        rc.sound('click');
    }

    chatMaximize() {
        const rc = this.roomClient;
        rc.isChatMaximized = true;
        hide(chatMaxButton);
        BUTTONS.chat.chatMaxButton && show(chatMinButton);
        this.chatCenter();
        document.documentElement.style.setProperty('--msger-width', '100%');
        document.documentElement.style.setProperty('--msger-height', '100%');
        this.toggleChatHistorySize(true);
    }

    chatMinimize() {
        const rc = this.roomClient;
        rc.isChatMaximized = false;
        hide(chatMinButton);
        BUTTONS.chat.chatMaxButton && show(chatMaxButton);
        if (rc.isChatPinned) {
            this.chatPin();
        } else {
            this.chatCenter();
            document.documentElement.style.setProperty('--msger-width', '800px');
            document.documentElement.style.setProperty('--msger-height', '700px');
            this.toggleChatHistorySize(false);
        }
    }

    canBePinned() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        return viewportWidth >= 1024 && viewportHeight >= 768;
    }

    chatPin() {
        const rc = this.roomClient;
        if (!rc.isVideoPinned) {
            rc.videoMediaContainerPin();
        }
        if (chatRoom.classList.contains('container')) chatRoom.classList.remove('container');
        this.chatPinned();
        rc.isChatPinned = true;
        setColor(chatTogglePin, 'lime');
        rc.resizeVideoMenuBar();
        resizeVideoMedia();
        chatRoom.style.resize = 'none';
        if (!rc.isMobileDevice) rc.makeUnDraggable(chatRoom, chatHeader);
        if (rc.isPlistOpen()) this.toggleShowParticipants();
    }

    chatUnpin() {
        const rc = this.roomClient;
        if (!rc.isVideoPinned) {
            rc.videoMediaContainerUnpin();
        }
        chatRoom.classList.remove('panel-slide-in');
        document.documentElement.style.setProperty('--msger-width', '800px');
        document.documentElement.style.setProperty('--msger-height', '700px');
        hide(chatMinButton);
        BUTTONS.chat.chatMaxButton && show(chatMaxButton);
        this.chatCenter();
        rc.isChatPinned = false;
        setColor(chatTogglePin, 'white');
        rc.resizeVideoMenuBar();
        resizeVideoMedia();
        if (!rc.isMobileDevice) rc.makeDraggable(chatRoom, chatHeader);
        if (!rc.isPlistOpen()) this.toggleShowParticipants();
        if (!chatRoom.classList.contains('container')) chatRoom.classList.add('container');
        resizeChatRoom();
    }

    chatCenter() {
        chatRoom.style.position = 'fixed';
        chatRoom.style.transform = 'translate(-50%, -50%)';
        chatRoom.style.top = '50%';
        chatRoom.style.left = '50%';
    }

    chatPinned() {
        chatRoom.style.position = 'absolute';
        chatRoom.style.top = 0;
        chatRoom.style.right = 0;
        chatRoom.style.left = null;
        chatRoom.style.transform = null;
        document.documentElement.style.setProperty('--msger-width', '25%');
        document.documentElement.style.setProperty('--msger-height', '100%');
        chatRoom.classList.remove('panel-slide-in');
        void chatRoom.offsetWidth; // force reflow so the animation always restarts
        chatRoom.classList.add('panel-slide-in');
    }

    toggleChatEmoji() {
        const rc = this.roomClient;
        rc.getId('chatEmoji').classList.toggle('show');
        rc.isChatEmojiOpen = !rc.isChatEmojiOpen;
        rc.getId('chatEmojiButton').style.color = rc.isChatEmojiOpen ? '#FFFF00' : '#FFFFFF';
    }

    addEmojiToMsg(data) {
        msgerInput.value += data.native;
        toggleChatEmoji();
    }

    cleanMessage() {
        const rc = this.roomClient;
        chatMessage.value = '';
        chatMessage.setAttribute('rows', '1');
        const charCount = rc.getId('chatCharCount');
        if (charCount) charCount.textContent = '0 / 4000';
    }

    pasteMessage() {
        navigator.clipboard
            .readText()
            .then((text) => {
                chatMessage.value += text;
                isChatPasteTxt = true;
                this.checkLineBreaks();
            })
            .catch((err) => {
                console.error('Failed to read clipboard contents: ', err);
            });
    }

    sendMessage() {
        const rc = this.roomClient;
        if (!rc.thereAreParticipants() && !isChatGPTOn && !isDeepSeekOn && !(VideoAI.enabled && VideoAI.active)) {
            this.cleanMessage();
            isChatPasteTxt = false;
            return rc.userLog('info', 'No participants in the room', 'top-end');
        }

        // Prevent long messages
        if (rc.chatMessageLengthCheck && chatMessage.value.length > rc.chatMessageLength) {
            return rc.userLog(
                'warning',
                `The message seems too long, with a maximum of ${rc.chatMessageLength} characters allowed`,
                'top-end'
            );
        }

        // Spamming detected ban the user from the room
        if (rc.chatMessageSpamCount == rc.chatMessageSpamCountToBan) {
            return rc.roomAction('isBanned', true);
        }

        // Prevent Spam messages
        const currentTime = Date.now();
        if (chatMessage.value && currentTime - rc.chatMessageTimeLast <= rc.chatMessageTimeBetween) {
            this.cleanMessage();
            chatMessage.readOnly = true;
            chatSendButton.disabled = true;
            setTimeout(function () {
                chatMessage.readOnly = false;
                chatSendButton.disabled = false;
            }, rc.chatMessageNotifyDelay);
            rc.chatMessageSpamCount++;
            return rc.userLog(
                'warning',
                `Kindly refrain from spamming. Please wait ${rc.chatMessageNotifyDelay / 1000} seconds before sending another message`,
                'top-end',
                rc.chatMessageNotifyDelay
            );
        }
        rc.chatMessageTimeLast = currentTime;

        chatMessage.value = filterXSS(chatMessage.value.trim());
        const peer_msg = this.formatMsg(chatMessage.value);
        if (!peer_msg) {
            return this.cleanMessage();
        }
        rc.peer_name = filterXSS(rc.peer_name);

        const msg_id = `${rc.peer_id}_${Date.now()}`;
        const data = {
            room_id: rc.room_id,
            peer_name: rc.peer_name,
            peer_avatar: rc.peer_avatar,
            peer_id: rc.peer_id,
            to_peer_id: '',
            to_peer_name: '',
            peer_msg: peer_msg,
            msg_id: msg_id,
        };

        if (isChatGPTOn) {
            if (rc._moderator.chat_cant_chatgpt) {
                this.cleanMessage();
                return rc.userLog(
                    'warning',
                    'The moderator does not allow you to chat with ChatGPT',
                    'top-end',
                    6000
                );
            }
            // If VideoAI is active and ChatGPT interaction is off (toggled or disabled), speak via avatar instead
            if (VideoAI.enabled && VideoAI.active && !VideoAI.useChatGPT) {
                this.setMsgAvatar('left', rc.peer_name, rc.peer_avatar);
                this.appendMessage(
                    'left',
                    rc.leftMsgAvatar,
                    rc.peer_name,
                    rc.peer_id,
                    peer_msg,
                    'ChatGPT',
                    'ChatGPT'
                );
                this.cleanMessage();
                rc.streamingTask(peer_msg);
                return;
            }

            data.to_peer_id = 'ChatGPT';
            data.to_peer_name = 'ChatGPT';
            console.log('Send message:', data);
            rc.socket.emit('message', data);
            this.setMsgAvatar('left', rc.peer_name, rc.peer_avatar);
            this.appendMessage(
                'left',
                rc.leftMsgAvatar,
                rc.peer_name,
                rc.peer_id,
                peer_msg,
                data.to_peer_id,
                data.to_peer_name
            );
            this.cleanMessage();

            this.showAITypingIndicator('ChatGPT');

            rc.socket
                .request('getChatGPT', {
                    time: getDataTimeString(),
                    room: rc.room_id,
                    name: rc.peer_name,
                    prompt: peer_msg,
                    context: rc.chatGPTContext,
                })
                .then((completion) => {
                    this.hideAITypingIndicator('ChatGPT');
                    if (!completion) return;
                    const { message, context } = completion;
                    rc.chatGPTContext = context ? context : [];
                    console.log('Receive message:', message);
                    this.setMsgAvatar('right', 'ChatGPT');
                    this.appendMessage('right', image.chatgpt, 'ChatGPT', rc.peer_id, message, 'ChatGPT', 'ChatGPT');
                    this.cleanMessage();
                    rc.streamingTask(message); // Video AI avatar speak
                    rc.speechInMessages && !VideoAI.active
                        ? rc.speechMessage(true, 'ChatGPT', message)
                        : rc.sound('message');
                })
                .catch((err) => {
                    this.hideAITypingIndicator('ChatGPT');
                    console.log('ChatGPT error:', err);
                });
        }

        if (isDeepSeekOn) {
            if (rc._moderator.chat_cant_deep_seek) {
                this.cleanMessage();
                return rc.userLog(
                    'warning',
                    'The moderator does not allow you to chat with DeepSeek',
                    'top-end',
                    6000
                );
            }
            data.to_peer_id = 'DeepSeek';
            data.to_peer_name = 'DeepSeek';
            console.log('Send message:', data);
            rc.socket.emit('message', data);
            this.setMsgAvatar('left', rc.peer_name, rc.peer_avatar);
            this.appendMessage(
                'left',
                rc.leftMsgAvatar,
                rc.peer_name,
                rc.peer_id,
                peer_msg,
                data.to_peer_id,
                data.to_peer_name
            );
            this.cleanMessage();

            this.showAITypingIndicator('DeepSeek');

            rc.socket
                .request('getDeepSeek', {
                    time: getDataTimeString(),
                    room: rc.room_id,
                    name: rc.peer_name,
                    prompt: peer_msg,
                    context: rc.deepSeekContext,
                })
                .then((completion) => {
                    this.hideAITypingIndicator('DeepSeek');
                    if (!completion) return;
                    const { message, context } = completion;
                    rc.deepSeekContext = context ? context : [];
                    console.log('Receive message:', message);
                    this.setMsgAvatar('right', 'DeepSeek');
                    this.appendMessage(
                        'right',
                        image.deepSeek,
                        'DeepSeek',
                        rc.peer_id,
                        message,
                        'DeepSeek',
                        'DeepSeek'
                    );
                    this.cleanMessage();
                    rc.streamingTask(message);
                    rc.speechInMessages && !VideoAI.active
                        ? rc.speechMessage(true, 'DeepSeek', message)
                        : rc.sound('message');
                })
                .catch((err) => {
                    this.hideAITypingIndicator('DeepSeek');
                    console.log('DeepSeek error:', err);
                });
        }

        if (!isChatGPTOn && !isDeepSeekOn && VideoAI.enabled && VideoAI.active && rc.chatPeerId === 'ChatGPT') {
            // ChatGPT is off but LiveAvatar is active — speak the message directly via the avatar
            this.setMsgAvatar('left', rc.peer_name, rc.peer_avatar);
            this.appendMessage(
                'left',
                rc.leftMsgAvatar,
                rc.peer_name,
                rc.peer_id,
                peer_msg,
                'ChatGPT',
                'ChatGPT'
            );
            this.cleanMessage();
            rc.streamingTask(peer_msg);
            return;
        }

        if (!isChatGPTOn && !isDeepSeekOn) {
            const participantsList = rc.getId('participantsList');
            const participantsListItems = participantsList.getElementsByTagName('li');
            for (let i = 0; i < participantsListItems.length; i++) {
                const li = participantsListItems[i];
                if (li.classList.contains('active')) {
                    data.to_peer_id = li.getAttribute('data-to-id');
                    data.to_peer_name = li.getAttribute('data-to-name');

                    const isPublicMessage = data.to_peer_id === 'all';

                    if (isPublicMessage && rc._moderator.chat_cant_publicly) {
                        this.cleanMessage();
                        return rc.userLog(
                            'warning',
                            'The moderator does not allow you to chat publicly',
                            'top-end',
                            6000
                        );
                    }

                    if (!isPublicMessage && rc._moderator.chat_cant_privately) {
                        this.cleanMessage();
                        return rc.userLog(
                            'warning',
                            'The moderator does not allow you to chat privately',
                            'top-end',
                            6000
                        );
                    }

                    console.log('Send message:', data);

                    // Try DataChannel for public messages, fallback to signaling
                    if (isPublicMessage && rc.useDataChannel && rc.isChatDataChannelOpen()) {
                        const dcMsg = {
                            type: 'chat',
                            room_id: data.room_id,
                            peer_name: data.peer_name,
                            peer_avatar: data.peer_avatar,
                            peer_id: data.peer_id,
                            to_peer_id: data.to_peer_id,
                            to_peer_name: data.to_peer_name,
                            peer_msg: data.peer_msg,
                            msg_id: data.msg_id,
                            timestamp: Date.now(),
                        };
                        const sent = rc.sendChatDataChannelMessage(dcMsg);
                        if (!sent) {
                            console.warn('DataChannel send failed, falling back to signaling');
                            rc.socket.emit('message', data);
                        } else {
                            console.log('Message sent via DataChannel');
                        }
                    } else {
                        // Private messages or DataChannel unavailable: use signaling
                        rc.socket.emit('message', data);
                    }

                    this.setMsgAvatar('left', rc.peer_name, rc.peer_avatar);
                    this.appendMessage(
                        'left',
                        rc.leftMsgAvatar,
                        rc.peer_name,
                        rc.peer_id,
                        peer_msg,
                        data.to_peer_id,
                        data.to_peer_name,
                        data.msg_id
                    );
                    this.cleanMessage();
                }
            }
        }
    }

    sendMessageTo(to_peer_id, to_peer_name) {
        const rc = this.roomClient;
        if (!rc.thereAreParticipants()) {
            isChatPasteTxt = false;
            this.cleanMessage();
            return rc.userLog('info', 'No participants in the room except you', 'top-end');
        }
        // Open chat and switch to the private conversation with this peer
        rc.chatPeerId = to_peer_id;
        rc.chatPeerName = to_peer_name;
        rc.chatPeerAvatar = '';
        !rc.isChatOpen ? rc.toggleChat() : rc.showPeerAboutAndMessages(to_peer_id, to_peer_name);
    }

    async showMessage(data, toggleChat = true) {
        const rc = this.roomClient;
        const isPublicMessage = data.to_peer_id === 'all';
        const messagePeerId = isPublicMessage ? 'all' : data.peer_id;

        if (toggleChat && !rc.isChatOpen && rc.showChatOnMessage) {
            // Auto-switch to the correct tab before opening the chat panel
            if (isPublicMessage) {
                rc.chatPeerId = 'all';
                rc.chatPeerName = 'all';
                rc.chatPeerAvatar = '';
            } else {
                rc.chatPeerId = data.peer_id;
                rc.chatPeerName = data.peer_name;
                rc.chatPeerAvatar = data.peer_avatar || '';
            }
            await rc.toggleChat();
        }

        this.setMsgAvatar('right', data.peer_name, data.peer_avatar);
        this.appendMessage(
            'right',
            rc.rightMsgAvatar,
            data.peer_name,
            data.peer_id,
            data.peer_msg,
            data.to_peer_id,
            data.to_peer_name,
            data.msg_id
        );

        if (!rc.showChatOnMessage) {
            rc.userLog('info', `💬 New message from: ${data.peer_name}`, 'top-end');
        }

        if (rc.speechInMessages) {
            VideoAI.active
                ? rc.streamingTask(`New message from: ${data.peer_name}, the message is: ${data.peer_msg}`)
                : rc.speechMessage(true, data.peer_name, data.peer_msg);
        } else {
            rc.sound('message');
        }

        // Track unread count when message is not currently visible
        const isMessageVisible = rc.isChatOpen && rc.chatPeerId === messagePeerId;
        if (!isMessageVisible) {
            rc.unreadMessageCounts[messagePeerId] = (rc.unreadMessageCounts[messagePeerId] || 0) + 1;
            this.updateUnreadCountBadge(messagePeerId);
        }

        const participantsList = rc.getId('participantsList');
        const participantsListItems = participantsList.getElementsByTagName('li');
        for (let i = 0; i < participantsListItems.length; i++) {
            const li = participantsListItems[i];
            // INCOMING PUBLIC MESSAGE
            if (isPublicMessage && li.id === 'all' && !isMessageVisible) {
                li.classList.add('pulsate');
            }
            // INCOMING PRIVATE MESSAGE
            if (li.id === data.peer_id && !isPublicMessage && !isMessageVisible) {
                li.classList.add('pulsate');
                if (!['all', 'ChatGPT', 'DeepSeek'].includes(data.to_peer_id)) {
                    // unread-count badge handled by updateUnreadCountBadge
                }
            }
        }
    }

    updateUnreadCountBadge(peerId) {
        const rc = this.roomClient;
        const count = rc.unreadMessageCounts[peerId] || 0;
        try {
            const badge = rc.getId(`${peerId}-unread-count`);
            if (count > 0) {
                badge.textContent = count;
                badge.classList.remove('hidden');
            } else {
                badge.textContent = '';
                badge.classList.add('hidden');
            }
        } catch (e) {
            // Badge element may not exist yet if participants list hasn't rendered
        }
        try {
            const total = Object.values(rc.unreadMessageCounts || {}).reduce(
                (sum, n) => sum + (typeof n === 'number' ? n : 0),
                0
            );
            const toolbarBadge = document.getElementById('chatUnreadBadge');
            if (toolbarBadge) {
                if (total > 0 && !rc.isChatOpen) {
                    toolbarBadge.textContent = total > 99 ? '99+' : String(total);
                    toolbarBadge.classList.remove('hidden');
                } else {
                    toolbarBadge.textContent = '';
                    toolbarBadge.classList.add('hidden');
                }
            }
        } catch (e) {
            // ignore
        }
    }

    setMsgAvatar(avatar, peerName, peerAvatar = false) {
        const rc = this.roomClient;
        const avatarImg =
            peerAvatar && rc.isValidAvatarURL(peerAvatar)
                ? peerAvatar
                : rc.isValidEmail(peerName)
                  ? rc.genGravatar(peerName)
                  : rc.genAvatarSvg(peerName, 32);
        avatar === 'left' ? (rc.leftMsgAvatar = avatarImg) : (rc.rightMsgAvatar = avatarImg);
    }

    appendMessage(side, img, fromName, fromId, msg, toId, toName, msgId = '') {
        const rc = this.roomClient;
        const getSide = filterXSS(side);
        const getImg =
            rc.isValidAvatarURL(img) ||
            (typeof img === 'string' && img.startsWith('data:image/')) ||
            (typeof img === 'string' && (img.startsWith('../') || img.startsWith('/')))
                ? img
                : '';
        const getFromName = filterXSS(fromName);
        const getFromId = filterXSS(fromId);
        const getMsg = filterXSS(msg);
        const getToId = filterXSS(toId);
        const getToName = filterXSS(toName);
        const getMsgId = filterXSS(msgId || '');
        const time = rc.getTimeNow();

        const myMessage = getSide === 'left';
        const messageClass = myMessage ? 'my-message float-right' : 'other-message';
        const messageData = myMessage ? 'text-end' : 'text-start';
        const safeFromName = rc.sanitizeHtml(getFromName);
        const timeAndName = myMessage
            ? `<span class="message-data-time">${time}, ${safeFromName} ( me ) </span>`
            : `<span class="message-data-time">${time}, ${safeFromName} </span>`;

        const formatMessage = this.formatMsg(getMsg);
        const speechButton = rc.isSpeechSynthesisSupported
            ? `<button 
                    id="msg-speech-${chatMessagesId}" 
                    class="mr5" 
                    onclick="rc.speechElementText('message-${chatMessagesId}')">
                    ${icons.speech}
                </button>`
            : '';

        const msgAvatarTmpId = `msg-av-${chatMessagesId}`;
        const positionFirst = myMessage
            ? `${timeAndName}<img id="${msgAvatarTmpId}" alt="avatar" />`
            : `<img id="${msgAvatarTmpId}" alt="avatar" />${timeAndName}`;

        const reactionEmojis = ['👍', '❤️', '😂', '😮', '😢', '🔥'];
        const reactionButtons = reactionEmojis
            .map(
                (e) =>
                    `<span class="reaction-emoji-btn" onclick="rc.sendChatReaction('msg-${chatMessagesId}', '${e}')" role="button">${e}</span>`
            )
            .join('');

        const newMessageHTML = `
            <li id="msg-${chatMessagesId}"  
                data-from-id="${rc.sanitizeHtml(getFromId)}" 
                data-from-name="${rc.sanitizeHtml(getFromName)}"
                data-to-id="${rc.sanitizeHtml(getToId)}" 
                data-to-name="${rc.sanitizeHtml(getToName)}"
                data-msg-id="${rc.sanitizeHtml(getMsgId)}"
                class="clearfix"
            >
                <div class="message-data ${messageData}">
                    ${positionFirst}
                </div>
                <div class="message ${messageClass}">
                    <span class="text-start" id="message-${chatMessagesId}"></span>
                    <div class="message-reactions"></div>
                    <hr/>
                    <div class="about-buttons mt5">
                        <button 
                            id="msg-copy-${chatMessagesId}" 
                            class="mr5" 
                            onclick="rc.copyToClipboard('message-${chatMessagesId}')">
                            ${icons.paste}
                        </button>
                        ${speechButton}
                        <button 
                            id="msg-react-${chatMessagesId}" 
                            class="mr5" 
                            onclick="rc.toggleReactionPicker('msg-${chatMessagesId}')">
                            ${icons.smile}
                        </button>
                        <button 
                            id="msg-delete-${chatMessagesId}"   
                            class="mr5" 
                            onclick="rc.deleteMessage('msg-${chatMessagesId}')">
                            ${icons.trash}
                        </button>
                    </div>
                    <div id="reaction-picker-${chatMessagesId}" class="reaction-picker" style="display:none">
                        ${reactionButtons}
                    </div>
                </div>
            </li>
        `;

        this.collectMessages(time, getFromName, getMsg, getToId, getToName);

        console.log('Append message to:', { to_id: getToId, to_name: getToName });

        switch (getToId) {
            case 'ChatGPT':
                chatGPTMessages.insertAdjacentHTML('beforeend', newMessageHTML);
                break;
            case 'DeepSeek':
                deepSeekMessages.insertAdjacentHTML('beforeend', newMessageHTML);
                break;
            case 'all':
                chatPublicMessages.insertAdjacentHTML('beforeend', newMessageHTML);
                break;
            default:
                chatPrivateMessages.insertAdjacentHTML('beforeend', newMessageHTML);
                break;
        }

        const msgAvatarEl = document.getElementById(msgAvatarTmpId);
        if (msgAvatarEl) {
            msgAvatarEl.setAttribute('src', getImg);
            msgAvatarEl.removeAttribute('id');
        }

        const message = rc.getId(`message-${chatMessagesId}`);
        if (message) {
            if (['ChatGPT', 'DeepSeek'].includes(getFromName)) {
                // Stream the message for ChatGPT or DeepSeek
                this.streamMessage(message, getMsg, 100);
            } else {
                // Process the message for other senders
                message.innerHTML = this.processMessage(getMsg);
                hljs.highlightAll();
            }
        }

        chatHistory.scrollTop += 500;

        if (!rc.isMobileDevice) {
            rc.setTippy('msg-delete-' + chatMessagesId, 'Delete', 'top');
            rc.setTippy('msg-copy-' + chatMessagesId, 'Copy', 'top');
            rc.setTippy('msg-speech-' + chatMessagesId, 'Speech', 'top');
            rc.setTippy('msg-react-' + chatMessagesId, 'React', 'top');
        }

        chatMessagesId++;
        // Update empty chat notice after adding a message
        updateChatEmptyNotice();
    }

    showAITypingIndicator(aiName) {
        const rc = this.roomClient;
        const containerId = aiName === 'ChatGPT' ? 'chatGPTMessages' : 'deepSeekMessages';
        const container = rc.getId(containerId);
        if (!container) return;
        const existing = rc.getId(`ai-typing-${aiName}`);
        if (existing) return;
        const typingHTML = `
            <li id="ai-typing-${aiName}" class="clearfix">
                <div class="ai-typing-indicator">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </li>
        `;
        container.insertAdjacentHTML('beforeend', typingHTML);
        const chatHistory = rc.getId('chatHistory');
        if (chatHistory) chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    hideAITypingIndicator(aiName) {
        const rc = this.roomClient;
        const indicator = rc.getId(`ai-typing-${aiName}`);
        if (indicator) indicator.remove();
    }

    streamMessage(element, message, speed = 100) {
        const rc = this.roomClient;
        if (element._streamInterval) {
            clearInterval(element._streamInterval);
        }

        const safeMessage = rc.sanitizeHtml(String(message ?? ''));
        const words = safeMessage.split(' ').filter((w) => w.length > 0);

        let textBuffer = '';
        let wordIndex = 0;

        element._streamInterval = setInterval(() => {
            if (wordIndex < words.length) {
                textBuffer += words[wordIndex] + ' ';
                element.innerHTML = textBuffer.replace(/\n/g, '<br/>');
                wordIndex++;
            } else {
                clearInterval(element._streamInterval);
                element._streamInterval = null;
                element.innerHTML = this.processAIMessage(message);
                this.highlightCodeBlocks(element);
            }
        }, speed);
    }

    highlightCodeBlocks(element) {
        element.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }

    processAIMessage(message) {
        const raw = String(message ?? '');
        if (typeof marked !== 'undefined') {
            return filterXSS(marked.parse(raw));
        }
        return filterXSS(raw).replace(/\n/g, '<br/>');
    }

    processMessage(message) {
        const codeBlockRegex = /```([a-zA-Z0-9]+)?\n([\s\S]*?)```/g;
        let parts = [];
        let lastIndex = 0;

        message.replace(codeBlockRegex, (match, lang, code, offset) => {
            if (offset > lastIndex) {
                parts.push({ type: 'text', value: message.slice(lastIndex, offset) });
            }
            parts.push({ type: 'code', lang, value: code });
            lastIndex = offset + match.length;
        });

        if (lastIndex < message.length) {
            parts.push({ type: 'text', value: message.slice(lastIndex) });
        }

        return parts
            .map((part) => {
                if (part.type === 'text') {
                    return part.value;
                } else if (part.type === 'code') {
                    return `<pre><code class="language-${part.lang || ''}">${part.value}</code></pre>`;
                }
            })
            .join('');
    }

    deleteMessage(id) {
        const rc = this.roomClient;
        Swal.fire({
            background: swalBackground,
            position: 'top',
            title: 'Delete this Message?',
            imageUrl: image.delete,
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) {
                rc.getId(id).remove();
                rc.sound('delete');
                updateChatEmptyNotice();
            }
        });
    }

    copyToClipboard(id) {
        const rc = this.roomClient;
        const text = rc.getId(id).innerText;
        navigator.clipboard
            .writeText(text)
            .then(() => {
                rc.userLog('success', 'Message copied!', 'top-end', 1000);
            })
            .catch((err) => {
                rc.userLog('error', err, 'top-end', 6000);
            });
    }

    formatMsg(msg) {
        const rc = this.roomClient;
        const message = filterXSS(msg);
        if (message.trim().length == 0) return;
        if (this.isHtml(message)) return rc.sanitizeHtml(message);
        if (this.isValidHttpURL(message)) {
            if (this.isImageURL(message)) return this.getImage(message);
            return this.getLink(message);
        }
        if (isChatMarkdownOn) return marked.parse(message);
        if (isChatPasteTxt && this.getLineBreaks(message) > 1) {
            isChatPasteTxt = false;
            return this.getPre(message);
        }
        if (this.getLineBreaks(message) > 1) return this.getPre(message);
        console.log('FormatMsg', message);
        return message;
    }

    sanitizeHtml(input) {
        const map = {
            '&': '&',
            '<': '<',
            '>': '>',
            '"': '"',
            "'": '&#039;',
            '/': '&#x2F;',
            '`': '&#96;',
            '=': '&#61;',
        };
        return input.replace(/[&<>"'/`=]/g, (m) => map[m]);
    }

    isHtml(str) {
        const a = document.createElement('div');
        a.innerHTML = str;
        for (var c = a.childNodes, i = c.length; i--; ) {
            if (c[i].nodeType == 1) return true;
        }
        return false;
    }

    isValidHttpURL(input) {
        try {
            new URL(input);
            return true;
        } catch (_) {
            return false;
        }
    }

    isValidAvatarURL(url) {
        if (!url || typeof url !== 'string') return false;
        try {
            const parsed = new URL(url);
            return parsed.protocol === 'http:' || parsed.protocol === 'https:';
        } catch {
            return false;
        }
    }

    isImageURL(input) {
        if (!input || typeof input !== 'string') return false;
        try {
            const url = new URL(input);
            return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff', '.svg'].some((ext) =>
                url.pathname.toLowerCase().endsWith(ext)
            );
        } catch (e) {
            return false;
        }
    }

    getImage(input) {
        const url = filterXSS(input);
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.setAttribute('src', url);
        img.setAttribute('width', '200px');
        img.setAttribute('height', 'auto');
        div.appendChild(img);
        console.log('GetImg', div.firstChild.outerHTML);
        return div.firstChild.outerHTML;
    }

    getLink(input) {
        const url = filterXSS(input);
        const a = document.createElement('a');
        const div = document.createElement('div');
        const linkText = document.createTextNode(url);
        a.setAttribute('href', url);
        a.setAttribute('target', '_blank');
        a.appendChild(linkText);
        div.appendChild(a);
        console.log('GetLink', div.firstChild.outerHTML);
        return div.firstChild.outerHTML;
    }

    getPre(input) {
        const text = filterXSS(input);
        const pre = document.createElement('pre');
        const div = document.createElement('div');
        pre.textContent = text;
        div.appendChild(pre);
        console.log('GetPre', div.firstChild.outerHTML);
        return div.firstChild.outerHTML;
    }

    getIframe(input) {
        const rc = this.roomClient;
        const url = filterXSS(input);
        const iframe = document.createElement('iframe');
        const div = document.createElement('div');
        const is_youtube = rc.getVideoType(url) == 'na' ? true : false;
        const video_audio_url = is_youtube ? rc.getYoutubeEmbed(url) : url;
        iframe.setAttribute('title', 'Chat-IFrame');
        iframe.setAttribute('src', video_audio_url);
        iframe.setAttribute('width', 'auto');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute(
            'allow',
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        );
        iframe.setAttribute('allowfullscreen', 'allowfullscreen');
        div.appendChild(iframe);
        console.log('GetIFrame', div.firstChild.outerHTML);
        return div.firstChild.outerHTML;
    }

    getLineBreaks(message) {
        return (message.match(/\n/g) || []).length;
    }

    checkLineBreaks() {
        chatMessage.style.height = '';
        if (this.getLineBreaks(chatMessage.value) > 0 || chatMessage.value.length > 50) {
            chatMessage.setAttribute('rows', '2');
        }
    }

    collectMessages(time, from, msg, toId = 'all', toName = 'all') {
        const rc = this.roomClient;
        rc.chatMessages.push({
            time: time,
            from: from,
            msg: msg,
            toId: toId,
            toName: toName,
        });
    }

    speechMessage(newMsg = true, from, msg) {
        const rc = this.roomClient;
        if (rc._ttsQueue.length >= rc.TTS_QUEUE_MAX_LENGTH) {
            console.warn('[speechMessage] TTS queue full, dropping message from', from);
            return;
        }

        rc._ttsQueue.push({ newMsg, from, msg });
        console.log('[speechMessage] Queued message. Queue length:', rc._ttsQueue.length);

        if (!rc._isSpeaking) {
            this._processTtsQueue();
        }
    }

    _processTtsQueue() {
        const rc = this.roomClient;
        if (rc._ttsQueue.length === 0) {
            rc._isSpeaking = false;
            return;
        }

        rc._isSpeaking = true;
        const { newMsg, from, msg } = rc._ttsQueue.shift();
        console.log('[speechMessage] Speaking message from', from, '. Queue remaining:', rc._ttsQueue.length);

        const speech = new SpeechSynthesisUtterance();
        speech.text = (newMsg ? 'New' : '') + ' message from:' + from + '. The message is:' + msg;
        speech.rate = 0.9;

        speech.onend = () => {
            console.log('[speechMessage] Finished speaking message from', from);
            this._processTtsQueue();
        };

        speech.onerror = (event) => {
            console.error('[speechMessage] Speech error:', event);
            this._processTtsQueue();
        };

        window.speechSynthesis.speak(speech);
    }

    speechElementText(elemId) {
        const rc = this.roomClient;
        const element = rc.getId(elemId);
        if (!element) {
            console.warn(`[speechElementText] Element with ID ${elemId} not found.`);
            return;
        }
        window.speechSynthesis.cancel();
        this.speechText(element.innerText);
    }

    speechText(msg) {
        const rc = this.roomClient;
        if (VideoAI.active) {
            rc.streamingTask(msg);
        } else {
            rc._ttsQueue = [];
            rc._isSpeaking = false;
            
            window.speechSynthesis.cancel();
            const speech = new SpeechSynthesisUtterance();
            speech.text = msg;
            speech.rate = 0.9;
            window.speechSynthesis.speak(speech);
        }
    }

    chatToggleBg() {
        const rc = this.roomClient;
        rc.isChatBgTransparent = !rc.isChatBgTransparent;
        const chatContainer = document.querySelector('.chat-container');
        if (rc.isChatBgTransparent) {
            document.documentElement.style.setProperty('--msger-bg', 'rgba(0, 0, 0, 0.200)');
            if (chatContainer) {
                chatContainer.style.backdropFilter = 'blur(12px)';
                chatContainer.style.webkitBackdropFilter = 'blur(12px)';
            }
        } else {
            setTheme();
            if (chatContainer) {
                chatContainer.style.backdropFilter = 'none';
                chatContainer.style.webkitBackdropFilter = 'none';
            }
        }
    }

    chatClean() {
        const rc = this.roomClient;
        if (rc.chatMessages.length === 0) {
            return userLog('info', 'No chat messages to clean', 'top-end');
        }
        Swal.fire({
            background: swalBackground,
            position: 'top',
            title: 'Clean up all chat Messages?',
            imageUrl: image.delete,
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) {
                function removeAllChildNodes(parentNode) {
                    while (parentNode.firstChild) {
                        parentNode.removeChild(parentNode.firstChild);
                    }
                }
                removeAllChildNodes(chatGPTMessages);
                removeAllChildNodes(deepSeekMessages);
                removeAllChildNodes(chatPublicMessages);
                removeAllChildNodes(chatPrivateMessages);
                rc.chatMessages = [];
                rc.chatGPTContext = [];
                rc.deepSeekContext = [];
                updateChatEmptyNotice();
                rc.sound('delete');
            }
        });
    }

    chatSave() {
        const rc = this.roomClient;
        if (rc.chatMessages.length === 0) {
            return userLog('info', 'No chat messages to save', 'top-end');
        }
        const grouped = {
            room: rc.room_id,
            public: [],
            chatGPT: [],
            deepSeek: [],
            private: {},
        };
        for (const msg of rc.chatMessages) {
            const entry = { time: msg.time, from: msg.from, msg: msg.msg };
            switch (msg.toId) {
                case 'all':
                    grouped.public.push(entry);
                    break;
                case 'ChatGPT':
                    grouped.chatGPT.push(entry);
                    break;
                case 'DeepSeek':
                    grouped.deepSeek.push(entry);
                    break;
                default:
                    const name = msg.toName || msg.toId;
                    if (!grouped.private[name]) grouped.private[name] = [];
                    grouped.private[name].push(entry);
                    break;
            }
        }
        if (grouped.public.length === 0) delete grouped.public;
        if (grouped.chatGPT.length === 0) delete grouped.chatGPT;
        if (grouped.deepSeek.length === 0) delete grouped.deepSeek;
        if (Object.keys(grouped.private).length === 0) delete grouped.private;
        saveObjToJsonFile(grouped, 'CHAT');
    }

    handleMessage(data) {
        const rc = this.roomClient;
        console.log('SocketOn New message:', data);
        const isPublicMessage = data.to_peer_id === 'all';
        const isAIMessage = ['ChatGPT', 'DeepSeek'].includes(data.to_peer_id);
        if (!isAIMessage) {
            if (isPublicMessage && rc._moderator.chat_cant_publicly) {
                console.warn('Dropping public message: disabled by moderator', data);
                return;
            }
            if (!isPublicMessage && rc._moderator.chat_cant_privately) {
                console.warn('Dropping private message: disabled by moderator', data);
                return;
            }
        }
        this.showMessage(data);
    }
}
