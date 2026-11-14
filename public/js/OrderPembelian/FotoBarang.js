// #region Variable
let btnBrowse = document.getElementById("btnBrowse");
let fotoInput = document.getElementById("fotoInput");
let previewImage = document.getElementById("previewImage");
let btnCari = document.getElementById("btnCari");
let kdBarang = document.getElementById("kdBarang");
let namaBarang = document.getElementById("namaBarang");
let ketBarang = document.getElementById("ketBarang");
let btnSimpan = document.getElementById("btnSimpan");
let btnHapus = document.getElementById("btnHapus");
let btnFoto = document.getElementById("btnFoto");
let cameraInput = document.getElementById("cameraInput");
let cameraModal = document.getElementById("cameraModal");
let cameraVideo = document.getElementById("cameraVideo");
let cameraCanvas = document.getElementById("cameraCanvas");
let btnTakePhoto = document.getElementById("btnTakePhoto");
let btnCloseCamera = document.getElementById("btnCloseCamera");
let stream = null;

let isAdminFotoBarang = window.isAdminFotoBarang === true;

const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');

let gambarDariDB = false;
let selectedFile = null;

// #endregion

// #region Function

function closeCameraModal() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }

    cameraVideo.srcObject = null;
    cameraModal.style.display = "none";
}

function setActionButtons({
    browse = false,
    foto = false,
    simpan = false,
    hapus = false
    } = {}) {
    btnBrowse.disabled = !isAdminFotoBarang || !browse;
    btnFoto.disabled = !isAdminFotoBarang || !foto;
    btnSimpan.disabled = !isAdminFotoBarang || !simpan;
    btnHapus.disabled = !isAdminFotoBarang || !hapus;
}


async function compressImage(file) {
    return new Promise((resolve, reject) => {

        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        img.onload = function () {

            const MAX_WIDTH = 1600;
            const MAX_HEIGHT = 1600;

            let width = img.width;
            let height = img.height;

            // Sesuaikan resolusi
            if (width > MAX_WIDTH || height > MAX_HEIGHT) {
                const ratio = Math.min(
                    MAX_WIDTH / width,
                    MAX_HEIGHT / height
                );

                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");

            ctx.drawImage(img, 0, 0, width, height);

            URL.revokeObjectURL(objectUrl);

            // Kompresi JPEG
            let quality = 0.85;

            function convert() {
                canvas.toBlob(blob => {

                    if (!blob) {
                        reject(new Error("Gagal melakukan kompresi gambar."));
                        return;
                    }

                    // Target maksimal 1 MB
                    if (blob.size > 1024 * 1024 && quality > 0.45) {
                        quality -= 0.1;
                        convert();
                        return;
                    }

                    const compressedFile = new File(
                        [blob],
                        "foto-barang.jpg",
                        {
                            type: "image/jpeg",
                            lastModified: Date.now()
                        }
                    );

                    console.log("Foto sebelum:",
                        (file.size / 1024 / 1024).toFixed(2), "MB");

                    console.log("Foto sesudah:",
                        (compressedFile.size / 1024 / 1024).toFixed(2), "MB");

                    resolve(compressedFile);

                }, "image/jpeg", quality);
            }

            convert();
        };

        img.onerror = function () {
            URL.revokeObjectURL(objectUrl);
            reject(new Error(
                "Gambar tidak dapat dibaca. Pastikan format JPG, PNG, atau WEBP."
            ));
        };

        img.src = objectUrl;
    });
}


// endregion

// #region Event Listener

// tutup modal kamera
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && cameraModal.style.display === "flex") {
        closeCameraModal();
    }
});

// browse gambar
btnBrowse.addEventListener("click", function () {
    // wajib cari barang dulu
    if (!kdBarang.value.trim()) {

        Swal.fire({
            icon: "warning",
            title: "Peringatan",
            text: "Masukkan kode barang terlebih dahulu."
        });

        return;
    }

    // jika sudah ada gambar lama
    let defaultImage = "/images/tanyaken_apa.jpg";

    // jika sudah simpan gambar, tidak bisa browse
    if (gambarDariDB) {
        Swal.fire({
            icon: "warning",
            title: "Gambar Sudah Ada",
            text: "Kode barang ini sudah memiliki gambar. Hapus gambar lama terlebih dahulu."
        });

        return;
    }

    fotoInput.click();
});



fotoInput.addEventListener("change", async function (e) {

    const file = e.target.files[0];

    if (!file) return;

    try {
        selectedFile = await compressImage(file);

        previewImage.src = URL.createObjectURL(selectedFile);

        gambarDariDB = false;

        setActionButtons({
            browse: false,
            foto: false,
            simpan: true,
            hapus: true
        });

    } catch (error) {
        console.error("Kompresi gagal:", error);

        Swal.fire({
            icon: "error",
            title: "Gagal Memproses Gambar",
            text: error.message
        });

        fotoInput.value = "";
        selectedFile = null;
    }
});


// Cari Barang
btnCari.addEventListener("click", function () {
    let kode = kdBarang.value.trim();

    if (!kode) {
        Swal.fire({
            icon: "warning",
            title: "Peringatan",
            text: "Kode barang harus diisi"
        });
        return;
    }

    kode = kode.padStart(9, "0");
    kdBarang.value = kode;

    fetch(`/FotoBarang/${kode}`)
        .then(response => response.json())
        .then(res => {
            if (!res.success) {
                Swal.fire({
                    icon: "warning",
                    title: "Data Tidak Ditemukan",
                    text: res.message
                });

                namaBarang.value = "";
                ketBarang.value = "";
                previewImage.src = "";
                setActionButtons({
                    browse: true,
                    foto: true,
                    simpan: false,
                    hapus: false
                });

                return;
            }

            namaBarang.value = res.data.nama_brg ?? "";
            ketBarang.value = res.data.ket ?? "";

            if (res.data.foto) {
                previewImage.src = `data:image/jpeg;base64,${res.data.foto}`;
                gambarDariDB = true;

                setActionButtons({
                    browse: false,
                    foto: false,
                    simpan: false,
                    hapus: true
                });

            } else {
                previewImage.src = "/images/tanyaken_apa.jpg";
                gambarDariDB = false;

                setActionButtons({
                    browse: true,
                    foto: true,
                    simpan: false,
                    hapus: false
                });
            }
        })
        .catch(error => {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Terjadi kesalahan."
            });

            previewImage.src = "/images/tanyaken_apa.jpg";
        });
});

// Enter pada kode barang
kdBarang.addEventListener(
    "keydown",
    function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            kdBarang.value = kdBarang.value
                .trim()
                .padStart(9, "0");

            btnCari.click();
        }
    }
);

// buka kamera
btnFoto.addEventListener("click", async function () {
    // wajib cari barang dulu
    if (!kdBarang.value.trim()) {
        Swal.fire({
            icon: "warning",
            title: "Peringatan",
            text: "Masukkan kode barang terlebih dahulu."
        });
        return;
    }

    // jika gambar sudah ada di DB
    if (gambarDariDB) {
        Swal.fire({
            icon: "warning",
            title: "Gambar Sudah Ada",
            text: "Kode barang ini sudah memiliki gambar. Hapus gambar lama terlebih dahulu."
        });
        return;
    }

    // menggunakan device mobile
    const isMobile = /Android|webOS|iPhone|iPad/i
        .test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && window.innerWidth <= 1366);

    console.log("isMobile:", isMobile);

    if (isMobile) {
        cameraInput.click();
        return;
    }

    // desktop / laptop
    try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Browser tidak mendukung akses kamera."
            });
            return;
        }

        // buka webcam langsung
        stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        cameraVideo.srcObject = stream;
        cameraModal.style.display = "flex";

    } catch (err) {
        console.error("Camera Error:", err);

        let message = "Tidak dapat akses kamera.";

        if (err.name === "NotFoundError") {
            message = "Laptop / PC ini tidak memiliki webcam.";

        } else if (err.name === "Izin Kamera Ditolak!") {
            message = "Beri akses pada Kamera.";

        } else if (err.name === "NotReadableError"
        ) {
            message = "Kamera sedang digunakan aplikasi lain.";
        }

        Swal.fire({
            icon: "error",
            title: "Error Kamera",
            html: `
                <b>${err.name}</b><br>
                ${message}
            `
        });
    }
});

// preview hasil kamera

cameraInput.addEventListener("change", async function (e) {

    const file = e.target.files[0];

    if (!file) return;

    try {
        selectedFile = await compressImage(file);

        previewImage.src = URL.createObjectURL(selectedFile);

        gambarDariDB = false;

        setActionButtons({
            browse: false,
            foto: false,
            simpan: true,
            hapus: true
        });

    } catch (error) {
        console.error("Kompresi kamera gagal:", error);

        Swal.fire({
            icon: "error",
            title: "Gagal Memproses Foto",
            text: error.message
        });

        cameraInput.value = "";
        selectedFile = null;
    }
});


btnTakePhoto.addEventListener("click", function () {
    const ctx = cameraCanvas.getContext("2d");
    cameraCanvas.width = cameraVideo.videoWidth;
    cameraCanvas.height = cameraVideo.videoHeight;

    ctx.drawImage(
        cameraVideo,
        0,
        0
    );

    cameraCanvas.toBlob(
        function (blob) {

            selectedFile =
                new File(
                    [blob],
                    "camera.jpg",
                    {
                        type:
                            "image/jpeg"
                    }
                );

            previewImage.src = URL.createObjectURL(blob);
            gambarDariDB = false;
            setActionButtons({
                browse: false,
                foto: false,
                simpan: true,
                hapus: true
            });
        },
        "image/jpeg",
        0.9
    );

    // matikan kamera
    if (stream) {
        stream.getTracks()
            .forEach(track =>
                track.stop()
            );
    }

    cameraModal.style.display = "none";
    }
);

btnCloseCamera.addEventListener("click", function () {
        closeCameraModal();
    }
);

cameraModal.addEventListener("click", function (e) {
        if (e.target === cameraModal) {
            closeCameraModal();
        }
    }
);


// Simpan
btnSimpan.addEventListener("click", function () {
    if (!kdBarang.value.trim()) {
        Swal.fire({
            icon: "warning",
            title: "Peringatan",
            text: "Kode barang harus diisi."
        });

        return;
    }

    // validasi gambar dulu
    if (gambarDariDB) {
        Swal.fire({
            icon: "warning",
            title: "Peringatan",
            text: "Gambar sudah tersimpan di database."
        });

        return;
    }

    // jika belum pilih gambar baru
    if (!selectedFile) {
        Swal.fire({
            icon: "warning",
            title: "Peringatan",
            text: "Pilih gambar terlebih dahulu."
        });

        return;
    }

    // disable button saat proses simpan
    btnBrowse.disabled = true;
    btnCari.disabled = true;
    btnFoto.disabled = true;
    btnSimpan.disabled = true;
    btnHapus.disabled = true;

    let formData = new FormData();

    formData.append("Kd_Barang", kdBarang.value);
    formData.append("Foto", selectedFile);


    fetch("/FotoBarang", {
        method: "POST",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        body: formData
    })
    .then(async response => {
        const raw = await response.text();

        let res;

        try {
            res = JSON.parse(raw);
        } catch (error) {
            console.error("Response bukan JSON:", raw);

            throw new Error(
                `HTTP ${response.status}: ${raw.substring(0, 500)}`
            );
        }

        console.log("HTTP Status:", response.status);
        console.log("Response Laravel:", res);

        if (!response.ok) {
            let detail = res.message || "Terjadi kesalahan.";

            if (res.errors) {
                detail += " " + Object.values(res.errors)
                    .flat()
                    .join(", ");
            }

            throw new Error(
                `HTTP ${response.status}: ${detail}`
            );
        }

        return res;
    })
    .then(res => {

        Swal.fire({
            icon: res.success ? "success" : "error",
            title: res.success ? "Berhasil" : "Gagal",
            text: res.message
        });

        if (res.success) {

            kdBarang.value = "";
            namaBarang.value = "";
            ketBarang.value = "";

            fotoInput.value = "";
            cameraInput.value = "";

            selectedFile = null;
            gambarDariDB = false;

            previewImage.src = "";

            btnBrowse.disabled = true;
            btnFoto.disabled = true;

            kdBarang.focus();
        }
    })
    .catch(error => {

        console.error("Upload Foto Error:", error);

        Swal.fire({
            icon: "error",
            title: "Gagal Menyimpan",
            text: error.message
        });

    })
    .finally(() => {

        btnCari.disabled = false;
        btnSimpan.disabled = false;
        btnHapus.disabled = false;

        if (gambarDariDB) {
            btnBrowse.disabled = true;
            btnFoto.disabled = true;

        } else if (
            previewImage.src &&
            !previewImage.src.includes("tanyaken_apa.jpg")
        ) {
            btnBrowse.disabled = true;
            btnFoto.disabled = true;

        } else {
            btnBrowse.disabled = false;
            btnFoto.disabled = false;
        }
    });

});


// Hapus Foto
btnHapus.addEventListener("click", function () {
    // gambar belum simpan (preview)
    if (selectedFile && !gambarDariDB) {
        Swal.fire({
            title: "Hapus gambar?",
            text: "Gambar preview akan dihapus.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal"
        }).then((result) => {

            if (!result.isConfirmed) return;

            // reset preview
            previewImage.src = "/images/tanyaken_apa.jpg";

            // reset input file
            fotoInput.value = "";
            cameraInput.value = "";
            selectedFile = null;
            gambarDariDB = false;
            btnBrowse.disabled = false;
            btnFoto.disabled = false;

            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Gambar preview berhasil dihapus."
            });
        });

        return;
    }

    let kode = kdBarang.value.trim();

    if (!kode) {
        Swal.fire({
            icon: "warning",
            title: "Peringatan",
            text: "Kode barang kosong."
        });

        return;
    }

    Swal.fire({
        title: "Yakin?",
        text: "Foto akan dihapus.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Batal"
    })
    .then((result) => {
        if (!result.isConfirmed) return;

        // disable semua button
        btnBrowse.disabled = true;
        btnCari.disabled = true;
        btnFoto.disabled = true;
        btnSimpan.disabled = true;
        btnHapus.disabled = true;

        fetch(`/FotoBarang/${kode}`, {
            method: "DELETE",
            headers: {
                "X-CSRF-TOKEN": csrfToken
            }
        })
        .then(response => response.json())
        .then(res => {

            Swal.fire({
                icon: res.success ? "success" : "error",
                title: res.success ? "Berhasil" : "Gagal",
                text: res.message
            });

            if (res.success) {
                // clear field
                kdBarang.value = "";
                namaBarang.value = "";
                ketBarang.value = "";
                fotoInput.value = "";
                cameraInput.value = "";
                selectedFile = null;
                gambarDariDB = false;

                // kosongkan preview
                previewImage.src = "";
                btnBrowse.disabled = false;
                btnFoto.disabled = false;

                // fokus kembali ke kode barang
                kdBarang.focus();
            }
        })
        .catch(error => {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Gagal menghapus data."
            });
        })
        .finally(() => {
            btnCari.disabled = false;
            btnSimpan.disabled = false;
            btnHapus.disabled = false;

            // hanya aktif jika belum ada gambar
            if (!gambarDariDB && !previewImage.src.includes("tanyaken_apa.jpg")) {
                btnBrowse.disabled = false;
                btnFoto.disabled = false;

            } else {
                btnBrowse.disabled = true;
                btnFoto.disabled = true;
            }
        });
    });
});

previewImage.src = "";
setActionButtons({
    browse: false,
    foto: false,
    simpan: false,
    hapus: false
});;

// #endregion
