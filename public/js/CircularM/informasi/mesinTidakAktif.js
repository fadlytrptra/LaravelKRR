//#region Variables
let csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
const dtAwal = document.getElementById("tanggal_awal");
const dtAkhir = document.getElementById("tanggal_akhir");
const btnOK = document.getElementById("btn_OK");
const btnKeluar = document.getElementById("btn_keluar");
const btn_excel = document.getElementById("btn_excel");
let table_atas = $("#table_atas").DataTable({
    // columnDefs: [{ targets: [1, 2, 3], visible: false }],
    paging: false,
    // scrollY: "300px",
    // scrollX: "300px",
    // scrollCollapse: true,
});

$.ajaxSetup({
    beforeSend: function () {
        // Show the loading screen before the AJAX request
        $("#loading-screen").css("display", "flex");
    },
    complete: function () {
        // Hide the loading screen after the AJAX request completes
        $("#loading-screen").css("display", "none");
    },
});

var tableMesin = null;
dtAwal.valueAsDate = new Date();
dtAkhir.valueAsDate = new Date();
dtAwal.focus();
//#endregion

//#region Events
dtAwal.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        dtAkhir.focus();
    }
});

dtAkhir.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        btnOK.focus();
    }
});

btn_excel.addEventListener("click", function (event) {
    event.preventDefault();

    // Ambil data dari DataTable
    let data = table_atas.rows().data().toArray();

    if (data.length === 0) {
        Swal.fire({
            icon: "info",
            title: "Info!",
            text: "Tidak ada data untuk diexport!",
            showConfirmButton: true,
        });
        // alert("Tidak ada data untuk diexport!");
        return;
    }

    // Ubah jadi array of array (untuk SheetJS)
    let header = ["Tanggal", "Nama Mesin", "Id Order", "Kode Barang", "Nama Barang", "Rencana Order", "Jumlah Order", "RPM"];
    let body = data.map(row => [
        row.Tanggal,        // sudah diformat di render
        row.Nama_mesin,
        row.Id_Order,
        row.Kode_barang,
        row.NAMA_BRG,
        row.R_jumlah_Order,
        row.A_jumlah_Order,
        row.Rpm
    ]);

    // Buat worksheet
    let worksheet = XLSX.utils.aoa_to_sheet([header, ...body]);

    // Bold header
    header.forEach((_, idx) => {
        let cellAddress = XLSX.utils.encode_cell({ r: 0, c: idx }); // baris 0, kolom idx
        if (!worksheet[cellAddress]) return;
        worksheet[cellAddress].s = {
            font: { bold: true }
        };
    });

    // Buat workbook & append worksheet
    let workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataMesin");

    // Nama file dengan tanggal awal & akhir
    let filename = `MesinTidakAktif ${dtAwal.value} hingga ${dtAkhir.value}.xlsx`;

    // Export file
    XLSX.writeFile(workbook, filename);
});

btnOK.addEventListener("click", function () {
    table_atas = $("#table_atas").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        destroy: true,
        ajax: {
            url: "/informasi/show/CekMesinTidakAktif",
            dataType: "json",
            type: "GET",
            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                    dtAwal: dtAwal.value,
                    dtAkhir: dtAkhir.value,
                });
            },
        },
        columns: [
            {
                data: "Tanggal_Raw",
                render: function (data, type, row) {
                    // tampilkan langsung tanggal saat display
                    if (type === 'display') {
                        return row.Tanggal;
                    }
                    return data; // untuk sorting & filtering (yyyy-mm-dd)
                }
            },
            {
                data: "Nama_mesin",
                // render: function (data) {
                //     return numeral(data).format("0,0.00");
                // },
            },
            { data: "Id_Order" },
            { data: "Kode_barang" },
            { data: "NAMA_BRG" },
            { data: "R_jumlah_Order" },
            { data: "A_jumlah_Order" },
            { data: "Rpm" },
        ],
        // order: [[1, "asc"]],
        paging: false,
        scrollY: "600px",
        scrollX: "300px"
    });
});

btnKeluar.addEventListener("click", function () {
    window.location.href = "/";
});
//#endregion

//#region Functions
// function initDataTable(data) {
//     let exportFormatter = {
//         format: {
//             body: function (data, row, column) {
//                 return column === 4 ? tableMesin.cell(row, 4).data() : data;
//             },
//         },
//     };

//     const dtOptions = {
//         responsive: true,
//         scrollX: true,
//         scrollY: "400px",
//         layout: {
//             topStart: {
//                 info: true,
//             },
//             bottomStart: {
//                 buttons: [
//                     {
//                         extend: "excel",
//                         exportOptions: exportFormatter,
//                     },
//                 ],
//             },
//         },
//         language: {
//             searchPlaceholder: " Pencarian...",
//             search: "",
//             info: "Menampilkan _START_ - _END_ dari _TOTAL_ data",
//         },
//         initComplete: function () {
//             var searchInput = $('input[type="search"]');
//             searchInput.eq(0).addClass("form-control");
//             searchInput.wrap('<div class="input-group input-group-sm"></div>');
//             searchInput.before('<span class="input-group-text">Cari:</span>');

//             $(".dt-buttons button")
//                 .removeClass("btn-secondary")
//                 .addClass("btn-success btn-sm ms-3");

//             var infoText = $(".dt-info").text();
//             if (infoText.includes("Showing 0 to 0 of 0 entries")) {
//                 $(".dt-info").text("Menampilkan 0 data");
//             }
//         },
//     };

//     if (data) {
//         dtOptions.columnDefs = [
//             {
//                 targets: 4,
//                 render: DataTable.render.ellipsis(50, true),
//             },
//         ];
//         dtOptions.columns = [
//             { data: "Tanggal", width: "75px" },
//             { data: "Nama_mesin", width: "50px" },
//             { data: "Id_Order", width: "75px" },
//             { data: "Kode_barang", width: "75px" },
//             { data: "NAMA_BRG", width: "350px" },
//             { data: "R_jumlah_Order", width: "100px" },
//             { data: "A_jumlah_Order", width: "100px" },
//             { data: "Rpm", width: "0px" },
//         ];
//         dtOptions.data = data;
//     } else {
//         dtOptions.columns = [
//             { width: "75px" }, // Tanggal
//             { width: "50px" }, // Nama Mesin
//             { width: "75px" }, // Id Order
//             { width: "75px" }, // Kd. Barang
//             { width: "350px" }, // Nama Order
//             { width: "100px" }, // Rencana Order
//             { width: "100px" }, // Jumlah Order
//             { width: "0px" }, // RPM
//         ];
//     }

//     if (tableMesin) {
//         tableMesin.destroy();
//     }

//     tableMesin = new DataTable("#table_mesin", dtOptions);

//     // Handle export data original saat menggunakan plugin ellipsis untuk render
//     // https://datatables.net/extensions/buttons/examples/html5/outputFormat-function.html

//     // Extension untuk melakukan export excel, pdf, csv, dan sebagainya
//     // https://datatables.net/extensions/buttons/examples/initialisation/export.html
// }

// function init() {
//     // Initialize DataTable
//     initDataTable();

//     // Initialize inputs
//     dtAwal.value = getCurrentDate();
//     dtAkhir.value = getCurrentDate();
// }
// //#endregion

// $(document).ready(function () {
//     init();
// });
