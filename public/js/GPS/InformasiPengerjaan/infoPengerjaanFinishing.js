//#region Variabel DOM Elements
jQuery(function ($) {
    const TBln = document.getElementById("TBln");
    const TThn = document.getElementById("TThn");
    const btnOK = document.getElementById("btnOK");
    const btnKeluar = document.getElementById("btnKeluar");
    const dayGrid = document.getElementById("dayGrid");
    // Label A/B/C/D per tipe mesin: 47=Coating ANS, 48=Assembling, 57=Polishing
    const TYPE_LABELS = { 47: "A", 48: "B", 57: "C"};
//#endregion

//#region Input & Core Events
    // TBln.focus();
    btnKeluar.addEventListener("click", function () {
        window.location.href = "/GPS";
    });

    TBln.addEventListener("keypress", function (e) {
        if (e.key === "Enter") TThn.focus();
    });
    TThn.addEventListener("keypress", function (e) {
        if (e.key === "Enter") btnOK.focus();
    });

    btnOK.addEventListener("click", function () {
        const bulan = parseInt(TBln.value);
        const tahun = parseInt(TThn.value);

        if (!bulan || bulan < 1 || bulan > 12) {
            Swal.fire("Info", "Bulan tidak valid (1-12).", "info");
            return;
        }
        if (!tahun || tahun < 2000 || tahun > 2100) {
            Swal.fire("Info", "Tahun tidak valid.", "info");
            return;
        }

        loadData(bulan, tahun);
    });
//#endregion

//#region Utility & Helper Functions
    // SP_5298_PJW_HITUNG-SISA-JAM-KRJ-FINISHING per hari × tipe (47,48,57)
    function loadData(bulan, tahun) {
        ajaxPost(
            window.grafikFinishingConfig.routeGetData,
            { bulan: bulan, tahun: tahun },
            null,
            null,
            function (response) {
                renderChart(response);
            },
        );
    }

    function renderChart(response) {
        dayGrid.innerHTML = "";
        if (!response || !response.data || response.data.length === 0) {
            dayGrid.innerHTML =
                '<div class="text-center w-100">Tidak ada data.</div>';
            return;
        }

        let html = "";
        for (const dayData of response.data) {
            html += '<div class="day-card">';
            html += `<div class="day-label">${dayData.day}</div>`;

            for (const cell of dayData.cells) {
                const tag = TYPE_LABELS[cell.typeId] || "?";
                const isFull = cell.isFull;
                const max = cell.menitKrj > 0 ? cell.menitKrj : 1;
                const val = cell.menitPK;
                const pct = Math.min(100, Math.round((val / max) * 100));
                const barClass = isFull ? "bg-danger" : "bg-primary";

                html += '<div class="cell-bar-row">';
                html += `<span class="bar-tag ${tag.toLowerCase()}">${tag}</span>`;
                html += `<div class="progress">`;
                html += `<div class="progress-bar ${barClass}" role="progressbar" style="width:${pct}%" aria-valuenow="${val}" aria-valuemin="0" aria-valuemax="${max}"></div>`;
                html += `</div>`;
                html += `<span class="jam-label ${isFull ? "full" : ""}">${cell.jamKrj}</span>`;
                html += "</div>";
            }

            html += "</div>";
        }

        dayGrid.innerHTML = html;
    }

    // Auto-load saat halaman dibuka (bulan & tahun dari controller)
    // loadData(parseInt(TBln.value), parseInt(TThn.value));
});
//#endregion
