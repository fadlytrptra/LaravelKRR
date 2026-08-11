//#region Variables
const dateInput = document.getElementById("tanggal");
const timeAwal = document.getElementById("awal");
const timeAkhir = document.getElementById("akhir");

const txtIdMesin = document.getElementById("id_mesin");
const txtNamaMesin = document.getElementById("nama_mesin");
const btnLookupMesin = document.getElementById("btn_lookup_mesin");

const txtIdKonversi = document.getElementById("id_konversi");
const txtNamaKonversi = document.getElementById("nama_konversi");
const btnLookupKonversi = document.getElementById("btn_lookup_konversi");

const btnLookupWaktu = document.getElementById("btn_lookup_waktu");

const txtScrew = document.getElementById("screw_revolution");
const txtRoll = document.getElementById("roll_speed");
const txtMotor = document.getElementById("motor_current");
const txtStretch = document.getElementById("stretching_ratio");
const txtSlitter = document.getElementById("slitter_width");
const txtRelax = document.getElementById("relax");
const txtNoYam = document.getElementById("no_yam");
const txtDenier = document.getElementById("denier");
const txtWater = document.getElementById("water_gap");
const txtRata = document.getElementById("denier_rata");

const slcShift = document.getElementById("select_shift");

const btnIsi = document.getElementById("btn_isi");
const btnKoreksi = document.getElementById("btn_koreksi");
const btnHapus = document.getElementById("btn_hapus");
const btnProses = document.getElementById("btn_proses");
const btnKeluar = document.getElementById("btn_keluar");

const groupBox1Ctr = document.querySelectorAll("#group_box1 .form-control");
const groupBox1Slc = document.querySelectorAll("#group_box1 .form-select");
const groupBox2 = document.querySelectorAll("#group_box2 .form-control");

var exactAwalUpdate = "";
var exactAkhirUpdate = "";
var refetchKonversi = false;
var modeProses = "";
const namaGedung = document.getElementById("nama_gedung");
const kode = namaGedung === "D" ? "3" : "1";
//#endregion

//#region Modal Lookup
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

        const showPageSelect = document.getElementById("showPerPage");
        itemsPerPage = parseInt(showPageSelect.value) || 10;

        document.getElementById("lookupTitle").innerHTML =
            `<i class="bi bi-view-list text-primary me-2"></i>${config.title}`;
        const trHeader = document.getElementById("lookupHeaders");
        trHeader.innerHTML = config.headers
            .map((h) => `<th>${h}</th>`)
            .join("");

        const tbody = document.getElementById("lookupBody");
        tbody.innerHTML = `<tr><td colspan="${config.headers.length}" class="text-center"><div class="spinner-border spinner-border-sm"></div> Memuat data...</td></tr>`;
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
        searchInput.onkeyup = function (e) {
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
        Swal.fire("Error System", error.message || error, "error");
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

//#region Generic Modal Lookup System
btnLookupMesin.addEventListener("click", function () {
    openLookupModal({
        title: "Pilih Mesin",
        url: `/Catat/getListMesin/${safeUrlParam(kode)}`,
        headers: ["ID Mesin", "Nama Mesin"],
        columns: ["IdMesin", "TypeMesin"],
        onSelect: (row) => {
            txtIdMesin.value = row.IdMesin;
            txtNamaMesin.value = row.TypeMesin;
            refetchKonversi = true;
            slcShift.focus();
        },
    });
});

btnLookupKonversi.addEventListener("click", function () {
    if (txtIdMesin.value === "" || slcShift.selectedIndex === 0) {
        Swal.fire(
            "Perhatian",
            "Pilih Mesin dan Shift terlebih dahulu.",
            "warning",
        );
        return;
    }

    openLookupModal({
        title: "Pilih Komposisi (Konversi)",
        url: `/Catat/getListIdKonversi/${safeUrlParam(dateInput.value)}/${safeUrlParam(txtIdMesin.value)}/${safeUrlParam(slcShift.value)}`,
        headers: ["ID Konversi", "Nama Komposisi"],
        columns: ["IdKonversi", "NamaKomposisi"],
        onSelect: (row) => {
            txtIdKonversi.value = row.IdKonversi;
            txtNamaKonversi.value = row.NamaKomposisi;
            txtScrew.focus();
            txtScrew.select();
        },
    });
});

btnLookupWaktu.addEventListener("click", function () {
    if (txtIdMesin.value === "" || slcShift.selectedIndex === 0) {
        Swal.fire(
            "Perhatian",
            "Pilih Mesin dan Shift terlebih dahulu.",
            "warning",
        );
        return;
    }

    openLookupModal({
        title: "Pilih Waktu Produksi",
        url: `/Catat/getListAwalProdEff/${safeUrlParam(dateInput.value)}/${safeUrlParam(txtIdMesin.value)}/${safeUrlParam(slcShift.value)}`,
        headers: ["Awal Produksi", "Akhir Produksi"],
        columns: ["AwalProduksi", "AkhirProduksi"],
        onSelect: (row) => {
            timeAwal.value = dateTimetoTime(row.AwalProduksi).slice(0, -3);
            timeAkhir.value = dateTimetoTime(row.AkhirProduksi).slice(0, -3);

            exactAwalUpdate = row.AwalProduksi.replace("T", " ").split(".")[0];
            exactAkhirUpdate = row.AkhirProduksi.replace("T", " ").split(
                ".",
            )[0];

            if (timeAwal.value !== "00:00") {
                getDataEffisiensi(() => {
                    if (modeProses === "koreksi") {
                        txtScrew.focus();
                        txtScrew.select();
                    } else if (modeProses === "hapus") {
                        btnProses.focus();
                    }
                }, row.AwalProduksi);
            }
        },
    });
});
//#endregion

//#region Input & Core Events
dateInput.addEventListener("keypress", function (event) {
    if (event.key == "Enter") btnLookupMesin.focus();
});

dateInput.addEventListener("change", () => {
    refetchKonversi = true;
});

btnLookupMesin.addEventListener("click", () => {});

slcShift.addEventListener("change", function () {
    refetchKonversi = true;

    if (modeProses === "koreksi" || modeProses === "hapus") {
        if (btnLookupWaktu) {
            btnLookupWaktu.style.display = "inline-block";
            btnLookupWaktu.focus();
        }
    } else if (modeProses === "isi") {
        timeAwal.focus();
    }
});

timeAwal.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value === "00:00") {
            Swal.fire(
                "Perhatian",
                "Waktu Awal belum diisi atau tidak valid.",
                "warning",
            ).then(() => {
                this.select();
            });
            return;
        }
    }
    timeAkhir.focus();
});

timeAkhir.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        let waktuAwal = new Date(`1970-01-01T${timeAwal.value}`);
        let waktuAkhir = new Date(`1970-01-01T${timeAkhir.value}`);

        if (this.value == timeAwal.value || waktuAkhir <= waktuAwal) {
            this.focus();
            Swal.fire(
                "Perhatian",
                "Akhir Produksi tidak bisa lebih awal atau sama dengan Awal Produksi.",
                "warning",
            );
        } else {
            btnLookupKonversi.focus();
        }
    }
});

txtScrew.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        txtMotor.select();
    }
});

txtMotor.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        txtSlitter.select();
    }
});

txtSlitter.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        txtNoYam.select();
    }
});

txtNoYam.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        txtWater.select();
    }
});

txtWater.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        txtRoll.select();
    }
});

txtRoll.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        txtStretch.select();
    }
});

txtStretch.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        txtRelax.select();
    }
});

txtRelax.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        txtDenier.select();
    }
});

txtDenier.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        // Bug Fix: this.select() harus sebelum return agar dieksekusi
        if (parseFloat(this.value) < 100 || this.value == "") {
            this.select();
            Swal.fire(
                "Perhatian",
                "Denier tidak boleh kurang dari 100.",
                "warning",
            );
            return;
        } else {
            switch (this.value) {
                case "800":
                    txtRata.value = 750;
                    break;
                case "850":
                    txtRata.value = 825;
                    break;
                case "900":
                    txtRata.value = 850;
                    break;
                case "1000":
                    txtRata.value = 950;
                    break;
                case "1500":
                    txtRata.value = 1500;
                    break;
                case "1800":
                    txtRata.value = 1700;
                    break;
                case "1700":
                    txtRata.value = 1700;
                    break;
                case "2000":
                    txtRata.value = 1800;
                    break;
                case "2100":
                    txtRata.value = 1800;
                    break;
                case "950":
                    txtRata.value = 925;
                    break;
                default:
                    break;
            }
            txtRata.focus();
        }
    }
});

txtRata.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        if (this.value == "") this.value = 0;
        btnProses.focus();
    }
});

btnIsi.addEventListener("click", function () {
    modeProses = "isi";
    toggleButtons(2);
    setEnable(true);
    clearAll();
    if (btnLookupWaktu) btnLookupWaktu.style.display = "none";
    dateInput.focus();
});

btnKoreksi.addEventListener("click", function () {
    modeProses = "koreksi";
    toggleButtons(2);
    setEnable(true);
    clearAll();
    if (btnLookupWaktu) btnLookupWaktu.style.display = "none";
    dateInput.focus();
});

btnHapus.addEventListener("click", function () {
    modeProses = "hapus";
    toggleButtons(2);
    setEnable(true);
    clearAll();
    if (btnLookupWaktu) btnLookupWaktu.style.display = "none";
    dateInput.focus();
});

btnProses.addEventListener("click", async function () {
    try {
        if (txtIdMesin.value === "" || txtIdKonversi.value === "") {
            Swal.fire(
                "Perhatian",
                "Harap lengkapi pilihan Mesin dan Konversi.",
                "warning",
            );
            return;
        }

        if (
            modeProses === "isi" &&
            (timeAwal.value === "00:00" || timeAkhir.value === "00:00")
        ) {
            Swal.fire("Perhatian", "Harap lengkapi waktu produksi.", "warning");
            return;
        }

        let awalProduksi = "";
        let akhirProduksi = "";

        if (    
            (modeProses === "koreksi" || modeProses === "hapus") &&
            exactAwalUpdate !== ""
        ) {
            awalProduksi = exactAwalUpdate;
            akhirProduksi = exactAkhirUpdate;
        } else {
            awalProduksi = `${dateInput.value} ${timeAwal.value}:00`;
            akhirProduksi = `${dateInput.value} ${timeAkhir.value}:00`;
        }

        const cekUrl = `/Catat/getCekDataEff/${safeUrlParam(dateInput.value)}/${safeUrlParam(txtIdMesin.value)}/${safeUrlParam(slcShift.value)}/${safeUrlParam(awalProduksi)}/${safeUrlParam(akhirProduksi)}/${safeUrlParam(txtIdKonversi.value)}`;
        const cekData = await fetchSelectAsync(cekUrl);

        const ada = cekData && cekData.length > 0 && cekData[0].ada > 0;

        if (modeProses === "isi" && ada) {
            Swal.fire(
                "Perhatian",
                `Data Effisiensi untuk ${txtNamaMesin.value}\nTanggal: ${dateInput.value}, Shift: ${slcShift.value}\nNomer Konversi: ${txtIdKonversi.value}, Jam Awal: ${timeAwal.value}\nSUDAH ADA!`,
                "warning",
            );
            btnKoreksi.focus();
            return;
        }

        let method = "POST";
        let url = "/Catat/insEff";
        let payload = {};

        if (modeProses === "isi") {
            method = "POST";
            url = "/Catat/insEff";
        } else if (modeProses === "koreksi") {
            method = "PUT";
            url = "/Catat/updEff";
        } else {
            method = "DELETE";
            url = "/Catat/delEff";
        }

        // Payload umum
        payload = {
            tanggal: dateInput.value,
            id_mesin: txtIdMesin.value,
            shift: slcShift.value,
            awal_produksi: awalProduksi,
            akhir_produksi: akhirProduksi,
        };

        if (modeProses === "isi" || modeProses === "koreksi") {
            payload.id_konversi = txtIdKonversi.value;
            payload.screw_revolution = txtScrew.value || 0;
            payload.motor_current = txtMotor.value || 0;
            payload.slitter_width = txtSlitter.value || 0;
            payload.no_of_yarn = txtNoYam.value || 0;
            payload.water_gap = txtWater.value || 0;
            payload.roll_speed3 = txtRoll.value || 0;
            payload.stretching_ratio = txtStretch.value || 0;
            payload.relax = txtRelax.value || 0;
            payload.denier = txtDenier.value || 0;
            payload.denier_rata = txtRata.value || 0;
            payload.jam_user = getCurrentTime();
        }

        // Eksekusi fetch
        const result = await fetchPost(url, payload, method);

        if (result && result.status === "success") {
            let msg = "";
            if (modeProses === "isi") msg = "Data tersimpan.";
            else if (modeProses === "koreksi") msg = "Data terkoreksi.";
            else msg = "Data sudah dihapus.";

            setEnable(false);
            modeProses = "";
            toggleButtons(1);
            clearAll();
            if (btnLookupWaktu) btnLookupWaktu.style.display = "none";

            Swal.fire("Berhasil", msg, "success");
        }
    } catch (error) {
        console.error("btnProses error:", error);
        Swal.fire("Error", error.message || "Gagal memproses data.", "error");
    }
});

function postProsesAction() {
    setEnable(false);
    modeProses = "";
    toggleButtons(1);
    clearAll();
    if (btnLookupWaktu) btnLookupWaktu.style.display = "none";
}

btnKeluar.addEventListener("click", function () {
    if (this.textContent != "Keluar") {
        toggleButtons(1);
        clearAll();
        setEnable(false);
        modeProses = "";
        if (btnLookupWaktu) btnLookupWaktu.style.display = "none";
    } else {
        window.location.href = "/Extruder/ExtruderNet";
    }
});
//#endregion

//#region Functions
function setEnable(m_value) {
    groupBox1Ctr.forEach((input) => {
        if (
            ["id_mesin", "nama_mesin", "id_konversi", "nama_konversi"].includes(
                input.id,
            )
        ) {
            input.disabled = true;
        } else {
            input.disabled = !m_value;
        }
    });

    groupBox1Slc.forEach((input) => (input.disabled = !m_value));
    groupBox2.forEach((input) => (input.disabled = !m_value));

    btnLookupMesin.disabled = !m_value;
    btnLookupKonversi.disabled = !m_value;
    if (btnLookupWaktu) {
        btnLookupWaktu.disabled = !m_value || modeProses === "isi";
    }

    if (!m_value) txtRata.blur();
}

function toggleButtons(tmb) {
    switch (tmb) {
        case 1:
            btnIsi.disabled = false;
            btnKoreksi.disabled = false;
            btnHapus.disabled = false;
            btnProses.disabled = true;
            btnKeluar.textContent = "Keluar";
            break;
        case 2:
            btnIsi.disabled = true;
            btnKoreksi.disabled = true;
            btnHapus.disabled = true;
            btnProses.disabled = false;
            btnKeluar.textContent = "Batal";
            break;
        default:
            break;
    }
}

function clearAll() {
    groupBox1Ctr.forEach((input) => {
        if (
            ![
                "id_mesin",
                "nama_mesin",
                "id_konversi",
                "nama_konversi",
            ].includes(input.id)
        ) {
            input.value = "";
        }
    });
    groupBox1Slc.forEach((input) => (input.selectedIndex = 0));
    groupBox2.forEach((input) => (input.value = ""));
    timeAwal.value = "00:00";
    timeAkhir.value = "00:00";
    dateInput.value = getCurrentDate();
}

function getDataEffisiensi(post_action = null, exactAwalProduksi = null) {
    // SP_5298_EXT_LIST_EFFISIENSI
    let awalProduksi = exactAwalProduksi;

    if (!awalProduksi) {
        awalProduksi = `${dateInput.value} ${timeAwal.value}:00`;
    } else {
        awalProduksi = awalProduksi.replace("T", " ");
        if (awalProduksi.includes(".")) {
            awalProduksi = awalProduksi.split(".")[0];
        }
    }

    fetchSelectAsync(
        `/Catat/getListEffisiensi/${safeUrlParam(dateInput.value)}/${safeUrlParam(txtIdMesin.value)}/${safeUrlParam(slcShift.value)}/${safeUrlParam(awalProduksi)}`,
        (data) => {
            if (data.length > 0) {
                txtIdKonversi.value =
                    data[0].IdKonversi || data[0].idkonversi || "";
                txtScrew.value =
                    data[0].ScrewRevolution || data[0].screwrevolution || "";
                txtMotor.value =
                    data[0].MotorCurrent || data[0].motorcurrent || "";
                txtSlitter.value =
                    data[0].SlitterWidth || data[0].slitterwidth || "";
                txtNoYam.value = data[0].NoOfYarn || data[0].noofyarn || "";
                txtWater.value = data[0].WaterGap || data[0].watergap || "";
                txtRoll.value = data[0].RollSpeed3 || data[0].rollspeed3 || "";
                txtStretch.value =
                    data[0].StretchingRatio || data[0].stretchingratio || "";
                txtRelax.value = data[0].Relax || data[0].relax || "";
                txtDenier.value = data[0].Denier || data[0].denier || "";
                txtRata.value = data[0].DenierRata || data[0].denierrata || "";
                txtNamaKonversi.value =
                    data[0].NamaKomposisi || data[0].namakomposisi || "";

                if (post_action != null) post_action();
            } else {
                Swal.fire("Error", "Data Effisiensi tidak ditemukan.", "error");
            }
        },
    );
}

function init() {
    timeAwal.value = "00:00";
    timeAkhir.value = "00:00";
    dateInput.value = getCurrentDate();
    toggleButtons(1);
    setEnable(false);
    clearAll();
    if (btnLookupWaktu) btnLookupWaktu.style.display = "none";
    modeProses = "";
    btnIsi.focus();
}

$(document).ready(() => {
    init();
});
//#endregion
