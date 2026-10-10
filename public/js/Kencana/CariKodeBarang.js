var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var divisiNama = document.getElementById('divisiNama');
var divisiId = document.getElementById('divisiId');
var objekNama = document.getElementById('objekNama');
var objekId = document.getElementById('objekId');
var namaBarang = document.getElementById('namaBarang');
var kodeId = document.getElementById('kodeId');
var kodeNama = document.getElementById('kodeNama');
var kodeType = document.getElementById('kodeType');
var kelompokNama = document.getElementById('kelompokNama');
var kelutNama = document.getElementById('kelutNama');
var subkelNama = document.getElementById('subkelNama');
var btn_ok = document.getElementById('btn_ok');


$(document).ready(function () {
    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'Kode Barang' },
            { title: 'Nama Barang' },
            { title: 'Kode Type' },
        ],
        colResize: {
            isEnabled: true,
            hoverClass: 'dt-colresizable-hover',
            hasBoundCheck: true,
            minBoundClass: 'dt-colresizable-bound-min',
            maxBoundClass: 'dt-colresizable-bound-max',
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
                let stateStorageName = window.location.pathname + "/colResizeStateData";
                localStorage.setItem(stateStorageName, JSON.stringify(data));
            },
            stateLoadCallback: function (settings) {
                let stateStorageName = window.location.pathname + "/colResizeStateData",
                    data = localStorage.getItem(stateStorageName);
                return data != null ? JSON.parse(data) : null;
            }
        },
        scrollY: '400px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0], width: '20%', className: 'fixed-width'},
        { targets: [1], width: '50%', className: 'fixed-width' },
        { targets: [2], width: '30%', className: 'fixed-width'},]
    });

    // divisiNama.value = "Warehouse";
    // divisiId.value = "INV";

    divisiNama.value = "Stok Assesoris";
    divisiId.value = "WKC";
});

function updateDataTable(data) {
    var table = $('#tableData').DataTable();
    table.clear();

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.KodeBarang),
            escapeHtml(item.NamaType),
            escapeHtml(item.IdType),
        ]);
    });

    table.draw();
}

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}



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
        if (currentIndex === null) {
            currentIndex = 0;
        } else {
            currentIndex = (currentIndex + 1) % rowCount;
        }
        rows.removeClass("selected");
        $(rows[currentIndex]).addClass("selected");
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex === null) {
            currentIndex = rowCount - 1;
        } else {
            currentIndex = (currentIndex - 1 + rowCount) % rowCount;
        }
        rows.removeClass("selected");
        $(rows[currentIndex]).addClass("selected");
    } else if (e.key === "ArrowRight") {
        e.preventDefault();
        currentIndex = null;
        const pageInfo = table.page.info();
        if (pageInfo.page < pageInfo.pages - 1) {
            table.page('next').draw('page');
        }
    } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        currentIndex = null;
        const pageInfo = table.page.info();
        if (pageInfo.page > 0) {
            table.page('previous').draw('page');
        }
    }
}

// button list objek
btn_objek.addEventListener("click", function (e) {

    objekId.value = '';
    objekNama.value = '';
    kelompokNama.value = '';
    kelutNama.value = '';
    subkelNama.value = '';
    kodeId.value = '';
    kodeNama.value = '';
    namaBarang.value = '';
    kodeType.value = '';

    try {
        Swal.fire({
            title: 'Objek',
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
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [0, "asc"],
                        ajax: {
                            url: "/Kencana/CariKodeBarangKencana/getObjek",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                            }
                        },
                        columns: [
                            { data: "IdObjek" },
                            { data: "NamaObjek" },
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                        scrollRowIntoView(this);
                    });

                    const searchInput = $('#table_list_filter input');
                    if (searchInput.length > 0) {
                        searchInput.focus();
                    }

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                objekId.value = decodeHtmlEntities(result.value.IdObjek.trim());
                objekNama.value = decodeHtmlEntities(result.value.NamaObjek.trim());
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

function scrollRowIntoView(row) {
    if (!row) return;

    row.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
}

// button ok
btn_ok.addEventListener("click", function (e) {

    kelompokNama.value = '';
    kelutNama.value = '';
    subkelNama.value = '';
    kodeId.value = '';
    kodeNama.value = '';
    kodeType.value = '';

    $.ajax({
        type: 'GET',
        url: '/Kencana/CariKodeBarangKencana/getDetailData',
        data: {
            _token: csrfToken,
            IdObjek: objekId.value,
            NamaBrg: namaBarang.value,
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result);

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data di tabel sudah diupdate.',
                });
            }

            else {
                Swal.fire({
                    icon: 'info',
                    title: 'Tidak ada data!',
                });
            }

        },
        error: function (xhr, status, error) {
        },
    });

});


$(document).ready(function () {
    var table = $('#tableData').DataTable();

    $('#tableData tbody').on('click', 'tr', function () {
        selectRow($(this));
    });

    $(document).keydown(function (e) {
        var $selected = $('#tableData tbody tr.selected');
        if ($selected.length) {
            var $next;

            switch (e.which) {
                case 38: // Up arrow key
                    $next = $selected.prev('tr');
                    break;
                case 40: // Down arrow key
                    $next = $selected.next('tr');
                    break;
                default:
                    return; // exit if it's not up or down arrow key
            }

            if ($next.length) {
                selectRow($next);
                e.preventDefault(); // prevent default action (scroll / move cursor)
            }
        }
    });

    function selectRow($row) {
        var table = $('#tableData').DataTable();
        table.$('tr.selected').removeClass('selected');
        $row.addClass('selected');

        var data = table.row($row).data();
        kodeId.value = decodeHtmlEntities(data[0]);
        kodeNama.value = decodeHtmlEntities(data[1]);
        kodeType.value = decodeHtmlEntities(data[2]);

        let IdType = data[2];

        $.ajax({
            type: 'GET',
            url: '/Kencana/CariKodeBarangKencana/getDataAdditional',
            data: {
                IdType: IdType,
                _token: csrfToken
            },
            success: function (result) {
                if (result) {
                    kelompokNama.value = decodeHtmlEntities(result[0]?.NamaKelompok) ?? '';
                    kelutNama.value = decodeHtmlEntities(result[0]?.NamaKelompokUtama) ?? '';
                    subkelNama.value = decodeHtmlEntities(result[0]?.NamaSubKelompok) ?? '';
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }

    function decodeHtmlEntities(text) {
        var txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    }
});
