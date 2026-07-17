{{-- =========================
    STYLE KHUSUS MODAL
========================= --}}
<style>
    .custom-modal-width2 {
        max-width: 90%;
    }

    /* =========================
   SCOPE LAPORAN
========================= */
    .laporan-extruder {
        font-family: "Times New Roman", serif;
        font-size: 12px;
        color: #000;
    }

    .laporan-extruder .container {
        width: 100%;
        border: 1px solid #000;
        padding: 5px;
        box-sizing: border-box;
    }

    .laporan-extruder table {
        border-collapse: collapse;
        width: 100%;
    }

    .laporan-extruder td,
    .laporan-extruder th {
        border: 1px solid #000;
        padding: 1px 2px;
        vertical-align: middle;
    }

    .laporan-extruder .no-border td,
    .laporan-extruder .no-border th {
        border: none;
    }

    .laporan-extruder .center {
        text-align: center;
    }

    .laporan-extruder .right {
        text-align: right;
    }

    .laporan-extruder .bold {
        font-weight: bold;
    }

    .laporan-extruder .section-title {
        font-weight: bold;
        text-align: center;
        margin: 5px 0;
    }

    .laporan-extruder .small-text {
        font-size: 10px;
    }

    .laporan-extruder .remark {
        height: 60px;
    }

    .laporan-extruder .signature td {
        height: 30px;
    }

    #foto_pengirimanContainer {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    #foto_pengirimanContainer img {
        width: 500px;
        height: auto;
    }

    span {
        text-align: left;
        display: block;
    }

    /* =========================
   PRINT ONLY
========================= */
    @media print {
        @page {
            size: A3 portrait;
            margin: 15mm;
        }
    }
</style>

<div class="modal fade" id="modalLaporan" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog custom-modal-width2">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">Tambah Laporan Pengecekan Mutu Benang Extruder</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <button type="button" id="btn_simpan" class="btn btn-primary mb-2">
                    Simpan Laporan
                </button>
                <button type="button" id="btn_print" class="btn btn-success mb-2">
                    Print
                </button>
                <div class="laporan-extruder">
                    <div class="container">
                        <table>
                            <tr>
                                <td colspan="2" class="bold textBener"
                                    style="border-bottom:none !important; text-align: center; width:400px !important">
                                    PT. KERTA
                                    RAJASA RAYA</td>
                                <td class="small-text left" style="border-right:none !important">
                                    No. Referensi:</td>
                                <td colspan="4" class="small-text left"
                                    style="width:100px; border-left:none !important" id="referensi"
                                    contenteditable="true"></td>
                            </tr>
                            <tr>
                                <td colspan="2" class="textBener"
                                    style="border-top:none !important; border-bottom:none !important; text-align: center;">
                                    Woven Bag /
                                    Jumbo Bag Industrial</td>
                                <td class="small-text left" style="border-right:none !important">
                                    Tanggal:</td>
                                <td colspan="4" class="small-text left" style="border-left:none !important">
                                    <input class="small-text left" type="date" id="tanggal_laporan"
                                        style="border:none; width:50%; outline:none;">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="textBener"
                                    style="border-top:none !important; text-align: center;">
                                    FM - 8.2 - 03 - QC - 01 - 09</td>
                                <td class="small-text left" style="border-right:none !important">
                                    Halaman:</td>
                                <td colspan="4" class="small-text left" style="border-left:none !important"
                                    contenteditable="true" id="halaman">
                                    1&emsp;Dari&emsp;1</td>
                            </tr>
                            <tr>
                                <td colspan="2" class="center bold textBener">LAPORAN PENGECEKAN MUTU BENANG
                                    EXTRUDER</td>
                                <td colspan="4" class="center bold textBener">FORM</td>
                            </tr>
                        </table>
                        <table>
                            <tr class="textBener">
                                <td style="width: 100px; border-right:none !important">Shift / Time
                                </td>
                                <td style="width: 5px; border-left:none !important; border-right:none !important">
                                    :
                                </td>
                                <td
                                    style="border-left:none !important; border-right:none !important; text-align:center;">
                                    <div id="shiftSelector"
                                        style="display:inline-flex; gap:8px; font-weight:bold; cursor:pointer;">
                                        <span class="shift-option" data-value="A">A</span> /
                                        <span class="shift-option" data-value="B">B</span> /
                                        <span class="shift-option" data-value="C">C</span> /
                                        <span class="shift-option" data-value="D">D</span>
                                    </div>
                                    <input type="hidden" id="shiftValue" name="shiftValue">
                                </td>

                                <style>
                                    .shift-option {
                                        display: inline-block;
                                        width: 22px;
                                        height: 22px;
                                        text-align: center;
                                        line-height: 20px;
                                        border-radius: 50%;
                                        transition: 0.2s;
                                    }

                                    .shift-option.active {
                                        border: 2px solid black;
                                    }

                                    .shift-option:hover {
                                        background-color: #f0f0f0;
                                    }
                                </style>

                                <script>
                                    document.querySelectorAll('.shift-option').forEach(el => {
                                        el.addEventListener('click', function() {
                                            // Hilangkan lingkaran dari semua
                                            document.querySelectorAll('.shift-option').forEach(opt => opt.classList.remove('active'));
                                            // Tambahkan lingkaran pada yang diklik
                                            this.classList.add('active');
                                            // Simpan value ke hidden input
                                            document.getElementById('shiftValue').value = this.dataset.value;
                                            console.log("Shift terpilih:", this.dataset.value);
                                        });
                                    });
                                </script>
                                <td
                                    style="width: 110px; border-left:none !important; border-right:none !important; text-align:right;">
                                    <input type="time" id="timeStart"
                                        style="width:100px; border:none; outline:none; text-align:center;">
                                </td>
                                <td
                                    style="width: 30px; border-left:none !important; border-right:none !important; text-align:center;">

                                </td>
                                <td colspan="4" style="width: 110px; border-left:none !important; text-align:left;">
                                    <input type="time" id="timeEnd"
                                        style="width:100px; border:none; outline:none; text-align:center; visibility:hidden">
                                </td>
                            </tr>
                            {{-- <tr class="textBener">
                                <td style="border-right:none !important">Bahan PP</td>
                                <td style="border-left:none !important; border-right:none !important">
                                    :</td>
                                <td colspan="8" style="border-left:none !important" id="bahan_pp"
                                    contenteditable="true"></td>
                            </tr> --}}
                            <tr class="textBener">
                                <td style="border-right:none !important">Bahan PP</td>
                                <td style="border-left:none !important; border-right:none !important">
                                    :</td>
                                <td style="border-left:none !important; border-right:none !important" id="bahan_pp"
                                    contenteditable="true"></td>
                                <td style="border-right:none !important; text-align:left; border-left:none !important">
                                    Mesin</td>
                                <td style="border-left:none !important; border-right:none !important">
                                    :</td>
                                <td colspan="3" style="border-left:none !important">
                                    <select id="mesin" class="form-select form-select-sm w-100">
                                        <option></option>
                                        @foreach ($listMesin as $d)
                                            <option value="{{ $d->IdMesin }}">
                                                {{ $d->TypeMesin }}
                                            </option>
                                        @endforeach
                                    </select>
                                </td>
                                {{-- <td colspan="3" style="border-left:none !important" id="mesin"
                                    contenteditable="true"></td> --}}
                            </tr>
                            <tr class="textBener">
                                <td style="border-right:none !important">CaCO3</td>
                                <td style="border-left:none !important; border-right:none !important">
                                    :</td>
                                <td style="border-left:none !important; border-right:none !important" id="ca_co3"
                                    contenteditable="true"></td>
                                <td style="border-right:none !important; text-align:left; border-left:none !important">
                                    UV</td>
                                <td style="border-left:none !important; border-right:none !important">
                                    :</td>
                                <td colspan="3" style="border-left:none !important" id="uv"
                                    contenteditable="true"></td>
                            </tr>
                            <tr class="textBener">
                                <td style="border-right:none !important">M. Bath</td>
                                <td style="border-left:none !important; border-right:none !important">
                                    :</td>
                                <td style="border-left:none !important; border-right:none !important" id="m_bath"
                                    contenteditable="true"></td>
                                <td style="border-right:none !important; text-align:left; border-left:none !important">
                                    Lot No.</td>
                                <td style="border-left:none !important; border-right:none !important">
                                    :</td>
                                <td colspan="3" style="border-left:none !important" id="lot_no"
                                    contenteditable="true"></td>
                            </tr>
                            <tr class="textBener">
                                <td style="border-right:none !important">Spek</td>
                                <td style="border-left:none !important; border-right:none !important">
                                    :</td>
                                <td style="border-left:none !important; border-right:none !important" id="spek"
                                    contenteditable="true"></td>
                                <td style="border-right:none !important; text-align:left; border-left:none !important">
                                    Range</td>
                                <td style="border-left:none !important; border-right:none !important">
                                    :</td>
                                <td colspan="3" style="border-left:none !important" id="range"
                                    contenteditable="true"></td>
                            </tr>
                        </table>
                        <table>
                            <tr class="textBener">
                                <th rowspan="2" class="center">Pos</th>
                                <th rowspan="2" class="center">Denier<br>90 mtr</th>
                                <th colspan="2" class="center">Strength</th>
                                <th rowspan="2" class="center">Elo<br>%</th>
                                <th rowspan="2" class="center">Lebar<br>Bng</th>
                                <th rowspan="2" colspan="2" class="center">Keterangan</th>
                            </tr>
                            <tr class="textBener">
                                <th class="center">gr/d</th>
                                <th class="center">kgf</th>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">R12</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r12D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r12G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r12K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r12E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r12L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="r12Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">R11</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r11D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r11G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r11K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r11E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r11L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="r11Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">R10</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r10D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r10G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r10K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r10E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r10L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="r10Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">R9</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r9D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r9G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r9K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r9E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r9L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="r9Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">R8</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r8D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r8G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r8K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r8E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r8L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="r8Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">R7</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r7D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r7G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r7K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r7E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r7L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="r7Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">R6</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r6D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r6G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r6K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r6E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r6L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="r6Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">R5</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r5D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r5G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r5K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r5E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r5L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="r5Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">R4</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r4D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r4G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r4K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r4E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r4L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="r4Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">R3</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r3D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r3G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r3K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r3E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r3L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="r3Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">R2</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r2D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r2G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r2K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r2E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r2L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="r2Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">R1</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r1D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r1G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r1K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r1E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="r1L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="r1Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">L1</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l1D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l1G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l1K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l1E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l1L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="l1Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">L2</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l2D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l2G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l2K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l2E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l2L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="l2Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">L3</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l3D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l3G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l3K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l3E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l3L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="l3Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">L4</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l4D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l4G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l4K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l4E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l4L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="l4Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">L5</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l5D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l5G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l5K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l5E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l5L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="l5Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">L6</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l6D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l6G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l6K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l6E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l6L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="l6Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">L7</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l7D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l7G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l7K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l7E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l7L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="l7Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">L8</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l8D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l8G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l8K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l8E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l8L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="l8Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">L9</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l9D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l9G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l9K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l9E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l9L"></td>
                                <td colspan="2" style="text-align:center" contenteditable="true" id="l9Ket">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">L10</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l10D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l10G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l10K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l10E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l10L"></td>
                                <td style="text-align:center; width: 100px;">QC</td>
                                <td style="text-align:center; width: 100px;">EXT</td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">L11</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l11D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l11G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l11K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l11E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l11L"></td>
                                <td rowspan="2">
                                    <img id="ttd_qc" style="display:none; max-width:70px;">
                                </td>
                                <td rowspan="2">
                                    <img id="ttd_ext" style="display:none; max-width:70px;">
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">L12</td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l12D"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l12G"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l12K"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l12E"></td>
                                <td style="text-align:center" contenteditable="true" class="only-number"
                                    id="l12L"></td>
                            </tr>
                            <tr class="textBener">
                                <td style="text-align:center">Rata2</td>
                                <td style="text-align:center" contenteditable="true" id="rrD"></td>
                                <td style="text-align:center" contenteditable="true" id="rrG"></td>
                                <td style="text-align:center" contenteditable="true" id="rrK"></td>
                                <td style="text-align:center" contenteditable="true" id="rrE"></td>
                                <td style="text-align:center" contenteditable="true" id="rrL"></td>
                                <td style="text-align:center" id="nama_qc"></td>
                                <td style="text-align:center" id="nama_ext"></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <button type="button" id="btn_rata2" class="btn btn-secondary mb-2">
                    Hitung Rata-rata
                </button>
            </div>
        </div>
    </div>
</div>
<script>
    document.getElementById("btn_print").addEventListener("click", function(event) {
        event.preventDefault();

        // Clone elemen agar tampilan asli tidak berubah
        const clone = document.querySelector(".laporan-extruder").cloneNode(true);

        // Salin semua value input ke clone
        const originalInputs = document.querySelectorAll(".laporan-extruder input");
        const cloneInputs = clone.querySelectorAll("input");

        originalInputs.forEach((input, index) => {
            cloneInputs[index].value = input.value;
            cloneInputs[index].setAttribute("value", input.value);

            // Jika checkbox atau radio
            if (input.type === "checkbox" || input.type === "radio") {
                cloneInputs[index].checked = input.checked;

                if (input.checked) {
                    cloneInputs[index].setAttribute("checked", "checked");
                } else {
                    cloneInputs[index].removeAttribute("checked");
                }
            }
        });

        // Salin value textarea
        const originalTextareas = document.querySelectorAll(".laporan-extruder textarea");
        const cloneTextareas = clone.querySelectorAll("textarea");

        originalTextareas.forEach((textarea, index) => {
            cloneTextareas[index].value = textarea.value;
            cloneTextareas[index].textContent = textarea.value;
        });

        // Salin value select
        const originalSelects = document.querySelectorAll(".laporan-extruder select");
        const cloneSelects = clone.querySelectorAll("select");

        originalSelects.forEach((select, index) => {
            cloneSelects[index].value = select.value;

            Array.from(cloneSelects[index].options).forEach(option => {
                option.selected = option.value === select.value;
            });
        });
        
        const cloneMesin = clone.querySelector("#mesin");

        if (cloneMesin) {

            const textMesin = cloneMesin.options[cloneMesin.selectedIndex] ?
                cloneMesin.options[cloneMesin.selectedIndex].text :
                "";

            // hapus tampilan Select2 hasil clone
            const select2Container = cloneMesin.nextElementSibling;

            if (select2Container && select2Container.classList.contains("select2")) {
                select2Container.remove();
            }

            const span = document.createElement("span");
            span.textContent = textMesin;
            span.style.display = "block";
            span.style.textAlign = "left";

            cloneMesin.parentNode.replaceChild(span, cloneMesin);
        }

        let printContent = clone.innerHTML;

        // Buka tab baru
        let printWindow = window.open("", "_blank");

        printWindow.document.write(`
            <html>
            <head>
                <title>Print Laporan</title>
                <style>
                    @page {
                        size: A4 portrait;
                    }

                    body {
                        font-family: "Times New Roman", serif;
                        font-size: 12px;
                        color: #000;
                    }

                    .textBener {
                        font-family: "Times New Roman", serif;
                        font-size: 12px;
                        color: #000;
                    }

                    .container {
                        width: 100%;
                        border: 1px solid #000;
                        padding: 5px;
                        box-sizing: border-box;
                    }

                    table {
                        border-collapse: collapse;
                        width: 100%;
                    }

                    td,
                    th {
                        border: 1px solid #000;
                        padding: 1px 2px;
                        vertical-align: middle;
                    }

                    .no-border td,
                    .no-border th {
                        border: none;
                    }

                    .center {
                        text-align: center;
                    }

                    .right {
                        text-align: right;
                    }

                    .left {
                        text-align: left;
                    }

                    .bold {
                        font-weight: bold;
                    }

                    .section-title {
                        font-weight: bold;
                        text-align: center;
                        margin: 5px 0;
                    }

                    .small-text {
                        font-size: 10px;
                    }

                    .remark {
                        height: 60px;
                    }

                    .signature td {
                        height: 30px;
                    }

                    input,
                    textarea,
                    select {
                        border: none;
                        outline: none;
                        background: transparent;
                    }
                </style>
            </head>
            <body>
                ${printContent}
            </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();

        // Tunggu render selesai
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    });
</script>
