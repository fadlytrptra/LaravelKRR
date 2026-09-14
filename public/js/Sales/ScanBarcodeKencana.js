let kode_barcode = document.getElementById("kode_barcode");
let div_tableBarcodeDetail = document.getElementById(
    "div_tableBarcodeDetail"
);
let jumlah = document.getElementById("jumlah");
let tanggal_input = document.getElementById("tanggal_input");
let lihat_data = document.getElementById("lihat_data");
let form_scanBarcode = document.getElementById("form_scanBarcode");


// ============================================================
// LOAD FORM
// ============================================================

tanggal_input.valueAsDate = new Date();

kode_barcode.focus();


// ============================================================
// FUNCTION FORMAT TANGGAL
// ============================================================

function formatTanggal(data) {
    if (!data) {
        return "";
    }

    return data.substring(0, 10);
}


// ============================================================
// DATA TABLE BARCODE
// ============================================================

let table = $("#table_dataBarcode").DataTable({

    processing: true,

    data: data_kodeBarang,

    columns: [
        {
            data: null
        },
        {
            data: "NamaType"
        },
        {
            data: "IdType"
        },
        {
            data: "Kode_barang"
        },
        {
            data: "Qty_Primer"
        },
        {
            data: "Qty_Sekunder"
        },
        {
            data: "Qty"
        },
        {
            data: "Tgl_mutasi",
            render: function (data) {
                return formatTanggal(data);
            }
        }
    ],

    columnDefs: [

        {
            searchable: false,
            orderable: false,
            targets: 0,

            render: function (data, type, row, meta) {
                return meta.row + 1;
            }
        },

        {
            targets: 7,
            className: "nowrap"
        }

    ],

    order: [
        [7, "desc"]
    ]

});


// ============================================================
// SCAN BARCODE
// ============================================================

kode_barcode.addEventListener("keydown", function (event) {

    if (event.key !== "Enter") {
        return;
    }

    event.preventDefault();

    let barcodeValue = kode_barcode.value.trim();

    // --------------------------------------------------------
    // Barcode kosong
    // --------------------------------------------------------

    if (barcodeValue === "") {

        alert("Isi kode barcode lebih dulu!");

        kode_barcode.focus();

        return;
    }


    // --------------------------------------------------------
    // Bersihkan barcode
    // --------------------------------------------------------
    //
    // Contoh:
    //
    // 11111-000042678
    //
    // menjadi:
    //
    // 11111-000042678
    //
    //
    // Jika scanner mengirim beberapa barcode:
    //
    // 11111-000042678
    // 22222-000012345
    //
    // menjadi:
    //
    // 11111-000042678, 22222-000012345
    //
    // --------------------------------------------------------

    barcodeValue = barcodeValue
        .replace(/\r\n/g, ", ")
        .replace(/\n/g, ", ")
        .replace(/\r/g, ", ")
        .replace(/\s*,\s*/g, ", ")
        .trim();


    kode_barcode.value = barcodeValue;


    // --------------------------------------------------------
    // Submit
    // --------------------------------------------------------

    form_scanBarcode.submit();

});


// ============================================================
// KLIK DATA BARCODE
// ============================================================

$("#table_dataBarcode tbody").on(
    "click",
    "tr",
    function () {

        const selectedRowData = table
            .row(this)
            .data();

        if (!selectedRowData) {
            return;
        }


        // ----------------------------------------------------
        // Selected row
        // ----------------------------------------------------

        table.$("tr.selected").removeClass("selected");

        $(this).addClass("selected");


        // ----------------------------------------------------
        // Ambil data
        // ----------------------------------------------------

        const idType = selectedRowData.IdType;

        const kodeBarang = selectedRowData.Kode_barang;

        const tglMutasi = selectedRowData.Tgl_mutasi;


        // ----------------------------------------------------
        // URL
        // ----------------------------------------------------

        const url =
            "/scanBarcodeDetailData/" +
            encodeURIComponent(idType) +
            "/" +
            encodeURIComponent(kodeBarang) +
            "/" +
            encodeURIComponent(tglMutasi);


        // ----------------------------------------------------
        // Request detail
        // ----------------------------------------------------

        fetch(url)

            .then(function (response) {

                if (!response.ok) {
                    throw new Error(
                        "Gagal mengambil detail barcode"
                    );
                }

                return response.json();

            })

            .then(function (data) {

                // ------------------------------------------------
                // Tampilkan detail
                // ------------------------------------------------

                div_tableBarcodeDetail.style.display = "block";


                // ------------------------------------------------
                // Hapus DataTable lama
                // ------------------------------------------------

                if ($.fn.DataTable.isDataTable(
                    "#table_detailBarcode"
                )) {

                    $("#table_detailBarcode")
                        .DataTable()
                        .clear()
                        .destroy();

                }


                // ------------------------------------------------
                // Buat DataTable detail
                // ------------------------------------------------

                $("#table_detailBarcode").DataTable({

                    processing: true,

                    data: data,

                    columns: [

                        {
                            data: null
                        },

                        {
                            data: "NoIndeks"
                        },

                        {
                            data: "KodeBarang"
                        },

                        {
                            data: "NamaType"
                        }

                    ],

                    columnDefs: [

                        {
                            searchable: false,
                            orderable: false,
                            targets: 0,

                            render: function (
                                data,
                                type,
                                row,
                                meta
                            ) {

                                return meta.row + 1;

                            }

                        }

                    ],

                    order: [
                        [1, "desc"]
                    ]

                });

            })

            .catch(function (error) {

                console.error(error);

                alert(
                    "Gagal mengambil detail data barcode."
                );

            });

    }
);


// ============================================================
// LIHAT DATA BERDASARKAN TANGGAL
// ============================================================

lihat_data.addEventListener("click", function (event) {

    event.preventDefault();


    // --------------------------------------------------------
    // Validasi tanggal
    // --------------------------------------------------------

    if (tanggal_input.value === "") {

        alert("Isi tanggal terlebih dahulu!");

        tanggal_input.focus();

        return;
    }


    // --------------------------------------------------------
    // Request
    // --------------------------------------------------------

    fetch(
        "/scanBarcodeLihatData/" +
        encodeURIComponent(tanggal_input.value)
    )

        .then(function (response) {

            if (!response.ok) {

                throw new Error(
                    "Gagal mengambil data barcode"
                );

            }

            return response.json();

        })

        .then(function (data) {

            console.log("Response:", data);


            // =================================================
            // UPDATE JUMLAH
            // =================================================
            //
            // Controller:
            //
            // [
            //     [
            //         'total' => $jumlah
            //     ],
            //     $data_kodeBarang
            // ]
            //
            // Jadi:
            //
            // data[0].total
            //
            // BUKAN:
            //
            // data[0][0].total
            // =================================================

            jumlah.innerHTML =
                "Jumlah data Barcode: " +
                data[0].total;


            // =================================================
            // UPDATE TABLE
            // =================================================

            table.clear();

            table.rows.add(data[1]);

            table.draw();


            // =================================================
            // Sembunyikan detail
            // =================================================

            div_tableBarcodeDetail.style.display = "none";

        })

        .catch(function (error) {

            console.error(error);

            alert(
                "Gagal mengambil data barcode."
            );

        });

});