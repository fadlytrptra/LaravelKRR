//#region Variabel DOM Elements
jQuery(function ($) {
    const BtnKeluar = document.getElementById("btnKeluar");
    const TNoOd = document.getElementById("TNoOd");
    const TDivisi = document.getElementById("TDivisi");
    const TKdBrg = document.getElementById("TKdBrg");
    const TNoGbr = document.getElementById("TNoGbr");
    const TNamaBrg = document.getElementById("TNamaBrg");
    const OdSts = document.getElementById("OdSts");
    const TKetOrder = document.getElementById("TKetOrder");
    const TMesin = document.getElementById("TMesin");
    const TUserOrder = document.getElementById("TUserOrder");
    const BtnBagian = document.getElementById("btnBagian");
    const TBagian = document.getElementById("TBagian");
    const TIdBagian = document.getElementById("TIdBagian");
    const BtnRefresh = document.getElementById("btnRefresh");
    const BtnProses = document.getElementById("btnProses");
    const BtnSetuju = document.getElementById("btnSetuju");
    const BtnTdkSetuju = document.getElementById("btnTdkSetuju");
    const BtnAccSpv = document.getElementById("btnAccSpv");
    const BtnAccPPIC = document.getElementById("btnAccPPIC");
    const TbodyJadwal = document.getElementById("tbodyJadwal");
    const EstStart = document.getElementById("EstStart");
    const EstFinish = document.getElementById("EstFinish");

    let currentJadwalData = [];
    let currentNoOd = "";
//#endregion

//#region Input & Core Events
    BtnKeluar.addEventListener("click", function () {
        if (this.textContent.trim().toUpperCase() === "BATAL") {
            clearAll();
            this.textContent = "KELUAR";
            TNoOd.focus();
        } else {
            window.location.href = "/GPS";
        }
    });

    TNoOd.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let noOdVal = this.value.trim();
            if (noOdVal !== "") {
                noOdVal = noOdVal.padStart(6, "0").slice(-6);
                this.value = noOdVal;
                currentNoOd = noOdVal;
                loadOrder(noOdVal);
            } else {
                Swal.fire("Info", "Isi Nomer Ordernya", "info");
            }
        }
    });

    BtnBagian.addEventListener("click", function () {
        let noOd = TNoOd.value.trim();
        if (!noOd) {
            Swal.fire("Info", "Isi nomor order terlebih dahulu.", "info");
            return;
        }
        openLookupModal({
            title: "Pilih Bagian Gambar",
            url:
                window.finishJadwalConfig.routeGetBagianList +
                "?noOd=" +
                safeUrlParam(noOd),
            headers: ["ID", "Nama Bagian"],
            columns: ["IdBagian", "NamaBagian"],
            onSelect: function (row) {
                TIdBagian.value = row.IdBagian;
                TBagian.value = row.NamaBagian;
                loadJadwal(noOd, row.IdBagian);
            },
        });
    });

    BtnRefresh.addEventListener("click", function () {
        let noOd = TNoOd.value.trim();
        let idBagian = TIdBagian.value.trim();
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

    BtnProses.addEventListener("click", function () {
        let items = getCheckedItems();
        if (items.length !== 1) {
            Swal.fire("Info", "Pilih 1 data yang akan diproses.", "info");
            return;
        }
        if (!["default", "finish", "setuju", "tdksetuju"].includes(items[0].status)) {
            Swal.fire("Info", "Status data tidak dapat diproses.", "info");
            return;
        }
        let noOd = TNoOd.value.trim();
        let idBagian = TIdBagian.value.trim();
        if (!noOd || !idBagian) {
            Swal.fire("Info", "Data tidak lengkap.", "info");
            return;
        }

        showInputRealForm("Input Real Time").then((result) => {
            if (result.isConfirmed) {
                const input = result.value;
                let payload = {
                    action: "proses",
                    noOd: noOd,
                    idBagian: idBagian,
                    items: items,
                    realHour: input.realTimeHour,
                    realMinute: input.realTimeMinute,
                    keterangan: input.keterangan,
                };
                ajaxPost(
                    window.finishJadwalConfig.routeStore,
                    payload,
                    null,
                    null,
                    function (response) {
                        reloadData();
                    },
                );
            }
        });
    });

    BtnSetuju.addEventListener("click", function () {
        let items = getCheckedItems();
        if (items.length === 0) {
            Swal.fire("Info", "Pilih minimal satu data.", "info");
            return;
        }
        items = items.filter((item) => ["finish", "tdksetuju"].includes(item.status));
        if (items.length === 0) {
            Swal.fire("Info", "Pilih data berwarna turquoise atau orange.", "info");
            return;
        }
        let noOd = TNoOd.value.trim();
        let idBagian = TIdBagian.value.trim();
        if (!noOd || !idBagian) {
            Swal.fire("Info", "Data tidak lengkap.", "info");
            return;
        }
        let payload = {
            action: "setuju",
            noOd: noOd,
            idBagian: idBagian,
            items: items,
        };
        ajaxPost(
            window.finishJadwalConfig.routeStore,
            payload,
            null,
            null,
            function (response) {
                reloadData();
            },
        );
    });

    BtnTdkSetuju.addEventListener("click", function () {
        let items = getCheckedItems();
        if (items.length === 0) {
            Swal.fire("Info", "Pilih minimal satu data.", "info");
            return;
        }
        items = items.filter((item) => ["finish", "setuju"].includes(item.status));
        if (items.length === 0) {
            Swal.fire("Info", "Pilih data berwarna turquoise atau hijau.", "info");
            return;
        }
        let noOd = TNoOd.value.trim();
        let idBagian = TIdBagian.value.trim();
        if (!noOd || !idBagian) {
            Swal.fire("Info", "Data tidak lengkap.", "info");
            return;
        }

        showAlasan1Form("Alasan Tidak Disetujui").then((result) => {
            if (result.isConfirmed) {
                let payload = {
                    action: "tdksetuju",
                    noOd: noOd,
                    idBagian: idBagian,
                    items: items,
                    alasan: result.value,
                };
                ajaxPost(
                    window.finishJadwalConfig.routeStore,
                    payload,
                    null,
                    null,
                    function (response) {
                        reloadData();
                    },
                );
            }
        });
    });

    BtnAccSpv.addEventListener("click", function () {
        const items = getAllItems();
        if (items.length === 0 || items.some((item) => item.status !== "setuju")) {
            Swal.fire("Info", "Semua data harus berwarna hijau sebelum di-ACC SPV.", "info");
            return;
        }
        let noOd = TNoOd.value.trim();
        let idBagian = TIdBagian.value.trim();
        if (!noOd || !idBagian) {
            Swal.fire("Info", "Data tidak lengkap.", "info");
            return;
        }
        let payload = {
            action: "accspv",
            noOd: noOd,
            idBagian: idBagian,
            items: items,
        };
        ajaxPost(
            window.finishJadwalConfig.routeStore,
            payload,
            null,
            null,
            function (response) {
                reloadData();
            },
        );
    });

    BtnAccPPIC.addEventListener("click", function () {
        let items = getCheckedItems();
        if (items.length === 0) {
            Swal.fire("Info", "Pilih minimal satu data.", "info");
            return;
        }
        items = items.filter((item) => item.status === "tdksetuju");
        if (items.length === 0) {
            Swal.fire("Info", "Pilih data berwarna orange.", "info");
            return;
        }
        let noOd = TNoOd.value.trim();
        let idBagian = TIdBagian.value.trim();
        if (!noOd || !idBagian) {
            Swal.fire("Info", "Data tidak lengkap.", "info");
            return;
        }
        let payload = {
            action: "accppic",
            noOd: noOd,
            idBagian: idBagian,
            items: items,
        };
        ajaxPost(
            window.finishJadwalConfig.routeStore,
            payload,
            null,
            null,
            function (response) {
                reloadData();
            },
        );
    });
//#endregion

//#region Utility & Helper Functions
    function loadOrder(noOd) {
        ajaxGet(
            window.finishJadwalConfig.routeGetOrder,
            { noOd: noOd },
            function (data) {
                TDivisi.value = data.TDivisi;
                TKdBrg.value = data.TKdBrg;
                TNamaBrg.value = data.TNamaBrg;
                TNoGbr.value = data.TNoGbr;
                OdSts.textContent = data.OdSts;
                TKetOrder.value = data.TKetOrder;
                TMesin.value = data.TMesin;
                TUserOrder.value = data.TUserOrder;
                EstStart.textContent = data.EstStart;
                EstFinish.textContent = data.EstFinish;

                // reset bagian
                TBagian.value = "";
                TIdBagian.value = "";
                clearTable();
                BtnKeluar.textContent = "BATAL";
                BtnBagian.focus();
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
            window.finishJadwalConfig.routeGetJadwal,
            { noOd: noOd, idBagian: idBagian },
            function (data) {
                currentJadwalData = data;
                renderTable(data);
            },
        );
    }

    function renderTable(data) {
        let tbody = TbodyJadwal;
        tbody.innerHTML = "";

        if (!data || data.length === 0) {
            tbody.innerHTML =
                '<tr><td colspan="12" class="text-center">Tidak ada jadwal untuk bagian ini.</td></tr>';
            Swal.fire(
                "Info",
                "Tidak ada jadwal untuk nomer order: " +
                    TNoOd.value.trim() +
                    ", bagian: " +
                    TBagian.value.trim() +
                    ". Atau sudah finish semua.",
                "info",
            );
            return;
        }
        let html = "";
        $.each(data, function (index, row) {
            let rowClass = "row-" + row.status;
            html += `<tr class="${rowClass}" data-est-date="${row.estDateValue}">`;
            html += `<td><input type="checkbox" class="rowCheckbox" style="margin-right:8px; cursor:pointer;"><span class="noAntrian">${row.NoAntrian}</span></td>`;
            html += `<td>${row.EstDate}</td>`;
            html += `<td>${row.NamaWorkStation}</td>`;
            html += `<td style="display:none;">${row.NoWrkSts}</td>`;
            html += `<td>${row.EstTime}</td>`;
            html += `<td class="text-center">${row.HariKe}</td>`;
            html += `<td>${row.RealTime}</td>`;
            html += `<td>${row.TglFinish || "-"}</td>`;
            html += `<td>${row.SetujuKR || "-"}</td>`;
            html += `<td>${row.TdkSetujuKR || "-"}</td>`;
            html += `<td>${row.RefTdkSetujuKR || "-"}</td>`;
            html += `<td style="display:none;">${row.status}</td>`;
            html += `</tr>`;
        });
        TbodyJadwal.innerHTML = html;
    }

    function getCheckedItems() {
        let items = [];
        let rows = TbodyJadwal.querySelectorAll("tr");

        rows.forEach(function (tr) {
            let checkbox = tr.querySelector(".rowCheckbox");
            if (checkbox && checkbox.checked) {
                let cells = tr.querySelectorAll("td");
                let noAntrian = cells[0] ? cells[0].textContent.trim() : "";
                let estDate = tr.dataset.estDate || "";
                let noWrkSts = cells[3] ? cells[3].textContent.trim() : "";
                let status = (tr.className.match(/row-(default|finish|setuju|tdksetuju)/) || [])[1] || "default";

                if (noAntrian && estDate && noWrkSts) {
                    items.push({
                        noAntrian: noAntrian,
                        estDate: estDate,
                        noWrkSts: parseInt(noWrkSts) || 0,
                        status: status,
                    });
                }
            }
        });
        return items;
    }

    function getAllItems() {
        TbodyJadwal.querySelectorAll(".rowCheckbox").forEach((checkbox) => {
            checkbox.checked = true;
        });
        return getCheckedItems();
    }

    function reloadData() {
        let noOd = TNoOd.value.trim();
        let idBagian = TIdBagian.value.trim();
        if (noOd && idBagian) {
            loadJadwal(noOd, idBagian);
        }
    }

    function clearTable() {
        TbodyJadwal.innerHTML =
            '<tr><td colspan="12" class="text-center">Belum ada data.</td></tr>';
        currentJadwalData = [];
    }

    function clearAll() {
        [
            TDivisi,
            TKdBrg,
            TNoGbr,
            TNamaBrg,
            TKetOrder,
            TMesin,
            TUserOrder,
            TBagian,
            TIdBagian,
        ].forEach((el) => (el.value = ""));
        OdSts.textContent = "";
        EstStart.textContent = "";
        EstFinish.textContent = "";
        clearTable();
        BtnKeluar.textContent = "KELUAR";
    }
});
//#endregion
