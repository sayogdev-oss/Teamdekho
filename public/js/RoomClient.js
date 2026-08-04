'use strict';

/**
 * TeamDekho - Client component
 *
 * @link    GitHub: https://github.com/teamdekho/teamdekhosfu
 * @link    Official Live demo: https://sfu.teamdekho.com
 * @license For open source use: AGPLv3
 * @license For commercial or closed source, contact us at license.teamdekho@gmail.com or purchase directly via CodeCanyon
 * @license CodeCanyon: https://codecanyon.net/item/teamdekho-sfu-webrtc-realtime-video-conferences/40769970
 * @author  TeamDekho Team - support@teamdekho.in
 * @version 2.2.88
 *
 */

const cfg = {
    useAvatarSvg: true,
};

const html = {
    newline: '\n', //'<br />',
    hideMeOn: 'fas fa-user-slash',
    hideMeOff: 'fas fa-user',
    audioOn: 'fas fa-microphone',
    audioOff: 'fas fa-microphone-slash',
    videoOn: 'fas fa-video',
    videoOff: 'fas fa-video-slash',
    userName: 'username notranslate fadein',
    userHand: 'fas fa-hand-paper user-hand pulsate',
    pip: 'fas fa-images',
    fullScreen: 'fas fa-expand',
    fullScreenOn: 'fas fa-compress-alt',
    fullScreenOff: 'fas fa-expand-alt',
    snapshot: 'fas fa-camera-retro',
    sendFile: 'fas fa-upload',
    sendMsg: 'fas fa-paper-plane',
    sendVideo: 'fab fa-youtube',
    geolocation: 'fas fa-location-dot',
    ban: 'fas fa-ban',
    kickOut: 'fas fa-times',
    ghost: 'fas fa-ghost',
    undo: 'fas fa-undo',
    bg: 'fas fa-circle-half-stroke',
    pin: 'fas fa-map-pin',
    videoPrivacy: 'far fa-circle',
    expand: 'fas fa-ellipsis-vertical',
    hideALL: 'fas fa-eye',
    mirror: 'fas fa-arrow-right-arrow-left',
    draw: 'fas fa-pencil-alt',
    close: 'fas fa-times',
    stop: 'fas fa-circle-stop',
    share: 'fas fa-share-alt',
    robot: 'fas fa-robot',
    volume: 'fas fa-volume-mute',
};

const icons = {
    room: '<i class="fas fa-home"></i>',
    chat: '<i class="fas fa-comments"></i>',
    user: '<i class="fas fa-user"></i>',
    transcript: '<i class="fas fa-closed-captioning"></i>',
    speech: '<i class="fas fa-volume-high"></i>',
    share: '<i class="fas fa-share-alt"></i>',
    ptt: '<i class="fa-solid fa-hand-pointer"></i>',
    lobby: '<i class="fas fa-shield-halved"></i>',
    lock: '<i class="fa-solid fa-lock"></i>',
    unlock: '<i class="fa-solid fa-lock-open"></i>',
    pitchBar: '<i class="fas fa-microphone-lines"></i>',
    mirror: '<i class="fas fa-arrow-right-arrow-left"></i>',
    sounds: '<i class="fas fa-music"></i>',
    fileSend: '<i class="fa-solid fa-file-export"></i>',
    fileReceive: '<i class="fa-solid fa-file-import"></i>',
    recording: '<i class="fas fa-record-vinyl"></i>',
    moderator: '<i class="fas fa-user-shield"></i>',
    broadcaster: '<i class="fa-solid fa-wifi"></i>',
    codecs: '<i class="fa-solid fa-film"></i>',
    theme: '<i class="fas fa-fill-drip"></i>',
    recSync: '<i class="fa-solid fa-cloud-arrow-up"></i>',
    refresh: '<i class="fas fa-rotate"></i>',
    editor: '<i class="fas fa-pen-to-square"></i>',
    up: '<i class="fas fa-chevron-up"></i>',
    down: '<i class="fas fa-chevron-down"></i>',
    infoBrowser: '<i class="fa-solid fa-globe"></i>',
    infoCpu: '<i class="fa-solid fa-microchip"></i>',
    infoDevice: '<i class="fa-solid fa-laptop"></i>',
    infoEngine: '<i class="fa-solid fa-gear"></i>',
    infoOs: '<i class="fa-solid fa-layer-group"></i>',
    infoDefault: '<i class="fa-solid fa-circle-info"></i>',
    signIn: '<i class="fas fa-sign-in-alt"></i>',
    clock: '<i class="fas fa-clock"></i>',
    infinity: '<i class="fas fa-infinity"></i>',
    arrowRight: '<i class="fas fa-arrow-right"></i>',
    paste: '<i class="fas fa-paste"></i>',
    smile: '<i class="fas fa-face-smile"></i>',
    trash: '<i class="fas fa-trash"></i>',
    youtube: '<i class="fab fa-youtube"></i>',
    times: '<i class="fas fa-times"></i>',
    statusCircle: (status) => `<i class="fa fa-circle ${status}"></i>`,
    robot: '<i class="fas fa-robot"></i>',
};

const image = {
    about: '../images/teamdekho-logo.gif',
    avatar: '../images/teamdekhosfu-logo.png',
    audio: '../images/audio.gif',
    rec: '../images/rec.png',
    recording: '../images/recording.png',
    delete: '../images/delete.png',
    locked: '../images/locked.png',
    mute: '../images/mute.png',
    hide: '../images/hide.png',
    stop: '../images/stop.png',
    unmute: '../images/unmute.png',
    unhide: '../images/unhide.png',
    start: '../images/start.png',
    users: '../images/participants.png',
    user: '../images/participant.png',
    username: '../images/user.png',
    videoShare: '../images/video-share.png',
    message: '../images/message.png',
    share: '../images/share.png',
    exit: '../images/exit.png',
    feedback: '../images/feedback.png',
    lobby: '../images/lobby.png',
    email: '../images/email.png',
    chatgpt: '../images/chatgpt.png',
    deepSeek: '../images/deepSeek.png',
    all: '../images/all.png',
    forbidden: '../images/forbidden.png',
    broadcasting: '../images/broadcasting.png',
    geolocation: '../images/geolocation.png',
    network: '../images/network.gif',
    rtmp: '../images/rtmp.png',
    save: '../images/save.png',
    transcription: '../images/transcription.png',
    back: '../images/back.png',
    blur: '../images/blur.png',
    blurLow: '../images/blur-low.png',
    blurHigh: '../images/blur-high.png',
    transparentBg: '../images/transparentBg.png',
    link: '../images/link.png',
    upload: '../images/upload.png',
    virtualBackground: {
        one: '../images/virtual-background/default/background-1.jpg',
        two: '../images/virtual-background/default/background-2.webp',
        three: '../images/virtual-background/default/background-3.jpg',
        four: '../images/virtual-background/default/background-4.jpg',
        five: '../images/virtual-background/default/background-5.jpg',
        six: '../images/virtual-background/default/background-6.jpg',
        seven: '../images/virtual-background/default/background-7.jpg',
        eight: '../images/virtual-background/default/background-8.jpg',
        nine: '../images/virtual-background/default/background-9.jpg',
        ten: '../images/virtual-background/default/background-10.jpg',
        eleven: '../images/virtual-background/default/background-11.gif',
    },
};

window.image = image;

const mediaType = {
    audio: 'audioType',
    audioTab: 'audioTab',
    video: 'videoType',
    camera: 'cameraType',
    screen: 'screenType',
    speaker: 'speakerType',
};

const _EVENTS = {
    openRoom: 'openRoom',
    exitRoom: 'exitRoom',
    startRec: 'startRec',
    pauseRec: 'pauseRec',
    resumeRec: 'resumeRec',
    stopRec: 'stopRec',
    raiseHand: 'raiseHand',
    lowerHand: 'lowerHand',
    startVideo: 'startVideo',
    pauseVideo: 'pauseVideo',
    resumeVideo: 'resumeVideo',
    stopVideo: 'stopVideo',
    startAudio: 'startAudio',
    pauseAudio: 'pauseAudio',
    resumeAudio: 'resumeAudio',
    stopAudio: 'stopAudio',
    startScreen: 'startScreen',
    pauseScreen: 'pauseScreen',
    resumeScreen: 'resumeScreen',
    stopScreen: 'stopScreen',
    roomLock: 'roomLock',
    lobbyOn: 'lobbyOn',
    lobbyOff: 'lobbyOff',
    roomUnlock: 'roomUnlock',
    hostOnlyRecordingOn: 'hostOnlyRecordingOn',
    hostOnlyRecordingOff: 'hostOnlyRecordingOff',
    startRTMP: 'startRTMP',
    stopRTMP: 'stopRTMP',
    endRTMP: 'endRTMP',
    startRTMPfromURL: 'startRTMPfromURL',
    stopRTMPfromURL: 'stopRTMPfromURL',
    endRTMPfromURL: 'endRTMPfromURL',
};

// Enums
const enums = {
    recording: {
        started: 'Started conference recording',
        start: 'Start conference recording',
        stop: 'Stop conference recording',
    },
    //...
};

// LiveAvatar config
const VideoAI = {
    enabled: true,
    active: false,
    info: {},
    avatarId: null,
    avatarName: '',
    avatarVoice: null,
    quality: 'medium',
    sessionToken: null,
    livekitRoom: null,
    sessionTimeLimit: 0,
    sessionCountdown: null,
    avatarProducers: [],
    shareToRoom: false,
    useChatGPT: true,
    mediaParticipantIdentity: null,
    muteAvatarAudio: false,
};

// Recording
let recordedBlobs = [];

class RoomClient {
    constructor(
        localAudioEl,
        remoteAudioEl,
        videoMediaContainer,
        videoPinMediaContainer,
        mediasoupClient,
        socket,
        room_id,
        peer_name,
        peer_uuid,
        peer_info,
        isAudioAllowed,
        isVideoAllowed,
        isScreenAllowed,
        joinRoomWithScreen,
        isSpeechSynthesisSupported,
        transcription,
        successCallback
    ) {
        this.room_id = room_id;
        this.peer_id = socket.id;
        this.peer_name = peer_name;
        this.peer_uuid = peer_uuid;
        this.peer_info = peer_info;
        this.peer_avatar = peer_info.peer_avatar;

        // Device type
        this.isDesktopDevice = peer_info.is_desktop_device;
        this.isMobileDevice = peer_info.is_mobile_device;
        this.isMobileSafari = this.isMobileDevice && peer_info.browser_name.toLowerCase().includes('safari');

        this.pendingSinkId = null; // store desired sink id until next user gesture

        this.localAudioEl = localAudioEl;
        this.remoteAudioEl = remoteAudioEl;
        this.videoMediaContainer = videoMediaContainer;
        this.videoPinMediaContainer = videoPinMediaContainer;
        this.mediasoupClient = mediasoupClient;

        // Handle Socket
        this.socket = socket;
        this.reconnectAlert = null;
        this.reconnectBanner = null;
        this.reconnectBannerHideTimer = null;
        this.maxReconnectAttempts = Number(this.socket?.io?.opts?.reconnectionAttempts) || 10;
        this.reconnectInterval = Number(this.socket?.io?.opts?.reconnectionDelay) || 3000;
        this.maxReconnectInterval = Number(this.socket?.io?.opts?.reconnectionDelayMax) || 15000;
        this.serverAwayShown = false;
        this.silentReconnect = false; // If true, no popup will be shown on reconnect

        this.cacheReconnectBannerElements();

        // Handle ICE
        this.iceRestarting = false;
        this.iceProducerRestarting = false;
        this.iceConsumerRestarting = false;

        // RTMP selected file name
        this.selectedRtmpFilename = '';

        // Moderator
        this._moderator = {
            video_start_privacy: false,
            audio_start_muted: false,
            video_start_hidden: false,
            audio_cant_unmute: false,
            video_cant_unhide: false,
            screen_cant_share: false,
            chat_cant_privately: false,
            chat_cant_publicly: false,
            chat_cant_chatgpt: false,
            chat_cant_deep_seek: false,
            media_cant_sharing: false,
            polls_cant_create: false,
        };

        // Chat messages
        this.chatMessageLengthCheck = false;
        this.chatMessageLength = 4000; // chars
        this.chatMessageTimeLast = 0;
        this.chatMessageTimeBetween = 1000; // ms
        this.chatMessageNotifyDelay = 10000; // ms
        this.chatMessageSpamCount = 0;
        this.chatMessageSpamCountToBan = 10;
        this.chatPeerId = 'all';
        this.chatPeerName = 'all';
        this.chatPeerAvatar = '';
        this.unreadMessageCounts = {};

        // LiveAvatar Video AI
        this.videoAIContainer = null;
        this.videoAIElement = null;
        this.videoAIRecognitionPersistent = false;

        this.dominantSpeaker = false;
        this.isAudioAllowed = isAudioAllowed;
        this.isVideoAllowed = isVideoAllowed;
        this.isScreenAllowed = isScreenAllowed;
        this.joinRoomWithScreen = joinRoomWithScreen;
        this.producerTransport = null;
        this.consumerTransport = null;
        this.device = null;

        // DataChannel chat
        this.chatDataProducer = null;
        this.chatDataConsumers = new Map();
        this.useDataChannel = true; // prefer DataChannel for chat

        this.isScreenShareSupported =
            navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia ? true : false;

        this.isMySettingsOpen = false;

        this._isConnected = false;
        this._duplicateSessionActive = false;
        this.isVideoBarDropDownOpen = false;
        this.isDocumentOnFullScreen = false;
        this.isVideoOnFullScreen = false;
        this.isVideoFullScreenSupported = this.isFullScreenSupported();
        this.isVideoPictureInPictureSupported = document.pictureInPictureEnabled;
        this.isZoomCenterMode = false;
        this.isChatOpen = false;
        this.isChatEmojiOpen = false;
        this.isEditorOpen = false;
        this.isEditorLocked = false;
        this.isEditorPinned = false;
        this.isEditorPrivate = false;
        this.collabEditorDelta = null;
        this._privatePersistTimer = null;

        this.isSpeechSynthesisSupported = isSpeechSynthesisSupported;
        /** @type {Array<{newMsg: boolean, from: string, msg: string}>} */
        this._ttsQueue = [];
        /** @type {boolean} */
        this._isSpeaking = false;
        /** @type {number} */
        this.TTS_QUEUE_MAX_LENGTH = 3; // Max 3 pending messages in queue
        this.isParticipantsOpen = false;
        this.speechInMessages = false;
        this.showChatOnMessage = true;
        this.isChatBgTransparent = false;
        this.isVideoPinned = false;
        this.isFollowMeActive = false;
        this.isChatPinned = false;
        this.isChatMaximized = false;
        this.isToggleUnreadMsg = false;
        this.isToggleRaiseHand = false;
        // ModeratorManager properties (moved here for global accessibility)
        this.chatPeerId = null; // Used by ModeratorManager for chat, kept here as it's shared with Chat feature
        this.chatPeerName = null; // Used by ModeratorManager for chat, kept here as it's shared with Chat feature
        this.chatPeerAvatar = null; // Used by ModeratorManager for chat, kept here as it's shared with Chat feature
        this.unreadMessageCounts = {}; // Used by ModeratorManager for chat, kept here as it's shared with Chat feature

        this.pinnedVideoPlayerId = null;
        this.camVideo = false;
        this.videoQualitySelectedIndex = 0;

        this.chatGPTContext = [];
        this.deepSeekContext = [];
        this.chatGPTEnabled = false;
        this.chatMessages = [];
        this.leftMsgAvatar = null;
        this.rightMsgAvatar = null;

        this.localVideoElement = null;
        this.localVideoStream = null;
        this.localAudioStream = null;
        this.localScreenStream = null;

        // Room Password
        this.RoomIsLocked = false;
        this.RoomPassword = false;
        this.RoomPasswordValid = false;

        // Room Lobby
        this.RoomIsLobby = false;
        this.RoomLobbyAccepted = false;
        this.lobbyPears = {};

        this.transcription = transcription;

        // RTMP Streamer
        this.rtmpFileStreamer = false;
        this.rtmpUrltSreamer = false;

        // File transfer settings
        this.fileToSend = null;
        this.fileReader = null;
        this.receiveBuffer = [];
        this.receivedSize = 0;
        this.incomingFileInfo = null;
        this.incomingFileData = null;
        this.sendInProgress = false;
        this.receiveInProgress = false;
        this.fileSharingInput = '*';
        this.chunkSize = 1024 * 16; // 16kb/s

        // Recording
        this._isRecording = false;
        this._recStartTs = null;
        this.mediaRecorder = null;
        this.audioRecorder = null;
        this.recScreenStream = null;
        this.recording = {
            recSyncServerRecording: false,
            recSyncServerToS3: false,
            recSyncServerEndpoint: '',
        };
        this.recSyncTime = 4000; // 4 sec
        this.recSyncChunkSize = 1000000; // 1MB

        // Encodings
        this.preferLocalCodecsOrder = false; // Prefer local codecs order
        this.forceVP8 = false; // Force VP8 codec for webcam and screen sharing
        this.forceVP9 = false; // Force VP9 codec for webcam and screen sharing
        this.forceH264 = false; // Force H264 codec for webcam and screen sharing
        this.forceAV1 = false; // Force AV1 codec for webcam and screen sharing
        this.enableWebcamLayers = true; // Enable simulcast or SVC for webcam
        this.enableSharingLayers = true; // Enable simulcast or SVC for screen sharing
        this.numSimulcastStreamsWebcam = 3; // Number of streams for simulcast in webcam
        this.numSimulcastStreamsSharing = 1; // Number of streams for simulcast in screen sharing
        this.webcamScalabilityMode = null; // Let getWebCamEncoding() choose the correct mode per-codec: 'L1T3' for VP8/H264, 'L3T3_KEY' for VP9
        this.sharingScalabilityMode = 'L1T3'; // Scalability Mode for screen sharing | 'L1T3' for VP8/H264 (in each simulcast encoding), 'L3T3' for VP9

        this.myVideoEl = null;
        this.myAudioEl = null;
        this.showPeerInfo = false; // on peerName mouse hover show additional info

        // Noise Suppression
        this.RNNoiseProcessor = null;
        this.isRNNoiseSupported = true; // Will be set to false if AudioWorklet/WASM not available
        this.rnnoiseManager = new RNNoiseManager(this);
        this.reactionManager = new ReactionManager(this);
        this.followMeManager = new FollowMeManager(this);
        this.pollManager = new PollManager(this);
        this.editorManager = new EditorManager(this);
        this.rtmpManager = new RTMPManager(this);
        this.moderatorManager = new ModeratorManager(this);
        this.recordingManager = new RecordingManager(this);
        this.lobbyManager = new LobbyManager(this);
        this.breakoutRoomManager = new BreakoutRoomManager(this);

        this.videoProducerId = null;
        this.screenProducerId = null;
        this.audioProducerId = null;
        this.audioConsumers = new Map();
        this.pendingResumes = new Set(); // Track in-flight resume requests

        this.peers = new Map();
        this.consumers = new Map();
        this.producers = new Map();
        this.producerLabel = new Map();
        this.eventListeners = new Map();
        this.consumerQualityHistory = new Map();

        this.debug = false;
        this.debug ? window.localStorage.setItem('debug', 'mediasoup*') : window.localStorage.removeItem('debug');

        // TEST PURPOSES
        this.test = {
            device: {
                enabled: false,
                handlerName: 'Chrome111', // |Chrome74|Firefox120|Safari12|ReactNative106|
            },
        };

        console.log('06 ----> Load MediaSoup Client v', mediasoupClient.version);
        console.log('06.1 ----> PEER_ID', this.peer_id);

        Object.keys(_EVENTS).forEach((evt) => {
            this.eventListeners.set(evt, []);
        });

        this.socket.request = function request(type, data = {}) {
            return new Promise((resolve, reject) => {
                socket.emit(type, data, (data) => {
                    if (data.error) {
                        reject(data.error);
                    } else {
                        resolve(data);
                    }
                });
            });
        };

        // ####################################################
        // CREATE ROOM AND JOIN
        // ####################################################

        this.createRoom(this.room_id).then(async () => {
            const data = {
                room_id: this.room_id,
                peer_info: this.peer_info,
            };
            await this.join(data);
            this.initSockets();
            this._isConnected = true;
            successCallback();
        });
    }

    // ####################################################
    // GET STARTED
    // ####################################################

    async createRoom(room_id) {
        await this.socket
            .request('createRoom', {
                room_id,
            })
            .catch((err) => {
                console.log('Create room:', err);
            });
    }

    async join(data) {
        this.socket
            .request('join', data)
            .then(async (room) => {
                console.log('##### JOIN ROOM #####', room);

                if (room?.maxParticipantsReached) {
                    console.warn('00-WARNING ----> Room is full, maximum participants reached!');
                    endRoomSession();
                    return popupHtmlMessage(
                        null,
                        image.forbidden,
                        'Join Room',
                        `Room is full, maximum participants${room?.maxParticipants ? ` (${room.maxParticipants})` : ''} reached!`,
                        'center',
                        '/',
                        false
                    );
                }

                if (room === 'invalid') {
                    console.warn('00-WARNING ----> Invalid Room name! Path traversal pattern detected!');
                    return this.roomInvalid();
                }

                if (room === 'notAllowed') {
                    console.warn(
                        '00-WARNING ----> Room is Unauthorized for current user, please provide a valid room name for this user'
                    );
                    return this.userRoomNotAllowed();
                }

                if (room === 'unauthorized') {
                    console.warn(
                        '00-WARNING ----> Room is Unauthorized for current user, please provide a valid username and password'
                    );
                    return this.userUnauthorized();
                }

                if (room === 'isLocked') {
                    this.RoomIsLocked = true;
                    this.event(_EVENTS.roomLock);
                    console.warn('00-WARNING ----> Room is Locked, Try to unlock by the password');
                    return this.unlockTheRoom();
                }

                if (room === 'isLobby') {
                    this.RoomIsLobby = true;
                    this.event(_EVENTS.lobbyOn);
                    console.warn('00-WARNING ----> Room Lobby Enabled, Wait to confirm my join');
                    return this.waitJoinConfirm();
                }

                if (room === 'isBanned') {
                    console.warn('00-WARNING ----> You are Banned from the Room!');
                    return this.isBanned();
                }

                // ##########################################
                this.peers = new Map(JSON.parse(room.peers));
                // ##########################################

                if (this.usernameExists(this.peers)) {
                    return this.userNameAlreadyInRoom();
                }

                await this.joinAllowed(room);
            })
            .catch((error) => {
                console.error('Join error:', error);
                //
                popupHtmlMessage(null, image.network, 'Join Room', error, 'center', false, true);
            });
    }

    usernameExists(peers) {
        if (!peer_info.peer_token) {
            // hack...
            for (let peer of Array.from(peers.keys()).filter((id) => id !== this.peer_id)) {
                const _peer_info = peers.get(peer).peer_info;
                if (_peer_info.peer_name == this.peer_name) {
                    if (_peer_info.peer_uuid === this.peer_uuid) {
                        console.log('Same user reconnecting', this.peer_name);
                        continue;
                    }
                    console.log('07.0-WARNING ----> Username already in use');
                    return true;
                }
            }
        }
        return false;
    }

    async joinAllowed(room) {
        console.log('07 ----> Join Room allowed');

        await this.handleRoomInfo(room);

        await this.loadDeviceAndInitTransports();

        // ###############################################
        this.socket.emit('getProducers'); // newProducers
        // ###############################################

        // Initialize chat DataChannel
        await this.initChatDataProducer();

        // Request existing data producers from other peers
        this.socket.emit('getDataProducers');

        if (isBroadcastingEnabled) {
            isPresenter ? await this.startLocalMedia() : this.handleRoomBroadcasting();
        } else {
            await this.startLocalMedia();
        }
    }

    async loadDeviceAndInitTransports() {
        // Get Router Capabilities
        const routerRtpCapabilities = await this.socket.request('getRouterRtpCapabilities');
        routerRtpCapabilities.headerExtensions = routerRtpCapabilities.headerExtensions.filter(
            (ext) => ext.uri !== 'urn:3gpp:video-orientation'
        );

        // Load device
        this.device = await this.loadDevice(routerRtpCapabilities);
        console.log('07.3 ----> Get Router Rtp Capabilities codecs: ', this.device.rtpCapabilities.codecs);

        // Init Send/Receive Transports
        await this.initTransports(this.device);
    }

    async handleRoomInfo(room) {
        // ##########################################
        this.peers = new Map(JSON.parse(room.peers));
        // ##########################################

        console.log('07.0 ----> Room Survey', room.survey);
        survey = room.survey;

        console.log('07.0 ----> Room Leave Redirect', room.redirect);
        redirect = room.redirect;

        participantsCount = this.peers.size;

        // ME
        for (let peer of Array.from(this.peers.keys()).filter((id) => id == this.peer_id)) {
            let my_peer_info = this.peers.get(peer).peer_info;
            console.log('07.1 ----> My Peer info', my_peer_info);
            isPresenter = window.localStorage.isReconnected === 'true' ? isPresenter : my_peer_info.peer_presenter;
            isCoHost = my_peer_info.peer_cohost || false;
            this.peer_info.peer_presenter = isPresenter;
            this.getId('isUserPresenter').innerText = isPresenter;
            window.localStorage.isReconnected = false;

            /*
            // GLOBAL LOBBY ENABLED
            if (room?.globalLobby) {
                if (isPresenter) {
                    localStorageSettings.lobby = true;
                    lS.setSettings(localStorageSettings);
                    console.warn('7.1-WARNING ----> GLOBAL Room Lobby detected, save the config');
                }
                rc.roomAction('globalLobbyOn', true, false);
                console.warn('7.1-WARNING ----> GLOBAL Room Lobby detected');
            }
            */

            handleRules(isPresenter);

            // ###################################################################################################
            isBroadcastingEnabled = isPresenter && !room.broadcasting ? isBroadcastingEnabled : room.broadcasting;
            console.log('07.1 ----> ROOM BROADCASTING', isBroadcastingEnabled);
            // ###################################################################################################

            if (BUTTONS.settings.tabRecording) {
                room.config.hostOnlyRecording
                    ? (console.log('07.1 ----> WARNING Room Host only recording enabled'),
                      this.event(_EVENTS.hostOnlyRecordingOn))
                    : this.event(_EVENTS.hostOnlyRecordingOff);
            }

            // ###################################################################################################
            if (room.recording) this.recording = room.recording;
            if (room.recording && room.recording.recSyncServerRecording) {
                console.log('07.1 WARNING ----> SERVER SYNC RECORDING ENABLED!', this.recording);
                this.recording.recSyncServerRecording = localStorageSettings.rec_server;
                if (BUTTONS.settings.tabRecording && !room.config.hostOnlyRecording) {
                    show(roomRecordingServer);
                }
                switchServerRecording.checked = this.recording.recSyncServerRecording;
            }
            console.log('07.1 ----> SERVER SYNC RECORDING', this.recording);
            // ###################################################################################################

            // Handle Room moderator rules
            if (room.moderator && (!isRulesActive || !isPresenter)) {
                console.log('07.2 ----> ROOM MODERATOR', room.moderator);

                // Update `this._moderator` with properties from `room.moderator`, keeping existing ones.
                this._moderator = { ...this._moderator, ...room.moderator };

                if (this._moderator.video_start_privacy || localStorageSettings.moderator_video_start_privacy) {
                    this.peer_info.peer_video_privacy = true;
                    this.emitCmd({
                        type: 'privacy',
                        peer_id: this.peer_id,
                        active: true,
                        broadcast: true,
                    });
                    this.userLog('warning', 'The Moderator starts your video in privacy mode', 'top-end');
                }
                if (this._moderator.audio_start_muted && this._moderator.video_start_hidden) {
                    this.userLog('warning', 'The Moderator disabled your audio and video', 'top-end');
                } else {
                    if (this._moderator.audio_start_muted && !this._moderator.video_start_hidden) {
                        this.userLog('warning', 'The Moderator disabled your audio', 'top-end');
                    }
                    if (!this._moderator.audio_start_muted && this._moderator.video_start_hidden) {
                        this.userLog('warning', 'The Moderator disabled your video', 'top-end');
                    }
                }
                //
                this._moderator.audio_cant_unmute ? hide(tabAudioDevicesBtn) : show(tabAudioDevicesBtn);
                this._moderator.video_cant_unhide ? hide(tabVideoDevicesBtn) : show(tabVideoDevicesBtn);
            }
            // Handle Follow Me state for late joiners
            if (room.followMe && room.followMe.enabled && !isPresenter) {
                this._pendingFollowMe = room.followMe;
            }
            // Store ChatGPT enabled state for VideoAI fallback
            this.chatGPTEnabled = room.chatGPTEnabled || false;
            // Check if VideoAI is enabled and hide to guests by default
            if (!isPresenter || !room.videoAIEnabled) {
                VideoAI.enabled = false;
                elemDisplay('tabVideoAIBtn', false);
            }
            if (room.videoAISessionTimeLimit > 0) {
                VideoAI.sessionTimeLimit = room.videoAISessionTimeLimit;
            }
            // Check che RTMP config
            if (room.rtmp) {
                console.log('RTMP config', room.rtmp);
                const { enabled, fromFile, fromUrl, fromStream, allowCustomUrl } = room.rtmp;
                elemDisplay('tabRTMPStreamingBtn', enabled);
                elemDisplay('rtmpFromFile', fromFile);
                elemDisplay('rtmpFromUrl', fromUrl);
                elemDisplay('rtmpFromStream', fromStream);
                elemDisplay('rtmpCustomDestination', allowCustomUrl);
                if (allowCustomUrl) this.initRtmpCustomDestination();
                if (!fromFile && !fromUrl && !fromStream) {
                    elemDisplay('tabRTMPStreamingBtn', false);
                }
            }
            // There is polls
            if (room.thereIsPolls) {
                this.socket.emit('updatePoll');
            }
            // Host protected enabled in the server side
            if (room.hostProtected) {
                RoomURL = window.location.origin + '/join/' + room_id;
            }

            // Share Media Data on Join
            if (
                room.shareMediaData &&
                Object.keys(room.shareMediaData).length !== 0 &&
                room.shareMediaData.action === 'open'
            ) {
                this.shareVideoAction(room.shareMediaData);
            }

            // Dominant Speaker
            this.dominantSpeaker = room.dominantSpeaker || false;
            if (!this.dominantSpeaker) {
                elemDisplay('dominantSpeakerFocusDiv', false);
            }

            // Open Chat on Join
            if (chat) {
                const chatButton = getId('chatButton');
                if (chatButton) {
                    chatButton.click();
                }
            }
        }

        // PARTICIPANTS
        for (let peer of Array.from(this.peers.keys()).filter((id) => id !== this.peer_id)) {
            let peer_info = this.peers.get(peer).peer_info;
            // console.log('07.1 ----> Remote Peer info', peer_info);
            const { peer_id, peer_name, peer_avatar, peer_presenter, peer_video, peer_recording, peer_lobby } =
                peer_info;

            if (peer_lobby) {
                this.lobbyAddPear({ peer_id, peer_avatar, peer_name });
                continue;
            }

            const canSetVideoOff = !isBroadcastingEnabled || (isBroadcastingEnabled && peer_presenter);

            if (!peer_video && canSetVideoOff) {
                console.log('Detected peer video off ' + peer_name);
                this.setVideoOff(peer_info, true);
            }

            if (peer_recording) {
                this.handleRecordingAction({
                    peer_id: peer_id,
                    peer_name: peer_name,
                    peer_avatar: peer_avatar,
                    action: enums.recording.started,
                });
            }
        }

        this.refreshParticipantsCount();

        console.log('07.2 Participants Count ---->', participantsCount);

        if (BUTTONS.popup.shareRoomPopup && notify && participantsCount == 1) {
            shareRoom();
        } else {
            if (this.isScreenAllowed) {
                this.shareScreen();
            }
            sound('joined');
        }
    }

    async loadDevice(routerRtpCapabilities) {
        if (!routerRtpCapabilities) {
            console.error('Router RTP Capabilities are required to load the device.');
            this.userLog('error', 'Router RTP Capabilities are missing.', 'center', 6000);
            return null;
        }

        let device;
        try {
            device = this.test.device.enabled
                ? await this.mediasoupClient.Device.factory({ handlerName: this.test.device.handlerName })
                : await this.mediasoupClient.Device.factory();

            console.log('Device created successfully:', device.handlerName);
        } catch (error) {
            if (error.name === 'UnsupportedError') {
                console.error('Browser not supported:', error);
                this.userLog('error', 'Browser not supported. Please try a different browser.', 'center', 6000);
            } else {
                console.error('Error creating device:', error);
                this.userLog('error', `Failed to create device: ${error.message}`, 'center', 6000);
            }
            return null;
        }

        try {
            await device.load({
                routerRtpCapabilities,
                preferLocalCodecsOrder: !!this.preferLocalCodecsOrder,
            });
            console.log(
                `Device loaded successfully with router RTP capabilities (preferLocalCodecsOrder: ${!!this.preferLocalCodecsOrder})`,
                device.rtpCapabilities
            );
        } catch (error) {
            console.error('Error loading device with router RTP capabilities:', error);
            this.userLog('error', `Failed to load device: ${error.message}`, 'center', 6000);
            return null;
        }

        return device;
    }

    // ####################################################
    // GRID SORTING & PAGINATION LOGIC
    // ####################################################

    /**
     * Gets a sorted list of peer IDs, prioritizing Host/Co-Host and Active Speaker.
     * @returns {Array<string>} Sorted peer IDs.
     */
    getSortedPeers() {
        const peers = Array.from(this.peers.keys());
        
        // Priority: 1. Host/Co-Host, 2. Manual Pin, 3. Active Speaker, 4. Hand Raised, 5. Others
        return peers.sort((a, b) => {
            const peerA = this.peers.get(a);
            const peerB = this.peers.get(b);
            
            // Helper to check priority
            const getPriority = (peer, peerId) => {
                let p = 0;
                if (peer.peer_info.peer_presenter || peer.peer_info.peer_cohost) p += 100;
                if (peerId === this.pinnedVideoPlayerId) p += 50;
                if (peerId === this.dominantSpeakerId) p += 25;
                if (peer.peer_info.peer_hand) p += 10;
                return p;
            };

            return getPriority(peerB, b) - getPriority(peerA, a);
        });
    }

    updateGrid() {
        const sortedPeers = this.getSortedPeers();
        if (typeof renderGridForPage === 'function') {
            renderGridForPage(sortedPeers);
        }
    }

    // ####################################################
    // CONSUMER PAUSE/RESUME FOR BANDWIDTH OPTIMIZATION
    // ####################################################

    /**
     * Pauses consumers for peers not on the current page.
     * @param {Array<string>} visiblePeerIds - List of peer IDs to keep active.
     */
    pauseConsumersForHiddenPeers(visiblePeerIds) {
        this.consumers.forEach((consumer, consumerId) => {
            const peerId = consumer.appData.peerId;
            if (!visiblePeerIds.includes(peerId) && !consumer.paused && consumer.kind === 'video') {
                console.log(`Pausing consumer ${consumerId} for peer ${peerId}`);
                consumer.pause();
                this.socket.emit('pauseConsumer', { peerId: peerId });
            }
        });
    }

    /**
     * Resumes consumers for peers on the current page.
     * @param {Array<string>} visiblePeerIds - List of peer IDs to activate.
     */
    resumeConsumersForVisiblePeers(visiblePeerIds) {
        this.consumers.forEach((consumer, consumerId) => {
            const peerId = consumer.appData.peerId;
            if (consumer.kind === 'video' && visiblePeerIds.includes(peerId) && consumer.paused) {
                this.resumeConsumer(consumerId);
            }
        });
    }

    /**
     * Resumes a consumer safely.
     * @param {string} consumerId
     */
    async resumeConsumer(consumerId) {
        const consumer = this.consumers.get(consumerId);
        if (!consumer) return;
        if (this.pendingResumes.has(consumerId)) {
            console.log(`Skipped resume: Consumer ${consumerId} already has a pending resume request.`);
            return;
        }
        if (consumer.closed || !consumer.paused) return;

        console.log(`Resuming consumer ${consumerId} for peer ${consumer.appData.peerId}`);
        this.pendingResumes.add(consumerId);
        try {
            await consumer.resume();
            this.socket.emit('resumeConsumer', { peerId: consumer.appData.peerId });
        } catch (error) {
            console.error(`Error resuming consumer ${consumerId} for peer ${consumer.appData.peerId}:`, error);
        } finally {
            this.pendingResumes.delete(consumerId);
        }
    }

    async ensureTransport(type) {
        if (type === 'producer') {
            if (!this.producerTransport || this.producerTransport.closed) {
                console.warn('Producer transport is closed or missing. Re-initializing...');
                await this.initProducerTransport(this.device);
            }
        } else if (type === 'consumer') {
            if (!this.consumerTransport || this.consumerTransport.closed) {
                console.warn('Consumer transport is closed or missing. Re-initializing...');
                await this.initConsumerTransport(this.device);
            }
        }
    }

    // ####################################################
    // TRANSPORTS
    // ####################################################

    async initTransports(device) {
        await this.initProducerTransport(device);
        await this.initConsumerTransport(device);
    }

    // ####################################################
    // PRODUCER TRANSPORT
    // ####################################################

    async initProducerTransport(device) {
        const producerTransportData = await this.socket.request('createWebRtcTransport', {
            forceTcp: false,
            rtpCapabilities: device.rtpCapabilities,
        });

        if (producerTransportData.error) {
            console.error('Producer Transport creation failed', producerTransportData.error);
            return;
        }

        this.producerTransport = device.createSendTransport({
            ...producerTransportData,
            iceServers: producerTransportData.iceServers || [],
        });
        this.setupProducerTransportHandlers();
    }

    setupProducerTransportHandlers() {
        this.producerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
            try {
                await this.socket.request('connectTransport', {
                    transport_id: this.producerTransport.id,
                    dtlsParameters,
                });
                callback();
            } catch (err) {
                console.error('Producer Transport connection error', err);
                errback(err);
            }
        });

        this.producerTransport.on('produce', async ({ kind, appData, rtpParameters }, callback, errback) => {
            try {
                const { producer_id } = await this.socket.request('produce', {
                    producerTransportId: this.producerTransport.id,
                    kind,
                    appData,
                    rtpParameters,
                });
                callback({ id: producer_id });
            } catch (err) {
                errback(err);
            }
        });

        this.producerTransport.on(
            'producedata',
            async ({ sctpStreamParameters, label, protocol, appData }, callback, errback) => {
                try {
                    const { id } = await this.socket.request('produceData', {
                        transportId: this.producerTransport.id,
                        sctpStreamParameters,
                        label,
                        protocol,
                        appData,
                    });
                    callback({ id });
                } catch (err) {
                    errback(err);
                }
            }
        );

        this.producerTransport.on('connectionstatechange', async (state) => {
            console.log(`Producer Transport state changed to: ${state}`, { id: this.producerTransport.id });

            switch (state) {
                case 'connecting':
                    console.log('Producer Transport connecting...');
                    break;
                case 'connected':
                    console.log('✅ Producer Transport connected', { id: this.producerTransport.id });
                    break;
                case 'disconnected':
                    console.warn('⚠️ Producer Transport disconnected', { id: this.producerTransport.id });
                    console.warn('⚠️ Producer Attempting ICE restart...');
                    try {
                        await this.restartProducerIce();
                    } catch (error) {
                        console.error('❌ Producer ICE restart failed', error.message);
                    }
                    break;
                case 'failed':
                    console.warn('❌ Producer Transport failed', { id: this.producerTransport.id });
                    break;
                default:
                    console.log('Producer transport connection state changed', {
                        state,
                        id: this.producerTransport.id,
                    });
                    break;
            }
        });

        this.producerTransport.on('icegatheringstatechange', (state) => {
            const normalStates = new Set(['new', 'gathering', 'complete']);
            normalStates.has(state)
                ? console.log('Producer ICE gathering state', { state, id: this.producerTransport.id })
                : console.warn('Unexpected Producer ICE gathering state', { state, id: this.producerTransport.id });
        });

        this.producerTransport.on('icecandidateerror', (error) => {
            console.error('❌ Producer ICE candidate error', {
                error: error,
                id: this.producerTransport.id,
            });
        });
    }

    // ####################################################
    // CONSUMER TRANSPORT
    // ####################################################

    async initConsumerTransport(device) {
        const consumerTransportData = await this.socket.request('createWebRtcTransport', {
            forceTcp: false,
        });

        if (consumerTransportData.error) {
            console.error('Consumer Transport creation failed', consumerTransportData.error);
            return;
        }

        this.consumerTransport = device.createRecvTransport({
            ...consumerTransportData,
            iceServers: consumerTransportData.iceServers || [],
        });
        this.setupConsumerTransportHandlers();
    }

    setupConsumerTransportHandlers() {
        this.consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
            try {
                await this.socket.request('connectTransport', {
                    transport_id: this.consumerTransport.id,
                    dtlsParameters,
                });
                callback();
            } catch (err) {
                console.error('Consumer Transport connection error', err);
                errback(err);
            }
        });

        this.consumerTransport.on('connectionstatechange', async (state) => {
            console.log(`Consumer Transport state changed to: ${state}`, { id: this.consumerTransport.id });

            switch (state) {
                case 'connecting':
                    console.log('Consumer Transport connecting...');
                    break;
                case 'connected':
                    console.log('✅ Consumer Transport connected', { id: this.consumerTransport.id });
                    break;
                case 'disconnected':
                    console.warn('⚠️ Consumer Transport disconnected', { id: this.consumerTransport.id });
                    console.warn('⚠️ Consumer Attempting ICE restart...');
                    try {
                        await this.restartConsumerIce();
                    } catch (error) {
                        console.error('❌ Consumer ICE restart failed', error.message);
                    }
                    break;
                case 'failed':
                    console.warn('❌ Consumer Transport failed', { id: this.consumerTransport.id });
                    break;
                default:
                    console.log('Consumer transport connection state changed', {
                        state,
                        id: this.consumerTransport.id,
                    });
                    break;
            }
        });

        this.consumerTransport.on('icegatheringstatechange', (state) => {
            const normalStates = new Set(['new', 'gathering', 'complete']);
            normalStates.has(state)
                ? console.log('Consumer ICE gathering state', { state, id: this.consumerTransport.id })
                : console.warn('Unexpected Consumer ICE gathering state', { state, id: this.consumerTransport.id });
        });

        this.consumerTransport.on('icecandidateerror', (error) => {
            console.error('❌ Consumer ICE candidate error', {
                error: error,
                id: this.consumerTransport.id,
            });
        });
    }

    // ####################################################
    // TODO: DATA TRANSPORT
    // ####################################################

    // ####################################################
    // HANDLE ICE
    // ####################################################

    async restartTransportIce(transport, type) {
        if (!transport || typeof transport !== 'object' || transport.closed) return false;

        try {
            console.warn(`🔄 ${type} Restarting ICE...`, {
                id: transport.id,
                state: transport.connectionState,
            });

            const iceParameters = await this.socket.request('restartIce', {
                transport_id: transport.id,
            });

            if (!iceParameters) {
                console.warn(`⚠️ No ${type} ICE Parameters received`);
                return false;
            }

            console.info(`🚀 ${type} Restarting transport ICE`, iceParameters);

            await transport.restartIce({ iceParameters });

            console.info(`✅ Successfully restarted ${type} ICE`);
            return true;
        } catch (error) {
            console.error(`🔥 ${type} Restart ICE error`, {
                id: transport?.id,
                error: error,
            });
            return false;
        }
    }

    async restartTransportWithRetry(transport, transportType, maxRetries = 5, initialDelay = 1000) {
        let delay = initialDelay;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            const reconnected = await this.restartTransportIce(transport, transportType);

            if (reconnected) {
                console.info(`✅ ${transportType} reconnected successfully on attempt ${attempt}.`);
                return true;
            }

            if (attempt < maxRetries) {
                console.warn(`🌀 ${transportType} reconnection attempt ${attempt} failed. Retrying in ${delay}ms...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
                delay *= 2; // Exponential backoff: 1s -> 2s -> 4s -> 8s -> 16s
            } else {
                console.error(`❌ ${transportType} failed to reconnect after ${maxRetries} attempts.`);
            }
        }

        console.error('❌ Failed to reconnect after multiple attempts.');
        transport.close();

        popupHtmlMessage(
            null,
            image.network,
            `${transportType} Transport`,
            'Unable to reconnect. Please check your network.',
            'center',
            false,
            true
        );

        return false;
    }

    async restartProducerIce(retries = 5, delay = 1000) {
        return this.restartTransportWithRetry(this.producerTransport, 'Producer', retries, delay);
    }

    async restartConsumerIce(retries = 5, delay = 1000) {
        return this.restartTransportWithRetry(this.consumerTransport, 'Consumer', retries, delay);
    }

    async restartIce() {
        if (this.iceRestarting) return;

        console.warn('Restart ICE...', {
            producerTransportConnectionState: this.producerTransport.connectionState,
            consumerTransportConnectionState: this.consumerTransport.connectionState,
        });

        try {
            this.iceRestarting = true;
            await this.restartProducerIce();
            await this.restartConsumerIce();
            console.log('✅ Restart ICE done');
        } catch (error) {
            console.error('❌ Restart ICE error', error);
        } finally {
            this.iceRestarting = false;
        }
    }

    // ####################################################
    // SOCKET ON
    // ####################################################

    initSockets() {
        this.socket.io.on('reconnect_attempt', this.handleSocketReconnectAttempt);
        this.socket.io.on('reconnect', this.handleSocketReconnect);
        this.socket.io.on('reconnect_failed', this.handleSocketReconnectFailed);
        this.socket.on('connect', this.handleSocketConnect);
        this.socket.on('connect_error', this.handleSocketConnectionError);
        this.socket.on('disconnect', this.handleSocketDisconnect);
        this.socket.on('serverShutdown', this.handleServerShutdown);
        this.socket.on('consumerClosed', this.handleConsumerClosed);
        this.socket.on('setVideoOff', this.handleSetVideoOff);
        this.socket.on('removeMe', this.handleRemoveMe);
        this.socket.on('duplicateSessionDetected', this.handleDuplicateSessionDetected);
        this.socket.on('refreshParticipantsCount', this.handleRefreshParticipantsCount);
        this.socket.on('newPeer', this.handleNewPeer);
        this.socket.on('newProducers', this.handleNewProducers);
        this.socket.on('newDataProducer', this.handleNewDataProducer);
        this.socket.on('dataConsumerClosed', this.handleDataConsumerClosed);
        this.socket.on('message', (data) => this.chatManager.handleMessage(data));
        this.socket.on('roomAction', this.handleRoomAction);
        this.socket.on('roomPassword', this.handleRoomPassword);
        this.socket.on('roomLobby', this.handleRoomLobby);
        this.socket.on('cmd', this.handleCmdData);
        this.socket.on('peerAction', this.handlePeerAction);
        this.socket.on('updatePeerInfo', this.handleUpdatePeerInfo);
        this.socket.on('fileInfo', this.handleFileInfoData);
        this.socket.on('file', this.handleFileData);
        this.socket.on('shareVideoAction', this.handleShareVideoAction);
        this.socket.on('fileAbort', this.handleFileAbortData);
        this.socket.on('receiveFileAbort', this.handleReceiveFileAbortData);
        this.socket.on('wbCanvasToJson', this.handleWbCanvasToJson);
        this.socket.on('whiteboardAction', this.handleWhiteboardAction);
        this.socket.on('videoDrawing', this.handleVideoDrawingData);
        this.socket.on('audioVolume', this.handleAudioVolumeData);
        this.socket.on('dominantSpeaker', this.handleDominantSpeakerData);
        this.socket.on('updateRoomModerator', this.handleUpdateRoomModeratorData);
        this.socket.on('updateRoomModeratorALL', this.handleUpdateRoomModeratorALLData);
        this.socket.on('recordingAction', this.handleRecordingActionData);
        this.socket.on('endRTMP', this.handleEndRTMP);
        this.socket.on('errorRTMP', this.handleErrorRTMP);
        this.socket.on('endRTMPfromURL', this.handleEndRTMPfromURL);
        this.socket.on('errorRTMPfromURL', this.handleErrorRTMPfromURL);
        this.socket.on('updatePolls', this.handleUpdatePolls);
        this.socket.on('editorChange', this.handleEditorChange);
        this.socket.on('editorActions', this.handleEditorActions);
        this.socket.on('editorUpdate', this.handleEditorUpdate);
        this.socket.on('breakoutRoom', (data) => this.breakoutRoomManager.handleBreakoutRoom(data));
        this.socket.on('breakoutRoomCountsChanged', () => this.breakoutRoomManager.handleBreakoutRoomCountsChanged());
        this.socket.on('breakoutRoomMessage', (data) => this.breakoutRoomManager.handleBreakoutRoomMessage(data));
        this.socket.on('breakoutRoomEnd', (data) => this.breakoutRoomManager.handleBreakoutRoomEnd(data));
        this.socket.on('breakoutRoomCountdown', (data) => this.breakoutRoomManager.handleBreakoutRoomCountdown(data));
        this.socket.on('breakoutRoomHelp', (data) => this.breakoutRoomManager.handleBreakoutRoomHelp(data));
        this.socket.on('followMe', (data) => this.followMeManager.handleFollowMeData(data));
        this.socket.on('chatReaction', (data) => this.reactionManager.handleChatReaction(data));
        this.socket.on('consumerScore', ({ consumerId, score }) => {
            if (!score) return;
            if (!this.lastLoggedScores) this.lastLoggedScores = new Map();
            const lastScore = this.lastLoggedScores.get(consumerId);
            if (!lastScore || JSON.stringify(lastScore) !== JSON.stringify(score)) {
                this.lastLoggedScores.set(consumerId, score);
                console.log('Consumer score update', consumerId, score);
            }
            this.evaluateConsumerQuality(consumerId, score);
        });
        this.socket.on('coHostUpdate', ({ peerId, isCoHost: newCoHostStatus }) => {
            // Update remote peer's stored info (used by badges on video tiles and participant list)
            const peerData = this.peers && this.peers.get(peerId);
            if (peerData && peerData.peer_info) {
                peerData.peer_info.peer_cohost = newCoHostStatus;
            }

            // Update the participant-list menu item label, using whatever ID pattern Step 1 found
            const menuItem = this.getId(`${peerId}___pCoHost`);
            if (menuItem) {
                const label = menuItem.querySelector('.label');
                const text = newCoHostStatus ? 'Remove Co-Host' : 'Make Co-Host';
                label ? (label.innerText = text) : (menuItem.innerText = text);
            }

            // If this update is about ME, update the global isCoHost flag (Room.js scope)
            // and refresh my own peer_info so my own UI/permission checks reflect it.
            if (peerId === this.peer_id) {
                isCoHost = newCoHostStatus;
                this.peer_info.peer_cohost = newCoHostStatus;
                this.userLog(
                    'info',
                    newCoHostStatus ? 'You are now a Co-Host' : 'Co-Host role removed',
                    'top-end',
                    4000
                );
            }

            // Update video tile badge (re-render name text on both possible tile locations)
            const videoNameEl = this.getId(peerId + '__name');
            if (videoNameEl && peerId !== this.peer_id) {
                const baseName = videoNameEl.innerText.replace(/\s*⭐Co-Host\s*$/, '').replace(/^🎯\s*/, '');
                const presenterIcon = videoNameEl.innerText.startsWith('🎯') ? '🎯 ' : '';
                videoNameEl.innerText = presenterIcon + baseName + (newCoHostStatus ? ' ⭐Co-Host' : '');
            }
        });
        this.socket.on('dominantSpeaker', ({ peerId }) => {
            console.log('Dominant speaker changed:', peerId);
            this.dominantSpeakerId = peerId;
            this.updateGrid();
        });

    }

    // ####################################################
    // HANDLE SOCKET DATA
    // ####################################################

    handleSocketConnect = () => {
        console.log('SocketOn Connected to signaling server!');
    };

    handleServerShutdown = (data) => {
        console.warn('SocketOn ServerShutdown:', data);
        popupHtmlMessage(
            null,
            image.network,
            'Connection Lost',
            data?.message || 'Meeting connection was lost. Reconnecting...',
            'center',
            false,
            false
        );
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    };

    handleSocketDisconnect = (reason) => {
        console.log(`SocketOn Disconnect Reason: ${reason}`);
        this.handleDisconnect(reason);
    };

    handleSocketConnectionError = (err) => {
        console.log(`SocketOn Disconnect Error: ${err.message}`);
    };

    handleDuplicateSessionDetected = (data) => {
        if (this._duplicateSessionActive) {
            console.warn('Duplicate session detection already active, ignoring redundant event.');
            return;
        }
        this._duplicateSessionActive = true;

        console.warn('Duplicate session detected. Initiating cleanup...', data);

        // 2. Stop local media tracks
        try {
            if (this.localVideoStream) {
                this.localVideoStream.getTracks().forEach(track => track.stop());
                this.localVideoStream = null;
                console.log('Stopped local video stream tracks.');
            }
        } catch (error) {
            console.error('Error stopping local video stream tracks:', error.message);
        }

        try {
            if (this.localAudioStream) {
                this.localAudioStream.getTracks().forEach(track => track.stop());
                this.localAudioStream = null;
                console.log('Stopped local audio stream tracks.');
            }
        } catch (error) {
            console.error('Error stopping local audio stream tracks:', error.message);
        }

        try {
            if (this.localScreenStream) {
                this.localScreenStream.getTracks().forEach(track => track.stop());
                this.localScreenStream = null;
                console.log('Stopped local screen stream tracks.');
            }
        } catch (error) {
            console.error('Error stopping local screen stream tracks:', error.message);
        }

        // 3. Close local producers
        try {
            if (this.videoProducerId) {
                this.closeProducer(mediaType.video, 'duplicateSessionDetected');
            }
        } catch (error) {
            console.error('Error closing video producer:', error.message);
        }

        try {
            if (this.audioProducerId) {
                this.closeProducer(mediaType.audio, 'duplicateSessionDetected');
            }
        } catch (error) {
            console.error('Error closing audio producer:', error.message);
        }

        try {
            if (this.screenProducerId) {
                this.closeProducer(mediaType.screen, 'duplicateSessionDetected');
            }
        } catch (error) {
            console.error('Error closing screen producer:', error.message);
        }

        // 4. Call this.exit(true)
        try {
            this.exit(true);
            console.log('Called exit(true) to clean up transports and socket listeners.');
        } catch (error) {
            console.error('Error calling exit(true):', error.message);
        }

        // 5. User notification & 6. Redirect / lock the UI
        try {
            popupHtmlMessage(
                null,
                image.network,
                'Session Ended',
                'You were disconnected because this room was opened in another tab or device.',
                'center',
                false,
                false
            );
            console.log('Displayed duplicate session notification.');
        } catch (error) {
            console.error('Error displaying notification:', error.message);
        }
        try {
            setTimeout(() => {
                window.location.reload();
            }, 3000);
            console.log('Initiated page reload after notification.');
        } catch (error) {
            console.error('Error initiating reload:', error.message);
        }
    };

    handleSocketReconnectAttempt = (attempt) => {
        if (this._duplicateSessionActive) return;
        console.log(`SocketOn Reconnect Attempt: ${attempt}`);
        this.handleReconnectAttempt(attempt);
    };

    handleSocketReconnect = () => {
        if (this._duplicateSessionActive) return;
        console.log('SocketOn Reconnected to signaling server!');
        this.handleReconnect();
    };

    handleSocketReconnectFailed = () => {
        console.error('SocketOn Reconnect failed');
        this.handleReconnectFailed();
    };

    handleConsumerClosed = ({ consumer_id, consumer_kind }) => {
        console.log('SocketOn Closing consumer', { consumer_id, consumer_kind });
        this.removeConsumer(consumer_id, consumer_kind);
    };

    handleSetVideoOff = (data) => {
        if (!isBroadcastingEnabled || (isBroadcastingEnabled && data.peer_presenter)) {
            console.log('SocketOn setVideoOff', {
                peer_name: data.peer_name,
                peer_presenter: data.peer_presenter,
            });
            this.setVideoOff(data, true);
        }
    };

    handleRemoveMe = (data) => {
        console.log('SocketOn Remove me:', data);
        this.removeVideoOff(data.peer_id);
        this.lobbyRemoveMe(data.peer_id);
        participantsCount = data.peer_counts;

        // peer left

        if (!isBroadcastingEnabled) adaptAspectRatio(participantsCount);
        if (isParticipantsListOpen) getRoomParticipants();
        if (isBreakoutPanelOpen) refreshBreakoutPanel();
        if (isBroadcastingEnabled && data.isPresenter) {
            this.userLog('info', `${icons.broadcaster} ${data.peer_name} disconnected`, 'top-end', 6000);
        }
        this.updateGrid();
    };

    handleNewPeer = (peer) => {
        console.log('SocketOn New peer:', peer);
        this.peers.set(peer.id, peer);
        participantsCount = this.peers.size;

        if (!isBroadcastingEnabled) adaptAspectRatio(participantsCount);
        if (isParticipantsListOpen) getRoomParticipants();
        if (isBreakoutPanelOpen) refreshBreakoutPanel();

        this.updateGrid();
    };

    handleRefreshParticipantsCount = (data) => {
        console.log('SocketOn Participants Count:', data);
        participantsCount = data.peer_counts;
        if (isBroadcastingEnabled) {
            if (isParticipantsListOpen) getRoomParticipants();
            wbUpdate();
            this.editorUpdate();
        } else {
            adaptAspectRatio(participantsCount);
        }
        if (isBreakoutPanelOpen) refreshBreakoutPanel();
    };

    handleNewProducers = async (data) => {
        if (data.length > 0) {
            console.log('SocketOn New producers', {
                data,
                password: {
                    roomIsLocked: this.RoomIsLocked,
                    roomPasswordValid: this.RoomPasswordValid,
                },
                lobby: {
                    roomIsLobby: this.RoomIsLobby,
                    roomLobbyAccepted: this.RoomLobbyAccepted,
                },
            });

            if (this.RoomIsLocked && !this.RoomPasswordValid) {
                console.log('Access denied: Room is locked and password has not been validated yet', data);
                return;
            }

            if (this.RoomIsLobby && !this.RoomLobbyAccepted) {
                console.log('Access pending: Lobby mode is active, waiting for approval to join', data);
                return;
            }

            for (let { producer_id, peer_name, peer_info, type } of data) {
                // Skip own producers to prevent echo from self-consumption
                if (peer_info.peer_id === this.peer_id) {
                    console.warn('Skipping own producer to prevent echo', { producer_id, type });
                    continue;
                }
                await this.consume(producer_id, peer_name, peer_info, type);
                // peer joined
            }

            this.applyPendingFollowMe();
            this.updateGrid();
        }
    };

    handleNewDataProducer = async (data) => {
        console.log('SocketOn New data producer:', data);
        if (data.peer_id === this.peer_id) return;
        await this.consumeData(data.dataProducerId);
    };

    handleDataConsumerClosed = (data) => {
        console.log('SocketOn Data consumer closed:', data);
        const { dataConsumer_id } = data;
        if (this.chatDataConsumers.has(dataConsumer_id)) {
            this.chatDataConsumers.delete(dataConsumer_id);
            console.log('DataConsumer removed', { dataConsumer_id });
        }
    };



    handleRoomAction = (data) => {
        console.log('SocketOn Room action:', data);
        this.roomAction(data, false);
    };

    handleRoomPassword = (data) => {
        console.log('SocketOn Room password:', data.password);
        this.roomPassword(data);
    };

    handleRoomLobby = (data) => {
        console.log('SocketOn Room lobby:', data);
        this.roomLobby(data);
    };

    handleCmdData = (data) => {
        console.log('SocketOn Peer cmd:', data);
        this.handleCmd(data);
    };

    handlePeerAction = (data) => {
        console.log('SocketOn Peer action:', data);
        this.peerAction(data.from_peer_name, data.peer_id, data.action, false, data.broadcast, true, data.message);
    };

    handleUpdatePeerInfo = (data) => {
        console.log('SocketOn Peer info update:', data);
        this.updatePeerInfo(data.peer_name, data.peer_id, data.type, data.status, false, data.peer_presenter);
    };

    handleFileInfoData = (data) => {
        console.log('SocketOn File info:', data);
        this.handleFileInfo(data);
    };

    handleFileData = (data) => {
        this.handleFile(data);
    };

    handleShareVideoAction = (data) => {
        this.shareVideoAction(data);
    };

    handleFileAbortData = (data) => {
        this.handleFileAbort(data);
    };

    handleReceiveFileAbortData = (data) => {
        this.handleReceiveFileAbort(data);
    };

    handleWbCanvasToJson = (data) => {
        console.log('SocketOn Received whiteboard canvas JSON');
        JsonToWbCanvas(data);
    };

    handleWhiteboardAction = (data) => {
        console.log('Whiteboard action', data);
        whiteboardAction(data, false);
    };

    handleVideoDrawingData = (data) => {
        this.handleVideoDrawing(data);
    };

    handleAudioVolumeData = (data) => {
        this.handleAudioVolume(data);
    };

    handleDominantSpeakerData = (data) => {
        this.handleDominantSpeaker(data);
    };

    handleUpdateRoomModeratorData = (data) => {
        console.log('SocketOn Update room moderator', data);
        this.moderatorManager.handleUpdateRoomModerator(data);
    };

    handleUpdateRoomModeratorALLData = (data) => {
        console.log('SocketOn Update room moderator ALL', data);
        this.moderatorManager.handleUpdateRoomModeratorALL(data);
    };

    handleRecordingActionData = (data) => {
        console.log('SocketOn Recording action:', data);
        this.recordingManager.handleRecordingAction(data);
    };

    handleEndRTMP = (data) => {
        return this.rtmpManager.endRTMP(data);
    };

    handleErrorRTMP = (data) => {
        return this.rtmpManager.errorRTMP(data);
    };

    handleEndRTMPfromURL = (data) => {
        return this.rtmpManager.endRTMPfromURL(data);
    };

    handleErrorRTMPfromURL = (data) => {
        return this.rtmpManager.errorRTMPfromURL(data);
    };

    handleUpdatePolls = (data) => {
        return this.pollManager.pollsUpdate(data);
    };

    handleEditorChange = (data) => {
        return this.editorManager.handleEditorData(data);
    };

    handleEditorActions = (data) => {
        return this.editorManager.handleEditorActionsData(data);
    };

    handleEditorUpdate = (data) => {
        return this.editorManager.handleEditorUpdateData(data);
    };

    handleBreakoutRoom = (data) => {
        return this.breakoutRoomManager.handleBreakoutRoom(data);
    };

    handleBreakoutRoomCountsChanged = () => {
        return this.breakoutRoomManager.handleBreakoutRoomCountsChanged();
    };

    handleBreakoutRoomMessage = (data) => {
        return this.breakoutRoomManager.handleBreakoutRoomMessage(data);
    };

    handleBreakoutRoomEnd = (data) => {
        return this.breakoutRoomManager.handleBreakoutRoomEnd(data);
    };

    handleBreakoutRoomCountdown = (data) => {
        return this.breakoutRoomManager.handleBreakoutRoomCountdown(data);
    };

    handleBreakoutRoomHelp = (data) => {
        return this.breakoutRoomManager.handleBreakoutRoomHelp(data);
    };

    async joinBreakoutRoom(breakoutRoom, mainRoom, duration = 'unlimited', roomName = '') {
        return this.breakoutRoomManager.joinBreakoutRoom(breakoutRoom, mainRoom, duration, roomName);
    }

    // ####################################################
    // SOCKET RECONNECT/DISCONNECT
    // ####################################################

    cacheReconnectBannerElements() {
        this.reconnectBanner = {
            root: this.getId('disconnectBanner'),
            overlay: this.getId('disconnectOverlay'),
            iconWrap: this.getId('disconnectBanner')?.querySelector('.disconnect-banner__icon-wrap'),
            icon: this.getId('disconnectBannerIcon'),
            title: this.getId('disconnectBannerTitle'),
            message: this.getId('disconnectBannerMessage'),
            meta: this.getId('disconnectBannerMeta'),
            action: this.getId('disconnectBannerAction'),
            spinner: this.getId('disconnectBannerSpinner'),
        };
    }

    getReconnectBanner() {
        if (!this.reconnectBanner?.root) {
            this.cacheReconnectBannerElements();
        }
        return this.reconnectBanner;
    }

    renderReconnectBanner({
        title,
        message,
        meta = '',
        icon = 'fa-solid fa-plug',
        state = 'reconnecting',
        showSpinner = true,
        actionLabel = '',
        onAction = null,
        blockUi = state !== 'restored',
    }) {
        if (this.silentReconnect) return;

        const banner = this.getReconnectBanner();
        if (!banner?.root) return;

        if (this.reconnectBannerHideTimer) {
            clearTimeout(this.reconnectBannerHideTimer);
            this.reconnectBannerHideTimer = null;
        }

        banner.root.style.display = 'flex';
        banner.root.setAttribute('aria-hidden', 'false');
        banner.root.classList.remove('is-reconnecting', 'is-restored', 'is-failed', 'is-interactive');
        banner.root.classList.add('is-visible', `is-${state}`);

        if (banner.overlay) {
            banner.overlay.style.display = blockUi ? 'block' : 'none';
            banner.overlay.setAttribute('aria-hidden', blockUi ? 'false' : 'true');
            banner.overlay.classList.toggle('is-visible', blockUi);
        }

        if (banner.iconWrap) {
            banner.iconWrap.style.display = 'inline-flex';
        }

        if (banner.icon) banner.icon.className = icon;
        if (banner.title) banner.title.textContent = title;
        if (banner.message) banner.message.textContent = message;

        if (banner.meta) {
            banner.meta.textContent = meta;
            banner.meta.style.display = meta ? 'inline-flex' : 'none';
        }

        if (banner.action) {
            banner.action.textContent = actionLabel || 'Join Room';
            banner.action.style.display = actionLabel ? 'inline-flex' : 'none';
            banner.action.onclick = typeof onAction === 'function' ? () => onAction() : null;
        }

        if (banner.spinner) {
            banner.spinner.style.display = showSpinner ? 'inline-flex' : 'none';
        }

        if (actionLabel && typeof onAction === 'function') {
            banner.root.classList.add('is-interactive');
        }
    }

    hideReconnectBanner(delay = 0) {
        const banner = this.getReconnectBanner();
        if (!banner?.root) return;

        if (this.reconnectBannerHideTimer) {
            clearTimeout(this.reconnectBannerHideTimer);
        }

        const hide = () => {
            banner.root.classList.remove('is-visible', 'is-reconnecting', 'is-restored', 'is-failed', 'is-interactive');
            banner.root.setAttribute('aria-hidden', 'true');
            banner.root.style.display = 'none';
            if (banner.overlay) {
                banner.overlay.classList.remove('is-visible');
                banner.overlay.setAttribute('aria-hidden', 'true');
                banner.overlay.style.display = 'none';
            }
            if (banner.action) {
                banner.action.style.display = 'none';
                banner.action.onclick = null;
            }
            this.reconnectBannerHideTimer = null;
        };

        if (delay > 0) {
            this.reconnectBannerHideTimer = setTimeout(hide, delay);
            return;
        }

        hide();
    }

    showReconnectAlert(reason) {
        this.renderReconnectBanner({
            title: 'Connection lost',
            message: `${reason || 'Network issue'}.`,
            meta: 'Retrying',
            icon: 'fa-solid fa-plug',
            state: 'reconnecting',
            showSpinner: true,
        });
    }

    showMaxAttemptsAlert() {
        this.renderReconnectBanner({
            title: 'Unable to reconnect',
            message: 'Connection could not be restored.',
            meta: '',
            icon: 'fa-solid fa-triangle-exclamation',
            state: 'failed',
            showSpinner: false,
            actionLabel: 'Join Room',
            onAction: () => this.refreshBrowser(),
        });
    }

    showServerAwayMessage() {
        if (this.serverAwayShown) return;
        this.serverAwayShown = true;
        console.warn('Server away or in maintenance, please wait...');
        this.ServerAway();
        this.exit(true);
    }

    attemptReconnect(attempt) {
        if (this._isConnected) return;

        const currentAttempt = Math.min(attempt, this.maxReconnectAttempts);

        const delay = Math.min(this.reconnectInterval * currentAttempt, this.maxReconnectInterval);

        this.updateReconnectAlert(delay, currentAttempt);
    }

    handleDisconnect(reason) {
        endRoomSession();

        window.localStorage.isReconnected = true;
        console.log('Disconnected.');

        // Immediately save recording if active
        if (this.isRecording()) {
            this.saveRecording('Socket disconnected');
        }

        this.serverAwayShown = false;
        this._isConnected = false;

        this.showReconnectAlert(reason);
    }

    handleReconnectAttempt(attempt) {
        if (this._isConnected || attempt > this.maxReconnectAttempts) return;
        this.attemptReconnect(attempt);
    }

    handleReconnect() {
        this._isConnected = true;
        this.closeReconnectAlert(true);
        setTimeout(() => this.refreshBrowser(), 1400);
    }

    handleReconnectFailed() {
        if (!this._isConnected) {
            this.closeReconnectAlert();
            this.showMaxAttemptsAlert();
        }
    }

    updateReconnectAlert(delay, attempt = 1) {
        const seconds = Math.max(1, Math.round(delay / 1000));

        this.renderReconnectBanner({
            title: 'Reconnecting',
            message: `Attempt ${attempt} of ${this.maxReconnectAttempts}.`,
            meta: `Retry in ${seconds}s`,
            icon: 'fa-solid fa-rotate-right',
            state: 'reconnecting',
            showSpinner: true,
        });
    }

    closeReconnectAlert(showRestoredState = false) {
        if (this.reconnectAlert) {
            this.reconnectAlert.close();
            this.reconnectAlert = null;
        }

        if (!showRestoredState) {
            this.hideReconnectBanner();
            return;
        }

        this.renderReconnectBanner({
            title: 'Back online',
            message: 'Connection restored.',
            meta: 'Reloading',
            icon: 'fa-solid fa-wifi',
            state: 'restored',
            showSpinner: false,
            blockUi: false,
        });

        this.hideReconnectBanner(1500);
    }

    // ####################################################
    // SERVER AWAY/MAINTENANCE
    // ####################################################

    ServerAway() {
        this.sound('alert');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            showDenyButton: false,
            showConfirmButton: false,
            background: swalBackground,
            position: 'top',
            icon: 'warning',
            title: 'Server away',
            html: renderRoomTemplate('popupServerAwayTemplate'),
            denyButtonText: `Leave room`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (!result.isConfirmed) {
                this.event(_EVENTS.exitRoom);
            }
        });
    }

    removePeerInfoFromLocalStorage() {
        try {
            localStorage.removeItem('sfu_peer_info');
        } catch (e) {
            console.warn('Unable to remove sfu_peer_info from localStorage:', e);
        }
    }

    updatePeerInfoInLocalStorage() {
        try {
            localStorage.setItem('sfu_peer_info', JSON.stringify(this.peer_info));
        } catch (e) {
            console.warn('Unable to save peer_info to localStorage:', e);
        }
    }

    getPeerInfoFromLocalStorage() {
        try {
            const sfu_peer_info = localStorage.getItem('sfu_peer_info');
            return sfu_peer_info ? JSON.parse(sfu_peer_info) : null;
        } catch (e) {
            console.warn('Unable to get sfu_peer_info from localStorage:', e);
            return null;
        }
    }

    refreshBrowser() {
        endRoomSession();
        this.updatePeerInfoInLocalStorage();
        const reconnectDirectJoinURL = this.getReconnectDirectJoinURL();
        setTimeout(() => {
            this.exit(true);
            openURL(reconnectDirectJoinURL);
            this.removePeerInfoFromLocalStorage();
        }, 100);
    }

    getReconnectDirectJoinURL() {
        const sfu_peer_info = this.getPeerInfoFromLocalStorage();
        const { peer_presenter, peer_audio, peer_video, peer_screen, peer_token } = sfu_peer_info
            ? sfu_peer_info
            : this.peer_info;
        const baseUrl = `${window.location.origin}/join`;
        const queryParams = {
            room: this.room_id,
            roomPassword: this.RoomPassword,
            name: this.peer_name,
            audio: peer_audio,
            video: peer_video,
            screen: peer_screen,
            notify: 0,
            isPresenter: peer_presenter || isPresenter,
        };
        if (peer_token) queryParams.token = peer_token;
        const url = `${baseUrl}?${Object.entries(queryParams)
            .map(([key, value]) => `${key}=${value}`)
            .join('&')}`;
        return url;
    }

    // ####################################################
    // CHECK USER
    // ####################################################

    userNameAlreadyInRoom() {
        this.sound('alert');
        Swal.fire({
            allowOutsideClick: false,
            allowEscapeKey: false,
            background: swalBackground,
            imageUrl: image.user,
            position: 'center',
            title: 'Username',
            html: renderRoomTemplate('popupUsernameInUseTemplate'),
            showDenyButton: false,
            confirmButtonText: `OK`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) {
                endRoomSession();
                openURL((window.location.href = '/join/' + this.room_id));
            }
        });
    }

    // ####################################################
    // HANDLE ROOM BROADCASTING
    // ####################################################

    handleRoomBroadcasting() {
        console.log('07.4 ----> Room Broadcasting is currently active, and you are not the designated presenter');

        this.peer_info.peer_audio = false;
        this.peer_info.peer_video = false;
        this.peer_info.peer_screen = false;

        const mediaTypes = ['audio', 'video', 'screen'];

        mediaTypes.forEach((type) => {
            const data = {
                room_id: this.room_id,
                peer_name: this.peer_name,
                peer_id: this.peer_id,
                peer_presenter: isPresenter,
                type: type,
                status: false,
                broadcast: true,
            };
            this.socket.emit('updatePeerInfo', data);
        });

        handleRulesBroadcasting();
    }

    toggleRoomBroadcasting() {
        Swal.fire({
            background: swalBackground,
            position: 'center',
            imageUrl: image.broadcasting,
            title: 'Room broadcasting Enabled',
            text: 'Would you like to continue the room broadcast?',
            showDenyButton: true,
            confirmButtonColor: '#18392B',
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isDenied) {
                switchBroadcasting.click();
            }
        });
    }

    // ####################################################
    // START LOCAL AUDIO VIDEO MEDIA
    // ####################################################

    async startLocalMedia() {
        console.log('08 ----> START LOCAL MEDIA...');
        const audioProducerExist = this.producerExist(mediaType.audio);
        if (this.isAudioAllowed) {
            if (!audioProducerExist) {
                if (this._duplicateSessionActive) return;
                await this.produce(mediaType.audio, microphoneSelect.value);
                console.log('09 ----> START AUDIO MEDIA');
            }
            if (this._moderator.audio_start_muted) {
                await this.sleep(300);
                await this.pauseAudioProducer();
            }
        } else {
            if (isEnumerateAudioDevices && !audioProducerExist) {
                if (this._duplicateSessionActive) return;
                await this.produce(mediaType.audio, microphoneSelect.value);
                console.log('09 ----> START AUDIO MEDIA');
                await this.sleep(300);
                await this.pauseAudioProducer();
            } else {
                setColor(startAudioButton, 'red');
            }
        }

        if (this.isVideoAllowed && !this._moderator.video_start_hidden) {
            if (this._duplicateSessionActive) return;
            await this.produce(mediaType.video, videoSelect.value);
            console.log('10 ----> START VIDEO MEDIA');
        } else {
            setColor(startVideoButton, 'red');
            this.setVideoOff(this.peer_info, false);
            this.sendVideoOff();
            if (BUTTONS.main.startVideoButton) this.event(_EVENTS.stopVideo);
            this.updatePeerInfo(this.peer_name, this.peer_id, 'video', false);
            console.log('10 ----> VIDEO IS OFF');
        }

        if (!isEnumerateAudioDevices) {
            hide(startAudioButton);
            hide(stopAudioButton);
            hide(startAudioDeviceDropdown);
        }

        if (!isEnumerateVideoDevices) {
            hide(startVideoButton);
            hide(stopVideoButton);
            hide(startVideoDeviceDropdown);
        }

        if (this.joinRoomWithScreen && !this._moderator.screen_cant_share) {
            if (this._duplicateSessionActive) return;
            await this.produce(mediaType.screen, null, false, true);
            console.log('11 ----> START SCREEN MEDIA');
        }

        console.log('[startLocalMedia] - PRODUCER LABEL', this.producerLabel);
    }

    async pauseAudioProducer() {
        setColor(startAudioButton, 'red');
        this.setIsAudio(this.peer_id, false);
        if (BUTTONS.main.startAudioButton) this.event(_EVENTS.stopAudio);
        await this.pauseProducer(mediaType.audio);
        console.log('09 ----> PAUSE AUDIO MEDIA');
        this.updatePeerInfo(this.peer_name, this.peer_id, 'audio', false);
    }

    // ####################################################
    // PRODUCER
    // ####################################################

    async produce(type, deviceId = null, swapCamera = false, init = false) {
        await this.ensureTransport('producer');
        let mediaConstraints = {};
        let elem;
        let stream;
        let audio = false;
        let video = false;
        let screen = false;

        switch (type) {
            case mediaType.audio:
                if (!BUTTONS.main.startAudioButton) return;
                this.isAudioAllowed = true;
                mediaConstraints = this.getAudioConstraints(deviceId);
                this.peer_info.peer_audio = true;
                audio = true;
                break;
            case mediaType.video:
                if (!BUTTONS.main.startVideoButton) return;
                this.isVideoAllowed = true;
                mediaConstraints = swapCamera ? this.getCameraConstraints() : this.getVideoConstraints(deviceId);
                this.peer_info.peer_video = true;
                video = true;
                break;
            case mediaType.screen:
                if (!BUTTONS.main.startScreenButton) return;
                mediaConstraints = this.getScreenConstraints();
                this.peer_info.peer_screen = true;
                screen = true;
                break;
            default:
                return;
        }

        if (!this.device.canProduce('video') && !audio) {
            return console.error('Cannot produce video');
        }

        if (this.producerLabel.has(type)) {
            return console.warn('Producer already exists for this type ' + type);
        }

        const videoPrivacyBtn = this.getId(this.peer_id + '__vp');
        if (videoPrivacyBtn) videoPrivacyBtn.style.display = screen ? 'none' : 'inline';

        console.log(`Media constraints ${type}:`, mediaConstraints);

        try {
            if (init) {
                stream = initStream;
            } else {
                stream = screen
                    ? await navigator.mediaDevices.getDisplayMedia(mediaConstraints)
                    : await navigator.mediaDevices.getUserMedia(mediaConstraints);

                // Handle Virtual Background and Blur using MediaPipe
                if (video && isMediaStreamTrackAndTransformerSupported) {
                    const videoTrack = stream.getVideoTracks()[0];

                    if (virtualBackgroundBlurLevel) {
                        // Apply blur before sending it to WebRTC stream
                        stream = await virtualBackground.applyBlurToWebRTCStream(
                            videoTrack,
                            virtualBackgroundBlurLevel
                        );
                    } else if (virtualBackgroundSelectedImage) {
                        // Apply virtual background to WebRTC stream
                        stream = await virtualBackground.applyVirtualBackgroundToWebRTCStream(
                            videoTrack,
                            virtualBackgroundSelectedImage
                        );
                    } else if (virtualBackgroundTransparent) {
                        // Apply Transparent virtual background to WebRTC stream
                        stream = await virtualBackground.applyTransparentVirtualBackgroundToWebRTCStream(videoTrack);
                    }
                }
            }

            if (audio && BUTTONS.settings.customNoiseSuppression) {
                /*
                 * Initialize RNNoise Suppression if enabled and supported
                 * This will only apply to audio tracks
                 * and will not affect video tracks.
                 */
                await this.rnnoiseManager.initRNNoiseSuppression();
                stream = await this.rnnoiseManager.getRNNoiseSuppressionStream(stream);
            }

            console.log('Supported Constraints', navigator.mediaDevices.getSupportedConstraints());

            const track = audio ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0];

            if (screen) {
                /*
                 * track.contentHint helps optimize media tracks for specific use cases:
                 * - 'motion': For high frame rate (video playback, game streaming)
                 * - 'detail': For high fidelity (screen sharing with text/graphics)
                 */
                if ('contentHint' in track) {
                    show(ScreenOptimizationDiv);

                    const contentHint = screenOptimization.value;
                    if (contentHint !== 'None') {
                        track.contentHint = contentHint;
                        console.info(`Optimized video track for screen sharing: ${contentHint}`);
                    }
                } else {
                    hide(ScreenOptimizationDiv);
                    console.warn('contentHint is not supported in this browser');
                }
            }

            console.log(`${type} settings ->`, track.getSettings());

            const params = {
                track,
                // NOTE: `headerExtensionOptions.absCaptureTime` is disabled to work around a
                // Chrome 148+ regression where munging the local SDP to add the
                // `abs-capture-time` RTP header extension causes:
                //   "A BUNDLE group contains a codec collision for header extension id=X.
                //    The id must be the same across all bundled media descriptions"
                // TODO: Re-enable once Chrome / mediasoup-client ship a fix.
                // See https://github.com/versatica/mediasoup-client/issues/373
                // headerExtensionOptions: {
                //     absCaptureTime: true,
                // },
                appData: {
                    mediaType: type,
                },
            };

            if (audio) {
                console.log('AUDIO ENABLE OPUS (channelCount: 2)');
                params.codecOptions = {
                    opusStereo: true,
                    opusDtx: true,
                    opusFec: true,
                    opusNack: true,
                };
                // Ask the browser's internal bandwidth allocator to favor
                // audio over video when network conditions are constrained.
                params.encodings = [
                    { networkPriority: 'high' },
                ];
            }

            if (video) {
                const { encodings, codec } = this.getWebCamEncoding();
                console.log('GET WEBCAM ENCODING', {
                    encodings: encodings,
                    codecs: codec,
                });
                params.encodings = encodings;
                params.codecs = codec;
                params.codecOptions = {
                  videoGoogleStartBitrate: 300
                };
            }

            if (screen) {
                const { encodings, codec } = this.getScreenEncoding();
                console.log('GET SCREEN ENCODING', {
                    encodings: encodings,
                    codecs: codec,
                });
                params.encodings = encodings;
                params.codecs = codec;
                params.codecOptions = {
                    videoGoogleStartBitrate: 1000,
                };
            }

            console.log('PRODUCER TYPE AND PARAMS', {
                type: type,
                params: params,
            });

            const producer = await this.producerTransport.produce(params);

            if (!producer) {
                throw new Error('Producer not found!');
            }

            console.log('PRODUCER MEDIA TYPE ----> ' + type);
            console.log('PRODUCER', producer);

            this.producers.set(producer.id, producer);
            this.producerLabel.set(type, producer.id);

            // if screen sharing produce the tab audio + microphone
            if (screen && stream.getAudioTracks()[0]) {
                await this.produceScreenAudio(stream);
            }

            if (!audio) {
                this.localVideoStream = stream;

                elem = await this.handleProducer(producer.id, type, stream);

                if (video) {
                    this.localVideoElement = elem;
                    this.videoProducerId = producer.id;
                    camera = detectCameraFacingMode(stream);
                    handleCameraMirror(elem);
                }

                if (screen) {
                    this.screenProducerId = producer.id;
                    if (elem.classList.contains('mirror')) {
                        elem.classList.remove('mirror');
                    }
                }
            } else {
                this.localAudioStream = stream;

                elem = await this.handleProducer(producer.id, type, stream);

                this.audioProducerId = producer.id;

                getMicrophoneVolumeIndicator(stream);
            }

            if (video) {
                this.handleHideMe();
            }

            producer.on('trackended', () => {
                this.closeProducer(type, 'trackended');
            });

            producer.on('transportclose', () => {
                this.closeProducer(type, 'transportclose');
            });

            producer.on('close', () => {
                this.closeProducer(type, 'close');
            });

            switch (type) {
                case mediaType.audio:
                    this.setIsAudio(this.peer_id, true);
                    this.event(_EVENTS.startAudio);
                    break;
                case mediaType.video:
                    this.setIsVideo(true);
                    this.event(_EVENTS.startVideo);
                    break;
                case mediaType.screen:
                    this.setIsScreen(true);
                    this.event(_EVENTS.startScreen);
                    break;
                default:
                    break;
            }

            this.sound('joined');
            return producer;
        } catch (err) {
            console.error('Produce error:', err);
            handleMediaError(type, err);
        }
    }





    // ####################################################
    // AUDIO/VIDEO/SCREEN CONSTRAINTS
    // ####################################################

    getAudioConstraints(deviceId) {
        // If custom RNNoise is enabled but not supported, fall back to built-in WebRTC noise suppression
        const useBuiltInNoiseSuppression = !BUTTONS.settings.customNoiseSuppression || !this.isRNNoiseSupported;

        const audioConstraints = {
            echoCancellation: true,
            autoGainControl: true,
            noiseSuppression: useBuiltInNoiseSuppression,
        };
        /* 
        deviceId handling is platform-dependent:
            - iOS Safari: routing is OS-controlled; ignore deviceId.
            - Mobile (Android): best-effort with `ideal`.
            - Desktop: `exact` is reliable.
        */
        if (deviceId) {
            if (this.isMobileSafari) {
                // ignore
            } else if (this.isMobileDevice) {
                audioConstraints.deviceId = { ideal: deviceId };
            } else {
                audioConstraints.deviceId = { exact: deviceId };
            }
        }

        return {
            audio: audioConstraints,
        };
    }

    getCameraConstraints() {
        camera = camera == 'user' ? 'environment' : 'user';
        if (camera != 'user') this.camVideo = { facingMode: { exact: camera } };
        else this.camVideo = true;
        return {
            audio: false,
            video: this.camVideo,
        };
    }

    getResolutionMap() {
        return {
            qvga: [320, 240],
            vga: [640, 480],
            hd: [1280, 720],
            fhd: [1920, 1080],
            '2k': [2560, 1440],
            '4k': [3840, 2160],
            '6k': [6144, 3456],
            '8k': [7680, 4320],
        };
    }

    getVideoConstraints(deviceId) {
        const selectedValue = this.getSelectedIndexValue(videoFps);
        const customFrameRate = parseInt(selectedValue, 10);

        const resolutionMap = this.getResolutionMap();

        // Default to HD
        const [width, height] = resolutionMap[videoQuality.value] || [1280, 720];

        const constraints = {
            width: { ideal: width },
            height: { ideal: height },
            frameRate: { ideal: customFrameRate || 30 },
        };

        if (deviceId) {
            constraints.deviceId = { exact: deviceId };
        }

        return {
            audio: false,
            video: constraints,
        };
    }

    getScreenConstraints() {
        const selectedValue = this.getSelectedIndexValue(screenFps);
        const customFrameRate = parseInt(selectedValue, 10);

        const screenResolutionMap = this.getResolutionMap();

        // Default to Full HD
        const [width, height] = screenResolutionMap[screenQuality.value] || [1920, 1080];

        const videoConstraints = {
            width: { ideal: width },
            height: { ideal: height },
            frameRate: { ideal: customFrameRate || 30 },
        };

        return {
            audio: true,
            video: videoConstraints,
        };
    }

    // ####################################################
    // WEBCAM ENCODING
    // ####################################################

    getWebCamEncoding() {
        let encodings;
        let codec;

        // Tier-based dynamic scaling: adjust simulcast layer count and
        // bitrate ceiling based on current room size, so small calls stay
        // lightweight (less CPU/battery) and large rooms get full adaptive
        // quality layers. Mirrors how production video-conferencing systems
        // (e.g. Zoom) scale encoding config with room size.
        const roomSize = (typeof participantsCount !== 'undefined' && participantsCount) || this.peers.size || 1;
        let tierNumStreams;
        let tierMaxBitrate;
        if (roomSize <= 4) {
            tierNumStreams = 1;
            tierMaxBitrate = 1200000; // 1.2 Mbps - small call, full quality, low CPU load
        } else if (roomSize <= 25) {
            tierNumStreams = 2;
            tierMaxBitrate = 800000; // 800 kbps top layer
        } else {
            tierNumStreams = 3;
            tierMaxBitrate = 500000; // 500 kbps top layer - large room, prioritize scalability
        }
        console.log('WEBCAM ENCODING TIER', { roomSize, tierNumStreams, tierMaxBitrate });

        console.log('WEBCAM ENCODING', {
            forceVP8: this.forceVP8,
            forceVP9: this.forceVP9,
            forceH264: this.forceH264,
            forceAV1: this.forceAV1,
            numSimulcastStreamsWebcam: this.numSimulcastStreamsWebcam,
            enableWebcamLayers: this.enableWebcamLayers,
            webcamScalabilityMode: this.webcamScalabilityMode,
            rtpCapabilitiesCodecs: this.device.rtpCapabilities.codecs,
        });

        if (this.forceVP8) {
            codec = this.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/vp8');
            if (!codec) throw new Error('Desired VP8 codec+configuration is not supported');
        } else if (this.forceH264) {
            codec = this.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/h264');
            if (!codec) throw new Error('Desired H264 codec+configuration is not supported');
        } else if (this.forceVP9) {
            codec = this.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/vp9');
            if (!codec) throw new Error('Desired VP9 codec+configuration is not supported');
        } else if (this.forceAV1) {
            codec = this.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/av1');
            if (!codec) throw new Error('Desired AV1 codec+configuration is not supported');
        }

        if (this.enableWebcamLayers) {
            console.log('WEBCAM SIMULCAST/SVC ENABLED');

            const firstVideoCodec = this.device.rtpCapabilities.codecs.find((c) => c.kind === 'video');
            console.log('WEBCAM ENCODING: first codec available', { firstVideoCodec: firstVideoCodec });

            if (this.isMobileDevice) {
                // Mobile: single-layer stream to protect CPU/thermal, but still 
                // room-size aware (bitrate/framerate scale down for larger rooms, 
                // matching desktop tier logic direction)
                console.log('WEBCAM ENCODING: Mobile single-stream (thermal-safe)');
                encodings = [
                    {
                        scaleResolutionDownBy: roomSize <= 4 ? 1.5 : roomSize <= 25 ? 2 : 2.5,
                        maxBitrate: roomSize <= 4 ? 400000 : roomSize <= 25 ? 300000 : 200000,
                        maxFramerate: roomSize <= 4 ? 24 : 20,
                        scalabilityMode: this.webcamScalabilityMode || 'L1T3',
                    },
                ];
            } else if (
                ((this.forceVP9 || this.forceAV1) && codec) ||
                (firstVideoCodec?.mimeType &&
                    ['video/vp9', 'video/av1'].includes(firstVideoCodec.mimeType.toLowerCase()))
            ) {
                console.log('WEBCAM ENCODING: VP9 or AV1 with SVC');
                encodings = [
                    {
                        maxBitrate: tierMaxBitrate,
                        scalabilityMode: this.webcamScalabilityMode || 'L3T3_KEY',
                    },
                ];
            } else {
                console.log('WEBCAM ENCODING: VP8 or H264 with simulcast');
                encodings = [
                    {
                        scaleResolutionDownBy: 1,
                        maxBitrate: tierMaxBitrate,
                        scalabilityMode: this.webcamScalabilityMode || 'L1T3',
                    },
                ];
                if (tierNumStreams > 1) {
                    encodings.unshift({
                        scaleResolutionDownBy: 2,
                        maxBitrate: Math.round(tierMaxBitrate * 0.4),
                        scalabilityMode: this.webcamScalabilityMode || 'L1T3',
                    });
                }
                if (tierNumStreams > 2) {
                    encodings.unshift({
                        scaleResolutionDownBy: 4,
                        maxBitrate: Math.round(tierMaxBitrate * 0.15),
                        scalabilityMode: this.webcamScalabilityMode || 'L1T3',
                    });
                }
            }
        }
        return { encodings, codec };
    }

    // ####################################################
    // SCREEN ENCODING
    // ####################################################

    getScreenEncoding() {
        let encodings;
        let codec;

        console.log('SCREEN ENCODING', {
            forceVP8: this.forceVP8,
            forceVP9: this.forceVP9,
            forceH264: this.forceH264,
            forceAV1: this.forceAV1,
            numSimulcastStreamsSharing: this.numSimulcastStreamsSharing,
            enableSharingLayers: this.enableSharingLayers,
            sharingScalabilityMode: this.sharingScalabilityMode,
            rtpCapabilitiesCodecs: this.device.rtpCapabilities.codecs,
        });

        if (this.forceVP8) {
            codec = this.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/vp8');
            if (!codec) throw new Error('Desired VP8 codec+configuration is not supported');
        } else if (this.forceH264) {
            codec = this.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/h264');
            if (!codec) throw new Error('Desired H264 codec+configuration is not supported');
        } else if (this.forceVP9) {
            codec = this.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/vp9');
            if (!codec) throw new Error('Desired VP9 codec+configuration is not supported');
        } else if (this.forceAV1) {
            codec = this.device.rtpCapabilities.codecs.find((c) => c.mimeType.toLowerCase() === 'video/av1');
            if (!codec) throw new Error('Desired AV1 codec+configuration is not supported');
        }

        if (this.enableSharingLayers) {
            console.log('SCREEN SIMULCAST/SVC ENABLED');

            const firstVideoCodec = this.device.rtpCapabilities.codecs.find((c) => c.kind === 'video');
            console.log('SCREEN ENCODING: first codec available', { firstVideoCodec: firstVideoCodec });

            // If VP9 is the only available video codec then use SVC.
            if (
                ((this.forceVP9 || this.forceAV1) && codec) ||
                (firstVideoCodec?.mimeType &&
                    ['video/vp9', 'video/av1'].includes(firstVideoCodec.mimeType.toLowerCase()))
            ) {
                console.log('SCREEN ENCODING: VP9 or AV1 with SVC');
                encodings = [
                    {
                        maxBitrate: 5000000,
                        scalabilityMode: this.sharingScalabilityMode || 'L3T3',
                        dtx: true,
                    },
                ];
            } else {
                console.log('SCREEN ENCODING: VP8 or H264 with simulcast.');
                encodings = [
                    {
                        scaleResolutionDownBy: 1,
                        maxBitrate: 5000000,
                        scalabilityMode: this.sharingScalabilityMode || 'L1T3',
                        dtx: true,
                    },
                ];
                if (this.numSimulcastStreamsSharing > 1) {
                    encodings.unshift({
                        scaleResolutionDownBy: 2,
                        maxBitrate: 1000000,
                        scalabilityMode: this.sharingScalabilityMode || 'L1T3',
                        dtx: true,
                    });
                }
                if (this.numSimulcastStreamsSharing > 2) {
                    encodings.unshift({
                        scaleResolutionDownBy: 4,
                        maxBitrate: 500000,
                        scalabilityMode: this.sharingScalabilityMode || 'L1T3',
                        dtx: true,
                    });
                }
            }
        } else {
            // No simulcast or SVC enabled.
            encodings = [
                {
                    scaleResolutionDownBy: 1,
                    maxBitrate: 5000000,
                    dtx: true,
                },
            ];
        }
        return { encodings, codec };
    }

    // ####################################################
    // HELPERS
    // ####################################################

    createButton(id, className) {
        const button = document.createElement('button');
        button.id = id;
        button.className = className;
        return button;
    }

    createVideoLoader(id) {
        const loader = document.createElement('div');
        loader.id = id;
        loader.className = 'video-loader';
        loader.innerHTML = renderRoomTemplate('videoLoaderTemplate');
        return loader;
    }

    hideVideoLoader(container) {
        const loader = container.querySelector('.video-loader');
        if (loader) loader.style.display = 'none';
    }

    hideVideoLoaderOnPlay(videoElem) {
        const container = videoElem.parentElement;
        if (!container) return;
        const hide = () => {
            this.hideVideoLoader(container);
            videoElem.removeEventListener('playing', hide);
        };
        videoElem.addEventListener('playing', hide);
    }

    createElement(id, type, className) {
        const element = document.createElement(type);
        element.id = id;
        element.className = className;
        return element;
    }

    getConsumerIdByProducerId(producerId) {
        for (let [consumerId, consumer] of this.consumers.entries()) {
            if (consumer._producerId === producerId) {
                return consumerId;
            }
        }
        return null;
    }

    getProducerIdByConsumerId(consumerId) {
        const consumer = this.consumers.get(consumerId);
        if (consumer) {
            return consumer._producerId;
        }
        return null;
    }

    // ####################################################
    // PRODUCER
    // ####################################################

    handleHideMe() {
        const myScreenWrap = this.getId(this.screenProducerId + '__video');
        const myVideoWrap = this.getId(this.videoProducerId + '__video');
        const myVideoWrapOff = this.getId(this.peer_id + '__videoOff');
        const myVideoPinBtn = this.getId(this.videoProducerId + '__pin');
        const myScreenPinBtn = this.getId(this.screenProducerId + '__pin');
        console.log('handleHideMe', {
            isHideMeActive: isHideMeActive,
            myScreenWrap: myScreenWrap ? myScreenWrap.id : null,
            myVideoWrap: myVideoWrap ? myVideoWrap.id : null,
            myVideoWrapOff: myVideoWrapOff ? myVideoWrapOff.id : null,
            myVideoPinBtn: myVideoPinBtn ? myVideoPinBtn.id : null,
            myScreenPinBtn: myScreenPinBtn ? myScreenPinBtn.id : null,
        });
        if (myScreenWrap) myScreenWrap.style.display = isHideMeActive ? 'none' : 'block';
        if (isHideMeActive && this.isVideoPinned && myVideoPinBtn) myVideoPinBtn.click();
        if (isHideMeActive && this.isVideoPinned && myScreenPinBtn) myScreenPinBtn.click();
        if (myVideoWrap) myVideoWrap.style.display = isHideMeActive ? 'none' : 'block';
        if (myVideoWrapOff) myVideoWrapOff.style.display = isHideMeActive ? 'none' : 'block';
        hideMeIcon.className = isHideMeActive ? html.hideMeOn : html.hideMeOff;
        hideMeIcon.style.color = isHideMeActive ? 'red' : 'white';
        isHideMeActive ? this.sound('left') : this.sound('joined');
        resizeVideoMedia();
    }

    producerExist(type) {
        return this.producerLabel.has(type);
    }

    closeThenProduce(type, deviceId = null, swapCamera = false) {
        const previousCamera = camera;
        this.closeProducer(type, 'closeThenProduce');
        setTimeout(async function () {
            try {
                if (rc._duplicateSessionActive) return;
                await rc.produce(type, deviceId, swapCamera);
            } catch (err) {
                console.error('closeThenProduce error, restoring previous camera', err);
                if (swapCamera) {
                    camera = previousCamera;
                    try {
                        await rc.produce(type, deviceId, false);
                    } catch (restoreErr) {
                        console.error('Failed to restore previous camera', restoreErr);
                    }
                }
            }
        }, 1000);
    }

    async handleProducer(id, type, stream) {
        let elem, vb, vp, ts, d, p, i, au, pip, ha, fs, pm, pb, pn, pv, mv, st, dw, ri;
        switch (type) {
            case mediaType.video:
            case mediaType.screen:
                let isScreen = type === mediaType.screen;
                this.removeVideoOff(this.peer_id);

                d = document.createElement('div');
                d.className = 'Camera';
                d.id = id + '__video';
                d.dataset.peerId = this.peer_id;

                elem = document.createElement('video');
                elem.setAttribute('id', id);
                elem.setAttribute('volume', this.peer_id + '___pVolume');
                !isScreen && elem.setAttribute('name', this.peer_id);
                elem.setAttribute('playsinline', true);
                elem.controls = isVideoControlsOn;
                elem.autoplay = true;
                elem.muted = true;
                elem.volume = 0;
                elem.style.objectFit = isScreen || isBroadcastingEnabled ? 'contain' : 'var(--videoObjFit)';

                const localVideoLoader = this.createVideoLoader(id + '__loader');

                vb = document.createElement('div');
                vb.id = id + '__vb';
                vb.className = 'videoMenuBar hidden';

                pip = this.createButton(id + '__pictureInPicture', html.pip);
                ha = this.createButton(id + '__hideALL', html.hideALL + ' focusMode');
                fs = this.createButton(id + '__fullScreen', html.fullScreen);
                ts = this.createButton(id + '__snapshot', html.snapshot);
                mv = this.createButton(id + '__mirror', html.mirror);
                dw = this.createButton(id + '__draw', html.draw);
                pn = this.createButton(id + '__pin', html.pin);
                st = this.createElement(id + '__sessionTime', 'span', 'current-session-time notranslate');
                vp = this.createButton(this.peer_id + '__vp', html.videoPrivacy);
                au = this.createButton(
                    this.peer_id + '__audio',
                    this.peer_info.peer_audio ? html.audioOn : html.audioOff
                );
                au.style.cursor = 'default';

                p = document.createElement('p');
                p.id = this.peer_id + '__name';
                p.className = html.userName;
                p.innerText = (isPresenter ? '⭐️ ' : '') + this.peer_name + ' (me)';

                ri = this.createElement(this.peer_id + '__recIndicator', 'span', 'rec-indicator');
                ri.innerHTML = '🔴 ';
                p.appendChild(ri);
                if (this._isRecording) ri.classList.add('active');

                i = document.createElement('i');
                i.id = this.peer_id + '__hand';
                i.className = html.userHand;

                pm = document.createElement('div');
                pb = document.createElement('div');
                pm.setAttribute('id', this.peer_id + '_pitchMeter');
                pb.setAttribute('id', this.peer_id + '_pitchBar');
                pm.className = 'speechbar';
                pb.className = 'bar';
                pb.style.height = '1%';
                pm.appendChild(pb);

                pv = document.createElement('input');
                pv.id = this.peer_id + '___pVolume';
                pv.type = 'range';
                pv.min = 0;
                pv.max = 100;
                pv.value = 100;

                BUTTONS.producerVideo.audioVolumeInput && vb.appendChild(pv);
                BUTTONS.producerVideo.muteAudioButton && vb.appendChild(au);
                BUTTONS.producerVideo.videoPrivacyButton && !isScreen && vb.appendChild(vp);
                BUTTONS.producerVideo.snapShotButton && vb.appendChild(ts);
                BUTTONS.producerVideo.videoPictureInPicture &&
                    this.isVideoPictureInPictureSupported &&
                    vb.appendChild(pip);

                // Local dropdown menu
                const myDropdownDiv = document.createElement('div');
                const myDropdownBtn = this.createButton(id + '__dropdownBtn', html.expand);
                const myDropdownContent = document.createElement('div');
                myDropdownDiv.className = 'navbar-dropdown';
                myDropdownContent.className = 'navbar-dropdown-content';

                myDropdownContent.appendChild(this.createDropdownItem(mv, 'Mirror', myDropdownContent));
                BUTTONS.producerVideo.fullScreenButton &&
                    this.isVideoFullScreenSupported &&
                    myDropdownContent.appendChild(this.createDropdownItem(fs, 'Full Screen', myDropdownContent));

                myDropdownDiv.appendChild(myDropdownBtn);
                document.body.appendChild(myDropdownContent);
                myDropdownBtn._dropdownContent = myDropdownContent;
                this.handleDropdownEvents(myDropdownDiv, myDropdownBtn, myDropdownContent);

                vb.appendChild(myDropdownDiv);
                BUTTONS.producerVideo.audioVolumeInput && vb.appendChild(pv);
                BUTTONS.producerVideo.muteAudioButton && vb.appendChild(au);
                BUTTONS.producerVideo.videoPrivacyButton && !isScreen && vb.appendChild(vp);
                BUTTONS.producerVideo.snapShotButton && vb.appendChild(ts);
                BUTTONS.producerVideo.videoPictureInPicture &&
                    this.isVideoPictureInPictureSupported &&
                    vb.appendChild(pip);
                BUTTONS.producerVideo.drawingButton && isScreen && vb.appendChild(dw);
                BUTTONS.producerVideo.focusVideoButton && vb.appendChild(ha);
                if (!this.isMobileDevice) vb.appendChild(pn);

                vb.appendChild(st);

                d.appendChild(elem);
                d.appendChild(localVideoLoader);
                d.appendChild(pm);
                d.appendChild(i);
                d.appendChild(p);

                const hideVideoMenu = () => {
                    if (vb && !vb.classList.contains('hidden')) {
                        hide(vb);
                        setCamerasBorderNone();
                    }
                };

                if (this.isMobileDevice) {
                    vb.classList.add('mobile-floating');
                    document.body.appendChild(vb);
                } else {
                    vb.classList.remove('mobile-floating');
                    d.appendChild(vb);
                    d.addEventListener('mouseleave', hideVideoMenu);
                }
                vb.addEventListener('click', (e) => e.stopPropagation());

                this.videoMediaContainer.appendChild(d);

                await this.attachMediaStream(elem, stream, type, 'Producer');

                this.myVideoEl = elem;
                this.isVideoPictureInPictureSupported && this.handlePIP(elem.id, pip.id);
                this.isVideoFullScreenSupported && this.handleFS(elem.id, fs.id);
                this.handleVB(d.id, vb.id);
                this.handleDD(elem.id, this.peer_id, true);
                this.handleTS(elem.id, ts.id);
                this.handleMV(elem.id, mv.id);
                this.handleHA(ha.id, d.id);
                BUTTONS.producerVideo.drawingButton && isScreen && this.handleDW(dw.id, d.id);
                this.handlePN(elem.id, pn.id, d.id, isScreen);
                this.handleZV(elem.id, d.id, this.peer_id);
                this.handlePV(id + '___' + pv.id);

                this.setAV(
                    this.audioConsumers.get(this.peer_id + '___pVolume'),
                    this.peer_id + '___pVolume',
                    this.peer_info.peer_audio_volume
                );

                if (!isScreen) this.handleVP(elem.id, vp.id);

                this.popupPeerInfo(p.id, this.peer_info);
                this.checkPeerInfoStatus(this.peer_info);

                if (isScreen && this.videoMediaContainer.childElementCount > 1) pn.click();

                if (!this.isMobileDevice) {
                    this.setTippy(pn.id, 'Toggle Pin', 'bottom');
                    this.setTippy(ha.id, 'Toggle Focus mode', 'bottom');
                    this.setTippy(pip.id, 'Toggle picture in picture', 'bottom');
                    this.setTippy(ts.id, 'Snapshot', 'bottom');
                    this.setTippy(vp.id, 'Toggle video privacy', 'bottom');
                    this.setTippy(au.id, 'Audio status', 'bottom');
                }

                handleAspectRatio();
                console.log('[addProducer] Video-element-count', this.videoMediaContainer.childElementCount);
                break;
            case mediaType.audio:
                elem = document.createElement('audio');
                elem.setAttribute('id', id);
                elem.setAttribute('name', 'LOCAL-AUDIO');
                elem.setAttribute('volume', this.peer_id + '___pVolume');
                elem.controls = false;
                elem.autoplay = true;
                elem.muted = true;
                elem.volume = 0;
                this.myAudioEl = elem;
                this.localAudioEl.appendChild(elem);

                await this.attachMediaStream(elem, stream, type, 'Producer');

                const audioConsumerId = this.peer_id + '___pVolume';
                this.audioConsumers.set(audioConsumerId, elem.id);

                this.setAV(elem.id, audioConsumerId, this.peer_info.peer_audio_volume);
                this.handlePV(elem.id + '___' + audioConsumerId);

                console.log('[addProducer] audio-element-count', this.localAudioEl.childElementCount);
                break;
            default:
                break;
        }
        return elem;
    }

    async pauseProducer(type) {
        if (!this.producerLabel.has(type)) {
            return console.warn('There is no producer for this type ' + type);
        }

        const producer_id = this.producerLabel.get(type);
        this.producers.get(producer_id).pause();

        try {
            const response = await this.socket.request('pauseProducer', { producer_id, type });
            console.log('Producer paused', response);
        } catch (error) {
            console.error('Error pausing producer', error);
        }

        switch (type) {
            case mediaType.audio:
                this.event(_EVENTS.pauseAudio);
                break;
            case mediaType.video:
                this.event(_EVENTS.pauseVideo);
                break;
            case mediaType.screen:
                this.event(_EVENTS.pauseScreen);
                break;
            default:
                return;
        }
    }

    async resumeProducer(type) {
        if (!this.producerLabel.has(type)) {
            return console.warn('There is no producer for this type ' + type);
        }

        const producer_id = this.producerLabel.get(type);
        this.producers.get(producer_id).resume();

        try {
            const response = await this.socket.request('resumeProducer', { producer_id, type });
            console.log('Producer resumed', response);
        } catch (error) {
            console.error('Error resuming producer', error);
        }

        switch (type) {
            case mediaType.audio:
                this.event(_EVENTS.resumeAudio);
                break;
            case mediaType.video:
                this.event(_EVENTS.resumeVideo);
                break;
            case mediaType.screen:
                this.event(_EVENTS.resumeScreen);
                break;
            default:
                return;
        }
    }

    closeProducer(type, event = 'Close Producer') {
        if (!this.producerLabel.has(type)) {
            return console.warn('There is no producer for this type ' + type);
        }

        const producer_id = this.producerLabel.get(type);
        const producer = this.producers.get(producer_id);

        // Stop all tracks of the producer's stream
        if (producer && producer.track) {
            try {
                producer.track.stop();
            } catch (err) {
                console.warn('Error stopping producer track:', err);
            }
        }

        const data = {
            peer_name: this.peer_name,
            producer_id: producer_id,
            type: type,
            status: false,
        };
        console.log(`${event} ${type}`, data);

        this.socket.emit('producerClosed', data);

        this.producers.get(producer_id).close();
        this.producers.delete(producer_id);
        this.producerLabel.delete(type);

        console.log(`[${event}] - PRODUCER LABEL`, this.producerLabel);

        if (type === mediaType.video || type === mediaType.screen) {
            if (this.isVideoPinned && this.pinnedVideoPlayerId == producer_id) {
                this.removeVideoPinMediaContainer();
                console.log('Remove pin container due the Producer close', {
                    producer_id: producer_id,
                    producer_type: type,
                });
            }

            const video = this.getId(producer_id);
            this.removeVideoProducer(video, event);
        }

        if (type === mediaType.audio) {
            const audio = this.getId(producer_id);
            this.removeAudioProducer(audio, event);
        }

        if (type === mediaType.audioTab) {
            const auTab = this.getId(producer_id);
            this.removeAudioProducer(auTab, event);
        }

        switch (type) {
            case mediaType.audioTab:
                console.log('Closed audio tab');
                break;
            case mediaType.audio:
                this.setIsAudio(this.peer_id, false);
                this.event(_EVENTS.stopAudio);
                break;
            case mediaType.video:
                this.setIsVideo(false);
                this.event(_EVENTS.stopVideo);
                break;
            case mediaType.screen:
                this.setIsScreen(false);
                this.event(_EVENTS.stopScreen);
                if (this.producerLabel.has(mediaType.audioTab)) {
                    this.closeProducer(mediaType.audioTab, event);
                }
                break;
            default:
                break;
        }
        this.sound('left');
    }

    async produceScreenAudio(stream) {
        try {
            if (this.producerLabel.has(mediaType.audioTab)) {
                return console.warn('Producer already exists for this type ' + mediaType.audioTab);
            }

            const track = stream.getAudioTracks()[0];
            const params = {
                track,
                appData: {
                    mediaType: mediaType.audio,
                },
            };

            const producerSa = await this.producerTransport.produce(params);

            console.log('PRODUCER SCREEN AUDIO', producerSa);

            this.producers.set(producerSa.id, producerSa);
            this.producerLabel.set(mediaType.audioTab, producerSa.id);

            console.log('[produceScreenAudio] - PRODUCER LABEL', this.producerLabel);

            await this.handleProducer(producerSa.id, mediaType.audio, stream);

            producerSa.on('trackended', () => {
                this.closeProducer(mediaType.audioTab, 'trackended');
            });

            producerSa.on('transportclose', () => {
                this.closeProducer(mediaType.audioTab, 'transportclose');
            });

            producerSa.on('close', () => {
                this.closeProducer(mediaType.audioTab, 'close');
            });
        } catch (err) {
            console.error('Produce Screen Audio error:', err);
        }
    }

    // ####################################################
    // REMOVE PRODUCER VIDEO/AUDIO
    // ####################################################

    removeVideoProducer(video, event) {
        const d = this.getId(video.id + '__video');
        const vb = this.getId(video.id + '__vb');

        // Destroy drawing overlay if present
        if (d && typeof VideoDrawingOverlay !== 'undefined') {
            VideoDrawingOverlay.destroyById(d.id);
        }

        // Clean up dropdown menus appended to body
        if (vb) {
            const dropdownBtns = vb.querySelectorAll('[id$="_expandBtn"], [id$="__dropdownBtn"]');
            dropdownBtns.forEach((btn) => {
                if (btn._dropdownContent) {
                    btn._dropdownContent.remove();
                }
            });
        }

        video.srcObject.getTracks().forEach(function (track) {
            track.stop();
        });
        video.parentNode.removeChild(video);

        d.parentNode.removeChild(d);
        vb.parentNode.removeChild(vb);

        handleAspectRatio();

        console.log(`[${event}] Video-element-count`, this.videoMediaContainer.childElementCount);
    }

    removeAudioProducer(audio, event) {
        audio.srcObject.getTracks().forEach(function (track) {
            track.stop();
        });
        audio.parentNode.removeChild(audio);

        console.log(`[${event}] audio-element-count`, this.localAudioEl.childElementCount);
    }

    // ####################################################
    // CONSUMER
    // ####################################################

    async consume(producer_id, peer_name, peer_info, type) {
        await this.ensureTransport('consumer');
        try {
            const { consumer, stream, kind } = await this.getConsumeStream(producer_id, peer_info.peer_id, type);

            console.log('CONSUMER MEDIA TYPE ----> ' + type);
            console.log('CONSUMER', consumer);

            this.consumers.set(consumer.id, consumer);

            await this.handleConsumer(consumer.id, type, stream, peer_name, peer_info);

            // https://mediasoup.discourse.group/t/create-server-side-consumers-with-paused-true/244
            try {
                const response = await this.socket.request('resumeConsumer', { consumer_id: consumer.id, type });
                console.log('Consumer resumed', response);
            } catch (error) {
                console.error('Error resuming consumer', error);
            }

            if (kind === 'video' && isParticipantsListOpen) {
                await getRoomParticipants();
            }

            wbUpdate();

            this.editorUpdate();

            consumer.on('trackended', () => {
                console.log('Consumer track end', { id: consumer.id, type });
                this.removeConsumer(consumer.id, consumer.kind);
            });

            consumer.on('transportclose', () => {
                console.log('Consumer transport close', { id: consumer.id, type });
                this.removeConsumer(consumer.id, consumer.kind);
            });
        } catch (error) {
            console.error('Error in consume', error);

            popupHtmlMessage(null, image.network, 'Consume', error, 'center', false, false);
        }
    }

    // ####################################################
    // DATA CHANNEL (Chat via mediasoup DataChannel)
    // ####################################################

    async initChatDataProducer() {
        if (!this.producerTransport) {
            console.warn('Producer transport not available, skipping chat DataProducer creation');
            return;
        }

        try {
            this.chatDataProducer = await this.producerTransport.produceData({
                ordered: true,
                maxRetransmits: 3,
                label: 'chat',
                appData: { type: 'chat' },
            });

            this.chatDataProducer.on('open', () => {
                console.log('✅ Chat DataProducer open');
            });

            this.chatDataProducer.on('close', () => {
                console.log('Chat DataProducer closed');
                this.chatDataProducer = null;
            });

            this.chatDataProducer.on('error', (error) => {
                console.error('Chat DataProducer error', error);
            });

            this.chatDataProducer.on('transportclose', () => {
                console.log('Chat DataProducer transport closed');
                this.chatDataProducer = null;
            });

            console.log('Chat DataProducer created', { id: this.chatDataProducer.id });
        } catch (error) {
            console.error('Failed to create chat DataProducer', error);
            this.chatDataProducer = null;
        }
    }

    async consumeData(dataProducerId) {
        if (!this.consumerTransport) {
            console.warn('Consumer transport not available, skipping DataConsumer creation');
            return;
        }

        try {
            const params = await this.socket.request('consumeData', {
                consumerTransportId: this.consumerTransport.id,
                dataProducerId,
            });

            if (!params || params.error) {
                console.error('ConsumeData error', params?.error);
                return;
            }

            const dataConsumer = await this.consumerTransport.consumeData({
                id: params.id,
                dataProducerId: params.dataProducerId,
                sctpStreamParameters: params.sctpStreamParameters,
                label: params.label,
                protocol: params.protocol,
                appData: params.appData,
            });

            dataConsumer.on('message', (data) => {
                try {
                    const msg = JSON.parse(data);
                    if (msg.type === 'chat') {
                        console.log('DataChannel chat message received', msg);
                        // Drop messages that violate current moderator restrictions
                        const isPublicMessage = msg.to_peer_id === 'all';
                        const isAIMessage = ['ChatGPT', 'DeepSeek'].includes(msg.to_peer_id);
                        if (!isAIMessage) {
                            if (isPublicMessage && this._moderator.chat_cant_publicly) {
                                console.warn('Dropping DataChannel public message: disabled by moderator', msg);
                                return;
                            }
                            if (!isPublicMessage && this._moderator.chat_cant_privately) {
                                console.warn('Dropping DataChannel private message: disabled by moderator', msg);
                                return;
                            }
                        }
                        this.showMessage(msg);
                    }
                } catch (error) {
                    console.error('Failed to parse DataChannel message', error);
                }
            });

            dataConsumer.on('close', () => {
                console.log('DataConsumer closed', { id: dataConsumer.id });
                this.chatDataConsumers.delete(dataConsumer.id);
            });

            dataConsumer.on('error', (error) => {
                console.error('DataConsumer error', { id: dataConsumer.id, error });
            });

            dataConsumer.on('transportclose', () => {
                console.log('DataConsumer transport closed', { id: dataConsumer.id });
                this.chatDataConsumers.delete(dataConsumer.id);
            });

            this.chatDataConsumers.set(dataConsumer.id, dataConsumer);

            console.log('DataConsumer created', {
                id: dataConsumer.id,
                dataProducerId: params.dataProducerId,
                label: params.label,
            });
        } catch (error) {
            console.error('Failed to consume data', error);
        }
    }

    isChatDataChannelOpen() {
        return this.chatDataProducer && !this.chatDataProducer.closed && this.chatDataProducer.readyState === 'open';
    }

    sendChatDataChannelMessage(data) {
        if (!this.isChatDataChannelOpen()) return false;

        try {
            const message = JSON.stringify(data);
            this.chatDataProducer.send(message);
            return true;
        } catch (error) {
            console.error('Failed to send DataChannel message', error);
            return false;
        }
    }

    async getConsumeStream(producerId, peer_id, type) {
        if (!this.device) {
            throw new Error('Device not initialized');
        }

        // Check if consumer transport exists
        if (!this.consumerTransport) {
            throw new Error('Consumer transport not initialized');
        }

        const { rtpCapabilities } = this.device;

        const data = await this.socket.request('consume', {
            consumerTransportId: this.consumerTransport.id,
            rtpCapabilities,
            producerId,
            type,
        });

        const { id, kind, rtpParameters } = data;
        const codecOptions = {};
        const streamId = peer_id + (type == mediaType.screen ? '-screen-sharing' : '-mic-webcam');
        const consumer = await this.consumerTransport.consume({
            id,
            producerId,
            kind,
            rtpParameters,
            codecOptions,
            streamId,
            appData: { peerId: peer_id, mediaType: type },
        });

        const stream = new MediaStream();
        stream.addTrack(consumer.track);

        return {
            consumer,
            stream,
            kind,
        };
    }

    async handleConsumer(id, type, stream, peer_name, peer_info) {
        let elem, vb, d, p, i, cm, au, pip, fs, ts, sf, sm, sv, gl, ban, ko, pb, pm, pv, pn, ha, mv, dw;

        let eDiv, eBtn, eVc; // expand buttons

        console.log('PEER-INFO', peer_info);

        const remotePeerId = peer_info.peer_id;
        const remoteIsScreen = type == mediaType.screen;
        const remotePeerAudio = peer_info.peer_audio;
        const remotePeerAudioVolume = peer_info.peer_audio_volume;
        const remotePrivacyOn = peer_info.peer_video_privacy;
        const remotePeerPresenter = peer_info.peer_presenter;

        switch (type) {
            case mediaType.video:
            case mediaType.screen:
                this.removeVideoOff(remotePeerId);

                const existingTile = this.videoMediaContainer.querySelector(
                    `[data-peer-id="${remotePeerId}"][data-media-type="${type}"]`
                );
                if (existingTile) {
                    const oldVideoEl = existingTile.querySelector('video');
                    if (oldVideoEl) {
                        try {
                            const oldStream = oldVideoEl.srcObject;
                            if (oldStream) {
                                oldStream.getTracks().forEach((track) => track.stop());
                            }
                            oldVideoEl.srcObject = null;
                        } catch (err) {
                            console.warn('[handleConsumer] Error stopping stale track', err);
                        }
                    }
                    try {
                        existingTile.parentNode.removeChild(existingTile);
                        console.log('[handleConsumer] Removed stale duplicate tile for', remotePeerId, type);
                    } catch (err) {
                        console.warn('[handleConsumer] Error removing stale tile', err);
                    }
                }

                d = document.createElement('div');
                d.className = 'Camera';
                d.id = id + '__video';
                d.dataset.peerId = remotePeerId;
                d.dataset.mediaType = remoteIsScreen ? 'screen' : 'video';

                elem = document.createElement('video');
                elem.setAttribute('id', id);
                elem.setAttribute('volumeBar', remotePeerId + '___pVolume');
                !remoteIsScreen && elem.setAttribute('name', remotePeerId);
                elem.setAttribute('playsinline', true);
                elem.controls = isVideoControlsOn;
                elem.autoplay = true;
                elem.muted = true;
                elem.className = '';
                elem.style.objectFit = remoteIsScreen || isBroadcastingEnabled ? 'contain' : 'var(--videoObjFit)';

                const remoteVideoLoader = this.createVideoLoader(id + '__loader');

                vb = document.createElement('div');
                vb.id = id + '__vb';
                vb.className = 'videoMenuBar hidden';

                eDiv = document.createElement('div');
                eDiv.className = 'navbar-dropdown';

                eBtn = this.createButton(
                    remotePeerId + (type === mediaType.screen ? '_screen_' : '_video_') + '_expandBtn',
                    html.expand
                );

                eVc = document.createElement('div');
                eVc.className = 'navbar-dropdown-content';
                eVc.id = remotePeerId + (type === mediaType.screen ? '_screen_' : '_video_') + '_videoExpandContent';

                pip = this.createButton(id + '__pictureInPicture', html.pip);
                mv = this.createButton(id + '__videoMirror', html.mirror);
                fs = this.createButton(id + '__fullScreen', html.fullScreen);
                ts = this.createButton(id + '__snapshot', html.snapshot);
                dw = this.createButton(id + '__draw', html.draw);
                pn = this.createButton(id + '__pin', html.pin);
                ha = this.createButton(id + '__hideALL', html.hideALL + ' focusMode');
                sf = this.createButton(id + '___' + remotePeerId + '___sendFile', html.sendFile);
                sm = this.createButton(id + '___' + remotePeerId + '___sendMsg', html.sendMsg);
                sv = this.createButton(id + '___' + remotePeerId + '___sendVideo', html.sendVideo);
                cm = this.createButton(id + '___' + remotePeerId + '___video', html.videoOn);
                au = this.createButton(remotePeerId + '__audio', remotePeerAudio ? html.audioOn : html.audioOff);
                gl = this.createButton(id + '___' + remotePeerId + '___geoLocation', html.geolocation);
                ban = this.createButton(id + '___' + remotePeerId + '___ban', html.ban);
                ko = this.createButton(id + '___' + remotePeerId + '___kickOut', html.kickOut);

                i = document.createElement('i');
                i.id = remotePeerId + '__hand';
                i.className = html.userHand;

                p = document.createElement('p');
                p.id = remotePeerId + '__name';
                p.className = html.userName;
                p.innerText = (remotePeerPresenter ? '⭐️ ' : '') + peer_name;

                pm = document.createElement('div');
                pb = document.createElement('div');
                pm.setAttribute('id', remotePeerId + '__pitchMeter');
                pb.setAttribute('id', remotePeerId + '__pitchBar');
                pm.className = 'speechbar';
                pb.className = 'bar';
                pb.style.height = '1%';
                pm.appendChild(pb);

                pv = document.createElement('input');
                pv.id = remotePeerId + '___pVolume';
                pv.type = 'range';
                pv.min = 0;
                pv.max = 100;
                pv.value = 100;

                // Build dropdown items
                eVc.appendChild(this.createDropdownItem(mv, 'Mirror', eVc));
                BUTTONS.consumerVideo.fullScreenButton &&
                    this.isVideoFullScreenSupported &&
                    eVc.appendChild(this.createDropdownItem(fs, 'Full Screen', eVc));
                BUTTONS.consumerVideo.sendMessageButton &&
                    eVc.appendChild(this.createDropdownItem(sm, 'Private Message', eVc));
                BUTTONS.consumerVideo.geolocationButton &&
                    eVc.appendChild(this.createDropdownItem(gl, 'Geo Location', eVc));
                BUTTONS.consumerVideo.sendFileButton && eVc.appendChild(this.createDropdownItem(sf, 'Send File', eVc));
                BUTTONS.consumerVideo.sendVideoButton &&
                    eVc.appendChild(this.createDropdownItem(sv, 'Send Video/Audio', eVc));
                BUTTONS.consumerVideo.banButton && eVc.appendChild(this.createDropdownItem(ban, 'Ban', eVc, 'red'));
                BUTTONS.consumerVideo.ejectButton &&
                    eVc.appendChild(this.createDropdownItem(ko, 'Kick Out', eVc, 'red'));

                eDiv.appendChild(eBtn);
                document.body.appendChild(eVc);
                eBtn._dropdownContent = eVc;
                this.handleDropdownEvents(eDiv, eBtn, eVc);

                vb.appendChild(eDiv);
                BUTTONS.consumerVideo.audioVolumeInput && vb.appendChild(pv);
                vb.appendChild(au);
                vb.appendChild(cm);
                BUTTONS.consumerVideo.snapShotButton && vb.appendChild(ts);
                BUTTONS.consumerVideo.videoPictureInPicture &&
                    this.isVideoPictureInPictureSupported &&
                    vb.appendChild(pip);
                BUTTONS.consumerVideo.drawingButton && remoteIsScreen && vb.appendChild(dw);
                BUTTONS.consumerVideo.focusVideoButton && vb.appendChild(ha);

                if (!this.isMobileDevice) vb.appendChild(pn);

                d.appendChild(elem);
                d.appendChild(remoteVideoLoader);
                d.appendChild(i);
                d.appendChild(p);
                d.appendChild(pm);

                if (this.isMobileDevice) {
                    vb.classList.add('mobile-floating');
                    document.body.appendChild(vb);
                } else {
                    vb.classList.remove('mobile-floating');
                    d.appendChild(vb);
                }
                vb.addEventListener('click', (e) => e.stopPropagation());

                this.videoMediaContainer.appendChild(d);

                await this.attachMediaStream(elem, stream, type, 'Consumer');

                this.isVideoPictureInPictureSupported && this.handlePIP(elem.id, pip.id);
                this.isVideoFullScreenSupported && this.handleFS(elem.id, fs.id);
                this.handleVB(d.id, vb.id);
                this.handleDD(elem.id, remotePeerId);
                this.handleTS(elem.id, ts.id);
                this.handleMV(elem.id, mv.id);
                BUTTONS.consumerVideo.drawingButton && remoteIsScreen && this.handleDW(dw.id, d.id);
                this.handleSF(sf.id, peer_name);
                this.handleHA(ha.id, d.id);
                this.handleSM(sm.id, peer_name);
                this.handleSV(sv.id, peer_name);
                BUTTONS.consumerVideo.muteVideoButton && this.handleCM(cm.id);
                BUTTONS.consumerVideo.muteAudioButton && this.handleAU(au.id);
                this.handleCV(id + '___' + pv.id);
                this.handleGL(gl.id);
                this.handleBAN(ban.id);
                this.handleKO(ko.id);
                this.handlePN(elem.id, pn.id, d.id, remoteIsScreen);
                this.handleZV(elem.id, d.id, remotePeerId);
                this.popupPeerInfo(p.id, peer_info);
                this.checkPeerInfoStatus(peer_info);

                if (!remoteIsScreen && remotePrivacyOn) this.setVideoPrivacyStatus(remotePeerId, remotePrivacyOn);

                if (remoteIsScreen && !isHideALLVideosActive) pn.click();

                if (isHideALLVideosActive) {
                    isHideALLVideosActive = false;
                    const children = this.videoMediaContainer.children;
                    const btnsHA = document.querySelectorAll('.focusMode');
                    for (let child of children) {
                        child.style.display = 'block';
                    }
                    btnsHA.forEach((btn) => {
                        btn.style.color = 'white';
                    });
                }

                if (!this.isMobileDevice) {
                    this.setTippy(pn.id, 'Toggle Pin', 'bottom');
                    this.setTippy(ha.id, 'Toggle Focus mode', 'bottom');
                    this.setTippy(pip.id, 'Toggle picture in picture', 'bottom');
                    this.setTippy(ts.id, 'Snapshot', 'bottom');
                    this.setTippy(cm.id, 'Hide', 'bottom');
                    this.setTippy(au.id, 'Mute', 'bottom');
                    this.setTippy(pv.id, '🔊 Volume', 'bottom');
                }

                // Use helper function to set audio volume
                this.setAV(
                    this.audioConsumers.get(remotePeerId + '___pVolume'),
                    remotePeerId + '___pVolume',
                    remotePeerAudioVolume,
                    true
                );

                this.setPeerAudio(remotePeerId, remotePeerAudio);

                handleAspectRatio();
                console.log('[addConsumer] Video-element-count', this.videoMediaContainer.childElementCount);

                this.sound('joined');
                break;
            case mediaType.audio:
                elem = document.createElement('audio');
                elem.setAttribute('id', id);
                elem.setAttribute('volumeBar', remotePeerId + '___pVolume');
                elem.autoplay = true;
                elem.volume = 1.0;

                if (!this.hasAudioTrack(stream)) {
                    elem.muted = true;
                }

                this.remoteAudioEl.appendChild(elem);

                await this.attachMediaStream(elem, stream, type, 'Consumer');

                // Store audio consumer and set volume
                const audioConsumerId = remotePeerId + '___pVolume';
                this.audioConsumers.set(audioConsumerId, id);

                // Use helper function to set audio volume
                this.setAV(id, audioConsumerId, remotePeerAudioVolume, true);
                this.handleCV(id + '___' + audioConsumerId);

                this.setPeerAudio(remotePeerId, remotePeerAudio);

                if (sinkId && speakerSelect.value) {
                    this.changeAudioDestination(elem, false);
                }

                //elem.addEventListener('play', () => { elem.volume = 0.1 });
                console.log('[Add audioConsumers]', this.audioConsumers);
                break;
            default:
                break;
        }
        return elem;
    }

    evaluateConsumerQuality(consumerId, score) {
        if (!this.consumerQualityHistory) {
            this.consumerQualityHistory = new Map();
        }

        const history = this.consumerQualityHistory.get(consumerId) || {
            lowScoreCount: 0,
            highScoreCount: 0,
            lastDecision: 'none',
        };

        const scoreVal = typeof score === 'object' && score !== null ? (score.score ?? 10) : score;
        let decision = 'none';

        if (scoreVal <= 3) {
            history.lowScoreCount++;
            history.highScoreCount = 0;
            if (history.lowScoreCount >= 2 && history.lastDecision !== 'downgrade') {
                decision = 'downgrade';
                history.lastDecision = 'downgrade';
            }
        } else if (scoreVal >= 7) {
            history.highScoreCount++;
            history.lowScoreCount = 0;
            if (history.highScoreCount >= 3 && history.lastDecision === 'downgrade') {
                decision = 'upgrade';
                history.lastDecision = 'upgrade';
            }
        } else {
            history.lowScoreCount = 0;
            history.highScoreCount = 0;
        }

        this.consumerQualityHistory.set(consumerId, history);
        console.log('QUALITY DECISION', consumerId, decision, scoreVal);
        if (decision !== 'none') {
            this.socket.emit('adjustConsumerQuality', { consumerId, direction: decision });
        }
        return decision;
    }

    removeConsumer(consumer_id, consumer_kind) {
        this.pendingResumes.delete(consumer_id);
        if (this.consumerQualityHistory) {
            this.consumerQualityHistory.delete(consumer_id);
        }
        if (!this.consumers.get(consumer_id)) return;

        console.log('Remove consumer', { consumer_id: consumer_id, consumer_kind: consumer_kind });

        const elem = this.getId(consumer_id);
        if (elem) {
            elem.srcObject.getTracks().forEach(function (track) {
                track.stop();
            });
            elem.parentNode.removeChild(elem);
        }

        if (consumer_kind === 'video') {
            const d = this.getId(consumer_id + '__video');
            const vb = this.getId(consumer_id + '__vb');

            if (d) {
                // Destroy drawing overlay if present
                if (typeof VideoDrawingOverlay !== 'undefined') {
                    VideoDrawingOverlay.destroyById(d.id);
                }

                // Clean up dropdown menus appended to body
                const dropdownBtns = vb ? vb.querySelectorAll('[id$="_expandBtn"], [id$="__dropdownBtn"]') : [];
                dropdownBtns.forEach((btn) => {
                    if (btn._dropdownContent) {
                        btn._dropdownContent.remove();
                    }
                });

                // Check if video is in focus-mode...
                if (d.hasAttribute('focus-mode')) {
                    const dhaBtn = this.getId(consumer_id + '__hideALL');
                    if (dhaBtn) {
                        dhaBtn.click();
                    }
                }
                d.parentNode.removeChild(d);
                vb.parentNode.removeChild(vb);

                //alert(this.pinnedVideoPlayerId + '==' + consumer_id);
                if (this.isVideoPinned && this.pinnedVideoPlayerId == consumer_id) {
                    this.removeVideoPinMediaContainer();
                    console.log('Remove pin container due the Consumer close', {
                        consumer_id: consumer_id,
                        consumer_kind: consumer_kind,
                    });
                }
            }

            handleAspectRatio();
            this.updateGrid();
            console.log(
                '[removeConsumer - ' + consumer_kind + '] Video-element-count',
                this.videoMediaContainer.childElementCount
            );
        }

        if (consumer_kind === 'audio') {
            const audioConsumerPlayerId = this.getMapKeyByValue(this.audioConsumers, consumer_id);
            if (audioConsumerPlayerId) {
                const inputPv = this.getId(audioConsumerPlayerId);
                if (inputPv) inputPv.style.display = 'none';
                this.audioConsumers.delete(audioConsumerPlayerId);
                console.log('Remove audio Consumer', {
                    consumer_id: consumer_id,
                    audioConsumerPlayerId: audioConsumerPlayerId,
                    audioConsumers: this.audioConsumers,
                });
            }
        }

        this.consumers.get(consumer_id).close();
        this.consumers.delete(consumer_id);
        this.sound('left');
    }

    // ####################################################
    // HANDLE VIDEO OFF
    // ####################################################

    setVideoOff(peer_info, remotePeer = false) {
        //console.log('setVideoOff', peer_info);
        let d, vb, i, h, au, sf, sm, sv, gl, ban, ko, p, pm, pb, pv, st, ri;

        const { peer_id, peer_name, peer_avatar, peer_audio, peer_presenter } = peer_info;

        this.removeVideoOff(peer_id);

        d = document.createElement('div');
        d.className = 'Camera';
        d.id = peer_id + '__videoOff';
        d.dataset.peerId = peer_id;

        vb = document.createElement('div');
        vb.id = peer_id + '__vb';
        vb.className = 'videoMenuBar hidden';

        au = this.createButton(peer_id + '__audio', peer_audio ? html.audioOn : html.audioOff);

        pv = document.createElement('input');
        pv.id = peer_id + '___pVolume';
        pv.type = 'range';
        pv.min = 0;
        pv.max = 100;
        pv.value = 100;

        if (remotePeer) {
            sf = this.createButton('remotePeer___' + peer_id + '___sendFile', html.sendFile);
            sm = this.createButton('remotePeer___' + peer_id + '___sendMsg', html.sendMsg);
            sv = this.createButton('remotePeer___' + peer_id + '___sendVideo', html.sendVideo);
            gl = this.createButton('remotePeer___' + peer_id + '___geoLocation', html.geolocation);
            ban = this.createButton('remotePeer___' + peer_id + '___ban', html.ban);
            ko = this.createButton('remotePeer___' + peer_id + '___kickOut', html.kickOut);
        } else {
            st = this.createElement(peer_id + '__sessionTime', 'span', 'current-session-time notranslate');
        }

        i = document.createElement('img');
        i.className = 'videoAvatarImage center'; // pulsate
        i.id = peer_id + '__img';

        p = document.createElement('p');
        p.id = peer_id + '__name';
        p.className = html.userName;
        p.innerText = (peer_presenter ? '⭐️ ' : '') + peer_name + (remotePeer ? '' : ' (me) ');

        if (!remotePeer) {
            ri = this.createElement(peer_id + '__recIndicator', 'span', 'rec-indicator');
            ri.innerHTML = '🔴 ';
            p.appendChild(ri);
            if (this._isRecording) ri.classList.add('active');
        }

        h = document.createElement('i');
        h.id = peer_id + '__hand';
        h.className = html.userHand;

        pm = document.createElement('div');
        pb = document.createElement('div');
        pm.setAttribute('id', peer_id + '__pitchMeter');
        pb.setAttribute('id', peer_id + '__pitchBar');
        pm.className = 'speechbar';
        pb.className = 'bar';
        pb.style.height = '1%';
        pm.appendChild(pb);

        if (remotePeer) {
            BUTTONS.videoOff.ejectButton && vb.appendChild(ko);
            BUTTONS.videoOff.banButton && vb.appendChild(ban);
            BUTTONS.videoOff.geolocationButton && vb.appendChild(gl);
            BUTTONS.videoOff.sendVideoButton && vb.appendChild(sv);
            BUTTONS.videoOff.sendFileButton && vb.appendChild(sf);
            BUTTONS.videoOff.sendMessageButton && vb.appendChild(sm);
        }
        BUTTONS.videoOff.audioVolumeInput && vb.appendChild(pv);

        vb.appendChild(au);
        if (!remotePeer) vb.appendChild(st);

        d.appendChild(i);
        d.appendChild(p);
        d.appendChild(h);
        d.appendChild(pm);

        const hideVideoMenu = () => {
            if (vb && !vb.classList.contains('hidden')) {
                hide(vb);
                setCamerasBorderNone();
            }
        };

        if (this.isMobileDevice) {
            vb.classList.add('mobile-floating');
            document.body.appendChild(vb);
        } else {
            vb.classList.remove('mobile-floating');
            d.appendChild(vb);
            d.addEventListener('mouseleave', hideVideoMenu);
        }
        vb.addEventListener('click', (e) => e.stopPropagation());

        this.videoMediaContainer.appendChild(d);
        BUTTONS.videoOff.muteAudioButton && this.handleAU(au.id);

        if (remotePeer) {
            this.handleCV('remotePeer___' + pv.id);
            this.handleSM(sm.id, peer_name);
            this.handleSF(sf.id, peer_name);
            this.handleSV(sv.id, peer_name);
            this.handleGL(gl.id);
            this.handleBAN(ban.id);
            this.handleKO(ko.id);
        } else {
            this.handlePV(this.audioConsumers.get(pv.id) + '___' + pv.id);
        }

        this.handleVB(d.id, vb.id);
        this.handleDD(d.id, peer_id, !remotePeer);
        this.popupPeerInfo(p.id, peer_info);
        this.checkPeerInfoStatus(peer_info);
        this.setVideoAvatarImgName(i.id, peer_name, peer_avatar);
        this.getId(i.id).style.display = 'block';

        if (isParticipantsListOpen) getRoomParticipants();

        if (!this.isMobileDevice && remotePeer) {
            this.setTippy(sm.id, 'Send message', 'bottom');
            this.setTippy(sf.id, 'Send file', 'bottom');
            this.setTippy(sv.id, 'Send video', 'bottom');
            this.setTippy(au.id, 'Mute', 'bottom');
            this.setTippy(pv.id, '🔊 Volume', 'bottom');
            this.setTippy(gl.id, 'Geolocation', 'bottom');
            this.setTippy(ban.id, 'Ban', 'bottom');
            this.setTippy(ko.id, 'Eject', 'bottom');
        }

        remotePeer ? this.setPeerAudio(peer_id, peer_audio) : this.setIsAudio(peer_id, peer_audio);

        handleAspectRatio();

        console.log('[setVideoOff] Video-element-count', this.videoMediaContainer.childElementCount);

        wbUpdate();

        this.editorUpdate();

        this.handleHideMe();
    }

    removeVideoOff(peer_id) {
        const pvOff = this.getId(peer_id + '__videoOff');
        const vb = this.getId(peer_id + '__vb');

        if (vb) vb.parentNode.removeChild(vb);

        if (pvOff) {
            pvOff.parentNode.removeChild(pvOff);
            handleAspectRatio();
            console.log('[removeVideoOff] Video-element-count', this.videoMediaContainer.childElementCount);
            if (peer_id != this.peer_id) this.sound('left');
        }
    }

    // ####################################################
    // SHARE SCREEN ON JOIN
    // ####################################################

    shareScreen() {
        if (!this.isMobileDevice && (navigator.getDisplayMedia || navigator.mediaDevices.getDisplayMedia)) {
            this.sound('open');
            // startScreenButton.click(); // Chrome - Opera - Edge - Brave
            // handle error: getDisplayMedia requires transient activation from a user gesture on Safari - FireFox
            Swal.fire({
                background: swalBackground,
                position: 'center',
                icon: 'question',
                text: 'Do you want to share your screen?',
                showDenyButton: true,
                confirmButtonText: `Yes`,
                denyButtonText: `No`,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            }).then((result) => {
                if (result.isConfirmed) {
                    startScreenButton.click();
                    console.log('11 ----> Screen is on');
                } else {
                    console.log('11 ----> Screen is on');
                }
            });
        } else {
            console.log('11 ----> Screen is off');
        }
    }

    // ####################################################
    // EXIT ROOM
    // ####################################################

    exit(offline = false) {
        if (VideoAI.active) this.stopSession();
        if (this.rtmpFilestreamer) this.stopRTMP();
        if (this.rtmpUrlstreamer) this.stopRTMPfromURL();
        if (this.rnnoiseManager && this.rnnoiseManager.RNNoiseProcessor) this.rnnoiseManager.disableRNNoiseSuppression();

        const clean = () => {
            this._isConnected = false;
            if (this.consumerTransport) this.consumerTransport.close();
            if (this.producerTransport) this.producerTransport.close();
            if (this.socket) {
                this.socket.off('disconnect');
                this.socket.off('duplicateSessionDetected');
                this.socket.off('newProducers');
                this.socket.off('consumerClosed');
                this.socket.off('connect');
                this.socket.off('connect_error');
                this.socket.off('setVideoOff');
                this.socket.off('removeMe');
                this.socket.off('refreshParticipantsCount');
                this.socket.off('message');
                this.socket.off('roomAction');
                this.socket.off('roomPassword');
                this.socket.off('roomLobby');
                this.socket.off('cmd');
                this.socket.off('peerAction');
                this.socket.off('updatePeerInfo');
                this.socket.off('fileInfo');
                this.socket.off('file');
                this.socket.off('shareVideoAction');
                this.socket.off('fileAbort');
                this.socket.off('receiveFileAbort');
                this.socket.off('wbCanvasToJson');
                this.socket.off('whiteboardAction');
                this.socket.off('videoDrawing');
                this.socket.off('audioVolume');
                this.socket.off('dominantSpeaker');
                this.socket.off('updateRoomModerator');
                this.socket.off('updateRoomModeratorALL');
                this.socket.off('recordingAction');
                this.socket.off('endRTMP');
                this.socket.off('errorRTMP');
                this.socket.off('endRTMPfromURL');
                this.socket.off('errorRTMPfromURL');
                this.socket.off('updatePolls');
                this.socket.off('editorChange');
                this.socket.off('editorActions');
                this.socket.off('editorUpdate');
                this.socket.off('breakoutRoom');
                this.socket.io.off('reconnect_attempt');
                this.socket.io.off('reconnect');
                this.socket.io.off('reconnect_failed');
            }
        };

        if (!offline) {
            this.socket
                .request('exitRoom')
                .then((e) => console.log('Exit Room', e))
                .catch((e) => console.warn('Exit Room ', e))
                .finally(() => {
                    clean();
                    this.event(_EVENTS.exitRoom);
                });
        } else {
            clean();
        }
    }

    exitRoom(disconnectAll = false) {
        const switchDisconnectAllOnLeave = getId('switchDisconnectAllOnLeave');
        if (isPresenter && (disconnectAll || (switchDisconnectAllOnLeave && switchDisconnectAllOnLeave.checked))) {
            this.moderatorManager.ejectAllOnLeave();
        }
        this.exit();
    }

    // ####################################################
    // EJECT ALL ON LEAVE ROOM
    // ####################################################

    ejectAllOnLeave() {
        return this.moderatorManager.ejectAllOnLeave();
    }

    // ####################################################
    // HELPERS
    // ####################################################

    async attachMediaStream(elem, stream, type, who) {
        let track;
        switch (type) {
            case mediaType.audio:
                track = stream.getAudioTracks()[0];
                break;
            case mediaType.video:
            case mediaType.screen:
                track = stream.getVideoTracks()[0];
                break;
            default:
                break;
        }
        const consumerStream = new MediaStream();
        consumerStream.addTrack(track);
        elem.srcObject = consumerStream;
        if (type !== mediaType.audio) {
            this.hideVideoLoaderOnPlay(elem);
        }
        console.log(who + ' Success attached media ' + type);
    }

    hasUserActivation() {
        if (navigator.userActivation) return !!navigator.userActivation.isActive;
        if ('hasTransientUserActivation' in document) return !!document.hasTransientUserActivation;
        return false;
    }

    runOnNextUserActivation(callback) {
        let fired = false;

        const fire = (e) => {
            if (fired) return; // Prevent duplicate calls
            fired = true;

            try {
                // Call synchronously to keep the user-activation
                callback(e);
            } catch (err) {
                console.error('runOnNextUserActivation callback error:', err);
            }
        };

        const cleanup = () => {
            window.removeEventListener('pointerdown', fire, true);
            window.removeEventListener('click', fire, true);
            window.removeEventListener('mousedown', fire, true);
            window.removeEventListener('touchstart', fire, true);
            window.removeEventListener('keydown', fire, true);
        };

        // Note: 'once: true' auto-removes listeners, but we return cleanup for manual removal if needed
        const opts = { capture: true, once: true, passive: true };
        window.addEventListener('pointerdown', fire, opts);
        window.addEventListener('click', fire, opts);
        window.addEventListener('mousedown', fire, opts);
        window.addEventListener('touchstart', fire, opts);
        window.addEventListener('keydown', fire, opts);

        // Return cleanup function for manual removal if needed (e.g., component unmount)
        return cleanup;
    }

    async changeAudioDestination(audioElement = false, deferUntilUserActivation = true) {
        const sinkId = speakerSelect?.value;
        if (!sinkId) return;

        const outputElements = [];
        const remoteAudioElements = Array.from(this.remoteAudioEl?.querySelectorAll('audio') || []);

        audioElement ? outputElements.push(audioElement) : outputElements.push(...remoteAudioElements);

        if (this.videoAIElement) outputElements.push(this.videoAIElement);

        const els = [...new Set(outputElements.filter(Boolean))];
        if (!els.length) return;

        // Defer until a user gesture if needed
        if (!this.hasUserActivation()) {
            // Automatic calls (e.g. on new audio consumer) must NOT register a global
            // user-activation listener: applying setSinkId() on an unrelated click resets
            // the audio pipeline and breaks echo cancellation. The selected speaker is
            // re-applied the next time the user explicitly interacts with speakerSelect.
            if (!deferUntilUserActivation) return;

            this.pendingSinkId = sinkId;
            console.warn('Click once to apply the selected speaker');
            this.runOnNextUserActivation(async () => {
                for (const el of els) {
                    await this.attachSinkId(el, this.pendingSinkId);
                }
                // Clear only if all succeeded or if pendingSinkId wasn't changed
                if (this.pendingSinkId === sinkId) {
                    this.pendingSinkId = null;
                }
            });
            return;
        }

        for (const el of els) {
            await this.attachSinkId(el, sinkId);
        }
    }

    async attachSinkId(elem, sinkId) {
        if (typeof elem.setSinkId !== 'function') {
            const error = `Browser doesn't support output device selection.`;
            console.warn(error);
            this.userLog('error', error, 'top-end', 6000);
            return;
        }

        return elem
            .setSinkId(sinkId)
            .then(() => {
                console.log(`Success, audio output device attached: ${sinkId}`);
                // Clear pending sink id after successful attachment
                if (this.pendingSinkId === sinkId) {
                    this.pendingSinkId = null;
                }
            })
            .catch((err) => {
                console.error('Attach SinkId error: ', err);
                const speakerSel = this.getId('speakerSelect');
                if (err?.name === 'SecurityError') {
                    const msg = `Use HTTPS to select audio output device: ${err.message || err}`;
                    console.error('Attach SinkId error: ', msg);
                    this.userLog('error', msg, 'top-end', 6000);
                } else if (err?.name === 'NotAllowedError' || /user gesture/i.test(err?.message || '')) {
                    // Retry on next user gesture
                    this.userLog('info', 'Click once to allow changing the speaker', 'top-end', 4000);
                    this.pendingSinkId = sinkId;
                    this.runOnNextUserActivation(() => {
                        // Check if pendingSinkId is still set before retrying
                        if (this.pendingSinkId === sinkId) {
                            this.attachSinkId(elem, this.pendingSinkId);
                        }
                    });
                } else {
                    this.userLog('warning', 'Attach SinkId error', err, 'top-end', 6000);
                }
                if (speakerSel) speakerSel.selectedIndex = 0;
                refreshLsDevices();
            });
    }

    event(evt) {
        if (this.eventListeners.has(evt)) {
            this.eventListeners.get(evt).forEach((callback) => callback());
        }
    }

    on(evt, callback) {
        this.eventListeners.get(evt).push(callback);
    }

    // ####################################################
    // SET
    // ####################################################

    setTippy(elem, content, placement, allowHTML = false) {
        if (this.isMobileDevice) return;
        const element = this.getId(elem);
        if (element) {
            if (element._tippy) {
                element._tippy.destroy();
            }
            try {
                tippy(element, {
                    content: content,
                    placement: placement,
                    allowHTML: allowHTML,
                });
            } catch (err) {
                console.error('setTippy error', err.message);
            }
        } else {
            console.warn('setTippy element not found with content', content);
        }
    }

    setVideoAvatarImgName(elemId, peer_name, peer_avatar = false) {
        let elem = this.getId(elemId);
        if (peer_avatar && this.isValidAvatarURL(peer_avatar)) {
            elem.setAttribute('src', peer_avatar);
        } else if (cfg.useAvatarSvg) {
            rc.isValidEmail(peer_name)
                ? elem.setAttribute('src', this.genGravatar(peer_name))
                : elem.setAttribute('src', this.genAvatarSvg(peer_name, 250));
        } else {
            elem.setAttribute('src', image.avatar);
        }
    }

    genGravatar(email, size = false) {
        const hash = md5(email.toLowerCase().trim());
        const gravatarURL = `https://www.gravatar.com/avatar/${hash}` + (size ? `?s=${size}` : '?s=250') + '?d=404';
        return gravatarURL;
        function md5(input) {
            return CryptoJS.MD5(input).toString();
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    }

    genAvatarSvg(peerName, avatarImgSize) {
        const charCodeRed = peerName.charCodeAt(0);
        const charCodeGreen = peerName.charCodeAt(1) || charCodeRed;
        const red = Math.pow(charCodeRed, 7) % 200;
        const green = Math.pow(charCodeGreen, 7) % 200;
        const blue = (red + green) % 200;
        const bgColor = `rgb(${red}, ${green}, ${blue})`;
        const textColor = '#ffffff';
        const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        width="${avatarImgSize}px" 
        height="${avatarImgSize}px" 
        viewBox="0 0 ${avatarImgSize} ${avatarImgSize}" 
        version="1.1">
            <circle 
                fill="${bgColor}" 
                width="${avatarImgSize}" 
                height="${avatarImgSize}" 
                cx="${avatarImgSize / 2}" 
                cy="${avatarImgSize / 2}" 
                r="${avatarImgSize / 2}"
            />
            <text 
                x="50%" 
                y="50%" 
                style="color:${textColor}; 
                line-height:1; 
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                alignment-baseline="middle" 
                text-anchor="middle" 
                font-size="${Math.round(avatarImgSize * 0.4)}" 
                font-weight="normal" 
                dy=".1em" 
                dominant-baseline="middle" 
                fill="${textColor}">${peerName.substring(0, 2).toUpperCase()}
            </text>
        </svg>`;
        return 'data:image/svg+xml,' + svg.replace(/#/g, '%23').replace(/"/g, "'").replace(/&/g, '&amp;');
    }

    setPeerAudio(peer_id, status) {
        console.log('Set peer audio enabled: ' + status);
        const audioStatus = this.getPeerAudioBtn(peer_id); // producer, consumers
        const audioVolume = this.getPeerAudioVolumeBar(peer_id); // consumers
        if (audioStatus) audioStatus.className = status ? html.audioOn : html.audioOff;
        if (audioVolume) status ? show(audioVolume) : hide(audioVolume);
    }

    setIsAudio(peer_id, status) {
        if (!isBroadcastingEnabled || (isBroadcastingEnabled && isPresenter)) {
            console.log('Set local audio enabled: ' + status);
            this.peer_info.peer_audio = status;
            const audioStatus = this.getPeerAudioBtn(peer_id); // producer, consumers
            const audioVolume = this.getPeerAudioVolumeBar(peer_id); // consumers
            if (audioStatus) audioStatus.className = status ? html.audioOn : html.audioOff;
            if (audioVolume) status ? show(audioVolume) : hide(audioVolume);
        }
    }

    setIsVideo(status) {
        if (!isBroadcastingEnabled || (isBroadcastingEnabled && isPresenter)) {
            this.peer_info.peer_video = status;
            if (!this.peer_info.peer_video) {
                console.log('Set local video enabled: ' + status);
                this.setVideoOff(this.peer_info, false);
                this.sendVideoOff();
            }
        }
    }

    setIsScreen(status) {
        if (!isBroadcastingEnabled || (isBroadcastingEnabled && isPresenter)) {
            this.peer_info.peer_screen = status;
            if (!this.peer_info.peer_screen && !this.peer_info.peer_video) {
                console.log('Set local screen enabled: ' + status);
                this.setVideoOff(this.peer_info, false);
                this.sendVideoOff();
            }
        }
    }

    sendVideoOff() {
        this.socket.emit('setVideoOff', this.peer_info);
    }

    // ####################################################
    // GET
    // ####################################################

    isConnected() {
        return this._isConnected;
    }

    isRecording() {
        return this._isRecording;
    }

    showRecordingIndicator() {
        this._getRecIndicators().forEach((el) => {
            el.classList.add('active');
            el.classList.remove('paused');
        });
    }

    hideRecordingIndicator() {
        this._getRecIndicators().forEach((el) => {
            el.classList.remove('active', 'paused');
            el.innerHTML = '🔴 ';
        });
    }

    pauseRecordingIndicator() {
        this._getRecIndicators().forEach((el) => el.classList.add('paused'));
    }

    resumeRecordingIndicator() {
        this._getRecIndicators().forEach((el) => el.classList.remove('paused'));
    }

    _getRecIndicators() {
        return document.querySelectorAll(`[id^="${this.peer_id}__recIndicator"]`);
    }

    hasActiveRecorder() {
        return this.mediaRecorder !== null;
    }

    static get mediaType() {
        return mediaType;
    }

    static get EVENTS() {
        return _EVENTS;
    }

    getTimeNow() {
        return new Date().toTimeString().split(' ')[0];
    }

    getId(id) {
        return document.getElementById(id);
    }

    getName(name) {
        return document.getElementsByName(name)[0];
    }

    getEcN(cn) {
        return document.getElementsByClassName(cn);
    }

    async getRoomInfo() {
        let room_info = await this.socket.request('getRoomInfo');
        return room_info;
    }

    refreshParticipantsCount() {
        this.socket.emit('refreshParticipantsCount');
    }

    getPeerAudioBtn(peer_id) {
        return this.getId(peer_id + '__audio');
    }

    getPeerAudioVolumeBar(peer_id) {
        return this.getId(peer_id + '___pVolume');
    }

    getPeerHandBtn(peer_id) {
        return this.getId(peer_id + '__hand');
    }

    getMapKeyByValue(map, searchValue) {
        for (let [key, value] of map.entries()) {
            if (value === searchValue) return key;
        }
    }

    loadFeatureScript(src) {
        return new Promise((resolve, reject) => {
            // Already loaded? resolve immediately.
            if (document.querySelector(`script[src="${src}"]`)) {
                return resolve();
            }
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            document.body.appendChild(script);
        });
    }

    getSelectedIndexValue(elem) {
        return elem.options[elem.selectedIndex].value;
    }

    // ####################################################
    // UTILITY
    // ####################################################

    async sound(name, force = false, path = '../sounds/', ext = '.wav') {
        if (!isSoundEnabled && !force) return;
        let sound = path + name + ext;
        let audio = new Audio(sound);
        try {
            audio.volume = 0.5;
            await audio.play();
        } catch (err) {
            return false;
        }
    }

    userLog(icon, message, position, timer = 5000) {
        const Toast = Swal.mixin({
            background: swalBackground,
            toast: true,
            position: position,
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
        });
        switch (icon) {
            case 'html':
                Toast.fire({
                    icon: icon,
                    html: message,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                break;
            default:
                Toast.fire({
                    icon: icon,
                    title: message,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
        }
    }

    toast(icon, title, text, position = 'top-end', timer = 5000, sound = false) {
        if (sound) this.sound('alert');

        const Toast = Swal.mixin({
            toast: true,
            position: position,
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
            background: swalBackground,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        });
        Toast.fire({
            icon: icon,
            title: title,
            text: text,
        });
    }

    msgPopup(type, message, timer = 3000, position = 'center') {
        switch (type) {
            case 'warning':
            case 'error':
                Swal.fire({
                    background: swalBackground,
                    position: position,
                    icon: type,
                    title: type,
                    text: message,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                this.sound('alert');
                break;
            case 'info':
            case 'success':
                Swal.fire({
                    background: swalBackground,
                    position: position,
                    icon: type,
                    title: type,
                    text: message,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                break;
            case 'html':
                Swal.fire({
                    background: swalBackground,
                    position: position,
                    icon: type,
                    html: message,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                break;
            case 'toast':
                const Toast = Swal.mixin({
                    background: swalBackground,
                    position: 'top-end',
                    icon: 'info',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    toast: true,
                    timer: timer,
                });
                Toast.fire({
                    icon: 'info',
                    title: message,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                break;
            // ......
            default:
                alert(message);
        }
    }

    msgHTML(data, icon, imageUrl, title, html, position = 'center') {
        switch (data.type) {
            case 'recording':
                switch (data.action) {
                    case enums.recording.started:
                    case enums.recording.start:
                        html = html + '<br/> Your presence implies you agree to being recorded';
                        toastMessage(6000);
                        break;
                    case enums.recording.stop:
                        toastMessage(3000);
                        break;
                    //...
                    default:
                        break;
                }
                if (!this.speechInMessages) this.speechText(`${data.peer_name} ${data.action}`);
                break;
            //...
            default:
                defaultMessage();
                break;
        }
        // TOAST less invasive
        function toastMessage(duration = 3000) {
            const Toast = Swal.mixin({
                background: swalBackground,
                position: 'top-end',
                icon: icon,
                showConfirmButton: false,
                timerProgressBar: true,
                toast: true,
                timer: duration,
            });
            Toast.fire({
                title: title,
                html: html,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            });
        }
        // DEFAULT
        function defaultMessage() {
            Swal.fire({
                allowOutsideClick: false,
                allowEscapeKey: false,
                background: swalBackground,
                position: position,
                icon: icon,
                imageUrl: imageUrl,
                title: title,
                html: html,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            });
        }
        //...
    }

    thereAreParticipants() {
        // console.log('participantsCount ---->', participantsCount);
        return this.consumers.size > 0 || participantsCount > 1;
    }

    // ####################################################
    // MY SETTINGS
    // ####################################################

    toggleMySettings() {
        let mySettings = this.getId('mySettings');
        mySettings.style.top = '50%';
        mySettings.style.left = '50%';
        if (this.isMobileDevice) {
            mySettings.style.width = '100%';
            mySettings.style.height = '100%';
        }
        mySettings.classList.toggle('show');
        this.isMySettingsOpen = !this.isMySettingsOpen;
        this.videoMediaContainer.style.opacity = this.isMySettingsOpen ? 0.3 : 1;
    }

    openTab(evt, tabName) {
        let i, tabcontent, tablinks;
        tabcontent = this.getEcN('tabcontent');
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = 'none';
        }
        tablinks = this.getEcN('tablinks');
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(' active', '');
        }
        this.getId(tabName).style.display = 'block';
        evt.currentTarget.className += ' active';
    }

    changeBtnsBarPosition(position) {
        const positions = {
            vertical: {
                // bottomButtons horizontally
                '--bottom-btns-top': 'auto',
                '--bottom-btns-left': '50%',
                '--bottom-btns-bottom': '0',
                '--bottom-btns-translate-X': '-50%',
                '--bottom-btns-translate-Y': '0%',
                '--bottom-btns-margin-bottom': '16px',
                '--bottom-btns-flex-direction': 'row',
            },
            horizontal: {
                // bottomButtons vertically
                '--bottom-btns-top': '50%',
                '--bottom-btns-left': '15px',
                '--bottom-btns-bottom': 'auto',
                '--bottom-btns-translate-X': '0%',
                '--bottom-btns-translate-Y': '-50%',
                '--bottom-btns-margin-bottom': '0',
                '--bottom-btns-flex-direction': 'column',
            },
        };
        const props = positions[position];
        if (props) {
            const root = document.documentElement.style;
            Object.entries(props).forEach(([key, value]) => root.setProperty(key, value));
        }
    }

    // ####################################################
    // PICTURE IN PICTURE
    // ####################################################

    handlePIP(elemId, pipId) {
        let videoPlayer = this.getId(elemId);
        let btnPIP = this.getId(pipId);
        if (btnPIP) {
            btnPIP.addEventListener('click', () => {
                if (videoPlayer.pictureInPictureElement) {
                    videoPlayer.exitPictureInPicture();
                } else if (document.pictureInPictureEnabled) {
                    videoPlayer.requestPictureInPicture().catch((error) => {
                        console.error('Failed to enter Picture-in-Picture mode:', error);
                        this.userLog('warning', error.message, 'top-end', 6000);
                        elemDisplay(btnPIP.id, false);
                    });
                }
            });
        }
        if (videoPlayer) {
            videoPlayer.addEventListener('leavepictureinpicture', (event) => {
                console.log('Exited PiP mode');
                if (videoPlayer.paused) {
                    videoPlayer.play().catch((error) => {
                        console.error('Error playing video after exit PIP mode:', error);
                    });
                }
            });
        }
    }

    // ####################################################
    // HANDLE DOCUMENT PIP
    // ####################################################

    async toggleDocumentPIP() {
        if (documentPictureInPicture.window) {
            documentPictureInPicture.window.close();
            console.log('DOCUMENT PIP close');
            return;
        }
        await this.documentPictureInPictureOpen();
    }

    documentPictureInPictureClose() {
        if (!showDocumentPipBtn) return;
        if (documentPictureInPicture.window) {
            documentPictureInPicture.window.close();
            console.log('DOCUMENT PIP close');
        }
    }

    async documentPictureInPictureOpen() {
        if (!showDocumentPipBtn) return;
        try {
            const pipWindow = await documentPictureInPicture.requestWindow({
                width: 300,
                height: 720,
            });

            function updateCustomProperties() {
                const documentStyle = getComputedStyle(document.documentElement);

                pipWindow.document.documentElement.style = `
                    --body-bg: ${documentStyle.getPropertyValue('--body-bg')};
                `;
            }

            updateCustomProperties();

            const pipStylesheet = document.createElement('link');
            const pipVideoContainer = document.createElement('div');

            pipStylesheet.type = 'text/css';
            pipStylesheet.rel = 'stylesheet';
            pipStylesheet.href = '../css/DocumentPiP.css';

            pipVideoContainer.className = 'pipVideoContainer';

            pipWindow.document.head.append(pipStylesheet);
            pipWindow.document.body.append(pipVideoContainer);

            function cloneVideoElements() {
                let foundVideo = false;

                pipVideoContainer.innerHTML = '';

                [...document.querySelectorAll('video')].forEach((video) => {
                    console.log('DOCUMENT PIP found video id -----> ' + video.id);

                    // No video stream detected or is video share from URL...
                    if (!video.srcObject || video.id === '__videoShare') return;

                    const videoElement = rc.getId(video.id);

                    const isPIPAllowed = !videoElement.classList.contains('videoCircle'); // Check if not in privacy mode

                    const logMessage = [rc.videoProducerId, rc.screenProducerId].includes(video.id)
                        ? `DOCUMENT PIP PRODUCER: PiP allowed? -----> ${isPIPAllowed}`
                        : `DOCUMENT PIP CONSUMER: PiP allowed? -----> ${isPIPAllowed}`;

                    console.log(logMessage);

                    if (!isPIPAllowed) return;

                    // Video is ON and not in privacy mode continue....

                    foundVideo = true;

                    const pipVideo = document.createElement('video');

                    pipVideo.classList.add('pipVideo');
                    pipVideo.classList.toggle('mirror', video.classList.contains('mirror'));
                    pipVideo.srcObject = video.srcObject;
                    pipVideo.autoplay = true;
                    pipVideo.muted = true;

                    pipVideoContainer.append(pipVideo);

                    const videoElementObserver = new MutationObserver((mutations) => {
                        mutations.forEach((mutation) => {
                            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                                // Handle class changes in video elements
                                console.log(`Video ${mutation.target.id} class changed:`, mutation.target.className);
                                cloneVideoElements();
                            }
                        });
                    });

                    // Start observing for new videos and class changes
                    videoElementObserver.observe(video, { attributes: true, attributeFilter: ['class'] });
                });

                return foundVideo;
            }

            if (!cloneVideoElements()) {
                rc.documentPictureInPictureClose();
                return userLog('warning', 'No video allowed for Document PIP', 'top-end', 6000);
            }

            const videoObserver = new MutationObserver(() => {
                cloneVideoElements();
            });

            videoObserver.observe(rc.videoMediaContainer, {
                childList: true,
            });

            const documentObserver = new MutationObserver(() => {
                updateCustomProperties();
            });

            documentObserver.observe(document.documentElement, {
                attributeFilter: ['style'],
            });

            pipWindow.addEventListener('unload', () => {
                videoObserver.disconnect();
                documentObserver.disconnect();
            });
        } catch (err) {
            userLog('warning', err.message, 'top-end', 6000);
        }
    }

    // ####################################################
    // FULL SCREEN
    // ####################################################

    isFullScreenSupported() {
        const fsSupported =
            document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled;

        fsSupported ? this.handleFullScreenEvents() : (this.getId('fullScreenButton').style.display = 'none');

        return fsSupported;
    }

    handleFullScreenEvents() {
        document.addEventListener('fullscreenchange', (e) => {
            const fullscreenElement = document.fullscreenElement;
            if (!fullscreenElement) {
                const fullScreenIcon = this.getId('fullScreenIcon');
                fullScreenIcon.className = html.fullScreenOff;
                this.isDocumentOnFullScreen = false;
            }
        });
    }

    toggleRoomFullScreen() {
        const fullScreenIcon = this.getId('fullScreenIcon');
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            fullScreenIcon.className = html.fullScreenOn;
            this.isDocumentOnFullScreen = true;
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                fullScreenIcon.className = html.fullScreenOff;
                this.isDocumentOnFullScreen = false;
            }
        }
    }

    toggleFullScreen(elem = null) {
        if (this.isDocumentOnFullScreen) return;
        const element = elem ? elem : document.documentElement;
        const fullScreen = this.isFullScreen();
        fullScreen ? this.goOutFullscreen(element) : this.goInFullscreen(element);
        if (elem) this.isVideoOnFullScreen = !fullScreen;
    }

    isFullScreen() {
        const elementFullScreen =
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement ||
            null;
        if (elementFullScreen === null) return false;
        return true;
    }

    goInFullscreen(element) {
        if (element.requestFullscreen) element.requestFullscreen();
        else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
        else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
        else if (element.msRequestFullscreen) element.msRequestFullscreen();
        else this.userLog('warning', 'Full screen mode not supported by this browser on this device', 'top-end');
    }

    goOutFullscreen(element) {
        if (element.exitFullscreen) element.exitFullscreen();
        else if (element.mozCancelFullScreen) element.mozCancelFullScreen();
        else if (element.webkitExitFullscreen) element.webkitExitFullscreen();
        else if (element.msExitFullscreen) element.msExitFullscreen();
    }

    handleFS(elemId, fsId) {
        const videoPlayer = this.getId(elemId);
        const btnFs = this.getId(fsId);
        if (!videoPlayer || !btnFs) return;

        this.setTippy(fsId, 'Full screen', 'bottom');

        const videoWrap = this.getId(elemId + '__video');
        const fsTarget = videoWrap || videoPlayer;

        const getFsElement = () =>
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement ||
            null;

        const sync = () => {
            const fsEl = getFsElement();
            const isThisVideoFullscreen = fsEl === fsTarget;
            if (isThisVideoFullscreen) {
                this.isVideoOnFullScreen = true;
                videoPlayer.style.pointerEvents = 'none';
                return;
            }

            if (!fsEl) {
                videoPlayer.style.pointerEvents = 'auto';
                this.isVideoOnFullScreen = false;
            }
        };

        if (!videoPlayer.dataset.fsSyncAttached) {
            videoPlayer.dataset.fsSyncAttached = '1';
            document.addEventListener('fullscreenchange', sync);
            document.addEventListener('webkitfullscreenchange', sync);
        }

        btnFs.addEventListener('click', () => {
            if (videoPlayer.classList.contains('videoCircle')) {
                return this.userLog('info', 'Full Screen not allowed if video on privacy mode', 'top-end');
            }
            this.toggleFullScreen(fsTarget);
            setTimeout(sync, 0);
        });
    }

    // ####################################################
    // HANDLE VIDEO | OBJ FIT | CONTROLS | PIN-UNPIN
    // ####################################################

    handleVideoObjectFit(value) {
        document.documentElement.style.setProperty('--videoObjFit', value);
    }

    handleVideoControls(value) {
        isVideoControlsOn = value == 'on' ? true : false;
        let cameras = this.getEcN('Camera');
        for (let i = 0; i < cameras.length; i++) {
            let cameraId = cameras[i].id.replace('__video', '');
            let videoPlayer = this.getId(cameraId);
            videoPlayer.hasAttribute('controls')
                ? videoPlayer.removeAttribute('controls')
                : videoPlayer.setAttribute('controls', isVideoControlsOn);
        }
    }

    handlePN(elemId, pnId, camId, isScreen = false, isAvatar = false) {
        let videoPlayer = this.getId(elemId);
        let btnPn = this.getId(pnId);
        let cam = this.getId(camId);
        if (btnPn && videoPlayer && cam) {
            btnPn.addEventListener('click', () => {
                if (this.isMobileDevice) return;
                this.sound('click');
                this.isVideoPinned = !this.isVideoPinned;
                if (this.isVideoPinned) {
                    if (!videoPlayer.classList.contains('videoCircle')) {
                        videoPlayer.style.objectFit = 'contain';
                    }
                    cam.className = '';
                    cam.style.width = '100%';
                    cam.style.height = '100%';
                    this.toggleVideoPin(pinVideoPosition.value);
                    this.videoPinMediaContainer.appendChild(cam);
                    this.videoPinMediaContainer.style.display = 'block';
                    this.pinnedVideoPlayerId = elemId;
                    setColor(btnPn, 'lime');
                } else {
                    if (this.pinnedVideoPlayerId != videoPlayer.id) {
                        this.isVideoPinned = true;
                        if (this.isScreenAllowed) return;
                        return this.msgPopup('toast', 'Another video seems pinned, unpin it before to pin this one');
                    }
                    if (!isScreen && !isBroadcastingEnabled) videoPlayer.style.objectFit = 'var(--videoObjFit)';
                    this.videoPinMediaContainer.removeChild(cam);
                    cam.className = 'Camera';
                    this.videoMediaContainer.appendChild(cam);
                    this.removeVideoPinMediaContainer();
                    setColor(btnPn, 'white');
                }
                this.resizeVideoMenuBar();
                handleAspectRatio();
                if (this.isFollowMeActive && isPresenter) {
                    if (this.isVideoPinned) {
                        const peerId = videoPlayer.getAttribute('name');
                        this.emitFollowMe({ action: 'pin', peerId: peerId });
                    } else {
                        this.emitFollowMe({ action: 'unpin' });
                    }
                }
            });

            if (isAvatar && !this.isMobileDevice && this.videoMediaContainer.childElementCount > 1) btnPn.click();
        }
    }

    toggleVideoPin(position) {
        if (!this.isVideoPinned) return;
        switch (position) {
            case 'top':
                this.videoPinMediaContainer.style.top = '25%';
                this.videoPinMediaContainer.style.width = '100%';
                this.videoPinMediaContainer.style.height = '75%';
                this.videoMediaContainer.style.top = '0%';
                this.videoMediaContainer.style.right = null;
                this.videoMediaContainer.style.width = null;
                this.videoMediaContainer.style.width = '100% !important';
                this.videoMediaContainer.style.height = '25%';
                break;
            case 'vertical':
                this.videoPinMediaContainer.style.top = 0;
                this.videoPinMediaContainer.style.width = '75%';
                this.videoPinMediaContainer.style.height = '100%';
                this.videoMediaContainer.style.top = 0;
                this.videoMediaContainer.style.width = '25%';
                this.videoMediaContainer.style.height = '100%';
                this.videoMediaContainer.style.right = 0;
                break;
            case 'horizontal':
                this.videoPinMediaContainer.style.top = 0;
                this.videoPinMediaContainer.style.width = '100%';
                this.videoPinMediaContainer.style.height = '75%';
                this.videoMediaContainer.style.top = '75%';
                this.videoMediaContainer.style.right = null;
                this.videoMediaContainer.style.width = null;
                this.videoMediaContainer.style.width = '100% !important';
                this.videoMediaContainer.style.height = '25%';
                break;
            default:
                break;
        }
        resizeVideoMedia();
    }

    // ####################################################
    // HANDLE VIDEO ZOOM-IN/OUT
    // ####################################################

    handleZV(elemId, divId, peerId) {
        let videoPlayer = this.getId(elemId);
        let videoWrap = this.getId(divId);
        let videoPeerId = peerId;
        let zoom = 1;

        const ZOOM_IN_FACTOR = 1.1;
        const ZOOM_OUT_FACTOR = 0.9;
        const MAX_ZOOM = 15;
        const MIN_ZOOM = 1;

        if (this.isZoomCenterMode) {
            if (videoPlayer) {
                videoPlayer.addEventListener('wheel', (e) => {
                    e.preventDefault();
                    let delta = e.wheelDelta ? e.wheelDelta : -e.deltaY;
                    delta > 0 ? (zoom *= 1.2) : (zoom /= 1.2);
                    if (zoom < 1) zoom = 1;
                    videoPlayer.style.scale = zoom;
                });
            }
        } else {
            if (videoPlayer && videoWrap) {
                videoPlayer.addEventListener('wheel', (e) => {
                    e.preventDefault();
                    if (isVideoPrivacyActive) return;
                    const rect = videoWrap.getBoundingClientRect();
                    const cursorX = e.clientX - rect.left;
                    const cursorY = e.clientY - rect.top;
                    const zoomDirection = e.deltaY > 0 ? 'zoom-out' : 'zoom-in';
                    const scaleFactor = zoomDirection === 'zoom-out' ? ZOOM_OUT_FACTOR : ZOOM_IN_FACTOR;
                    zoom *= scaleFactor;
                    zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom));
                    videoPlayer.style.transformOrigin = `${cursorX}px ${cursorY}px`;
                    videoPlayer.style.transform = `scale(${zoom})`;
                    videoPlayer.style.cursor = zoom === 1 ? 'pointer' : zoomDirection;
                });

                videoWrap.addEventListener('mouseleave', () => {
                    videoPlayer.style.cursor = 'pointer';
                    if (videoPeerId === this.peer_id) {
                        zoom = 1;
                        videoPlayer.style.transform = '';
                        videoPlayer.style.transformOrigin = 'center';
                    }
                });
                videoPlayer.addEventListener('mouseleave', () => {
                    videoPlayer.style.cursor = 'pointer';
                });
            }
        }
    }

    // ####################################################
    // DROPDOWN MENU HELPERS
    // ####################################################

    createDropdownItem(btnEl, label, dropdownContent, color) {
        const item = document.createElement('div');
        item.className = 'navbar-dropdown-item';
        item.appendChild(btnEl);
        const span = document.createElement('span');
        span.textContent = label;
        item.appendChild(span);
        if (color) {
            btnEl.style.setProperty('color', color, 'important');
            span.style.setProperty('color', color, 'important');
        }
        let dispatching = false;
        item.addEventListener('click', (e) => {
            if (dispatching) return;
            e.stopPropagation();
            dispatching = true;
            btnEl.click();
            dispatching = false;
            if (dropdownContent) dropdownContent.classList.remove('show');
        });
        return item;
    }

    handleDropdownEvents(dropdownDiv, dropdownBtn, dropdownContent) {
        let closeTimer = null;

        const showDropdown = () => {
            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }
            const rect = dropdownBtn.getBoundingClientRect();
            dropdownContent.style.top = rect.bottom + 2 + 'px';
            dropdownContent.style.right = window.innerWidth - rect.right + 'px';
            dropdownContent.style.left = 'auto';
            document.querySelectorAll('.navbar-dropdown-content.show').forEach((el) => {
                if (el !== dropdownContent) el.classList.remove('show');
            });
            dropdownContent.classList.add('show');
        };

        const scheduleClose = () => {
            if (closeTimer) clearTimeout(closeTimer);
            closeTimer = setTimeout(() => {
                dropdownContent.classList.remove('show');
                closeTimer = null;
            }, 200);
        };

        // Desktop: open on hover
        dropdownDiv.addEventListener('mouseenter', () => showDropdown());

        // Close with delay when mouse leaves both the button and the dropdown content
        dropdownDiv.addEventListener('mouseleave', (e) => {
            if (!dropdownContent.contains(e.relatedTarget)) {
                scheduleClose();
            }
        });
        dropdownContent.addEventListener('mouseenter', () => {
            if (closeTimer) {
                clearTimeout(closeTimer);
                closeTimer = null;
            }
        });
        dropdownContent.addEventListener('mouseleave', (e) => {
            if (!dropdownDiv.contains(e.relatedTarget)) {
                scheduleClose();
            }
        });

        // Mobile: toggle on tap
        dropdownBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            } else {
                showDropdown();
            }
        });
    }

    // ####################################################
    // HANDLE VIDEO AND MENU BAR
    // ####################################################

    handleVB(videoId, videoBarId) {
        const videoPlayer = this.getId(videoId);
        const videoBar = this.getId(videoBarId);

        if (videoPlayer && videoBar) {
            const eventType = this.isDesktopDevice ? 'mouseenter' : 'click';
            videoPlayer.addEventListener(eventType, async () => {
                hideVideoMenuBar(videoBarId);
                rc.resizeVideoMenuBar();
                setCamerasBorderNone();
                if (videoBar.classList.contains('hidden')) {
                    show(videoBar);
                    animateCSS(videoBar, 'fadeInDown');
                    if (participantsCount > 1) {
                        videoPlayer.style.setProperty('border', 'var(--videoBar-active)', 'important');
                    }
                } else {
                    setCamerasBorderNone();
                    hide(videoBar);
                }
            });

            if (this.isDesktopDevice) {
                videoPlayer.addEventListener('mouseleave', () => {
                    setCamerasBorderNone();
                    hideVideoMenuBar('ALL');
                });
            }
        }
    }

    resizeVideoMenuBar() {
        const somethingPinned =
            this.isVideoPinned ||
            this.isChatPinned ||
            this.isEditorPinned ||
            this.breakoutRoomManager.isBreakoutPinned ||
            transcription.isPin();
        const menuBarWidth =
            this.isVideoPinned ||
            this.isChatPinned ||
            this.breakoutRoomManager.isBreakoutPinned ||
            transcription.isPin()
                ? '75%'
                : '70%';
        const videoMenuBar = rc.getEcN('videoMenuBar');
        for (let i = 0; i < videoMenuBar.length; i++) {
            const menuBar = videoMenuBar[i];
            menuBar.style.width = this.isMobileDevice && somethingPinned ? menuBarWidth : '100%';
        }
    }

    // ####################################################
    // REMOVE VIDEO PIN MEDIA CONTAINER
    // ####################################################

    removeVideoPinMediaContainer() {
        this.videoPinMediaContainer.style.display = 'none';
        this.videoMediaContainerUnpin();
        this.pinnedVideoPlayerId = null;
        this.isVideoPinned = false;
        if (this.isChatPinned) {
            this.chatPin();
        }
        if (this.isPollPinned) {
            this.pollPin();
        }
        if (this.isEditorPinned) {
            this.editorPin();
        }
        if (this.breakoutRoomManager.isBreakoutPinned) {
            this.breakoutRoomManager.breakoutPin();
        }
        if (this.transcription.isPin()) {
            this.transcription.pinned();
        }
    }

    videoMediaContainerPin() {
        this.videoMediaContainer.style.top = 0;
        this.videoMediaContainer.style.width = '75%';
        this.videoMediaContainer.style.height = '100%';
        this.resizeVideoMenuBar();
    }

    videoMediaContainerUnpin() {
        this.videoMediaContainer.style.top = 0;
        this.videoMediaContainer.style.right = null;
        this.videoMediaContainer.style.width = '100%';
        this.videoMediaContainer.style.height = '100%';
        this.resizeVideoMenuBar();
    }

    adaptVideoObjectFit(index) {
        // 1 (cover) 2 (contain)
        BtnVideoObjectFit.selectedIndex = index;
        BtnVideoObjectFit.onchange();
    }

    // ####################################################
    // TAKE SNAPSHOT
    // ####################################################

    handleTS(elemId, tsId) {
        let videoPlayer = this.getId(elemId);
        let btnTs = this.getId(tsId);
        if (btnTs && videoPlayer) {
            btnTs.addEventListener('click', () => {
                if (videoPlayer.classList.contains('videoCircle')) {
                    return this.userLog('info', 'SnapShoot not allowed if video on privacy mode', 'top-end');
                }
                this.sound('snapshot');
                let context, canvas, width, height, dataURL;
                width = videoPlayer.videoWidth;
                height = videoPlayer.videoHeight;
                canvas = canvas || document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                context = canvas.getContext('2d');
                context.drawImage(videoPlayer, 0, 0, width, height);
                dataURL = canvas.toDataURL('image/png');
                // console.log(dataURL);
                saveDataToFile(dataURL, getDataTimeString() + '-SNAPSHOT.png');
            });
        }
    }

    // ####################################################
    // HANDLE VIDEO DRAWING OVERLAY
    // ####################################################

    handleVideoDrawing(data) {
        if (typeof VideoDrawingOverlay === 'undefined') return;
        if (!data || !data.producerId || !data.paths) return;
        // Translate the canonical producerId to our local camera div ID.
        // If we are the producer, the div is {producerId}__video.
        // If we are a consumer of that producer, the div is {consumerId}__video.
        let cameraId = data.producerId + '__video';
        if (!document.getElementById(cameraId)) {
            const consumerId = this.getConsumerIdByProducerId(data.producerId);
            if (consumerId) {
                cameraId = consumerId + '__video';
            }
        }
        VideoDrawingOverlay.receiveRemoteDrawing({ cameraId, paths: data.paths, peerName: data.peer_name });
    }

    handleDW(dwBtnId, camDivId) {
        const btnDw = this.getId(dwBtnId);
        const camDiv = this.getId(camDivId);
        if (!btnDw || !camDiv) return;
        // Wire up the global emit callback (once) so VideoDrawingOverlay
        // can send batched strokes through the signaling server.
        // Translates the local cameraId to a canonical producerId so remote
        // peers can resolve it to their own consumer div.
        if (typeof VideoDrawingOverlay !== 'undefined' && !VideoDrawingOverlay.onEmitDrawing) {
            VideoDrawingOverlay.onEmitDrawing = (data) => {
                // if not peers, don't send
                if (!this.thereAreParticipants()) return;

                // cameraId format: "{id}__video" — extract the base ID
                const baseId = data.cameraId.replace('__video', '');

                // Determine the canonical producer ID:
                // - If baseId is a producer we own, it's already the producer ID.
                // - If baseId is a consumer ID, look up the producer ID.
                let producerId = baseId;
                const mappedProducerId = this.getProducerIdByConsumerId(baseId);
                if (mappedProducerId) {
                    producerId = mappedProducerId;
                }

                this.socket.emit('videoDrawing', {
                    peer_name: this.peer_name,
                    producerId: producerId,
                    paths: data.paths,
                });
            };
        }

        btnDw.addEventListener('click', () => {
            if (typeof VideoDrawingOverlay === 'undefined') {
                return console.warn('[handleDW] VideoDrawingOverlay not loaded');
            }
            // Privacy mode check
            const video = camDiv.querySelector('video');
            if (video && video.classList.contains('videoCircle')) {
                return this.userLog('info', 'Drawing not allowed in privacy mode', 'top-end');
            }
            const overlay = VideoDrawingOverlay.getOrCreate(camDiv);
            const isActive = overlay.toggle();

            // Visual feedback on the button
            btnDw.style.color = isActive ? 'lime' : '#fff';
        });
    }

    // ####################################################
    // HANDLE VIDEO MIRROR
    // ####################################################

    handleMV(elemId, tsId) {
        let videoPlayer = this.getId(elemId);
        let btnMv = this.getId(tsId);
        if (btnMv && videoPlayer) {
            btnMv.addEventListener('click', () => {
                videoPlayer.classList.toggle('mirror');
                // Update only current session local webcam mirror preference.
                const isLocalWebcam = videoPlayer.getAttribute('name') === this.peer_id;
                if (isLocalWebcam) {
                    sessionVideoMirror = videoPlayer.classList.contains('mirror');
                }
            });
        }
    }

    // ####################################################
    // VIDEO CIRCLE - PRIVACY MODE
    // ####################################################

    handleVP(elemId, vpId) {
        const startVideoInPrivacyMode =
            this._moderator.video_start_privacy || localStorageSettings.moderator_video_start_privacy;
        let videoPlayer = this.getId(elemId);
        let btnVp = this.getId(vpId);
        if (btnVp && videoPlayer) {
            btnVp.addEventListener('click', () => {
                this.sound('click');
                this.toggleVideoPrivacyMode();
            });

            if (startVideoInPrivacyMode) {
                btnVp.click();
            }
        }
    }

    toggleVideoPrivacyMode() {
        isVideoPrivacyActive = !isVideoPrivacyActive;
        this.setVideoPrivacyStatus(this.peer_id, isVideoPrivacyActive);
        this.emitCmd({
            type: 'privacy',
            peer_id: this.peer_id,
            active: isVideoPrivacyActive,
            broadcast: true,
        });
    }

    setVideoPrivacyStatus(elemName, privacy) {
        let videoPlayer = this.getName(elemName);
        if (!videoPlayer) return;
        if (privacy) {
            videoPlayer.classList.remove('videoDefault');
            videoPlayer.classList.add('videoCircle');
            videoPlayer.style.objectFit = 'cover';
        } else {
            videoPlayer.classList.remove('videoCircle');
            videoPlayer.classList.add('videoDefault');
            videoPlayer.style.objectFit = 'var(--videoObjFit)';
        }
    }

    // ####################################################
    // DRAGGABLE
    // ####################################################

    makeDraggable(elmnt, dragObj) {
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        if (dragObj) {
            dragObj.onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
            elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
        }
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    makeUnDraggable(elmnt, dragObj) {
        if (dragObj) {
            dragObj.onmousedown = null;
        } else {
            elmnt.onmousedown = null;
        }
        elmnt.style.top = '';
        elmnt.style.left = '';
    }

    // ####################################################
    // CHAT
    // ####################################################

    handleSM(uid, name) {
        const words = uid.split('___');
        let peer_id = words[1];
        let peer_name = name;
        let btnSm = this.getId(uid);
        if (btnSm) {
            btnSm.addEventListener('click', () => {
                this.sendMessageTo(peer_id, peer_name);
            });
        }
    }

    isPlistOpen() {
        const plist = this.getId('plist');
        return !plist.classList.contains('hidden');
    }

    async toggleChat(fromParticipants = false) {
        return this.chatManager.toggleChat(fromParticipants);
    }

    updateChatFooterVisibility() {
        return this.chatManager.updateChatFooterVisibility();
    }

    toggleShowParticipants(fromUser = false) {
        return this.chatManager.toggleShowParticipants(fromUser);
    }

    async toggleParticipants() {
        return this.chatManager.toggleParticipants();
    }

    syncChatToolbarButtons() {
        return this.chatManager.syncChatToolbarButtons();
    }

    toggleChatHistorySize(max = true) {
        return this.chatManager.toggleChatHistorySize(max);
    }

    toggleChatPin() {
        return this.chatManager.toggleChatPin();
    }

    chatMaximize() {
        return this.chatManager.chatMaximize();
    }

    chatMinimize() {
        return this.chatManager.chatMinimize();
    }

    canBePinned() {
        return this.chatManager.canBePinned();
    }

    chatPin() {
        return this.chatManager.chatPin();
    }

    chatUnpin() {
        return this.chatManager.chatUnpin();
    }

    chatCenter() {
        return this.chatManager.chatCenter();
    }

    chatPinned() {
        return this.chatManager.chatPinned();
    }

    toggleChatEmoji() {
        return this.chatManager.toggleChatEmoji();
    }

    addEmojiToMsg(data) {
        return this.chatManager.addEmojiToMsg(data);
    }

    cleanMessage() {
        return this.chatManager.cleanMessage();
    }

    pasteMessage() {
        return this.chatManager.pasteMessage();
    }

    sendMessage() {
        return this.chatManager.sendMessage();
    }

    sendMessageTo(to_peer_id, to_peer_name) {
        return this.chatManager.sendMessageTo(to_peer_id, to_peer_name);
    }

    async showMessage(data, toggleChat = true) {
        return this.chatManager.showMessage(data, toggleChat);
    }

    updateUnreadCountBadge(peerId) {
        return this.chatManager.updateUnreadCountBadge(peerId);
    }

    setMsgAvatar(avatar, peerName, peerAvatar = false) {
        return this.chatManager.setMsgAvatar(avatar, peerName, peerAvatar);
    }

    appendMessage(side, img, fromName, fromId, msg, toId, toName, msgId = '') {
        return this.chatManager.appendMessage(side, img, fromName, fromId, msg, toId, toName, msgId);
    }

    toggleReactionPicker(msgListId) {
        return this.reactionManager.toggleReactionPicker(msgListId);
    }

    sendChatReaction(msgListId, emoji) {
        return this.reactionManager.sendChatReaction(msgListId, emoji);
    }

    applyReactionToElement(msgEl, emoji, peerName, action = 'add') {
        return this.reactionManager.applyReactionToElement(msgEl, emoji, peerName, action);
    }

    handleChatReaction = (dataObject) => {
        return this.reactionManager.handleChatReaction(dataObject);
    };

    showAITypingIndicator(aiName) {
        return this.chatManager.showAITypingIndicator(aiName);
    }

    hideAITypingIndicator(aiName) {
        return this.chatManager.hideAITypingIndicator(aiName);
    }

    streamMessage(element, message, speed = 100) {
        return this.chatManager.streamMessage(element, message, speed);
    }

    highlightCodeBlocks(element) {
        return this.chatManager.highlightCodeBlocks(element);
    }

    processAIMessage(message) {
        return this.chatManager.processAIMessage(message);
    }

    processMessage(message) {
        return this.chatManager.processMessage(message);
    }

    deleteMessage(id) {
        return this.chatManager.deleteMessage(id);
    }

    copyToClipboard(id) {
        return this.chatManager.copyToClipboard(id);
    }

    formatMsg(msg) {
        return this.chatManager.formatMsg(msg);
    }

    sanitizeHtml(input) {
        return this.chatManager.sanitizeHtml(input);
    }

    isHtml(str) {
        return this.chatManager.isHtml(str);
    }

    isValidHttpURL(input) {
        return this.chatManager.isValidHttpURL(input);
    }

    isValidAvatarURL(url) {
        return this.chatManager.isValidAvatarURL(url);
    }

    isImageURL(input) {
        return this.chatManager.isImageURL(input);
    }

    getImage(input) {
        return this.chatManager.getImage(input);
    }

    getLink(input) {
        return this.chatManager.getLink(input);
    }

    getPre(input) {
        return this.chatManager.getPre(input);
    }

    getIframe(input) {
        return this.chatManager.getIframe(input);
    }

    getLineBreaks(message) {
        return this.chatManager.getLineBreaks(message);
    }

    checkLineBreaks() {
        return this.chatManager.checkLineBreaks();
    }

    collectMessages(time, from, msg, toId = 'all', toName = 'all') {
        return this.chatManager.collectMessages(time, from, msg, toId, toName);
    }

    speechMessage(newMsg = true, from, msg) {
        return this.chatManager.speechMessage(newMsg, from, msg);
    }

    _processTtsQueue() {
        return this.chatManager._processTtsQueue();
    }

    speechElementText(elemId) {
        return this.chatManager.speechElementText(elemId);
    }

    speechText(msg) {
        return this.chatManager.speechText(msg);
    }

    chatToggleBg() {
        return this.chatManager.chatToggleBg();
    }

    chatClean() {
        return this.chatManager.chatClean();
    }

    chatSave() {
        return this.chatManager.chatSave();
    }

    // ##############################################
    // POOLS
    // ##############################################

    togglePoll() {
        return this.pollManager.togglePoll();
    }

    togglePollPin() {
        return this.pollManager.togglePollPin();
    }

    pollPin() {
        return this.pollManager.pollPin();
    }

    pollUnpin() {
        return this.pollManager.pollUnpin();
    }

    pollPinned() {
        return this.pollManager.pollPinned();
    }

    pollCenter() {
        return this.pollManager.pollCenter();
    }

    pollMaximize() {
        return this.pollManager.pollMaximize();
    }

    pollMinimize() {
        return this.pollManager.pollMinimize();
    }

    // ####################################################
    // BREAKOUT ROOMS PIN
    // ####################################################

    toggleBreakoutPin() {
        return this.breakoutRoomManager.toggleBreakoutPin();
    }

    breakoutPin() {
        return this.breakoutRoomManager.breakoutPin();
    }

    breakoutUnpin() {
        return this.breakoutRoomManager.breakoutUnpin();
    }

    getBreakoutPanelLayoutElements() {
        return this.breakoutRoomManager.getBreakoutPanelLayoutElements();
    }

    breakoutPinned() {
        return this.breakoutRoomManager.breakoutPinned();
    }

    breakoutCenter() {
        return this.breakoutRoomManager.breakoutCenter();
    }

    get isBreakoutPinned() {
        return this.breakoutRoomManager.isBreakoutPinned;
    }
    set isBreakoutPinned(val) {
        this.breakoutRoomManager.isBreakoutPinned = val;
    }

    pollsUpdate(polls) {
        return this.pollManager.pollsUpdate(polls);
    }

    pollCreateNewForm(e) {
        return this.pollManager.pollCreateNewForm(e);
    }

    pollAddOptions() {
        return this.pollManager.pollAddOptions();
    }

    pollDeleteOptions() {
        return this.pollManager.pollDeleteOptions();
    }

    createPollInputs(poll) {
        return this.pollManager.createPollInputs(poll);
    }

    getPollOptions(optionCount) {
        return this.pollManager.getPollOptions(optionCount);
    }

    pollSaveResults() {
        return this.pollManager.pollSaveResults();
    }

    getPollFileName() {
        return this.pollManager.getPollFileName();
    }

    // ####################################################
    // EDITOR
    // ####################################################

    toggleEditor() {
        return this.editorManager.toggleEditor();
    }

    toggleLockUnlockEditor() {
        return this.editorManager.toggleLockUnlockEditor();
    }

    editorCenter() {
        return this.editorManager.editorCenter();
    }

    toggleEditorPin() {
        return this.editorManager.toggleEditorPin();
    }

    editorPin() {
        return this.editorManager.editorPin();
    }

    editorUnpin() {
        return this.editorManager.editorUnpin();
    }

    editorPinned() {
        return this.editorManager.editorPinned();
    }

    editorUpdate() {
        return this.editorManager.editorUpdate();
    }

    handleEditorUpdateData(data) {
        return this.editorManager.handleEditorUpdateData(data);
    }

    handleEditorData(data) {
        return this.editorManager.handleEditorData(data);
    }

    editorOpen() {
        return this.editorManager.editorOpen();
    }

    handleEditorActionsData(data) {
        return this.editorManager.handleEditorActionsData(data);
    }

    editorIsLocked() {
        return this.editorManager.editorIsLocked();
    }

    persistPrivateEditor() {
        return this.editorManager.persistPrivateEditor();
    }

    toggleEditorPrivate() {
        return this.editorManager.toggleEditorPrivate();
    }

    _promptExitEditorPrivateMode() {
        return this.editorManager._promptExitEditorPrivateMode();
    }

    _exitEditorPrivateMode() {
        return this.editorManager._exitEditorPrivateMode();
    }

    editorUndo() {
        return this.editorManager.editorUndo();
    }

    editorRedo() {
        return this.editorManager.editorRedo();
    }

    editorCopy() {
        return this.editorManager.editorCopy();
    }

    editorClean() {
        return this.editorManager.editorClean();
    }

    editorSave() {
        return this.editorManager.editorSave();
    }

    handleEditorSaveResult(result) {
        return this.editorManager.handleEditorSaveResult(result);
    }

    saveEditorAsText() {
        return this.editorManager.saveEditorAsText();
    }

    saveEditorAsHtml() {
        return this.editorManager.saveEditorAsHtml();
    }

    generateFileName(extension) {
        return this.editorManager.generateFileName(extension);
    }

    saveAsHtml(content, file) {
        return this.editorManager.saveAsHtml(content, file);
    }

    editorSendAction(action) {
        return this.editorManager.editorSendAction(action);
    }

    get isEditorPinned() {
        return this.editorManager.isEditorPinned;
    }
    set isEditorPinned(val) {
        this.editorManager.isEditorPinned = val;
    }

    // ####################################################
    // RECORDING
    // ####################################################

    popupRecordingOnLeaveRoom() {
        return this.recordingManager.popupRecordingOnLeaveRoom();
    }

    showRecServerSideAdvice() {
        return this.recordingManager.showRecServerSideAdvice();
    }

    toggleVideoAudioTabs(disabled = false) {
        return this.recordingManager.toggleVideoAudioTabs(disabled);
    }

    handleRecordingError(error, popupLog = true) {
        return this.recordingManager.handleRecordingError(error, popupLog);
    }

    getSupportedMimeTypes() {
        return this.recordingManager.getSupportedMimeTypes();
    }

    startRecording() {
        return this.recordingManager.startRecording();
    }

    recordingOptions(options, audioMixerTracks) {
        return this.recordingManager.recordingOptions(options, audioMixerTracks);
    }

    startMobileRecording(options, audioMixerTracks) {
        return this.recordingManager.startMobileRecording(options, audioMixerTracks);
    }

    startDesktopRecording(options, audioMixerTracks) {
        return this.recordingManager.startDesktopRecording(options, audioMixerTracks);
    }

    initRecording() {
        return this.recordingManager.initRecording();
    }

    hasAudioTrack(mediaStream) {
        return this.recordingManager.hasAudioTrack(mediaStream);
    }

    hasVideoTrack(mediaStream) {
        return this.recordingManager.hasVideoTrack(mediaStream);
    }

    getAudioTracksFromAudioElements() {
        return this.recordingManager.getAudioTracksFromAudioElements();
    }

    getAudioStreamFromAudioElements() {
        return this.recordingManager.getAudioStreamFromAudioElements();
    }

    handleMediaRecorder() {
        return this.recordingManager.handleMediaRecorder();
    }

    generateUUIDv4() {
        return this.recordingManager.generateUUIDv4();
    }

    getServerRecFileName() {
        return this.recordingManager.getServerRecFileName();
    }

    handleMediaRecorderStart(evt) {
        return this.recordingManager.handleMediaRecorderStart(evt);
    }

    handleMediaRecorderData(evt) {
        return this.recordingManager.handleMediaRecorderData(evt);
    }

    async syncRecordingInCloud(data) {
        return this.recordingManager.syncRecordingInCloud(data);
    }

    async handleMediaRecorderStop(evt) {
        return this.recordingManager.handleMediaRecorderStop(evt);
    }

    disableRecordingOptions(disabled = true) {
        return this.recordingManager.disableRecordingOptions(disabled);
    }

    getWebmFixerFn() {
        return this.recordingManager.getWebmFixerFn();
    }

    handleLocalRecordingStop() {
        return this.recordingManager.handleLocalRecordingStop();
    }

    handleServerRecordingStop() {
        return this.recordingManager.handleServerRecordingStop();
    }

    saveLastRecordingInfo(recordingInfo) {
        return this.recordingManager.saveLastRecordingInfo(recordingInfo);
    }

    cleanLastRecordingInfo() {
        return this.recordingManager.cleanLastRecordingInfo();
    }

    showRecordingInfo(recType, recordingInfo, recordingMsg = '') {
        return this.recordingManager.showRecordingInfo(recType, recordingInfo, recordingMsg);
    }

    saveRecordingInLocalDevice(blob, recFileName) {
        return this.recordingManager.saveRecordingInLocalDevice(blob, recFileName);
    }

    pauseRecording() {
        return this.recordingManager.pauseRecording();
    }

    resumeRecording() {
        return this.recordingManager.resumeRecording();
    }

    stopRecording() {
        return this.recordingManager.stopRecording();
    }

    recordingAction(action) {
        return this.recordingManager.recordingAction(action);
    }

    handleRecordingAction(data) {
        return this.recordingManager.handleRecordingAction(data);
    }

    saveRecording(reason) {
        return this.recordingManager.saveRecording(reason);
    }

    // ####################################################
    // ACTIVE ROOMS
    // ####################################################

    showActiveRooms() {
        openURL('/activeRooms', true);
    }

    // ####################################################
    // FILE SHARING
    // ####################################################

    handleSF(uid, name) {
        const words = uid.split('___');
        let peer_id = words[1];
        let peer_name = name;
        let btnSf = this.getId(uid);
        if (btnSf) {
            btnSf.addEventListener('click', () => {
                this.selectFileToShare(peer_id, false, peer_name);
            });
        }
    }

    handleDD(uid, peer_id, itsMe = false) {
        let videoPlayer = this.getId(uid);
        if (videoPlayer) {
            videoPlayer.addEventListener('dragover', function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.target.parentElement.style.outline = `2px dashed var(--dd-color)`;
            });

            videoPlayer.addEventListener('dragleave', function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.target.parentElement.style.outline = 'none';
            });

            videoPlayer.addEventListener('drop', function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.target.parentElement.style.outline = 'none';
                if (itsMe) {
                    return userLog('warning', 'You cannot send files to yourself.', 'top-end');
                }
                if (this.sendInProgress) {
                    return userLog('warning', 'Please wait for the previous file to be sent.', 'top-end');
                }
                if (e.dataTransfer.items && e.dataTransfer.items.length > 1) {
                    return userLog('warning', 'Please drag and drop a single file.', 'top-end');
                }
                if (e.dataTransfer.items) {
                    let item = e.dataTransfer.items[0].webkitGetAsEntry();
                    console.log('Drag and drop', item);
                    if (item.isDirectory) {
                        return userLog('warning', 'Please drag and drop a single file not a folder.', 'top-end');
                    }
                    var file = e.dataTransfer.items[0].getAsFile();
                    const peerNameEl = rc.getId(peer_id + '__name');
                    const peerName = peerNameEl ? peerNameEl.innerText : 'all';
                    rc.sendFileInformations(file, peer_id, false, peerName);
                } else {
                    const peerNameEl = rc.getId(peer_id + '__name');
                    const peerName = peerNameEl ? peerNameEl.innerText : 'all';
                    rc.sendFileInformations(e.dataTransfer.files[0], peer_id, false, peerName);
                }
            });
        }
    }

    formatAcceptedFileTypes(accept = '*') {
        if (!accept || accept === '*') {
            return 'any file type';
        }

        return accept
            .split(',')
            .map((type) => type.trim())
            .filter(Boolean)
            .map((type) => {
                if (type === '*') return 'any file';
                if (type.endsWith('/*')) return `${type.slice(0, -2).toUpperCase()} files`;
                if (type.startsWith('.')) return `${type.slice(1).toUpperCase()} files`;
                if (type.includes('/')) return type.split('/')[1].toUpperCase();
                return type.toUpperCase();
            })
            .join(', ');
    }

    async openFilePickerModal({ title = 'Share file', accept = '*', confirmButtonText = 'Send', imageUrl } = {}) {
        const acceptedFileTypes = this.formatAcceptedFileTypes(accept);
        const helperText = `Accepted: ${acceptedFileTypes}`;
        const emptyStateTitle = 'Drag and drop a file';
        const emptyStateSubtitle = 'or click to browse from your device';
        let selectedFile = null;

        const result = await Swal.fire({
            allowOutsideClick: false,
            background: swalBackground,
            position: 'center',
            title,
            input: 'file',
            html: renderRoomTemplate('popupTeamDekhoFilePickerTemplate', {
                text: {
                    emptyStateTitle,
                    emptyStateSubtitle,
                    helperText,
                },
            }),
            inputAttributes: {
                accept,
                'aria-label': title,
            },
            customClass: {
                htmlContainer: 'teamdekho-file-picker-html',
            },
            didOpen: () => {
                const input = Swal.getInput();
                const confirmButton = Swal.getConfirmButton();
                const dropzone = document.getElementById('teamdekhoFileDropzone');
                const dropzoneTitle = document.getElementById('teamdekhoFileDropzoneTitle');
                const dropzoneSubtitle = document.getElementById('teamdekhoFileDropzoneSubtitle');
                const browseBtn = document.getElementById('teamdekhoFileBrowseBtn');
                const preview = document.getElementById('teamdekhoFilePreview');
                const fileName = document.getElementById('teamdekhoFileName');
                const fileDetails = document.getElementById('teamdekhoFileDetails');
                const removeBtn = document.getElementById('teamdekhoFileRemoveBtn');

                if (!input || !dropzone || !confirmButton) return;

                input.classList.add('teamdekho-hidden-file-input');
                confirmButton.disabled = true;

                const resetSelection = () => {
                    selectedFile = null;
                    input.value = '';
                    preview.hidden = true;
                    dropzone.classList.remove('has-file', 'is-dragover');
                    dropzoneTitle.textContent = emptyStateTitle;
                    dropzoneSubtitle.textContent = emptyStateSubtitle;
                    browseBtn.textContent = 'Browse files';
                    fileName.textContent = 'No file selected';
                    fileDetails.textContent = '';
                    confirmButton.disabled = true;
                    Swal.resetValidationMessage();
                };

                const applySelection = (file) => {
                    if (!file) {
                        resetSelection();
                        return;
                    }

                    if (file.size <= 0) {
                        resetSelection();
                        return Swal.showValidationMessage('The selected file is empty.');
                    }

                    selectedFile = file;
                    fileName.textContent = file.name;
                    fileDetails.textContent = `${this.bytesToSize(file.size)}${file.type ? ` • ${file.type}` : ''}`;
                    preview.hidden = false;
                    dropzone.classList.add('has-file');
                    dropzone.classList.remove('is-dragover');
                    dropzoneTitle.textContent = 'File ready';
                    dropzoneSubtitle.textContent = 'Drop another file here or browse to replace it';
                    browseBtn.textContent = 'Browse another file';
                    Swal.resetValidationMessage();
                    confirmButton.disabled = false;
                };

                const openSystemPicker = (event) => {
                    if (event) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    input.click();
                };

                const handleDragState = (event, isDragOver) => {
                    event.preventDefault();
                    event.stopPropagation();
                    dropzone.classList.toggle('is-dragover', isDragOver);
                    if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
                };

                browseBtn.addEventListener('click', openSystemPicker);
                dropzone.addEventListener('click', openSystemPicker);
                removeBtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    resetSelection();
                });

                input.addEventListener('change', () => {
                    applySelection(input.files && input.files.length ? input.files[0] : null);
                });

                dropzone.addEventListener('dragenter', (event) => handleDragState(event, true));
                dropzone.addEventListener('dragover', (event) => handleDragState(event, true));
                dropzone.addEventListener('dragleave', (event) => {
                    if (event.target === dropzone) {
                        handleDragState(event, false);
                    }
                });
                dropzone.addEventListener('drop', (event) => {
                    handleDragState(event, false);

                    const transfer = event.dataTransfer;
                    if (!transfer) return;

                    if (transfer.items && transfer.items.length > 1) {
                        resetSelection();
                        return Swal.showValidationMessage('Please choose a single file.');
                    }

                    const item = transfer.items && transfer.items.length ? transfer.items[0] : null;
                    const entry = item && typeof item.webkitGetAsEntry === 'function' ? item.webkitGetAsEntry() : null;

                    if (entry && entry.isDirectory) {
                        resetSelection();
                        return Swal.showValidationMessage('Folders are not supported.');
                    }

                    if (item && item.kind && item.kind !== 'file') {
                        resetSelection();
                        return Swal.showValidationMessage('Only files can be uploaded here.');
                    }

                    const file = item && typeof item.getAsFile === 'function' ? item.getAsFile() : transfer.files[0];

                    if (!file) {
                        resetSelection();
                        return Swal.showValidationMessage('Could not read the selected file.');
                    }

                    applySelection(file);
                });
            },
            showDenyButton: true,
            confirmButtonText,
            denyButtonText: 'Cancel',
            preConfirm: () => {
                if (!selectedFile) {
                    Swal.showValidationMessage('Choose a file before continuing.');
                    return false;
                }
                return selectedFile;
            },
            ...(imageUrl
                ? {
                      imageAlt: 'teamdekhosfu-file-sharing',
                      imageUrl,
                  }
                : {}),
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        });

        return result.isConfirmed ? result.value : null;
    }

    async selectFileToShare(peer_id, broadcast = false, peer_name = 'all') {
        this.sound('open');

        const file = await this.openFilePickerModal({
            title: 'Share file',
            accept: this.fileSharingInput,
            confirmButtonText: 'Send',
        });

        if (file) {
            this.sendFileInformations(file, peer_id, broadcast, peer_name);
        }
    }

    sendFileInformations(file, peer_id, broadcast = false, peer_name = 'all') {
        if (this.isFileReaderRunning()) {
            return this.userLog('warning', 'File transfer in progress. Please wait until it completes', 'top-end');
        }
        this.fileToSend = file;
        //
        if (this.fileToSend && this.fileToSend.size > 0) {
            if (!this.thereAreParticipants()) {
                return userLog('info', 'No participants detected', 'top-end');
            }
            // prevent XSS injection
            if (this.isHtml(this.fileToSend.name) || !this.isValidFileName(this.fileToSend.name))
                return userLog('warning', 'Invalid file name!', 'top-end', 5000);

            const isPrivate = !broadcast && peer_id !== 'all' && peer_id !== this.peer_id;
            const toId = isPrivate ? peer_id : 'all';
            const toName = isPrivate ? peer_name : 'all';

            const fileInfo = {
                peer_id: peer_id,
                sender_id: this.peer_id,
                broadcast: broadcast,
                peer_name: this.peer_name,
                peer_avatar: this.peer_avatar,
                fileName: this.fileToSend.name,
                fileSize: this.fileToSend.size,
                fileType: this.fileToSend.type,
            };
            this.setMsgAvatar('left', this.peer_name, this.peer_avatar);
            this.appendMessage(
                'left',
                this.leftMsgAvatar,
                this.peer_name,
                this.peer_id,
                `${icons.fileSend} File send:<br>Name: ${this.fileToSend.name}<br>Size: ${this.bytesToSize(this.fileToSend.size)}`,
                toId,
                toName
            );
            // send some metadata about our file to peers in the room
            this.socket.emit('fileInfo', fileInfo);
            setTimeout(() => {
                this.sendFileData(peer_id, broadcast);
            }, 1000);
        } else {
            userLog('error', 'File not selected or empty.', 'top-end');
        }
    }

    handleFileInfo(data) {
        this.incomingFileInfo = data;
        this.incomingFileData = [];
        this.receiveBuffer = [];
        this.receivedSize = 0;
        let fileToReceiveInfo =
            ' From: ' +
            this.incomingFileInfo.peer_name +
            html.newline +
            ' Incoming file: ' +
            this.incomingFileInfo.fileName +
            html.newline +
            ' File type: ' +
            this.incomingFileInfo.fileType +
            html.newline +
            ' File size: ' +
            this.bytesToSize(this.incomingFileInfo.fileSize);
        const isPrivateFile = !this.incomingFileInfo.broadcast;
        const fileSenderId = this.incomingFileInfo.sender_id || this.incomingFileInfo.peer_id;
        const fileToId = isPrivateFile ? fileSenderId : 'all';
        const fileToName = isPrivateFile ? this.incomingFileInfo.peer_name : 'all';

        this.setMsgAvatar('right', this.incomingFileInfo.peer_name, this.incomingFileInfo.peer_avatar);
        this.appendMessage(
            'right',
            this.rightMsgAvatar,
            this.incomingFileInfo.peer_name,
            fileSenderId,
            `${icons.fileReceive} File receive:<br>From: ${this.incomingFileInfo.peer_name}<br>Name: ${this.incomingFileInfo.fileName}<br>Size: ${this.bytesToSize(this.incomingFileInfo.fileSize)}`,
            fileToId,
            fileToName
        );
        receiveFileInfo.innerText = fileToReceiveInfo;
        receiveFileDiv.style.display = 'block';
        receiveProgress.max = this.incomingFileInfo.fileSize;
        this.userLog('info', fileToReceiveInfo, 'top-end');
        this.receiveInProgress = true;
    }

    sendFileData(peer_id, broadcast) {
        console.log('Send file ', {
            name: this.fileToSend.name,
            size: this.bytesToSize(this.fileToSend.size),
            type: this.fileToSend.type,
        });

        this.sendInProgress = true;

        sendFileInfo.innerText =
            'File name: ' +
            this.fileToSend.name +
            html.newline +
            'File type: ' +
            this.fileToSend.type +
            html.newline +
            'File size: ' +
            this.bytesToSize(this.fileToSend.size) +
            html.newline;

        sendFileDiv.style.display = 'block';
        sendProgress.max = this.fileToSend.size;

        this.fileReader = new FileReader();
        let offset = 0;

        this.fileReader.addEventListener('error', (err) => console.error('fileReader error', err));
        this.fileReader.addEventListener('abort', (e) => console.log('fileReader aborted', e));
        this.fileReader.addEventListener('load', (e) => {
            if (!this.sendInProgress) return;

            let data = {
                peer_id: peer_id,
                broadcast: broadcast,
                fileData: e.target.result,
            };
            this.sendFSData(data);
            offset += data.fileData.byteLength;

            sendProgress.value = offset;
            sendFilePercentage.innerText = 'Send progress: ' + ((offset / this.fileToSend.size) * 100).toFixed(2) + '%';

            // send file completed
            if (offset === this.fileToSend.size) {
                this.sendInProgress = false;
                sendFileDiv.style.display = 'none';
                userLog('success', 'The file ' + this.fileToSend.name + ' was sent successfully.', 'top-end');
            }

            if (offset < this.fileToSend.size) readSlice(offset);
        });
        const readSlice = (o) => {
            const slice = this.fileToSend.slice(offset, o + this.chunkSize);
            this.fileReader.readAsArrayBuffer(slice);
        };
        readSlice(0);
    }

    sendFSData(data) {
        if (data) this.socket.emit('file', data);
    }

    abortFileTransfer() {
        if (this.isFileReaderRunning()) {
            this.fileReader.abort();
            sendFileDiv.style.display = 'none';
            this.sendInProgress = false;
            this.socket.emit('fileAbort', {
                peer_name: this.peer_name,
            });
        }
    }

    abortReceiveFileTransfer() {
        const data = { peer_name: this.peer_name };
        this.socket.emit('receiveFileAbort', data);
        setTimeout(() => {
            this.handleFileAbort(data);
        }, 1000);
    }

    hideFileTransfer() {
        receiveFileDiv.style.display = 'none';
    }

    isFileReaderRunning() {
        return this.fileReader && this.fileReader.readyState === 1;
    }

    handleReceiveFileAbort(data) {
        if (this.isFileReaderRunning()) {
            this.userLog('info', data.peer_name + ' ⚠️ aborted file transfer', 'top-end');
            this.fileReader.abort();
            sendFileDiv.style.display = 'none';
            this.sendInProgress = false;
        } else {
            this.handleFileAbort(data);
        }
    }

    handleFileAbort(data) {
        this.receiveBuffer = [];
        this.incomingFileData = [];
        this.receivedSize = 0;
        this.receiveInProgress = false;
        receiveFileDiv.style.display = 'none';
        console.log(data.peer_name + ' aborted the file transfer');
        this.userLog('info', data.peer_name + ' ⚠️ aborted the file transfer', 'top-end');
    }

    handleFile(data) {
        if (!this.receiveInProgress) return;
        this.receiveBuffer.push(data.fileData);
        this.receivedSize += data.fileData.byteLength;
        receiveProgress.value = this.receivedSize;
        receiveFilePercentage.innerText =
            'Receive progress: ' + ((this.receivedSize / this.incomingFileInfo.fileSize) * 100).toFixed(2) + '%';
        if (this.receivedSize === this.incomingFileInfo.fileSize) {
            receiveFileDiv.style.display = 'none';
            this.incomingFileData = this.receiveBuffer;
            this.receiveBuffer = [];
            this.endFileDownload();
        }
    }

    endFileDownload() {
        this.sound('download');

        // save received file into Blob
        const blob = new Blob(this.incomingFileData);
        const file = this.incomingFileInfo.fileName;

        this.incomingFileData = [];

        // if file is image, show the preview
        if (isImageURL(this.incomingFileInfo.fileName)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                Swal.fire({
                    allowOutsideClick: false,
                    background: swalBackground,
                    position: 'center',
                    title: 'Received file',
                    text: this.incomingFileInfo.fileName + ' size ' + this.bytesToSize(this.incomingFileInfo.fileSize),
                    imageUrl: e.target.result,
                    imageAlt: 'teamdekhosfu-file-img-download',
                    showDenyButton: true,
                    confirmButtonText: `Save`,
                    denyButtonText: `Cancel`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                }).then((result) => {
                    if (result.isConfirmed) this.saveBlobToFile(blob, file);
                });
            };
            // blob where is stored downloaded file
            reader.readAsDataURL(blob);
        } else {
            // not img file
            Swal.fire({
                allowOutsideClick: false,
                background: swalBackground,
                position: 'center',
                title: 'Received file',
                text: this.incomingFileInfo.fileName + ' size ' + this.bytesToSize(this.incomingFileInfo.fileSize),
                showDenyButton: true,
                confirmButtonText: `Save`,
                denyButtonText: `Cancel`,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' },
            }).then((result) => {
                if (result.isConfirmed) this.saveBlobToFile(blob, file);
            });
        }
    }

    saveBlobToFile(blob, file) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = file;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }

    bytesToSize(bytes) {
        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }

    toHtmlJson(obj) {
        return '<pre>' + JSON.stringify(obj, null, 4) + '</pre>';
    }

    isValidFileName(fileName) {
        const invalidChars = /[\\\/\?\*\|:"<>]/;
        return !invalidChars.test(fileName);
    }

    // ####################################################
    // SHARE VIDEO YOUTUBE - MP4 - WEBM - OGG or AUDIO mp3
    // ####################################################

    handleSV(uid, name) {
        const words = uid.split('___');
        let peer_id = words[1];
        let peer_name = name;
        let btnSv = this.getId(uid);
        if (btnSv) {
            btnSv.addEventListener('click', () => {
                this.shareVideo(peer_id, peer_name);
            });
        }
    }

    shareVideo(peer_id = 'all', peer_name = 'all') {
        if (this._moderator.media_cant_sharing) {
            return userLog('warning', 'The moderator does not allow you to share any media', 'top-end', 6000);
        }

        this.sound('open');

        Swal.fire({
            background: swalBackground,
            position: 'center',
            imageUrl: image.videoShare,
            title: 'Share a Video or Audio',
            text: 'Paste a Video or Audio URL',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: `Share`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.value) {
                result.value = filterXSS(result.value);
                // if (!this.thereAreParticipants()) {
                //     return userLog('info', 'No participants detected', 'top-end');
                // }
                if (!this.isVideoTypeSupported(result.value)) {
                    return userLog('warning', 'Something wrong, try with another Video or audio URL');
                }
                /*
                    https://www.youtube.com/watch?v=RT6_Id5-7-s
                    https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
                    https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3
                */
                let is_youtube = this.getVideoType(result.value) == 'na' ? true : false;
                let video_url = is_youtube ? this.getYoutubeEmbed(result.value) : result.value;
                if (video_url) {
                    let data = {
                        peer_id: peer_id,
                        peer_name: this.peer_name,
                        video_url: video_url,
                        is_youtube: is_youtube,
                        action: 'open',
                    };
                    console.log('Video URL: ', video_url);
                    this.socket.emit('shareVideoAction', data);
                    this.openVideo(data);
                } else {
                    this.userLog('error', 'Not valid video URL', 'top-end', 6000);
                }
            }
        });

        // Take URL from clipboard ex:
        // https://www.youtube.com/watch?v=1ZYbU82GVz4

        navigator.clipboard
            .readText()
            .then((clipboardText) => {
                if (!clipboardText) return false;
                const sanitizedText = filterXSS(clipboardText);
                const inputElement = Swal.getInput();
                if (this.isVideoTypeSupported(sanitizedText) && inputElement) {
                    inputElement.value = sanitizedText;
                }
                return false;
            })
            .catch(() => {
                return false;
            });
    }

    getVideoType(url) {
        if (url.endsWith('.mp4')) return 'video/mp4';
        if (url.endsWith('.mp3')) return 'video/mp3';
        if (url.endsWith('.webm')) return 'video/webm';
        if (url.endsWith('.ogg')) return 'video/ogg';
        return 'na';
    }

    isVideoTypeSupported(url) {
        if (
            url.endsWith('.mp4') ||
            url.endsWith('.mp3') ||
            url.endsWith('.webm') ||
            url.endsWith('.ogg') ||
            url.includes('youtube.com')
        )
            return true;
        return false;
    }

    getYoutubeEmbed(url) {
        let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        let match = url.match(regExp);
        return match && match[7].length == 11 ? 'https://www.youtube.com/embed/' + match[7] + '?autoplay=1' : false;
    }

    shareVideoAction(data) {
        const { peer_name, action } = data;

        switch (action) {
            case 'open':
                this.userLog('info', `${peer_name} ${icons.youtube} opened the video`, 'top-end');
                this.openVideo(data);
                break;
            case 'close':
                this.userLog('info', `${peer_name} ${icons.youtube} closed the video`, 'top-end');
                this.closeVideo();
                break;
            default:
                break;
        }
    }

    openVideo(data) {
        let d, vb, e, video, pn, fsBtn;
        let peer_name = data.peer_name;
        let video_url = data.video_url + (this.isMobileSafari ? '&enablejsapi=1&mute=1' : ''); // Safari need user interaction
        let is_youtube = data.is_youtube;
        let video_type = this.getVideoType(video_url);
        this.closeVideo();
        show(videoCloseBtn);
        d = document.createElement('div');
        d.className = 'Camera';
        d.id = '__shareVideo';
        vb = document.createElement('div');
        vb.setAttribute('id', '__videoBar');
        vb.className = 'videoMenuBarShare fadein';
        e = this.createButton('__videoExit', 'fas fa-times');
        pn = this.createButton('__pinUnpin', html.pin);
        fsBtn = this.createButton('__videoFS', html.fullScreen);

        if (is_youtube) {
            video = document.createElement('iframe');
            video.setAttribute('title', peer_name);
            video.setAttribute(
                'allow',
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            );
            video.setAttribute('frameborder', '0');
            video.setAttribute('allowfullscreen', true);

            // Safari on Mobile needs user interaction to unmute video
            if (this.isMobileSafari) {
                Swal.fire({
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    background: swalBackground,
                    position: 'top',
                    imageUrl: image.videoShare,
                    title: 'Unmute Video',
                    text: 'Tap the button below to unmute and play the video with sound.',
                    confirmButtonText: 'Unmute',
                    didOpen: () => {
                        const unmuteButton = Swal.getConfirmButton();
                        if (unmuteButton) unmuteButton.focus();
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (video && video.contentWindow) {
                            video.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
                            video.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                        }
                    }
                });
            }
        } else {
            video = document.createElement('video');
            video.type = video_type;
            video.autoplay = true;
            video.controls = true;
            if (video_type == 'video/mp3') {
                video.poster = image.audio;
            }
        }
        video.setAttribute('id', '__videoShare');
        video.setAttribute('src', video_url);
        video.setAttribute('width', '100%');
        video.setAttribute('height', '100%');
        vb.appendChild(e);
        vb.appendChild(fsBtn);
        if (!this.isMobileDevice) vb.appendChild(pn);
        d.appendChild(video);
        d.appendChild(vb);
        this.videoMediaContainer.appendChild(d);

        fsBtn.addEventListener('click', () => {
            // Try to use the Fullscreen API
            if (
                video.requestFullscreen ||
                video.webkitRequestFullscreen ||
                video.mozRequestFullScreen ||
                video.msRequestFullscreen
            ) {
                this.isFullScreen() ? this.goOutFullscreen(video) : this.goInFullscreen(video);
            } else {
                elemDisplay('__videoFS', false);

                // Maximize video with CSS
                video.style.position = 'fixed';
                video.style.top = 0;
                video.style.left = 0;
                video.style.width = '100vw';
                video.style.height = '100vh';
                video.style.zIndex = 9999;

                // Add a close/maximize button for fallback
                let isMaximized = true;
                const closeBtn = document.createElement('button');
                closeBtn.innerText = isMaximized ? 'Minimize' : 'Maximize';
                closeBtn.style.position = 'absolute';
                closeBtn.style.top = '1px';
                closeBtn.style.left = '1px';
                closeBtn.style.zIndex = 10000;
                closeBtn.style.background = 'rgba(0,0,0,0.5)';
                closeBtn.style.color = '#fff';
                closeBtn.style.border = 'none';
                closeBtn.style.padding = '8px 12px';
                closeBtn.style.borderRadius = '4px';
                closeBtn.style.cursor = 'pointer';

                closeBtn.onclick = () => {
                    if (isMaximized) {
                        video.style.position = '';
                        video.style.top = '';
                        video.style.left = '';
                        video.style.width = '';
                        video.style.height = '';
                        video.style.zIndex = '';
                        closeBtn.innerText = 'Maximize';
                        isMaximized = false;
                    } else {
                        video.style.position = 'fixed';
                        video.style.top = 0;
                        video.style.left = 0;
                        video.style.width = '100vw';
                        video.style.height = '100vh';
                        video.style.zIndex = 9999;
                        closeBtn.innerText = 'Minimize';
                        isMaximized = true;
                    }
                };

                // Ensure only one button is added
                if (!video.parentNode.querySelector('.mobile-video-close-btn')) {
                    closeBtn.classList.add('mobile-video-close-btn');
                    video.parentNode.appendChild(closeBtn);
                }
            }
        });

        const exitVideoBtn = this.getId(e.id);
        exitVideoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (this._moderator.media_cant_sharing) {
                return userLog('warning', 'The moderator does not allow you close this media', 'top-end', 6000);
            }
            this.closeVideo(true);
        });

        this.handlePN(video.id, pn.id, d.id);
        if (!this.isMobileDevice) {
            this.setTippy(pn.id, 'Toggle Pin video player', 'bottom');
            this.setTippy(e.id, 'Close video player', 'bottom');
            this.setTippy(fsBtn.id, 'Full screen', 'bottom');
        }

        handleAspectRatio();
        console.log('[openVideo] Video-element-count', this.videoMediaContainer.childElementCount);
        this.sound('joined');
    }

    closeVideo(emit = false, peer_id = 'all') {
        if (emit) {
            let data = {
                peer_id: peer_id,
                peer_name: this.peer_name,
                action: 'close',
            };
            this.socket.emit('shareVideoAction', data);
        }
        let shareVideoDiv = this.getId('__shareVideo');
        if (shareVideoDiv) {
            hide(videoCloseBtn);
            shareVideoDiv.parentNode.removeChild(shareVideoDiv);
            //alert(this.isVideoPinned + ' - ' + this.pinnedVideoPlayerId);
            if (this.isVideoPinned && this.pinnedVideoPlayerId == '__videoShare') {
                this.removeVideoPinMediaContainer();
                console.log('Remove pin container due the Video player close');
            }
            handleAspectRatio();
            console.log('[closeVideo] Video-element-count', this.videoMediaContainer.childElementCount);
            this.sound('left');
        }
    }

    // ####################################################
    // ROOM ACTION
    // ####################################################

    roomAction(action, emit = true, popup = true) {
        const data = {
            room_broadcasting: isBroadcastingEnabled,
            room_id: this.room_id,
            peer_id: this.peer_id,
            peer_name: this.peer_name,
            peer_uuid: this.peer_uuid,
            action: action,
            password: null,
        };
        if (emit) {
            switch (action) {
                case 'broadcasting':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'lock':
                    if (room_password) {
                        this.socket
                            .request('getPeerCounts')
                            .then(async (res) => {
                                // Only the presenter can lock the room
                                if (isPresenter || res.peerCounts == 1) {
                                    isPresenter = true;
                                    this.peer_info.peer_presenter = isPresenter;
                                    this.getId('isUserPresenter').innerText = isPresenter;
                                    data.password = room_password;
                                    this.socket.emit('roomAction', data);
                                    if (popup) this.roomStatus(action);
                                }
                            })
                            .catch((err) => {
                                console.log('Get peer counts:', err);
                            });
                    } else {
                        Swal.fire({
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            showDenyButton: true,
                            background: swalBackground,
                            imageUrl: image.locked,
                            input: 'text',
                            inputPlaceholder: 'Set Room password',
                            confirmButtonText: `OK`,
                            denyButtonText: `Cancel`,
                            showClass: { popup: 'animate__animated animate__fadeInDown' },
                            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                            inputValidator: (pwd) => {
                                if (!pwd) return 'Please enter the Room password';
                                this.RoomPassword = pwd;
                            },
                        }).then((result) => {
                            if (result.isConfirmed) {
                                data.password = this.RoomPassword;
                                this.socket.emit('roomAction', data);
                                this.roomStatus(action);
                            }
                        });
                    }
                    break;
                case 'unlock':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'lobbyOn':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'lobbyOff':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'hostOnlyRecordingOn':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'hostOnlyRecordingOff':
                    this.socket.emit('roomAction', data);
                    if (popup) this.roomStatus(action);
                    break;
                case 'isBanned':
                    this.socket.emit('roomAction', data);
                    this.isBanned();
                    break;
                default:
                    break;
            }
        } else {
            this.roomStatus(action);
        }
    }

    roomStatus(action) {
        switch (action) {
            case 'broadcasting':
                this.userLog('info', `${icons.room} BROADCASTING ${isBroadcastingEnabled ? 'On' : 'Off'}`, 'top-end');
                break;
            case 'lock':
                if (!isPresenter) return;
                this.sound('locked');
                this.event(_EVENTS.roomLock);
                this.userLog('info', `${icons.lock} LOCKED the room by the password`, 'top-end');
                break;
            case 'unlock':
                if (!isPresenter) return;
                this.userLog('info', `${icons.unlock} UNLOCKED the room`, 'top-end');
                this.event(_EVENTS.roomUnlock);
                break;
            case 'lobbyOn':
                this.event(_EVENTS.lobbyOn);
                this.userLog('info', `${icons.lobby} Lobby is enabled`, 'top-end');
                break;
            case 'lobbyOff':
                this.event(_EVENTS.lobbyOff);
                this.userLog('info', `${icons.lobby} Lobby is disabled`, 'top-end');
                break;
            case 'hostOnlyRecordingOn':
                this.event(_EVENTS.hostOnlyRecordingOn);
                this.userLog('info', `${icons.recording} Host only recording is enabled`, 'top-end');
                break;
            case 'hostOnlyRecordingOff':
                this.event(_EVENTS.hostOnlyRecordingOff);
                this.userLog('info', `${icons.recording} Host only recording is disabled`, 'top-end');
                break;
            default:
                break;
        }
    }

    roomMessage(action, active = false) {
        const status = active ? 'ON' : 'OFF';
        this.sound('switch');
        switch (action) {
            case 'toggleVideoMirror':
                this.userLog('info', `${icons.mirror} Video mirror ${status}`, 'top-end');
                break;
            case 'pitchBar':
                this.userLog('info', `${icons.pitchBar} Audio pitch bar ${status}`, 'top-end');
                break;
            case 'sounds':
                this.userLog('info', `${icons.sounds} Sounds notification ${status}`, 'top-end');
                break;
            case 'ptt':
                this.userLog('info', `${icons.ptt} Push to talk ${status}`, 'top-end');
                break;
            case 'notify':
                this.userLog('info', `${icons.share} Share room on join ${status}`, 'top-end');
                break;
            case 'hostOnlyRecording':
                this.userLog('info', `${icons.recording} Only host recording ${status}`, 'top-end');
                break;
            case 'showChat':
                active
                    ? this.userLog('info', `${icons.chat} Chat will be shown, when you receive a message`, 'top-end')
                    : this.userLog(
                          'info',
                          `${icons.chat} Chat not will be shown, when you receive a message`,
                          'top-end'
                      );
                break;
            case 'speechMessages':
                this.userLog('info', `${icons.speech} Speech incoming messages ${status}`, 'top-end');
                break;
            case 'transcriptShowOnMsg':
                active
                    ? this.userLog(
                          'info',
                          `${icons.transcript} Transcript will be shown, when you receive a message`,
                          'top-end'
                      )
                    : this.userLog(
                          'info',
                          `${icons.transcript} Transcript not will be shown, when you receive a message`,
                          'top-end'
                      );
                break;
            case 'transcriptSendToAll':
                active
                    ? this.userLog(
                          'info',
                          `${icons.transcript} Transcription will be sent to all participants`,
                          'top-end'
                      )
                    : this.userLog(
                          'info',
                          `${icons.transcript} Transcription will not be sent to participants`,
                          'top-end'
                      );
                break;
            case 'video_start_privacy':
                this.userLog(
                    'info',
                    `${icons.moderator} Moderator: everyone starts in privacy mode ${status}`,
                    'top-end'
                );
                break;
            case 'audio_start_muted':
                this.userLog('info', `${icons.moderator} Moderator: everyone starts muted ${status}`, 'top-end');
                break;
            case 'video_start_hidden':
                this.userLog('info', `${icons.moderator} Moderator: everyone starts hidden ${status}`, 'top-end');
                break;
            case 'audio_cant_unmute':
                this.userLog(
                    'info',
                    `${icons.moderator} Moderator: everyone can't unmute themselves ${status}`,
                    'top-end'
                );
                break;
            case 'video_cant_unhide':
                this.userLog(
                    'info',
                    `${icons.moderator} Moderator: everyone can't unhide themselves ${status}`,
                    'top-end'
                );
                break;
            case 'screen_cant_share':
                this.userLog(
                    'info',
                    `${icons.moderator} Moderator: everyone can't share the screen ${status}`,
                    'top-end'
                );
                break;
            case 'chat_cant_privately':
                this.userLog(
                    'info',
                    `${icons.moderator} Moderator: everyone can't chat privately ${status}`,
                    'top-end'
                );
                break;
            case 'chat_cant_publicly':
                this.userLog('info', `${icons.moderator} Moderator: everyone can't chat publicly ${status}`, 'top-end');
                break;
            case 'chat_cant_chatgpt':
                this.userLog(
                    'info',
                    `${icons.moderator} Moderator: everyone can't chat with ChatGPT ${status}`,
                    'top-end'
                );
                break;
            case 'chat_cant_deep_seek':
                this.userLog(
                    'info',
                    `${icons.moderator} Moderator: everyone can't chat with DeepSeek ${status}`,
                    'top-end'
                );
                break;
            case 'media_cant_sharing':
                this.userLog('info', `${icons.moderator} Moderator: everyone can't share media ${status}`, 'top-end');
                break;
            case 'polls_cant_create':
                this.userLog(
                    'info',
                    `${icons.moderator} Moderator: only presenter can create/edit/delete polls ${status}`,
                    'top-end'
                );
                break;
            case 'disconnect_all_on_leave':
                this.userLog('info', `${icons.moderator} Moderator: disconnect all on leave room ${status}`, 'top-end');
                break;
            case 'everyone_follows_me':
                this.userLog('info', `${icons.moderator} Moderator: everyone follows me ${status}`, 'top-end');
                break;
            case 'recSyncServer':
                active
                    ? this.showRecServerSideAdvice()
                    : this.userLog('info', `${icons.recording} Server sync recording ${status}`, 'top-end');
                break;
            case 'customThemeKeep':
                this.userLog('info', `${icons.theme} Custom theme keep ${status}`, 'top-end');
                break;
            case 'save_room_notifications':
                this.userLog('success', 'Room notifications saved successfully', 'top-end');
                break;
            default:
                break;
        }
    }

    async roomPassword(data) {
        return this.lobbyManager.roomPassword(data);
    }

    async roomLobby(data) {
        return this.lobbyManager.roomLobby(data);
    }

    lobbyRemovePearForPresenter(data) {
        return this.lobbyManager.lobbyRemovePearForPresenter(data);
    }

    lobbyAction(id, lobby_status) {
        return this.lobbyManager.lobbyAction(id, lobby_status);
    }

    lobbyAcceptAll() {
        return this.lobbyManager.lobbyAcceptAll();
    }

    lobbyRejectAll() {
        return this.lobbyManager.lobbyRejectAll();
    }

    lobbyRemoveAll() {
        return this.lobbyManager.lobbyRemoveAll();
    }

    lobbyRemoveMe(peer_id) {
        return this.lobbyManager.lobbyRemoveMe(peer_id);
    }

    lobbyAddPear(data) {
        return this.lobbyManager.lobbyAddPear(data);
    }

    lobbyRemovePear(peer_id) {
        return this.lobbyManager.lobbyRemovePear(peer_id);
    }

    lobbyRefreshUi() {
        return this.lobbyManager.lobbyRefreshUi();
    }

    lobbyParticipantsCount() {
        return this.lobbyManager.lobbyParticipantsCount();
    }

    lobbyGetPeerIds() {
        return this.lobbyManager.lobbyGetPeerIds();
    }

    lobbyGetData(status, peers_id = []) {
        return this.lobbyManager.lobbyGetData(status, peers_id);
    }

    lobbyToggle() {
        return this.lobbyManager.lobbyToggle();
    }

    roomInvalid() {
        return this.lobbyManager.roomInvalid();
    }

    userRoomNotAllowed() {
        return this.lobbyManager.userRoomNotAllowed();
    }

    userUnauthorized() {
        return this.lobbyManager.userUnauthorized();
    }

    unlockTheRoom() {
        return this.lobbyManager.unlockTheRoom();
    }

    roomIsLocked() {
        return this.lobbyManager.roomIsLocked();
    }

    presenterNotInRoom() {
        return this.lobbyManager.presenterNotInRoom();
    }

    waitJoinConfirm() {
        return this.lobbyManager.waitJoinConfirm();
    }

    showLobbyDecision(status) {
        return this.lobbyManager.showLobbyDecision(status);
    }

    isBanned() {
        return this.lobbyManager.isBanned();
    }

    // ####################################################
    // HANDLE AUDIO VOLUME
    // ####################################################

    getAudioVolumeColor(volume) {
        if (volume >= 80) return 'red';
        if (volume >= 50) return 'orange';
        return 'lime';
    }

    handleAudioVolume(data) {
        //console.log('Active speaker', data);

        const { peer_id, peer_name, audioVolume } = data;
        const audioVolumeTmp = audioVolume * 10; //10-100
        const audioColorTmp = this.getAudioVolumeColor(audioVolumeTmp);

        if (!isPitchBarEnabled) {
            const peerVideo = this.getName(peer_id);
            const peerAvatarImg = this.getId(peer_id + '__img');
            if (peerAvatarImg) {
                this.applyBoxShadowEffect(peerAvatarImg, audioColorTmp, 200);
            }
            if (peerVideo && peerVideo.classList.contains('videoCircle')) {
                this.applyBoxShadowEffect(peerVideo, audioColorTmp, 200);
            }
            return;
        }
        const producerAudioBtn = this.getId(peer_id + '_audio');
        const consumerAudioBtn = this.getId(peer_id + '__audio');
        const pbProducer = this.getId(peer_id + '_pitchBar');
        const pbConsumer = this.getId(peer_id + '__pitchBar');
        if (producerAudioBtn) producerAudioBtn.style.color = audioColorTmp;
        if (consumerAudioBtn) consumerAudioBtn.style.color = audioColorTmp;
        if (pbProducer) pbProducer.style.backgroundColor = audioColorTmp;
        if (pbConsumer) pbConsumer.style.backgroundColor = audioColorTmp;
        if (pbProducer) pbProducer.style.height = audioVolumeTmp + '%';
        if (pbConsumer) pbConsumer.style.height = audioVolumeTmp + '%';

        if (!this._audioVolumeTimers) this._audioVolumeTimers = new Map();
        if (this._audioVolumeTimers.has(peer_id)) {
            clearTimeout(this._audioVolumeTimers.get(peer_id));
        }
        this._audioVolumeTimers.set(
            peer_id,
            setTimeout(() => {
                if (producerAudioBtn) producerAudioBtn.style.color = 'white';
                if (consumerAudioBtn) consumerAudioBtn.style.color = 'white';
                if (pbProducer) pbProducer.style.height = '0%';
                if (pbConsumer) pbConsumer.style.height = '0%';
                this._audioVolumeTimers.delete(peer_id);
            }, 200)
        );
    }

    applyBoxShadowEffect(element, color, delay = 200) {
        if (element) {
            element.style.boxShadow = `0 0 20px ${color}`;
            setTimeout(() => {
                element.style.boxShadow = 'none';
            }, delay);
        }
    }

    // ####################################################
    // HANDLE PEERS AUDIO VOLUME
    // ####################################################

    handleCV(uid) {
        this.handleVolumeControl(uid, true); // Consumer
    }

    handlePV(uid) {
        this.handleVolumeControl(uid, false); // Producer
    }

    setAV(audioElementId, volumeElementId, volumeValue, isConsumer = false) {
        const volumeInput = this.getId(volumeElementId);
        const audioPlayer = this.getId(audioElementId);
        const volume = volumeValue / 100;

        if (volumeInput && audioPlayer) {
            console.log('Setting audio volume:', volumeValue);
            volumeInput.value = volumeValue;
            if (!audioPlayer.muted) {
                if (isConsumer) {
                    this.toggleVolumeInput(volumeInput, volumeValue);
                }
                this.setAudioVolume(audioPlayer, volume);
            } else {
                console.log('Audio player is muted, volume not adjusted.');
            }
        }
    }

    toggleVolumeInput(volumeInput, volumeValue) {
        /* 
            If the producer has changed the volume from the default value of 100,
            disable the volume input control on the consumer side to prevent further adjustments.
            Otherwise, keep the input enabled if the volume is still at 100.
        */
        volumeInput.disabled = volumeValue < 100;
    }

    handleVolumeControl(uid, isConsumer = true) {
        const words = uid.split('___');
        const volumeInputId = `${words[1]}___pVolume`;
        const audioPlayer = this.getId(isConsumer ? this.audioConsumers.get(volumeInputId) : words[0]);
        const inputElement = this.getId(volumeInputId);

        if (inputElement && audioPlayer) {
            //
            // Check if audio is enabled/disabled
            const isAudioEnabled = isConsumer
                ? !audioPlayer.muted && audioPlayer.volume > 0
                : this.peer_info.peer_audio;

            isAudioEnabled ? show(inputElement) : hide(inputElement);
            inputElement.value = 100;

            let volumeUpdateTimeout;

            const updateVolume = () => {
                const volume = inputElement.value / 100;
                this.setAudioVolume(audioPlayer, volume);

                // Update producer audio volume
                if (!isConsumer) this.peer_info.peer_audio_volume = inputElement.value;

                // Clear any existing timeout to prevent sending too frequently
                if (volumeUpdateTimeout) {
                    clearTimeout(volumeUpdateTimeout);
                }

                // Set a timeout to send the update after 0.5 second
                volumeUpdateTimeout = setTimeout(() => {
                    // Prepare the command to update peer volume
                    const cmd = {
                        type: 'peerAudio',
                        peer_name: this.peer_name,
                        [isConsumer ? 'audioConsumerId' : 'audioProducerId']: isConsumer
                            ? this.audioConsumers.get(volumeInputId)
                            : this.audioProducerId,
                        volumeInputId: volumeInputId,
                        volume: volume,
                        broadcast: true,
                    };
                    this.emitCmd(cmd);
                }, 500); // 0.5 second delay
            };

            this.addVolumeEventListeners(inputElement, updateVolume);
        }
    }

    setAudioVolume(audioPlayer, volume) {
        if (audioPlayer) {
            // Never unmute local producer audio elements (prevents echo/feedback)
            const isLocalProducer = audioPlayer.getAttribute('name') === 'LOCAL-AUDIO';
            if (isLocalProducer) {
                audioPlayer.muted = true;
                audioPlayer.volume = 0;
                return;
            }
            if (this.isMobileDevice) {
                audioPlayer.muted = volume === 0;
                if (!audioPlayer.muted) {
                    // Adjust playback rate as volume on mobile devices
                    audioPlayer.playbackRate = Math.max(0.1, volume);
                }
            } else {
                // Set volume directly on desktop devices
                audioPlayer.volume = volume;
            }
        }
    }

    handlePeerAudio(cmd) {
        console.log('handlePeerAudio', { cmd });

        const { volumeInputId, audioProducerId, audioConsumerId, volume } = cmd;

        const volumeInput = this.getId(volumeInputId);

        if (!volumeInput) return;

        volumeInput.value = volume * 100;

        if (audioProducerId) {
            this.handleConsumerAudio(audioProducerId, volume);
            this.toggleVolumeInput(volumeInput, volumeInput.value);
        }

        if (audioConsumerId) this.handleProducerAudio(audioConsumerId, volume);
    }

    handleConsumerAudio(audioProducerId, volume) {
        const consumerAudioId = this.getConsumerIdByProducerId(audioProducerId);
        if (!consumerAudioId) return;

        const consumerAudioPlayer = this.getId(consumerAudioId);
        if (!consumerAudioPlayer) return;

        this.setAudioVolume(consumerAudioPlayer, volume);

        console.log('handleConsumerPeerAudio', { consumerAudioId, consumerAudioPlayer });
    }

    handleProducerAudio(audioConsumerId, volume) {
        const producerAudioId = this.getProducerIdByConsumerId(audioConsumerId);
        if (!producerAudioId) return;

        const producerAudioPlayer = this.getId(producerAudioId);
        if (!producerAudioPlayer) return;

        this.setAudioVolume(producerAudioPlayer, volume);

        console.log('handleProducerPeerAudio', { producerAudioId, producerAudioPlayer });
    }

    addVolumeEventListeners(inputElement, updateVolumeCallback) {
        inputElement.addEventListener('input', updateVolumeCallback);
        inputElement.addEventListener('change', updateVolumeCallback);

        if (this.isMobileDevice) {
            inputElement.addEventListener('touchstart', updateVolumeCallback);
            inputElement.addEventListener('touchmove', updateVolumeCallback);
        }
    }

    // ####################################################
    // HANDLE DOMINANT SPEAKER
    // ###################################################

    handleDominantSpeakerHighlight(peer_id) {
        // Highlight the peer name
        const peerNameElement = this.getId(peer_id + '__name');
        if (peerNameElement) {
            peerNameElement.style.color = 'lime';
            setTimeout(function () {
                peerNameElement.style.color = '#FFFFFF';
            }, 5000);
        }
    }

    handleDominantSpeakerFocus(producer_id, consumer_id = null, timeout = 10000) {
        // Find the consumer id for this producer
        const consumerId = consumer_id ? consumer_id : this.getConsumerIdByProducerId(producer_id);

        console.log('handleDominantSpeakerFocus', { consumersList: this.consumers, consumerId, producer_id });

        if (!consumerId) return;

        // Track the currently focused video container
        if (!this._dominantSpeakerState) {
            this._dominantSpeakerState = { prevConsumerId: null, timeout: null };
        }

        // Remove focus mode from previous dominant speaker if any
        if (this._dominantSpeakerState.prevConsumerId && this._dominantSpeakerState.prevConsumerId !== consumerId) {
            const prevVideoContainer = this.getId(this._dominantSpeakerState.prevConsumerId + '__video');
            const prevFocusBtn = this.getId(this._dominantSpeakerState.prevConsumerId + '__hideALL');
            if (prevVideoContainer && prevVideoContainer.hasAttribute('focus-mode') && prevFocusBtn) {
                prevFocusBtn.click();
            }
        }

        // Set focus mode for the new dominant speaker
        const videoContainer = this.getId(consumerId + '__video');
        const focusBtn = this.getId(consumerId + '__hideALL');
        if (videoContainer && focusBtn && !videoContainer.hasAttribute('focus-mode')) {
            focusBtn.click();
        }

        // Update the state
        this._dominantSpeakerState.prevConsumerId = consumerId;

        // Clear any previous timeout
        if (this._dominantSpeakerState.timeout) {
            clearTimeout(this._dominantSpeakerState.timeout);
        }

        // Set a timeout to remove focus after 'timeout' seconds of inactivity
        this._dominantSpeakerState.timeout = setTimeout(() => {
            // Remove focus mode if still focused
            if (this._dominantSpeakerState.prevConsumerId) {
                const prevVideoContainer = this.getId(this._dominantSpeakerState.prevConsumerId + '__video');
                const prevFocusBtn = this.getId(this._dominantSpeakerState.prevConsumerId + '__hideALL');
                if (prevVideoContainer && prevVideoContainer.hasAttribute('focus-mode') && prevFocusBtn) {
                    prevFocusBtn.click();
                }
                this._dominantSpeakerState.prevConsumerId = null;
            }
        }, timeout); // 10 seconds
    }

    handleDominantSpeaker(data) {
        console.log('Dominant Speaker', data);
        const { peer_id, producer_id } = data;
        this.handleDominantSpeakerHighlight(peer_id);
        if (this.dominantSpeaker && switchDominantSpeakerFocus.checked) {
            this.handleDominantSpeakerFocus(producer_id);
        }
    }

    // ####################################################
    // HANDLE BAN
    // ###################################################

    handleGL(uid) {
        const words = uid.split('___');
        let peer_id = words[1] + '___pGeoLocation';
        let btnGl = this.getId(uid);
        if (btnGl) {
            btnGl.addEventListener('click', () => {
                (isPresenter || isCoHost)
                    ? this.askPeerGeoLocation(peer_id)
                    : this.userLog('warning', 'Only the presenter can ask geolocation to the participants', 'top-end');
            });
        }
    }

    // ####################################################
    // HANDLE BAN
    // ###################################################

    handleBAN(uid) {
        const words = uid.split('___');
        let peer_id = words[1] + '___pBan';
        let btnBan = this.getId(uid);
        if (btnBan) {
            btnBan.addEventListener('click', () => {
                (isPresenter || isCoHost)
                    ? this.peerAction('me', peer_id, 'ban')
                    : this.userLog('warning', 'Only the presenter can ban the participants', 'top-end');
            });
        }
    }

    // ####################################################
    // HANDLE KICK-OUT
    // ###################################################

    handleKO(uid) {
        const words = uid.split('___');
        let peer_id = words[1] + '___pEject';
        let btnKo = this.getId(uid);
        if (btnKo) {
            btnKo.addEventListener('click', () => {
                (isPresenter || isCoHost)
                    ? this.peerAction('me', peer_id, 'eject')
                    : this.userLog('warning', 'Only the presenter can eject the participants', 'top-end');
            });
        }
    }

    // ####################################################
    // HANDLE VIDEO
    // ###################################################

    toggleFocusMode(videoContainerId, btnHa = null) {
        if (isHideMeActive) {
            this.userLog('warning', 'To use this feature, please toggle Hide self view before', 'top-end', 6000);
            return;
        }
        const videoContainer = this.getId(videoContainerId);
        isHideALLVideosActive = !isHideALLVideosActive;
        if (btnHa) btnHa.style.color = isHideALLVideosActive ? 'lime' : 'white';
        if (isHideALLVideosActive) {
            videoContainer.style.width = '100%';
            videoContainer.style.height = '100%';
            videoContainer.setAttribute('focus-mode', 'true');
        } else {
            resizeVideoMedia();
            videoContainer.removeAttribute('focus-mode');
        }
        const children = this.videoMediaContainer.children;
        for (let child of children) {
            if (child.id != videoContainerId) {
                child.style.display = isHideALLVideosActive ? 'none' : 'block';
            }
        }
        if (this.isFollowMeActive && isPresenter) {
            const videoEl = videoContainer ? videoContainer.querySelector('video[name]') : null;
            const peerId = videoEl ? videoEl.getAttribute('name') : null;
            if (peerId) {
                this.emitFollowMe({ action: isHideALLVideosActive ? 'focus' : 'unfocus', peerId: peerId });
            }
        }
    }

    handleHA(uid, videoContainerId) {
        let btnHa = this.getId(uid);
        if (btnHa) {
            btnHa.addEventListener('click', (e) => {
                this.toggleFocusMode(videoContainerId, btnHa);
            });
        }
    }

    handleCM(uid) {
        const words = uid.split('___');
        let peer_id = words[1] + '___pVideo';
        let btnCm = this.getId(uid);
        if (btnCm) {
            btnCm.addEventListener('click', (e) => {
                if (e.target.className === html.videoOn) {
                    (isPresenter || isCoHost)
                        ? this.peerAction('me', peer_id, 'hide')
                        : this.userLog('warning', 'Only the presenter can hide the participants', 'top-end');
                } else {
                    (isPresenter || isCoHost)
                        ? this.peerAction('me', peer_id, 'unhide')
                        : this.userLog('warning', 'Only the presenter can unhide the participants', 'top-end');
                }
            });
        }
    }

    // ####################################################
    // HANDLE AUDIO
    // ###################################################

    handleAU(uid) {
        const words = uid.split('__');
        let peer_id = words[0] + '___pAudio';
        let btnAU = this.getId(uid);
        if (btnAU) {
            btnAU.addEventListener('click', (e) => {
                if (e.target.className === html.audioOn) {
                    (isPresenter || isCoHost)
                        ? this.peerAction('me', peer_id, 'mute')
                        : this.userLog('warning', 'Only the presenter can mute the participants', 'top-end');
                } else {
                    (isPresenter || isCoHost)
                        ? this.peerAction('me', peer_id, 'unmute')
                        : this.userLog('warning', 'Only the presenter can unmute the participants', 'top-end');
                }
            });
        }
    }

    // ####################################################
    // HANDLE COMMANDS
    // ####################################################

    emitCmd(cmd) {
        this.socket.emit('cmd', cmd);
    }

    handleCmd(cmd) {
        switch (cmd.type) {
            case 'privacy':
                this.setVideoPrivacyStatus(cmd.peer_id, cmd.active);
                break;
            case 'roomEmoji':
                this.handleRoomEmoji(cmd);
                break;
            case 'transcriptionAll':
                this.transcription.handleTranscriptionAll(cmd);
                break;
            case 'transcript':
                this.transcription.handleTranscript(cmd);
                break;
            case 'geoLocation':
                this.confirmPeerGeoLocation(cmd);
                break;
            case 'geoLocationOK':
                this.handleGeoPeerLocation(cmd);
                break;
            case 'geoLocationKO':
                this.sound('alert');
                this.userLog('warning', cmd.data, 'top-end', 5000);
                break;
            case 'ejectAll':
                this.handleEjectAllFromRoom(cmd);
                break;
            case 'peerAudio':
                this.handlePeerAudio(cmd);
                break;
            default:
                break;
            //...
        }
    }

    handleEjectAllFromRoom(cmd) {
        if (typeof preventExit !== 'undefined') preventExit = false;
        if (cmd.redirect) return openURL(cmd.redirect);
        // Detach disconnect / reconnect handlers BEFORE exiting.
        if (this.socket) {
            this.socket.off('disconnect');
            this.socket.off('connect_error');
            if (this.socket.io) {
                this.socket.io.off('reconnect_attempt');
                this.socket.io.off('reconnect');
                this.socket.io.off('reconnect_failed');
            }
        }
        if (typeof leaveRoom === 'function') {
            leaveRoom(false);
        } else {
            this.exit();
        }
    }

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
                this.sound('ok', force, path, ext);
                break;
            case ':-1:':
                this.sound('boo', force, path, ext);
                break;
            case ':clap:':
                this.sound('applause', force, path, ext);
                break;
            case ':smiley:':
            case ':grinning:':
                this.sound('smile', force, path, ext);
                break;
            case ':joy:':
                this.sound('laughs', force, path, ext);
                break;
            case ':tada:':
                this.sound('congrats', force, path, ext);
                break;
            case ':open_mouth:':
                this.sound('woah', force, path, ext);
                break;
            case ':trumpet:':
                this.sound('trombone', force, path, ext);
                break;
            case ':kissing_heart:':
                this.sound('kiss', force, path, ext);
                break;
            case ':heart:':
            case ':hearts:':
                this.sound('heart', force, path, ext);
                break;
            case ':rocket:':
                this.sound('rocket', force, path, ext);
                break;
            case ':sparkles:':
            case ':star:':
            case ':star2:':
            case ':dizzy:':
                this.sound('tinkerbell', force, path, ext);
                break;
            // ...
            default:
                break;
        }
    }

    // ####################################################
    // PEER ACTION
    // ####################################################

    async peerAction(from_peer_name, id, action, emit = true, broadcast = false, info = true, msg = '') {
        const words = id.split('___');
        const peer_id = words[0];

        if (emit) {
            // send...
            const data = {
                from_peer_name: this.peer_name,
                from_peer_id: this.peer_id,
                from_peer_uuid: this.peer_uuid,
                to_peer_uuid: '',
                peer_id: peer_id,
                action: action,
                message: '',
                broadcast: broadcast,
            };
            console.log('peerAction', data);

            if (!this.thereAreParticipants()) {
                if (info) return this.userLog('info', 'No participants detected', 'top-end');
            }
            if (!broadcast) {
                switch (action) {
                    case 'mute':
                        const audioMessage =
                            'The participant has been muted, and only they have the ability to unmute themselves';
                        if (isBroadcastingEnabled) {
                            const peerAudioButton = this.getId(data.peer_id + '___pAudio');
                            if (peerAudioButton) {
                                const peerAudioIcon = peerAudioButton.querySelector('i');
                                if (peerAudioIcon && peerAudioIcon.classList.contains('red')) {
                                    if (isRulesActive && isPresenter) {
                                        data.action = 'unmute';
                                        return this.confirmPeerAction(data.action, data);
                                    }
                                    return this.userLog('info', audioMessage, 'top-end');
                                }
                            }
                        } else {
                            const peerAudioStatus = this.getId(data.peer_id + '__audio');
                            if (!peerAudioStatus || peerAudioStatus.className == html.audioOff) {
                                if (isRulesActive && isPresenter) {
                                    data.action = 'unmute';
                                    return this.confirmPeerAction(data.action, data);
                                }
                                return this.userLog('info', audioMessage, 'top-end');
                            }
                        }
                        break;
                    case 'hide':
                        const videoMessage =
                            'The participant is currently hidden, and only they have the option to unhide themselves';
                        if (isBroadcastingEnabled) {
                            const peerVideoButton = this.getId(data.peer_id + '___pVideo');
                            if (peerVideoButton) {
                                const peerVideoIcon = peerVideoButton.querySelector('i');
                                if (peerVideoIcon && peerVideoIcon.classList.contains('red')) {
                                    if (isRulesActive && isPresenter) {
                                        data.action = 'unhide';
                                        return this.confirmPeerAction(data.action, data);
                                    }
                                    return this.userLog('info', videoMessage, 'top-end');
                                }
                            }
                        } else {
                            const peerVideoOff = this.getId(data.peer_id + '__videoOff');
                            if (peerVideoOff) {
                                if (isRulesActive && isPresenter) {
                                    data.action = 'unhide';
                                    return this.confirmPeerAction(data.action, data);
                                }
                                return this.userLog('info', videoMessage, 'top-end');
                            }
                        }
                    case 'stop':
                        const screenMessage =
                            'The participant screen is not shared, only the participant can initiate sharing';
                        const peerScreenButton = this.getId(id);
                        if (peerScreenButton) {
                            const peerScreenStatus = peerScreenButton.querySelector('i');
                            if (peerScreenStatus && peerScreenStatus.classList.contains('red')) {
                                if (isRulesActive && isPresenter) {
                                    data.action = 'start';
                                    return this.confirmPeerAction(data.action, data);
                                }
                                return this.userLog('info', screenMessage, 'top-end');
                            }
                        }
                        break;
                    case 'ban':
                        if (!isRulesActive || isPresenter) {
                            const peer_info = await getRemotePeerInfo(peer_id);
                            console.log('BAN PEER', peer_info);
                            if (peer_info) {
                                data.to_peer_uuid = peer_info.peer_uuid;
                                return this.confirmPeerAction(data.action, data);
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            this.confirmPeerAction(data.action, data);
        } else {
            // receive...
            const peerActionAllowed = peer_id === this.peer_id || broadcast;
            switch (action) {
                case 'ban':
                    if (peerActionAllowed) {
                        const message = `Will ban you from the room${
                            msg ? `<br><br><span class="red">Reason: ${msg}</span>` : ''
                        }`;
                        this.exit(true);
                        this.sound(action);
                        this.peerActionProgress(from_peer_name, message, 5000, action);
                    }
                    break;
                case 'eject':
                    if (peerActionAllowed) {
                        const message = `Will eject you from the room${
                            msg ? `<br><br><span class="red">Reason: ${msg}</span>` : ''
                        }`;
                        this.exit(true);
                        this.sound(action);
                        this.peerActionProgress(from_peer_name, message, 5000, action);
                    }
                    break;
                case 'mute':
                    if (peerActionAllowed) {
                        if (this.producerExist(mediaType.audio)) {
                            await this.pauseProducer(mediaType.audio);
                            this.updatePeerInfo(this.peer_name, this.peer_id, 'audio', false);
                            this.userLog(
                                'warning',
                                from_peer_name + '  ' + _PEER.audioOff + ' has closed yours audio',
                                'top-end',
                                10000
                            );
                        }
                    }
                    break;
                case 'unmute':
                    if (peerActionAllowed) {
                        this.peerMediaStartConfirm(
                            mediaType.audio,
                            image.unmute,
                            'Enable Microphone',
                            'Allow the presenter to enable your microphone?'
                        );
                    }
                    break;
                case 'hide':
                    if (peerActionAllowed) {
                        this.closeProducer(mediaType.video, 'moderator');
                        this.userLog(
                            'warning',
                            from_peer_name + '  ' + _PEER.videoOff + ' has closed yours video',
                            'top-end',
                            10000
                        );
                    }
                    break;
                case 'unhide':
                    if (peerActionAllowed) {
                        this.peerMediaStartConfirm(
                            mediaType.video,
                            image.unhide,
                            'Enable Camera',
                            'Allow the presenter to enable your camera?'
                        );
                    }
                    break;
                case 'stop':
                    if (this.isScreenShareSupported) {
                        if (peerActionAllowed) {
                            this.closeProducer(mediaType.screen, 'moderator');
                            this.userLog(
                                'warning',
                                from_peer_name + '  ' + _PEER.screenOff + ' has closed yours screen share',
                                'top-end',
                                10000
                            );
                        }
                    }
                    break;
                case 'start':
                    if (peerActionAllowed) {
                        this.peerMediaStartConfirm(
                            mediaType.screen,
                            image.start,
                            'Start Screen share',
                            'Allow the presenter to start your screen share?'
                        );
                    }
                    break;
                default:
                    break;
                //...
            }
        }
    }

    peerMediaStartConfirm(type, imageUrl, title, text) {
        sound('notify');
        Swal.fire({
            background: swalBackground,
            position: 'center',
            imageUrl: imageUrl,
            title: title,
            text: text,
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then(async (result) => {
            if (result.isConfirmed) {
                switch (type) {
                    case mediaType.audio:
                        if (this._duplicateSessionActive) return;
                        this.producerExist(mediaType.audio)
                            ? await this.resumeProducer(mediaType.audio)
                            : await this.produce(mediaType.audio, microphoneSelect.value);
                        this.updatePeerInfo(this.peer_name, this.peer_id, 'audio', true);
                        break;
                    case mediaType.video:
                        if (this._duplicateSessionActive) return;
                        await this.produce(mediaType.video, videoSelect.value);
                        break;
                    case mediaType.screen:
                        if (this._duplicateSessionActive) return;
                        await this.produce(mediaType.screen);
                        break;
                    default:
                        break;
                }
            }
        });
    }

    peerActionProgress(tt, msg, time, action = 'na') {
        Swal.fire({
            allowOutsideClick: false,
            background: swalBackground,
            icon: action == 'eject' ? 'warning' : 'success',
            title: tt,
            html: msg,
            timer: time,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
        }).then(() => {
            switch (action) {
                case 'refresh':
                    getRoomParticipants();
                    break;
                case 'ban':
                case 'eject':
                    this.exit();
                    break;
                default:
                    break;
            }
        });
    }

    confirmPeerAction(action, data) {
        console.log('Confirm peer action', action);
        switch (action) {
            case 'ban':
                let banConfirmed = false;
                Swal.fire({
                    background: swalBackground,
                    position: 'center',
                    imageUrl: image.forbidden,
                    title: 'Ban current participant',
                    input: 'text',
                    inputPlaceholder: 'Ban reason',
                    showDenyButton: true,
                    confirmButtonText: `Yes`,
                    denyButtonText: `No`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            banConfirmed = true;
                            const message = result.value;
                            if (message) data.message = message;
                            this.socket.emit('peerAction', data);
                            let peer = this.getId(data.peer_id);
                            if (peer) {
                                peer.parentNode.removeChild(peer);
                                participantsCount--;
                                refreshParticipantsCount(participantsCount);
                            }
                        }
                    })
                    .then(() => {
                        if (banConfirmed) this.peerActionProgress(action, 'In progress, wait...', 6000, 'refresh');
                    });
                break;
            case 'eject':
                let ejectConfirmed = false;
                let whoEject = data.broadcast ? 'All participants except yourself?' : 'current participant?';
                Swal.fire({
                    background: swalBackground,
                    position: 'center',
                    imageUrl: data.broadcast ? image.users : image.user,
                    title: 'Eject ' + whoEject,
                    input: 'text',
                    inputPlaceholder: 'Eject reason',
                    showDenyButton: true,
                    confirmButtonText: `Yes`,
                    denyButtonText: `No`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            ejectConfirmed = true;
                            const message = result.value;
                            if (message) data.message = message;
                            if (!data.broadcast) {
                                this.socket.emit('peerAction', data);
                                let peer = this.getId(data.peer_id);
                                if (peer) {
                                    peer.parentNode.removeChild(peer);
                                    participantsCount--;
                                    refreshParticipantsCount(participantsCount);
                                }
                            } else {
                                this.socket.emit('peerAction', data);
                                let actionButton = this.getId(action + 'AllButton');
                                if (actionButton) actionButton.style.display = 'none';
                                participantsCount = 1;
                                refreshParticipantsCount(participantsCount);
                            }
                        }
                    })
                    .then(() => {
                        if (ejectConfirmed) this.peerActionProgress(action, 'In progress, wait...', 6000, 'refresh');
                    });
                break;
            case 'mute':
            case 'unmute':
            case 'hide':
            case 'unhide':
            case 'stop':
            case 'start':
                let muteHideStopConfirmed = false;
                let who = data.broadcast ? 'everyone except yourself?' : 'current participant?';
                let imageUrl, title, text;
                switch (action) {
                    case 'mute':
                        imageUrl = image.mute;
                        title = 'Mute ' + who;
                        text =
                            'Once muted, only the presenter will be able to unmute participants, but participants can unmute themselves at any time';
                        break;
                    case 'unmute':
                        imageUrl = image.unmute;
                        title = 'Unmute ' + who;
                        text = 'A pop-up message will appear to prompt and allow this action.';
                        break;
                    case 'hide':
                        title = 'Hide ' + who;
                        imageUrl = image.hide;
                        text =
                            'Once hidden, only the presenter will be able to unhide participants, but participants can unhide themselves at any time';
                        break;
                    case 'unhide':
                        title = 'Unhide ' + who;
                        imageUrl = image.unhide;
                        text = 'A pop-up message will appear to prompt and allow this action.';
                        break;
                    case 'stop':
                        imageUrl = image.stop;
                        title = 'Stop screen share to the ' + who;
                        text =
                            "Once stopped, only the presenter will be able to start the participants' screens, but participants can start their screens themselves at any time";
                        break;
                    case 'start':
                        imageUrl = image.start;
                        title = 'Start screen share to the ' + who;
                        text = 'A pop-up message will appear to prompt and allow this action.';
                        break;
                    default:
                        break;
                }
                Swal.fire({
                    background: swalBackground,
                    position: 'center',
                    imageUrl: imageUrl,
                    title: title,
                    text: text,
                    showDenyButton: true,
                    confirmButtonText: `Yes`,
                    denyButtonText: `No`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            muteHideStopConfirmed = true;
                            if (!data.broadcast) {
                                switch (action) {
                                    case 'mute':
                                        let peerAudioButton = this.getId(data.peer_id + '___pAudio');
                                        if (peerAudioButton) peerAudioButton.innerHTML = _PEER.audioOff;
                                        break;
                                    case 'hide':
                                        let peerVideoButton = this.getId(data.peer_id + '___pVideo');
                                        if (peerVideoButton) peerVideoButton.innerHTML = _PEER.videoOff;
                                        break;
                                    case 'stop':
                                        let peerScreenButton = this.getId(data.peer_id + '___pScreen');
                                        if (peerScreenButton) peerScreenButton.innerHTML = _PEER.screenOff;
                                        break;
                                    default:
                                        break;
                                }
                                this.socket.emit('peerAction', data);
                            } else {
                                this.socket.emit('peerAction', data);
                                let actionButton = this.getId(action + 'AllButton');
                                if (actionButton) actionButton.style.display = 'none';
                            }
                        }
                    })
                    .then(() => {
                        if (muteHideStopConfirmed)
                            this.peerActionProgress(action, 'In progress, wait...', 2000, 'refresh');
                    });
                break;
            default:
                break;
            //...
        }
    }

    toggleCoHost(peerId) {
        return this.moderatorManager.toggleCoHost(peerId);
    }

    peerGuestNotAllowed(action) {
        return this.moderatorManager.peerGuestNotAllowed(action);
    }

    // ####################################################
    // SEARCH PEER FILTER
    // ####################################################

    searchPeer() {
        return this.moderatorManager.searchPeer();
    }

    // ####################################################
    // FILTER PEER WITH RAISE HAND
    // ####################################################

    toggleRaiseHands() {
        return this.moderatorManager.toggleRaiseHands();
    }

    // ####################################################
    // FILTER PEER WITH UNREAD MESSAGES
    // ####################################################

    toggleUnreadMsg() {
        return this.moderatorManager.toggleUnreadMsg();
    }

    // ####################################################
    // SHOW PEER ABOUT AND MESSAGES
    // ####################################################

    showPeerAboutAndMessages(peer_id, peer_name, peer_avatar = false, event = null) {
        // Early moderator guards: refuse to switch (and to mutate any state) when the
        // requested chat is currently blocked by the moderator.
        if (peer_id === 'ChatGPT' && this.moderatorManager.getModerator().chat_cant_chatgpt) {
            return userLog('warning', 'The moderator does not allow you to chat with ChatGPT', 'top-end', 6000);
        }
        if (peer_id === 'DeepSeek' && this.moderatorManager.getModerator().chat_cant_deep_seek) {
            return userLog('warning', 'The moderator does not allow you to chat with DeepSeek', 'top-end', 6000);
        }
        if (peer_id === 'all' && this.moderatorManager.getModerator().chat_cant_publicly) {
            return userLog('warning', 'The moderator does not allow you to chat publicly', 'top-end', 6000);
        }
        if (!['all', 'ChatGPT', 'DeepSeek'].includes(peer_id) && this.moderatorManager.getModerator().chat_cant_privately) {
            return userLog('warning', 'The moderator does not allow you to chat privately', 'top-end', 6000);
        }

        this.hidePeerMessages();

        this.chatPeerId = peer_id;
        this.chatPeerName = peer_name;
        this.chatPeerAvatar = peer_avatar;

        const chatAbout = this.getId('chatAbout');
        let participant = this.getId(peer_id);
        if (!participant) {
            peer_id = 'all';
            this.chatPeerId = peer_id;
            this.chatPeerName = 'All';
            participant = this.getId(peer_id);
        }
        const participantsList = this.getId('participantsList');
        const chatPrivateMessages = this.getId('chatPrivateMessages');
        const messagePrivateListItems = chatPrivateMessages.getElementsByTagName('li');
        const participantsListItems = participantsList.getElementsByTagName('li');
        const avatarImg = getParticipantAvatar(peer_name, peer_avatar);

        const generateChatAboutHTML = (imgSrc, title, status = 'online', participants = '', category = '') => {
            const isSensitiveChat = !['all', 'ChatGPT', 'DeepSeek'].includes(peer_id) && title.length > 15;
            const truncatedTitle = isSensitiveChat ? `${title.substring(0, 10)}*****` : title;
            const categoryHTML = category ? `<span class="chat-header-category">${category}</span>` : '';
            const statusText =
                category === 'AI ASSISTANT'
                    ? 'Assistant replies are visible only to you'
                    : peer_id === 'all'
                      ? `Everyone in room ${participants}`
                      : `${status}`;
            return `
                <a data-toggle="modal" data-target="#view_info">
                    <img src="${imgSrc}" alt="avatar" />
                </a>
                <div class="chat-about">
                    ${categoryHTML}
                    <h6 class="mb-0">${truncatedTitle}</h6>
                    <span class="status">
                        ${icons.statusCircle(status)} ${statusText}
                    </span>
                </div>
            `;
        };

        // CURRENT SELECTED PEER
        for (let i = 0; i < participantsListItems.length; i++) {
            participantsListItems[i].classList.remove('active');
        }

        // Clear pulsate and unread indicators for selected peer
        const selectedLi = this.getId(peer_id);
        if (selectedLi) selectedLi.classList.remove('pulsate');

        if (!['all', 'ChatGPT', 'DeepSeek'].includes(peer_id)) {
            // unread-count badge cleared by updateUnreadCountBadge below
        }

        // Clear unread count badge for selected peer
        this.unreadMessageCounts[peer_id] = 0;
        this.updateUnreadCountBadge(peer_id);

        if (participant) participant.classList.add('active');

        isChatGPTOn = false;
        isDeepSeekOn = false;

        console.log('Display messages', peer_id);

        switch (peer_id) {
            case 'ChatGPT':
                if (this._moderator.chat_cant_chatgpt) {
                    return userLog('warning', 'The moderator does not allow you to chat with ChatGPT', 'top-end', 6000);
                }
                isChatGPTOn = true;
                chatAbout.innerHTML = generateChatAboutHTML(image.chatgpt, 'ChatGPT', 'online', '', 'AI ASSISTANT');
                this.getId('chatGPTMessages').style.display = 'block';
                break;
            case 'DeepSeek':
                if (this._moderator.chat_cant_deep_seek) {
                    return userLog(
                        'warning',
                        'The moderator does not allow you to chat with DeepSeek',
                        'top-end',
                        6000
                    );
                }
                isDeepSeekOn = true;
                chatAbout.innerHTML = generateChatAboutHTML(image.deepSeek, 'DeepSeek', 'online', '', 'AI ASSISTANT');
                this.getId('deepSeekMessages').style.display = 'block';
                break;
            case 'all':
                if (this._moderator.chat_cant_publicly) {
                    return userLog('warning', 'The moderator does not allow you to chat publicly', 'top-end', 6000);
                }
                chatAbout.innerHTML = generateChatAboutHTML(image.all, 'Public chat', 'online', participantsCount);
                this.getId('chatPublicMessages').style.display = 'block';
                break;
            default:
                if (this._moderator.chat_cant_privately) {
                    return userLog('warning', 'The moderator does not allow you to chat privately', 'top-end', 6000);
                }
                chatAbout.innerHTML = generateChatAboutHTML(avatarImg, peer_name);
                chatPrivateMessages.style.display = 'block';
                for (let i = 0; i < messagePrivateListItems.length; i++) {
                    const li = messagePrivateListItems[i];
                    const itemFromId = li.getAttribute('data-from-id');
                    const itemToId = li.getAttribute('data-to-id');
                    const shouldDisplay =
                        (itemFromId && itemFromId.includes(peer_id)) || (itemToId && itemToId.includes(peer_id));
                    li.style.display = shouldDisplay ? '' : 'none';
                }
                break;
        }

        // Update placeholder, and empty notice
        const displayName = peer_id === 'all' ? 'Public chat' : peer_name;

        const chatMsg = this.getId('chatMessage');
        if (chatMsg) {
            const isAI = ['ChatGPT', 'DeepSeek'].includes(peer_id);
            chatMsg.placeholder = isAI ? `Ask ${peer_name} anything...` : `Type a message...`;
        }

        const emptyTitle = document.querySelector('.empty-chat-title');
        if (emptyTitle) emptyTitle.textContent = `Start with ${displayName}`;

        const clickedElement = event ? event.target : null;
        if (!event || (clickedElement.tagName != 'BUTTON' && clickedElement.tagName != 'I')) {
            if ((this.isMobileDevice || this.isChatPinned) && (!plist || !plist.classList.contains('hidden'))) {
                this.toggleShowParticipants();
            }
        }
    }

    hidePeerMessages() {
        elemDisplay('chatGPTMessages', false);
        elemDisplay('deepSeekMessages', false);
        elemDisplay('chatPublicMessages', false);
        elemDisplay('chatPrivateMessages', false);
    }

    // ####################################################
    // UPDATE ROOM MODERATOR
    // ####################################################

    updateRoomModerator(data) {
        return this.moderatorManager.updateRoomModerator(data);
    }

    updateRoomModeratorALL(data) {
        return this.moderatorManager.updateRoomModeratorALL(data);
    }

    getModeratorData(data) {
        return this.moderatorManager.getModeratorData(data);
    }

    handleUpdateRoomModerator(data) {
        return this.moderatorManager.handleUpdateRoomModerator(data);
    }

    handleUpdateRoomModeratorALL(data) {
        return this.moderatorManager.handleUpdateRoomModeratorALL(data);
    }

    getModerator() {
        return this.moderatorManager.getModerator();
    }



    // ####################################################
    // UPDATE PEER INFO
    // ####################################################

    updatePeerInfo(peer_name, peer_id, type, status, emit = true, presenter = false) {
        if (emit) {
            switch (type) {
                case 'audio':
                    this.setIsAudio(peer_id, status);
                    break;
                case 'video':
                    this.setIsVideo(status);
                    break;
                case 'screen':
                    this.setIsScreen(status);
                    break;
                case 'hand':
                    this.peer_info.peer_hand = status;
                    const peer_hand = this.getPeerHandBtn(peer_id);
                    if (status) {
                        if (peer_hand) peer_hand.style.display = 'flex';
                        this.event(_EVENTS.raiseHand);
                        this.sound('raiseHand');
                    } else {
                        if (peer_hand) peer_hand.style.display = 'none';
                        this.event(_EVENTS.lowerHand);
                    }
                    break;
                case 'avatar':
                    this.peer_avatar = status;
                    this.peer_info.peer_avatar = status;
                    this.setVideoAvatarImgName(peer_id + '__img', peer_name, status);
                    break;
                default:
                    break;
            }
            const data = {
                room_id: this.room_id,
                peer_name: peer_name,
                peer_id: peer_id,
                type: type,
                status: status,
                broadcast: true,
            };
            this.socket.emit('updatePeerInfo', data);
        } else {
            const canUpdateMediaStatus = !isBroadcastingEnabled || (isBroadcastingEnabled && presenter);
            switch (type) {
                case 'audio':
                    if (canUpdateMediaStatus) this.setPeerAudio(peer_id, status);
                    break;
                case 'video':
                    break;
                case 'screen':
                    break;
                case 'hand':
                    const peer_hand = this.getPeerHandBtn(peer_id);
                    if (status) {
                        if (peer_hand) peer_hand.style.display = 'flex';
                        this.userLog(
                            'warning',
                            peer_name + '  ' + _PEER.raiseHand + ' has raised the hand',
                            'top-end',
                            10000
                        );
                        this.sound('raiseHand');
                    } else {
                        if (peer_hand) peer_hand.style.display = 'none';
                    }
                    break;
                case 'avatar':
                    this.setVideoAvatarImgName(peer_id + '__img', peer_name, status);
                    break;
                default:
                    break;
            }
        }
        if (isParticipantsListOpen) getRoomParticipants();
    }

    checkPeerInfoStatus(peer_info) {
        let peer_id = peer_info.peer_id;
        let peer_hand_status = peer_info.peer_hand;
        if (peer_hand_status) {
            let peer_hand = this.getPeerHandBtn(peer_id);
            if (peer_hand) peer_hand.style.display = 'flex';
        }
        //...
    }

    popupPeerInfo(id, peer_info) {
        if (this.showPeerInfo && !this.isMobileDevice) {
            // Format the peer info into a structured string
            const peerInfoFormatted = this.getPeerUiInfos();

            // Apply the improved Tippy.js tooltip
            this.setTippy(
                id,
                `<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5;">${peerInfoFormatted}</div>`,
                'top-start',
                true
            );
        }
    }

    getPeerUiInfos() {
        // console.log('PEER_INFO', peer_info);
        const {
            join_data_time,
            peer_name,
            peer_presenter,
            is_desktop_device,
            is_mobile_device,
            is_tablet_device,
            is_ipad_pro_device,
            os_name,
            os_version,
            browser_name,
            browser_version,
        } = peer_info;

        const emojiPeerInfo = [
            { label: 'Join Time', value: join_data_time, emoji: '⏰' },
            { label: 'Name', value: peer_name, emoji: '👤' },
            { label: 'Presenter', value: peer_presenter ? 'Yes' : 'No', emoji: peer_presenter ? '⭐' : '🎤' },
            { label: 'Desktop Device', value: is_desktop_device ? 'Yes' : 'No', emoji: '💻' },
            { label: 'Mobile Device', value: is_mobile_device ? 'Yes' : 'No', emoji: '📱' },
            { label: 'Tablet Device', value: is_tablet_device ? 'Yes' : 'No', emoji: '📲' },
            { label: 'iPad Pro', value: is_ipad_pro_device ? 'Yes' : 'No', emoji: '📱' },
            { label: 'OS', value: `${os_name} ${os_version}`, emoji: '🖥️' },
            { label: 'Browser', value: `${browser_name} ${browser_version}`, emoji: '🌐' },
        ];

        // Format the peer info into a structured string
        return emojiPeerInfo.map((item) => `${item.emoji} <b>${item.label}:</b> ${item.value}`).join('<br/>');
    }



    // ##############################################
    // LiveAvatar Video AI
    // ##############################################

    getAvatarList() {
        this.socket
            .request('getAvatarList')
            .then(function (completion) {
                const avatarVideoAIPreview = document.getElementById('avatarVideoAIPreview');
                const avatarVideoAISpinner = document.getElementById('avatarVideoAISpinner');
                const avatarVideoAIcontainer = document.getElementById('avatarVideoAIcontainer');
                const avatarVideoAICount = document.getElementById('avatarVideoAICount');
                const avatarVideoAISelectedName = document.getElementById('avatarVideoAISelectedName');
                const avatarSearchInput = document.getElementById('avatarSearchInput');
                avatarVideoAIcontainer.innerHTML = '';

                const avatars = completion?.response?.avatars || [];
                let firstPreviewSet = false;

                avatarVideoAICount.innerText = `Avatars: ${avatars.length}`;

                function selectAvatar(avatar, card) {
                    document.querySelectorAll('.avatarCard').forEach((c) => c.classList.remove('selected'));
                    card.classList.add('selected');
                    VideoAI.avatarId = avatar.avatar_id;
                    VideoAI.avatarName = avatar.avatar_name;
                    avatarVideoAIPreview.src = avatar.preview_image_url;
                    avatarVideoAIPreview.alt = avatar.avatar_name;
                    avatarVideoAIPreview.onload = () => {
                        if (avatarVideoAISpinner) avatarVideoAISpinner.style.display = 'none';
                        avatarVideoAIPreview.classList.remove('hidden');
                    };
                    avatarVideoAISelectedName.textContent = avatar.avatar_name;
                    console.log('Avatar image click event', { avatar });
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

                // Search/filter avatars by name
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
            })
            .catch((err) => {
                console.error('Video AI getAvatarList error:', err);
                this.userLog('warning', 'Video AI getAvatarList error:\n' + err, 'top-end', 6000);
                this.getId('tabVideoAI').style.display = 'none';
                this.getId('tabVideoAIBtn').style.display = 'none';
                this.getId('tabRoomBtn').click();
            });
    }

    getVoiceList() {
        this.socket
            .request('getVoiceList')
            .then((completion) => {
                const voiceList = completion?.response?.voices || [];
                if (!voiceList.length) {
                    console.warn('No voices available in the response');
                    return;
                }

                const selectElement = document.getElementById('avatarVoiceIDs');
                selectElement.innerHTML = '<option value="">Select Avatar Voice</option>'; // Reset options with default

                // Sort the list alphabetically by language
                const sortedList = voiceList.sort((a, b) => (a.language ?? '').localeCompare(b.language ?? ''));

                // Populate the select element with options
                sortedList.forEach((voice) => {
                    const { voice_id, language, name, gender } = voice;
                    const option = document.createElement('option');
                    option.value = voice_id;
                    option.textContent = `${language ? language + ', ' : ''}${name || 'Unnamed'} (${gender || 'N/A'})`;
                    selectElement.appendChild(option);
                });

                const voicePreviewPlayer = document.getElementById('avatarVoicePreview');

                // Event listener for changes on the select element
                selectElement.addEventListener('change', async (event) => {
                    VideoAI.avatarVoice = event.target.value || null;

                    // Fetch and play real voice preview from LiveAvatar API
                    if (voicePreviewPlayer && event.target.value) {
                        try {
                            voicePreviewPlayer.pause();
                            voicePreviewPlayer.src = '';
                            const result = await this.socket.request('previewVoice', {
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

                    if (VideoAI.active && VideoAI.avatarVoice) {
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
        if (!VideoAI.avatarId) {
            return this.userLog('warning', 'Please select an avatar before starting', 'top-end', 6000);
        }

        const vb = document.createElement('div');
        vb.setAttribute('id', 'avatar__vb');
        vb.className = 'videoAvatarMenuBar fadein';

        const interrupt = this.createButton('avatar__interrupt', html.stop);
        const fs = this.createButton('avatar__fs', html.fullScreen);
        const pin = this.createButton('avatar__pin', html.pin);
        const mic = this.createButton('avatar__mic', html.audioOn);
        const ss = this.createButton('avatar__stopSession', html.kickOut);

        // Mute avatar audio (local only) toggle button
        const muteAvatarAudioBtn = this.createButton('avatar__muteAvatarAudio', html.volume);

        // Share-to-room toggle button
        const shareBtn = this.createButton('avatar__shareToRoom', html.share);

        // ChatGPT interaction toggle button (only when ChatGPT is enabled)
        let chatGPTToggleBtn = null;
        if (this.chatGPTEnabled) {
            chatGPTToggleBtn = this.createButton('avatar__chatGPTToggle', html.robot);
            setColor(chatGPTToggleBtn, VideoAI.useChatGPT ? 'lime' : '');
        }

        const avatarName = document.createElement('div');
        const an = document.createElement('span');
        an.id = 'avatar__name';
        an.className = html.userName;
        an.innerText = VideoAI.avatarName;

        // Create video container element
        this.videoAIContainer = document.createElement('div');
        this.videoAIContainer.className = 'Camera';
        this.videoAIContainer.id = 'videoAIContainer';

        // Create video element for avatar
        this.videoAIElement = document.createElement('video');
        this.videoAIElement.id = 'videoAIElement';
        this.videoAIElement.setAttribute('playsinline', true);
        this.videoAIElement.autoplay = true;
        this.videoAIElement.muted = false;
        this.videoAIElement.volume = 1;
        this.videoAIElement.className = '';
        this.videoAIElement.style.objectFit = 'cover';

        const videoAILoader = this.createVideoLoader('videoAILoader');

        // Session time limit countdown
        const sessionTimerSpan = document.createElement('span');
        sessionTimerSpan.id = 'avatar__sessionTimer';
        sessionTimerSpan.className = 'avatar-session-timer notranslate';
        sessionTimerSpan.style.display = 'none';

        // Append elements to video container
        vb.appendChild(ss);
        this.isVideoFullScreenSupported && vb.appendChild(fs);
        vb.appendChild(muteAvatarAudioBtn);
        vb.appendChild(interrupt);
        speechRecognition && vb.appendChild(mic);
        vb.appendChild(shareBtn);
        chatGPTToggleBtn && vb.appendChild(chatGPTToggleBtn);
        !this.isMobileDevice && vb.appendChild(pin);
        vb.appendChild(sessionTimerSpan);
        avatarName.appendChild(an);

        this.videoAIContainer.appendChild(this.videoAIElement);
        this.videoAIContainer.appendChild(videoAILoader);
        this.videoAIContainer.appendChild(vb);
        this.videoAIContainer.appendChild(avatarName);
        this.videoMediaContainer.appendChild(this.videoAIContainer);

        this.isVideoFullScreenSupported && this.handleFS(this.videoAIElement.id, fs.id);
        this.handlePN(this.videoAIElement.id, pin.id, this.videoAIContainer.id, true, true);

        muteAvatarAudioBtn.onclick = () => {
            VideoAI.muteAvatarAudio = !VideoAI.muteAvatarAudio;
            setColor(muteAvatarAudioBtn, VideoAI.muteAvatarAudio ? 'lime' : '');
            console.log('Video AI muteAvatarAudio:', VideoAI.muteAvatarAudio);
            if (this.videoAIElement) {
                this.videoAIElement.muted = VideoAI.muteAvatarAudio;
            }
        };

        interrupt.onclick = () => {
            this.streamingInterrupt();
        };

        mic.onclick = () => {
            if (!speechRecognition) {
                return this.userLog('warning', 'Speech recognition is not supported in this browser', 'top-end', 6000);
            }
            if (this.videoAIRecording) {
                this.videoAIRecognitionPersistent = false;
                if (this.videoAISpeechRecognition) {
                    this.videoAISpeechRecognition.stop();
                }
            } else {
                this.startVideoAISpeechRecognition(mic);
            }
        };

        ss.onclick = () => {
            this.stopSession();
        };

        shareBtn.onclick = async () => {
            if (!VideoAI.shareToRoom) {
                const result = await Swal.fire({
                    background: swalBackground,
                    position: 'top',
                    title: 'Share Avatar to Room?',
                    text: 'Are you sure you want to share the avatar video and audio with all participants?',
                    showDenyButton: true,
                    confirmButtonText: 'Yes',
                    denyButtonText: 'No',
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                if (!result.isConfirmed) return;
            }

            VideoAI.shareToRoom = !VideoAI.shareToRoom;
            setColor(shareBtn, VideoAI.shareToRoom ? 'lime' : '');
            console.log('Video AI shareToRoom:', VideoAI.shareToRoom);

            if (VideoAI.shareToRoom) {
                // Start sharing: produce current tracks from the live mediaStream
                if (this.videoAIElement.srcObject) {
                    const tracks = [
                        ...this.videoAIElement.srcObject.getVideoTracks(),
                        ...this.videoAIElement.srcObject.getAudioTracks(),
                    ];
                    for (const rawTrack of tracks) {
                        await this.publishAvatarTrack(rawTrack);
                    }
                }
            } else {
                // Stop sharing: close avatar producers (host keeps seeing/hearing locally)
                this.stopAvatarProducers();
            }
        };

        if (chatGPTToggleBtn) {
            chatGPTToggleBtn.onclick = () => {
                VideoAI.useChatGPT = !VideoAI.useChatGPT;
                setColor(chatGPTToggleBtn, VideoAI.useChatGPT ? 'lime' : '');
                console.log('Video AI useChatGPT:', VideoAI.useChatGPT);
            };
        }

        if (!this.isMobileDevice) {
            this.setTippy(pin.id, 'Toggle Pin', 'bottom');
            this.setTippy(muteAvatarAudioBtn.id, 'Mute avatar audio (local only)', 'bottom');
            this.setTippy(interrupt.id, 'Interrupt avatar speaking', 'bottom');
            this.setTippy(mic.id, 'Speech to avatar', 'bottom');
            this.setTippy(shareBtn.id, 'Share avatar to room', 'bottom');
            chatGPTToggleBtn && this.setTippy(chatGPTToggleBtn.id, 'Toggle ChatGPT interaction', 'bottom');
            this.setTippy(fs.id, 'Toggle full screen', 'bottom');
            this.setTippy(ss.id, 'Stop VideoAI session', 'bottom');
        }

        handleAspectRatio();

        this.setVideoAIControlsDisabled(true);

        await this.createLiveAvatarSession();
    }

    async createLiveAvatarSession() {
        try {
            const { quality, avatarId, avatarVoice } = VideoAI;

            // Step 1: Create session token
            const tokenResponse = await this.socket.request('createSessionToken', {
                quality: quality,
                avatar_id: avatarId,
                voice_id: avatarVoice,
            });

            if (!tokenResponse || Object.keys(tokenResponse).length === 0 || tokenResponse.error) {
                const errMsg =
                    tokenResponse?.error?.message || tokenResponse?.error || 'Error creating the avatar session';
                this.userLog('warning', errMsg, 'top-end');
                this.stopSession();
                return;
            }

            if (tokenResponse.response.code !== 1000) {
                this.userLog('warning', tokenResponse.response.message, 'top-end');
                this.stopSession();
                return;
            }

            const { session_id, session_token } = tokenResponse.response.data;
            VideoAI.info = { session_id };
            VideoAI.sessionToken = session_token;

            console.log('Video AI createSessionToken', VideoAI);

            // Step 2: Start session to get LiveKit credentials
            const startResponse = await this.socket.request('startSession', {
                session_token: session_token,
            });

            if (!startResponse || startResponse.error) {
                const errMsg =
                    startResponse?.error?.message || startResponse?.error || 'Error starting the avatar session';
                this.userLog('warning', errMsg, 'top-end');
                this.stopSession();
                return;
            }

            const { livekit_url, livekit_client_token } = startResponse.response;

            console.log('Video AI startSession', { livekit_url, session_id });

            // Step 3: Connect to LiveKit room
            await this.connectToLiveKit(livekit_url, livekit_client_token);
        } catch (error) {
            const errMsg =
                typeof error === 'string' ? error : error?.response?.data?.message || error?.message || 'Unknown error';
            if (errMsg.toLowerCase().includes('insufficient credits') || errMsg === 'quota not enough') {
                this.msgPopup(
                    'warning',
                    'Insufficient AI Avatar credits. Please check your LiveAvatar subscription.',
                    6000,
                    'top'
                );
            } else {
                this.userLog('error', errMsg, 'top-end');
            }
            console.error('Video AI createLiveAvatarSession error:', errMsg);
            this.stopSession();
        }
    }

    async connectToLiveKit(livekitUrl, livekitToken) {
        const { Room, RoomEvent } = LivekitClient;

        const room = new Room();

        // Collect tracks into a single MediaStream for the video element
        const mediaStream = new MediaStream();
        const deferredAudioTracks = new Map();

        const attachLiveKitTrack = async (kind, mediaStreamTrack) => {
            const existing = kind === 'video' ? mediaStream.getVideoTracks() : mediaStream.getAudioTracks();
            existing.forEach((t) => mediaStream.removeTrack(t));

            mediaStream.addTrack(mediaStreamTrack);

            this.videoAIElement.srcObject = mediaStream;
            this.videoAIElement.play().catch((error) => {
                console.warn('Video AI playback blocked:', error?.message || error);
            });

            // Keep avatar audio on the selected output device when speaker changes.
            if (sinkId && speakerSelect?.value) {
                await this.changeAudioDestination(this.videoAIElement, false);
            }

            if (kind === 'video') {
                this.hideVideoLoaderOnPlay(this.videoAIElement);
            }

            // Re-publish the avatar track into mediasoup so all participants see/hear it
            if (VideoAI.shareToRoom) {
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
                if (!VideoAI.mediaParticipantIdentity) {
                    VideoAI.mediaParticipantIdentity = participantIdentity;
                    console.log('Video AI selected media participant:', VideoAI.mediaParticipantIdentity);

                    const deferredAudioTrack = deferredAudioTracks.get(VideoAI.mediaParticipantIdentity);
                    if (deferredAudioTrack) {
                        console.log(
                            'Video AI attaching deferred audio track for selected participant:',
                            VideoAI.mediaParticipantIdentity
                        );
                        await attachLiveKitTrack('audio', deferredAudioTrack);
                        deferredAudioTracks.delete(VideoAI.mediaParticipantIdentity);
                    }
                } else if (participantIdentity !== VideoAI.mediaParticipantIdentity) {
                    console.log('Video AI ignoring video track from non-selected participant:', participantIdentity);
                    return;
                }
            }

            if (track.kind === 'audio') {
                if (!VideoAI.mediaParticipantIdentity) {
                    deferredAudioTracks.set(participantIdentity, mediaStreamTrack);
                    console.log(
                        'Video AI deferring audio track until video participant is selected:',
                        participantIdentity
                    );
                    return;
                }
                if (participantIdentity !== VideoAI.mediaParticipantIdentity) {
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

        VideoAI.livekitRoom = room;
        VideoAI.active = true;

        this.startRendering();

        this.isMobileDevice ? this.handleMobileVideoAiChat() : this.handleDesktopVideoAiChat();

        this.startVideoAISessionTimer();

        this.userLog('info', 'Video AI streaming started', 'top-end');
    }

    handleLiveAvatarEvent(event) {
        console.log('Video AI LiveAvatar event:', event);
        switch (event.event_type) {
            case 'avatar.speak_started':
                console.log('Video AI: Avatar started speaking');
                break;
            case 'avatar.speak_ended':
                console.log('Video AI: Avatar finished speaking');
                break;
            case 'user.transcription':
                console.log('Video AI: User said:', event.text);
                break;
            case 'avatar.transcription':
                console.log('Video AI: Avatar said:', event.text);
                break;
            case 'session.stopped':
                console.log('Video AI: Session stopped:', event.end_reason);
                this.stopSession();
                break;
            default:
                break;
        }
    }

    handleDesktopVideoAiChat() {
        if (!this.isChatOpen) {
            this.toggleChat();
        }
        this.sendMessageToVideoAi();
    }

    handleMobileVideoAiChat() {
        if (this.videoMediaContainer.childElementCount <= 2) {
            isHideMeActive = !isHideMeActive;
            this.handleHideMe();
        }
    }

    sendMessageToVideoAi() {
        const tasks = [
            { delay: 1000, action: () => this.chatPin() },
            { delay: 1200, action: () => this.toggleShowParticipants() },
            { delay: 1400, action: () => this.showPeerAboutAndMessages('ChatGPT', 'ChatGPT') },
            { delay: 1600, action: () => this.streamingTask(`Welcome to ${BRAND.app.name}!`) },
            {
                delay: 2000,
                action: () => {
                    if (this.chatGPTEnabled && VideoAI.useChatGPT) {
                        chatMessage.value = 'Hello!';
                        this.sendMessage();
                    } else {
                        const hint = `I'm your AI Avatar. Type a message or use the microphone, and I will speak it for you.`;
                        this.setMsgAvatar('right', 'Avatar');
                        this.appendMessage('right', image.chatgpt, 'Avatar', this.peer_id, hint, 'VideoAI', 'Avatar');
                        this.streamingTask(hint);
                    }
                },
            },
        ];
        this.executeTasksSequentially(tasks);
    }

    executeTasksSequentially(tasks) {
        tasks.reduce((promise, task) => {
            return promise.then(
                () =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            task.action();
                            resolve();
                        }, task.delay);
                    })
            );
        }, Promise.resolve());
    }

    startVideoAISpeechRecognition(micBtn) {
        const SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechAPI) {
            return this.userLog('warning', 'Speech recognition is not supported in this browser', 'top-end', 6000);
        }

        this.videoAIRecognitionPersistent = true;

        this.videoAISpeechRecognition = new SpeechAPI();
        this.videoAISpeechRecognition.lang = typeof currentLangCode !== 'undefined' ? currentLangCode : 'en-US';
        this.videoAISpeechRecognition.continuous = false;
        this.videoAISpeechRecognition.interimResults = false;
        this.videoAISpeechRecognition.maxAlternatives = 1;

        this.videoAISpeechRecognition.onstart = () => {
            this.videoAIRecording = true;
            setColor(micBtn, 'lime');
            console.log('Video AI speech recognition started');
        };

        this.videoAISpeechRecognition.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            if (transcript) {
                console.log('Video AI speech recognized:', transcript);
                if (!isChatGPTOn) {
                    if (!this.isChatOpen) this.toggleChat();
                    this.showPeerAboutAndMessages('ChatGPT', 'ChatGPT');
                }
                chatMessage.value = transcript;
                this.sendMessage();
            }
        };

        this.videoAISpeechRecognition.onerror = (event) => {
            console.error('Video AI speech recognition error:', event.error);
            if (event.error !== 'no-speech') {
                this.userLog('warning', `Speech recognition error: ${event.error}`, 'top-end', 6000);
            }
        };

        this.videoAISpeechRecognition.onend = () => {
            // Prevent stopping in the absence of speech...
            if (this.videoAIRecognitionPersistent && VideoAI.active) {
                this.videoAIRecording = false;
                setTimeout(() => {
                    if (this.videoAIRecognitionPersistent && VideoAI.active && !this.videoAIRecording) {
                        this.startVideoAISpeechRecognition(micBtn);
                    }
                }, 2000);
            } else {
                this.videoAIRecording = false;
                setColor(micBtn, 'white');
                console.log('Video AI speech recognition stopped');
            }
        };

        try {
            this.videoAISpeechRecognition.start();
        } catch (error) {
            console.error('Video AI speech recognition start error:', error);
            this.userLog('warning', 'Failed to start speech recognition', 'top-end', 6000);
        }
    }

    streamingTask(message) {
        if (VideoAI.enabled && VideoAI.active && message && VideoAI.livekitRoom) {
            const event = {
                event_type: 'avatar.speak_text',
                session_id: VideoAI.info.session_id,
                text: message,
            };
            const data = new TextEncoder().encode(JSON.stringify(event));
            VideoAI.livekitRoom.localParticipant
                .publishData(data, { topic: 'agent-control' })
                .then(() => {
                    console.log('Video AI streamingTask sent:', message);
                })
                .catch((err) => {
                    console.error('Video AI streamingTask error:', err);
                });
        }
    }

    streamingInterrupt() {
        if (VideoAI.enabled && VideoAI.active && VideoAI.info.session_id && VideoAI.livekitRoom) {
            const event = {
                event_type: 'avatar.interrupt',
                session_id: VideoAI.info.session_id,
            };
            const data = new TextEncoder().encode(JSON.stringify(event));
            VideoAI.livekitRoom.localParticipant
                .publishData(data, { topic: 'agent-control' })
                .then(() => {
                    console.log('Video AI streamingInterrupt sent');
                })
                .catch((err) => {
                    console.error('Video AI streamingInterrupt error:', err);
                });
        }
    }

    startRendering() {
        // Ensure video playback starts reliably (autoplay can fail on subsequent sessions)
        const ensurePlayback = () => {
            if (this.videoAIElement && this.videoAIElement.paused && this.videoAIElement.srcObject) {
                this.videoAIElement.play().catch(() => {});
            }
        };
        setTimeout(ensurePlayback, 500);
        setTimeout(ensurePlayback, 1500);
    }

    stopRendering() {
        if (isHideMeActive) {
            isHideMeActive = !isHideMeActive;
            this.handleHideMe();
        }
    }

    startVideoAISessionTimer() {
        if (VideoAI.sessionTimeLimit > 0) {
            console.log(`Video AI session time limit: ${VideoAI.sessionTimeLimit}s`);

            let remaining = VideoAI.sessionTimeLimit;
            const timerEl = this.getId('avatar__sessionTimer');

            if (timerEl) {
                timerEl.style.display = 'inline';
                timerEl.innerText = this.formatSessionTime(remaining);
            }

            VideoAI.sessionCountdown = setInterval(() => {
                remaining--;
                if (timerEl) {
                    timerEl.innerText = this.formatSessionTime(remaining);
                    timerEl.style.color = remaining <= 10 ? '#ff4040' : 'white';
                }
                if (remaining <= 0) {
                    console.log('Video AI session time limit reached, stopping session');
                    this.userLog('warning', 'Video AI session time limit reached', 'top-end', 6000);
                    this.stopSession();
                }
            }, 1000);
        }
    }

    stopVideoAISessionTimer() {
        if (VideoAI.sessionCountdown) {
            clearInterval(VideoAI.sessionCountdown);
            VideoAI.sessionCountdown = null;
        }
    }

    formatSessionTime(seconds) {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `⏱️ ${m}:${s}`;
    }

    stopSession() {
        this.stopVideoAISessionTimer();

        // Restore avatar audio if muted
        if (VideoAI.muteParticipants) {
            if (this.videoAIElement) this.videoAIElement.muted = false;
            VideoAI.muteParticipants = false;
        }

        this.videoAIRecognitionPersistent = false;

        if (this.videoAISpeechRecognition) {
            this.videoAISpeechRecognition.stop();
            this.videoAISpeechRecognition = null;
        }
        this.videoAIRecording = false;

        const videoAIElement = this.getId('videoAIElement');
        if (videoAIElement) {
            // Stop old MediaStream tracks to release resources
            if (videoAIElement.srcObject) {
                videoAIElement.srcObject.getTracks().forEach((t) => t.stop());
                videoAIElement.srcObject = null;
            }
            videoAIElement.parentNode.removeChild(videoAIElement);
        }
        const videoAIContainer = this.getId('videoAIContainer');
        if (videoAIContainer) {
            videoAIContainer.parentNode.removeChild(videoAIContainer);
            if (this.isVideoPinned && this.pinnedVideoPlayerId === 'videoAIElement') {
                this.removeVideoPinMediaContainer();
            }
        }

        handleAspectRatio();

        this.setVideoAIControlsDisabled(false);

        this.streamingStop();
    }

    setVideoAIControlsDisabled(disabled) {
        const ids = ['avatarQuality', 'avatarVoiceIDs', 'avatarVideoAIStart'];
        ids.forEach((id) => {
            const el = this.getId(id);
            if (el) el.disabled = disabled;
        });
    }

    async publishAvatarTrack(rawTrack) {
        if (!this.producerTransport || this.producerTransport.closed) return;
        // Guard: skip if we already have an active producer of the same kind (prevents duplicates on track reconnect)
        if (VideoAI.avatarProducers.some((p) => !p.closed && p.kind === rawTrack.kind)) {
            console.warn('Video AI: skipping duplicate producer for kind:', rawTrack.kind);
            return;
        }
        try {
            const avatarProducer = await this.producerTransport.produce({
                track: rawTrack.clone(), // clone so producer.close() doesn't kill the local track
                appData: { mediaType: rawTrack.kind === 'video' ? mediaType.video : mediaType.audio },
            });
            VideoAI.avatarProducers.push(avatarProducer);
            console.log('Video AI published track to room:', rawTrack.kind, avatarProducer.id);
        } catch (err) {
            console.warn('Video AI failed to publish track to room:', err);
        }
    }

    stopAvatarProducers() {
        if (VideoAI.avatarProducers.length > 0) {
            let hadVideoProducer = false;
            VideoAI.avatarProducers.forEach((producer) => {
                if (producer.kind === 'video') hadVideoProducer = true;
                try {
                    if (!producer.closed) {
                        this.socket.emit('producerClosed', {
                            peer_name: this.peer_name,
                            producer_id: producer.id,
                            type: producer.kind === 'video' ? 'videoAI' : 'audioAI',
                            status: false,
                        });
                        producer.close();
                    }
                } catch (err) {
                    console.warn('Video AI producer close error:', err);
                }
            });
            VideoAI.avatarProducers = [];
            // If avatar video was shared but host's real camera is off,
            // notify other participants to re-show the video-off tile
            if (hadVideoProducer && !this.peer_info.peer_video) {
                this.sendVideoOff();
            }
        }
    }

    streamingStop() {
        // Close mediasoup avatar producers and reset share state
        this.stopAvatarProducers();
        VideoAI.shareToRoom = false;
        const shareBtn = this.getId('avatar__shareToRoom');
        if (shareBtn) setColor(shareBtn, 'white');

        // Disconnect LiveKit room
        if (VideoAI.livekitRoom) {
            console.info('Video AI LiveKit room disconnect');
            VideoAI.livekitRoom.disconnect();
            VideoAI.livekitRoom = null;
        }
        if (VideoAI.active && VideoAI.info && VideoAI.info.session_id) {
            const sessionId = VideoAI.info.session_id;
            this.socket
                .request('stopSession', { session_id: sessionId })
                .then(() => {
                    console.info('Video AI stopSession done!');
                })
                .catch((error) => {
                    console.warn('Video AI stopSession:', error?.message || error);
                });
        }

        this.stopRendering();

        VideoAI.active = false;
        VideoAI.sessionToken = null;
        VideoAI.mediaParticipantIdentity = null;
    }

    // ##############################################
    // RTMP Custom Destination
    // ##############################################

    initRtmpCustomDestination() {
        return this.rtmpManager.initRtmpCustomDestination();
    }

    getCustomRtmpUrl() {
        return this.rtmpManager.getCustomRtmpUrl();
    }

    // ##############################################
    // RTMP from FILE
    // ##############################################

    getRTMP() {
        return this.rtmpManager.getRTMP();
    }

    async startRTMP() {
        return this.rtmpManager.startRTMP();
    }

    stopRTMP() {
        return this.rtmpManager.stopRTMP();
    }

    endRTMP(data) {
        return this.rtmpManager.endRTMP(data);
    }

    errorRTMP(data) {
        return this.rtmpManager.errorRTMP(data);
    }

    // ##############################################
    // RTMP from URL
    // ##############################################

    startRTMPfromURL(inputVideoURL) {
        return this.rtmpManager.startRTMPfromURL(inputVideoURL);
    }

    stopRTMPfromURL() {
        return this.rtmpManager.stopRTMPfromURL();
    }

    endRTMPfromURL(data) {
        return this.rtmpManager.endRTMPfromURL(data);
    }

    errorRTMPfromURL(data) {
        return this.rtmpManager.errorRTMPfromURL(data);
    }

    // ##############################################
    // RTMP common
    // ##############################################

    openRTMPStreamer() {
        return this.rtmpManager.openRTMPStreamer();
    }

    isRTMPVideoSupported(video) {
        return this.rtmpManager.isRTMPVideoSupported(video);
    }

    copyRTMPUrl(url) {
        return this.rtmpManager.copyRTMPUrl(url);
    }

    cleanRTMPUrl() {
        return this.rtmpManager.cleanRTMPUrl();
    }

    showRTMP(rtmp, type = 'file') {
        return this.rtmpManager.showRTMP(rtmp, type);
    }

    get selectedRtmpFilename() {
        return this.rtmpManager.selectedRtmpFilename;
    }
    set selectedRtmpFilename(val) {
        this.rtmpManager.selectedRtmpFilename = val;
    }

    get rtmpFileStreamer() {
        return this.rtmpManager.rtmpFileStreamer;
    }
    set rtmpFileStreamer(val) {
        this.rtmpManager.rtmpFileStreamer = val;
    }

    get rtmpFilestreamer() {
        return this.rtmpManager.rtmpFileStreamer;
    }
    set rtmpFilestreamer(val) {
        this.rtmpManager.rtmpFileStreamer = val;
    }

    get rtmpUrlstreamer() {
        return this.rtmpManager.rtmpUrlstreamer;
    }
    set rtmpUrlstreamer(val) {
        this.rtmpManager.rtmpUrlstreamer = val;
    }

    get rtmpUrltSreamer() {
        return this.rtmpManager.rtmpUrlstreamer;
    }
    set rtmpUrltSreamer(val) {
        this.rtmpManager.rtmpUrlstreamer = val;
    }

    // ####################################################
    // ROOM SNAPSHOT WINDOW/SCREEN/TAB
    // ####################################################

    async snapshotRoom() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const video = document.createElement('video');

        try {
            const captureStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
            });

            video.srcObject = captureStream;
            video.onloadedmetadata = () => {
                video.play();
            };

            // Wait for the video to start playing
            video.onplay = async () => {
                this.sound('snapshot');

                // Sleep some ms
                await this.sleep(1000);

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Create a link element to download the image
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'Room_' + this.room_id + '_' + getDataTimeString() + '_snapshot.png';
                link.click();

                // Stop all video tracks to release the capture stream
                captureStream.getTracks().forEach((track) => track.stop());

                // Clean up: remove references to avoid memory leaks
                video.srcObject = null;
                canvas.width = 0;
                canvas.height = 0;
            };
        } catch (err) {
            console.error('Error: ' + err);
            this.userLog('error', 'Snapshot room error ' + err.message, 'top-end', 6000);
        }
    }



    // ####################################################
    // HELPERS
    // ####################################################

    toggleVideoMirror() {
        const peerVideo = this.getName(this.peer_id);
        if (peerVideo) {
            peerVideo.classList.toggle('mirror');
            sessionVideoMirror = peerVideo.classList.contains('mirror');
        }
    }

    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    toggleReactionPicker(msgListId) {
        return this.reactionManager.toggleReactionPicker(msgListId);
    }

    sendChatReaction(msgListId, emoji) {
        return this.reactionManager.sendChatReaction(msgListId, emoji);
    }

    applyReactionToElement(msgEl, emoji, peerName, action = 'add') {
        return this.reactionManager.applyReactionToElement(msgEl, emoji, peerName, action);
    }

    handleChatReaction = (dataObject) => {
        return this.reactionManager.handleChatReaction(dataObject);
    };

    getRoomEmojiPlacement() {
        return this.reactionManager.getRoomEmojiPlacement();
    }

    handleRoomEmoji(cmd, duration = 5000) {
        return this.reactionManager.handleRoomEmoji(cmd, duration);
    }

    handleEmojiSound(cmd) {
        return this.reactionManager.handleEmojiSound(cmd);
    }

    // FollowMe / Geolocation / Notifications Delegation
    applyPendingFollowMe() {
        return this.followMeManager.applyPendingFollowMe();
    }

    handleFollowMeData = (data) => {
        return this.followMeManager.handleFollowMeData(data);
    };

    toggleFollowMe(enabled) {
        return this.followMeManager.toggleFollowMe(enabled);
    }

    emitFollowMe(data) {
        return this.followMeManager.emitFollowMe(data);
    }

    handleFollowMe(data) {
        return this.followMeManager.handleFollowMe(data);
    }

    followMePin(peerId) {
        return this.followMeManager.followMePin(peerId);
    }

    followMeUnpin() {
        return this.followMeManager.followMeUnpin();
    }

    followMeFocus(peerId) {
        return this.followMeManager.followMeFocus(peerId);
    }

    followMeUnfocus(peerId) {
        return this.followMeManager.followMeUnfocus(peerId);
    }

    getVideoElementByPeerId(peerId) {
        return this.followMeManager.getVideoElementByPeerId(peerId);
    }

    askPeerGeoLocation(id) {
        return this.followMeManager.askPeerGeoLocation(id);
    }

    sendPeerGeoLocation(peer_id, type, data) {
        return this.followMeManager.sendPeerGeoLocation(peer_id, type, data);
    }

    confirmPeerGeoLocation(cmd) {
        return this.followMeManager.confirmPeerGeoLocation(cmd);
    }

    getPeerGeoLocation(peer_id, options = {}) {
        return this.followMeManager.getPeerGeoLocation(peer_id, options);
    }

    denyPeerGeoLocation(peer_id) {
        return this.followMeManager.denyPeerGeoLocation(peer_id);
    }

    handleGeoPeerLocation(cmd) {
        return this.followMeManager.handleGeoPeerLocation(cmd);
    }

    cleanNotifications() {
        return this.followMeManager.cleanNotifications();
    }

    saveNotifications(validate = true) {
        return this.followMeManager.saveNotifications(validate);
    }

    setNotificationsData(data) {
        return this.followMeManager.setNotificationsData(data);
    }

    isValidNotifications() {
        return this.followMeManager.isValidNotifications();
    }

    getNotificationsData() {
        return this.followMeManager.getNotificationsData();
    }

    get isPollOpen() {
        return this.pollManager.isPollOpen;
    }
    set isPollOpen(val) {
        this.pollManager.isPollOpen = val;
    }

    get isPollPinned() {
        return this.pollManager.isPollPinned;
    }
    set isPollPinned(val) {
        this.pollManager.isPollPinned = val;
    }

    get pollSelectedOptions() {
        return this.pollManager.pollSelectedOptions;
    }
    set pollSelectedOptions(val) {
        this.pollManager.pollSelectedOptions = val;
    }
} // End
