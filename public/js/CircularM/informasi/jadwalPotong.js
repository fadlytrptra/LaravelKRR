// //#region Variables
// const btnTampil = document.getElementById("btn_tampil");
// const btnKeluar = document.getElementById("btn_keluar");

// var tableJadwal = null;
// const listLogMesin = [
//     // IdLog: d["id_log"],
//     // 1 TglLog: d["tgl_log"],
//     // 2 StatusLog: d["status_log"],
//     // 3 Shift: d["shift"],
//     // 4 IdMesin: d["Id_mesin"],
//     // 5 IdOrder: d["Id_Order"],
//     // 6 CounterAwal: d["counter_mesin_awal"],
//     // 7 CounterAkhir: d["counter_mesin_akhir"],
//     // 8 Jumlah: d["Jumlah"],
//     // 9 Rpm: d["rpm"],
//     // 10 Shuttle: d["number_of_shutle"],
//     // 11 KodeBarang: d["Kode_Barang"],
//     // 12 D_Tek3: d["D_Tek3"],
//     // 13 Output: hitungOutput(d),
//     // 14 NamaMesin: d["Nama_Mesin"],
//     // 15 NamaBarang: d["Nama_Brg"],
//     // 16 Perkiraan: "",
// ];
// const listAkumulasi = [
//     // IdOrder: d["Id_Order"],
//     // 1 IdMesin: d["Id_mesin"],
//     // 2 Akumulasi: d["Akumulasi"],
//     // 3 StandardRoll: 18000 - Number(d["Akumulasi"]),
// ];
// const listJadwal = [
//     // NamaMesin: item1["NamaMesin"],
//     // NamaBarang: item1["NamaBarang"],
//     // Akumulasi: item2["Akumulasi"],
//     // StandardRoll: "1800",
//     // Output: item1["Output"],
//     // Shift: shift,
//     // TanggalPotong: tanggalPotong,
// ];
// //#endregion

// //#region Events
// btnTampil.addEventListener("click", function () {
//     listJadwal.length = 0;
//     setCursorWait(true);

//     fetchStatement(
//         "/sp-informasi/SP_1273_CIR_Delete_JadwalPotong",
//         () => {
//             fetchSelect(
//                 "/sp-informasi/SP_1273_CIR_LIST_LogMesin~1",
//                 (data) => {
//                     for (let i = 0; i < data.length; i++) {
//                         const d = data[i];

//                         listLogMesin.push({
//                             IdLog: d["id_log"],
//                             TglLog: d["tgl_log"],
//                             StatusLog: d["status_log"],
//                             Shift: d["shift"],
//                             IdMesin: d["Id_mesin"],
//                             IdOrder: d["Id_Order"],
//                             CounterAwal: d["counter_mesin_awal"],
//                             CounterAkhir: d["counter_mesin_akhir"],
//                             Jumlah: d["Jumlah"],
//                             Rpm: d["rpm"],
//                             Shuttle: d["number_of_shutle"],
//                             KodeBarang: d["Kode_Barang"],
//                             D_Tek3: d["D_Tek3"],
//                             Output: hitungOutput(d),
//                             NamaMesin: d["Nama_Mesin"],
//                             NamaBarang: d["Nama_Brg"],
//                             Perkiraan: "",
//                         });
//                     }

//                     function hitungOutput(d) {
//                         const rpm = parseFloat(d["rpm"]);
//                         const shuttle = parseFloat(d["number_of_shutle"]);
//                         const eff = parseFloat(d["Estimasi_Effisiensi"]);
//                         const dTek3 = parseFloat(d["D_Tek3"].trim());
//                         const output =
//                             (rpm * shuttle * 2.54 * 0.6 * 1 * (eff / 100)) /
//                             dTek3;

//                         return output.toFixed(2);
//                     }

//                     fetchSelect(
//                         "/sp-informasi/SP_1273_CIR_LIST_LogMesin~2",
//                         (data2) => {
//                             for (let j = 0; j < data2.length; j++) {
//                                 const d = data2[j];

//                                 listAkumulasi.push({
//                                     IdOrder: d["Id_Order"],
//                                     IdMesin: d["Id_mesin"],
//                                     Akumulasi: d["Akumulasi"],
//                                     StandardRoll: 1800 - Number(d["Akumulasi"]),
//                                 });
//                             }

//                             isiListJadwal();
//                         }
//                     );
//                 },
//                 true
//             );
//         },
//         true
//     );

//     function isiListJadwal() {
//         for (let i = 0; i < listLogMesin.length; i++) {
//             let item1 = listLogMesin[i];
//             for (let j = 0; j < listAkumulasi.length; j++) {
//                 let item2 = listAkumulasi[j];
//                 if (
//                     item1["IdOrder"] == item2["IdOrder"] &&
//                     item1["IdMesin"] == item2["IdMesin"]
//                 ) {
//                     let perkiraan =
//                         parseFloat(item2["StandardRoll"]) /
//                         parseFloat(item1["Output"]);
//                     listLogMesin[i]["Perkiraan"] = perkiraan.toFixed(2);
//                     item1 = listLogMesin[i];

//                     let isPositive = item1["Perkiraan"] >= 0;
//                     if (isPositive) {
//                         let jamShift;
//                         switch (item1["Shift"]) {
//                             case "P":
//                                 jamShift = 7;
//                                 break;

//                             case "S":
//                                 jamShift = 15;
//                                 break;

//                             case "M":
//                                 jamShift = 23;
//                                 break;
//                         }

//                         let menit = item1["Perkiraan"].slice(-2);
//                         let hitungMenit = Number(menit) * 60;
//                         if (hitungMenit >= 0 && hitungMenit <= 9) {
//                             hitungMenit = "0" + hitungMenit;
//                         } else {
//                             hitungMenit = hitungMenit
//                                 .toString()
//                                 .substring(0, 2);
//                         }

//                         let jumlahJam = jamShift + Number(item1["Perkiraan"]);
//                         let jumlahHari, hitungJam, cekMenit;
//                         if (jumlahJam > 24) {
//                             jumlahHari = Math.floor(jumlahJam / 24);
//                             hitungJam = jumlahJam - jumlahHari * 24;
//                             hitungJam = Math.floor(hitungJam);

//                             if (hitungJam === 24) {
//                                 hitungJam = 0;
//                                 jumlahHari += 1;
//                             }

//                             if (hitungMenit === 60) {
//                                 hitungMenit = 0;
//                                 hitungJam += 1;
//                                 if (hitungJam === 24) {
//                                     hitungJam = 0;
//                                     jumlahHari += 1;
//                                 }
//                             } else if (hitungMenit > 60) {
//                                 cekMenit = Math.floor(hitungMenit / 60);
//                                 hitungMenit = hitungMenit - cekMenit * 60;
//                                 hitungJam += cekMenit;
//                                 if (hitungJam === 24) {
//                                     hitungJam = 0;
//                                     jumlahHari += 1;
//                                 }
//                             }
//                         } else {
//                             jumlahHari = Math.floor(jumlahJam);
//                             hitungJam = Math.floor(jumlahJam);

//                             if (hitungJam === 24) {
//                                 hitungJam = 0;
//                                 jumlahHari += 1;
//                             }

//                             if (hitungMenit === 60) {
//                                 hitungMenit = 0;
//                                 hitungJam += 1;
//                                 if (hitungJam === 24) {
//                                     hitungJam = 0;
//                                     jumlahHari += 1;
//                                 }
//                             } else if (hitungMenit > 60) {
//                                 cekMenit = Math.floor(hitungMenit / 60);
//                                 hitungMenit = hitungMenit - cekMenit * 60;
//                                 hitungJam += cekMenit;
//                                 if (hitungJam === 24) {
//                                     hitungJam = 0;
//                                     jumlahHari += 1;
//                                 }
//                             }
//                         }

//                         let shift = "";
//                         if (hitungJam >= 7 && hitungJam < 15) {
//                             shift = "P";
//                         } else if (hitungJam >= 15 && hitungJam < 23) {
//                             shift = "S";
//                         } else if (
//                             hitungJam >= 23 ||
//                             (hitungJam >= 0 && hitungJam < 7)
//                         ) {
//                             shift = "M";
//                         }

//                         let initialDate = new Date(item1["TglLog"]);
//                         let month = initialDate.getMonth() + 1; // JavaScript months are 0-11
//                         let year = initialDate.getFullYear();
//                         let dateTemp = initialDate.getDate();
//                         let date = dateTemp + jumlahHari;

//                         let kabisat =
//                             year % 4 === 0 &&
//                             (year % 100 !== 0 || year % 400 === 0);

//                         let endDate;
//                         if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
//                             endDate = 31;
//                         } else if ([4, 6, 9, 11].includes(month)) {
//                             endDate = 30;
//                         } else if (month === 2) {
//                             endDate = kabisat ? 29 : 28;
//                         }

//                         if (date > endDate) {
//                             date -= endDate;
//                             month += 1;
//                             if (month > 12) {
//                                 month -= 12;
//                                 year += 1;
//                             }
//                         }

//                         hitungJam = ("0" + hitungJam).slice(-2);
//                         hitungMenit = ("0" + hitungMenit).slice(-2);

//                         let hitungTanggal = `${month}/${date}/${year}`;
//                         let jamPotong = `${hitungJam}:${hitungMenit}`;
//                         let tanggalPotong = `${hitungTanggal} - ${jamPotong}`;

//                         listJadwal.push({
//                             NamaMesin: item1["NamaMesin"],
//                             NamaBarang: item1["NamaBarang"],
//                             Akumulasi: item2["Akumulasi"],
//                             StandardRoll: "1800",
//                             Output: item1["Output"],
//                             Shift: shift,
//                             TanggalPotong: tanggalPotong,
//                         });
//                     }
//                 }
//             }
//         }

//         initDataTable(listJadwal);
//         setCursorWait(false);
//     }
// });

// btnKeluar.addEventListener("click", function () {
//     window.location.href = "/";
// });
// //#endregion

// //#region Functions
// function initDataTable(data) {
//     let exportFormatter = {
//         format: {
//             body: function (data, row, column) {
//                 return column === 1 ? tableJadwal.cell(row, 1).data() : data;
//             },
//         },
//     };

//     const dtOptions = {
//         responsive: true,
//         scrollX: true,
//         scrollY: "350px",
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
//                 targets: 1,
//                 render: DataTable.render.ellipsis(70, true),
//             },
//         ];
//         dtOptions.columns = [
//             { data: "NamaMesin", width: "0px" },
//             { data: "NamaBarang", width: "450px" },
//             { data: "Akumulasi", width: "80px" },
//             { data: "StandardRoll", width: "90px" },
//             { data: "Output", width: "80px" },
//             { data: "Shift", width: "0px" },
//             { data: "TanggalPotong", width: "110px" },
//         ];
//         dtOptions.data = data;
//     } else {
//         dtOptions.columns = [
//             { width: "0px" }, // Mesin
//             { width: "450px" }, // Nama Order
//             { width: "80px" }, // Total Meter
//             { width: "90px" }, // Standard Roll
//             { width: "80px" }, // Jumlah Jam
//             { width: "0px" }, // Shift
//             { width: "110px" }, // Tanggal Potong
//         ];
//     }

//     if (tableJadwal) {
//         tableJadwal.destroy();
//     }

//     tableJadwal = new DataTable("#table_jadwal", dtOptions);
// }

// function init() {
//     initDataTable();
// }

// $(document).ready(function () {
//     init();
// });
// //#endregion

// // VW_PRG_1273_CIR_List_LogMesin,
// // Mengambil data log mesin tiap order yang belum selesai
// // setelah Status Log Potong Gelondongan terakhir (03)
// // Dimana A_Tgl_Akhir NULL & Kalkulasi_Meter NULL
// // Misal log1 status 01, log2 status 01, log3 status 03, log4 status 02
// // Maka hanya mengambil log4 saja
// // Breakdown lebih jelas cek "/public/catatan_sp/sp-jadwal-potong.txt"

// // SP_1273_CIR_LIST_LogMesin
// // Mengambil data log mesin terkecil dari tiap order
// // Berdasarkan VW_PRG_1273_CIR_List_LogMesin

//#region NEW

jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let btn_tampil = document.getElementById("btn_tampil");
    let btn_keluar = document.getElementById("btn_keluar");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "300px",
        // scrollX: "300px",
        scrollCollapse: true,
    });

    btn_keluar.addEventListener("click", function () {
        window.location.href = "/";
    });

    btn_tampil.addEventListener("click", async function (event) {
        event.preventDefault();
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/informasiD/show/getData",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                    });
                },
            },
            columns: [
                {
                    data: "Id_mesin",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },  
                {
                    data: "Nama_mesin",
                    // render: function (data) {
                    //     return numeral(data).format("0,0.00");
                    // },
                },
                { data: "Id_order" },
                { data: "Nama_Barang" },
                { data: "MeterPanen" },
            ],
            // order: [[1, "asc"]],
            paging: false,
            scrollY: "300px",
            scrollCollapse: true,
        });
    });
});