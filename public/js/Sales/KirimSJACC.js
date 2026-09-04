$(document).ready(function () {

    const today = new Date();
    const todayString = today.getFullYear() + '-' +
        String(today.getMonth() + 1).padStart(2, '0') + '-' +
        String(today.getDate()).padStart(2, '0');
    $('#tanggal_mulai').val(todayString); $('#tanggal_akhir').val(todayString);
    $('#table_SJ').DataTable({
        processing: true,
        responsive: false,
        scrollX: false,
        autoWidth: false,
        serverSide: true,
        order: [],
        columnDefs: [{ targets: 5, orderable: false }],
        ajax: {
            url: '/KirimSJACCCustomer/getDataSJACC',
            type: 'GET',
            data: function (d) {
                d.tanggal_mulai = $('#tanggal_mulai').val();
                d.tanggal_akhir = $('#tanggal_akhir').val();
            },
            beforeSend: function () {
                $("#loading-screen").css("display", "flex");
            },
            complete: function () {
                $("#loading-screen").css("display", "none");
            },
        },
        columns: [
            {
                data: 'Tanggal',
                name: 'Tanggal',
                render: function (data) {

                    if (!data) {
                        return '';
                    }

                    return data.substring(0, 10);
                }
            },
            { data: 'IDPengiriman', name: 'IDPengiriman' },
            { data: 'NamaCust', name: 'NamaCust' },
            { data: 'SuratPesanan', name: 'SuratPesanan' },
            { data: 'No_PO', name: 'No_PO' },
            { data: 'NamaType', name: 'NamaType' },
            {
                data: "QuantityDisplay",
                name: "QuantityDisplay",
                render: function (data) {

                    if (!data || data === "-") {
                        return "-";
                    }

                    let parts = data.split(" ");

                    let qty = parts[0];
                    let satuan = parts.slice(1).join(" ").trim();

                    return `${qty} ${formatSatuan(satuan)}`;
                }
            },
            { data: 'AlamatKirimCustomer', name: 'AlamatKirimCustomer' },
            { data: 'NamaExpeditor', name: 'NamaExpeditor' },
            { data: 'TrukNopol', name: 'TrukNopol' },
            {
                data: null,
                orderable: false,
                searchable: false,
                render: function (data, type, row) {

                    if (row.HasAttachment) {
                        return `
                            <button
                                class="btn btn-success btn-sm btnDownload"
                                data-id="${row.IDPengiriman}">
                                Unduh
                            </button>
                        `;
                    }

                    return `
                        <button
                            class="btn btn-secondary btn-sm"
                            disabled>
                            Tidak Ada File
                        </button>
                    `;
                }
            }
        ],

        // Setelah DataTable selesai dibuat
        initComplete: function () {

            setTimeout(function () {

                $('#table_SJ').colResizable({
                    liveDrag: true,
                    resizeMode: 'overflow',
                    minWidth: 60
                });

            }, 300);
        }
    });

});


function formatSatuan(satuan) {

    let mapping = {
        TABUNG: "TABUNG",
        SET: "SET",
        KGM: "KILOGRAM",
        RP: "RP",
        BALL: "BALL",
        LBR: "LEMBAR",
        PC: "POTONG",
        YARDS: "YARD",
        "MTR²": "METER PERSEGI",
        ROLL: "ROLL",
        DRUM: "DRUM",
        LJR: "LONJOR",
        MTR: "METER",
        UNIT: "UNIT",
    };

    return mapping[satuan] || satuan;
}


$(document).on('click', '.btnDownload', function () {
    let idPengiriman = $(this).data('id');

    fetch(`/KirimSJACCCustomer/downloadAttachment/${idPengiriman}`)
        .then(async response => {
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();

                Swal.fire({
                    icon: 'warning',
                    title: 'Peringatan',
                    text: result.message
                });

                return;
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `SJ ${idPengiriman}.jpg`;
            a.click();

            window.URL.revokeObjectURL(url);
        });
});

$('#btnFilterTanggal').on('click', function () {

    let tanggalMulai = $('#tanggal_mulai').val();
    let tanggalAkhir = $('#tanggal_akhir').val();

    if (tanggalMulai && tanggalAkhir) {

        if (tanggalMulai > tanggalAkhir) {

            Swal.fire({
                icon: 'warning',
                title: 'Peringatan',
                text: 'Tanggal mulai tidak boleh lebih besar dari tanggal akhir.'
            });

            return;
        }
    }

    $('#table_SJ').DataTable().ajax.reload();
});


$('#btnResetTanggal').on('click', function () { // Reset kembali ke hari ini
    $('#tanggal_mulai').val(todayString);
    $('#tanggal_akhir').val(todayString);
    $('#table_SJ').DataTable().ajax.reload();
});
