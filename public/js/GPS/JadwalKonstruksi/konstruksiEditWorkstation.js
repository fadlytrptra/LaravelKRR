//#region Variabel DOM Elements
jQuery(function ($) {
    const BtnWrkSts = document.getElementById("btnWrkSts");
    const TNoWorkSts = document.getElementById("TNoWorkSts");
    const TWorkSts = document.getElementById("TWorkSts");
    const Date1 = document.getElementById("Date1");
    const BtnOK = document.getElementById("btnOK");
    const BtnRefresh = document.getElementById("btnRefresh");
    const BtnProses = document.getElementById("btnProses");
    const BtnKeluar = document.getElementById("btnKeluar");
    const TBodyJadwal = document.getElementById("tbodyJadwal");

    let currentJadwalData = [];
    setDefaultDates();
//#endregion

//#region Input & Core Events
    BtnKeluar.addEventListener("click", function () {
        if (this.textContent.trim().toUpperCase() === "BATAL") {
            clearTable();
            TNoWorkSts.value = "";
            TWorkSts.value = "";
            Date1.value = "";
            BtnOK.disabled = true;
            this.textContent = "KELUAR";
            BtnWrkSts.focus();
        } else {
            window.location.href = "/GPS";
        }
    });

    BtnWrkSts.addEventListener("click", function () {
        openLookupModal({
            title: "Pilih Work Station",
            url: window.editPerWSConfig.routeGetWorkstationList,
            headers: ["ID", "Nama Work Station"],
            columns: ["NoWrkSts", "NamaWorkStation"],
            onSelect: function (row) {
                TNoWorkSts.value = row.NoWrkSts;
                TWorkSts.value = row.NamaWorkStation;
                Date1.focus();
            },
        });
    });

    Date1.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let worksts = TNoWorkSts.value.trim();
            let date = this.value.trim();
            if (!worksts || !date) {
                Swal.fire(
                    "Info",
                    "Isi work station dan tanggal terlebih dahulu.",
                    "info",
                );
                return;
            }
            // Validasi tanggal >= hari ini
            let today = new Date().toISOString().split("T")[0];
            if (date < today) {
                Swal.fire(
                    "Pesan",
                    "Tanggal estimasi harus lebih besar dari/sama dengan tanggal sekarang.",
                    "warning",
                );
                this.focus();
                return;
            }
            BtnOK.disabled = false;
            BtnOK.focus();
        }
    });

    Date1.addEventListener("change", function () {
        BtnOK.disabled = true;
        clearTable();
    });

    BtnOK.addEventListener("click", function () {
        let worksts = TNoWorkSts.value.trim();
        let date = Date1.value.trim();
        if (!worksts || !date) {
            Swal.fire("Info", "Isi work station dan tanggal.", "info");
            return;
        }
        // Validasi tanggal
        let today = new Date().toISOString().split("T")[0];
        if (date < today) {
            Swal.fire(
                "Pesan",
                "Tanggal estimasi harus lebih besar dari/sama dengan tanggal sekarang.",
                "warning",
            );
            Date1.focus();
            return;
        }
        loadJadwal(worksts, date);
        BtnKeluar.textContent = "Batal";
    });

    BtnRefresh.addEventListener("click", function () {
        let worksts = TNoWorkSts.value.trim();
        let date = Date1.value.trim();
        if (worksts && date) {
            loadJadwal(worksts, date);
        } else {
            Swal.fire(
                "Info",
                "Isi work station dan tanggal terlebih dahulu.",
                "info",
            );
        }
    });

    document.addEventListener("change", function (event) {
        if (!event.target.matches(".rowCheckbox")) return;

        const total = TBodyJadwal.querySelectorAll(".rowCheckbox").length;
        const checked = TBodyJadwal.querySelectorAll(
            ".rowCheckbox:checked",
        ).length;
        const isAllChecked = total === checked;
        CheckAll.checked = isAllChecked;
    });

    BtnProses.addEventListener("click", function () {
        let items = getCheckedItems();
        if (items.length !== 2) {
            Swal.fire(
                "Info",
                "Pilih tepat 2 data untuk ditukar posisinya.",
                "info",
            );
            return;
        }
        let worksts = TNoWorkSts.value.trim();
        let date = Date1.value.trim();
        if (!worksts || !date) {
            Swal.fire("Info", "Data tidak lengkap.", "info");
            return;
        }

        let payload = {
            worksts: worksts,
            date: date,
            items: items,
        };

        ajaxPost(
            window.editPerWSConfig.routeStore,
            payload,
            null,
            null,
            function (response) {
                Swal.fire("Pesan", "Proses selesai.", "success").then(() => {
                    loadJadwal(worksts, date);
                });
            },
        );
    });
//#endregion

//#region Utility & Helper Functions
    function setDefaultDates() {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, "0");
        const d = String(today.getDate()).padStart(2, "0");
        const localDate = `${y}-${m}-${d}`;
        Date1.value = localDate;
    }

    function loadJadwal(worksts, date) {
        ajaxGet(
            window.editPerWSConfig.routeGetJadwal,
            { worksts: worksts, date: date },
            function (data) {
                currentJadwalData = data;
                renderTable(data);
            },
        );
    }

    function renderTable(data) {
        let tbody = TBodyJadwal;
        tbody.innerHTML = "";
        if (!data || data.length === 0) {
            tbody.innerHTML =
                '<tr><td colspan="12" class="text-center">Tidak ada jadwal pada tanggal ini.</td></tr>';
            return;
        }
        let html = "";
        data.forEach(function (row) {
            let rowClass = "";
            if (row.Status === 1) rowClass = "row-emergency";
            else if (row.Cancel === 1) rowClass = "row-cancel";
            html += `<tr class="${rowClass}">`;
            html += `<td><input type="checkbox" class="rowCheckbox" style="margin-right: 8px; cursor: pointer;">${row.NoAntrian}</td>`;
            html += `<td>${row.NoOrder}</td>`;
            html += `<td>${row.EstDate}</td>`;
            html += `<td>${row.NamaDivisi}</td>`;
            html += `<td>${row.Nama_Brg}</td>`;
            html += `<td>${row.NamaBagian}</td>`;
            html += `<td>${row.EstTime}</td>`;
            html += `<td class="text-center">${row.HariKe}</td>`;
            html += `<td style="display:none;">${row.IdBagian}</td>`;
            html += `<td style="display:none;">${row.Status}</td>`;
            html += `<td style="display:none;">${row.Cancel}</td>`;
            html += `</tr>`;
        });
        tbody.innerHTML = html;
    }

    function getCheckedItems() {
        let items = [];
        TBodyJadwal.querySelectorAll("tr").forEach(function (tr) {
            let checkbox = tr.querySelector(".rowCheckbox");
            if (checkbox && checkbox.checked) {
                let cells = tr.querySelectorAll("td");

                let noAntrian = cells[0].textContent.trim();

                if (noAntrian) {
                    items.push({ noAntrian: noAntrian });
                }
            }
        });
        return items;
    }

    function clearTable() {
        TBodyJadwal.innerHTML =
            '<tr><td colspan="12" class="text-center">Belum ada data.</td></tr>';
        currentJadwalData = [];
    }
});
//#endregion
