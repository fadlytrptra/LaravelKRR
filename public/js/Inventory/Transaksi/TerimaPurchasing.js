    var csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    // Button variables
    var btn_proses = document.getElementById("btn_proses");
    var btn_batal = document.getElementById("btn_batal");
    var btn_divisi = document.getElementById("btn_divisi");
    var btn_objek = document.getElementById("btn_objek");
    var btn_kelompok = document.getElementById("btn_kelompok");
    var btn_kelut = document.getElementById("btn_kelut");
    var btn_subkel = document.getElementById("btn_subkel");
    var keterangan = document.getElementById("keterangan");

    // Divisi section
    var divisiNama = document.getElementById("divisiNama");
    var penerima = document.getElementById("penerima");
    var objekNama = document.getElementById("objekNama");
    var kelompokNama = document.getElementById("kelompokNama");
    var kelutNama = document.getElementById("kelutNama");
    var subkelNama = document.getElementById("subkelNama");

    // Hidden ID inputs
    var divisiId = document.getElementById("divisiId");
    var objekId = document.getElementById("objekId");
    var kelompokId = document.getElementById("kelompokId");
    var kelutId = document.getElementById("kelutId");
    var subkelId = document.getElementById("subkelId");

    // Kode Transaksi section
    var kodeTransaksi = document.getElementById("kodeTransaksi");
    var tanggal = document.getElementById("tanggal");
    var pib = document.getElementById("pib");
    var kodeBarang = document.getElementById("kodeBarang");
    var kodeType = document.getElementById("kodeType");
    var namaBarang = document.getElementById("namaBarang");

    // Jumlah Barang section
    var primer = document.getElementById("primer");
    var satuanPrimer = document.getElementById("satuanPrimer");
    var sekunder = document.getElementById("sekunder");
    var satuanSekunder = document.getElementById("satuanSekunder");
    var tritier = document.getElementById("tritier");
    var satuanTritier = document.getElementById("satuanTritier");

    function getUserId() {
        $.ajax({
            type: "GET",
            url: "TerimaPurchasing/getUserId",
            data: {
                _token: csrfToken,
            },
            success: function (result) {
                penerima.value = result.user;
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }

    $(document).ready(function () {
        getUserId();
        $("#btn_kelompok").hide();
        $("#btn_kelut").hide();
        $("#btn_subkel").hide();
    });

    $(document).ready(function () {
        $("#tableData").DataTable({
            paging: false,
            searching: false,
            info: false,
            ordering: true,
            columns: [
                { title: "Pilih" },
                { title: "Tgl Datang" },
                { title: "Kode Type" },
                { title: "Nama Barang" },
                { title: "Jml. Primer" },
                { title: "Jml. Sekunder" },
                { title: "Jml. Tritier" },
                { title: "Kode Transaksi" },
                { title: "NoPIB" },
                { title: "No PO" },
                { title: "Sat Primer" },
                { title: "Sat Tritier" },
                { title: "Kode Barang" },
            ],
            colResize: {
                isEnabled: true,
                hoverClass: "dt-colresizable-hover",
                hasBoundCheck: true,
                minBoundClass: "dt-colresizable-bound-min",
                maxBoundClass: "dt-colresizable-bound-max",
                saveState: true,
                // isResizable: function (column) {
                //     return column.idx !== 2;
                // },
                onResize: function (column) {
                    //console.log('...resizing...');
                },
                onResizeEnd: function (column, columns) {
                    // console.log('I have been resized!');
                },
                stateSaveCallback: function (settings, data) {
                    let stateStorageName =
                        window.location.pathname + "/colResizeStateData";
                    localStorage.setItem(stateStorageName, JSON.stringify(data));
                },
                stateLoadCallback: function (settings) {
                    let stateStorageName =
                            window.location.pathname + "/colResizeStateData",
                        data = localStorage.getItem(stateStorageName);
                    return data != null ? JSON.parse(data) : null;
                },
            },
            scrollY: "400px",
            autoWidth: false,
            scrollX: "150%",
            columnDefs: [
                { targets: [0], width: "5%", className: "fixed-width" },
                { targets: [1], width: "5%", className: "fixed-width" },
                { targets: [2], width: "15%", className: "fixed-width" },
                { targets: [3], width: "35%", className: "fixed-width" },
                { targets: [4], width: "10%", className: "fixed-width" },
                { targets: [5], width: "10%", className: "fixed-width" },
                { targets: [6], width: "10%", className: "fixed-width" },
                { targets: [7], width: "10%", className: "fixed-width" },
                { targets: [8], width: "10%", className: "fixed-width" },
                { targets: [9], width: "10%", className: "fixed-width" },
                { targets: [10,11,12,13], visible: false },
            ],
        });

        var table = $("#tableData").DataTable();

        // ===============================
        // CENTANG ALL -> CHECKBOX ROW
        // ===============================
        $("#centang").on("change", function () {
            const isChecked = $(this).prop("checked");

            $("#tableData tbody .row-select")
                .prop("checked", isChecked)
                .trigger("change");
        });


        // Handle row click
        $("#tableData tbody").on("click", "tr", function () {
            selectRow($(this));
        });

        // ===============================
        // KLIK LINK NO PO
        // ===============================
        $("#tableData tbody").on("click", ".po-link", function (e) {
            e.stopPropagation();
        });

        // Handle arrow key navigation for row selection
        $(document).keydown(function (e) {
            var $selected = $("#tableData tbody tr.selected"); // Get the currently selected row
            if ($selected.length) {
                var $next;

                switch (e.which) {
                    case 38: // Up arrow key
                        $next = $selected.prev("tr"); // Select the previous row
                        break;
                    case 40: // Down arrow key
                        $next = $selected.next("tr"); // Select the next row
                        break;
                    default:
                        return; // Exit if it's not an up or down arrow key
                }

                if ($next.length) {
                    selectRow($next); // Apply the row selection to the next or previous row
                    e.preventDefault(); // Prevent default action (scroll / move cursor)
                }
            }
        });
    });

    function selectRow($row) {
        var table = $("#tableData").DataTable();
        table.$("tr.selected").removeClass("selected"); // Remove the "selected" class from any previously selected row
        $row.addClass("selected"); // Add the "selected" class to the clicked or navigated row

        var data = table.row($row).data(); // Get data from the selected row
        let noPO = $(data[9]).text().trim();

        $row[0].scrollIntoView({ block: "nearest" });

        let XIdType = decodeHtmlEntities(data[2]);

        let originalDate = new Date(data[1]);

        let month = originalDate.getMonth() + 1;
        let day = originalDate.getDate();
        let year = originalDate.getFullYear();

        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;

        let formattedDate = `${month}/${day}/${year}`;

        tanggal.value = formattedDate;

        kodeType.value = decodeHtmlEntities(data[2]);
        namaBarang.value = decodeHtmlEntities(data[3]);
        primer.value = formatNumber(data[4]);
        sekunder.value = formatNumber(data[5]);
        tritier.value = formatNumber(data[6]);
        kodeTransaksi.value = decodeHtmlEntities(data[7]);
        satuanPrimer.value = decodeHtmlEntities(data[10]);
        satuanSekunder.value = decodeHtmlEntities(data[11]);
        satuanTritier.value = decodeHtmlEntities(data[12]);
        kodeBarang.value = decodeHtmlEntities(data[13]);
        pib.value = data[8] ? decodeHtmlEntities(data[8]) : "";

        $.ajax({
            type: "GET",
            url: "TerimaPurchasing/getDetailId",
            data: {
                XIdType: XIdType,
                _token: csrfToken,
            },
            success: function (result) {
                if (result) {
                    kelutId.value = decodeHtmlEntities(
                        result[0].IdKelompokUtama.trim()
                    );
                    kelutNama.value = decodeHtmlEntities(
                        result[0].NamaKelompokUtama.trim()
                    );
                    kelompokId.value = decodeHtmlEntities(
                        result[0].IdKelompok.trim()
                    );
                    kelompokNama.value = decodeHtmlEntities(
                        result[0].NamaKelompok.trim()
                    );
                    subkelId.value = decodeHtmlEntities(
                        result[0].IdSubkelompok_Type.trim()
                    );
                    subkelNama.value = decodeHtmlEntities(
                        result[0].NamaSubKelompok.trim()
                    );

                    $.ajax({
                        type: "GET",
                        url: "TerimaPurchasing/getDetailNama",
                        data: {
                            IdObjek: objekId.value,
                            KodeBarang: kodeBarang.value,
                            _token: csrfToken,
                        },
                        success: function (result) {
                            if (result[0].Ada > 1) {
                                btn_divisi.disabled = true;
                                btn_objek.disabled = true;
                                $("#btn_kelompok").show();
                                $("#btn_kelut").show();
                                $("#btn_subkel").show();
                            } else {
                                btn_divisi.disabled = false;
                                btn_objek.disabled = false;
                                $("#btn_kelompok").hide();
                                $("#btn_kelut").hide();
                                $("#btn_subkel").hide();
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                        },
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });

        $.ajax({
            type: "GET",
            url: "TerimaPurchasing/getKeterangan",
            data: {
                kodeTrans: kodeTransaksi.value,
                // KodeBarang: kodeBarang.value,
                _token: csrfToken,
            },
            success: function (result) {
                // console.log(result);
                if (result.length !== 0) {
                    keterangan.value = result[0].UraianDetailTransaksi
                        ? decodeHtmlEntities(result[0].UraianDetailTransaksi)
                        : "";
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }

    function formatDateToMMDDYYYY(date) {
        let dateObj = new Date(date);
        if (isNaN(dateObj)) {
            return "";
        }

        let month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
        let day = dateObj.getDate().toString().padStart(2, "0");
        let year = dateObj.getFullYear();

        return `${month}/${day}/${year}`;
    }

    function decodeHtmlEntities(text) {
        var txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    }

    function escapeHtml(text) {
        var map = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;",
        };
        return text.replace(/[&<>"']/g, function (m) {
            return map[m];
        });
    }

    function updateDataTable(data) {
        return new Promise(function (resolve, reject) {
            var table = $("#tableData").DataTable();
            table.clear();

            data.forEach(function (item) {
                 let noPO = "";
                    if (item.No_PO && item.No_PO.trim() !== "") {
                        noPO = `
                            <a href="${downloadPoUrl.replace('__NO_PO__', encodeURIComponent(item.No_PO))}"
                            target="_blank"
                            class="po-link">
                                ${escapeHtml(item.No_PO)}
                            </a>
                        `;
                    }
                table.row.add([
                    '<input type="checkbox" class="row-select">',
                    formatDateToMMDDYYYY(item.SaatAwalTransaksi),
                    escapeHtml(item.IdType),
                    escapeHtml(item.NamaType),
                    formatNumber(item.JumlahPemasukanPrimer),
                    formatNumber(item.JumlahPemasukanSekunder),
                    formatNumber(item.JumlahPemasukanTritier),
                    escapeHtml(item.IdTransaksi),
                    escapeHtml(item.PIB),
                    noPO,
                    escapeHtml(item.SatPrimer),
                    escapeHtml(item.SatSekunder),
                    escapeHtml(item.SatTritier),
                    escapeHtml(item.KodeBarang),
                ]);
            });

            table.draw();

            // Resolve promise after table is drawn
            resolve();
        });
    }

    function formatNumber(value) {
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
            return parseFloat(value).toFixed(2);
        }
        return value;
    }

    // Function to handle keydown events for table navigation
    function handleTableKeydown(e, tableId) {
        const table = $(`#${tableId}`).DataTable();
        const rows = $(`#${tableId} tbody tr`);
        const rowCount = rows.length;

        if (e.key === "Enter") {
            e.preventDefault();
            const selectedRow = table.row(".selected").data();
            if (selectedRow) {
                Swal.getConfirmButton().click();
            } else {
                const firstRow = $(`#${tableId} tbody tr:first-child`);
                if (firstRow.length) {
                    firstRow.click();
                    Swal.getConfirmButton().click();
                }
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (currentIndex === null || currentIndex >= rowCount - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            rows.removeClass("selected");
            const selectedRow = $(rows[currentIndex]).addClass("selected");
            scrollRowIntoView(selectedRow[0]);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (currentIndex === null || currentIndex <= 0) {
                currentIndex = rowCount - 1;
            } else {
                currentIndex--;
            }
            rows.removeClass("selected");
            const selectedRow = $(rows[currentIndex]).addClass("selected");
            scrollRowIntoView(selectedRow[0]);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            const pageInfo = table.page.info();
            if (pageInfo.page < pageInfo.pages - 1) {
                table
                    .page("next")
                    .draw("page")
                    .on("draw", function () {
                        currentIndex = 0;
                        const newRows = $(`#${tableId} tbody tr`);
                        const selectedRow = $(newRows[currentIndex]).addClass(
                            "selected"
                        );
                        scrollRowIntoView(selectedRow[0]);
                    });
            }
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            const pageInfo = table.page.info();
            if (pageInfo.page > 0) {
                table
                    .page("previous")
                    .draw("page")
                    .on("draw", function () {
                        currentIndex = 0;
                        const newRows = $(`#${tableId} tbody tr`);
                        const selectedRow = $(newRows[currentIndex]).addClass(
                            "selected"
                        );
                        scrollRowIntoView(selectedRow[0]);
                    });
            }
        }
    }

    // Helper function to scroll selected row into view
    function scrollRowIntoView(rowElement) {
        rowElement.scrollIntoView({ block: "nearest" });
    }

    // Button click to show divisi selection modal
    btn_divisi.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Divisi",
                html: `
                    <table id="table_list" class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID Divisi</th>
                                <th scope="col">Nama Divisi</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                `,
                preConfirm: () => {
                    const selectedData = $("#table_list")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                width: "40%",
                returnFocus: false,
                showCloseButton: true,
                showConfirmButton: true,
                confirmButtonText: "Select",
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_list").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                            order: [1, "asc"],
                            ajax: {
                                url: "TerimaPurchasing/getDivisi",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [{ data: "IdDivisi" }, { data: "NamaDivisi" }],
                            columnDefs: [
                                {
                                    targets: 0,
                                    width: "100px",
                                },
                            ],
                        });

                        $("#table_list tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                            scrollRowIntoView(this);
                        });

                        const searchInput = $("#table_list_filter input");
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydown(e, "table_list")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    divisiId.value = decodeHtmlEntities(
                        result.value.IdDivisi.trim()
                    );
                    divisiNama.value = decodeHtmlEntities(
                        result.value.NamaDivisi.trim()
                    );
                    btn_objek.click();
                }
            });
        } catch (error) {
            console.error(error);
        }
    });

    // button list objek
    btn_objek.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Objek",
                html: `
                    <table id="table_list" class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID Objek</th>
                                <th scope="col">Nama Objek</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                `,
                preConfirm: () => {
                    const selectedData = $("#table_list")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                width: "40%",
                returnFocus: false,
                showCloseButton: true,
                showConfirmButton: true,
                confirmButtonText: "Select",
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_list").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                            order: [1, "asc"],
                            ajax: {
                                url: "TerimaPurchasing/getObjek",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    divisi: divisiId.value,
                                },
                            },
                            columns: [{ data: "IdObjek" }, { data: "NamaObjek" }],
                            columnDefs: [
                                {
                                    targets: 0,
                                    width: "100px",
                                },
                            ],
                        });

                        $("#table_list tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                            scrollRowIntoView(this);
                        });
                        const searchInput = $("#table_list_filter input");
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydown(e, "table_list")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    objekId.value = decodeHtmlEntities(result.value.IdObjek.trim());
                    objekNama.value = decodeHtmlEntities(
                        result.value.NamaObjek.trim()
                    );

                    callAllData();
                }
            });
        } catch (error) {
            console.error(error);
        }
    });

    // button list kelompok utama
    btn_kelut.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Kelompok Utama",
                html: `
                    <table id="table_list" class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nama Kelompok Utama</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                `,
                preConfirm: () => {
                    const selectedData = $("#table_list")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                width: "40%",
                returnFocus: false,
                showCloseButton: true,
                showConfirmButton: true,
                confirmButtonText: "Select",
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_list").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                            order: [0, "asc"],
                            ajax: {
                                url: "TerimaPurchasing/getKelUt",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    XIdObjek_KelompokUtama: objekId.value.trim(),
                                    KodeBarang: kodeBarang.value.trim(),
                                },
                            },
                            columns: [
                                { data: "IdKelompokUtama" },
                                { data: "NamaKelompokUtama" },
                            ],
                            columnDefs: [
                                {
                                    targets: 0,
                                    width: "100px",
                                },
                            ],
                        });
                        const searchInput = $("#table_list_filter input");
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        $("#table_list tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydown(e, "table_list")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    kelutId.value = decodeHtmlEntities(
                        result.value.IdKelompokUtama.trim()
                    );
                    kelutNama.value = decodeHtmlEntities(
                        result.value.NamaKelompokUtama.trim()
                    );

                    kelompokId.value = "";
                    kelompokNama.value = "";
                    subkelId.value = "";
                    subkelNama.value = "";
                    kodeType.value = "";

                    btn_kelompok.disabled = false;
                    btn_kelompok.focus();
                }
            });
        } catch (error) {
            console.error(error);
        }
    });

    // button list kelompok
    btn_kelompok.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Kelompok",
                html: `
                    <table id="table_list" class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nama Kelompok</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                `,
                preConfirm: () => {
                    const selectedData = $("#table_list")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                width: "40%",
                returnFocus: false,
                showCloseButton: true,
                showConfirmButton: true,
                confirmButtonText: "Select",
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_list").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                            order: [1, "asc"],
                            ajax: {
                                url: "TerimaPurchasing/getKelompok",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    XIdKelompokUtama_Kelompok: kelutId.value.trim(),
                                    KodeBarang: kodeBarang.value.trim(),
                                },
                            },
                            columns: [
                                { data: "IdKelompok" },
                                { data: "NamaKelompok" },
                            ],
                            columnDefs: [
                                {
                                    targets: 0,
                                    width: "100px",
                                },
                            ],
                        });

                        $("#table_list tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        const searchInput = $("#table_list_filter input");
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydown(e, "table_list")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    kelompokId.value = decodeHtmlEntities(
                        result.value.IdKelompok.trim()
                    );
                    kelompokNama.value = decodeHtmlEntities(
                        result.value.NamaKelompok.trim()
                    );

                    subkelId.value = "";
                    subkelNama.value = "";
                    kodeType.value = "";

                    btn_subkel.disabled = false;
                    btn_subkel.focus();
                }
            });
        } catch (error) {
            console.error(error);
        }
    });

    // button list sub kelompok
    btn_subkel.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Sub Kelompok",
                html: `
                    <table id="table_list" class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID Sub Kelompok</th>
                                <th scope="col">Nama Sub Kelompok</th>
                                <th scope="col">Id Type</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                `,
                preConfirm: () => {
                    const selectedData = $("#table_list")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                width: "40%",
                returnFocus: false,
                showCloseButton: true,
                showConfirmButton: true,
                confirmButtonText: "Select",
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_list").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                            order: [1, "asc"],
                            ajax: {
                                url: "TerimaPurchasing/getSubkel",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    XIdKelompok_SubKelompok:
                                        kelompokId.value.trim(),
                                    KodeBarang: kodeBarang.value,
                                },
                            },
                            columns: [
                                { data: "IdSubkelompok" },
                                { data: "NamaSubKelompok" },
                                { data: "IdType" },
                            ],
                            columnDefs: [
                                {
                                    targets: 0,
                                    width: "100px",
                                },
                            ],
                        });

                        $("#table_list tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        const searchInput = $("#table_list_filter input");
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydown(e, "table_list")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    subkelId.value = decodeHtmlEntities(
                        result.value.IdSubkelompok.trim()
                    );
                    subkelNama.value = decodeHtmlEntities(
                        result.value.NamaSubKelompok.trim()
                    );
                    kodeType.value = decodeHtmlEntities(result.value.IdType.trim());
                }
            });
        } catch (error) {
            console.error(error);
        }
    });

    btn_batal.addEventListener("click", function (e) {
        clearText();

        btn_proses.disabled = true;
        btn_batal.disabled = true;

        $("#btn_kelompok").hide();
        $("#btn_kelut").hide();
        $("#btn_subkel").hide();

        btn_divisi.disabled = false;
        btn_objek.disabled = false;

        btn_divisi.focus();
    });


    //coba multiple btn proses
    btn_proses.addEventListener("click", async function () {
        prosesCount++;
        btn_proses.disabled = true;

        let table = $("#tableData").DataTable();
        let checked = $("#tableData tbody input.row-select:checked");
        //PILIH PROSES ATAU SIMULASI (SIMULASI = 1 || PROSES = 0)
        let simulate = 0;

        if (checked.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Pilih minimal 1 data untuk diproses",
            });
            btn_proses.disabled = false;
            return;
        }

        let items = [];
        let successLog = [];
        let errorLog = [];

        // ===============================
        // AMBIL DATA DARI TABEL
        // ===============================
        checked.each(function () {
            let row = $(this).closest("tr");
            let d = table.row(row).data();

            items.push({
                IdTransaksi: d[7],
                IdType: d[2],
                MasukPrimer: d[4],
                MasukSekunder: d[5],
                MasukTritier: d[6],
            });
        });

        console.group("🚀 PROSES TERIMA BARANG");
        console.log("Total dipilih:", items.length);
        console.table(items);

        try {
            // ===============================
            // LOOP PROSES (SATU PER SATU)
            // ===============================
            for (let i = 0; i < items.length; i++) {
                let item = items[i];

                try {
                    console.log(`➡️ Proses ${i + 1}/${items.length}`, item);

                    // ===============================
                    // CEK PENYESUAIAN (PER ITEM)
                    // ===============================
                    let cek = await $.ajax({
                        type: "GET",
                        url: "TerimaPurchasing/cekPenyesuaianTransaksi",
                        data: {
                            IdType: item.IdType,
                            _token: csrfToken,
                        },
                    });

                    if (cek && cek[0] && cek[0].jumlah >= 1) {
                        throw {
                            message: "Ada transaksi penyesuaian",
                            IdType: item.IdType,
                        };
                    }

                    // ===============================
                    // PROSES TERIMA (SIMULATE / REAL)
                    // ===============================
                    let res = await $.ajax({
                        type: "PUT",
                        url: "TerimaPurchasing/prosesTerimaTransferBeli",
                        data: {
                            IdTransaksi: item.IdTransaksi,
                            IdType: item.IdType,
                            IdSubKel: subkelId.value,
                            Penerima: penerima.value,
                            MasukPrimer: item.MasukPrimer,
                            MasukSekunder: item.MasukSekunder,
                            MasukTritier: item.MasukTritier,
                            divisiId: divisiId.value,
                            //simulate: 1 || proses: 0
                            simulate: 0,
                            _token: csrfToken,
                        },
                    });

                    if (res && res.success) {
                        if (simulate == 1) {
                            // MODE SIMULASI
                            successLog.push({
                                IdTransaksi: item.IdTransaksi,
                                mode: "SIMULASI",
                                message: "Berhasil disimulasikan",
                            });
                            console.log("🧪 SIMULASI SUCCESS:", item.IdTransaksi);

                        } else {
                            // MODE REAL (DB)
                            successLog.push({
                                IdTransaksi: item.IdTransaksi,
                                mode: "REAL",
                                message: "Berhasil diproses",
                            });
                            console.log("✅ PROSES SUCCESS:", item.IdTransaksi);
                        }

                    } else {
                        // RESPONSE GAGAL
                        throw res;
                    }

                } catch (err) {
                    errorLog.push({
                        IdTransaksi: item.IdTransaksi,
                        error: err?.message || err,
                    });
                    console.error("FAILED:", item.IdTransaksi, err);
                }
            }

            console.groupEnd();

            // ================
            // RINGKASAN HASIL
            // ================
            let summaryHtml = `
                <div style="text-align:center">
                    <b>Total dipilih:</b> ${items.length}<br>
                    <b>Berhasil diproses:</b> ${successLog.length}<br>
                    <b>Gagal diproses:</b> ${errorLog.length}
                </div>
            `;

            if (errorLog.length > 0) {
                summaryHtml += `<hr><b>Detail gagal:</b><br>`;
                errorLog.forEach(e => {
                    summaryHtml += `• ${e.IdTransaksi}<br>`;
                });
            }

            Swal.fire({
                icon: errorLog.length === 0 ? "success" : "warning",
                title:
                    errorLog.length === 0
                        ? "Semua Data Berhasil Diproses"
                        : "Sebagian Data Diproses",
                html: summaryHtml,
                width: 520,
            });

            console.group("📊 RINGKASAN");
            console.table(successLog);
            console.table(errorLog);
            console.groupEnd();

            callAllData();
            clearProses();

        } catch (fatal) {
            console.error("🔥 FATAL ERROR:", fatal);
            Swal.fire({
                icon: "error",
                title: "Fatal Error",
                text: "Proses dihentikan karena kesalahan sistem",
            });
        } finally {
            btn_proses.disabled = false;
        }
    });

    var prosesCount = 0;

    function callAllData() {
        $.ajax({
            type: "GET",
            url: "TerimaPurchasing/callAllData",
            data: {
                IdDivisi: divisiId.value,
                IdObjek: objekId.value,
                _token: csrfToken,
            },
            success: function (result) {
                var table = $("#tableData").DataTable();

                // =========
                // ADA DATA
                // =========
                if (Array.isArray(result) && result.length !== 0) {

                    if (prosesCount !== 0) {
                        // setelah proses → update + select baris pertama
                        updateDataTable(result).then(function () {
                            var $firstRow = $("#tableData tbody tr:first");
                            if ($firstRow.length) {
                                selectRow($firstRow);
                            }
                        });
                    } else {
                        // load awal / filter biasa
                        updateDataTable(result);
                    }

                    btn_proses.disabled = false;
                    btn_batal.disabled = false;

                }
                // ===============
                // TIDAK ADA DATA
                // ===============
                else {
                    table.clear().draw();

                    // HANYA TAMPILKAN ALERT JIKA BUKAN HASIL PROSES
                    if (prosesCount === 0) {
                        Swal.fire({
                            icon: "info",
                            text: "Tidak Ada Data.",
                        });
                    }
                }

                // reset centang all
                $("#centang").prop("checked", false);
            },
            error: function (xhr, status, error) {
                console.error("Error callAllData:", error);
            },
        });
    }


    function clearProses() {
        kelompokNama.value = "";
        kelutNama.value = "";
        subkelNama.value = "";

        kelompokId.value = "";
        kelutId.value = "";
        subkelId.value = "";

        kodeTransaksi.value = "";
        tanggal.value = "";
        pib.value = "";
        kodeBarang.value = "";
        kodeType.value = "";
        namaBarang.value = "";

        primer.value = "";
        satuanPrimer.value = "";
        sekunder.value = "";
        satuanSekunder.value = "";
        tritier.value = "";
        satuanTritier.value = "";
    }

    function clearText() {
        // Divisi section
        divisiNama.value = "";
        objekNama.value = "";
        kelompokNama.value = "";
        kelutNama.value = "";
        subkelNama.value = "";

        // Hidden ID inputs
        divisiId.value = "";
        objekId.value = "";
        kelompokId.value = "";
        kelutId.value = "";
        subkelId.value = "";

        // Kode Transaksi section
        kodeTransaksi.value = "";
        tanggal.value = "";
        pib.value = "";
        kodeBarang.value = "";
        kodeType.value = "";
        namaBarang.value = "";

        // Jumlah Barang section
        primer.value = "";
        satuanPrimer.value = "";
        sekunder.value = "";
        satuanSekunder.value = "";
        tritier.value = "";
        satuanTritier.value = "";

        var table = $("#tableData").DataTable();
        table.clear().draw();
    }

    //  CENTANG ALL / SELECT ALL
    $("#tableData").on("change", ".row-select", function () {
        const total = $("#tableData tbody .row-select").length;
        const checked = $("#tableData tbody .row-select:checked").length;

        $("#centang").prop("checked", total > 0 && total === checked);
    });



    // btn_proses.addEventListener("click", function (e) {
    //     btn_proses.disabled = true;
    //     var table = $("#tableData").DataTable();

    //     if (table.$("tr.selected").length > 0) {
    //         if (kodeType.value === "") {
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Lengkapi Terlebih Dahulu Data Yang Harus diProses !!..",
    //                 returnFocus: false,
    //             });
    //             return;
    //         } else {
    //             $.ajax({
    //                 type: "GET",
    //                 url: "TerimaPurchasing/cekPenyesuaianTransaksi",
    //                 data: {
    //                     IdType: kodeType.value,
    //                     _token: csrfToken,
    //                 },
    //                 success: function (result) {
    //                     if (result[0].jumlah >= 1) {
    //                         Swal.fire({
    //                             icon: "error",
    //                             text: "Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum Diacc untuk type ",
    //                             returnFocus: false,
    //                         });
    //                         return;
    //                     } else {
    //                         $.ajax({
    //                             type: "PUT",
    //                             url: "TerimaPurchasing/prosesTerimaTransferBeli",
    //                            //proses data (masih proses 1 data)
    //                             data: {

    //                                 IdTransaksi: kodeTransaksi.value,
    //                                 IdType: kodeType.value,
    //                                 IdSubKel: subkelId.value,
    //                                 Penerima: penerima.value,
    //                                 MasukPrimer: primer.value,
    //                                 MasukSekunder: sekunder.value,
    //                                 MasukTritier: tritier.value,
    //                                 _token: csrfToken,
    //                             },
    //                             success: function (response) {
    //                                 if (response.success) {
    //                                     Swal.fire({
    //                                         icon: "success",
    //                                         title: "Success",
    //                                         text: response.success,
    //                                         returnFocus: false,
    //                                     }).then(() => {
    //                                         btn_proses.disabled = false;
    //                                         prosesCount += 1;
    //                                         callAllData();
    //                                         clearProses();

    //                                         btn_kelut.disabled = true;
    //                                         btn_subkel.disabled = true;

    //                                         $("#btn_kelompok").hide();
    //                                         $("#btn_kelut").hide();
    //                                         $("#btn_subkel").hide();
    //                                     });
    //                                 }
    //                             },
    //                             error: function (xhr, status, error) {
    //                                 console.error("Error:", error);
    //                             },
    //                         });
    //                     }
    //                 },
    //                 error: function (xhr, status, error) {
    //                     console.error("Error:", error);
    //                 },
    //             });
    //         }
    //     } else {
    //         Swal.fire({
    //             icon: "error",
    //             title: "Tidak ada data yang diPROSES!..,Pilih Dulu!!..",
    //             returnFocus: false,
    //         });
    //         btn_proses.disabled = false;
    //         return;
    //     }

    //     // setTimeout(() => {
    //     //     btn_proses.disabled = false;
    //     // }, 2000);
    // });
