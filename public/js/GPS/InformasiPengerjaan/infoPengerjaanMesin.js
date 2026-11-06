//#region Variabel DOM Elements
jQuery(function ($) {
    const TMesin = document.getElementById("TMesin");
    const TNoMesin = document.getElementById("TNoMesin");
    const btnMesin = document.getElementById("btnMesin");
    const TType = document.getElementById("TType");
    const TNoType = document.getElementById("TNoType");
    const btnType = document.getElementById("btnType");
    const Date1 = document.getElementById("Date1");
    const Date2 = document.getElementById("Date2");
    const btnOK = document.getElementById("btnOK");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");
    const tbodyData = document.getElementById("tbodyData");
    const materialModal = document.getElementById("materialModal");
    const materialModalBs = new bootstrap.Modal(materialModal);
    const materialNoOrder = document.getElementById("materialNoOrder");
    const materialNamaBarang = document.getElementById("materialNamaBarang");
    const materialNamaBagian = document.getElementById("materialNamaBagian");
    const materialKodeBarang = document.getElementById("materialKodeBarang");
    const materialTbody = document.getElementById("materialTbody");
//#endregion

//#region Input & Core Events
    btnKeluar.addEventListener("click", function () {
        if (this.textContent.trim() === "Batal") {
            resetForm();
        } else {
            window.location.href = "/GPS";
        }
    });

    // LOOKUP MESIN (SP_5298_PJW_LIST-TYPE-MESIN kode=1)
    btnMesin.addEventListener("click", function () {
        openLookupModal({
            title: "Pilih Mesin",
            url: window.infPkjMsnConfig.routeGetMesinList,
            headers: ["ID", "Nama Mesin"],
            columns: ["NoMesin", "NamaMesin"],
            onSelect: function (row) {
                TNoMesin.value = row.NoMesin;
                TMesin.value = row.NamaMesin;
                TNoType.value = "";
                TType.value = "";
                clearTable();
                btnType.focus();
                btnKeluar.textContent = "Batal";
            },
        });
    });

    // LOOKUP TYPE MESIN (SP_5298_PJW_LIST-TYPE-MESIN kode=2)
    btnType.addEventListener("click", function () {
        if (!TNoMesin.value) {
            Swal.fire("Info", "Pilih mesin terlebih dahulu.", "info");
            return;
        }

        openLookupModal({
            title: "Pilih Type Mesin",
            url:
                window.infPkjMsnConfig.routeGetTypeList +
                "?noMesin=" +
                safeUrlParam(TNoMesin.value),
            headers: ["ID", "Nama Type"],
            columns: ["NoType", "NamaType"],
            onSelect: function (row) {
                TNoType.value = row.NoType;
                TType.value = row.NamaType;
                Date1.focus();
            },
        });
    });

    // ENTER NAVIGASI
    Date1.addEventListener("keypress", function (e) {
        if (e.key === "Enter") Date2.focus();
    });
    Date2.addEventListener("keypress", function (e) {
        if (e.key === "Enter") btnOK.focus();
    });

    // TOMBOL OK
    btnOK.addEventListener("click", function () {
        const noMesin = TNoMesin.value.trim();
        const noType = TNoType.value.trim();
        const date1 = Date1.value;
        const date2 = Date2.value;

        if (!noMesin || !noType) {
            Swal.fire(
                "Info",
                "Pilih Mesin dan Type Mesin terlebih dahulu.",
                "info",
            );
            return;
        }
        if (!date1 || !date2) {
            Swal.fire("Info", "Isi rentang tanggal.", "info");
            return;
        }
        if (new Date(date2) < new Date(date1)) {
            Swal.fire("Info", "Tanggal akhir harus >= tanggal awal.", "info");
            return;
        }

        loadData(noMesin, noType, date1, date2);
    });

    // TOMBOL REFRESH
    btnRefresh.addEventListener("click", function () {
        btnOK.click();
    });

    tbodyData.addEventListener("dblclick", function (event) {
        const rowElement = event.target.closest("tr[data-index]");
        if (!rowElement) return;

        const rows = JSON.parse(tbodyData.dataset.rows || "[]");
        const row = rows[Number(rowElement.dataset.index)];
        if (row) openMaterialModal(row);
    });
//#endregion

//#region Utility & Helper Functions
    // SP_5298_PJW_NOANTRI-{MESIN}-NOFINISH kode=1 + SP_5298_PJW_JADWAL-{MESIN} kode=3/4
    function loadData(noMesin, noType, date1, date2) {
        ajaxGet(
            window.infPkjMsnConfig.routeGetJadwal,
            { noMesin: noMesin, noType: noType, date1: date1, date2: date2 },
            function (data) {
                renderTable(data);
            },
        );
    }

    // RENDER TABLE
    function renderTable(data) {
        tbodyData.innerHTML = "";

        if (!data || data.length === 0) {
            tbodyData.innerHTML =
                '<tr><td colspan="19" class="text-center">Tidak ada jadwal pada rentang tanggal ini untuk mesin/type tersebut.</td></tr>';
            return;
        }

        let html = "";
        data.forEach(function (row, index) {
            const rowClass = "row-" + row.statusWarna;

            html += `<tr class="${rowClass}" data-index="${index}" style="cursor: pointer;">`;
            html += `<td class="tbl-cell">${row.Nomer}</td>`;
            html += `<td class="tbl-cell">${row.NoOrder}</td>`;
            html += `<td class="tbl-cell">${row.TglStart}</td>`;
            html += `<td class="tbl-cell">${row.Divisi}</td>`;
            html += `<td class="tbl-cell">${row.Barang}</td>`;
            html += `<td class="tbl-cell">${row.Bagian}</td>`;
            html += `<td class="tbl-cell">${row.KdBarang}</td>`;
            html += `<td class="tbl-cell">${row.NoGambar}</td>`;
            html += `<td class="tbl-cell text-end">${row.JmlOrder}</td>`;
            html += `<td class="tbl-cell">${row.StatusOrder}</td>`;
            html += `<td class="tbl-cell">${row.EstTime}</td>`;
            html += `<td class="tbl-cell text-end">${row.JmlDikerjakan}</td>`;
            html += `<td class="tbl-cell">${row.TglOperator}</td>`;
            html += `<td class="tbl-cell">${row.RealTime}</td>`;
            html += `<td class="tbl-cell text-end">${row.JmlFinish}</td>`;
            html += `<td class="tbl-cell">${row.Keterangan}</td>`;
            html += `<td class="tbl-cell">${row.TglKepRegu}</td>`;
            html += `<td class="tbl-cell">${row.KetTdkSetuju}</td>`;
            html += `<td class="tbl-cell">${row.TglAccPPIC}</td>`;
            html += `</tr>`;
        });
        tbodyData.innerHTML = html;
        tbodyData.dataset.rows = JSON.stringify(data);
    }

    // CLEAR TABLE
    function clearTable() {
        tbodyData.innerHTML =
            '<tr><td colspan="19" class="text-center">Belum ada data.</td></tr>';
        delete tbodyData.dataset.rows;
    }

    function openMaterialModal(row) {
        materialNoOrder.value = row.NoOrder || "";
        materialNamaBarang.value = row.Barang || "";
        materialNamaBagian.value = row.Bagian || "";
        materialKodeBarang.value = row.KdBarang || "";
        materialTbody.innerHTML =
            '<tr><td colspan="7" class="text-center text-muted">Memuat data...</td></tr>';
        materialModalBs.show();

        ajaxGet(
            window.infPkjMsnConfig.routeGetListMaterial,
            {
                noOrder: row.NoOrder || "",
                namaBagian: row.Bagian || "",
                jenisOrder: row.KdBarang ? "H" : "P",
            },
            function (res) {
                if (!res.success) {
                    materialTbody.innerHTML =
                        '<tr><td colspan="7" class="text-center text-danger">Gagal memuat data material.</td></tr>';
                    Swal.fire("Error", res.error || "Gagal memuat data material.", "error");
                    return;
                }
                renderMaterialTable(res.data || []);
            }
        ).fail(function () {
            materialTbody.innerHTML =
                '<tr><td colspan="7" class="text-center text-danger">Gagal memuat data material.</td></tr>';
        });
    }

    function renderMaterialTable(data) {
        if (data.length === 0) {
            materialTbody.innerHTML =
                '<tr><td colspan="7" class="text-center text-muted">Tidak ada data material.</td></tr>';
            return;
        }

        materialTbody.innerHTML = data.map(function (material) {
            const rowClass = material.Status === 1 ? "text-primary" : "";
            return `<tr class="${rowClass}">
                <td>${material.MtrType || ""}</td>
                <td>${material.Spek || ""}</td>
                <td>${material.KdBrg || ""}</td>
                <td class="text-end">${material.Jml || "0.00"}</td>
                <td>${material.NamaSatuan || ""}</td>
                <td>${material.HargaBaru || ""}</td>
                <td>${material.HargaBekas || ""}</td>
            </tr>`;
        }).join("");
    }
});
//#endregion
