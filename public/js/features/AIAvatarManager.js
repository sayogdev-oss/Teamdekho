'use strict';

/**
 * AIAvatarManager - AI Live Video Avatar Feature Manager for TeamDekho
 * @license AGPLv3
 */

class AIAvatarManager {
    constructor(roomClient) {
        this.roomClient = roomClient;
        if (!window.VideoAI) {
            window.VideoAI = {
                enabled: true,
                active: false,
                useChatGPT: true,
                useDeepSeek: false,
                info: {},
                avatarId: null,
                avatarName: '',
                avatarVoice: null,
                quality: 'medium',
                sessionTimeLimit: 300,
                sessionCountdown: null,
                avatarProducers: [],
                shareToRoom: false,
                mediaParticipantIdentity: null,
                muteAvatarAudio: false,
            };
        }
    }

    getAvatarList() {
        const rc = this.roomClient;
        rc.socket
            .request('getAvatarList')
            .then(function (completion) {
                const avatarVideoAIPreview = document.getElementById('avatarVideoAIPreview');
                const avatarVideoAISpinner = document.getElementById('avatarVideoAISpinner');
                const avatarVideoAIcontainer = document.getElementById('avatarVideoAIcontainer');
                const avatarVideoAICount = document.getElementById('avatarVideoAICount');
                const avatarVideoAISelectedName = document.getElementById('avatarVideoAISelectedName');
                const avatarSearchInput = document.getElementById('avatarSearchInput');
                if (!avatarVideoAIcontainer) return;
                avatarVideoAIcontainer.innerHTML = '';

                const avatars = completion?.response?.avatars || [];
                let firstPreviewSet = false;

                avatarVideoAICount.innerText = `Avatars: ${avatars.length}`;

                function selectAvatar(avatar, card) {
                    document.querySelectorAll('.avatarCard').forEach((c) => c.classList.remove('selected'));
                    card.classList.add('selected');
                    window.VideoAI.avatarId = avatar.avatar_id;
                    window.VideoAI.avatarName = avatar.avatar_name;
                    if (avatarVideoAIPreview) {
                        avatarVideoAIPreview.src = avatar.preview_image_url;
                        avatarVideoAIPreview.alt = avatar.avatar_name;
                        avatarVideoAIPreview.onload = () => {
                            if (avatarVideoAISpinner) avatarVideoAISpinner.style.display = 'none';
                            avatarVideoAIPreview.classList.remove('hidden');
                        };
                    }
                    if (avatarVideoAISelectedName) {
                        avatarVideoAISelectedName.textContent = avatar.avatar_name;
                    }
                }

                avatars.forEach((avatar) => {
                    const div = document.createElement('div');
                    div.className = 'avatarCard';
                    div.dataset.name = avatar.avatar_name.toLowerCase();
                    div.title = avatar.avatar_name;
                    const img = document.createElement('img');
                    const label = document.createElement('label');
                    label.className = 'avatarLabel';
                    label.textContent = avatar.avatar_name;
                    img.setAttribute('id', avatar.avatar_id);
                    img.setAttribute('class', 'avatarImg');
                    img.setAttribute('src', avatar.preview_image_url);
                    img.setAttribute('alt', avatar.avatar_name);
                    img.setAttribute('loading', 'lazy');
                    div.onclick = () => selectAvatar(avatar, div);
                    div.append(img);
                    div.append(label);
                    avatarVideoAIcontainer.append(div);

                    if (!firstPreviewSet && avatar.preview_image_url) {
                        selectAvatar(avatar, div);
                        firstPreviewSet = true;
                    }
                });

                if (avatarSearchInput) {
                    avatarSearchInput.value = '';
                    avatarSearchInput.oninput = () => {
                        const query = avatarSearchInput.value.toLowerCase().trim();
                        const cards = avatarVideoAIcontainer.querySelectorAll('.avatarCard');
                        let visible = 0;
                        cards.forEach((card) => {
                            const match = card.dataset.name.includes(query);
                            card.style.display = match ? '' : 'none';
                            if (match) visible++;
                        });
                        avatarVideoAICount.innerText = query
                            ? `Avatars: ${visible}/${avatars.length}`
                            : `Avatars: ${avatars.length}`;
                    };
                }
            })
            .catch((err) => {
                console.error('Video AI getAvatarList error:', err);
                rc.userLog('warning', 'Video AI getAvatarList error:\n' + err, 'top-end', 6000);
                const tabVid = rc.getId('tabVideoAI');
                const tabBtn = rc.getId('tabVideoAIBtn');
                const roomBtn = rc.getId('tabRoomBtn');
                if (tabVid) tabVid.style.display = 'none';
                if (tabBtn) tabBtn.style.display = 'none';
                if (roomBtn) roomBtn.click();
            });
    }

    getVoiceList() {
        const rc = this.roomClient;
        rc.socket
            .request('getVoiceList')
            .then((completion) => {
                const voiceList = completion?.response?.voices || [];
                if (!voiceList.length) {
                    console.warn('No voices available in the response');
                    return;
                }

                const selectElement = document.getElementById('avatarVoiceIDs');
                if (!selectElement) return;
                selectElement.innerHTML = '<option value="">Select Avatar Voice</option>';

                const sortedList = voiceList.sort((a, b) => (a.language ?? '').localeCompare(b.language ?? ''));

                sortedList.forEach((voice) => {
                    const { voice_id, language, name, gender } = voice;
                    const option = document.createElement('option');
                    option.value = voice_id;
                    option.textContent = `${language ? language + ', ' : ''}${name || 'Unnamed'} (${gender || 'N/A'})`;
                    selectElement.appendChild(option);
                });

                const voicePreviewPlayer = document.getElementById('avatarVoicePreview');

                selectElement.addEventListener('change', async (event) => {
                    window.VideoAI.avatarVoice = event.target.value || null;

                    if (voicePreviewPlayer && event.target.value) {
                        try {
                            voicePreviewPlayer.pause();
                            voicePreviewPlayer.src = '';
                            const result = await rc.socket.request('previewVoice', {
                                voice_id: event.target.value,
                            });
                            if (result?.audio) {
                                voicePreviewPlayer.src = result.audio;
                                voicePreviewPlayer.play().catch(() => {});
                            }
                        } catch (err) {
                            console.warn('Voice preview failed', err);
                        }
                    } else if (voicePreviewPlayer) {
                        voicePreviewPlayer.pause();
                        voicePreviewPlayer.src = '';
                    }

                    if (window.VideoAI.active && window.VideoAI.avatarVoice) {
                        console.log('Video AI voice changed during active session, restarting...');
                        this.streamingStop();
                        await this.createLiveAvatarSession();
                    }
                });
            })
            .catch((err) => {
                console.error('Video AI getVoiceList error', err);
            });
    }

    async handleVideoAI() {
        const rc = this.roomClient;
        if (!window.VideoAI.avatarId) {
            return rc.userLog('warning', 'Please select an avatar before starting', 'top-end', 6000);
        }

        const vb = document.createElement('div');
        vb.setAttribute('id', 'avatar__vb');
        vb.className = 'videoAvatarMenuBar fadein';

        const interrupt = rc.createButton('avatar__interrupt', html.stop);
        const fs = rc.createButton('avatar__fs', html.fullScreen);
        const pin = rc.createButton('avatar__pin', html.pin);
        const mic = rc.createButton('avatar__mic', html.audioOn);
        const ss = rc.createButton('avatar__stopSession', html.kickOut);

        const muteAvatarAudioBtn = rc.createButton('avatar__muteAvatarAudio', html.volume);
        const shareBtn = rc.createButton('avatar__shareToRoom', html.share);

        let chatGPTToggleBtn = null;
        if (rc.chatGPTEnabled) {
            chatGPTToggleBtn = rc.createButton('avatar__chatGPTToggle', html.robot);
            rc.setColor(chatGPTToggleBtn, window.VideoAI.useChatGPT ? 'lime' : '');
        }

        const avatarName = document.createElement('div');
        const an = document.createElement('span');
        an.id = 'avatar__name';
        an.className = html.userName;
        an.innerText = window.VideoAI.avatarName;

        rc.videoAIContainer = document.createElement('div');
        rc.videoAIContainer.id = 'avatarVideoAIcontainer';
        rc.videoAIContainer.className = 'avatarsVideoAI fadein';

        rc.videoAIElement = document.createElement('video');
        rc.videoAIElement.id = 'avatarVideoAIElement';
        rc.videoAIElement.autoplay = true;
        rc.videoAIElement.playsInline = true;
        rc.videoAIElement.muted = window.VideoAI.muteAvatarAudio;
        rc.videoAIElement.className = 'avatarVideoElement';

        const sessionTimerSpan = document.createElement('span');
        sessionTimerSpan.id = 'avatar__sessionTimer';
        sessionTimerSpan.className = 'avatar-session-timer notranslate';
        sessionTimerSpan.style.display = 'none';

        rc.isVideoFullScreenSupported && vb.appendChild(fs);
        vb.appendChild(muteAvatarAudioBtn);
        vb.appendChild(interrupt);
        vb.appendChild(mic);
        if (chatGPTToggleBtn) vb.appendChild(chatGPTToggleBtn);
        vb.appendChild(shareBtn);
        vb.appendChild(pin);
        vb.appendChild(ss);
        vb.appendChild(sessionTimerSpan);
        avatarName.appendChild(an);

        rc.videoAIContainer.appendChild(rc.videoAIElement);
        rc.videoAIContainer.appendChild(vb);
        rc.videoAIContainer.appendChild(avatarName);
        rc.videoMediaContainer.appendChild(rc.videoAIContainer);

        muteAvatarAudioBtn.onclick = () => {
            window.VideoAI.muteAvatarAudio = !window.VideoAI.muteAvatarAudio;
            rc.setColor(muteAvatarAudioBtn, window.VideoAI.muteAvatarAudio ? 'lime' : '');
            if (rc.videoAIElement) {
                rc.videoAIElement.muted = window.VideoAI.muteAvatarAudio;
            }
        };

        if (chatGPTToggleBtn) {
            chatGPTToggleBtn.onclick = () => {
                window.VideoAI.useChatGPT = !window.VideoAI.useChatGPT;
                rc.setColor(chatGPTToggleBtn, window.VideoAI.useChatGPT ? 'lime' : '');
            };
        }

        shareBtn.onclick = async () => {
            if (!window.VideoAI.shareToRoom) {
                Swal.fire({
                    background: swalBackground,
                    position: 'top',
                    title: 'Share Avatar to Room?',
                    text: 'Are you sure you want to share the avatar video and audio with all participants?',
                    showDenyButton: true,
                    confirmButtonText: 'Yes',
                    denyButtonText: 'No',
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        window.VideoAI.shareToRoom = true;
                        rc.setColor(shareBtn, 'lime');
                        const tracks = rc.videoAIElement?.srcObject?.getTracks() || [];
                        for (const rawTrack of tracks) {
                            await this.publishAvatarTrack(rawTrack);
                        }
                    }
                });
            } else {
                window.VideoAI.shareToRoom = false;
                rc.setColor(shareBtn, 'white');
                this.stopAvatarProducers();
            }
        };

        ss.onclick = () => {
            this.stopSession();
        };

        interrupt.onclick = () => {
            this.streamingInterrupt();
        };

        pin.onclick = () => {
            rc.togglePin(rc.videoAIContainer.id);
        };

        fs.onclick = () => {
            rc.toggleFullscreen(rc.videoAIContainer);
        };

        mic.onclick = () => {
            this.startVideoAISpeechRecognition(mic);
        };

        if (!rc.isMobileDevice) {
            rc.setTippy(pin.id, 'Toggle Pin', 'bottom');
            rc.setTippy(muteAvatarAudioBtn.id, 'Mute avatar audio (local only)', 'bottom');
            rc.setTippy(interrupt.id, 'Interrupt avatar speaking', 'bottom');
            rc.setTippy(mic.id, 'Speech to avatar', 'bottom');
            rc.setTippy(shareBtn.id, 'Share avatar to room', 'bottom');
            chatGPTToggleBtn && rc.setTippy(chatGPTToggleBtn.id, 'Toggle ChatGPT interaction', 'bottom');
            rc.setTippy(fs.id, 'Toggle full screen', 'bottom');
            rc.setTippy(ss.id, 'Stop VideoAI session', 'bottom');
        }

        window.VideoAI.active = true;
        this.setVideoAIControlsDisabled(true);

        await this.createLiveAvatarSession();
    }

    async createLiveAvatarSession() {
        const rc = this.roomClient;
        try {
            const { quality, avatarId, avatarVoice } = window.VideoAI;

            const tokenResponse = await rc.socket.request('createSessionToken', {
                quality: quality,
                avatar_id: avatarId,
                voice_id: avatarVoice,
            });

            if (!tokenResponse || Object.keys(tokenResponse).length === 0 || tokenResponse.error) {
                const errMsg = tokenResponse?.error?.message || tokenResponse?.error || 'Error creating the avatar session';
                rc.userLog('warning', errMsg, 'top-end');
                this.stopSession();
                return;
            }

            if (tokenResponse.response.code !== 1000) {
                rc.userLog('warning', tokenResponse.response.message, 'top-end');
                this.stopSession();
                return;
            }

            const { session_id, session_token } = tokenResponse.response.data;
            window.VideoAI.info = { session_id };
            window.VideoAI.sessionToken = session_token;

            const startResponse = await rc.socket.request('startSession', {
                session_token: session_token,
            });

            if (!startResponse || startResponse.error) {
                const errMsg = startResponse?.error?.message || startResponse?.error || 'Error starting the avatar session';
                rc.userLog('warning', errMsg, 'top-end');
                this.stopSession();
                return;
            }

            const { livekit_url, livekit_client_token } = startResponse.response;
            await this.connectToLiveKit(livekit_url, livekit_client_token);
        } catch (error) {
            const errMsg = typeof error === 'string' ? error : error?.response?.data?.message || error?.message || 'Unknown error';
            if (errMsg.toLowerCase().includes('insufficient credits') || errMsg === 'quota not enough') {
                rc.msgPopup('warning', 'Insufficient AI Avatar credits. Please check your LiveAvatar subscription.', 6000, 'top');
            } else {
                rc.userLog('error', errMsg, 'top-end');
            }
            this.stopSession();
        }
    }

    async connectToLiveKit(livekitUrl, livekitToken) {
        const rc = this.roomClient;
        const { Room, RoomEvent } = LivekitClient;

        const room = new Room();

        // Collect tracks into a single MediaStream for the video element
        const mediaStream = new MediaStream();
        const deferredAudioTracks = new Map();

        const attachLiveKitTrack = async (kind, mediaStreamTrack) => {
            const existing = kind === 'video' ? mediaStream.getVideoTracks() : mediaStream.getAudioTracks();
            existing.forEach((t) => mediaStream.removeTrack(t));

            mediaStream.addTrack(mediaStreamTrack);

            rc.videoAIElement.srcObject = mediaStream;
            rc.videoAIElement.play().catch((error) => {
                console.warn('Video AI playback blocked:', error?.message || error);
            });

            const speakerSelect = rc.getId('speakerSelect');
            const sinkId = speakerSelect?.value;
            // Keep avatar audio on the selected output device when speaker changes.
            if (sinkId && speakerSelect?.value) {
                await rc.changeAudioDestination(rc.videoAIElement, false);
            }

            if (kind === 'video') {
                rc.hideVideoLoaderOnPlay(rc.videoAIElement);
            }

            // Re-publish the avatar track into mediasoup so all participants see/hear it
            if (window.VideoAI.shareToRoom) {
                await this.publishAvatarTrack(mediaStreamTrack);
            }
        };

        // Handle incoming tracks (avatar video/audio)
        room.on(RoomEvent.TrackSubscribed, async (track, publication, participant) => {
            const participantIdentity = participant?.identity || 'unknown';

            console.log('Video AI LiveKit track subscribed:', track.kind, participantIdentity);

            if (track.kind !== 'video' && track.kind !== 'audio') {
                return;
            }

            const mediaStreamTrack = track.mediaStreamTrack;
            if (!mediaStreamTrack) {
                console.warn('Video AI: no mediaStreamTrack for', track.kind);
                return;
            }

            // Bind media playback to a single LiveKit participant to avoid replacing avatar audio
            // with secondary agent/system audio tracks from other participants.
            if (track.kind === 'video') {
                if (!window.VideoAI.mediaParticipantIdentity) {
                    window.VideoAI.mediaParticipantIdentity = participantIdentity;
                    console.log('Video AI selected media participant:', window.VideoAI.mediaParticipantIdentity);

                    const deferredAudioTrack = deferredAudioTracks.get(window.VideoAI.mediaParticipantIdentity);
                    if (deferredAudioTrack) {
                        console.log(
                            'Video AI attaching deferred audio track for selected participant:',
                            window.VideoAI.mediaParticipantIdentity
                        );
                        await attachLiveKitTrack('audio', deferredAudioTrack);
                        deferredAudioTracks.delete(window.VideoAI.mediaParticipantIdentity);
                    }
                } else if (participantIdentity !== window.VideoAI.mediaParticipantIdentity) {
                    console.log('Video AI ignoring video track from non-selected participant:', participantIdentity);
                    return;
                }
            }

            if (track.kind === 'audio') {
                if (!window.VideoAI.mediaParticipantIdentity) {
                    deferredAudioTracks.set(participantIdentity, mediaStreamTrack);
                    console.log(
                        'Video AI deferring audio track until video participant is selected:',
                        participantIdentity
                    );
                    return;
                }
                if (participantIdentity !== window.VideoAI.mediaParticipantIdentity) {
                    console.log('Video AI ignoring audio track from non-selected participant:', participantIdentity);
                    return;
                }
            }

            await attachLiveKitTrack(track.kind, mediaStreamTrack);
        });

        // Handle track unsubscribed
        room.on(RoomEvent.TrackUnsubscribed, (track) => {
            console.log('Video AI LiveKit track unsubscribed:', track.kind);
            track.detach();
        });

        // Handle server events from agent-response topic
        room.on(RoomEvent.DataReceived, (payload, participant, kind, topic) => {
            if (topic === 'agent-response') {
                try {
                    const event = JSON.parse(new TextDecoder().decode(payload));
                    this.handleLiveAvatarEvent(event);
                } catch (e) {
                    console.warn('Video AI: failed to parse agent-response event', e);
                }
            }
        });

        room.on(RoomEvent.Disconnected, () => {
            console.log('Video AI LiveKit room disconnected');
        });

        await room.connect(livekitUrl, livekitToken);

        window.VideoAI.livekitRoom = room;
        window.VideoAI.active = true;

        this.startRendering();

        rc.isMobileDevice ? this.handleMobileVideoAiChat() : this.handleDesktopVideoAiChat();

        this.startVideoAISessionTimer();

        rc.userLog('info', 'Video AI streaming started', 'top-end');
    }
}
window.AIAvatarManager = AIAvatarManager;