<!DOCTYPE html>
<html lang="en">

<style>
    @page {
        size: auto;
        margin: 10mm;
    }

    @media print {
        /* thead {
            display: table-header-group;
        }

        thead.no-repeat {
            display: none;
        }

        tfoot {
            display: table-footer-group;
        }

        tfoot.only-last {
            display: none;
        } */

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
            /* padding: 3mm 9mm; */
        }

        .header,
        .footer {
            text-align: center;
            /* margin-bottom: 20px; */
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

    /* .content th {
            background-color: #f2f2f2;
        } */

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
        <h5 style="text-align: left;">Receipt Voucher</h5>
        <h4 style="text-align: left;">PT. KENCANA RAJASA RAYA</h4>
    </div>
    <div class="content">
        <table style="border:none !important">
            <tr style="border:none !important">
                <td style="width: 10px; border:none !important">Name</td>
                <td style="border:none !important">:</td>
                <td style="border:none !important;" id="name_p"></td>
                <td style="width: 130px; border:none !important">Voucher</td>
                <td style="border:none !important">:</td>
                <td style="border:none !important" id="voucher_p"></td>
            </tr>
            <tr>
                <td style="width: 10px; border:none !important">Description</td>
                <td style="border:none !important">:</td>
                <td style="border:none !important" id="description_p"></td>
                <td style="width: 130px; border:none !important">Posted On</td>
                <td style="border:none !important">:</td>
                <td style="border:none !important" id="posted_p"></td>
            </tr>
            <tr>
                <td style="width: 65px; border:none !important">Date</td>
                <td style="border:none !important">:</td>
                <td style="border:none !important" id="tanggal_p"></td>
                <td style="width: 130px; border:none !important">Received From</td>
                <td style="border:none !important">:</td>
                <td style="border:none !important" id="received_p"></td>
            </tr>
        </table>
        <table style="margin-top: 20px; border:none !important" id="paymentTable">
            <thead style="border:none !important"></thead>
            <tbody style="border:none !important; border-bottom: 1px solid black !important">
                <tr style="border:none !important">
                    <td style="border:none !important; border-bottom: 1px solid black !important">C.O.A</td>
                    <td style="border:none !important; border-bottom: 1px solid black !important">Account Name</td>
                    <td style="border:none !important; border-bottom: 1px solid black !important">Description</td>
                    <td style="border:none !important; border-bottom: 1px solid black !important" id="nobg_p">CEK/BG
                        No.</td>
                    <td style="border:none !important; border-bottom: 1px solid black !important" id="matauang_p">Amount
                    </td>
                </tr>
                {{-- <tr style="border:none !important">
                    <td style="border:none !important; border-bottom: 1px solid black !important" id="coa_p"></td>
                    <td style="border:none !important; border-bottom: 1px solid black !important" id="acc_p"></td>
                    <td style="border:none !important; border-bottom: 1px solid black !important" id="desc_p"></td>
                    <td style="border:none !important; border-bottom: 1px solid black !important" id="bgno_p"></td>
                    <td style="border:none !important; border-bottom: 1px solid black !important" id="amount_p"></td>
                </tr> --}}
                {{-- <tr style="border:none !important">
                    <td style="border:none !important; border-top: 1px solid black !important"></td>
                    <td style="border:none !important; border-top: 1px solid black !important"></td>
                    <td style="border:none !important; border-top: 1px solid black !important"></td>
                    <td style="border:none !important; text-align: right; border-top: 1px solid black !important">TOTAL
                        =</td> --}}
                    {{-- <td colspan="4" style="text-align: right; border:none !important">TOTAL =</td> --}}
                    {{-- <td style="border:none !important; text-align: right; border-top: 1px solid black !important"
                        id="total_p"></td>
                </tr> --}}
            </tbody>
            {{-- <tfoot style="border:none !important">

            </tfoot> --}}
        </table>
        <table style="margin-top: 20px; border:none !important" id="ttdTable">
            <tbody style="border:none !important; border-bottom: 1px solid black !important">
            </tbody>
        </table>
    </div>
    {{-- <div class="content">
        <table style="border:none !important">
            <thead style="border:none !important">
                <tr style="border:none !important">
                    <td style="text-align: center !important; width: 80px; border:none !important">Receiver</td>
                    <td style="text-align: center !important; width: 80px; border:none !important">Cashier</td>
                    <td style="text-align: center !important; width: 80px; border:none !important">Responsible Person</td>
                    <td style="border:none !important"></td>
                </tr>
                <tr style="border:none !important">
                    <td style="border:none !important">&nbsp;</td>
                    <td style="border:none !important">&nbsp;</td>
                    <td style="border:none !important">&nbsp;</td>
                    <td style="border:none !important" id="batal_p">&nbsp;</td>
                </tr>
                <tr>
                    <td style="text-align: center !important; border:none !important">&nbsp;__________________&nbsp;
                    </td>
                    <td style="text-align: center !important; border:none !important">&nbsp;__________________&nbsp;
                    </td>
                    <td style="text-align: center !important; border:none !important">&nbsp;__________________&nbsp;
                    </td>
                    <td style="border:none !important" id="alasan_p">&nbsp;</td>
                </tr>
            </thead>
        </table>
    </div> --}}
</div>

</html>
