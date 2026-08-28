let cetak_belumACC = document.getElementById("cetak_belumACC");
let cetak_sudahACC = document.getElementById("cetak_sudahACC");
let tanggal_do = document.getElementById("tanggal_do");
let nomor_referensi = document.getElementById("nomor_referensi");
let print_button = document.getElementById("print_button");
let export_pdf = document.getElementById("export_pdf");
let contoh_print = document.getElementById("contoh_print");
let contoh_printDiv = document.getElementById("contoh_printDiv");
let body_deliveryOrderBelumACC = document.getElementById(
    "body_deliveryOrderBelumACC"
);
let body_deliveryOrderSudahACC = document.getElementById(
    "body_deliveryOrderSudahACC"
);
let nama_customerKolom = document.getElementById("nama_customerKolom");
let tanggal_kirimKolom = document.getElementById("tanggal_kirimKolom");
let nomor_referensiKolom = document.getElementById("nomor_referensiKolom");
let count_do = document.getElementById("count_do");
let div_cetakDOSudahACC = document.getElementById("div_cetakDOSudahACC");
let div_cetakDOBelumACC = document.getElementById("div_cetakDOBelumACC");

// ============================================================
// HELPER
// ============================================================

function escapeHtml(value) {
    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatAddress(value) {
    return escapeHtml(value)
        .replace(/\r\n/g, "<br>")
        .replace(/\n/g, "<br>")
        .replace(/\r/g, "<br>");
}

function formatNumber(value, decimals = 2) {
    if (value === null || value === undefined || value === "") {
        return "";
    }

    const number = Number(value);

    if (Number.isNaN(number)) {
        return escapeHtml(value);
    }

    return number.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
}

// ============================================================
// CSS TEMPLATE PRINT
// ============================================================

function injectPrintTemplateStyle() {
    if (document.getElementById("do-print-template-style")) {
        return;
    }

    const style = document.createElement("style");

    style.id = "do-print-template-style";

    style.innerHTML = `
        /* =====================================================
           CONTAINER SETIAP DO
        ===================================================== */

        .do-print-card {
            width: 100%;
            box-sizing: border-box;

            border: 1px solid #222;

            background: #fff;

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            font-size: 10px;

            line-height: 1.25;

            color: #111;

            margin: 0 0 7px 0;

            padding: 7px 9px 5px 9px;

            page-break-inside: avoid;
            break-inside: avoid;
        }

        .do-print-card * {
            box-sizing: border-box;
        }


        /* =====================================================
           BAGIAN ATAS
           KIRI : CUSTOMER
           KANAN: SPESIFIKASI
        ===================================================== */

        .do-print-top {
            display: grid;

            grid-template-columns:
                57%
                43%;

            column-gap: 8px;

            align-items: start;
        }

        .do-print-left,
        .do-print-right {
            min-width: 0;
        }


        /* =====================================================
           BARIS INFORMASI
        ===================================================== */

        .do-print-row {
            display: grid;

            grid-template-columns:
                82px
                1fr;

            min-height: 17px;

            align-items: start;
        }

        .do-print-right .do-print-row {
            grid-template-columns:
                65px
                1fr;
        }


        /* =====================================================
           LABEL
        ===================================================== */

        .do-print-label {
            font-weight: 700;

            white-space: nowrap;

            padding-right: 4px;
        }


        /* =====================================================
           VALUE
        ===================================================== */

        .do-print-value {
            overflow-wrap: anywhere;

            word-break: break-word;
        }


        /* =====================================================
           SPESIFIKASI
        ===================================================== */

        .do-print-spec {
            font-weight: 700;

            line-height: 1.2;
        }

        .do-print-spec-item {
            font-weight: 400;

            margin-top: 1px;
        }


        /* =====================================================
           JUMLAH
        ===================================================== */

        .do-print-quantity {
            display: grid;

            grid-template-columns:
                30px
                78px
                1fr;

            align-items: start;

            min-height: 17px;
        }

        .do-print-quantity .qty-label {
            font-weight: 400;
        }

        .do-print-quantity .qty-value {
            text-align: left;

            white-space: nowrap;
        }

        .do-print-quantity .qty-unit {
            padding-left: 3px;

            white-space: nowrap;
        }


        /* =====================================================
           KETERANGAN
        ===================================================== */

        .do-print-note {
            display: grid;

            grid-template-columns:
                82px
                1fr;

            margin-top: 5px;

            padding-top: 3px;

            min-height: 30px;
        }

        .do-print-note-label {
            font-weight: 700;
        }

        .do-print-note-value {
            text-align: left;

            overflow-wrap: anywhere;

            word-break: break-word;
        }


        /* =====================================================
           NOMOR URUT
        ===================================================== */

        .do-print-page {
            text-align: right;

            font-size: 9px;

            margin-top: 3px;
        }


        /* =====================================================
           CONTAINER UTAMA
        ===================================================== */

        #div_cetakDOBelumACC,
        #div_cetakDOSudahACC {
            width: 100%;
        }


        /* =====================================================
           PRINT
        ===================================================== */

        @media print {

            .do-print-card {
                margin-bottom: 5px;

                padding:
                    6px
                    8px
                    4px
                    8px;

                font-size: 9.5px;
            }

            .do-print-row {
                grid-template-columns:
                    78px
                    1fr;

                min-height: 16px;
            }

            .do-print-right .do-print-row {
                grid-template-columns:
                    62px
                    1fr;
            }

            .do-print-note {
                grid-template-columns:
                    78px
                    1fr;

                margin-top: 4px;

                min-height: 25px;
            }

            .do-print-page {
                font-size: 8px;

                margin-top: 2px;
            }
        }
    `;

    document.head.appendChild(style);
}


// ============================================================
// TEMPLATE DO
// ============================================================

function renderDOTemplate(
    option,
    index,
    minKirimSekunderValue,
    keterangan
) {
    const satuanJual = escapeHtml(
        (option.SatuanJual || "").trim()
    );

    const satuanTritier = escapeHtml(
        (
            option.SatuanTritier ||
            option.satTritier ||
            ""
        ).trim()
    );

    const namaKelompok = escapeHtml(
        option.NamaKelompok
    );

    const namaBarang = escapeHtml(
        option.NamaBarang
    );

    const corak = escapeHtml(
        option.Corak
    );

    const namaCust = escapeHtml(
        option.NamaCust
    );

    const alamatKirim = formatAddress(
        option.AlamatKirim
    );

    const idSuratPesanan = escapeHtml(
        option.IDSuratPesanan
    );

    const noPo = escapeHtml(
        option.NO_PO
    );

    const alamatKantor = formatAddress(
        option.Alamat
    );

    const jenisCustomer = escapeHtml(
        option.JenisCustomer
    );

    const minKirim = formatNumber(
        option.MinKirimDO
    );

    const maxKirim = formatNumber(
        option.MaxKirimDO
    );

    const minSekunder = formatNumber(
        minKirimSekunderValue
    );


    return `
        <div class="do-print-card"
            style="
                font-size: 14px;
                line-height: 1.15;
            ">

            <div class="do-print-top">

                <!-- =========================
                    KIRI
                ========================== -->

                <div class="do-print-left">

                    <div class="do-print-row"
                        style="
                            font-size: 14px;
                            grid-template-columns: 105px 1fr;
                            min-height: 18px;
                        ">

                        <div class="do-print-label"
                            style="
                                font-size: 14px;
                                font-weight: 700;
                                white-space: nowrap;
                            ">
                            Pelanggan:
                        </div>

                        <div class="do-print-value"
                            style="
                                font-size: 14px;
                            ">
                            ${namaCust}
                        </div>

                    </div>


                    <div class="do-print-row"
                        style="
                            font-size: 14px;
                            grid-template-columns: 105px 1fr;
                            min-height: 18px;
                        ">

                        <div class="do-print-label"
                            style="
                                font-size: 14px;
                                font-weight: 700;
                                white-space: nowrap;
                            ">
                            Alamat Kirim:
                        </div>

                        <div class="do-print-value"
                            style="
                                font-size: 14px;
                            ">
                            ${alamatKirim}
                        </div>

                    </div>


                    <div class="do-print-row"
                        style="
                            font-size: 14px;
                            grid-template-columns: 105px 1fr;
                            min-height: 18px;
                        ">

                        <div class="do-print-label"
                            style="
                                font-size: 14px;
                                font-weight: 700;
                                white-space: nowrap;
                            ">
                            No. SP:
                        </div>

                        <div class="do-print-value"
                            style="
                                font-size: 14px;
                            ">
                            ${idSuratPesanan}
                        </div>

                    </div>


                    <div class="do-print-row"
                        style="
                            font-size: 14px;
                            grid-template-columns: 105px 1fr;
                            min-height: 18px;
                        ">

                        <div class="do-print-label"
                            style="
                                font-size: 14px;
                                font-weight: 700;
                                white-space: nowrap;
                            ">
                            No. PO:
                        </div>

                        <div class="do-print-value"
                            style="
                                font-size: 14px;
                            ">
                            ${noPo}
                        </div>

                    </div>


                    <div class="do-print-row"
                        style="
                            font-size: 14px;
                            grid-template-columns: 105px 1fr;
                            min-height: 18px;
                        ">

                        <div class="do-print-label"
                            style="
                                font-size: 14px;
                                font-weight: 700;
                                white-space: nowrap;
                            ">
                            Alamat Kantor:
                        </div>

                        <div class="do-print-value"
                            style="
                                font-size: 14px;
                            ">
                            ${alamatKantor}
                        </div>

                    </div>

                </div>


                <!-- =========================
                    KANAN
                ========================== -->

                <div class="do-print-right">

                    <div class="do-print-row"
                        style="
                            font-size: 14px;
                            grid-template-columns: 90px 1fr;
                            min-height: 18px;
                        ">

                        <div class="do-print-label"
                            style="
                                font-size: 14px;
                                font-weight: 700;
                                white-space: nowrap;
                            ">
                            Spesifikasi:
                        </div>

                        <div class="do-print-value"
                            style="
                                font-size: 14px;
                            ">

                            <span style="
                                font-size: 14px;
                                font-weight: 700;
                            ">
                                Ukuran: ${namaKelompok}
                            </span>

                            <div style="
                                font-size: 14px;
                                font-weight: 400;
                                margin-top: 1px;
                            ">
                                ${namaBarang}
                            </div>

                        </div>

                    </div>


                    <!-- CORAK -->

                    <div class="do-print-row"
                        style="
                            font-size: 14px;
                            grid-template-columns: 90px 1fr;
                            min-height: 18px;
                        ">

                        <div class="do-print-label"
                            style="
                                font-size: 14px;
                                font-weight: 700;
                                white-space: nowrap;
                            ">
                            Corak:
                        </div>

                        <div class="do-print-value"
                            style="
                                font-size: 14px;
                            ">
                            ${corak}
                        </div>

                    </div>


                    <!-- MIN -->

                    <div class="do-print-quantity"
                        style="
                            font-size: 14px;
                            min-height: 18px;
                        ">

                        <div></div>

                        <div class="qty-label"
                            style="
                                font-size: 14px;
                                font-weight: 400;
                            ">
                            Min:
                        </div>

                        <div class="qty-value"
                            style="
                                font-size: 14px;
                                white-space: nowrap;
                            ">
                            ${minKirim}

                            <span style="
                                font-size: 14px;
                                padding-left: 3px;
                            ">
                                ${satuanJual}
                            </span>
                        </div>

                    </div>


                    <!-- MAX -->

                    <div class="do-print-quantity"
                        style="
                            font-size: 14px;
                            min-height: 18px;
                        ">

                        <div></div>

                        <div class="qty-label"
                            style="
                                font-size: 14px;
                                font-weight: 400;
                            ">
                            Max:
                        </div>

                        <div class="qty-value"
                            style="
                                font-size: 14px;
                                white-space: nowrap;
                            ">
                            ${maxKirim}

                            <span style="
                                font-size: 14px;
                                padding-left: 3px;
                            ">
                                ${satuanJual}
                            </span>
                        </div>

                    </div>


                    <!-- JENIS CUSTOMER -->

                    <div style="
                        display: grid;
                        grid-template-columns: 110px 1fr;
                        align-items: start;
                        font-size: 14px;
                        min-height: 18px;
                    ">

                        <div style="
                            width: 110px;
                            min-width: 110px;
                            font-size: 14px;
                            font-weight: 700;
                            white-space: nowrap;
                        ">
                            Jenis Customer:
                        </div>

                        <div style="
                            font-size: 14px;
                            white-space: nowrap;
                            padding-left: 8px;
                        ">
                            ${jenisCustomer || ""}
                        </div>

                    </div>

                </div>

            </div>


            <!-- =========================
                KETERANGAN
            ========================== -->

            <div class="do-print-note"
                style="
                    font-size: 14px;
                    grid-template-columns: 105px 1fr;
                    margin-top: 5px;
                ">

                <div class="do-print-note-label"
                    style="
                        font-size: 14px;
                        font-weight: 700;
                        white-space: nowrap;
                    ">
                    Keterangan:
                </div>

                <div class="do-print-note-value"
                    style="
                        font-size: 14px;
                        line-height: 1.2;
                    ">
                    ${formatAddress(keterangan)}
                </div>

            </div>


            <!-- =========================
                NOMOR URUT
            ========================== -->

            <div class="do-print-page"
                style="
                    font-size: 10px;
                    margin-top: 2px;
                ">
                ${index + 1}
            </div>

        </div>
    `;
}


// ============================================================
// LOAD FORM
// ============================================================

tanggal_do.valueAsDate = new Date();

cetak_sudahACC.checked = true;

contoh_print.style.display = "none";

contoh_printDiv.style.display = "none";

export_pdf.style.display = "none";

print_pdf.style.display = "none";

injectPrintTemplateStyle();


// ============================================================
// PRINT BUTTON
// ============================================================

print_button.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        $("#loading-screen").css(
            "display",
            "flex"
        );


        // ====================================================
        // VALIDASI NOMOR REFERENSI
        // ====================================================

        if (nomor_referensi.value == "") {

            alert(
                "Isi kolom nomor referensi terlebih dahulu!"
            );

            nomor_referensi.focus();

            $("#loading-screen").css(
                "display",
                "none"
            );

            return;
        }


        // ====================================================
        // TAMPILKAN BUTTON PRINT
        // ====================================================

        export_pdf.style.display =
            "inline-block";

        print_pdf.style.display =
            "inline-block";

        contoh_printDiv.style.display =
            "block";

        contoh_print.style.display =
            "inline-block";


        // ====================================================
        // BELUM ACC
        // ====================================================

        if (cetak_belumACC.checked == true) {

            fetch(
                "/Kencana/dobelumacc/" +
                tanggal_do.value
            )

                .then(
                    (response) =>
                        response.json()
                )

                .then(
                    (options) => {

                        nomor_referensiKolom.innerHTML =
                            nomor_referensi.value;

                        div_cetakDOSudahACC.innerHTML =
                            "";

                        div_cetakDOBelumACC.innerHTML =
                            "";


                        // ==================================
                        // TANGGAL
                        // ==================================

                        const date =
                            new Date(
                                tanggal_do.value
                            );

                        const formattedDate =
                            date.toLocaleDateString(
                                "en-US",
                                {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                }
                            );

                        tanggal_kirimKolom.innerHTML =
                            formattedDate;


                        console.log(options);


                        // ==================================
                        // LOOP DATA
                        // ==================================

                        options.forEach(
                            (
                                option,
                                index
                            ) => {

                                console.log(
                                    option
                                );


                                // ==============================
                                // NULL -> EMPTY STRING
                                // ==============================

                                for (
                                    let prop in option
                                ) {

                                    if (
                                        option[prop] ===
                                        null
                                    ) {

                                        option[prop] =
                                            "";
                                    }
                                }


                                // ==============================
                                // HITUNG BERAT
                                // ==============================

                                let min_kirimSekunderValue =
                                    0;


                                if (
                                    (
                                        option.SatuanJual ||
                                        ""
                                    )
                                        .trim() ==
                                    "KGM"
                                ) {

                                    if (
                                        typeof option.MinKirimDO ===
                                        "number"
                                    ) {

                                        min_kirimSekunderValue =
                                            option.MinKirimDO.toFixed(
                                                2
                                            );

                                    } else {

                                        let minKirimDO =
                                            parseFloat(
                                                option.MinKirimDO
                                            ).toFixed(
                                                2
                                            );

                                        min_kirimSekunderValue =
                                            minKirimDO;
                                    }

                                } else {

                                    min_kirimSekunderValue =
                                        (
                                            (
                                                Number(
                                                    option.BERAT_TOTAL
                                                ) *
                                                Number(
                                                    option.MinKirimDO
                                                )
                                            ) /
                                            1000
                                        ).toFixed(
                                            2
                                        );
                                }


                                // ==============================
                                // CONTAINER
                                // ==============================

                                const body =
                                    document.createElement(
                                        "div"
                                    );

                                body.classList.add(
                                    "cetak-dopdf-container05"
                                );


                                // ==============================
                                // RENDER
                                // ==============================

                                body.innerHTML =
                                    renderDOTemplate(
                                        option,
                                        index,
                                        min_kirimSekunderValue,
                                        option.Keterangan ||
                                            ""
                                    );


                                // ==============================
                                // APPEND
                                // ==============================

                                div_cetakDOBelumACC.appendChild(
                                    body
                                );
                            }
                        );
                    }
                )

                .catch(
                    (error) => {

                        console.error(
                            "Gagal mengambil data DO:",
                            error
                        );

                        alert(
                            "Terjadi kesalahan saat mengambil data DO."
                        );
                    }
                )

                .finally(
                    () => {

                        $("#loading-screen").css(
                            "display",
                            "none"
                        );
                    }
                );


        // ====================================================
        // SUDAH ACC
        // ====================================================

        } else if (
            cetak_sudahACC.checked == true
        ) {

            fetch(
                "/Kencana/dosudahacc/" +
                tanggal_do.value
            )

                .then(
                    (response) =>
                        response.json()
                )

                .then(
                    (options) => {

                        nomor_referensiKolom.innerHTML =
                            nomor_referensi.value;

                        div_cetakDOSudahACC.innerHTML =
                            "";

                        div_cetakDOBelumACC.innerHTML =
                            "";


                        // ==================================
                        // TANGGAL
                        // ==================================

                        const date =
                            new Date(
                                tanggal_do.value
                            );

                        const formattedDate =
                            date.toLocaleDateString(
                                "en-US",
                                {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                }
                            );

                        tanggal_kirimKolom.innerHTML =
                            formattedDate;


                        console.log(options);


                        // ==================================
                        // LOOP DATA
                        // ==================================

                        options.forEach(
                            (
                                option,
                                index
                            ) => {

                                console.log(
                                    option
                                );


                                // ==============================
                                // HITUNG BERAT
                                // ==============================

                                let min_kirimSekunderValue =
                                    (
                                        Number(
                                            option.BERAT_TOTAL
                                        ) *
                                        Number(
                                            option.MinKirimDO
                                        )
                                    ).toFixed(
                                        3
                                    );


                                // ==============================
                                // CONTAINER
                                // ==============================

                                const body =
                                    document.createElement(
                                        "div"
                                    );

                                body.classList.add(
                                    "cetak-dopdf-container05"
                                );


                                // ==============================
                                // RENDER
                                // ==============================

                                body.innerHTML =
                                    renderDOTemplate(
                                        option,
                                        index,
                                        min_kirimSekunderValue,
                                        option.Keterangan ||
                                            ""
                                    );


                                // ==============================
                                // APPEND
                                // ==============================

                                div_cetakDOSudahACC.appendChild(
                                    body
                                );
                            }
                        );
                    }
                )

                .catch(
                    (error) => {

                        console.error(
                            "Gagal mengambil data DO:",
                            error
                        );

                        alert(
                            "Terjadi kesalahan saat mengambil data DO."
                        );
                    }
                )

                .finally(
                    () => {

                        $("#loading-screen").css(
                            "display",
                            "none"
                        );
                    }
                );


        // ====================================================
        // BELUM PILIH
        // ====================================================

        } else {

            alert(
                "Pilih status DO sudah ACC atau belum ACC dulu!"
            );

            cetak_belumACC.focus();
        }
    }
);


// ============================================================
// ENTER NOMOR REFERENSI
// ============================================================

nomor_referensi.addEventListener(
    "keypress",
    function (event) {

        if (event.key == "Enter") {

            event.preventDefault();


            if (
                nomor_referensi.value == ""
            ) {

                alert(
                    "Isi kolom nomor referensi terlebih dahulu!"
                );

                nomor_referensi.focus();

            } else {

                print_button.focus();
            }
        }
    }
);


// ============================================================
// PRINT
// ============================================================

print_pdf.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        window.print();
    }
);


// ============================================================
// END
// ============================================================
