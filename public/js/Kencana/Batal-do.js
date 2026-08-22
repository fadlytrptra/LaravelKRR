document.addEventListener("DOMContentLoaded", function () {

    const buttonBatal = document.getElementById("buttonBatal");
    const modal = document.getElementById("modalBatalDO");
    const modalForm = document.getElementById("modal-form");

    const btnCloseModal = document.getElementById("btnCloseModal");
    const btnCancelModal = document.getElementById("btnCancelModal");

    const selectedDoCount =
        document.getElementById("selectedDoCount");

    const btnConfirmBatal =
        document.getElementById("btnConfirmBatal");


    /* =========================================================
       BUKA MODAL
       ========================================================= */

    buttonBatal.addEventListener("click", function () {

        const table =
            document.getElementById("table_DO");

        const selectedCheckboxes =
            table.querySelectorAll(
                'input[name="selected[]"]:checked'
            );


        /* Tidak ada DO dipilih */

        if (selectedCheckboxes.length === 0) {

            Swal.fire({
                icon: "warning",
                title: "Tidak ada DO yang dipilih",
                text: "Silakan pilih minimal satu Delivery Order.",
                confirmButtonText: "OK"
            });

            return;
        }


        /* =====================================================
           HAPUS HIDDEN INPUT LAMA
           ===================================================== */

        modalForm
            .querySelectorAll(
                'input[data-batal-do="true"]'
            )
            .forEach(function (input) {
                input.remove();
            });


        /* =====================================================
           BUAT HIDDEN INPUT
           ===================================================== */

        selectedCheckboxes.forEach(function (checkbox) {

            const row = checkbox.closest("tr");

            const cells = row.cells;

            const nomorDO = checkbox.value;

            /*
             * Kolom ID Trans TMP
             * index = 10
             */
            const nomorTransTmp =
                cells[10].textContent.trim();


            /* nomorDOs[] */

            const inputDO =
                document.createElement("input");

            inputDO.type = "hidden";
            inputDO.name = "nomorDOs[]";
            inputDO.value = nomorDO;

            inputDO.setAttribute(
                "data-batal-do",
                "true"
            );


            /* nomorTransTmps[] */

            const inputTransTmp =
                document.createElement("input");

            inputTransTmp.type = "hidden";
            inputTransTmp.name = "nomorTransTmps[]";
            inputTransTmp.value = nomorTransTmp;

            inputTransTmp.setAttribute(
                "data-batal-do",
                "true"
            );


            modalForm.appendChild(inputDO);
            modalForm.appendChild(inputTransTmp);

        });


        /* =====================================================
           JUMLAH DO
           ===================================================== */

        selectedDoCount.textContent =
            selectedCheckboxes.length;


        /* =====================================================
           RESET BUTTON
           ===================================================== */

        btnConfirmBatal.disabled = false;

        btnConfirmBatal.innerHTML =
            '<span>&#x1F5D1;</span> Ya, Batalkan';


        /* =====================================================
           TAMPILKAN MODAL
           ===================================================== */

        modal.classList.add("show");

        document.body.classList.add("modal-open");

    });


    /* =========================================================
       TUTUP MODAL
       ========================================================= */

    function hideModal() {

        modal.classList.remove("show");

        document.body.classList.remove("modal-open");

    }


    /* =========================================================
       TOMBOL X
       ========================================================= */

    btnCloseModal.addEventListener(
        "click",
        hideModal
    );


    /* =========================================================
       TOMBOL BATAL
       ========================================================= */

    btnCancelModal.addEventListener(
        "click",
        hideModal
    );


    /* =========================================================
       KLIK BACKDROP
       ========================================================= */

    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {
                hideModal();
            }

        }
    );


    /* =========================================================
       ESC
       ========================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains("show")
            ) {
                hideModal();
            }

        }
    );


    /* =========================================================
       SUBMIT
       ========================================================= */

    modalForm.addEventListener(
        "submit",
        function (event) {

            const selectedDO =
                modalForm.querySelectorAll(
                    'input[name="nomorDOs[]"][data-batal-do="true"]'
                );


            if (selectedDO.length === 0) {

                event.preventDefault();

                Swal.fire({
                    icon: "warning",
                    title: "Tidak ada DO yang dipilih",
                    text: "Silakan pilih minimal satu Delivery Order.",
                    confirmButtonText: "OK"
                });

                return;
            }


            /* Cegah double submit */

            btnConfirmBatal.disabled = true;

            btnConfirmBatal.innerHTML =
                '<span class="spinner-border spinner-border-sm"></span> Memproses...';

        }
    );

});