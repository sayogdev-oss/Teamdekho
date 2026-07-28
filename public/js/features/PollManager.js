'use strict';

class PollManager {
    constructor(roomClient) {
        this.roomClient = roomClient;
        this.isPollOpen = false;
        this.isPollPinned = false;
        this.pollSelectedOptions = {};
    }

    // ##############################################
    // POOLS
    // ##############################################

    togglePoll() {
        pollRoom.classList.toggle('show');
        if (!this.isPollOpen) {
            hide(pollMinButton);
            if (!this.roomClient.isMobileDevice) {
                BUTTONS.poll.pollMaxButton && show(pollMaxButton);
            }
            this.pollCenter();
            this.roomClient.sound('open');
        }
        this.isPollOpen = !this.isPollOpen;

        if (this.isPollPinned) this.pollUnpin();

        if (!this.roomClient.isMobileDevice && this.isPollOpen && this.roomClient.canBePinned()) {
            this.togglePollPin();
        }
    }

    togglePollPin() {
        if (transcription.isPin()) {
            return this.roomClient.userLog('info', 'Please unpin the transcription that appears to be currently pinned', 'top-end');
        }
        if (this.roomClient.isChatPinned) {
            return this.roomClient.userLog('info', 'Please unpin the chat that appears to be currently pinned', 'top-end');
        }
        if (this.roomClient.isEditorPinned) {
            return this.roomClient.userLog('info', 'Please unpin the editor that appears to be currently pinned', 'top-end');
        }
        if (this.roomClient.isBreakoutPinned) {
            return this.roomClient.userLog('info', 'Please unpin the breakout rooms that appears to be currently pinned', 'top-end');
        }
        this.isPollPinned ? this.pollUnpin() : this.pollPin();
        this.roomClient.sound('click');
    }

    pollPin() {
        if (!this.roomClient.isVideoPinned) {
            this.roomClient.videoMediaContainerPin();
        }
        this.pollPinned();
        this.isPollPinned = true;
        setColor(pollTogglePin, 'lime');
        this.roomClient.resizeVideoMenuBar();
        resizeVideoMedia();
        pollRoom.style.resize = 'none';
        if (!this.roomClient.isMobileDevice) this.roomClient.makeUnDraggable(pollRoom, pollHeader);
    }

    pollUnpin() {
        if (!this.roomClient.isVideoPinned) {
            this.roomClient.videoMediaContainerUnpin();
        }
        pollRoom.classList.remove('panel-slide-in');
        pollRoom.style.maxWidth = '600px';
        pollRoom.style.maxHeight = '700px';
        this.pollCenter();
        this.isPollPinned = false;
        setColor(pollTogglePin, 'white');
        this.roomClient.resizeVideoMenuBar();
        resizeVideoMedia();
        if (!this.roomClient.isMobileDevice) this.roomClient.makeDraggable(pollRoom, pollHeader);
    }

    pollPinned() {
        pollRoom.style.position = 'absolute';
        pollRoom.style.top = 0;
        pollRoom.style.right = 0;
        pollRoom.style.left = null;
        pollRoom.style.transform = null;
        pollRoom.style.maxWidth = '25%';
        pollRoom.style.maxHeight = '100%';
        pollRoom.classList.remove('panel-slide-in');
        void pollRoom.offsetWidth;
        pollRoom.classList.add('panel-slide-in');
    }

    pollCenter() {
        pollRoom.style.position = 'fixed';
        pollRoom.style.transform = 'translate(-50%, -50%)';
        pollRoom.style.top = '50%';
        pollRoom.style.left = '50%';
    }

    pollMaximize() {
        pollRoom.style.maxHeight = '100vh';
        pollRoom.style.maxWidth = '100vw';
        this.pollCenter();
        hide(pollMaxButton);
        BUTTONS.poll.pollMaxButton && show(pollMinButton);
    }

    pollMinimize() {
        this.pollCenter();
        hide(pollMinButton);
        BUTTONS.poll.pollMaxButton && show(pollMaxButton);
        if (this.isPollPinned) {
            this.pollPin();
        } else {
            pollRoom.style.maxWidth = '600px';
            pollRoom.style.maxHeight = '700px';
        }
    }

    pollsUpdate(polls) {
        if (!this.isPollOpen) this.togglePoll();

        pollsContainer.innerHTML = '';
        polls.forEach((poll, index) => {
            const pollDiv = document.createElement('div');
            pollDiv.className = 'poll';

            const question = document.createElement('p');
            question.className = 'poll-question';
            question.textContent = poll.question;
            pollDiv.appendChild(question);

            const options = document.createElement('div');
            options.className = 'options';

            poll.options.forEach((option) => {
                const optionDiv = document.createElement('div');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `poll${index}`;
                input.value = option;
                if (this.pollSelectedOptions[index] === option) {
                    input.checked = true;
                }

                input.addEventListener('change', () => {
                    this.pollSelectedOptions[index] = option;
                    this.roomClient.socket.emit('vote', { pollIndex: index, option });
                });

                const label = document.createElement('label');
                label.textContent = option;

                optionDiv.appendChild(input);
                optionDiv.appendChild(label);
                options.appendChild(optionDiv);
            });
            pollDiv.appendChild(options);

            const pollButtonsDiv = document.createElement('div');
            pollButtonsDiv.className = 'poll-btns';

            // Toggle voters button
            const toggleButton = document.createElement('button');
            const toggleButtonIcon = document.createElement('i');
            toggleButtonIcon.className = 'fas fa-users';
            toggleButton.id = 'toggleVoters';
            toggleButton.className = 'view-btn';
            toggleButton.insertBefore(toggleButtonIcon, toggleButton.firstChild);
            toggleButton.addEventListener('click', () => {
                votersList.style.display === 'none'
                    ? (votersList.style.display = 'block')
                    : (votersList.style.display = 'none');
            });
            pollButtonsDiv.appendChild(toggleButton);

            // Edit poll button using swal
            const editPollButton = document.createElement('button');
            const editPollButtonIcon = document.createElement('i');
            editPollButtonIcon.className = 'fas fa-pen-to-square';
            editPollButton.id = 'editPoll';
            editPollButton.className = 'poll-btn';
            editPollButton.insertBefore(editPollButtonIcon, editPollButton.firstChild);
            editPollButton.addEventListener('click', () => {
                Swal.fire({
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    background: swalBackground,
                    title: 'Edit Poll',
                    html: this.createPollInputs(poll),
                    focusConfirm: false,
                    showCancelButton: true,
                    confirmButtonText: 'Save',
                    cancelButtonText: 'Cancel',
                    cancelButtonColor: '#dc3545',
                    preConfirm: () => {
                        const newQuestion = document.getElementById('swal-input-question').value;
                        const newOptions = this.getPollOptions(poll.options.length);
                        this.roomClient.socket.emit('editPoll', {
                            index,
                            question: newQuestion,
                            options: newOptions,
                            peer_name: this.roomClient.peer_name,
                            peer_uuid: this.roomClient.peer_uuid,
                        });
                    },
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
            });
            pollButtonsDiv.appendChild(editPollButton);

            // Delete poll button
            const deletePollButton = document.createElement('button');
            const deletePollButtonIcon = document.createElement('i');
            deletePollButtonIcon.className = 'fas fa-trash';
            deletePollButton.id = 'delPoll';
            deletePollButton.className = 'del-btn';
            deletePollButton.insertBefore(deletePollButtonIcon, deletePollButton.firstChild);
            deletePollButton.addEventListener('click', () => {
                Swal.fire({
                    background: swalBackground,
                    position: 'top',
                    title: 'Delete this poll?',
                    imageUrl: image.delete,
                    showDenyButton: true,
                    confirmButtonText: `Yes`,
                    denyButtonText: `No`,
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.roomClient.socket.emit('deletePoll', { index, peer_name: this.roomClient.peer_name, peer_uuid: this.roomClient.peer_uuid });
                    }
                });
            });
            pollButtonsDiv.appendChild(deletePollButton);

            const hr = document.createElement('hr');
            pollDiv.appendChild(hr);

            pollDiv.appendChild(pollButtonsDiv);

            const votersList = document.createElement('ul');
            votersList.style.display = 'none';
            for (const [user, vote] of Object.entries(poll.voters)) {
                const voter = document.createElement('li');
                voter.textContent = `${user}: ${vote}`;
                votersList.appendChild(voter);
            }
            pollDiv.appendChild(votersList);

            pollsContainer.appendChild(pollDiv);

            if (!this.roomClient.isMobileDevice) {
                setTippy('toggleVoters', 'Toggle voters', 'top');
                setTippy('delPoll', 'Delete poll', 'top');
                setTippy('editPoll', 'Edit poll', 'top');
            }
        });
    }

    pollCreateNewForm(e) {
        e.preventDefault();

        if (this.roomClient._moderator.polls_cant_create && !isPresenter && !isCoHost) {
            return this.roomClient.userLog(
                'warning',
                'The moderator does not allow non-presenters to create or edit polls',
                'top-end',
                6000
            );
        }

        const question = e.target.question.value;
        const optionInputs = document.querySelectorAll('.option-input');
        const options = Array.from(optionInputs).map((input) => input.value.trim());

        this.roomClient.socket.emit('createPoll', { question, options });

        e.target.reset();
        optionsContainer.innerHTML = '';
        const initialOptionInput = document.createElement('input');
        initialOptionInput.type = 'text';
        initialOptionInput.name = 'option';
        initialOptionInput.className = 'option-input';
        initialOptionInput.required = true;
        optionsContainer.appendChild(initialOptionInput);
    }

    pollAddOptions() {
        const optionInput = document.createElement('input');
        optionInput.type = 'text';
        optionInput.name = 'option';
        optionInput.className = 'option-input';
        optionInput.required = true;
        optionsContainer.appendChild(optionInput);
    }

    pollDeleteOptions() {
        const optionInputs = document.querySelectorAll('.option-input');
        if (optionInputs.length > 1) {
            optionsContainer.removeChild(optionInputs[optionInputs.length - 1]);
        }
    }

    createPollInputs(poll) {
        const safeQuestion = this.roomClient.sanitizeHtml(String(poll.question ?? ''));
        const questionInput = `<input id="swal-input-question" class="swal2-input" value="${safeQuestion}">`;
        const optionsInputs = poll.options
            .map((option, i) => {
                const safeOption = this.roomClient.sanitizeHtml(String(option ?? ''));
                return `<input id="swal-input-option${i}" class="swal2-input" value="${safeOption}">`;
            })
            .join('');
        return questionInput + optionsInputs;
    }

    getPollOptions(optionCount) {
        const options = [];
        for (let i = 0; i < optionCount; i++) {
            options.push(document.getElementById(`swal-input-option${i}`).value);
        }
        return options;
    }

    pollSaveResults() {
        const polls = document.querySelectorAll('.poll');
        const results = [];

        polls.forEach((poll, index) => {
            const question = poll.querySelector('.poll-question').textContent;
            const options = poll.querySelectorAll('.options div label');

            const optionsText = Array.from(options).reduce((acc, option, index) => {
                acc[index + 1] = option.textContent.trim();
                return acc;
            }, {});

            const votersList = poll.querySelector('ul');
            const voters = Array.from(votersList.querySelectorAll('li')).reduce((acc, li) => {
                const [name, vote] = li.textContent.split(':').map((item) => item.trim());
                acc[name] = vote;
                return acc;
            }, {});

            results.push({
                Poll: `${index + 1}`,
                question: question,
                options: optionsText,
                voters: voters,
            });
        });

        results.length > 0
            ? saveObjToJsonFile(results, 'Poll')
            : this.roomClient.userLog('info', 'No polling data available to save', 'top-end');
    }

    getPollFileName() {
        const dateTime = getDataTimeStringFormat();
        const roomName = this.roomClient.room_id.trim();
        return `Poll_${roomName}_${dateTime}.txt`;
    }
}
