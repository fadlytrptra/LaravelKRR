//#region Variabel DOM Elements
jQuery(function ($) {
    const TMesin = document.getElementById("TMesin");
    const TNoMesin = document.getElementById("TNoMesin");
    const btnMesin = document.getElementById("btnMesin");
    const TType = document.getElementById("TType");
    const TNoType = document.getElementById("TNoType");
    const btnType = document.getElementById("btnType");
    const Date1 = document.getElementById("Date1");
    const btnOK = document.getElementById("btnOK");
    const btnProses = document.getElementById("btnProses");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnKeluar = document.getElementById("btnKeluar");
    const tbodyJadwal = document.getElementById("tbodyJadwal");

    let currentJadwalData = [];

    setDefaultDate();
//#endregion

//#region Input & Core Events
    btnKeluar.addEventListener("click", function () {
        if (btnKeluar.textContent.trim().toUpperCase() === "KELUAR") {
            window.location.href = "/GPS";
        } else {
            resetForm();
        }
    });

    btnMesin.addEventListener("click", function () {
        openLookupModal({
            title: "Pilih Mesin",
            url: window.editJadwalMesinConfig.routeGetMesinList,
            headers: ["ID", "Nama Mesin"],
            columns: ["NoMesin", "NamaMesin"],
            onSelect: function (row) {
                TNoMesin.value = row.NoMesin;
                TMesin.value = row.NamaMesin;
                // Reset type & table
                TNoType.value = "";
                TType.value = "";
                clearTable();
                // Fokus ke tombol Type
                btnType.focus();
            },
        });
    });

    btnType.addEventListener("click", function () {
        if (!TNoMesin.value) {
            Swal.fire("Info", "Pilih mesin terlebih dahulu.", "info");
            return;
        }

        openLookupModal({
            title: "Pilih Type Mesin",
            url:
                window.editJadwalMesinConfig.routeGetTypeList +
                "?noMesin=" +
                safeUrlParam(TNoMesin.value),
            headers: ["ID", "Nama Type"],
            columns: ["NoType", "NamaType"],
            onSelect: function (row) {
                TNoType.value = row.NoType;
                TType.value = row.NamaType;
                // Fokus ke Date1
                Date1.focus();
            },
        });
    });

    Date1.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            const tgl = new Date(this.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (tgl < today) {
                Swal.fire(
                    "Pesan",
                    "Tanggal estimasi harus lebih besar dari/sama dengan tanggal sekarang.",
                    "warning",
                );
                btnOK.disabled = true;
                this.focus();
                return;
            }
            btnOK.disabled = false;
            btnOK.focus();
        }
    });

    Date1.addEventListener("change", function () {
        btnOK.disabled = true;
        clearTable();
    });

    btnOK.addEventListener("click", function () {
        const noMesin = TNoMesin.value.trim();
        const noType = TNoType.value.trim();
        const date = Date1.value;
        if (!noMesin || !noType || !date) {
            Swal.fire(
                "Info",
                "Lengkapi Mesin, Type Mesin, dan Tanggal.",
                "info",
            );
            return;
        }
        loadJadwal(noMesin, noType, date);
        // Ubah tombol keluar menjadi "Batal"
        btnKeluar.textContent = "Batal";
    });

    btnRefresh.addEventListener("click", function () {
        const noMesin = TNoMesin.value.trim();
        const noType = TNoType.value.trim();
        const date = Date1.value;
        if (noMesin && noType && date) {
            loadJadwal(noMesin, noType, date);
        } else {
            Swal.fire(
                "Info",
                "Isi Mesin, Type Mesin, dan Tanggal terlebih dahulu.",
                "info",
            );
        }
    });

    tbodyJadwal.addEventListener("change", function (e) {
        if (e.target.classList.contains("rowCheckbox")) {
            updateProsesButton();
        }
    });

    btnProses.addEventListener("click", function () {
        const checkedItems = getCheckedItems();
        if (checkedItems.length !== 2) {
            Swal.fire("Pesan", "Pilih 2 data.", "warning");
            return;
        }

        const noMesin = TNoMesin.value.trim();
        const noType = TNoType.value.trim();
        const date = Date1.value;

        const noAntri1 = checkedItems[0].noAntrian;
        const noAntri2 = checkedItems[1].noAntrian;

        // Konfirmasi swap
        Swal.fire({
            title: "Konfirmasi Tukar Posisi",
            html: `
                <p>Tukar posisi antara:</p>
                <p><b>Antrian ${noAntri1}</b> ↔ <b>Antrian ${noAntri2}</b></p>
                <p>Lanjutkan?</p>
            `,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Tukar",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                doSwap(noMesin, noType, date, noAntri1, noAntri2);
            }
        });
    });
//#endregion

//#region Utility & Helper Functions
    function setDefaultDate() {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, "0");
        const d = String(today.getDate()).padStart(2, "0");
        Date1.value = `${y}-${m}-${d}`;
    }

    function updateProsesButton() {
        const checked = tbodyJadwal.querySelectorAll(
            ".rowCheckbox:checked",
        ).length;
        // Aktifkan tombol Proses hanya jika tepat 2 item
        btnProses.disabled = checked !== 2;
    }


    function doSwap(noMesin, noType, date, noAntri1, noAntri2) {
        ajaxPost(
            window.editJadwalMesinConfig.routeStore,
            {
                noMesin: noMesin,
                noType: noType,
                date: date,
                noAntri1: noAntri1,
                noAntri2: noAntri2,
            },
            null,
            null,
            function (response) {
                Swal.fire("Sukses", response.message, "success").then(() => {
                    loadJadwal(noMesin, noType, date);
                    updateProsesButton();
                });
            },
        );
    }

    function loadJadwal(noMesin, noType, date) {
        ajaxGet(
            window.editJadwalMesinConfig.routeGetJadwal,
            { noMesin: noMesin, noType: noType, date: date },
            function (data) {
                currentJadwalData = data;
                renderTable(data);
                updateProsesButton();
            },
        );
    }

    function renderTable(data) {
        tbodyJadwal.innerHTML = "";
        if (!data || data.length === 0) {
            tbodyJadwal.innerHTML =
                '<tr><td colspan="13" class="text-center">Tidak ada jadwal pada tanggal ini.</td></tr>';
            return;
        }
        let html = "";
        for (const row of data) {
            let rowClass = "";
            if (row.Status === 1) rowClass = "row-emergency";
            else if (row.Cancel === 1) rowClass = "row-cancel";

            html += `<tr class="${rowClass}">`;
            html += `<td><input type="checkbox" class="rowCheckbox" style="margin-right: 8px; cursor: pointer;">${row.NoAntrian}</td>`;
            html += `<td>${row.NoOrder}</td>`;
            html += `<td>${row.TglStart}</td>`;
            html += `<td>${row.NamaBarang}</td>`;
            html += `<td>${row.KdBarang}</td>`;
            html += `<td>${row.EstTime}</td>`;
            html += `<td>${row.NamaDivisi}</td>`;
            html += `<td class="text-end">${row.JmlOrder}</td>`;
            html += `<td>${row.NamaBagian}</td>`;
            html += `<td class="text-end">${row.JmlDikerjakan}</td>`;
            html += `<td style="display:none;">${row.IdBagian}</td>`;
            html += `<td style="display:none;">${row.Status}</td>`;
            html += `<td style="display:none;">${row.Cancel}</td>`;
            html += `</tr>`;
        }
        tbodyJadwal.innerHTML = html;
    }

    function getCheckedItems() {
        const items = [];
        tbodyJadwal.querySelectorAll("tr").forEach((tr) => {
            const cb = tr.querySelector(".rowCheckbox");
            if (cb && cb.checked) {
                const cells = tr.querySelectorAll("td");
                items.push({
                    noAntrian: cells[0].textContent.trim(),
                    noOrder: cells[1].textContent.trim(),
                    idBagian: parseInt(cells[10].textContent.trim()) || 0,
                });
            }
        });
        return items;
    }

    function clearTable() {
        tbodyJadwal.innerHTML =
            '<tr><td colspan="13" class="text-center">Belum ada data.</td></tr>';
        currentJadwalData = [];
        updateProsesButton();
    }

    function resetForm() {
        TMesin.value = "";
        TNoMesin.value = "";
        TType.value = "";
        TNoType.value = "";
        btnOK.disabled = true;
        btnProses.disabled = true;
        btnKeluar.textContent = "KELUAR";
        clearTable();
        setDefaultDate();
        btnMesin.focus();
    }
});
//#endregion
