//#region Variabel DOM Elements
jQuery(function ($) {
    const OptHarian = document.getElementById("OptHarian");
    const OptProyek = document.getElementById("OptProyek");
    const Date1 = document.getElementById("Date1");
    const Date2 = document.getElementById("Date2");
    const btnOK = document.getElementById("btnOK");
    const tbodyMaterial = document.getElementById("tbodyMaterial");
    const btnRefresh = document.getElementById("btnRefresh");
    const btnProses = document.getElementById("btnProses");
    const btnKeluar = document.getElementById("btnKeluar");
    const modalHargaMaterialElement = document.getElementById("modalHargaMaterial");
    const modalHargaMaterial = bootstrap.Modal.getOrCreateInstance(modalHargaMaterialElement);
    const formHargaMaterial = document.getElementById("formHargaMaterial");
    const inputHargaMaterial = document.getElementById("inputHargaMaterial");
    const inputJumlahMaterial = document.getElementById("inputJumlahMaterial");
    const inputKodeSatuanMaterial = document.getElementById("inputKodeSatuanMaterial");
    const inputNamaSatuanMaterial = document.getElementById("inputNamaSatuanMaterial");
    const satuanMaterialFeedback = document.getElementById("satuanMaterialFeedback");
    const btnLookupSatuanMaterial = document.getElementById("btnLookupSatuanMaterial");

    let currentMaterialData = [];
    let materialUntukDiproses = null;

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
        if (btnKeluar.textContent.trim().toLowerCase() === "keluar") {
            window.location.href = "/GPS";
        } else {
            resetAll();
        }
    });

    Date1.addEventListener("keypress", function (e) {
        if (e.key === "Enter") Date2.focus();
    });

    Date2.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            btnOK.focus();
        }
    });

    btnOK.addEventListener("click", function () {
        const date1 = Date1.value;
        const date2 = Date2.value;
        if (!date1 || !date2) {
            Swal.fire("Info", "Isi rentang tanggal.", "info");
            return;
        }
        if (new Date(date2) < new Date(date1)) {
            Swal.fire("Info", "Tanggal akhir harus >= tanggal awal.", "info");
            return;
        }
        loadData(getJenisOd(), date1, date2);
        btnKeluar.textContent = "Batal";
    });

    btnRefresh.addEventListener("click", function () {
        const date1 = Date1.value;
        const date2 = Date2.value;
        if (date1 && date2) {
            loadData(getJenisOd(), date1, date2);
        } else {
            Swal.fire("Info", "Isi rentang tanggal terlebih dahulu.", "info");
        }
    });

    btnProses.addEventListener("click", function () {
        const checked = getCheckedItems();
        if (checked.length !== 1) {
            Swal.fire("Pesan", "Pilih 1 data untuk diproses.", "warning");
            return;
        }
        const item = checked[0];

        // Validasi: KdBrgMtr tidak boleh kosong
        if (!item.kdBrgMtr || item.kdBrgMtr.trim() === "") {
            Swal.fire(
                "Pesan",
                "Data tidak bisa diproses karena Kd. Barang Material masih kosong.",
                "warning",
            );
            return;
        }

        // Tentukan harga yang dipakai
        // Warna Baru (status=0) → pakai HargaBaruRaw
        // Warna Bekas (status=1) → pakai HargaBekasRaw
        const isBekas = item.status === 1;
        const hargaDefault = isBekas ? item.hargaBekasRaw : item.hargaBaruRaw;

        materialUntukDiproses = item;
        document.getElementById("hargaMaterialType").textContent = item.mtrType || "-";
        document.getElementById("hargaMaterialSpek").textContent = item.spek || "-";
        inputHargaMaterial.value = hargaDefault > 0 ? hargaDefault : "0";
        inputJumlahMaterial.value = item.jmlMaterialRaw > 0 ? item.jmlMaterialRaw : "0";
        inputKodeSatuanMaterial.value = item.noSat || "";
        inputNamaSatuanMaterial.value = item.satuanMtr || "";
        satuanMaterialFeedback.classList.add("d-none");
        formHargaMaterial.classList.remove("was-validated");
        modalHargaMaterial.show();
        modalHargaMaterialElement.addEventListener("shown.bs.modal", () => inputHargaMaterial.focus(), { once: true });
    });

    inputHargaMaterial.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (Number(this.value) > 0) inputJumlahMaterial.focus();
            else this.reportValidity();
        }
    });

    inputJumlahMaterial.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (Number(this.value) > 0) btnLookupSatuanMaterial.focus();
            else this.reportValidity();
        }
    });

    btnLookupSatuanMaterial.addEventListener("click", function () {
        modalHargaMaterialElement.addEventListener("hidden.bs.modal", function () {
            openLookupModal({
                title: "Pilih Satuan",
                url: window.pkjHargaMtrConfig.routeGetSatuanList,
                headers: ["Kode Satuan", "Nama Satuan"],
                columns: ["NoSat", "Satuan"],
                backdrop: false,
                onSelect: function (row) {
                    inputKodeSatuanMaterial.value = row.NoSat || "";
                    inputNamaSatuanMaterial.value = row.Satuan || "";
                    satuanMaterialFeedback.classList.add("d-none");
                },
                onHidden: function () {
                    if (materialUntukDiproses) modalHargaMaterial.show();
                },
            });
        }, { once: true });
        modalHargaMaterial.hide();
    });

    formHargaMaterial.addEventListener("submit", function (event) {
        event.preventDefault();
        const harga = Number(inputHargaMaterial.value);
        const jml = Number(inputJumlahMaterial.value);
        const validHarga = Number.isFinite(harga) && harga > 0;
        const validJumlah = Number.isFinite(jml) && jml > 0;
        inputHargaMaterial.setCustomValidity(validHarga ? "" : "Harga material tidak boleh nol.");
        inputJumlahMaterial.setCustomValidity(validJumlah ? "" : "Jumlah material tidak boleh nol.");
        formHargaMaterial.classList.add("was-validated");
        if (!validHarga) {
            inputHargaMaterial.reportValidity();
            return;
        }
        if (!validJumlah) {
            inputJumlahMaterial.reportValidity();
            return;
        }
        if (!inputKodeSatuanMaterial.value.trim()) {
            satuanMaterialFeedback.classList.remove("d-none");
            btnLookupSatuanMaterial.focus();
            return;
        }
        if (!materialUntukDiproses) return;

        const input = {
            jml: jml,
            harga: harga,
            noSat: inputKodeSatuanMaterial.value.trim(),
        };
        modalHargaMaterial.hide();
        doProcess(materialUntukDiproses, input);
        materialUntukDiproses = null;
    });
//#endregion

//#region Utility & Helper Functions
    function doProcess(item, input) {
        const payload = {
            status: item.status,
            nomer: item.nomer,
            idBagian: item.idBagian,
            jml: input.jml,
            harga: input.harga,
            noSat: input.noSat,
        };

        ajaxPost(
            window.pkjHargaMtrConfig.routeStore,
            payload,
            null,
            null,
            function (response) {
                Swal.fire("Sukses", response.message, "success").then(() => {
                    loadData(getJenisOd(), Date1.value, Date2.value);
                });
            },
        );
    }

    function loadData(jenisOd, date1, date2) {
        ajaxGet(
            window.pkjHargaMtrConfig.routeGetMaterialOrder,
            { jenisOd: jenisOd, date1: date1, date2: date2 },
            function (data) {
                currentMaterialData = data;
                renderTable(data);
            },
        );
    }

    function renderTable(data) {
        tbodyMaterial.innerHTML = "";
        if (!data || data.length === 0) {
            tbodyMaterial.innerHTML =
                '<tr><td colspan="27" class="text-center">Tidak ada data untuk rentang tanggal ini.</td></tr>';
            return;
        }
        let html = "";
        for (const row of data) {
            const rowClass = row.statusWarna === "bekas" ? "row-bekas" : "";

            html += `<tr class="${rowClass}">`;
            html += `<td class="tbl-cell text-nowrap"><input type="checkbox" class="rowCheckbox align-middle" style="display: inline-block; margin: 0 8px 0 0; cursor: pointer;"><span>${row.NoOrder}</span></td>`;
            html += `<td class="tbl-cell">${row.Divisi}</td>`;
            html += `<td class="tbl-cell">${row.NamaBarang}</td>`;
            html += `<td class="tbl-cell">${row.KdBarang}</td>`;
            html += `<td class="tbl-cell">${row.NoGambar}</td>`;
            html += `<td class="tbl-cell text-end">${row.JmlOrder}</td>`;
            html += `<td class="tbl-cell">${row.TglStart}</td>`;
            html += `<td class="tbl-cell">${row.NamaBagian}</td>`;
            html += `<td class="tbl-cell">${row.MtrType}</td>`;
            html += `<td class="tbl-cell">${row.Spek}</td>`;
            html += `<td class="tbl-cell">${row.KdBrgMtr}</td>`;
            html += `<td class="tbl-cell text-end">${row.JmlMaterial}</td>`;
            html += `<td class="tbl-cell text-end">${row.HargaBaru}</td>`;
            html += `<td class="tbl-cell text-end">${row.HargaTotalBaru}</td>`;
            html += `<td class="tbl-cell text-end">${row.HargaBekas}</td>`;
            html += `<td class="tbl-cell text-end">${row.HargaTotalBekas}</td>`;
            html += `<td class="tbl-cell">${row.AccSpv}</td>`;
            html += `<td class="tbl-cell">${row.TglBon}</td>`;
            // Hidden columns
            html += `<td style="display:none;">${row.IdBagian}</td>`;
            html += `<td style="display:none;">${row.Nomer}</td>`;
            html += `<td style="display:none;">${row.JmlMaterialRaw}</td>`;
            html += `<td style="display:none;">${row.SatuanMtr}</td>`;
            html += `<td style="display:none;">${row.HargaBaruRaw}</td>`;
            html += `<td style="display:none;">${row.HargaBekasRaw}</td>`;
            html += `<td style="display:none;">${row.NoSat}</td>`;
            html += `<td style="display:none;">${row.Status}</td>`;
            html += `<td style="display:none;">${row.statusWarna}</td>`;
            html += `</tr>`;
        }
        tbodyMaterial.innerHTML = html;
    }

    function getCheckedItems() {
        const items = [];
        tbodyMaterial.querySelectorAll("tr").forEach((tr) => {
            const cb = tr.querySelector(".rowCheckbox");
            if (cb && cb.checked) {
                const cells = tr.querySelectorAll("td");
                items.push({
                    // Visible
                    noOrder: cells[0].textContent.trim(),
                    divisi: cells[1].textContent.trim(),
                    namaBarang: cells[2].textContent.trim(),
                    kdBarang: cells[3].textContent.trim(),
                    noGambar: cells[4].textContent.trim(),
                    jmlOrder: cells[5].textContent.trim(),
                    tglStart: cells[6].textContent.trim(),
                    namaBagian: cells[7].textContent.trim(),
                    mtrType: cells[8].textContent.trim(),
                    spek: cells[9].textContent.trim(),
                    kdBrgMtr: cells[10].textContent.trim(),
                    jmlMaterial: cells[11].textContent.trim(),
                    hargaBaru: cells[12].textContent.trim(),
                    hargaTotalBaru: cells[13].textContent.trim(),
                    hargaBekas: cells[14].textContent.trim(),
                    hargaTotalBekas: cells[15].textContent.trim(),
                    accSpv: cells[16].textContent.trim(),
                    tglBon: cells[17].textContent.trim(),
                    // Hidden
                    idBagian: parseInt(cells[18].textContent.trim()) || 0,
                    nomer: parseInt(cells[19].textContent.trim()) || 0,
                    jmlMaterialRaw:
                        parseFloat(cells[20].textContent.trim()) || 0,
                    satuanMtr: cells[21].textContent.trim(),
                    hargaBaruRaw: parseFloat(cells[22].textContent.trim()) || 0,
                    hargaBekasRaw:
                        parseFloat(cells[23].textContent.trim()) || 0,
                    noSat: cells[24].textContent.trim(),
                    status: parseInt(cells[25].textContent.trim()) || 0,
                    statusWarna: cells[26].textContent.trim(),
                });
            }
        });
        return items;
    }

    function clearTable() {
        tbodyMaterial.innerHTML =
            '<tr><td colspan="27" class="text-center">Belum ada data.</td></tr>';
        currentMaterialData = [];
    }

    function resetAll() {
        clearTable();
        btnKeluar.textContent = "Keluar";
        // OptHarian.checked = true;
        // OptProyek.checked = false;
        Date1.focus();
    }
});
//#endregion
