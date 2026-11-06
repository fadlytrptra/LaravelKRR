//#region Variabel DOM Elements
jQuery(function ($) {
    const TNamaBrg = document.getElementById("TNamaBrg");
    const TNoOd = document.getElementById("TNoOd");
    const TBagian = document.getElementById("TBagian");
    const TIdBagian = document.getElementById("TIdBagian");
    const btnBagian = document.getElementById("btnBagian");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnTotal = document.getElementById("btnTotal");
    const btnKeluar = document.getElementById("btnKeluar");
    const TTotalBiaya = document.getElementById("TTotalBiaya");
    const tbodyData = document.getElementById("tbodyData");
    const detailModalElement = document.getElementById("modalHistoriKonsDetail");
    const tbodyHistoriKonsDetail = document.getElementById("tbodyHistoriKonsDetail");
    const btnKeluarDetail = document.getElementById("btnKeluarDetail");
    const btnRefreshDetail = document.getElementById("btnRefreshDetail");
    const btnTotalDetail = document.getElementById("btnTotalDetail");
    const TTotalBiayaDetail = document.getElementById("TTotalBiayaDetail");
    const detailModal = bootstrap.Modal.getOrCreateInstance(detailModalElement);

    let currentTotalBiaya = "0";
    let currentDetailTotalBiaya = "0";
    let selectedDetail = null;
    let lastAction = null; // 'byNama' | 'byNoOd' | 'byBagian'
//#endregion

//#region Input & Core Events
    btnKeluar.addEventListener("click", function () {
        window.location.href = "/GPS";
    });

    // TNamaBrg + TNoOd kosong → kode=1; TNamaBrg + TNoOd → kode=9
    TNamaBrg.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const namaBrg = this.value.trim();
            const noOd = TNoOd.value.trim();

            if (namaBrg !== "" && noOd === "") {
                lastAction = "byNama";
                loadHistori({ kode: 1, namaBrg: namaBrg });
            } else if (namaBrg !== "" && noOd !== "") {
                lastAction = "byNoOd";
                const paddedNoOd = noOd.padStart(6, "0").slice(-6);
                TNoOd.value = paddedNoOd;
                loadHistori({ kode: 9, noOrder: paddedNoOd });
            }
        }
    });

    TNoOd.addEventListener("keypress", function (e) {
        const noOd = this.value.trim();

        if (e.key === "Enter") {
            if (noOd !== "") {
                lastAction = "byNoOd";
                const padded = noOd.padStart(6, "0").slice(-6);
                TNoOd.value = padded;
                loadHistori({ kode: 9, noOrder: padded });
            }
        } else if (e.key === " ") {
            // Space → fokus ke btnBagian (mode pilih 1 bagian)
            e.preventDefault();
            if (noOd !== "") {
                lastAction = "byBagian";
                const padded = noOd.padStart(6, "0").slice(-6);
                TNoOd.value = padded;
                btnBagian.focus();
            }
        }
    });

    btnBagian.addEventListener("click", function () {
        const noOd = TNoOd.value.trim();
        if (!noOd) {
            Swal.fire(
                "Info",
                "Isi No. Order terlebih dahulu (lalu tekan Space).",
                "info",
            );
            return;
        }
        openLookupModal({
            title: "Pilih Bagian Gambar",
            url:
                window.infKonsHisConfig.routeGetBagianList +
                "?noOd=" +
                encodeURIComponent(noOd),
            headers: ["ID", "Nama Bagian"],
            columns: ["IdBagian", "NamaBagian"],
            onSelect: function (row) {
                TIdBagian.value = row.IdBagian;
                TBagian.value = row.NamaBagian;
                lastAction = "byBagian";
                loadHistori({ kode: 11, idBag: parseInt(row.IdBagian) });
            },
        });
    });

    btnRefresh.addEventListener("click", function () {
        if (lastAction === "byNama") {
            const namaBrg = TNamaBrg.value.trim();
            if (namaBrg !== "") {
                loadHistori({ kode: 1, namaBrg: namaBrg });
            }
        } else if (lastAction === "byNoOd") {
            const noOd = TNoOd.value.trim();
            if (noOd !== "") {
                loadHistori({ kode: 9, noOrder: noOd });
            }
        } else if (lastAction === "byBagian") {
            const idBag = TIdBagian.value.trim();
            if (idBag !== "") {
                loadHistori({ kode: 11, idBag: parseInt(idBag) });
            }
        } else {
            Swal.fire("Info", "Lakukan pencarian terlebih dahulu.", "info");
        }
    });

    btnTotal.addEventListener("click", function () {
        if (!window.infKonsHisConfig.btnTotalEnabled) return;
        TTotalBiaya.value = currentTotalBiaya;
    });

    btnTotalDetail.disabled = !window.infKonsHisConfig.btnTotalEnabled;
    btnKeluarDetail.addEventListener("click", function () {
        detailModal.hide();
    });
    btnRefreshDetail.addEventListener("click", function () {
        if (selectedDetail) loadHistoriDetail(selectedDetail);
    });
    btnTotalDetail.addEventListener("click", function () {
        if (!window.infKonsHisConfig.btnTotalEnabled) return;
        TTotalBiayaDetail.value = currentDetailTotalBiaya;
    });

    // Double-click baris histori untuk membuka detail proses pada bulan tersebut.
    tbodyData.addEventListener("dblclick", function (event) {
        const rowElement = event.target.closest("tr");
        if (!rowElement || rowElement.parentElement !== tbodyData) return;

        const cells = rowElement.querySelectorAll("td");
        if (cells.length < 9) return;

        const selected = {
            noOd: cells[0].textContent.trim(),
            namaBarang: cells[2].textContent.trim(),
            namaBagian: cells[3].textContent.trim(),
            idBag: Number.parseInt(cells[6].textContent.trim(), 10),
            bulan: Number.parseInt(cells[7].textContent.trim(), 10),
            tahun: Number.parseInt(cells[8].textContent.trim(), 10),
            kode: 18,
        };

        if (!selected.noOd || !Number.isInteger(selected.idBag) || selected.idBag < 1
            || !Number.isInteger(selected.bulan) || !Number.isInteger(selected.tahun)) {
            return;
        }

        document.getElementById("detailTNoOd").value = selected.noOd;
        document.getElementById("detailTNamaBrg").value = selected.namaBarang;
        document.getElementById("detailTBagian").value = selected.namaBagian;
        document.getElementById("detailTKode").value = selected.kode;
        document.getElementById("detailTIdBagian").value = selected.idBag;
        document.getElementById("detailTBulan").value = selected.bulan;
        document.getElementById("detailTTahun").value = selected.tahun;
        selectedDetail = selected;
        detailModal.show();
        loadHistoriDetail(selected);
    });
//#endregion

//#region Utility & Helper Functions
    // SP_5298_PJW_LIST-HISTORI-KONSTRUKSI — gabungan kode 1/9/11 → 13 → 17 → 7
    function loadHistori(payload) {
        ajaxGet(
            window.infKonsHisConfig.routeGetHistori,
            payload,
            function (response) {
                currentTotalBiaya = response.totalBiaya || "0";
                TTotalBiaya.value = "0";
                renderTable(response.data || []);
            },
        );
    }

    function renderTable(data) {
        tbodyData.innerHTML = "";

        if (!data || data.length === 0) {
            tbodyData.innerHTML =
                '<tr><td colspan="9" class="text-center">Tidak ada data untuk kriteria tersebut.</td></tr>';
            return;
        }

        let html = "";
        for (const row of data) {
            html += '<tr class="histori-detail-trigger" title="Klik dua kali untuk melihat detail">';
            html += `<td class="tbl-cell">${escapeHtml(row.NoOrder)}</td>`;
            html += `<td class="tbl-cell">${escapeHtml(row.Divisi)}</td>`;
            html += `<td class="tbl-cell">${escapeHtml(row.NamaBarang)}</td>`;
            html += `<td class="tbl-cell">${escapeHtml(row.NamaBagian)}</td>`;
            html += `<td class="tbl-cell text-end">${escapeHtml(row.TotalBiaya)}</td>`;
            html += `<td class="tbl-cell">${escapeHtml(row.KeteranganFinish)}</td>`;
            html += `<td style="display:none;">${escapeHtml(row.IdBagian)}</td>`;
            html += `<td style="display:none;">${escapeHtml(row.Bulan)}</td>`;
            html += `<td style="display:none;">${escapeHtml(row.Tahun)}</td>`;
            html += "</tr>";
        }
        tbodyData.innerHTML = html;
    }

    function loadHistoriDetail(selected) {
        currentDetailTotalBiaya = "0";
        TTotalBiayaDetail.value = "0";
        tbodyHistoriKonsDetail.innerHTML =
            '<tr><td colspan="5" class="text-center text-muted">Memuat detail histori...</td></tr>';

        ajaxGet(window.infKonsHisConfig.routeGetHistoriDetail, {
            kode: selected.kode,
            idBag: selected.idBag,
            bulan: selected.bulan,
            tahun: selected.tahun,
        }, function (response) {
            currentDetailTotalBiaya = response.totalBiaya || "0";
            renderDetailTable(response.data || []);
        }).fail(function () {
            tbodyHistoriKonsDetail.innerHTML =
                '<tr><td colspan="5" class="text-center text-danger">Gagal memuat detail histori.</td></tr>';
        });
    }

    function renderDetailTable(data) {
        if (!Array.isArray(data) || data.length === 0) {
            tbodyHistoriKonsDetail.innerHTML =
                '<tr><td colspan="5" class="text-center text-muted">Tidak ada detail proses pada periode ini.</td></tr>';
            return;
        }

        let html = "";
        data.forEach(function (row) {
            html += "<tr>";
            html += `<td>${escapeHtml(row.EstDate)}</td>`;
            html += `<td>${escapeHtml(row.NamaWorkStation)}</td>`;
            html += `<td>${escapeHtml(row.SetujuKR)}</td>`;
            html += `<td>${escapeHtml(row.RealTime)}</td>`;
            html += `<td class="text-end">${escapeHtml(row.Biaya)}</td>`;
            html += "</tr>";
        });
        tbodyHistoriKonsDetail.innerHTML = html;
    }

    function escapeHtml(value) {
        return String(value == null ? "" : value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});
//#endregion
