var csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

// Assign radio buttons to variables
var Penerima1 = document.getElementById("Penerima1");
var Penerima2 = document.getElementById("Penerima2");
var Penerima3 = document.getElementById("Penerima3");
var Pemberi1 = document.getElementById("Pemberi1");
var Pemberi2 = document.getElementById("Pemberi2");
var Pemberi3 = document.getElementById("Pemberi3");
var pilihan = document.querySelectorAll('input[name="opsi"]');

// Assign date input and other form elements to variables
var tanggal = document.getElementById("tanggal");
var userId = document.getElementById("userId");
var divisiId = document.getElementById("divisiId");
var divisiNama = document.getElementById("divisiNama");
var btn_divisi = document.getElementById("btn_divisi");

var objekId = document.getElementById("objekId");
var objekNama = document.getElementById("objekNama");
var btn_objek = document.getElementById("btn_objek");

var kelutId = document.getElementById("kelutId");
var kelutNama = document.getElementById("kelutNama");
var btn_kelut = document.getElementById("btn_kelut");

var kelompokId = document.getElementById("kelompokId");
var kelompokNama = document.getElementById("kelompokNama");
var btn_kelompok = document.getElementById("btn_kelompok");

var subkelId = document.getElementById("subkelId");
var subkelNama = document.getElementById("subkelNama");
var btn_subkel = document.getElementById("btn_subkel");

// Assign button to a variable
var btn_ok = document.getElementById("btn_ok");

// Assign table elements to variables
var tableData = document.getElementById("tableData");

var today = new Date().toISOString().slice(0, 10);
tanggal.value = today;

$(document).ready(function () {
    $("#tableData").DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: "Kd. Transaksi" },
            { title: "Nama Type" },
            { title: "Penerima" },
            { title: "Mng. Penerima" },
            { title: "Mng. Pemberi" },
            { title: "Pemberi" },
            { title: "Primer" },
            { title: "Sekunder" },
            { title: "Tritier" },
        ],
        scrollY: "400px",
        autoWidth: false,
        scrollX: "150%",
        columnDefs: [
            { targets: [0], width: "15%", className: "fixed-width" },
            { targets: [1], width: "30%", className: "fixed-width" },
            { targets: [2], width: "10%", className: "fixed-width" },
            { targets: [3], width: "15%", className: "fixed-width" },
            { targets: [4], width: "15%", className: "fixed-width" },
            { targets: [5], width: "10%", className: "fixed-width" },
            { targets: [6], width: "10%", className: "fixed-width" },
            { targets: [7], width: "10%", className: "fixed-width" },
            { targets: [8], width: "10%", className: "fixed-width" },
        ],
    });
});

// fungsi swal select pake arrow
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

function getUserId() {
    $.ajax({
        type: "GET",
        url: "/Kencana/LacakTransaksiKencana/getUserId",
        data: {
            _token: csrfToken,
        },
        success: function (result) {
            userId.value = result.user;
        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
        },
    });
}

$(document).ready(function () {
    getUserId();
});

// button list divisi
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
                            url: "/Kencana/LacakTransaksiKencana/getDivisi",
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
                btn_objek.focus();
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
                        order: [0, "asc"],
                        ajax: {
                            url: "/Kencana/LacakTransaksiKencana/getObjek",
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
                btn_kelut.focus();
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
                        order: [0, "asc"],
                        ajax: {
                            url: "/Kencana/LacakTransaksiKencana/getKelUt",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                objekId: objekId.value,
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
                kelutId.value = decodeHtmlEntities(
                    result.value.IdKelompokUtama.trim()
                );
                kelutNama.value = decodeHtmlEntities(
                    result.value.NamaKelompokUtama.trim()
                );
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
                            url: "/Kencana/LacakTransaksiKencana/getKelompok",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kelutId: kelutId.value,
                            },
                        },
                        columns: [
                            { data: "idkelompok" },
                            { data: "namakelompok" },
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
                kelompokId.value = decodeHtmlEntities(
                    result.value.idkelompok.trim()
                );
                kelompokNama.value = decodeHtmlEntities(
                    result.value.namakelompok.trim()
                );
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
                    localStorage.setItem(
                        stateStorageName,
                        JSON.stringify(data)
                    );
                },
                stateLoadCallback: function (settings) {
                    let stateStorageName =
                            window.location.pathname + "/colResizeStateData",
                        data = localStorage.getItem(stateStorageName);
                    return data != null ? JSON.parse(data) : null;
                },
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
                            url: "/Kencana/LacakTransaksiKencana/getSubkel",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                kelompokId: kelompokId.value,
                            },
                        },
                        columns: [
                            { data: "IdSubkelompok" },
                            { data: "NamaSubKelompok" },
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
                subkelId.value = decodeHtmlEntities(
                    result.value.IdSubkelompok.trim()
                );
                subkelNama.value = decodeHtmlEntities(
                    result.value.NamaSubKelompok.trim()
                );
                btn_ok.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function decodeHtmlEntities(text) {
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
}

function escapeHtml(text) {
    if (text == null) {
        // Check if text is null or undefined
        return ""; // Return empty string or you could return null if preferred
    }

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

function updateDataTable(data, clear) {
    var table = $("#tableData").DataTable();
    if (clear == null) {
        table.clear().draw();
    }

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.idtransaksi),
            escapeHtml(item.NamaType),
            item.nmpenerima ?? "Blm Diterima",
            item.ACCPenerima ?? "Blm ACC",
            escapeHtml(item.ACCPemberi),
            escapeHtml(item.nmpemberi),
            formatNumber(item.jumlahpengeluaranprimer),
            formatNumber(item.jumlahpengeluaransekunder),
            formatNumber(item.jumlahpengeluarantritier),
        ]);
    });

    table.draw();
}

function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
}

pilihan.forEach((radio) => {
    radio.addEventListener("click", function () {
        var table = $("#tableData").DataTable();
        table.clear().draw();

        divisiId.value = "";
        divisiNama.value = "";
        objekId.value = "";
        objekNama.value = "";
        kelompokId.value = "";
        kelompokNama.value = "";
        kelutId.value = "";
        kelutNama.value = "";
        subkelId.value = "";
        subkelNama.value = "";

        tanggal.focus();
    });
});

// button ok
btn_ok.addEventListener("click", function (e) {
    var table = $("#tableData").DataTable();
    table.clear().draw();

    if (
        divisiId.value == "" &&
        objekId.value == "" &&
        kelutId.value == "" &&
        kelompokId.value == "" &&
        subkelId.value == ""
    ) {
        Swal.fire({
            icon: "error",
            title: "Isi Data!",
            text: "Pilih Dulu Divisi,Objek,Kelompok Utama,Kelompok,Sub Kelompok !!..",
        });
        return;
    }

    if (
        !Penerima1.checked &&
        !Penerima2.checked &&
        !Pemberi1.checked &&
        !Penerima3.checked &&
        !Pemberi2.checked &&
        !Pemberi3.checked
    ) {
        Swal.fire({
            icon: "error",
            title: "Isi Data!",
            text: "Pilih Dulu Mutasi Satu Divisi atau Mutasi Dua Divisi Awal Penerima/Awal Pemberi  !!..",
        });
        return;
    }

    const pilihanChecked = document.querySelector('input[name="opsi"]:checked');
    let TypeTrans;

    if (
        pilihanChecked.value == "Penerima3" ||
        pilihanChecked.value == "Pemberi3"
    ) {
        TypeTrans = "01";
    }

    if (
        pilihanChecked.value == "Penerima2" ||
        pilihanChecked.value == "Penerima1"
    ) {
        TypeTrans = "02";
    }

    if (
        pilihanChecked.value == "Pemberi1" ||
        pilihanChecked.value == "Pemberi2"
    ) {
        TypeTrans = "03";
    }

    if (
        objekId.value == "" &&
        kelutId.value == "" &&
        kelompokId.value == "" &&
        subkelId.value == ""
    ) {
        if (Penerima1.checked || Pemberi2.checked || Penerima3.checked) {
            $.ajax({
                type: "GET",
                url: "/Kencana/LacakTransaksiKencana/lacakDivisi",
                data: {
                    _token: csrfToken,
                    Status: 1,
                    IdTypeTransaksi: TypeTrans,
                    Tanggal: tanggal.value,
                    IdDivisi: divisiId.value,
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            }).then(() => {
                $.ajax({
                    type: "GET",
                    url: "/Kencana/LacakTransaksiKencana/lacakDivisiTmp",
                    data: {
                        _token: csrfToken,
                        Status: 1,
                        IdTypeTransaksi: TypeTrans,
                        Tanggal: tanggal.value,
                        IdDivisi: divisiId.value,
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            updateDataTable(result, "noclear");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
                if ($("#tableData").DataTable().data().count() > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Data di tabel sudah diupdate.",
                    });
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Tidak ada Data!",
                    });
                }
            });
        }

        if (Penerima2.checked || Pemberi1.checked || Pemberi3.checked) {
            $.ajax({
                type: "GET",
                url: "/Kencana/LacakTransaksiKencana/lacakDivisi",
                data: {
                    _token: csrfToken,
                    Status: 2,
                    IdTypeTransaksi: TypeTrans,
                    Tanggal: tanggal.value,
                    IdDivisi: divisiId.value,
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            }).then(() => {
                $.ajax({
                    type: "GET",
                    url: "/Kencana/LacakTransaksiKencana/lacakDivisiTmp",
                    data: {
                        _token: csrfToken,
                        Status: 2,
                        IdTypeTransaksi: TypeTrans,
                        Tanggal: tanggal.value,
                        IdDivisi: divisiId.value,
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            updateDataTable(result, "noclear");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
                if ($("#tableData").DataTable().data().count() > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Data di tabel sudah diupdate.",
                    });
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Tidak ada Data!",
                    });
                }
            });
        }
    } else if (
        objekId.value &&
        kelutId.value == "" &&
        kelompokId.value == "" &&
        subkelId.value == ""
    ) {
        if (Penerima1.checked || Pemberi2.checked || Penerima3.checked) {
            $.ajax({
                type: "GET",
                url: "/Kencana/LacakTransaksiKencana/lacakObjek",
                data: {
                    _token: csrfToken,
                    Status: 1,
                    IdTypeTransaksi: TypeTrans,
                    Tanggal: tanggal.value,
                    IdDivisi: divisiId.value,
                    Idobjek: objekId.value,
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            }).then(() => {
                $.ajax({
                    type: "GET",
                    url: "/Kencana/LacakTransaksiKencana/lacakObjekTmp",
                    data: {
                        _token: csrfToken,
                        Status: 1,
                        IdTypeTransaksi: TypeTrans,
                        Tanggal: tanggal.value,
                        IdDivisi: divisiId.value,
                        Idobjek: objekId.value,
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            updateDataTable(result, "noclear");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });

                if ($("#tableData").DataTable().data().count() > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Data di tabel sudah diupdate.",
                    });
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Tidak ada Data!",
                    });
                }
            });
        }

        if (Penerima2.checked || Pemberi1.checked || Pemberi3.checked) {
            $.ajax({
                type: "GET",
                url: "/Kencana/LacakTransaksiKencana/lacakObjek",
                data: {
                    _token: csrfToken,
                    Status: 2,
                    IdTypeTransaksi: TypeTrans,
                    Tanggal: tanggal.value,
                    IdDivisi: divisiId.value,
                    Idobjek: objekId.value,
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            }).then(() => {
                $.ajax({
                    type: "GET",
                    url: "/Kencana/LacakTransaksiKencana/lacakObjekTmp",
                    data: {
                        _token: csrfToken,
                        Status: 2,
                        IdTypeTransaksi: TypeTrans,
                        Tanggal: tanggal.value,
                        IdDivisi: divisiId.value,
                        Idobjek: objekId.value,
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            updateDataTable(result, "noclear");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });

                if ($("#tableData").DataTable().data().count() > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Data di tabel sudah diupdate.",
                    });
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Tidak ada Data!",
                    });
                }
            });
        }
    } else if (
        objekId.value &&
        kelutId.value &&
        kelompokId.value == "" &&
        subkelId.value == ""
    ) {
        if (Penerima1.checked || Pemberi2.checked || Penerima3.checked) {
            $.ajax({
                type: "GET",
                url: "/Kencana/LacakTransaksiKencana/lacakKelUt",
                data: {
                    _token: csrfToken,
                    Status: 1,
                    IdTypeTransaksi: TypeTrans,
                    Tanggal: tanggal.value,
                    IdDivisi: divisiId.value,
                    Idobjek: objekId.value,
                    Idkelutama: kelutId.value,
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            }).then(() => {
                $.ajax({
                    type: "GET",
                    url: "/Kencana/LacakTransaksiKencana/lacakKelUtTmp",
                    data: {
                        _token: csrfToken,
                        Status: 1,
                        IdTypeTransaksi: TypeTrans,
                        Tanggal: tanggal.value,
                        IdDivisi: divisiId.value,
                        Idobjek: objekId.value,
                        Idkelutama: kelutId.value,
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            updateDataTable(result, "noclear");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });

                if ($("#tableData").DataTable().data().count() > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Data di tabel sudah diupdate.",
                    });
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Tidak ada Data!",
                    });
                }
            });
        }

        if (Penerima2.checked || Pemberi1.checked || Pemberi3.checked) {
            $.ajax({
                type: "GET",
                url: "/Kencana/LacakTransaksiKencana/lacakKelUt",
                data: {
                    _token: csrfToken,
                    Status: 2,
                    IdTypeTransaksi: TypeTrans,
                    Tanggal: tanggal.value,
                    IdDivisi: divisiId.value,
                    Idobjek: objekId.value,
                    Idkelutama: kelutId.value,
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            }).then(() => {
                $.ajax({
                    type: "GET",
                    url: "/Kencana/LacakTransaksiKencana/lacakKelUtTmp",
                    data: {
                        _token: csrfToken,
                        Status: 2,
                        IdTypeTransaksi: TypeTrans,
                        Tanggal: tanggal.value,
                        IdDivisi: divisiId.value,
                        Idobjek: objekId.value,
                        Idkelutama: kelutId.value,
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            updateDataTable(result, "noclear");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });

                if ($("#tableData").DataTable().data().count() > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Data di tabel sudah diupdate.",
                    });
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Tidak ada Data!",
                    });
                }
            });
        }
    } else if (
        objekId.value &&
        kelutId.value &&
        kelompokId.value &&
        subkelId.value == ""
    ) {
        if (Penerima1.checked || Pemberi2.checked || Penerima3.checked) {
            $.ajax({
                type: "GET",
                url: "/Kencana/LacakTransaksiKencana/lacakKelompok",
                data: {
                    _token: csrfToken,
                    Status: 1,
                    IdTypeTransaksi: TypeTrans,
                    Tanggal: tanggal.value,
                    IdDivisi: divisiId.value,
                    Idobjek: objekId.value,
                    Idkelutama: kelutId.value,
                    Idkelompok: kelompokId.value,
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            }).then(() => {
                $.ajax({
                    type: "GET",
                    url: "/Kencana/LacakTransaksiKencana/lacakKelompokTmp",
                    data: {
                        _token: csrfToken,
                        Status: 1,
                        IdTypeTransaksi: TypeTrans,
                        Tanggal: tanggal.value,
                        IdDivisi: divisiId.value,
                        Idobjek: objekId.value,
                        Idkelutama: kelutId.value,
                        Idkelompok: kelompokId.value,
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            updateDataTable(result, "noclear");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
                if ($("#tableData").DataTable().data().count() > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Data di tabel sudah diupdate.",
                    });
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Tidak ada Data!",
                    });
                }
            });
        }

        if (Penerima2.checked || Pemberi1.checked || Pemberi3.checked) {
            $.ajax({
                type: "GET",
                url: "/Kencana/LacakTransaksiKencana/lacakKelompok",
                data: {
                    _token: csrfToken,
                    Status: 2,
                    IdTypeTransaksi: TypeTrans,
                    Tanggal: tanggal.value,
                    IdDivisi: divisiId.value,
                    Idobjek: objekId.value,
                    Idkelutama: kelutId.value,
                    Idkelompok: kelompokId.value,
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            }).then(() => {
                $.ajax({
                    type: "GET",
                    url: "/Kencana/LacakTransaksiKencana/lacakKelompokTmp",
                    data: {
                        _token: csrfToken,
                        Status: 2,
                        IdTypeTransaksi: TypeTrans,
                        Tanggal: tanggal.value,
                        IdDivisi: divisiId.value,
                        Idobjek: objekId.value,
                        Idkelutama: kelutId.value,
                        Idkelompok: kelompokId.value,
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            updateDataTable(result, "noclear");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });

                if ($("#tableData").DataTable().data().count() > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Data di tabel sudah diupdate.",
                    });
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Tidak ada Data!",
                    });
                }
            });
        }
    } else if (
        objekId.value &&
        kelutId.value &&
        kelompokId.value &&
        subkelId.value
    ) {
        if (Penerima1.checked || Pemberi2.checked || Penerima3.checked) {
            $.ajax({
                type: "GET",
                url: "/Kencana/LacakTransaksiKencana/lacakSubKelompok",
                data: {
                    _token: csrfToken,
                    Status: 1,
                    IdTypeTransaksi: TypeTrans,
                    Tanggal: tanggal.value,
                    IdDivisi: divisiId.value,
                    Idobjek: objekId.value,
                    Idkelutama: kelutId.value,
                    Idkelompok: kelompokId.value,
                    Idsubkel: subkelId.value,
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            }).then(() => {
                $.ajax({
                    type: "GET",
                    url: "/Kencana/LacakTransaksiKencana/lacakSubKelompokTmp",
                    data: {
                        _token: csrfToken,
                        Status: 1,
                        IdTypeTransaksi: TypeTrans,
                        Tanggal: tanggal.value,
                        IdDivisi: divisiId.value,
                        Idobjek: objekId.value,
                        Idkelutama: kelutId.value,
                        Idkelompok: kelompokId.value,
                        Idsubkel: subkelId.value,
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            updateDataTable(result, "noclear");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
                if ($("#tableData").DataTable().data().count() > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Data di tabel sudah diupdate.",
                    });
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Tidak ada Data!",
                    });
                }
            });
        }

        if (Penerima2.checked || Pemberi1.checked || Pemberi3.checked) {
            $.ajax({
                type: "GET",
                url: "/Kencana/LacakTransaksiKencana/lacakSubKelompok",
                data: {
                    _token: csrfToken,
                    Status: 2,
                    IdTypeTransaksi: TypeTrans,
                    Tanggal: tanggal.value,
                    IdDivisi: divisiId.value,
                    Idobjek: objekId.value,
                    Idkelutama: kelutId.value,
                    Idkelompok: kelompokId.value,
                    Idsubkel: subkelId.value,
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            }).then(() => {
                $.ajax({
                    type: "GET",
                    url: "/Kencana/LacakTransaksiKencana/lacakSubKelompokTmp",
                    data: {
                        _token: csrfToken,
                        Status: 2,
                        IdTypeTransaksi: TypeTrans,
                        Tanggal: tanggal.value,
                        IdDivisi: divisiId.value,
                        Idobjek: objekId.value,
                        Idkelutama: kelutId.value,
                        Idkelompok: kelompokId.value,
                        Idsubkel: subkelId.value,
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            updateDataTable(result, "noclear");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
                if ($("#tableData").DataTable().data().count() > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Data di tabel sudah diupdate.",
                    });
                } else {
                    Swal.fire({
                        icon: "info",
                        title: "Tidak ada Data!",
                    });
                }
            });
        }
    }
});
