//#region Variabel DOM Elements
jQuery(function ($) {
    const TMaterial = document.getElementById("TMaterial");
    const TNoMat = document.getElementById("TNoMat");
    const btnMat = document.getElementById("btnMat");
    const btnIsiM = document.getElementById("btnIsiM");
    const btnKoreksiM = document.getElementById("btnKoreksiM");
    const btnHapusM = document.getElementById("btnHapusM");
    const btnProsesM = document.getElementById("btnProsesM");
    const btnKeluar = document.getElementById("btnKeluar");
    const Frame2 = document.getElementById("Frame2");

    let proses = 0; // 1: Isi, 2: Koreksi, 3: Hapus
//#endregion

//#region Input & Core Events
    btnIsiM.addEventListener("click", function () {
        setMode(1);
    });

    btnKoreksiM.addEventListener("click", function () {
        setMode(2);
    });

    btnHapusM.addEventListener("click", function () {
        setMode(3);
    });

    btnKeluar.addEventListener("click", function () {
        if (btnKeluar.textContent.trim().toUpperCase() === "KELUAR") {
            resetForm();
            window.location.href = "/GPS";
        } else {
            resetForm();
        }
    });

    TMaterial.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let val = TMaterial.value.trim();
            if (val !== "") {
                btnProsesM.focus();
            } else {
                Swal.fire("Info", "Isi nama material type...", "info");
                TMaterial.focus();
            }
        }
    });

    btnMat.addEventListener("click", function () {
        openLookupModal({
            title: "Pilih Material Type",
            url: window.maintMaterialConfig.routeGetMaterialList,
            headers: ["ID", "Nama Material"],
            columns: ["IdMaterial", "NamaMaterial"],
            onSelect: function (row) {
                TNoMat.value = row.IdMaterial;
                TMaterial.value = row.NamaMaterial;
                if (proses === 2) {
                    TMaterial.focus();
                } else if (proses === 3) {
                    btnProsesM.focus();
                }
            },
        });
    });

    btnProsesM.addEventListener("click", function () {
        if (proses === 0) {
            Swal.fire("Info", "Pilih proses terlebih dahulu.", "info");
            return;
        }

        let material = TMaterial.value.trim();
        let noMat = TNoMat.value.trim();

        if (!material) {
            Swal.fire("Info", "Material type tidak boleh kosong.", "info");
            TMaterial.focus();
            return;
        }

        if ((proses === 2 || proses === 3) && !noMat) {
            Swal.fire(
                "Info",
                'Pilih material melalui tombol "..." untuk mode Koreksi/Hapus.',
                "info",
            );
            return;
        }

        let payload = {
            proses: proses,
            material: material,
            noMat: noMat || null,
        };

        ajaxPost(
            window.maintMaterialConfig.routeStore,
            payload,
            null,
            null,
            function (response) {
                Swal.fire("Sukses", response.message, "success").then(() => {
                    resetForm();
                });
            },
        );
    });
//#endregion

//#region Utility & Helper Functions
    function setMode(mode) {
        proses = mode;
        btnKeluar.textContent = "Batal";
        btnIsiM.disabled = true;
        btnKoreksiM.disabled = true;
        btnHapusM.disabled = true;
        btnProsesM.disabled = false;
        Frame2.disabled = false;

        TMaterial.value = "";
        TNoMat.value = "";

        if (mode === 1) {
            TMaterial.focus();
        } else {
            btnMat.focus();
        }
    }

    function resetForm() {
        proses = 0;
        TMaterial.value = "";
        TNoMat.value = "";
        btnKeluar.textContent = "KELUAR";
        btnIsiM.disabled = false;
        btnKoreksiM.disabled = false;
        btnHapusM.disabled = false;
        btnProsesM.disabled = true;
        Frame2.disabled = true;
        btnIsiM.focus();
    }
});
//#endregion
