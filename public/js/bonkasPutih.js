// bonkas putih

//#region Variable
let $modal = $('#modalTambahBonKasPutih');

let $form = $modal.find('#formBonKasPutih');
let $jumlah = $modal.find('#jumlah');
let $terbilang = $modal.find('#terbilang');
let $uraian = $modal.find('#uraian');
let $dokumentasi = $modal.find('#dokumentasi');
let $listDokumentasi = $modal.find('#listDokumentasi');
let $totalSize = $modal.find('#totalSize');
let $btnKirim = $modal.find('#btn-kirim');

const dataTransfer = new DataTransfer();
let actionBonKas = '';
let callbackSubmit = null;
let selectedBonKasMerah = [];
let isSubmitting = false;


console.log('BONKAS PUTIH LOADED');
// let table = $('#tblBonKas').DataTable({
//     data: bonKas,
//     pageLength: 10,
//     order: [[2, 'desc']],
//     columns: [
//         {
//             data: null,
//             orderable: false,
//             searchable: false,
//             render: function (data, type, row, meta) {
//                 return meta.row + 1;
//             }
//         },
//         {
//             data: 'KodeBonKas',
//             render: function (data, type, row) {
//                 return `
//                     <a href="javascript:void(0)"
//                     class="link-bon-kas"
//                     data-id="${row.IdBonKas}">
//                         ${data}
//                     </a>
//                 `;
//             }
//         },
//         {
//             data: 'Tanggal',
//             render: function (data) {

//                 let d = new Date(data);

//                 let hari = String(d.getDate()).padStart(2, '0');
//                 let bulan = String(d.getMonth() + 1).padStart(2, '0');
//                 let tahun = d.getFullYear();

//                 return `${hari}-${bulan}-${tahun}`;
//             }
//         },
//         {
//             data: 'JenisBonKas',
//             render: function (data) {
//                 return data === 'P'
//                     ? 'Bon Kas Putih'
//                     : 'Bon Kas Merah';
//             }
//         },
//         {
//             data: 'Jumlah',
//             render: $.fn.dataTable.render.number('.', ',', 2)
//         },
//         {
//             data: 'Uraian'
//         },
//         {
//             data: 'NamaStatus'
//         },
//         {
//             data: null,
//             orderable: false,
//             searchable: false,
//             render: function (data) {

//                 const hasDokumentasi = data.Dokumentasi && data.Dokumentasi.trim() !== '';
//                 const btnDownload = `
//                     <button
//                         class="btn btn-primary btn-sm btn-download"
//                         data-id="${data.IdBonKas}"
//                         ${hasDokumentasi ? '' : 'disabled'}>
//                         Download File
//                     </button>
//                 `;
//                 const btnKasir = isAdminKasir
//                 ? `
//                     <button
//                         class="btn btn-sm btn-kasir"
//                         style="background-color:#fd7e14;border-color:#fd7e14;color:#fff;"
//                         data-id="${data.IdBonKas}"
//                         ${data.Aksi === 'KASIR' ? '' : 'disabled'}>
//                         ACC Kasir
//                     </button>
//                 `
//                 : '';

//                 switch (data.Aksi) {
//                     case 'KIRIM':
//                         return `
//                             <button
//                                 class="btn btn-success btn-sm btn-kirim"
//                                 data-id="${data.IdBonKas}"
//                                 data-kode="${data.KodeBonKas}"
//                                 data-bs-toggle="modal"
//                                 data-bs-target="#modalKirim">
//                                 Kirim
//                             </button>

//                             <button
//                                 class="btn btn-warning btn-sm btn-acc"
//                                 data-id="${data.IdBonKas}" disabled>
//                                 ACC
//                             </button>

//                             ${btnKasir}

//                             <button
//                                 class="btn btn-secondary btn-sm btn-print"
//                                 data-id="${data.IdBonKas}">
//                                 Print
//                             </button>
//                             ${btnDownload}

//                             <button
//                                 class="btn btn-danger btn-sm btn-cancel"
//                                 data-id="${data.IdBonKas}" disabled>
//                                 Batal ACC
//                             </button>

//                             <button
//                                 class="btn btn-dark btn-sm btn-delete"
//                                 data-id="${data.IdBonKas}">
//                                 Delete
//                             </button>
//                         `;

//                     // status -> submit
//                     case 'ACC':
//                         return `
//                             <button
//                                 class="btn btn-success btn-sm btn-kirim"
//                                 data-id="${data.IdBonKas}"
//                                 data-kode="${data.KodeBonKas}"
//                                 data-bs-toggle="modal"
//                                 data-bs-target="#modalKirim" disabled>
//                                 Kirim
//                             </button>
//                             <button
//                                 class="btn btn-warning btn-sm btn-acc"
//                                 data-id="${data.IdBonKas}">
//                                 ACC
//                             </button>

//                             ${btnKasir}

//                             <button
//                                 class="btn btn-secondary btn-sm btn-print"
//                                 data-id="${data.IdBonKas}">
//                                 Print
//                             </button>
//                             ${btnDownload}

//                             <button
//                                 class="btn btn-danger btn-sm btn-cancel"
//                                 data-id="${data.IdBonKas}">
//                                 Batal ACC
//                             </button>

//                             <button
//                                 class="btn btn-dark btn-sm btn-delete"
//                                 data-id="${data.IdBonKas}">
//                                 Delete
//                             </button>
//                         `;

//                     // status -> acc
//                     case 'PRINT':
//                         return `
//                             <button
//                                 class="btn btn-success btn-sm btn-kirim"
//                                 data-id="${data.IdBonKas}"
//                                 data-kode="${data.KodeBonKas}"
//                                 data-bs-toggle="modal"
//                                 data-bs-target="#modalKirim" disabled>
//                                 Kirim
//                             </button>
//                             <button
//                                 class="btn btn-warning btn-sm btn-acc"
//                                 data-id="${data.IdBonKas}" disabled>
//                                 ACC
//                             </button>
//                             ${btnKasir}
//                             <button
//                                 class="btn btn-secondary btn-sm btn-print"
//                                 data-id="${data.IdBonKas}">
//                                 Print
//                             </button>
//                             ${btnDownload}
//                             <button
//                                 class="btn btn-danger btn-sm btn-cancel"
//                                 data-id="${data.IdBonKas}">
//                                 Batal ACC
//                             </button>
//                             <button
//                                 class="btn btn-dark btn-sm btn-delete"
//                                 data-id="${data.IdBonKas}">
//                                 Delete
//                             </button>
//                         `;

//                         case 'KASIR':
//                             return `
//                                 <button
//                                     class="btn btn-success btn-sm btn-kirim"
//                                     data-id="${data.IdBonKas}"
//                                     disabled>
//                                     Kirim
//                                 </button>

//                                 <button
//                                     class="btn btn-warning btn-sm btn-acc"
//                                     data-id="${data.IdBonKas}"
//                                     disabled>
//                                     ACC
//                                 </button>

//                                 ${btnKasir}

//                                 <button
//                                     class="btn btn-secondary btn-sm btn-print"
//                                     data-id="${data.IdBonKas}">
//                                     Print
//                                 </button>
//                                 ${btnDownload}
//                                 <button
//                                     class="btn btn-danger btn-sm btn-cancel"
//                                     data-id="${data.IdBonKas}" disabled>
//                                     Batal ACC
//                                 </button>
//                             <button
//                                 class="btn btn-dark btn-sm btn-delete"
//                                 data-id="${data.IdBonKas}" disabled>
//                                 Delete
//                             </button>
//                             `;


//                         case 'SELESAI':
//                             return `
//                                 <button
//                                     class="btn btn-success btn-sm btn-kirim"
//                                     data-id="${data.IdBonKas}"
//                                     disabled>
//                                     Kirim
//                                 </button>

//                                 <button
//                                     class="btn btn-warning btn-sm btn-acc"
//                                     data-id="${data.IdBonKas}"
//                                     disabled>
//                                     ACC
//                                 </button>

//                                 ${btnKasir}

//                                 <button
//                                     class="btn btn-secondary btn-sm btn-print"
//                                     data-id="${data.IdBonKas}">
//                                     Print
//                                 </button>
//                                 ${btnDownload}
//                                 <button
//                                     class="btn btn-danger btn-sm btn-cancel"
//                                     data-id="${data.IdBonKas}" disabled>
//                                     Batal ACC
//                                 </button>
//                                 <button
//                                     class="btn btn-dark btn-sm btn-delete"
//                                     data-id="${data.IdBonKas}" disabled>
//                                     Delete
//                                 </button>
//                             `;

//                     default:
//                         return '';
//                 }
//             }
//         }
//     ]
// });

//#endregion

//#region Function
function initSelectUser() {
    $('#nomorUser').select2({
        dropdownParent: $('#modalKirim'),
        width: '100%',
        placeholder: '-- Pilih User --',
        allowClear: true
    });
    console.log($('#nomorUser').data('select2'));
}

function formatJumlah() {
    let angka = $jumlah.val().replace(/[^0-9]/g, '');

    if (angka === '') {
        $jumlah.val('');
        return;
    }
    $jumlah.val(Number(angka).toLocaleString('en-US'));
}


function pindahTab(e) {
    // Jika textarea, biarkan Enter membuat baris baru
    if ($(this).is('textarea')) {
        return;
    }

    if (e.key !== 'Enter')
        return;

    e.preventDefault();

    const currentTab = parseInt($(this).attr('tabindex')) || 0;
    const next = $('[tabindex="' + (currentTab + 1) + '"]');

    if (next.length) {
        next.focus();
    }
}

function konfirmasiSimpan() {
    if (!validasiFormBonKas()) {
        return;
    }
    Swal.fire({
        title: 'Simpan Bon Kas?',
        text: 'Pastikan data yang dimasukkan sudah benar.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, Simpan',
        cancelButtonText: 'Batal',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            if (!lockSubmit()) {
                return;
            }
            // Mode Save
            $form.find('[name="action"]').val('simpan');
            $form.find('[name="Mengetahui"]').val('');

            // Hilangkan format koma
            $jumlah.val($jumlah.val().replace(/,/g, ''));

            $form.submit();

        }
    });
}

function pilihDokumentasi() {
    Array.from(this.files).forEach(file => {
        const sudahAda = Array.from(dataTransfer.files).some(f =>
            f.name === file.name &&
            f.size === file.size &&
            f.lastModified === file.lastModified
        );

        if (!sudahAda) {
            dataTransfer.items.add(file);
        }
    });

    this.files = dataTransfer.files;
    renderDokumentasi();
}

function renderDokumentasi() {

    let html = '';
    let total = 0;

    Array.from(dataTransfer.files).forEach(function (file, index) {

        total += file.size;

        let preview = '';

        if (file.type.startsWith('image/')) {

            preview = `
                <img
                    src="${URL.createObjectURL(file)}"
                    class="rounded border preview-image"
                    data-src="${URL.createObjectURL(file)}"
                    style="width:80px;height:80px;object-fit:cover;cursor:pointer">
            `;

        } else if (file.type === 'application/pdf') {

            preview = `
                <div class="d-flex justify-content-center align-items-center rounded border bg-light"
                     style="width:80px;height:80px;">
                    <i class="fas fa-file-pdf fa-2x text-danger"></i>
                </div>
            `;

        } else {

            preview = `
                <div class="d-flex justify-content-center align-items-center rounded border bg-light"
                     style="width:80px;height:80px;">
                    <i class="fas fa-file fa-2x text-secondary"></i>
                </div>
            `;
        }

        html += `
            <div class="border rounded p-2 mb-2">

                <div class="d-flex justify-content-between">

                    <div class="d-flex">

                        ${preview}

                        <div class="ms-3">
                            <strong>${file.name}</strong><br>
                            <small class="text-muted">${(file.size / 1024).toFixed(1)} KB</small>
                        </div>

                    </div>

                    <button
                        type="button"
                        class="btn btn-sm btn-outline-danger btnHapusFile align-self-start"
                        data-index="${index}"
                        title="Hapus File">

                        <svg xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="currentColor"
                            viewBox="0 0 24 24">

                            <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path>
                            <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>

                        </svg>

                    </button>

                </div>

            </div>
        `;

    });

    $listDokumentasi.html(html);
    $totalSize.text((total / 1024).toFixed(1) + ' KB');

    if (total > 5 * 1024 * 1024) {

        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Total ukuran file melebihi 5 MB.'
        });

    }

}

function hapusDokumentasi() {
    let index = $(this).data('index');
    let files = Array.from(dataTransfer.files);

    dataTransfer.items.clear();

    files.forEach(function (file, i) {
        if (i !== index) {
            dataTransfer.items.add(file);
        }
    });

    $dokumentasi[0].files = dataTransfer.files;

    renderDokumentasi();
}


function penyebut(nilai) {
    nilai = Math.floor(Math.abs(nilai));

    const huruf = [
        "", "Satu", "Dua", "Tiga", "Empat",
        "Lima", "Enam", "Tujuh", "Delapan",
        "Sembilan", "Sepuluh", "Sebelas"
    ];

    if (nilai < 12) {
        return huruf[nilai];
    } else if (nilai < 20) {
        return penyebut(nilai - 10) + " Belas";
    } else if (nilai < 100) {
        return penyebut(Math.floor(nilai / 10)) + " Puluh" +
            (nilai % 10 ? " " + penyebut(nilai % 10) : "");
    } else if (nilai < 200) {
        return "Seratus" +
            (nilai - 100 ? " " + penyebut(nilai - 100) : "");
    } else if (nilai < 1000) {
        return penyebut(Math.floor(nilai / 100)) + " Ratus" +
            (nilai % 100 ? " " + penyebut(nilai % 100) : "");
    } else if (nilai < 2000) {
        return "Seribu" +
            (nilai - 1000 ? " " + penyebut(nilai - 1000) : "");
    } else if (nilai < 1000000) {
        return penyebut(Math.floor(nilai / 1000)) + " Ribu" +
            (nilai % 1000 ? " " + penyebut(nilai % 1000) : "");
    } else if (nilai < 1000000000) {
        return penyebut(Math.floor(nilai / 1000000)) + " Juta" +
            (nilai % 1000000 ? " " + penyebut(nilai % 1000000) : "");
    } else if (nilai < 1000000000000) {
        return penyebut(Math.floor(nilai / 1000000000)) + " Miliar" +
            (nilai % 1000000000 ? " " + penyebut(nilai % 1000000000) : "");
    } else if (nilai < 1000000000000000) {
        return penyebut(Math.floor(nilai / 1000000000000)) + " Triliun" +
            (nilai % 1000000000000 ? " " + penyebut(nilai % 1000000000000) : "");
    }

    return "";
}

function updateTerbilang() {

    const $modal = $('#modalTambahBonKasPutih');
    const $jumlah = $modal.find('#jumlah');
    const $terbilang = $modal.find('#terbilang');

    const val = $jumlah.val();

    console.log({
        jumlah: val,
        jumlahElement: $jumlah.length,
        terbilangElement: $terbilang.length
    });

    if (val == null) {
        return;
    }

    const angka = String(val).replace(/,/g, "");

    if (angka === "" || Number(angka) === 0) {
        $terbilang.text("(....................................................................................................................)");
        return;
    }

    $terbilang.text(`( ${penyebut(Number(angka)).trim()} Rupiah )`);
}


function validasiFormBonKas() {

    const $modal = $('#modalTambahBonKasPutih');

    const $jumlah = $modal.find('#jumlah');
    const $uraian = $modal.find('#uraian');

    const jumlah = ($jumlah.val() || '')
        .replace(/,/g, '')
        .trim();

    const uraian = ($uraian.val() || '')
        .trim();

    console.log({
        modal: $modal[0],
        jumlahElement: $jumlah[0],
        uraianElement: $uraian[0],
        jumlah,
        uraian
    });

    if (jumlah === '' || uraian === '') {

        Swal.fire({
            icon: 'warning',
            title: 'Data Belum Lengkap',
            text: 'Jumlah uang dan uraian wajib diisi sebelum disimpan atau dikirim.'
        });

        if (jumlah === '') {
            $jumlah.focus();
        } else {
            $uraian.focus();
        }

        return false;
    }

    if (Number(jumlah) <= 0) {

        Swal.fire({
            icon: 'warning',
            title: 'Jumlah Tidak Valid',
            text: 'Jumlah uang harus lebih dari 0.'
        });

        $jumlah.focus();
        return false;
    }

    return true;
}

function hitungPenyesuaian() {
    const jumlahPutih = Number($jumlah.val().replace(/,/g,''));
    let totalMerah = 0;

    selectedBonKasMerah.forEach(function (id) {
        const item = bonKasMerah.find(x => String(x.IdBonKas) === id);

        if (item) {
            totalMerah += Number(item.Jumlah);
        }
    });

    let selisih = jumlahPutih - totalMerah;
    let status = '';
    let icon = '';
    let selisihClass = '';
    let selisihBg = '';
    let selisihColor = '';

    if (selisih === 0) {
        status = 'Jumlah Sudah Sesuai';
        icon = 'success';
        selisihClass = '';
        selisihBg = '#ffffff';
        selisihColor = '#212529';
    }
    else if (selisih > 0) {
        status = 'Informasi Lebih Bayar';
        icon = 'info';
        selisihClass = 'table-success';
        selisihBg = '#ff4c5b';
        selisihColor = '#440006';
    }
    else {
        status = 'Informasi Kurang Bayar';
        icon = 'info';
        selisihClass = 'table-danger';
        selisihBg = '#00ff8c';
        selisihColor = '#003d21';
    }

    return {
        jumlahPutih,
        totalMerah,
        selisih,
        status,
        icon,
        selisihClass,
        selisihBg,
        selisihColor
    };
}

function loadBonKasMerah(){
    let tbody = '';

    bonKasMerah.forEach(function(item){
        const checked = selectedBonKasMerah.includes(String(item.IdBonKas)) ? 'checked' : '';

        tbody += `
            <tr>
                <td class="text-center">
                    <input
                        type="checkbox"
                        class="chkBonKasMerah"
                        data-id="${item.IdBonKas}"
                        data-kode="${item.KodeBonKas}"
                        data-jumlah="${item.Jumlah}"
                        data-uraian="${item.Uraian}"
                        ${checked}>
                </td>

                <td>${item.KodeBonKas}</td>

                <td>
                    ${(() => {
                        const d = new Date(item.Tanggal);
                        return String(d.getDate()).padStart(2, '0') + '-' +
                            String(d.getMonth() + 1).padStart(2, '0') + '-' +
                            d.getFullYear();
                    })()}
                </td>

                <td>
                    ${Number(item.Jumlah).toLocaleString('id-ID', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                </td>

                <td>${item.Uraian}</td>
            </tr>
        `;
    });

    $('#tblPenyesuaianBonKasMerah tbody').html(tbody);
}

function lockSubmit() {
    if (isSubmitting) {
        return false;
    }

    isSubmitting = true;

    $('#modalTambahBonKasPutih button').prop('disabled', true);
    $('body').css('cursor', 'wait');

    return true;
}

function unlockSubmit() {
    isSubmitting = false;
    $('#modalTambahBonKasPutih button').prop('disabled', false);
    $('body').css('cursor', '');
}



//#endregion


//#region addEventListener
$jumlah.on('input', function () {
    console.log('INPUT BERJALAN');
    formatJumlah();
    updateTerbilang();

    let jumlah = Number($(this).val().replace(/,/g, ''));
    $('#btnPilihBonKasMerah').prop('disabled', jumlah <= 0);

    // jika ada perubahan pada jumlah
    $('#TotalPenyesuaian').val('');
});

$form.on('submit', function () {
    $jumlah.val($jumlah.val().replace(/,/g, ''));
});

$('#formBonKasPutih')
    .find('input:not([type=file])')
    .on('keydown', pindahTab);

$(document).on('click', '#modalTambahBonKasPutih #btnSimpan', konfirmasiSimpan);

$dokumentasi.on('change', pilihDokumentasi);

$(document).on('click', '.btnHapusFile', hapusDokumentasi);

let zoom = 1;

$(document).on('click', '.preview-image', function () {
    zoom = 1;

    $('#previewImage')
        .attr('src', this.src)
        .css('transform','scale(1)');
    bootstrap.Modal.getOrCreateInstance(document.getElementById('imagePreviewModal')).show();
});


// Klik tombol kirim
$(document).on('click', '#modalTambahBonKasPutih #btn-kirim', function () {

    if (!validasiFormBonKas()) {
        return;
    }

    // ===============================
    // Tambahan ini
    // ===============================
    modeKirim = 'PUTIH';

    const kode = $('#modalTambahBonKasPutih #kodeBonKasForm').val();

    $('#modalKirim #idBonKas').val('');
    $('#modalKirim #kodeBonKas').val(kode);
    $('#modalKirim #nomorUser').val(null).trigger('change');

    const modalPutih = document.getElementById('modalTambahBonKasPutih');

    modalPutih.addEventListener('hidden.bs.modal', function () {

        bootstrap.Modal
            .getOrCreateInstance(document.getElementById('modalKirim'))
            .show();

    }, { once: true });

    bootstrap.Modal
        .getOrCreateInstance(modalPutih)
        .hide();

});


$('#modalKirim').on('shown.bs.modal', function () {
    if ($('#nomorUser').hasClass('select2-hidden-accessible')) {
        $('#nomorUser').select2('destroy');
    }

    initSelectUser();
    $('#nomorUser').select2('open');
});

$('#btnGunakanPenyesuaian').click(function () {

    const hasil = hitungPenyesuaian();
    $('#TotalPenyesuaian').val(hasil.totalMerah);

    let daftarKode = [];
    let daftarUraian = [];

    $('.chkBonKasMerah:checked').each(function () {
        daftarKode.push($(this).data('kode'));
        daftarUraian.push($(this).data('uraian'));
    });

    // untuk mencatat kode bon kas merah yang melakukan penyesuaian
    $('#listKodeBonKasMerah').empty();

    daftarKode.forEach(function(kode) {
        $('#listKodeBonKasMerah').append(
            `<input type="hidden"
                    name="KodeBonKasMerah[]"
                    value="${kode}">`
        );
    });

    $uraian.val(daftarUraian.join('\n'));

    $('#infoPenyesuaian').html(`
        <b>${selectedBonKasMerah.length}</b> Bon Kas Merah dipilih
        <br>
        <small>${daftarKode.join(', ')}</small>
        <br>
        <b>Total :</b>
        Rp ${hasil.totalMerah.toLocaleString('id-ID',{
            minimumFractionDigits:2,
            maximumFractionDigits:2
        })}
    `);

    $('#modalPenyesuaianBonKasMerah')
        .one('hidden.bs.modal', function () {

            // Tetap aktifkan modal utama
            $('body').addClass('modal-open');

            const kodeBonKasPutih = $('#modalTambahBonKasPutih #kodeBonKasForm').val();

            console.log(kodeBonKasPutih);

            Swal.fire({
                icon: hasil.icon,
                title: hasil.status,
                width: '950px',
                confirmButtonText: 'OK',

                html: `
                    <style>

                        .swal2-popup{
                            font-size:15px !important;
                        }

                        .swal-bonkas-table{
                            width:100%;
                            border-collapse:collapse;
                            table-layout:fixed;
                        }

                        .swal-bonkas-table th,
                        .swal-bonkas-table td{
                            border:1px solid #212529;
                            padding:10px;
                            vertical-align:middle;
                        }

                        .swal-bonkas-table th{
                            background:#f8f9fa;
                            font-weight:bold;
                        }

                        .swal-label{
                            width:20%;
                        }

                        .swal-value{
                            width:30%;
                            word-break:break-word;
                        }

                        .swal-money{
                            width:20%;
                        }

                        .swal-money-value{
                            width:30%;
                            text-align:right;
                            white-space:nowrap;
                        }

                        .selisih-row th,
                        .selisih-row td{
                            background:${hasil.selisihBg};
                            color:${hasil.selisihColor};
                            font-weight:bold;
                        }

                    </style>

                    <table class="swal-bonkas-table">

                        <tr>

                            <th class="swal-label">
                                Kode Bon Kas Merah
                            </th>

                            <td class="swal-value">
                                ${daftarKode.join('<br>')}
                            </td>

                            <th class="swal-money">
                                Total Bon Kas Merah
                            </th>

                            <td class="swal-money-value">
                                Rp ${hasil.totalMerah.toLocaleString('id-ID',{
                                    minimumFractionDigits:2,
                                    maximumFractionDigits:2
                                })}
                            </td>

                        </tr>

                        <tr>

                            <th class="swal-label">
                                Kode Bon Kas Putih
                            </th>

                            <td class="swal-value">
                                ${kodeBonKasPutih}
                            </td>

                            <th class="swal-money">
                                Total Bon Kas Putih
                            </th>

                            <td class="swal-money-value">
                                Rp ${hasil.jumlahPutih.toLocaleString('id-ID',{
                                    minimumFractionDigits:2,
                                    maximumFractionDigits:2
                                })}
                            </td>

                        </tr>

                        <tr class="selisih-row">

                            <th colspan="3" class="text-center">
                                Selisih
                            </th>

                            <td class="swal-money-value">
                                Rp ${Math.abs(hasil.selisih).toLocaleString('id-ID',{
                                    minimumFractionDigits:2,
                                    maximumFractionDigits:2
                                })}
                            </td>

                        </tr>

                    </table>
                `
            });

        });

    $('#modalPenyesuaianBonKasMerah').modal('hide');

});

// Klik tombol kirim
$(document).on('click', '.btn-kirim', function () {

    $('#idBonKas').val($(this).data('id'));
    $('#kodeBonKas').val($(this).data('kode'));

    $('#nomorUser').val(null).trigger('change');

});

//Proses kirim
// $('#btnProsesKirim').on('click', function () {
//     let nomorUser = $('#nomorUser').val();

//     if (!nomorUser) {
//         Swal.fire({
//             icon: 'warning',
//             title: 'Peringatan',
//             text: 'Pilih user tujuan terlebih dahulu.'
//         });
//         return;
//     }

//     let idBonKas = $('#idBonKas').val();

//     // ==========================================
//     // FORM BARU
//     // ==========================================
//     if (!idBonKas) {
//         if (!lockSubmit()) {
//             return;
//         }
//         $form.find('#formAction').val('kirim');
//         $form.find('#formMengetahui').val(nomorUser);

//         $jumlah.val($jumlah.val().replace(/,/g, ''));
//         console.log($('#formAction').val());
//         console.log($('#formMengetahui').val());
//         $form.submit();

//         return;
//     }

//     // ==========================================
//     // KIRIM DARI LIST
//     // ==========================================
//     $.ajax({
//         url: '/bon-kas/' + idBonKas,
//         type: 'POST',
//         data: {
//             _token: $('meta[name="csrf-token"]').attr('content'),
//             _method: 'PUT',
//             action: 'kirimBonKas',
//             nomorUser: nomorUser
//         },
//         success: function (res) {
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Berhasil',
//                 text: res.message
//             }).then(() => {
//                 location.reload();
//             });

//         },
//         error: function (xhr) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Gagal',
//                 text: xhr.responseJSON?.message ?? 'Terjadi kesalahan.'
//             });

//         }
//     });

// });

$(document).on('click', '.btn-acc', function () {

    let idBonKas = $(this).data('id');

    // Ambil data Bon Kas dari array
    const data = bonKas.find(x => x.IdBonKas == idBonKas);

    if (!data) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Data Bon Kas tidak ditemukan.'
        });
        return;
    }

    // ==============================
    // Fungsi ACC (dipakai sekali)
    // ==============================
    function prosesACC() {

        $.ajax({
            url: '/bon-kas/' + idBonKas,
            type: 'POST',
            data: {
                _token: $('meta[name="csrf-token"]').attr('content'),
                _method: 'PUT',
                action: 'accBonKas'
            },
            success: function (res) {

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: res.message
                }).then(() => {
                    location.reload();
                });

            },
            error: function (xhr) {

                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: xhr.responseJSON?.message ?? 'Terjadi kesalahan.'
                });

            }
        });

    }

    // =====================================
    // Ada Penyesuaian
    // =====================================
    if (Number(data.TotalPenyesuaian) > 0) {

        const jumlah = Number(data.Jumlah);
        const totalMerah = Number(data.TotalPenyesuaian);
        const selisih = jumlah - totalMerah;

        let title = '';
        let icon = '';
        let selisihClass = '';

        if (selisih === 0) {
            title = 'Jumlah Sudah Sesuai';
            icon = 'success';
        }
        else if (selisih > 0) {
            title = 'Informasi Lebih Bayar';
            icon = 'info';
            selisihClass = 'table-success';
        }
        else {
            title = 'Informasi Kurang Bayar';
            icon = 'info';
            selisihClass = 'table-danger';
        }

        Swal.fire({
            icon: icon,
            title: title,
            html: `
                <table class="table table-bordered text-start mb-3">
                    <tr>
                        <th style="width:45%">
                            Total Bon Kas Merah
                        </th>

                        <td>
                            Rp ${totalMerah.toLocaleString('id-ID',{
                                minimumFractionDigits:2,
                                maximumFractionDigits:2
                            })}
                        </td>
                    </tr>

                    <tr>
                        <th>Total Bon Kas Putih</th>

                        <td>
                            Rp ${jumlah.toLocaleString('id-ID',{
                                minimumFractionDigits:2,
                                maximumFractionDigits:2
                            })}
                        </td>
                    </tr>

                    <tr>
                        <th>Selisih</th>

                        <td class="${selisihClass} fw-bold">
                            Rp ${Math.abs(selisih).toLocaleString('id-ID',{
                                minimumFractionDigits:2,
                                maximumFractionDigits:2
                            })}
                        </td>
                    </tr>

                </table>

                <div class="fw-bold mt-2">
                    ACC Bon Kas?
                </div>
            `,

            showCancelButton: true,
            confirmButtonText: 'Ya, ACC',
            cancelButtonText: 'Batal',
            reverseButtons: true

        }).then((result) => {
            if (!result.isConfirmed)
                return;
            prosesACC();
        });
    }

    // =====================================
    // Tidak Ada Penyesuaian
    // =====================================
    else {
        Swal.fire({
            title: 'ACC Bon Kas?',
            text: 'Data yang sudah di-ACC tidak dapat diubah.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, ACC',
            cancelButtonText: 'Batal',
            reverseButtons: true

        }).then((result) => {
            if (!result.isConfirmed)
                return;
            prosesACC();
        });
    }
});

$(document).on('click', '.btn-cancel', function () {
    let idBonKas = $(this).data('id');

    Swal.fire({
        title: 'Batalkan Pengiriman?',
        text: 'Bon Kas akan dikembalikan ke status awal.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Batalkan',
        cancelButtonText: 'Tidak',
        reverseButtons: true
    }).then((result) => {

        if (!result.isConfirmed) return;

        $.ajax({
            url: '/bon-kas/' + idBonKas,
            type: 'POST',
            data: {
                _token: $('meta[name="csrf-token"]').attr('content'),
                _method: 'PUT',
                action: 'cancelBonKas'
            },
            success: function (res) {

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: res.message
                }).then(() => {
                    location.reload();
                });

            },
            error: function (xhr) {

                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: xhr.responseJSON?.message ?? 'Terjadi kesalahan.'
                });
            }
        });
    });
});

// $(document).on('click', '.btn-print', function () {
//     let id = $(this).data('id');
//     let data = bonKas.find(x => x.IdBonKas == id);

//     if (!data) return;

//     let tgl = new Date(data.Tanggal);

//     $('#printJenisBonKas').text(
//         data.JenisBonKas === 'P'
//             ? 'BON KAS PUTIH'
//             : 'BON KAS MERAH'
//     );

//     $('#printTanggal').text(
//         String(tgl.getDate()).padStart(2, '0') + '-' +
//         String(tgl.getMonth() + 1).padStart(2, '0') + '-' +
//         tgl.getFullYear()
//     );

//     $('#printJumlah').text(Number(data.Jumlah).toLocaleString('id-ID', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
//     $('#printTerbilang').text(penyebut(Number(data.Jumlah)).trim() + " Rupiah");
//     $('#printUraian').text(data.Uraian ?? '');
//     $('#printPenerima').text(data.NamaPenerima ?? '');
//     $('#printMengetahui').text(data.NamaMengetahui ?? '');
//     $('#printKasir').text(data.NamaKasir ?? '');
//     $('#printNoPO').text(data.NoPO ? data.NoPO : '-');
//     const section = $('#printDokumentasiSection');
//     const container = $('#printDokumentasi');
//     container.empty();

//     if (data.TtdPenerima) {
//         $('#ttdPenerima')
//             .attr('src', 'data:image/png;base64,' + data.TtdPenerima)
//             .show();
//     } else {
//         $('#ttdPenerima').hide();
//     }

//     if (parseInt(data.Status) >= 2) {
//         $('#printMengetahui').text(data.NamaMengetahui ?? '');

//         if (data.TtdMengetahui) {
//             $('#ttdMengetahui')
//                 .attr('src', 'data:image/png;base64,' + data.TtdMengetahui)
//                 .show();
//         } else {
//             $('#ttdMengetahui').hide();
//         }
//     } else {
//         $('#printMengetahui').text('');
//         $('#ttdMengetahui').hide();

//     }

//     if (data.TtdKasir) {
//         $('#ttdKasir')
//             .attr('src', 'data:image/png;base64,' + data.TtdKasir)
//             .show();
//     } else {
//         $('#ttdKasir').hide();
//     }

//     let jumlahGambar = 0;
//     if (data.Dokumentasi) {
//         const files = data.Dokumentasi.match(/data:[^,]+;base64,[^,]+/g);

//         if (files) {
//             files.forEach(file => {
//                 if (file.startsWith('data:image/')) {
//                     container.append(`<img src="${file}">`);
//                     jumlahGambar++;
//                 }
//             });
//         }
//     }

//     // Tampilkan hanya jika ada gambar
//     section.toggle(jumlahGambar > 0);

//     $('#printArea').show();

//     setTimeout(function () {
//         console.log(data);
//         window.print();

//         $('#printArea').hide();

//     }, 100);
// });

$(document).on('click', '.btn-download', function () {
    let id = $(this).data('id');

    let form = $('<form>', {
        action: '/bon-kas/' + id,
        method: 'POST'
    });

    form.append(`
        <input type="hidden" name="_token" value="${$('meta[name="csrf-token"]').attr('content')}">
        <input type="hidden" name="_method" value="PUT">
        <input type="hidden" name="action" value="downloadDokumentasi">
    `);

    $('body').append(form);

    form.submit();
});

$(document).on('click', '.btn-kasir', function () {
    let idBonKas = $(this).data('id');

    Swal.fire({
        title: 'ACC Kasir?',
        text: 'Kasir akan menyetujui Bon Kas ini.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, ACC',
        cancelButtonText: 'Batal',
        reverseButtons: true
    }).then((result) => {

        if (!result.isConfirmed) return;

        $.ajax({
            url: '/bon-kas/' + idBonKas,
            type: 'POST',
            data: {
                _token: $('meta[name="csrf-token"]').attr('content'),
                _method: 'PUT',
                action: 'accKasir'
            },
            success: function (res) {

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: res.message
                }).then(() => {
                    location.reload();
                });

            },
            error: function (xhr) {

                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: xhr.responseJSON?.message ?? 'Terjadi kesalahan.'
                });
            }
        });
    });
});

$(document).on('click', '.btn-delete', function () {
    const idBonKas = $(this).data('id');

    Swal.fire({
        title: 'Hapus Bon Kas?',
        text: 'Data yang dihapus tidak dapat dikembalikan.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Hapus',
        cancelButtonText: 'Batal',
        confirmButtonColor: '#dc3545',
        reverseButtons: true
    }).then((result) => {
        if (!result.isConfirmed) {
            return;
        }

        $.ajax({
            url: '/bon-kas/' + idBonKas,
            type: 'POST',
            data: {
                _token: $('meta[name="csrf-token"]').attr('content'),
                _method: 'PUT',
                action: 'deleteBonKas'
            },
            success: function (res) {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: res.message
                }).then(() => {
                    location.reload();
                });

            },
            error: function (xhr) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: xhr.responseJSON?.message ?? 'Terjadi kesalahan.'
                });
            }
        });
    });
});

// $(document).on('click', '.link-bon-kas', function (e) {
//     e.preventDefault();

//     const id = $(this).data('id');
//     const data = bonKas.find(x => x.IdBonKas == id);

//     if (!data) {
//         console.log('Data Bon Kas tidak ditemukan');
//         return;
//     }

//     const tgl = new Date(data.Tanggal);

//     // ===========================
//     // BUKA MODAL VIEW
//     // ===========================

//     const modal = $('#modalViewBonKasPutih');

//     modal.modal('show');

//     // ===========================
//     // HEADER
//     // ===========================

//     modal.find('#kodeBonKasForm').val(data.KodeBonKas);

//     modal.find('#tanggal').val(
//         tgl.getFullYear() + '-' +
//         String(tgl.getMonth() + 1).padStart(2, '0') + '-' +
//         String(tgl.getDate()).padStart(2, '0')
//     );

//     // ===========================
//     // DATA
//     // ===========================

//     modal.find('#jumlah').val(
//         Number(data.Jumlah).toLocaleString('id-ID', {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2
//         })
//     );

//     modal.find('#terbilang').text(
//         '(' + penyebut(Number(data.Jumlah)).trim() + ' Rupiah)'
//     );

//     modal.find('#noPO').val(data.NoPO ?? '');
//     modal.find('#uraian').val(data.Uraian ?? '');

//     // ===========================
//     // PENERIMA
//     // ===========================

//     modal.find('#namaPenerima').text(
//         data.NamaPenerima ?? 'Belum Ditentukan'
//     );

//     if (data.TtdPenerima) {
//         modal.find('#ttdPenerimaModal')
//             .attr('src', 'data:image/png;base64,' + data.TtdPenerima)
//             .show();
//     } else {
//         modal.find('#ttdPenerimaModal').hide();
//     }

//     // ===========================
//     // MENGETAHUI
//     // ===========================

//     if (parseInt(data.Status) >= 1) {
//         modal.find('#namaMengetahui').text(
//             data.NamaMengetahui ?? ''
//         );
//     } else {
//         modal.find('#namaMengetahui').text('');
//     }

//     if (parseInt(data.Status) >= 2 && data.TtdMengetahui) {
//         modal.find('#ttdMengetahuiModal')
//             .attr('src', 'data:image/png;base64,' + data.TtdMengetahui)
//             .show();
//     } else {
//         modal.find('#ttdMengetahuiModal').hide();
//     }

//     // ===========================
//     // KASIR
//     // ===========================

//     modal.find('#namaKasir').text(
//         data.NamaKasir ?? 'Belum Ditentukan'
//     );

//     if (data.TtdKasir) {
//         modal.find('#ttdKasirModal')
//             .attr('src', 'data:image/png;base64,' + data.TtdKasir)
//             .show();
//     } else {
//         modal.find('#ttdKasirModal').hide();
//     }

//     // ===========================
//     // DOKUMENTASI
//     // ===========================
//     const container = modal.find('#listDokumentasi');
//     container.empty();

//     if (!data.Dokumentasi || data.Dokumentasi.trim() === '') {
//         container.html(`
//             <div class="col-12 text-center text-muted">
//                 Tidak ada dokumentasi.
//             </div>
//         `);

//     } else {
//         const files = data.Dokumentasi.match(/data:[^,]+;base64,[^,]+/g);

//         if (!files || files.length === 0) {
//             container.html(`
//                 <div class="col-12 text-center text-muted">
//                     Tidak ada dokumentasi.
//                 </div>
//             `);

//         } else {
//             files.forEach(function(file,index){
//                 if(file.startsWith('data:image/')){
//                     container.append(`
//                         <div class="col-md-3 mb-3">

//                             <img
//                                 src="${file}"
//                                 class="img-fluid rounded border preview-image"
//                                 style="
//                                     width:100%;
//                                     height:180px;
//                                     object-fit:cover;
//                                     cursor:zoom-in;
//                                 ">
//                         </div>
//                     `);
//                 }

//                 else if(file.startsWith('data:application/pdf')){
//                     container.append(`
//                         <div class="col-md-4 mb-3">
//                             <div class="pdf-card border rounded shadow-sm p-3 d-flex align-items-center"
//                                 data-src="${file}">

//                                 <div class="me-3">
//                                     <div style="
//                                         width:54px;
//                                         height:54px;
//                                         background:#dc3545;
//                                         color:#fff;
//                                         border-radius:8px;
//                                         display:flex;
//                                         justify-content:center;
//                                         align-items:center;
//                                         font-weight:bold;
//                                         font-size:18px;">
//                                         PDF
//                                     </div>

//                                 </div>

//                                 <div class="flex-grow-1 overflow-hidden">
//                                     <div class="fw-bold text-truncate" style="padding-left: 10px">
//                                         Dokumen PDF
//                                     </div>
//                                     <small class="text-muted" style="padding-left: 10px">
//                                         Klik untuk membuka preview
//                                     </small>
//                                 </div>
//                             </div>
//                         </div>
//                     `);
//                 }
//             });
//         }
//     }
// });

$('#previewImage').on('wheel', function (e) {
    e.preventDefault();
    if (e.originalEvent.deltaY < 0)
        zoom += 0.2;
    else
        zoom -= 0.2;
    zoom = Math.max(1, Math.min(zoom, 6));
    $(this).css(
        'transform',
        `scale(${zoom})`
    );
});

$('#previewImage').on('dblclick', function () {
    zoom = zoom == 1 ? 2 : 1;
    $(this).css(
        'transform',
        `scale(${zoom})`
    );
});

$('#imagePreviewModal').on('hidden.bs.modal', function () {
    $('body').removeClass('modal-open');
    $('body').css({
        overflow:'',
        paddingRight:''
    });

    if($('#modalViewBonKasPutih').hasClass('show')){
        $('body').addClass('modal-open');
    }
});

// $(document).on('click', '.pdf-card', function () {
//     const pdf = $(this).data('src');
//     const win = window.open();

//     console.log(pdf.substring(0,100));

//     win.document.write(`
//         <!doctype html>
//         <html>
//         <head>
//             <title>Preview PDF</title>
//             <style>
//                 html,body{
//                     margin:0;
//                     width:100%;
//                     height:100%;
//                     overflow:hidden;
//                 }
//                 embed{
//                     width:100%;
//                     height:100vh;
//                     border:none;
//                 }
//             </style>
//         </head>
//         <body>
//             <embed
//                 src="${pdf}"
//                 type="application/pdf">
//         </body>
//         </html>
//     `);
// });

$('#pdfPreviewModal').on('hidden.bs.modal', function(){
    $('#pdfFrame').attr('src','');
});

$('#imagePreviewModal').on('click', function(e){
    if(e.target === this){
        bootstrap.Modal
            .getInstance(this)
            .hide();
    }
});

$('#btnPilihBonKasMerah').on('click', function () {
    const jumlahPutih = Number($jumlah.val().replace(/,/g,''));

    if (jumlahPutih <= 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Isi jumlah uang terlebih dahulu.'
        });
        return;
    }

    $('#txtJumlahPutih').val(
        jumlahPutih.toLocaleString('id-ID', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    );

    $('#txtTotalMerah').val('0,00');
    $('#txtSelisih').val(
        jumlahPutih.toLocaleString('id-ID', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    );

    loadBonKasMerah();

    const hasil = hitungPenyesuaian();

    $('#txtTotalMerah').val(
        hasil.totalMerah.toLocaleString('id-ID',{
            minimumFractionDigits:2,
            maximumFractionDigits:2
        })
    );

    $('#txtSelisih').val(
        Math.abs(hasil.selisih).toLocaleString('id-ID',{
            minimumFractionDigits:2,
            maximumFractionDigits:2
        })
    );

    $('#modalPenyesuaianBonKasMerah').modal('show');

});

$(document).on('change', '.chkBonKasMerah', function () {
    selectedBonKasMerah = [];

    $('.chkBonKasMerah:checked').each(function () {
        selectedBonKasMerah.push(
            String($(this).data('id'))
        );
    });

    let hasil = hitungPenyesuaian();

    $('#txtTotalMerah').val(
        hasil.totalMerah.toLocaleString('id-ID',{
            minimumFractionDigits:2,
            maximumFractionDigits:2
        })
    );

    $('#txtSelisih').val(
        Math.abs(hasil.selisih).toLocaleString('id-ID',{
            minimumFractionDigits:2,
            maximumFractionDigits:2
        })
    );
});

console.log('INIT REGISTERED');


window.initBonKasPutih = function () {
    // reset form
    $modal = $('#modalTambahBonKasPutih');
    $form = $modal.find('#formBonKasPutih');
    $jumlah = $modal.find('#jumlah');
    $terbilang = $modal.find('#terbilang');
    $uraian = $modal.find('#uraian');
    $dokumentasi = $modal.find('#dokumentasi');
    $listDokumentasi = $modal.find('#listDokumentasi');
    $totalSize = $modal.find('#totalSize');
    $btnKirim = $modal.find('#btn-kirim');

    $form[0].reset();

    // reset terbilang
    updateTerbilang();

    // reset file upload
    dataTransfer.items.clear();
    $dokumentasi[0].files = dataTransfer.files;
    $listDokumentasi.empty();
    $totalSize.text('0 KB');

    // reset penyesuaian
    selectedBonKasMerah = [];
    $('#TotalPenyesuaian').val('');
    $('#infoPenyesuaian').html('');
    $('#btnPilihBonKasMerah').prop('disabled', true);

    // unlock submit
    unlockSubmit();

    console.log('Init Bon Kas Putih');
}

//#endregion
