//#region Variabel DOM Elements
jQuery(function ($) {
    const OptHarian = document.getElementById("OptHarian");
    const OptProyek = document.getElementById("OptProyek");
    const TNoOd = document.getElementById("TNoOd");
    const TDivisi = document.getElementById("TDivisi");
    const TKdBrg = document.getElementById("TKdBrg");
    const TNoGbr = document.getElementById("TNoGbr");
    const TNamaBrg = document.getElementById("TNamaBrg");
    const TJml = document.getElementById("TJml");
    const TMesin = document.getElementById("TMesin");
    const TUserOrder = document.getElementById("TUserOrder");
    const TKetOrder = document.getElementById("TKetOrder");
    const OdSts = document.getElementById("OdSts");
    const TBagian = document.getElementById("TBagian");
    const TIdBagian = document.getElementById("TIdBagian");
    const btnBagian = document.getElementById("btnBagian");
    const tbodyJadwal = document.getElementById("tbodyJadwal");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnSetuju = document.getElementById("btnSetuju");
    const btnTdkSetuju = document.getElementById("btnTdkSetuju");
    const btnAccSpv = document.getElementById("btnAccSpv");
    const btnAccPPIC = document.getElementById("btnAccPPIC");
    const btnProses = document.getElementById("btnProses");
    const btnKeluar = document.getElementById("btnKeluar");

    const jenisUser = parseInt(window.pkjFinishConfig.jenisUser) || 0;

    let currentJadwalData = [];

    function getJenisOd() {
        return OptHarian.checked ? "H" : "P";
    }
//#endregion

//#region Input & Core Events
    OptHarian.addEventListener("change", function () {
        if (this.checked) resetAll();
    });
    OptProyek.addEventListener("change", function () {
        if (this.checked) resetAll();
    });

    btnKeluar.addEventListener("click", function () {
        if (btnKeluar.textContent.trim().toUpperCase() === "KELUAR") {
            window.location.href = "/GPS";
        } else {
            resetAll();
        }
    });

    TNoOd.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let noOdVal = this.value.trim();
            if (noOdVal !== "") {
                noOdVal = noOdVal.padStart(6, "0").slice(-6);
                this.value = noOdVal;
                loadOrder(noOdVal);
            } else {
                Swal.fire("Info", "Isi nomer ordernya.", "info");
            }
        }
    });

    btnBagian.addEventListener("click", function () {
        const noOd = TNoOd.value.trim();
        if (!noOd) {
            Swal.fire("Info", "Isi nomor order terlebih dahulu.", "info");
            return;
        }
        openLookupModal({
            title: "Pilih Bagian Barang",
            url:
                window.pkjFinishConfig.routeGetBagianList +
                "?noOd=" +
                safeUrlParam(noOd) +
                "&jenisOd=" +
                getJenisOd(),
            headers: ["ID", "Nama Bagian"],
            columns: ["IdBagian", "NamaBagian"],
            onSelect: function (row) {
                TIdBagian.value = row.IdBagian;
                TBagian.value = row.NamaBagian;
                loadJadwal(noOd, row.IdBagian);
            },
        });
    });

    btnRefresh.addEventListener("click", function () {
        const noOd = TNoOd.value.trim();
        const idBagian = TIdBagian.value.trim();
        if (noOd && idBagian) {
            loadJadwal(noOd, idBagian);
        } else {
            Swal.fire(
                "Info",
                "Isi nomor order dan pilih bagian terlebih dahulu.",
                "info",
            );
        }
    });

    btnProses.addEventListener("click", function () {
        const checked = getCheckedItems();
        if (checked.length !== 1) {
            Swal.fire("Info", "Pilih 1 data yang akan diproses.", "info");
            return;
        }
        const item = checked[0];

        // Validasi warna: hanya boleh WindowText (default) atau DarkTurquoise (finish) untuk jenis 1/5
        // atau Green/Orange untuk jenis 1/7 (re-process)
        const isDefaultOrFinish =
            item.statusWarna === "default" || item.statusWarna === "finish";
        const isGreenOrOrange =
            item.statusWarna === "setuju" || item.statusWarna === "tdksetuju";

        if (isDefaultOrFinish && ![1, 5].includes(jenisUser)) {
            Swal.fire("Info", "Anda tidak berhak memproses data ini.", "info");
            return;
        }
        if (isGreenOrOrange && ![1, 7].includes(jenisUser)) {
            Swal.fire("Info", "Anda tidak berhak memproses data ini.", "info");
            return;
        }

        // Validasi tanggal: EstDate tidak boleh > hari ini
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tglStart = new Date(item.tglStart);
        if (tglStart > today) {
            Swal.fire(
                "Pesan",
                "Tanggal Finish lebih kecil dari tgl start.",
                "warning",
            );
            return;
        }

        showInputRealForm("Input Data Finish").then((result) => {
            if (result.isConfirmed) {
                const payload = {
                    action: "proses",
                    noOd: TNoOd.value.trim(),
                    idBagian: TIdBagian.value.trim(),
                    items: [item],
                    realHour: result.value.realTimeHour,
                    realMinute: result.value.realTimeMinute,
                    jmlFinish: result.value.jmlFinish,
                    keterangan: result.value.keterangan,
                };
                ajaxPost(
                    window.pkjFinishConfig.routeStore,
                    payload,
                    null,
                    null,
                    function (response) {
                        Swal.fire("Sukses", response.message, "success").then(
                            () => reloadData(),
                        );
                    },
                );
            }
        });
    });

    btnSetuju.addEventListener("click", function () {
        const checked = getCheckedItems();
        if (checked.length === 0) {
            Swal.fire("Info", "Pilih minimal satu data.", "info");
            return;
        }
        // Filter hanya item DarkTurquoise (finish) + jmlBrg <= jmlFinish
        const valid = checked.filter((it) => it.statusWarna === "finish");
        if (valid.length === 0) {
            Swal.fire("Info", "Tidak ada data yang bisa disetujui.", "info");
            return;
        }
        // Note: backend akan validasi jmlBrg <= jmlFinish, jika tidak terpenuhi akan di-skip
        const payload = {
            action: "setuju",
            noOd: TNoOd.value.trim(),
            idBagian: TIdBagian.value.trim(),
            items: valid,
        };
        ajaxPost(
            window.pkjFinishConfig.routeStore,
            payload,
            null,
            null,
            function (response) {
                Swal.fire("Sukses", response.message, "success").then(() =>
                    reloadData(),
                );
            },
        );
    });

    btnTdkSetuju.addEventListener("click", function () {
        const checked = getCheckedItems();
        if (checked.length === 0) {
            Swal.fire("Info", "Pilih minimal satu data.", "info");
            return;
        }
        const valid = checked.filter((it) => it.statusWarna === "finish");
        if (valid.length === 0) {
            Swal.fire("Info", "Tidak ada data yang bisa diproses.", "info");
            return;
        }

        showAlasan1Form("Alasan Tidak Disetujui").then((result) => {
            if (result.isConfirmed) {
                const payload = {
                    action: "tdksetuju",
                    noOd: TNoOd.value.trim(),
                    idBagian: TIdBagian.value.trim(),
                    items: valid,
                    alasan: result.value,
                };
                ajaxPost(
                    window.pkjFinishConfig.routeStore,
                    payload,
                    null,
                    null,
                    function (response) {
                        Swal.fire("Sukses", response.message, "success").then(
                            () => reloadData(),
                        );
                    },
                );
            }
        });
    });

    btnAccSpv.addEventListener("click", function () {
        const rows = getTableRows();
        if (rows.length === 0) {
            Swal.fire("Info", "Tidak ada data.", "info");
            return;
        }
        // Semua item harus Green (setuju)
        const allGreen = rows.every((it) => it.statusWarna === "setuju");
        if (!allGreen) {
            Swal.fire(
                "Pesan",
                "Tidak bisa di-ACC, karena proses kerjanya belum Finish semua.",
                "warning",
            );
            return;
        }

        Swal.fire({
            title: "Konfirmasi ACC Supervisor",
            text: "Anda yakin ingin meng-ACC semua item?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, ACC",
            cancelButtonText: "Batal",
        }).then((r) => {
            if (r.isConfirmed) {
                const payload = {
                    action: "accspv",
                    noOd: TNoOd.value.trim(),
                    idBagian: TIdBagian.value.trim(),
                    items: rows.map((it) => ({
                        noAntrian: it.noAntrian,
                        noMesin: it.noMesin,
                        noType: it.noType,
                        tgl: it.tglStart,
                        idBagian: it.idBagian,
                    })),
                };
                ajaxPost(
                    window.pkjFinishConfig.routeStore,
                    payload,
                    null,
                    null,
                    function (response) {
                        Swal.fire("Sukses", response.message, "success").then(
                            () => reloadData(),
                        );
                    },
                );
            }
        });
    });

    btnAccPPIC.addEventListener("click", function () {
        const checked = getCheckedItems();
        if (checked.length === 0) {
            Swal.fire("Info", "Pilih minimal satu data.", "info");
            return;
        }
        const valid = checked.filter((it) => it.statusWarna === "tdksetuju");
        if (valid.length === 0) {
            Swal.fire(
                "Info",
                "Tidak ada data (Tdk Setuju KR) yang bisa di-ACC.",
                "info",
            );
            return;
        }

        const payload = {
            action: "accppic",
            noOd: TNoOd.value.trim(),
            idBagian: TIdBagian.value.trim(),
            items: valid,
        };
        ajaxPost(
            window.pkjFinishConfig.routeStore,
            payload,
            null,
            null,
            function (response) {
                Swal.fire("Sukses", response.message, "success").then(() =>
                    reloadData(),
                );
            },
        );
    });
//#endregion

//#region Utility & Helper Functions
    function reloadData() {
        const noOd = TNoOd.value.trim();
        const idBagian = TIdBagian.value.trim();
        if (noOd && idBagian) loadJadwal(noOd, idBagian);
    }

    function loadOrder(noOd) {
        ajaxGet(
            window.pkjFinishConfig.routeGetOrder,
            { noOd: noOd, jenisOd: getJenisOd() },
            function (data) {
                TDivisi.value = data.TDivisi;
                TKdBrg.value = data.TKdBrg;
                TNamaBrg.value = data.TNamaBrg;
                TNoGbr.value = data.TNoGbr;
                TJml.value = data.TJml;
                OdSts.textContent = data.OdSts;
                TKetOrder.value = data.TKetOrder;
                TMesin.value = data.TMesin;
                TUserOrder.value = data.TUserOrder;

                TBagian.value = "";
                TIdBagian.value = "";
                clearTable();

                btnKeluar.textContent = "Batal";
                btnBagian.focus();
            },
        ).fail(function (xhr) {
            if (xhr.status === 400 || xhr.status === 404) {
                clearAll();
                TNoOd.value = "";
                TNoOd.focus();
            }
        });
    }

    function loadJadwal(noOd, idBagian) {
        ajaxGet(
            window.pkjFinishConfig.routeGetJadwal,
            { noOd: noOd, idBag: idBagian, jenisOd: getJenisOd() },
            function (data) {
                currentJadwalData = data;
                renderTable(data);
            },
        );
    }

    function renderTable(data) {
        tbodyJadwal.innerHTML = "";
        if (!data || data.length === 0) {
            tbodyJadwal.innerHTML =
                '<tr><td colspan="18" class="text-center">Tidak ada jadwal pengerjaan untuk order & bagian ini, atau sudah finish semua.</td></tr>';
            return;
        }
        let html = "";
        for (const row of data) {
            let rowClass = "";
            if (row.statusWarna === "finish") rowClass = "row-finish";
            else if (row.statusWarna === "setuju") rowClass = "row-setuju";
            else if (row.statusWarna === "tdksetuju")
                rowClass = "row-tdksetuju";
            else if (row.statusWarna === "emergency")
                rowClass = "row-emergency";

            html += `<tr class="${rowClass}">`;
            html += `<td><input type="checkbox" class="rowCheckbox" style="margin-right: 8px; cursor: pointer;">${row.NoAntrian}</td>`;
            html += `<td>${row.TglStart}</td>`;
            html += `<td>${row.NamaMesin}</td>`;
            html += `<td>${row.NamaType}</td>`;
            html += `<td>${row.EstTime}</td>`;
            html += `<td class="text-end">${row.JmlDikerjakan}</td>`;
            html += `<td>${row.RealTime}</td>`;
            html += `<td class="text-end">${row.JmlFinish || ""}</td>`;
            html += `<td>${row.TglFinish || ""}</td>`;
            html += `<td>${row.SetujuKR || ""}</td>`;
            html += `<td>${row.TdkSetujuKR || ""}</td>`;
            html += `<td>${row.RefTdkSetujuKR || ""}</td>`;
            html += `<td>${row.AccPPIC || ""}</td>`;
            html += `<td style="display:none;">${row.NoMesin}</td>`;
            html += `<td style="display:none;">${row.NoType}</td>`;
            html += `<td style="display:none;">${row.IdBagian}</td>`;
            html += `<td style="display:none;">${row.JmlBrg}</td>`;
            html += `<td style="display:none;">${row.statusWarna}</td>`;
            html += `</tr>`;
        }
        tbodyJadwal.innerHTML = html;
    }

    function getTableRows() {
        const rows = [];
        tbodyJadwal.querySelectorAll("tr").forEach((tr) => {
            const cells = tr.querySelectorAll("td");
            if (cells.length < 18) return;
            rows.push({
                noAntrian: cells[0].textContent.trim(),
                tglStart: cells[1].textContent.trim(),
                noMesin: parseInt(cells[13].textContent.trim()) || 0,
                noType: parseInt(cells[14].textContent.trim()) || 0,
                idBagian: parseInt(cells[15].textContent.trim()) || 0,
                jmlBrg: parseInt(cells[16].textContent.trim()) || 0,
                statusWarna: cells[17].textContent.trim(),
            });
        });
        return rows;
    }

    function getCheckedItems() {
        const rows = [];
        tbodyJadwal.querySelectorAll("tr").forEach((tr) => {
            const cb = tr.querySelector(".rowCheckbox");
            if (cb && cb.checked) {
                const cells = tr.querySelectorAll("td");
                if (cells.length < 18) return;
                rows.push({
                    noAntrian: cells[0].textContent.trim(),
                    tglStart: cells[1].textContent.trim(),
                    jmlBrg: parseInt(cells[16].textContent.trim()) || 0,
                    jmlFinish: parseInt(cells[7].textContent.trim()) || 0,
                    noMesin: parseInt(cells[13].textContent.trim()) || 0,
                    noType: parseInt(cells[14].textContent.trim()) || 0,
                    idBagian: parseInt(cells[15].textContent.trim()) || 0,
                    statusWarna: cells[17].textContent.trim(),
                });
            }
        });
        return rows.map((it) => ({
            noAntrian: it.noAntrian,
            noMesin: it.noMesin,
            noType: it.noType,
            tgl: it.tglStart,
            idBagian: it.idBagian,
            jmlBrg: it.jmlBrg,
            jmlFinish: it.jmlFinish,
            statusWarna: it.statusWarna,
        }));
    }

    function clearTable() {
        tbodyJadwal.innerHTML =
            '<tr><td colspan="18" class="text-center">Belum ada data.</td></tr>';
        currentJadwalData = [];
    }

    function clearAll() {
        TDivisi.value = "";
        TKdBrg.value = "";
        TNoGbr.value = "";
        TNamaBrg.value = "";
        TJml.value = "";
        TMesin.value = "";
        TUserOrder.value = "";
        TKetOrder.value = "";
        OdSts.textContent = "";
        TBagian.value = "";
        TIdBagian.value = "";
        clearTable();
    }

    function resetAll() {
        clearAll();
        TNoOd.value = "";
        // OptHarian.checked = true;
        // OptProyek.checked = false;
        btnKeluar.textContent = "KELUAR";
        TNoOd.focus();
    }
});
//#endregion
