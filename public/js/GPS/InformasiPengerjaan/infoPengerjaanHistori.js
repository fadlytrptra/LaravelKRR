//#region Variabel DOM Elements
jQuery(function ($) {
    const OptHarian = document.getElementById("OptHarian");
    const OptProyek = document.getElementById("OptProyek");
    const TNamaBrg = document.getElementById("TNamaBrg");
    const TKdBrg = document.getElementById("TKdBrg");
    const TNoOd = document.getElementById("TNoOd");
    const TBagian = document.getElementById("TBagian");
    const TIdBagian = document.getElementById("TIdBagian");
    const btnBagian = document.getElementById("btnBagian");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");
    const btnMaterial = document.getElementById("btnMaterial");
    const btnSPart = document.getElementById("btnSPart");
    const btnMakloon = document.getElementById("btnMakloon");
    const btnTotal = document.getElementById("btnTotal");
    const TTotalBiaya = document.getElementById("TTotalBiaya");
    const tbodyData = document.getElementById("tbodyData");
    const detailModalElement = document.getElementById("modalHistoriDetail");
    const detailModal = bootstrap.Modal.getOrCreateInstance(detailModalElement);
    const tbodyHistoriDetail = document.getElementById("tbodyHistoriDetail");
    const btnKeluarDetail = document.getElementById("btnKeluarDetail");
    const btnRefreshDetail = document.getElementById("btnRefreshDetail");
    const btnTotalDetail = document.getElementById("btnTotalDetail");
    const TTotalBiayaDetail = document.getElementById("TTotalBiayaDetail");
    const modalHistoriMaterial = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("modalHistoriMaterial"),
    );
    const modalHistoriSpart = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("modalHistoriSpart"),
    );
    const modalHistoriMakloon = bootstrap.Modal.getOrCreateInstance(
        document.getElementById("modalHistoriMakloon"),
    );
    const tbodyHistoriMaterial = document.getElementById("tbodyHistoriMaterial");
    const tbodyHistoriSpart = document.getElementById("tbodyHistoriSpart");
    const tbodyHistoriMakloon = document.getElementById("tbodyHistoriMakloon");
    const btnRefreshHistoriMakloon = document.getElementById("btnRefreshHistoriMakloon");
    const btnTotalHistoriMakloon = document.getElementById("btnTotalHistoriMakloon");
    const TTotalMakloon = document.getElementById("TTotalMakloon");

    let lastMode = null; // 'namaBrg' | 'kdBrg' | 'noOd' | 'idBag'
    let jenisUser = 0;
    let selectedDetail = null;
    let selectedHistoryRow = null;
    let selectedCostRow = null;
    let currentDetailTotalBiaya = "0";
    let currentTotalBiaya = "0";
    let currentMakloonTotalBiaya = "0";

    // Ambil tipe user → enable/disable tombol biaya
    ajaxGet(window.historiConfig.routeGetUserType, {}, function (res) {
        jenisUser = res.jenis || 1;
        const enabled = jenisUser === 1 || jenisUser === 7;
        btnMaterial.disabled = !enabled;
        btnSPart.disabled = !enabled;
        btnMakloon.disabled = !enabled;
        btnTotal.disabled = !enabled;
        btnTotalDetail.disabled = !enabled;
        btnTotalHistoriMakloon.disabled = !enabled;
    });

    const getJenisOd = () => (OptHarian.checked ? "H" : "P");
    //#endregion

    //#region Input & Core Events
    OptHarian.addEventListener("change", function () {
        if (this.checked) {
            TKdBrg.disabled = false;
            resetSearch();
        }
    });
    OptProyek.addEventListener("change", function () {
        if (this.checked) {
            TKdBrg.disabled = true;
            resetSearch();
        }
    });
    
    TNamaBrg.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const nama = TNamaBrg.value.trim();
            const kd = TKdBrg.value.trim();
            const no = TNoOd.value.trim();
            if (!nama) return;

            if (nama && !kd && !no) executeSearch("namaBrg");
            else if (nama && kd && !no) executeSearch("kdBrg");
            else if (nama && kd && no) executeSearch("noOd");
        }
    });

    TKdBrg.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const kd = TKdBrg.value.trim();
            const no = TNoOd.value.trim();
            if (!kd) return;
            TKdBrg.value = kd.padStart(9, "0").slice(-9);

            if (kd && !no)
                executeSearch("kdBrg"); // H only
            else if (kd && no) executeSearch("noOd");
        }
    });

    TNoOd.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const no = TNoOd.value.trim();
            if (!no) return;
            TNoOd.value = no.padStart(6, "0").slice(-6);
            executeSearch("noOd");
        }
        if (e.key === " " || e.key === "Spacebar") {
            e.preventDefault();
            const no = TNoOd.value.trim();
            if (no) {
                TNoOd.value = no.padStart(6, "0").slice(-6);
                btnBagian.focus();
            }
        }
    });

    btnRefresh.addEventListener("click", function () {
        if (lastMode) executeSearch(lastMode);
    });

    btnKeluar.addEventListener("click", function () {
        window.location.href = "/GPS";
    });

    tbodyData.addEventListener("click", function (event) {
        const row = event.target.closest("tr.histori-detail-row");
        if (!row || row.parentElement !== tbodyData) return;

        tbodyData.querySelectorAll("tr.histori-detail-row").forEach(function (item) {
            item.classList.remove("table-active");
        });
        row.classList.add("table-active");
        selectedHistoryRow = row;
    });

    // Lookup bagian
    btnBagian.addEventListener("click", function () {
        const noOd = TNoOd.value.trim();
        if (!noOd) {
            Swal.fire("Info", "Isi nomor order terlebih dahulu.", "info");
            return;
        }
        TNoOd.value = noOd.padStart(6, "0").slice(-6);

        openLookupModal({
            title: "Pilih Bagian Barang",
            url:
                window.historiConfig.routeGetBagianList +
                "?noOd=" +
                encodeURIComponent(TNoOd.value) +
                "&jenisOd=" +
                getJenisOd(),
            headers: ["ID", "Nama Bagian"],
            columns: ["IdBagian", "NamaBagian"],
            onSelect: function (row) {
                TIdBagian.value = row.IdBagian;
                TBagian.value = row.NamaBagian;
                executeSearch("idBag");
            },
        });
    });

    // Double-click row untuk melihat rincian proses pada bulan yang dipilih.
    tbodyData.addEventListener("dblclick", function (e) {
        const tr = e.target.closest("tr");
        if (!tr || tr.parentElement !== tbodyData) return;
        const cells = tr.querySelectorAll("td");
        if (cells.length < 12) return;

        const selected = {
            noOd: cells[0].textContent.trim(),
            namaBarang: cells[2].textContent.trim(),
            namaBagian: cells[5].textContent.trim(),
            idBag: Number.parseInt(cells[6].textContent.trim(), 10),
            bulan: Number.parseInt(cells[10].textContent.trim(), 10),
            tahun: Number.parseInt(cells[11].textContent.trim(), 10),
            kode: getJenisOd() === "H" ? 18 : 19,
        };

        if (
            !selected.noOd ||
            !Number.isInteger(selected.idBag) ||
            selected.idBag < 1 ||
            !Number.isInteger(selected.bulan) ||
            !Number.isInteger(selected.tahun)
        )
            return;

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

    btnKeluarDetail.addEventListener("click", function () {
        detailModal.hide();
    });
    btnRefreshDetail.addEventListener("click", function () {
        if (selectedDetail) loadHistoriDetail(selectedDetail);
    });
    btnTotalDetail.addEventListener("click", function () {
        if (jenisUser !== 1 && jenisUser !== 7) return;
        TTotalBiayaDetail.value = currentDetailTotalBiaya;
    });

    // Form biaya membaca data dari baris histori yang dipilih, seperti form VB.
    btnMaterial.addEventListener("click", function () {
        const selected = getSelectedHistory();
        if (!selected) return;
        selectedCostRow = selected;
        fillCostHeader("materialHistori", selected);
        modalHistoriMaterial.show();
        loadHistoriMaterial(selected);
    });
    btnSPart.addEventListener("click", function () {
        const selected = getSelectedHistory();
        if (!selected) return;
        selectedCostRow = selected;
        fillCostHeader("spartHistori", selected);
        modalHistoriSpart.show();
        loadHistoriSpart(selected);
    });
    btnMakloon.addEventListener("click", function () {
        const selected = getSelectedHistory();
        if (!selected) return;
        selectedCostRow = selected;
        document.getElementById("makloonHistoriNoOd").value = selected.noOd;
        document.getElementById("makloonHistoriNama").value = selected.namaBarang;
        document.getElementById("makloonHistoriBagian").value = selected.namaBagian;
        modalHistoriMakloon.show();
        loadHistoriMakloon(selected);
    });

    btnRefreshHistoriMakloon.addEventListener("click", function () {
        if (selectedCostRow) loadHistoriMakloon(selectedCostRow);
    });
    btnTotalHistoriMakloon.addEventListener("click", function () {
        if (jenisUser !== 1 && jenisUser !== 7) return;
        TTotalMakloon.value = currentMakloonTotalBiaya;
    });

    btnTotal.addEventListener("click", function () {
        TTotalBiaya.value = currentTotalBiaya;
    });
    //#endregion

    //#region Utility & Helper Functions
    function getSelectedHistory() {
        if (!selectedHistoryRow) {
            Swal.fire("Info", "Pilih satu baris histori terlebih dahulu.", "info");
            return null;
        }

        const cells = selectedHistoryRow.querySelectorAll("td");
        if (cells.length < 12) return null;

        const selected = {
            noOd: cells[0].textContent.trim(),
            namaBarang: cells[2].textContent.trim(),
            kdBrg: cells[3].textContent.trim(),
            namaBagian: cells[5].textContent.trim(),
            idBag: Number.parseInt(cells[6].textContent.trim(), 10),
            bulan: Number.parseInt(cells[10].textContent.trim(), 10),
            tahun: Number.parseInt(cells[11].textContent.trim(), 10),
            jenisOd: getJenisOd(),
        };

        if (!selected.noOd || !selected.namaBagian || !Number.isInteger(selected.bulan)
            || !Number.isInteger(selected.tahun) || !Number.isInteger(selected.idBag)
            || selected.idBag < 1) {
            Swal.fire("Info", "Data histori yang dipilih belum lengkap.", "info");
            return null;
        }
        return selected;
    }

    function fillCostHeader(prefix, selected) {
        document.getElementById(prefix + "NoOd").value = selected.noOd;
        document.getElementById(prefix + "Nama").value = selected.namaBarang;
        document.getElementById(prefix + "Kode").value = selected.kdBrg;
        document.getElementById(prefix + "Bagian").value = selected.namaBagian;
    }

    function loadHistoriMaterial(selected) {
        tbodyHistoriMaterial.innerHTML =
            '<tr><td colspan="9" class="text-center text-muted">Memuat daftar material...</td></tr>';
        document.getElementById("TTotalMaterialBaru").value = "0";
        document.getElementById("TTotalMaterial").value = "0";
        document.getElementById("TTotalMaterialBekas").value = "0";

        ajaxGet(window.historiConfig.routeGetMaterialDetail, {
            noOd: selected.noOd,
            namaBagian: selected.namaBagian,
            kdBrg: selected.kdBrg,
            bulan: selected.bulan,
            tahun: selected.tahun,
        }, function (response) {
            document.getElementById("TTotalMaterialBaru").value = response.totalBaru || "0.00";
            document.getElementById("TTotalMaterial").value = response.totalSemua || "0.00";
            document.getElementById("TTotalMaterialBekas").value = response.totalBekas || "0.00";
            renderHistoriMaterial(response.data || []);
        }).fail(function () {
            tbodyHistoriMaterial.innerHTML =
                '<tr><td colspan="9" class="text-center text-danger">Gagal memuat daftar material.</td></tr>';
        });
    }

    function renderHistoriMaterial(data) {
        if (!Array.isArray(data) || data.length === 0) {
            tbodyHistoriMaterial.innerHTML =
                '<tr><td colspan="9" class="text-center text-muted">Tidak ada data material pada periode ini.</td></tr>';
            return;
        }
        let html = "";
        data.forEach(function (row) {
            const color = Number(row.Status) === 1 ? ' style="color:dodgerblue"' : "";
            html += "<tr" + color + ">";
            html += "<td>" + esc(row.MtrType) + "</td>";
            html += "<td>" + esc(row.Spek) + "</td>";
            html += "<td>" + esc(row.KdBrg) + "</td>";
            html += '<td class="text-end">' + esc(row.Jml) + "</td>";
            html += "<td>" + esc(row.NamaSatuan) + "</td>";
            html += '<td class="text-end">' + esc(row.HargaBaru) + "</td>";
            html += '<td class="text-end">' + esc(row.HargaTotal) + "</td>";
            html += '<td class="text-end">' + esc(row.HargaBekas) + "</td>";
            html += '<td class="text-end">' + esc(row.HargaTotalBekas) + "</td>";
            html += "</tr>";
        });
        tbodyHistoriMaterial.innerHTML = html;
    }

    function loadHistoriSpart(selected) {
        tbodyHistoriSpart.innerHTML =
            '<tr><td colspan="9" class="text-center text-muted">Memuat daftar S/Part...</td></tr>';
        document.getElementById("TTotalSpartBaru").value = "0";
        document.getElementById("TTotalSpart").value = "0";
        document.getElementById("TTotalSpartStock").value = "0";

        ajaxGet(window.historiConfig.routeGetSpartDetail, {
            noOd: selected.noOd,
            namaBagian: selected.namaBagian,
            kdBrg: selected.kdBrg,
            bulan: selected.bulan,
            tahun: selected.tahun,
        }, function (response) {
            document.getElementById("TTotalSpartBaru").value = response.totalBaru || "0.00";
            document.getElementById("TTotalSpart").value = response.totalSemua || "0.00";
            document.getElementById("TTotalSpartStock").value = response.totalStock || "0.00";
            renderHistoriSpart(response.data || []);
        }).fail(function () {
            tbodyHistoriSpart.innerHTML =
                '<tr><td colspan="9" class="text-center text-danger">Gagal memuat daftar S/Part.</td></tr>';
        });
    }

    function renderHistoriSpart(data) {
        if (!Array.isArray(data) || data.length === 0) {
            tbodyHistoriSpart.innerHTML =
                '<tr><td colspan="9" class="text-center text-muted">Tidak ada data S/Part pada periode ini.</td></tr>';
            return;
        }
        let html = "";
        data.forEach(function (row) {
            const color = Number(row.Status) === 0 ? ' style="color:dodgerblue"' : "";
            html += "<tr" + color + ">";
            html += "<td>" + esc(row.KdBrg) + "</td>";
            html += "<td>" + esc(row.NamaBarang) + "</td>";
            html += "<td>" + esc(row.SubKategori) + "</td>";
            html += '<td class="text-end">' + esc(row.Jml) + "</td>";
            html += "<td>" + esc(row.Satuan) + "</td>";
            html += '<td class="text-end">' + esc(row.HargaBaru) + "</td>";
            html += '<td class="text-end">' + esc(row.HargaTotalB) + "</td>";
            html += '<td class="text-end">' + esc(row.HargaStok) + "</td>";
            html += '<td class="text-end">' + esc(row.HargaTotalS) + "</td>";
            html += "</tr>";
        });
        tbodyHistoriSpart.innerHTML = html;
    }

    function loadHistoriMakloon(selected) {
        currentMakloonTotalBiaya = "0";
        TTotalMakloon.value = "0";
        tbodyHistoriMakloon.innerHTML =
            '<tr><td colspan="5" class="text-center text-muted">Memuat detail makloon...</td></tr>';

        ajaxGet(window.historiConfig.routeGetMakloonDetail, {
            idBag: selected.idBag,
            jenisOd: selected.jenisOd,
            bulan: selected.bulan,
            tahun: selected.tahun,
        }, function (response) {
            currentMakloonTotalBiaya = response.totalBiaya || "0.00";
            renderHistoriMakloon(response.data || []);
        }).fail(function () {
            tbodyHistoriMakloon.innerHTML =
                '<tr><td colspan="5" class="text-center text-danger">Gagal memuat detail makloon.</td></tr>';
        });
    }

    function renderHistoriMakloon(data) {
        if (!Array.isArray(data) || data.length === 0) {
            tbodyHistoriMakloon.innerHTML =
                '<tr><td colspan="5" class="text-center text-muted">Tidak ada detail makloon pada periode ini.</td></tr>';
            return;
        }
        let html = "";
        data.forEach(function (row) {
            html += "<tr>";
            html += "<td>" + esc(row.NamaType) + "</td>";
            html += '<td class="text-end">' + esc(row.Jml) + "</td>";
            html += '<td class="text-end">' + esc(row.Harga) + "</td>";
            html += '<td class="text-end">' + esc(row.HargaTotal) + "</td>";
            html += "<td>" + esc(row.Keterangan) + "</td>";
            html += "</tr>";
        });
        tbodyHistoriMakloon.innerHTML = html;
    }

    // Panggil endpoint get-data dengan mode tertentu
    function executeSearch(mode) {
        lastMode = mode;
        selectedHistoryRow = null;

        const payload = {
            mode: mode,
            jenisOd: getJenisOd(),
            namaBrg: TNamaBrg.value.trim(),
            kdBrg: TKdBrg.value.trim(),
            noOd: TNoOd.value.trim(),
            idBag: TIdBagian.value ? parseInt(TIdBagian.value) : null,
        };

        if (mode === "kdBrg" && getJenisOd() === "P") {
            Swal.fire(
                "Info",
                "Pencarian Kode Barang hanya tersedia untuk Harian.",
                "info",
            );
            return;
        }

        tbodyData.innerHTML =
            '<tr><td colspan="12" class="text-center text-muted">Memuat data...</td></tr>';
        TTotalBiaya.value = "0";
        currentTotalBiaya = "0";

        ajaxGet(window.historiConfig.routeGetData, payload, function (res) {
            currentTotalBiaya = res.totalBiaya || "0.00";
            renderTable(res.data);
        });
    }

    function renderTable(data) {
        selectedHistoryRow = null;
        if (!data || data.length === 0) {
            tbodyData.innerHTML =
                '<tr><td colspan="12" class="text-center text-muted">Tidak ada data untuk pencarian tersebut.</td></tr>';
            return;
        }

        let html = "";
        data.forEach(function (row) {
            html +=
                '<tr class="histori-detail-row" title="Klik dua kali untuk melihat detail histori">';
            html += '<td class="tbl-cell">' + esc(row.NoOrder) + "</td>";
            html += '<td class="tbl-cell">' + esc(row.Divisi) + "</td>";
            html += '<td class="tbl-cell">' + esc(row.NamaBarang) + "</td>";
            html += '<td class="tbl-cell">' + esc(row.KdBarang) + "</td>";
            html += '<td class="tbl-cell">' + esc(row.NoGbr) + "</td>";
            html += '<td class="tbl-cell">' + esc(row.NamaBagian) + "</td>";
            html +=
                '<td class="tbl-cell d-none">' + esc(row.IdBagian) + "</td>";
            html += '<td class="tbl-cell">' + esc(row.JmlOrder) + "</td>";
            html +=
                '<td class="tbl-cell text-end">' +
                esc(row.TotalBiaya) +
                "</td>";
            html += '<td class="tbl-cell">' + esc(row.FinishKR) + "</td>";
            html += '<td class="tbl-cell d-none">' + esc(row.bulan) + "</td>";
            html += '<td class="tbl-cell d-none">' + esc(row.tahun) + "</td>";
            html += "</tr>";
        });
        tbodyData.innerHTML = html;
    }

    function loadHistoriDetail(selected) {
        currentDetailTotalBiaya = "0";
        TTotalBiayaDetail.value = "0";
        tbodyHistoriDetail.innerHTML =
            '<tr><td colspan="7" class="text-center text-muted">Memuat detail histori...</td></tr>';

        ajaxGet(
            window.historiConfig.routeGetDetail,
            {
                kode: selected.kode,
                idBag: selected.idBag,
                bulan: selected.bulan,
                tahun: selected.tahun,
            },
            function (response) {
                currentDetailTotalBiaya = response.totalBiaya || "0";
                renderDetailTable(response.data || []);
            },
        ).fail(function () {
            tbodyHistoriDetail.innerHTML =
                '<tr><td colspan="7" class="text-center text-danger">Gagal memuat detail histori.</td></tr>';
        });
    }

    function renderDetailTable(data) {
        if (!Array.isArray(data) || data.length === 0) {
            tbodyHistoriDetail.innerHTML =
                '<tr><td colspan="7" class="text-center text-muted">Tidak ada detail proses pada periode ini.</td></tr>';
            return;
        }

        let html = "";
        data.forEach(function (row) {
            html += "<tr>";
            html += '<td class="tbl-cell">' + esc(row.EstDate) + "</td>";
            html += '<td class="tbl-cell">' + esc(row.NamaMesin) + "</td>";
            html += '<td class="tbl-cell">' + esc(row.NamaType) + "</td>";
            html += '<td class="tbl-cell">' + esc(row.SetujuKR) + "</td>";
            html += '<td class="tbl-cell">' + esc(row.RealTime) + "</td>";
            html +=
                '<td class="tbl-cell text-end">' +
                esc(row.JmlSelesai) +
                "</td>";
            html += '<td class="tbl-cell text-end">' + esc(row.Biaya) + "</td>";
            html += "</tr>";
        });
        tbodyHistoriDetail.innerHTML = html;
    }

    function resetSearch() {
        selectedHistoryRow = null;
        TNamaBrg.value = "";
        TKdBrg.value = "";
        TNoOd.value = "";
        TBagian.value = "";
        TIdBagian.value = "";
        lastMode = null;
        tbodyData.innerHTML =
            '<tr><td colspan="12" class="text-center text-muted">Belum ada data.</td></tr>';
        TTotalBiaya.value = "0";
        currentTotalBiaya = "0";
        TNamaBrg.focus();
    }

    function esc(s) {
        return String(s == null ? "" : s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
});
//#endregion
