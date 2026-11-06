//#region Variabel DOM Elements
jQuery(function ($) {
    const optHariIni = document.getElementById("optHariIni");
    const optTgl = document.getElementById("optTgl");
    const Tanggal = document.getElementById("Tanggal");
    const Date1 = document.getElementById("Date1");
    const Date2 = document.getElementById("Date2");
    const btnOK = document.getElementById("btnOK");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");
    const tbodyData = document.getElementById("tbodyData");
//#enregion

//#region Input & Core Events
    optHariIni.addEventListener("change", function () {
        if (this.checked) {
            Date1.disabled = true;
            Date2.disabled = true;
            btnOK.focus();
        }
    });

    optTgl.addEventListener("change", function () {
        if (this.checked) {
            Date1.disabled = false;
            Date2.disabled = false;
            Date1.focus();
        }
    });

    btnKeluar.addEventListener("click", function () {
        window.location.href = "/GPS";
    });

    Date1.addEventListener("keypress", function (e) {
        if (e.key === "Enter") Date2.focus();
    });
    Date2.addEventListener("keypress", function (e) {
        if (e.key === "Enter") btnOK.focus();
    });

    btnOK.addEventListener("click", function () {
        let payload;

        if (optHariIni.checked) {
            // kode=1: pakai tgl hari ini
            payload = {
                kode: 1,
                tgl_1: window.infKonsEstConfig.today,
                tgl_2: window.infKonsEstConfig.today,
            };
        } else {
            // kode=2: rentang tanggal
            const date1 = Date1.value;
            const date2 = Date2.value;
            if (!date1 || !date2) {
                Swal.fire("Info", "Isi rentang tanggal.", "info");
                return;
            }
            if (new Date(date2) < new Date(date1)) {
                Swal.fire(
                    "Info",
                    "Tanggal akhir harus >= tanggal awal.",
                    "info",
                );
                return;
            }
            payload = { kode: 2, tgl_1: date1, tgl_2: date2 };
        }

        loadData(payload);
    });

    btnRefresh.addEventListener("click", function () {
        btnOK.click();
    });
//#endregion

//#region Utility & Helper Functions
    function loadData(payload) {
        ajaxPost(
            window.infKonsEstConfig.routeGetData,
            payload,
            null,
            null,
            function (data) {
                renderTable(data);
            },
        );
    }

    function renderTable(data) {
        tbodyData.innerHTML = "";

        if (!data || data.length === 0) {
            tbodyData.innerHTML =
                '<tr><td colspan="5" class="text-center">Tidak ada data pada rentang tanggal ini.</td></tr>';
            return;
        }

        let html = "";
        for (const row of data) {
            const rowClass =
                row.statusWarna !== "default" ? "row-" + row.statusWarna : "";

            html += `<tr class="${rowClass}">`;
            html += `<td class="tbl-cell">${row.NoOrder}</td>`;
            html += `<td class="tbl-cell">${row.Divisi}</td>`;
            html += `<td class="tbl-cell">${row.NamaBarang}</td>`;
            html += `<td class="tbl-cell">${row.TglStart}</td>`;
            html += `<td class="tbl-cell">${row.TglFinish}</td>`;
            html += `</tr>`;
        }
        tbodyData.innerHTML = html;
    }
});
//#endregion
