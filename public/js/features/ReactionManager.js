'use strict';

/**
 * ReactionManager - Manages chat reactions and room emoji bursts in RoomClient
 */
class ReactionManager {
    /**
     * @constructor
     * @param {RoomClient} roomClient - Reference to RoomClient instance
     */
    constructor(roomClient) {
        this.roomClient = roomClient;
        this.roomEmojiBurstState = {
            startedAt: 0,
            anchorX: 0,
            anchorY: 0,
            count: 0,
        };
    }

    toggleReactionPicker(msgListId) {
        const id = msgListId.replace('msg-', '');
        const picker = document.getElementById('reaction-picker-' + id);
        if (!picker) return;
        const isVisible = picker.style.display !== 'none';
        document.querySelectorAll('.reaction-picker').forEach((p) => (p.style.display = 'none'));
        if (!isVisible) picker.style.display = 'flex';
    }

    sendChatReaction(msgListId, emoji) {
        const msgEl = document.getElementById(msgListId);
        if (!msgEl) return;
        const msgId = msgEl.getAttribute('data-msg-id') || '';
        // Determine action: toggle remove if already reacted, otherwise add
        const reactionsEl = msgEl.querySelector('.message-reactions');
        const existing = reactionsEl?.querySelector(`[data-emoji="${emoji}"]`);
        const peers = existing ? JSON.parse(existing.getAttribute('data-peers') || '[]') : [];
        const action = peers.includes(this.roomClient.peer_name) ? 'remove' : 'add';
        this.applyReactionToElement(msgEl, emoji, this.roomClient.peer_name, action);
        if (msgId) {
            this.roomClient.socket.emit('chatReaction', {
                msg_id: msgId,
                emoji: emoji,
                peer_name: this.roomClient.peer_name,
                peer_id: this.roomClient.peer_id,
                action: action,
            });
        }
        const id = msgListId.replace('msg-', '');
        const picker = document.getElementById('reaction-picker-' + id);
        if (picker) picker.style.display = 'none';
    }

    applyReactionToElement(msgEl, emoji, peerName, action = 'add') {
        const reactionsEl = msgEl.querySelector('.message-reactions');
        if (!reactionsEl) return;
        const existing = reactionsEl.querySelector(`[data-emoji="${emoji}"]`);
        if (action === 'add') {
            if (existing) {
                let peers = JSON.parse(existing.getAttribute('data-peers') || '[]');
                if (!peers.includes(peerName)) {
                    peers.push(peerName);
                    existing.setAttribute('data-peers', JSON.stringify(peers));
                    existing.querySelector('.reaction-count').textContent = peers.length;
                    existing.setAttribute('data-tooltip', peers.join(', '));
                }
                if (peerName === this.roomClient.peer_name) existing.classList.add('my-reaction');
            } else {
                const badge = document.createElement('span');
                badge.className = 'reaction-badge';
                if (peerName === this.roomClient.peer_name) badge.classList.add('my-reaction');
                badge.setAttribute('data-emoji', emoji);
                badge.setAttribute('data-peers', JSON.stringify([peerName]));
                badge.setAttribute('data-tooltip', peerName);
                badge.innerHTML = renderRoomTemplate('reactionBadgeTemplate', {
                    text: {
                        emoji,
                        countValue: '1',
                    },
                });
                badge.addEventListener('click', () => this.sendChatReaction(msgEl.id, emoji));
                reactionsEl.appendChild(badge);
            }
        } else if (action === 'remove') {
            if (existing) {
                let peers = JSON.parse(existing.getAttribute('data-peers') || '[]');
                peers = peers.filter((p) => p !== peerName);
                if (peers.length === 0) {
                    existing.remove();
                } else {
                    existing.setAttribute('data-peers', JSON.stringify(peers));
                    existing.querySelector('.reaction-count').textContent = peers.length;
                    existing.setAttribute('data-tooltip', peers.join(', '));
                    if (peerName === this.roomClient.peer_name) existing.classList.remove('my-reaction');
                }
            }
        }
    }

    handleChatReaction = (dataObject) => {
        const msg_id = filterXSS(dataObject.msg_id || '');
        const emoji = filterXSS(dataObject.emoji || '');
        const peer_name = filterXSS(dataObject.peer_name || '');
        const action = dataObject.action === 'remove' ? 'remove' : 'add';
        if (!msg_id || !emoji) return;
        const msgEl = document.querySelector(`li[data-msg-id="${CSS.escape(msg_id)}"]`);
        if (!msgEl) return;
        this.applyReactionToElement(msgEl, emoji, peer_name, action);
    };

    getRoomEmojiPlacement() {
        const viewportWidth = Math.max(window.innerWidth || 0, 320);
        const viewportHeight = Math.max(window.innerHeight || 0, 320);
        const isCompactViewport = viewportWidth < 640;
        const now = Date.now();
        const burstWindow = 900;
        const maxBurstSize = isCompactViewport ? 4 : 6;
        const marginX = isCompactViewport ? 18 : 34;
        const marginY = isCompactViewport ? 96 : 124;
        const minAnchorX = viewportWidth * 0.2;
        const maxAnchorX = viewportWidth * 0.8;
        const minAnchorY = viewportHeight * 0.42;
        const maxAnchorY = viewportHeight * 0.76;

        if (now - this.roomEmojiBurstState.startedAt > burstWindow || this.roomEmojiBurstState.count >= maxBurstSize) {
            this.roomEmojiBurstState.startedAt = now;
            this.roomEmojiBurstState.count = 0;
            this.roomEmojiBurstState.anchorX = minAnchorX + Math.random() * Math.max(1, maxAnchorX - minAnchorX);
            this.roomEmojiBurstState.anchorY = minAnchorY + Math.random() * Math.max(1, maxAnchorY - minAnchorY);
        }

        const burstIndex = this.roomEmojiBurstState.count;
        this.roomEmojiBurstState.count += 1;

        const baseAngle = -90 + (burstIndex - (maxBurstSize - 1) / 2) * (isCompactViewport ? 24 : 18);
        const jitterAngle = Math.random() * 12 - 6;
        const angle = ((baseAngle + jitterAngle) * Math.PI) / 180;
        const radius = (isCompactViewport ? 18 : 24) + burstIndex * (isCompactViewport ? 14 : 18) + Math.random() * 14;
        const left = Math.min(
            viewportWidth - marginX,
            Math.max(marginX, this.roomEmojiBurstState.anchorX + Math.cos(angle) * radius)
        );
        const top = Math.min(
            viewportHeight - marginY,
            Math.max(marginY, this.roomEmojiBurstState.anchorY + Math.sin(angle) * radius * 0.6)
        );
        const drift = `${(Math.cos(angle) * (radius * 0.95) + (Math.random() * 18 - 9)).toFixed(0)}px`;
        const rise = `-${(Math.abs(Math.sin(angle)) * 70 + Math.random() * 70 + (isCompactViewport ? 120 : 165)).toFixed(0)}px`;
        const rotation = `${(Math.random() * 16 - 8).toFixed(1)}deg`;

        return {
            left,
            top,
            drift,
            rise,
            rotation,
        };
    }

    handleRoomEmoji(cmd, duration = 5000) {
        const userEmoji = document.getElementById(`userEmoji`);
        if (userEmoji) {
            const emojiDisplay = document.createElement('div');
            const placement = this.getRoomEmojiPlacement();
            const label = cmd.peer_name || 'Guest';
            const emojiIcon = document.createElement('span');
            const emojiName = document.createElement('span');

            emojiDisplay.className = 'user-emoji-burst';
            emojiDisplay.style.left = `${placement.left}px`;
            emojiDisplay.style.top = `${placement.top}px`;
            emojiDisplay.style.setProperty('--emoji-drift', placement.drift);
            emojiDisplay.style.setProperty('--emoji-rise', placement.rise);
            emojiDisplay.style.setProperty('--emoji-rotation', placement.rotation);

            emojiIcon.className = 'user-emoji-burst__icon';
            emojiIcon.textContent = cmd.emoji;
            emojiName.className = 'user-emoji-burst__name';
            emojiName.textContent = label;

            emojiDisplay.appendChild(emojiIcon);
            emojiDisplay.appendChild(emojiName);
            userEmoji.appendChild(emojiDisplay);

            setTimeout(() => {
                emojiDisplay.remove();
            }, duration);

            this.handleEmojiSound(cmd);
        }
    }

    handleEmojiSound(cmd) {
        const path = '../sounds/emoji/';
        const ext = '.mp3';
        const force = true; // force sound play even if sound effects are disabled

        switch (cmd.shortcodes) {
            case ':+1:':
            case ':ok_hand:':
                this.roomClient.sound('ok', force, path, ext);
                break;
            case ':-1:':
                this.roomClient.sound('boo', force, path, ext);
                break;
            case ':clap:':
                this.roomClient.sound('applause', force, path, ext);
                break;
            case ':smiley:':
            case ':grinning:':
                this.roomClient.sound('smile', force, path, ext);
                break;
            case ':joy:':
                this.roomClient.sound('laughs', force, path, ext);
                break;
            case ':tada:':
                this.roomClient.sound('congrats', force, path, ext);
                break;
            case ':open_mouth:':
                this.roomClient.sound('woah', force, path, ext);
                break;
            case ':trumpet:':
                this.roomClient.sound('trombone', force, path, ext);
                break;
            case ':kissing_heart:':
                this.roomClient.sound('kiss', force, path, ext);
                break;
            case ':heart:':
            case ':hearts:':
                this.roomClient.sound('heart', force, path, ext);
                break;
            case ':rocket:':
                this.roomClient.sound('rocket', force, path, ext);
                break;
            case ':sparkles:':
            case ':star:':
            case ':star2:':
            case ':dizzy:':
                this.roomClient.sound('tinkerbell', force, path, ext);
                break;
            default:
                break;
        }
    }
}
