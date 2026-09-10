//#region Fetch API
/**
 * Memanggil fetch api terhadap url yang akan menjalankan query select
 * @param {String} url_string - Url yang akan diakses menggunakan fetch api
 * @param {Function} post_action - Fungsi yang akan dijalankan setelah proses fetch api selesai dan url mengembalikan data
 * @param {Function} empty_action - Fungsi yang akan dijalankan jika url tidak mengembalikan data apapun
 * @param {Boolean} no_cursor - Saat fetch sedang berjalan cursor style akan diset ke "wait"; default = false, set ke true jika ingin mengatur cursor css secara manual
 */
function fetchSelect(
    url_string,
    post_action,
    empty_action = null,
    no_cursor = false
) {
    console.log("URL = http://127.0.0.1:8000" + url_string);

    if (!no_cursor) {
        setCursorWait(true);
    }

    fetch(url_string)
        .then((response) => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then((data) => {
            console.log(data);

            if (!no_cursor) {
                setCursorWait(false);
            }

            if (data.length > 0) {
                post_action(data);
            } else if (empty_action != null) {
                empty_action();
            } else {
                showToast("Data kosong.", "info");
            }
        })
        .catch((error) => {
            if (!no_cursor) {
                setCursorWait(false);
            }

            showToast(
                "Terdapat kendala dalam mengambil data." +
                    "<br>Mohon segera hubungi EDP.",
                "error"
            );

            console.error("Ada Error Kawan: ", error);
        });
}

/**
 * Memanggil fetch api terhadap url yang akan menjalankan query statement (INSERT, UPDATE, DELETE)
 * @param {String} url_string - Url yang akan diakses menggunakan fetch api
 * @param {Function} post_action - Fungsi yang akan dijalankan setelah proses fetch api selesai
 * @param {Boolean} no_cursor - Saat fetch sedang berjalan cursor style akan diset ke "wait"; default = false, set ke true jika ingin mengatur cursor css secara manual
 */
function fetchStatement(url_string, post_action = null, no_cursor = false) {
    console.log("URL = http://127.0.0.1:8000" + url_string);

    if (!no_cursor) {
        setCursorWait(true);
    }

    fetch(url_string)
        .then((response) => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then((data) => {
            console.log(data + " - Jika 1 berarti sukses.");

            if (post_action) {
                post_action(data);
            }

            if (!no_cursor) {
                setCursorWait(false);
            }
        })
        .catch((error) => {
            console.error("Ada Error Kawan: ", error);

            if (!no_cursor) {
                setCursorWait(false);
            }
        });
}

/**
 * Mengubah cursor css dari "default" ke "wait" dan sebaliknya
 * Agar ada feedback ke pengguna saat fungsi asynchronous sedang berjalan
 * @param {Boolean} wait - Set ke true untuk mengubah css ke "wait", set ke false untuk mengubah css ke "default"
 */
function setCursorWait(wait) {
    document.body.style.setProperty(
        "cursor",
        wait ? "wait" : "default",
        "important"
    );
}
//#endregion

//#region Select Box
/**
 * Jika option yang akan ditambahkan sudah ada maka tidak akan ditambahkan,
 * bila text kosong maka value akan otomatis jadi text.
 * text merupakan "value" | "text"
 * @param {String} selectId
 * @param {String} value
 * @param {String?} text
 * @param {boolean} [textOnly=false] - jika tidak ingin menampilkan value | text, hanya text saja
 */
function addOptionToSelect(selectId, value, text = null, textOnly = false) {
    let select2Instance = $("#" + selectId).data("select2");
    let optionExists = false;

    // Iterate through each option to check for both value and text
    $("#" + selectId + " option").each(function () {
        let $option = $(this);
        if ($option.val() === value) {
            optionExists = true;
            $option.prop("selected", true); // Select the existing option
            return false; // Break the loop
        }
    });

    if (!optionExists) {
        // If the option does not exist, create and add it
        let optionText = textOnly ? text : text ? value + " | " + text : value;
        let newOption = new Option(optionText, value, true, true);

        if (select2Instance) {
            // If Select2 is initialized, append option using Select2 API
            $("#" + selectId)
                .append(newOption)
                .trigger("change");
        } else {
            // If Select2 is not initialized, use regular DOM manipulation
            document.getElementById(selectId).appendChild(newOption);
            newOption.selected = true;
        }
    } else {
        // If the option exists, ensure it's selected and trigger change
        $("#" + selectId).trigger("change");
    }
}

/**
 * Fungsi tambahan agar select2 responsive saat window di-resize
 */
$(window).on("resize", function () {
    $(".select2-container").each(function () {
        var width = $(this).parent().outerWidth();
        $(this).css("width", width);
    });
});
//#endregion

//#region DataTables
/**
 * Inisialisasi tabel serverside menggunakan api url dari web.php
 * @param {String} tableId
 * @param {Array} columnsKu - [{data: "NamaKey", width: "100px"}, ...]
 * @param {String} ajaxUrl
 * @param {Array} ajaxParams - [{"key": idOrder, "value": "01"}, ...]
 * @param {Number} tableIndex - Default value = 1
 * @param {Function} drawCallback - Fungsi yang akan dijalankan setelah tabel dimuat
 * @returns
 */
function initTableServerSide(
    tableId,
    columnsKu,
    ajaxUrl,
    ajaxParams = null,
    tableIndex = 0,
    drawCallback = null
) {
    if ($.fn.DataTable.isDataTable("#" + tableId)) {
        $("#" + tableId)
            .DataTable()
            .destroy();
    }

    var dataTableOptions = {
        responsive: true,
        scrollY: getTableHeight() + "px",
        scrollX: true,
        processing: true,
        serverSide: true,
        columns: columnsKu,

        columnDefs: [
            {
                targets: 1,
                render: DataTable.render.ellipsis(75, true),
            },
        ],

        language: {
            searchPlaceholder: " Pencarian...",
            search: "",
            lengthMenu: "Menampilkan _MENU_ data",
            info: "Total data: _TOTAL_",
        },

        ajax: {
            url: ajaxUrl,
            dataType: "json",
            type: "POST",
            timeout: 60000,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },

            data: function (d) {
                if (ajaxParams) {
                    for (let i = 0; i < ajaxParams.length; i++) {
                        d[ajaxParams[i]["key"]] = ajaxParams[i]["value"];
                    }
                }
            },
        },

        drawCallback: function () {
            if (drawCallback) {
                drawCallback();
            }
        },

        initComplete: function () {
            var searchInput = $('input[type="search"]');

            searchInput = $('input[type="search"]')
                .eq(tableIndex)
                .addClass("form-control");
            searchInput.wrap('<div class="input-group"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    };

    var tableKu = $("#" + tableId).DataTable(dataTableOptions);
    adjustTableHeader(tableId);

    $(window).off("resize");
    $(window).on("resize", function () {
        adjustTableHeader(tableId);
    });

    return tableKu;
}

/**
 * Inisialisasi tabel menggunakan data array lokal
 * @param {String} tableId
 * @param {Array} columnsKu - [{width: "100px"}, ...]
 * @param {Number} tableIndex - Default value = 1
 * @returns
 */
function initTable(tableId, columnsKu, tableIndex = 0, tableHeight = 0) {
    if ($.fn.DataTable.isDataTable("#" + tableId)) {
        $("#" + tableId)
            .DataTable()
            .destroy();
    }

    console.log("tableHeight", tableHeight);

    var dataTableOptions = {
        responsive: true,
        select: true,
        scrollY: tableHeight != 0 ? tableHeight : getTableHeight() + "px",
        scrollX: true,
        columns: columnsKu,

        columnDefs: [
            {
                targets: 1,
                render: DataTable.render.ellipsis(75, true),
            },
        ],

        language: {
            searchPlaceholder: " Pencarian...",
            search: "",
            lengthMenu: "Menampilkan _MENU_ data",
            info: "Total data: _TOTAL_",
        },

        initComplete: function () {
            var searchInput = $('input[type="search"]');

            searchInput = $('input[type="search"]')
                .eq(tableIndex)
                .addClass("form-control");
            searchInput.wrap('<div class="input-group"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    };

    var tableKu = $("#" + tableId).DataTable(dataTableOptions);
    adjustTableHeader(tableId);

    $(window).off("resize");
    $(window).on("resize", function () {
        adjustTableHeader(tableId);
    });

    return tableKu;
}

function getTableHeight(percentageHeight = 40) {
    var tableHeight = 0;
    var screenHeight = $(window).height();
    tableHeight = (screenHeight * percentageHeight) / 100;

    return tableHeight;
}

/**
 * Untuk memastikan tampilan header datatable tidak rusak
 * Dipakai pada fungsi initTable() & initTableServerSide
 *
 * @param {String} tableId
 */
function adjustTableHeader(tableId) {
    var table = $("#" + tableId).DataTable();
    var scrollBody = $(table.table().node()).parent();
    var isScrollable =
        scrollBody.outerWidth() < table.table().node().offsetWidth;

    if (!isScrollable) {
        $(".dataTables_scrollHead").css({
            display: "flex",
            "justify-content": "center",
        });
    } else {
        $(".dataTables_scrollHead").css("display", "block");
    }
}

/**
 * Memperbarui data pada tabel dengan array lokal (tidak bisa untuk tabel serverside)
 * @param {String} tableId
 * @param {Array} dataKu
 * @param {Array} keyOrder - ["NamaOrder", "IdOrder", ..]
 */
function updateTable(tableId, dataKu, keyOrder = null) {
    var rearrangedData;
    var table = $("#" + tableId).DataTable();

    if (keyOrder) {
        rearrangedData = dataKu.map(function (item) {
            return reorderKeys(item, keyOrder);
        });
    } else {
        rearrangedData = dataKu;
    }

    table.clear().draw();
    for (var i = 0; i < rearrangedData.length; i++) {
        table.row.add(Object.values(rearrangedData[i])).draw();
    }
}

function reorderKeys(object, order) {
    const reorderedObject = {};
    order.forEach((key) => {
        if (object.hasOwnProperty(key)) {
            reorderedObject[key] = object[key];
        }
    });

    return reorderedObject;
}

/**
 * Menambahkan fungsi yang akan dipanggil saat row diklik
 * @param {String} tableId
 * @param {Function} rowHandler - rowHandler(selectedRow) | selectedRow = ["01", "Barang", ...] (sesuai urutan kolom)
 * @param {Function} emptyHandler
 */
function addRowClick(tableId, rowHandler, emptyHandler = null) {
    var tableKu = $("#" + tableId).DataTable();
    var selectedRow;

    $("#" + tableId + " tbody").off("click");
    $("#" + tableId + " tbody").on("click", "tr", function () {
        tableKu.rows().nodes().to$().removeClass("row_selected");
        $(this).addClass("row_selected");

        var currentRow = tableKu.rows(".row_selected").data().toArray()[0];
        var selectedRowIndex = tableKu.row(this).index();
        if (selectedRow && selectedRow["NomorKu"] === currentRow["NomorKu"]) {
            $(this).removeClass("row_selected");
            selectedRow = null;

            if (emptyHandler) {
                emptyHandler();
            }
        } else {
            selectedRow = tableKu.rows(".row_selected").data().toArray()[0];
            console.log(selectedRow);
        }

        if (selectedRow && rowHandler) {
            rowHandler(selectedRow, selectedRowIndex);
        }
    });

    $("#" + tableId + " tbody").on(
        "click",
        "input[type='checkbox'], button",
        function (e) {
            e.stopPropagation();
        }
    );
}

/**
 * Menambahkan fungsi yang akan dipanggil saat 1 atau beberapa row diklik
 * @param {String} tableId
 * @param {Function} rowHandler - Fungsi yang dipanggil saat salat satu row diklik untuk PERTAMA kali |
 * rowHandler(data, index) |
 * data = {"NomorKu": 0, "RencanaStart": "2009-01-02", "RencanaSelesai": "2009-01-02"} |
 * index = 0
 * @param {Function} emptyHandler - Fungsi yang dipanggil saat salat satu row diklik untuk KEDUA kali untuk unselect |
 * emptyHandler(data, index)
 */
function addMultiRowClick(tableId, rowHandler, emptyHandler = null) {
    var selectedRows = [];

    $("#" + tableId + " tbody").off("click");
    $("#" + tableId + " tbody").on("click", "tr", function () {
        var $currentRow = $(this);
        var rowIndex = $currentRow.index(); // Get index of the clicked row

        // Check if the current row is already selected
        var indexInSelected = selectedRows.findIndex(function (row) {
            return row.index() === rowIndex;
        });

        var tableKu = $("#" + tableId).DataTable();
        var rowData = tableKu.rows(".row_selected").data().toArray()[rowIndex];

        if (indexInSelected !== -1) {
            // Row is already selected, remove selection
            selectedRows.splice(indexInSelected, 1); // Remove from array
            $currentRow.removeClass("row_selected"); // Remove class for visual feedback

            if (emptyHandler) {
                emptyHandler(rowData, rowIndex);
            }
        } else {
            // Row is not selected, add to selection
            selectedRows.push($currentRow); // Add to array
            $currentRow.addClass("row_selected"); // Add class for visual feedback

            if (rowHandler) {
                rowData = tableKu.rows().data().toArray()[rowIndex];
                rowHandler(rowData, rowIndex);
            }
        }

        // Optional: Output to console or handle other logic with selectedRows
        // console.log("Selected rows count: " + selectedRows.length);
    });

    $("#" + tableId + " tbody").on(
        "click",
        "input[type='checkbox'], button",
        function (e) {
            e.stopPropagation();
        }
    );
}

//#endregion

//#region Form
/**
 * Default upperCase, bila type number otomatis terisi 0 bila masih kosong
 * @param {Element} ele_curr element yang akan ditambahkan listener
 * @param {Element} ele_next listener mengarah ke elemen apa
 * @param {any} options upperCase,
 * extraAction (hal yang ingin dilakukan sebelum pindah ke elemen lain,
 * bila ada kondisi tertentu agar elemen tidak berpindah bisa tambahkan opsi stopAction = true),
 * stopAction = untuk stop saat selesai extraAction.
 */
function addTxtListener(ele_curr, ele_next, options = null) {
    ele_curr.addEventListener("keypress", function (event) {
        if (event.key == "Enter") {
            if (options != null) {
                const upperCase =
                    options.upperCase !== undefined ? options.upperCase : true;
                if (upperCase) this.value = this.value.toUpperCase();

                const extraAction = options.extraAction || null;
                if (extraAction != null) extraAction();

                const stopAction = options.stopAction || null;
                if (stopAction) return;
            }

            if (ele_curr.type == "number" && ele_curr.value == "")
                ele_curr.value = 0;

            if (ele_next.disabled) ele_next.disabled = false;
            ele_next.focus();
            if (ele_next.tagName == "INPUT") ele_next.select();
        }
    });
}

/**
 * Menambahkan validasi pada form. Jika form kosong. Jika input melebihi batas
 * @param {Array<Element>} elements - Element yang wajib untuk diisi (support tag input & select2)
 * @param {String} form_id - Id dari form submit
 */
function addValidation(elements, form_id) {
    // Pengecekkan saat form di-submit apakah semua data sudah terisi
    // Jika belum akan memunculkan invalid feedback
    $("#" + form_id).submit(function (e) {
        let is_invalid = false;
        elements.each(function () {
            if ($(this).is("input")) {
                // Jika input tag.
                if ($(this).val() === "" || $(this).val() == 0) {
                    $(this).addClass("is-invalid");
                    is_invalid = true;
                }
            } else if ($(this).is("select")) {
                // Jika select tag dengan library select2.
                if ($(this).prop("selectedIndex") === 0) {
                    $(
                        '[aria-labelledby="select2-' + this.id + '-container"]'
                    ).addClass("is-invalid");
                    is_invalid = true;
                }
            }
        });

        if (is_invalid) {
            e.preventDefault();
            e.stopPropagation();
            showToast("Data belum lengkap. Mohon periksa kembali!", "error");
        }
    });

    // Event handler saat data yang kosong sudah diisi
    // Maka invalid feedback akan dihilangkan
    elements.each(function () {
        if ($(this).is("input")) {
            // Jika input tag.
            $(this).on("input", function () {
                if ($(this).val() !== "") {
                    $(this).removeClass("is-invalid");
                }
            });
        } else if ($(this).is("select")) {
            // Jika select tag dengan library select2.
            $(this).on("select2:select", function () {
                if ($(this).prop("selectedIndex") !== 0)
                    $(
                        '[aria-labelledby="select2-' + this.id + '-container"]'
                    ).removeClass("is-invalid");
            });
        }
    });
}

/**
 * Menghapus event handler pada elemen input & select yang sudah ditambahkan lewat addValidation()
 * @param {Array<Element>} elements - Element yang wajib untuk diisi (tag input & select2)
 * @param {String} form_id  - Id dari form submit
 * @param {Object<Function>} handlers - Fungsi yang sebelumnya ada pada element yang wajib diisi, untuk di-assign kembali setelah menghapus validasi
 */
function removeValidation(elements, form_id, handlers = {}) {
    $("#" + form_id).off("submit"); // Remove submit event handler

    elements.each(function () {
        var $element = $(this);
        var elementId = $element.attr("id");

        // Remove specific event handlers added by validation
        if ($element.is("input")) {
            $element.off("input");
        } else if ($element.is("select")) {
            $element.off("select2:select");
        }

        // Restore pre-existing event handlers if handlers is provided
        if (handlers && handlers.hasOwnProperty(elementId)) {
            $.each(handlers[elementId], function (eventName, handler) {
                $element.on(eventName, handler);
            });
        }

        // Remove "is-invalid" class
        $element.removeClass("is-invalid");
    });
}

/**
 * Menambahkan event handler yang menampilkan keterangan bila limit karakter dicapai untuk input tersebut
 * @param {Element} input_ele - Element input yang akan ditambahkan event handler
 * @param {Element} warning_ele - Element keterangan input yang akan ditampilkan saat input melebihi batas
 */
function addCharLimit(input_ele, warning_ele) {
    input_ele.addEventListener("input", function () {
        if (this.value.length == parseInt(this.getAttribute("maxlength"))) {
            warning_ele.style.display = "block";
        } else warning_ele.style.display = "none";
    });
}

/**
 * Menambahkan event handler yang menampilkan keterangan bila limit angka dicapai untuk input tersebut
 * @param {Element} input_ele - Element input yang akan ditambahkan event handler
 * @param {Element} warning_ele - Element keterangan input yang akan ditampilkan saat input melebihi batas
 */
function addNumLimit(input_ele, warning_ele) {
    input_ele.addEventListener("input", function (event) {
        var enteredValue = parseFloat(this.value);
        var maxValue = parseFloat(this.getAttribute("max"));

        if (!isNaN(maxValue) && enteredValue > maxValue) {
            this.value = maxValue; // Set the value to the maximum allowed
        }

        if (!isNaN(maxValue) && enteredValue >= maxValue) {
            warning_ele.style.display = "block";
        } else {
            warning_ele.style.display = "none";
        }

        if (event.key === "-" || event.key === ".") {
            event.preventDefault();
        }
    });
}

function clearForm(exception = null) {
    $('input[type="text"], input[type="number"], input[type="time"]').val("");
    if (exception != "date") $('input[type="date"]').val(getCurrentDate());
    $('input[type="checkbox"]').prop("checked", false);

    $("select").each(function () {
        let firstOptionValue = $(this).find("option:first").val();
        $(this).val(firstOptionValue).trigger("change.select2");
    });
}

function disableAllInputs() {
    var inputs = document.querySelectorAll("input, select, textarea");
    for (var i = 0; i < inputs.length; i++) inputs[i].disabled = true;
}

function prepareButtons(btn_isi, btn_koreksi, btn_hapus, btn_batal) {
    btn_isi.addEventListener("click", function () {
        this.classList.add("btn-clicked-isi");
    });

    btn_koreksi.addEventListener("click", function () {
        this.classList.add("btn-clicked-koreksi");
    });

    btn_hapus.addEventListener("click", function () {
        this.classList.add("btn-clicked-hapus");
    });

    btn_batal.addEventListener("click", function () {
        btnIsi.classList.remove("btn-clicked-isi");
        btnKoreksi.classList.remove("btn-clicked-koreksi");
        btnHapus.classList.remove("btn-clicked-hapus");
    });
}
//#endregion

function snakeToTitleCase(str) {
    return str.replace(/_/g, " ").replace(/\b\w/g, function (match) {
        return match.toUpperCase();
    });
}

function dateTimeToDate(dt_str) {
    return dt_str.split(" ")[0];
}

function dateTimeToTime(dt_str) {
    return dt_str.substring(11, 16);
}

/**
 * Ambil tanggal sekarang
 * @param {String / number} options, -1 untuk tanggal kemarin
 * @returns
 */
function getCurrentDate(options) {
    let currentDate = new Date();

    if (typeof options === "number") {
        currentDate.setDate(currentDate.getDate() + options);
    }

    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, "0");
    let day = String(currentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function getCurrentTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();

    return (
        (hours < 10 ? "0" : "") +
        hours +
        ":" +
        (minutes < 10 ? "0" : "") +
        minutes
    );
}

function getCurrentDateTime() {
    var now = new Date();

    var year = now.getFullYear();
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var day = ("0" + now.getDate()).slice(-2);
    var hours = ("0" + now.getHours()).slice(-2);
    var minutes = ("0" + now.getMinutes()).slice(-2);
    var seconds = ("0" + now.getSeconds()).slice(-2);

    return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
    );
}

function addThousandsSeparator(number) {
    // Convert number to string
    let numStr = number.toString();
    // Split the string into groups of three characters from the end
    let parts = [];
    for (let i = numStr.length; i > 0; i -= 3) {
        parts.unshift(numStr.slice(Math.max(0, i - 3), i));
    }
    // Join the parts with dots and return
    return parts.join(".");
}

/**
 * Menampilkan toast berisi teks dan type yang dimasukkan.
 * @param {String} message
 * @param {String} type "info", "success", atau "error"; Default Value = "info"
 */
function showToast(message, type = "info") {
    let iconPath;
    switch (type) {
        case "success":
            iconPath = $("#toastHeader").data("success-icon");
            $("#toastHeader").html(
                `<img src="${iconPath}" class="me-2" alt="Success Icon">
                <strong class="me-auto">Berhasil!</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>`
            );
            break;
        case "error":
            iconPath = $("#toastHeader").data("error-icon");
            $("#toastHeader").html(
                `<img src="${iconPath}" class="me-2" alt="Error Icon">
                <strong class="me-auto">Gagal!</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>`
            );
            break;
        default:
            iconPath = $("#toastHeader").data("info-icon");
            $("#toastHeader").html(
                `<img src="${iconPath}" class="me-2" alt="Info Icon">
                <strong class="me-auto">Info.</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>`
            );
            break;
    }

    $("#toastText").html(message);

    var myToast = new bootstrap.Toast($("#myToast")[0]);
    $(".toast-container").removeClass("d-none");

    myToast.show();
}

/**
 * Kosongkan bagian fun_confirm untuk menampilkan Modal Informasi.
 * @param {String} message
 * @param {Function} fun_confirm
 * @param {Function} fun_cancel
 */
function showModal(
    message,
    fun_confirm = null,
    fun_cancel = null,
    modal_title = null
) {
    if (!fun_confirm) {
        // Modal informasi
        $("#cm_title").text("Pesan Informasi");
        $("#cm_btn_ya").hide();
        $("#cm_btn_tidak").text("Tutup");
    } else {
        // Modal konfirmasi
        $("#cm_title").text("Pesan Konfirmasi");
        $("#cm_btn_ya").show();
        $("#cm_btn_tidak").text("Tidak");
    }

    if (modal_title) {
        $("#cm_title").text(modal_title);
    }

    $("#confirmation_modal").modal("show");

    $("#cm_body").html(message);

    setTimeout(function () {
        $("#cm_btn_ya").focus();
    }, 500);

    // Remove any existing click event handlers
    $("#cm_btn_ya").off("click");

    // Attach the new click event handler
    $("#cm_btn_ya").on("click", function () {
        fun_confirm();
    });

    if (fun_cancel != null) {
        // Remove any existing click event handlers
        $("#cm_btn_tidak").off("click");

        // Attach the new click event handler
        $("#cm_btn_tidak").on("click", function () {
            fun_cancel();
        });
    }
}

/**
 * Menerapkan filter validasi pada elemen input teks agar hanya menerima nilai yang sesuai aturan.
 * Jika input tidak valid, nilai sebelumnya akan dikembalikan dan pesan error ditampilkan.
 *
 * @param {HTMLInputElement} textbox - Elemen input yang akan difilter.
 * @param {Function} inputFilter - Fungsi yang menerima nilai input dan mengembalikan true jika valid.
 * @param {String} errMsg - Pesan yang ditampilkan saat input tidak valid.
 *
 * Fungsi ini memantau berbagai event input secara real-time (seperti input, keydown, mouseup, dll.)
 * untuk mencegah pengguna memasukkan nilai yang tidak sesuai.
 * Jika nilai tidak valid, nilai lama akan dipulihkan (jika ada) dan pesan validasi akan ditampilkan
 * menggunakan tooltip bawaan browser.
 */
function setInputFilter(textbox, inputFilter, errMsg) {
    [
        "input",
        "keydown",
        "keyup",
        "mousedown",
        "mouseup",
        "select",
        "contextmenu",
        "drop",
        "focusout",
    ].forEach(function (event) {
        textbox.addEventListener(event, function (e) {
            if (inputFilter(this.value)) {
                // Accepted value
                if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                // Rejected value - restore the previous one
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(
                    this.oldSelectionStart,
                    this.oldSelectionEnd
                );
            } else {
                // Rejected value - nothing to restore
                this.value = "";
            }
        });
    });
}

/**
Examples input filters.

setInputFilter(
    document.getElementById("intTextBox"),
    function (value) {
        return /^-?\d*$/.test(value);
    },
    "Must be an integer"
);

setInputFilter(
    document.getElementById("uintTextBox"),
    function (value) {
        return /^\d*$/.test(value);
    },
    "Must be an unsigned integer"
);

setInputFilter(
    document.getElementById("intLimitTextBox"),
    function (value) {
        return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 500);
    },
    "Must be between 0 and 500"
);

setInputFilter(
    document.getElementById("floatTextBox"),
    function (value) {
        return /^-?\d*[.,]?\d*$/.test(value);
    },
    "Must be a floating (real) number"
);

setInputFilter(
    document.getElementById("currencyTextBox"),
    function (value) {
        return /^-?\d*[.,]?\d{0,2}$/.test(value);
    },
    "Must be a currency value"
);

setInputFilter(
    document.getElementById("latinTextBox"),
    function (value) {
        return /^[a-z]*$/i.test(value);
    },
    "Must use alphabetic latin characters"
);

setInputFilter(
    document.getElementById("hexTextBox"),
    function (value) {
        return /^[0-9a-f]*$/i.test(value);
    },
    "Must use hexadecimal characters"
);
 */

$(document).ready(function () {
    // Jika dapat pesan dari controller maka tampilkan
    if ($(".toast").length > 0) $(".toast").toast("show");

    // Disable scroll pada html
    var myModal = document.getElementById("confirmation_modal");
    myModal.addEventListener("show.bs.modal", function () {
        document.documentElement.style.overflow = "hidden";
    });
    myModal.addEventListener("hidden.bs.modal", function () {
        document.documentElement.style.overflow = "auto";
    });

    AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false,
    });
});

$(document).on("show.bs.modal", ".modal", function () {
    const zIndex = 1040 + 10 * $(".modal:visible").length;
    $(this).css("z-index", zIndex);
    setTimeout(() =>
        $(".modal-backdrop")
            .not(".modal-stack")
            .css("z-index", zIndex - 1)
            .addClass("modal-stack")
    );

    // Source: https://stackoverflow.com/questions/19305821/multiple-modals-overlay
});
