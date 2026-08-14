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
    .laporan-extruderL {
        font-family: "Times New Roman", serif;
        font-size: 15px;
        color: #000;
    }

    .laporan-extruderL .container {
        width: 100%;
        border: 1px solid #000;
        padding: 5px;
        box-sizing: border-box;
    }

    .laporan-extruderL table {
        border-collapse: collapse;
        width: 100%;
    }

    .laporan-extruderL td,
    .laporan-extruderL th {
        border: 1px solid #000;
        padding: 1px 2px;
        vertical-align: middle;
    }

    .laporan-extruderL .no-border td,
    .laporan-extruderL .no-border th {
        border: none;
    }

    .laporan-extruderL .center {
        text-align: center;
    }

    .laporan-extruderL .right {
        text-align: right;
    }

    .laporan-extruderL .bold {
        font-weight: bold;
    }

    .laporan-extruderL .section-title {
        font-weight: bold;
        text-align: center;
        margin: 5px 0;
    }

    .laporan-extruderL .small-text {
        font-size: 15px;
    }

    .laporan-extruderL .remark {
        height: 60px;
    }

    .laporan-extruderL .signature td {
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

    .cacat-item {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
    }

    .kode {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
    }

    .kode.selected {
        border: 2px solid #000;
    }

    .nama {
        user-select: none;
    }
</style>

<div class="modal fade" id="modalLohia" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog custom-modal-width2">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabelL">Preview Laporan Extruder</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                {{-- <button type="button" id="btn_simpanL" class="btn btn-success mb-2">
                    Simpan
                </button> --}}
                <button type="button" id="btn_printD" class="btn btn-success mb-2">
                    Print
                </button>
                <button type="button" id="btn_simpanKetD" class="btn btn-info mb-2">
                    Simpan Keterangan
                </button>

                <body>
                    <div class="laporan-extruderL">
                        <div class="container">
                            <table>
                                <tr>
                                    <td colspan="2" class="bold textBener"
                                        style="border-bottom:none !important; text-align: center; width:400px !important">
                                        PT. KERTA
                                        RAJASA RAYA</td>
                                    <td class="small-text left" style="border-right:none !important">No. Referensi:</td>
                                    <td colspan="4" class="small-text left"
                                        style="width:100px; border-left:none !important" id="referensiD"
                                        contenteditable="true"></td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="textBener"
                                        style="border-top:none !important; border-bottom:none !important; text-align: center;">
                                        Woven Bag /
                                        Jumbo Bag Industrial</td>
                                    <td class="small-text left" style="border-right:none !important">Tanggal:</td>
                                    <td colspan="4" class="small-text left" style="border-left:none !important">
                                        <input class="small-text left" type="date" id="tanggalD"
                                            style="border:none; width:50%; outline:none;">
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="textBener"
                                        style="border-top:none !important; text-align: center;">
                                        fm - 7.5 - 01 - ex - 03 - 02</td>
                                    <td class="small-text left" style="border-right:none !important">Halaman:</td>
                                    <td colspan="4" class="small-text left" style="border-left:none !important"
                                        contenteditable="false" id="halamanD">
                                        1&emsp;Dari&emsp;1</td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="center bold textBener">LAPORAN PRODUKSI EXTRUDER</td>
                                    <td colspan="4" class="center bold textBener">FORM</td>
                                </tr>
                                <tr class="textBener">
                                    <td colspan="4" class="center bold" style="border-right:none !important"></td>
                                    <td colspan="1" class="center bold"
                                        style="border-left:none !important; border-right:none !important; text-align: right;">
                                        Effisiensi :</td>
                                    <td colspan="1" class="center bold"
                                        style="border-left:none !important; width: 100px; text-align: left;"
                                        id="effisiensiD" contenteditable="true"></td>
                                </tr>
                            </table>
                            <table>
                                <tr class="textBener">
                                    <td style="width: 100px; border-right:none !important">Shift / Time</td>
                                    <td style="width: 5px; border-left:none !important; border-right:none !important">:
                                    </td>
                                    <td
                                        style="border-left:none !important; border-right:none !important; text-align:center;">
                                        <div id="shiftSelector"
                                            style="display:inline-flex; gap:8px; font-weight:bold; cursor:pointer;">
                                            <span class="shift-optionD" data-value="A">A</span> /
                                            <span class="shift-optionD" data-value="B">B</span> /
                                            <span class="shift-optionD" data-value="C">C</span> /
                                            <span class="shift-optionD" data-value="D">D</span>
                                        </div>
                                        <input type="hidden" id="shiftValueD" name="shiftValueD">
                                    </td>

                                    <style>
                                        .shift-optionD {
                                            display: inline-block;
                                            width: 22px;
                                            height: 22px;
                                            text-align: center;
                                            line-height: 20px;
                                            border-radius: 50%;
                                            transition: 0.2s;
                                        }

                                        .shift-optionD.active {
                                            border: 2px solid black;
                                        }

                                        .shift-optionD:hover {
                                            background-color: #f0f0f0;
                                        }
                                    </style>

                                    <script>
                                        document.querySelectorAll('.shift-optionD').forEach(el => {
                                            el.addEventListener('click', function() {
                                                // Hilangkan lingkaran dari semua
                                                document.querySelectorAll('.shift-optionD').forEach(opt => opt.classList.remove('active'));
                                                // Tambahkan lingkaran pada yang diklik
                                                this.classList.add('active');
                                                // Simpan value ke hidden input
                                                document.getElementById('shiftValueD').value = this.dataset.value;
                                                console.log("Shift terpilih:", this.dataset.value);
                                            });
                                        });
                                    </script>
                                    <td
                                        style="width: 110px; border-left:none !important; border-right:none !important; text-align:right;">
                                        <input type="time" id="timeStartD"
                                            style="width:100px; border:none; outline:none; text-align:center;">
                                    </td>
                                    <td
                                        style="width: 30px; border-left:none !important; border-right:none !important; text-align:center;">
                                        s/d
                                    </td>
                                    <td style="width: 110px; border-left:none !important; text-align:left;">
                                        <input type="time" id="timeEndD"
                                            style="width:100px; border:none; outline:none; text-align:center;">
                                    </td>
                                    <td style="text-align: center; width: 120px">QC</td>
                                    <td style="text-align: center; width: 120px">SPV. QC</td>
                                </tr>
                                <tr class="textBener">
                                    <td style="border-right:none !important">Spec. of Machine</td>
                                    <td style="border-left:none !important; border-right:none !important">:</td>
                                    <td colspan="4" style="border-left:none !important" id="spek_mesinD"
                                        contenteditable="true"></td>
                                    {{-- <td class="center bold" style="width:120px; border:none !important">
                                        <img id="ttd_satpam" style="display:none; max-width:200px;">
                                    </td> --}}
                                    <td rowspan="2"
                                        style="border-bottom:none !important; text-align:center !important; vertical-align:middle !important;">
                                        <span id="ttd_qcD"
                                            style="display:block; width:100%; text-align:center !important;">
                                        </span>
                                    </td>
                                    <td rowspan="2" style="border-bottom:none !important">
                                        <img id="ttd_spvqcD" style="display:none; max-width:70px;">
                                    </td>
                                </tr>
                                <tr class="textBener">
                                    <td style="border-right:none !important">Spec. of Yarn</td>
                                    <td style="border-left:none !important; border-right:none !important">:</td>
                                    <td colspan="4" style="border-left:none !important" id="spek_benangD"
                                        contenteditable="true"></td>
                                    {{-- <td style="border-top:none !important"></td>
                                    <td style="border-top:none !important"></td>
                                    <td style="border-top:none !important"></td> --}}
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <th colspan="2">Time</th>
                                    <th class="center small-text" id="timeAD" contenteditable="true"
                                        style="width:120px; "></th>
                                    <th class="center small-text" id="timeBD" contenteditable="true"
                                        style="width:120px"></th>
                                    <th class="center small-text" id="timeCD" contenteditable="true"
                                        style="width:120px"></th>
                                    <th class="center small-text" id="timeDD" contenteditable="true"
                                        style="width:120px"></th>
                                    <th class="center small-text" id="timeED" contenteditable="true"
                                        style="width:120px"></th>
                                    <th class="center small-text" id="timeFD" contenteditable="true"
                                        style="width:120px"></th>
                                </tr>
                                <tr>
                                    <th colspan="2">Zone Temp</th>
                                    <th class="center small-text" id="zoneAD" style="width:100px">Set (= °C)</th>
                                    <th class="center small-text" id="zoneBD" style="width:100px">ACT (= °C)</th>
                                    <th class="center small-text" id="zoneCD" style="width:100px">Set (= °C)</th>
                                    <th class="center small-text" id="zoneDD" style="width:100px">ACT (= °C)</th>
                                    <th class="center small-text" id="zoneED" style="width:100px">Set (= °C)</th>
                                    <th class="center small-text" id="zoneFD" style="width:100px">ACT (= °C)</th>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important"></td>
                                    <td style="width: 70px">1</td>
                                    <td class="center small-text" id="bz1AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="bz1BD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz1CD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz1DD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz1ED" contenteditable="true"></td>
                                    <td class="center small-text" id="bz1FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important; border-top:none !important;"></td>
                                    <td>2</td>
                                    <td class="center small-text" id="bz2AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="bz2BD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz2CD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz2DD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz2ED" contenteditable="true"></td>
                                    <td class="center small-text" id="bz2FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important;">
                                        Barrel Zone</td>
                                    <td>3</td>
                                    <td class="center small-text" id="bz3AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="bz3BD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz3CD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz3DD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz3ED" contenteditable="true"></td>
                                    <td class="center small-text" id="bz3FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important; border-top:none !important;">( °C )</td>
                                    <td>4</td>
                                    <td class="center small-text" id="bz4AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="bz4BD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz4CD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz4DD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz4ED" contenteditable="true"></td>
                                    <td class="center small-text" id="bz4FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important; border-top:none !important;"></td>
                                    <td>5</td>
                                    <td class="center small-text" id="bz5AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="bz5BD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz5CD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz5DD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz5ED" contenteditable="true"></td>
                                    <td class="center small-text" id="bz5FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important; border-top:none !important;"></td>
                                    <td>6</td>
                                    <td class="center small-text" id="bz6AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="bz6BD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz6CD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz6DD" contenteditable="true"></td>
                                    <td class="center small-text" id="bz6ED" contenteditable="true"></td>
                                    <td class="center small-text" id="bz6FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-right:none !important;">
                                        Scr Changer</td>
                                    <td style="border-left:none !important; border-bottom:none !important;">
                                        ( °C )</td>
                                    <td class="center small-text" id="scAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="scBD" contenteditable="true"></td>
                                    <td class="center small-text" id="scCD" contenteditable="true"></td>
                                    <td class="center small-text" id="scDD" contenteditable="true"></td>
                                    <td class="center small-text" id="scED" contenteditable="true"></td>
                                    <td class="center small-text" id="scFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Melt Pump</td>
                                    <td
                                        style="border-left:none !important; border-top:none !important; border-bottom:none !important;">
                                        ( °C )</td>
                                    <td class="center small-text" id="mpAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="mpBD" contenteditable="true"></td>
                                    <td class="center small-text" id="mpCD" contenteditable="true"></td>
                                    <td class="center small-text" id="mpDD" contenteditable="true"></td>
                                    <td class="center small-text" id="mpED" contenteditable="true"></td>
                                    <td class="center small-text" id="mpFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Adaptor 1</td>
                                    <td
                                        style="border-left:none !important; border-top:none !important; border-bottom:none !important;">
                                        ( °C )</td>
                                    <td class="center small-text" id="ad1AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="ad1BD" contenteditable="true"></td>
                                    <td class="center small-text" id="ad1CD" contenteditable="true"></td>
                                    <td class="center small-text" id="ad1DD" contenteditable="true"></td>
                                    <td class="center small-text" id="ad1ED" contenteditable="true"></td>
                                    <td class="center small-text" id="ad1FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Adaptor 2</td>
                                    <td
                                        style="border-left:none !important; border-top:none !important; border-bottom:none !important;">
                                        ( °C )</td>
                                    <td class="center small-text" id="ad2AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="ad2BD" contenteditable="true"></td>
                                    <td class="center small-text" id="ad2CD" contenteditable="true"></td>
                                    <td class="center small-text" id="ad2DD" contenteditable="true"></td>
                                    <td class="center small-text" id="ad2ED" contenteditable="true"></td>
                                    <td class="center small-text" id="ad2FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-right:none !important;">
                                        Waterbath PHE</td>
                                    <td style="border-left:none !important; border-bottom:none !important;">
                                        ( °C )</td>
                                    <td class="center small-text" id="wpheAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="wpheBD" contenteditable="true"></td>
                                    <td class="center small-text" id="wpheCD" contenteditable="true"></td>
                                    <td class="center small-text" id="wpheDD" contenteditable="true"></td>
                                    <td class="center small-text" id="wpheED" contenteditable="true"></td>
                                    <td class="center small-text" id="wpheFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        ISU PHE</td>
                                    <td
                                        style="border-left:none !important; border-top:none !important; border-bottom:none !important;">
                                        ( °C )</td>
                                    <td class="center small-text" id="ipheAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="ipheBD" contenteditable="true"></td>
                                    <td class="center small-text" id="ipheCD" contenteditable="true"></td>
                                    <td class="center small-text" id="ipheDD" contenteditable="true"></td>
                                    <td class="center small-text" id="ipheED" contenteditable="true"></td>
                                    <td class="center small-text" id="ipheFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Melt Temp</td>
                                    <td style="border-left:none !important; border-top:none !important;">( °C )</td>
                                    <td class="center small-text" id="mtAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="mtBD" contenteditable="true"></td>
                                    <td class="center small-text" id="mtCD" contenteditable="true"></td>
                                    <td class="center small-text" id="mtDD" contenteditable="true"></td>
                                    <td class="center small-text" id="mtED" contenteditable="true"></td>
                                    <td class="center small-text" id="mtFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important"></td>
                                    <td>1</td>
                                    <td class="center small-text" id="dz1AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="dz1BD" contenteditable="true"></td>
                                    <td class="center small-text" id="dz1CD" contenteditable="true"></td>
                                    <td class="center small-text" id="dz1DD" contenteditable="true"></td>
                                    <td class="center small-text" id="dz1ED" contenteditable="true"></td>
                                    <td class="center small-text" id="dz1FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important; border-top:none !important;"></td>
                                    <td>2</td>
                                    <td class="center small-text" id="dz2AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="dz2BD" contenteditable="true"></td>
                                    <td class="center small-text" id="dz2CD" contenteditable="true"></td>
                                    <td class="center small-text" id="dz2DD" contenteditable="true"></td>
                                    <td class="center small-text" id="dz2ED" contenteditable="true"></td>
                                    <td class="center small-text" id="dz2FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important;">
                                        Die Zone</td>
                                    <td>3</td>
                                    <td class="center small-text" id="dz3AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="dz3BD" contenteditable="true"></td>
                                    <td class="center small-text" id="dz3CD" contenteditable="true"></td>
                                    <td class="center small-text" id="dz3DD" contenteditable="true"></td>
                                    <td class="center small-text" id="dz3ED" contenteditable="true"></td>
                                    <td class="center small-text" id="dz3FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important; border-top:none !important;">( °C )</td>
                                    <td>4</td>
                                    <td class="center small-text" id="dz4AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="dz4BD" contenteditable="true"></td>
                                    <td class="center small-text" id="dz4CD" contenteditable="true"></td>
                                    <td class="center small-text" id="dz4DD" contenteditable="true"></td>
                                    <td class="center small-text" id="dz4ED" contenteditable="true"></td>
                                    <td class="center small-text" id="dz4FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="border-bottom:none !important; border-top:none !important;"></td>
                                    <td>5</td>
                                    <td class="center small-text" id="dz5AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="dz5BD" contenteditable="true"></td>
                                    <td class="center small-text" id="dz5CD" contenteditable="true"></td>
                                    <td class="center small-text" id="dz5DD" contenteditable="true"></td>
                                    <td class="center small-text" id="dz5ED" contenteditable="true"></td>
                                    <td class="center small-text" id="dz5FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-right:none !important;">
                                        HAO (Hot Air Oven)</td>
                                    <td style="border-left:none !important; border-bottom:none !important;">( °C )</td>
                                    <td class="center small-text" id="haoAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="haoBD" contenteditable="true"></td>
                                    <td class="center small-text" id="haoCD" contenteditable="true"></td>
                                    <td class="center small-text" id="haoDD" contenteditable="true"></td>
                                    <td class="center small-text" id="haoED" contenteditable="true"></td>
                                    <td class="center small-text" id="haoFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td colspan="2" class="bold"
                                        style="width: 150px; text-align: center; border-bottom:none !important;">
                                        Unit</td>
                                    <td class="center small-text" id="unitAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="unitBD" contenteditable="true"></td>
                                    <td class="center small-text" id="unitCD" contenteditable="true"></td>
                                    <td class="center small-text" id="unitDD" contenteditable="true"></td>
                                    <td class="center small-text" id="unitED" contenteditable="true"></td>
                                    <td class="center small-text" id="unitFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-right:none !important;">
                                        Melt Pump</td>
                                    <td style="border-left:none !important; border-bottom:none !important;">( Rpm )
                                    </td>
                                    <td class="center small-text" id="mp2AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="mp2BD" contenteditable="true"></td>
                                    <td class="center small-text" id="mp2CD" contenteditable="true"></td>
                                    <td class="center small-text" id="mp2DD" contenteditable="true"></td>
                                    <td class="center small-text" id="mp2ED" contenteditable="true"></td>
                                    <td class="center small-text" id="mp2FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Extruder</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        ( Rpm )</td>
                                    <td class="center small-text" id="extAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="extBD" contenteditable="true"></td>
                                    <td class="center small-text" id="extCD" contenteditable="true"></td>
                                    <td class="center small-text" id="extDD" contenteditable="true"></td>
                                    <td class="center small-text" id="extED" contenteditable="true"></td>
                                    <td class="center small-text" id="extFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        NIP Roller</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        ( m/min )</td>
                                    <td class="center small-text" id="niprAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="niprBD" contenteditable="true"></td>
                                    <td class="center small-text" id="niprCD" contenteditable="true"></td>
                                    <td class="center small-text" id="niprDD" contenteditable="true"></td>
                                    <td class="center small-text" id="niprED" contenteditable="true"></td>
                                    <td class="center small-text" id="niprFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Top Roller</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        ( m/min )</td>
                                    <td class="center small-text" id="trAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="trBD" contenteditable="true"></td>
                                    <td class="center small-text" id="trCD" contenteditable="true"></td>
                                    <td class="center small-text" id="trDD" contenteditable="true"></td>
                                    <td class="center small-text" id="trED" contenteditable="true"></td>
                                    <td class="center small-text" id="trFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Holding Unit</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        ( m/min )</td>
                                    <td class="center small-text" id="huAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="huBD" contenteditable="true"></td>
                                    <td class="center small-text" id="huCD" contenteditable="true"></td>
                                    <td class="center small-text" id="huDD" contenteditable="true"></td>
                                    <td class="center small-text" id="huED" contenteditable="true"></td>
                                    <td class="center small-text" id="huFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Intermediete Stretching Unit</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        ( m/min )</td>
                                    <td class="center small-text" id="isuAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="isuBD" contenteditable="true"></td>
                                    <td class="center small-text" id="isuCD" contenteditable="true"></td>
                                    <td class="center small-text" id="isuDD" contenteditable="true"></td>
                                    <td class="center small-text" id="isuED" contenteditable="true"></td>
                                    <td class="center small-text" id="isuFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Stretching Unit</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        ( Times )</td>
                                    <td class="center small-text" id="suAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="suBD" contenteditable="true"></td>
                                    <td class="center small-text" id="suCD" contenteditable="true"></td>
                                    <td class="center small-text" id="suDD" contenteditable="true"></td>
                                    <td class="center small-text" id="suED" contenteditable="true"></td>
                                    <td class="center small-text" id="suFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Pre-Annealing Unit</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        ( m/min )</td>
                                    <td class="center small-text" id="pauAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="pauBD" contenteditable="true"></td>
                                    <td class="center small-text" id="pauCD" contenteditable="true"></td>
                                    <td class="center small-text" id="pauDD" contenteditable="true"></td>
                                    <td class="center small-text" id="pauED" contenteditable="true"></td>
                                    <td class="center small-text" id="pauFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Annealing Unit</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        ( m/min )</td>
                                    <td class="center small-text" id="auAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="auBD" contenteditable="true"></td>
                                    <td class="center small-text" id="auCD" contenteditable="true"></td>
                                    <td class="center small-text" id="auDD" contenteditable="true"></td>
                                    <td class="center small-text" id="auED" contenteditable="true"></td>
                                    <td class="center small-text" id="auFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Water Gap</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        ( mm )</td>
                                    <td class="center small-text" id="wgAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="wgBD" contenteditable="true"></td>
                                    <td class="center small-text" id="wgCD" contenteditable="true"></td>
                                    <td class="center small-text" id="wgDD" contenteditable="true"></td>
                                    <td class="center small-text" id="wgED" contenteditable="true"></td>
                                    <td class="center small-text" id="wgFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Film Effective Width</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        ( mm )</td>
                                    <td class="center small-text" id="fewAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="fewBD" contenteditable="true"></td>
                                    <td class="center small-text" id="fewCD" contenteditable="true"></td>
                                    <td class="center small-text" id="fewDD" contenteditable="true"></td>
                                    <td class="center small-text" id="fewED" contenteditable="true"></td>
                                    <td class="center small-text" id="fewFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        No. of Yarn</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        ( Pcs )</td>
                                    <td class="center small-text" id="noyAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="noyBD" contenteditable="true"></td>
                                    <td class="center small-text" id="noyCD" contenteditable="true"></td>
                                    <td class="center small-text" id="noyDD" contenteditable="true"></td>
                                    <td class="center small-text" id="noyED" contenteditable="true"></td>
                                    <td class="center small-text" id="noyFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Silter Width</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                        ( mm )</td>
                                    <td class="center small-text" id="swAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="swBD" contenteditable="true"></td>
                                    <td class="center small-text" id="swCD" contenteditable="true"></td>
                                    <td class="center small-text" id="swDD" contenteditable="true"></td>
                                    <td class="center small-text" id="swED" contenteditable="true"></td>
                                    <td class="center small-text" id="swFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Total Ratio</td>
                                    <td
                                        style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                                    </td>
                                    <td class="center small-text" id="totrAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="totrBD" contenteditable="true"></td>
                                    <td class="center small-text" id="totrCD" contenteditable="true"></td>
                                    <td class="center small-text" id="totrDD" contenteditable="true"></td>
                                    <td class="center small-text" id="totrED" contenteditable="true"></td>
                                    <td class="center small-text" id="totrFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                                        Relax</td>
                                    <td style="border-left:none !important; border-top:none !important;">( % )</td>
                                    <td class="center small-text" id="relaxAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="relaxBD" contenteditable="true"></td>
                                    <td class="center small-text" id="relaxCD" contenteditable="true"></td>
                                    <td class="center small-text" id="relaxDD" contenteditable="true"></td>
                                    <td class="center small-text" id="relaxED" contenteditable="true"></td>
                                    <td class="center small-text" id="relaxFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="width: 150px; text-align: left; border-bottom:none !important;">
                                    </td>
                                    <td>P2</td>
                                    <td class="center small-text" id="tp2AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="tp2BD" contenteditable="true"></td>
                                    <td class="center small-text" id="tp2CD" contenteditable="true"></td>
                                    <td class="center small-text" id="tp2DD" contenteditable="true"></td>
                                    <td class="center small-text" id="tp2ED" contenteditable="true"></td>
                                    <td class="center small-text" id="tp2FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important;">
                                        Transduces</td>
                                    <td>P1</td>
                                    <td class="center small-text" id="tp1AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="tp1BD" contenteditable="true"></td>
                                    <td class="center small-text" id="tp1CD" contenteditable="true"></td>
                                    <td class="center small-text" id="tp1DD" contenteditable="true"></td>
                                    <td class="center small-text" id="tp1ED" contenteditable="true"></td>
                                    <td class="center small-text" id="tp1FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important;">
                                    </td>
                                    <td>P3</td>
                                    <td class="center small-text" id="tp3AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="tp3BD" contenteditable="true"></td>
                                    <td class="center small-text" id="tp3CD" contenteditable="true"></td>
                                    <td class="center small-text" id="tp3DD" contenteditable="true"></td>
                                    <td class="center small-text" id="tp3ED" contenteditable="true"></td>
                                    <td class="center small-text" id="tp3FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-right:none !important;">
                                        1. Annealing Temp</td>
                                    <td style="border-left:none !important; border-bottom:none !important;">( °C )</td>
                                    <td class="center small-text" id="at1AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="at1BD" contenteditable="true"></td>
                                    <td class="center small-text" id="at1CD" contenteditable="true"></td>
                                    <td class="center small-text" id="at1DD" contenteditable="true"></td>
                                    <td class="center small-text" id="at1ED" contenteditable="true"></td>
                                    <td class="center small-text" id="at1FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-right:none !important;">
                                        2. Annealing Temp</td>
                                    <td style="border-left:none !important; border-bottom:none !important;">( °C )
                                    </td>
                                    <td class="center small-text" id="at2AD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="at2BD" contenteditable="true"></td>
                                    <td class="center small-text" id="at2CD" contenteditable="true"></td>
                                    <td class="center small-text" id="at2DD" contenteditable="true"></td>
                                    <td class="center small-text" id="at2ED" contenteditable="true"></td>
                                    <td class="center small-text" id="at2FD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-right:none !important;">
                                        Tebal Film</td>
                                    <td style="border-left:none !important; border-bottom:none !important;"></td>
                                    <td class="center small-text" id="tfAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="tfBD" contenteditable="true"></td>
                                    <td class="center small-text" id="tfCD" contenteditable="true"></td>
                                    <td class="center small-text" id="tfDD" contenteditable="true"></td>
                                    <td class="center small-text" id="tfED" contenteditable="true"></td>
                                    <td class="center small-text" id="tfFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td
                                        style="width: 150px; text-align: left; border-bottom:none !important; border-right:none !important;">
                                        Lebar Dielips</td>
                                    <td style="border-left:none !important;"></td>
                                    <td class="center small-text" id="ldAD" contenteditable="true"
                                        style=""></td>
                                    <td class="center small-text" id="ldBD" contenteditable="true"></td>
                                    <td class="center small-text" id="ldCD" contenteditable="true"></td>
                                    <td class="center small-text" id="ldDD" contenteditable="true"></td>
                                    <td class="center small-text" id="ldED" contenteditable="true"></td>
                                    <td class="center small-text" id="ldFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td class="bold">T I M E</td>
                                    <td colspan="8" class="bold">R E M A R K</td>
                                </tr>
                                <tr class="center small-text">
                                    <td class="center small-text" id="time1D" contenteditable="true">&nbsp;
                                    </td>
                                    <td colspan="8" class="small-text" id="remark1D"
                                        style="text-align: left" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td class="center small-text" id="time2D" contenteditable="true">&nbsp;
                                    </td>
                                    <td colspan="8" class="small-text" id="remark2D"
                                        style="text-align: left" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td class="center small-text" id="time3D" contenteditable="true">&nbsp;
                                    </td>
                                    <td colspan="8" class="small-text" id="remark3D"
                                        style="text-align: left" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td class="center small-text" id="time4D" contenteditable="true">&nbsp;
                                    </td>
                                    <td colspan="8" class="small-text" id="remark4D"
                                        style="text-align: left" contenteditable="true"></td>
                                </tr>
                            </table>
                            <table>
                                <tr class="textBener">
                                    <td rowspan="2" class="bold" style="text-align: center; width: 50px;">
                                        BAHAN
                                    </td>
                                    <td colspan="4" class="bold" style="text-align: center">SPEK :</td>
                                    <td rowspan="2" class="bold" style="text-align: center; width: 50px;">Kwh
                                        Meter</td>
                                    <td style="text-align: center; width: 80px;" class="small-text" id="kwhM1D"
                                        contenteditable="true"></td>
                                    <td style="text-align: center; width: 50px;">Jam Prod</td>
                                </tr>
                                <tr class="center small-text">
                                    <td style="width: 100px">Trade Mark</td>
                                    <td style="width: 100px">Kode</td>
                                    <td style="width: 100px">Lot number</td>
                                    <td style="width: 100px">Kg</td>
                                    <td class="small-text" id="kwhM2D" contenteditable="true"></td>
                                    <td class="small-text" id="jamProdD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td>P . P</td>
                                    <td id="ppAD" style="text-align: left" contenteditable="true"></td>
                                    <td id="ppBD" style="text-align: left" contenteditable="true"></td>
                                    <td id="ppCD" style="text-align: left" contenteditable="true"></td>
                                    <td id="ppDD" style="text-align: left" contenteditable="true"></td>
                                    <td colspan="2">Umur Sarangan</td>
                                    <td>Umur Silet</td>
                                </tr>
                                <tr class="center small-text">
                                    <td>CaCO3</td>
                                    <td id="cacAD" style="text-align: left" contenteditable="true"></td>
                                    <td id="cacBD" style="text-align: left" contenteditable="true"></td>
                                    <td id="cacCD" style="text-align: left" contenteditable="true"></td>
                                    <td id="cacDD" style="text-align: left" contenteditable="true"></td>
                                    <td style="text-align: left; border-right:none !important;">P1 =</td>
                                    <td style="border-left:none !important;" id="cacED"
                                        contenteditable="true"> /
                                    </td>
                                    <td id="cacFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td id="mbATD" contenteditable="true">M . B</td>
                                    <td id="mbAD" style="text-align: left" contenteditable="true"></td>
                                    <td id="mbBD" style="text-align: left" contenteditable="true"></td>
                                    <td id="mbCD" style="text-align: left" contenteditable="true"></td>
                                    <td id="mbDD" style="text-align: left" contenteditable="true"></td>
                                    <td style="text-align: left; border-right:none !important;">P2 =</td>
                                    <td style="border-left:none !important;" id="mbED"
                                        contenteditable="true"> /
                                    </td>
                                    <td id="mbFD" contenteditable="true"></td>
                                </tr>
                                <tr class="center small-text">
                                    <td id="uvATD" contenteditable="true">U . V</td>
                                    <td id="uvAD" style="text-align: left" contenteditable="true"></td>
                                    <td id="uvBD" style="text-align: left" contenteditable="true"></td>
                                    <td id="uvCD" style="text-align: left" contenteditable="true"></td>
                                    <td id="uvDD" style="text-align: left" contenteditable="true"></td>
                                    <td style="text-align: left; border-right:none !important;">N . G -)</td>
                                    <td style="border-right:none !important; border-left:none !important;"
                                        id="uvED" contenteditable="true"></td>
                                    <td style="border-left:none !important;" id="uvFD"
                                        contenteditable="true">
                                        =&emsp;&emsp;&emsp;krj</td>
                                </tr>
                                <tr class="center small-text">
                                    <td id="asbATD" contenteditable="true">A . S</td>
                                    <td id="asbAD" style="text-align: left" contenteditable="true"></td>
                                    <td id="asbBD" style="text-align: left" contenteditable="true"></td>
                                    <td id="asbCD" style="text-align: left" contenteditable="true"></td>
                                    <td id="asbDD" style="text-align: left" contenteditable="true"></td>
                                    <td style="text-align: left; border-right:none !important;">&emsp;&emsp;&nbsp; -)
                                    </td>
                                    <td style="border-right:none !important; border-left:none !important;"
                                        id="asbED" contenteditable="true"></td>
                                    <td style="border-left:none !important;" id="asbFD"
                                        contenteditable="true">
                                        =&emsp;&emsp;&emsp;krj</td>
                                </tr>
                                <tr class="center small-text">
                                    <td id="llATD" contenteditable="true">Lain-lain</td>
                                    <td id="llAD" style="text-align: left" contenteditable="true"></td>
                                    <td id="llBD" style="text-align: left" contenteditable="true"></td>
                                    <td id="llCD" style="text-align: left" contenteditable="true"></td>
                                    <td id="llDD" style="text-align: left" contenteditable="true"></td>
                                    <td colspan="3" id="llFD" style="text-align: left"
                                        contenteditable="true">
                                    </td>
                                </tr>
                            </table>
                            <table>
                                <tr class="center bold textBener">
                                    <td colspan="3">MANUSIA</td>
                                    <td colspan="3">LISTRIK</td>
                                    <td colspan="3">MESIN</td>
                                    <td colspan="3">GANTI BENANG</td>
                                    <td colspan="3">LAIN-LAIN</td>
                                    <td rowspan="2">TOTAL</td>
                                </tr>
                                <tr class="center small-text">
                                    <td>Bng</td>
                                    <td>Prong</td>
                                    <td>Sil</td>
                                    <td>Bng</td>
                                    <td>Prong</td>
                                    <td>Sil</td>
                                    <td>Bng</td>
                                    <td>Prong</td>
                                    <td>Sil</td>
                                    <td>Bng</td>
                                    <td>Prong</td>
                                    <td>Sil</td>
                                    <td>Bng</td>
                                    <td>Prong</td>
                                    <td>Sil</td>
                                </tr>
                                <tr class="center small-text">
                                    <td id="bngMD" style="width: 40px" contenteditable="true">&nbsp;</td>
                                    <td id="prongMD" style="width: 40px" contenteditable="true"></td>
                                    <td id="silMD" style="width: 40px" contenteditable="true"></td>
                                    <td id="bngLD" style="width: 40px" contenteditable="true"></td>
                                    <td id="prongLD" style="width: 40px" contenteditable="true"></td>
                                    <td id="silLD" style="width: 40px" contenteditable="true"></td>
                                    <td id="bngMeD" style="width: 40px" contenteditable="true"></td>
                                    <td id="prongMeD" style="width: 40px" contenteditable="true"></td>
                                    <td id="silMeD" style="width: 40px" contenteditable="true"></td>
                                    <td id="bngGBD" style="width: 40px" contenteditable="true"></td>
                                    <td id="prongGBD" style="width: 40px" contenteditable="true"></td>
                                    <td id="silGBD" style="width: 40px" contenteditable="true"></td>
                                    <td id="bngLLD" style="width: 40px" contenteditable="true"></td>
                                    <td id="prongLLD" style="width: 40px" contenteditable="true"></td>
                                    <td id="silLLD" style="width: 40px" contenteditable="true"></td>
                                    <td id="totalD" style="width: 50px" contenteditable="true"></td>
                                </tr>
                                <tr class="left small-text">
                                    <td style="width: 40px" id="ketHeadD">
                                        Keterangan</td>
                                    <td colspan="15" id="keteranganD" style="width: 40px"
                                        contenteditable="true">
                                        &nbsp;</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </body>
            </div>
        </div>
    </div>
</div>
<script>
    document.getElementById("btn_printD").addEventListener("click", function(event) {
        event.preventDefault();

        // Clone elemen agar tampilan asli tidak berubah
        const clone = document.querySelector(".laporan-extruderL").cloneNode(true);

        // Salin semua value input ke clone
        const originalInputs = document.querySelectorAll(".laporan-extruderL input");
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
        const originalTextareas = document.querySelectorAll(".laporan-extruderL textarea");
        const cloneTextareas = clone.querySelectorAll("textarea");

        originalTextareas.forEach((textarea, index) => {
            cloneTextareas[index].value = textarea.value;
            cloneTextareas[index].textContent = textarea.value;
        });

        // Salin value select
        const originalSelects = document.querySelectorAll(".laporan-extruderL select");
        const cloneSelects = clone.querySelectorAll("select");

        originalSelects.forEach((select, index) => {
            cloneSelects[index].value = select.value;

            Array.from(cloneSelects[index].options).forEach(option => {
                option.selected = option.value === select.value;
            });
        });

        let printContent = clone.outerHTML;

        // Buka tab baru
        let printWindow = window.open("", "_blank");

        printWindow.document.write(`
            <html>
            <head>
                <title>Print Laporan</title>
                <style>
                    @page {
                        size: A4 portrait;
                        margin: 1mm;
                    }

                    body {
                        font-family: "Times New Roman", serif;
                        font-size: 12px;
                        color: #000;
                    }

                    .textBener {
                        font-family: "Times New Roman", serif;
                        font-size: 15px;
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
                        font-size: 15px;
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
        printWindow.onload = function() {
            setTimeout(() => {
                printWindow.focus();
                printWindow.print();
            }, 1000);
        };
    });
</script>
