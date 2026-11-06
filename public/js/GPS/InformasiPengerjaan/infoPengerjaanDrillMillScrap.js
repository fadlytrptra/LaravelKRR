//#region Variabel DOM Elements
jQuery(function ($) {
    const TBln = document.getElementById("TBln");
    const TThn = document.getElementById("TThn");
    const btnOK = document.getElementById("btnOK");
    const btnKeluar = document.getElementById("btnKeluar");
    const tabsContainer = document.getElementById("tabsContainer");
//#endregion

//#region Input & Core Events
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
    // SP_5298_PJW_HITUNG-SISA-JAM-KRJ-DRILL per (hari × tipe mesin)
    function loadData(bulan, tahun) {
        ajaxPost(
            window.grafikDmsConfig.routeGetData,
            { bulan: bulan, tahun: tahun },
            null,
            null,
            function (response) {
                renderAll(response);
            },
            function (xhr) {
                Swal.fire(
                    "Error",
                    (xhr.responseJSON && xhr.responseJSON.error) ||
                        "Terjadi kesalahan.",
                    "error",
                );
            },
        );
    }

    function renderAll(response) {
        if (!response || !response.tabs || response.tabs.length === 0) {
            tabsContainer.innerHTML =
                '<div class="text-center w-100">Tidak ada data.</div>';
            return;
        }

        let navHtml = '<ul class="nav nav-tabs" role="tablist">';
        let paneHtml = '<div class="tab-content mt-3">';

        response.tabs.forEach(function (tab, idx) {
            const isActive = idx === 0;
            const tabId = "tab-" + tab.key;

            navHtml += '<li class="nav-item" role="presentation">';
            navHtml +=
                '<button class="nav-link ' + (isActive ? "active" : "") + '" ';
            navHtml +=
                'id="' +
                tabId +
                '-btn" data-bs-toggle="tab" data-bs-target="#' +
                tabId +
                '" ';
            navHtml +=
                'type="button" role="tab">' + tab.label + "</button></li>";

            paneHtml +=
                '<div class="tab-pane fade ' +
                (isActive ? "show active" : "") +
                '" id="' +
                tabId +
                '" role="tabpanel">';
            paneHtml += buildLegend(tab);
            paneHtml +=
                '<div class="day-grid" id="grid-' + tab.key + '"></div>';
            paneHtml += "</div>";
        });

        navHtml += "</ul>";
        paneHtml += "</div>";
        tabsContainer.innerHTML = navHtml + paneHtml;

        // Isi grid per tab
        response.tabs.forEach(function (tab) {
            const grid = document.getElementById("grid-" + tab.key);
            if (grid) grid.innerHTML = buildGrid(tab);
        });
    }

    function buildLegend(tab) {
        let html =
            '<div class="border p-2 rounded mb-2 d-flex justify-content-center" style="background-color: #f8f9fa;">';
        tab.types.forEach(function (t) {
            html +=
                ' <span class="ms-3" style="color:' +
                colorOf(t.colorClass) +
                ';">----> ' +
                t.tag +
                " : " +
                escapeHtml(t.label) +
                "</span>";
        });
        html += "</div>";
        return html;
    }

    function buildGrid(tab) {
        if (!tab.data || tab.data.length === 0) {
            return '<div class="text-center w-100">Tidak ada data.</div>';
        }

        // Map typeId → info (tag)
        const typeMap = {};
        tab.types.forEach(function (t) {
            typeMap[t.typeId] = t;
        });

        let html = "";
        tab.data.forEach(function (dayData) {
            html += '<div class="day-card">';
            html += '<div class="day-label">' + dayData.day + "</div>";

            dayData.cells.forEach(function (cell) {
                const info = typeMap[cell.typeId] || { tag: "?" };
                const tag = info.tag;
                const isFull = cell.isFull;
                const max = cell.menitKrj > 0 ? cell.menitKrj : 1;
                const val = cell.menitPK;
                const pct = Math.min(100, Math.round((val / max) * 100));
                const barClass = isFull ? "bg-danger" : "bg-primary";

                html += '<div class="cell-bar-row">';
                html +=
                    '<span class="bar-tag ' +
                    tag.toLowerCase() +
                    '">' +
                    tag +
                    "</span>";
                html += '<div class="progress">';
                html +=
                    '<div class="progress-bar ' +
                    barClass +
                    '" role="progressbar" ';
                html +=
                    'style="width:' +
                    pct +
                    '%" aria-valuenow="' +
                    val +
                    '" aria-valuemin="0" aria-valuemax="' +
                    max +
                    '"></div>';
                html += "</div>";
                html +=
                    '<span class="jam-label ' +
                    (isFull ? "full" : "") +
                    '">' +
                    cell.jamKrj +
                    "</span>";
                html += "</div>";
            });

            html += "</div>";
        });
        return html;
    }

    function colorOf(cls) {
        const map = {
            blue: "blue",
            green: "green",
            red: "red",
            brown: "brown",
        };
        return map[cls] || "black";
    }

    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    // Auto-load bulan & tahun sekarang (dari controller)
    loadData(parseInt(TBln.value), parseInt(TThn.value));
});
//#endregion
