//#region variabel
let tgl_awal = document.getElementById("tgl_awal");
let tgl_akhir = document.getElementById("tgl_akhir");

let table_data = $("#tableOrderKerja").DataTable();

let judulstatus = document.getElementById("status");
let no_order = document.getElementById("no_order");
let kodebarang = document.getElementById("Kode_Barang");
let Nomor_Gambar = document.getElementById("Nomor_Gambar");
let jmlh2 = document.getElementById("jmlh2");
let keterangan_order = document.getElementById("keterangan_order");
let pengorder = document.getElementById("pengorder");
let acc_manager = document.getElementById("acc_manager");
let manager = document.getElementById("manager");
let acc_direktur = document.getElementById("acc_direktur");
let tgl_manager = document.getElementById("tgl_manager");
let ket_manager = document.getElementById("ket_manager");
let tgl_direktur = document.getElementById("tgl_direktur");
let ket_direktur = document.getElementById("ket_direktur");
let tgl_teknik = document.getElementById("tgl_teknik");
let ket_teknik = document.getElementById("ket_teknik");
let tunda_teknik = document.getElementById("tunda_teknik");
let btnRefresh = document.getElementById("btnRefresh");
let jmlh1 = document.getElementById("jmlh1");
let pilih;
let Divisi = document.getElementById("kddivisi");
// let user = 4384;
console.log("User number is:", user);

let btnisi = document.getElementById("isi");
let modetrans;

let tanggalmodal = document.getElementById("tanggalmodal");
let isiOrderKerjatitle = document.getElementById("isiOrderKerjatitle");
let iddivisimodalOrder = document.getElementById("iddivisimodalOrder");
let UserModal = document.getElementById("UserModal");
let SatuanModal = document.getElementById("SatuanModal");
let NomorSatuanModal = document.getElementById("NomorSatuanModal");
let NomorGambarModal = document.getElementById("NomorGambarModal");
let Kdbarangmodal = document.getElementById("Kdbarangmodal");
let NamaBarangModal = document.getElementById("NamaBarangModal");

let PrimerModal = document.getElementById("PrimerModal");
let SekunderModal = document.getElementById("SekunderModal");
let tritierModal = document.getElementById("tritierModal");

let buatbarumodal = document.getElementById("buatbarumodal");
let Perbaikanmodal = document.getElementById("Perbaikanmodal");
let formOrderKerja = document.getElementById("formOrderKerja");

let MesinModal = document.getElementById("MesinModal");

let inputpdfmodal = document.getElementById("inputpdfmodal");
let updatepdfmodal = document.getElementById("updatepdfmodal");
let KeteranganModal = document.getElementById("KeteranganModal");
let JumlahModal = document.getElementById("JumlahModal");
let tglOrderkoreksi;
let namabarangkoreksi;
let mesinkoreksi;
let statusmodal;
let colorclass;
let methodFormOrderKerja = document.getElementById("methodFormOrderKerja");
let koreksi = document.getElementById("koreksi");
let formMaintenanceOrderGambar = document.getElementById(
    "formMaintenanceOrderGambar"
);
let methodForm = document.getElementById("methodForm");
let ProsesModal = document.getElementById("ProsesModal");
let fileActionContainer = document.getElementById("fileActionContainer");

no_order.readOnly = true;
acc_manager.readOnly = true;
manager.readOnly = true;
acc_direktur.readOnly = true;
tgl_manager.readOnly = true;
tgl_direktur.readOnly = true;
tgl_teknik.readOnly = true;
//#endregion

//#region get PDF
function getPdf(kodebarang) {
    $.ajax({
        url: "/selectpdf/" + kodebarang,
        method: "GET",
        responseType: "arraybuffer", // Tipe respons yang diharapkan
        success: function (response) {
            // console.log(response);
            if (response.length > 0) {
                // console.log("masuk");
                // var newTabUrl =
                //     window.location.origin + "/selectpdf/" + kodebarang;
                // window.open(newTabUrl, "_blank");
                var newTabUrl =
                    "https://internal.mykrr.co.id/selectpdf/" + kodebarang;
                window.open(newTabUrl, "_blank");
            } else {
                alert(
                    "Data PDF Gambar belum tersedia di database, mohon input PDF Gambar terlebih dahulu."
                );
                inputpdfmodal.disabled = false;
                updatepdfmodal.disabled = true;
            }
        },
        error: function (xhr, status, error) {
            console.error(error);
        },
    });
}

//#endregion

Divisi.focus();

Divisi.addEventListener("change", function () {
    const isConfirmed = confirm(`Tampilkan Semua Order??`);
    cleardata();
    table_data.clear().draw();

    if (isConfirmed) {
        pilih = 1;
        AllData(tgl_awal.value, tgl_akhir.value, Divisi.value);
    } else {
        pilih = 2;
        AllDataUser(tgl_awal.value, tgl_akhir.value, user, Divisi.value);
    }

    Mesin(Divisi.value);
});
//#region warna

table_data.on("draw", function () {
    table_data.rows().every(function () {
        let data = this.data();
        if (data.Tgl_TdStjMg !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("acs-empty-cell");
        }
        if (data.Manager !== null && data.User_Apv_2 == "N") {
            $(this.node()).removeClass();
            $(this.node()).addClass("blue-color");
        }
        if (data.Tgl_TdStjDir !== null && data.Manager !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("gray-color");
        }
        if (data.User_Apv_2 == "Y" && data.Tgl_Tolak_Mng === null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("red-color");
        }
        if (data.Tgl_Pending !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("magenta-color");
        }
        if (data.Tgl_Tolak_Mng !== null) {
            $(this.node()).removeClass();
            $(this.node()).addClass("green-color");
        }
        if (
            data.Tgl_TdStjMg == null &&
            data.User_Apv_1 == null &&
            // data.User_Apv_2 == null &&
            data.Tgl_Tolak_Mng == null &&
            data.Tgl_Pending == null
        ) {
            $(this.node()).removeClass();
            $(this.node()).addClass("black-color");
        }
    });
});

//#endregion

//#region set tanggal
const currentDate = new Date();

// Get the first day of the current month
const firstDayOfMonth = new Date();
firstDayOfMonth.setDate(1);
console.log(Date(currentDate.getFullYear(), currentDate.getMonth(), 1));

// Format the date to be in 'YYYY-MM-DD' format for setting the input value
const formattedFirstDay = firstDayOfMonth.toISOString().slice(0, 10);

// Format the current date to be in 'YYYY-MM-DD' format for setting the input value
const formattedCurrentDate = currentDate.toISOString().slice(0, 10);

// Set the values of the input fields to the calculated dates
tgl_awal.value = formattedFirstDay;
tgl_akhir.value = formattedCurrentDate;
//#endregion

//#region tampil alldata
function AllData(tglAwal, tglAkhir, idDivisi) {
    fetch("/getalldatakerja/" + tglAwal + "/" + tglAkhir + "/" + idDivisi)
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            datas.forEach((data) => {
                // Ambil nilai Tgl_Order dari setiap objek data
                const tglOrder = data.Tgl_Order;
                // const tglTSmanager = data.Tgl_TdStjMg;

                // Split tanggal dan waktu dengan separator spasi
                const [tanggal, waktu] = tglOrder.split(" ");
                // const [tanggalTsM, waktuTsM] = tglTSmanager.split(" ");

                // Update properti Tgl_Order pada setiap objek data dengan format tanggal saja
                data.Tgl_Order = tanggal;
                // data.Tgl_TdStjMg = tanggalTsM;
            });
            if (datas.length == 0) {
                console.log("masuk ke == 0");

                alert(
                    "Tidak ada Order, tgl " + tglAwal + " s/d tgl " + tglAkhir
                );
            } else {
                console.log(datas); // Optional: Check the data in the console
                table_data = $("#tableOrderKerja").DataTable({
                    destroy: true, // Destroy any existing DataTable before reinitializing
                    data: datas,
                    columns: [
                        { title: "Nomor Order", data: "Id_Order" }, // Sesuaikan 'name' dengan properti kolom di data
                        { title: "Tanggal Order", data: "Tgl_Order" }, // Sesuaikan 'age' dengan properti kolom di data
                        { title: "Nama Barang", data: "Nama_Brg" }, // Sesuaikan 'country' dengan properti kolom di data
                        { title: "Status Order", data: "Status" },
                        { title: "Nomor Gambar", data: "No_Gbr" },
                        { title: "Mesin", data: "Mesin" },
                    ],
                });
                table_data.draw();
            }
        });
}
//#endregion

//#region data berdasarkan user

function AllDataUser(tglAwal, tglAkhir, idUser, idDivisi) {
    fetch(
        "/GatDataForUserOrderkerja/" +
            tglAwal +
            "/" +
            tglAkhir +
            "/" +
            idUser +
            "/" +
            idDivisi
    )
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            datas.forEach((data) => {
                // Ambil nilai Tgl_Order dari setiap objek data
                const tglOrder = data.Tgl_Order;
                // const tglTSmanager = data.Tgl_TdStjMg;

                // Split tanggal dan waktu dengan separator spasi
                const [tanggal, waktu] = tglOrder.split(" ");
                // const [tanggalTsM, waktuTsM] = tglTSmanager.split(" ");

                // Update properti Tgl_Order pada setiap objek data dengan format tanggal saja
                data.Tgl_Order = tanggal;
                // data.Tgl_TdStjMg = tanggalTsM;
            });
            console.log(datas.length); // Optional: Check the data in the console
            if (datas.length == 0) {
                //console.log("masuk ke == 0");
                alert(
                    "Tidak ada Order, tgl " +
                        tglAwal +
                        " s/d tgl " +
                        tglAkhir +
                        " u/ User " +
                        idUser
                );
            } else {
                table_data = $("#tableOrderKerja").DataTable({
                    destroy: true, // Destroy any existing DataTable before reinitializing
                    data: datas,
                    columns: [
                        { title: "Nomor Order", data: "Id_Order" }, // Sesuaikan 'name' dengan properti kolom di data
                        { title: "Tanggal Order", data: "Tgl_Order" }, // Sesuaikan 'age' dengan properti kolom di data
                        { title: "Nama Barang", data: "Nama_Brg" }, // Sesuaikan 'country' dengan properti kolom di data
                        { title: "Status Order", data: "Status" },
                        { title: "Nomor Gambar", data: "No_Gbr" },
                        { title: "Mesin", data: "Mesin" },
                    ],
                });
            }
        });
}

//#endregion

//#region clear data
function cleardata() {
    judulstatus.textContent = "";
    no_order.value = "";
    kodebarang.value = "";
    // jmlh1.value = selectedRows[0].
    Nomor_Gambar.value = "";
    jmlh2.value = "";
    keterangan_order.value = "";
    pengorder.value = "";
    acc_manager.value = ""; //tglACCmanager[0];
    manager.value = "";
    acc_direktur.value = "";
    tgl_manager.value = "";
    ket_manager.value = "";
    tgl_direktur.value = "";
    ket_direktur.value = "";
    tgl_teknik.value = "";
    ket_teknik.value = "";
    tunda_teknik.value = "";
}
//#endregion

// #region divisi di ubah

// Divisi.addEventListener("change", function () {
//     const isConfirmed = confirm(`Tampilkan Semua Order??`);
//     //Mesin(Divisi.value);
//     if (isConfirmed) {
//         pilih = 1;
//         cleardata();
//         table_data.clear().draw();
//         AllData(tgl_awal.value, tgl_akhir.value, Divisi.value);
//         Mesin(Divisi.value);
//     } else {
//         console.log("masuk");
//         pilih = 2;
//         cleardata();
//         // dataTable.fnClearTable();
//         AllDataUser(tgl_awal.value, tgl_akhir.value, user, Divisi.value);
//         Mesin(Divisi.value);
//     }
// });

//#endregion

//#region btn isi klik
function klikisi() {
    if (Divisi.value == "Pilih Divisi") {
        alert("Pilih Divisi Anda");
    } else {
        ProsesModal.disabled = false;
        cleartext();
        modetrans = 1;

        btnisi.setAttribute("data-toggle", "modal");
        btnisi.setAttribute("data-target", "#OrderKerja");
        Divisi.options[Divisi.selectedIndex].text.split("--")[1];
        isiOrderKerjatitle.textContent =
            Divisi.options[Divisi.selectedIndex].text.split("--")[1];
        iddivisimodalOrder.value = Divisi.value;
        tanggalmodal.valueAsDate = new Date();
        // tanggalmodal.value = formattedFirstDay;
        UserModal.value = user;
    }
}

//#endregion

//#region ubah satuan
SatuanModal.addEventListener("change", function () {
    NomorSatuanModal.value = SatuanModal.value;
});
//#endregion

//#region get select

function setSelectByText(selectElement, text) {
    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].textContent === text) {
            selectElement.selectedIndex = i;
            break;
        }
    }
}

//#endregion

//#region LoadData2

function LoadData2(Kdbarang) {
    fetch("/LoadData2/" + Kdbarang)
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            console.log("load data 2");
            PrimerModal.value = datas[0].SaldoPrimer + " " + datas[0].SPrimer;
            SekunderModal.value =
                datas[0].SaldoSekunder + " " + datas[0].SSekunder;
            tritierModal.value =
                datas[0].SaldoTritier + " " + datas[0].STritier;
        });
}

//#endregion

//#region LoadData1

function LoadData1(NoGambar) {
    fetch("/LoadData1/" + NoGambar)
        .then((response) => response.json())
        .then((datas) => {
            //console.log(datas);
            if (datas.length !== 0) {
                NamaBarangModal.value = datas[0].NAMA_BRG;
                Kdbarangmodal.value = datas[0].KD_BRG;
                setSelectByText(SatuanModal, datas[0].Nama_satuan);
                LoadData2(Kdbarangmodal.value);
                NomorSatuanModal.value = SatuanModal.value;
            }
        });
}

//#endregion

//#region Nomor Gambar Enter

NomorGambarModal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (NomorGambarModal.value !== "") {
            LoadData1(NomorGambarModal.value);
            console.log(SatuanModal.value);
            NomorSatuanModal.value = SatuanModal.value;
        } else {
            Kdbarangmodal.focus();
        }
    }
});

//#endregion

//#region LoadData

function LoadData(kdbarang) {
    fetch("/LoadData/" + kdbarang)
        .then((response) => response.json())
        .then((datas) => {
            console.log(datas);
            if (datas.length == 0) {
                alert(
                    "Kode Barang Tidak Ada, Atau Kode Barang Tsb Tdk Punya No. Gambar"
                );
                NamaBarangModal.value = "";
                NomorGambarModal.value = "";
                SatuanModal.value = "Pilih Satuan";
                NomorSatuanModal.value = "";
                PrimerModal.value = "";
                SekunderModal.value = "";
                tritierModal.value = "";
                // return "tidak ada";
            } else {
                NamaBarangModal.value = datas[0].NAMA_BRG;
                NomorGambarModal.value = datas[0].No_Gambar;
                updatepdfmodal.disabled = false;
                inputpdfmodal.disabled = true;
                setSelectByText(SatuanModal, datas[0].Nama_satuan);
                LoadData2(Kdbarangmodal.value);
                NomorSatuanModal.value = SatuanModal.value;
                const isConfirmed = confirm(
                    `ingin Menampilkan Gambar Order : ` + kodebarang.value
                );
                if (isConfirmed) {
                    getPdf(Kdbarangmodal.value);
                }
            }
        });
}

//#endregion

//#region Kdbarang di enter

Kdbarangmodal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (Kdbarangmodal.value !== "") {
            let kodeBarang9digit;
            kodeBarang9digit = document.getElementById("Kdbarangmodal");
            // console.log(kodeBarang9digit.value);
            // alert('Kode barang dienter');
            if (kodeBarang9digit.value.length < 9) {
                // alert("kode barang tidak sesuai");
                kodeBarang9digit.value = Kdbarangmodal.value.padStart(9, "0");
                // console.log(kodeBarang9digit.value);
            }
            Kdbarangmodal.value = kodeBarang9digit.value;
            LoadData(Kdbarangmodal.value);
        } else {
            alert("Inputkan Nomer Gambar Atau Kode Barangnya");
        }
    }
});

//#endregion

//#region mesin

function Mesin(iddivisi) {
    fetch("/Mesinmodal/" + iddivisi)
        .then((response) => response.json())
        .then((options) => {
            //mesin buat form baru

            MesinModal.innerHTML = "";
            //
            const defaultOption = document.createElement("option");
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.innerText = "Pilih Mesin";
            MesinModal.appendChild(defaultOption);
            //
            options.forEach((entry) => {
                const option = document.createElement("option");
                option.value = entry.Nomer;
                option.innerText = entry.Mesin + "--" + entry.Nomer;
                MesinModal.appendChild(option);
            });
        });
}
//#endregion

//#region button proses modal

function prosesmodalklik() {
    if (buatbarumodal.checked == false && Perbaikanmodal.checked == false) {
        alert("Pilih Order Kerja Utk 'Buat Baru' Atau 'Perbaikan'");
    } else {
        ProsesModal.disabled = true;
        // console.log("masuk else");
        if (modetrans == 1) {
            formOrderKerja.submit();
        }
        if (modetrans == 2) {
            methodFormOrderKerja.value = "PUT";
            formOrderKerja.action = "/MaintenanceOrderKerja/" + no_order.value;
            formOrderKerja.submit();
        }
    }
}

//#endregion

//#region table on click
$("#tableOrderKerja tbody").off("click", "tr");
$("#tableOrderKerja tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#tableOrderKerja tbody tr.selected");
    // console.log(checkSelectedRows);
    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    let classSelectedRow = $(this).attr("class");
    colorclass = classSelectedRow;

    console.log(classSelectedRow);
    $(this).toggleClass("selected");
    const table = $("#tableOrderKerja").DataTable();
    let selectedRows = table.rows(".selected").data().toArray();
    //cek dokumentasi
    checkDokumentasi(selectedRows[0].Id_Order);
    console.log(selectedRows[0]);
    judulstatus.textContent = selectedRows[0].Status;
    no_order.value = selectedRows[0].Id_Order;
    kodebarang.value = selectedRows[0].Kd_Brg;
    Nomor_Gambar.value = selectedRows[0].No_Gbr;
    jmlh1.value = selectedRows[0].Jml_Brg;
    jmlh2.value = selectedRows[0].Nama_satuan;
    keterangan_order.value = selectedRows[0].Ket_Order;
    pengorder.value = selectedRows[0].User_Order;
    acc_manager.value = selectedRows[0].Tgl_Apv_1?.split(" ")[0] ?? ""; //tglACCmanager[0];
    manager.value = selectedRows[0].Manager;
    acc_direktur.value = selectedRows[0].Tgl_Apv_2?.split(" ")[0] ?? "";
    tgl_manager.value = selectedRows[0].Tgl_TdStjMg?.split(" ")[0] ?? "";
    ket_manager.value = selectedRows[0].Ref_TdStjMg;
    tgl_direktur.value = selectedRows[0].Tgl_TdStjDir?.split(" ")[0] ?? "";
    ket_direktur.value = selectedRows[0].Ref_TdStjDir;
    tgl_teknik.value = selectedRows[0].Tgl_Tolak_Mng?.split(" ")[0] ?? "";
    ket_teknik.value = selectedRows[0].Ref_Tolak_Mng;
    tglOrderkoreksi = selectedRows[0].Tgl_Order?.split(" ")[0] ?? "";
    namabarangkoreksi = selectedRows[0].Nama_Brg;
    mesinkoreksi = selectedRows[0].Mesin;
    statusmodal = selectedRows[0].Status;
});
//#endregion

//#region clear text

function cleartext() {
    tanggalmodal.value = "";
    buatbarumodal.checked = false;
    Perbaikanmodal.checked = false;
    Kdbarangmodal.value = "";
    inputpdfmodal.value = "";
    NomorGambarModal.value = "";
    NamaBarangModal.value = "";
    updatepdfmodal.value = "";
    KeteranganModal.value = "";
    JumlahModal.value = "";
    SatuanModal.value = "Pilih Satuan";
    MesinModal.value = "Pilih Mesin";
    PrimerModal.value = "";
    SekunderModal.value = "";
    tritierModal.value = "";
}

//#endregion

//#region koreksi
function koreksiklik() {
    console.log(user);
    console.log(pengorder.value);
    console.log(user != pengorder.value);

    if (colorclass == "acs-empty-cell") {
        alert("Order Tidak Boleh Di-KOREKSI. Order hangus.");
        return;
    }
    if (tgl_teknik.value !== "") {
        alert("Order Tidak Boleh Di-KOREKSI. Order ditolak.");
        return;
    }
    if (manager.value !== "" || acc_direktur.value !== "") {
        alert("Order Tidak Boleh Di-HAPUS. Sudah di-ACC");
        return;
    }
    if (user !== pengorder.value.trim()) {
        alert("Anda Tidak Boleh Meng-HAPUS Order Dari User " + user);
        return;
    }
    if (no_order.value !== "") {
        ProsesModal.disabled = false;
        cleartext();
        modetrans = 2;
        koreksi.setAttribute("data-toggle", "modal");
        koreksi.setAttribute("data-target", "#OrderKerja");
        if (judulstatus.textContent == "BUAT BARU") {
            buatbarumodal.checked = true;
        }
        if (judulstatus.textContent == "PERBAIKAN") {
            Perbaikanmodal.checked = true;
        }
        Divisi.options[Divisi.selectedIndex].text.split("--")[1];
        isiOrderKerjatitle.textContent =
            Divisi.options[Divisi.selectedIndex].text.split("--")[1];
        iddivisimodalOrder.value = Divisi.value;
        NamaBarangModal.value = tanggalmodal.value = tglOrderkoreksi;
        UserModal.value = user;
        NamaBarangModal.value = namabarangkoreksi;
        Kdbarangmodal.value = kodebarang.value;
        NomorGambarModal.value = Nomor_Gambar.value;
        KeteranganModal.value = keterangan_order.value;
        JumlahModal.value = jmlh1.value;

        SatuanModal.selectedIndex = 0;
        for (let i = 0; i < SatuanModal.length; i++) {
            // console.log(satuanJual.selectedIndex);
            SatuanModal.selectedIndex += 1;
            if (
                SatuanModal.options[SatuanModal.selectedIndex].text ===
                jmlh2.value.trim()
            ) {
                break;
            }
        }
        MesinModal.selectedIndex = 0;
        //console.log(MesinModal.length);
        for (let i = 0; i < MesinModal.length; i++) {
            // console.log(satuanJual.selectedIndex);
            MesinModal.selectedIndex += 1;
            // console.log(MesinModal.option[MesinModal.selectedIndex].text.split("--"));
            if (
                MesinModal.options[MesinModal.selectedIndex].text.split(
                    "--"
                )[0] === mesinkoreksi.trim()
            ) {
                break;
            }
        }
        if (statusmodal == "Buat Baru") {
            buatbarumodal.checked = true;
            Perbaikanmodal.checked = false;
        }
        if (statusmodal == "Perbaikan") {
            buatbarumodal.checked = false;
            Perbaikanmodal.checked = true;
        }
    }
}

//#endregion

//#region input pdf

inputpdfmodal.addEventListener("change", function (event) {
    event.preventDefault();

    var form = document.createElement("form");
    form.id = "inputpdf";
    form.enctype = "multipart/form-data";
    form.method = "post"; // Ganti dengan metode pengiriman yang sesuai
    form.action = "/inputfile";
    var csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    // Membuat input element untuk CSRF token
    var csrfInput = document.createElement("input");
    csrfInput.type = "hidden";
    csrfInput.name = "_token"; // Nama field yang diharapkan oleh Laravel
    csrfInput.value = csrfToken;

    var kode = document.createElement("input");
    kode.type = "hidden";
    kode.name = "kode";
    kode.value = Kdbarangmodal.value;

    // Menyisipkan input CSRF token ke dalam form
    form.appendChild(csrfInput);
    form.appendChild(kode);
    form.appendChild(inputpdfmodal, inputpdfmodal.files);
    document.getElementById("inputpdfdiv").appendChild(form);
    // console.log(inputpdfmodal.files);

    // form.submit();

    // $(form).on("submit", function (event) {
    //     event.preventDefault();

    let url = $(form).attr("action");

    $.ajax({
        url: url,
        method: "POST",
        data: new FormData(form),
        dataType: "JSON",
        contentType: false,
        cache: false,
        processData: false,
        success: function (response) {
            // alert(response.success);
        },
    });
    // });
});

//#endregion

//#region update pdf
updatepdfmodal.addEventListener("change", function (event) {
    event.preventDefault();
    var form = document.createElement("form");
    form.id = "updatepdf";
    form.enctype = "multipart/form-data";
    form.method = "post"; // Ganti dengan metode pengiriman yang sesuai
    form.action = "/updatefile";
    var csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    // Membuat input element untuk CSRF token
    var csrfInput = document.createElement("input");
    csrfInput.type = "hidden";
    csrfInput.name = "_token"; // Nama field yang diharapkan oleh Laravel
    csrfInput.value = csrfToken;

    var kode = document.createElement("input");
    kode.type = "hidden";
    kode.name = "kode";
    kode.value = Kdbarangmodal.value;

    // Menyisipkan input CSRF token ke dalam form
    form.appendChild(csrfInput);
    form.appendChild(kode);
    form.appendChild(updatepdfmodal, updatepdfmodal.files);
    document.getElementById("updatepdfdiv").appendChild(form);

    let url = $(form).attr("action");

    $.ajax({
        url: url,
        method: "POST",
        data: new FormData(form),
        dataType: "JSON",
        contentType: false,
        cache: false,
        processData: false,
        success: function (response) {
            // alert(response.success);
        },
    });
    // console.log(inputpdfmodal.files);
});

//#endregion

//#region button hapus

function hapusklik() {
    if (colorclass == "acs-empty-cell") {
        alert("Order Tidak Boleh Di-KOREKSI. Order hangus.");
    }
    if (manager.value != "") {
        alert("Order Tidak Boleh Di-HAPUS. Sudah di-ACC");
    } else if (user != pengorder.value.trim()) {
        alert("Anda Tidak Boleh Meng-HAPUS Order Dari User " + user);
    }
    if (no_order.value !== "") {
        const isConfirmed = confirm(`ingin menghapus order ` + no_order.value);
        if (isConfirmed) {
            methodForm.value = "DELETE";
            // console.log("delete", no_order.value);
            formMaintenanceOrderGambar.action =
                "/MaintenanceOrderKerja/" + no_order.value;
            formMaintenanceOrderGambar.submit();
        }
    }
}

//#endregion

//#region uppercase keterangan

KeteranganModal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        KeteranganModal.value = KeteranganModal.value.toUpperCase();
        JumlahModal.focus();
    }
});

//#endregion

//#region set focus

JumlahModal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        MesinModal.focus();
    }
});
// MesinModal.addEventListener('keydown', function(event){
//     // event.preventDefault();
//     if (event.key === "Enter") {
//         // console.log("masuk enter");
//         ProsesModal.focus();
//     }
// });

//#endregion

//#region refresh

btnRefresh.addEventListener("click", function (e) {
    if (kddivisi.selectedIndex > 0) {
        const isConfirmed = confirm(`Tampilkan Semua Order??`);
        cleardata();
        table_data.clear().draw();

        if (isConfirmed) {
            pilih = 1;
            AllData(tgl_awal.value, tgl_akhir.value, Divisi.value);
        } else {
            pilih = 2;
            AllDataUser(tgl_awal.value, tgl_akhir.value, user, Divisi.value);
        }
    }
});

//#endregion


//#region file upload

function renderFileButton(hasFile) {

    fileActionContainer.innerHTML = "";

    if (hasFile == 0) {

        fileActionContainer.innerHTML = `
            <button type="button"
                class="btn btn-primary btn-sm"
                id="btnUploadDok">
                Upload File
            </button>
            <input type="file" id="hiddenDokOrder" style="display:none;">
        `;

        initUploadEvent();

    } else {

        fileActionContainer.innerHTML = `
            <button type="button"
                class="btn btn-success btn-sm"
                id="btnDownloadDok">
                Download File
            </button>

            <button type="button"
                class="btn btn-danger btn-sm"
                id="btnDeleteDok">
                Delete File
            </button>
        `;

        initDownloadDeleteEvent();
    }
}


function checkDokumentasi(noOrder) {

    fetch("/MaintenanceOrderKerja/checkDokumentasi/" + noOrder)
        .then(response => response.json())
        .then(res => {
            renderFileButton(res.hasFile);
        })
        .catch(err => console.error(err));
}

function initUploadEvent() {

    let btnUploadDok = document.getElementById("btnUploadDok");
    let hiddenDokOrder = document.getElementById("hiddenDokOrder");

    btnUploadDok.addEventListener("click", function () {

        if (!no_order.value) {
            alert("Pilih Order terlebih dahulu");
            return;
        }

        hiddenDokOrder.click();
    });

    hiddenDokOrder.addEventListener("change", function () {
        console.log("FILE SELECTED");

        if (!this.files.length) return;

        let formData = new FormData();
        formData.append("noOrder", no_order.value);
        formData.append("attach_file", this.files[0]);

        console.log("SEND AJAX");

        $.ajax({
            url: "/MaintenanceOrderKerja/uploadDokumentasi",
            type: "POST",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {

                if (res.success) {
                    alert("Upload berhasil");
                    renderFileButton(1);
                } else {
                    alert(res.message);
                }
            }
        });
    });
}

function initDownloadDeleteEvent() {

    let btnDownloadDok = document.getElementById("btnDownloadDok");
    let btnDeleteDok = document.getElementById("btnDeleteDok");

    btnDownloadDok.addEventListener("click", function () {

        if (!no_order.value) {
            alert("Pilih Order terlebih dahulu");
            return;
        }

        window.location.href =
            "/MaintenanceOrderKerja/getDokumentasi/" + no_order.value;
    });

    btnDeleteDok.addEventListener("click", function () {

        if (!confirm("Yakin hapus dokumentasi?")) return;

        $.ajax({
            url: "/MaintenanceOrderKerja/deleteDokumentasi/" + no_order.value,
            type: "DELETE",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            success: function (res) {

                if (res.success) {
                    alert("File berhasil dihapus");
                    renderFileButton(0);
                } else {
                    alert(res.message);
                }
            }
        });
    });
}

//#endregion
