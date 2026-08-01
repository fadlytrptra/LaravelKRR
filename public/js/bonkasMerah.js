// bonkas merah

//#region Variable
let $modalMerah = $('#modalTambahBonKasMerah');
let $formMerah = $modalMerah.find('#formBonKasMerah');
let $kodeBonKasMerah = $modalMerah.find('#kodeBonKasForm');
let $tanggalMerah    = $modalMerah.find('#tanggal');
let $jumlahMerah     = $modalMerah.find('#jumlah');
let $terbilangMerah  = $modalMerah.find('#terbilang');
let $uraianMerah     = $modalMerah.find('#uraian');
let $noPOMerah       = $modalMerah.find('#noPO');
let $dokumentasiMerah      = $modalMerah.find('#dokumentasi');
let $listDokumentasiMerah  = $modalMerah.find('#listDokumentasi');
let $totalSizeMerah        = $modalMerah.find('#totalSize');
let $btnSimpanMerah = $modalMerah.find('#btnSimpan');
let $btnKirimMerah  = $modalMerah.find('#btn-kirim');

const dataTransferMerah = new DataTransfer();

console.log($('#jumlah').length);
console.log($('#terbilang').length);
console.log($('#btn-kirim').length);
console.log($('#btnSimpan').length);


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

function initSelectUserMerah() {
    $('#nomorUser').select2({
        dropdownParent: $('#modalKirim'),
        width: '100%',
        placeholder: '-- Pilih User --',
        allowClear: true
    });
    console.log($('#nomorUser').data('select2'));
}

function formatJumlahMerah() {
    let angka = $jumlahMerah.val().replace(/[^0-9]/g, '');

    if (angka === '') {
        $jumlahMerah.val('');
        return;
    }
    $jumlahMerah.val(Number(angka).toLocaleString('en-US'));
}


function pindahTabMerah(e) {
    if (e.key !== 'Enter')
        return;

    e.preventDefault();

    const currentTab = parseInt($(this).attr('tabindex')) || 0;
    const next = $('[tabindex="' + (currentTab + 1) + '"]');

    if (next.length) {
        next.focus();
    }
}

function konfirmasiSimpanMerah() {
    if (!validasiFormBonKasMerah()) {
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

            // Mode Save
            $formMerah.find('[name="action"]').val('simpan');
            $formMerah.find('[name="Mengetahui"]').val('');

            // Hilangkan format koma
            $jumlahMerah.val($jumlahMerah.val().replace(/,/g, ''));

            // Submit native
            $formMerah.submit();
        }
    });
}

function pilihDokumentasiMerah() {
    Array.from(this.files).forEach(file => {
        const sudahAda = Array.from(dataTransferMerah.files).some(f =>
            f.name === file.name &&
            f.size === file.size &&
            f.lastModified === file.lastModified
        );

        if (!sudahAda) {
            dataTransferMerah.items.add(file);
        }
    });

    this.files = dataTransferMerah.files;
    renderDokumentasiMerah();
}

function renderDokumentasiMerah() {

    let html = '';
    let total = 0;

    Array.from(dataTransferMerah.files).forEach(function (file, index) {

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

    $listDokumentasiMerah.html(html);
    $totalSizeMerah.text((total / 1024).toFixed(1) + ' KB');

    if (total > 5 * 1024 * 1024) {

        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Total ukuran file melebihi 5 MB.'
        });

    }

}

function hapusDokumentasiMerah() {
    let index = $(this).data('index');
    let files = Array.from(dataTransferMerah.files);

    dataTransferMerah.items.clear();

    files.forEach(function (file, i) {
        if (i !== index) {
            dataTransferMerah.items.add(file);
        }
    });

    $dokumentasiMerah[0].files = dataTransferMerah.files;

    renderDokumentasiMerah();
}

function penyebutMerah(nilai) {
    nilai = Math.floor(Math.abs(nilai));

    const huruf = [
        "", "Satu", "Dua", "Tiga", "Empat",
        "Lima", "Enam", "Tujuh", "Delapan",
        "Sembilan", "Sepuluh", "Sebelas"
    ];

    if (nilai < 12) {
        return huruf[nilai];
    } else if (nilai < 20) {
        return penyebutMerah(nilai - 10) + " Belas";
    } else if (nilai < 100) {
        return penyebutMerah(Math.floor(nilai / 10)) + " Puluh" +
            (nilai % 10 ? " " + penyebutMerah(nilai % 10) : "");
    } else if (nilai < 200) {
        return "Seratus" +
            (nilai - 100 ? " " + penyebutMerah(nilai - 100) : "");
    } else if (nilai < 1000) {
        return penyebutMerah(Math.floor(nilai / 100)) + " Ratus" +
            (nilai % 100 ? " " + penyebutMerah(nilai % 100) : "");
    } else if (nilai < 2000) {
        return "Seribu" +
            (nilai - 1000 ? " " + penyebutMerah(nilai - 1000) : "");
    } else if (nilai < 1000000) {
        return penyebutMerah(Math.floor(nilai / 1000)) + " Ribu" +
            (nilai % 1000 ? " " + penyebutMerah(nilai % 1000) : "");
    } else if (nilai < 1000000000) {
        return penyebutMerah(Math.floor(nilai / 1000000)) + " Juta" +
            (nilai % 1000000 ? " " + penyebutMerah(nilai % 1000000) : "");
    } else if (nilai < 1000000000000) {
        return penyebutMerah(Math.floor(nilai / 1000000000)) + " Miliar" +
            (nilai % 1000000000 ? " " + penyebutMerah(nilai % 1000000000) : "");
    } else if (nilai < 1000000000000000) {
        return penyebutMerah(Math.floor(nilai / 1000000000000)) + " Triliun" +
            (nilai % 1000000000000 ? " " + penyebutMerah(nilai % 1000000000000) : "");
    }

    return "";
}

function updateTerbilangMerah() {
    console.log('updateTerbilang');
    let angka = $jumlahMerah.val().replace(/,/g, '');

    if (angka === '' || Number(angka) === 0) {
        $terbilangMerah.text('(....................................................................................................................)');
        return;
    }

    $terbilangMerah.text(`(${penyebutMerah(Number(angka)).trim()} Rupiah)`);
}

function validasiFormBonKasMerah() {

    let jumlah = $jumlahMerah.val().replace(/,/g, '').trim();
    let uraian = $uraianMerah.val().trim();

    if (jumlah === '' || uraian === '') {

        Swal.fire({
            icon: 'warning',
            title: 'Data Belum Lengkap',
            text: 'Jumlah uang dan uraian wajib diisi sebelum disimpan atau dikirim.'
        });

        if (jumlah === '') {
            $jumlahMerah.focus();
        } else {
            $uraianMerah.focus();
        }

        return false;
    }

    if (Number(jumlah) <= 0) {

        Swal.fire({
            icon: 'warning',
            title: 'Jumlah Tidak Valid',
            text: 'Jumlah uang harus lebih dari 0.'
        });

        $jumlahMerah.focus();
        return false;
    }

    return true;
}


//#endregion


//#region addEventListener
$(document).on('input', '#modalTambahBonKasMerah #jumlah', function () {
    console.log('INPUT MERAH JALAN');
    formatJumlahMerah();
    updateTerbilangMerah();
});

$formMerah.on('submit', function () {
    $jumlahMerah.val($jumlahMerah.val().replace(/,/g, ''));
});

$('input, textarea').on('keydown', pindahTabMerah);

$(document).on('click', '#modalTambahBonKasMerah #btnSimpan', konfirmasiSimpanMerah);

$dokumentasiMerah.on('change', pilihDokumentasiMerah);

$(document).on('click', '.btnHapusFile', hapusDokumentasiMerah);

let zoomMerah = 1;

$(document).on('click', '.preview-image', function () {
    zoomMerah = 1;
    $('#previewImage')
        .attr('src', $(this).attr('src'))
        .css('transform','scale(1)');

    bootstrap.Modal
        .getOrCreateInstance(
            document.getElementById('imagePreviewModal')
        )
        .show();
});


// Klik tombol kirim
$btnKirimMerah.on('click', function () {

    if (!validasiFormBonKasMerah()) {
        return;
    }

    // Tambahkan ini
    modeKirim = 'MERAH';

    $('#idBonKas').val('');
    $('#kodeBonKas').val($kodeBonKasMerah.val());
    $('#nomorUser').val(null).trigger('change');

    const modalBonKas =
        bootstrap.Modal.getInstance(
            document.getElementById('modalTambahBonKasMerah')
        );

    document
        .getElementById('modalTambahBonKasMerah')
        .addEventListener('hidden.bs.modal', function () {

            bootstrap.Modal
                .getOrCreateInstance(
                    document.getElementById('modalKirim')
                )
                .show();

        }, { once: true });

    modalBonKas.hide();
});


$('#modalKirim').on('shown.bs.modal', function () {
    if ($('#nomorUser').hasClass('select2-hidden-accessible')) {
        $('#nomorUser').select2('destroy');
    }

    initSelectUserMerah();
    $('#nomorUser').select2('open');
});

// Klik tombol kirim
// $(document).on('click', '.btn-kirim', function () {

//     $('#idBonKas').val($(this).data('id'));
//     $('#kodeBonKas').val($(this).data('kode'));

//     $('#nomorUser').val(null).trigger('change');

// });

// Proses kirim
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


//         $formMerah.find('[name="action"]').val('kirim');
//         $formMerah.find('[name="Mengetahui"]').val(nomorUser);

//         $jumlahMerah.val($jumlahMerah.val().replace(/,/g, ''));

//         $formMerah.submit();

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

    Swal.fire({
        title: 'ACC Bon Kas?',
        text: 'Data yang sudah di-ACC tidak dapat diubah.',
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
    });
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
//     $('#printTerbilang').text(penyebutMerah(Number(data.Jumlah)).trim() + " Rupiah");
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

//     const modal = $('#modalViewBonKasMerah');

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
//         '(' + penyebutMerah(Number(data.Jumlah)).trim() + ' Rupiah)'
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
//                                     cursor:zoomMerah-in;
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
        zoomMerah += 0.2;
    else
        zoomMerah -= 0.2;
    zoomMerah = Math.max(1, Math.min(zoomMerah, 6));
    $(this).css(
        'transform',
        `scale(${zoomMerah})`
    );
});

$('#previewImage').on('dblclick', function () {
    zoomMerah = zoomMerah == 1 ? 2 : 1;
    $(this).css(
        'transform',
        `scale(${zoomMerah})`
    );
});

$('#imagePreviewModal').on('hidden.bs.modal', function () {
    $('body').removeClass('modal-open');
    $('body').css({
        overflow:'',
        paddingRight:''
    });

    if($('#modalViewBonKasMerah').hasClass('show')){
        $('body').addClass('modal-open');
    }
});

// $(document).on('click', '.pdf-card', function () {
//     const pdf = $(this).data('src');
//     const win = window.open();

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

if ($jumlahMerah.length) {
    updateTerbilangMerah();
}
//#endregion
