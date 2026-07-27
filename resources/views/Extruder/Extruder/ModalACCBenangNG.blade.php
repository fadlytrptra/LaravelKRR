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

<div class="modal fade" id="modalLaporan" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog custom-modal-width2">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">Preview Laporan Benang "NG"</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <button type="button" id="btn_simpan" class="btn btn-primary mb-2">
                    Simpan Sortir & Supply
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
                                    <input class="small-text left" type="date" id="tanggal_lap"
                                        style="border:none; width:50%; outline:none;">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="textBener"
                                    style="border-top:none !important; text-align: center;">
                                    FM - 8.2 - 03 - QC - 00 - 01</td>
                                <td class="small-text left" style="border-right:none !important">
                                    Halaman:</td>
                                <td colspan="4" class="small-text left" style="border-left:none !important"
                                    contenteditable="true" id="halaman">
                                    1&emsp;Dari&emsp;1</td>
                            </tr>
                            <tr>
                                <td colspan="2" class="center bold textBener">LAPORAN BENANG "NG"</td>
                                <td colspan="4" class="center bold textBener">DIVISI EXTRUDER</td>
                            </tr>
                        </table>
                        <table>
                            <tr class="textBener">
                                <td style="width: 100px; border-right:none !important">Shift / Jam Prod
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
                                <td style="border-right:none !important">No Mesin</td>
                                <td style="border-left:none !important; border-right:none !important">
                                    :</td>
                                <td style="border-left:none !important; border-right:none !important" id="mesin_lap"
                                    contenteditable="true"></td>
                                <td style="border-right:none !important; text-align:left; border-left:none !important">
                                    Spek Bng</td>
                                <td style="border-left:none !important; border-right:none !important">
                                    :</td>
                                <td colspan="3" style="border-left:none !important;" id="spek_benang_lap"
                                    contenteditable="true"></td>
                            </tr>
                            <tr class="textBener">
                                <td style="border-right:none !important">Jumlah</td>
                                <td style="border-left:none !important; border-right:none !important">
                                    :</td>
                                <td style="border-left:none !important; border-right:none !important" id="jumlah_lap"
                                    contenteditable="true"></td>
                                <td style="border-right:none !important; text-align:left; border-left:none !important">
                                    Keterangan</td>
                                <td style="border-left:none !important; border-right:none !important">
                                    :</td>
                                <td colspan="3" style="border-left:none !important" id="keterangan_lap"
                                    contenteditable="true"></td>
                            </tr>
                            <tr>
                                <td colspan="8" style="padding:8px;">
                                    <table style="width:100%; border:none !important;">
                                        <tr>
                                            <td style="width:33%; border:none !important;">
                                                <div class="cacat-item" data-field="kel_samping">
                                                    <span class="kode">1.</span>
                                                    <span class="nama">Kel. Samping</span>
                                                </div>
                                            </td>

                                            <td style="width:33%; border:none !important;">
                                                <div class="cacat-item" data-field="tipis">
                                                    <span class="kode">6.</span>
                                                    <span class="nama">Tipis</span>
                                                </div>
                                            </td>

                                            <td style="width:33%; border:none !important;">
                                                <div class="cacat-item" data-field="trial_warna">
                                                    <span class="kode">B.</span>
                                                    <span class="nama">Trial Warna</span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="border:none !important;">
                                                <div class="cacat-item" data-field="bendol">
                                                    <span class="kode">2.</span>
                                                    <span class="nama">Bendol-Bendol</span>
                                                </div>
                                            </td>

                                            <td style="border:none !important;">
                                                <div class="cacat-item" data-field="besar">
                                                    <span class="kode">7.</span>
                                                    <span class="nama">Besar</span>
                                                </div>
                                            </td>

                                            <td style="border:none !important;">
                                                <div class="cacat-item" data-field="pinggitan">
                                                    <span class="kode">C.</span>
                                                    <span class="nama">Pinggiran</span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="border:none !important;">
                                                <div class="cacat-item" data-field="tebal">
                                                    <span class="kode">3.</span>
                                                    <span class="nama">Tebal</span>
                                                </div>
                                            </td>

                                            <td style="border:none !important;">
                                                <div class="cacat-item" data-field="kecil">
                                                    <span class="kode">8.</span>
                                                    <span class="nama">Kecil</span>
                                                </div>
                                            </td>

                                            <td style="border:none !important;">
                                                <div class="cacat-item" data-field="st_jelek">
                                                    <span class="kode">D.</span>
                                                    <span class="nama">ST Jelek</span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="border:none !important;">
                                                <div class="cacat-item" data-field="nglinting">
                                                    <span class="kode">4.</span>
                                                    <span class="nama">Nglinting</span>
                                                </div>
                                            </td>

                                            <td style="border:none !important;">
                                                <div class="cacat-item" data-field="warna_lain">
                                                    <span class="kode">9.</span>
                                                    <span class="nama">Warna Lain</span>
                                                </div>
                                            </td>

                                            <td style="border:none !important;">
                                                <div class="cacat-item" data-field="elongation">
                                                    <span class="kode">E.</span>
                                                    <span class="nama">Elongation</span>
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style="border:none !important;">
                                                <div class="cacat-item" data-field="berbulu">
                                                    <span class="kode">5.</span>
                                                    <span class="nama">Berbulu</span>
                                                </div>
                                            </td>

                                            <td style="border:none !important;">
                                                <div class="cacat-item" data-field="luka">
                                                    <span class="kode">A.</span>
                                                    <span class="nama">Luka</span>
                                                </div>
                                            </td>

                                            <td style="border:none !important;">
                                                <div class="cacat-item" data-field="setting_lain2">
                                                    <span class="kode">F.</span>
                                                    <span class="nama">Setting / Lain-lain</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr class="textBener">
                                <td style="border-right:none !important">Sebab NG</td>
                                <td style="border-left:none !important; border-right:none !important">
                                    :</td>
                                <td colspan="5" style="border-left:none !important" id="sebab_ng_lap"
                                    contenteditable="true"></td>
                            </tr>
                            <table>
                                <tr class="textBener">
                                    <td style="border-right:none !important; width:100px;">
                                        Sortir
                                    </td>
                                    <td
                                        style="border-left:none !important; border-right:none !important; width:100px;">
                                        : a) Down Grade
                                    </td>
                                    <td id="down_grade_lap" contenteditable="true"
                                        style="
                                            border-left:none !important;
                                            border-right:none !important;
                                            width:230px;
                                            min-width:230px;
                                            max-width:230px;
                                            word-break:break-word;
                                            overflow-wrap:break-word;
                                            white-space:normal;
                                            vertical-align:top;
                                        ">
                                    </td>
                                    <td
                                        style="border-right:none !important; border-left:none !important; width:100px;">
                                        b) Up Grade
                                    </td>
                                    <td colspan="4" id="up_grade_lap" contenteditable="true"
                                        style="
                                            border-left:none !important;
                                            word-break:break-word;
                                            overflow-wrap:break-word;
                                            white-space:normal;
                                            vertical-align:top;
                                        ">
                                    </td>
                                </tr>
                                <tr class="textBener">
                                    <td style="border-right:none !important">
                                    </td>
                                    <td style="border-left:none !important; border-right:none !important">
                                        : c) Reject</td>
                                    <td colspan="6" style="border-left:none !important;" id="reject_lap"
                                        contenteditable="true"></td>
                                </tr>
                                <tr class="textBener">
                                    <td style="border-right:none !important; width: 100px;">Supply
                                    </td>
                                    <td
                                        style="border-left:none !important; border-right:none !important; width: 100px;">
                                        :</td>
                                    <td colspan="5"
                                        style="border-left:none !important; border-right:none !important"
                                        id="supply_lap" contenteditable="true"></td>
                                </tr>
                            </table>
                        </table>
                        <table>
                            <tr>
                                <td class="center bold"
                                    style="width:120px; border:none !important; border-top: 1px solid black !important">
                                    Tanda Tangan & Nama Jelas</td>
                                <td class="center bold"
                                    style="width:120px; border:none !important; border-top: 1px solid black !important">
                                    Tanda Tangan & Nama Jelas</td>
                            </tr>
                            <tr>
                                <td class="center bold" style="width:120px; border:none !important">QC</td>
                                <td class="center bold" style="width:120px; border:none !important">Extruder</td>
                            </tr>
                            <tr>
                                <td class="center bold" style="width:120px; border:none !important">
                                    <img id="ttd_qc" style="display:none; max-width:200px;">
                                </td>
                                <td class="center bold" style="width:120px; border:none !important">
                                    <img id="ttd_ext" style="display:none; max-width:200px;">
                                </td>
                            </tr>
                            <tr>
                                <td class="center bold" style="width:120px; border:none !important" id="nama_qc">
                                    Nama QC</td>
                                <td class="center bold" style="width:120px; border:none !important" id="nama_ext">
                                    Nama Extruder</td>
                            </tr>
                        </table>
                    </div>
                </div>
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

        // const cloneMesin = clone.querySelector("#mesin");

        // if (cloneMesin) {

        //     const textMesin = cloneMesin.options[cloneMesin.selectedIndex] ?
        //         cloneMesin.options[cloneMesin.selectedIndex].text :
        //         "";

        //     // hapus tampilan Select2 hasil clone
        //     const select2Container = cloneMesin.nextElementSibling;

        //     if (select2Container && select2Container.classList.contains("select2")) {
        //         select2Container.remove();
        //     }

        //     const span = document.createElement("span");
        //     span.textContent = textMesin;
        //     span.style.display = "block";
        //     span.style.textAlign = "left";

        //     cloneMesin.parentNode.replaceChild(span, cloneMesin);
        // }

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