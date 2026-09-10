const loadingLabel = $("#loading_label");
const tableContainer = $("#table_container");
const MD_titleLabel = document.getElementById("md_title");

var MD_columnSizes = [100, 150, 80]; // Percentage
var MD_tableHeaders = ["Custom 1", "Custom 2", "Custom 3"];
var MD_tableData = [
    { Id_mesin: "141", IdType_mesin: "4", Nama_mesin: "CB-01" },
    { Id_mesin: "142", IdType_mesin: "5", Nama_mesin: "CB-02" },
];

var currentData = null;
var MD_selectedData = null;
var MD_postAction = null;

const btnOK = document.getElementById("modal_ok");
btnOK.addEventListener("click", function () {
    MD_selectedData = currentData[0];
    console.log(MD_selectedData);

    if (MD_postAction != null) MD_postAction();
});

function MD_populateTable(data, headers, columnSizes) {
    // Check if DataTable instance exists before destroying
    if ($.fn.DataTable.isDataTable("#myTable"))
        $("#myTable").DataTable().clear().destroy();

    // Clear existing header
    $("#myTable thead").empty();

    // Generate new table header
    var headerRow = $("<tr>");

    // Use custom headers if provided, otherwise use keys from data
    var headerArray = headers || Object.keys(data[0]);

    headerArray.forEach(function (header, _) {
        headerRow.append($("<th>").text(header));
    });

    $("#myTable thead").append(headerRow);

    // Reinitialize DataTable with column widths
    var columnDefs = [];
    if (columnSizes) {
        columnSizes.forEach(function (size, index) {
            columnDefs.push({ width: size, targets: index });
        });
    }

    var screenHeight = $(window).height();
    var percentageHeight = 45;
    var tableHeight = (screenHeight * percentageHeight) / 100;

    var dataTableOptions = {
        responsive: true,
        select: true,
        scrollY: tableHeight + "px",
        columnDefs: columnDefs,
        language: {
            searchPlaceholder: " Pencarian...",
            search: "",
            info: "Menampilkan _START_ - _END_ dari _TOTAL_ total data",
            infoFiltered: "(disaring dari _MAX_ total data)",
            infoEmpty: "Menampilkan 0 data",
            zeroRecords: "Data tidak ditemukan",
            lengthMenu: "Menampilkan _MENU_ data per halaman",
            select: {
                rows: "",
            },
        },
        initComplete: function () {
            var searchInput = $('input[type="search"]').addClass(
                "form-control"
            );
            searchInput.wrap('<div class="input-group input-group-sm"></div>');
            searchInput.before('<span class="input-group-text">Cari:</span>');
        },
    };

    var table = $("#myTable").DataTable(dataTableOptions);

    // Populate the table with data
    for (var i = 0; i < data.length; i++)
        table.row.add(Object.values(data[i])).draw();

    $("#myTable tbody").on("click", "tr", function () {
        var table = $("#myTable").DataTable(); // Get DataTable instance

        // Remove "selected" class from all rows
        table.rows().nodes().to$().removeClass("selected");

        // Add "selected" class to the clicked row
        $(this).toggleClass("selected");

        // Get selected rows
        var selectedRows = table.rows(".selected").data().toArray();
        var selectedRowsMapped = selectedRows.map(function (row) {
            var rowData = {};
            headerArray.forEach(function (header, index) {
                rowData[header] = row[index];
            });
            return rowData;
        });

        // console.log(selectedRowsMapped);
        currentData = selectedRowsMapped;

        document.getElementById("modal_ok").focus();
    });
}

function showModalTable(options) {
    var data = options.data;
    var desiredKeyOrder = options.keyOrder;
    var rearrangedData = data.map(function (item) {
        return reorderKeys(item, desiredKeyOrder);
    });

    console.log(rearrangedData);

    MD_tableData = rearrangedData;
    MD_tableHeaders = options.tableHeaders;
    MD_columnSizes = options.columnSizes;
    MD_postAction = options.postAction();

    $("#staticBackdrop").modal("show");
}

$(document).ready(function () {
    $("#staticBackdrop").on("shown.bs.modal", function () {
        loadingLabel.hide();
        tableContainer.show();
        MD_selectedData = null;

        MD_populateTable(MD_tableData, MD_tableHeaders, MD_columnSizes);
    });

    $("#staticBackdrop").on("hidden.bs.modal", function () {
        loadingLabel.show();
        tableContainer.hide();

        var table = $("#myTable").DataTable();
        table.clear().destroy();

        MD_columnSizes = null;
        MD_tableData = null;
        MD_tableHeaders = null;
        MD_selectedData = null;
        MD_postAction = null;

        MD_titleLabel.textContent = "Modal Table";
    });
});
