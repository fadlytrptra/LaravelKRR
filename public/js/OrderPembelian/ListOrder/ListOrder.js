//#region Variable

let btn_clear = document.getElementById("btn_clear");
let btn_delete = document.getElementById("btn_delete");
let btn_save = document.getElementById("btn_save");
let btn_submit = document.getElementById("btn_submit");
let btn_tambahOrder = document.getElementById("btn_tambahOrder");
let closeModalButton = document.getElementById("closeModalButton");
let csrfToken = $('meta[name="csrf-token"]').attr("content");
let data;
let divisi = document.getElementById("divisi");
let foto = document.getElementById("foto");
let previewFoto = document.getElementById("previewFoto");
let kd_barang = document.getElementById("kd_barang");
let kdBarangAslinya = "";
let ket_barang = document.getElementById("ket_barang");
let ket_internal = document.getElementById("ket_internal");
let ket_khusus = document.getElementById("ket_khusus");
let ket_order = document.getElementById("ket_order");
let ketStatusOrder = document.getElementById("ketStatusOrder");
let no_order = document.getElementById("no_order");
let NoTrans;
let pemesan = document.getElementById("pemesan");
let qty_order = document.getElementById("qty_order");
let select_divisi = document.getElementById("select_divisi");
let selectedDivisi = document.getElementById("selectedDivisi");
let select_golongan = document.getElementById("select_golongan");
let select_kategori = document.getElementById("select_kategori");
let select_kategori_utama = document.getElementById("select_kategori_utama");
let select_mesinGolongan = document.getElementById("select_mesinGolongan");
let select_namaBarang = document.getElementById("select_namaBarang");
let select_satuanUmum = document.getElementById("select_satuanUmum");
let select_subKategori = document.getElementById("select_subKategori");
let statusKoreksi;
let tgl_mohonKirim = document.getElementById("tgl_mohonKirim");
let fileInput = document.getElementById("attach_file");
let fileNameDisplay = document.getElementById("fileNameDisplay");
let btnChooseFile = document.getElementById("btnChooseFile");
let btnRemoveFile = document.getElementById("btnRemoveFile");
let previewImage = document.getElementById("previewImage");
let selectedNoTrans = null;
let btnDownloadAttachment = document.getElementById("btnDownloadAttachment");

//#endregion

//#region Load Form

select_kategori.disabled = true;
select_subKategori.disabled = true;
select_namaBarang.disabled = true;
tgl_mohonKirim.valueAsDate = new Date();
foto.style.display = "none";

//#endregion

//#region Function
// Setup global AJAX handlers
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

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

$(function () {
    $("body").on("click", "#NoTrans", function (e) {
        e.preventDefault();
        selectedNoTrans = $(this).data("id");
        document.getElementById("judul_ListOrder").innerHTML =
            "No Trans " + selectedNoTrans;
        $.ajax({
            url:
                window.location.origin +
                "/ListOrder/" +
                $(this).data("id") +
                "/show",
            type: "get",
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (data) {
                console.log(data);
                document.getElementById("KategoriUtama_ListOrder").innerHTML =
                    "Kategori Utama: " + (data[0].nama || "");
                document.getElementById("Kategori_ListOrder").innerHTML =
                    "Kategori: " + (data[0].nama_kategori || "");
                document.getElementById("SubKategori_ListOrder").innerHTML =
                    "Sub Kategori: " + (data[0].nama_sub_kategori || "");
                document.getElementById("NamaBarang_ListOrder").innerHTML =
                    "Kategori: " +
                    "<text class='material-symbols-outlined' style='font-size:20px;cursor:pointer' id='iconKategoriBarang'>expand_more</text>";
                document.getElementById("Pemesan_ListOrder").innerHTML =
                    "Pemesan: " + (data[0].Pemesan || "-");
                document.getElementById("Status_ListOrder").innerHTML =
                    "Status: " + (data[0].StatusBeli || "-");
                document.getElementById("TglButuh_ListOrder").innerHTML =
                    "Tgl. Dibutuhkan: " + (data[0].Tgl_Dibutuhkan || "-");
                document.getElementById("KetBarang_ListOrder").innerHTML =
                    "Ket. Barang: " + (data[0].KET || "-");
                document.getElementById("KetOrder_ListOrder").innerHTML =
                    "Ket. Order: " + (data[0].keterangan || "-");
                document.getElementById("KetInternal_ListOrder").innerHTML =
                    "Ket. Internal: " + (data[0].Ket_Internal || "-");
                document.getElementById("AccManager_ListOrder").innerHTML =
                    "Acc Manager: " +
                    (data[0].tgl_acc || "-") +
                    " ; by : " +
                    (data[0].MgrBy || "-");
                document.getElementById("Offered_ListOrder").innerHTML =
                    "Offered: " +
                    (data[0].Tgl_PBL_Acc || "-") +
                    " ; by : " +
                    (data[0].OfferBy || "-");
                document.getElementById("AccDireksi_ListOrder").innerHTML =
                    "Acc Direksi: " +
                    (data[0].Tgl_Direktur || "-") +
                    " ; by : " +
                    (data[0].FinalBy || "-");
                document.getElementById("AccDireksi2_ListOrder").innerHTML =
                    "Acc Direksi2: " +
                    (data[0].Tgl_Direktur2 || "-") +
                    " ; by : " +
                    (data[0].FinalBy2 || "-");
                document.getElementById("CreatePO_ListOrder").innerHTML =
                    "Create PO: " +
                    (data[0].Tgl_sppb || "-") +
                    " ; by : " +
                    (data[0].CreatePOBy || "-") +
                    " ; No. PO : " +
                    (data[0].NO_PO || "-");
                document.getElementById("Currency_ListOrder").innerHTML =
                    "Currency: " + (data[0].Mt_Uang || "-");
                document.getElementById("UnitPrice_ListOrder").innerHTML =
                    "Unit Price: " + (data[0].Harga_unit || "-");
                document.getElementById("Discount_ListOrder").innerHTML =
                    "Discount: " + (data[0].harga_disc || "-");
                document.getElementById("PPN_ListOrder").innerHTML =
                    "PPN: " + (data[0].PPN || "-");
                document.getElementById("TotalPrice_ListOrder").innerHTML =
                    "Total Price: " +
                    (data[0].PriceExt || "-") +
                    "<text class='material-symbols-outlined' style='font-size:20px;cursor:pointer' id='iconHarga'>expand_more</text>";
                document.getElementById("ReceiveBTTB_ListOrder").innerHTML =
                    "Receive BTTB: " +
                    (data[0].Cek_BTTB || "-") +
                    " ; by : " +
                    (data[0].BTTBBy || "-") +
                    " ; No. BTTB : " +
                    (data[0].No_BTTB || "-");
                document.getElementById(
                    "TransferInventory_ListOrder",
                ).innerHTML =
                    "Transfer Inventory: " +
                    (data[0].TglTransfer || "-") +
                    " ; No. Transfer : " +
                    (data[0].NoTransfer || "-");
                if (data[0].StatusOrder == 6) {
                    document.getElementById("StatusOrder_ListOrder").innerHTML =
                        "Order dibatalkan oleh divisi Pembelian : " +
                        (data[0].RejectBy || "-").trim() +
                        "; Tanggal :" +
                        (data[0].Tgl_batal_Acc || "-") +
                        " ; Alasan batal : " +
                        (data[0].Ket_Reject || "-");
                } else if (data[0].StatusOrder == 12) {
                    document.getElementById("StatusOrder_ListOrder").innerHTML =
                        "Order dibatalkan oleh divisi Pembelian : " +
                        (data[0].CancelBy || "-").trim() +
                        "; Tanggal :" +
                        (data[0].Tgl_batal_sppb || "-") +
                        " ; Alasan batal : " +
                        (data[0].Ket_Reject || "-");
                }
                checkAttachmentStatus(selectedNoTrans);
            },
            error: function (xhr, status, error) {
                alert(error);
            },
            complete: function () {
                $("#loading-screen").css("display", "none");
                $("#loading_ListOrder").hide();
                $("#DivDetailData_ListOrder").show();
            },
        });

        $("#loading_ListOrder").show();
        // $("#DivDetailData_ListOrder").hide();
        $("#modalDetail_ListOrder").modal("show");
    });
});

$(function () {
    let datas;
    $(".Filter").change(function () {
        let ValDivisi = document.getElementById("divisi").value;
        let ValTglAwal = document.getElementById("tglAwal").value;
        let ValTglAkhir = document.getElementById("tglAkhir").value;
        let ValMe = document.getElementById("Me").checked;
        // console.log(ValDivisi+'|'+ValTglAwal+'|'+ValTglAkhir+'|'+ValMe);

        $.ajax({
            url:
                window.location.origin +
                "/ListOrder/" +
                ValDivisi +
                "/" +
                ValTglAwal +
                "/" +
                ValTglAkhir +
                "/" +
                ValMe +
                "/Filter",
            type: "get",
            data: "_token = <?php echo csrf_token() ?>", // Remember that you need to have your csrf token included
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (data) {
                // console.log(data);
                datas = data.data;
                let table = $("#table_ListOrder").DataTable();
                table.clear().draw();
                //   console.log(data.data.length);
                for (let i = 0; i < data.data.length; i++) {
                    table.row
                        .add([
                            "<a class='Detail_ListOrder' id='NoTrans' data-id='" +
                            data.data[i].No_trans +
                            "' href=''>" +
                            data.data[i].No_trans +
                            "</a>",
                            $.format.date(data.data[i].Tgl_order, "MM-dd-yyyy"),
                            data.data[i].Kd_brg,
                            escapeHtml(data.data[i].NAMA_BRG) +
                            "<label style='background-color:#00ff00;''> " +
                            data.data[i].Qty +
                            data.data[i].Nama_satuan +
                            "</label>",
                            data.data[i].Status,
                            data.data[i].Nama,
                            data.data[i].Kd_div,
                            data.data[i].Ket_Internal,
                            data.data[i].keterangan,
                        ])
                        .draw();
                }
                //   console.log('yay');
            },
            error: function (xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
        $("#table_ListOrder")
            .DataTable()
            .on("dblclick", "tbody tr", (e) => {
                const classList = e.currentTarget.classList;

                if (classList.contains("selected")) {
                    NoTrans = $(e.currentTarget)
                        .find(".Detail_ListOrder")
                        .data("id");

                    const cariData = datas.filter(
                        (data) => data.No_trans.trim() === NoTrans.trim(),
                    );

                    if (!cariData.length) {
                        return;
                    }

                    if (cariData[0].Status.trim() === "SAVED") {
                        statusKoreksi = "r";
                        $("#modal_tambahOrder").modal("show");
                    }
                } else {
                    $("#table_ListOrder")
                        .DataTable()
                        .rows(".selected")
                        .nodes()
                        .each((row) => row.classList.remove("selected"));
                    classList.add("selected");
                }
            });
    });
});

function clearOptions(selectElement) {
    let length = selectElement.options.length;

    for (let i = length - 1; i > 0; i--) {
        selectElement.remove(i);
    }
}

function optionClr() {
    select_kategori.selectedIndex = 0;
    clearOptions(select_kategori);
    select_subKategori.selectedIndex = 0;
    clearOptions(select_subKategori);
    select_namaBarang.selectedIndex = 0;
    clearOptions(select_namaBarang);
}

function clearData() {
    $("#table_listSaldo").DataTable().clear().destroy();
    foto.src = "";
    foto.style.display = "none";
    kd_barang.value = "";
    ket_khusus.value = "";
    ket_barang.value = "";
    ketStatusOrder.value = "";
    // ket_order.value = "";
    // ket_internal.value = "";
    qty_order.value = "";
    document.getElementById("status_beliPengadaanPembelian").checked = true;
    tgl_mohonKirim.valueAsDate = new Date();
    // pemesan.value = "";
    no_order.value = "";
    // select_divisi.selectedIndex = 0;
    select_kategori_utama.selectedIndex = 0;
    select_kategori.disabled = true;
    select_subKategori.disabled = true;
    select_namaBarang.disabled = true;
    optionClr();
    select_satuanUmum.selectedIndex = 0;
    if (statusKoreksi == null) {
        btn_save.disabled = false;
        btn_submit.disabled = false;
    }
    fileNameDisplay.value = "";
    previewImage.classList.add("d-none");
    btnRemoveFile.classList.add("d-none");
    fileNameDisplay.onclick = null;
}

function cariKodeBarang(kd_barang) {
    //function ini bisa dioptimasi, daripada bolak balik client-server kirim aja kode barang ke server
    //kemudian get semua data mulai kategori utama sampai sub kategorinya
    //data yang diambil:
    //1. all kategori utama sampai sub kategori
    //2. nama, kategori utama, kategori, sub kategori sampai satuan dari detail barang tersebut

    kd_barang = kd_barang.padStart(9, "0");
    kdBarangAslinya = kd_barang;
    $("#table_listSaldo").DataTable().clear().destroy();
    $.ajax({
        url: "/MaintenanceOrderPembeliann/KodeBarang",
        type: "GET",
        data: {
            KdBarang: kd_barang,
        },
        success: function (response) {
            if (response.data.length == 0) {
                alert(`Kode barang ${kd_barang} tidak dapat ditemukan`);
            } else {
                saldo(kd_barang);
                if (response.image != null) {
                    foto.style.display = "block";
                    foto.src = "data:image/jpeg;base64," + response.image;
                } else {
                    foto.style.display = "none";
                    foto.src = "";
                }
                kategori(response.data[0].no_kat_utama, function () {
                    for (let i = 0; i < select_kategori.options.length; i++) {
                        if (
                            select_kategori.options[i].text.replace(
                                /\s/g,
                                "",
                            ) ===
                            response.data[0].nama_kategori.replace(/\s/g, "")
                        ) {
                            select_kategori.selectedIndex = i;
                        }
                    }
                });

                subKategori(response.data[0].no_kategori, function () {
                    for (
                        let i = 0;
                        i < select_subKategori.options.length;
                        i++
                    ) {
                        if (
                            select_subKategori.options[i].value.replace(
                                /\s/g,
                                "",
                            ) ===
                            response.data[0].no_sub_kategori.replace(/\s/g, "")
                        ) {
                            select_subKategori.selectedIndex = i;
                        }
                    }
                });

                namaBarang(response.data[0].no_sub_kategori, function () {
                    for (let i = 0; i < select_namaBarang.options.length; i++) {
                        if (
                            select_namaBarang.options[i].text.replace(
                                /\s/g,
                                "",
                            ) === response.data[0].NAMA_BRG.replace(/\s/g, "")
                        ) {
                            select_namaBarang.selectedIndex = i;
                        }
                    }
                });

                for (let i = 0; i < select_kategori_utama.options.length; i++) {
                    if (
                        select_kategori_utama.options[i].value.replace(
                            /\s/g,
                            "",
                        ) === response.data[0].no_kat_utama.replace(/\s/g, "")
                    ) {
                        select_kategori_utama.selectedIndex = i;
                    }
                }

                ket_khusus.value = response.data[0].KET_KHUSUS;
                ket_barang.value = response.data[0].KET;
                ketStatusOrder.value = response.data[0].Nama_satuan.trim();
                for (let i = 0; i < select_satuanUmum.options.length; i++) {
                    if (
                        select_satuanUmum.options[i].value ===
                        response.data[0].NO_SATUAN_UMUM
                    ) {
                        select_satuanUmum.selectedIndex = i;
                    }
                }
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
    select_kategori.disabled = false;
    select_subKategori.disabled = false;
    select_namaBarang.disabled = false;
}

function saldo(kdBarang) {
    let table = $("#table_listSaldo").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        searching: false,
        ajax: {
            url: "/MaintenanceOrderPembeliann/Saldo",
            type: "GET",
            data: function (data) {
                data.KodeBarang = kdBarang;
            },
        },
        columns: [
            { data: "NamaDivisi" },
            {
                data: "SaldoTritier",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0.00");
                },
            },
            { data: "satTertier" },
            {
                data: "SaldoSekunder",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0.00");
                },
            },
            { data: "satSekunder" },
            {
                data: "SaldoPrimer",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0.00");
                },
            },
            { data: "satPrimer" },
            { data: "NamaObjek" },
            { data: "NamaKelompokUtama" },
            { data: "NamaKelompok" },
            { data: "NamaSubKelompok" },
        ],
    });
}

function kategori(MyValue, callback) {
    $.ajax({
        url: "/MaintenanceOrderPembeliann/Kategori",
        type: "GET",
        data: {
            MyValue: MyValue,
        },
        success: function (response) {
            response.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.no_kategori;
                option.text = data.nama_kategori;
                select_kategori.add(option);
            });
            if (typeof callback === "function") {
                callback();
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
}

function subKategori(MyValue, callback) {
    $.ajax({
        url: "/MaintenanceOrderPembeliann/SubKategori",
        type: "GET",
        data: {
            MyValue: MyValue,
        },
        success: function (response) {
            response.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.no_sub_kategori;
                option.text = data.nama_sub_kategori;
                select_subKategori.add(option);
            });
            if (typeof callback === "function") {
                callback();
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
}

function namaBarang(MyValue, callback) {
    $.ajax({
        url: "/MaintenanceOrderPembeliann/NamaBarang",
        type: "GET",
        data: {
            MyValue: MyValue,
        },
        success: function (response) {
            response.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.KD_BRG;
                option.text = data.NAMA_BRG;
                select_namaBarang.add(option);
            });
            if (typeof callback === "function") {
                callback();
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
}

function uploadDokumentasi(noTrans) {
    let fileInput = document.getElementById("attach_file");

    if (!fileInput || fileInput.files.length === 0) {
        console.log("Tidak ada file untuk diupload");
        return;
    }

    let formData = new FormData();
    formData.append("noTrans", noTrans);
    formData.append("attach_file", fileInput.files[0]);

    $.ajax({
        url: "/MaintenanceOrderPembeliann/uploadDokumentasi",
        type: "POST",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            if (!res.success) {
                Swal.fire({
                    icon: "warning",
                    title: res.message,
                });
                return;
            }
            Swal.fire({
                icon: "success",
                title: res.message,
            });
        },
        error: function (err) {
            Swal.fire({
                icon: "error",
                title: err.responseJSON?.message || "Terjadi kesalahan",
            });
        },
    });
}

function tampilkanDokumentasi(base64Image, base64Pdf) {
    // Reset state
    previewImage.classList.add("d-none");
    fileNameDisplay.onclick = null;
    fileNameDisplay.style.cursor = "default";

    if (base64Image) {
        fileNameDisplay.value = "Image tersimpan";
        btnRemoveFile.classList.remove("d-none");

        // Gunakan wildcard supaya bisa jpg/png
        previewImage.src = "data:image/*;base64," + base64Image;
        previewImage.classList.remove("d-none");
    } else if (base64Pdf) {
        fileNameDisplay.value = "PDF tersimpan";
        btnRemoveFile.classList.remove("d-none");

        fileNameDisplay.style.cursor = "pointer";

        fileNameDisplay.onclick = function () {
            // Tidak perlu decode manual
            let pdfUrl = "data:application/pdf;base64," + base64Pdf;
            window.open(pdfUrl, "_blank");
        };
    }
}

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
        .then((response) => {
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

function validateForm() {
    if (!selectedDivisi.value) {
        Swal.fire({
            icon: "info",
            title: "Silahkan pilih divisi",
            timer: 1500,
            showConfirmButton: false,
            didClose: () => select_divisi.focus(),
        });
        return false;
    }

    if (!pemesan.value.trim()) {
        Swal.fire({
            icon: "info",
            title: "Silahkan isi Pemesan",
            timer: 1500,
            showConfirmButton: false,
            didClose: () => pemesan.focus(),
        });
        return false;
    }

    if (!qty_order.value || parseFloat(qty_order.value) <= 0) {
        Swal.fire({
            icon: "info",
            title: "Qty Order harus lebih dari 0",
            timer: 1500,
            showConfirmButton: false,
            didClose: () => qty_order.focus(),
        });
        return false;
    }

    return true; // ✅ kalau semua lolos
}

if (btnDownloadAttachment) {
    btnDownloadAttachment.addEventListener("click", function () {
        if (!selectedNoTrans) {
            Swal.fire({
                icon: "warning",
                title: "No Trans belum dipilih",
            });
            return;
        }
        let checkUrl = `/FinalApprove/getDokumentasi/${selectedNoTrans}`;
        let downloadUrl = `/FinalApprove/downloadDokumentasi/${selectedNoTrans}`;

        fetch(checkUrl)
            .then((response) => {
                if (response.status === 204 || !response.ok) {
                    updateAttachmentButton(false);
                    Swal.fire({
                        icon: "warning",
                        title: "Dokumentasi tidak ada",
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
                    title: "Gagal mengecek dokumentasi",
                });
            });
    });
}

//#endregion

//#region Event Listener

btn_tambahOrder.addEventListener("click", function (event) {
    statusKoreksi = null;
    $("#modal_tambahOrder").modal("show");
});

//#endregion
//#region Event Listener Modal Tambah Order

btn_save.addEventListener("click", function (event) {
    if (!validateForm()) {
        e.preventDefault();
        return;
    }

    btn_save.disabled = true;

    setTimeout(function () {
        btn_save.disabled = false;
    }, 2500);

    let stBeli = document.getElementById("status_beliPengadaanPembelian")
        .checked
        ? 1
        : 0;

    // if (statusKoreksi == null) {
    $.ajax({
        url: "/MaintenanceOrderPembeliann/Save",
        type: "POST",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        data: {
            kd: 0,
            Kd_div: selectedDivisi.value.trim(),
            Kd_brg: kd_barang.value,
            keterangan: ket_order.value,
            Qty: qty_order.value,
            Pemesan: pemesan.value,
            NoSatuan: select_satuanUmum.value.trim(),
            Tgl_Dibutuhkan: tgl_mohonKirim.value,
            stBeli: stBeli,
            ketIn: ket_internal.value,
            no_order: no_order.value.trim(),
        },
        success: function (response) {
            no_order.value = response.data;

            // 🔥 Upload file setelah save sukses
            uploadDokumentasi(response.data);

            Swal.fire({
                icon: "success",
                title:
                    response.message +
                    " Silahkan dicatat No. Order berikut: " +
                    response.data,
                confirmButtonText: "OK",
            });
            $(".Filter").trigger("change");
            btn_save.disabled = true;
            btn_submit.disabled = true;
        },
        error: function (error) {
            Swal.fire({
                icon: "error",
                title: "Data Tidak Berhasil DiTambahkan!",
                timer: 2000,
                showConfirmButton: false,
            });
            console.error(error);
        },
    });
    // }
    // else {
    //     $.ajax({
    //         url: "/MaintenanceOrderPembeliann/Submit",
    //         type: "PUT",
    //         headers: {
    //             "X-CSRF-TOKEN": csrfToken,
    //         },
    //         data: {
    //             kd: 1,
    //             Kd_div: selectedDivisi.value.trim(),
    //             Kd_brg: kd_barang.value,
    //             keterangan: ket_order.value,
    //             Qty: qty_order.value,
    //             Pemesan: pemesan.value,
    //             NoSatuan: select_satuanUmum.value.trim(),
    //             Tgl_Dibutuhkan: tgl_mohonKirim.value,
    //             stBeli: stBeli,
    //             ketIn: ket_internal.value,
    //             noTrans: no_order.value.trim(),
    //         },
    //         success: function (response) {
    //             uploadDokumentasi(no_order.value.trim());

    //             Swal.fire({
    //                 icon: "success",
    //                 title: response.message,
    //                 timer: 2000,
    //                 showConfirmButton: false,
    //             });

    //             btn_save.disabled = true;
    //             btn_submit.disabled = true;
    //             btn_delete.disabled = true;
    //         },
    //         error: function (error) {
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Data Tidak Berhasil DiUpdate!",
    //                 timer: 2000,
    //                 showConfirmButton: false,
    //             });
    //             console.error(error);
    //         },
    //     });
    // }
});

closeModalButton.addEventListener("click", function (e) {
    e.preventDefault();
    document.activeElement.blur(); // Removes focus from the close button
    $("#modal_tambahOrder").modal("hide");
});

btn_submit.addEventListener("click", function (event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    btn_submit.disabled = true;

    let stBeli = document.getElementById("status_beliPengadaanPembelian")
        .checked
        ? 1
        : 0;

    let formData = {
        Kd_div: selectedDivisi.value.trim(),
        Kd_brg: kd_barang.value,
        keterangan: ket_order.value,
        Qty: qty_order.value,
        Pemesan: pemesan.value,
        NoSatuan: select_satuanUmum.value.trim(),
        Tgl_Dibutuhkan: tgl_mohonKirim.value,
        stBeli: stBeli,
        ketIn: ket_internal.value,
    };

    // ==========================================
    // JIKA ORDER BARU (BELUM ADA noTrans)
    // ==========================================
    if (!no_order.value) {
        $.ajax({
            url: "/MaintenanceOrderPembeliann/Save",
            type: "POST",
            headers: { "X-CSRF-TOKEN": csrfToken },
            data: {
                ...formData,
                kd: 0,
            },
            success: function (response) {
                let noTransBaru = response.data;
                no_order.value = noTransBaru;

                // 🔥 LANGSUNG SUBMIT SETELAH SAVE
                $.ajax({
                    url: "/MaintenanceOrderPembeliann/Submit",
                    type: "PUT",
                    headers: { "X-CSRF-TOKEN": csrfToken },
                    data: {
                        ...formData,
                        kd: 1,
                        noTrans: noTransBaru,
                    },
                    success: function (resSubmit) {
                        uploadDokumentasi(noTransBaru);

                        Swal.fire({
                            icon: "success",
                            title:
                                "Data Berhasil DiSubmit! No Order " +
                                noTransBaru,
                            timer: 2000,
                            showConfirmButton: false,
                        });

                        btn_save.disabled = true;
                        btn_submit.disabled = true;
                        btn_delete.disabled = true;

                        $(".Filter").trigger("change");
                    },
                    error: function (error) {
                        btn_submit.disabled = false;
                        Swal.fire({
                            icon: "error",
                            title: "Gagal Submit Data!",
                        });
                        console.error(error);
                    },
                });
            },
            error: function (error) {
                btn_submit.disabled = false;
                Swal.fire({
                    icon: "error",
                    title: "Gagal Save Data!",
                });
                console.error(error);
            },
        });
    }
    // ==========================================
    // JIKA ORDER SUDAH ADA
    // ==========================================
    else {
        $.ajax({
            url: "/MaintenanceOrderPembeliann/Submit",
            type: "PUT",
            headers: { "X-CSRF-TOKEN": csrfToken },
            data: {
                ...formData,
                kd: 1,
                noTrans: no_order.value.trim(),
            },
            success: function (response) {
                uploadDokumentasi(no_order.value.trim());

                Swal.fire({
                    icon: "success",
                    title: response.message,
                    timer: 2000,
                    showConfirmButton: false,
                });

                btn_save.disabled = true;
                btn_submit.disabled = true;
                btn_delete.disabled = true;

                $(".Filter").trigger("change");
            },
            error: function (error) {
                btn_submit.disabled = false;
                Swal.fire({
                    icon: "error",
                    title: "Gagal Submit Data!",
                });
                console.error(error);
            },
        });
    }
});

btn_delete.addEventListener("click", function (event) {
    $.ajax({
        url: "/MaintenanceOrderPembeliann/Delete",
        type: "DELETE",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        data: {
            noTrans: no_order.value.trim(),
        },
        success: function (response) {
            Swal.fire({
                icon: "success",
                title: "No. Order " + no_order.value + " " + response.message,
                showConfirmButton: false,
                timer: "3000",
            });
            setTimeout(function () {
                window.location.href = "/ListOrder";
            }, 4000);
        },
        error: function (error) {
            Swal.fire({
                icon: "error",
                title: "Data Tidak Berhasil DiHapus!",
                showConfirmButton: false,
                timer: "2000",
            });
            console.error("Error Send Data:", error);
        },
    });
});

const statusBeliRadio = document.querySelectorAll(
    'input[name="status_beliRadioButton"]'
);

statusBeliRadio.forEach(function (radio) {
    radio.addEventListener("change", function () {

        // Reset divisi
        select_divisi.selectedIndex = 0;
        selectedDivisi.value = "";

        // Reset golongan
        clearOptions(select_golongan);
        select_golongan.selectedIndex = 0;

        // Reset mesin golongan
        clearOptions(select_mesinGolongan);
        select_mesinGolongan.selectedIndex = 0;

        // Disable button save kembali
        btn_save.disabled = true;
    });
});

select_divisi.addEventListener("change", function (event) {
    if (select_divisi.selectedIndex != 0) {
        clearOptions(select_golongan);
        select_golongan.selectedIndex = 0;
        clearOptions(select_mesinGolongan);
        select_mesinGolongan.selectedIndex = 0;
        selectedDivisi.value = select_divisi.value;
        let stBeli = document.getElementById("status_beliPengadaanPembelian")
            .checked
            ? 1
            : 0;
        console.log(selectedDivisi.value);
        console.log(stBeli);

        $.ajax({
            url: "/MaintenanceOrderPembeliann/CekDivisiPembelian",
            type: "GET",
            data: {
                selectedDivisi: selectedDivisi.value.trim(),
                stBeli: stBeli,
            },
            success: function (response) {
                console.log("Cek Divisi:", response);

                if (response.allowed) {
                    btn_save.disabled = false;
                    btn_submit.disabled = false;
                } else {
                    btn_save.disabled = true;
                    btn_submit.disabled = true;

                    Swal.fire({
                        icon: "info",
                        title: "Informasi",
                        html: response.message,
                        confirmButtonText: "OK",
                    });

                    select_divisi.selectedIndex = 0;
                    selectedDivisi.value = "";

                    clearOptions(select_golongan);
                    select_golongan.selectedIndex = 0;

                    clearOptions(select_mesinGolongan);
                    select_mesinGolongan.selectedIndex = 0;
                }
            },
            error: function (error) {
                console.error("Error Cek Divisi:", error);
                btn_submit.disabled = true;

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Gagal melakukan pengecekan hak divisi.",
                    confirmButtonText: "OK",
                });
            },
        });

        $.ajax({
            url: "/MaintenanceOrderPembeliann/Golongan",
            type: "GET",
            data: {
                kd_div: select_divisi.value.trim(),
            },
            success: function (response) {
                response.forEach(function (data) {
                    let option = document.createElement("option");
                    option.value = data.NO_GOL;
                    option.text = data.NM_GOL;
                    select_golongan.add(option);
                });
            },
            error: function (error) {
                console.error("Error Fetch Data:", error);
            },
        });
    }
});

select_golongan.addEventListener("change", function (event) {
    if (select_golongan.selectedIndex != 0) {
        clearOptions(select_mesinGolongan);
        select_mesinGolongan.selectedIndex = 0;
        $.ajax({
            url: "/MaintenanceOrderPembeliann/MesinGolongan",
            type: "GET",
            data: {
                no_gol: select_golongan.value.trim(),
            },
            success: function (response) {
                response.forEach(function (data) {
                    let option = document.createElement("option");
                    option.value = data.NO_MSN;
                    option.text = data.NM_MSN;
                    select_mesinGolongan.add(option);
                });
            },
            error: function (error) {
                console.error("Error Fetch Data:", error);
            },
        });
    }
});

qty_order.addEventListener("input", function (event) {
    setInputFilter(
        document.getElementById("qty_order"),
        function (value) {
            return /^-?\d*[.,]?\d*$/.test(value);
        },
        "Tidak boleh character, harus angka",
    );
});

kd_barang.addEventListener("input", function (event) {
    setInputFilter(
        document.getElementById("kd_barang"),
        function (value) {
            return /^\d*$/.test(value);
        },
        "Tidak boleh character, harus angka",
    );
});

kd_barang.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        btn_cari_kdBarang.focus();
    }
});

// kd_barang.addEventListener("change", function (event) {
//     btn_cari_kdBarang.focus();
// });

btn_cari_kdBarang.addEventListener("click", function (event) {
    cariKodeBarang(kd_barang.value.replace(/\s/g, ""));
    kd_barang.value = kdBarangAslinya;
});

btn_clear.addEventListener("click", function (event) {
    clearData();
});

select_kategori_utama.addEventListener("change", function (event) {
    optionClr();
    let myValue = select_kategori_utama.value;
    kategori(myValue, function () {
        select_kategori.disabled = false;
        select_subKategori.disabled = true;
        select_namaBarang.disabled = true;
    });
});

select_kategori.addEventListener("change", function (event) {
    select_subKategori.selectedIndex = 0;
    clearOptions(select_subKategori);
    select_namaBarang.selectedIndex = 0;
    clearOptions(select_namaBarang);
    let myValue = select_kategori.value;
    subKategori(myValue, function () {
        select_subKategori.disabled = false;
        select_namaBarang.disabled = true;
    });
});

select_subKategori.addEventListener("change", function (event) {
    select_namaBarang.selectedIndex = 0;
    clearOptions(select_namaBarang);
    let myValue = select_subKategori.value;
    namaBarang(myValue, function () {
        select_namaBarang.disabled = false;
    });
});

select_namaBarang.addEventListener("change", function (event) {
    let myValue = select_namaBarang.value;
    console.log(myValue);
    kd_barang.value = myValue;
    btn_cari_kdBarang.click();
    // namaBarang(myValue, function () {
    //     select_namaBarang.disabled = false;
    // });
});

btnChooseFile.addEventListener("click", function () {
    fileInput.click();
});

fileInput.addEventListener("change", function () {
    if (!this.files.length) return;
    let file = this.files[0];

    fileNameDisplay.value = file.name;
    btnRemoveFile.classList.remove("d-none");

    // Preview hanya untuk gambar
    if (file.type.includes("image")) {
        let reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewImage.classList.remove("d-none");
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.classList.add("d-none");
    }
});

btnRemoveFile.addEventListener("click", function () {
    if (!no_order.value) {
        Swal.fire({
            icon: "warning",
            title: "No Trans tidak ditemukan",
        });
        return;
    }

    Swal.fire({
        title: "Hapus dokumentasi?",
        text: "Dokumentasi yang sudah diupload akan dihapus permanen.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
        cancelButtonText: "Batal",
    }).then((result) => {
        if (!result.isConfirmed) return;

        $.ajax({
            url: "/MaintenanceOrderPembeliann/deleteDokumentasi",
            type: "DELETE",
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            data: {
                noTrans: no_order.value.trim(),
            },

            success: function (res) {
                Swal.fire({
                    icon: "success",
                    title: res.message || "Dokumentasi berhasil dihapus",
                    timer: 2000,
                    showConfirmButton: false,
                });

                // 🔥 Reset UI
                fileInput.value = "";
                fileNameDisplay.value = "";
                previewImage.src = "";
                previewImage.classList.add("d-none");
                btnRemoveFile.classList.add("d-none");
                fileNameDisplay.onclick = null;
                fileNameDisplay.style.cursor = "default";
            },

            error: function (err) {
                Swal.fire({
                    icon: "error",
                    title:
                        err.responseJSON?.message ||
                        "Gagal menghapus dokumentasi",
                });
            },
        });
    });
});

foto.addEventListener("click", function () {

    if (!foto.src || foto.style.display === "none")
        return;

    previewFoto.src = foto.src;

    const modal = new bootstrap.Modal(
        document.getElementById("previewFotoModal")
    );

    modal.show();
});

let scale = 1;

previewFoto.addEventListener("wheel", function (e) {
    e.preventDefault();
    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(1, scale), 5);
    previewFoto.style.transform = `scale(${scale})`;
});

document.getElementById("previewFotoModal").addEventListener("hidden.bs.modal", function () {
    scale = 1;
    previewFoto.style.transform = "scale(1)";

    // karena modal utama masih terbuka
    document.body.classList.add("modal-open");
    document.body.style.overflow = "hidden";

});
//#endregion

$("#modal_tambahOrder").on("shown.bs.modal", function () {
    //#region Load Modal Tambah Order

    if (statusKoreksi == "r") {
        $.ajax({
            url: "/MaintenanceOrderPembeliann/CekNoTrans",
            type: "GET",
            data: {
                No_trans: NoTrans.trim(),
            },
            success: function (response) {
                console.log("Response CekNoTrans:", response);

                // 🔥 PERBAIKAN DI SINI
                if (!response.success || !response.data) {
                    Swal.fire({
                        title: response.message || "No Trans Tidak Ditemukan",
                    });
                    return;
                }

                let row = response.data;

                // =============================
                // SET DATA KE FORM (ANTI NULL)
                // =============================

                console.log("row:", row);
                console.log("row.No_trans:", row.No_trans);
                pemesan.value = row.Pemesan ?? "";
                no_order.value = row.No_trans ?? "";

                if (row.StatusBeli == 1) {
                    document.getElementById(
                        "status_beliPengadaanPembelian",
                    ).checked = true;
                } else {
                    document.getElementById("status_beliBeliSendiri").checked =
                        true;
                }

                divisi.value = row.Kd_div ?? "";

                for (let i = 0; i < select_divisi.options.length; i++) {
                    if (
                        select_divisi.options[i].value.replace(/\s/g, "") ===
                        (row.Kd_div ?? "").replace(/\s/g, "")
                    ) {
                        select_divisi.selectedIndex = i;
                    }
                }

                selectedDivisi.value = row.Kd_div ?? "";

                if (row.Tgl_Dibutuhkan) {
                    tgl_mohonKirim.value = row.Tgl_Dibutuhkan.split(" ")[0];
                }

                kd_barang.value = row.Kd_brg ?? "";
                ket_internal.value = row.Ket_Internal ?? "";
                ket_order.value = row.keterangan ?? "";
                qty_order.value = row.Qty ? parseFloat(row.Qty) : "";

                // DokumentasiFile tidak lagi dikirim (karena varbinary)
                tampilkanDokumentasi(row.Dokumentasi ?? null, null);

                if (row.Kd_brg) {
                    cariKodeBarang(row.Kd_brg.trim());
                }
                btn_delete.disabled = false;
                btn_save.disabled = false;
                btn_submit.disabled = false;
                btn_clear.disabled = true;
            },
            error: function (error) {
                Swal.fire({
                    title: "Error Send Data",
                    text: error.responseJSON?.message || "Terjadi kesalahan",
                    icon: "error",
                });
            },
        });
    } else if (statusKoreksi == null) {
        select_divisi.selectedIndex = 0;
        select_kategori_utama.selectedIndex = 0;
        ket_order.value = "";
        ket_internal.value = "";
        qty_order.value = "";
        ketStatusOrder.value = "";
        selectedDivisi.value = "";
        clearData();
        btn_delete.disabled = true;
    }

    //#endregion
});
//#endregion

$("#modal_tambahOrder").on("hidden.bs.modal", function () {
    // IDs of select elements
    const selectIds = [
        "select_golongan",
        "select_mesinGolongan",
        "select_kategori",
        "select_subKategori",
        "select_namaBarang",
    ];

    // Iterate through each ID and clear the options
    selectIds.forEach((id) => {
        const selectElement = document.getElementById(id);
        if (selectElement) {
            clearOptions(selectElement);
        } else {
            console.warn(`Element with ID '${id}' not found.`);
        }
    });
});
