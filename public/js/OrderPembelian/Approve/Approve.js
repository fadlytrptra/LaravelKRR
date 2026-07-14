let selectedNoTrans = null;

let btnDownloadAttachment =
    document.getElementById("btnDownloadAttachment");

let fotoBarangContainer =
    document.getElementById("FotoBarangContainer");

let fotoBarang =
    document.getElementById("FotoBarang");


// ======================================================
// BUTTON ATTACHMENT
// ======================================================

function updateAttachmentButton(hasFile) {
    btnDownloadAttachment.classList.remove(
        "btn-warning",
        "btn-danger"
    );

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

            if (
                response.status === 204 ||
                !response.ok
            ) {
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

    btnDownloadAttachment.addEventListener(
        "click",
        function () {

            if (!selectedNoTrans) {

                Swal.fire({
                    icon: "warning",
                    title: "No Trans belum dipilih"
                });

                return;
            }


            let checkUrl =
                `/FinalApprove/getDokumentasi/${selectedNoTrans}`;

            let downloadUrl =
                `/FinalApprove/downloadDokumentasi/${selectedNoTrans}`;


            fetch(checkUrl)

                .then(response => {

                    if (
                        response.status === 204 ||
                        !response.ok
                    ) {

                        updateAttachmentButton(false);

                        Swal.fire({
                            icon: "warning",
                            title: "Dokumentasi tidak ada"
                        });

                        return;
                    }


                    updateAttachmentButton(true);

                    window.location.href =
                        downloadUrl;

                })

                .catch(() => {

                    updateAttachmentButton(false);

                    Swal.fire({
                        icon: "error",
                        title: "Gagal mengecek dokumentasi"
                    });

                });

        }
    );
}


// ======================================================
// PREVIEW FOTO BARANG
// ======================================================

if (fotoBarang) {

    fotoBarang.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            if (!this.src) {
                return;
            }


            Swal.fire({

                title: "Foto Barang",

                html: `
                    <div class="preview-foto-wrapper">
                        <img
                            src="${this.src}"
                            class="preview-foto-besar"
                            alt="Foto Barang"
                        >
                    </div>
                `,

                width: "700px",

                showConfirmButton: false,

                showCloseButton: true,

                // SweetAlert menangani ESC sendiri
                allowEscapeKey: true,

                // Klik backdrop menutup preview
                allowOutsideClick: true,

                // Penting karena ada Bootstrap modal di belakang
                keydownListenerCapture: true

            });

        }
    );
}


// ======================================================
// DETAIL APPROVE
// ======================================================

$(function () {

    $(".DetailApprove").on(
        "click",
        function (e) {

            e.preventDefault();


            selectedNoTrans =
                $(this).data("id");


            // ======================================================
            // RESET FOTO SEBELUM LOAD DATA BARU
            // ======================================================

            if (fotoBarang) {
                fotoBarang.removeAttribute("src");
            }

            if (fotoBarangContainer) {
                fotoBarangContainer.style.display =
                    "none";
            }


            // ======================================================
            // ATTACHMENT
            // ======================================================

            updateAttachmentButton(false);

            checkAttachmentStatus(
                selectedNoTrans
            );


            // ======================================================
            // JUDUL
            // ======================================================

            document.getElementById(
                "judul"
            ).innerHTML =
                "No Trans " +
                selectedNoTrans;


            // ======================================================
            // AJAX DETAIL
            // ======================================================

            $.ajax({

                url:
                    window.location.origin +
                    "/Approve/" +
                    $(this).data("id") +
                    "/show",

                type: "get",


                beforeSend: function () {

                    $("#loading-screen").css(
                        "display",
                        "flex"
                    );

                },


                success: function (data) {


                    // ======================================================
                    // FOTO BARANG
                    // ======================================================

                    if (fotoBarang) {
                        fotoBarang.removeAttribute(
                            "src"
                        );
                    }

                    if (fotoBarangContainer) {
                        fotoBarangContainer.style.display =
                            "none";
                    }


                    if (
                        data.fotoBase64 &&
                        fotoBarang &&
                        fotoBarangContainer
                    ) {

                        fotoBarang.src =
                            data.fotoBase64;

                        fotoBarangContainer.style.display =
                            "block";

                    }


                    // ======================================================
                    // KATEGORI
                    // ======================================================

                    document.getElementById(
                        "KategoriUtama"
                    ).innerHTML =
                        "Kategori Utama: " +
                        data.data.KatUtama;


                    document.getElementById(
                        "Kategori"
                    ).innerHTML =
                        "Kategori: " +
                        data.data.kategori;


                    document.getElementById(
                        "SubKategori"
                    ).innerHTML =
                        "Sub Kategori: " +
                        data.data.SubKat;


                    // ======================================================
                    // NAMA BARANG
                    // ======================================================

                    document.getElementById(
                        "NamaBarang"
                    ).innerHTML =

                        "Nama Barang: " +

                        data.data.NamaBarang
                            .replace(
                                /</g,
                                "&lt;"
                            )
                            .replace(
                                />/g,
                                "&gt;"
                            )

                        +

                        "<text " +
                        "class='material-symbols-outlined' " +
                        "style='font-size:20px' " +
                        "id='iconKategoriBarang'>" +
                        "expand_more" +
                        "</text>";


                    // ======================================================
                    // QTY
                    // ======================================================

                    document.getElementById(
                        "Qty"
                    ).innerHTML =

                        "Qty Order: " +

                        data.data.Qty +

                        " " +

                        data.data.Nama_satuan;


                    // ======================================================
                    // DIVISI
                    // ======================================================

                    document.getElementById(
                        "Divisi"
                    ).innerHTML =

                        "Divisi: " +

                        data.data.Kd_div;


                    // ======================================================
                    // PEMESAN
                    // ======================================================

                    if (
                        data.data.Pemesan == null ||
                        data.data.Pemesan.length === 0
                    ) {

                        $("#Pemesan").hide();

                    } else {

                        $("#Pemesan").show();

                        document.getElementById(
                            "Pemesan"
                        ).innerHTML =

                            "Pemesan: " +

                            data.data.Pemesan;

                    }


                    // ======================================================
                    // USER
                    // ======================================================

                    document.getElementById(
                        "User"
                    ).innerHTML =

                        "User: " +

                        data.data.User;


                    // ======================================================
                    // STATUS BELI
                    // ======================================================

                    if (
                        data.data.StatusBeli == 1
                    ) {

                        document.getElementById(
                            "Status"
                        ).innerHTML =

                            "Status: Pengadaan Pembelian";

                    } else {

                        document.getElementById(
                            "Status"
                        ).innerHTML =

                            "Status: Beli Sendiri";

                    }


                    // ======================================================
                    // TANGGAL DIBUTUHKAN
                    // ======================================================

                    let date =
                        (
                            "0" +

                            new Date(
                                data.data.Tgl_Dibutuhkan
                            ).getDate()

                        ).slice(-2);


                    let month =
                        (
                            "0" +

                            (
                                new Date(
                                    data.data.Tgl_Dibutuhkan
                                ).getMonth() + 1
                            )

                        ).slice(-2);


                    let year =
                        new Date(
                            data.data.Tgl_Dibutuhkan
                        ).getFullYear();


                    let format =
                        month +
                        "/" +
                        date +
                        "/" +
                        year;


                    document.getElementById(
                        "TglButuh"
                    ).innerHTML =

                        "Tgl. Dibutuhkan: " +

                        format;


                    // ======================================================
                    // KETERANGAN ORDER
                    // ======================================================

                    if (
                        !data.data.keterangan ||
                        data.data.keterangan.length === 0
                    ) {

                        $("#KetOrder").hide();

                    } else {

                        $("#KetOrder").show();

                        document.getElementById(
                            "KetOrder"
                        ).innerHTML =

                            "Ket. Order: " +

                            data.data.keterangan;

                    }


                    // ======================================================
                    // KETERANGAN INTERNAL
                    // ======================================================

                    if (
                        !data.data.Ket_Internal ||
                        data.data.Ket_Internal.length === 0
                    ) {

                        document.getElementById(
                            "KetInternal"
                        ).innerHTML =

                            "Ket. Internal: -";

                    } else {

                        document.getElementById(
                            "KetInternal"
                        ).innerHTML =

                            "Ket. Internal: " +

                            data.data.Ket_Internal;

                    }


                    // ======================================================
                    // PEMBELIAN TERAKHIR
                    // ======================================================

                    $("#PembelianTerakhir").show();


                    if (
                        !data.dataBeliTerakhir ||
                        !data.dataBeliTerakhir[0]
                    ) {

                        $("#PembelianTerakhir").hide();

                    } else {

                        $("#PembelianTerakhir").show();


                        let date4 =
                            (
                                "0" +

                                new Date(
                                    data.dataBeliTerakhir[0]
                                        .Tgl_order
                                ).getDate()

                            ).slice(-2);


                        let month4 =
                            (
                                "0" +

                                (
                                    new Date(
                                        data.dataBeliTerakhir[0]
                                            .Tgl_order
                                    ).getMonth() + 1
                                )

                            ).slice(-2);


                        let year4 =
                            new Date(
                                data.dataBeliTerakhir[0]
                                    .Tgl_order
                            ).getFullYear();


                        let format4 =
                            month4 +
                            "/" +
                            date4 +
                            "/" +
                            year4;


                        document.getElementById(
                            "PembelianTerakhir"
                        ).innerHTML =

                            "PembelianTerakhir: " +

                            format4 +

                            "<br>Supplier: " +

                            data.dataBeliTerakhir[0]
                                .NM_SUP +

                            "<br>Harga Unit: " +

                            rupiah(
                                data.dataBeliTerakhir[0]
                                    .PriceUnit
                            );

                    }

                },


                error: function (
                    xhr,
                    status,
                    error
                ) {

                    console.error(
                        xhr.responseText
                    );


                    Swal.fire({

                        icon: "error",

                        title:
                            "Gagal mengambil detail",

                        text:
                            "Terjadi kesalahan saat mengambil data."

                    });

                },


                complete: function () {

                    $("#loading-screen").css(
                        "display",
                        "none"
                    );

                }

            });


            // ======================================================
            // ACTION FORM
            // ======================================================

            let $url =
                $(this).attr("href");


            $(".formDetail").attr(
                "action",
                $url
            );


            // ======================================================
            // TAMPILKAN MODAL
            // ======================================================

            $("#loading").show();

            $("#DivDetailData").hide();


            $("#modalDetailApprove").modal({

                // Dibuat true agar klik luar Bootstrap
                // tidak menutup modal secara otomatis.
                // Kita tangani sendiri di event bawah.
                backdrop: true,

                // Bootstrap tidak menangani ESC.
                // Kita tangani sendiri.
                keyboard: false

            });


            $("#modalDetailApprove").modal(
                "show"
            );


            $("body.modal-open")
                .removeAttr("style");


            setTimeout(
                function () {

                    $("#DivDetailData").show();

                    $("#loading").hide();

                },
                1000
            );

        }
    );

});


// ======================================================
// ESC
// ======================================================
//
// Gunakan keyup, bukan keydown.
//
// Saat preview foto terbuka:
// SweetAlert menangani ESC pada keydown dan menutup dirinya.
//
// Ketika keyup terjadi, kita cek apakah ESC tadi berasal dari
// preview SweetAlert menggunakan flag.
// ======================================================

let escFromSwal = false;


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            Swal.isVisible()
        ) {

            // Tandai bahwa ESC digunakan
            // untuk menutup SweetAlert.
            escFromSwal = true;

        }

    },
    true
);


document.addEventListener(
    "keyup",
    function (event) {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        // ESC tadi digunakan untuk preview foto.
        // Jangan tutup modal Detail Approve.
        if (escFromSwal) {

            escFromSwal = false;

            return;

        }


        // Tidak ada SweetAlert.
        // Tutup modal Detail Approve.
        let modalEl =
            document.getElementById(
                "modalDetailApprove"
            );


        if (
            modalEl.classList.contains(
                "show"
            )
        ) {

            $("#modalDetailApprove").modal(
                "hide"
            );

        }

    }
);


// ======================================================
// KLIK DI LUAR MODAL DETAIL
// ======================================================

document.addEventListener(
    "click",
    function (event) {

        // Jika klik berasal dari SweetAlert,
        // jangan tutup modal Detail Approve.
        if (
            event.target.closest(
                ".swal2-container"
            )
        ) {
            return;
        }


        let modalEl =
            document.getElementById(
                "modalDetailApprove"
            );


        if (
            !modalEl.classList.contains(
                "show"
            )
        ) {
            return;
        }


        let modalDialog =
            modalEl.querySelector(
                ".modal-dialog"
            );


        if (
            !modalDialog.contains(
                event.target
            )
        ) {

            $("#modalDetailApprove").modal(
                "hide"
            );

        }

    },
    true
);


// ======================================================
// RESET SAAT MODAL DITUTUP
// ======================================================

$("#modalDetailApprove").on(
    "hidden.bs.modal",
    function () {

        selectedNoTrans = null;


        if (btnDownloadAttachment) {

            btnDownloadAttachment
                .classList
                .remove(
                    "btn-warning",
                    "btn-danger"
                );

        }


        if (fotoBarang) {

            fotoBarang.removeAttribute(
                "src"
            );

        }


        if (fotoBarangContainer) {

            fotoBarangContainer.style.display =
                "none";

        }

    }
);
