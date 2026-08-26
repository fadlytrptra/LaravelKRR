//#region Element

let tanggal_sp = document.getElementById("tanggal_sp");
let no_spText = document.getElementById("no_spText");
let no_spSelect = document.getElementById("no_spSelect");
let jenis_sp = document.getElementById("jenis_sp");

let print_button = document.getElementById("print_button");
let contoh_print = document.getElementById("contoh_print");
let contoh_printDiv = document.getElementById("contoh_printDiv");

let nomor_spSpan = document.getElementById("nomor_spSpan");
let no_poKolom = document.getElementById("no_poKolom");
let tgl_poKolom = document.getElementById("tgl_poKolom");
let tgl_pesanKolom = document.getElementById("tgl_pesanKolom");

let nama_customerKolom = document.getElementById("nama_customerKolom");
let alamat_kantorKolom = document.getElementById("alamat_kantorKolom");
let alamat_kirimKolom = document.getElementById("alamat_kirimKolom");

let jenis_bayarKolom = document.getElementById("jenis_bayarKolom");
let rencana_kirimKolom = document.getElementById("rencana_kirimKolom");
let syarat_bayarKolom = document.getElementById("syarat_bayarKolom");
let keterangan_ppnKolom = document.getElementById("keterangan_ppnKolom");
let keterangan_kolom = document.getElementById("keterangan_kolom");


// ==========================================
// TANDA TANGAN
// HANYA 2
// ==========================================

let ttd_salesKolom = document.getElementById("ttd_salesKolom");
let ttd_managerKolom = document.getElementById("ttd_managerKolom");

let nama_salesKolom = document.getElementById("nama_salesKolom");
let nama_managerKolom = document.getElementById("nama_managerKolom");


let lihat_sp = document.getElementById("lihat_sp");
let print_pdf = document.getElementById("print_pdf");
let loading_screen = document.getElementById("loading-screen");


//#endregion



//#region DataTable

let table_sp = $("#table_sp").DataTable({
    searching: false,
    paging: false,
    info: false,
    ordering: false,
});


//#endregion



//#region Load Page

tanggal_sp.focus();

tanggal_sp.valueAsDate = new Date();

contoh_print.style.display = "none";
no_spSelect.style.display = "none";
print_pdf.style.display = "none";

//#endregion



//#region Pilih Tanggal

tanggal_sp.addEventListener("change", function () {

    fetch("/Kencana/nosp/" + this.value)

        .then((response) => response.json())

        .then((options) => {

            no_spSelect.innerHTML =
                '<option disabled selected value>-- Pilih Nomor SP --</option>';

            options.forEach((option) => {

                let optionTag =
                    document.createElement("option");

                optionTag.value =
                    option.IDSuratPesanan;

                optionTag.text =
                    option.IDSuratPesanan +
                    " | " +
                    option.NamaCust;

                no_spSelect.appendChild(optionTag);

            });

        })

        .catch((error) => {

            console.error(
                "Gagal mengambil nomor SP:",
                error
            );

        });

});


//#endregion



//#region Pilih SP

no_spSelect.addEventListener("change", function () {

    no_spText.value = no_spSelect.value;

    fetch(
        "/Kencana/options/jenissp/" +
        no_spSelect.value
    )

        .then((response) => response.json())

        .then((options) => {

            if (!options || options.length === 0) {
                jenis_sp.value = "";
                return;
            }

            jenis_sp.value =
                options[0].IDJnsSuratPesanan +
                " | " +
                options[0].JnsSuratPesanan;

            jenis_sp.readOnly = true;

        })

        .catch((error) => {

            console.error(
                "Gagal mengambil jenis SP:",
                error
            );

        });

});


//#endregion



//#region Input Nomor SP

no_spText.addEventListener(
    "keypress",
    function (event) {

        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        const nomorSP =
            no_spText.value.trim();

        if (nomorSP === "") {
            return;
        }

        fetch(
            "/Kencana/options/jenissp/" +
            encodeURIComponent(nomorSP)
        )

            .then((response) => response.json())

            .then((options) => {

                if (!options || options.length === 0) {

                    jenis_sp.value = "";

                    Swal.fire({
                        icon: "warning",
                        title: "Data Tidak Ditemukan",
                        text: "Jenis Surat Pesanan tidak ditemukan."
                    });

                    return;
                }

                jenis_sp.value =
                    options[0].IDJnsSuratPesanan +
                    " | " +
                    options[0].JnsSuratPesanan;

                jenis_sp.readOnly = true;

                print_button.focus();

            })

            .catch((error) => {

                console.error(
                    "Gagal mengambil jenis SP:",
                    error
                );

            });

    }
);


//#endregion



//#region Toggle Nomor SP

lihat_sp.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        if (
            no_spSelect.style.display === "block"
        ) {

            no_spSelect.style.display = "none";
            no_spText.style.display = "block";

        } else {

            no_spSelect.style.display = "block";
            no_spText.style.display = "none";

        }

    }
);


//#endregion



//#region VIEW PRINT

print_button.addEventListener(
    "click",
    function (event) {

        event.preventDefault();


        // ==========================================
        // VALIDASI NOMOR SP
        // ==========================================

        const nomorSP =
            no_spText.value.trim();

        if (nomorSP === "") {

            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Pilih Surat Pesanan dulu!"
            });

            return;
        }


        // ==========================================
        // TAMPILKAN CONTOH PRINT
        // ==========================================

        contoh_print.style.display =
            "inline-block";

        print_pdf.style.display =
            "inline-block";

        contoh_printDiv.style.display =
            "block";


        // ==========================================
        // RESET TANDA TANGAN
        // HANYA SALES + MANAGER
        // ==========================================

        if (ttd_salesKolom) {
            ttd_salesKolom.src = "";
        }

        if (ttd_managerKolom) {
            ttd_managerKolom.src = "";
        }

        if (nama_salesKolom) {
            nama_salesKolom.innerHTML = "";
        }

        if (nama_managerKolom) {
            nama_managerKolom.innerHTML = "";
        }


        // ==========================================
        // LOADING
        // ==========================================

        $("#loading-screen").css(
            "display",
            "flex"
        );


        // ==========================================
        // AMBIL DATA
        // ==========================================

        fetch(
            "/Kencana/viewprint/" +
            encodeURIComponent(nomorSP)
        )

            .then((response) => {

                if (!response.ok) {
                    throw new Error(
                        "HTTP Error " +
                        response.status
                    );
                }

                return response.json();

            })

            .then((data) => {

                console.log(
                    "DATA VIEW PRINT:",
                    data
                );


                if (
                    !data ||
                    data.length === 0
                ) {

                    Swal.fire({
                        icon: "warning",
                        title: "Data Tidak Ditemukan",
                        text: "Data Surat Pesanan tidak ditemukan."
                    });

                    return;
                }


                const item = data[0];


                // ==========================================
                // HEADER
                // ==========================================

                nomor_spSpan.innerHTML =
                    "No. " +
                    (item.NO_SP ?? "");

                no_poKolom.innerHTML =
                    item.NO_PO ?? "";


                const Tgl_PO =
                    formatDateToMMDDYYYY(
                        item.Tgl_PO
                    );

                const TGL_SP =
                    formatDateToMMDDYYYY(
                        item.TGL_SP
                    );


                tgl_poKolom.innerHTML =
                    Tgl_PO;

                tgl_pesanKolom.innerHTML =
                    TGL_SP;


                nama_customerKolom.innerHTML =
                    item.NamaCust ?? "";

                alamat_kantorKolom.innerHTML =
                    item.Alamat ?? "";

                alamat_kirimKolom.innerHTML =
                    item.AlamatKirim ?? "";


                // ==========================================
                // TABLE BARANG
                // ==========================================

                table_sp.destroy();


                table_sp =
                    $("#table_sp").DataTable({

                        searching: false,
                        paging: false,
                        info: false,
                        ordering: false,

                        data: data,

                        columns: [

                            // NO
                            {
                                data: null,

                                render:
                                    function (
                                        data,
                                        type,
                                        row,
                                        meta
                                    ) {

                                        return (
                                            meta.row + 1
                                        );

                                    }
                            },


                            // TYPE BARANG
                            {
                                data: "JnsBarang",

                                render:
                                    function (
                                        data,
                                        type,
                                        row
                                    ) {

                                        return (
                                            "<b>" +
                                            (
                                                data ?? ""
                                            ) +
                                            "</b><br>" +
                                            (
                                                row.NamaType ??
                                                ""
                                            )
                                        );

                                    }
                            },


                            // KODE BARANG
                            {
                                data: "KodeBarang",

                                defaultContent: ""
                            },


                            // QUANTITY
                            {
                                data: null,

                                render:
                                    function (
                                        data,
                                        type,
                                        row
                                    ) {

                                        return (
                                            numeral(
                                                row.JmlOrder
                                            ).format(
                                                "0,0.00"
                                            ) +
                                            " " +
                                            (
                                                row.Satuan ??
                                                ""
                                            )
                                        );

                                    }
                            },


                            // HARGA
                            {
                                data: null,

                                render:
                                    function (
                                        data,
                                        type,
                                        row
                                    ) {

                                        return (
                                            (
                                                row.Symbol ??
                                                ""
                                            ) +
                                            " " +
                                            numeral(
                                                row.HargaSatuan
                                            ).format(
                                                "0,0.00"
                                            )
                                        );

                                    }
                            }

                        ],


                        columnDefs: [

                            {
                                targets: 0,
                                width: "1%"
                            },

                            {
                                targets: 1,
                                width: "49%"
                            },

                            {
                                targets: 2,
                                width: "18%"
                            },

                            {
                                targets: 3,
                                width: "17%"
                            },

                            {
                                targets: 4,
                                width: "15%"
                            }

                        ]

                    });


                // ==========================================
                // INFORMASI PEMBAYARAN
                // ==========================================

                jenis_bayarKolom.innerHTML =
                    item.NamaPembayaran ?? "";


                rencana_kirimKolom.innerHTML =
                    formatDateToMMDDYYYY(
                        item.TglRencanaKirim
                    );


                syarat_bayarKolom.innerHTML =
                    item.SyaratBayar != null
                        ? item.SyaratBayar + " Hari"
                        : "";


                keterangan_ppnKolom.innerHTML =
                    item.PPN ?? "";


                // ==========================================
                // KETERANGAN
                // ==========================================

                let ketWithLineBreaks = "";

                let ket =
                    item.Ket;


                if (ket !== null &&
                    ket !== undefined) {

                    ketWithLineBreaks =
                        String(ket)
                            .replace(
                                /\r\n|\r|\n/g,
                                "<br>"
                            );

                }


                keterangan_kolom.innerHTML =
                    ketWithLineBreaks;


                // ==========================================
                // TANDA TANGAN SALES
                // ==========================================

                console.log(
                    "TtdSales:",
                    item.TtdSales
                );

                if (
                    ttd_salesKolom &&
                    item.TtdSales
                ) {

                    ttd_salesKolom.src =
                        "data:image/png;base64," +
                        item.TtdSales;

                }


                // ==========================================
                // TANDA TANGAN MANAGER
                // ==========================================

                console.log(
                    "TtdManager:",
                    item.TtdManager
                );

                if (
                    ttd_managerKolom &&
                    item.TtdManager
                ) {

                    ttd_managerKolom.src =
                        "data:image/png;base64," +
                        item.TtdManager;

                }


                // ==========================================
                // NAMA SALES
                // ==========================================

                if (nama_salesKolom) {

                    nama_salesKolom.innerHTML =
                        item.Sales ?? "";

                }


                // ==========================================
                // NAMA MANAGER
                // ==========================================

                if (nama_managerKolom) {

                    nama_managerKolom.innerHTML =
                        item.Manager ?? "";

                }


                console.log(
                    "Data Surat Pesanan berhasil ditampilkan."
                );

            })

            .catch((error) => {

                console.error(
                    "ERROR VIEW PRINT:",
                    error
                );

                Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text:
                        "Gagal mengambil data Surat Pesanan."
                });

            })

            .finally(() => {

                $("#loading-screen").css(
                    "display",
                    "none"
                );

            });

    }
);


//#endregion



//#region PRINT PDF / PRINT

print_pdf.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        window.print();

    }
);


//#endregion



//#region Function Format Date

function formatDateToMMDDYYYY(dateString) {

    if (
        dateString === null ||
        dateString === undefined ||
        dateString === ""
    ) {

        return "";

    }


    const date =
        new Date(dateString);


    if (isNaN(date.getTime())) {
        return "";
    }


    const year =
        date.getFullYear();

    const month =
        ("0" + (date.getMonth() + 1))
            .slice(-2);

    const day =
        ("0" + date.getDate())
            .slice(-2);


    return (
        month +
        "-" +
        day +
        "-" +
        year
    );

}


//#endregion



//#region Format Angka

function formatangka(objek) {
    console.log(objek);

    let a = objek.toString().replace(/[^\d]/g, "");
    let c = "";
    let panjang = a.length;
    let j = 0;

    for (let i = panjang; i > 0; i--) {
        j++;
        if (j % 3 === 1 && j !== 1) {
            c = a.substr(i - 1, 1) + "." + c;
        } else {
            c = a.substr(i - 1, 1) +c;
        }
    }
    return c;

}


//#endregion
