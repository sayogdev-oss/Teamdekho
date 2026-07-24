'use strict';
/**
 * TeamDekho - Virtual Background feature (lazy-loaded)
 * Extracted from RoomClient.js to reduce initial room-join payload.
 */

RoomClient.prototype.showVideoImageSelector = function () {
    const imageGrid = document.getElementById('imageGrid');
    const imageGridVideo = document.getElementById('imageGridVideo');

    if (!imageGridVideo) return;

    elemDisplay('imageGridVideo', true, 'grid');
    if (imageGridVideo.innerHTML != '') return;

    if (imageGrid) imageGrid.innerHTML = ''; // Clear previous init images
    imageGridVideo.innerHTML = ''; // Clear previous images

    function createImage(id, src, tooltip, index, clickHandler) {
        const img = document.createElement('img');
        img.id = id;
        img.src = src;
        img.dataset.index = index;
        img.addEventListener('click', clickHandler);
        imageGridVideo.appendChild(img);
        if (tooltip) {
            setTippy(img.id, tooltip, 'top');
        }
    }

    // Common function to handle virtual background changes
    async function handleVirtualBackground(blurLevel = null, imgSrc = null, transparentBg = null) {
        if (!blurLevel && !imgSrc && !transparentBg) {
            virtualBackgroundBlurLevel = null;
            virtualBackgroundSelectedImage = null;
            virtualBackgroundTransparent = null;
        }
        await rc.applyVirtualBackground(blurLevel, imgSrc, transparentBg);
    }

    // Create clean virtual bg Image
    createImage('cleanVbImg', image.user, 'Remove virtual background', 'cleanVb', () =>
        handleVirtualBackground(null, null)
    );
    // Create High Blur Image
    createImage('highBlurImg', image.blurHigh, 'High Blur', 'high', () => handleVirtualBackground(20));

    // Create Low Blur Image
    createImage('lowBlurImg', image.blurLow, 'Low Blur', 'low', () => handleVirtualBackground(10));

    // Create transparent virtual bg Image
    createImage('transparentBg', image.transparentBg, 'Transparent Virtual background', 'transparentVb', () =>
        handleVirtualBackground(null, null, true)
    );

    // Handle file upload (common logic for file selection)
    function setupFileUploadButton(buttonId, sourceImg, tooltip, handler) {
        const imgButton = document.createElement('img');
        imgButton.id = buttonId;
        imgButton.src = sourceImg;
        imgButton.addEventListener('click', handler);
        imageGridVideo.appendChild(imgButton);
        setTippy(imgButton.id, tooltip, 'top');
    }

    function handleFileUpload(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const imgData = e.target.result;
                await indexedDBHelper.saveImage(imgData);
                addImageToUI(imgData);
            };
            reader.readAsDataURL(file);
        }
    }

    function createUploadImageButton() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';
        fileInput.addEventListener('change', (event) => {
            handleFileUpload(event.target.files[0]);
        });

        setupFileUploadButton('uploadImg', image.upload, 'Upload your custom image', () => fileInput.click());

        return fileInput;
    }

    // Function to add an image to UI
    function addImageToUI(imgData) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-wrapper';

        const customImg = document.createElement('img');
        customImg.src = imgData;
        customImg.addEventListener('click', () => handleVirtualBackground(null, imgData));

        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'delete-icon fas fa-times';
        deleteBtn.addEventListener('click', async (event) => {
            event.stopPropagation();
            await indexedDBHelper.removeImage(imgData);
            imageContainer.remove();
        });

        imageContainer.appendChild(customImg);
        imageContainer.appendChild(deleteBtn);
        imageGridVideo.appendChild(imageContainer);
    }

    // Function to fetch and store an image from URL
    async function fetchAndStoreImage(url) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onload = async (e) => {
                const imgData = e.target.result;
                await indexedDBHelper.saveImage(imgData);
                addImageToUI(imgData);
            };
            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Error fetching image:', error);
            // Detect CORS issue and provide a clearer error message
            error.message.includes('Failed to fetch')
                ? showError(errorMessage, 'Error: Unable to fetch image. CORS policy may be blocking the request.')
                : showError(errorMessage, `Error fetching image: ${error.message}`);
        }
    }

    // Paste image from URL
    function askForImageURL() {
        elemDisplay(imageUrlModal.id, true);
        navigator.clipboard
            .readText()
            .then((clipboardText) => {
                if (isValidImageURL(filterXSS(clipboardText))) {
                    imageUrlInput.value = clipboardText;
                }
            })
            .catch(() => {});
    }

    saveImageUrlBtn.addEventListener('click', async () => {
        elemDisplay(imageUrlModal.id, false);
        if (isValidImageURL(imageUrlInput.value)) {
            await fetchAndStoreImage(imageUrlInput.value);
            imageUrlInput.value = '';
        }
    });

    cancelImageUrlBtn.addEventListener('click', () => {
        elemDisplay(imageUrlModal.id, false);
        imageUrlInput.value = '';
    });

    // Upload from file button
    createUploadImageButton();

    // Upload from URL button
    setupFileUploadButton('linkImage', image.link, 'Upload Image from URL', askForImageURL);

    // Load default virtual backgrounds
    virtualBackgrounds.forEach((imageUrl, index) => {
        createImage(`virtualBg${index}`, imageUrl, null, index + 1, () => handleVirtualBackground(null, imageUrl));
    });

    // Load stored images and add to image grid UI
    indexedDBHelper.getAllImages().then((images) => images.forEach(addImageToUI));

    // Upload image with drag and drop
    imageGridVideo.addEventListener('dragover', (event) => {
        event.preventDefault();
        imageGridVideo.classList.add('drag-over');
    });

    imageGridVideo.addEventListener('dragleave', () => {
        imageGridVideo.classList.remove('drag-over');
    });

    imageGridVideo.addEventListener('drop', (event) => {
        event.preventDefault();
        imageGridVideo.classList.remove('drag-over');
        if (event.dataTransfer.files.length > 0) {
            handleFileUpload(event.dataTransfer.files[0]);
        }
    });
};

RoomClient.prototype.applyVirtualBackground = async function (blurLevel, backgroundImage, backgroundTransparent) {
    if (blurLevel) {
        virtualBackgroundBlurLevel = blurLevel;
        virtualBackgroundSelectedImage = null;
        virtualBackgroundTransparent = null;
    } else if (backgroundImage) {
        virtualBackgroundBlurLevel = null;
        virtualBackgroundSelectedImage = backgroundImage;
        virtualBackgroundTransparent = null;
    } else if (backgroundTransparent) {
        virtualBackgroundBlurLevel = null;
        virtualBackgroundSelectedImage = null;
        virtualBackgroundTransparent = true;
    } else {
        virtualBackgroundBlurLevel = null;
        virtualBackgroundSelectedImage = null;
        virtualBackgroundTransparent = null;
    }

    videoSelect.onchange();
    saveVirtualBackgroundSettings(blurLevel, backgroundImage, backgroundTransparent);
};
