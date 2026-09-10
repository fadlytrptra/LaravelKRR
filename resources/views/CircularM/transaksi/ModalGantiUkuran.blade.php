{{-- =========================
    STYLE KHUSUS MODAL
========================= --}}
<style>
    .custom-modal-width2 {
        max-width: 75%;
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

<div class="modal fade" id="modalGantiUkuran" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog custom-modal-width2">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Preview Ganti Ukuran</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                {{-- <button type="button" id="btn_print" class="btn btn-success mb-2">
                    Print
                </button> --}}
                <div class="laporan-extruder">
                    <div class="container mt-2">
                        <table>
                            <tr>
                                <td colspan="2" class="bold center" style="border-bottom:none !important">PT. KERTA
                                    RAJASA RAYA</td>
                                <td style="border-bottom:none !important">Revisi : 05</td>
                                <td colspan="2"
                                    style="width:50px; border-bottom:none !important; border-right:none !important;">Tgl
                                    Periksa
                                </td>
                                <td
                                    style="width:10px; border-bottom:none !important; border-right:none !important; border-left:none !important;">
                                    :
                                </td>
                                <td style="width:200px; border-bottom:none !important; border-left:none !important"
                                    id="tanggal_print">
                                    &nbsp;
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="center bold"
                                    style="border-bottom:none !important; border-top:none !important">Woven Bag - Jumbo
                                    Bag Industrial</td>
                                <td style="border-bottom:none !important; border-top:none !important;t">
                                    Tanggal : 21 Juni 2019</td>
                                <td colspan="2"
                                    style="width:50px; border-bottom:none !important; border-right:none !important;">
                                    Ukuran Asal
                                </td>
                                <td
                                    style="border-bottom:none !important; border-right:none !important; border-left:none !important;">
                                    :
                                </td>
                                <td style="border-bottom:none !important; border-left:none !important;"
                                    id="ukuran_asalPrint">
                                    &nbsp;
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" class="center bold" style="border-top:none !important">
                                    FM-7.5-01-CL-02-03</td>
                                <td style="border-top:none !important;t">
                                <td colspan="2" style="width:50px; border-right:none !important;">
                                    Ukuran Baru
                                </td>
                                <td style="border-left:none !important; border-right:none !important">
                                    :
                                </td>
                                <td style="border-left:none !important; border-left:none !important"
                                    id="ukuran_baruPrint">
                                    &nbsp;
                                </td>
                            </tr>
                            <tr>
                                <td colspan="7" class="center bold" style="font-size: large">FORM PEMERIKSAAN GANTI
                                    UKURAN CIRCULAR LOOM
                                </td>
                            </tr>
                        </table>
                        <table>
                            <tr>
                                <td style="width:120px; border-right:none !important; border-bottom:none !important;">
                                    Kode Mesin</td>
                                <td
                                    style="width: 1%; border-right:none !important; border-left:none !important; border-bottom:none !important">
                                    :</td>
                                <td style="width: 20%; border-right:none !important; border-left:none !important; border-bottom:none !important;"
                                    id="kode_mesinPrint"></td>
                                <td
                                    style="width:120px; border-right:none !important; border-left:none !important; border-bottom:none !important;">
                                    Benang WA</td>
                                <td
                                    style="width: 1%; border-right:none !important; border-left:none !important; border-bottom:none !important;">
                                    :</td>
                                <td style="border-left:none !important; border-bottom:none !important; border-right:none !important"
                                    id="benang_waPrint"></td>
                                <td
                                    style="width:120px; border-right:none !important; border-left:none !important; border-bottom:none !important;">
                                    Perawatan GU</td>
                                <td
                                    style="width: 1%; border-right:none !important; border-left:none !important; border-bottom:none !important;">
                                    :</td>
                                <td style="border-left:none !important; border-bottom:none !important;"
                                    id="perawatan_guPrint"></td>
                            </tr>
                            <tr>
                                <td
                                    style="width:120px; border-right:none !important; border-bottom:none !important; border-top:none !important">
                                    Corak</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-bottom:none !important; border-top:none !important">
                                    :</td>
                                <td style="border-right:none !important; border-left:none !important; border-bottom:none !important; border-top:none !important"
                                    id="corak_print"></td>
                                <td
                                    style="width:120px; border-right:none !important; border-left:none !important; border-bottom:none !important; border-top:none !important">
                                    Benang WE</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-bottom:none !important; border-top:none !important">
                                    :</td>
                                <td style="border-left:none !important; border-bottom:none !important; border-right:none !important; border-top:none !important"
                                    id="benang_wePrint"></td>
                                <td
                                    style="width:120px; border-right:none !important; border-left:none !important; border-bottom:none !important; border-top:none !important">
                                    Awal Ganti</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-bottom:none !important; border-top:none !important">
                                    :</td>
                                <td style="border-left:none !important; border-bottom:none !important; border-top:none !important"
                                    id="awal_gantiPrint"></td>
                            </tr>
                            <tr>
                                <td
                                    style="width:120px; border-right:none !important; border-bottom:none !important; border-top:none !important">
                                    Berat Standart</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-bottom:none !important; border-top:none !important">
                                    :</td>
                                <td style="border-right:none !important; border-left:none !important; border-bottom:none !important; border-top:none !important"
                                    id="berat_standartPrint"></td>
                                <td
                                    style="width:120px; border-right:none !important; border-left:none !important; border-bottom:none !important; border-top:none !important">
                                    Jumlah Warp</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-bottom:none !important; border-top:none !important">
                                    :</td>
                                <td style="border-left:none !important; border-bottom:none !important; border-right:none !important; border-top:none !important"
                                    id="jumlah_warpPrint"></td>
                                <td
                                    style="width:120px; border-right:none !important; border-left:none !important; border-bottom:none !important; border-top:none !important">
                                    Akhir Ganti</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-bottom:none !important; border-top:none !important">
                                    :</td>
                                <td style="border-left:none !important; border-bottom:none !important; border-top:none !important"
                                    id="akhir_gantiPrint"></td>
                            </tr>
                            <tr>
                                <td style="width:120px; border-right:none !important; border-top:none !important">
                                    Berat Realita</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-top:none !important">
                                    :</td>
                                <td style="border-right:none !important; border-left:none !important; border-top:none !important"
                                    id="berat_realitaPrint"></td>
                                <td
                                    style="width:120px; border-right:none !important; border-left:none !important; border-top:none !important">
                                    RPM</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-top:none !important">
                                    :</td>
                                <td style="border-left:none !important; border-right:none !important; border-top:none !important"
                                    id="rpm_print"></td>
                                <td
                                    style="width:120px; border-right:none !important; border-left:none !important; border-top:none !important">
                                    Waktu</td>
                                <td
                                    style="border-right:none !important; border-left:none !important; border-top:none !important">
                                    :</td>
                                <td style="border-left:none !important; border-top:none !important" id="waktu_print">
                                </td>
                            </tr>
                        </table>
                        <table id="modalItemTable">
                            <thead>
                                <tr>
                                    <td rowspan="2" class="center bold" style="width: 2%">No.</td>
                                    <td rowspan="2" class="center bold" style="width: ">Pemeriksaan</td>
                                    <td colspan="2" class="center bold" style="width: ">Kondisi</td>
                                    <td rowspan="2" class="center bold" style="width: 2%">No.</td>
                                    <td rowspan="2" class="center bold" style="width: ">Pemeriksaan</td>
                                    <td colspan="2" class="center bold" style="width: ">Kondisi</td>
                                </tr>
                                <tr>
                                    <th class="center bold">Benar</th>
                                    <th class="center bold">Salah</th>
                                    <th class="center bold">Benar</th>
                                    <th class="center bold">Salah</th>
                                </tr>
                            </thead>
                            <tbody style="border:none !important; border-bottom: 1px solid black !important">
                                <tr>
                                    <td class="center">1</td>
                                    <td class="left">Ukuran Gauge Ring</td>
                                    <td class="center" id="ukuran_gr_benar">&nbsp;</td>
                                    <td class="center" id="ukuran_gr_salah">&nbsp;</td>
                                    <td class="center">13</td>
                                    <td class="left">Sensor Weft End</td>
                                    <td class="center" id="sensor_weftEnd_benar">&nbsp;</td>
                                    <td class="center" id="sensor_weftEnd_salah">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">2</td>
                                    <td class="left">Posisi Gauge Ring</td>
                                    <td class="center" id="posisi_gr_benar">&nbsp;</td>
                                    <td class="center" id="posisi_gr_salah">&nbsp;</td>
                                    <td class="center">14</td>
                                    <td class="left">Posisi Expander</td>
                                    <td class="center" id="posisi_expander_benar">&nbsp;</td>
                                    <td class="center" id="posisi_expander_salah">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">3</td>
                                    <td class="left">Posisi Shuttle Arm</td>
                                    <td class="center" id="posisi_sa_benar">&nbsp;</td>
                                    <td class="center" id="posisi_sa_salah">&nbsp;</td>
                                    <td class="center">15</td>
                                    <td class="left">Roda Expander</td>
                                    <td class="center" id="roda_expander_benar">&nbsp;</td>
                                    <td class="center" id="roda_expander_salah">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">4</td>
                                    <td class="left">Tension Brake Shuttle</td>
                                    <td class="center" id="tension_bs_benar">&nbsp;</td>
                                    <td class="center" id="tension_bs_salah">&nbsp;</td>
                                    <td class="center">16</td>
                                    <td class="left">Setting Weft / Change Gear</td>
                                    <td class="center" id="setting_weft_benar">&nbsp;</td>
                                    <td class="center" id="setting_weft_salah">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">5</td>
                                    <td class="left">Kondisi Push Rol</td>
                                    <td class="center" id="kondisi_pr_benar">&nbsp;</td>
                                    <td class="center" id="kondisi_pr_salah">&nbsp;</td>
                                    <td class="center">17</td>
                                    <td class="left">Hasil Belahan / Gussed</td>
                                    <td class="center" id="hasil_belahan_benar">&nbsp;</td>
                                    <td class="center" id="hasil_belahan_salah">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">6</td>
                                    <td class="left">Kondisi Eyelet Mesin</td>
                                    <td class="center" id="kondisi_em_benar">&nbsp;</td>
                                    <td class="center" id="kondisi_em_salah">&nbsp;</td>
                                    <td class="center">18</td>
                                    <td class="left">Kondisi Rajutan saat JOG</td>
                                    <td class="center" id="kondisi_jog_benar">&nbsp;</td>
                                    <td class="center" id="kondisi_jog_salah">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">7</td>
                                    <td class="left">Kondisi Upper Lower Ring</td>
                                    <td class="center" id="kondisi_ulr_benar">&nbsp;</td>
                                    <td class="center" id="kondisi_ulr_salah">&nbsp;</td>
                                    <td class="center">19</td>
                                    <td class="left">Tension Winder</td>
                                    <td class="center" id="tension_winder_benar">&nbsp;</td>
                                    <td class="center" id="tension_winder_salah">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">8</td>
                                    <td class="left">Kondisi Dancing Level</td>
                                    <td class="center" id="kondisi_dl_benar">&nbsp;</td>
                                    <td class="center" id="kondisi_dl_salah">&nbsp;</td>
                                    <td class="center">20</td>
                                    <td class="left">Jalur Benang di Rak</td>
                                    <td class="center" id="jalur_br_benar">&nbsp;</td>
                                    <td class="center" id="jalur_br_salah">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">9</td>
                                    <td class="left">Kondisi Shuttle Body</td>
                                    <td class="center" id="kondisi_sb_benar">&nbsp;</td>
                                    <td class="center" id="kondisi_sb_salah">&nbsp;</td>
                                    <td class="center">21</td>
                                    <td class="left">Jalur Benang di Dancing Lever</td>
                                    <td class="center" id="jalur_dl_benar">&nbsp;</td>
                                    <td class="center" id="jalur_dl_salah">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">10</td>
                                    <td class="left">Kondisi Oli Tetes</td>
                                    <td class="center" id="kondisi_ot_benar">&nbsp;</td>
                                    <td class="center" id="kondisi_ot_salah">&nbsp;</td>
                                    <td class="center">22</td>
                                    <td class="left">Jalur Benang di Wire Heald</td>
                                    <td class="center" id="jalur_wh_benar">&nbsp;</td>
                                    <td class="center" id="jalur_wh_salah">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">11</td>
                                    <td class="left">Sensor Warp</td>
                                    <td class="center" id="sensor_warp_benar">&nbsp;</td>
                                    <td class="center" id="sensor_warp_salah">&nbsp;</td>
                                    <td class="center">23</td>
                                    <td class="left">Kondisi Dropper</td>
                                    <td class="center" id="kondisi_dropper_benar">&nbsp;</td>
                                    <td class="center" id="kondisi_dropper_salah">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">12</td>
                                    <td class="left">Sensor Weft</td>
                                    <td class="center" id="sensor_weft_benar">&nbsp;</td>
                                    <td class="center" id="sensor_weft_salah">&nbsp;</td>
                                    <td class="center">24</td>
                                    <td class="left">Corak & Jumlah Strip</td>
                                    <td class="center" id="corak_js_benar">&nbsp;</td>
                                    <td class="center" id="corak_js_salah">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td class="center">&nbsp;</td>
                                    <td class="left">&nbsp;</td>
                                    <td class="center">&nbsp;</td>
                                    <td class="center">&nbsp;</td>
                                    <td class="center">25</td>
                                    <td class="left">Setting Roll WTC</td>
                                    <td class="center" id="setting_roll_wtc_benar">&nbsp;</td>
                                    <td class="center" id="setting_roll_wtc_salah">&nbsp;</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td class="left" style="border:none !important;">Keterangan:</td>
                                    <td class="pl-2 pr-2" style="border:none !important;" colspan="7"
                                        id="keteranganPrint"></td>
                                </tr>
                            </tfoot>
                        </table>
                        <table>
                            {{-- <tr>
                                <td class="center bold"
                                    style="width:120px; border:none !important; border-top: 1px solid black !important">
                                    Tanda Tangan & Nama Jelas</td>
                                <td class="center bold"
                                    style="width:120px; border:none !important; border-top: 1px solid black !important">
                                    Tanda Tangan & Nama Jelas</td>
                            </tr> --}}
                            <tr>
                                <td class="center bold" style="width:120px; border:none !important">Pemeriksa</td>
                                {{-- <td class="center bold" style="width:120px; border:none !important">
                                    Supervisor</td> --}}
                            </tr>
                            <tr>
                                <td class="center bold" style="width:120px; border:none !important">
                                    <img id="ttd_pemeriksa" style="display:none; max-width:200px;">
                                </td>
                                {{-- <td class="center bold" style="width:120px; border:none !important">
                                    <img id="ttd_spv" style="display:none; max-width:200px;">
                                </td> --}}
                            </tr>
                            <tr>
                                <td class="center bold" style="width:120px; border:none !important"
                                    id="namaPemeriksa">
                                    Nama Pemeriksa</td>
                                {{-- <td class="center bold" style="width:120px; border:none !important"
                                    id="namaSupervisor">
                                    Nama Supervisor</td> --}}
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- <script>
    document.getElementById("btn_print").addEventListener("click", function(event) {
        event.preventDefault();

        let printContent = document.querySelector(".laporan-extruder").innerHTML;

        // buka TAB baru
        let printWindow = window.open("", "_blank");

        printWindow.document.write(`
            <html>
            <head>
                <title>Print Laporan</title>
                <style>
                    @page {
                        size: A3 portrait;
                        margin: 15mm;
                    }

                    body {
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

                    td, th {
                        border: 1px solid #000;
                        padding: 1px 2px;
                        vertical-align: middle;
                    }

                    .no-border td, .no-border th {
                        border: none;
                    }

                    .center { text-align: center; }
                    .right { text-align: right; }
                    .bold { font-weight: bold; }
                    .small-text { font-size: 10px; }
                </style>
            </head>
            <body>
                ${printContent}
            </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();

        // tunggu render lalu print
        setTimeout(() => {
            printWindow.print();
            printWindow.close(); // boleh dihapus kalau tab mau tetap terbuka
        }, 500);
    });
</script> --}}
