jQuery(function ($) {
    let csrfToken = $('meta[name="csrf-token"]').attr("content");
    let tabelData = $("#tabelData").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        searching: false,
        ordering: false,
        ajax: {
            url: "/Kencana/DaftarHarga/create",
            dataType: "json",
            type: "GET",
            data: function (d) {
                d._token = csrfToken;

                // collect custom filters
                let filters = [];
                $("#modalAdvancedSearch .advanced-filter-group").each(function (
                    i,
                    el
                ) {
                    const column = $(this).find(".column-select").val();
                    const operator = $(this).find(".filter-type").val();
                    const sort = $(this).find(".sort-order").val();
                    const isBetween = operator === "isbetween" || operator === "notbetween"; //prettier-ignore
                    let value = null;

                    if (column && operator) {
                        const colType = columnTypeMap[column];
                        if (colType == "date") {
                            if (isBetween) {
                                value =
                                    $(el).find(".search-date1").val().trim() +
                                    ", " +
                                    $(el).find(".search-date2").val().trim();
                            } else {
                                value = $(el).find(".search-date").val().trim();
                            }
                        } else if (colType == "number") {
                            if (isBetween) {
                                value =
                                    $(el).find(".search-number1").val().trim() +
                                    ", " +
                                    $(el).find(".search-number2").val().trim();
                            } else {
                                value = $(el)
                                    .find(".search-number")
                                    .val()
                                    .trim();
                            }
                        } else {
                            value = $(el).find(".search-value").val().trim();
                        }
                    }

                    if ((column && operator && value) || (column && sort)) {
                        filters.push({ column, operator, value, sort });
                    }
                });

                d.custom_filters = filters;
                // d.maximumRecords = parseInt($("#maximumRecords").val());
            },
        },
        columns: [
            { data: "Kd_div", title: "Kode Divisi" },
            { data: "Kd_brg", title: "Kode Barang" },
            { data: "NAMA_BRG", title: "Nama Barang" },
            { data: "Nama_satuan", title: "Nama Satuan" },
            { data: "NM_SUP", title: "Nama Supplier" },
            { data: "KOTA1", title: "Kota" },
            { data: "NEGARA1", title: "Negara" },
            {
                data: "Hrg_trm",
                title: "Harga Unit",
                render: function (data, type, row) {
                    return numeral(data).format("0,0.00");
                },
            },
            { data: "Id_MataUang_BC", title: "Mata Uang" },
            { data: "Nama", title: "Requester" },
            // {
            //     data: "Tgl_order",
            //     render: function (data, type, row) {
            //         return moment(data).format("MM-DD-YYYY");
            //     },
            // },
            {
                data: "Datang",
                title: "Tgl. Datang",
                render: function (data, type, row) {
                    return moment(data).format("MM-DD-YYYY");
                },
            },
        ],
    });

    const columnTypeMap = {
        Kd_div: "string",
        Kd_brg: "number",
        NAMA_BRG: "string",
        Nama_satuan: "string",
        NM_SUP: "string",
        KOTA1: "string",
        NEGARA1: "string",
        Hrg_trm: "number",
        Id_MataUang_BC: "string",
        Nama: "string",
        Datang: "date",
    };

    const filterOptions = {
        string: ["=", "!=", "like", "in", "notin", "isnull", "isnotnull"],
        number: ['=', '!=', 'like', 'in', 'notin', 'isbetween', 'notbetween', 'isnull', 'isnotnull'], // prettier-ignore
        date: ["=", "!=", "isbetween", "notbetween", "isnull", "isnotnull"],
        boolean: ["=", "!=", "isnull", "isnotnull"],
    };

    //#region functions

    // Setup global AJAX handlers
    $.ajaxSetup({
        beforeSend: function () {
            // Show the loading screen before the AJAX request
            $("#loading-screen").css("display", "flex");
        },
        complete: function () {
            // Hide the loading screen after the AJAX request completes
            $("#loading-screen").css("display", "none");
        },
    });

    function populateColumn() {
        let select = $(".column-select"); // or loop over each if you have multiple

        // Get visible columns from DataTable
        tabelData.columns().every(function () {
            let colData = this.dataSrc(); // column 'data'
            let colTitle = this.header().textContent; // column header text

            // Only include if column has a defined 'data' property
            if (colData) {
                select.append(
                    $("<option>", {
                        value: colData,
                        text: colTitle,
                    })
                );
            }
        });
        select.prop("selectedIndex", 0); // Reset to first option
        $(".advanced-filter-group").each(function () {
            const group = $(this);
            const columnSelect = group.find(".column-select");
            const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

            // Reset each select to first option
            columnSelect.val("").trigger("change");
            group.find(".filter-type").val("").trigger("change");
            group.find(".search-value").val("");
            group.find(".search-date1").val(today);
            group.find(".search-date2").val(today);
            group.find(".search-date").val(today);
        });
    }

    function initializeSelect2() {
        $(".column-select").select2({
            placeholder: "Select column name",
            allowClear: true,
            dropdownParent: $("#modalAdvancedSearch"), // important if inside a modal
        });
        $(".filter-type").select2({
            placeholder: "Select Filter Type",
            allowClear: true,
            dropdownParent: $("#modalAdvancedSearch"), // important if inside a modal
        });
        $(".sort-order").select2({
            placeholder: "Select Sort Type",
            allowClear: true,
            dropdownParent: $("#modalAdvancedSearch"), // important if inside a modal
        });
    }

    function handleFilterTypeVisibility() {
        $(".advanced-filter-group").each(function () {
            const group = $(this);
            const columnSelect = group.find(".column-select");
            const filterType = group.find(".filter-type");

            columnSelect.on("change", function () {
                const selectedCol = $(this).val();

                const colType = columnTypeMap[selectedCol] || "string"; // fallback to string

                const allowed = filterOptions[colType] || [];

                // Save current value to try reselecting it later
                const prevVal = filterType.val();
                // console.log("Selected Column:", selectedCol);
                // console.log("Column Type:", colType);
                // console.log("Allowed Filter Types:", allowed);
                // console.log("Previous Value:", prevVal);

                // Clear and rebuild options
                filterType.empty();
                allowed.forEach((opt) => {
                    const label = getFilterLabel(opt); // Optional: prettier labels
                    // console.log("Adding Option:", label, opt);
                    filterType.append(new Option(label, opt));
                });

                if (allowed.includes(prevVal)) {
                    filterType.val(prevVal);
                } else {
                    filterType.val("");
                }

                const filter = filterType.val();
                const isBetween = filter === "isbetween" || filter === "notbetween"; //prettier-ignore

                group.find(".search-value").hide();
                group.find(".search-date").hide();
                group.find(".search-number").hide();
                group.find(".div-date-between").hide();
                group.find(".div-number-between").hide();

                if (colType === "date") {
                    if (isBetween) {
                        group.find(".div-date-between").show();
                    } else {
                        group.find(".search-date").show();
                    }
                } else if (colType === "number") {
                    if (isBetween) {
                        group.find(".div-number-between").show();
                    } else {
                        group.find(".search-number").show();
                    }
                } else {
                    group.find(".search-value").show();
                }
            });

            filterType.on("change", function () {
                const selectedCol = columnSelect.val();

                const colType = columnTypeMap[selectedCol] || "string"; // fallback to string

                const filter = filterType.val();
                const isBetween = filter === "isbetween" || filter === "notbetween"; // prettier-ignore

                group.find(".search-value").hide();
                group.find(".search-date").hide();
                group.find(".search-number").hide();
                group.find(".div-date-between").hide();
                group.find(".div-number-between").hide();

                if (colType === "date") {
                    if (isBetween) {
                        group.find(".div-date-between").show();
                    } else {
                        group.find(".search-date").show();
                    }
                } else if (colType === "number") {
                    if (isBetween) {
                        group.find(".div-number-between").show();
                    } else {
                        group.find(".search-number").show();
                    }
                } else {
                    group.find(".search-value").show();
                }
            });
            // Trigger change to initialize the correct options
            columnSelect.trigger("change");
        });
    }

    function getFilterLabel(op) {
        switch (op) {
            case "=":
                return "Equal";
            case "!=":
                return "Not Equal";
            case "like":
                return "Contains";
            case "in":
                return "In";
            case "notin":
                return "Not In";
            case "isbetween":
                return "Is Between";
            case "notbetween":
                return "Is Not Between";
            case "isnull":
                return "Is Null";
            case "isnotnull":
                return "Is Not Null";
            default:
                return op;
        }
    }

    //#endregion

    //#region Form Load

    populateColumn();
    initializeSelect2();
    handleFilterTypeVisibility();

    //#endregion

    //#region Event Listener

    $("#btnAdvancedSearch").on("click", function () {
        $("#modalAdvancedSearch").modal("show");
    });

    $("#closeModalButton").on("click", function () {
        $("#modalAdvancedSearch").modal("hide");
    });

    $("#applySearch").on("click", function () {
        let isValid = true;
        let errorMsg = "";
        let firstInvalidInput;

        $(".advanced-filter-group").each(function (i, el) {
            const index = i + 1;
            const column = $(el).find(".column-select").val();
            const filter = $(el).find(".filter-type").val();
            const isBetween = filter === "isbetween" || filter === "notbetween"; //prettier-ignore
            let value, value1, value2;

            if (column && filter) {
                const colType = columnTypeMap[column];
                if (colType == "date") {
                    if (isBetween) {
                        value1 = $(el).find(".search-date1").val().trim();
                        value2 = $(el).find(".search-date2").val().trim();
                        if (!value1 || !value2) {
                            isValid = false;
                            errorMsg = `Tanggal awal dan akhir pada filter baris ${index} belum lengkap.`;
                            firstInvalidInput =
                                firstInvalidInput ||
                                (!value1
                                    ? $el.find(".search-date1")[0]
                                    : $el.find(".search-date2")[0]);
                            return false; // Break loop
                        }
                        if (value1 > value2) {
                            isValid = false;
                            errorMsg = `Tanggal awal lebih besar daripada tanggal akhir pada filter baris ${index}.`;
                            firstInvalidInput =
                                firstInvalidInput ||
                                (!value1
                                    ? $el.find(".search-date1")[0]
                                    : $el.find(".search-date2")[0]);
                            return false; // Break loop
                        }
                    } else {
                        value = $(el).find(".search-date").val().trim();
                        if (!value) {
                            isValid = false;
                            errorMsg = `Tanggal pada filter baris ${index} belum diisi.`;
                            firstInvalidInput =
                                firstInvalidInput ||
                                $el.find(".search-date")[0];
                            return false;
                        }
                    }
                } else if (colType == "number") {
                    if (isBetween) {
                        value1 = $(el).find(".search-number1").val().trim();
                        value2 = $(el).find(".search-number2").val().trim();
                        if (!value1 || !value2) {
                            isValid = false;
                            errorMsg = `Nilai angka antara pada filter baris ${index} belum lengkap.`;
                            firstInvalidInput =
                                firstInvalidInput ||
                                (!value1
                                    ? $el.find(".search-number1")[0]
                                    : $el.find(".search-number2")[0]);
                            return false;
                        }
                        if (value1 > value2) {
                            isValid = false;
                            errorMsg = `Nilai angka awal lebih besar daripada angka akhir pada filter baris ${index}.`;
                            firstInvalidInput =
                                firstInvalidInput ||
                                (!value1
                                    ? $el.find(".search-number1")[0]
                                    : $el.find(".search-number2")[0]);
                            return false;
                        }
                    } else {
                        value = $(el).find(".search-number").val().trim();
                        if (!value) {
                            isValid = false;
                            errorMsg = `Nilai angka pada filter baris ${index} belum diisi.`;
                            firstInvalidInput =
                                firstInvalidInput ||
                                $el.find(".search-number")[0];
                            return false;
                        }
                    }
                } else {
                    value = $(el).find(".search-value").val().trim();
                    if (!value) {
                        isValid = false;
                        errorMsg = `Nilai pencarian pada filter baris ${index} belum diisi.`;
                        firstInvalidInput =
                            firstInvalidInput || $el.find(".search-value")[0];
                        return false;
                    }
                }
            }
        });

        if ($("#maximumRecords").val() == "") {
            $("#maximumRecords").val(1000);
        }

        if (!isValid) {
            Swal.fire({
                icon: "warning",
                title: "Invalid Input",
                text: errorMsg,
            });
            return;
        }

        console.log("All filters valid. Proceed...");
        $("#modalAdvancedSearch").modal("hide");
        tabelData.ajax.reload(); // trigger reload with custom filters
    });

    $("#btnExportExcel").on("click", function () {
        let requestData = {
            _token: csrfToken,
            jenisStore: "exportToExcel",
            maximumRecords: parseInt($("#maximumRecords").val()) || 10,
            custom_filters: [],
        };

        $("#modalAdvancedSearch .advanced-filter-group").each(function (i, el) {
            const column = $(this).find(".column-select").val();
            const operator = $(this).find(".filter-type").val();
            const sort = $(this).find(".sort-order").val();
            const isBetween = operator === "isbetween" || operator === "notbetween"; //prettier-ignore
            let value = null;

            if (column && operator) {
                const colType = columnTypeMap[column];
                if (colType == "date") {
                    if (isBetween) {
                        value =
                            $(el).find(".search-date1").val().trim() +
                            ", " +
                            $(el).find(".search-date2").val().trim();
                    } else {
                        value = $(el).find(".search-date").val().trim();
                    }
                } else if (colType == "number") {
                    if (isBetween) {
                        value =
                            $(el).find(".search-number1").val().trim() +
                            ", " +
                            $(el).find(".search-number2").val().trim();
                    } else {
                        value = $(el).find(".search-number").val().trim();
                    }
                } else {
                    value = $(el).find(".search-value").val().trim();
                }
            }

            if ((column && operator && value) || (column && sort)) {
                requestData.custom_filters.push({
                    column,
                    operator,
                    value,
                    sort,
                });
            }
        });

        $.ajax({
            url: "/Kencana/DaftarHarga", 
            method: "POST",
            data: requestData,
            success: function (response) {
                // Convert response (JSON array) to Excel
                const dataToExport = response.data.map((row) => ({
                    "Kode Divisi": row.Kd_div,
                    "Kode Barang": row.Kd_brg,
                    "Nama Barang": row.NAMA_BRG,
                    "Nama Satuan": row.Nama_satuan,
                    "Nama Supplier": row.NM_SUP,
                    Kota: row.KOTA1,
                    Negara: row.NEGARA1,
                    "Harga Unit": row.Hrg_trm,
                    "Mata Uang": row.Id_MataUang_BC,
                    Requester: row.Nama,
                    "Tgl. Datang": row.Datang,
                }));

                let ws = XLSX.utils.json_to_sheet(dataToExport);
                let wb = XLSX.utils.book_new();
                const sheetName = moment().format("YYYY-MM-DD_HH;mm;ss");
                XLSX.utils.book_append_sheet(wb, ws, sheetName);
                const fileName = `Daftar Harga ${moment().format("DD-MM-YYYY_HH;mm;ss")}.xlsx`;
                XLSX.writeFile(wb, fileName);
            },
        });
    });
    //#endregion
});
