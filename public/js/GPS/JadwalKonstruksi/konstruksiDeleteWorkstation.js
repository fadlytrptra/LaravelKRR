//#region Variabel DOM Elements
jQuery(function ($) {
    const TWorkSts = document.getElementById("TWorkSts");
    const TNoWorkSts = document.getElementById("TNoWorkSts");
    const btnWrkSts = document.getElementById("btnWrkSts");
    const Date1 = document.getElementById("Date1");
    const Date2 = document.getElementById("Date2");
    const btnOK = document.getElementById("btnOK");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnProses = document.getElementById("btnProses");
    const btnKeluar = document.getElementById("btnKeluar");
    const btnPilih = document.getElementById("btnPilih");
    const tbodyJadwal = document.getElementById("tbodyJadwal");

    let currentJadwalData = [];
//#endregion

//#region Input & Core Events
    btnKeluar.addEventListener("click", function () {
        if (this.textContent.trim().toUpperCase() === "BATAL") {
            clearTable;
            this.textContent = "KELUAR";
            btnWrkSts.focus();
        } else {
            window.location.href = "/GPS";
        }
    });

    btnWrkSts.addEventListener("click", function () {
        openLookupModal({
            title: "Pilih Work Station",
            url: window.delPerWSConfig.routeGetWorkstationList,
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
            Date2.focus();
        }
    });

    Date2.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            // Enable OK dan fokus
            btnOK.disabled = false;
            btnOK.focus();
        }
    });

    Date1.addEventListener("change", function () {
        btnOK.disabled = true;
        clearTable();
    });
    Date2.addEventListener("change", function () {
        btnOK.disabled = true;
        clearTable();
    });

    btnOK.addEventListener("click", function () {
        let worksts = TNoWorkSts.value.trim();
        let startDate = Date1.value;
        let endDate = Date2.value;
        if (!worksts || !startDate || !endDate) {
            Swal.fire("Info", "Isi Work Station dan rentang tanggal.", "info");
            return;
        }
        if (new Date(endDate) < new Date(startDate)) {
            Swal.fire("Info", "Tanggal akhir harus >= tanggal awal.", "info");
            return;
        }
        loadJadwal(worksts, startDate, endDate);
        btnKeluar.textContent = "Batal";
    });

    btnRefresh.addEventListener("click", function () {
        let worksts = TNoWorkSts.value.trim();
        let startDate = Date1.value;
        let endDate = Date2.value;
        if (!worksts || !startDate || !endDate) {
            Swal.fire("Info", "Isi data terlebih dahulu.", "info");
            return;
        }
        loadJadwal(worksts, startDate, endDate);
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

        let worksts = TNoWorkSts.value.trim();
        if (!worksts) {
            Swal.fire("Info", "Work Station tidak ditemukan.", "info");
            return;
        }

        showAlasanForm("Alasan Penghapusan").then((result) => {
            if (result.isConfirmed) {
                let payload = {
                    worksts: worksts,
                    items: checkedItems.map((item) => ({
                        noAntrian: item.noAntrian,
                        estDate: item.estDate,
                        idBagian: item.idBagian,
                    })),
                    alasan: result.value,
                };

                ajaxPost(
                    window.delPerWSConfig.routeStore,
                    payload,
                    null,
                    null,
                    function (response) {
                        Swal.fire("Sukses", response.message, "success").then(
                            () => {
                                // Reload data
                                let startDate = Date1.value;
                                let endDate = Date2.value;
                                if (startDate && endDate) {
                                    loadJadwal(worksts, startDate, endDate);
                                }
                                // Reset checkbox all dan tombol pilih

                                btnPilih.textContent = "Pilih Semua";
                            },
                        );
                    },
                );
            }
        });
    });
//#endregion

//#region Utility & Helper Functions
    function loadJadwal(worksts, startDate, endDate) {
        ajaxGet(
            window.delPerWSConfig.routeGetJadwal,
            { worksts: worksts, startDate: startDate, endDate: endDate },
            function (data) {
                currentJadwalData = data;
                renderTable(data);
                btnPilih.textContent = "Pilih Semua";
            },
        );
    }

    function renderTable(data) {
        tbodyJadwal.innerHTML = "";
        if (!data || data.length === 0) {
            tbodyJadwal.innerHTML =
                '<tr><td colspan="11" class="text-center">Tidak ada jadwal pada rentang tanggal ini.</td></tr>';
            return;
        }
        let html = "";
        for (let row of data) {
            let rowClass = "";
            if (row.Status === 1) rowClass = "row-emergency";
            if (row.Tgl_Tolak_Mng) rowClass = "row-tolak-mng";
            html += `<tr class="${rowClass}">`;
            html += `<td><input type="checkbox" class="rowCheckbox" style="margin-right: 8px; cursor: pointer;">${row.NoAntrian}</td>`;
            html += `<td>${row.NoOrder}</td>`;
            html += `<td data-est-date="${row.EstDateValue}">${row.EstDate}</td>`;
            html += `<td>${row.NamaDivisi}</td>`;
            html += `<td>${row.Nama_Brg}</td>`;
            html += `<td>${row.NamaBagian}</td>`;
            html += `<td>${row.EstTime}</td>`;
            html += `<td class="text-center">${row.HariKe}</td>`;
            html += `<td style="display:none;">${row.IdBagian}</td>`;
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
                let cellNoAntrian = cells[0].cloneNode(true);
                let checkboxInside =
                    cellNoAntrian.querySelector(".rowCheckbox");
                if (checkboxInside) checkboxInside.remove();
                let noAntrian = cellNoAntrian.textContent.trim();

                let estDate = cells[2]?.dataset.estDate || "";
                let idBagian = parseInt(cells[8]?.textContent.trim()) || 0;

                if (noAntrian && estDate && idBagian) {
                    items.push({ noAntrian, estDate, idBagian });
                }
            }
        }
        return items;
    }

    function clearTable() {
        tbodyJadwal.innerHTML =
            '<tr><td colspan="11" class="text-center">Belum ada data.</td></tr>';
        currentJadwalData = [];

        btnPilih.textContent = "Pilih Semua";
        btnKeluar.textContent = "Keluar";
    }

    btnOK.disabled = true;
});
//#endregion
