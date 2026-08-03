document.addEventListener('DOMContentLoaded', function () {
    //#region VARIABLE
    let buttons = document.querySelectorAll('.detail-btn');
    let modals = document.querySelectorAll('.about-modal');
    let closeButtons = document.querySelectorAll('.about-close');
    let zoomImages = document.querySelectorAll('.zoomable-image');

    //#endregion

    //#region FUNCTION
    function openModal(targetId) {
        let modal = document.getElementById(targetId);

        if (!modal) return;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }


    function closeModal(modal) {
        if (!modal) return;

        // Reset gambar
        const images = modal.querySelectorAll('.zoomable-image');

        images.forEach(img => {
            img.style.transform = 'translate(0px, 0px) scale(1)';
            img.style.cursor = 'grab';

            // Reset custom state
            img.dataset.scale = 1;
            img.dataset.posX = 0;
            img.dataset.posY = 0;
        });

            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

    //#endregion

    //#region EVENT LISTENER

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            let target = this.dataset.target;
            openModal(target);
        });
    });


    closeButtons.forEach(button => {
        button.addEventListener('click', function () {

            let modal = this.closest('.about-modal');
            closeModal(modal);
        });
    });


    modals.forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // Tutup modal dengan tombol ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {

            let activeModal = document.querySelector('.about-modal.show');

            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });

    zoomImages.forEach(img => {

        img.dataset.scale = 1;
        img.dataset.posX = 0;
        img.dataset.posY = 0;

        let isDragging = false;
        let startX = 0;
        let startY = 0;

        function updateTransform() {
            const scale = parseFloat(img.dataset.scale);
            const posX = parseFloat(img.dataset.posX);
            const posY = parseFloat(img.dataset.posY);

            img.style.transform =
                `translate(${posX}px, ${posY}px) scale(${scale})`;
        }

        // Zoom scroll mouse
        img.addEventListener('wheel', function (e) {

            e.preventDefault();

            let scale = parseFloat(img.dataset.scale);

            if (e.deltaY < 0) {
                scale += 0.2;
            } else {
                scale -= 0.2;
            }

            scale = Math.max(1, Math.min(scale, 5));

            img.dataset.scale = scale;

            if (scale === 1) {
                img.dataset.posX = 0;
                img.dataset.posY = 0;
            }

            updateTransform();
        });

        // Drag image
        img.addEventListener('mousedown', function (e) {
            let scale = parseFloat(img.dataset.scale);

            if (scale <= 1) return;
            isDragging = true;
            startX = e.clientX - parseFloat(img.dataset.posX);
            startY = e.clientY - parseFloat(img.dataset.posY);

            img.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', function (e) {
            if (!isDragging) return;

            img.dataset.posX = e.clientX - startX;
            img.dataset.posY = e.clientY - startY;

            updateTransform();
        });

        document.addEventListener('mouseup', function () {
            isDragging = false;
            img.style.cursor = 'grab';
        });

        // Double click reset
        img.addEventListener('dblclick', function () {
            img.dataset.scale = 1;
            img.dataset.posX = 0;
            img.dataset.posY = 0;

            updateTransform();
        });

        // Single click zoom
        img.addEventListener('click', function (e) {

            e.stopPropagation();

            let scale = parseFloat(img.dataset.scale);
            if (scale < 5) {
                scale += 0.5;
            } else {
                scale = 1;
                img.dataset.posX = 0;
                img.dataset.posY = 0;
            }

            img.dataset.scale = scale;

            updateTransform();
        });
    });

    //#endregion
});
