'use strict';

/**
 * FileTransferManager - File Transfer Feature Manager for TeamDekho
 * @license AGPLv3
 */

class FileTransferManager {
    constructor(roomClient) {
        this.roomClient = roomClient;
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
    }

    handleSF(uid, name) {
        const words = uid.split('___');
        let peer_id = words[1];
        let peer_name = name;
        let btnSf = this.roomClient.getId(uid);
        if (btnSf) {
            btnSf.addEventListener('click', () => {
                this.selectFileToShare(peer_id, false, peer_name);
            });
        }
    }

    handleDD(uid, peer_id, itsMe = false) {
        let videoPlayer = this.roomClient.getId(uid);
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

            videoPlayer.addEventListener('drop', (e) => {
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
                    const peerNameEl = this.roomClient.getId(peer_id + '__name');
                    const peerName = peerNameEl ? peerNameEl.innerText : 'all';
                    this.sendFileInformations(file, peer_id, false, peerName);
                } else {
                    const peerNameEl = this.roomClient.getId(peer_id + '__name');
                    const peerName = peerNameEl ? peerNameEl.innerText : 'all';
                    this.sendFileInformations(e.dataTransfer.files[0], peer_id, false, peerName);
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
                        return;
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
        this.roomClient.sound('open');

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
            return this.roomClient.userLog('warning', 'File transfer in progress. Please wait until it completes', 'top-end');
        }
        this.fileToSend = file;
        if (this.fileToSend && this.fileToSend.size > 0) {
            if (!this.roomClient.thereAreParticipants()) {
                return userLog('info', 'No participants detected', 'top-end');
            }
            if (this.roomClient.isHtml(this.fileToSend.name) || !this.isValidFileName(this.fileToSend.name))
                return this.roomClient.userLog('warning', 'Invalid file name!', 'top-end', 5000);

            const isPrivate = !broadcast && peer_id !== 'all' && peer_id !== this.roomClient.peer_id;
            const toId = isPrivate ? peer_id : 'all';
            const toName = isPrivate ? peer_name : 'all';

            const fileInfo = {
                peer_id: peer_id,
                sender_id: this.roomClient.peer_id,
                broadcast: broadcast,
                peer_name: this.roomClient.peer_name,
                peer_avatar: this.roomClient.peer_avatar,
                fileName: this.fileToSend.name,
                fileSize: this.fileToSend.size,
                fileType: this.fileToSend.type,
            };
            this.roomClient.setMsgAvatar('left', this.roomClient.peer_name, this.roomClient.peer_avatar);
            this.roomClient.appendMessage(
                'left',
                this.roomClient.leftMsgAvatar,
                this.roomClient.peer_name,
                this.roomClient.peer_id,
                `${icons.fileSend} File send:<br>Name: ${this.fileToSend.name}<br>Size: ${this.bytesToSize(this.fileToSend.size)}`,
                toId,
                toName
            );
            this.roomClient.socket.emit('fileInfo', fileInfo);
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

        this.roomClient.setMsgAvatar('right', this.incomingFileInfo.peer_name, this.incomingFileInfo.peer_avatar);
        this.roomClient.appendMessage(
            'right',
            this.roomClient.rightMsgAvatar,
            this.incomingFileInfo.peer_name,
            fileSenderId,
            `${icons.fileReceive} File receive:<br>From: ${this.incomingFileInfo.peer_name}<br>Name: ${this.incomingFileInfo.fileName}<br>Size: ${this.bytesToSize(this.incomingFileInfo.fileSize)}`,
            fileToId,
            fileToName
        );
        receiveFileInfo.innerText = fileToReceiveInfo;
        receiveFileDiv.style.display = 'block';
        receiveProgress.max = this.incomingFileInfo.fileSize;
        this.roomClient.userLog('info', fileToReceiveInfo, 'top-end');
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
        if (data) this.roomClient.socket.emit('file', data);
    }

    abortFileTransfer() {
        if (this.isFileReaderRunning()) {
            this.fileReader.abort();
            sendFileDiv.style.display = 'none';
            this.sendInProgress = false;
            this.roomClient.socket.emit('fileAbort', {
                peer_name: this.roomClient.peer_name,
            });
        }
    }

    abortReceiveFileTransfer() {
        const data = { peer_name: this.roomClient.peer_name };
        this.roomClient.socket.emit('receiveFileAbort', data);
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
            this.roomClient.userLog('info', data.peer_name + ' ⚠️ aborted file transfer', 'top-end');
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
        this.roomClient.userLog('info', data.peer_name + ' ⚠️ aborted the file transfer', 'top-end');
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
        this.roomClient.sound('download');

        const blob = new Blob(this.incomingFileData);
        const file = this.incomingFileInfo.fileName;

        this.incomingFileData = [];

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
            reader.readAsDataURL(blob);
        } else {
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

    isValidFileName(fileName) {
        const invalidChars = /[\\\/\?\*\|:"<>]/;
        return !invalidChars.test(fileName);
    }
}
