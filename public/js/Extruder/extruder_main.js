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
        data: listData
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
/**
 * Mengenkode parameter URL secara aman (Mencegah XSS & karakter terputus).
 * @param {string|number} param - Nilai parameter.
 * @returns {string} Parameter terenkode
 */
function safeUrlParam(param) {
    return encodeURIComponent(String(param));
}

/**
 * Membangun URL secara aman dan clean.
 * Contoh penggunaan: buildSafeUrl('/api/data', { id: 1, nama: 'Budi' })
 */
function buildSafeUrl(baseUrl, params = {}) {
    const queryString = Object.keys(params)
        .map((key) => `${safeUrlParam(key)}=${safeUrlParam(params[key])}`)
        .join("&");
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * @deprecated Harap gunakan buildSafeUrl / safeUrlParam.
 * Fungsi ini dipertahankan hanya untuk mencegah kerusakan kode legacy.
 */
function encodeURL(urlString) {
    return encodeURI(urlString);
}
//#endregion

//#region Fetch API

/**
 * @deprecated Fungsi fetchStmt telah ditandai obsolete.
 * Seluruh proses manipulasi data (Insert/Update/Delete) WAJIB menggunakan fetchPost (Method POST/PUT/DELETE).
 */
function fetchStmt(urlString, postAct = null, catchAct = null) {
    console.warn(
        "DEPRECATED: fetchStmt tidak disarankan untuk digunakan. Harap gunakan fetchPost untuk manipulasi data.",
    );
    formCursor("wait");
    fetch(encodeURL(urlString))
        .then((response) => {
            if (!response.ok) throw new Error("Network response was not ok!");
            return response.json();
        })
        .then((data) => {
            formCursor("default");
            if (data == 1) console.log("QUERY BERHASIL KAWAN!");
            if (postAct != null) postAct();
        })
        .catch((error) => {
            formCursor("default");
            if (catchAct != null) catchAct();
            alert(
                `Terdapat kendala saat memproses data, mohon segera hubungi Tim IT.\nERROR: ${urlString}`,
            );
            console.error("Error: ", error);
        });
}

/**
 * @deprecated Gunakan fetchSelectAsync sebagai standar baru.
 */
function fetchSelect(urlString, postAct, slcOption = null, catchAct = null) {
    console.warn("DEPRECATED: Gunakan fetchSelectAsync.");
    formCursor("wait");
    fetch(encodeURL(urlString))
        .then((response) => {
            if (!response.ok) throw new Error("Network response was not ok!");
            return response.json();
        })
        .then((data) => {
            formCursor("default");
            if (data.length === 0 && slcOption != null) {
                slcOption.textContent = "Data tidak ditemukan!";
            }
            postAct(data);
        })
        .catch((error) => {
            formCursor("default");
            if (catchAct != null) catchAct();
            if (slcOption != null) {
                slcOption.textContent = "Terdapat kendala saat memuat data.";
            } else {
                alert(
                    `Terdapat kendala saat memuat data.\nERROR: ${urlString}`,
                );
            }
            console.error("Error: ", error);
        });
}

/**
 * Versi asinkron modern untuk Fetch Select dengan error handling via SweetAlert2.
 * @param {string} urlString - URL endpoint GET
 * @param {Function} postAct - Aksi ketika data sukses di-fetch
 * @param {HTMLElement} slcOption - Element HTML (opsional) untuk update teks jika data kosong
 * @param {Function} catchAct - Aksi fallback error (opsional)
 */
async function fetchSelectAsync(
    urlString,
    postAct = null,
    slcOption = null,
    catchAct = null,
) {
    try {
        formCursor("wait");

        // const response = await fetch(encodeURL(urlString));
        const response = await fetch(urlString);

        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        formCursor("default");

        if (data.length === 0 && slcOption != null) {
            slcOption.textContent = "Data tidak ditemukan!";
        }

        if (typeof postAct === "function") {
            postAct(data);
        }

        return data;
    } catch (error) {
        formCursor("default");

        if (typeof catchAct === "function") {
            catchAct(error);
        }

        console.error("fetchSelectAsync Error:", error);
        throw error;
    }
}
/**
 * Modern fetch handler untuk mutasi data (POST/PUT/DELETE)
 */
async function fetchPost(url, payload, method = "POST") {
    const metaCsrf = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = metaCsrf ? metaCsrf.getAttribute("content") : "";

    try {
        formCursor("wait");
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken,
                Accept: "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 422) {
                if (typeof Swal !== "undefined") {
                    Swal.fire(
                        "Validasi Gagal",
                        JSON.stringify(data.errors).replace(/[{}[\]"]/g, " "),
                        "warning",
                    );
                } else {
                    alert("Validasi Gagal:\n" + JSON.stringify(data.errors));
                }
            } else {
                if (typeof Swal !== "undefined") {
                    Swal.fire(
                        "Error Server",
                        data.message || "Terjadi kendala sistem internal.",
                        "error",
                    );
                } else {
                    alert("Error: " + (data.message || "Kendala server."));
                }
            }
            throw new Error(data.message || "Terjadi kendala jaringan.");
        }

        formCursor("default");
        return data;
    } catch (error) {
        formCursor("default");
        console.error("fetchPost Error:", error);
        return null;
    }
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

        tbody.innerHTML = `
            <tr>
                <td colspan="${config.headers.length}" class="text-center">
                    <div class="spinner-border spinner-border-sm"></div>
                    Memuat data...
                </td>
            </tr>
        `;

        document.getElementById("paginationControls").innerHTML = "";

        const modalEl = document.getElementById("modalLookupGeneric");

        const modalInstance =
            bootstrap.Modal.getOrCreateInstance(modalEl);

        const searchInput =
            document.getElementById("lookupSearch");

        // Reset search
        searchInput.value = "";

        let modalShown = false;
        let dataRendered = false;

        function focusLookupSearch() {
            if (!modalShown || !dataRendered) {
                return;
            }

            requestAnimationFrame(() => {
                const input =
                    document.getElementById("lookupSearch");

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
            { once: true }
        );

        modalInstance.show();

        const data = await fetchSelectAsync(config.url);

        currentLookupData = data;
        filteredLookupData = data;

        renderLookupTable();

        renderPagination();

        selectedRowIndex = 0;

        dataRendered = true;

        focusLookupSearch();

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
                    filteredLookupData.length / itemsPerPage
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

        searchInput.onkeyup = function (e) {

            // ArrowLeft / ArrowRight
            if (
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight"
            ) {
                return;
            }

            if (e.key === "ArrowDown") {
                e.preventDefault();

                const rows =
                    document.querySelectorAll("#lookupBody tr");

                if (rows.length > 0) {

                    // Pastikan index tidak melebihi jumlah row
                    if (
                        selectedRowIndex >= rows.length
                    ) {
                        selectedRowIndex =
                            rows.length - 1;
                    }

                    rows[selectedRowIndex].focus();

                    highlightSelectedRow();
                }

                return;
            }

            if (e.key === "Enter") {
                e.preventDefault();

                const rows =
                    document.querySelectorAll("#lookupBody tr");

                if (rows.length > 0) {

                    if (
                        selectedRowIndex >= rows.length
                    ) {
                        selectedRowIndex =
                            rows.length - 1;
                    }

                    rows[selectedRowIndex].click();
                }

                return;
            }

            const keyword =
                this.value.toLowerCase().trim();

            filteredLookupData =
                currentLookupData.filter((row) => {

                    return config.columns.some((col) => {

                        return String(row[col] || "")
                            .toLowerCase()
                            .includes(keyword);
                    });
                });

            // Reset halaman
            currentPage = 1;

            // Reset selected row
            selectedRowIndex = 0;

            // Render ulang
            renderLookupTable();
            renderPagination();

            // Tetap focus di search
            requestAnimationFrame(() => {
                searchInput.focus();
            });
        };

        showPageSelect.onchange = function () {

            itemsPerPage =
                parseInt(this.value) || 10;

            currentPage = 1;

            selectedRowIndex = 0;

            renderLookupTable();
            renderPagination();

            requestAnimationFrame(() => {
                searchInput.focus();
            });
        };

    } catch (error) {

        Swal.fire(
            "Error",
            error.message ||
            "Gagal memuat data lookup.",
            "error"
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
