// let namaCustomerSelect = document.getElementById('namaCustomerSelect');

// let idCustomer = document.getElementById('idCustomer');
// let btnOK = document.getElementById('btnOK');
// let btnPilihBKM = document.getElementById('btnPilihBKM');
// let dataTable;
// let lastCheckedCheckbox = null;
// let btnProses = document.getElementById('btnProses');
// let btnTampilBKM = document.getElementById('btnTampilBKM');
// let btnBatal = document.getElementById('btnBatal');
// let tanggalTampilBKM2 = document.getElementById('tanggalTampilBKM2');
// let tanggalTampilBKM = document.getElementById('tanggalTampilBKM');
// let tanggalTampilBKK = document.getElementById('tanggalTampilBKK');
// let tanggalTampilBKK2 = document.getElementById('tanggalTampilBKK2');
// let id_bkk = document.getElementById('id_bkk');
// let id_bkm = document.getElementById('id_bkm');

// let idPembayaran = document.getElementById('idPembayaran');
// let idPelunasan = document.getElementById('idPelunasan');

// //CARD BKK
// let tanggal = document.getElementById('tanggal');
// let idBKK = document.getElementById('idBKK');
// let mataUangSelect = document.getElementById('mataUangSelect');
// let kursRupiah = document.getElementById('kursRupiah');
// let jumlahUang = document.getElementById('jumlahUang');
// let namaBankSelect = document.getElementById('namaBankSelect');
// let idBankBKK = document.getElementById('idBankBKK');
// let jenisBankBKK = document.getElementById('jenisBankBKK');
// let idKodePerkiraanBKK = document.getElementById('idKodePerkiraanBKK');
// let kodePerkiraanSelectBKK = document.getElementById('kodePerkiraanSelectBKK');
// let uraian = document.getElementById('uraian');
// let idMataUang = document.getElementById('idMataUang');

// //CARD BKM
// let idBKM = document.getElementById('idBKM');
// let jumlahUangBKM = document.getElementById('jumlahUangBKM');
// let namaBankBKMSelect = document.getElementById('namaBankBKMSelect');
// let idBankBKM = document.getElementById('idBankBKM');
// let jenisBankBKM = document.getElementById('jenisBankBKM');
// let idKodePerkiraanBKM = document.getElementById('idKodePerkiraanBKM');
// let kodePerkiraanBKMSelect = document.getElementById('kodePerkiraanBKMSelect');
// let uraianBKM = document.getElementById('uraianBKM');

// let idbkm;
// let saldo;
// let IdPelunasan;
// let jenisBank;
// let IdCust;
// let total1;
// let total2;
// let nilai = document.getElementById('nilai');
// let nilai1 = document.getElementById('nilai1');
// let konversi = document.getElementById('konversi');
// let konversi1 = document.getElementById('konversi1');
// let saldoRp;

// let idBKMTampil = document.getElementById('idBKMTampil');
// let btnCetakBKM = document.getElementById('btnCetakBKM');
// let idBKKTampil = document.getElementById('idBKKTampil');
// let btnCetakBKK = document.getElementById('btnCetakBKK');
// let btnKoreksi = document.getElementById('btnKoreksi');
// let formkoreksi = document.getElementById('formkoreksi');
// let methodkoreksi = document.getElementById('methodkoreksi');
// let methodTampilBKM = document.getElementById('methodTampilBKM');
// let formTampilBKM = document.getElementById('formTampilBKM');
// let methodTampilBKK = document.getElementById('methodTampilBKK');
// let formTampilBKK = document.getElementById('formTampilBKK');

// const tanggalPenagihan = new Date();
// const formattedDate2 = tanggalPenagihan.toISOString().substring(0, 10);
// tanggal.value = formattedDate2;

// const tglTampilBKM = new Date();
// const formattedDate3 = tglTampilBKM.toISOString().substring(0, 10);
// tanggalTampilBKM.value = formattedDate3;

// const tglTampilBKM2 = new Date();
// const formattedDate4 = tglTampilBKM2.toISOString().substring(0, 10);
// tanggalTampilBKM2.value = formattedDate4;

// const tglTampilBKK = new Date();
// const formattedDate5 = tglTampilBKK.toISOString().substring(0, 10);
// tanggalTampilBKK.value = formattedDate5;

// const tglTampilBKK2 = new Date();
// const formattedDate6 = tglTampilBKK2.toISOString().substring(0, 10);
// tanggalTampilBKK2.value = formattedDate6;

// //#region untuk ambil nama customer
// fetch("/getcust/")
//     .then((response) => response.json())
//     .then((options) => {
//         console.log(options);
//         namaCustomerSelect.innerHTML = "";

//         const defaultOption = document.createElement("option");
//         defaultOption.disabled = true;
//         defaultOption.selected = true;
//         defaultOption.innerText = "Pilih Cust";
//         namaCustomerSelect.appendChild(defaultOption);

//         options.forEach((entry) => {
//             const option = document.createElement("option");
//             option.value = entry.IdCust; // Gunakan entry.IdCust sebagai nilai opsi
//             option.innerText = entry.IdCust + "|" + entry.NamaCust; // Gunakan entry.IdCust dan entry.NamaCust untuk teks opsi
//             namaCustomerSelect.appendChild(option);
//         });
//     });

// namaCustomerSelect.addEventListener("change", function (event) {
//     event.preventDefault();
//     const selectedOption = namaCustomerSelect.options[namaCustomerSelect.selectedIndex];
//     if (selectedOption) {
//         const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
//         const bagiansatu = selectedValue.split(/[-|]/);
//         const idcust = bagiansatu[1];
//         namacust = bagiansatu[2];
//         idCustomer.value = idcust;
//     }
// });
// //#endregion

// //#region ambil list kode perkiraan
// fetch("/getkodeperkiraan/")
//     .then((response) => response.json())
//     .then((options) => {
//         console.log(options);
//         kodePerkiraanSelectBKK.innerHTML = "";

//         const defaultOption = document.createElement("option");
//         defaultOption.disabled = true;
//         defaultOption.selected = true;
//         defaultOption.innerText = "Kode Perkiraan";
//         kodePerkiraanSelectBKK.appendChild(defaultOption);

//         options.forEach((entry) => {
//             const option = document.createElement("option");
//             option.value = entry.NoKodePerkiraan;
//             option.innerText = entry.NoKodePerkiraan + "|" + entry.Keterangan;
//             kodePerkiraanSelectBKK.appendChild(option);
//         });
// });

// kodePerkiraanSelectBKK.addEventListener("change", function (event) {
//     event.preventDefault();
//     const selectedOption = kodePerkiraanSelectBKK.options[kodePerkiraanSelectBKK.selectedIndex];
//     if (selectedOption) {
//         const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
//         const idkp = selectedValue.split(" | ")[0];
//         idKodePerkiraanBKK.value = idkp;
//     }
// });
// //#endregion

// //#region ambil list bank
// fetch("/getbank/")
//     .then((response) => response.json())
//     .then((options) => {
//         console.log(options);
//         namaBankSelect.innerHTML = "";

//         const defaultOption = document.createElement("option");
//         defaultOption.disabled = true;
//         defaultOption.selected = true;
//         defaultOption.innerText = "Bank";
//         namaBankSelect.appendChild(defaultOption);

//         options.forEach((entry) => {
//             const option = document.createElement("option");
//             option.value = entry.Id_Bank;
//             option.innerText = entry.Id_Bank + "|" + entry.Nama_Bank;
//             namaBankSelect.appendChild(option);
//         });

// });

// namaBankSelect.addEventListener("change", function (event) {
//     event.preventDefault();
//     // console.log(idBank.value);
//     const selectedOption = namaBankSelect.options[namaBankSelect.selectedIndex];
//     if (selectedOption) {
//         //const idJenisInput = document.getElementById('idBank');
//         const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
//         const idJenis = selectedValue.split("|")[0];
//         idBankBKK.value = idJenis;
//         //console.log(idBank.value);
//         fetch("/detailjenisbank/" + idBankBKK.value)
//             .then((response) => response.json())
//             .then((options) => {
//                 jenisBankBKK.value = options[0].jenis;
//                 console.log(options);
//             });
//     }
// });
// //#endregion

// //#region untuk ambil mata uang BKK
// fetch("/getmatauang/")
//     .then((response) => response.json())
//     .then((options) => {
//         console.log(options);
//         mataUangSelect.innerHTML="";

//         const defaultOption = document.createElement("option");
//         defaultOption.disabled = true;
//         defaultOption.selected = true;
//         defaultOption.innerText = "Mata Uang";
//         mataUangSelect.appendChild(defaultOption);

//         options.forEach((entry) => {
//             const option = document.createElement("option");
//             option.value = entry.Id_MataUang;
//             option.innerText = entry.Id_MataUang + "|" + entry.Nama_MataUang;
//             mataUangSelect.appendChild(option);
//         });

// });

// mataUangSelect.addEventListener("change", function (event) {
//     event.preventDefault();
//     const selectedOption = mataUangSelect.options[mataUangSelect.selectedIndex];
//     if (selectedOption) {
//         const idKodeInput = document.getElementById('idMataUang');
//         const selectedValue = selectedOption.textContent;
//         const idMU = selectedValue.split("|")[0];
//         idKodeInput.value = idMU;
//     }
// });
// //#endregion

// tanggal.addEventListener("keypress", function (event) {
//     if (event.key == "Enter") {
//         event.preventDefault();

//         var tglInput = new Date(tanggal.valueAsNumber);
//         var currentDate = new Date();
//         if (tglInput > currentDate) {
//             alert("Tanggal SALAH!");
//         } else {
//             mataUangSelect.focus();
//         }
//     }
// });

// btnOK.addEventListener('click', function (event) {
//     event.preventDefault();
//     // clickOK();
//         fetch("/getTabelPelunasanBKMDP/" + idCustomer.value)
//             .then((response) => response.json())
//             .then((options) => {
//                 console.log(options);

//                 dataTable = $("#tabelDataPelunasan").DataTable({
//                     data: options,
//                     columns: [
//                         {
//                             title: "Tgl Input", data: "Tgl_Input",
//                             render: function (data) {
//                                 var date = new Date(data);
//                                 var formattedDate = date.toLocaleDateString();

//                                 return `<div>
//                                             <input type="checkbox" name="divisiCheckbox" value="${formattedDate}" />
//                                             <span>${formattedDate}</span>
//                                         </div>`;
//                             }
//                         },
//                         { title: "Id. BKM", data: "Id_BKM" },
//                         { title: "Id. Bank", data: "Id_bank" },
//                         { title: "Nama Bank", data: "Bank" },
//                         { title: "Mata Uang ", data: "MataUang" },
//                         { title: "Customer", data: "NamaCust" },
//                         { title: "Total Pelunasan", data: "Nilai_Pelunasan",
//                             render: function (data) {
//                                 // Mengubah format angka ke format dengan koma
//                                 return parseFloat(data).toLocaleString();
//                             },
//                         },
//                         { title: "Saldo Pelunasan", data: "SaldoPelunasan",
//                             render: function (data) {
//                                 // Mengubah format angka ke format dengan koma
//                                 return parseFloat(data).toLocaleString();
//                             },
//                         },
//                         { title: "Id. Pelunasan", data: "Id_Pelunasan"},
//                         { title: "Jenis Bank", data: "Jenis_Bank"},
//                         { title: "Id. Uang", data: "Id_MataUang"},
//                         { title: "Id. Cust", data: "ID_Cust"},
//                     ],
//                 });
//             });
// });

// $('#tabelDataPelunasan').on('change', 'input[name="divisiCheckbox"]', function() {
//     if ($(this).prop('checked')) {
//         if (lastCheckedCheckbox && lastCheckedCheckbox !== this) {
//             $(lastCheckedCheckbox).prop('checked', false);
//         }
//         lastCheckedCheckbox = this;
//         const checkboxValue = $(this).val();
//         const rowData = dataTable.row($(this).closest('tr')).data();
//         console.log('Checkbox checked:', checkboxValue, rowData);
//     }
// });

// btnPilihBKM.addEventListener('click', function(event) {
//     event.preventDefault();
//     if (lastCheckedCheckbox) {
//         const rowData = dataTable.row($(lastCheckedCheckbox).closest('tr')).data();

//         // Assuming the order of columns is the same as you provided
//         idbkm = rowData['Id_BKM'];
//         saldo = rowData['SaldoPelunasan'];
//         IdPelunasan = rowData['Id_Pelunasan'];
//         jenisBank = rowData['Jenis_Bank'];
//         idMtUang = rowData['Id_MataUang'];
//         IdCust = rowData['ID_Cust'];
//         tglDP = rowData['Tgl_Input'];

//         const dateObject = new Date(tglDP);

//         const tglInput = new Date(rowData['Tgl_Input']);
//         const formattedDate = tglInput.toISOString().substr(0, 10);
//         tanggal.value = formattedDate;

//         // Get month and year separately
//         bulan.value = dateObject.getMonth() + 1; // +1 karena bulan dimulai dari 0 (Januari) - 11 (Desember)
//         tahun.value = dateObject.getFullYear();

//         rowData['bulan'] = bulan.value;
//         rowData['tahun'] = tahun.value;

//         tanggal.removeAttribute("readonly");
//         mataUangSelect.removeAttribute("readonly");
//         kursRupiah.removeAttribute("readonly");
//         jumlahUang.removeAttribute("readonly");
//         namaBankSelect.removeAttribute("readonly");
//         idKodePerkiraanBKK.removeAttribute("readonly");
//         kodePerkiraanSelectBKK.removeAttribute("readonly");
//         uraian.removeAttribute("readonly");
//     }
// });

// kursRupiah.addEventListener("keypress", function (event) {
//     if (event.key == "Enter") {
//         event.preventDefault();
//         if (parseFloat(kursRupiah.value) > 0) {
//             // Nilai kurs Rupiah lebih besar dari 0, tidak perlu alert
//         } else {
//             alert('Nilai kurs Rupiah harus lebih besar dari 0!');
//         }
//     }
// });

// jumlahUang.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         event.preventDefault();
//         let jumlah = parseFloat(jumlahUang.value).toFixed(2);
//         let kurs = parseFloat(kursRupiah.value);

//         if (jumlah === '0.00') {
//             alert('Jumlah Uang TIDAK BOLEH = 0 !');
//             jumlahUang.focus();
//         } else {
//             let total = 0;
//             console.log(idMtUang);
//             if (idMataUang.value == 1 && idMtUang == 2) {
//                 console.log('masuk');
//                 let nilaipelunasan = parseFloat(kursRupiah.value) * parseFloat(jumlahUang.value);
//                 let saldorp = parseFloat(kursRupiah.value) * saldo;

//                 jumlahUang.value = nilaipelunasan.toFixed(2);

//                 console.log(nilaipelunasan, saldorp);

//                 if (nilaipelunasan > saldorp) {
//                     alert('Jumlah Uang TIDAK BOLEH lebih besar dari Saldo Pelunasan!');
//                     jumlahUang.focus();
//                 }
//             } else if (idMataUang.value == 2 && idMtUang == 1) {
//                 console.log('masuk');
//                 let nilaipelunasan = parseFloat(kursRupiah.value) * parseFloat(jumlahUang.value);
//                 let saldodollar = saldo / parseFloat(kursRupiah.value);

//                 jumlahUang.value = nilaipelunasan.toFixed(2);

//                 console.log(nilaipelunasan, saldodollar);

//                 if (nilaipelunasan > saldodollar) {
//                     alert('Jumlah Uang TIDAK BOLEH lebih besar dari Saldo Pelunasan!');
//                     jumlahUang.focus();
//                 }
//             }
//         }
//     }
// });

// uraian.addEventListener("keypress", function (event) {
//     if (event.key == "Enter") {
//         event.preventDefault();
//         jenis = 'P';

//         if (idBKK.value === "") {
//             if (idBankBKK.value == "KRR1") {
//                 idBankBKK.value = "KI";
//             }
//             else if (idBankBKK.value == "KRR2") {
//                 idBankBKK.value = "KKM";
//             }
//         } else {
//             idBankBKK = idBankBKK.value;
//         }

//         fetch("/getidbkmBKKDP/" + idBankBKK.value + "/" + tanggal.value)
//             .then((response) => response.json())
//             .then((options) => {
//                 console.log(options);
//                 idBKK.value = options;

//                 id_bkk.value = (idBKK.value).substring(4);
//                 console.log(id_bkk.value);
//             });

//         jumlahUangBKM.removeAttribute("readonly");
//         namaBankBKMSelect.removeAttribute("readonly");
//         idBankBKM.removeAttribute("readonly");
//         jenisBankBKM.removeAttribute("readonly");
//         idKodePerkiraanBKM.removeAttribute("readonly");
//         kodePerkiraanBKMSelect.removeAttribute("readonly");
//         uraianBKM.removeAttribute("readonly");

//         tanggal.setAttribute("readonly", true);
//         mataUangSelect.setAttribute("readonly", true);
//         kursRupiah.setAttribute("readonly", true);
//         jumlahUang.setAttribute("readonly", true);
//         namaBankSelect.setAttribute("readonly", true);
//         kodePerkiraanSelectBKK.setAttribute("readonly", true);
//         idKodePerkiraanBKK.setAttribute("readonly", true);
//         uraian.setAttribute("readonly", true);
//     }
// });

// //#region CARD BKM
// fetch("/getkodeperkiraan/")
//     .then((response) => response.json())
//     .then((options) => {
//         console.log(options);
//         kodePerkiraanBKMSelect.innerHTML = "";

//         const defaultOption = document.createElement("option");
//         defaultOption.disabled = true;
//         defaultOption.selected = true;
//         defaultOption.innerText = "Kode Perkiraan";
//         kodePerkiraanBKMSelect.appendChild(defaultOption);

//         options.forEach((entry) => {
//             const option = document.createElement("option");
//             option.value = entry.NoKodePerkiraan;
//             option.innerText = entry.NoKodePerkiraan + "|" + entry.Keterangan;
//             kodePerkiraanBKMSelect.appendChild(option);
//         });
// });

// kodePerkiraanBKMSelect.addEventListener("change", function (event) {
//     event.preventDefault();
//     const selectedOption = kodePerkiraanBKMSelect.options[kodePerkiraanBKMSelect.selectedIndex];
//     if (selectedOption) {
//         const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
//         const idkp = selectedValue.split(" | ")[0];
//         idKodePerkiraanBKM.value = idkp;
//     }
// });
// //#endregion

// //#region ambil list bank untuk BKM
// fetch("/getbank/")
//     .then((response) => response.json())
//     .then((options) => {
//         console.log(options);
//         namaBankBKMSelect.innerHTML = "";

//         const defaultOption = document.createElement("option");
//         defaultOption.disabled = true;
//         defaultOption.selected = true;
//         defaultOption.innerText = "Bank";
//         namaBankBKMSelect.appendChild(defaultOption);

//         options.forEach((entry) => {
//             const option = document.createElement("option");
//             option.value = entry.Id_Bank;
//             option.innerText = entry.Id_Bank + "|" + entry.Nama_Bank;
//             namaBankBKMSelect.appendChild(option);
//         });

// });

// namaBankBKMSelect.addEventListener("change", function (event) {
//     event.preventDefault();
//     // console.log(idBank.value);
//     const selectedOption = namaBankBKMSelect.options[namaBankBKMSelect.selectedIndex];
//     if (selectedOption) {
//         //const idJenisInput = document.getElementById('idBank');
//         const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
//         const idJenis = selectedValue.split("|")[0];
//         idBankBKM.value = idJenis;
//         //console.log(idBank.value);
//         fetch("/detailjenisbank/" + idBankBKM.value)
//             .then((response) => response.json())
//             .then((options) => {
//                 jenisBankBKM.value = options[0].jenis;
//                 console.log(options);
//             });
//     }
// });
// //#endregion

// uraianBKM.addEventListener("keypress", function (event) {
//     if (event.key == "Enter") {
//         event.preventDefault();
//         jenis = 'P';

//         if (idBKM.value === "") {
//             if (idBankBKM.value == "KRR1") {
//                 idBankBKM.value = "KI";
//             }
//             else if (idBankBKM.value == "KRR2") {
//                 idBankBKM.value = "KKM";
//             }
//         } else {
//             idBankBKM = idBankBKM.value;
//         }

//         fetch("/getidbkmBKMDP/" + idBankBKM.value + "/" + tanggal.value)
//             .then((response) => response.json())
//             .then((options) => {
//                 console.log(options);
//                 idBKM.value = options;

//                 id_bkm.value = (idBKM.value).substring(4);
//                 console.log(id_bkm.value);
//             });

//             idBKM.setAttribute("readonly", true);
//             jumlahUangBKM.setAttribute("readonly", true);
//             namaBankBKMSelect.setAttribute("readonly", true);
//             idBankBKM.setAttribute("readonly", true);
//             jenisBankBKM.setAttribute("readonly", true);
//             idKodePerkiraanBKM.setAttribute("readonly", true);
//             kodePerkiraanBKMSelect.setAttribute("readonly", true);
//             uraianBKM.setAttribute("readonly", true);
//     }
// });

// btnProses.addEventListener('click', function(event) {
//     event.preventDefault();
//     if (idBKM.value != "" || idBKM.value != "") {
//         nilai.value = parseFloat(jumlahUang.value);
//         total1 = nilai.toString();
//         // console.log("masuk");
//         if (parseInt(idMataUang.value) == 1) {
//             konversi.value = F_Rupiah(total1); // Menggunakan fungsi F_Rupiah jika kondisi terpenuhi
//         } else {
//             konversi.value = F_Dollar(total1); // Menggunakan fungsi F_DOLLAR jika kondisi tidak terpenuhi
//         }

//         nilai1.value = parseFloat(jumlahUangBKM.value);
//         total2 = nilai1.toString();
//         if (parseInt(idMataUang.value) == 1) {
//             konversi1.value = F_Rupiah(total2); // Menggunakan fungsi F_Rupiah jika kondisi terpenuhi
//         } else {
//             konversi1.value = F_Dollar(total2); // Menggunakan fungsi F_DOLLAR jika kondisi tidak terpenuhi
//         }
//     }
//     else {
//         console.log("Tidak Ada Yg diPROSES!");
//     }
//     fetch("/getIdPembayaran/")
//         .then((response) => response.json())
//         .then((options) => {
//             console.log(options);
//             idPembayaran.value = options.id_pembayaran;

//             formkoreksi.submit();
//     });

//     fetch("/getIdPelunasan/")
//         .then((response) => response.json())
//         .then((options) => {
//             console.log(options);
//             idPelunasan.value = options.Id_Pelunasan;
//             console.log(idPelunasan.value);

//             //formkoreksi.submit();
//     });
//     //formkoreksi.submit();
// })

// //#region untuk koversi jumlah uang
// function F_Rupiah() {
//     var formatted = parseFloat(nilai.value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
//     return formatted;
// }
// function F_Dollar() {
//     var formatted = parseFloat(nilai.value).toFixed(2);
//     return formatted;
// }
// //#endregion

// //#region untuk MODAL TAMPIL BKM
// btnTampilBKM.addEventListener('click', function(event) {
//     event.preventDefault();
//     modalTampilBKM = $("#modalTampilBKM");
//     modalTampilBKM.modal('show');
// });

// btnOkTampilBKM.addEventListener('click', function(event) {
//     event.preventDefault();
//     fetch("/getTabelTampilBKMDP/" + tanggalTampilBKM.value + "/" + tanggalTampilBKM2.value)
//         .then((response) => response.json())
//         .then((options) => {
//             console.log(options);
//             tabelTampilBKM = $("#tabelTampilBKM").DataTable({
//                 data: options,
//                 columns: [
//                     {
//                         title: "Tgl. Input", data: "Tgl_Input",
//                         render: function (data) {
//                             var date = new Date(data);
//                             var formattedDate = date.toLocaleDateString();

//                             return `<div>
//                                         <input type="checkbox" name="dataCheckbox" value="${formattedDate}" />
//                                         <span>${formattedDate}</span>
//                                     </div>`;
//                         }
//                     },
//                     { title: "Id. BKM", data: "Id_BKM" },
//                     { title: "Nilai Pelunasan", data: "Nilai_Pelunasan",
//                         render: function (data) {
//                             // Mengubah format angka ke format dengan koma
//                             return parseFloat(data).toLocaleString();
//                         },
//                     },
//                     { title: "Terjemahan", data: "Terjemahan" },
//                 ]
//             });

//             tabelTampilBKM.on('change', 'input[name="dataCheckbox"]', function() {
//                 $('input[name="dataCheckbox"]').not(this).prop('checked', false);

//                 if ($(this).prop("checked")) {
//                     const checkedCheckbox = tabelTampilBKM.row($(this).closest('tr')).data();
//                     idBKMTampil.value = checkedCheckbox.Id_BKM;
//                 } else {
//                     idBKMTampil.value = "";
//                 }
//             });
//         });
// });

// btnCetakBKM.addEventListener('click', function(event) {
//     event.preventDefault();

//     if ($('input[name="dataCheckbox"]:checked').length === 0) {
//         alert("Pilih 1 Id.BKM Untuk DiCetak!");
//         return;
//     }
//     methodTampilBKM.value="PUT";
//     formTampilBKM.action = "/BKMDPPelunasan/" + idBKMTampil.value;
//     console.log(idBKM.value);
//     formTampilBKM.submit();
// });
// //#endregion

// //#region untuk MODAL TAMPIL BKK
// btnTampilBKK.addEventListener('click', function(event) {
//     event.preventDefault();
//     modalTampilBKK = $("#modalTampilBKK");
//     modalTampilBKK.modal('show');
// });

// btnOkTampilBKK.addEventListener('click', function(event) {
//     event.preventDefault();
//     fetch("/getTabelTampilBKKDP/" + tanggalTampilBKK.value + "/" + tanggalTampilBKK2.value)
//         .then((response) => response.json())
//         .then((options) => {
//             console.log(options);
//             tabelTampilBKK = $("#tabelTampilBKK").DataTable({
//                 data: options,
//                 columns: [
//                     {
//                         title: "Tgl. Input", data: "Tgl_Input",
//                         render: function (data) {
//                             var date = new Date(data);
//                             var formattedDate = date.toLocaleDateString();

//                             return `<div>
//                                         <input type="checkbox" name="dataCheckbox" value="${formattedDate}" />
//                                         <span>${formattedDate}</span>
//                                     </div>`;
//                         }
//                     },
//                     { title: "Id. BKM", data: "Id_BKK" },
//                     { title: "Nilai Pelunasan", data: "Nilai_Pembulatan",
//                         render: function (data) {
//                             // Mengubah format angka ke format dengan koma
//                             return parseFloat(data).toLocaleString();
//                         },
//                     },
//                     { title: "Terjemahan", data: "Terjemahan" },
//                 ]
//             });

//             tabelTampilBKK.on('change', 'input[name="dataCheckbox"]', function() {
//                 $('input[name="dataCheckbox"]').not(this).prop('checked', false);

//                 if ($(this).prop("checked")) {
//                     const checkedCheckbox = tabelTampilBKK.row($(this).closest('tr')).data();
//                     idBKKTampil.value = checkedCheckbox.Id_BKK;
//                 } else {
//                     idBKKTampil.value = "";
//                 }
//             });
//         });
// });

// btnCetakBKK.addEventListener('click', function(event) {
//     event.preventDefault();

//     if ($('input[name="dataCheckbox"]:checked').length === 0) {
//         alert("Pilih 1 Id.BKK Untuk DiCetak!");
//         return;
//     }
//     methodTampilBKK.value="PUT";
//     formTampilBKK.action = "/BKMDPPelunasan/" + idBKKTampil.value;
//     console.log(idBKKTampil.value);
//     formTampilBKK.submit();
// });
// //#endregion

// btnBatal.addEventListener('click', function(event) {
//     event.preventDefault();
//     tanggal.value = "";
//     idBKK.value = "";
//     jumlahUang.value = "";
//     mataUangSelect.selectedIndex = 0;
//     idMataUang.value = "";
//     kursRupiah.value = "";
//     idKodePerkiraanBKK.value = "";
//     idKodePerkiraanBKM.value = "";
//     kodePerkiraanBKMSelect.selectedIndex = 0;
//     kodePerkiraanSelectBKK.selectedIndex = 0;
//     idBKM.value = "";
//     jumlahUangBKM.value = "";
//     uraian.value = "";
//     uraianBKM.value = "";
//     namaCustomerSelect.selectedIndex = 0;
//     idCustomer.value = "";
//     idBankBKK.value = "";
//     idBankBKM.value = "";
//     jenisBankBKK.value = "";
//     jenisBankBKM.value = "";
//     namaBankSelect.selectedIndex = 0;
//     namaBankBKMSelect.selectedIndex = 0;
//     dataTable.clear().draw();

//     tanggal.setAttribute("readonly", true);
//     idBKK.setAttribute("readonly", true);
//     mataUangSelect.setAttribute("readonly", true);
//     kursRupiah.setAttribute("readonly", true);
//     jumlahUang.setAttribute("readonly", true);
//     namaBankSelect.setAttribute("readonly", true);
//     idBankBKK.setAttribute("readonly", true);
//     jenisBankBKK.setAttribute("readonly", true);
//     idKodePerkiraanBKK.setAttribute("readonly", true);
//     kodePerkiraanSelectBKK.setAttribute("readonly", true);
//     uraian.setAttribute("readonly", true);
//     idMataUang.setAttribute("readonly", true);
// });

// btnKoreksi.addEventListener('click', function(event) {
//     event.preventDefault();
//     if (idBKK.value != "") {
//         tanggal.removeAttribute("readonly");
//         mataUangSelect.removeAttribute("readonly");
//         namaBankSelect.removeAttribute("readonly");
//         idKodePerkiraanBKK.removeAttribute("readonly");
//         kodePerkiraanSelectBKK.removeAttribute("readonly");
//         uraian.removeAttribute("readonly");
//     }
// });
// Assigning IDs to JavaScript variables

//
var cust = document.getElementById("cust");
var idCust = document.getElementById("idCust");
var thn1 = document.getElementById("thn1");
var bln1 = document.getElementById("bln1");
var btnCust = document.getElementById("btnCust");
var btnOk = document.getElementById("btnOk");
var csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

var tglInput = document.getElementById("tglInput");
var idBKK = document.getElementById("idBKK");
var idUang = document.getElementById("idUang");
var mataUang = document.getElementById("mataUang");
var btnMataUang = document.getElementById("btnMataUang");
var kurs = document.getElementById("kurs");
var jenisBank1 = document.getElementById("jenisBank1");
var uang1 = document.getElementById("uang1");
var idBank1 = document.getElementById("idBank1");
var bank1 = document.getElementById("bank1");
var btnBank1 = document.getElementById("btnBank1");
var idPerkiraan1 = document.getElementById("idPerkiraan1");
var perkiraan1 = document.getElementById("perkiraan1");
var btnPerkiraan1 = document.getElementById("btnPerkiraan1");
var uraian1 = document.getElementById("uraian1");

var idBKM = document.getElementById("idBKM");
var uang = document.getElementById("uang");
var idBank = document.getElementById("idBank");
var jenisBank = document.getElementById("jenisBank");
var bank = document.getElementById("bank");
var btnBank = document.getElementById("btnBank");
var idPerkiraan = document.getElementById("idPerkiraan");
var perkiraan = document.getElementById("perkiraan");
var btnPerkiraan = document.getElementById("btnPerkiraan");
var uraian = document.getElementById("uraian");

var bln = document.getElementById("bln");
var thn = document.getElementById("thn");

var btnPilih = document.getElementById("btnPilih");
var btnProses = document.getElementById("btnProses");
var btnKoreksiForm = document.getElementById("btnKoreksiForm");
var btnBatal = document.getElementById("btnBatal");
var btnTampilBKM = document.getElementById("btnTampilBKM");
var btnTampilBKK = document.getElementById("btnTampilBKK");

var tglAwalBKM = document.getElementById("tglAwalBKM");
var tglAkhirBKM = document.getElementById("tglAkhirBKM");
var btnOkBKM = document.getElementById("btnOkBKM");
var idCetakBKM = document.getElementById("idCetakBKM");
var btnCetakBKM = document.getElementById("btnCetakBKM");
// var btnProsesBg = document.getElementById('btnProsesBg');
var modalListBKM = document.getElementById("modalListBKM");
var tableListBKM = document.getElementById("tableListBKM");

var tglAwalBKK = document.getElementById("tglAwalBKK");
var tglAkhirBKK = document.getElementById("tglAkhirBKK");
var btnOkBKK = document.getElementById("btnOkBKK");
var idCetakBKK = document.getElementById("idCetakBKK");
var btnCetakBKK = document.getElementById("btnCetakBKK");
// var btnProsesBg = document.getElementById('btnProsesBg');
var modalListBKK = document.getElementById("modalListBKK");
var tableListBKK = document.getElementById("tableListBKK");

// cetak bkm
var nomerBKM = document.getElementById("nomerBKM");
var tanggalBKM = document.getElementById("tanggalBKM");
var nilaiBKM = document.getElementById("nilaiBKM");
var terbilangBKM = document.getElementById("terbilangBKM");
var rincianBKM = document.getElementById("rincianBKM");
var perkiraanBKM = document.getElementById("perkiraanBKM");
var jumlahBKM = document.getElementById("jumlahBKM");
var grandTotalBKM = document.getElementById("grandTotalBKM");
var bkmAcuanBKK = document.getElementById("bkmAcuanBKK");
var bkmTanggalBKK = document.getElementById("bkmTanggalBKK");
var bkmAcuanBKM = document.getElementById("bkmAcuanBKM");
var bkmTanggalBKM = document.getElementById("bkmTanggalBKM");
var sidoarjoBKM = document.getElementById("sidoarjoBKM");
var symbolBKM = document.getElementById("symbolBKM");
var symbolgtBKM = document.getElementById("symbolgtBKM");
var keteranganCetakBKM = document.getElementById("keteranganCetakBKM");

// cetak bkk
var nomerBKK = document.getElementById("nomerBKK");
var tanggalBKK = document.getElementById("tanggalBKK");
var symbolBKK = document.getElementById("symbolBKK");
var nilaiBKK = document.getElementById("nilaiBKK");
var terbilangBKK = document.getElementById("terbilangBKK");
var jenisBayarBKK = document.getElementById("jenisBayarBKK");
var symbolgtBKK = document.getElementById("symbolgtBKK");
var grandTotalBKK = document.getElementById("grandTotalBKK");
var pelunasanBKK = document.getElementById("pelunasanBKK");
var bkkTanggalBKK = document.getElementById("bkkTanggalBKK");
var sidoarjoBKK = document.getElementById("sidoarjoBKK");

var dateNow = document.getElementById("tanggal");
var today = new Date().toISOString().slice(0, 10);
tglInput.value = today;

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

$(document).ready(function () {
    $("#tableData").DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: "Tgl. Input" },
            { title: "Id. BKM" },
            { title: "Id. Bank" },
            { title: "Nama Bank" },
            { title: "Mata Uang" },
            { title: "Customer" },
            { title: "Total Pelunasan" },
            { title: "Saldo Pelunasan" },
        ],
        colResize: {
            isEnabled: true,
            hoverClass: "dt-colresizable-hover",
            hasBoundCheck: true,
            minBoundClass: "dt-colresizable-bound-min",
            maxBoundClass: "dt-colresizable-bound-max",
            saveState: true,
            // isResizable: function (column) {
            //     return column.idx !== 2;
            // },
            onResize: function (column) {
                //console.log('...resizing...');
            },
            onResizeEnd: function (column, columns) {
                // console.log('I have been resized!');
            },
            stateSaveCallback: function (settings, data) {
                let stateStorageName =
                    window.location.pathname + "/colResizeStateData";
                localStorage.setItem(stateStorageName, JSON.stringify(data));
            },
            stateLoadCallback: function (settings) {
                let stateStorageName =
                        window.location.pathname + "/colResizeStateData",
                    data = localStorage.getItem(stateStorageName);
                return data != null ? JSON.parse(data) : null;
            },
        },
        scrollY: "200px",
        autoWidth: false,
        scrollX: "100%",
        columnDefs: [
            {
                targets: [0, 1, 2, 3, 4, 5, 6, 7],
                width: "20%",
                className: "fixed-width",
            },
        ],
    });

    kurs.value = 0;
});

function scrollRowIntoView(rowElement) {
    rowElement.scrollIntoView({ block: "nearest" });
}

function formatDateToMMDDYYYY(date) {
    let dateObj = new Date(date);
    if (isNaN(dateObj)) {
        return "";
    }

    let month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    let day = dateObj.getDate().toString().padStart(2, "0");
    let year = dateObj.getFullYear();

    return `${month}/${day}/${year}`;
}

function decodeHtmlEntities(text) {
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
}

function escapeHtml(text) {
    var map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, function (m) {
        return map[m];
    });
}

function handleTableKeydown(e, tableId) {
    const table = $(`#${tableId}`).DataTable();
    const rows = $(`#${tableId} tbody tr`);
    const rowCount = rows.length;

    if (e.key === "Enter") {
        e.preventDefault();
        const selectedRow = table.row(".selected").data();
        if (selectedRow) {
            Swal.getConfirmButton().click();
        } else {
            const firstRow = $(`#${tableId} tbody tr:first-child`);
            if (firstRow.length) {
                firstRow.click();
                Swal.getConfirmButton().click();
            }
        }
    } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex === null || currentIndex >= rowCount - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex === null || currentIndex <= 0) {
            currentIndex = rowCount - 1;
        } else {
            currentIndex--;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    } else if (e.key === "ArrowRight") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page < pageInfo.pages - 1) {
            table
                .page("next")
                .draw("page")
                .on("draw", function () {
                    currentIndex = 0;
                    const newRows = $(`#${tableId} tbody tr`);
                    const selectedRow = $(newRows[currentIndex]).addClass(
                        "selected"
                    );
                    scrollRowIntoView(selectedRow[0]);
                });
        }
    } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page > 0) {
            table
                .page("previous")
                .draw("page")
                .on("draw", function () {
                    currentIndex = 0;
                    const newRows = $(`#${tableId} tbody tr`);
                    const selectedRow = $(newRows[currentIndex]).addClass(
                        "selected"
                    );
                    scrollRowIntoView(selectedRow[0]);
                });
        }
    }
}

function updateDataTable(data, angka) {
    if (angka === 1) {
        var tableData = $("#tableData").DataTable();
        tableData.clear();
        data.forEach(function (item) {
            tableData.row.add([
                `<div>
                <input type="checkbox" name="divisiCheckbox" value="${formatDateToMMDDYYYY(
                    item.Tgl_Input
                )}" />
                <span>${formatDateToMMDDYYYY(item.Tgl_Input)}</span>
            </div>`,
                escapeHtml(item.Id_BKM),
                escapeHtml(item.Id_bank),
                escapeHtml(item.Bank),
                escapeHtml(item.MataUang),
                escapeHtml(item.NamaCust),
                numeral(parseFloat(item.Nilai_Pelunasan)).format("0,0.00"),
                numeral(parseFloat(item.SaldoPelunasan)).format("0,0.00"),
                escapeHtml(item.Id_Pelunasan),
                escapeHtml(item.Jenis_Bank),
                escapeHtml(item.Id_MataUang),
                escapeHtml(item.ID_Cust),
            ]);
        });
        tableData.draw();
    } else if (angka === 4) {
        var tableListBKM = $("#tableListBKM").DataTable();

        tableListBKM.clear();
        data.forEach(function (item) {
            tableListBKM.row.add([
                formatDateToMMDDYYYY(item.Tgl_Input),
                escapeHtml(item.Id_BKM),
                numeral(parseFloat(item.Nilai_Pelunasan)).format("0,0.00"),
                item.Terjemahan ? escapeHtml(item.Terjemahan) : "",
            ]);
        });
        tableListBKM.draw();
    } else if (angka === 5) {
        var tableListBKK = $("#tableListBKK").DataTable();

        tableListBKK.clear();
        data.forEach(function (item) {
            tableListBKK.row.add([
                formatDateToMMDDYYYY(item.Tgl_Input),
                escapeHtml(item.Id_BKK),
                numeral(parseFloat(item.Nilai_Pembulatan)).format("0,0.00"),
                escapeHtml(item.Terjemahan),
            ]);
        });
        tableListBKK.draw();
    }
}

function enableBKK() {
    tglInput.readOnly = false;
    uang1.readOnly = false;
    uraian1.readOnly = false;
    btnMataUang.disabled = false;
    btnBank1.disabled = false;
    btnPerkiraan1.disabled = false;
}

function disableBKK() {
    tglInput.readOnly = true;
    uang1.readOnly = true;
    uraian1.readOnly = true;
    btnMataUang.disabled = true;
    btnBank1.disabled = true;
    btnPerkiraan1.disabled = true;
}

function enableBKM() {
    uraian.readOnly = false;
    btnBank.disabled = false;
    btnPerkiraan.disabled = false;
}

function disableBKM() {
    uraian.readOnly = true;
    btnBank.disabled = true;
    btnPerkiraan.disabled = true;
}

document.addEventListener("DOMContentLoaded", function () {
    btnCust.focus(); // Set focus on the tglInput element
});

btnCust.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Customer",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenanceBKMUntukDPPelunasan/getCust",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [{ data: "NamaCust" }, { data: "IdCust" }],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                cust.value = decodeHtmlEntities(result.value.NamaCust.trim());
                idCust.value = decodeHtmlEntities(
                    result.value.IdCust.trim().slice(-5)
                );

                btnOk.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btnOk.addEventListener("click", function (e) {
    if (idCust.value !== "") {
        tampilBKM1();
    } else {
        tampilBKM2();
    }
});

function tampilBKM1() {
    $.ajax({
        type: "GET",
        url: "MaintenanceBKMUntukDPPelunasan/tampil1",
        data: {
            _token: csrfToken,
            idCust: idCust.value.trim(),
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result, 1);
            } else {
                var tableData = $("#tableData").DataTable();
                tableData.clear().draw();
                Swal.fire({
                    icon: "info",
                    text: "Tidak Ada Saldo Pelunasan",
                    returnFocus: false,
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

function tampilBKM2() {
    $.ajax({
        type: "GET",
        url: "MaintenanceBKMUntukDPPelunasan/tampil2",
        data: {
            _token: csrfToken,
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result, 1);
            } else {
                var tableData = $("#tableData").DataTable();
                tableData.clear().draw();
                Swal.fire({
                    icon: "info",
                    text: "Tidak Ada Saldo Pelunasan",
                    returnFocus: false,
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

// var dataSelected;
$("#tableData tbody").on("click", "tr", function () {
    var table = $("#tableData").DataTable();
    table.$("tr.selected").removeClass("selected");
    $(this).addClass("selected");

    // dataSelected = table.row(this).data();
});

var dataSelected = [];
var saldo, IdPelunasan, jenisBank, idMtUang, IdCust;

$("#tableData tbody").on("change", 'input[name="divisiCheckbox"]', function () {
    dataSelected = [];
    var tableData = $("#tableData").DataTable();

    $('input[name="divisiCheckbox"]:checked').each(function () {
        var rowData = tableData.row($(this).closest("tr")).data();

        var selectedItem = {
            idbkm: rowData[1],
            saldo: numeral(rowData[7]).format("0,0.00"),
            IdPelunasan: rowData[8],
            jenisBank: rowData[9],
            idMtUang: rowData[10],
            IdCust: rowData[11],
        };

        dataSelected.push(selectedItem);
    });
});

btnPilih.addEventListener("click", function (e) {
    console.log(dataSelected);
    console.log(dataSelected[0].IdPelunasan);

    if (dataSelected.length !== 1) {
        Swal.fire({
            icon: "error",
            text: "Pilih 1 Nomer BKM",
            returnFocus: false,
        });
    } else {
        enableBKK();
        tglInput.focus();
    }
});

$("#tglInput").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();

        if (tglInput.value > today) {
            Swal.fire({
                icon: "error",
                text: "Tanggal SALAH!",
            }).then(() => {
                tglInput.focus();
            });
            return;
        } else {
            var dateValue = new Date(tglInput.value);

            var month = String(dateValue.getMonth() + 1).padStart(2, "0");
            var year = String(dateValue.getFullYear()).slice(-2);

            bln1.value = month;
            thn1.value = year;
            btnMataUang.focus();
        }
    }
});

btnMataUang.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Mata Uang",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MaintenanceBKMUntukDPPelunasan/getMataUang",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            { data: "Nama_MataUang" },
                            { data: "Id_MataUang" },
                        ],
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                idUang.value = decodeHtmlEntities(
                    result.value.Id_MataUang.trim()
                );
                mataUang.value = decodeHtmlEntities(
                    result.value.Nama_MataUang.trim()
                );

                if (idUang.value !== "") {
                    if (
                        String(idUang.value) !==
                        String(dataSelected[0].idMtUang)
                    ) {
                        Swal.fire({
                            icon: "error",
                            text: "Karena mata uang yg dipilih tdk sama dgn mata uang BKM DP-nya, isikan nilai kurs-nya.",
                            returnFocus: false,
                        }).then(() => {
                            kurs.readOnly = false;
                            kurs.focus();
                        });
                    } else {
                        uang1.focus();
                    }
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

$("#kurs").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();

        kurs.value = numeral(kurs.value).format("0,0.00");
        if (kurs.value === 0) {
            Swal.fire({
                icon: "error",
                text: "Kurs TIDAK BOLEH = 0 !",
                returnFocus: false,
            }).then(() => {
                kurs.focus();
            });
            return;
        } else {
            uang1.focus();
        }
    }
});

var nilaipelunasan, saldorp, saldodollar;
$("#uang1").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();

        uang1.value = numeral(uang1.value).format("0,0.00");
        if (numeral(uang1.value).value() === 0) {
            Swal.fire({
                icon: "error",
                text: "Jumlah Uang TIDAK BOLEH = 0 !",
                returnFocus: false,
            }).then(() => {
                uang1.focus();
            });
            return;
        } else if (numeral(kurs.value).value() !== 0) {
            if (
                parseInt(idUang.value) === 1 &&
                parseInt(dataSelected[0].idMtUang) === 2
            ) {
                nilaipelunasan =
                    numeral(kurs.value).value() * numeral(uang1.value).value();
                saldorp =
                    numeral(kurs.value).value() *
                    numeral(dataSelected[0].saldo).value();
                uang1.value = numeral(nilaipelunasan).format("0,0.00");

                if (
                    numeral(nilaipelunasan).value() > numeral(saldorp).value()
                ) {
                    Swal.fire({
                        icon: "error",
                        text: "Jumlah Uang TIDAK BOLEH lebih besar dari Saldo Pelunasan!",
                        returnFocus: false,
                    }).then(() => {
                        uang1.focus();
                    });
                    return;
                } else {
                    btnBank1.focus();
                }
            } else if (
                parseInt(idUang.value) === 2 &&
                parseInt(dataSelected[0].idMtUang) === 1
            ) {
                nilaipelunasan =
                    numeral(uang1.value).value() / numeral(kurs.value).value();
                saldodollar =
                    numeral(dataSelected[0].saldo).value() /
                    numeral(kurs.value).value();
                uang1.value = numeral(nilaipelunasan).format("0,0.00");

                console.log(nilaipelunasan, saldodollar, uang1.value);
                if (
                    numeral(nilaipelunasan).value() >
                    numeral(saldodollar).value()
                ) {
                    Swal.fire({
                        icon: "error",
                        text: "Jumlah Uang TIDAK BOLEH lebih besar dari Saldo Pelunasan!",
                        returnFocus: false,
                    }).then(() => {
                        uang1.focus();
                    });
                    return;
                } else {
                    btnBank1.focus();
                }
            }
        } else if (numeral(kurs.value).value() === 0) {
            nilaipelunasan = numeral(uang1.value).format("0,0.00");
            if (
                numeral(nilaipelunasan).value() >
                numeral(dataSelected[0].saldo).value()
            ) {
                Swal.fire({
                    icon: "error",
                    text: "Jumlah Uang TIDAK BOLEH lebih besar dari Saldo Pelunasan!",
                    returnFocus: false,
                }).then(() => {
                    uang1.focus();
                });
            } else {
                btnBank1.focus();
            }
        }
    }
});

btnBank1.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Bank",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenanceBKMUntukDPPelunasan/getBank",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [{ data: "Id_Bank" }, { data: "Nama_Bank" }],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                idBank1.value = decodeHtmlEntities(result.value.Id_Bank.trim());
                bank1.value = decodeHtmlEntities(result.value.Nama_Bank.trim());
                // uang1.focus();

                if (idBank1.value !== "") {
                    $.ajax({
                        type: "GET",
                        url: "MaintenanceBKMUntukDPPelunasan/getAccBank",
                        data: {
                            _token: csrfToken,
                            idBank: idBank1.value,
                        },
                        success: function (result) {
                            if (result.length !== 0) {
                                jenisBank1.value = result[0].jenis
                                    ? decodeHtmlEntities(result[0].jenis)
                                    : "";
                                btnPerkiraan1.focus();
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                        },
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btnPerkiraan1.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Perkiraan",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenanceBKMUntukDPPelunasan/getPerkiraan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            { data: "NoKodePerkiraan" },
                            { data: "Keterangan" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                idPerkiraan1.value = decodeHtmlEntities(
                    result.value.NoKodePerkiraan.trim()
                );
                perkiraan1.value = decodeHtmlEntities(
                    result.value.Keterangan.trim()
                );

                $.ajax({
                    type: "GET",
                    url: "MaintenanceBKMUntukDPPelunasan/getPerkiraanChange",
                    data: {
                        _token: csrfToken,
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            perkiraan1.value = result[0].Keterangan
                                ? decodeHtmlEntities(result[0].Keterangan)
                                : "";
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });

                uraian1.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

var IdBank1, IdBank;
$("#uraian1").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        if (idBank1.value === "KRR1" || idBank1.value === "KRR2") {
            if (idBank1.value === "KRR2") {
                IdBank1 = "KI";
            }
            if ((idBank1.value = "KRR1")) {
                IdBank1 = "KKK";
            }
        } else {
            IdBank1 = idBank1.value;
        }

        $.ajax({
            type: "GET",
            url: "MaintenanceBKMUntukDPPelunasan/getIdBKK",
            data: {
                _token: csrfToken,
                bank: IdBank1.trim(),
                tahun: new Date(tglInput.value).getFullYear(),
                tgl: tglInput.value,
            },
            success: function (result) {
                if (result) {
                    idBKK.value = decodeHtmlEntities(result.IdBKK);

                    enableBKM();
                    uang.value = numeral(uang1.value).format("0,0.00");
                    btnBank.focus();
                    disableBKK();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }
});

btnBank.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Bank",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenanceBKMUntukDPPelunasan/getBank",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [{ data: "Id_Bank" }, { data: "Nama_Bank" }],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                idBank.value = decodeHtmlEntities(result.value.Id_Bank.trim());
                bank.value = decodeHtmlEntities(result.value.Nama_Bank.trim());
                // uang1.focus();

                if (idBank.value !== "") {
                    $.ajax({
                        type: "GET",
                        url: "MaintenanceBKMUntukDPPelunasan/getAccBank",
                        data: {
                            _token: csrfToken,
                            idBank: idBank.value,
                        },
                        success: function (result) {
                            if (result.length !== 0) {
                                jenisBank.value = result[0].jenis
                                    ? decodeHtmlEntities(result[0].jenis.trim())
                                    : "";
                                btnPerkiraan.focus();
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                        },
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btnPerkiraan.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: "Perkiraan",
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: "40%",
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: "Select",
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "MaintenanceBKMUntukDPPelunasan/getPerkiraan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            },
                        },
                        columns: [
                            { data: "NoKodePerkiraan" },
                            { data: "Keterangan" },
                        ],
                        // columnDefs: [
                        //     {
                        //         targets: 0,
                        //         width: '100px',
                        //     }
                        // ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $("#table_list_filter input");
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener("keydown", (e) =>
                        handleTableKeydown(e, "table_list")
                    );
                });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                idPerkiraan.value = decodeHtmlEntities(
                    result.value.NoKodePerkiraan.trim()
                );
                perkiraan.value = decodeHtmlEntities(
                    result.value.Keterangan.trim()
                );

                uraian.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

$("#uraian").on("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        if (idBank.value === "KRR1" || idBank.value === "KRR2") {
            if (idBank.value === "KRR2") {
                IdBank = "KI";
            }
            if ((idBank.value = "KRR1")) {
                IdBank = "KKM";
            }
        } else {
            IdBank = idBank.value;
        }

        $.ajax({
            type: "GET",
            url: "MaintenanceBKMUntukDPPelunasan/getIdBKM",
            data: {
                _token: csrfToken,
                bank: IdBank.trim(),
                tahun: new Date(tglInput.value).getFullYear(),
                tgl: tglInput.value,
            },
            success: function (result) {
                if (result) {
                    idBKM.value = decodeHtmlEntities(result.IdBKM);

                    disableBKM();
                    btnProses.focus();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }
});

btnKoreksiForm.addEventListener("click", function (e) {
    if (idBKK.value !== "") {
        enableBKK();
        tglInput.focus();
    }
});

btnBatal.addEventListener("click", function (e) {
    // tglInput.value = today;
    // idBKK.value = "";
    // uang1.value = 0;
    // idPerkiraan1.value = "";
    // perkiraan1.value = "";
    // uraian1.value = "";
    // idBKM.value = "";
    // uang.value = "";
    // idPerkiraan.value = "";
    // perkiraan.value = "";
    // uraian.value = "";
    // idCust.value = "";
    // cust.value = "";
    // idBank1.value = "";
    // jenisBank1.value = "";
    // bank1.value = "";
    // idBank.value = "";
    // jenisBank.value = "";
    // bank1.value = "";
    // disableBKK();
    // disableBKM();
    // tampilBKM2();
    // dataSelected = [];
    location.reload();
});

btnProses.addEventListener("click", function (e) {
    let idbkk = isNaN(parseInt(idBKK.value.substring(0, 3)))
        ? 0
        : parseInt(idBKK.value.substring(0, 3));
    let id_bkm = isNaN(parseInt(idBKM.value.substring(0, 3)))
        ? 0
        : parseInt(idBKM.value.substring(0, 3));
    let nilai = 0,
        nilai1 = 0,
        biaya = 0,
        biaya1 = 0;
    let konversi, konversi2, IdPembayaran;

    if (idBKK.value !== "" && idBKM.value !== "") {
        let total1;
        nilai = numeral(uang1.value).value();
        total1 = nilai;

        if (parseInt(idUang.value) === 1) {
            konversi = convertNumberToWordsRupiah(nilai);
        } else {
            konversi = convertNumberToWordsDollar(nilai);
        }

        console.log(total1, " + ", konversi);

        let ajax1 = $.ajax({
            type: "PUT",
            url: "MaintenanceBKMUntukDPPelunasan/insertBKK",
            data: {
                _token: csrfToken,
                idBKK: idBKK.value.trim(),
                tgl: tglInput.value,
                terjemahan: konversi,
                nilai: numeral(parseFloat(nilai)).value(),
                IdBank: idBank1.value.trim(),
            },
        });

        let ajax2 = ajax1.then(() => {
            return $.ajax({
                type: "PUT",
                url: "MaintenanceBKMUntukDPPelunasan/insertDpBKK",
                data: {
                    _token: csrfToken,
                    idBKK: idBKK.value.trim(),
                    idUang: idUang.value,
                    idJenis: 1,
                    idBank: idBank1.value,
                    idBKM_acuan: dataSelected[0].idbkm.trim(),
                    nilai: numeral(parseFloat(nilai)).value(),
                    kurs:
                        numeral(parseFloat(kurs.value)).value() === 0
                            ? numeral(parseFloat(kurs.value)).value()
                            : null,
                },
            });
        });

        let ajax3 = ajax2.then(() => {
            return $.ajax({
                type: "GET",
                url: "MaintenanceBKMUntukDPPelunasan/getIdPembayaran",
                data: {
                    _token: csrfToken,
                },
            }).then((result) => {
                if (result.length !== 0) {
                    IdPembayaran = result ? decodeHtmlEntities(result) : "";
                    console.log(IdPembayaran);

                    return $.ajax({
                        type: "PUT",
                        url: "MaintenanceBKMUntukDPPelunasan/insertDetailBKK",
                        data: {
                            _token: csrfToken,
                            idpembayaran: IdPembayaran,
                            keterangan: uraian1.value,
                            biaya: numeral(uang1.value).value(),
                            kodeperkiraan: idPerkiraan1.value,
                        },
                    });
                }
            });
        });

        let ajax4 = ajax3.then(() => {
            return $.ajax({
                type: "PUT",
                url: "MaintenanceBKMUntukDPPelunasan/updateCounterBKK",
                data: {
                    _token: csrfToken,
                    idbkk: idbkk,
                    idBank: bank1.value.trim(),
                    jenis: jenisBank1.value.trim(),
                    tgl: tglInput.value,
                },
            });
        });

        let total2;
        nilai1 = biaya + numeral(uang.value).value();
        total2 = nilai1;

        if (parseInt(idUang.value) === 1) {
            konversi2 = convertNumberToWordsRupiah(nilai1);
        } else {
            konversi2 = convertNumberToWordsDollar(nilai1);
        }

        console.log(konversi2, "nilai: ", nilai1);

        let ajax5 = $.ajax({
            type: "PUT",
            url: "MaintenanceBKMUntukDPPelunasan/insertBKM",
            data: {
                _token: csrfToken,
                idBKM: idBKM.value.trim(),
                tglinput: tglInput.value,
                terjemahan: konversi2,
                nilai: numeral(parseFloat(nilai1)).value(),
                IdBank: idBank.value.trim(),
            },
        });

        let ajax6 = ajax5.then(() => {
            return $.ajax({
                type: "PUT",
                url: "MaintenanceBKMUntukDPPelunasan/insertDpBKM",
                data: {
                    _token: csrfToken,
                    idBKM: idBKM.value.trim(),
                    tgl: tglInput.value,
                    idUang: idUang.value,
                    idJenis: 1,
                    idBank: idBank.value.trim(),
                    kodeperkiraan: idPerkiraan.value.trim(),
                    uraian: uraian.value.trim(),
                    nilaipelunasan: numeral(nilai1).value(),
                    saldo: numeral(nilai1).value(),
                    idBKKAcuan: idBKK.value,
                    idCust: dataSelected[0].IdCust.trim(),
                    kurs:
                        numeral(parseFloat(kurs.value)).value() === 0
                            ? numeral(parseFloat(kurs.value)).value()
                            : null,
                },
            });
        });

        let ajax7 = ajax6.then(() => {
            return $.ajax({
                type: "PUT",
                url: "MaintenanceBKMUntukDPPelunasan/updateIdBKM",
                data: {
                    _token: csrfToken,
                    idbkm: id_bkm,
                    idBank: IdBank.trim(),
                    jenis: jenisBank.value.trim(),
                    tgl: String(bln1.value) + String(thn1.value),
                },
            });
        });

        let ajax8;
        if (String(idUang.value) !== String(dataSelected[0].idMtUang)) {
            if (
                parseInt(idUang.value) === 1 &&
                parseInt(dataSelected[0].idMtUang) === 2 &&
                numeral(kurs.value).value() > 0
            ) {
                nilaiBaru = nilai / numeral(kurs.value).value();
            } else if (
                parseInt(idUang.value) === 2 &&
                parseInt(dataSelected[0].idMtUang) === 1 &&
                numeral(kurs.value).value() > 0
            ) {
                nilaiBaru = nilai * numeral(kurs.value).value();
            }

            ajax8 = $.ajax({
                type: "PUT",
                url: "MaintenanceBKMUntukDPPelunasan/updateSaldoPelunasan",
                data: {
                    _token: csrfToken,
                    idBKM: dataSelected[0].idbkm.trim(),
                    idPelunasan: dataSelected[0].IdPelunasan,
                    nilai: nilaiBaru,
                },
            });
        } else {
            ajax8 = $.ajax({
                type: "PUT",
                url: "MaintenanceBKMUntukDPPelunasan/updateSaldoPelunasan",
                data: {
                    _token: csrfToken,
                    idBKM: dataSelected[0].idbkm.trim(),
                    idPelunasan: dataSelected[0].IdPelunasan,
                    nilai: nilai,
                },
            });
        }

        $.when(ajax4, ajax7, ajax8).then(() => {
            Swal.fire({
                icon: "success",
                text:
                    "BKK No. " +
                    idBKK.value +
                    " & BKM No. " +
                    idBKM.value +
                    " TerSimpan",
                returnFocus: false,
            }).then(() => {
                // btnBatal.click();
                location.reload();
            });
        });
    } else {
        Swal.fire({
            icon: "error",
            text: "Tidak Ada Yg diPROSES!",
            returnFocus: false,
        }).then(() => {
            enableBKK();
            tglInput.focus();
        });
    }
});

// Event listener for displaying BKK modal
btnTampilBKK.addEventListener("click", function () {
    tglAwalBKK.value = today;
    tglAkhirBKK.value = today;
    idCetakBKK.value = "";

    $("#modalListBKK").on("shown.bs.modal", function () {
        // Initialize both tables if not done already
        initializeTables();

        $.ajax({
            type: "GET",
            url: "MaintenanceBKMUntukDPPelunasan/getListFullBKK",
            data: {
                _token: csrfToken,
            },
            success: function (result) {
                if (result.length !== 0) {
                    updateDataTable(result, 5);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });

        // Clear the BKK table when opening the modal
        var tableBKK = $("#tableListBKK").DataTable();
        tableBKK.clear().draw();
        tglAwalBKK.focus();
    });

    $("#modalListBKK").modal("show");
});

// Event listener for displaying BKM modal
btnTampilBKM.addEventListener("click", function () {
    tglAwalBKM.value = today;
    tglAkhirBKM.value = today;
    idCetakBKM.value = "";

    $("#modalListBKM").on("shown.bs.modal", function () {
        // Initialize both tables if not done already
        initializeTables();

        $.ajax({
            type: "GET",
            url: "MaintenanceBKMUntukDPPelunasan/getListFullBKM",
            data: {
                _token: csrfToken,
            },
            success: function (result) {
                if (result.length !== 0) {
                    updateDataTable(result, 4);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });

        // Clear the BKM table when opening the modal
        var tableBKM = $("#tableListBKM").DataTable();
        tableBKM.clear().draw();
        tglAwalBKM.focus();
    });

    $("#modalListBKM").modal("show");
});

let isTableListBKKInitialized = false; // Flag for BKK table
let isTableListBKMInitialized = false; // Flag for BKM table
// Function to initialize both tables
function initializeTables() {
    if (!isTableListBKKInitialized) {
        // Initialize tableListBKK
        $("#tableListBKK").DataTable({
            paging: false,
            searching: true,
            info: false,
            ordering: false,
            scrollY: "200px",
            scrollX: true,
            autoWidth: false,
            columns: [
                { title: "Tgl. Input" },
                { title: "Id. BKK" },
                { title: "Nilai Pembulatan" },
                { title: "Terbilang" },
            ],
            columnDefs: [
                {
                    targets: [0, 1, 2, 3],
                    width: "25%",
                    className: "fixed-width",
                },
            ],
        });
        isTableListBKKInitialized = true; // Mark as initialized
    }

    if (!isTableListBKMInitialized) {
        // Initialize tableListBKM
        $("#tableListBKM").DataTable({
            paging: false,
            searching: true,
            info: false,
            ordering: false,
            scrollY: "200px",
            scrollX: true,
            autoWidth: false,
            columns: [
                { title: "Tgl. Input" },
                { title: "Id. BKM" },
                { title: "Nilai Pelunasan" },
                { title: "Terbilang" },
            ],
            columnDefs: [
                {
                    targets: [0, 1, 2, 3],
                    width: "25%",
                    className: "fixed-width",
                },
            ],
        });
        isTableListBKMInitialized = true; // Mark as initialized
    }
}

btnOkBKM.addEventListener("click", function () {
    var table = $("#tableListBKM").DataTable();
    table.clear().draw();

    $.ajax({
        type: "GET",
        url: "MaintenanceBKMUntukDPPelunasan/getListBKM",
        data: {
            _token: csrfToken,
            tgl1: tglAwalBKM.value,
            tgl2: tglAkhirBKM.value,
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result, 4);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
});

$("#tableListBKM tbody").on("click", "tr", function () {
    var table = $("#tableListBKM").DataTable();
    table.$("tr.selected").removeClass("selected");
    $(this).addClass("selected");

    var data = table.row(this).data();

    idCetakBKM.value = decodeHtmlEntities(data[1]);
});

btnOkBKK.addEventListener("click", function () {
    var table = $("#tableListBKK").DataTable();
    table.clear().draw();

    $.ajax({
        type: "GET",
        url: "MaintenanceBKMUntukDPPelunasan/getListBKK",
        data: {
            _token: csrfToken,
            tgl1: tglAwalBKK.value,
            tgl2: tglAkhirBKK.value,
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result, 5);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
});

$("#tableListBKK tbody").on("click", "tr", function () {
    var table = $("#tableListBKK").DataTable();
    table.$("tr.selected").removeClass("selected");
    $(this).addClass("selected");

    var data = table.row(this).data();

    idCetakBKK.value = decodeHtmlEntities(data[1]);
});

function printPreview(previewClass) {
    // Hide all content first
    document
        .querySelectorAll(".preview, .preview2")
        .forEach(function (preview) {
            preview.style.display = "none"; // Hide both previews
        });

    // Show the selected preview
    const previewToPrint = document.querySelector(`.${previewClass}`);
    previewToPrint.style.display = "block"; // Show the selected preview

    // Print the current view
    window.print();

    // Reset the display after printing
    previewToPrint.style.display = "none"; // Hide the preview again
}

btnCetakBKM.addEventListener("click", function () {
    if (idCetakBKM.value === "") {
        Swal.fire({
            icon: "error",
            text: "Pilih 1 Id.BKM Untuk DiCetak!",
            returnFocus: false,
        });
        return;
    } else {
        $.ajax({
            type: "GET",
            url: "MaintenanceBKMUntukDPPelunasan/getCetakBKM",
            data: {
                _token: csrfToken,
                id_bkm: idCetakBKM.value,
            },
            success: function (result) {
                console.log(result);

                if (result.length !== 0) {
                    if (
                        result[0].Id_bank === "KRR1" ||
                        result[0].Id_bank === "KRR2"
                    ) {
                        keteranganCetakBKM.innerHTML =
                            "<h5><b>BUKTI PENERIMAAN KAS</b></h5>";
                    } else {
                        keteranganCetakBKM.innerHTML =
                            "<h5><b>BUKTI PENERIMAAN BANK</b></h5>";
                    }

                    nomerBKM.innerHTML =
                        "<h5><b>Nomer: " +
                        decodeHtmlEntities(result[0].Id_BKM) +
                        "</b></h5>";

                    var date = new Date(result[0].Tgl_Input);

                    var monthNames = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ];

                    var day = date.getDate();
                    var month = monthNames[date.getMonth()];
                    var year = date.getFullYear();
                    var formattedDate = day + "/" + month + "/" + year;

                    tanggalBKM.innerHTML =
                        "<h5><b>Tanggal: " + formattedDate + "</b></h5>";

                    symbolBKM.textContent = decodeHtmlEntities(
                        result[0].Symbol
                    );
                    nilaiBKM.textContent = numeral(
                        parseFloat(result[0].Nilai_Pelunasan)
                    ).format("0,0.00");

                    terbilangBKM.textContent = decodeHtmlEntities(
                        result[0].Terjemahan
                    );

                    if (result[0].NamaCust === "-") {
                        rincianBKM.textContent = decodeHtmlEntities(
                            result[0].Uraian
                        );
                    } else {
                        if (result[0].NamaCust !== "-") {
                            rincianBKM.textContent =
                                decodeHtmlEntities(result[0].NamaCust) +
                                " - " +
                                decodeHtmlEntities(result[0].Uraian);
                        }
                    }

                    perkiraanBKM.textContent = decodeHtmlEntities(
                        result[0].KodePerkiraan
                    );
                    jumlahBKM.textContent = numeral(
                        parseFloat(result[0].Nilai_Pelunasan)
                    ).format("0,0.00");

                    symbolgtBKM.textContent = decodeHtmlEntities(
                        result[0].Symbol
                    );
                    grandTotalBKM.textContent = numeral(
                        parseFloat(result[0].Nilai_Pelunasan)
                    ).format("0,0.00");

                    bkmAcuanBKK.textContent = decodeHtmlEntities(
                        result[0].Id_BKK_Acuan
                    );
                    bkmTanggalBKK.textContent =
                        "Tanggal: " + formatDateToMMDDYYYY(result[0].Tgl_BKK);

                    bkmAcuanBKM.textContent = decodeHtmlEntities(
                        result[0].Id_BKM_Acuan
                    );
                    bkmTanggalBKM.textContent =
                        "Tanggal: " + formatDateToMMDDYYYY(result[0].Tgl_BKM);

                    var today = new Date();
                    var day = today.getDate();
                    var month = monthNames[today.getMonth()];
                    var year = today.getFullYear();

                    var formattedToday = day + "/" + month + "/" + year;

                    sidoarjoBKM.innerHTML =
                        "<h5><b>Sidoarjo, " + formattedToday + "</b></h5>";

                    printPreview("preview");
                    updateDateBKM();
                } else {
                    keteranganCetakBKM.innerHTML = "";

                    nomerBKM.innerHTML = "<h5><b>Nomer:</b></h5>";

                    var monthNames = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ];

                    tanggalBKM.innerHTML = "<h5><b>Tanggal: " + "</b></h5>";

                    symbolBKM.textContent = "";
                    nilaiBKM.textContent = "";

                    terbilangBKM.textContent = "";

                    rincianBKM.textContent = "";
                    perkiraanBKM.textContent = "";
                    jumlahBKM.textContent = "";

                    symbolgtBKM.textContent = "";
                    grandTotalBKM.textContent = "";

                    bkmAcuanBKK.textContent = "";
                    bkmTanggalBKK.textContent = "Tanggal: ";

                    bkmAcuanBKM.textContent = "";
                    bkmTanggalBKM.textContent = "Tanggal: ";

                    var today = new Date();
                    var day = today.getDate();
                    var month = monthNames[today.getMonth()];
                    var year = today.getFullYear();

                    var formattedToday = day + "/" + month + "/" + year;

                    sidoarjoBKM.innerHTML =
                        "<h5><b>Sidoarjo, " + formattedToday + "</b></h5>";

                    printPreview("preview");
                    updateDateBKM();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }
});

btnCetakBKK.addEventListener("click", function () {
    if (idCetakBKK.value === "") {
        Swal.fire({
            icon: "error",
            text: "Pilih 1 Id.BKK Untuk DiCetak!",
            returnFocus: false,
        });
        return;
    } else {
        $.ajax({
            type: "GET",
            url: "MaintenanceBKMUntukDPPelunasan/getCetakBKK",
            data: {
                _token: csrfToken,
                id_bkk: idCetakBKK.value,
            },
            success: function (result) {
                if (result.length !== 0) {
                    let totalBKK = 0;
                    var bkmDetailsContainer = document.getElementById(
                        "bkkDetailsContainer"
                    );

                    bkmDetailsContainer.innerHTML = "";

                    nomerBKK.innerHTML =
                        "<h5><b>Nomer: " +
                        decodeHtmlEntities(result[0].Id_BKK) +
                        "</b></h5>";

                    var date = new Date(result[0].Tgl_Input);

                    var monthNames = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                    ];

                    tanggalBKK.innerHTML =
                        "<h5><b>Tanggal: " +
                        formatDateToMMDDYYYY(date) +
                        "</b></h5>";

                    symbolBKK.textContent = decodeHtmlEntities(
                        result[0].Symbol
                    );
                    nilaiBKK.textContent = numeral(
                        parseFloat(result[0].Nilai_Pembulatan)
                    ).format("0,0.00");

                    terbilangBKK.textContent = decodeHtmlEntities(
                        result[0].Terjemahan
                    );

                    jenisBayarBKK.textContent = decodeHtmlEntities(
                        result[0].Jenis_Pembayaran
                    );

                    result.forEach(function (item, index) {
                        var row = document.createElement("div");
                        row.classList.add("row");
                        row.style.width = "95%";

                        var coaCol = document.createElement("div");
                        coaCol.classList.add("col-sm-2", "text-left");
                        coaCol.textContent = item.No_BGCek
                            ? decodeHtmlEntities(item.No_BGCek)
                            : "";
                        coaCol.style.borderLeft = "1px solid black"; // Border kiri
                        coaCol.style.borderRight = "1px solid black"; // Border kanan
                        row.appendChild(coaCol);

                        var accountCol = document.createElement("div");
                        accountCol.classList.add("col-sm-2", "text-left");
                        accountCol.textContent = item.Jatuh_Tempo
                            ? formatDateToMMDDYYYY(item.No_BGCek)
                            : "";
                        accountCol.style.borderLeft = "1px solid black"; // Border kiri
                        accountCol.style.borderRight = "1px solid black"; // Border kanan
                        row.appendChild(accountCol);

                        var descriptionCol = document.createElement("div");
                        descriptionCol.classList.add("col-sm-4", "text-left");
                        descriptionCol.textContent = item.Rincian_Bayar
                            ? decodeHtmlEntities(item.Rincian_Bayar)
                            : "";
                        descriptionCol.style.borderLeft = "1px solid black"; // Border kiri
                        descriptionCol.style.borderRight = "1px solid black"; // Border kanan
                        row.appendChild(descriptionCol);

                        var cekBgCol = document.createElement("div");
                        cekBgCol.classList.add("col-sm-2", "text-center");
                        cekBgCol.textContent = item.Kode_Perkiraan
                            ? decodeHtmlEntities(item.Kode_Perkiraan)
                            : "";
                        cekBgCol.style.borderLeft = "1px solid black"; // Border kiri
                        cekBgCol.style.borderRight = "1px solid black"; // Border kanan
                        row.appendChild(cekBgCol);

                        var amountCol = document.createElement("div");
                        amountCol.classList.add("col-sm-2", "text-right");
                        amountCol.textContent = item.Nilai_Rincian
                            ? numeral(item.Nilai_Rincian).format("0,0.00")
                            : "";
                        amountCol.style.borderLeft = "1px solid black"; // Border kiri
                        amountCol.style.borderRight = "1px solid black"; // Border kanan
                        row.appendChild(amountCol);

                        bkmDetailsContainer.appendChild(row);

                        totalBKK += parseFloat(item.Nilai_Rincian);

                        if (index === result.length - 1) {
                            coaCol.classList.add("underline");
                            accountCol.classList.add("underline");
                            cekBgCol.classList.add("underline");
                            descriptionCol.classList.add("underline");
                            amountCol.classList.add("underline");
                        }
                    });

                    symbolgtBKK.textContent = decodeHtmlEntities(
                        result[0].Symbol
                    );
                    grandTotalBKK.textContent = numeral(
                        parseFloat(totalBKK)
                    ).format("0,0.00");

                    pelunasanBKK.textContent = decodeHtmlEntities(
                        result[0].Id_BKM_Acuan
                    );

                    bkkTanggalBKK.textContent =
                        "Tanggal: " + formatDateToMMDDYYYY(result[0].Tgl_BKM);

                    var today = new Date();
                    var day = today.getDate();
                    var month = monthNames[today.getMonth()];
                    var year = today.getFullYear();

                    var formattedToday = day + "/" + month + "/" + year;

                    sidoarjoBKM.innerHTML =
                        "<h5><b>Sidoarjo, " + formattedToday + "</b></h5>";

                    printPreview("preview2");
                    updateDateBKK();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }
});

function updateDateBKK() {
    $.ajax({
        type: "PUT",
        url: "BKMLC/updateDateBKK",
        data: {
            _token: csrfToken,
            idBKK: idCetakBKK.value.trim(),
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

function updateDateBKM() {
    $.ajax({
        type: "PUT",
        url: "BKMLC/updateDateBKM",
        data: {
            _token: csrfToken,
            idBKM: idCetakBKM.value.trim(),
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}
