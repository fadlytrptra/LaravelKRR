var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

let tanggalInput = document.getElementById('tanggalInput');
let namaCustomerSelect = document.getElementById('namaCustomerSelect');
let noPelunasanSelect = document.getElementById('noPelunasanSelect');
let jenisPembayaranSelect = document.getElementById('jenisPembayaranSelect');
let mataUangSelect = document.getElementById('mataUangSelect');
let informasiBankSelect = document.getElementById('informasiBankSelect');
let nilaiMasukKas = document.getElementById('nilaiMasukKas');
let buktiPelunasan = document.getElementById('buktiPelunasan');
// let tabelPelunasanPenjualan = document.getElementById('tabelPelunasanPenjualan');
let totalPelunasan = document.getElementById('totalPelunasan');
let nilaiPiutang = document.getElementById('nilaiPiutang');
let totalBiaya = document.getElementById('totalBiaya');
let kurangLebih = document.getElementById('kurangLebih');
// let tabelPelunasanPenjualan = $('#tabelPelunasanPenjualan').DataTable();
let IdPelunasan = document.getElementById('IdPelunasan');;
let Id_Pelunasan = document.getElementById('Id_Pelunasan');
let formkoreksi = document.getElementById('formkoreksi');
let methodkoreksi = document.getElementById('methodkoreksi');

let btnAddItem = document.getElementById('btnAddItem');
let btnEditItem = document.getElementById('btnEditItem');
let btnDeleteItem = document.getElementById('btnDeleteItem');
let modalLihatPenagihan = document.getElementById('modalLihatPenagihan');
// let methodLihatPenagihan = document.getElementById('methodLihatPenagihan');
// let formLihatPenagihan = document.getElementById('formLihatPenagihan');
let btnSimpanModal = document.getElementById('btnSimpanModal');
// let statusBayar = document.getElementById('statusBayar');

let btn_cust = document.getElementById('btn_cust');
let btn_pelunasan = document.getElementById('btn_pelunasan');
let btn_jenisPmb = document.getElementById('btn_jenisPmb');
let btn_bank = document.getElementById('btn_bank');
let btn_mtUang = document.getElementById('btn_mtUang');
let btnSimpan = document.getElementById('btnSimpan');
let btnKoreksi = document.getElementById('btnKoreksi');
let btnHapus = document.getElementById('btnHapus');
let btnIsi = document.getElementById('btnIsi');
let btnBatal = document.getElementById('btnBatal');

//HIDDEN
let idCustomer = document.getElementById('idCustomer');
let idJenisCustomer = document.getElementById('idJenisCustomer');
let idJenisPembayaran = document.getElementById('idJenisPembayaran');
let idMataUang = document.getElementById('idMataUang');
let idReferensi = document.getElementById('idReferensi');
let cust;
let proses;
let prosesmodal;
// let noPen = document.getElementById('noPen');
// let no_Pen = document.getElementById('no_Pen');
// let noPen1 = document.getElementById('noPen1');
// let no_Pen1 = document.getElementById('no_Pen1');
let arrayDetail = document.getElementById('arrayDetail');
let arrayPenagihan = document.getElementById('arrayPenagihan');
let hAtauB = document.getElementById('hAtauB');

//HIDDEN (TABEL)
let tabelIdDetailPelunasan = document.getElementById('tabelIdDetailPelunasan');
let tabelIdPenagihan = document.getElementById('tabelIdPenagihan');
let tabelNilaiPelunasan = document.getElementById('tabelNilaiPelunasan');
let tabelPelunasanRupiah = document.getElementById('tabelPelunasanRupiah');
let tabelBiaya = document.getElementById('tabelBiaya');
let tabelLunas = document.getElementById('tabelLunas');
let tabelPelunasanCurrency = document.getElementById('tabelPelunasanCurrency');
let tabelKurangLebih = document.getElementById('tabelKurangLebih');
let tabelKodePerkiraan = document.getElementById('tabelKodePerkiraan');
let tabelIdDetail = document.getElementById('tabelIdDetail');

//MODAL
let totalKembalian = 0;
let noPen = document.getElementById('noPen');
let nilaiPenagihan = document.getElementById('nilaiPenagihan');
let mataUangPenagihan = document.getElementById('mataUangPenagihan');
let nilaiKurs = document.getElementById('nilaiKurs');
let terbayar = document.getElementById('terbayar');
let terbayarRupiah = document.getElementById('terbayarRupiah');
let pelunasanCurrency = document.getElementById('pelunasanCurrency');
let pelunasanRupiah = document.getElementById('pelunasanRupiah');
let jumlahYangDibayar = document.getElementById('jumlahYangDibayar');
let sisa = document.getElementById('sisa');
let sisaRupiah = document.getElementById('sisaRupiah');
let kodePerkiraan = document.getElementById('kodePerkiraan');
let idKodePerkiraan = document.getElementById('idKodePerkiraan');
let nilaiBiaya = document.getElementById('nilaiBiaya');
let nilaiKurangLebih = document.getElementById('nilaiKurangLebih');
let noPen1 = document.getElementById('noPen1');
let lunas = document.getElementById('lunas');
// let btn_noPenagihan = document.getElementById('btn_noPenagihan');
// let btn_noPenagihan1 = document.getElementById('btn_noPenagihan1');
let btn_kodePerkiraan = document.getElementById('btn_kodePerkiraan');

let matauang;
let Z = 0;
let sNilai_Pelunasan = 0;
let sBiaya = 0;
let sKurangLebih = 0;
let sPelunasan_Rupiah = 0;
let sPelunasan_curency = 0;
let listHapus = [];
let listHapusPenagihan = [];
let sUser, user_id, tsisa;
let sMasukKas;

nilaiMasukKas.value = 0;

const formattedDate2 = new Date().toISOString().substring(0, 10);
tanggalInput.value = formattedDate2;

btnIsi.focus();

tanggalInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        btn_cust.focus();
    }
});

// dapetin user id
$.ajax({
    type: 'GET',
    url: '/Kencana/MaintenancePelunasanPenjualanKCN/getUserId',
    data: {
        _token: csrfToken
    },
    success: function (result) {
        user_id = result.user.trim();
    },
    error: function (xhr, status, error) {
        console.error('Error:', error);
    }
});

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

function formatToMMDDYYYY(dateString) {
    const [month, day, year] = dateString.split('-'); // Assuming dateString is in 'yyyy-mm-dd'
    return `${parseInt(month)}/${day}/${year}`; // parseInt removes leading zero from month
}

function formatDate(dateString) {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        console.error("Invalid date format:", dateString);
        return "";
    }

    // Format date to yyyyMMdd
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

btnIsi.addEventListener('click', function (event) {
    event.preventDefault();

    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";
    btnHapus.style.display = "none";

    btn_cust.disabled = false;
    btn_jenisPmb.disabled = false;
    btn_mtUang.disabled = false;
    btn_pelunasan.disabled = false;
    btn_bank.disabled = false;

    tanggalInput.removeAttribute("readonly");
    // namaCustomerSelect.removeAttribute("readonly");
    // jenisPembayaranSelect.removeAttribute("readonly");
    buktiPelunasan.removeAttribute("readonly");
    totalPelunasan.removeAttribute("readonly");
    totalBiaya.removeAttribute("readonly");
    nilaiPiutang.removeAttribute("readonly");
    kurangLebih.removeAttribute("readonly");
    btn_pelunasan.setAttribute("disabled", true);
    btn_mtUang.setAttribute("disabled", true);
    // mataUangSelect.removeAttribute("readonly");
    // nilaiMasukKas.removeAttribute("readonly");
    // jenisCustomer.removeAttribute("readonly");
    // alamat.removeAttribute("readonly");
    // nomorSPSelect.removeAttribute("readonly");
    // nomorPO.removeAttribute("readonly");
    // nilaiKurs.removeAttribute("readonly");
    // syaratPembayaran.removeAttribute("readonly");
    // userPenagihSelect.removeAttribute("readonly");
    // dokumenSelect.removeAttribute("readonly");
    // jenisPajakSelect.removeAttribute("readonly");
    // Ppn.removeAttribute("readonly");

    proses = 1;
    cust = 1;
    btn_cust.focus();

    totalPelunasan.value = parseFloat(0).toFixed(2);
    totalBiaya.value = parseFloat(0).toFixed(2);
    nilaiPiutang.value = parseFloat(0).toFixed(2);
    kurangLebih.value = parseFloat(0).toFixed(2);
    // TampilCust();
});

btnBatal.addEventListener('click', function (event) {
    event.preventDefault();
    clear();

    btnIsi.style.display = "block";
    btnSimpan.style.display = "none";
    btnKoreksi.style.display = "block";
    btnBatal.style.display = "none";
    btnHapus.style.display = "block";

    btn_cust.disabled = true;
    btn_jenisPmb.disabled = true;
    btn_mtUang.disabled = true;
    btn_pelunasan.disabled = true;
    btn_bank.disabled = true;
});

function clear() {
    var tabelPelunasanPenjualan = $('#tabelPelunasanPenjualan').DataTable();

    tanggalInput.value = formattedDate2;
    namaCustomerSelect.value = '';
    idCustomer.value = '';
    idJenisCustomer.value = '';
    noPelunasanSelect.value = '';
    jenisPembayaranSelect.value = '';
    idJenisPembayaran.value = '';
    informasiBankSelect.value = '';
    idReferensi.value = '';
    mataUangSelect.value = '';
    idMataUang.value = '';
    nilaiMasukKas.value = 0;
    buktiPelunasan.value = '';
    tabelPelunasanPenjualan.clear().draw();
    totalPelunasan.value = 0;
    totalBiaya.value = 0;
    nilaiPiutang.value = 0;
    kurangLebih.value = 0;

    opt1.checked = false;
    opt2.checked = false;
    opt3.checked = false;

    // btn_noPenagihan.disabled = true;
    // btn_noPenagihan1.disabled = true;
    noPenagihan.prop("disabled", true);
    noPenagihan1.prop("disabled", true);

    pelunasanCurrency.readOnly = true;
    nilaiBiaya.readOnly = true;
    nilaiKurangLebih.readOnly = true;

    clearDropdowns();
}

// Function to handle keydown events for table navigation
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
    }
    else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex === null || currentIndex >= rowCount - 1) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    }
    else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex === null || currentIndex <= 0) {
            currentIndex = rowCount - 1;
        } else {
            currentIndex--;
        }
        rows.removeClass("selected");
        const selectedRow = $(rows[currentIndex]).addClass("selected");
        scrollRowIntoView(selectedRow[0]);
    }
    else if (e.key === "ArrowRight") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page < pageInfo.pages - 1) {
            table.page('next').draw('page').on('draw', function () {
                currentIndex = 0;
                const newRows = $(`#${tableId} tbody tr`);
                const selectedRow = $(newRows[currentIndex]).addClass("selected");
                scrollRowIntoView(selectedRow[0]);
            });
        }
    }
    else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const pageInfo = table.page.info();
        if (pageInfo.page > 0) {
            table.page('previous').draw('page').on('draw', function () {
                currentIndex = 0;
                const newRows = $(`#${tableId} tbody tr`);
                const selectedRow = $(newRows[currentIndex]).addClass("selected");
                scrollRowIntoView(selectedRow[0]);
            });
        }
    }
}
// Helper function to scroll selected row into view
function scrollRowIntoView(rowElement) {
    rowElement.scrollIntoView({ block: 'nearest' });
}

function decodeHtmlEntities(text) {
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
}

$(document).ready(function () {
    $('#tabelPelunasanPenjualan').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Id. Penagihan' },
            { title: 'Nilai Pelunasan' },
            { title: 'Biaya' },
            { title: 'Lunas' },
            { title: 'Id. Detail Pelunasan' },
            { title: 'Pelunasan Rupiah' },
            { title: 'Mata Uang' },
            { title: 'Pelunasan Currency' },
            { title: 'Kurang Lebih' },
            { title: 'Perkiraan' },
            { title: 'ID_Tagihan_Pembulatan' }
        ],
        scrollY: '150px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], width: '20%', className: 'fixed-width' },
        { targets: [6], visible: false }]
    });
});

// button customer
btn_cust.addEventListener("click", function (e) {
    const columnsConfig = cust === 1
        ? [
            { data: "IDCust" },
            { data: "NAMACUST" }
        ]
        : [
            { data: "idcust" },
            { data: "NamaCust" }
        ];

    try {
        Swal.fire({
            title: 'Customer',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nama Customer</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list").DataTable().row(".selected").data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: cust === 1 ? "/Kencana/getCustIsiKencana/" : "/Kencana/getCustKoreksiKencana/",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: columnsConfig,
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const namaCust = cust === 1 ? result.value.NAMACUST : result.value.NamaCust;
                const selectedValue = cust === 1 ? result.value.IDCust.trim() : result.value.idcust.trim();

                namaCustomerSelect.value = decodeHtmlEntities(namaCust.trim());

                const [jenis, idcust] = selectedValue.split(/[-|]/);
                idCustomer.value = idcust;
                idJenisCustomer.value = jenis;

                cust === 1 ? btn_jenisPmb.focus() : btn_pelunasan.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button pelunasan
btn_pelunasan.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Pelunasan',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nilai Pelunasan</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list").DataTable().row(".selected").data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "/Kencana/getListPelunasanKencana/" + idCustomer.value,
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Id_Pelunasan" },
                            { data: "Nilai_Pelunasan" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // IdPelunasan.value = result.value.Nilai_Pelunasan.trim();
                noPelunasanSelect.value = result.value.Id_Pelunasan.trim();

                if (noPelunasanSelect.value !== '') {
                    LihatHeaderPelunasan(noPelunasanSelect.value);
                }

                noPelunasanSelect.addEventListener('change', function () {
                    LihatHeaderPelunasan(noPelunasanSelect.value);
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function LihatHeaderPelunasan(idPelunasan) {
    $.ajax({
        type: 'GET',
        url: "/Kencana/getDataPelunasanTagihanKencana/" + idPelunasan,
        data: {
            _token: csrfToken,
        },
        success: function (result) {
            console.log(result);
            // totalKembalian = result.value.TotalKembalian ? parseFloat(result.value.TotalKembalian.trim()) : 0;

            tanggalInput.value = moment(result[0].Tgl_Pelunasan).format('YYYY-MM-DD');
            idJenisPembayaran.value = result[0].Id_Jenis_Bayar.trim();
            jenisPembayaranSelect.value = result[0].Jenis_Pembayaran.trim();
            idMataUang.value = result[0].Id_MataUang.trim();
            mataUangSelect.value = result[0].Nama_MataUang.trim();
            nilaiPiutang.value = numeral(numeral(result[0].Nilai_Pelunasan.trim()).value()).format("0,0.00");
            buktiPelunasan.value = result[0].No_Bukti ? result[0].No_Bukti.trim() : '';
            sUser = result[0].UserInput.trim();

            LihatDetailPelunasan();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function LihatDetailPelunasan() {
    fetch("/Kencana/LihatDetailPelunasanKencana/" + noPelunasanSelect.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            if (options.length !== 0) {

                var tabelPelunasanPenjualan = $('#tabelPelunasanPenjualan').DataTable();
                tabelPelunasanPenjualan.clear();

                options.forEach(function (item) {
                    tabelPelunasanPenjualan.row.add([
                        (item.ID_Penagihan) ?? '',
                        numeral(parseFloat(item.Nilai_Pelunasan ?? 0)).format("0,0.00"),
                        numeral(parseFloat(item.Biaya ?? 0)).format("0,0.00"),
                        (item.Lunas) ?? '',
                        (item.ID_Detail_Pelunasan) ?? '',
                        numeral(parseFloat(item.Pelunasan_Rupiah ?? 0)).format("0,0.00"),
                        (item.Id_MataUang) ?? '',
                        numeral(parseFloat(item.Pelunasan_Curency ?? 0)).format("0,0.00"),
                        numeral(parseFloat(item.KurangLebih ?? 0)).format("0,0.00"),
                        (item.Kode_Perkiraan) ?? '',
                        (item.ID_Penagihan_Pembulatan) ?? ''
                    ]);
                    totalPelunasan.value = numeral(totalPelunasan.value).value() + numeral(item.Nilai_Pelunasan).value();
                    totalPelunasan.value = numeral(numeral(totalPelunasan.value).value()).format("0,0.00");

                    totalBiaya.value = numeral(totalBiaya.value).value() + numeral(item.Biaya).value();
                    totalBiaya.value = numeral(numeral(totalBiaya.value).value()).format("0,0.00");

                    kurangLebih.value = numeral(kurangLebih.value).value() + numeral(item.KurangLebih).value();
                    kurangLebih.value = numeral(numeral(kurangLebih.value).value()).format("0,0.00");

                    nilaiMasukKas.value = numeral(nilaiPiutang.value).value() - numeral(totalBiaya.value).value() + numeral(kurangLebih.value).value();
                    nilaiMasukKas.value = numeral(nilaiMasukKas.value).value() < 0
                        ? numeral(nilaiMasukKas.value).format('(0,0.00)')
                        : numeral(nilaiMasukKas.value).format('0,0.00');
                });
                tabelPelunasanPenjualan.draw();
            }
        });

    // CekReferensi
    fetch("/Kencana/getCekReferensiPelunasanKencana/" + noPelunasanSelect.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            if (options.length > 0) {
                informasiBankSelect.value = options[0].IdReferensi;
            } else {
                informasiBankSelect.value = '';
            }
        })
}

function Perkiraan(idPelunasan) {
    $.ajax({
        type: 'GET',
        url: "/Kencana/MaintenancePelunasanPenjualanKCN/getPerkiraan",
        data: {
            _token: csrfToken,
            idPelunasan: idPelunasan
        },
        success: function (result) {
            // console.log(result);
            kodePerkiraan.value = decodeHtmlEntities(result[0].Keterangan.trim());
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

// button jenis pembayaran
btn_jenisPmb.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Pembayaran',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Jenis Pembayaran</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list").DataTable().row(".selected").data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "/Kencana/getJenisPembayaranKencana/",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Id_Jenis_Bayar" },
                            { data: "Jenis_Pembayaran" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log('jenis: ',result);
                jenisPembayaranSelect.value = result.value.Jenis_Pembayaran.trim();
                idJenisPembayaran.value = result.value.Id_Jenis_Bayar.trim();

                mataUangSelect.value = '';
                idMataUang.value = '';
                nilaiMasukKas.value = 0;
                informasiBankSelect.value = '';

                if (idJenisPembayaran.value === '1' || idJenisPembayaran.value === '2' || idJenisPembayaran.value === '3') {
                    btn_bank.setAttribute('disabled', true);
                    btn_mtUang.focus();
                } else {
                    btn_bank.removeAttribute('disabled', true);
                    btn_mtUang.setAttribute('disabled', true);
                    nilaiMasukKas.removeAttribute('disabled', true);
                    btn_bank.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btn_bank.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Bank',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list").DataTable().row(".selected").data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "/Kencana/getReferensiBankKencana/" + idCustomer.value,
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "IdReferensi" },
                            { data: "Ket" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(result);

                informasiBankSelect.value = result.value.IdReferensi.trim();
                idReferensi.value = result.value.Ket.trim();

                if (informasiBankSelect.value !== '') {
                    LihatReferensi();
                    buktiPelunasan.focus();
                } else {
                    btn_bank.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button mata uang
btn_mtUang.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Mata Uang',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Mata Uang</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list").DataTable().row(".selected").data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "/Kencana/MaintenancePelunasanPenjualanKCN/getMataUang",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "Id_MataUang" },
                            { data: "Nama_MataUang" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(result);

                mataUangSelect.value = result.value.Nama_MataUang.trim();
                idMataUang.value = result.value.Id_MataUang.trim();

                nilaiMasukKas.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

nilaiMasukKas.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        nilaiMasukKas.value = numeral(nilaiMasukKas.value).format("0,0.00");
        buktiPelunasan.focus();
    }
});

buktiPelunasan.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        btnAddItem.focus();
    }
});

// button no penagihan

// btn_noPenagihan.addEventListener("click", function (e) {
//     try {
//         Swal.fire({
//             title: 'Penagihan',
//             html: `
//                 <table id="table_list" class="table">
//                     <thead>
//                         <tr>
//                             <th scope="col">ID</th>
//                             <th scope="col">Tgl Penagihan</th>
//                         </tr>
//                     </thead>
//                     <tbody></tbody>
//                 </table>
//             `,
//             preConfirm: () => {
//                 const selectedData = $("#table_list").DataTable().row(".selected").data();
//                 if (!selectedData) {
//                     Swal.showValidationMessage("Please select a row");
//                     return false;
//                 }
//                 return selectedData;
//             },
//             width: '40%',
//             returnFocus: false,
//             showCloseButton: true,
//             showConfirmButton: true,
//             confirmButtonText: 'Select',
//             didOpen: () => {
//                 $(document).ready(function () {
//                     const table = $("#table_list").DataTable({
//                         responsive: true,
//                         processing: true,
//                         serverSide: true,
//                         paging: false,
//                         scrollY: '400px',
//                         scrollCollapse: true,
//                         order: [0, "asc"],
//                         ajax: {
//                             url: "/Kencana/MaintenancePelunasanPenjualanKCN/getListPenagihanSJ",
//                             dataType: "json",
//                             type: "GET",
//                             data: {
//                                 _token: csrfToken,
//                                 idCustomer: idCustomer.value
//                             }
//                         },
//                         columns: [
//                             { data: "Id_Penagihan" },
//                             {
//                                 data: "Tgl_Penagihan",
//                                 render: function (data) {
//                                     if (data) {
//                                         const date = new Date(data);
//                                         const month = date.getMonth() + 1;
//                                         const day = String(date.getDate()).padStart(2, '0');
//                                         const year = date.getFullYear();
//                                         return `${month}/${day}/${year}`;
//                                     }
//                                     return ''; // Return empty string if date is not available
//                                 }
//                             }
//                         ],
//                         columnDefs: [
//                             {
//                                 targets: 1,
//                                 width: '100px',
//                             }
//                         ]
//                     });

//                     $("#table_list tbody").on("click", "tr", function () {
//                         table.$("tr.selected").removeClass("selected");
//                         $(this).addClass("selected");
//                         scrollRowIntoView(this);
//                     });

//                     const searchInput = $('#table_list_filter input');
//                     if (searchInput.length > 0) {
//                         searchInput.focus();
//                     }

//                     currentIndex = null;
//                     Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
//                 });
//             }
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 // console.log(result);

//                 noPenagihan.value = result.value.Id_Penagihan.trim();

//                 if (noPenagihan.value !== '') {
//                     // Lihat_Penagihan
//                     lihatPenagihan(noPenagihan.value);
//                 }

//             }
//         });
//     } catch (error) {
//         console.error(error);
//     }
// });

function fetchData(endpoint) {
    fetch(endpoint)
        .then((response) => response.json())
        .then((options) => {
            noPenagihan
                .empty()
                .append(`<option disabled selected>Pilih Penagihan</option>`);

            Promise.all(
                options.map((entry) => {
                    return new Promise((resolve) => {
                        const format = formatDate(entry.Tgl_Penagihan);
                        noPenagihan.append(
                            new Option(
                                `${entry.Id_Penagihan} | ${format}`,
                                entry.Id_Penagihan
                            )
                        );
                        resolve();
                    });
                })
            ).then(() => {
                noPenagihan.select2("open");
            });
        });
}

function formatDate(dateString) {
    const datePart = dateString.split(' ')[0];
    const [year, month, day] = datePart.split('-');
    return `${parseInt(month)}/${parseInt(day)}/${year}`;
}

var myModal = new bootstrap.Modal(
    document.getElementById("modalLihatPenagihan"),
    {
        keyboard: false,
    }
);

const noPenagihan = $("#noPenagihan");
noPenagihan.select2({
    dropdownParent: $(".modal-content"),
    placeholder: "Pilih Penagihan",
});

noPenagihan.on("select2:select", function () {
    const selectedPenagihan = $(this).val();
    if (selectedPenagihan) {
        fetch("/Kencana/getListPenagihanSJKencana/" + idCustomer.value)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                noPen.value = selectedPenagihan;
                if (noPen.value !== '') {
                    lihatPenagihan(noPen.value);
                }
            })
            .catch((error) => {
                alert("An error occurred while fetching Penagihan data.");
            });
    }
});

function lihatPenagihan(idPenagihan) {
    $.ajax({
        type: 'GET',
        url: "/Kencana/MaintenancePelunasanPenjualanKCN/getListPelunasanTagihan",
        data: {
            _token: csrfToken,
            noPenagihan: idPenagihan
        },
        success: function (result) {
            totalKembalian = result[0]?.TotalKembalian ? parseFloat(result[0].TotalKembalian.trim()) : 0;
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });

    $.ajax({
        type: 'GET',
        url: "/Kencana/MaintenancePelunasanPenjualanKCN/getLihatDetailPelunasan",
        data: {
            _token: csrfToken,
            noPenagihan: idPenagihan
        },
        success: function (result) {
            if (result[0]) {
                nilaiPenagihan.value = numeral((parseFloat(result[0].Nilai_Penagihan.trim()) - parseFloat(totalKembalian))).format("0,0.00");
                mataUangPenagihan.value = result[0].Nama_MataUang.trim();
                nilaiKurs.value = parseFloat(result[0].NilaiKurs.trim()).toFixed(2);

                let totPelunasan = result[0]?.Tot_Pelunasan_Rupiah ? parseFloat(result[0].Tot_Pelunasan_Rupiah.trim()) : 0;
                let totNilai = result[0]?.Tot_Nilai_Pelunasan ? parseFloat(result[0].Tot_Nilai_Pelunasan.trim()) : 0;

                if (tabelIdDetailPelunasan.value === '') {
                    terbayarRupiah.value = numeral(numeral(totPelunasan).value()).format("0,0.00");
                    terbayar.value = numeral(numeral(totNilai).value()).format("0,0.00");
                } else {
                    terbayarRupiah.value = numeral(numeral(numeral(totPelunasan).value() - numeral(pelunasanRupiah.value).value()).value()).format("0,0.00");
                    terbayar.value = numeral(numeral(numeral(totNilai).value() - numeral(pelunasanCurrency.value).value()).value()).format("0,0.00");
                }

                jumlahYangDibayar.value = numeral(
                    numeral(nilaiPenagihan.value).value() - numeral(terbayar.value).value()
                ).format("0,0.00");

                sisa.value = numeral(nilaiPenagihan.value).value() - numeral(terbayar.value).value();
                sisaRupiah.value = (numeral(nilaiPenagihan.value).value() * numeral(nilaiKurs.value).value()) -
                    (numeral(terbayar.value).value() * numeral(nilaiKurs.value).value());

                sisa.value = numeral(sisa.value).format("0,0.00");
                sisaRupiah.value = numeral(sisaRupiah.value).format("0,0.00");

                jumlahYangDibayar.focus();
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

jumlahYangDibayar.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        matauang = mataUangPenagihan.value.trim().toUpperCase();
        if (matauang !== "RUPIAH" && idMataUang.value == 1) {
            pelunasanCurrency.value = numeral((numeral(jumlahYangDibayar.value).value() / numeral(nilaiKurs.value).value())).format("0,0.00");
            pelunasanRupiah.value = numeral(numeral(jumlahYangDibayar.value).value()).format("0,0.00");
        } else {
            pelunasanCurrency.value = numeral((numeral(jumlahYangDibayar.value).value() * numeral(nilaiKurs.value).value())).format("0,0.00");
            pelunasanRupiah.value = numeral(numeral(pelunasanCurrency.value).value()).format("0,0.00");
        }
    } else {
        if (idMataUang != 1) {
            pelunasanRupiah.value = numeral(jumlahYangDibayar.value).value() * numeral(nilaiKurs.value).value();
        } else {
            pelunasanRupiah.value = numeral(jumlahYangDibayar.value).value();
        }
        pelunasanCurrency.value = numeral(numeral(jumlahYangDibayar.value).value()).format("0,0.00");
    }
    pelunasanCurrency.focus();
});

pelunasanCurrency.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        kodePerkiraanSelect.focus();
    }
});

function LihatReferensi() {
    fetch("/Kencana/getDataRefBankKencana/" + informasiBankSelect.value)
        .then((response) => response.json())
        .then((options) => {
            console.log(options);

            options.forEach((option) => {
                //Ambil nilai Tgl_Order dari setiap objek data
                const tglInput = option.Tanggal;
                const [tanggal, waktu] = tglInput.split(" ");
                option.Tanggal = tanggal;
                tanggalInput.value = tanggal;
            });
            mataUangSelect.value = options[0].Nama_MataUang;
            idMataUang.value = options[0].Id_MataUang;
            nilaiMasukKas.value = numeral(numeral(options[0].Nilai).value()).format("0,0.00");
            buktiPelunasan.value = options[0].No_Bukti;
            tanggalInput.value = options[0].Tanggal;

            let MU = idMataUang.value;
            let opt = mataUangSelect.value;
            for (let i = 0; i < opt.length; i++) {
                if (opt[i].value == MU) {
                    mataUangSelect.selectedIndex = i;
                    break;
                }
            };
        })
}

nilaiKurangLebih.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        nilaiKurangLebih.value = numeral(numeral(nilaiKurangLebih.value).value()).format("0,0.00");
        fetchData1("/Kencana/getListPenagihanSJKencana/" + idCustomer.value);
    }
});

nilaiBiaya.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        nilaiBiaya.value = numeral(numeral(nilaiBiaya.value).value()).format("0,0.00");
        kodePerkiraanSelect.focus();
    }
});

// btn_noPenagihan1.addEventListener("click", function (e) {
//     try {
//         Swal.fire({
//             title: 'Penagihan',
//             html: `
//                 <table id="table_list" class="table">
//                     <thead>
//                         <tr>
//                             <th scope="col">ID</th>
//                             <th scope="col">Tgl Penagihan</th>
//                         </tr>
//                     </thead>
//                     <tbody></tbody>
//                 </table>
//             `,
//             preConfirm: () => {
//                 const selectedData = $("#table_list").DataTable().row(".selected").data();
//                 if (!selectedData) {
//                     Swal.showValidationMessage("Please select a row");
//                     return false;
//                 }
//                 return selectedData;
//             },
//             width: '40%',
//             returnFocus: false,
//             showCloseButton: true,
//             showConfirmButton: true,
//             confirmButtonText: 'Select',
//             didOpen: () => {
//                 $(document).ready(function () {
//                     const table = $("#table_list").DataTable({
//                         responsive: true,
//                         processing: true,
//                         serverSide: true,
//                         paging: false,
//                         scrollY: '400px',
//                         scrollCollapse: true,
//                         order: [0, "asc"],
//                         ajax: {
//                             url: "/Kencana/MaintenancePelunasanPenjualanKCN/getListPenagihanSJ",
//                             dataType: "json",
//                             type: "GET",
//                             data: {
//                                 _token: csrfToken,
//                                 idCustomer: idCustomer.value
//                             }
//                         },
//                         columns: [
//                             { data: "Id_Penagihan" },
//                             {
//                                 data: "Tgl_Penagihan",
//                                 render: function (data) {
//                                     if (data) {
//                                         const date = new Date(data);
//                                         const month = date.getMonth() + 1;
//                                         const day = String(date.getDate()).padStart(2, '0');
//                                         const year = date.getFullYear();
//                                         return `${month}/${day}/${year}`;
//                                     }
//                                     return ''; // Return empty string if date is not available
//                                 }
//                             }
//                         ],
//                         columnDefs: [
//                             {
//                                 targets: 1,
//                                 width: '100px',
//                             }
//                         ]
//                     });

//                     $("#table_list tbody").on("click", "tr", function () {
//                         table.$("tr.selected").removeClass("selected");
//                         $(this).addClass("selected");
//                         scrollRowIntoView(this);
//                     });

//                     const searchInput = $('#table_list_filter input');
//                     if (searchInput.length > 0) {
//                         searchInput.focus();
//                     }

//                     currentIndex = null;
//                     Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
//                 });
//             }
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 // console.log(result);
//                 noPenagihan1.value = result.value.Id_Penagihan.trim();
//                 kodePerkiraanSelect.focus();
//             }
//         });
//     } catch (error) {
//         console.error(error);
//     }
// });

// button kode perkiraan

function fetchData1(endpoint) {
    fetch(endpoint)
        .then((response) => response.json())
        .then((options) => {
            noPenagihan1
                .empty()
                .append(`<option disabled selected>Pilih Penagihan</option>`);

            Promise.all(
                options.map((entry) => {
                    return new Promise((resolve) => {
                        const format = formatDate(entry.Tgl_Penagihan);
                        noPenagihan1.append(
                            new Option(
                                `${entry.Id_Penagihan} | ${format}`,
                                entry.Id_Penagihan
                            )
                        );
                        resolve();
                    });
                })
            ).then(() => {
                noPenagihan1.select2("open");
            });
        });
}

const noPenagihan1 = $("#noPenagihan1");
noPenagihan1.select2({
    dropdownParent: $(".modal-content"),
    placeholder: "Pilih Penagihan",
});

noPenagihan1.on("select2:select", function () {
    const selectedPenagihan = $(this).val();
    if (selectedPenagihan) {
        fetch("/Kencana/getListPenagihanSJKencana/" + idCustomer.value)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                noPen1.value = selectedPenagihan;
                kodePerkiraanSelect.focus();
            })
            .catch((error) => {
                alert("An error occurred while fetching Penagihan data.");
            });
    }
});

const kodePerkiraanSelect = $("#kodePerkiraanSelect");
kodePerkiraanSelect.select2({
    dropdownParent: $(".modal-content"),
    placeholder: "Pilih Kode Perkiraan",
});

kodePerkiraanSelect.on("select2:select", function () {
    const selectedBank = $(this).val();
    $.ajax({
        url: "/Kencana/MaintenancePelunasanPenjualanKCN/getDetailPerkiraan",
        type: "GET",
        data: {
            _token: csrfToken,
            noKodePerkiraan: selectedBank,
        },
        success: function (result) {
            console.log(result);

            idKodePerkiraan.value = selectedBank;
            kodePerkiraan.value = decodeHtmlEntities(result[0].Keterangan.trim());

            btnSimpanModal.focus();
        },
        error: function (xhr, status, error) {
            console.error(error);
            alert("An error occurred while fetching Keterangan.");
        },
    });
    console.log(selectedBank, kodePerkiraan.value);
});


jenisPembayaranSelect.addEventListener("change", function (event) {
    event.preventDefault();
    const selectedOption = jenisPembayaranSelect.options[jenisPembayaranSelect.selectedIndex];
    if (selectedOption) {
        const selectedValue = selectedOption.textContent; // Atau selectedOption.innerText
        const bagiansatu = selectedValue.split(/[-|]/);
        const jenis = bagiansatu[0];
        idJenisPembayaran.value = jenis;
    }

    if (idJenisPembayaran.value === 1 || idJenisPembayaran.value === 2 || idJenisPembayaran.value === 3) {
        if (idJenisPembayaran.value === 2 || idJenisPembayaran.value === 3) {
            statusBayar.value = "B";
        } else {
            statusBayar.value = "";
        }
        informasiBankSelect.setAttribute("readonly", true);
        mataUangSelect.removeAttribute("readonly");
        nilaiMasukKas.removeAttribute("readonly");
        mataUangSelect.focus();
    } else {
        informasiBankSelect.removeAttribute("readonly");
        mataUangSelect.setAttribute("readonly", true);
        nilaiMasukKas.setAttribute("readonly", true);
        informasiBankSelect.focus();
    }
});

var selectedValue;

function clearDropdowns() {
    noPenagihan.val(null).trigger("change");
    noPenagihan1.val(null).trigger("change");
    kodePerkiraanSelect.val(null).trigger("change");

    noPen.value = '';
    noPen1.value = '';
    idKodePerkiraan.value = '';
    kodePerkiraan.value = '';

}


btnAddItem.addEventListener('click', function (event) {
    event.preventDefault();
    var table = $('#tabelPelunasanPenjualan').DataTable();
    table.$('tr.selected').removeClass('selected');
    data = [];

    opt1.checked = false;
    opt2.checked = false;
    opt3.checked = false;

    modalLihatPenagihan = $("#modalLihatPenagihan");
    modalLihatPenagihan.modal('show');
    prosesmodal = 1;

    clearDropdowns();

    // noPenagihan.value = '';
    nilaiPenagihan.value = '';
    mataUangPenagihan.value = '';
    nilaiKurs.value = '';
    terbayar.value = 0;
    terbayarRupiah.value = 0;
    sisa.value = 0;
    sisaRupiah.value = 0;
    jumlahYangDibayar.value = 0;
    pelunasanCurrency.value = 0;
    pelunasanRupiah.value = 0;
    lunas.value = 'N';
    nilaiBiaya.value = 0;
    nilaiKurangLebih.value = 0;
    idKodePerkiraan.value = '';
    // kodePerkiraanSelect.value = '';
    // noPenagihan1.value = '';

    kodePerkiraanSelect.prop("disabled", true);
    noPenagihan.prop("disabled", true);
    jumlahYangDibayar.setAttribute("readonly", true);
    pelunasanCurrency.setAttribute("readonly", true);
    nilaiBiaya.setAttribute("readonly", true);
    nilaiKurangLebih.setAttribute("readonly", true);
    noPenagihan1.prop("disabled", true);
    idKodePerkiraan.setAttribute("readonly", true);
});

function handleRadioChange() {
    selectedValue = document.querySelector('input[name="radiogrup1"]:checked').value;
    console.log(selectedValue);


    // Cek nilai yang terpilih dan lakukan sesuatu berdasarkan nilai tersebut
    if (selectedValue === "opt1") {
        console.log("Anda memilih Pelunasan");

        kodePerkiraanSelect.prop("disabled", false);
        noPenagihan.prop("disabled", false);
        jumlahYangDibayar.removeAttribute("readonly", true);
        pelunasanCurrency.removeAttribute("readonly", true);
        // nilaiBiaya.removeAttribute("readonly", true);
        // nilaiKurangLebih.removeAttribute("readonly", true);
        // noPenagihan1.removeAttribute("readonly", true);
        idKodePerkiraan.removeAttribute("readonly", true);
        // btn_noPenagihan.removeAttribute("disabled", true);
        noPenagihan1.prop("disabled", true);

        // btn_noPenagihan.focus();
        noPenagihan.focus();
        fetchData("/Kencana/getListPenagihanSJKencana/" + idCustomer.value);
        lihatPenagihan(noPenagihan.value);

    } else if (selectedValue === "opt2") {
        console.log("Anda memilih Biaya Ditanggung", idJenisPembayaran.value);

        if (idJenisPembayaran.value !== '2' && idJenisPembayaran !== '3') {
            // btn_noPenagihan.setAttribute("disabled", true);
            noPenagihan.prop("disabled", true);
            jumlahYangDibayar.setAttribute("readonly", true);
            pelunasanCurrency.setAttribute("readonly", true);

            nilaiKurangLebih.removeAttribute("readonly", true);
            noPenagihan1.prop("disabled", true);
            kodePerkiraanSelect.prop("disabled", false);
            nilaiBiaya.removeAttribute("readonly", true);

            nilaiBiaya.focus();
            nilaiBiaya.value = 0;
            nilaiKurangLebih.value = numeral(0).format("0,0.00");

        }
    } else if (selectedValue === "opt3") {
        console.log("Anda memilih Kurang/Lebih");
        // btn_noPenagihan.setAttribute("disabled", true);
        // noPenagihan.setAttribute("readonly", true);
        noPenagihan.prop("disabled", true);

        nilaiBiaya.setAttribute("readonly", true);
        jumlahYangDibayar.setAttribute("readonly", true);
        pelunasanCurrency.setAttribute("readonly", true);

        nilaiKurangLebih.removeAttribute("readonly", true);
        noPenagihan1.prop("disabled", false);
        kodePerkiraanSelect.prop("disabled", false);
        nilaiBiaya.value = 0;

        nilaiKurangLebih.focus();
    }
};

// Tambahkan event listener untuk setiap tombol radio
var radioButtons = document.querySelectorAll('input[name="radiogrup1"]');
radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener('change', handleRadioChange);
});


btnSimpanModal.addEventListener('click', function (event) {
    event.preventDefault();
    let hasError = false;

    if (!opt1.checked && !opt2.checked && !opt3.checked) {
        Swal.fire({
            icon: 'error',
            text: 'Tidak Ada Yang DiSimpan !!',
            returnFocus: false,
        });
        hasError = true;
    }

    if (opt1.checked && numeral(jumlahYangDibayar.value).value() <= 0) {
        Swal.fire({
            icon: 'error',
            text: 'Nilai Pelunasan Harus Diisi',
            returnFocus: false,
        });
        hasError = true;
        jumlahYangDibayar.focus();
    } else if (opt2.checked && numeral(nilaiBiaya.value).value() <= 0) {
        Swal.fire({
            icon: 'error',
            text: 'Nilai Biaya Harus Diisi',
            returnFocus: false,
        });
        hasError = true;
    } else if (opt3.checked && numeral(nilaiKurangLebih.value).value() === 0) {
        Swal.fire({
            icon: 'error',
            text: 'Nilai Kurang/Lebih Harus Diisi',
            returnFocus: false,
        });
        hasError = true;
    } else if (opt3.checked && numeral(nilaiKurangLebih.value).value() < 0 && noPenagihan1.value === '') {
        Swal.fire({
            icon: 'error',
            text: 'Nilai Kurang, Nomor Tagihan Harus Diisi',
            returnFocus: false,
        });
        hasError = true;
    }

    //Jika ada bayar pakai bg/cek tidak boleh lunas
    if ((lunas.value === "" || lunas.value === " " || (lunas.value.toUpperCase() !== "Y" && lunas.value.toUpperCase() !== "N"))
        && selectedValue === 1 || (idJenisPembayaran.value === 2 || idJenisPembayaran.value === 3) || lunas.value.toUpperCase() === "Y") {
        Swal.fire({
            icon: 'error',
            text: 'Salah Input kolom lunas',
            returnFocus: false,
        });
        hasError = true;
        lunas.focus();
    };

    if (!hasError) {
        var tableData = $('#tabelPelunasanPenjualan').DataTable();

        if (prosesmodal === 1) {
        }

        function checkDuplicateAndAddRow(rowData) {
            let duplicateFound = false;

            tableData.rows().every(function (rowIdx, tableLoop, rowLoop) {
                if (noPen.value !== '' && tableData.$('tr.selected').length === 0) {
                    if (this.data()[0] === rowData[0]) {
                        duplicateFound = true;
                        return false;
                    }
                }
            });

            if (duplicateFound) {
                Swal.fire({
                    icon: 'error',
                    text: 'Data sudah diinputkan',
                    returnFocus: false,
                }).then(() => {
                    $('#modalLihatPenagihan').modal('hide');
                });
            } else {
                if (tableData.$('tr.selected').length > 0) {

                    let selectedRow = tableData.$('tr.selected').index();
                    let rowDataToUpdate = tableData.row(selectedRow).data();

                    rowDataToUpdate[1] = numeral(numeral(rowData[1]).value()).format("0,0.00");
                    rowDataToUpdate[2] = numeral(numeral(rowData[2]).value()).format("0,0.00");
                    rowDataToUpdate[3] = rowData[3];
                    rowDataToUpdate[5] = numeral(numeral(rowData[5]).value()).format("0,0.00");
                    rowDataToUpdate[7] = numeral(numeral(rowData[7]).value()).format("0,0.00");
                    rowDataToUpdate[8] = numeral(numeral(rowData[8]).value()).format("0,0.00");
                    rowDataToUpdate[9] = rowData[9];
                    rowDataToUpdate[10] = rowData[10];

                    tableData.row(selectedRow).data(rowDataToUpdate).draw();
                    let totLunas = numeral(totalPelunasan.value).value() - numeral(sNilai_Pelunasan).value() + numeral(jumlahYangDibayar.value).value();
                    totalPelunasan.value = numeral(totLunas).format("0.0,00");

                    totalBiaya.value = numeral(numeral(totalBiaya.value).value() - numeral(sBiaya).value() + numeral(nilaiBiaya.value).value()).format("0,0.00");
                    console.log(kurangLebih.value, sKurangLebih, nilaiKurangLebih.value);

                    kurangLebih.value = numeral(numeral(kurangLebih.value).value() - numeral(sKurangLebih).value() + numeral(nilaiKurangLebih.value).value()).format("0,0.00");
                    kurangLebih.value = numeral(kurangLebih.value).value() < 0
                        ? numeral(kurangLebih.value).format('(0,0.00)')
                        : numeral(kurangLebih.value).format('0,0.00');

                } else {
                    tableData.row.add(rowData).draw();
                    console.log(rowData);

                    let totLunas = numeral(totalPelunasan.value).value() + numeral(jumlahYangDibayar.value).value();
                    totalPelunasan.value = numeral(totLunas).format("0,0.00");

                    totalBiaya.value = numeral(numeral(totalBiaya.value).value() + numeral(nilaiBiaya.value).value()).format("0,0.00");

                    console.log(kurangLebih.value, nilaiKurangLebih.value);
                    kurangLebih.value = numeral(numeral(kurangLebih.value).value() + numeral(nilaiKurangLebih.value).value()).format("0,0.00");
                    kurangLebih.value = numeral(kurangLebih.value).value() < 0
                        ? numeral(kurangLebih.value).format('(0,0.00)')
                        : numeral(kurangLebih.value).format('0,0.00');
                }

                $('#modalLihatPenagihan').modal('hide');
            }
        }

        let tempArr1 = numeral(numeral(jumlahYangDibayar.value).value()).format("0,0.00");
        let tempArr2 = numeral(numeral(nilaiBiaya.value).value()).format("0,0.00");
        let tempArr5 = numeral(numeral(pelunasanRupiah.value).value()).format("0,0.00");
        let tempArr7 = numeral(numeral(pelunasanCurrency.value).value()).format("0,0.00");
        let tempArr8 = numeral(numeral(nilaiKurangLebih.value).value()).format("0,0.00");

        var rowData = [
            escapeHtml(noPen.value),          // Id. Penagihan
            tempArr1,                               // Nilai Pelunasan
            tempArr2,                               // Biaya
            lunas.value.toUpperCase(),              // Lunas
            '',                                     // Id. Detail Pelunasan
            tempArr5,                               // Pelunasan Rupiah
            escapeHtml(idMataUang.value),           // Mata Uang
            tempArr7,                               // Pelunasan Currency
            tempArr8,                               // Kurang Lebih
            escapeHtml(idKodePerkiraan.value),      // Perkiraan
            escapeHtml(noPen1.value)          // ID_Tagihan_Pembulatan
        ];

        // console.log(rowData);


        checkDuplicateAndAddRow(rowData);
    }
    clearDropdowns();
});

// var selectedRows = [];
var data;

// $("#tabelPelunasanPenjualan tbody").off("click", "tr");
$("#tabelPelunasanPenjualan tbody").on("click", "tr", function () {
    let checkSelectedRows = $("#tabelPelunasanPenjualan tbody tr.selected");

    if (checkSelectedRows.length > 0) {
        // Remove "selected" class from previously selected rows
        checkSelectedRows.removeClass("selected");
    }
    $(this).toggleClass("selected");
    const table = $("#tabelPelunasanPenjualan").DataTable();
    data = table.row(this).data();
    // selectedRows = table.rows(".selected").data().toArray();
    // console.log(selectedRows[0], data);
    console.log(data);
    // suratPesanan.value = selectedRows[0].Keterangan;

    if (proses == 1) {
        tabelIdDetailPelunasan.value = data[4];
        tabelIdPenagihan.value = data[0];
        tabelNilaiPelunasan.value = data[1];
        tabelPelunasanRupiah.value = data[5];
        tabelBiaya.value = data[2];
        tabelLunas.value = data[3];
        tabelPelunasanCurrency.value = data[7];
        tabelKurangLebih.value = data[8];
        tabelKodePerkiraan.value = data[9];
        tabelIdDetail.value = data[10];
    } else if (proses == 2 || proses == 3) {
        tabelIdDetailPelunasan.value = data[4];
        tabelIdPenagihan.value = data[0];
        tabelNilaiPelunasan.value = data[1];
        tabelPelunasanRupiah.value = data[5];
        tabelBiaya.value = data[2];
        tabelLunas.value = data[3];
        tabelPelunasanCurrency.value = data[7];
        tabelKurangLebih.value = data[8];
        tabelKodePerkiraan.value = data[9];
        tabelIdDetail.value = data[10];
    }
});

var selectedIndex;
var updatedData = {};

function populateDropdowns(data) {
    if (data.length > 0) {
        const noPenagihanValue = data[0];
        const kodePerkiraanValue = data[9];

        noPenagihan.val(noPenagihanValue).trigger("change");
        noPen.value = data[0];
        kodePerkiraanSelect.val(kodePerkiraanValue).trigger("change");

    } else {
        console.error("Data array is empty or invalid.");
    }
}

btnEditItem.addEventListener('click', function (event) {
    event.preventDefault();
    // clearModal();

    modalLihatPenagihan = $("#modalLihatPenagihan");
    modalLihatPenagihan.modal('show');
    // prosesmodal = 1;

    nilaiPenagihan.value = '';
    mataUangPenagihan.value = '';
    nilaiKurs.value = '';
    terbayar.value = 0;
    terbayarRupiah.value = 0;
    sisa.value = 0;
    sisaRupiah.value = 0;
    jumlahYangDibayar.value = 0;
    pelunasanCurrency.value = 0;
    pelunasanRupiah.value = 0;
    lunas.value = 'N';
    nilaiBiaya.value = 0;
    nilaiKurangLebih.value = 0;
    idKodePerkiraan.value = '';

    kodePerkiraanSelect.prop("disabled", true);
    noPenagihan.prop("disabled", true);
    jumlahYangDibayar.setAttribute("readonly", true);
    pelunasanCurrency.setAttribute("readonly", true);
    nilaiBiaya.setAttribute("readonly", true);
    nilaiKurangLebih.setAttribute("readonly", true);
    noPenagihan1.prop("disabled", true);
    idKodePerkiraan.setAttribute("readonly", true);
    // btn_noPenagihan.setAttribute("disabled", true);
    noPenagihan.prop("disabled", true);
    modalLihatPenagihan = $("#modalLihatPenagihan");
    modalLihatPenagihan.modal('show');
    prosesmodal = 2;

    nilaiBiaya.value = 0;
    nilaiKurangLebih.value = 0;

    idKodePerkiraan.value = data[9];
    if (idKodePerkiraan.value !== '') {
        Perkiraan(idKodePerkiraan.value);
    }

    // console.log(proses);
    console.log(data);
    populateDropdowns(data);

    if (proses === 1) {
        if (numeral(data[1]).value() === 0) {
            if (numeral(data[2]).value() !== 0) {
                console.log('masuk 2');

                var radiobutton = document.querySelector('input[type="radio"][value="opt2"]');

                nilaiBiaya.value = numeral(data[2]).format("0,0.00");
                sBiaya = nilaiBiaya.value;
                nilaiBiaya.focus();

                // Memeriksa apakah elemen radiobutton ada dan bukan null
                if (radiobutton) {
                    radiobutton.checked = true; // Mencentang radiobutton dengan value 1

                    // btn_noPenagihan.setAttribute("disabled", true);
                    noPenagihan.prop("disabled", true);
                    jumlahYangDibayar.setAttribute("readonly", true);
                    pelunasanCurrency.setAttribute("readonly", true);

                    nilaiKurangLebih.removeAttribute("readonly", true);
                    noPenagihan1.prop("disabled", true);
                    nilaiBiaya.removeAttribute("readonly", true);
                    kodePerkiraanSelect.prop("disabled", false);
                }
            } else {
                console.log("masuk value");
                var radiobutton = document.querySelector('input[type="radio"][value="opt3"]');

                nilaiKurangLebih.value = numeral(numeral(data[8]).value()).format("0,0.00");
                sKurangLebih = nilaiKurangLebih.value;

                // Memeriksa apakah elemen radiobutton ada dan bukan null
                if (radiobutton) {
                    radiobutton.checked = true; // Mencentang radiobutton dengan value 1

                    // btn_noPenagihan.setAttribute("disabled", true);
                    // btn_noPenagihan1.removeAttribute("disabled", true);
                    noPenagihan.prop("disabled", true);

                    // noPenagihan.setAttribute("readonly", true);
                    nilaiBiaya.setAttribute("readonly", true);
                    jumlahYangDibayar.setAttribute("readonly", true);
                    pelunasanCurrency.setAttribute("readonly", true);

                    nilaiKurangLebih.removeAttribute("readonly", true);
                    // noPenagihan1.removeAttribute("readonly", true);
                    noPenagihan1.prop("disabled", false);
                    nilaiKurangLebih.focus();
                    nilaiBiaya.value = 0;
                    kodePerkiraanSelect.prop("disabled", false);
                }
                nilaiKurangLebih.focus();
            }
        } else {
            // noPenagihan.setAttribute("readonly", true);
            nilaiPenagihan.setAttribute("readonly", true);
            idKodePerkiraan.setAttribute("readonly", true);
            kodePerkiraanSelect.prop("disabled", true);


            noPenagihan.value = data[0];
            lunas.value = data[3];
            jumlahYangDibayar.value = numeral(data[1]).format("0,0.00");
            pelunasanRupiah.value = numeral(data[5]).format("0,0.00");
            pelunasanCurrency.value = numeral(data[7]).format("0,0.00");

            var radiobutton = document.querySelector('input[type="radio"][value="opt1"]');
            if (radiobutton) {
                radiobutton.checked = true;

                // kodePerkiraanSelect.removeAttribute("readonly", true);
                kodePerkiraanSelect.prop("disabled", false);
                // noPenagihan.removeAttribute("readonly", true);
                noPenagihan.prop("disabled", false);

                jumlahYangDibayar.removeAttribute("readonly", true);
                pelunasanCurrency.removeAttribute("readonly", true);
                // nilaiBiaya.removeAttribute("readonly", true);
                // nilaiKurangLebih.removeAttribute("readonly", true);
                // noPenagihan1.removeAttribute("readonly", true);
                idKodePerkiraan.removeAttribute("readonly", true);
                // btn_noPenagihan.removeAttribute("disabled", true);

                // btn_noPenagihan.focus();
                noPenagihan.focus();
                lihatPenagihan(noPenagihan.value);
            }

            sNilai_Pelunasan = jumlahYangDibayar.value;
            sPelunasan_Rupiah = pelunasanRupiah.value;
            sPelunasan_curency = pelunasanCurrency.value;
            lihatPenagihan(noPenagihan.value);
            jumlahYangDibayar.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
        }
    } else if (proses === 2) {
        console.log('proses 2');

        if (numeral(data[1]).value() === 0) {
            if (numeral(data[2]).value() !== 0 || numeral(data[2]).value() !== 0.00) {
                console.log('b');

                nilaiBiaya.value = numeral(data[2]).format("0,0.00");
                sBiaya = nilaiBiaya.value;

                var radiobutton = document.querySelector('input[type="radio"][value="opt2"]');

                if (radiobutton) {
                    radiobutton.checked = true;
                    noPenagihan1.prop("disabled", true);
                    jumlahYangDibayar.setAttribute("readonly", true);
                    pelunasanCurrency.setAttribute("readonly", true);

                    nilaiKurangLebih.removeAttribute("readonly", true);
                    noPenagihan1.prop("disabled", false);
                    nilaiBiaya.removeAttribute("readonly", true);
                    nilaiBiaya.focus();
                }
                nilaiBiaya.focus();
            } else {
                console.log("masuk value 3");
                // console.log('c');
                nilaiKurangLebih.value = numeral(numeral(data[8]).value()).format("0,0.00");
                sKurangLebih = nilaiKurangLebih.value;

                // kurangLebih.value = numeral(numeral(data[8]).value()).format("0,0.00");
                // sKurangLebih = kurangLebih.value;
                var radiobutton = document.querySelector('input[type="radio"][value="opt3"]');

                if (radiobutton) {
                    radiobutton.checked = true;

                    // btn_noPenagihan.setAttribute("disabled", true);
                    // btn_noPenagihan1.removeAttribute("disabled", true);
                    // noPenagihan.setAttribute("readonly", true);

                    noPenagihan.prop("disabled", true);
                    noPenagihan1.prop("disabled", false);

                    nilaiBiaya.setAttribute("readonly", true);
                    jumlahYangDibayar.setAttribute("readonly", true);
                    pelunasanCurrency.setAttribute("readonly", true);

                    nilaiKurangLebih.removeAttribute("readonly", true);
                    noPenagihan1.removeAttribute("readonly", true);
                    nilaiKurangLebih.focus();
                    nilaiBiaya.value = 0;
                }
                nilaiKurangLebih.focus();
            }
        } else {
            console.log('aaaaa');

            noPenagihan.value = data[0];
            lunas.value = data[3];
            nilaiBiaya.value = numeral(data[2]).format("0,0.00");
            nilaiKurangLebih.value = numeral(data[8]).format("0,0.00");
            jumlahYangDibayar.value = numeral(data[1]).format("0,0.00");
            pelunasanRupiah.value = numeral(data[5]).format("0,0.00");
            pelunasanCurrency.value = numeral(data[7]).format("0,0.00");

            var radiobutton = document.querySelector('input[type="radio"][value="opt1"]');
            if (radiobutton) {
                radiobutton.checked = true;

                // kodePerkiraanSelect.removeAttribute("readonly", true);
                kodePerkiraanSelect.prop("disabled", false);
                // noPenagihan.removeAttribute("readonly", true);
                jumlahYangDibayar.removeAttribute("readonly", true);
                pelunasanCurrency.removeAttribute("readonly", true);
                // nilaiBiaya.removeAttribute("readonly", true);
                // nilaiKurangLebih.removeAttribute("readonly", true);
                // noPenagihan1.removeAttribute("readonly", true);
                idKodePerkiraan.removeAttribute("readonly", true);
                // btn_noPenagihan.removeAttribute("disabled", true);
                noPenagihan.prop("disabled", false);


                // btn_noPenagihan.focus();
                noPenagihan.focus();
                lihatPenagihan(noPenagihan.value);
            }

            sNilai_Pelunasan = jumlahYangDibayar.value;
            sPelunasan_Rupiah = pelunasanRupiah.value;
            sPelunasan_curency = pelunasanCurrency.value;
            jumlahYangDibayar.focus();
        }
    }
});

btnDeleteItem.addEventListener('click', function (event) {
    event.preventDefault();

    var table = $('#tabelPelunasanPenjualan').DataTable();

    totLunas = numeral(totalPelunasan.value).value() - numeral(data[1]).value();
    totalPelunasan.value = numeral(totLunas).format("0,0.00");
    totalBiaya.value = numeral(numeral(totalBiaya.value).value() - numeral(data[2]).value()).format("0,0.00");
    const result = numeral(totalPelunasan.value).value() - numeral(totalBiaya.value).value();
    nilaiMasukKas.value = result < 0
        ? numeral(result).format('(0,0.00)')
        : numeral(result).format('0,0.00');

    kurangLebih.value = numeral(kurangLebih.value).value() - numeral(data[8]).value();
    kurangLebih.value = numeral(kurangLebih.value).format("0,0.00");

    if (data[4] !== '') {
        listHapus.push([data[4] ?? '', data[0] ?? '']);

        // listHapusPenagihan.push(data[0]);
        // console.log("List hapus: ",listHapus);
    }

    table.rows('.selected').remove().draw();
});

btnSimpan.addEventListener('click', async function (event) {
    event.preventDefault();

    if (btnSimpan.disabled) {
        return;
    }
    btnSimpan.disabled = true;

    let err_ok = true;

    var tabelPelunasanPenjualan = $('#tabelPelunasanPenjualan').DataTable();
    let allRowData = [];

    tabelPelunasanPenjualan.rows().every(function () {
        let rowData = this.data();
        allRowData.push(rowData);
    });

    const tanggalHariIni = new Date().toISOString().substring(0, 10);
    if (tanggalInput.value > tanggalHariIni) {
        await Swal.fire({
            icon: 'error',
            text: 'Tanggal input melebihi tanggal sekarang',
        });
        btnSimpan.disabled = false;
        return;
    }

    if (sUser !== user_id && proses === 2) {
        await Swal.fire({
            icon: 'error',
            text: 'Anda Tidak Berhak Mengoreksi Data milik User ' + sUser.trim(),
        });
        btnSimpan.disabled = false;
        return;
    }

    const coba1 = numeral(nilaiMasukKas.value).value();
    const coba2 = numeral(totalPelunasan.value).value() - numeral(totalBiaya.value).value() + numeral(kurangLebih.value).value();

    console.log(coba1, coba2);

    if (numeral(coba1).format("0,0.00") < numeral(coba2).format("0,0.00")) {
        await Swal.fire({
            icon: 'error',
            text: 'Uang Yang Masuk Tidak Balance dg Pelunasan dan biaya',
            returnFocus: false,
        });
        btnSimpan.disabled = false;
        return;
    }

    if (tabelPelunasanPenjualan.rows().count() === 0) {
        await Swal.fire({
            icon: 'error',
            text: 'Data Yang Anda Masukan Belum Lengkap',
            returnFocus: false,
        });
        btnSimpan.disabled = false;
        return;
    }

    const rowData = tabelPelunasanPenjualan.row(1).data();

    if (rowData && rowData[6] !== undefined && idMataUang.value !== rowData[6]) {
        await Swal.fire({
            icon: 'error',
            text: 'Mata Uang Tidak Boleh DiGanti',
            returnFocus: false,
        });
        btnSimpan.disabled = false;
        return;
    }

    if (idJenisPembayaran.value === 2 || idJenisPembayaran.value === 3) {
        statusBayar.value = "B";
    } else {
        statusBayar.value = "";
    }

    nilaiPiutang.value = totalPelunasan.value;
    tsisa = numeral(numeral(totalPelunasan.value).value() - numeral(totalBiaya.value).value() + numeral(kurangLebih.value).value()).format("0,0.00");
    tsisa = numeral(numeral(nilaiMasukKas.value).value() - (tsisa)).format("0,0.00");

    let sMasukKas = numeral(numeral(totalPelunasan.value).value() - numeral(totalBiaya.value).value() + numeral(kurangLebih.value).value()).format("0,0.00");
    if (numeral(sMasukKas).value() !== numeral(nilaiMasukKas.value).value()) {
        nilaiPiutang.value = nilaiMasukKas.value;
        const result = await Swal.fire({
            icon: 'info',
            text: 'Akan muncul uang muka hasil dari sisa uang masuk. Anda Setuju ?',
            showConfirmButton: true,
            confirmButtonText: 'Ya',
            showCancelButton: true,
            cancelButtonText: 'Tidak',
            returnFocus: false,
        });
        if (result.isDismissed) {
            btnSimpan.disabled = false;
            return;
        }
    }

    if (proses === 1) {
        // Insert new data
        await $.ajax({
            type: 'PUT',
            url: '/Kencana/MaintenancePelunasanPenjualanKCN/insertData',
            data: {
                _token: csrfToken,
                arrTable: allRowData,
                tanggalInput: formatToMMDDYYYY(tanggalInput.value),
                idJenisPembayaran: idJenisPembayaran.value,
                nilaiPiutang: nilaiPiutang.value,
                idMataUang: idMataUang.value,
                buktiPelunasan: buktiPelunasan.value,
                idCustomer: idCustomer.value,
                sisa: tsisa,
                statusBayar: statusBayar.value,
                idReferensi: informasiBankSelect.value,
            },
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    html: response.success,
                    returnFocus: false,
                }).then(() => {
                    noPelunasanSelect.value = response.Id_Pelunasan.trim();
                    btnIsi.style.display = "block";
                    btnSimpan.style.display = "none";
                    btnKoreksi.style.display = "block";
                    btnBatal.style.display = "none";
                    btnIsi.focus();

                    window.location.reload(true);
                });
            },
            error: function (xhr, status, error) {
                btnSimpan.disabled = false;
                console.error('Error:', error);
            }
        });
    } else if (proses === 2) {
        console.log(tsisa);

        // Update existing data
        await $.ajax({
            type: 'PUT',
            url: '/Kencana/MaintenancePelunasanPenjualanKCN/updateData',
            data: {
                _token: csrfToken,
                IdPelunasan: noPelunasanSelect.value,
                arrHapus: listHapus,
                arrTable: allRowData,
                nilaiPiutang: numeral(nilaiPiutang.value).value(),
                tanggalInput: formatToMMDDYYYY(tanggalInput.value),
                idJenisPembayaran: idJenisPembayaran.value,
                buktiPelunasan: buktiPelunasan.value,
                idCustomer: idCustomer.value,
                sisa: tsisa
            },
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    html: response.success,
                    returnFocus: false,
                }).then(() => {
                    window.location.reload(true);
                });
            },
            error: function (xhr, status, error) {
                btnSimpan.disabled = false;
                console.error('Error:', error);
            }
        });
    }
    else if (proses === 3) {
        Swal.fire({
            title: 'Pilih Aksi',
            text: 'Apakah Anda ingin Menghapus Pelunasan atau Batal Giro?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Menghapus Pelunasan [H]',
            cancelButtonText: 'Batal Giro [B]',
            focusConfirm: false,
            focusCancel: false
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    type: 'DELETE',
                    url: '/Kencana/MaintenancePelunasanPenjualanKCN/deleteH',
                    data: {
                        _token: csrfToken,
                        IdPelunasan: noPelunasanSelect.value,
                        arrTable: allRowData,
                    },
                    success: function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            html: response.success,
                            returnFocus: false,
                        }).then(() => {
                            window.location.reload(true);
                        });
                    },
                    error: function (xhr, status, error) {
                        btnSimpan.disabled = false;
                        console.error('Error:', error);
                    }
                });
                // Place the function or code to execute for deletion here
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: 'Pilih Aksi',
                    text: 'Isi Keterangan Batal ',
                    confirmButtonText: 'OK',
                    input: 'text',
                    inputPlaceholder: 'Cek/BG Kosong',
                    inputValue: 'Cek/BG Kosong',
                }).then((result) => {
                    if (result.isConfirmed && result.value !== '') {
                        let Batal = result.value; // Get the value from the text input

                        $.ajax({
                            type: 'DELETE',
                            url: '/Kencana/MaintenancePelunasanPenjualanKCN/deleteB',
                            data: {
                                _token: csrfToken,
                                IdPelunasan: noPelunasanSelect.value,
                                Batal: Batal,
                                arrTable: allRowData,
                                Id_Cust: idCustomer.value,
                            },
                            success: function (response) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Success',
                                    html: response.success,
                                    returnFocus: false,
                                }).then(() => {
                                    window.location.reload(true);
                                });
                            },
                            error: function (xhr, status, error) {
                                btnSimpan.disabled = false;
                                console.error('Error:', error);
                            }
                        });
                    }
                });
            } else {
                btnSimpan.disabled = false;
            }
        });
    }
});

btnKoreksi.addEventListener('click', function (event) {
    event.preventDefault();

    clear();

    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";
    btnHapus.style.display = "none";

    btn_cust.disabled = false;
    btn_jenisPmb.disabled = true;
    btn_mtUang.disabled = true;
    btn_pelunasan.disabled = false;
    btn_bank.disabled = true;

    tanggalInput.removeAttribute("readonly");
    namaCustomerSelect.setAttribute("readonly", true);
    mataUangSelect.setAttribute("readonly", true);
    informasiBankSelect.setAttribute("readonly", true);
    jenisPembayaranSelect.setAttribute("readonly", true);
    noPelunasanSelect.setAttribute("readonly", true);
    btn_jenisPmb.setAttribute("disabled", true);
    btn_bank.setAttribute("disabled", true);
    btn_mtUang.setAttribute("disabled", true);

    nilaiPiutang.removeAttribute("readonly", true);
    nilaiMasukKas.removeAttribute("readonly", true);
    buktiPelunasan.removeAttribute("readonly", true);
    btn_cust.focus();

    nilaiPiutang.value = 0;
    kurangLebih.value = 0;
    totalBiaya.value = 0;
    totalPelunasan.value = 0;

    cust = 2;
    proses = 2;
});

btnHapus.addEventListener('click', function (event) {
    event.preventDefault();

    btnIsi.style.display = "none";
    btnSimpan.style.display = "block";
    btnKoreksi.style.display = "none";
    btnBatal.style.display = "block";
    btnHapus.style.display = "none";

    btn_cust.disabled = false;
    btn_jenisPmb.disabled = true;
    btn_mtUang.disabled = true;
    btn_pelunasan.disabled = false;
    btn_bank.disabled = true;

    namaCustomerSelect.removeAttribute("readonly", true);
    mataUangSelect.removeAttribute("readonly", true);
    informasiBankSelect.removeAttribute("readonly", true);
    nilaiPiutang.removeAttribute("readonly", true);
    jenisPembayaranSelect.removeAttribute("readonly", true);

    noPelunasanSelect.removeAttribute("readonly", true);
    btn_cust.focus();

    // koreksi();
    proses = 3;
    cust = 3;
})




