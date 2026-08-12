//#region Variable
let mode = 0;
let btnCetak = $('#btnCetak');
let btnBatalSPPB = $('#btnBatalSPPB');
let btnHapusSPPB = $('#btnHapusSPPB');
let btnKirimSupplier = $('#btnKirimSupplier');
let btnIsi = $('#btnIsi');
let btnLihat = $('#btnLihat');
let btnProses = $('#btnProses');
let btnBatal = $('#btnBatal');
let formSPPB = $('#formSPPB');
let txtKdDiv = $('#KdDiv');
let txtNamaDivisi = $('#NamaDivisi');
let txtNoSPPB = $('#NoSPPB');
let cmbJenisPembelian = $('#JenisPembelian');
let btnCariDivisi = $('#btnCariDivisi');
let btnLoadSPPB = $('#btnLoadSPPB');
let cmbSupplier = $('#supplier');
let cmbPaymentTerm = $('#paymentTerm');
let tableSPPB = null;
let sppbData = [];

let btnHarga = $('#btnHarga');
let tableHistory = null;

//#endregion



//#region Function

function init() {
    setModeAwal();
}


function loadData() {
    $.ajax({
        url: '/Kencana/SppbPembelian/getData',
        type: 'GET',
        data: {
            Mode: mode,
            KdDiv: txtKdDiv.val(),
            NoSPPB: txtNoSPPB.val()
        },

        beforeSend: function () {
            $('body').css('cursor', 'wait');
        },

        success: function (response) {
            $('body').css('cursor', 'default');

            console.log(response);

            if (response.length > 0) {
                console.log(response[0]);
            }

            sppbData = response;

            loadTable(response);

            // Hitung total setelah data masuk ke DataTable
            hitungHarga();
        },

        error: function () {
            $('body').css('cursor', 'default');

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal mengambil data.'
            });
        }
    });
}

function loadTable(data) {
    if ($.fn.DataTable.isDataTable('#tableSPPB')) {
        tableSPPB.destroy();
    }

    $('#tableSPPB tbody').empty();

    tableSPPB = $('#tableSPPB').DataTable({
        destroy: true,
        processing: true,
        responsive: true,
        autoWidth: false,
        searching: true,
        paging: true,
        info: true,
        ordering: true,
        pageLength: 10,
        data: data,
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ],
        columns: [
            // Checkbox
            {
                data: null,
                visible: mode != 2,
                orderable: false,
                searchable: false,
                className: 'text-center',
                width: '40px',
                render: function (data, type, row) {
                    return `
                        <input
                            type="checkbox"
                            class="form-check-input check-item"
                            value="${row.No_trans}"
                            ${row.selected ? 'checked' : ''}>
                    `;
                }
            },
            {
                data: 'Tgl_order',
                render: function (data) {

                    if (!data)
                        return '';

                    return moment(data).format('DD/MM/YYYY');

                }
            },
            {
                data: 'Qty',
                className: 'text-end',
                render: function (data, type) {

                    if (data === null || data === undefined || data === '') {
                        return '0,00';
                    }

                    let qty = parseFloat(data) || 0;

                    if (type === 'display' || type === 'filter') {
                        return qty.toLocaleString('id-ID', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });
                    }

                    return qty;
                }
            },
            {
                data: 'Pemesan',
                defaultContent: '-',
                render: function (data) {
                    return data ? data.trim() : '-';
                }
            },
            {
                data: 'NM_MSN'
            },
            {
                data: 'NM_GOL'
            },
            {
                data: 'No_trans'
            },
            {
                data: 'Tgl_dtg',
                render: function (data) {
                    if (!data)
                        return '-';
                    return moment(data).format('DD/MM/YYYY');
                }
            },
            {
                data: 'Batal_acc',
                defaultContent: '-'
            },
            {
                data: 'Direktur'
            }

        ]
    });
}

function setModeAwal() {
    mode = 0;

    formSPPB.find('input, select, textarea, button').not('#btnCetak,#btnIsi').prop('disabled', true);

    btnCetak.prop('disabled', true);
    btnBatalSPPB.prop('disabled', false);
    btnHapusSPPB.prop('disabled', false);
    btnIsi.prop('disabled', false);

    btnLihat.prop('disabled', false);
    btnProses.prop('disabled', true);
    btnBatal.prop('disabled', true);
    clearForm();

    $('#checkAll').prop('checked', false);

}

function setModeIsi() {
    mode = 1;

    formSPPB.find('input,select,textarea,button').prop('disabled', false);
    $('#HargaSatuan').prop('disabled', false).prop('readonly', false);
    $('#Disc').prop('disabled', false).prop('readonly', false);
    $('#PPN').prop('disabled', false).prop('readonly', false);

    btnCetak.prop('disabled', true);
    btnBatalSPPB.prop('disabled', true);
    btnHapusSPPB.prop('disabled', true);
    btnIsi.prop('disabled', true);
    btnLihat.prop('disabled', true);
    btnProses.prop('disabled', false);
    btnBatal.prop('disabled', false);
    txtNoSPPB.prop('readonly', true);
    btnLoadSPPB.prop('disabled', true);

    clearForm();
    loadJenisPembelian();
    loadSupplier();
    loadPaymentTerm();
    loadPPN();
}

function setModeLihat() {

    mode = 2;

    clearForm();

    loadJenisPembelian();
    loadSupplier();
    loadPaymentTerm();
    loadPPN();

    // Aktifkan form terlebih dahulu
    formSPPB
        .find('input,select,textarea,button')
        .prop('disabled', false);

    // =====================================
    // TOMBOL UTAMA
    // =====================================

    btnIsi.prop('disabled', true);
    btnCetak.prop('disabled', false);
    btnHapusSPPB.prop('disabled', true);
    btnBatalSPPB.prop('disabled', true);
    btnLihat.prop('disabled', true);

    btnProses.prop('disabled', true);
    btnBatal.prop('disabled', false);

    // =====================================
    // NO SPPB
    // =====================================

    txtNoSPPB.prop('readonly', false);
    txtNoSPPB.prop('disabled', false);

    btnLoadSPPB.prop('disabled', false);

    // =====================================
    // FIELD READ ONLY
    // =====================================

    $('#TanggalSPPB').prop('disabled', true);
    $('#TanggalDatang').prop('disabled', true);
    $('#JenisPembelian').prop('disabled', true);
    $('#AlasanHapus').prop('disabled', true);

    // =====================================
    // HARGA - READ ONLY
    // =====================================

    $('#HargaSatuan')
        .prop('disabled', true)
        .prop('readonly', true);

    $('#Disc')
        .prop('disabled', true)
        .prop('readonly', true);

    $('#PPN')
        .prop('disabled', true)
        .prop('readonly', true);

    $('#SubTotalHarga')
        .prop('disabled', true)
        .prop('readonly', true);

    $('#TotalHarga')
        .prop('disabled', true)
        .prop('readonly', true);

    $('#supplier')
        .prop('disabled', true)
        .trigger('change');

    $('#paymentTerm')
        .prop('disabled', true)
        .trigger('change');

    $('#PPN')
        .prop('disabled', true)
        .trigger('change');

    pilihDivisi();
}

function setModeHapus() {
    mode = 3;
    clearForm();
    loadJenisPembelian();

}

function setModeBatalSPPB() {
    mode = 4;
    clearForm();
    loadJenisPembelian();

}

function loadJenisPembelian() {
    $.ajax({
        url: '/Kencana/SppbPembelian/getJenisPembelian',
        type: 'GET',
        success: function (response) {
            console.log(response);
            cmbJenisPembelian.empty();
            cmbJenisPembelian.append(
                '<option value="">Pilih Jenis Pembelian</option>'
            );

            $.each(response, function (i, item) {
                console.log(item.NO_JNS, item.KET);
                cmbJenisPembelian.append(
                    `<option value="${item.NO_JNS}">
                        ${item.KET}
                    </option>`
                );
            });
        }
    });
}

function prosesIsi() {
    setModeIsi();
    loadJenisPembelian();
}

function fillForm(data) {
    $('#NoTransaksi').val(data.No_trans);
    $('#KdBarang').val(data.Kd_brg);
    $('#NamaBarang').val(data.NAMA_BRG);
    $('#KetBarang').val(data.KET);
    $('#TanggalSPPB').val(formatDate(data.Tgl_sppb));
    $('#JenisPembelian').val(data.Jenis);
    $('#TanggalDatang').val(formatDate(data.Tgl_dtg));
    $('#KategoriUtama').val(data.nama);
    $('#Kategori').val(data.nama_kategori);
    $('#SubKategori').val(data.nama_sub_kategori);
    $('#Satuan').val(data.Nama_satuan);
    $('#KetPembelian').val(data.keterangan);
    $('#AlasanHapus').val(data.Batal_sppb);
     // Supplier
    if (data.Supplier) {
        $('#supplier')
            .val(data.Supplier)
            .trigger('change');
    } else {
        $('#supplier')
            .val(null)
            .trigger('change');
    }
    // Payment Term
    if (data.Pay_Term) {
        $('#paymentTerm')
            .val(data.Pay_Term)
            .trigger('change');
    } else {
        $('#paymentTerm')
            .val(null)
            .trigger('change');
    }

    console.log(data);
    console.log("Jenis :", data.Jenis);
    console.log("JenisBeli :", data.JenisBeli);
}

function formatDate(date) {
    if (date == null)
        return '';

    let d = new Date(date);
    let year = d.getFullYear();
    let month = ('0' + (d.getMonth() + 1)).slice(-2);
    let day = ('0' + d.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
}

function pilihDivisi() {
    $.ajax({
        url: '/Kencana/SppbPembelian/getDivisi',
        type: 'GET',
        success: function (response) {
            if (response.length == 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Peringatan',
                    text: 'Divisi tidak ditemukan.'
                });

                return;
            }

            let html = '<select id="swalDivisi" class="form-select">';

            $.each(response, function (i, item) {
                html += `
                    <option value="${item.Kd_div}">
                        ${item.Kd_div} - ${item.NM_DIV}
                    </option>
                `;
            });

            html += '</select>';

            Swal.fire({
                title: 'Pilih Divisi',
                html: html,
                width: 500,
                confirmButtonText: 'Pilih',
                preConfirm: () => {
                    let kdDiv = $('#swalDivisi').val();
                    let namaDiv = $('#swalDivisi option:selected').text();

                    return {
                        kdDiv: kdDiv,
                        namaDiv: namaDiv.substring(6)
                    };
                }

            }).then((result) => {
                if (!result.isConfirmed)
                    return;

                txtKdDiv.val(result.value.kdDiv);
                txtNamaDivisi.val(result.value.namaDiv);

                if (mode == 1) {
                    txtNoSPPB.val('');
                    loadData();
                }
                else if (mode == 2) {
                    txtNoSPPB.val('');
                    txtNoSPPB.prop('disabled', false);
                    txtNoSPPB.focus();
                }
                else {
                    pilihNoSPPB();
                }
            });
        }
    });
}

function pilihNoSPPB() {

    $.ajax({
        url: '/Kencana/SppbPembelian/getNoSPPB',
        type: 'GET',
        data: {
            KdDiv: txtKdDiv.val()
        },

        success: function (response) {

            if (response.length == 0) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Peringatan',
                    text: 'No SPPB tidak ditemukan.'
                });

                return;
            }

            let html = `
                <select
                    id="swalNoSPPB"
                    class="form-select"
                    style="width: 100%;">
                    <option value="">Pilih No SPPB</option>
            `;

            $.each(response, function (i, item) {

                html += `
                    <option value="${item.No_sppb}">
                        ${item.No_sppb}
                    </option>
                `;
            });

            html += `</select>`;

            Swal.fire({
                title: 'Pilih No SPPB',
                html: html,
                width: 500,
                confirmButtonText: 'Pilih',

                didOpen: function () {

                    $('#swalNoSPPB').select2({
                        width: '100%',
                        placeholder: 'Cari No SPPB...',
                        allowClear: true,

                        dropdownParent: $('.swal2-container')
                    });

                },

                preConfirm: function () {

                    let noSPPB = $('#swalNoSPPB').val();

                    if (!noSPPB) {

                        Swal.showValidationMessage(
                            'Silakan pilih No SPPB.'
                        );

                        return false;
                    }

                    return noSPPB;
                }

            }).then(function (result) {

                if (!result.isConfirmed)
                    return;

                txtNoSPPB.val(result.value);

                loadData();
            });
        },

        error: function (xhr) {

            console.error(xhr);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal mengambil daftar No SPPB.'
            });
        }
    });
}

function clearForm() {

    // Hidden
    txtKdDiv.val('');

    // Header
    $('#NamaDivisi').val('');
    $('#NoSPPB').val('');
    $('#TanggalSPPB').val('');
    $('#NoTransaksi').val('');

    // Barang
    $('#KdBarang').val('');
    $('#NamaBarang').val('');
    $('#KetBarang').val('');
    $('#KategoriUtama').val('');
    $('#Kategori').val('');
    $('#SubKategori').val('');
    $('#KetPembelian').val('');
    $('#Satuan').val('');

    // Supplier & Payment
    $('#supplier').val(null).trigger('change');
    $('#paymentTerm').val(null).trigger('change');

    // =========================
    // HARGA
    // =========================
    $('#HargaSatuan').val('0');
    $('#Disc').val('0');

    $('#SubTotalHarga').val('0,00');

    $('#PPN')
        .val('')
        .trigger('change');

    $('#TotalHarga').val('0,00');

    // Footer
    $('#TanggalDatang').val('');
    $('#JenisPembelian').val('');
    $('#AlasanHapus').val('');

    // Hilangkan data yang tersimpan
    sppbData = [];

    // Reset checkbox
    $('#checkAll').prop('checked', false);

    // Hapus selected row
    $('#tableSPPB tbody tr').removeClass('selected');

    // Kosongkan DataTable
    if ($.fn.DataTable.isDataTable('#tableSPPB')) {
        tableSPPB.clear().draw();
    }
}

function proses() {
    // isi
    let transaksi = [];

    $('#tableSPPB tbody .check-item:checked').each(function () {
        let row = tableSPPB.row($(this).closest('tr')).data();

        if (!row)
            return;

        // =========================
        // DATA TRANSAKSI
        // =========================

        let qty = parseFloat(row.Qty) || 0;

        let priceUnit = parseFloat(row.PriceUnit) || 0;

        let disc = parseFloat(row.disc) || 0;

        let idPPN = row.IdPPN;

        // =========================
        // AMOUNT
        // =========================

        let amount = qty * priceUnit;

        // =========================
        // DISCOUNT
        // =========================

        let nilaiDisc = amount * disc / 100;

        // =========================
        // SUBTOTAL
        // =========================

        let subtotalHarga = amount - nilaiDisc;

        // =========================
        // PPN
        // =========================

        let ppn = parseFloat(
            $('#PPN option[value="' + idPPN + '"]')
                .data('jumlah')
        ) || 0;

        let nilaiPPN = subtotalHarga * ppn / 100;

        // =========================
        // TOTAL
        // =========================

        let totalHarga = subtotalHarga + nilaiPPN;

        // =========================
        // SIMPAN TRANSAKSI
        // =========================

        transaksi.push({

            NoTrans: row.No_trans,

            TanggalDatang: $('#TanggalDatang').val(),

            Jenis: $('#JenisPembelian').val(),

            PriceUnit: priceUnit,

            Disc: disc,

            IdPPN: idPPN,

            SubTotalHarga: subtotalHarga,

            TotalHarga: totalHarga

        });

    });

    if (transaksi.length == 0) {

        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Pilih minimal satu transaksi.'
        });

        return;
    }

    if ($('#TanggalSPPB').val() == '') {

        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Tanggal SPPB harus diisi.'
        });

        return;
    }

    if ($('#supplier').val() == '') {

        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Supplier harus dipilih.'
        });

        return;
    }

    if ($('#paymentTerm').val() == '') {

        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Payment Term harus dipilih.'
        });

        return;
    }

    if ($('#TanggalDatang').val() == '') {

        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Tanggal Datang harus diisi.'
        });

        return;
    }

    if ($('#JenisPembelian').val() == '') {

        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Jenis Pembelian harus dipilih.'
        });

        return;
    }

    $.ajax({
        url: '/Kencana/SppbPembelian',
        type: 'POST',

        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },

        data: {
            Mode: mode,
            KdDiv: txtKdDiv.val(),
            TanggalSPPB: $('#TanggalSPPB').val(),
            Supplier: $('#supplier').val(),
            PayTerm: $('#paymentTerm').val(),
            Transaksi: transaksi
        },

        beforeSend: function () {
            btnProses.prop('disabled', true);
        },

        success: function (response) {
            $('#NoSPPB').val(response.NoSPPB);

            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: response.message
            }).then(() => {

                Swal.fire({
                    title: 'Cetak SPPB',
                    text: 'Apakah akan mencetak SPPB?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Tidak'
                }).then((result) => {

                    if (result.isConfirmed) {

                        prosesCetak(
                            response.KdDiv,
                            response.NoSPPB,
                            true
                        );

                    } else {

                        setModeAwal();

                    }
                });

            });
        },

        error: function (xhr) {
            let pesan = 'Terjadi kesalahan.';

            if (xhr.responseJSON?.message) {
                pesan = xhr.responseJSON.message;
            }
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: pesan
            });
        },

        complete: function () {
            btnProses.prop('disabled', false);
        }
    });
}

function prosesCetak(kdDiv, noSPPB, langsungCetak = false) {

    $.ajax({
        url: '/Kencana/SppbPembelian/prosesCetak',
        type: 'GET',
        data: {
            KdDiv: kdDiv,
            NoSPPB: noSPPB
        },

        success: function () {

            if (langsungCetak) {

                // Langsung buka halaman cetak
                dataPrint(kdDiv, noSPPB);

                // Kembali ke mode awal
                setModeAwal();

            } else {

                setModeAwal();

            }
        },

        error: function () {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal memproses cetak.'
            });

        }
    });
}

function loadHistoryHarga() {
    let kdBarang = $('#KdBarang').val();

    if (kdBarang == '') {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Pilih barang terlebih dahulu.'
        });

        return;
    }

    $.ajax({
        url: '/Kencana/SppbPembelian/getHistoryHarga',
        type: 'GET',
        data: {
            KdBarang: kdBarang
        },

        beforeSend: function () {
            $('body').css('cursor', 'wait');
        },

        success: function (response) {
            console.log(response);
            $('body').css('cursor', 'default');
            if ($.fn.DataTable.isDataTable('#tableHistoryHarga')) {
                tableHistory.destroy();
            }

            $('#tableHistoryHarga tbody').empty();
            tableHistory = $('#tableHistoryHarga').DataTable({
                destroy: true,
                autoWidth: false,
                responsive: false,
                scrollX: true,
                data: response,
                columns: [
                    {
                        data: null,
                        render: function(data, type, row, meta){
                            return meta.row + 1;
                        }
                    },
                    {
                        data: 'Hrg_trm',
                        className: 'text-end',
                        render: function(data){

                            return parseFloat(data)
                                .toLocaleString('id-ID',{
                                    minimumFractionDigits:2,
                                    maximumFractionDigits:2
                                });
                        }
                    },
                    {
                        data: 'Nama_satuan'
                    },
                    {
                        data: 'Nama_MataUang'
                    },
                    {
                        data: 'Disc_trm'
                    },
                    {
                        data: 'Ppn_trm'
                    },
                    {
                        data: 'NM_SUP'
                    },
                    {
                        data: 'Datang',
                        render:function(data){
                            if(!data) return '';
                            return moment(data)
                                .format('DD/MM/YYYY');
                        }
                    }
                ]
            });
            let modal = new bootstrap.Modal(
                document.getElementById('modalHistoryHarga')
            );

            modal.show();

            $('#modalHistoryHarga')
                .off('shown.bs.modal')
                .on('shown.bs.modal', function () {

                    tableHistory.columns.adjust().draw(false);

                });
        },

        error:function(){

            $('body').css('cursor','default');

            Swal.fire({
                icon:'error',
                title:'Error',
                text:'History harga gagal diambil.'
            });

        }

    });

}

function dataPrint(kdDiv, noSPPB) {
    window.open(
        '/Kencana/SppbPembelian/print?' +
        $.param({
            KdDiv: kdDiv,
            NoSPPB: noSPPB
        }),
        '_blank'
    );
}
function loadSupplier(selectedSupplier = '') {

    return $.ajax({
        url: '/Kencana/SppbPembelian/getSupplier',
        type: 'GET',

        success: function (response) {

            let cmbSupplier = $('#supplier');

            if (cmbSupplier.hasClass('select2-hidden-accessible')) {
                cmbSupplier.select2('destroy');
            }

            cmbSupplier.empty();

            cmbSupplier.append(
                '<option value="">Pilih Supplier</option>'
            );

            $.each(response, function (i, item) {

                cmbSupplier.append(`
                    <option
                        value="${item.NO_SUP}"
                        data-nama="${item.NM_SUP ?? ''}"
                        data-alamat="${item.ALAMAT1 ?? ''}"
                        data-kota="${item.KOTA1 ?? ''}"
                        data-negara="${item.NEGARA1 ?? ''}"
                    >
                        ${item.NO_SUP} - ${item.NM_SUP}
                    </option>
                `);
            });

            cmbSupplier.select2({
                width: '100%',
                placeholder: 'Pilih Supplier',
                allowClear: true
            });

            // Jika ada supplier yang harus dipilih
            if (selectedSupplier) {

                cmbSupplier
                    .val(selectedSupplier)
                    .trigger('change');
            }
        },

        error: function (xhr) {

            console.error(xhr);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal mengambil data supplier.'
            });
        }
    });
}


function loadPaymentTerm(selectedPaymentTerm = '') {

    return $.ajax({
        url: '/Kencana/SppbPembelian/getPaymentTerm',
        type: 'GET',

        success: function (response) {

            cmbPaymentTerm.empty();

            cmbPaymentTerm.append(
                '<option value="">Pilih Payment Term</option>'
            );

            $.each(response, function (i, item) {

                cmbPaymentTerm.append(`
                    <option value="${item.Kode}">
                        ${item.Pembayaran}
                    </option>
                `);

            });

            // Untuk mode Lihat
            if (selectedPaymentTerm) {

                cmbPaymentTerm
                    .val(selectedPaymentTerm)
                    .trigger('change');
            }
        },

        error: function (xhr) {

            console.error(xhr);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal mengambil data Payment Term.'
            });
        }
    });
}

function formatNumber(value) {
    let number = parseFloat(value) || 0;

    return number.toLocaleString('id-ID', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function hitungHarga() {

    // =====================================================
    // DataTable belum dibuat
    // Bisa terjadi saat clearForm()
    // =====================================================
    if (
        tableSPPB === null ||
        !$.fn.DataTable.isDataTable('#tableSPPB')
    ) {
        $('#SubTotalHarga').val('0,00');
        $('#TotalHarga').val('0,00');
        return;
    }


    let totalAmount = 0;
    let totalDisc = 0;
    let totalPPN = 0;
    let totalHarga = 0;


    // =====================================================
    // FUNCTION HITUNG PER TRANSAKSI
    // =====================================================
    function hitungPerRow(row) {
        if (!row)
            return;

        let qty = parseFloat(row.Qty) || 0;
        let priceUnit = parseFloat(row.PriceUnit) || 0;
        let disc = parseFloat(row.disc) || 0;

        // PPN ambil dari dropdown PPN
        let ppn = parseFloat(
            $('#PPN option:selected').data('jumlah')
        ) || 0;


        // Amount
        let amount = qty * priceUnit;


        // Discount
        let nilaiDisc = amount * disc / 100;


        // Subtotal
        let subtotal = amount - nilaiDisc;


        // PPN
        let nilaiPPN = subtotal * ppn / 100;


        // Total
        let total = subtotal + nilaiPPN;


        // Akumulasi
        totalAmount += amount;
        totalDisc += nilaiDisc;
        totalPPN += nilaiPPN;
        totalHarga += total;
    }


    // =====================================================
    // MODE ISI
    // Hanya transaksi yang dicentang
    // =====================================================
    if (mode == 1) {

        $('#tableSPPB tbody .check-item:checked').each(function () {

            let row = tableSPPB
                .row($(this).closest('tr'))
                .data();

            hitungPerRow(row);
        });
    }


    // =====================================================
    // MODE LIHAT
    // Semua transaksi dalam No SPPB
    // =====================================================
    else if (mode == 2) {

        tableSPPB.rows().every(function () {

            let row = this.data();

            hitungPerRow(row);
        });
    }


    // =====================================================
    // SUBTOTAL
    // =====================================================
    let subtotalHarga = totalAmount - totalDisc;


    $('#SubTotalHarga').val(
        formatNumber(subtotalHarga)
    );


    // =====================================================
    // TOTAL
    // =====================================================
    $('#TotalHarga').val(
        formatNumber(totalHarga)
    );
}

function loadPPN(selectedPPN = '') {

    return $.ajax({
        url: '/Kencana/SppbPembelian/getPPN',
        type: 'GET',

        success: function (response) {

            let cmbPPN = $('#PPN');

            cmbPPN.empty();

            cmbPPN.append(
                '<option value="">Pilih PPN</option>'
            );

            $.each(response, function (i, item) {

                cmbPPN.append(`
                    <option value="${item.IdPPN}"
                            data-jumlah="${item.JumPPN}">
                        ${item.JumPPN}% - ${item.Keterangan}
                    </option>
                `);

            });

            if (selectedPPN) {

                cmbPPN
                    .val(selectedPPN)
                    .trigger('change');

            }
        },

        error: function (xhr) {

            console.error(xhr);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal mengambil data PPN.'
            });
        }
    });
}

function updateHargaRow() {

    let selectedRow = $('#tableSPPB tbody tr.selected');

    if (selectedRow.length === 0)
        return;

    let rowApi = tableSPPB.row(selectedRow);
    let row = rowApi.data();

    if (!row)
        return;

    let hargaSatuan = parseFloat(
        $('#HargaSatuan')
            .val()
            .replace(/\./g, '')
            .replace(',', '.')
    ) || 0;

    let disc = parseFloat($('#Disc').val()) || 0;

    let idPPN = $('#PPN').val();

    // Update object row
    row.PriceUnit = hargaSatuan;
    row.disc = disc;
    row.IdPPN = idPPN;

    // Tidak perlu draw
    rowApi.data(row);
}

//#region Add Event Listener

$('#tableSPPB tbody').on('click', 'tr', function (e) {

    // Jika yang diklik adalah checkbox, jangan proses klik row
    if ($(e.target).closest('.check-item').length) {
        return;
    }

    let data = tableSPPB.row(this).data();

    if (!data)
        return;

    $('#tableSPPB tbody tr').removeClass('selected');

    $(this).addClass('selected');

    fillForm(data);

    $('#HargaSatuan').val(formatNumber(data.PriceUnit));
    $('#Disc').val(parseFloat(data.disc || 0));
    $('#PPN').val(data.IdPPN);
    hitungHarga();
});

$(document).ready(function () {
    init();
});

btnIsi.on('click', function (e) {
    e.preventDefault();
    setModeIsi();
    // Fokus ke Nama Divisi
    $('#NamaDivisi').focus();
});

btnLihat.on('click', function (e) {
    e.preventDefault();
    setModeLihat();
});

btnBatal.on('click', function (e) {
    e.preventDefault();
    setModeAwal();
});

btnHapusSPPB.on('click', function (e) {
    e.preventDefault();
    setModeHapus();
});

btnBatalSPPB.on('click', function (e) {
    e.preventDefault();
    setModeBatalSPPB();
});


$(document).on('change', '#tableSPPB tbody .check-item', function () {

    let rowApi = tableSPPB.row($(this).closest('tr'));
    let row = rowApi.data();

    if (!row)
        return;

    // Simpan status checkbox ke data row
    row.selected = this.checked;

    rowApi.data(row);

    // Update checkAll
    let total = $('#tableSPPB tbody .check-item').length;
    let checked = $('#tableSPPB tbody .check-item:checked').length;

    $('#checkAll').prop(
        'checked',
        total > 0 && total === checked
    );

    hitungHarga();
});


// =====================================================
// CHECK ALL
// =====================================================

$(document).on('change', '#checkAll', function () {

    let checked = this.checked;

    tableSPPB.rows({ search: 'applied' }).every(function () {

        let row = this.data();

        if (!row)
            return;

        row.selected = checked;

        this.data(row);

        $(this.node())
            .find('.check-item')
            .prop('checked', checked);
    });

    hitungHarga();
});

btnCariDivisi.on('click', function () {
    if ($(this).prop('disabled')) {
        return;
    }
    pilihDivisi();

});

btnProses.on('click', function (e) {
    e.preventDefault();
    proses();
});

btnHarga.on('click', function () {
    loadHistoryHarga();
});

btnLoadSPPB.on('click', function (e) {
    e.preventDefault();
    if (mode == 2 || mode == 3 || mode == 4) {
        pilihNoSPPB();
    }
});

txtNoSPPB.on('keypress', function (e) {
    if (e.which === 13 && mode == 2) {
        loadData();
    }
});

btnCetak.on('click', function () {

    if (mode != 2)
        return;

    let kdDiv = txtKdDiv.val();
    let noSPPB = txtNoSPPB.val();

    if (!kdDiv || !noSPPB) {

        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Kd Divisi dan No SPPB harus tersedia.'
        });

        return;
    }

    $.ajax({
        url: '/Kencana/SppbPembelian/prosesCetak',
        type: 'GET',
        data: {
            KdDiv: kdDiv,
            NoSPPB: noSPPB
        },

        success: function () {

            dataPrint(
                kdDiv,
                noSPPB
            );

        },

        error: function (xhr) {

            console.error(xhr);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Gagal memproses cetak.'
            });

        }
    });
});

$('#HargaSatuan, #Disc, #PPN').on('input change', function () {
    updateHargaRow();
    hitungHarga();
});


btnKirimSupplier.on('click', function (e) {

    e.preventDefault();

    let kdDiv = txtKdDiv.val();
    let noSPPB = txtNoSPPB.val();

    console.log('=== KIRIM EMAIL SPPB ===');
    console.log('KdDiv:', kdDiv);
    console.log('NoSPPB:', noSPPB);

    if (mode != 2) {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'SPPB harus dalam mode Lihat.'
        });
        return;
    }

    if (!kdDiv || !noSPPB) {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Kd Divisi dan No SPPB harus tersedia.'
        });
        return;
    }

    Swal.fire({
        title: 'Kirim SPPB ke Supplier?',
        text: 'PDF SPPB akan dikirim ke email supplier.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, Kirim',
        cancelButtonText: 'Batal'
    }).then(function (result) {

        if (!result.isConfirmed) {
            return;
        }

        console.log('Mulai AJAX sendEmailSupplier');

        $.ajax({
            url: '/Kencana/SppbPembelian/sendEmailSupplier',
            type: 'POST',

            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },

            data: {
                KdDiv: kdDiv,
                NoSPPB: noSPPB
            },

            timeout: 120000,

            beforeSend: function () {

                console.log('AJAX beforeSend');

                btnKirimSupplier
                    .prop('disabled', true)
                    .text('MENGIRIM...');
            },

            success: function (response) {

                console.log('AJAX SUCCESS:', response);

                if (response.success) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: response.message
                    });

                } else {

                    Swal.fire({
                        icon: 'warning',
                        title: 'Peringatan',
                        text: response.message
                    });
                }
            },

            error: function (xhr, status, error) {

                console.error('AJAX ERROR');
                console.error('status:', status);
                console.error('error:', error);
                console.error('HTTP:', xhr.status);
                console.error('response:', xhr.responseText);

                let pesan = 'Gagal mengirim email.';

                if (xhr.responseJSON?.message) {
                    pesan = xhr.responseJSON.message;
                }

                if (status === 'timeout') {
                    pesan = 'Server terlalu lama merespons. Proses pengiriman email kemungkinan masih berjalan atau macet.';
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: pesan
                });
            },

            complete: function () {

                console.log('AJAX COMPLETE');

                btnKirimSupplier
                    .prop('disabled', false)
                    .text('KIRIM KE SUPPLIER');
            }
        });
    });
});
//#endregion
