//#region Variabel DOM Elements
const inputIdKomposisi = document.getElementById("id_komposisi");
const txtNamaKomposisi = document.getElementById("nama_komposisi");
const btnLookupKomposisi = document.getElementById("btn_lookup_komposisi");

const inputIdMesin = document.getElementById("id_mesin");
const txtNamaMesin = document.getElementById("nama_mesin");
const btnLookupMesin = document.getElementById("btn_lookup_mesin");

const inputIdHP = document.getElementById("id_hp");
const txtNamaHP = document.getElementById("nama_hp");
const btnLookupHP = document.getElementById("btn_lookup_hp");

const inputIdNG = document.getElementById("id_ng");
const txtNamaNG = document.getElementById("nama_ng");
const btnLookupNG = document.getElementById("btn_lookup_ng");

const inputIdAF = document.getElementById("id_af");
const txtNamaAF = document.getElementById("nama_af");
const btnLookupAF = document.getElementById("btn_lookup_af");

const inputIdObjek = document.getElementById("id_objek");
const txtNamaObjek = document.getElementById("nama_objek");
const btnLookupObjek = document.getElementById("btn_lookup_objek");

const inputIdKelut = document.getElementById("id_kelut");
const txtNamaKelut = document.getElementById("nama_kelut");
const btnLookupKelut = document.getElementById("btn_lookup_kelut");

const inputIdKelompok = document.getElementById("id_kelompok");
const txtNamaKelompok = document.getElementById("nama_kelompok");
const btnLookupKelompok = document.getElementById("btn_lookup_kelompok");

const inputIdSubkel = document.getElementById("id_subkel");
const txtNamaSubkel = document.getElementById("nama_subkel");
const btnLookupSubkel = document.getElementById("btn_lookup_subkel");

const inputIdType = document.getElementById("id_type");
const txtNamaType = document.getElementById("nama_type");
const btnLookupType = document.getElementById("btn_lookup_type");

const numPrimer = document.getElementById("primer");
const numSekunder = document.getElementById("sekunder");
const numTritier = document.getElementById("tritier");
const numPersentase = document.getElementById("persentase");
const numCadangan = document.getElementById("cadangan");
const numPersentase2 = document.getElementById("persentase2");
const numCadangan2 = document.getElementById("cadangan2");

const txtSatPrimer = document.getElementById("sat_primer");
const txtSatSekunder = document.getElementById("sat_sekunder");
const txtSatTritier = document.getElementById("sat_tritier");
const txtKodeBarang = document.getElementById("kode_barang");

const btnTambahDetail = document.getElementById("btn_tambah_detail");
const btnKoreksiDetail = document.getElementById("btn_koreksi_detail");
const btnHapusDetail = document.getElementById("btn_hapus_detail");
const btnCadanganDetail = document.getElementById("btn_cadangan_detail");
const btnBaruMaster = document.getElementById("btn_baru_master");
const btnKoreksiMaster = document.getElementById("btn_koreksi_master");
const btnHapusMaster = document.getElementById("btn_hapus_master");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");
const btnTambahAfalan = document.getElementById("btn_tambah_afalan");

const listOfDetailInputs = document.querySelectorAll(
    ".card input:not([type='hidden'])",
);
const listOfButtonDetail = document.querySelectorAll(".card button");

let tableKomposisi = "";
const colKomposisi = [
    { width: "1px" }, // Jenis
    { width: "100px" }, // Id Type
    { width: "250px" }, // Nama Type
    { width: "100px" }, // Qty. Primer
    { width: "100px" }, // Sat. Primer
    { width: "110px" }, // Qty. Sekunder
    { width: "110px" }, // Sat. Sekunder
    { width: "100px" }, // Qty. Tritier
    { width: "100px" }, // Sat. Tritier
    { width: "1px" }, // Persentase
    { width: "80px" }, // Id Objek
    { width: "100px" }, // Nama Objek
    { width: "80px" }, // Id KelUt.
    { width: "100px" }, // Nama KelUt.
    { width: "100px" }, // Id Kelompok
    { width: "100px" }, // Kelompok
    { width: "80px" }, // Id SubKel.
    { width: "100px" }, // SubKel.
    { width: "100px" }, // Kode Barang
    { width: "1px" }, // Cadangan
];

// Constants Gedung
const namaGedung = document.getElementById("nama_gedung")
    ? document.getElementById("nama_gedung").value
    : "M";
const idDivisi = namaGedung == "D" ? "DEX" : "MEX";
const kodeMesin = namaGedung == "D" ? 3 : 2;
const idKelompok = namaGedung == "D" ? "8569" : "7227";
const idBahanBaku = namaGedung == "D" ? "2248" : "1977";
const idBahanPembantu = namaGedung == "D" ? "2249" : "1978";
const idHasilProduksi = namaGedung == "D" ? "2250" : "1994";
const idAfalan = namaGedung == "D" ? "2251" : "1976";
const idObjek = namaGedung == "D" ? "279" : "213";
//#endregion

//#region Generic Modal Lookup System
let modeProses = "";
let pilKomposisi = -1;
let listKomposisi = [];
let listAfalan = [];
let jumlah = 0;
let currentLookupData = [];
let filteredLookupData = [];
let currentPage = 1;
let itemsPerPage = 10;
let currentLookupConfig = {};
let selectedRowIndex = 0;

/**
 * Membuka Modal Lookup Generic
 * @param {Object} config { title, url, headers, columns, onSelect }
 */
async function openLookupModal(config) {
    try {
        currentLookupConfig = config;
        currentPage = 1;

        const showPageSelect = document.getElementById("showPerPage");
        itemsPerPage = parseInt(showPageSelect.value) || 10;

        document.getElementById("lookupTitle").innerHTML =
            `<i class="bi bi-view-list text-primary me-2"></i>${config.title}`;
        const trHeader = document.getElementById("lookupHeaders");
        trHeader.innerHTML = config.headers
            .map((h) => `<th>${h}</th>`)
            .join("");

        const tbody = document.getElementById("lookupBody");
        tbody.innerHTML = `<tr><td colspan="${config.headers.length}" class="text-center">Memuat data...</td></tr>`;
        document.getElementById("paginationControls").innerHTML = "";

        const modalEl = document.getElementById("modalLookupGeneric");
        const modalInstance = new bootstrap.Modal(modalEl);
        modalInstance.show();

        const data = await fetchSelectAsync(config.url);
        currentLookupData = data;
        filteredLookupData = data;
        renderLookupTable();
        renderPagination();

        selectedRowIndex = 0;

        setTimeout(() => {
            document.getElementById("lookupSearch").focus();
            highlightSelectedRow();
        }, 150);

        const searchInput = document.getElementById("lookupSearch");
        searchInput.value = "";

        searchInput.onkeydown = function (e) {
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    renderLookupTable();
                    renderPagination();
                }
                return;
            }

            if (e.key === "ArrowRight") {
                e.preventDefault();
                const totalPages = Math.ceil(
                    filteredLookupData.length / itemsPerPage,
                );
                if (currentPage < totalPages) {
                    currentPage++;
                    renderLookupTable();
                    renderPagination();
                }
                return;
            }
        };

        searchInput.onkeyup = function (e) {
            if (["ArrowLeft", "ArrowRight"].includes(e.key)) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();

                const rows = document.querySelectorAll("#lookupBody tr");
                if (rows.length > 0) {
                    rows[selectedRowIndex].focus();
                }
                return;
            }

            if (e.key === "Enter") {
                e.preventDefault();

                const rows = document.querySelectorAll("#lookupBody tr");
                if (rows.length > 0) {
                    rows[selectedRowIndex].click();
                }
                return;
            }

            const keyword = this.value.toLowerCase();
            filteredLookupData = currentLookupData.filter((row) => {
                return config.columns.some((col) =>
                    String(row[col] || "")
                        .toLowerCase()
                        .includes(keyword),
                );
            });

            currentPage = 1;
            renderLookupTable();
            renderPagination();
        };

        showPageSelect.onchange = function () {
            itemsPerPage = parseInt(this.value);
            currentPage = 1;
            renderLookupTable();
            renderPagination();
        };
    } catch (error) {
        Swal.fire(
            "Error",
            error.message || "Gagal memuat data lookup",
            "error",
        );
    }
}

function highlightSelectedRow() {
    const rows = document.querySelectorAll("#lookupBody tr");

    rows.forEach((row, index) => {
        if (index === selectedRowIndex) {
            row.classList.add("table-primary");
        }
    });
}

function renderLookupTable() {
    const tbody = document.getElementById("lookupBody");
    const config = currentLookupConfig;
    tbody.innerHTML = "";

    if (filteredLookupData.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${config.headers.length}" class="text-center text-danger">Data tidak ditemukan</td></tr>`;
        return;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredLookupData.slice(startIndex, endIndex);

    paginatedData.forEach((row) => {
        const tr = document.createElement("tr");
        tr.style.cursor = "pointer";
        tr.tabIndex = 0;

        config.columns.forEach((col) => {
            const td = document.createElement("td");
            td.textContent = row[col] || "-";
            tr.appendChild(td);
        });

        tr.addEventListener("click", () => {
            const modalEl = document.getElementById("modalLookupGeneric");
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            if (modalInstance) modalInstance.hide();
            config.onSelect(row);
        });

        tr.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                this.click();
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                let nextRow = this.nextElementSibling;
                if (nextRow) nextRow.focus();
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                let prevRow = this.previousElementSibling;
                if (prevRow) {
                    prevRow.focus();
                } else {
                    document.getElementById("lookupSearch").focus();
                }
            } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                if (currentPage > 1) {
                    currentPage--;
                    renderLookupTable();
                    renderPagination();
                    const firstRow = document.querySelector("#lookupBody tr");
                    if (firstRow) firstRow.focus();
                }
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                const totalPages = Math.ceil(
                    filteredLookupData.length / itemsPerPage,
                );
                if (currentPage < totalPages) {
                    currentPage++;
                    renderLookupTable();
                    renderPagination();
                    const firstRow = document.querySelector("#lookupBody tr");
                    if (firstRow) firstRow.focus();
                }
            }
        });
        tbody.appendChild(tr);
    });
    highlightSelectedRow();
}

function renderPagination() {
    const paginationEl = document.getElementById("paginationControls");
    paginationEl.innerHTML = "";

    const totalPages = Math.ceil(filteredLookupData.length / itemsPerPage);
    if (totalPages <= 1) return;

    const prevLi = document.createElement("li");
    prevLi.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
    prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous">&laquo;</a>`;
    prevLi.onclick = (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderLookupTable();
            renderPagination();
        }
    };
    paginationEl.appendChild(prevLi);

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        const pageLi = document.createElement("li");
        pageLi.className = `page-item ${currentPage === i ? "active" : ""}`;
        pageLi.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageLi.onclick = (e) => {
            e.preventDefault();
            currentPage = i;
            renderLookupTable();
            renderPagination();
        };
        paginationEl.appendChild(pageLi);
    }

    const nextLi = document.createElement("li");
    nextLi.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
    nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next">&raquo;</a>`;
    nextLi.onclick = (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderLookupTable();
            renderPagination();
        }
    };
    paginationEl.appendChild(nextLi);
}
//#endregion

//#region Lookup Triggers (Events)
btnLookupKomposisi.addEventListener("click", function () {
    // SP_5298_EXT_LIST_KOMPOSISI_1
    openLookupModal({
        title: "Pilih Komposisi",
        url: `/Master/getListKomposisi/${safeUrlParam(idDivisi)}`,
        headers: ["ID Komposisi", "Nama Komposisi"],
        columns: ["IdKomposisi", "NamaKomposisi"],
        onSelect: (row) => {
            inputIdKomposisi.value = row.IdKomposisi;
            txtNamaKomposisi.value = row.NamaKomposisi;

            clearDataDetail();
            jumlah = 0;
            listKomposisi = [];
            clearTable_DataTable(
                "table_komposisi",
                colKomposisi.length,
                "padding=250px",
            );

            fetchSelectAsync(
                `/Master/getListKomposisi/${safeUrlParam(idDivisi)}/${safeUrlParam(row.IdKomposisi)}`,
            ).then((data) => {
                if (data.length > 0) {
                    inputIdMesin.value = data[0].IdMesin;
                    txtNamaMesin.value = data[0].TypeMesin;
                }

                // SP_1273_PRG_BOM_Barang Kode 5
                fetchSelectAsync(
                    `/Master/getPrgBomBarang/5/null/${safeUrlParam(row.IdKomposisi)}/null/${safeUrlParam(idDivisi)}`,
                ).then((data2) => {
                    if (data2.length > 0) {
                        inputIdHP.value = data2[0].KodeBarang;
                        txtNamaHP.value = data2[0].NamaType;
                    }

                    // SP_1273_PRG_BOM_Barang Kode 6
                    fetchSelectAsync(
                        `/Master/getPrgBomBarang/6/null/${safeUrlParam(row.IdKomposisi)}/null/${safeUrlParam(idDivisi)}`,
                    ).then((data3) => {
                        if (data3.length > 0) {
                            inputIdNG.value = data3[0].KodeBarang;
                            txtNamaNG.value = data3[0].NamaType;
                        }

                        listAfalan = [];
                        clearTable_DataTable("table_afalan", 2);

                        // SP_1273_PRG_BOM_Barang Kode 7
                        fetchSelectAsync(
                            `/Master/getPrgBomBarang/7/null/${safeUrlParam(row.IdKomposisi)}/${safeUrlParam(idKelompok)}/${safeUrlParam(idDivisi)}`,
                        ).then((data4) => {
                            for (let i = 0; i < data4.length; i++) {
                                listAfalan.push({
                                    KodeBarang: data4[i].KodeBarang,
                                    NamaType: data4[i].NamaType,
                                });
                            }
                            if (listAfalan.length > 0) {
                                addTable_DataTable(
                                    "table_afalan",
                                    listAfalan,
                                    null,
                                    null,
                                    null,
                                    "table_only",
                                );
                            }

                            getDataKomposisiFetch(row.IdKomposisi, () => {
                                if (modeProses == "koreksi") {
                                    inputIdObjek.value = idObjek;
                                    txtNamaObjek.value =
                                        "Bahan dan Hasil Produksi";
                                    clearInputGroup(inputIdKelut, txtNamaKelut);
                                    clearInputGroup(
                                        inputIdKelompok,
                                        txtNamaKelompok,
                                    );
                                    clearInputGroup(
                                        inputIdSubkel,
                                        txtNamaSubkel,
                                    );
                                    clearInputGroup(inputIdType, txtNamaType);

                                    btnKoreksiDetail.disabled = false;
                                    numPersentase.disabled = false;
                                    numCadangan.disabled = false;
                                    btnLookupKelut.disabled = false;
                                    btnLookupKelut.focus();
                                } else if (modeProses == "hapus") {
                                    btnProses.focus();
                                } else if (modeProses == "hapus_detail") {
                                    btnHapusDetail.disabled = false;
                                }
                            });
                        });
                    });
                });
            });
        },
    });
});

btnLookupMesin.addEventListener("click", function () {
    // SP_5298_EXT_LIST_MESIN
    openLookupModal({
        title: "Pilih Mesin",
        url: `/Master/getListMesin/${safeUrlParam(kodeMesin)}`,
        headers: ["ID Mesin", "Nama Mesin"],
        columns: ["IdMesin", "TypeMesin"],
        onSelect: (row) => {
            inputIdMesin.value = row.IdMesin;
            txtNamaMesin.value = row.TypeMesin;

            jumlah = 0;
            listKomposisi = [];
            clearTable_DataTable(
                "table_komposisi",
                colKomposisi.length,
                "padding=250px",
            );
            numCadangan.value = 0;

            btnLookupHP.disabled = false;
            btnLookupHP.focus();
        },
    });
});

btnLookupHP.addEventListener("click", function () {
    // SP_1273_PRG_TypeProduksi Kode 2
    openLookupModal({
        title: "Pilih Hasil Produksi",
        url: `/Master/getPrgTypeProduksi/2/${safeUrlParam(idHasilProduksi)}`,
        headers: ["Kode Barang", "Nama Type"],
        columns: ["KodeBarang", "NamaType"],
        onSelect: (row) => {
            inputIdHP.value = row.KodeBarang;
            txtNamaHP.value = row.NamaType;
            btnLookupNG.disabled = false;
            btnLookupNG.focus();
        },
    });
});

btnLookupNG.addEventListener("click", function () {
    // SP_1273_PRG_TypeProduksi Kode 3
    openLookupModal({
        title: "Pilih Hasil Produksi NG",
        url: `/Master/getPrgTypeProduksi/3/${safeUrlParam(idHasilProduksi)}`,
        headers: ["Kode Barang", "Nama Type"],
        columns: ["KodeBarang", "NamaType"],
        onSelect: (row) => {
            inputIdNG.value = row.KodeBarang;
            txtNamaNG.value = row.NamaType;
            btnLookupAF.disabled = false;
            btnLookupAF.focus();
        },
    });
});

btnLookupAF.addEventListener("click", function () {
    // SP_1273_PRG_TypeProduksi Kode 1
    openLookupModal({
        title: "Pilih Afalan",
        url: `/Master/getPrgTypeProduksi/1/${safeUrlParam(idAfalan)}`,
        headers: ["Kode Barang", "Nama Type"],
        columns: ["KodeBarang", "NamaType"],
        onSelect: (row) => {
            inputIdAF.value = row.KodeBarang;
            txtNamaAF.value = row.NamaType;
            btnTambahAfalan.disabled = false;
            btnTambahAfalan.focus();
        },
    });
});

btnTambahAfalan.addEventListener("click", function () {
    if (!inputIdAF.value.trim()) {
        Swal.fire("Peringatan", "Pilih Afalan terlebih dahulu.", "warning");
        btnLookupAF.focus();
        return;
    }

    if (listAfalan.some((item) => item.KodeBarang === inputIdAF.value)) {
        Swal.fire("Error", "Sudah ada Type yang sama dalam Afalan.", "error");
        btnLookupAF.focus();
        return;
    }

    let cleanAfName = txtNamaAF.value.includes("|")
        ? txtNamaAF.value.split("|")[1].trim()
        : txtNamaAF.value.trim();

    listAfalan.push({
        KodeBarang: inputIdAF.value,
        NamaType: cleanAfName,
    });

    addTable_DataTable(
        "table_afalan",
        listAfalan,
        null,
        null,
        null,
        "table_only",
    );

    inputIdObjek.value = idObjek;
    txtNamaObjek.value = "Bahan dan Hasil Produksi";

    btnLookupKelut.disabled = false;
    btnLookupKelut.focus();
});

btnLookupObjek.addEventListener("click", function () {
    // SP_5298_EXT_IDDIVISI_OBJEK
    openLookupModal({
        title: "Pilih Objek",
        url: `/Master/getIdDivisiObjek/${safeUrlParam(idDivisi)}`,
        headers: ["ID Objek", "Nama Objek"],
        columns: ["IdObjek", "NamaObjek"],
        onSelect: (row) => {
            inputIdObjek.value = row.IdObjek;
            txtNamaObjek.value = row.NamaObjek;

            clearInputGroup(inputIdKelut, txtNamaKelut);
            clearInputGroup(inputIdKelompok, txtNamaKelompok);
            clearInputGroup(inputIdSubkel, txtNamaSubkel);
            clearInputGroup(inputIdType, txtNamaType);

            btnLookupKelut.disabled = false;
            btnLookupKelut.focus();
        },
    });
});

btnLookupKelut.addEventListener("click", function () {
    if (!inputIdObjek.value) {
        Swal.fire("Peringatan", "Pilih Objek terlebih dahulu!", "warning");
        return;
    }

    // SP_5298_EXT_IDOBJEK_KELOMPOKUTAMA
    openLookupModal({
        title: "Pilih Kelompok Utama",
        url: `/Master/getIdObjekKelompokUtama/${safeUrlParam(inputIdObjek.value)}`,
        headers: ["ID Kelompok Utama", "Nama Kelompok Utama"],
        columns: ["IdKelompokUtama", "NamaKelompokUtama"],
        onSelect: (row) => {
            inputIdKelut.value = row.IdKelompokUtama;
            txtNamaKelut.value = row.NamaKelompokUtama;

            clearInputGroup(inputIdKelompok, txtNamaKelompok);
            clearInputGroup(inputIdSubkel, txtNamaSubkel);
            clearInputGroup(inputIdType, txtNamaType);

            if (row.IdKelompokUtama == idBahanPembantu) {
                Swal.fire({
                    title: "Konfirmasi",
                    html: "Anda akan memasukkan data Bahan Pembantu, apakah anda telah memasukkan semua <b>Bahan Baku</b>?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Ya, Lanjut",
                    cancelButtonText: "Belum",
                }).then((result) => {
                    if (result.isConfirmed) {
                        btnLookupKelompok.disabled = false;
                        btnLookupKelompok.focus();
                    } else {
                        btnLookupKelut.focus();
                    }
                });
            } else {
                btnLookupKelompok.disabled = false;
                btnLookupKelompok.focus();
            }
        },
    });
});

btnLookupKelompok.addEventListener("click", function () {
    if (!inputIdKelut.value) {
        Swal.fire(
            "Peringatan",
            "Pilih Kelompok Utama terlebih dahulu!",
            "warning",
        );
        return;
    }

    // SP_5298_EXT_IDKELOMPOKUTAMA_KELOMPOK
    openLookupModal({
        title: "Pilih Kelompok",
        url: `/Master/getIdKelompokUtamaKelompok/${safeUrlParam(inputIdKelut.value)}`,
        headers: ["ID Kelompok", "Nama Kelompok"],
        columns: ["idkelompok", "namakelompok"],
        onSelect: (row) => {
            inputIdKelompok.value = row.idkelompok;
            txtNamaKelompok.value = row.namakelompok;

            clearInputGroup(inputIdSubkel, txtNamaSubkel);
            clearInputGroup(inputIdType, txtNamaType);

            if ([idBahanBaku, idHasilProduksi].includes(inputIdKelut.value)) {
                // SP_5298_EXT_CEK_KELOMPOK_MESIN
                fetchSelectAsync(
                    `/Master/getCekKelompokMesin/${safeUrlParam(row.idkelompok.trim())}`,
                ).then((data) => {
                    // TEST DEBUG
                    // console.log("=== CEK KELOMPOK MESIN ===");
                    // console.log("Id Kelompok :", JSON.stringify(idKelompok));
                    // console.log(
                    //     "Id Mesin Form:",
                    //     JSON.stringify(inputIdMesin.value),
                    // );
                    // console.log("Response SP :", data);
                    // console.log("Type data :", typeof data);
                    // console.log("Is Array :", Array.isArray(data));
                    // console.log("JSON data :", JSON.stringify(data));
                    // console.log("==========================");

                    // let mesinValid = false;
                    // if (data.length > 0) {
                    //     for (let i = 0; i < data.length; i++) {
                    //         if (inputIdMesin.value == data[i].IdMesin) {
                    //             mesinValid = true;
                    //             break;
                    //         }
                    //     }
                    // }

                    // if (!mesinValid) {
                    //     Swal.fire(
                    //         "Peringatan",
                    //         data.length > 0
                    //             ? "Mesin tidak sama dengan data kelompok."
                    //             : "Data mesin tidak ditemukan.",
                    //         "warning",
                    //     );
                    //     clearInputGroup(inputIdKelompok, txtNamaKelompok);
                    //     btnLookupKelompok.focus();
                    // } else {
                    //     btnLookupSubkel.disabled = false;
                    //     btnLookupSubkel.focus();
                    // }

                    // uncomment yang atas jika perlu validasi

                    const dataArray = Array.isArray(data) ? data : [];
                    if (dataArray.length > 0) {
                        const found = dataArray.some(
                            (d) =>
                                String(d.IdMesin).trim() ===
                                inputIdMesin.value.trim(),
                        );

                        if (!found) {
                            Swal.fire(
                                "Peringatan",
                                "Mesin tidak sama.",
                                "warning",
                            );

                            clearInputGroup(inputIdKelompok, txtNamaKelompok);

                            btnLookupKelompok.focus();
                            return;
                        }
                    }
                    btnLookupSubkel.disabled = false;
                    btnLookupSubkel.focus();
                });
            } else {
                btnLookupSubkel.disabled = false;
                btnLookupSubkel.focus();
            }
        },
    });
});

btnLookupSubkel.addEventListener("click", function () {
    if (!inputIdKelompok.value) {
        Swal.fire("Peringatan", "Pilih Kelompok terlebih dahulu!", "warning");
        return;
    }

    // SP_5298_EXT_IDKELOMPOK_SUBKELOMPOK
    openLookupModal({
        title: "Pilih Sub Kelompok",
        url: `/Master/getIdKelompokSubKelompok/${safeUrlParam(inputIdKelompok.value)}`,
        headers: ["ID SubKelompok", "Nama SubKelompok"],
        columns: ["idsubkelompok", "namasubkelompok"],
        onSelect: (row) => {
            inputIdSubkel.value = row.idsubkelompok;
            txtNamaSubkel.value = row.namasubkelompok;

            clearInputGroup(inputIdType, txtNamaType);
            btnLookupType.disabled = false;
            btnLookupType.focus();
        },
    });
});

btnLookupType.addEventListener("click", function () {
    if (!inputIdSubkel.value) {
        Swal.fire(
            "Peringatan",
            "Pilih Sub Kelompok terlebih dahulu!",
            "warning",
        );
        return;
    }

    // SP_5298_EXT_IDSUBKELOMPOK_TYPE
    openLookupModal({
        title: "Pilih Type",
        url: `/Master/getIdSubKelompokType/${safeUrlParam(inputIdSubkel.value)}`,
        headers: ["ID Type", "Nama Type"],
        columns: ["IdType", "NamaType"],
        onSelect: (row) => {
            inputIdType.value = row.IdType;
            txtNamaType.value = row.NamaType;

            getSatuanFetch(row.IdType, () => {
                numCadangan.value = 0;
                numPrimer.value = 0;
                numSekunder.value = 0;
                numTritier.value = 0;
                numPersentase.value = 0;

                if (txtSatPrimer.value.trim() != "Null") {
                    numPrimer.disabled = false;
                    numPrimer.select();
                } else if (txtSatSekunder.value.trim() != "Null") {
                    numPrimer.disabled = true;
                    numSekunder.disabled = false;
                    numSekunder.select();
                } else if (txtSatTritier.value.trim() != "Null") {
                    numPrimer.disabled = true;
                    numSekunder.disabled = true;
                    numTritier.disabled = false;
                    numTritier.select();
                }
            });
        },
    });
});
//#endregion

//#region Input & Core Events
txtNamaKomposisi.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (this.value.trim() !== "") {
            btnLookupMesin.disabled = false;
            btnLookupMesin.focus();
        } else {
            Swal.fire(
                "Peringatan",
                "Masukkan nama komposisi terlebih dahulu.",
                "warning",
            ).then(() => this.focus());
        }
    }
});

numPrimer.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (isNaN(this.value) || this.value.trim() === "") {
            Swal.fire(
                "Peringatan",
                "Primer harus diisi angka.",
                "warning",
            ).then(() => {
                this.value = "";
                this.focus();
            });
            return;
        }
        numSekunder.disabled = false;
        numSekunder.value != "" ? numSekunder.select() : numSekunder.focus();
    }
});

numSekunder.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (isNaN(this.value) || this.value.trim() === "") {
            Swal.fire(
                "Peringatan",
                "Sekunder harus diisi angka.",
                "warning",
            ).then(() => {
                this.value = "";
                this.focus();
            });
            return;
        }
        if (parseFloat(this.value) <= 0 && parseFloat(numPrimer.value) == 1) {
            Swal.fire(
                "Peringatan",
                `Isikan jumlah ${txtSatSekunder.value.trim()} untuk 1 ${txtSatPrimer.value.trim()} bahan ini.`,
                "warning",
            ).then(() => {
                this.focus();
            });
            return;
        }
        numTritier.disabled = false;
        numTritier.value != "" ? numTritier.select() : numTritier.focus();
    }
});

numTritier.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (isNaN(this.value) || this.value.trim() === "") {
            Swal.fire(
                "Peringatan",
                "Tritier harus diisi angka.",
                "warning",
            ).then(() => {
                this.value = "";
                this.focus();
            });
            return;
        }
        if (parseFloat(this.value) <= 0 && parseFloat(numSekunder.value) == 1) {
            Swal.fire(
                "Peringatan",
                `Isikan jumlah ${txtSatTritier.value.trim()} untuk 1 ${txtSatSekunder.value.trim()} bahan ini.`,
                "warning",
            ).then(() => {
                this.value = "";
                this.focus();
            });
            return;
        }
        numPersentase.disabled = false;
        numPersentase.value != ""
            ? numPersentase.select()
            : numPersentase.focus();
    }
});

numPersentase.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (isNaN(this.value) || this.value.trim() === "") {
            Swal.fire(
                "Peringatan",
                "Persentase harus diisi Terlebih Dahulu.",
                "warning",
            ).then(() => {
                this.value = "";
                this.focus();
            });
            return;
        }

        if (modeProses === "baru") {
            btnTambahDetail.disabled = false;
            btnKoreksiDetail.disabled = false;
            btnHapusDetail.disabled = false;
            pilKomposisi !== -1
                ? btnKoreksiDetail.focus()
                : btnTambahDetail.focus();
        } else if (modeProses === "koreksi") {
            btnTambahDetail.disabled = false;
            btnCadanganDetail.disabled = false;
            btnCadanganDetail.focus();
        }
    }
});

btnBaruMaster.addEventListener("click", function () {
    clearDataMaster();
    clearDataDetail();
    jumlah = 0;
    listKomposisi = [];
    listAfalan = [];
    clearTable_DataTable(
        "table_komposisi",
        colKomposisi.length,
        "padding=250px",
    );
    clearTable_DataTable("table_afalan", 2);
    numCadangan.value = 0;

    txtNamaKomposisi.disabled = false;
    btnLookupKomposisi.disabled = true;
    txtNamaKomposisi.focus();

    window.scrollTo({ top: 0, behavior: "smooth" });
    modeProses = "baru";
    toggleButtons(2);
});

btnKoreksiMaster.addEventListener("click", function () {
    clearDataMaster();
    clearDataDetail();
    jumlah = 0;
    listKomposisi = [];
    listAfalan = [];
    clearTable_DataTable(
        "table_komposisi",
        colKomposisi.length,
        "padding=250px",
    );
    clearTable_DataTable("table_afalan", 2);

    txtNamaKomposisi.disabled = true;
    btnLookupKomposisi.disabled = false;
    btnLookupKomposisi.focus();

    window.scrollTo({ top: 0, behavior: "smooth" });
    modeProses = "koreksi";
    toggleButtons(2);
});

btnHapusMaster.addEventListener("click", function () {
    Swal.fire({
        title: "Hapus Data",
        text: "Apakah Anda mau menghapus semua komposisi bahan atau hanya sebagian?",
        icon: "question",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Semua",
        denyButtonText: "Sebagian (Detail)",
    }).then((result) => {
        if (result.isConfirmed) {
            modeProses = "hapus";
            setupHapusUI();
        } else if (result.isDenied) {
            modeProses = "hapus_detail";
            setupHapusUI();
        }
    });
});

function setupHapusUI() {
    clearDataMaster();
    clearDataDetail();
    jumlah = 0;
    listKomposisi = [];
    clearTable_DataTable(
        "table_komposisi",
        colKomposisi.length,
        "padding=250px",
    );

    txtNamaKomposisi.disabled = true;
    btnLookupKomposisi.disabled = false;
    btnLookupKomposisi.focus();

    window.scrollTo({ top: 0, behavior: "smooth" });
    toggleButtons(2);
}

btnTambahDetail.addEventListener("click", function () {
    this.disabled = true;
    let jenis = getStatusType(inputIdKelut.value);

    if (
        !inputIdKelut.value ||
        !inputIdKelompok.value ||
        !inputIdSubkel.value ||
        !inputIdType.value
    ) {
        Swal.fire(
            "Peringatan",
            "Ada data yang belum terisi (Kelompok Utama, Kelompok, Sub-kelompok, atau Type).",
            "warning",
        );
        this.disabled = false;
        return;
    }

    if (
        txtSatPrimer.value.trim() !== "Null" &&
        (numPrimer.value === "" || numPrimer.value === null)
    ) {
        Swal.fire("Peringatan", "Primer harus diisi.", "warning");
        numPrimer.focus();
        this.disabled = false;
        return;
    }

    if (
        txtSatSekunder.value.trim() !== "Null" &&
        (numSekunder.value === "" || numSekunder.value === null)
    ) {
        Swal.fire("Peringatan", "Sekunder harus diisi.", "warning");
        numSekunder.focus();
        this.disabled = false;
        return;
    }

    if (
        txtSatTritier.value.trim() !== "Null" &&
        (numTritier.value === "" || numTritier.value === null)
    ) {
        Swal.fire("Peringatan", "Tritier harus diisi.", "warning");
        numTritier.focus();
        this.disabled = false;
        return;
    }

    if (numPersentase.value.trim() === "") {
        Swal.fire(
            "Peringatan",
            "Persentase harus diisi Terlebih Dahulu.",
            "warning",
        );
        numPersentase.focus();
        this.disabled = false;
        return;
    }

    // Cek duplikat
    if (listKomposisi.some((k) => k.IdType === inputIdType.value)) {
        Swal.fire(
            "Error",
            "Sudah ada Type yang sama dalam Komposisi.",
            "error",
        ).then(() => {
            this.disabled = false;
            btnLookupType.focus();
        });
        return;
    }

    if (jenis === "HP") {
        Swal.fire(
            "Error",
            "Hasil Produksi Dipilih di Kolom Atas",
            "error",
        ).then(() => {
            this.disabled = false;
            btnLookupKelut.focus();
        });
        return;
    }

    if (jenis === "AF") {
        Swal.fire("Error", "Hasil Afalan Dipilih di Kolom Atas", "error").then(
            () => {
                this.disabled = false;
                btnLookupKelut.focus();
            },
        );
        return;
    }

    if (jenis === "BB" && listKomposisi.some((k) => k.StatusType === "BB")) {
        Swal.fire(
            "Error",
            "Hanya boleh terdapat 1 Bahan Baku dalam Komposisi.",
            "error",
        );
        this.disabled = false;
        btnLookupKelut.focus();
        return;
    }
    if (
        jenis === "BP" &&
        listKomposisi.some((k) => k.IdSubKelompok === inputIdSubkel.value)
    ) {
        Swal.fire(
            "Error",
            "Sudah ada Bahan Pembantu dengan Sub-kelompok yang sama dalam Komposisi.",
            "error",
        );
        this.disabled = false;
        btnLookupSubkel.focus();
        return;
    }

    let inputPersen = parseFloat(numPersentase.value) || 0;
    let tempJumlah = truncatePersen(jumlah + inputPersen);
    if (tempJumlah > 100) {
        Swal.fire(
            "Peringatan",
            "Persentase yang dimasukkan tidak boleh lebih dari 100%!",
            "warning",
        ).then(() => {
            jumlah = truncatePersen(jumlah);
            numPersentase.select();
            this.disabled = false;
        });
        return;
    }
    jumlah = tempJumlah;

    // Push data
    let kelompokClean = txtNamaKelompok.value.includes("|")
        ? txtNamaKelompok.value.split("|")[1].trim()
        : txtNamaKelompok.value.trim();
    let typeClean = txtNamaType.value.includes("|")
        ? txtNamaType.value.split("|")[1].trim()
        : txtNamaType.value.trim();

    listKomposisi.push({
        StatusType: jenis,
        IdType: inputIdType.value,
        NamaType: typeClean,
        JumlahPrimer: numPrimer.value || 0,
        SatuanPrimer: txtSatPrimer.value || "Null",
        JumlahSekunder: numSekunder.value || 0,
        SatuanSekunder: txtSatSekunder.value || "Null",
        JumlahTritier: numTritier.value || 0,
        SatuanTritier: txtSatTritier.value || "Null",
        Persentase: numPersentase.value,
        IdObjek: inputIdObjek.value,
        NamaObjek: txtNamaObjek.value,
        IdKelompokUtama: inputIdKelut.value,
        NamaKelompokUtama: txtNamaKelut.value,
        IdKelompok: inputIdKelompok.value,
        NamaKelompok: kelompokClean,
        IdSubKelompok: inputIdSubkel.value,
        NamaSubKelompok: txtNamaSubkel.value,
        KodeBarang: txtKodeBarang.value,
        Cadangan: numCadangan.value || 0,
    });

    addTable_DataTable(
        "table_komposisi",
        listKomposisi,
        colKomposisi,
        rowClickedFetch,
        "350px",
    );
    numCadangan.value = 0;

    Swal.fire({
        title: "Input Lagi?",
        text: "Ingin input data bahan lagi?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
    }).then((result) => {
        if (result.isConfirmed) {
            clearDataDetail();
            btnLookupKelut.disabled = false;
            btnLookupKelut.focus();
        } else {
            btnProses.focus();
        }
        this.disabled = false;
    });
});

btnCadanganDetail.addEventListener("click", function () {
    this.disabled = true;
    let jenis = getStatusType(inputIdKelut.value);

    if (
        !inputIdKelut.value ||
        !inputIdKelompok.value ||
        !inputIdSubkel.value ||
        !inputIdType.value
    ) {
        Swal.fire("Peringatan", "Ada data yang belum terisi.", "warning");
        this.disabled = false;
        return;
    }

    if (
        txtSatPrimer.value.trim() !== "Null" &&
        (numPrimer.value === "" || numPrimer.value === null)
    ) {
        Swal.fire("Peringatan", "Primer harus diisi.", "warning");
        numPrimer.focus();
        this.disabled = false;
        return;
    }
    if (
        txtSatSekunder.value.trim() !== "Null" &&
        (numSekunder.value === "" || numSekunder.value === null)
    ) {
        Swal.fire("Peringatan", "Sekunder harus diisi.", "warning");
        numSekunder.focus();
        this.disabled = false;
        return;
    }
    if (
        txtSatTritier.value.trim() !== "Null" &&
        (numTritier.value === "" || numTritier.value === null)
    ) {
        Swal.fire("Peringatan", "Tritier harus diisi.", "warning");
        numTritier.focus();
        this.disabled = false;
        return;
    }

    if (numPersentase.value.trim() === "") {
        Swal.fire(
            "Peringatan",
            "Persentase harus diisi Terlebih Dahulu.",
            "warning",
        );
        numPersentase.focus();
        this.disabled = false;
        return;
    }

    if (numCadangan.value.trim() === "" || parseFloat(numCadangan.value) < 1) {
        Swal.fire(
            "Peringatan",
            "Cadangan harus diisi Terlebih Dahulu.",
            "warning",
        ).then(() => {
            numCadangan.focus();
            this.disabled = false;
        });
        return;
    }

    if (listKomposisi.some((k) => k.IdType === inputIdType.value)) {
        Swal.fire(
            "Error",
            "Sudah ada Type yang sama dalam Komposisi.",
            "error",
        ).then(() => {
            this.disabled = false;
            btnLookupType.focus();
        });
        return;
    }

    if (jenis === "HP") {
        Swal.fire(
            "Error",
            "Hasil Produksi Dipilih di Kolom Atas",
            "error",
        ).then(() => {
            this.disabled = false;
            btnLookupKelut.focus();
        });
        return;
    }

    if (jenis === "AF") {
        Swal.fire("Error", "Afalan Dipilih di Kolom Atas", "error").then(() => {
            this.disabled = false;
            btnLookupKelut.focus();
        });
        return;
    }

    if (jenis === "BB" && listKomposisi.some((k) => k.StatusType === "BB")) {
        Swal.fire(
            "Error",
            "Hanya boleh terdapat 1 Bahan Baku dalam Komposisi.",
            "error",
        );
        this.disabled = false;
        btnLookupKelut.focus();
        return;
    }

    if (
        jenis === "BP" &&
        listKomposisi.some((k) => k.IdSubKelompok === inputIdSubkel.value)
    ) {
        Swal.fire(
            "Error",
            "Sudah ada Bahan Pembantu dengan Sub-kelompok yang sama.",
            "error",
        );
        this.disabled = false;
        btnLookupSubkel.focus();
        return;
    }

    let inputPersen = parseFloat(numPersentase.value) || 0;

    if (inputPersen > 100) {
        Swal.fire(
            "Peringatan",
            "Persentase yang dimasukkan tidak boleh lebih dari 100%!",
            "warning",
        );
        numPersentase.select();
        this.disabled = false;
        return;
    }

    let kelompokClean = txtNamaKelompok.value.includes("|")
        ? txtNamaKelompok.value.split("|")[1].trim()
        : txtNamaKelompok.value.trim();
    let typeClean = txtNamaType.value.includes("|")
        ? txtNamaType.value.split("|")[1].trim()
        : txtNamaType.value.trim();

    listKomposisi.push({
        StatusType: jenis,
        IdType: inputIdType.value,
        NamaType: typeClean,
        JumlahPrimer: numPrimer.value || 0,
        SatuanPrimer: txtSatPrimer.value || "Null",
        JumlahSekunder: numSekunder.value || 0,
        SatuanSekunder: txtSatSekunder.value || "Null",
        JumlahTritier: numTritier.value || 0,
        SatuanTritier: txtSatTritier.value || "Null",
        Persentase: numPersentase.value,
        IdObjek: inputIdObjek.value,
        NamaObjek: txtNamaObjek.value,
        IdKelompokUtama: inputIdKelut.value,
        NamaKelompokUtama: txtNamaKelut.value,
        IdKelompok: inputIdKelompok.value,
        NamaKelompok: kelompokClean,
        IdSubKelompok: inputIdSubkel.value,
        NamaSubKelompok: txtNamaSubkel.value,
        KodeBarang: txtKodeBarang.value,
        Cadangan: numCadangan.value,
    });

    addTable_DataTable(
        "table_komposisi",
        listKomposisi,
        colKomposisi,
        rowClickedFetch,
        "350px",
    );
    // numCadangan.value = 0;

    Swal.fire({
        title: "Input Lagi?",
        text: "Ingin input data bahan cadangan lagi?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
    }).then((result) => {
        if (result.isConfirmed) {
            clearDataDetail();
            btnLookupKelut.disabled = false;
            btnLookupKelut.focus();
        } else {
            btnProses.focus();
        }
        this.disabled = false;
    });
});

btnKoreksiDetail.addEventListener("click", function () {
    if (pilKomposisi === -1) {
        Swal.fire(
            "Peringatan",
            "Pilih dulu data yang akan dikoreksi dari tabel.",
            "warning",
        );
        return;
    }

    if (
        !inputIdKelut.value ||
        !inputIdKelompok.value ||
        !inputIdSubkel.value ||
        !inputIdType.value
    ) {
        Swal.fire("Peringatan", "Ada data yang belum terisi.", "warning");
        return;
    }
    if (
        txtSatPrimer.value.trim() !== "Null" &&
        (numPrimer.value === "" || numPrimer.value === null)
    ) {
        Swal.fire("Peringatan", "Primer harus diisi.", "warning");
        numPrimer.focus();
        return;
    }
    if (
        txtSatSekunder.value.trim() !== "Null" &&
        (numSekunder.value === "" || numSekunder.value === null)
    ) {
        Swal.fire("Peringatan", "Sekunder harus diisi.", "warning");
        numSekunder.focus();
        return;
    }
    if (
        txtSatTritier.value.trim() !== "Null" &&
        (numTritier.value === "" || numTritier.value === null)
    ) {
        Swal.fire("Peringatan", "Tritier harus diisi.", "warning");
        numTritier.focus();
        return;
    }
    if (numPersentase.value.trim() === "") {
        Swal.fire(
            "Peringatan",
            "Persentase harus diisi Terlebih Dahulu.",
            "warning",
        );
        numPersentase.focus();
        return;
    }

    let jenis = getStatusType(inputIdKelut.value);

    // SP_1273_MEX_CEK_JumlahKomposisi Kode 3
    fetchSelectAsync(
        `/Master/getCekJumlahKomposisi/3/${safeUrlParam(inputIdKomposisi.value)}/null/${safeUrlParam(jenis)}/${safeUrlParam(numPersentase.value)}`,
    ).then(
        (data) => {
            let ada1 = data && data.length > 0 ? data[0].Ada1 : 0;
            let isNewCadangan =
                (numCadangan.value == 1 || numCadangan.value == "1") &&
                numCadangan2.value != 1 &&
                numCadangan2.value != "1";
            if (isNewCadangan && ada1 > 0) {
                Swal.fire(
                    "Error",
                    "Sudah ada cadangan yang sama dalam komposisi.",
                    "error",
                );
                numCadangan.focus();
                return;
            }
            lanjutkanKoreksi(jenis);
        },
        () => {
            lanjutkanKoreksi(jenis);
        },
    );

    function lanjutkanKoreksi(jenis) {
        if (numCadangan.value == 0 || numCadangan.value == "") {
            let oldPersen = parseFloat(numPersentase2.value) || 0;
            let newPersen = parseFloat(numPersentase.value) || 0;
            let tempJumlah = truncatePersen(jumlah - oldPersen + newPersen);
            if (tempJumlah > 100) {
                Swal.fire(
                    "Peringatan",
                    "Persentase yang dimasukkan tidak boleh lebih dari 100%!",
                    "warning",
                );
                jumlah = truncatePersen(jumlah - newPersen + oldPersen);
                numPersentase.focus();
                return;
            }
            jumlah = tempJumlah;
        }

        Swal.fire({
            title: "Koreksi Data",
            html: `Anda yakin akan mengoreksi type <b>${listKomposisi[pilKomposisi].NamaType}</b>?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Koreksi",
        }).then((result) => {
            if (result.isConfirmed) {
                let kelompokClean = txtNamaKelompok.value.includes("|")
                    ? txtNamaKelompok.value.split("|")[1].trim()
                    : txtNamaKelompok.value;
                let typeClean = txtNamaType.value.includes("|")
                    ? txtNamaType.value.split("|")[1].trim()
                    : txtNamaType.value;

                listKomposisi[pilKomposisi] = {
                    StatusType: jenis,
                    IdType: inputIdType.value,
                    NamaType: typeClean,
                    JumlahPrimer: numPrimer.value || 0,
                    SatuanPrimer: txtSatPrimer.value || "Null",
                    JumlahSekunder: numSekunder.value || 0,
                    SatuanSekunder: txtSatSekunder.value || "Null",
                    JumlahTritier: numTritier.value || 0,
                    SatuanTritier: txtSatTritier.value || "Null",
                    Persentase: numPersentase.value,
                    IdObjek: inputIdObjek.value,
                    NamaObjek: txtNamaObjek.value,
                    IdKelompokUtama: inputIdKelut.value,
                    NamaKelompokUtama: txtNamaKelut.value,
                    IdKelompok: inputIdKelompok.value,
                    NamaKelompok: kelompokClean,
                    IdSubKelompok: inputIdSubkel.value,
                    NamaSubKelompok: txtNamaSubkel.value,
                    KodeBarang: txtKodeBarang.value,
                    Cadangan: numCadangan.value || 0,
                };

                clearTable_DataTable(
                    "table_komposisi",
                    colKomposisi.length,
                    "padding=250px",
                );
                addTable_DataTable(
                    "table_komposisi",
                    listKomposisi,
                    colKomposisi,
                    rowClickedFetch,
                    "350px",
                );

                pilKomposisi = -1;
                clearSelection_DataTable("table_komposisi");
                numPersentase2.value = numPersentase.value;
                numCadangan2.value = numCadangan.value;

                clearDataDetail();
                btnLookupKelut.disabled = false;
                btnLookupKelut.focus();
            }
        });
    }
});

btnHapusDetail.addEventListener("click", async function () {
    if (listKomposisi.length <= 1) {
        pilKomposisi = -1;
        clearSelection_DataTable("table_komposisi");
        Swal.fire(
            "Peringatan",
            "Data komposisi hanya tersisa satu, tidak boleh dihapus.",
            "warning",
        );
        return;
    }

    if (pilKomposisi === -1) {
        Swal.fire(
            "Peringatan",
            "Pilih dulu data yang akan dihapus dari tabel.",
            "warning",
        );
        return;
    }

    let confirmation = await Swal.fire({
        title: "Hapus Detail",
        html: `Anda yakin akan menghapus type <b>${listKomposisi[pilKomposisi].NamaType}</b>?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Hapus",
    });

    if (confirmation.isConfirmed) {
        try {
            this.disabled = true;
            let idKomposisiKirim = inputIdKomposisi.value.trim() || "-";
            let idTypeHapus = listKomposisi[pilKomposisi].IdType;

            // SP_5409_EXT_CEK_KONVERSI
            let checkData = await fetchSelectAsync(
                `/Master/getCekKonversi/${safeUrlParam(idKomposisiKirim)}/${safeUrlParam(idTypeHapus)}`,
            );

            if (checkData && checkData.length > 0 && checkData[0].ada > 0) {
                pilKomposisi = -1;
                clearSelection_DataTable("table_komposisi");
                Swal.fire(
                    "Gagal",
                    "Type tidak dapat dihapus karena pernah digunakan untuk konversi.",
                    "error",
                );
            } else {
                // SP_5298_EXT_DELETE_KOMPOSISI_BAHAN_1
                await fetchPost(
                    `/Master/delKomposisiBahan1/${safeUrlParam(idKomposisiKirim)}/${safeUrlParam(idTypeHapus)}`,
                    {},
                    "DELETE",
                );
                listKomposisi.splice(pilKomposisi, 1);
                pilKomposisi = -1;
                clearSelection_DataTable("table_komposisi");
                addTable_DataTable(
                    "table_komposisi",
                    listKomposisi,
                    colKomposisi,
                    rowClickedFetch,
                    "350px",
                );
                clearDataDetail();
                btnLookupKelut.disabled = false;
                btnLookupKelut.focus();
            }
        } catch (error) {
            Swal.fire("Error", "Gagal memproses hapus: " + error, "error");
        } finally {
            this.disabled = false;
        }
    } else {
        pilKomposisi = -1;
        clearSelection_DataTable("table_komposisi");
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent !== "Keluar") {
        toggleButtons(1);
        clearDataMaster();
        clearDataDetail();
        disableDetail();
        modeProses = "";
        jumlah = 0;
        listKomposisi = [];
        listAfalan = [];
        clearTable_DataTable(
            "table_komposisi",
            colKomposisi.length,
            "padding=250px",
        );
        clearTable_DataTable("table_afalan", 2);
        pilKomposisi = -1;
        clearSelection_DataTable();
        btnBaruMaster.focus();
    } else {
        window.location.href = "/Extruder/ExtruderNet";
    }
});

btnProses.addEventListener("click", async function () {
    try {
        if (modeProses === "baru" && listKomposisi.length < 1) {
            Swal.fire(
                "Peringatan",
                "Data tidak dapat diproses karena tidak ada data komposisi di tabel.",
                "warning",
            );
            return;
        }
        if (modeProses === "baru" && listAfalan.length < 1) {
            Swal.fire(
                "Peringatan",
                "Data tidak dapat diproses karena tidak ada data afalan.",
                "warning",
            );
            return;
        }

        this.disabled = true;
        this.innerHTML =
            '<span class="spinner-border spinner-border-sm"></span> Processing...';
        btnKeluar.disabled = true;

        if (modeProses === "baru") {
            let jmlh_bb = listKomposisi
                .filter((k) => k.StatusType === "BB")
                .reduce(
                    (sum, k) => sum + (parseFloat(k.JumlahTritier) || 0),
                    0,
                );

            // Cek BOM
            let bomKode = idDivisi === "DEX" ? "12" : "1";
            let bomUrl =
                idDivisi === "DEX"
                    ? `/Master/getPrgBomBarang/${safeUrlParam(bomKode)}/${safeUrlParam(inputIdHP.value)}/null/null/null/${safeUrlParam(inputIdMesin.value)}`
                    : `/Master/getPrgBomBarang/${safeUrlParam(bomKode)}/${safeUrlParam(inputIdHP.value)}`;
            let bomData = await fetchSelectAsync(bomUrl);
            if (bomData && bomData.length > 0 && bomData[0].JumlahBOM > 0) {
                Swal.fire(
                    "Peringatan",
                    "Kode barang ini sudah mempunyai Komposisi. Jika ingin perubahan, pilih Koreksi.",
                    "warning",
                );
                this.disabled = false;
                this.innerText = "Proses";
                btnKeluar.disabled = false;
                btnKoreksiMaster.focus();
                return;
            }

            let insMaster = await fetchPost("/Master/insMasterKomposisi", {
                nama_komposisi: txtNamaKomposisi.value,
                id_mesin: inputIdMesin.value,
                id_divisi: idDivisi,
            });

            if (insMaster && insMaster.status === "success") {
                let resId = await fetchSelectAsync(
                    `/Master/getMasterKomposisi/${idDivisi}`,
                );
                inputIdKomposisi.value = resId.NoKomposisi;
                txtNamaKomposisi.value =
                    resId.NoKomposisi + " | " + txtNamaKomposisi.value;

                await insertDetailLogic(jmlh_bb);
                await fetchPost("/Master/updIdKomposisiCounter", {
                    id_divisi: idDivisi,
                });

                Swal.fire("Berhasil", "Data berhasil disimpan.", "success");
                resetAfterProses();
            }
        } else if (modeProses === "koreksi" || modeProses === "hapus_detail") {
            let jmlh_bb = listKomposisi
                .filter((k) => k.StatusType === "BB")
                .reduce(
                    (sum, k) => sum + (parseFloat(k.JumlahTritier) || 0),
                    0,
                );

            await deleteDetailFetchAsync(inputIdKomposisi.value);
            await insertDetailLogic(jmlh_bb);

            Swal.fire("Berhasil", "Data berhasil diubah.", "success");
            resetAfterProses();
        } else if (modeProses === "hapus") {
            let resCek = await fetchSelectAsync(
                `/Master/getCekKomposisi/${safeUrlParam(inputIdKomposisi.value.trim())}`,
            );
            let ada = resCek && resCek[0] && resCek[0].ada > 0;

            if (ada) {
                Swal.fire(
                    "Ditolak",
                    "Komposisi Tidak BOLEH diHAPUS!! Karena Sudah Dipakai Konversi",
                    "error",
                );
            } else {
                await deleteDetailFetchAsync(inputIdKomposisi.value);
                let delMaster = await fetchPost(
                    `/Master/delMasterKomposisi/${safeUrlParam(inputIdKomposisi.value.trim())}`,
                    {},
                    "DELETE",
                );
                if (delMaster && delMaster.status === "success") {
                    Swal.fire(
                        "Berhasil",
                        "Komposisi sudah dihapus.",
                        "success",
                    );
                    resetAfterProses();
                }
            }
        }
    } catch (error) {
        Swal.fire("Error System", error.message || error, "error");
    } finally {
        this.disabled = false;
        this.innerText = "Proses";
        btnKeluar.disabled = false;
    }
});
//#endregion

//#region Utility & Helper Functions
function getStatusType(kelutValue) {
    switch (kelutValue) {
        case idBahanBaku:
            return "BB";
        case idBahanPembantu:
            return "BP";
        case idHasilProduksi:
            return "HP";
        case idAfalan:
            return "AF";
        default:
            return "__";
    }
}

function clearInputGroup(elId, elName) {
    if (elId) elId.value = "";
    if (elName) elName.value = "";
}

function clearDataDetail() {
    clearInputGroup(inputIdKelut, txtNamaKelut);
    clearInputGroup(inputIdKelompok, txtNamaKelompok);
    clearInputGroup(inputIdSubkel, txtNamaSubkel);
    clearInputGroup(inputIdType, txtNamaType);
    txtKodeBarang.value = "";
    txtSatPrimer.value = "";
    txtSatSekunder.value = "";
    txtSatTritier.value = "";
    numPrimer.value = "";
    numSekunder.value = "";
    numTritier.value = "";
    numPersentase.value = "";
    numCadangan.value = "";
}

function clearDataMaster() {
    clearInputGroup(inputIdKomposisi, txtNamaKomposisi);
    clearInputGroup(inputIdMesin, txtNamaMesin);
    clearInputGroup(inputIdHP, txtNamaHP);
    clearInputGroup(inputIdNG, txtNamaNG);
    clearInputGroup(inputIdAF, txtNamaAF);
    clearInputGroup(inputIdObjek, txtNamaObjek);
}

function disableDetail(state = true) {
    listOfButtonDetail.forEach((btn) => (btn.disabled = state));
    listOfDetailInputs.forEach((ele) => (ele.disabled = state));
}

function toggleButtons(tmb) {
    if (tmb === 1) {
        btnLookupKomposisi.disabled = true;
        btnBaruMaster.disabled = false;
        btnKoreksiMaster.disabled = false;
        btnHapusMaster.disabled = false;
        btnProses.disabled = true;
        btnKeluar.textContent = "Keluar";
    } else if (tmb === 2) {
        btnBaruMaster.disabled = true;
        btnKoreksiMaster.disabled = true;
        btnHapusMaster.disabled = true;
        btnProses.disabled = false;
        btnKeluar.textContent = "Batal";
    }
}

function resetAfterProses() {
    toggleButtons(1);
    disableDetail();
    modeProses = "";
    txtNamaKomposisi.disabled = true;
}

function truncatePersen(value) {
    const num = parseFloat(value) || 0;
    const str = num.toString();
    const truncated = str.substring(0, 6);
    return parseFloat(truncated) || 0;
}

async function insertDetailLogic(jmlh_bb) {
    let inserted = [];
    try {
        for (let i = 0; i < listKomposisi.length; i++) {
            let komp = listKomposisi[i];
            let persentaseKu = parseFloat(komp.Persentase) || 0;

            // if (komp.StatusType === "BP") {
            //     let totalBB = parseFloat(jmlh_bb) || 0;
            //     if (totalBB === 0) {
            //         persentaseKu = 0;
            //     } else {
            //         persentaseKu =
            //             Math.round(
            //                 ((parseFloat(komp.JumlahTritier) || 0) / totalBB) *
            //                     100 *
            //                     100,
            //             ) / 100;
            //     }
            // }

            // FIX: Untuk DEX, JumlahPrimer = 0
            // let primerValue =
            //     idDivisi === "DEX" ? 0 : parseFloat(komp.JumlahPrimer) || 0;

            let primerValue = parseFloat(komp.JumlahPrimer) || 0;

            let payloadExt = {
                id_komposisi: inputIdKomposisi.value.trim(),
                id_objek: komp.IdObjek.trim(),
                nama_objek: komp.NamaObjek,
                id_kelompok_utama: komp.IdKelompokUtama.trim(),
                nama_kelompok_utama: komp.NamaKelompokUtama.trim(),
                id_kelompok: komp.IdKelompok.trim(),
                nama_kelompok: komp.NamaKelompok.trim(),
                id_sub_kelompok: komp.IdSubKelompok.trim(),
                nama_sub_kelompok: komp.NamaSubKelompok.trim(),
                id_type: komp.IdType.trim(),
                nama_type: komp.NamaType.trim(),
                kd_brg: komp.KodeBarang,
                jumlah_primer: primerValue,
                sat_primer:
                    komp.SatuanPrimer.trim() === "Null"
                        ? null
                        : komp.SatuanPrimer.trim(),
                jumlah_sekunder: parseFloat(komp.JumlahSekunder) || 0,
                sat_sekunder:
                    komp.SatuanSekunder.trim() === "Null"
                        ? null
                        : komp.SatuanSekunder.trim(),
                jumlah_tritier: parseFloat(komp.JumlahTritier) || 0,
                sat_tritier:
                    komp.SatuanTritier.trim() === "Null"
                        ? null
                        : komp.SatuanTritier.trim(),
                persentase: persentaseKu,
                status_type: komp.StatusType.trim(),
                cadangan: parseInt(komp.Cadangan) || 0,
            };

            let resExt = await fetchPost(
                "/Master/insKomposisiBahan",
                payloadExt,
            );
            if (!resExt || resExt.status !== "success")
                throw new Error("Gagal insert ke EXT");

            // Insert ke INV untuk HP
            let payloadInvHP = {
                kode: "1",
                id_komposisi: inputIdKomposisi.value.trim(),
                id_type: komp.IdType.trim(),
                kd_brg: inputIdHP.value.trim(),
                id_divisi: idDivisi,
                persentase: persentaseKu,
                primer: primerValue,
                sekunder: parseFloat(komp.JumlahSekunder) || 0,
                tritier: parseFloat(komp.JumlahTritier) || 0,
                cadangan: parseInt(komp.Cadangan) || 0,
            };
            let resInvHP = await fetchPost(
                "/Master/insKomposisiBahanMjs",
                payloadInvHP,
            );
            if (!resInvHP || resInvHP.status !== "success")
                throw new Error("Gagal insert HP");

            // Insert ke INV untuk NG
            let payloadInvNG = {
                kode: "1",
                id_komposisi: inputIdKomposisi.value.trim(),
                id_type: komp.IdType.trim(),
                kd_brg: inputIdNG.value.trim(),
                id_divisi: idDivisi,
                persentase: persentaseKu,
                primer: primerValue,
                sekunder: parseFloat(komp.JumlahSekunder) || 0,
                tritier: parseFloat(komp.JumlahTritier) || 0,
                cadangan: parseInt(komp.Cadangan) || 0,
            };
            let resInvNG = await fetchPost(
                "/Master/insKomposisiBahanMjs",
                payloadInvNG,
            );
            if (!resInvNG || resInvNG.status !== "success")
                throw new Error("Gagal insert NG");

            inserted.push(komp.IdType);
        }

        // Insert Afalan
        for (let j = 0; j < listAfalan.length; j++) {
            let af = listAfalan[j];
            let payloadAf = {
                kode: "2",
                id_komposisi: inputIdKomposisi.value.trim(),
                kd_brg: af.KodeBarang.trim(),
                id_divisi: idDivisi,
            };
            let resAf = await fetchPost(
                "/Master/insKomposisiBahanMjs",
                payloadAf,
            );
            if (!resAf || resAf.status !== "success")
                throw new Error("Gagal insert afalan");
        }
    } catch (err) {
        if (inserted.length > 0) {
            let idKomposisi = inputIdKomposisi.value.trim();
            for (let idType of inserted) {
                await fetchPost(
                    `/Master/delKomposisiBahan1/${safeUrlParam(idKomposisi)}/${safeUrlParam(idType)}`,
                    {},
                    "DELETE",
                ).catch(() => {});
            }
        }
        throw err;
    }
}

async function deleteDetailFetchAsync(id_komposisi) {
    return await fetchPost(
        `/Master/delKomposisiBahanMjs/${safeUrlParam(id_komposisi.trim())}`,
        {},
        "DELETE",
    );
}

function getSatuanFetch(id_type, callback = null) {
    // SP_5298_EXT_DETAIL_BAHAN
    fetchSelectAsync(`/Master/getDetailBahan/${safeUrlParam(id_type)}`).then(
        (data) => {
            if (data.length === 0) {
                Swal.fire(
                    "Error",
                    "Data satuan tidak ditemukan untuk type: " + id_type,
                    "error",
                );
                return;
            }
            const row = data[0];
            txtKodeBarang.value = row.KodeBarang ?? "";
            txtSatPrimer.value = row.satPrimer ?? "Null";
            txtSatSekunder.value = row.satSekunder ?? "Null";
            txtSatTritier.value = row.nama_satuan ?? "Null";
            if (callback) callback();
        },
    );
}

function getDataKomposisiFetch(no_komposisi, post_action = null) {
    jumlah = 0;
    listKomposisi = [];
    clearTable_DataTable("table_komposisi", colKomposisi.length, [
        "padding=250px",
        "Memuat data...",
    ]);

    // SP_1273_EXT_LIST_KOMPOSISI_BAHAN
    fetchSelectAsync(
        `/Master/getListKomposisiBahanMjs/${safeUrlParam(no_komposisi)}`,
    ).then((data) => {
        if (data.length <= 0) {
            clearTable_DataTable("table_komposisi", colKomposisi.length, [
                "padding=250px",
                `Tidak ditemukan data untuk Komposisi ${no_komposisi}`,
            ]);
        } else {
            for (let i = 0; i < data.length; i++) {
                listKomposisi.push({
                    StatusType: data[i].StatusType,
                    IdType: data[i].IdType,
                    NamaType: data[i].NamaType,
                    JumlahPrimer: data[i].JumlahPrimer,
                    SatuanPrimer:
                        data[i].SatuanPrimer !== null
                            ? data[i].SatuanPrimer
                            : "Null",
                    JumlahSekunder: data[i].JumlahSekunder,
                    SatuanSekunder:
                        data[i].SatuanSekunder !== null
                            ? data[i].SatuanSekunder
                            : "Null",
                    JumlahTritier: data[i].JumlahTritier,
                    SatuanTritier:
                        data[i].SatuanTritier !== null
                            ? data[i].SatuanTritier
                            : "Null",
                    Persentase: data[i].Persentase,
                    IdObjek: data[i].IdObjek,
                    NamaObjek: data[i].NamaObjek,
                    IdKelompokUtama: data[i].IdKelompokUtama,
                    NamaKelompokUtama: data[i].NamaKelompokUtama,
                    IdKelompok: data[i].IdKelompok,
                    NamaKelompok: data[i].NamaKelompok,
                    IdSubKelompok: data[i].IdSubKelompok,
                    NamaSubKelompok: data[i].NamaSubKelompok,
                    KodeBarang: data[i].KodeBarang,
                    Cadangan: data[i].Cadangan,
                });
            }
            addTable_DataTable(
                "table_komposisi",
                listKomposisi,
                colKomposisi,
                rowClickedFetch,
                "350px",
            );

            // SP_1273_MEX_CEK_JumlahKomposisi Kode 2
            fetchSelectAsync(
                `/Master/getCekJumlahKomposisi/2/${safeUrlParam(no_komposisi)}`,
            ).then((dataJml) => {
                if (dataJml.length > 0) jumlah = dataJml[0].Jumlah;
                if (post_action) post_action();
            });
        }
    });
}

function rowClickedFetch(row, data, _) {
    let idx = findClickedRowInList(listKomposisi, "IdType", data.IdType);
    if (pilKomposisi === idx) {
        row.style.background = "white";
        pilKomposisi = -1;
        clearDataDetail();
        disableDetail();
        if (modeProses === "koreksi") {
            btnLookupKelut.disabled = false;
            numPersentase.disabled = false;
            numCadangan.disabled = false;
            btnLookupKelut.focus();
        }
    } else {
        if (["baru", "hapus_detail", "koreksi"].includes(modeProses)) {
            pilKomposisi = idx;
            clearSelection_DataTable("table_komposisi");
            row.style.background = "aliceblue";

            numPrimer.value = data.JumlahPrimer;
            txtSatPrimer.value = data.SatuanPrimer;
            numSekunder.value = data.JumlahSekunder;
            txtSatSekunder.value = data.SatuanSekunder;
            numTritier.value = data.JumlahTritier;
            txtSatTritier.value = data.SatuanTritier;
            numPersentase.value = data.Persentase;
            numPersentase2.value = data.Persentase;
            txtKodeBarang.value = data.KodeBarang;
            numCadangan.value = data.Cadangan;
            numCadangan2.value = data.Cadangan;

            inputIdType.value = data.IdType;
            txtNamaType.value = data.NamaType;
            inputIdObjek.value = data.IdObjek;
            txtNamaObjek.value = data.NamaObjek;
            inputIdKelut.value = data.IdKelompokUtama;
            txtNamaKelut.value = data.NamaKelompokUtama;
            inputIdKelompok.value = data.IdKelompok;
            txtNamaKelompok.value = data.NamaKelompok;
            inputIdSubkel.value = data.IdSubKelompok;
            txtNamaSubkel.value = data.NamaSubKelompok;

            if (modeProses === "baru") {
                disableDetail();
                btnKoreksiDetail.disabled = false;
                btnHapusDetail.disabled = false;
                numPrimer.disabled = false;
                numSekunder.disabled = false;
                numTritier.disabled = false;
                numPersentase.disabled = false;
                numPrimer.select();
            } else {
                btnHapusDetail.disabled = false;
            }
        }
    }
}

function init() {
    tableKomposisi = $("#table_komposisi").DataTable({
        responsive: true,
        paging: false,
        scrollY: "350px",
        scrollX: "1000000px",
        columns: colKomposisi,
        searching: false,
        info: false,
    });

    tableKomposisi.on("blur", function () {
        removeNavigation_DataTable([tableKomposisi]);
    });

    $("#table_afalan").DataTable({
        responsive: true,
        paging: false,
        scrollY: "250px",
        searching: false,
        info: false,
    });

    clearTable_DataTable("table_afalan", 2);
    clearTable_DataTable(
        "table_komposisi",
        colKomposisi.length,
        "padding=25vw",
    );

    toggleButtons(1);
    disableDetail();
    btnBaruMaster.focus();
}

$(document).ready(() => init());
//#endregion
