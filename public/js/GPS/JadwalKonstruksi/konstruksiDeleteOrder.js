//#region Variabel DOM Elements
jQuery(function ($) {
    const TNoOd = document.getElementById("TNoOd");
    const TDivisi = document.getElementById("TDivisi");
    const TKdBrg = document.getElementById("TKdBrg");
    const TNoGbr = document.getElementById("TNoGbr");
    const TNamaBrg = document.getElementById("TNamaBrg");
    const TMesin = document.getElementById("TMesin");
    const TUserOrder = document.getElementById("TUserOrder");
    const TKetOrder = document.getElementById("TKetOrder");
    const OdSts = document.getElementById("OdSts");
    const TBagian = document.getElementById("TBagian");
    const TIdBagian = document.getElementById("TIdBagian");
    const btnBagian = document.getElementById("btnBagian");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnProses = document.getElementById("btnProses");
    const btnKeluar = document.getElementById("btnKeluar");
    const btnPilih = document.getElementById("btnPilih");
    const tbodyJadwal = document.getElementById("tbodyJadwal");

    let currentNoOd = "";
    let currentJadwalData = [];
//#endregion

//#region Input & Core Events
    btnKeluar.addEventListener("click", function () {
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
                Swal.fire("Info", "Isi nomer ordernya.", "info");
            }
        }
    });

    btnBagian.addEventListener("click", function () {
        let noOd = TNoOd.value.trim();
        if (!noOd) {
            Swal.fire("Info", "Isi nomor order terlebih dahulu.", "info");
            return;
        }
        openLookupModal({
            title: "Pilih Bagian Gambar",
            url:
                window.delPerOrderConfig.routeGetBagianList +
                "?noOd=" +
                safeUrlParam(noOd),
            headers: ["ID", "Nama Bagian"],
            columns: ["IdBagian", "NamaBagian"],
            onSelect: function (row) {
                TIdBagian.value = row.IdBagian;
                TBagian.value = row.NamaBagian;
                loadJadwal(noOd, row.IdBagian);
                // Ubah tombol keluar menjadi "Batal" (seperti di VB)
                btnKeluar.innerText = "KELUAR";
            },
        });
    });

    btnRefresh.addEventListener("click", function () {
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

    document.addEventListener("change", function (e) {
        if (e.target.classList.contains("rowCheckbox")) {
            let checkboxes = tbodyJadwal.querySelectorAll(".rowCheckbox");
            let total = checkboxes.length;
            let checked = 0;

            for (let cb of checkboxes) {
                if (cb.checked) checked++;
            }

            btnPilih.innerText =
                total === checked && total > 0 ? "Batal Semua" : "Pilih Semua";
        }
    });

    btnPilih.addEventListener("click", function () {
        let checkboxes = tbodyJadwal.querySelectorAll(".rowCheckbox");

        let allChecked = checkboxes.length > 0;
        for (let cb of checkboxes) {
            if (!cb.checked) {
                allChecked = false;
                break;
            }
        }
        let targetState = !allChecked;

        for (let cb of checkboxes) {
            cb.checked = targetState;
        }

        btnPilih.innerText = targetState ? "Batal Semua" : "Pilih Semua";
    });

    btnProses.addEventListener("click", function () {
        let checkedItems = getCheckedItems();
        if (checkedItems.length === 0) {
            Swal.fire("Info", "Pilih jadwal yang akan dihapus.", "info");
            return;
        }

        let noOd = TNoOd.value.trim();
        let idBagian = TIdBagian.value.trim();
        if (!noOd || !idBagian) {
            Swal.fire("Info", "Data tidak lengkap.", "info");
            return;
        }

        showAlasanForm("Alasan Penghapusan").then((result) => {
            if (result.isConfirmed) {
                let payload = {
                    noOd: noOd,
                    idBagian: idBagian,
                    items: checkedItems.map((item) => ({
                        noAntrian: item.noAntrian,
                        estDate: item.estDate,
                        noWrkSts: item.noWrkSts,
                    })),
                    alasan: result.value,
                };

                ajaxPost(
                    window.delPerOrderConfig.routeStore,
                    payload,
                    null,
                    null,
                    function (response) {
                        Swal.fire("Sukses", response.message, "success").then(
                            () => {
                                // Reload data
                                loadJadwal(noOd, idBagian);
                                // Reset checkbox dan tombol pilih

                                btnPilih.innerText = "Pilih Semua";
                            },
                        );
                    },
                );
            }
        });
    });
//#endregion

//#region Utility & Helper Functions
    function loadOrder(noOd) {
        ajaxGet(
            window.delPerOrderConfig.routeGetOrder,
            { noOd: noOd },
            function (data) {
                TDivisi.value = data.TDivisi;
                TKdBrg.value = data.TKdBrg;
                TNamaBrg.value = data.TNamaBrg;
                TNoGbr.value = data.TNoGbr;
                OdSts.innerText = data.OdSts;
                TKetOrder.value = data.TKetOrder;
                TMesin.value = data.TMesin;
                TUserOrder.value = data.TUserOrder;

                // Reset bagian
                TBagian.value = "";
                TIdBagian.value = "";
                btnKeluar.textContent = "Batal";
                clearTable();
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
            window.delPerOrderConfig.routeGetJadwal,
            { noOd: noOd, idBagian: idBagian },
            function (data) {
                currentJadwalData = data;
                renderTable(data);
                btnPilih.innerText = "Pilih Semua";
            },
        );
    }

    function renderTable(data) {
        tbodyJadwal.innerHTML = "";
        if (!data || data.length === 0) {
            tbodyJadwal.innerHTML =
                '<tr><td colspan="8" class="text-center">Tidak ada jadwal untuk order dan bagian ini.</td></tr>';
            return;
        }
        let html = "";
        for (let row of data) {
            let rowClass = "";
            if (row.Status === 1) rowClass = "row-emergency";
            if (row.Tgl_Tolak_Mng) rowClass = "row-tolak-mng";
            html += `<tr class="${rowClass}" data-est-date="${row.estDateValue}">`;
            html += `<td><input type="checkbox" class="rowCheckbox" style="margin-right:8px; cursor:pointer;"><span class="nomorUrut">${row.NoAntrian}</span></td>`;
            html += `<td>${row.EstDate}</td>`;
            html += `<td>${row.NamaWorkStation}</td>`;
            html += `<td style="display:none;">${row.NoWrkSts}</td>`;
            html += `<td>${row.EstTime}</td>`;
            html += `<td class="text-center">${row.HariKe}</td>`;
            html += `<td style="display:none;">${row.Status}</td>`;
            html += `<td style="display:none;">${row.Tgl_Tolak_Mng || ""}</td>`;
            html += `</tr>`;
        }
        tbodyJadwal.innerHTML = html;
    }

    function getCheckedItems() {
        let items = [];
        let rows = tbodyJadwal.querySelectorAll("tr");
        for (let row of rows) {
            let checkbox = row.querySelector(".rowCheckbox");
            if (checkbox && checkbox.checked) {
                let cells = row.querySelectorAll("td");
                let spanNoAntrian = cells[0].querySelector(".nomorUrut");
                let noAntrian = spanNoAntrian
                    ? spanNoAntrian.textContent.trim()
                    : "";
                let estDate = row.dataset.estDate || "";

                let noWrkSts = parseInt(cells[3]?.textContent.trim(), 10) || 0;

                if (noAntrian && estDate && noWrkSts) {
                    items.push({ noAntrian, estDate, noWrkSts });
                }
            }
        }
        return items;
    }

    function clearTable() {
        tbodyJadwal.innerHTML =
            '<tr><td colspan="8" class="text-center">Belum ada data.</td></tr>';
        currentJadwalData = [];

        btnPilih.innerText = "Pilih Semua";
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
        OdSts.innerText = "";
        clearTable();
        btnKeluar.innerText = "Keluar";
    }
});
//#endregion
