<!DOCTYPE html>
<html lang="en">

<style>
    @page {
        size: auto;
        margin: 10mm;
    }

    @media print {
        .modal {
            display: none !important;
        }

        .modal-backdrop {
            display: none !important;
        }

        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            display: block !important;
            width: 100%;
            max-width: 210mm;
            margin: 0 auto;
            /* padding: 10mm; */
        }

        .header,
        .footer {
            text-align: center;
            margin-bottom: 20px;
        }

        .loading-screen {
            display: none !important;
        }

        .container-fluid {
            display: none;
        }

        .acs-div-container,
        .acs-div-container * {
            font-family: Arial, Helvetica, sans-serif;
            border: none;
            visibility: visible;
        }

        .acs-div-container {
            display: block;
            border: 1px solid black !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }

    .content {
        margin: 0px 0;
    }

    .content table {
        width: 100%;
        border-collapse: collapse;
    }

    .content table,
    .content th,
    .content td {
        border: 1px solid black;
    }

    .content th,
    .content td {
        padding: 4px;
        text-align: left;
    }

    .signature {
        /* margin-top: 40px; */
        display: flex;
        justify-content: space-between;
    }

    .signature div {
        text-align: center;
    }

    .note {
        /* margin-top: 20px; */
    }
</style>

<div class="container" style="display: none">
    <div class="header">
        <table style="width: 100%;">
            <thead>
                <tr>
                    <th><strong>PT. KENCANA RAJASA RAYA</strong></th>
                    <th colspan="2"><strong>BUKTI PENERIMAAN BANK</strong></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border-top:none !important; border-bottom:none !important">Jl. Raya Tropodo No. 1</td>
                    <td style="text-align: right; border:none !important">NOMER : &nbsp;</td>
                    <td style="text-align: left; border:none !important; border-right: 1px solid black !important" id="nomerP">
                        001BCA10811</td>
                </tr>
                <tr>
                    <td style="border-top:none !important">WARU - SIDOARJO</td>
                    <td style="text-align: right; border:none !important; border-bottom: 1px solid black !important;">
                        TANGGAL : &nbsp;</td>
                    <td
                        style="text-align: left; border:none !important; border-right: 1px solid black !important; border-bottom: 1px solid black !important" id="tanggal_atasP">
                        1/August/2011</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="content">
        <table style="width: 100%;">
            <tr>
                <td style="width: 17%; border:none !important; ">
                    <strong>Jumlah Diterima :</strong>
                </td>
                <td style="width: 5%; border:none !important" id="rp_atasP">Rp.</td>
                <td style="border:none !important" id="jumlah_diterimaP">40,292.66</td>
            </tr>
            <tr>
                <td style="border:none !important">
                    <strong>Terbilang :</strong>
                </td>
                <td style="border:none !important" colspan="2" id="terbilangP">EMPAT PULUH RIBU DUA RATUS SEMBILAN PULUH DUA RPH ENAM
                    PULUH ENAM SEN</td>
            </tr>
        </table>
        <br>
        <table id="paymentTable">
            {{-- <thead>
                <tr>
                    <th style="width: 60%;text-align: center; border:none !important; border-right: 1px solid black !important">RINCIAN PENERIMAAN</th>
                    <th style="text-align: center; border:none !important; border-right: 1px solid black !important">KODE PERKIRAAN</th>
                    <th style="width: 23%;text-align: center; border:none !important; border-left: 1px solid black !important" colspan="2">JUMLAH
                    </th>
                </tr>
            </thead> --}}
            <tbody>
                <tr>
                    <td id="rincianP">BIAYA ADM,BUNGA,DLL - BUNGA</td>
                    <td id="kode_perkiraanP" style="text-align: center; border-left:none !important; border:right !important">711.1100</td>
                    <td id="jumlahP" style="text-align: right !important" colspan="2">40,292.66</td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: right; border:none !important"><strong>GRAND TOTAL :</strong>
                    </td>
                    <td style="width: 5%; border:none !important" id="rp_totalP"><strong>Rp.</strong></td>
                    <td style="text-align: right !important; border:none !important" id="grandP"><strong>40,292.66</strong></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div style="display: flex; align-items: flex-start;">
        <div style="margin-right: 50px;">
            <label for="id" style="margin-left: 30px">Disetujui,</label>
            <br><br><br>
            ________________
        </div>
        <div>
            <label for="id" style="margin-left: 40px">Kasir,</label>
            <br><br><br>
            ________________
        </div>
        <div>
            <br><br>
            <label for="id" style="visibility: hidden">Sidoarjo, 13/September/2024</label>
        </div>
        <div>
            <br><br>
            <label id="tanggal_bawahP" >Sidoarjo, 13/September/2024</label>
        </div>
    </div>

</div>

</html>
