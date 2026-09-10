<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <style>
        <style>table {
            width: 100%;
            border-collapse: collapse;
        }

        table,
        th,
        td {
            border: 1px solid black;
        }

        th,
        td {
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        .align-right {
            text-align: right;
        }
    </style>
    </style>
</head>

<body>

    <div style="text-align: center">
        <h3>PT Kerta Rajasa Raya</h3>
        <p>Jl. Raya Tropodo No. 1, Sidoarjo</p>
    </div>

    <br>

    <p id="label_surat">Nomor: SPK/2024/CIR-0001</p>

    <p>Perihal: Surat Perintah Kerja Penugasan Order Internal Mesin</p>

    <p>Dengan hormat,</p>
    <p>Berikut kami sampaikan laporan pesanan yang telah diproses dengan rincian sebagai berikut:</p>


    <div id="table-container" class="mt-3">
        <table style="width: 100%">
            <tr>
                <th>Id Order</th>
                <th>Nama Mesin</th>
                <th class="align-right">Tanggal Mulai</th>
                <th class="align-right">Tanggal Selesai</th>
                <th class="align-right">Jumlah Order</th>
            </tr>
        </table>
    </div>

    <div class="mt-5">
        <p>Laporan dapat menjadi tidak sesuai bila ditemukan kondisi berikut: </p>
        <p>
            - Terjadi kendala dalam proses pengerjaan order, seperti kerusakan mesin selama
            produksi ataupun kurangnya ketersediaan bahan.

            <br>

            - Mesin yang ada dalam keadaan sibuk atau tidak bisa digunakan pada tanggal
            rencana awal pengerjaan order.
        </p>

        <br>

        <p>Demikian surat perintah kerja ini kami sampaikan. Apabila ada pertanyaan atau hal yang perlu diklarifikasi
            terkait penugasan order internal mesin ini, jangan ragu untuk menghubungi PIC Divisi Circular.</p>
    </div>

    <div style="float: right; text-align: center;">
        <p>Pemberi Pekerjaan</p>
        <br>
        <br>
        <p>(.................................)</p>
    </div>

    {{-- https://www.sipas.id/blog/surat-perintah-kerja/ --}}
</body>

</html>

<script>
    var noSurat = sessionStorage.getItem("no_surat");
    var labelNoSurat = document.getElementById("label_surat");
    labelNoSurat.textContent = "Nomor: SPK/2024/CIR-" + noSurat;

    var listScheduleString = sessionStorage.getItem("list_schedule");
    var listSchedule = JSON.parse(listScheduleString);

    var tableContainer = document.getElementById("table-container");
    var table = tableContainer.querySelector("table");

    listSchedule.forEach(function(item, index) {
        var row = table.insertRow(-1);
        row.insertCell(0).textContent = item.IdOrder;
        row.insertCell(1).textContent = item.MachineName;

        var startDateCell = row.insertCell(2);
        var endDateCell = row.insertCell(3);
        var metersDoneCell = row.insertCell(4);

        startDateCell.textContent = item.StartDate;
        endDateCell.textContent = item.EndDate;
        metersDoneCell.textContent = item.MetersDone + ' meter';

        startDateCell.classList.add('align-right');
        endDateCell.classList.add('align-right');
        metersDoneCell.classList.add('align-right');
    });

    window.print();

    window.addEventListener("afterprint", function(event) {
        window.close();
    });
</script>
