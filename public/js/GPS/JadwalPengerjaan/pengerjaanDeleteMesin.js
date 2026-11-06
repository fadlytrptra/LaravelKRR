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
    const tbodyJadwal = document.getElementById("tbodyJadwal");
    const btnPilih = document.getElementById("btnPilih");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnProses = document.getElementById("btnProses");
    const btnKeluar = document.getElementById("btnKeluar");

    let currentJadwalData = [];
//#endregion

//#region Input & Core Events
    btnKeluar.addEventListener("click", function () {
        if (btnKeluar.textContent.trim().toLowerCase() === "keluar") {
            window.location.href = "/GPS";
        } else {
            resetForm();
        }
    });

    btnMesin.addEventListener("click", function () {
        openLookupModal({
            title: "Pilih Mesin",
            url: window.pkjDelMesinConfig.routeGetMesinList,
            headers: ["ID", "Nama Mesin"],
            columns: ["NoMesin", "NamaMesin"],
            onSelect: function (row) {
                TNoMesin.value = row.NoMesin;
                TMesin.value = row.NamaMesin;
                TNoType.value = "";
                TType.value = "";
                clearTable();
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
                window.pkjDelMesinConfig.routeGetTypeList +
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

    Date1.addEventListener("keypress", function (e) {
        if (e.key === "Enter") Date2.focus();
    });

    Date2.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
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
        const noMesin = TNoMesin.value.trim();
        const noType = TNoType.value.trim();
        const date1 = Date1.value;
        const date2 = Date2.value;
        if (!noMesin || !noType || !date1 || !date2) {
            Swal.fire(
                "Info",
                "Lengkapi Mesin, Type Mesin, dan Rentang Tanggal.",
                "info",
            );
            return;
        }
        if (new Date(date2) < new Date(date1)) {
            Swal.fire("Info", "Tanggal akhir harus >= tanggal awal.", "info");
            return;
        }
        loadJadwal(noMesin, noType, date1, date2);
        btnKeluar.textContent = "Batal";
    });

    btnRefresh.addEventListener("click", function () {
        const noMesin = TNoMesin.value.trim();
        const noType = TNoType.value.trim();
        const date1 = Date1.value;
        const date2 = Date2.value;
        if (noMesin && noType && date1 && date2) {
            loadJadwal(noMesin, noType, date1, date2);
        } else {
            Swal.fire("Info", "Isi data filter terlebih dahulu.", "info");
        }
    });

    btnPilih.addEventListener("click", function () {
        const checkboxes = tbodyJadwal.querySelectorAll(".rowCheckbox");
        let allChecked = true;
        for (let cb of checkboxes) {
            if (!cb.checked) {
                allChecked = false;
                break;
            }
        }
        const targetState = !allChecked;
        for (let cb of checkboxes) cb.checked = targetState;
        setBtnPilihState();
    });

    tbodyJadwal.addEventListener("change", function (e) {
        if (e.target.classList.contains("rowCheckbox")) {
            setBtnPilihState();
        }
    });

    btnProses.addEventListener("click", function () {
        const checkedItems = getCheckedItems();
        if (checkedItems.length === 0) {
            Swal.fire("Pesan", "Pilih jadwal yang akan dihapus.", "warning");
            return;
        }

        showAlasanForm("Keterangan").then((result) => {
            if (result.isConfirmed) {
                const payload = {
                    noMesin: TNoMesin.value.trim(),
                    noType: TNoType.value.trim(),
                    keterangan: result.value, // result.value berisi teks alasan/keterangan
                    items: checkedItems.map((it) => ({
                        noAntrian: it.noAntrian,
                        noOrder: it.noOrder,
                        tgl: it.tglStart, // Pastikan property ini sesuai dengan data Anda
                        idBagian: it.idBagian,
                    })),
                };

                ajaxPost(
                    window.pkjDelMesinConfig.routeStore,
                    payload,
                    null,
                    null,
                    function (response) {
                        Swal.fire("Sukses", response.message, "success").then(
                            () => {
                                // Reload data
                                const noMesin = TNoMesin.value.trim();
                                const noType = TNoType.value.trim();
                                const date1 = Date1.value;
                                const date2 = Date2.value;
                                loadJadwal(noMesin, noType, date1, date2);
                            },
                        );
                    },
                );
            }
        });
    });
//#endregion

//#region Utility & Helper Functions
    function setBtnPilihState() {
        const checkboxes = tbodyJadwal.querySelectorAll(".rowCheckbox");
        if (checkboxes.length === 0) {
            btnPilih.textContent = "Pilih Semua";
            return;
        }
        let allChecked = true;
        for (let cb of checkboxes) {
            if (!cb.checked) {
                allChecked = false;
                break;
            }
        }
        btnPilih.textContent = allChecked ? "Batal Semua" : "Pilih Semua";
    }

    function loadJadwal(noMesin, noType, date1, date2) {
        ajaxGet(
            window.pkjDelMesinConfig.routeGetJadwal,
            {
                noMesin: noMesin,
                noType: noType,
                date1: date1,
                date2: date2,
            },
            function (data) {
                currentJadwalData = data;
                renderTable(data);
                setBtnPilihState();
            },
        );
    }

    function renderTable(data) {
        tbodyJadwal.innerHTML = "";
        if (!data || data.length === 0) {
            tbodyJadwal.innerHTML =
                '<tr><td colspan="14" class="text-center">Tidak ada jadwal pada rentang tanggal ini.</td></tr>';
            return;
        }
        let html = "";
        for (const row of data) {
            let rowClass = "";
            if (row.statusWarna === "emergency") rowClass = "row-emergency";
            else if (row.statusWarna === "tolak-mng")
                rowClass = "row-tolak-mng";

            html += `<tr class="${rowClass}">`;
            html += `<td><input type="checkbox" class="rowCheckbox" style="margin-right: 8px; cursor: pointer;">${row.NoAntrian}</td>`;
            html += `<td>${row.NoOrder}</td>`;
            html += `<td>${row.EstDate}</td>`;
            html += `<td>${row.NamaBarang}</td>`;
            html += `<td>${row.KdBarang}</td>`;
            html += `<td>${row.EstTime}</td>`;
            html += `<td>${row.NamaDivisi}</td>`;
            html += `<td class="text-end">${row.JmlOrder}</td>`;
            html += `<td>${row.NamaBagian}</td>`;
            html += `<td class="text-end">${row.JmlDikerjakan}</td>`;
            html += `<td style="display:none;">${row.IdBagian}</td>`;
            html += `<td style="display:none;">${row.JenisOrder}</td>`;
            html += `<td style="display:none;">${row.Status}</td>`;
            html += `<td style="display:none;">${row.Tgl_Tolak_Mng || ""}</td>`;
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
                    tglStart: cells[2].textContent.trim(),
                    idBagian: parseInt(cells[10].textContent.trim()) || 0,
                });
            }
        });
        return items;
    }

    function clearTable() {
        tbodyJadwal.innerHTML =
            '<tr><td colspan="14" class="text-center">Belum ada data.</td></tr>';
        currentJadwalData = [];
        btnPilih.textContent = "Pilih Semua";
    }

    function resetForm() {
        TMesin.value = "";
        TNoMesin.value = "";
        TType.value = "";
        TNoType.value = "";
        btnOK.disabled = true;
        btnKeluar.textContent = "Keluar";
        clearTable();
        btnMesin.focus();
    }
});
//#endregion
