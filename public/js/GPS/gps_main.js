(function () {
    "use strict";

    // Animation on scroll
    window.addEventListener("load", () => {
        if (typeof AOS !== "undefined") {
            AOS.init({
                duration: 1000,
                easing: "ease-in-out",
                once: true,
                mirror: false,
            });
        }
    });
})();

//#region Modal jQuery
const btnConfirm = document.getElementById("btn_confirm_md");
const btnCancel = document.getElementById("btn_cancel_md");
const btnClose = document.getElementById("btn_close_md");
const modalConfirmBody = document.getElementById("modal_body");

$("#confirmation_modal").on("shown.bs.modal", function () {
    $("#btn_confirm_md").focus();
});

$("#confirmation_modal").on("keydown", function (event) {
    const btnConfirmJQ = $("#btn_confirm_md");
    const btnCancelJQ = $("#btn_cancel_md");

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        if (document.activeElement === btnConfirmJQ[0]) {
            btnCancelJQ.focus();
        } else if (document.activeElement === btnCancelJQ[0]) {
            btnConfirmJQ.focus();
        }
    }
});

function showModal(
    txtBtn,
    txtBody,
    confirmFun,
    cancelFun = null,
    txtCancel = null,
    closeFun = null,
) {
    modalConfirmBody.innerHTML = txtBody;
    btnConfirm.textContent = txtBtn;
    btnConfirm.onclick = confirmFun;

    btnCancel.textContent = txtCancel !== null ? txtCancel : "Batal";
    btnCancel.onclick = cancelFun;

    btnClose.onclick = closeFun == null ? cancelFun : closeFun;

    $("#confirmation_modal").modal({ backdrop: "static", keyboard: false });
    $("#confirmation_modal").modal("show");
}
//#endregion

//#region show Pesan/Input Konfirmasi
function showAlasanForm(title = "Alasan") {
    const template = document.getElementById("gps-alasan-template");
    if (!template) {
        throw new Error("Template form alasan GPS tidak ditemukan.");
    }

    return Swal.fire({
        title: title,
        html: template.innerHTML,
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Batal",
        focusConfirm: false,
        didOpen: function (popup) {
            const alasanLainnya = popup.querySelector("#gps-alasan-lainnya");
            popup
                .querySelectorAll('input[name="gpsAlasan"]')
                .forEach((radio) => {
                    radio.addEventListener("change", function () {
                        const isOther = this.value === "Lain-lain";
                        alasanLainnya.style.display = isOther
                            ? "block"
                            : "none";
                        if (isOther) {
                            alasanLainnya.focus();
                        }
                    });
                });
        },
        preConfirm: function () {
            const popup = Swal.getPopup();
            const selected = popup.querySelector(
                'input[name="gpsAlasan"]:checked',
            );
            if (!selected) {
                Swal.showValidationMessage("Pilih salah satu alasan.");
                return false;
            }

            if (selected.value === "Lain-lain") {
                const alasanLainnya = popup
                    .querySelector("#gps-alasan-lainnya")
                    .value.trim();
                if (!alasanLainnya) {
                    Swal.showValidationMessage(
                        "Alasan lainnya tidak boleh kosong.",
                    );
                    return false;
                }
                return alasanLainnya;
            }

            return selected.value;
        },
    });
}

function showInputRealForm(title = "Form Input Realisasi") {
    const template = document.getElementById("gps-inputReal-template");
    if (!template) {
        throw new Error("Template form input realisasi GPS tidak ditemukan.");
    }

    return Swal.fire({
        title: title,
        html: template.innerHTML,
        showCancelButton: true,
        confirmButtonText: "Proses",
        cancelButtonText: "Batal",
        focusConfirm: false,

        didOpen: function (popup) {
            const TEstTime = popup.querySelector("#TEstTime");
            const TEstTime1 = popup.querySelector("#TEstTime1");
            const TJml = popup.querySelector("#TJml");
            const TKet = popup.querySelector("#TKet");

            TEstTime.value = "0";
            TEstTime1.value = "0";
            TJml.value = "0";

            setTimeout(() => {
                TJml.focus();
                TJml.select();
            }, 50);

            TJml.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    let val = this.value.trim();
                    if (val === "" || isNaN(val) || parseInt(val) < 0) {
                        this.value = 0;
                    }
                    setTimeout(() => {
                        TKet.focus();
                        TKet.select();
                    }, 10);
                }
            });

            TKet.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    const val = this.value.trim();
                    if (val === "") this.value = "-";

                    setTimeout(() => {
                        TEstTime.focus();
                        TEstTime.select();
                    }, 10);
                }
            });

            TEstTime.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    let val = this.value.trim();
                    if (val === "" || isNaN(val) || parseInt(val) < 0) {
                        this.value = 0;
                    }
                    setTimeout(() => {
                        TEstTime1.focus();
                        TEstTime1.select();
                    }, 10);
                }
            });

            TEstTime1.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    let val = this.value.trim();
                    if (
                        val === "" ||
                        isNaN(val) ||
                        parseInt(val) < 0 ||
                        parseInt(val) > 59
                    ) {
                        this.value = 0;
                    }
                    Swal.clickConfirm();
                }
            });
        },

        preConfirm: function () {
            const popup = Swal.getPopup();
            const jam = popup.querySelector("#TEstTime").value.trim();
            const menit = popup.querySelector("#TEstTime1").value.trim();
            const jumlah = popup.querySelector("#TJml").value.trim();
            const keterangan = popup.querySelector("#TKet").value.trim();

            if (
                jam === "" ||
                isNaN(jam) ||
                menit === "" ||
                isNaN(menit) ||
                jumlah === "" ||
                isNaN(jumlah)
            ) {
                Swal.showValidationMessage(
                    "Harap isi Jam, Menit, dan Jumlah dengan angka yang valid.",
                );
                return false;
            }

            if (parseInt(menit) > 59) {
                Swal.showValidationMessage(
                    "Input Menit tidak boleh lebih dari 59.",
                );
                return false;
            }

            return {
                realTimeHour: parseInt(jam),
                realTimeMinute: parseInt(menit),
                jmlFinish: parseInt(jumlah),
                keterangan: keterangan,
            };
        },
    });
}

function showAlasan1Form(title = "Alasan") {
    const template = document.getElementById("gps-alasan1-template");
    if (!template) {
        throw new Error("Template form alasan1 GPS tidak ditemukan.");
    }

    return Swal.fire({
        title: title,
        html: template.innerHTML,
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Batal",
        focusConfirm: false,

        didOpen: function (popup) {
            const TAlasan = popup.querySelector("#TAlasan");

            TAlasan.value = "";
            setTimeout(() => TAlasan.focus(), 50);

            TAlasan.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();

                    let val = this.value.trim();
                    if (val !== "") {
                        Swal.getConfirmButton().focus();
                    } else {
                        Swal.showValidationMessage("Isi alasannya...");
                        this.focus();
                    }
                }
            });
        },

        preConfirm: function () {
            const popup = Swal.getPopup();
            const alasanText = popup.querySelector("#TAlasan").value.trim();

            if (alasanText === "") {
                Swal.showValidationMessage("Isi alasannya...");
                return false;
            }

            return alasanText;
        },
    });
}

function showBiayaMakloonForm(title = "Biaya Proses Makloon") {
    const template = document.getElementById("gps-biayaMakloon-template");
    if (!template) {
        throw new Error("Template form biaya makloon GPS tidak ditemukan.");
    }

    return Swal.fire({
        title: title,
        html: template.innerHTML,
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Batal",
        focusConfirm: false,

        didOpen: function (popup) {
            const TJml = popup.querySelector("#TJml");
            const THarga = popup.querySelector("#THarga");
            const TKet = popup.querySelector("#TKet");

            TJml.value = "0";
            THarga.value = "0";
            TKet.value = "";

            setTimeout(() => TJml.select(), 50);

            TJml.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    let val = parseInt(this.value.trim());

                    if (isNaN(val) || val <= 0) {
                        Swal.showValidationMessage(
                            "Jml barang harus lebih besar dari 0(nol).",
                        );
                        this.select();
                    } else {
                        Swal.resetValidationMessage();
                        setTimeout(() => THarga.select(), 10);
                    }
                }
            });

            THarga.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    let val = parseFloat(this.value.trim());

                    if (isNaN(val) || val < 0) {
                        this.value = "0";
                    }
                    setTimeout(() => TKet.focus(), 10);
                }
            });

            TKet.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    Swal.getConfirmButton().focus();
                }
            });
        },

        preConfirm: function () {
            const popup = Swal.getPopup();
            const jmlVal = popup.querySelector("#TJml").value.trim();
            const hargaVal = popup.querySelector("#THarga").value.trim();
            const keterangan = popup.querySelector("#TKet").value.trim();

            const jmlBrg = parseInt(jmlVal);
            const harga = parseFloat(hargaVal);

            if (jmlVal === "" || isNaN(jmlBrg) || jmlBrg <= 0) {
                Swal.showValidationMessage(
                    "Jml barang harus lebih besar dari 0(nol).",
                );
                return false;
            }

            if (hargaVal === "" || isNaN(harga) || harga < 0) {
                Swal.showValidationMessage(
                    "Harga/PC harus berupa angka yang valid.",
                );
                return false;
            }

            return {
                jmlBrg: jmlBrg,
                harga: harga,
                keterangan: keterangan,
            };
        },
    });
}

function showJmlKerjaForm(title = "Input Jml Brg yg dikerjakan") {
    const template = document.getElementById("gps-jmlKerja-template");
    if (!template) {
        throw new Error("Template form jumlah kerja GPS tidak ditemukan.");
    }

    return Swal.fire({
        title: title,
        html: template.innerHTML,
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Batal",
        focusConfirm: false,

        didOpen: function (popup) {
            const TJml = popup.querySelector("#TJml");
            const confirmButton = Swal.getConfirmButton();

            TJml.value = "0";
            confirmButton.disabled = true;

            setTimeout(() => TJml.select(), 50);

            TJml.addEventListener("keydown", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    let val = parseInt(this.value.trim());

                    if (isNaN(val) || val <= 0) {
                        confirmButton.disabled = true;
                        Swal.showValidationMessage(
                            "Jumlah barang yg dikerjakan tdk boleh = 0.",
                        );
                        this.select();
                    } else {
                        Swal.resetValidationMessage();
                        confirmButton.disabled = false;
                        setTimeout(() => confirmButton.focus(), 10);
                    }
                }
            });

            TJml.addEventListener("input", function () {
                let val = parseInt(this.value.trim());
                if (!isNaN(val) && val > 0) {
                    confirmButton.disabled = false;
                } else {
                    confirmButton.disabled = true;
                }
            });
        },

        preConfirm: function () {
            const popup = Swal.getPopup();
            const jmlVal = popup.querySelector("#TJml").value.trim();
            const jmlBrgKerja = parseInt(jmlVal);

            if (jmlVal === "" || isNaN(jmlBrgKerja) || jmlBrgKerja <= 0) {
                Swal.showValidationMessage(
                    "Jumlah barang yg dikerjakan tdk boleh = 0.",
                );
                return false;
            }

            return jmlBrgKerja;
        },
    });
}

//#endregion

// function initGpsAlasanForm(container) {
//     const form = container.querySelector(".gps-alasan-form");
//     if (!form) return;

//     const inputLainnya = form.querySelector("#gps-alasan-lainnya");
//     const radios = form.querySelectorAll('input[name="gpsAlasan"]');

//     radios.forEach((radio) => {
//         radio.addEventListener("change", function () {
//             const isLainnya = this.value === "Lain-lain" && this.checked;

//             inputLainnya.style.display = isLainnya ? "block" : "none";

//             inputLainnya.required = isLainnya;

//             if (!isLainnya) {
//                 inputLainnya.value = "";
//             } else {
//                 inputLainnya.focus();
//             }
//         });
//     });
// }

//#region Table DataTable
function addTable_DataTable(
    tableId,
    listData,
    colWidth = null,
    rowFun = null,
    tHeight = null,
    extra = "",
) {
    const tableElement = $("#" + tableId);

    if ($.fn.DataTable.isDataTable(tableElement)) {
        tableElement.DataTable().destroy();
    }
    tableElement.find("tbody").empty();

    let colObject = [];
    if (colWidth != null) {
        colObject = colWidth.map((col, index) => ({
            data: Object.keys(listData[0])[index],
            width: col.width || "auto",
        }));
    } else {
        colObject = Object.keys(listData[0]).map((key) => ({
            data: key,
        }));
    }

    let dtConfig = {
        responsive: false,
        paging: false,
        scrollY: tHeight != null ? tHeight : "250px",
        scrollX: true,
        autoWidth: true,
        columns: colObject,
        data: listData,
    };

    if (extra === "table_only") {
        let table1 = tableElement.DataTable({
            ...dtConfig,
            data: null,
            searching: false,
            info: false,
            ordering: false,
        });

        table1.clear().rows.add(listData).draw();

        if (tableId === "table_komposisi") {
            table1.on("focus", function () {
                document.body.style.overflow = "hidden";
            });
        }

        table1.on("blur", function () {
            removeNavigation_DataTable([table1]);
            document.body.style.overflow = "visible";
        });

        const tableContainer = table1.table().container();
        const elements = tableContainer.querySelectorAll(".odd, .even");

        elements.forEach((ele, i) => {
            ele.addEventListener("click", () => {
                removeNavigation_DataTable([table1]);
                rowFun(i, table1.row(i).data());
                arrowNavigation_DataTable(table1, i, (index, data) => {
                    rowFun(index, data, true);
                });
            });
        });
    } else if (extra === "dom_empty") {
        tableElement.DataTable({
            ...dtConfig,
            language: {
                searchPlaceholder: ` Cari di tabel...`,
                search: "",
                info: "Menampilkan _TOTAL_ data",
            },
            rowCallback: function (row, data, index) {
                if ($(row).hasClass("odd") || $(row).hasClass("even")) {
                    if (rowFun != null) {
                        row.style.cursor = "pointer";
                        row.onclick = () => rowFun(row, data, index);
                    } else {
                        row.style.cursor = "default";
                    }
                }
            },
        });
        addSearchBar_DataTable(tableId);
    } else if (extra[0] === "colored_row") {
        tableElement.DataTable({
            ...dtConfig,
            dom: '<"row"<"col-sm-6"i><"col-sm-6"f>><"row"<"col-sm-12"tr>>',
            language: {
                searchPlaceholder: ` Cari di tabel...`,
                search: "",
                info: "Menampilkan _TOTAL_ data",
            },
            fnRowCallback: (nRow, aData) => {
                if (aData.Status == -1) {
                    $(nRow).addClass("row_hijau");
                } else {
                    $(nRow).addClass("row_merah");
                }
            },
        });
        addSearchBar_DataTable(tableId);
    } else if (extra === "add_paging") {
        tableElement.DataTable({
            ...dtConfig,
            paging: true,
            language: {
                searchPlaceholder: ` Cari di tabel...`,
                search: "",
                info: "Menampilkan _TOTAL_ data",
            },
        });
        addSearchBar_DataTable(tableId);
    } else {
        tableElement.DataTable({
            ...dtConfig,
            dom: '<"row"<"col-sm-6"i><"col-sm-6"f>><"row"<"col-sm-12"tr>>',
            language: {
                searchPlaceholder: ` Cari di tabel...`,
                search: "",
                info: "Menampilkan _TOTAL_ data",
            },
            rowCallback: function (row, data, index) {
                if ($(row).hasClass("odd") || $(row).hasClass("even")) {
                    if (rowFun != null) {
                        row.style.cursor = "pointer";
                        row.onclick = () => rowFun(row, data, index);
                    } else {
                        row.style.cursor = "default";
                    }
                }
            },
        });
        addSearchBar_DataTable(tableId);
    }
}

function arrowNavigation_DataTable(d_table, s_index, e_handler = null) {
    const tableContainer = d_table.table().container();
    let selectedRow = s_index === "remove" ? 0 : s_index;
    let elements = tableContainer.querySelectorAll(".odd, .even");

    if (s_index === "remove") {
        $(document).off("keydown.datatableNav");
        elements.forEach((ele) => {
            ele.classList.remove("selected");
            ele.onclick = null;
        });
        return;
    } else {
        elements[selectedRow].classList.add("selected");
    }

    $(document).on("keydown.datatableNav", (e) => {
        if (e.key === "ArrowDown" && selectedRow < elements.length - 1) {
            elements[selectedRow].classList.remove("selected");
            selectedRow += 1;
            elements[selectedRow].classList.add("selected");
        } else if (e.key === "ArrowUp" && selectedRow > 0) {
            elements[selectedRow].classList.remove("selected");
            selectedRow -= 1;
            elements[selectedRow].classList.add("selected");
        } else if (e.key === "Home") {
            elements[selectedRow].classList.remove("selected");
            selectedRow = 0;
            elements[selectedRow].classList.add("selected");
        } else if (e.key === "End") {
            elements[selectedRow].classList.remove("selected");
            selectedRow = elements.length - 1;
            elements[selectedRow].classList.add("selected");
        } else if (e.key === "Enter") {
            let row_index = selectedRow;
            let row_data = d_table.row(selectedRow).data();
            if (e_handler != null) e_handler(row_index, row_data);
        }
    });
}

function removeNavigation_DataTable(list_of_tables) {
    list_of_tables.forEach((t) => {
        const tableContainer = t.table().container();
        const elements = tableContainer.querySelectorAll(".odd, .even");
        elements.forEach(() => {
            arrowNavigation_DataTable(t, "remove");
        });
    });
}

function clearTable_DataTable(tableId, tableWidth, msg = null) {
    $("#" + tableId)
        .DataTable()
        .clear()
        .draw();
    const tbodyKu = document.querySelector("#" + tableId + " tbody");

    let headingStr = `<h1 class="mt-3">Tabel masih kosong...</h1>`;
    let styleStr = `class="text-center"`;

    if (msg != null) {
        if (msg instanceof Array) {
            styleStr = `style="padding-left: ${msg[0].split("=")[1]}"`;
            headingStr = `<h1 class="mt-3">${msg[1]}</h1>`;
        } else {
            if (msg.includes("padding=")) {
                styleStr = `style="padding-left: ${msg.split("=")[1]}"`;
            } else {
                headingStr = `<h1 class="mt-3">${msg}</h1>`;
            }
        }
    }

    let tableStr = `<tr><td colspan="${tableWidth}" ${styleStr}>${headingStr}</td>`;
    for (let i = 0; i < tableWidth - 1; i++) {
        tableStr += `<td style="display: none"></td>`;
    }
    tableStr += `</tr>`;

    tbodyKu.innerHTML = tableStr;
}

function addSearchBar_DataTable(tableId) {
    const searchInput = $(`#${tableId}_filter input[type="search"]`).addClass(
        "form-control",
    );
    searchInput.wrap('<div class="input-group"></div>');
    searchInput.before('<span class="input-group-text">Cari:</span>');
}

function clearSelection_DataTable(tableId) {
    const dataTable = $("#" + tableId).DataTable();
    const rows = dataTable.rows().nodes().toArray();
    rows.forEach((row) => {
        row.style.backgroundColor = "white";
    });
}

function clearCheckedBoxes(checkboxes) {
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });
}

function findClickedRowInList(list, targetKey, targetValue) {
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        if (
            Object.prototype.hasOwnProperty.call(item, targetKey) &&
            item[targetKey] === targetValue
        ) {
            return i;
        }
    }
    return -1;
}
//#endregion

//#region Select Options
function addOptions(selectEle, optionData, keyMapping, showId = true) {
    for (let i = 0; i < optionData.length; i++) {
        const newOption = document.createElement("option");
        const valData = optionData[i][keyMapping.valueKey];
        const textData = optionData[i][keyMapping.textKey];

        if (keyMapping.valueKey && keyMapping.textKey) {
            if (showId === "swap") {
                newOption.value = textData;
                newOption.text = valData;
            } else if (showId === "trim") {
                newOption.value = valData;
                newOption.text = showId
                    ? `${valData.slice(12)} | ${textData}`
                    : textData;
            } else {
                newOption.value = valData;
                newOption.text = showId ? `${valData} | ${textData}` : textData;
            }
            selectEle.appendChild(newOption);
        }
    }
}

function addOptionIfNotExists(selectEle, value, text = "", auto = true) {
    const options = selectEle.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].value === String(value)) {
            if (auto) options[i].selected = true;
            return;
        }
    }

    const newOption = new Option(text === "" ? value : text, value);
    if (auto) newOption.selected = true;
    selectEle.appendChild(newOption);
}

function addLoadingOption(selectEle) {
    const loadingOption = new Option("Memuat data...", "loading");
    loadingOption.disabled = true;
    selectEle.appendChild(loadingOption);
    return loadingOption;
}

function removeOption(selectEle, optValue = "", optChar = "") {
    let optionToRemove = null;
    if (optValue !== "") {
        optionToRemove = selectEle.querySelector(`option[value="${optValue}"]`);
    } else if (optChar !== "") {
        for (let i = 1; i < selectEle.options.length; i++) {
            let optionText = selectEle.options[i].textContent;
            if (optionText.indexOf(optChar) === -1) {
                optionToRemove = selectEle.options[i];
                break;
            }
        }
    }

    if (optionToRemove) {
        selectEle.removeChild(optionToRemove);
    }
}

function clearOptions(selectEle, selectLbl = "") {
    const selectHead =
        selectLbl === ""
            ? "Pilih " +
              snakeCaseToTitleCase(
                  selectEle.getAttribute("id").replace("select_", ""),
              )
            : selectLbl;

    selectEle.innerHTML = `<option selected disabled>-- ${selectHead} --</option>`;
    selectEle.selectedIndex = 0;
}
//#endregion

//#region URL Formatter / Utilities
function safeUrlParam(param) {
    return encodeURIComponent(String(param));
}

function buildSafeUrl(baseUrl, params = {}) {
    const queryString = Object.keys(params)
        .map((key) => `${safeUrlParam(key)}=${safeUrlParam(params[key])}`)
        .join("&");
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

function encodeURL(urlString) {
    return encodeURI(urlString);
}
//#endregion

//#region AJAX API (jQuery) - DIPERBAIKI ERROR HANDLING

/**
 * Mengambil CSRF Token dari Meta tag
 */
const getCsrfToken = () => {
    const metaCsrf = document.querySelector('meta[name="csrf-token"]');
    return metaCsrf ? metaCsrf.getAttribute("content") : "";
};

/**
 * Wrapper jQuery AJAX GET
 * @param {string} url Endpoint
 * @param {object} data Payload tambahan
 * @param {function} onSuccess Callback jika request berhasil
 */
function ajaxGet(url, data = {}, onSuccess = null) {
    data._token = getCsrfToken();
    formCursor("wait");

    return $.ajax({
        url: url,
        type: "GET",
        data: data,
        success: function (response) {
            formCursor("default");
            if (onSuccess) {
                onSuccess(response);
            } else {
                console.log(response);
            }
        },
        error: function (xhr, status, error) {
            formCursor("default");
            let errorMsg = "Terjadi kendala jaringan atau server error.";
            if (xhr.responseJSON && xhr.responseJSON.error) {
                errorMsg = xhr.responseJSON.error;
            } else if (xhr.responseText) {
                try {
                    const parsed = JSON.parse(xhr.responseText);
                    if (parsed.error) errorMsg = parsed.error;
                } catch (e) {}
            }
            if (typeof Swal !== "undefined") {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: errorMsg,
                    showConfirmButton: true,
                });
            } else {
                alert("Error: " + errorMsg);
            }
        },
    });
}

/**
 * Wrapper jQuery AJAX POST (Dilengkapi SweetAlert2 dan Reload Datatable)
 * @param {string} url Endpoint
 * @param {object} data Payload
 * @param {string} tableToReload ID table DataTable yang ingin di-reload otomatis jika sukses
 * @param {string} modalToHide ID modal yang ingin disembunyikan otomatis jika sukses
 * @param {function} onSuccess Callback tambahan jika request berhasil
 * @param {function} onError Callback tambahan jika request gagal
 * @param {boolean} showSuccessAlert Tampilkan notifikasi sukses bawaan
 * @param {boolean} showErrorAlert Tampilkan notifikasi error bawaan
 */
function ajaxPost(
    url,
    data = {},
    tableToReload = null,
    modalToHide = null,
    onSuccess = null,
    onError = null,
    showSuccessAlert = true,
    showErrorAlert = true,
) {
    data._token = getCsrfToken();
    formCursor("wait");

    return $.ajax({
        url: url,
        dataType: "json",
        type: "POST",
        data: data,
        success: function (response) {
            formCursor("default");
            console.log(response.message || response);

            if (typeof onSuccess === "function") {
                onSuccess(response);
            }

            if (response.message && showSuccessAlert) {
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then((result) => {
                        if (tableToReload) {
                            $("#" + tableToReload)
                                .DataTable()
                                .ajax.reload();
                        }
                        if (modalToHide) {
                            $("#" + modalToHide).modal("hide");
                        }
                    });
                } else {
                    alert("Success: " + response.message);
                }
            } else if (response.message) {
                if (tableToReload) {
                    $("#" + tableToReload)
                        .DataTable()
                        .ajax.reload();
                }
                if (modalToHide) {
                    $("#" + modalToHide).modal("hide");
                }
            } else if (response.error && showErrorAlert) {
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: true,
                    });
                } else {
                    alert("Error: " + response.error);
                }
            }
        },
        error: function (xhr, status, error) {
            formCursor("default");
            if (typeof onError === "function") {
                onError(xhr, status, error);
            }
            let errorMsg = "Terjadi kendala sistem.";
            if (xhr.responseJSON && xhr.responseJSON.error) {
                errorMsg = xhr.responseJSON.error;
            } else if (xhr.responseText) {
                try {
                    const parsed = JSON.parse(xhr.responseText);
                    if (parsed.error) errorMsg = parsed.error;
                } catch (e) {}
            }
            if (showErrorAlert && typeof Swal !== "undefined") {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: errorMsg,
                    showConfirmButton: true,
                });
            } else if (showErrorAlert) {
                alert("Error: " + errorMsg);
            }
        },
    });
}
//#endregion

//#region Utilities
function padLeft(str, length, char) {
    str = String(str);
    while (str.length < length) {
        str = char + str;
    }
    return str;
}

function snakeCaseToTitleCase(inputStr) {
    return inputStr
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function toSnakeCase(inputStr) {
    return inputStr.toLowerCase().replace(/\s+/g, "_");
}

function getCurrentDate(monthYearOnly = false, extra = null) {
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    let monthNum = currentDate.getMonth() + 1;
    let day = String(currentDate.getDate()).padStart(2, "0");

    if (extra != null) {
        const extraParts = extra.split(",");
        if (extraParts[0] === "month") {
            monthNum += parseFloat(extraParts[1]);
        }
    }

    let month = String(monthNum).padStart(2, "0");

    if (monthYearOnly) {
        return `${month}/${year}`;
    }
    return `${year}-${month}-${day}`;
}

function formatDateToDDMMYY(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
}

function getCurrentTime(timeStr = "") {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");

    if (timeStr === "hh:mm") {
        return `${hours}:${minutes}`;
    }
    return `${hours}:${minutes}:${seconds}`;
}

function calculateTimeDifference(dt_ele1, dt_ele2) {
    const datetime1 = new Date(dt_ele1.value);
    const datetime2 = new Date(dt_ele2.value);

    const timeDifference = Math.abs(datetime1 - datetime2);
    const hoursDifference = Math.floor(timeDifference / (60 * 60 * 1000));
    const minutesDifference = Math.floor(
        (timeDifference % (60 * 60 * 1000)) / (60 * 1000),
    );

    return [hoursDifference, minutesDifference];
}

function dateTimeToDate(dateTimeStr) {
    return dateTimeStr.substring(0, 10);
}

function dateTimetoTime(dateTimeStr) {
    return dateTimeStr.split(" ")[1].substring(0, 8);
}

function formCursor(cursor_str) {
    document.querySelectorAll("*").forEach((ele) => {
        if (ele.type !== "button") {
            ele.style.cursor = cursor_str;
        }
    });
}
//#endregion
// #region Generic Modal Lookup System
let currentLookupData = [];
let filteredLookupData = [];
/*
let currentPage = 1;
let itemsPerPage = 10;
*/
let currentLookupConfig = {};
let selectedRowIndex = 0;
let currentLookupSort = { columnIndex: -1, direction: "asc" };

async function openLookupModal(config) {
    try {
        currentLookupConfig = config;
        currentLookupSort = { columnIndex: -1, direction: "asc" };
        /*
        currentPage = 1;

        const showPageSelect = document.getElementById("showPerPage");
        itemsPerPage = parseInt(showPageSelect.value) || 10;
        */

        document.getElementById("lookupTitle").innerHTML =
            `<i class="bi bi-view-list text-primary me-2"></i>${config.title}`;

        const trHeader = document.getElementById("lookupHeaders");

        trHeader.replaceChildren();
        config.headers.forEach((header, index) => {
            const th = document.createElement("th");
            th.scope = "col";
            th.setAttribute("aria-sort", "none");

            const sortButton = document.createElement("button");
            sortButton.type = "button";
            sortButton.className =
                "btn btn-sm p-0 text-dark fw-semibold text-start";
            sortButton.setAttribute(
                "aria-label",
                `Urutkan A-Z berdasarkan ${header}`,
            );

            const label = document.createElement("span");
            label.textContent = header;

            const sortIcon = document.createElement("i");
            sortIcon.className = "bi bi-arrow-down-up ms-1";
            sortIcon.setAttribute("aria-hidden", "true");

            sortButton.append(label, sortIcon);
            th.appendChild(sortButton);
            trHeader.appendChild(th);

            sortButton.addEventListener("click", () => {
                if (index >= config.columns.length) {
                    return;
                }

                if (currentLookupSort.columnIndex === index) {
                    currentLookupSort.direction =
                        currentLookupSort.direction === "asc" ? "desc" : "asc";
                } else {
                    currentLookupSort = {
                        columnIndex: index,
                        direction: "asc",
                    };
                }

                trHeader
                    .querySelectorAll("th")
                    .forEach((headerCell, headerIndex) => {
                        const button = headerCell.querySelector("button");
                        const icon = button.querySelector("i");
                        const isActive =
                            headerIndex === currentLookupSort.columnIndex;
                        const nextDirection =
                            isActive && currentLookupSort.direction === "asc"
                                ? "Z-A"
                                : "A-Z";

                        headerCell.setAttribute(
                            "aria-sort",
                            isActive
                                ? currentLookupSort.direction === "asc"
                                    ? "ascending"
                                    : "descending"
                                : "none",
                        );
                        icon.className = isActive
                            ? `bi bi-arrow-${currentLookupSort.direction === "asc" ? "up" : "down"} ms-1`
                            : "bi bi-arrow-down-up ms-1";
                        button.setAttribute(
                            "aria-label",
                            `Urutkan ${nextDirection} berdasarkan ${config.headers[headerIndex]}`,
                        );
                    });

                selectedRowIndex = 0;
                renderLookupTable();
            });
        });

        const tbody = document.getElementById("lookupBody");

        tbody.innerHTML = `
            <tr>
                <td colspan="${config.headers.length}" class="text-center">
                    <div class="spinner-border spinner-border-sm"></div>
                    Memuat data...
                </td>
            </tr>
        `;

        /*
        document.getElementById("paginationControls").innerHTML = "";
        */

        const modalEl = document.getElementById("modalLookupGeneric");

        const previousModalInstance = bootstrap.Modal.getInstance(modalEl);
        if (previousModalInstance) {
            previousModalInstance.dispose();
        }
        const modalInstance = new bootstrap.Modal(modalEl, {
            backdrop: config.backdrop === undefined ? true : config.backdrop,
        });

        const searchInput = document.getElementById("lookupSearch");

        // Reset search
        searchInput.value = "";

        let modalShown = false;
        let dataRendered = false;

        function focusLookupSearch() {
            if (!modalShown || !dataRendered) {
                return;
            }

            requestAnimationFrame(() => {
                const input = document.getElementById("lookupSearch");

                if (!input) {
                    return;
                }

                // Pastikan modal masih terbuka
                if (!modalEl.classList.contains("show")) {
                    return;
                }

                input.focus();
                input.select();

                highlightSelectedRow();
            });
        }

        modalEl.addEventListener(
            "shown.bs.modal",
            function () {
                modalShown = true;

                focusLookupSearch();
            },
            { once: true },
        );

        if (typeof config.onHidden === "function") {
            modalEl.addEventListener("hidden.bs.modal", config.onHidden, {
                once: true,
            });
        }

        modalInstance.show();

        const data = await ajaxGet(config.url);

        currentLookupData = data;
        filteredLookupData = data;

        renderLookupTable();

        /*
        renderPagination();
        */

        selectedRowIndex = 0;

        dataRendered = true;

        focusLookupSearch();

        /*
        searchInput.onkeydown = function (e) {
            if (e.key === "ArrowLeft") {
                e.preventDefault();

                if (currentPage > 1) {
                    currentPage--;

                    selectedRowIndex = 0;

                    renderLookupTable();
                    renderPagination();

                    // Kembalikan focus ke search
                    requestAnimationFrame(() => {
                        searchInput.focus();
                    });
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

                    selectedRowIndex = 0;

                    renderLookupTable();
                    renderPagination();

                    // Kembalikan focus ke search
                    requestAnimationFrame(() => {
                        searchInput.focus();
                    });
                }

                return;
            }
        };
        */

        searchInput.onkeyup = function (e) {
            // ArrowLeft / ArrowRight
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                return;
            }

            if (e.key === "ArrowDown") {
                e.preventDefault();

                const rows = document.querySelectorAll("#lookupBody tr");

                if (rows.length > 0) {
                    // Pastikan index tidak melebihi jumlah row
                    if (selectedRowIndex >= rows.length) {
                        selectedRowIndex = rows.length - 1;
                    }

                    rows[selectedRowIndex].focus();

                    highlightSelectedRow();
                }

                return;
            }

            if (e.key === "Enter") {
                e.preventDefault();

                const rows = document.querySelectorAll("#lookupBody tr");

                if (rows.length > 0) {
                    if (selectedRowIndex >= rows.length) {
                        selectedRowIndex = rows.length - 1;
                    }

                    rows[selectedRowIndex].click();
                }

                return;
            }

            const keyword = this.value.toLowerCase().trim();

            filteredLookupData = currentLookupData.filter((row) => {
                return config.columns.some((col) => {
                    return String(row[col] || "")
                        .toLowerCase()
                        .includes(keyword);
                });
            });

            /*
            // Reset halaman
            currentPage = 1;
            */

            // Reset selected row
            selectedRowIndex = 0;

            // Render ulang
            renderLookupTable();
            /*
            renderPagination();
            */

            // Tetap focus di search
            requestAnimationFrame(() => {
                searchInput.focus();
            });
        };

        /*
        showPageSelect.onchange = function () {
            itemsPerPage = parseInt(this.value) || 10;

            currentPage = 1;

            selectedRowIndex = 0;

            renderLookupTable();
            renderPagination();

            requestAnimationFrame(() => {
                searchInput.focus();
            });
        };
        */
    } catch (error) {
        Swal.fire(
            "Error",
            error.message || "Gagal memuat data lookup.",
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

    let sortedLookupData = filteredLookupData;
    if (currentLookupSort.columnIndex >= 0) {
        const column = config.columns[currentLookupSort.columnIndex];
        const collator = new Intl.Collator(undefined, {
            numeric: true,
            sensitivity: "base",
        });

        sortedLookupData = [...filteredLookupData].sort((rowA, rowB) => {
            const valueA = rowA[column];
            const valueB = rowB[column];
            const comparison =
                typeof valueA === "number" && typeof valueB === "number"
                    ? valueA - valueB
                    : collator.compare(
                          valueA == null ? "" : String(valueA),
                          valueB == null ? "" : String(valueB),
                      );

            return currentLookupSort.direction === "asc"
                ? comparison
                : -comparison;
        });
    }

    /*
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredLookupData.slice(startIndex, endIndex);

    paginatedData.forEach((row) => ) {
   */
    sortedLookupData.forEach((row) => {
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
            /*
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
            */
        });

        tbody.appendChild(tr);
    });
    highlightSelectedRow();
}

/*
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
*/
//#endregion
