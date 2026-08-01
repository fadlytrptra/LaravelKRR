<div id="printArea">
    {{--Template Bon Kas--}}
    <div class="bk-main">

        {{-- HEADER --}}
        <div class="bk-top">
            <div class="bk-company">
                <div class="bk-logo">
                    <img src="{{ asset('images/KRR.png') }}">
                </div>

                <div class="bk-company-text">
                    <div class="bk-company-name">
                        P.T. KERTA RAJASA RAYA
                    </div>
                    <div class="bk-company-sub">
                        Woven Bag - Jumbo Bag Industrial
                    </div>
                </div>
            </div>

            <div class="bk-title">
                <span id="printJenisBonKas">BON KAS</span>
            </div>
        </div>


        {{-- ISI --}}
        <div class="bk-body">

            {{-- DETAIL --}}
            <div class="bk-detail">

                <div class="detail-row">
                    <div class="lbl">TANGGAL</div>
                    <div class="isi">
                        <span id="printTanggal"></span>
                    </div>
                    <div class="lbl-right">
                        No PO :
                    </div>
                    <div class="isi-right">
                        <span id="printNoPO"></span>
                    </div>
                </div>

                <div class="detail-row">
                    <div class="lbl">JUMLAH UANG</div>
                    <div class="isi jumlah">
                        Rp <span id="printJumlah"></span>
                    </div>
                </div>
                <div class="detail-row">
                    <div class="lbl"></div>

                    <div class="terbilang">
                        (
                        <span id="printTerbilang"></span>
                        )
                    </div>
                </div>
            </div>


            {{-- URAIAN --}}
            <div class="bk-uraian">
                <div class="uraian-label">
                    URAIAN
                </div>
                <div class="uraian-content">
                    <div class="garis">
                        <span id="printUraian"></span>
                    </div>
                    <div class="garis"></div>
                    <div class="garis"></div>
                </div>
            </div>
        </div>


        {{-- TANDA TANGAN --}}
        <div class="bk-ttd">
            <div class="ttd-item">
                Menerima
                <div class="space">
                    <img
                        id="ttdPenerima"
                        style="display:none;">
                </div>
                (
                <span id="printPenerima"></span>
                )
            </div>

            <div class="ttd-item">
                Mengetahui
                <div class="space">
                    <img
                        id="ttdMengetahui"
                        style="display:none;">
                </div>
                (
                <span id="printMengetahui"></span>
                )
            </div>

            <div class="ttd-item">
                Kasir
                <div class="space">
                    <img
                        id="ttdKasir"
                        style="display:none;">
                </div>
                (
                <span id="printKasir"></span>
                )
            </div>
        </div>

    </div>

    {{-- DOKUMENTASI --}}
    <div id="printDokumentasiSection" class="bk-dokumentasi">
        <div class="bk-dokumentasi-title">
            DOKUMENTASI
        </div>

        <div id="printDokumentasi" class="bk-dokumentasi-list">
        </div>
    </div>

</div>


<style>

/* =========================================================
   PRINT AREA
========================================================= */

#printArea {
    display: none;
    width: 100%;
    font-family: "Times New Roman", Times, serif;
    color: #000;
    background: #fff;
    font-size: 10px;
}

#printArea *,
#printArea *::before,
#printArea *::after {
    box-sizing: border-box;
}


/* =========================================================
   CONTAINER UTAMA
========================================================= */

.bk-main {
    width: 100%;
    border: 1px solid #000;
}


/* =========================================================
   HEADER
========================================================= */

.bk-top {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #000;
}

.bk-company {
    width: 70%;
    min-height: 65px;
    padding: 5px 7px;
    display: flex;
    align-items: center;
    border-right: 1px solid #000;
}

.bk-logo {
    width: 58px;
    flex: 0 0 58px;

    display: flex;
    align-items: center;
    justify-content: center;
}

.bk-logo img {
    display: block;
    width: 52px;
    height: auto;
}

.bk-company-text {
    flex: 1;
}

.bk-company-name {
    font-size: 21px;
    line-height: 1.1;
    font-weight: bold;
    white-space: nowrap;
}

.bk-company-sub {
    margin-top: 2px;
    font-size: 17px;
    line-height: 1.1;
    white-space: nowrap;
}

.bk-title {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: bold;
    white-space: nowrap;
}


/* =========================================================
   BODY
========================================================= */

.bk-body {
    padding: 7px 8px;
}


/* =========================================================
   DETAIL
========================================================= */

.bk-detail {
    width: 100%;
}

.detail-row {
    display: grid;
    grid-template-columns: 100px 1fr 55px 95px;
    align-items: center;
    min-height: 21px;
}

.lbl {
    font-size: 11px;
    line-height: 1.2;
    font-weight: bold;
    white-space: nowrap;
}

.isi {
    padding-left: 8px;

    font-size: 11px;
    line-height: 1.2;
    font-weight: bold;

    white-space: nowrap;
}

.lbl-right {
    font-size: 11px;
    line-height: 1.2;
    font-weight: bold;

    text-align: right;
    white-space: nowrap;
}

.isi-right {
    padding-left: 5px;
    font-size: 13px;
    line-height: 1.2;
    font-weight: bold;
    white-space: nowrap;
}

.jumlah {
    grid-column: 2 / 5;
}

.terbilang {
    grid-column: 2 / 5;
    padding-left: 8px;
    font-size: 11px;
    line-height: 1.15;
    font-style: italic;
}


/* =========================================================
   URAIAN
========================================================= */

.bk-uraian {
    display: flex;
    width: 100%;
    margin-top: 18px;
}

.uraian-label {
    width: 100px;
    flex: 0 0 100px;
    padding-top: 2px;
    font-size: 13px;
    font-weight: bold;
}

.uraian-content {
    flex: 1;
    min-width: 0;
}

.garis {
    position: relative;
    height: 22px;
    padding: 0 0 2px 8px;
    overflow: hidden;
}

/* Titik-titik */
.garis::after {
    content:
        "................................................................................................................................................................................................................................................................";
    position: absolute;
    left: 8px;
    right: 0;
    bottom: 0;
    height: 6px;
    overflow: hidden;
    font-family: "Times New Roman", Times, serif;
    font-size: 13px;
    line-height: 4px;
    letter-spacing: 1px;
    white-space: nowrap;

    color: #000;
    z-index: 1;
}

#printUraian {
    position: relative;
    z-index: 2;
    padding-right: 3px;
    background: #fff;
    font-size: 12px;
    line-height: 1.15;
}


/* =========================================================
   TANDA TANGAN
========================================================= */

.bk-ttd {
    display: flex;
    width: 100%;
    border-top: 1px solid #000;
}

.ttd-item {
    width: 33.333%;
    height: 78px;
    padding: 3px 2px 2px;
    font-size: 10px;
    line-height: 1.1;
    text-align: center;
}

.ttd-item + .ttd-item {
    border-left: 1px solid #000;
}

.space {
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
}

.space img {
    display: block;
    width: auto;
    height: auto;
    max-width: 100px;
    max-height: 46px;
    object-fit: contain;
}

#printPenerima,
#printMengetahui,
#printKasir {
    font-size: 10px;
}

/* =========================================================
   DOKUMENTASI
========================================================= */

.bk-dokumentasi{
    margin-top:50px;
}

.bk-dokumentasi-title{
    font-weight:bold;
    font-size:16px;
    margin-bottom:6px;
}

.bk-dokumentasi-list{
    display:grid;
    grid-template-columns:repeat(2, 1fr);
    gap:15px;
}

.bk-dokumentasi-list img{
    width:450px;
    height:450px;
    object-fit:contain;
    border:1px solid #000;
    padding:4px;
    background:#fff;

    /* Hindari gambar terpotong */
    page-break-inside: avoid;
    break-inside: avoid;
    page-break-before: auto;
    page-break-after: auto;

    display:block;
}

/* =========================================================
   SCREEN
========================================================= */

@media screen {
    #printArea {
        display: none !important;
    }
}

/* =========================================================
   PRINT
========================================================= */
@media print {

    @page {
        size: 15cm 10.5cm;
        margin: 10mm 0mm 0mm 0mm;
    }

    html,
    body {
        margin: 0 !important;
        padding: 0 !important;
        background: #fff !important;
    }

    body * {
        visibility: hidden !important;
    }

    #printArea,
    #printArea * {
        visibility: visible !important;
    }

    #printArea {
        display: block !important;
        position: absolute !important;
        top: 0mm !important;
        left: 4mm !important;
        width:15cm !important;
        margin: 0 !important;
        padding: 0 !important;
        background: #fff !important;
        transform: none !important;
    }

    /* Bon Kas  */
    .bk-main {
        width: 12.7cm !important;
        width:15cm;
        transform-origin: top left;
        page-break-inside: avoid !important;
        break-inside: avoid-page !important;
    }

    /* Dokumentasi */
    .bk-dokumentasi {
        width: 100% !important;
        margin-top:20px;
        page-break-before:auto;
        page-break-after:auto;
        page-break-inside:avoid;
        break-before:auto;
        break-after:auto;
        break-inside:avoid;
    }

    .space img {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
    }
}
</style>
