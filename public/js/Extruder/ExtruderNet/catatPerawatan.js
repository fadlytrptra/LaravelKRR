//#region Variabel DOM Elements & Global State
const txtNamaPerawatan = document.getElementById("nama_perawatan");
const txtIdPerawatan = document.getElementById("id_perawatan");
const btnLookupPerawatan = document.getElementById("btn_lookup_perawatan");

const txtNamaMesin = document.getElementById("nama_mesin");
const txtIdMesin = document.getElementById("id_mesin");
const btnLookupMesin = document.getElementById("btn_lookup_mesin");

const txtIdWinder = document.getElementById("id_winder");
const txtNamaWinder = document.getElementById("nama_winder");
const btnLookupWinder = document.getElementById("btn_lookup_winder");

const txtIdGangguan = document.getElementById("id_gangguan");
const txtNamaGangguan = document.getElementById("nama_gangguan");
const btnLookupGangguan = document.getElementById("btn_lookup_gangguan");

const txtIdPenyebab = document.getElementById("id_penyebab");
const txtNamaPenyebab = document.getElementById("nama_penyebab");
const btnLookupPenyebab = document.getElementById("btn_lookup_penyebab");

const txtIdPenyelesaian = document.getElementById("id_penyelesaian");
const txtNamaPenyelesaian = document.getElementById("nama_penyelesaian");
const btnLookupPenyelesaian = document.getElementById(
    "btn_lookup_penyelesaian",
);

const dateInput = document.getElementById("tanggal");
const hidKode = document.getElementById("kode");
const hidDaftarRW = document.getElementById("form_rw_return");
const timeMulai = document.getElementById("waktu_mulai");
const timeSelesai = document.getElementById("waktu_selesai");

const txtNama = document.getElementById("nama");
const txtShift = document.getElementById("shift");
const slcJam = document.getElementById("select_jam");

const btnIsi = document.getElementById("btn_isi");
const btnKoreksi = document.getElementById("btn_koreksi");
const btnHapus = document.getElementById("btn_hapus");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const groupBox1Inputs = document.querySelectorAll("#group_box1 .form-control");
const groupBox1Selects = document.querySelectorAll("#group_box1 .form-select");
const groupBox2Inputs = document.querySelectorAll("#group_box2 .form-control");
const groupBox2Selects = document.querySelectorAll("#group_box2 .form-select");

const listOfAllControls = [
    ...groupBox1Inputs,
    ...groupBox1Selects,
    ...groupBox2Inputs,
    ...groupBox2Selects,
];
const namaGedung = document.getElementById("nama_gedung").value;
const kodeMesin = namaGedung === "D" ? 3 : 1;
let modeProses = "";
//#endregion

//#region Generic Modal Lookup System
let currentLookupData = [];
let filteredLookupData = [];
let currentPage = 1;
let itemsPerPage = 10;
let currentLookupConfig = {};
let selectedRowIndex = 0;

async function openLookupModal(config) {
    try {
        currentLookupConfig = config;
        currentPage = 1;
        itemsPerPage =
            parseInt(document.getElementById("showPerPage").value) || 10;

        document.getElementById("lookupTitle").innerHTML =
            `<i class="bi bi-view-list text-primary me-2"></i>${config.title}`;
        document.getElementById("lookupHeaders").innerHTML = config.headers
            .map((h) => `<th>${h}</th>`)
            .join("");
        document.getElementById("lookupBody").innerHTML =
            `<tr><td colspan="${config.headers.length}" class="text-center"><div class="spinner-border spinner-border-sm"></div> Memuat data...</td></tr>`;
        document.getElementById("paginationControls").innerHTML = "";

        const modalEl = document.getElementById("modalLookupGeneric");
        const modalInstance = new bootstrap.Modal(modalEl);
        modalInstance.show();

        try {
            await fetchSelectAsync(config.url, (data) => {
                currentLookupData = data;
                filteredLookupData = data;
                renderLookupTable();
                renderPagination();

                selectedRowIndex = 0;

                setTimeout(() => {
                    document.getElementById("lookupSearch").focus();
                    highlightSelectedRow();
                }, 150);
            });
        } catch (error) {
            Swal.fire(
                "Gagal",
                "Tidak dapat mengambil data dari server.",
                "error",
            );
        }

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

        document.getElementById("showPerPage").onchange = function () {
            itemsPerPage = parseInt(this.value);
            currentPage = 1;
            renderLookupTable();
            renderPagination();
        };
    } catch (error) {
        console.error("Error in openLookupModal:", error);
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
// SP_5298_EXT_LIST_JNS_PERAWATAN
btnLookupPerawatan.addEventListener("click", function () {
    openLookupModal({
        title: "Pilih Bagian / Perawatan",
        url: `/Catat/getListJnsPerawatan/EXT`,
        headers: ["ID Perawatan", "Nama Perawatan"],
        columns: ["IdPerawatan", "NamaPerawatan"],
        onSelect: (row) => {
            txtIdPerawatan.value = row.IdPerawatan;
            txtNamaPerawatan.value = row.NamaPerawatan;

            btnLookupMesin.disabled = false;
            btnLookupMesin.focus();
        },
    });
});

// SP_5298_EXT_LIST_MESIN
btnLookupMesin.addEventListener("click", function () {
    openLookupModal({
        title: "Pilih Mesin",
        url: `/Catat/getListMesin/${safeUrlParam(kodeMesin)}`,
        headers: ["ID Mesin", "Type Mesin"],
        columns: ["IdMesin", "TypeMesin"],
        onSelect: (row) => {
            txtIdMesin.value = row.IdMesin;
            txtNamaMesin.value = row.TypeMesin;

            btnLookupWinder.disabled = false;
            btnLookupWinder.focus();
        },
    });
});

// SP_5298_EXT_LIST_WINDER
btnLookupWinder.addEventListener("click", function () {
    if (!txtIdPerawatan.value || !txtIdMesin.value) {
        Swal.fire(
            "Peringatan",
            "Pilih Bagian dan Mesin terlebih dahulu.",
            "warning",
        );
        return;
    }

    openLookupModal({
        title: "Pilih No Winder",
        url: `/Catat/getListWinder/${safeUrlParam(txtIdPerawatan.value)}/${safeUrlParam(txtIdMesin.value)}`,
        headers: ["No Winder", "Winder"],
        columns: ["NoWinder", "Winder"],
        onSelect: (row) => {
            txtIdWinder.value = row.NoWinder;
            txtNamaWinder.value = row.Winder;

            btnLookupGangguan.disabled = false;
            btnLookupGangguan.focus();
        },
    });
});

// SP_5298_EXT_JENIS_GANGGUAN
btnLookupGangguan.addEventListener("click", function () {
    if (!txtIdPerawatan.value) {
        Swal.fire("Peringatan", "Pilih Bagian terlebih dahulu.", "warning");
        return;
    }

    openLookupModal({
        title: "Pilih Gangguan",
        url: `/Catat/getJenisGangguan/${safeUrlParam(txtIdPerawatan.value)}`,
        headers: ["ID Gangguan", "Nama Gangguan"],
        columns: ["IdGangguan", "NamaGangguan"],
        onSelect: (row) => {
            txtIdGangguan.value = row.IdGangguan;
            txtNamaGangguan.value = row.NamaGangguan;

            btnLookupPenyebab.disabled = false;
            btnLookupPenyebab.focus();
        },
    });
});

// SP_5409_EXT_JENIS_PENYEBAB
btnLookupPenyebab.addEventListener("click", function () {
    if (!txtIdPerawatan.value) {
        Swal.fire("Peringatan", "Pilih Bagian terlebih dahulu.", "warning");
        return;
    }

    openLookupModal({
        title: "Pilih Penyebab",
        url: `/Catat/getJenisPenyebab/${safeUrlParam(txtIdPerawatan.value)}`,
        headers: ["ID Penyebab", "Nama Penyebab"],
        columns: ["IdPenyebab", "NamaPenyebab"],
        onSelect: (row) => {
            txtIdPenyebab.value = row.IdPenyebab;
            txtNamaPenyebab.value = row.NamaPenyebab;

            btnLookupPenyelesaian.disabled = false;
            btnLookupPenyelesaian.focus();
        },
    });
});

// SP_5409_EXT_JENIS_PENYELESAIAN
btnLookupPenyelesaian.addEventListener("click", function () {
    if (!txtIdPerawatan.value) {
        Swal.fire("Peringatan", "Pilih Bagian terlebih dahulu.", "warning");
        return;
    }

    openLookupModal({
        title: "Pilih Penyelesaian",
        url: `/Catat/getJenisPenyelesaian/${safeUrlParam(txtIdPerawatan.value)}`,
        headers: ["ID Penyelesaian", "Nama Penyelesaian"],
        columns: ["IdPenyelesaian", "NamaPenyelesaian"],
        onSelect: (row) => {
            txtIdPenyelesaian.value = row.IdPenyelesaian;
            txtNamaPenyelesaian.value = row.NamaPenyelesaian;

            timeMulai.disabled = false;
            timeMulai.focus();
        },
    });
});
//#endregion

//#region Input & Core Events
dateInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (modeProses === "isi") {
            txtShift.disabled = false;
            txtShift.focus();
        } else if (modeProses === "koreksi" || modeProses === "hapus") {
            txtNama.disabled = false;
            txtNama.focus();
        }
    }
});

txtNama.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        RW_tanggal = dateInput.value;
        $("#form_daftar_rawat").modal("show");
    }
});

hidDaftarRW.addEventListener("change", function () {
    if (RW_clickedData) {
        hidKode.value = RW_clickedData.Kode;
        txtNama.value = RW_clickedData.NamaUser;
        txtShift.value = RW_clickedData.Shift;
        timeMulai.value = RW_clickedData.WaktuMulai;
        timeSelesai.value = RW_clickedData.WaktuSelesai;
        txtNamaWinder.value = RW_clickedData.Winder;
        txtIdPerawatan.value = RW_clickedData.IdPerawatan;
        txtNamaPerawatan.value = RW_clickedData.NamaPerawatan;
        txtIdMesin.value = RW_clickedData.IdMesin;
        txtNamaMesin.value = RW_clickedData.TypeMesin;
        txtIdWinder.value = RW_clickedData.NoWinder;
        txtNamaWinder.value = RW_clickedData.Winder;
        txtIdGangguan.value = RW_clickedData.IdGangguan;
        txtNamaGangguan.value = RW_clickedData.Gangguan;
        txtIdPenyebab.value = RW_clickedData.IdPenyebab;
        txtNamaPenyebab.value = RW_clickedData.Penyebab;
        txtIdPenyelesaian.value = RW_clickedData.IdPenyelesaian;
        txtNamaPenyelesaian.value = RW_clickedData.Penyelesaian;

        const jamText = (RW_clickedData.Waktu || "").trim();
        const normalizedJamText = normalizeJam(jamText);

        let foundOption = null;

        foundOption = Array.from(slcJam.options).find(
            (opt) => normalizeJam(opt.text) === normalizedJamText,
        );

        if (!foundOption) {
            foundOption = Array.from(slcJam.options).find(
                (opt) => opt.value.trim() === jamText,
            );
        }

        if (foundOption) {
            slcJam.value = foundOption.value;
        } else {
            const firstRealOption = Array.from(slcJam.options).find(
                (opt) =>
                    opt.value !== "" &&
                    !opt.text.toLowerCase().includes("pilih") &&
                    !opt.text.includes("---"),
            );
            if (firstRealOption) {
                slcJam.value = firstRealOption.value;
                console.warn(
                    "Jam tidak cocok, menggunakan opsi pertama:",
                    firstRealOption.text,
                );
            } else {
                slcJam.selectedIndex = 0;
                console.warn(
                    "Tidak ada opsi jam yang valid, reset ke placeholder.",
                );
            }
        }

        slcJam.dispatchEvent(new Event("change"));

        if (modeProses === "koreksi") {
            btnLookupPerawatan.disabled = false;
            btnLookupMesin.disabled = false;
            btnLookupWinder.disabled = false;
            btnLookupGangguan.disabled = false;
            btnLookupPenyebab.disabled = false;
            btnLookupPenyelesaian.disabled = false;

            btnLookupGangguan.focus();
        } else if (modeProses === "hapus") {
            btnProses.focus();
        } else {
            btnProses.focus();
        }
    } else {
        Swal.fire(
            "Peringatan",
            "Belum ada data perawatan yang terpilih.",
            "warning",
        );
    }
});

txtShift.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        if (this.value.trim() !== "") {
            this.value = this.value.toUpperCase();
            slcJam.disabled = false;
            slcJam.focus();
        } else {
            this.focus();
        }
    }
});

slcJam.addEventListener("change", function () {
    if (modeProses === "koreksi" || modeProses === "hapus") {
        btnLookupMesin.disabled = false;
        btnLookupMesin.focus();
    } else {
        btnLookupPerawatan.disabled = false;
        btnLookupPerawatan.focus();
    }
});

timeMulai.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        timeSelesai.disabled = false;
        timeSelesai.focus();
    }
});

timeSelesai.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        btnProses.focus();
    }
});

btnIsi.addEventListener("click", function () {
    modeProses = "isi";
    toggleButtons(2);
    setEnable(true);
    clearAll();
    dateInput.disabled = false;
    dateInput.focus();
});

btnKoreksi.addEventListener("click", function () {
    clearAll();
    modeProses = "koreksi";
    toggleButtons(2);
    setEnable(true);
    dateInput.disabled = false;
    dateInput.focus();
});

btnHapus.addEventListener("click", function () {
    clearAll();
    modeProses = "hapus";
    toggleButtons(2);
    setEnable(false);
    dateInput.disabled = false;
    txtNama.disabled = false;
    dateInput.focus();
});

btnProses.addEventListener("click", async function () {
    try {
        this.disabled = true;
        btnKeluar.disabled = true;
        this.innerHTML =
            '<span class="spinner-border spinner-border-sm"></span> Memproses...';

        if (modeProses === "isi") {
            await prosesIsi();
        } else if (modeProses === "koreksi") {
            await prosesUpdate();
        } else if (modeProses === "hapus") {
            await prosesDelete();
        }
    } catch (error) {
        console.error("Error proses:", error);
        Swal.fire("Error", error.message || "Terjadi kesalahan.", "error");
    } finally {
        this.disabled = false;
        btnKeluar.disabled = false;
        this.innerHTML = "Proses";
    }
});

btnKeluar.addEventListener("click", function () {
    if (this.textContent !== "Keluar") {
        toggleButtons(1);
        clearAll();
        setEnable(false);
        modeProses = "";
        btnIsi.focus();
    } else {
        window.location.href = "/Extruder/ExtruderNet";
    }
});
//#endregion

//#region Utility & Helper Functions
function normalizeJam(str) {
    return str.replace(/:/g, ".").replace(/\s+/g, " ").trim();
}

function setEnable(m_value) {
    listOfAllControls.forEach((el) => {
        if (el.tagName === "INPUT" || el.tagName === "SELECT") {
            el.disabled = !m_value;
        }
    });

    if (modeProses === "hapus") {
        groupBox2Inputs.forEach((el) => (el.disabled = true));
        groupBox2Selects.forEach((el) => (el.disabled = true));
        btnLookupPerawatan.disabled = false;
        btnLookupMesin.disabled = false;
        btnLookupWinder.disabled = true;
        btnLookupGangguan.disabled = true;
        btnLookupPenyebab.disabled = true;
        btnLookupPenyelesaian.disabled = true;
    } else if (m_value) {
        btnLookupPerawatan.disabled = true;
        btnLookupMesin.disabled = true;
        btnLookupWinder.disabled = true;
        btnLookupGangguan.disabled = true;
        btnLookupPenyebab.disabled = true;
        btnLookupPenyelesaian.disabled = true;
        if (modeProses === "isi") {
            txtNama.disabled = true;
        }
    }
}

function toggleButtons(tmb) {
    if (tmb === 1) {
        btnIsi.disabled = false;
        btnKoreksi.disabled = false;
        btnHapus.disabled = false;
        btnProses.disabled = true;
        btnKeluar.textContent = "Keluar";
    } else if (tmb === 2) {
        btnIsi.disabled = true;
        btnKoreksi.disabled = true;
        btnHapus.disabled = true;
        btnProses.disabled = false;
        btnKeluar.textContent = "Batal";
    }
}

function clearAll() {
    document
        .querySelectorAll(
            "#group_box1 .form-control, #group_box2 .form-control",
        )
        .forEach((el) => (el.value = ""));
    document
        .querySelectorAll("#group_box1 .form-select, #group_box2 .form-select")
        .forEach((el) => (el.selectedIndex = 0));

    dateInput.value = getCurrentDate();
    timeMulai.value = "00:00";
    timeSelesai.value = "00:00";
    txtIdPerawatan.value = "";
    txtNamaPerawatan.value = "";
    txtIdMesin.value = "";
    txtNamaMesin.value = "";
    txtIdWinder.value = "";
    txtNamaWinder.value = "";
    txtIdGangguan.value = "";
    txtNamaGangguan.value = "";
    txtIdPenyebab.value = "";
    txtNamaPenyebab.value = "";
    txtIdPenyelesaian.value = "";
    txtNamaPenyelesaian.value = "";
    hidKode.value = "";
}

// SP_5298_EXT_INSERT_PERAWATAN
async function prosesIsi() {
    try {
        let id_gangguan =
            txtIdPerawatan.value === "2" ? txtIdGangguan.value : "";

        const today = new Date().toISOString().split("T")[0];

        const result = await fetchPost("/Catat/insPerawatan", {
            tanggal: dateInput.value,
            shift: txtShift.value,
            waktu: slcJam.value,
            id_perawatan: parseInt(txtIdPerawatan.value),
            id_mesin: txtIdMesin.value,
            no_winder: txtIdWinder.value,
            gangguan: txtNamaGangguan.value,
            sebab: txtNamaPenyebab.value,
            solusi: txtNamaPenyelesaian.value,
            mulai: `${today} ${timeMulai.value}`,
            selesai: `${today} ${timeSelesai.value}`,
            id_gangguan: id_gangguan ? parseInt(id_gangguan) : null,
        });

        if (result && result.status === "success") {
            const confirmResult = await Swal.fire({
                title: "Tambah Lagi?",
                text: "Data berhasil tersimpan, ingin input data perawatan lagi?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
            });

            if (confirmResult.isConfirmed) {
                clearAll();
                dateInput.value = getCurrentDate();
                dateInput.focus();
            } else {
                setEnable(false);
                modeProses = "";
                toggleButtons(1);
                clearAll();
                btnIsi.focus();
                Swal.fire("Berhasil", "Data tersimpan.", "success");
            }
        }
    } catch (error) {
        console.error("prosesIsi error:", error);
        Swal.fire("Error", error.message || "Gagal menyimpan data.", "error");
    }
}

// SP_5298_EXT_UPDATE_PERAWATAN
async function prosesUpdate() {
    try {
        let id_gangguan =
            txtIdPerawatan.value === "2" ? txtIdGangguan.value : "";

        const today = new Date().toISOString().split("T")[0];

        const result = await fetchPost(
            "/Catat/updPerawatan",
            {
                shift: txtShift.value,
                waktu: slcJam.value,
                id_perawatan: parseInt(txtIdPerawatan.value),
                id_mesin: txtIdMesin.value,
                no_winder: txtIdWinder.value,
                gangguan: txtNamaGangguan.value,
                sebab: txtNamaPenyebab.value,
                solusi: txtNamaPenyelesaian.value,
                mulai: `${today} ${timeMulai.value}`,
                selesai: `${today} ${timeSelesai.value}`,
                kode: parseInt(hidKode.value),
                id_gangguan: id_gangguan ? parseInt(id_gangguan) : null,
            },
            "PUT",
        );

        if (result && result.status === "success") {
            setEnable(false);
            modeProses = "";
            toggleButtons(1);
            clearAll();
            Swal.fire("Berhasil", "Data berhasil dikoreksi.", "success");
            btnIsi.focus();
        }
    } catch (error) {
        console.error("prosesUpdate error:", error);
        Swal.fire("Error", error.message || "Gagal mengoreksi data.", "error");
    }
}

// SP_5298_EXT_DELETE_PERAWATAN
async function prosesDelete() {
    try {
        const result = await fetchPost(
            `/Catat/delPerawatan/${safeUrlParam(hidKode.value)}`,
            {},
            "DELETE",
        );

        if (result && result.status === "success") {
            setEnable(false);
            modeProses = "";
            toggleButtons(1);
            clearAll();
            Swal.fire("Berhasil", "Data berhasil dihapus.", "success").then(
                () => {
                    btnIsi.focus();
                },
            );
            return;
        }
    } catch (error) {
        console.error("prosesDelete error:", error);
        Swal.fire("Error", error.message || "Gagal menghapus data.", "error");
    }
}
//#endregion

//#region Initialization
function init() {
    toggleButtons(1);
    setEnable(false);
    clearAll();
    btnIsi.focus();

    document
        .querySelectorAll(".spn_enter")
        .forEach((el) => (el.style.display = "none"));
}

$(document).ready(() => init());
//#endregion
