let selectedNoTrans = null;
let btnDownloadAttachment = document.getElementById("btnDownloadAttachment");
let fotoBarangContainer = document.getElementById("FotoBarangContainer");
let fotoBarang = document.getElementById("FotoBarang");

function updateAttachmentButton(hasFile) {
    btnDownloadAttachment.classList.remove("btn-warning", "btn-danger");

    if (hasFile) {
        btnDownloadAttachment.classList.add("btn-warning");
    } else {
        btnDownloadAttachment.classList.add("btn-danger");
    }
}

function checkAttachmentStatus(noTrans) {
    if (!noTrans) return;

    fetch(`/FinalApprove/getDokumentasi/${noTrans}`)
        .then(response => {
            if (response.status === 204 || !response.ok) {
                updateAttachmentButton(false);
            } else {
                updateAttachmentButton(true);
            }
        })
        .catch(() => {
            updateAttachmentButton(false);
        });
}

if (btnDownloadAttachment) {
    btnDownloadAttachment.addEventListener("click", function () {
        if (!selectedNoTrans) {
            Swal.fire({
                icon: "warning",
                title: "No Trans belum dipilih"
            });
            return;
        }

        let checkUrl = `/FinalApprove/getDokumentasi/${selectedNoTrans}`;
        let downloadUrl = `/FinalApprove/downloadDokumentasi/${selectedNoTrans}`;

        fetch(checkUrl)
            .then(response => {
                if (response.status === 204 || !response.ok) {
                    updateAttachmentButton(false);
                    Swal.fire({
                        icon: "warning",
                        title: "Dokumentasi tidak ada"
                    });
                    return;
                }

                updateAttachmentButton(true);
                window.location.href = downloadUrl;
            })
            .catch(() => {
                updateAttachmentButton(false);
                Swal.fire({
                    icon: "error",
                    title: "Gagal mengecek dokumentasi"
                });
            });
    });
}


if (fotoBarang) {
    fotoBarang.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (!this.src) {
            return;
        }

        let zoomLevel = 1;
        let posX = 0;
        let posY = 0;
        let isDragging = false;
        let startX = 0;
        let startY = 0;

        Swal.fire({
            title: "Foto Barang",
            html: `
                <div
                    id="previewFotoWrapper"
                    class="preview-foto-wrapper"
                    style="
                        width: 100%;
                        height: 500px;
                        overflow: hidden;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: default;
                    "
                >
                    <img
                        id="previewFotoBesar"
                        src="${this.src}"
                        class="preview-foto-besar"
                        alt="Foto Barang"
                        draggable="false"
                        style="
                            max-width: 100%;
                            max-height: 100%;
                            object-fit: contain;
                            user-select: none;
                            transform-origin: center center;
                        "
                    >
                </div>
            `,
            width: "900px",
            showConfirmButton: false,
            showCloseButton: true,
            allowEscapeKey: true,
            allowOutsideClick: true,
            keydownListenerCapture: true,

            didOpen: function () {
                const previewWrapper = document.getElementById("previewFotoWrapper");
                const previewFoto = document.getElementById("previewFotoBesar");

                function updateZoom() {
                    previewFoto.style.transform =
                        `translate(${posX}px, ${posY}px) scale(${zoomLevel})`;

                    previewWrapper.style.cursor =
                        zoomLevel > 1
                            ? (isDragging ? "grabbing" : "grab")
                            : "default";
                }

                previewWrapper.addEventListener(
                    "wheel",
                    function (event) {
                        event.preventDefault();

                        if (event.deltaY < 0) {
                            zoomLevel = Math.min(zoomLevel + 0.25, 5);
                        } else {
                            zoomLevel = Math.max(zoomLevel - 0.25, 1);
                        }

                        if (zoomLevel === 1) {
                            posX = 0;
                            posY = 0;
                        }

                        updateZoom();
                    },
                    { passive: false }
                );

                previewFoto.addEventListener("mousedown", function (event) {
                    if (zoomLevel <= 1) {
                        return;
                    }

                    isDragging = true;
                    startX = event.clientX - posX;
                    startY = event.clientY - posY;
                    previewWrapper.style.cursor = "grabbing";
                });

                document.addEventListener("mousemove", function (event) {
                    if (!isDragging) {
                        return;
                    }

                    posX = event.clientX - startX;
                    posY = event.clientY - startY;
                    updateZoom();
                });

                document.addEventListener("mouseup", function () {
                    isDragging = false;

                    if (zoomLevel > 1) {
                        previewWrapper.style.cursor = "grab";
                    }
                });

                updateZoom();
            }
        });
    });
}

// ======================================================
// DETAIL APPROVE
// ======================================================

$(function () {
    $(".DetailApprove").on("click", function (e) {
        e.preventDefault();
        selectedNoTrans = $(this).data("id");

        if (fotoBarang) {
            fotoBarang.removeAttribute("src");
        }

        if (fotoBarangContainer) {
            fotoBarangContainer.style.display = "none";
        }

        updateAttachmentButton(false);
        checkAttachmentStatus(selectedNoTrans);

        document.getElementById("judul").innerHTML = "No Trans " + selectedNoTrans;

        $.ajax({
            url: window.location.origin + "/Approve/" + $(this).data("id") + "/show",
            type: "get",

            beforeSend: function () {
                $("#loading-screen").css("display", "flex");
            },

            success: function (data) {
                if (fotoBarang) {
                    fotoBarang.removeAttribute("src");
                }

                if (fotoBarangContainer) {
                    fotoBarangContainer.style.display = "none";
                }

                if (data.fotoBase64 && fotoBarang && fotoBarangContainer) {
                    fotoBarang.src = data.fotoBase64;
                    fotoBarangContainer.style.display = "block";
                }

                document.getElementById("KategoriUtama").innerHTML = "Kategori Utama: " + data.data.KatUtama;
                document.getElementById("Kategori").innerHTML = "Kategori: " + data.data.kategori;
                document.getElementById("SubKategori").innerHTML = "Sub Kategori: " + data.data.SubKat;
                document.getElementById("NamaBarang").innerHTML =
                    "Nama Barang: " +
                    data.data.NamaBarang
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;") +
                    "<text " +
                    "class='material-symbols-outlined' " +
                    "style='font-size:20px' " +
                    "id='iconKategoriBarang'>" +
                    "expand_more" +
                    "</text>";

                document.getElementById("Qty").innerHTML =
                    "Qty Order: " + data.data.Qty + " " + data.data.Nama_satuan;

                document.getElementById("Divisi").innerHTML =
                    "Divisi: " + data.data.Kd_div;

                if (data.data.Pemesan == null || data.data.Pemesan.length === 0) {
                    $("#Pemesan").hide();
                } else {
                    $("#Pemesan").show();
                    document.getElementById("Pemesan").innerHTML =
                        "Pemesan: " + data.data.Pemesan;
                }

                document.getElementById("User").innerHTML =
                    "User: " + data.data.User;

                if (data.data.StatusBeli == 1) {
                    document.getElementById("Status").innerHTML =
                        "Status: Pengadaan Pembelian";
                } else {
                    document.getElementById("Status").innerHTML =
                        "Status: Beli Sendiri";
                }

                // ======================================================
                // TANGGAL DIBUTUHKAN
                // ======================================================

                let date = (
                    "0" + new Date(data.data.Tgl_Dibutuhkan).getDate()
                ).slice(-2);

                let month = (
                    "0" + (new Date(data.data.Tgl_Dibutuhkan).getMonth() + 1)
                ).slice(-2);

                let year = new Date(data.data.Tgl_Dibutuhkan).getFullYear();

                let format = month + "/" + date + "/" + year;

                document.getElementById("TglButuh").innerHTML =
                    "Tgl. Dibutuhkan: " + format;

                // ======================================================
                // KETERANGAN ORDER
                // ======================================================

                if (!data.data.keterangan || data.data.keterangan.length === 0) {
                    $("#KetOrder").hide();
                } else {
                    $("#KetOrder").show();
                    document.getElementById("KetOrder").innerHTML =
                        "Ket. Order: " + data.data.keterangan;
                }

                // ======================================================
                // KETERANGAN INTERNAL
                // ======================================================

                if (!data.data.Ket_Internal || data.data.Ket_Internal.length === 0) {
                    document.getElementById("KetInternal").innerHTML =
                        "Ket. Internal: -";
                } else {
                    document.getElementById("KetInternal").innerHTML =
                        "Ket. Internal: " + data.data.Ket_Internal;
                }

                // ======================================================
                // PEMBELIAN TERAKHIR
                // ======================================================

                $("#PembelianTerakhir").show();

                if (!data.dataBeliTerakhir || !data.dataBeliTerakhir[0]) {
                    $("#PembelianTerakhir").hide();
                } else {
                    $("#PembelianTerakhir").show();

                    let date4 = (
                        "0" +
                        new Date(data.dataBeliTerakhir[0].Tgl_order).getDate()
                    ).slice(-2);

                    let month4 = (
                        "0" +
                        (new Date(data.dataBeliTerakhir[0].Tgl_order).getMonth() + 1)
                    ).slice(-2);

                    let year4 = new Date(
                        data.dataBeliTerakhir[0].Tgl_order
                    ).getFullYear();

                    let format4 = month4 + "/" + date4 + "/" + year4;

                    document.getElementById("PembelianTerakhir").innerHTML =
                        "PembelianTerakhir: " +
                        format4 +
                        "<br>Supplier: " +
                        data.dataBeliTerakhir[0].NM_SUP +
                        "<br>Harga Unit: " +
                        rupiah(data.dataBeliTerakhir[0].PriceUnit);
                }
            },

            error: function (xhr, status, error) {
                console.error(xhr.responseText);

                Swal.fire({
                    icon: "error",
                    title: "Gagal mengambil detail",
                    text: "Terjadi kesalahan saat mengambil data."
                });
            },

            complete: function () {
                $("#loading-screen").css("display", "none");
            }
        });

        // ======================================================
        // ACTION FORM
        // ======================================================

        let $url = $(this).attr("href");
        $(".formDetail").attr("action", $url);

        // ======================================================
        // TAMPILKAN MODAL
        // ======================================================

        $("#loading").show();
        $("#DivDetailData").hide();

        $("#modalDetailApprove").modal({
            backdrop: true,
            keyboard: false
        });

        $("#modalDetailApprove").modal("show");
        $("body.modal-open").removeAttr("style");

        setTimeout(function () {
            $("#DivDetailData").show();
            $("#loading").hide();
        }, 1000);
    });
});

let escFromSwal = false;

document.addEventListener(
    "keydown",
    function (event) {
        if (event.key === "Escape" && Swal.isVisible()) {
            escFromSwal = true;
        }
    },
    true
);

document.addEventListener("keyup", function (event) {
    if (event.key !== "Escape") {
        return;
    }

    if (escFromSwal) {
        escFromSwal = false;
        return;
    }

    let modalEl = document.getElementById("modalDetailApprove");

    if (modalEl.classList.contains("show")) {
        $("#modalDetailApprove").modal("hide");
    }
});


document.addEventListener(
    "click",
    function (event) {
        if (event.target.closest(".swal2-container")) {
            return;
        }

        let modalEl = document.getElementById("modalDetailApprove");
        if (!modalEl.classList.contains("show")) {
            return;
        }

        let modalDialog = modalEl.querySelector(".modal-dialog");
        if (!modalDialog.contains(event.target)) {
            $("#modalDetailApprove").modal("hide");
        }
    },
    true
);


$("#modalDetailApprove").on("hidden.bs.modal", function () {
    selectedNoTrans = null;

    if (btnDownloadAttachment) {
        btnDownloadAttachment.classList.remove("btn-warning", "btn-danger");
    }

    if (fotoBarang) {
        fotoBarang.removeAttribute("src");
    }

    if (fotoBarangContainer) {
        fotoBarangContainer.style.display = "none";
    }
});

