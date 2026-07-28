'use strict';

/**
 * EditorManager - Manages collaborative editor (Quill) and private notes in RoomClient
 */
class EditorManager {
    /**
     * @constructor
     * @param {RoomClient} roomClient - Reference to RoomClient instance
     */
    constructor(roomClient) {
        this.roomClient = roomClient;
        this.isEditorOpen = false;
        this.isEditorLocked = false;
        this.isEditorPinned = false;
        this.isEditorPrivate = false;
        this.collabEditorDelta = null;
    }

    toggleEditor() {
        editorRoom.classList.toggle('show');
        if (!this.isEditorOpen) {
            this.editorCenter();
            this.roomClient.sound('open');
        }
        this.isEditorOpen = !this.isEditorOpen;

        if (this.isEditorPinned) this.editorUnpin();

        if (!this.roomClient.isMobileDevice && this.isEditorOpen && this.roomClient.canBePinned()) {
            this.toggleEditorPin();
        }
    }

    toggleLockUnlockEditor() {
        this.isEditorLocked = !this.isEditorLocked;

        const btnToShow = this.isEditorLocked ? editorLockBtn : editorUnlockBtn;
        const btnToHide = this.isEditorLocked ? editorUnlockBtn : editorLockBtn;
        const btnColor = this.isEditorLocked ? 'red' : 'white';
        const action = this.isEditorLocked ? 'lock' : 'unlock';

        show(btnToShow);
        hide(btnToHide);
        setColor(editorLockBtn, btnColor);

        this.editorSendAction(action);

        if (this.isEditorLocked) {
            userLog('info', 'The Editor is locked. \n The participants cannot interact with it.', 'top-right');
            sound('locked');
        }
    }

    editorCenter() {
        editorRoom.style.position = 'fixed';
        editorRoom.style.transform = 'translate(-50%, -50%)';
        editorRoom.style.top = '50%';
        editorRoom.style.left = '50%';
    }

    toggleEditorPin() {
        if (transcription.isPin()) {
            return userLog('info', 'Please unpin the transcription that appears to be currently pinned', 'top-end');
        }
        if (this.roomClient.isPollPinned) {
            return userLog('info', 'Please unpin the poll that appears to be currently pinned', 'top-end');
        }
        if (this.roomClient.isChatPinned) {
            return userLog('info', 'Please unpin the chat that appears to be currently pinned', 'top-end');
        }
        if (this.roomClient.isBreakoutPinned) {
            return userLog('info', 'Please unpin the breakout rooms that appears to be currently pinned', 'top-end');
        }
        this.isEditorPinned ? this.editorUnpin() : this.editorPin();
        this.roomClient.sound('click');
    }

    editorPin() {
        if (!this.roomClient.isVideoPinned) {
            this.roomClient.videoMediaContainer.style.top = 0;
            this.roomClient.videoMediaContainer.style.width = '70%';
            this.roomClient.videoMediaContainer.style.height = '100%';
        }
        this.editorPinned();
        this.isEditorPinned = true;
        setColor(editorTogglePin, 'lime');
        this.roomClient.resizeVideoMenuBar();
        resizeVideoMedia();
        document.documentElement.style.setProperty('--editor-height', '80vh');
    }

    editorUnpin() {
        if (!this.roomClient.isVideoPinned) {
            this.roomClient.videoMediaContainerUnpin();
        }
        editorRoom.style.maxWidth = '100%';
        editorRoom.style.maxHeight = '100%';
        this.roomClient.pollCenter();
        this.isEditorPinned = false;
        editorRoom.classList.remove('panel-slide-in');
        setColor(editorTogglePin, 'white');
        this.roomClient.resizeVideoMenuBar();
        resizeVideoMedia();
        document.documentElement.style.setProperty('--editor-height', '85vh');
    }

    editorPinned() {
        editorRoom.style.position = 'absolute';
        editorRoom.style.top = 0;
        editorRoom.style.right = 0;
        editorRoom.style.left = null;
        editorRoom.style.transform = null;
        editorRoom.style.maxWidth = '30%';
        editorRoom.style.maxHeight = '100%';
        editorRoom.classList.remove('panel-slide-in');
        void editorRoom.offsetWidth;
        editorRoom.classList.add('panel-slide-in');
    }

    editorUpdate() {
        if (this.isEditorPrivate) return;
        if (this.isEditorOpen && (!isRulesActive || isPresenter)) {
            console.log('IsPresenter: update editor content to the participants in the room');
            const content = quill.getContents();
            this.roomClient.socket.emit('editorUpdate', content);
            const action = this.isEditorLocked ? 'lock' : 'unlock';
            this.editorSendAction(action);
        }
    }

    handleEditorUpdateData(data) {
        if (this.isEditorPrivate) {
            this.collabEditorDelta = data;
            return;
        }
        this.editorOpen();
        quill.setContents(data);
    }

    handleEditorData(data) {
        if (this.isEditorPrivate) {
            try {
                const Delta = Quill.import('delta');
                const base = new Delta(this.collabEditorDelta || { ops: [] });
                this.collabEditorDelta = base.compose(new Delta(data));
            } catch (e) {
                console.warn('handleEditorData (private) compose failed', e);
            }
            return;
        }
        this.editorOpen();
        quill.updateContents(data);
    }

    editorOpen() {
        if (!this.isEditorOpen) {
            this.roomClient.sound('open');
            this.toggleEditor();
        }
    }

    handleEditorActionsData(data) {
        const { peer_name, action } = data;
        switch (action) {
            case 'open':
                if (this.isEditorOpen) return;
                this.toggleEditor();
                this.roomClient.userLog('info', `${icons.editor} ${peer_name} open editor`, 'top-end', 6000);
                break;
            case 'close':
                if (!this.isEditorOpen) return;
                this.toggleEditor();
                this.roomClient.userLog('info', `${icons.editor} ${peer_name} close editor`, 'top-end', 6000);
                break;
            case 'clean':
                if (this.isEditorPrivate) {
                    this.collabEditorDelta = null;
                    this.roomClient.userLog('info', `${icons.editor} ${peer_name} cleared editor`, 'top-end', 6000);
                    break;
                }
                quill.setText('');
                this.roomClient.userLog('info', `${icons.editor} ${peer_name} cleared editor`, 'top-end', 6000);
                break;
            case 'lock':
                if (this.isEditorPrivate) {
                    this.isEditorLocked = true;
                    this.roomClient.userLog('info', `${icons.editor} ${peer_name} locked the editor`, 'top-end', 6000);
                    break;
                }
                this.isEditorLocked = true;
                quill.enable(false);
                this.roomClient.userLog('info', `${icons.editor} ${peer_name} locked the editor`, 'top-end', 6000);
                break;
            case 'unlock':
                if (this.isEditorPrivate) {
                    this.isEditorLocked = false;
                    this.roomClient.userLog('info', `${icons.editor} ${peer_name} unlocked the editor`, 'top-end', 6000);
                    break;
                }
                this.isEditorLocked = false;
                quill.enable(true);
                this.roomClient.userLog('info', `${icons.editor} ${peer_name} unlocked the editor`, 'top-end', 6000);
                break;
            default:
                break;
        }
    }

    editorIsLocked() {
        return this.isEditorLocked;
    }

    persistPrivateEditor() {
        /* intentionally empty: private notes are not persisted */
    }

    async toggleEditorPrivate() {
        if (this.isEditorPrivate) {
            await this._promptExitEditorPrivateMode();
            return;
        }

        this.collabEditorDelta = quill.getContents();
        this.isEditorPrivate = true;
        quill.setContents({ ops: [] });
        quill.enable(true);
        show(editorPrivateBtn);
        hide(editorCollabBtn);
        editorRoom.classList.add('editor-private-mode');
        this.roomClient.userLog(
            'info',
            `${icons.editor} Private Note mode: your edits are NOT shared and NOT saved`,
            'top-end',
            6000
        );
        this.roomClient.sound('click');
    }

    async _promptExitEditorPrivateMode() {
        if (quill.getText().trim().length === 0) {
            this._exitEditorPrivateMode();
            return;
        }

        const result = await Swal.fire({
            background: swalBackground,
            position: 'center',
            imageUrl: image.editor || image.delete,
            title: 'Exit Private Note mode?',
            text: 'Your private note will be lost unless you save it to a file.',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save as Text',
            denyButtonText: 'Save as HTML',
            cancelButtonText: 'Discard',
            reverseButtons: true,
            allowOutsideClick: false,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        });

        if (result.isConfirmed) {
            this.saveEditorAsText();
            this._exitEditorPrivateMode();
        } else if (result.isDenied) {
            this.saveEditorAsHtml();
            this._exitEditorPrivateMode();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            this._exitEditorPrivateMode();
        }
    }

    _exitEditorPrivateMode() {
        this.isEditorPrivate = false;
        quill.setContents(this.collabEditorDelta || { ops: [] });
        if (!isPresenter && this.isEditorLocked) {
            quill.enable(false);
        } else {
            quill.enable(true);
        }
        show(editorCollabBtn);
        hide(editorPrivateBtn);
        editorRoom.classList.remove('editor-private-mode');
        this.roomClient.userLog('info', `${icons.editor} Collaborative editor restored`, 'top-end', 4000);
        this.roomClient.sound('click');
    }

    editorUndo() {
        quill.history.undo();
    }

    editorRedo() {
        quill.history.redo();
    }

    editorCopy() {
        const content = quill.getText();
        if (content.trim().length === 0) {
            return this.roomClient.userLog('info', 'Nothing to copy', 'top-end');
        }
        copyToClipboard(content, false);
    }

    editorClean() {
        if (!isPresenter && this.editorIsLocked() && !this.isEditorPrivate) {
            userLog('info', 'The Editor is locked. \n You cannot interact with it.', 'top-right');
            return;
        }
        const content = quill.getText();
        if (content.trim().length === 0) {
            return this.roomClient.userLog('info', 'Nothing to clear', 'top-end');
        }
        Swal.fire({
            background: swalBackground,
            position: 'center',
            title: this.isEditorPrivate ? 'Clear your private note?' : 'Clear the editor content?',
            imageUrl: image.delete,
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            if (result.isConfirmed) {
                quill.setText('');
                if (!this.isEditorPrivate) {
                    this.editorSendAction('clean');
                }
                this.roomClient.sound('delete');
            }
        });
    }

    editorSave() {
        Swal.fire({
            background: swalBackground,
            position: 'top',
            imageUrl: image.save,
            title: 'Editor save options',
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonColor: 'red',
            denyButtonColor: 'green',
            confirmButtonText: `Text`,
            denyButtonText: `Html`,
            cancelButtonText: `Cancel`,
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' },
        }).then((result) => {
            this.handleEditorSaveResult(result);
        });
    }

    handleEditorSaveResult(result) {
        if (result.isConfirmed) {
            this.saveEditorAsText();
        } else if (result.isDenied) {
            this.saveEditorAsHtml();
        }
    }

    saveEditorAsText() {
        const content = quill.getText().trim();
        if (content.length === 0) {
            return this.roomClient.userLog('info', 'No data to save!', 'top-end');
        }
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const fileName = this.generateFileName('editor.txt');
        this.roomClient.saveBlobToFile(blob, fileName);
        this.roomClient.sound('download');
    }

    saveEditorAsHtml() {
        const content = quill.root.innerHTML.trim();
        if (content === '<p><br></p>') {
            return this.roomClient.userLog('info', 'No data to save!', 'top-end');
        }
        const fileName = this.generateFileName('editor.html');
        this.saveAsHtml(content, fileName);
        this.roomClient.sound('download');
    }

    generateFileName(extension) {
        return `Room_${this.roomClient.room_id}_${getDataTimeString()}_${extension}`;
    }

    saveAsHtml(content, file) {
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }

    editorSendAction(action) {
        this.roomClient.socket.emit('editorActions', { peer_name: this.roomClient.peer_name, action: action });
    }
}
