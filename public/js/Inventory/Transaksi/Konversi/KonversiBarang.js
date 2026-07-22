document.addEventListener("DOMContentLoaded", function () {
    var csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    // Assign elements to variables by their IDs
    var divisiId = document.getElementById("divisiId");
    var divisiNama = document.getElementById("divisiNama");
    var btnDivisi = document.getElementById("btn_divisi");
    var tanggal = document.getElementById("tanggal");

    var kodeKonversi = document.getElementById("kodeKonversi");

    var kodeAsal = document.getElementById("kodeAsal");
    var btnIsiAsal = document.getElementById("btn_isiAsal");
    var btnKoreksiAsal = document.getElementById("btn_koreksiAsal");
    var btnHapusAsal = document.getElementById("btn_hapusAsal");

    var kodeTujuan = document.getElementById("kodeTujuan");
    var btnIsiTujuan = document.getElementById("btn_isiTujuan");
    var btnKoreksiTujuan = document.getElementById("btn_koreksiTujuan");
    var btnHapusTujuan = document.getElementById("btn_hapusTujuan");

    var btnNamaType = document.getElementById("btn_namatype");
    var btnIdType = document.getElementById("btn_idtype");
    var btnIdType2 = document.getElementById("btn_idtype2");

    var btnBatal = document.getElementById("btn_batal");

    var btn_objek = document.getElementById("btn_objek");
    var btn_kelut = document.getElementById("btn_kelut");
    var btn_kelompok = document.getElementById("btn_kelompok");
    var btn_subkel = document.getElementById("btn_subkel");
    var btn_prosesAsal = document.getElementById("btn_prosesAsal");
    var btn_prosesTujuan = document.getElementById("btn_prosesTujuan");

    var asalP = document.getElementById("asalP");
    var asalS = document.getElementById("asalS");
    var asalT = document.getElementById("asalT");
    var tujuanP = document.getElementById("tujuanP");
    var tujuanS = document.getElementById("tujuanS");
    var tujuanT = document.getElementById("tujuanT");

    // asal
    var tanggalAsal = document.getElementById("tanggalAsal");
    var divisiIdAsal = document.getElementById("divisiIdAsal");
    var divisiNamaAsal = document.getElementById("divisiNamaAsal");
    var objekIdAsal = document.getElementById("objekIdAsal");
    var objekNamaAsal = document.getElementById("objekNamaAsal");
    var kelutIdAsal = document.getElementById("kelutIdAsal");
    var kelutNamaAsal = document.getElementById("kelutNamaAsal");
    var kelompokIdAsal = document.getElementById("kelompokIdAsal");
    var kelompokNamaAsal = document.getElementById("kelompokNamaAsal");
    var subkelIdAsal = document.getElementById("subkelIdAsal");
    var subkelNamaAsal = document.getElementById("subkelNamaAsal");
    var kodeBarangAsal = document.getElementById("kodeBarangAsal");
    var kodeTypeAsal = document.getElementById("kodeTypeAsal");
    var namaTypeAsal = document.getElementById("namaTypeAsal");
    var uraianAsal = document.getElementById("uraianAsal");
    var primerAkhirAsal = document.getElementById("primerAkhirAsal");
    var sekunderAkhirAsal = document.getElementById("sekunderAkhirAsal");
    var triterAkhirAsal = document.getElementById("triterAkhirAsal");
    var primerKonversiAsal = document.getElementById("primerKonversiAsal");
    var sekunderKonversiAsal = document.getElementById("sekunderKonversiAsal");
    var triterKonversiAsal = document.getElementById("triterKonversiAsal");
    var hargaSatuanDiv = document.getElementById("hargaSatuanDiv");
    var hargaSatuan = document.getElementById("hargaSatuan");

    // Tujuan
    var tanggalTujuan = document.getElementById("tanggalTujuan");
    var divisiIdTujuan = document.getElementById("divisiIdTujuan");
    var divisiNamaTujuan = document.getElementById("divisiNamaTujuan");
    var objekIdTujuan = document.getElementById("objekIdTujuan");
    var objekNamaTujuan = document.getElementById("objekNamaTujuan");
    var kelutIdTujuan = document.getElementById("kelutIdTujuan");
    var kelutNamaTujuan = document.getElementById("kelutNamaTujuan");
    var kelompokIdTujuan = document.getElementById("kelompokIdTujuan");
    var kelompokNamaTujuan = document.getElementById("kelompokNamaTujuan");
    var subkelIdTujuan = document.getElementById("subkelIdTujuan");
    var subkelNamaTujuan = document.getElementById("subkelNamaTujuan");
    var kodeBarangTujuan = document.getElementById("kodeBarangTujuan");
    var kodeTypeTujuan = document.getElementById("kodeTypeTujuan");
    var namaTypeTujuan = document.getElementById("namaTypeTujuan");
    var uraianTujuan = document.getElementById("uraianTujuan");
    var primerAkhirTujuan = document.getElementById("primerAkhirTujuan");
    var sekunderAkhirTujuan = document.getElementById("sekunderAkhirTujuan");
    var triterAkhirTujuan = document.getElementById("triterAkhirTujuan");
    var primerKonversiTujuan = document.getElementById("primerKonversiTujuan");
    var sekunderKonversiTujuan = document.getElementById(
        "sekunderKonversiTujuan",
    );
    var triterKonversiTujuan = document.getElementById("triterKonversiTujuan");

    var Tgl;
    var StKonversi;
    var IsiAsal;
    var KodeKonversiAsal;
    var KodeKonversiTujuan;
    var IdTranTujuan;
    var IdTranAsal;
    var keluar = 0;
    var Hitung_Hsl_Mtr;
    var result3, result4, result5, result6, result7;
    var jml, i;
    let stSelect = 0;
    btnDivisi.focus();

    var today = new Date().toISOString().slice(0, 10);
    tanggal.value = today;

    $(document).ready(function () {
        $("#tableData").DataTable({
            paging: false,
            searching: false,
            info: false,
            ordering: false,
            columns: [{ title: "Kode Konversi" }, { title: "Tgl. Transaksi" }],
            scrollY: "300px",
            autoWidth: false,
            scrollX: "100%",
            columnDefs: [
                { targets: [0], width: "50%", className: "fixed-width" },
                { targets: [1], width: "50%", className: "fixed-width" },
            ],
        });

        $("#tableAsal").DataTable({
            paging: false,
            searching: false,
            info: false,
            ordering: false,
            columns: [
                { title: "Kd. Konversi" },
                { title: "Kd. Transaksi" },
                { title: "Nm. Barang" },
                { title: "Objek" },
                { title: "Kel. Utama" },
                { title: "Kelompok" },
                { title: "Sub Kelompok" },
                { title: "Pemohon" },
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
                    localStorage.setItem(
                        stateStorageName,
                        JSON.stringify(data),
                    );
                },
                stateLoadCallback: function (settings) {
                    let stateStorageName =
                            window.location.pathname + "/colResizeStateData",
                        data = localStorage.getItem(stateStorageName);
                    return data != null ? JSON.parse(data) : null;
                },
            },
            scrollY: "100px",
            autoWidth: false,
            scrollX: "100%",
            columnDefs: [
                { targets: [0], width: "12%", className: "fixed-width" },
                { targets: [1], width: "12%", className: "fixed-width" },
                { targets: [2], width: "20%", className: "fixed-width" },
                { targets: [3], width: "8%", className: "fixed-width" },
                { targets: [4], width: "8%", className: "fixed-width" },
                { targets: [5], width: "8%", className: "fixed-width" },
                { targets: [6], width: "8%", className: "fixed-width" },
                { targets: [7], width: "8%", className: "fixed-width" },
            ],
        });

        $("#tableTujuan").DataTable({
            paging: false,
            searching: false,
            info: false,
            ordering: false,
            columns: [
                { title: "Kd. Konversi" },
                { title: "Kd. Transaksi" },
                { title: "Nm. Barang" },
                { title: "Objek" },
                { title: "Kel. Utama" },
                { title: "Kelompok" },
                { title: "Sub Kelompok" },
                { title: "Pemohon" },
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
                    localStorage.setItem(
                        stateStorageName,
                        JSON.stringify(data),
                    );
                },
                stateLoadCallback: function (settings) {
                    let stateStorageName =
                            window.location.pathname + "/colResizeStateData",
                        data = localStorage.getItem(stateStorageName);
                    return data != null ? JSON.parse(data) : null;
                },
            },
            scrollY: "100px",
            autoWidth: false,
            scrollX: "100%",
            columnDefs: [
                { targets: [0], width: "12%", className: "fixed-width" },
                { targets: [1], width: "12%", className: "fixed-width" },
                { targets: [2], width: "20%", className: "fixed-width" },
                { targets: [3], width: "8%", className: "fixed-width" },
                { targets: [4], width: "8%", className: "fixed-width" },
                { targets: [5], width: "8%", className: "fixed-width" },
                { targets: [6], width: "8%", className: "fixed-width" },
                { targets: [7], width: "8%", className: "fixed-width" },
            ],
        });

        primerKonversiAsal.value = 0;
        sekunderKonversiAsal.value = 0;
        triterKonversiAsal.value = 0;
        primerKonversiTujuan.value = 0;
        sekunderKonversiTujuan.value = 0;
        triterKonversiTujuan.value = 0;
    });

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

    function updateDataTable(data, angka) {
        var table = $("#tableData").DataTable();
        var tableAsal = $("#tableAsal").DataTable();
        var tableTujuan = $("#tableTujuan").DataTable();

        if (angka === 1) {
            table.clear();
            data.forEach(function (item) {
                table.row.add([
                    escapeHtml(item.IdKonversi),
                    formatDateToMMDDYYYY(item.SaatTransaksi),
                ]);
            });
            table.draw();
        } else if (angka === 2) {
            tableAsal.clear();
            data.forEach(function (item) {
                tableAsal.row.add([
                    escapeHtml(item.IdKonversi),
                    escapeHtml(item.IdTransaksi),
                    escapeHtml(item.NamaType),
                    escapeHtml(item.NamaObjek),
                    escapeHtml(item.NamaKelompokUtama),
                    escapeHtml(item.NamaKelompok),
                    escapeHtml(item.NamaSubKelompok),
                    escapeHtml(item.IdPenerima),
                    escapeHtml(item.IdType),
                ]);
            });
            tableAsal.draw();
        } else if (angka === 3) {
            tableTujuan.clear();
            data.forEach(function (item) {
                tableTujuan.row.add([
                    escapeHtml(item.IdKonversi),
                    escapeHtml(item.IdTransaksi),
                    escapeHtml(item.NamaType),
                    escapeHtml(item.NamaObjek),
                    escapeHtml(item.NamaKelompokUtama),
                    escapeHtml(item.NamaKelompok),
                    escapeHtml(item.NamaSubKelompok),
                    escapeHtml(item.IdPenerima),
                    escapeHtml(item.IdType),
                ]);
            });
            tableTujuan.draw();
        }
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

    function formatNumber(value) {
        if (!isNaN(parseFloat(value)) && isFinite(value)) {
            return parseFloat(value).toFixed(2);
        }
        return value;
    }

    let currentRowIndex = -1;

    $(document).on("keydown", function (e) {
        // Cek apakah ada modal aktif
        if ($(".modal.show").length > 0) return;

        const table = $("#tableData").DataTable();
        const rowCount = table.rows().count();

        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (currentRowIndex < rowCount - 1) currentRowIndex++;
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (currentRowIndex > 0) currentRowIndex--;
        } else {
            return; // bukan panah, keluar
        }

        const row = table.row(currentRowIndex).node();
        const data = table.row(currentRowIndex).data();

        if (row && data) {
            table.$("tr.selected").removeClass("selected");
            $(row).addClass("selected");

            isiDataDariRow(data);

            row.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    });

    $("#tableData tbody").on("click", "tr", function () {
        const table = $("#tableData").DataTable();

        table.$("tr.selected").removeClass("selected");
        $(this).addClass("selected");

        const data = table.row(this).data();
        currentRowIndex = table.row(this).index(); // Sinkronkan indeks

        isiDataDariRow(data);
    });

    function isiDataDariRow(data) {
        if (!data) return;

        kodeKonversi.value = decodeHtmlEntities(data[0]);
        Load_DataAsal();
        Load_DataTujuan();

        Tgl = formatDateToMMDDYYYY(data[1]);

        kodeAsal.value = "";
        kodeTujuan.value = "";
    }

    $("#tableAsal tbody").on("click", "tr", function () {
        var table = $("#tableAsal").DataTable();
        table.$("tr.selected").removeClass("selected");
        $(this).addClass("selected");

        var data = table.row(this).data();
        kodeAsal.value = decodeHtmlEntities(data[1]);
    });

    $("#tableTujuan tbody").on("click", "tr", function () {
        var table = $("#tableTujuan").DataTable();
        table.$("tr.selected").removeClass("selected");
        $(this).addClass("selected");

        var data = table.row(this).data();
        kodeTujuan.value = decodeHtmlEntities(data[1]);
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
                            "selected",
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
                            "selected",
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

    // button list divisi
    btnDivisi.addEventListener("click", function (e) {
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
                                url: "KonversiBarang/getDivisi",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "IdDivisi" },
                                { data: "NamaDivisi" },
                            ],
                            columnDefs: [
                                {
                                    targets: 0,
                                    width: "100px",
                                },
                            ],
                            order: [[0, "asc"]],
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
                            handleTableKeydown(e, "table_list"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    divisiId.value = decodeHtmlEntities(
                        result.value.IdDivisi.trim(),
                    );
                    divisiNama.value = decodeHtmlEntities(
                        result.value.NamaDivisi.trim(),
                    );
                    clearText();
                    enableButton();
                    Load_DataKonversi();
                    Load_Data_All_Asal();
                    Load_Data_All_Tujuan();
                    btnIsiAsal.focus();
                }
            });
        } catch (error) {
            console.error(error);
        }
    });

    function enableButton() {
        btnIsiAsal.disabled = false;
        btnKoreksiAsal.disabled = false;
        btnHapusAsal.disabled = false;
        btnIsiTujuan.disabled = false;
        btnKoreksiTujuan.disabled = false;
        btnHapusTujuan.disabled = false;
        btnBatal.disabled = false;
    }

    // button list objek
    // btn_objek.addEventListener("click", function (e) {

    //     try {
    //         Swal.fire({
    //             title: 'Objek',
    //             html: `
    //                 <table id="table_list" class="table">
    //                     <thead>
    //                         <tr>
    //                             <th scope="col">ID Objek</th>
    //                             <th scope="col">Nama Objek</th>
    //                         </tr>
    //                     </thead>
    //                     <tbody></tbody>
    //                 </table>
    //             `,
    //             preConfirm: () => {
    //                 const selectedData = $("#table_list")
    //                     .DataTable()
    //                     .row(".selected")
    //                     .data();
    //                 if (!selectedData) {
    //                     Swal.showValidationMessage("Please select a row");
    //                     return false;
    //                 }
    //                 return selectedData;
    //             },
    //             width: '40%',
    //             returnFocus: false,
    //             showCloseButton: true,
    //             showConfirmButton: true,
    //             confirmButtonText: 'Select',
    //             didOpen: () => {
    //                 $(document).ready(function () {
    //                     const table = $("#table_list").DataTable({
    //                         responsive: true,
    //                         processing: true,
    //                         serverSide: true,
    //                         paging: false,
    //                         scrollY: '400px',
    //                         scrollCollapse: true,
    //                         order: [0, "asc"],
    //                         ajax: {
    //                             url: "KonversiBarang/getObjek",
    //                             dataType: "json",
    //                             type: "GET",
    //                             data: {
    //                                 _token: csrfToken,
    //                                 divisi: divisiId.value
    //                             }
    //                         },
    //                         columns: [
    //                             { data: "IdObjek" },
    //                             { data: "NamaObjek" },
    //                         ],
    //                         columnDefs: [
    //                             {
    //                                 targets: 0,
    //                                 width: '100px',
    //                             }
    //                         ]
    //                     });
    //                     $("#table_list tbody").on("click", "tr", function () {
    //                         table.$("tr.selected").removeClass("selected");
    //                         $(this).addClass("selected");
    //                         scrollRowIntoView(this);
    //                     });

    //                     const searchInput = $('#table_list_filter input');
    //                     if (searchInput.length > 0) {
    //                         searchInput.focus();
    //                     }

    //                     currentIndex = null;
    //                     Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
    //                 });
    //             }
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 objekIdAsal.value = decodeHtmlEntities(result.value.IdObjek.trim());
    //                 objekNamaAsal.value = decodeHtmlEntities(result.value.NamaObjek.trim());
    //                 btn_kelut.focus();
    //             }
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // });

    const objekSelect = $("#objekSelect");
    let fetchController = null;

    function fetchDataObjek(endpoint) {
        return $.ajax({
            url: endpoint,
            type: "GET",
            dataType: "json",
            data: {
                _token: csrfToken,
            },
            success: function (response) {
                objekSelect.empty().append(`<option disabled selected>Pilih Objek</option>`); //prettier-ignore
                if (response.length > 0) {
                    response.forEach((data) => {
                        const displayText = `${data.IdObjek} | ${data.NamaObjek}`;

                        objekSelect.append(
                            new Option(displayText, data.IdObjek),
                        );
                    });
                    // dropdown muncul ketika isi
                    // if (StKonversi === 1 || StKonversi === 4) {
                    //     setTimeout(() => {
                    //         objekSelect.select2("open");
                    //     }, 50);
                    // }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No data Objek found.",
                    });
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while fetching data Objek.",
                });
            },
        });
    }

    objekSelect.select2({
        dropdownParent: $("#modalAsalKonversi"),
        placeholder: "Pilih Objek",
    });

    objekSelect.on("select2:select", function () {
        const selectedObjek = $(this).val();
        // console.log(selectedObjek);

        if (selectedObjek) {
            if (
                StKonversi === 1 ||
                StKonversi === 4 ||
                StKonversi === 2 ||
                StKonversi === 5
            ) {
                fetchDataKelUt("/getKelompokUtamaSelect/" + objekSelect.val());
            }
        }
    });

    const kelompokUtamaSelect = $("#kelompokUtamaSelect");

    function fetchDataKelUt(endpoint, idkelut) {
        return $.ajax({
            url: endpoint,
            type: "GET",
            dataType: "json",
            data: {
                _token: csrfToken,
            },
            success: function (response) {
                kelompokUtamaSelect.empty().append(`<option disabled selected>Pilih Kelompok Utama</option>`); //prettier-ignore
                if (response.length > 0) {
                    response.forEach((data) => {
                        const displayText = `${data.IdKelompokUtama} | ${data.NamaKelompokUtama}`;

                        kelompokUtamaSelect.append(
                            new Option(displayText, data.IdKelompokUtama),
                        );
                    });
                    // Hanya saat Isi
                    if (StKonversi === 1 || StKonversi === 4) {
                        setTimeout(() => {
                            kelompokUtamaSelect.select2("open");
                        }, 50);
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No data Kelompok Utama found.",
                    });
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while fetching data Kelompok Utama.",
                });
            },
        });
    }

    kelompokUtamaSelect.select2({
        dropdownParent: $("#modalAsalKonversi"),
        placeholder: "Pilih Kelompok Utama",
    });
    kelompokUtamaSelect.on("change", function () {
        const selectedKelompokUtama = $(this).val();
        if (selectedKelompokUtama) {
            if (
                StKonversi === 1 ||
                StKonversi === 4 ||
                StKonversi === 2 ||
                StKonversi === 5
            ) {
                fetchDataKelompok(
                    "/getKelompokSelect/" + kelompokUtamaSelect.val(),
                );
            }
        }
    });

    const kelompokSelect = $("#kelompokSelect");

    function fetchDataKelompok(endpoint) {
        return $.ajax({
            url: endpoint,
            type: "GET",
            dataType: "json",
            data: {
                _token: csrfToken,
            },
            success: function (response) {
                kelompokSelect.empty().append(`<option disabled selected>Pilih Kelompok</option>`); //prettier-ignore
                if (response.length > 0) {
                    response.forEach((data) => {
                        const displayText = `${data.idkelompok} | ${data.namakelompok}`;

                        kelompokSelect.append(
                            new Option(displayText, data.idkelompok),
                        );
                    });
                    if (StKonversi === 1 || StKonversi === 4) {
                        setTimeout(() => {
                            kelompokSelect.select2("open");
                        }, 50);
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No data Kelompok found.",
                    });
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while fetching data Kelompok.",
                });
            },
        });
    }

    kelompokSelect.select2({
        dropdownParent: $("#modalAsalKonversi"),
        placeholder: "Pilih Kelompok",
    });
    kelompokSelect.on("change", function () {
        const selectedKelompok = $(this).val();
        if (selectedKelompok) {
            if (
                StKonversi === 1 ||
                StKonversi === 4 ||
                StKonversi === 2 ||
                StKonversi === 5
            ) {
                fetchDataSubKelompok(
                    "/getSubKelompokSelect/" + kelompokSelect.val(),
                );
            }
        }
    });

    const subKelompokSelect = $("#subKelompokSelect");

    function fetchDataSubKelompok(endpoint) {
        return $.ajax({
            url: endpoint,
            type: "GET",
            dataType: "json",
            data: {
                _token: csrfToken,
            },
            success: function (response) {
                subKelompokSelect.empty().append(`<option disabled selected>Pilih Sub Kelompok</option>`); //prettier-ignore
                if (response.length > 0) {
                    response.forEach((data) => {
                        const displayText = `${data.IdSubkelompok} | ${data.NamaSubKelompok}`;

                        subKelompokSelect.append(
                            new Option(displayText, data.IdSubkelompok),
                        );
                    });
                    if (StKonversi === 1 || StKonversi === 4) {
                        setTimeout(() => {
                            subKelompokSelect.select2("open");
                        }, 50);
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No data Sub Kelompok found.",
                    });
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while fetching data Sub Kelompok.",
                });
            },
        });
    }

    subKelompokSelect.select2({
        dropdownParent: $("#modalAsalKonversi"),
        placeholder: "Pilih Sub Kelompok",
    });
    let arraySubKel = [];
    subKelompokSelect.on("change", function () {
        const selectedSubKelompok = $(this).val();
        const selectedOption = $(this).find(":selected").text(); // Ambil teks dari option yang dipilih
        const selectedArraySub = selectedOption.split(" | "); // Pecah teks menjadi array

        console.log(selectedArraySub);
        console.log(selectedSubKelompok);
        arraySubKel = [selectedArraySub];
        if (selectedSubKelompok) {
            if (StKonversi === 1) {
                // idtypeSelect.focus();
                buttonIdTypeClick();
            } else if (StKonversi === 2 || StKonversi === 3) {
                $.ajax({
                    type: "GET",
                    url: "KonversiBarang/getStatusKonversi",
                    data: {
                        XIdTransaksi: IdTranAsal,
                        _token: csrfToken,
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            buttonIdTypeClick(
                                result[0].IdSubkelompok,
                                result[0].IdType,
                            );
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
            } else if (StKonversi === 4) {
                // idtype2Select.focus();
                buttonIdTypeClick2();
            } else if (StKonversi === 5 || StKonversi === 6) {
                $.ajax({
                    type: "GET",
                    url: "KonversiBarang/getStatusKonversi",
                    data: {
                        XIdTransaksi: IdTranTujuan,
                        _token: csrfToken,
                    },
                    success: function (result) {
                        if (result.length !== 0) {
                            buttonIdTypeClick2(
                                result[0].IdSubkelompok,
                                result[0].IdType,
                            );
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
            } else {
                // idtype2Select.focus();
                buttonIdTypeClick2();
            }
        }
    });

    function Load_Type_ABM(subKelompok, idType) {
        try {
            if (StKonversi === 1 || StKonversi === 4) {
                fetchDataLoad_Type_ABM(
                    "/getTypeABMSelect/" + subKelompokSelect.val(),
                );
            } else if (
                StKonversi === 2 ||
                StKonversi === 3 ||
                StKonversi === 5 ||
                StKonversi === 6
            ) {
                fetchDataLoad_Type_ABM(
                    "/getTypeABMSelect/" + subKelompok,
                    idType,
                );
            }

            // Swal.fire({
            //     title: "Kode Type",
            //     html: `
            //     <table id="table_list" class="table">
            //         <thead>
            //             <tr>
            //                 <th scope="col">ID Type</th>
            //                 <th scope="col">Nama Type</th>
            //             </tr>
            //         </thead>
            //         <tbody></tbody>
            //     </table>
            // `,
            //     preConfirm: () => {
            //         const selectedData = $("#table_list")
            //             .DataTable()
            //             .row(".selected")
            //             .data();
            //         if (!selectedData) {
            //             Swal.showValidationMessage("Please select a row");
            //             return false;
            //         }
            //         return selectedData;
            //     },
            //     width: "55%",
            //     returnFocus: false,
            //     showCloseButton: true,
            //     showConfirmButton: true,
            //     confirmButtonText: "Select",
            //     didOpen: () => {
            //         $(document).ready(function () {
            //             const table = $("#table_list").DataTable({
            //                 responsive: true,
            //                 processing: true,
            //                 serverSide: true,
            //                 paging: false,
            //                 scrollY: "400px",
            //                 scrollCollapse: true,
            //                 order: [1, "asc"],
            //                 ajax: {
            //                     url: "KonversiBarang/getTypeABM",
            //                     dataType: "json",
            //                     type: "GET",
            //                     data: {
            //                         _token: csrfToken,
            //                         XIdSubKelompok_Type: subkelIdAsal.value,
            //                     },
            //                 },
            //                 columns: [{ data: "idtype" }, { data: "BARU" }],
            //                 columnDefs: [
            //                     {
            //                         targets: 0,
            //                         width: "200px",
            //                     },
            //                 ],
            //             });

            //             $("#table_list tbody").on("click", "tr", function () {
            //                 table.$("tr.selected").removeClass("selected");
            //                 $(this).addClass("selected");
            //                 scrollRowIntoView(this);
            //             });

            //             const searchInput = $("#table_list_filter input");
            //             if (searchInput.length > 0) {
            //                 searchInput.focus();
            //             }

            //             currentIndex = null;
            //             Swal.getPopup().addEventListener("keydown", (e) =>
            //                 handleTableKeydown(e, "table_list")
            //             );
            //         });
            //     },
            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         result3 = decodeHtmlEntities(result.value.idtype.trim());
            //         result5 = decodeHtmlEntities(result.value.BARU.trim());

            //         kodeTypeAsal.value = decodeHtmlEntities(result3);
            //         kodeTypeTujuan.value = decodeHtmlEntities(result3);
            //         namaTypeAsal.value = decodeHtmlEntities(result5);

            //         Get_Type(kodeTypeAsal.value, subkelIdAsal.value);
            //         getKodeBarang(kodeTypeAsal.value);
            //     }
            // });
        } catch (error) {
            console.error(error);
        }
    }

    function fetchDataLoad_Type_ABM(endpoint, idType) {
        if (StKonversi === 1 || StKonversi === 2 || StKonversi === 3) {
            fetch(endpoint)
                .then((response) => response.json())
                .then((options) => {
                    idtypeSelect
                        .empty()
                        .append(
                            `<option disabled selected>Pilih Kode Barang/Type</option>`,
                        );

                    Promise.all(
                        options.map((entry) => {
                            return new Promise((resolve) => {
                                const displayText = `${entry.KodeBarang} | ${entry.idtype} | ${entry.BARU}`;
                                idtypeSelect.append(
                                    new Option(displayText, entry.idtype),
                                );
                                resolve(); // Resolve after appending
                            });
                        }),
                    ).then(() => {
                        if (StKonversi === 1) {
                            idtypeSelect.select2("open");
                        } else if (StKonversi === 2 || StKonversi === 3) {
                            idtypeSelect.val(idType).trigger("change");
                        }
                    });
                });
        } else {
            fetch(endpoint)
                .then((response) => response.json())
                .then((options) => {
                    idtype2Select
                        .empty()
                        .append(
                            `<option disabled selected>Pilih Kode Barang/Type</option>`,
                        );

                    Promise.all(
                        options.map((entry) => {
                            return new Promise((resolve) => {
                                const displayText = `${entry.KodeBarang} | ${entry.idtype} | ${entry.BARU}`;
                                idtype2Select.append(
                                    new Option(displayText, entry.idtype),
                                );
                                resolve(); // Resolve after appending
                            });
                        }),
                    ).then(() => {
                        if (StKonversi === 4) {
                            idtype2Select.select2("open");
                        } else if (StKonversi === 5 || StKonversi === 6) {
                            idtype2Select.val(idType).trigger("change");
                        }
                    });
                });
        }
    }

    function Load_Type_CIR(subKelompok, idType) {
        try {
            if (StKonversi === 1 || StKonversi === 4) {
                fetchDataLoad_Type_CIR(
                    "/getTypeCIRSelect/" + subKelompokSelect.val(),
                );
            } else if (
                StKonversi === 2 ||
                StKonversi === 3 ||
                StKonversi === 5 ||
                StKonversi === 6
            ) {
                fetchDataLoad_Type_CIR(
                    "/getTypeCIRSelect/" + subKelompok,
                    idType,
                );
            }
            // Swal.fire({
            //     title: "Kode Type",
            //     html: `
            //     <table id="table_list" class="table">
            //         <thead>
            //             <tr>
            //                 <th scope="col">ID Type</th>
            //                 <th scope="col">Nama Type</th>
            //             </tr>
            //         </thead>
            //         <tbody></tbody>
            //     </table>
            // `,
            //     preConfirm: () => {
            //         const selectedData = $("#table_list")
            //             .DataTable()
            //             .row(".selected")
            //             .data();
            //         if (!selectedData) {
            //             Swal.showValidationMessage("Please select a row");
            //             return false;
            //         }
            //         return selectedData;
            //     },
            //     width: "55%",
            //     returnFocus: false,
            //     showCloseButton: true,
            //     showConfirmButton: true,
            //     confirmButtonText: "Select",
            //     didOpen: () => {
            //         $(document).ready(function () {
            //             const table = $("#table_list").DataTable({
            //                 responsive: true,
            //                 processing: true,
            //                 serverSide: true,
            //                 paging: false,
            //                 scrollY: "400px",
            //                 scrollCollapse: true,
            //                 order: [1, "asc"],
            //                 ajax: {
            //                     url: "KonversiBarang/getTypeCIR",
            //                     dataType: "json",
            //                     type: "GET",
            //                     data: {
            //                         _token: csrfToken,
            //                     },
            //                     dataSrc: function (json) {
            //                         return json.data.filter(function (item) {
            //                             return item.Id_Type && item.Nm_Type;
            //                         });
            //                     },
            //                 },
            //                 columns: [{ data: "Id_Type" }, { data: "Nm_Type" }],
            //                 columnDefs: [
            //                     {
            //                         targets: 0,
            //                         width: "200px",
            //                     },
            //                 ],
            //             });

            //             $("#table_list tbody").on("click", "tr", function () {
            //                 table.$("tr.selected").removeClass("selected");
            //                 $(this).addClass("selected");
            //                 scrollRowIntoView(this);
            //             });

            //             const searchInput = $("#table_list_filter input");
            //             if (searchInput.length > 0) {
            //                 searchInput.focus();
            //             }

            //             currentIndex = null;
            //             Swal.getPopup().addEventListener("keydown", (e) =>
            //                 handleTableKeydown(e, "table_list")
            //             );
            //         });
            //     },
            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         result7 = result.value.Id_Type
            //             ? decodeHtmlEntities(result.value.Id_Type)
            //             : "";
            //         result6 = result.value.Nm_Type
            //             ? decodeHtmlEntities(result.value.Nm_Type)
            //             : "";

            //         kodeTypeAsal.value = decodeHtmlEntities(result7);
            //         kodeTypeTujuan.value = decodeHtmlEntities(result7);
            //         namaTypeAsal.value = decodeHtmlEntities(result6);

            //         Get_Type(kodeTypeAsal.value, subkelIdAsal.value);
            //         getKodeBarang(kodeTypeAsal.value);
            //     }
            // });
        } catch (error) {
            console.error(error);
        }
    }

    function fetchDataLoad_Type_CIR(endpoint) {
        if (StKonversi === 1 || StKonversi === 2 || StKonversi === 3) {
            fetch(endpoint)
                .then((response) => response.json())
                .then((options) => {
                    idtypeSelect
                        .empty()
                        .append(
                            `<option disabled selected>Pilih Kode Barang/Type</option>`,
                        );

                    Promise.all(
                        options.map((entry) => {
                            return new Promise((resolve) => {
                                const displayText = `${entry.KodeBarang} | ${entry.Id_Type} | ${entry.Nm_Type}`;
                                idtypeSelect.append(
                                    new Option(displayText, entry.Id_Type),
                                );
                                resolve(); // Resolve after appending
                            });
                        }),
                    ).then(() => {
                        if (StKonversi === 1) {
                            idtypeSelect.select2("open");
                        } else if (StKonversi === 2 || StKonversi === 3) {
                            idtypeSelect.val(idType).trigger("change");
                        }
                    });
                });
        } else {
            fetch(endpoint)
                .then((response) => response.json())
                .then((options) => {
                    idtype2Select
                        .empty()
                        .append(
                            `<option disabled selected>Pilih Kode Barang/Type</option>`,
                        );

                    Promise.all(
                        options.map((entry) => {
                            return new Promise((resolve) => {
                                const displayText = `${entry.KodeBarang} | ${entry.Id_Type} | ${entry.Nm_Type}`;
                                idtype2Select.append(
                                    new Option(displayText, entry.Id_Type),
                                );
                                resolve(); // Resolve after appending
                            });
                        }),
                    ).then(() => {
                        if (StKonversi === 4) {
                            idtype2Select.select2("open");
                        } else if (StKonversi === 5 || StKonversi === 6) {
                            idtype2Select.val(idType).trigger("change");
                        }
                    });
                });
        }
    }

    function Get_Type(sType, sKdSubKel) {
        $.ajax({
            type: "GET",
            url: "KonversiBarang/getType",
            data: {
                IdType: sType,
                IdSubKel: sKdSubKel,
                _token: csrfToken,
            },
            success: function (result) {
                if (result.length !== 0) {
                    // namaTypeSelect.val(null).trigger("change");
                    // namaTypeAsal.value = decodeHtmlEntities(
                    //     result[0].NamaType.trim()
                    // );
                    Get_Saldo(sType);
                } else {
                    Swal.fire({
                        icon: "error",
                        text:
                            "Tidak ada barang #: " +
                            sType +
                            " pada sub kelompok " +
                            decodeHtmlEntities(sKdSubKel),
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }

    function Get_Saldo(kd_Type) {
        $.ajax({
            type: "GET",
            url: "KonversiBarang/getSaldo",
            data: {
                IdType: kd_Type,
                _token: csrfToken,
            },
            success: function (result) {
                if (result.length !== 0) {
                    primerAkhirAsal.value =
                        formatNumber(result[0].SaldoPrimer) ?? "";
                    sekunderAkhirAsal.value =
                        formatNumber(result[0].SaldoSekunder) ?? "";
                    triterAkhirAsal.value =
                        formatNumber(result[0].SaldoTritier) ?? "";
                    asalP.innerText =
                        decodeHtmlEntities(result[0].SatPrimer.trim()) ?? "";
                    asalS.innerText =
                        decodeHtmlEntities(result[0].SatSekunder.trim()) ?? "";
                    asalT.innerText =
                        decodeHtmlEntities(result[0].SatTritier.trim()) ?? "";
                } else {
                    primerAkhirAsal.value = "";
                    sekunderAkhirAsal.value = "";
                    triterAkhirAsal.value = "";
                    asalP.innerText = "";
                    asalS.innerText = "";
                    asalT.innerText = "";
                }

                if (StKonversi === 3 || StKonversi === 6) {
                    btn_prosesAsal.focus();
                } else {
                    if (
                        (asalAtauTujuan.innerHTML == "Tujuan Konversi" &&
                            StKonversi === 1) ||
                        StKonversi === 4
                    ) {
                        hargaSatuanDiv.style.display = "block";
                        hargaSatuan.focus();
                        hargaSatuan.select();
                    } else {
                        primerKonversiAsal.focus();
                        primerKonversiAsal.select();
                    }
                    // if (asalAtauTujuan.innerHTML == "Tujuan Konversi") {
                    //     $.ajax({
                    //         type: "GET",
                    //         url: "KonversiBarang/getTypePersediaan",
                    //         data: {
                    //             idType: kd_Type,
                    //             _token: csrfToken,
                    //         },
                    //         success: function (response) {
                    //             console.log(response.success);
                    //             console.log(response.error);

                    //             if (response.success) {
                    //                 hargaSatuanDiv.style.display = "none";
                    //                 primerKonversiAsal.focus();
                    //             } else if (response.error) {
                    //                 hargaSatuanDiv.style.display = "block";
                    //                 hargaSatuan.focus();
                    //             }
                    //         },
                    //         error: function (xhr, status, error) {
                    //             console.error("Error:", error);
                    //         },
                    //     });
                    // } else {
                    //     primerKonversiAsal.focus();
                    // }
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }

    hargaSatuan.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            hargaSatuan.value = numeral(hargaSatuan.value).format("0,0.00");
            primerKonversiAsal.focus();
            primerKonversiAsal.select();
        }
    });

    // btnIdType.addEventListener("click", buttonIdTypeClick);
    // btnIdType2.addEventListener("click", buttonIdTypeClick2);

    const idtypeSelect = $("#idtypeSelect");

    function fetchDataIdType(endpoint, idType) {
        console.log("tipe1");

        fetch(endpoint)
            .then((response) => response.json())
            .then((options) => {
                idtypeSelect
                    .empty()
                    .append(
                        `<option disabled selected>Pilih Kode Barang/Type</option>`,
                    );

                Promise.all(
                    options.map((entry) => {
                        return new Promise((resolve) => {
                            const displayText = `${entry.KodeBarang} | ${entry.IdType} | ${entry.NamaType}`;
                            idtypeSelect.append(
                                new Option(displayText, entry.IdType),
                            );
                            resolve(); // Resolve after appending
                        });
                    }),
                ).then(() => {
                    if (StKonversi === 1) {
                        idtypeSelect.select2("open");
                    } else if (StKonversi === 2 || StKonversi === 3) {
                        idtypeSelect.val(idType).trigger("change");
                    }
                });
            });
    }

    idtypeSelect.select2({
        dropdownParent: $("#modalAsalKonversi"),
        placeholder: "Pilih Kode Barang/Type",
    });
    let arrayIdType = [];
    idtypeSelect.on("change", function () {
        const selectedOption = $(this).find(":selected").text(); // Ambil teks dari option yang dipilih
        const selectedArray = selectedOption.split(" | "); // Pecah teks menjadi array

        console.log(selectedArray); // Array yang berisi [KodeBarang, IdType, NamaType]
        arrayIdType = [selectedArray];
        const selectedIdType = $(this).val();
        if (selectedIdType) {
            if (StKonversi === 1 || StKonversi === 2 || StKonversi === 3) {
                if (stSelect === 1 || stSelect === 2) {
                    Get_Type(selectedIdType, subKelompokSelect.val());
                    getKodeBarang(selectedIdType);
                } else {
                    Get_Saldo(selectedIdType);
                    getKodeBarang(selectedIdType);
                }
            } else {
                Get_Saldo(selectedIdType);
                getKodeBarang(selectedIdType);
            }
        }
    });

    function buttonIdTypeClick(subKelompok, idType) {
        console.log(objekSelect.val());

        if (
            (divisiIdAsal.value === "ABM" && objekSelect.val() == "022") ||
            (divisiIdAsal.value === "CIR" && objekSelect.val() == "043") ||
            (divisiIdAsal.value === "JBB" && objekSelect.val() == "042") ||
            (divisiIdAsal.value === "EXT" &&
                (kelompokSelect.val() == "1259" ||
                    kelompokSelect.val() == "1283"))
        ) {
            if (divisiIdAsal.value === "ABM" && objekSelect.val() == "022") {
                if (divisiIdAsal.value !== "") {
                    stSelect = 1;
                    result3 = "idType";
                    result4 = "NamaType";
                    result5 = "Baru";
                    Load_Type_ABM(subKelompok, idType);
                }
            } else {
                stSelect = 2;
                result7 = "id_type";
                result6 = "nm_type";

                $.ajax({
                    type: "GET",
                    url: "KonversiBarang/insertTempType",
                    data: {
                        XIdDivisi: divisiIdAsal.value,
                        XIdSubKelompok: subKelompokSelect.val(),
                        _token: csrfToken,
                    },
                });

                Load_Type_CIR(subKelompok, idType);
            }
        } else {
            try {
                stSelect = 0;
                if (StKonversi === 1) {
                    fetchDataIdType(
                        "/getIdTypeSelect/" + subKelompokSelect.val(),
                    );
                } else if (StKonversi === 2 || StKonversi === 3) {
                    fetchDataIdType("/getIdTypeSelect/" + subKelompok, idType);
                }

                // fetchDataNamaType(
                //     "/getIdTypeSelect/" + subKelompokSelect.val()
                // );
                // Swal.fire({
                //     title: "Kode Type",
                //     html: `
                //     <table id="table_list" class="table">
                //         <thead>
                //             <tr>
                //                 <th scope="col">ID Type</th>
                //                 <th scope="col">Nama Type</th>
                //             </tr>
                //         </thead>
                //         <tbody></tbody>
                //     </table>
                // `,
                //     preConfirm: () => {
                //         const selectedData = $("#table_list")
                //             .DataTable()
                //             .row(".selected")
                //             .data();
                //         if (!selectedData) {
                //             Swal.showValidationMessage("Please select a row");
                //             return false;
                //         }
                //         return selectedData;
                //     },
                //     width: "55%",
                //     returnFocus: false,
                //     showCloseButton: true,
                //     showConfirmButton: true,
                //     confirmButtonText: "Select",
                //     didOpen: () => {
                //         $(document).ready(function () {
                //             const table = $("#table_list").DataTable({
                //                 responsive: true,
                //                 processing: true,
                //                 serverSide: true,
                //                 paging: false,
                //                 scrollY: "400px",
                //                 scrollCollapse: true,
                //                 order: [1, "asc"],
                //                 ajax: {
                //                     url: "KonversiBarang/getIdType",
                //                     dataType: "json",
                //                     type: "GET",
                //                     data: {
                //                         _token: csrfToken,
                //                         XIdSubKelompok_Type: subKelompokSelect.val(),
                //                     },
                //                 },
                //                 columns: [
                //                     { data: "IdType" },
                //                     { data: "NamaType" },
                //                 ],
                //                 columnDefs: [
                //                     {
                //                         targets: 0,
                //                         width: "200px",
                //                     },
                //                 ],
                //             });

                //             $("#table_list tbody").on(
                //                 "click",
                //                 "tr",
                //                 function () {
                //                     table
                //                         .$("tr.selected")
                //                         .removeClass("selected");
                //                     $(this).addClass("selected");
                //                     scrollRowIntoView(this);
                //                 }
                //             );

                //             const searchInput = $("#table_list_filter input");
                //             if (searchInput.length > 0) {
                //                 searchInput.focus();
                //             }

                //             currentIndex = null;
                //             Swal.getPopup().addEventListener("keydown", (e) =>
                //                 handleTableKeydown(e, "table_list")
                //             );
                //         });
                //     },
                // }).then((result) => {
                //     if (result.isConfirmed) {
                //         kodeTypeAsal.value = decodeHtmlEntities(
                //             result.value.IdType.trim()
                //         );
                //         namaTypeAsal.value = decodeHtmlEntities(
                //             result.value.NamaType.trim()
                //         );

                //         Get_Saldo(kodeTypeAsal.value);
                //         getKodeBarang(kodeTypeAsal.value);
                //     }
                // });
            } catch (error) {
                console.error(error);
            }
        }
        primerKonversiAsal.focus();
        primerKonversiAsal.select();
    }

    const idtype2Select = $("#idtype2Select");

    function fetchDataIdType2(endpoint, idType) {
        console.log("tipe2", endpoint, idType);

        fetch(endpoint)
            .then((response) => response.json())
            .then((options) => {
                idtype2Select
                    .empty()
                    .append(
                        `<option disabled selected>Pilih Kode Barang/Type</option>`,
                    );

                Promise.all(
                    options.map((entry) => {
                        return new Promise((resolve) => {
                            const displayText = `${entry.KodeBarang} | ${entry.IdType} | ${entry.NamaType}`;
                            idtype2Select.append(
                                new Option(displayText, entry.IdType),
                            );
                            resolve(); // Resolve after appending
                        });
                    }),
                ).then(() => {
                    if (StKonversi === 4) {
                        idtype2Select.select2("open");
                    } else if (StKonversi === 5 || StKonversi === 6) {
                        idtype2Select.val(idType).trigger("change");
                    }
                });
            });
    }

    idtype2Select.select2({
        dropdownParent: $("#modalAsalKonversi"),
        placeholder: "Pilih Kode Barang/Type",
    });
    idtype2Select.on("change", function () {
        const selectedIdType2Option = $(this).find(":selected").text(); // Ambil teks dari option yang dipilih
        const selectedIdType2Array = selectedIdType2Option.split(" | "); // Pecah teks menjadi array

        console.log(selectedIdType2Array); // Array yang berisi [KodeBarang, IdType, NamaType]

        const selectedIdType2 = $(this).val();
        if (selectedIdType2) {
            if (StKonversi === 4 || StKonversi === 5) {
                if (stSelect === 1 || stSelect === 2) {
                    Get_Type(selectedIdType2, subKelompokSelect.val());
                    getKodeBarang(selectedIdType2);
                } else {
                    Get_Saldo(selectedIdType2);
                    getKodeBarang(selectedIdType2);
                }
            } else {
                Get_Saldo(selectedIdType2);
                getKodeBarang(selectedIdType2);
            }
        }
    });

    function buttonIdTypeClick2(subKelompok, idType) {
        if (
            (divisiIdAsal.value === "ABM" && objekSelect.val() == "022") ||
            (divisiIdAsal.value === "CIR" && objekSelect.val() == "043") ||
            (divisiIdAsal.value === "JBB" && objekSelect.val() == "042") ||
            (divisiIdAsal.value === "EXT" &&
                (kelompokSelect.val() == "1259" ||
                    kelompokSelect.val() == "1283"))
        ) {
            if (divisiIdAsal.value === "ABM" && objekSelect.val() == "022") {
                if (divisiIdAsal.value !== "") {
                    stSelect = 1;
                    result3 = "idType";
                    result4 = "NamaType";
                    result5 = "Baru";
                    Load_Type_ABM(subKelompok, idType);
                }
            } else {
                stSelect = 2;
                result7 = "id_type";
                result6 = "nm_type";

                $.ajax({
                    type: "GET",
                    url: "KonversiBarang/insertTempType",
                    data: {
                        XIdDivisi: divisiIdAsal.value,
                        XIdSubKelompok: subKelompokSelect.val(),
                        _token: csrfToken,
                    },
                });

                Load_Type_CIR(subKelompok, idType);
            }
        } else if (divisiIdAsal.value === "BKL") {
            stSelect = 3;
            only_BKL(subKelompok, idType);
        } else {
            try {
                stSelect = 0;
                if (StKonversi === 4) {
                    fetchDataIdType2(
                        "/getIdTypeSelect/" + subKelompokSelect.val(),
                    );
                } else if (StKonversi === 5 || StKonversi === 6) {
                    console.log(subKelompok);
                    fetchDataIdType2(
                        "/getIdTypeSelect/" + subKelompokSelect.val(),
                        idType,
                    );
                }
                // fetchDataNamaType(
                //     "/getIdTypeSelect/" + subKelompokSelect.val()
                // );
                // Swal.fire({
                //     title: "Kode Type",
                //     html: `
                //     <table id="table_list" class="table">
                //         <thead>
                //             <tr>
                //                 <th scope="col">ID Type</th>
                //                 <th scope="col">Nama Type</th>
                //             </tr>
                //         </thead>
                //         <tbody></tbody>
                //     </table>
                // `,
                //     preConfirm: () => {
                //         const selectedData = $("#table_list")
                //             .DataTable()
                //             .row(".selected")
                //             .data();
                //         if (!selectedData) {
                //             Swal.showValidationMessage("Please select a row");
                //             return false;
                //         }
                //         return selectedData;
                //     },
                //     width: "55%",
                //     returnFocus: false,
                //     showCloseButton: true,
                //     showConfirmButton: true,
                //     confirmButtonText: "Select",
                //     didOpen: () => {
                //         $(document).ready(function () {
                //             const table = $("#table_list").DataTable({
                //                 responsive: true,
                //                 processing: true,
                //                 serverSide: true,
                //                 paging: false,
                //                 scrollY: "400px",
                //                 scrollCollapse: true,
                //                 order: [1, "asc"],
                //                 ajax: {
                //                     url: "KonversiBarang/getIdType",
                //                     dataType: "json",
                //                     type: "GET",
                //                     data: {
                //                         _token: csrfToken,
                //                         XIdSubKelompok_Type: subkelIdAsal.value,
                //                     },
                //                 },
                //                 columns: [
                //                     { data: "IdType" },
                //                     { data: "NamaType" },
                //                 ],
                //                 columnDefs: [
                //                     {
                //                         targets: 0,
                //                         width: "200px",
                //                     },
                //                 ],
                //             });

                //             $("#table_list tbody").on(
                //                 "click",
                //                 "tr",
                //                 function () {
                //                     table
                //                         .$("tr.selected")
                //                         .removeClass("selected");
                //                     $(this).addClass("selected");
                //                     scrollRowIntoView(this);
                //                 }
                //             );

                //             const searchInput = $("#table_list_filter input");
                //             if (searchInput.length > 0) {
                //                 searchInput.focus();
                //             }

                //             currentIndex = null;
                //             Swal.getPopup().addEventListener("keydown", (e) =>
                //                 handleTableKeydown(e, "table_list")
                //             );
                //         });
                //     },
                // }).then((result) => {
                //     if (result.isConfirmed) {
                //         kodeTypeTujuan.value = decodeHtmlEntities(
                //             result.value.IdType.trim()
                //         );
                //         namaTypeAsal.value = decodeHtmlEntities(
                //             result.value.NamaType.trim()
                //         );

                //         Get_Saldo(kodeTypeTujuan.value);
                //         getKodeBarang(kodeTypeTujuan.value);
                //     }
                // });
            } catch (error) {
                console.error(error);
            }
        }
        primerKonversiAsal.focus();
        primerKonversiAsal.select();
    }

    function getKodeBarang(sType) {
        $.ajax({
            type: "GET",
            url: "KonversiBarang/getKdBrgByType",
            data: {
                sTypeVal: sType,
                _token: csrfToken,
            },
            success: function (result) {
                console.log(result);
                // kodeBarangAsal.value = result.KodeBarang.trim();
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }

    function only_BKL(subKelompok, idType) {
        try {
            if (StKonversi === 4) {
                fetchDataIdType2("/getIdTypeSelect/" + subKelompokSelect.val());
            } else if (StKonversi === 5 || StKonversi === 6) {
                fetchDataIdType2("/getIdTypeSelect/" + subKelompok, idType);
            }

            // Swal.fire({
            //     title: "Kode Type",
            //     html: `
            //     <table id="table_list" class="table">
            //         <thead>
            //             <tr>
            //                 <th scope="col">Nama Type</th>
            //                 <th scope="col">ID Type</th>
            //                 <th scope="col">Kode Barang</th>
            //             </tr>
            //         </thead>
            //         <tbody></tbody>
            //     </table>
            // `,
            //     preConfirm: () => {
            //         const selectedData = $("#table_list")
            //             .DataTable()
            //             .row(".selected")
            //             .data();
            //         if (!selectedData) {
            //             Swal.showValidationMessage("Please select a row");
            //             return false;
            //         }
            //         return selectedData;
            //     },
            //     width: "55%",
            //     returnFocus: false,
            //     showCloseButton: true,
            //     showConfirmButton: true,
            //     confirmButtonText: "Select",
            //     didOpen: () => {
            //         $(document).ready(function () {
            //             const table = $("#table_list").DataTable({
            //                 responsive: true,
            //                 processing: true,
            //                 serverSide: true,
            //                 paging: false,
            //                 scrollY: "400px",
            //                 scrollCollapse: true,
            //                 order: [1, "asc"],
            //                 ajax: {
            //                     url: "KonversiBarang/getIdType",
            //                     dataType: "json",
            //                     type: "GET",
            //                     data: {
            //                         _token: csrfToken,
            //                         XIdSubKelompok_Type: subkelIdAsal.value,
            //                     },
            //                 },
            //                 columns: [
            //                     { data: "IdType" },
            //                     { data: "NamaType" },
            //                     { data: "KodeBarang" },
            //                 ],
            //                 columnDefs: [
            //                     {
            //                         targets: 0,
            //                         width: "200px",
            //                     },
            //                 ],
            //             });
            //             $("#table_list tbody").on("click", "tr", function () {
            //                 table.$("tr.selected").removeClass("selected");
            //                 $(this).addClass("selected");
            //                 scrollRowIntoView(this);
            //             });
            //             const searchInput = $("#table_list_filter input");
            //             if (searchInput.length > 0) {
            //                 searchInput.focus();
            //             }
            //             currentIndex = null;
            //             Swal.getPopup().addEventListener("keydown", (e) =>
            //                 handleTableKeydown(e, "table_list")
            //             );
            //         });
            //     },
            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         kodeTypeTujuan.value = decodeHtmlEntities(
            //             result.value.IdType.trim()
            //         );
            //         namaTypeAsal.value = decodeHtmlEntities(
            //             result.value.NamaType.trim()
            //         );
            //         primerKonversiAsal.focus();
            //         getKodeBarang(kodeTypeTujuan.value);
            //     }
            // });
        } catch (error) {
            console.error(error);
        }
    }

    // function fetchDataOnly_BKL(endpoint) {
    //     fetch(endpoint)
    //         .then((response) => response.json())
    //         .then((options) => {
    //             idtype2Select
    //                 .empty()
    //                 .append(
    //                     `<option disabled selected>Pilih Kode Barang/Type</option>`
    //                 );

    //             Promise.all(
    //                 options.map((entry) => {
    //                     return new Promise((resolve) => {
    //                         const displayText = `${entry.Id_Type} / ${entry.Nm_Type}`;
    //                         idtype2Select.append(
    //                             new Option(displayText, entry.Id_Type)
    //                         );
    //                         resolve(); // Resolve after appending
    //                     });
    //                 })
    //             ).then(() => {
    //                 idtype2Select.select2("open");
    //             });
    //         });
    // }

    // button list Kode Type
    // btnNamaType.addEventListener("click", function (e) {
    //     try {
    //         Swal.fire({
    //             title: "Kode Type",
    //             html: `
    //             <table id="table_list" class="table">
    //                 <thead>
    //                     <tr>
    //                         <th scope="col">ID Type</th>
    //                         <th scope="col">Nama Type</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody></tbody>
    //             </table>
    //         `,
    //             preConfirm: () => {
    //                 const selectedData = $("#table_list")
    //                     .DataTable()
    //                     .row(".selected")
    //                     .data();
    //                 if (!selectedData) {
    //                     Swal.showValidationMessage("Please select a row");
    //                     return false;
    //                 }
    //                 return selectedData;
    //             },
    //             width: "55%",
    //             returnFocus: false,
    //             showCloseButton: true,
    //             showConfirmButton: true,
    //             confirmButtonText: "Select",
    //             didOpen: () => {
    //                 $(document).ready(function () {
    //                     const table = $("#table_list").DataTable({
    //                         responsive: true,
    //                         processing: true,
    //                         serverSide: true,
    //                         paging: false,
    //                         scrollY: "400px",
    //                         scrollCollapse: true,
    //                         order: [1, "asc"],
    //                         ajax: {
    //                             url: "KonversiBarang/getIdType",
    //                             dataType: "json",
    //                             type: "GET",
    //                             data: {
    //                                 _token: csrfToken,
    //                                 XIdSubKelompok_Type: subkelIdAsal.value,
    //                             },
    //                         },
    //                         columns: [{ data: "IdType" }, { data: "NamaType" }],
    //                         columnDefs: [
    //                             {
    //                                 targets: 0,
    //                                 width: "200px",
    //                             },
    //                         ],
    //                     });

    //                     $("#table_list tbody").on("click", "tr", function () {
    //                         table.$("tr.selected").removeClass("selected");
    //                         $(this).addClass("selected");
    //                         scrollRowIntoView(this);
    //                     });

    //                     const searchInput = $("#table_list_filter input");
    //                     if (searchInput.length > 0) {
    //                         searchInput.focus();
    //                     }

    //                     currentIndex = null;
    //                     Swal.getPopup().addEventListener("keydown", (e) =>
    //                         handleTableKeydown(e, "table_list")
    //                     );
    //                 });
    //             },
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 kodeTypeAsal.value = decodeHtmlEntities(
    //                     result.value.IdType.trim()
    //                 );
    //                 kodeTypeTujuan.value = decodeHtmlEntities(
    //                     result.value.IdType.trim()
    //                 );
    //                 namaTypeAsal.value = decodeHtmlEntities(
    //                     result.value.NamaType.trim()
    //                 );

    //                 Get_Saldo(kodeTypeAsal.value);
    //                 getKodeBarang(kodeTypeAsal.value);
    //             }
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // });

    // const namaTypeSelect = $("#namaTypeSelect");

    // function fetchDataNamaType(endpoint) {
    //     fetch(endpoint)
    //         .then((response) => response.json())
    //         .then((options) => {
    //             namaTypeSelect
    //                 .empty()
    //                 .append(
    //                     `<option disabled selected>Pilih Nama Type</option>`
    //                 );

    //             Promise.all(
    //                 options.map((entry) => {
    //                     return new Promise((resolve) => {
    //                         const displayText = `${entry.NamaType}`;
    //                         namaTypeSelect.append(
    //                             new Option(displayText, entry.IdType)
    //                         );
    //                         resolve(); // Resolve after appending
    //                     });
    //                 })
    //             ).then(() => {
    //                 // namaTypeSelect.select2("open");
    //             });
    //         });
    // }

    // namaTypeSelect.select2({
    //     dropdownParent: $("#modalAsalKonversi"),
    //     placeholder: "Pilih Nama Type",
    // });
    // namaTypeSelect.on("change", function () {
    //     const selectedNamaType = $(this).val();
    //     console.log(selectedNamaType);
    //     if (selectedNamaType) {
    //         idtypeSelect.val(namaTypeSelect.val()).trigger("change");
    //         idtype2Select.val(namaTypeSelect.val()).trigger("change");
    //         Get_Saldo(namaTypeSelect.val());
    //         getKodeBarang(namaTypeSelect.val());
    //     }
    // });

    var asalAtauTujuan = document.getElementById("asalAtauTujuan");
    btnIsiAsal.addEventListener("click", function (e) {
        StKonversi = 1;

        Swal.fire({
            title: "Membentuk Kode Konversi Baru ?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                IsiAsal = 1;
                divisiIdAsal.value = divisiId.value;
                divisiNamaAsal.value = divisiNama.value;
                uraianAsal.value = "Asal Konversi";
                tanggalAsal.value = tanggal.value;
                primerKonversiAsal.value = 0;
                sekunderKonversiAsal.value = 0;
                triterKonversiAsal.value = 0;
                $("#modalAsalKonversi").modal("show");
                $("#modalAsalKonversi")
                    .off("shown.bs.modal")
                    .on("shown.bs.modal", function () {
                        console.log("shown.bs.modal1");

                        btn_objek.focus();
                        asalAtauTujuan.innerHTML = "Asal Konversi";
                        $(".kodeTujuan").hide();
                        $(".kodeAsal").show();
                        fetchDataObjek("/getObjekSelect/" + divisiId.value);
                        // fetchDataObjek("/getObjekSelect/" + divisiId.value).done(function () {
                        //     if (StKonversi === 1 || StKonversi === 4) {
                        //         objekSelect.select2("open");
                        //     }
                        // });
                    });
            } else if (result.dismiss === Swal.DismissReason.backdrop) {
                return;
            } else {
                if (kodeKonversi.value === "") {
                    Swal.fire({
                        icon: "error",
                        text: "Pilih dulu Kd.Konversinya!!!..",
                    });
                } else {
                    Swal.fire({
                        icon: "info",
                        text:
                            "Isi Data Asal Konversi, dng Kd.Konversi:  " +
                            kodeKonversi.value,
                    }).then(() => {
                        var tgl = new Date(Tgl);

                        var year = tgl.getFullYear();
                        var month = (tgl.getMonth() + 1)
                            .toString()
                            .padStart(2, "0");
                        var day = tgl.getDate().toString().padStart(2, "0");

                        var formattedDate = `${year}-${month}-${day}`;

                        tanggalAsal.value = formattedDate;
                        IsiAsal = 2;
                        divisiIdAsal.value = divisiId.value;
                        divisiNamaAsal.value = divisiNama.value;
                        uraianAsal.value = "Asal Konversi";
                        KodeKonversiAsal = kodeKonversi.value;
                        primerKonversiAsal.value = 0;
                        sekunderKonversiAsal.value = 0;
                        triterKonversiAsal.value = 0;
                        $("#modalAsalKonversi").modal("show");
                        $("#modalAsalKonversi")
                            .off("shown.bs.modal")
                            .on("shown.bs.modal", function () {
                                console.log("shown.bs.modal2");

                                btn_objek.focus();
                                asalAtauTujuan.innerHTML = "Asal Konversi";
                                $(".kodeTujuan").hide();
                                $(".kodeAsal").show();
                                fetchDataObjek(
                                    "/getObjekSelect/" + divisiId.value,
                                );
                            });
                    });
                }
            }
        });
    });

    $("#modalAsalKonversi").on("hidden.bs.modal", function () {
        if (fetchController) {
            fetchController.abort();
            fetchController = null;
        }
        $(this).find("input").val("");
        objekSelect.val(null).trigger("change");
        kelompokUtamaSelect.val(null).trigger("change");
        kelompokSelect.val(null).trigger("change");
        subKelompokSelect.val(null).trigger("change");
        idtypeSelect.val(null).trigger("change");
        idtype2Select.val(null).trigger("change");
        hargaSatuan.value = 0;
        hargaSatuanDiv.style.display = "none";
        // namaTypeSelect.val(null).trigger("change");
        primerKonversiAsal.value = 0;
        sekunderKonversiAsal.value = 0;
        triterKonversiAsal.value = 0;
    });

    var KdKonvArr = [];
    var IdTypeArr = [];

    // isi tujuan
    btnIsiTujuan.addEventListener("click", function (e) {
        StKonversi = 4;

        if (kodeKonversi.value === "") {
            Swal.fire({
                icon: "error",
                text: "Pilih dulu Kd.Konversinya!!!..",
            });
        } else {
            var tableAsal = $("#tableAsal").DataTable();
            Swal.fire({
                icon: "info",
                text:
                    "Isi Data Tujuan Konversi, dng Kd.Konversi:  " +
                    kodeKonversi.value,
            }).then(() => {
                var tgl = new Date(Tgl);

                var year = tgl.getFullYear();
                var month = (tgl.getMonth() + 1).toString().padStart(2, "0");
                var day = tgl.getDate().toString().padStart(2, "0");

                var formattedDate = `${year}-${month}-${day}`;

                tanggalAsal.value = formattedDate;
                jml = 0;
                divisiIdAsal.value = divisiId.value;
                divisiNamaAsal.value = divisiNama.value;
                uraianAsal.value = "Tujuan Konversi";
                KodeKonversiAsal = kodeKonversi.value;

                tableAsal
                    .rows()
                    .data()
                    .each(function (value, index) {
                        KdKonvArr[jml] = value[0];
                        IdTypeArr[jml] = value[8];
                        jml += 1;
                    });

                $("#modalAsalKonversi").modal("show");
                $("#modalAsalKonversi").off("shown.bs.modal").on("shown.bs.modal", function () {
                    console.log("shown.bs.modal3");

                    btn_objek.focus();
                    asalAtauTujuan.innerHTML = "Tujuan Konversi";
                    $(".kodeTujuan").show();
                    $(".kodeAsal").hide();
                    fetchDataObjek("/getObjekSelect/" + divisiId.value);
                });
            });
        }

        $("#modalAsalKonversi").on("hidden.bs.modal", function () {
            if (fetchController) {
                fetchController.abort();
                fetchController = null;
            }
            $(this).find("input").val("");
            objekSelect.val(null).trigger("change");
            kelompokUtamaSelect.val(null).trigger("change");
            kelompokSelect.val(null).trigger("change");
            subKelompokSelect.val(null).trigger("change");
            idtypeSelect.val(null).trigger("change");
            idtype2Select.val(null).trigger("change");
            // namaTypeSelect.val(null).trigger("change");
            hargaSatuan.value = 0;
            hargaSatuanDiv.style.display = "none";
            primerKonversiAsal.value = 0;
            sekunderKonversiAsal.value = 0;
            triterKonversiAsal.value = 0;
        });

        // $("#modalAsalKonversi").on("hidden.bs.modal", function () {
        //     $(this).find("input").val("");
        //     primerKonversiAsal.value = 0;
        //     sekunderKonversiAsal.value = 0;
        //     triterKonversiAsal.value = 0;
        // });
    });

    btnKoreksiAsal.addEventListener("click", function (e) {
        StKonversi = 2;

        if (kodeAsal.value === "") {
            Swal.fire({
                icon: "error",
                text: "Pilih dulu data yg dikoreksi!!.. tandai dng klik salah satu data di tabel!!..",
            });
            return;
        } else {
            divisiIdAsal.value = divisiId.value;
            divisiNamaAsal.value = divisiNama.value;
            uraianAsal.value = "Asal Konversi";
            IdTranAsal = kodeAsal.value;

            $.ajax({
                type: "GET",
                url: "KonversiBarang/getStatusKonversi",
                data: {
                    XIdTransaksi: IdTranAsal,
                    _token: csrfToken,
                },
                success: function (result) {
                    if (result.length !== 0) {
                        const saatawal = new Date(result[0].Saatawaltransaksi);

                        const yyyy = saatawal.getFullYear();
                        const mm = String(saatawal.getMonth() + 1).padStart(
                            2,
                            "0",
                        );
                        const dd = String(saatawal.getDate()).padStart(2, "0");

                        tanggalAsal.value = `${yyyy}-${mm}-${dd}`;

                        divisiIdAsal.value = decodeHtmlEntities(
                            result[0].IdDivisi,
                        );
                        divisiNamaAsal.value = decodeHtmlEntities(
                            result[0].NamaDivisi,
                        );

                        // fetchDataObjek("/getObjekSelect/" + divisiIdAsal.value); // prettier-ignore
                        // fetchDataKelUt("/getKelompokUtamaSelect/" + result[0].IdObjek, result[0].IdKelompokUtama); // prettier-ignore
                        // fetchDataKelompok("/getKelompokSelect/" + result[0].IdKelompokUtama, result[0].IdKelompok); // prettier-ignore
                        // fetchDataSubKelompok("/getSubKelompokSelect/" + result[0].IdKelompok, result[0].IdSubkelompok); // prettier-ignore
                        fetchDataObjek(
                            "/getObjekSelect/" + divisiIdAsal.value,
                        ).then(() => {
                            objekSelect
                                .val(result[0].IdObjek)
                                .trigger("change.select2");
                            fetchDataKelUt(
                                "/getKelompokUtamaSelect/" + result[0].IdObjek,
                            ).then(() => {
                                kelompokUtamaSelect
                                    .val(result[0].IdKelompokUtama)
                                    .trigger("change");
                                fetchDataKelompok(
                                    "/getKelompokSelect/" +
                                        result[0].IdKelompokUtama,
                                ).then(() => {
                                    kelompokSelect
                                        .val(result[0].IdKelompok)
                                        .trigger("change");
                                    fetchDataSubKelompok(
                                        "/getSubKelompokSelect/" +
                                            result[0].IdKelompok,
                                    ).then(() => {
                                        subKelompokSelect
                                            .val(result[0].IdSubkelompok)
                                            .trigger("change");
                                    });
                                });
                            });
                        });
                        primerKonversiAsal.value = formatNumber(
                            result[0].JumlahPengeluaranPrimer,
                        );
                        sekunderKonversiAsal.value = formatNumber(
                            result[0].JumlahPengeluaranSekunder,
                        );
                        triterKonversiAsal.value = formatNumber(
                            result[0].JumlahPengeluaranTritier,
                        );

                        // Get_Saldo(kodeTypeAsal.value);
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            });

            $("#modalAsalKonversi").modal("show");

            $("#modalAsalKonversi")
                .off("shown.bs.modal")
                .on("shown.bs.modal", function () {
                    console.log("shown.bs.modal4");

                    asalAtauTujuan.innerHTML = "Asal Konversi";
                    $(".kodeTujuan").hide();
                    $(".kodeAsal").show();
                    $("#primerKonversiAsal").focus();
                });

            $("#modalAsalKonversi").on("hidden.bs.modal", function () {
                if (fetchController) {
                    fetchController.abort();
                    fetchController = null;
                }
                $(this).find("input").val("");
                objekSelect.val(null).trigger("change");
                kelompokUtamaSelect.val(null).trigger("change");
                kelompokSelect.val(null).trigger("change");
                subKelompokSelect.val(null).trigger("change");
                idtypeSelect.val(null).trigger("change");
                idtype2Select.val(null).trigger("change");
                // namaTypeSelect.val(null).trigger("change");
                hargaSatuan.value = 0;
                hargaSatuanDiv.style.display = "none";
                primerKonversiAsal.value = 0;
                sekunderKonversiAsal.value = 0;
                triterKonversiAsal.value = 0;
            });

            // $("#modalAsalKonversi").on("hidden.bs.modal", function () {
            //     $(this).find("input").val("");
            //     primerKonversiAsal.value = 0;
            //     sekunderKonversiAsal.value = 0;
            //     triterKonversiAsal.value = 0;
            // });
        }
    });

    btnKoreksiTujuan.addEventListener("click", function (e) {
        StKonversi = 5;

        if (kodeTujuan.value === "") {
            Swal.fire({
                icon: "error",
                text: "Pilih dulu data yg dikoreksi!!.. tandai dng klik salah satu data di tabel!!..",
            });
            return;
        } else {
            divisiIdAsal.value = divisiId.value;
            divisiNamaAsal.value = divisiNama.value;
            uraianAsal.value = "Tujuan Konversi";
            IdTranTujuan = kodeTujuan.value;
            hargaSatuanDiv.style.display = "block";
            $.ajax({
                type: "GET",
                url: "KonversiBarang/getStatusKonversiTujuan",
                data: {
                    XIdTransaksi: IdTranTujuan,
                    _token: csrfToken,
                },
                success: function (result) {
                    console.log(result);
                    if (result.length !== 0) {
                        const saatawal = new Date(result[0].SaatAwalTransaksi);

                        const yyyy = saatawal.getFullYear();
                        const mm = String(saatawal.getMonth() + 1).padStart(
                            2,
                            "0",
                        );
                        const dd = String(saatawal.getDate()).padStart(2, "0");

                        tanggalAsal.value = `${yyyy}-${mm}-${dd}`;

                        divisiIdAsal.value = decodeHtmlEntities(
                            result[0].IdDivisi,
                        );
                        divisiNamaAsal.value = decodeHtmlEntities(
                            result[0].NamaDivisi,
                        );

                        fetchDataObjek(
                            "/getObjekSelect/" + divisiIdAsal.value,
                        ).then(() => {
                            objekSelect
                                .val(result[0].IdObjek)
                                .trigger("change.select2");
                            fetchDataKelUt(
                                "/getKelompokUtamaSelect/" + result[0].IdObjek,
                            ).then(() => {
                                kelompokUtamaSelect
                                    .val(result[0].IdKelompokUtama)
                                    .trigger("change");
                                fetchDataKelompok(
                                    "/getKelompokSelect/" +
                                        result[0].IdKelompokUtama,
                                ).then(() => {
                                    kelompokSelect
                                        .val(result[0].IdKelompok)
                                        .trigger("change");
                                    fetchDataSubKelompok(
                                        "/getSubKelompokSelect/" +
                                            result[0].IdKelompok,
                                    ).then(() => {
                                        subKelompokSelect
                                            .val(result[0].IdSubkelompok)
                                            .trigger("change");
                                    });
                                });
                            });
                        });

                        primerKonversiAsal.value = formatNumber(
                            result[0].JumlahPemasukanPrimer,
                        );
                        hargaSatuan.value = formatNumber(result[0].HargaSatuan);
                        sekunderKonversiAsal.value = formatNumber(
                            result[0].JumlahPemasukanSekunder,
                        );
                        triterKonversiAsal.value = formatNumber(
                            result[0].JumlahPemasukanTritier,
                        );

                        // Get_Saldo(kodeTypeAsal.value);
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            });

            $("#modalAsalKonversi").modal("show");

            $("#modalAsalKonversi")
                .off("shown.bs.modal")
                .on("shown.bs.modal", function () {
                    asalAtauTujuan.innerHTML = "Tujuan Konversi";
                    $(".kodeAsal").hide();
                    $(".kodeTujuan").show();
                    $("#primerKonversiAsal").focus();
                });

            $("#modalAsalKonversi").on("hidden.bs.modal", function () {
                $(this).find("input").val("");
                primerKonversiAsal.value = 0;
                sekunderKonversiAsal.value = 0;
                triterKonversiAsal.value = 0;
            });
        }
    });

    btnHapusAsal.addEventListener("click", function (e) {
        StKonversi = 3;

        if (kodeAsal.value === "") {
            Swal.fire({
                icon: "error",
                text: "Pilih dulu data yg dihapus!!.. tandai dng klik salah satu data di tabel!!..",
            });
            return;
        } else {
            divisiIdAsal.value = divisiId.value;
            divisiNamaAsal.value = divisiNama.value;
            uraianAsal.value = "Asal Konversi";
            IdTranAsal = kodeAsal.value;
            $.ajax({
                type: "GET",
                url: "KonversiBarang/getStatusKonversi",
                data: {
                    XIdTransaksi: IdTranAsal,
                    _token: csrfToken,
                },
                success: function (result) {
                    if (result.length !== 0) {
                        const saatawal = new Date(result[0].Saatawaltransaksi);

                        const yyyy = saatawal.getFullYear();
                        const mm = String(saatawal.getMonth() + 1).padStart(
                            2,
                            "0",
                        );
                        const dd = String(saatawal.getDate()).padStart(2, "0");

                        tanggalAsal.value = `${yyyy}-${mm}-${dd}`;

                        divisiIdAsal.value = decodeHtmlEntities(
                            result[0].IdDivisi,
                        );
                        divisiNamaAsal.value = decodeHtmlEntities(
                            result[0].NamaDivisi,
                        );

                        fetchDataObjek("/getObjekSelect/" + divisiIdAsal.value); // prettier-ignore
                        fetchDataKelUt("/getKelompokUtamaSelect/" + result[0].IdObjek, result[0].IdKelompokUtama); // prettier-ignore
                        fetchDataKelompok("/getKelompokSelect/" + result[0].IdKelompokUtama, result[0].IdKelompok); // prettier-ignore
                        fetchDataSubKelompok("/getSubKelompokSelect/" + result[0].IdKelompok, result[0].IdSubkelompok); // prettier-ignore
                        // objekIdAsal.value = decodeHtmlEntities(
                        //     result[0].IdObjek
                        // );
                        // objekNamaAsal.value = decodeHtmlEntities(
                        //     result[0].NamaObjek
                        // );
                        // kelutIdAsal.value = decodeHtmlEntities(
                        //     result[0].IdKelompokUtama
                        // );
                        // kelutNamaAsal.value = decodeHtmlEntities(
                        //     result[0].NamaKelompokUtama
                        // );
                        // kelompokIdAsal.value = decodeHtmlEntities(
                        //     result[0].IdKelompok
                        // );
                        // kelompokNamaAsal.value = decodeHtmlEntities(
                        //     result[0].NamaKelompok
                        // );
                        // subkelIdAsal.value = decodeHtmlEntities(
                        //     result[0].IdSubkelompok
                        // );
                        // subkelNamaAsal.value = decodeHtmlEntities(
                        //     result[0].NamaSubKelompok
                        // );
                        // kodeTypeAsal.value = decodeHtmlEntities(
                        //     result[0].IdType
                        // );
                        // namaTypeAsal.value = decodeHtmlEntities(
                        //     result[0].NamaType
                        // );
                        // uraianAsal.value = decodeHtmlEntities(
                        //     result[0].UraianDetailTransaksi
                        // );
                        // // primerAkhirAsal.value = 0;
                        // // sekunderAkhirAsal.value = 0;
                        // // triterAkhirAsal.value = 0;
                        primerKonversiAsal.value = formatNumber(
                            result[0].JumlahPengeluaranPrimer,
                        );
                        sekunderKonversiAsal.value = formatNumber(
                            result[0].JumlahPengeluaranSekunder,
                        );
                        triterKonversiAsal.value = formatNumber(
                            result[0].JumlahPengeluaranTritier,
                        );

                        // Get_Saldo(kodeTypeAsal.value);
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            });

            $("#modalAsalKonversi").modal("show");

            $("#modalAsalKonversi").on("shown.bs.modal", function () {
                console.log("shown.bs.modal6");

                asalAtauTujuan.innerHTML = "Asal Konversi";

                $(".kodeTujuan").hide();
                $(".kodeAsal").show();
                btn_prosesAsal.disabled = false;
                btn_prosesAsal.focus();
            });

            $("#modalAsalKonversi").on("hidden.bs.modal", function () {
                if (fetchController) {
                    fetchController.abort();
                    fetchController = null;
                }
                $(this).find("input").val("");
                objekSelect.val(null).trigger("change");
                kelompokUtamaSelect.val(null).trigger("change");
                kelompokSelect.val(null).trigger("change");
                subKelompokSelect.val(null).trigger("change");
                idtypeSelect.val(null).trigger("change");
                idtype2Select.val(null).trigger("change");
                // namaTypeSelect.val(null).trigger("change");
                hargaSatuan.value = 0;
                hargaSatuanDiv.style.display = "none";
                primerKonversiAsal.value = 0;
                sekunderKonversiAsal.value = 0;
                triterKonversiAsal.value = 0;
            });

            // $("#modalAsalKonversi").on("hidden.bs.modal", function () {
            //     $(this).find("input").val("");
            //     primerKonversiAsal.value = 0;
            //     sekunderKonversiAsal.value = 0;
            //     triterKonversiAsal.value = 0;
            // });
        }
    });

    btnHapusTujuan.addEventListener("click", function (e) {
        StKonversi = 6;

        if (kodeTujuan.value === "") {
            Swal.fire({
                icon: "error",
                text: "Pilih dulu data yg dihapus!!.. tandai dgn klik salah satu data di tabel!!..",
            });
            return;
        } else {
            divisiIdAsal.value = divisiId.value;
            divisiNamaAsal.value = divisiNama.value;
            uraianAsal.value = "Tujuan Konversi";
            IdTranTujuan = kodeTujuan.value;
            $.ajax({
                type: "GET",
                url: "KonversiBarang/getStatusKonversiTujuan",
                data: {
                    XIdTransaksi: IdTranTujuan,
                    _token: csrfToken,
                },
                success: function (result) {
                    if (result.length !== 0) {
                        const saatawal = new Date(result[0].SaatAwalTransaksi);

                        const yyyy = saatawal.getFullYear();
                        const mm = String(saatawal.getMonth() + 1).padStart(
                            2,
                            "0",
                        );
                        const dd = String(saatawal.getDate()).padStart(2, "0");

                        tanggalAsal.value = `${yyyy}-${mm}-${dd}`;

                        divisiIdAsal.value = decodeHtmlEntities(
                            result[0].IdDivisi,
                        );
                        divisiNamaAsal.value = decodeHtmlEntities(
                            result[0].NamaDivisi,
                        );

                        fetchDataObjek("/getObjekSelect/" + divisiIdAsal.value); // prettier-ignore
                        fetchDataKelUt("/getKelompokUtamaSelect/" + result[0].IdObjek, result[0].IdKelompokUtama); // prettier-ignore
                        fetchDataKelompok("/getKelompokSelect/" + result[0].IdKelompokUtama, result[0].IdKelompok); // prettier-ignore
                        fetchDataSubKelompok("/getSubKelompokSelect/" + result[0].IdKelompok, result[0].IdSubkelompok); // prettier-ignore
                        // objekIdAsal.value = decodeHtmlEntities(
                        //     result[0].IdObjek
                        // );
                        // objekNamaAsal.value = decodeHtmlEntities(
                        //     result[0].NamaObjek
                        // );
                        // kelutIdAsal.value = decodeHtmlEntities(
                        //     result[0].IdKelompokUtama
                        // );
                        // kelutNamaAsal.value = decodeHtmlEntities(
                        //     result[0].NamaKelompokUtama
                        // );
                        // kelompokIdAsal.value = decodeHtmlEntities(
                        //     result[0].IdKelompok
                        // );
                        // kelompokNamaAsal.value = decodeHtmlEntities(
                        //     result[0].NamaKelompok
                        // );
                        // subkelIdAsal.value = decodeHtmlEntities(
                        //     result[0].IdSubkelompok
                        // );
                        // subkelNamaAsal.value = decodeHtmlEntities(
                        //     result[0].NamaSubKelompok
                        // );
                        // kodeTypeAsal.value = decodeHtmlEntities(
                        //     result[0].IdType
                        // );
                        // namaTypeAsal.value = decodeHtmlEntities(
                        //     result[0].NamaType
                        // );
                        // uraianAsal.value = decodeHtmlEntities(
                        //     result[0].UraianDetailTransaksi
                        // );
                        // // primerAkhirAsal.value = 0;
                        // // sekunderAkhirAsal.value = 0;
                        // // triterAkhirAsal.value = 0;
                        primerKonversiAsal.value = formatNumber(
                            result[0].JumlahPemasukanPrimer,
                        );
                        sekunderKonversiAsal.value = formatNumber(
                            result[0].JumlahPemasukanSekunder,
                        );
                        triterKonversiAsal.value = formatNumber(
                            result[0].JumlahPemasukanTritier,
                        );

                        // Get_Saldo(kodeTypeAsal.value);
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            });

            $("#modalAsalKonversi").modal("show");

            $("#modalAsalKonversi").on("shown.bs.modal", function () {
                console.log("shown.bs.modal7");
                asalAtauTujuan.innerHTML = "Tujuan Konversi";
                $(".kodeAsal").hide();
                $(".kodeTujuan").show();
                btn_prosesAsal.disabled = false;
                btn_prosesAsal.focus();
            });

            $("#modalAsalKonversi").on("hidden.bs.modal", function () {
                $(this).find("input").val("");
                hargaSatuan.value = 0;
                hargaSatuanDiv.style.display = "none";
                primerKonversiAsal.value = 0;
                sekunderKonversiAsal.value = 0;
                triterKonversiAsal.value = 0;
            });
        }
    });

    btn_prosesAsal.addEventListener("click", function (e) {
        if (tanggalAsal.value > today) {
            Swal.fire({
                icon: "error",
                text: "Tanggal Tidak Boleh Lebih Besar Dari Tanggal Sekarang",
            }).then(() => {
                tanggalAsal.focus();
            });
            return;
        }

        if (
            parseFloat(triterKonversiAsal.value) === 0 &&
            divisiIdAsal.value !== "CIR"
        ) {
            Swal.fire({
                icon: "error",
                text: "Jumlah Tritier tidak boleh Nol!!!...",
            }).then(() => {
                triterKonversiAsal.focus();
                triterKonversiAsal.select();
            });
            return;
        } else {
            if (StKonversi === 1) {
                if (IsiAsal === 1) {
                    $.ajax({
                        type: "PUT",
                        url: "KonversiBarang/prosesIsiAsal",
                        data: {
                            XUraianDetailTransaksi: uraianAsal.value,
                            XIdType: idtypeSelect.val(),
                            XSaatAwalTransaksi: tanggalAsal.value,
                            XJumlahKeluarPrimer: primerKonversiAsal.value,
                            XJumlahKeluarSekunder: sekunderKonversiAsal.value,
                            XJumlahKeluarTritier: triterKonversiAsal.value,
                            XAsalSubKel: subKelompokSelect.val(),
                            _token: csrfToken,
                        },
                        success: function (response) {
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success",
                                    text: response.success,
                                    returnFocus: false, // Mencegah pengembalian fokus ke elemen sebelumnya
                                    didOpen: (popup) => {
                                        popup
                                            .querySelector(".swal2-confirm")
                                            .focus(); // Fokus ke tombol OK
                                    },
                                });
                                $("#modalAsalKonversi").modal("hide");

                                $("#modalAsalKonversi").on(
                                    "hidden.bs.modal",
                                    function () {
                                        if (fetchController) {
                                            fetchController.abort();
                                            fetchController = null;
                                        }
                                        $(this).find("input").val("");
                                        objekSelect.val(null).trigger("change");
                                        kelompokUtamaSelect
                                            .val(null)
                                            .trigger("change");
                                        kelompokSelect
                                            .val(null)
                                            .trigger("change");
                                        subKelompokSelect
                                            .val(null)
                                            .trigger("change");
                                        idtypeSelect
                                            .val(null)
                                            .trigger("change");
                                        idtype2Select
                                            .val(null)
                                            .trigger("change");
                                        // namaTypeSelect.val(null).trigger("change");
                                        hargaSatuan.value = 0;
                                        hargaSatuanDiv.style.display = "none";
                                        primerKonversiAsal.value = 0;
                                        sekunderKonversiAsal.value = 0;
                                        triterKonversiAsal.value = 0;
                                    },
                                );

                                // $("#modalAsalKonversi").on(
                                //     "hidden.bs.modal",
                                //     function () {
                                //         $(this).find("input").val("");
                                //         primerKonversiAsal.value = 0;
                                //         sekunderKonversiAsal.value = 0;
                                //         triterKonversiAsal.value = 0;
                                //     }
                                // );

                                btn_prosesAsal.disabled = true;

                                Load_DataKonversi();
                                Load_Data_All_Asal();
                                Load_Data_All_Tujuan();
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                        },
                    });
                } else if (IsiAsal === 2) {
                    $.ajax({
                        type: "PUT",
                        url: "KonversiBarang/prosesIsi2Asal",
                        data: {
                            XUraianDetailTransaksi: uraianAsal.value,
                            XIdType: idtypeSelect.val(),
                            XSaatAwalTransaksi: tanggalAsal.value,
                            XJumlahKeluarPrimer: primerKonversiAsal.value,
                            XJumlahKeluarSekunder: sekunderKonversiAsal.value,
                            XJumlahKeluarTritier: triterKonversiAsal.value,
                            XAsalSubKel: subKelompokSelect.val(),
                            XIdKonversi: kodeKonversi.value,
                            _token: csrfToken,
                        },
                        success: function (response) {
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success",
                                    text: response.success,
                                    returnFocus: false, // Mencegah pengembalian fokus ke elemen sebelumnya
                                    didOpen: (popup) => {
                                        popup
                                            .querySelector(".swal2-confirm")
                                            .focus(); // Fokus ke tombol OK
                                    },
                                });
                                $("#modalAsalKonversi").modal("hide");

                                $("#modalAsalKonversi").on(
                                    "hidden.bs.modal",
                                    function () {
                                        if (fetchController) {
                                            fetchController.abort();
                                            fetchController = null;
                                        }
                                        $(this).find("input").val("");
                                        objekSelect.val(null).trigger("change");
                                        kelompokUtamaSelect
                                            .val(null)
                                            .trigger("change");
                                        kelompokSelect
                                            .val(null)
                                            .trigger("change");
                                        subKelompokSelect
                                            .val(null)
                                            .trigger("change");
                                        idtypeSelect
                                            .val(null)
                                            .trigger("change");
                                        idtype2Select
                                            .val(null)
                                            .trigger("change");
                                        // namaTypeSelect.val(null).trigger("change");
                                        hargaSatuan.value = 0;
                                        hargaSatuanDiv.style.display = "none";
                                        primerKonversiAsal.value = 0;
                                        sekunderKonversiAsal.value = 0;
                                        triterKonversiAsal.value = 0;
                                    },
                                );

                                // $("#modalAsalKonversi").on(
                                //     "hidden.bs.modal",
                                //     function () {
                                //         $(this).find("input").val("");
                                //         primerKonversiAsal.value = 0;
                                //         sekunderKonversiAsal.value = 0;
                                //         triterKonversiAsal.value = 0;
                                //     }
                                // );

                                btn_prosesAsal.disabled = true;

                                clearText();
                                if (kodeKonversi.value === "") {
                                    Load_DataKonversi();
                                    Load_Data_All_Asal();
                                    Load_Data_All_Tujuan();
                                } else {
                                    Load_DataAsal();
                                    Load_DataTujuan();
                                }
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                        },
                    });
                }
            } else if (StKonversi === 2) {
                $.ajax({
                    type: "PUT",
                    url: "KonversiBarang/prosesUpdateAsal",
                    data: {
                        XIdTransaksi: IdTranAsal,
                        XIdType: idtype2Select.val(),
                        XUraianDetaiLTransaksi: uraianAsal.value,
                        XJumlahKeluarPrimer: primerKonversiAsal.value,
                        XJumlahKeluarSekunder: sekunderKonversiAsal.value,
                        XJumlahKeluarTritier: triterKonversiAsal.value,
                        _token: csrfToken,
                    },
                    success: function (response) {
                        if (response.success) {
                            Swal.fire({
                                icon: "success",
                                title: "Success",
                                text: response.success,
                                returnFocus: false, // Mencegah pengembalian fokus ke elemen sebelumnya
                                didOpen: (popup) => {
                                    popup
                                        .querySelector(".swal2-confirm")
                                        .focus(); // Fokus ke tombol OK
                                },
                            });
                            $("#modalAsalKonversi").modal("hide");

                            $("#modalAsalKonversi").on(
                                "hidden.bs.modal",
                                function () {
                                    if (fetchController) {
                                        fetchController.abort();
                                        fetchController = null;
                                    }
                                    $(this).find("input").val("");
                                    objekSelect.val(null).trigger("change");
                                    kelompokUtamaSelect
                                        .val(null)
                                        .trigger("change");
                                    kelompokSelect.val(null).trigger("change");
                                    subKelompokSelect
                                        .val(null)
                                        .trigger("change");
                                    idtypeSelect.val(null).trigger("change");
                                    idtype2Select.val(null).trigger("change");
                                    // namaTypeSelect.val(null).trigger("change");
                                    hargaSatuan.value = 0;
                                    hargaSatuanDiv.style.display = "none";
                                    primerKonversiAsal.value = 0;
                                    sekunderKonversiAsal.value = 0;
                                    triterKonversiAsal.value = 0;
                                },
                            );

                            // $("#modalAsalKonversi").on(
                            //     "hidden.bs.modal",
                            //     function () {
                            //         $(this).find("input").val("");
                            //         primerKonversiAsal.value = 0;
                            //         sekunderKonversiAsal.value = 0;
                            //         triterKonversiAsal.value = 0;
                            //     }
                            // );

                            btn_prosesAsal.disabled = true;

                            clearText();
                            if (kodeKonversi.value === "") {
                                Load_DataKonversi();
                                Load_Data_All_Asal();
                                Load_Data_All_Tujuan();
                            } else {
                                Load_DataAsal();
                                Load_DataTujuan();
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
            } else if (StKonversi === 3) {
                $.ajax({
                    type: "DELETE",
                    url: "KonversiBarang/prosesDeleteAsal",
                    data: {
                        XIdTransaksi: IdTranAsal,
                        _token: csrfToken,
                    },
                    success: function (response) {
                        if (response.success) {
                            Swal.fire({
                                icon: "success",
                                title: "Success",
                                text: response.success,
                                returnFocus: false, // Mencegah pengembalian fokus ke elemen sebelumnya
                                didOpen: (popup) => {
                                    popup
                                        .querySelector(".swal2-confirm")
                                        .focus(); // Fokus ke tombol OK
                                },
                            });
                            $("#modalAsalKonversi").modal("hide");

                            $("#modalAsalKonversi").on(
                                "hidden.bs.modal",
                                function () {
                                    if (fetchController) {
                                        fetchController.abort();
                                        fetchController = null;
                                    }
                                    $(this).find("input").val("");
                                    objekSelect.val(null).trigger("change");
                                    kelompokUtamaSelect
                                        .val(null)
                                        .trigger("change");
                                    kelompokSelect.val(null).trigger("change");
                                    subKelompokSelect
                                        .val(null)
                                        .trigger("change");
                                    idtypeSelect.val(null).trigger("change");
                                    idtype2Select.val(null).trigger("change");
                                    // namaTypeSelect.val(null).trigger("change");
                                    hargaSatuan.value = 0;
                                    hargaSatuanDiv.style.display = "none";
                                    primerKonversiAsal.value = 0;
                                    sekunderKonversiAsal.value = 0;
                                    triterKonversiAsal.value = 0;
                                },
                            );

                            // $("#modalAsalKonversi").on(
                            //     "hidden.bs.modal",
                            //     function () {
                            //         $(this).find("input").val("");
                            //         primerKonversiAsal.value = 0;
                            //         sekunderKonversiAsal.value = 0;
                            //         triterKonversiAsal.value = 0;
                            //     }
                            // );

                            btn_prosesAsal.disabled = true;

                            clearText();
                            Load_DataKonversi();
                            Load_Data_All_Asal();
                            Load_Data_All_Tujuan();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
            } else if (StKonversi === 4) {
                let belom = 0;

                for (let i = 0; i < jml; i++) {
                    if (
                        KdKonvArr[i] === kodeKonversi &&
                        IdTypeArr[i] === kodeTypeAsal.value
                    ) {
                        Swal.fire({
                            icon: "error",
                            text: "Type Yang Dimasukkan Sudah Ada Pada Asal Konversi !!",
                        });
                        belom = 1;
                        return;
                    }
                }

                if (belom !== 1) {
                    // $.ajax({
                    //     type: "PUT",
                    //     url: "KonversiBarang/insPersediaan",
                    //     data: {
                    //         _token: csrfToken,
                    //         XIdType: idtype2Select.val(),
                    //         XJumlahMasukTritier: triterKonversiAsal.value,
                    //         hargaSatuan: hargaSatuan.value,
                    //     },
                    //     success: function (result) {
                    //     },
                    //     error: function (xhr, status, error) {
                    //         console.error("Error:", error);
                    //     },
                    // });
                    $.ajax({
                        type: "PUT",
                        url: "KonversiBarang/prosesIsiTujuan",
                        data: {
                            XUraianDetailTransaksi: uraianAsal.value,
                            XIdType: idtype2Select.val(),
                            XSaatAwalTransaksi: tanggalAsal.value,
                            XJumlahMasukPrimer: primerKonversiAsal.value,
                            XJumlahMasukSekunder: sekunderKonversiAsal.value,
                            XJumlahMasukTritier: triterKonversiAsal.value,
                            XTujuanSubKel: subKelompokSelect.val(),
                            XIdKonversi: kodeKonversi.value,
                            hargaSatuan: hargaSatuan.value,
                            _token: csrfToken,
                        },
                        success: function (response) {
                            if (response.success) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success",
                                    text: response.success,
                                    returnFocus: false, // Mencegah pengembalian fokus ke elemen sebelumnya
                                    didOpen: (popup) => {
                                        popup
                                            .querySelector(".swal2-confirm")
                                            .focus(); // Fokus ke tombol OK
                                    },
                                });
                                $("#modalAsalKonversi").modal("hide");

                                $("#modalAsalKonversi").on(
                                    "hidden.bs.modal",
                                    function () {
                                        if (fetchController) {
                                            fetchController.abort();
                                            fetchController = null;
                                        }
                                        $(this).find("input").val("");
                                        objekSelect.val(null).trigger("change");
                                        kelompokUtamaSelect
                                            .val(null)
                                            .trigger("change");
                                        kelompokSelect
                                            .val(null)
                                            .trigger("change");
                                        subKelompokSelect
                                            .val(null)
                                            .trigger("change");
                                        idtypeSelect
                                            .val(null)
                                            .trigger("change");
                                        idtype2Select
                                            .val(null)
                                            .trigger("change");
                                        // namaTypeSelect.val(null).trigger("change");
                                        hargaSatuan.value = 0;
                                        hargaSatuanDiv.style.display = "none";
                                        primerKonversiAsal.value = 0;
                                        sekunderKonversiAsal.value = 0;
                                        triterKonversiAsal.value = 0;
                                    },
                                );

                                // $("#modalAsalKonversi").on(
                                //     "hidden.bs.modal",
                                //     function () {
                                //         $(this).find("input").val("");
                                //         primerKonversiAsal.value = 0;
                                //         sekunderKonversiAsal.value = 0;
                                //         triterKonversiAsal.value = 0;
                                //     }
                                // );

                                btn_prosesAsal.disabled = true;

                                clearText();
                                if (kodeKonversi.value === "") {
                                    Load_DataKonversi();
                                    Load_Data_All_Asal();
                                    Load_Data_All_Tujuan();
                                } else {
                                    Load_DataAsal();
                                    Load_DataTujuan();
                                }
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error:", error);
                        },
                    });
                }
            } else if (StKonversi === 5) {
                $.ajax({
                    type: "PUT",
                    url: "KonversiBarang/prosesUpdateTujuan",
                    data: {
                        XIdTransaksi: IdTranTujuan,
                        XIdType: idtype2Select.val(),
                        XUraianDetaiLTransaksi: uraianAsal.value,
                        XJumlahKeluarPrimer: primerKonversiAsal.value,
                        XJumlahKeluarSekunder: sekunderKonversiAsal.value,
                        XJumlahKeluarTritier: triterKonversiAsal.value,
                        hargaSatuan: hargaSatuan.value,
                        _token: csrfToken,
                    },
                    success: function (response) {
                        if (response.success) {
                            Swal.fire({
                                icon: "success",
                                title: "Success",
                                text: response.success,
                                returnFocus: false, // Mencegah pengembalian fokus ke elemen sebelumnya
                                didOpen: (popup) => {
                                    popup
                                        .querySelector(".swal2-confirm")
                                        .focus(); // Fokus ke tombol OK
                                },
                            });
                            $("#modalAsalKonversi").modal("hide");

                            $("#modalAsalKonversi").on(
                                "hidden.bs.modal",
                                function () {
                                    if (fetchController) {
                                        fetchController.abort();
                                        fetchController = null;
                                    }
                                    $(this).find("input").val("");
                                    objekSelect.val(null).trigger("change");
                                    kelompokUtamaSelect
                                        .val(null)
                                        .trigger("change");
                                    kelompokSelect.val(null).trigger("change");
                                    subKelompokSelect
                                        .val(null)
                                        .trigger("change");
                                    idtypeSelect.val(null).trigger("change");
                                    idtype2Select.val(null).trigger("change");
                                    // namaTypeSelect.val(null).trigger("change");
                                    hargaSatuan.value = 0;
                                    hargaSatuanDiv.style.display = "none";
                                    primerKonversiAsal.value = 0;
                                    sekunderKonversiAsal.value = 0;
                                    triterKonversiAsal.value = 0;
                                },
                            );

                            // $("#modalAsalKonversi").on(
                            //     "hidden.bs.modal",
                            //     function () {
                            //         $(this).find("input").val("");
                            //         primerKonversiAsal.value = 0;
                            //         sekunderKonversiAsal.value = 0;
                            //         triterKonversiAsal.value = 0;
                            //     }
                            // );

                            btn_prosesAsal.disabled = true;

                            clearText();
                            if (kodeKonversi.value === "") {
                                Load_DataKonversi();
                                Load_Data_All_Asal();
                                Load_Data_All_Tujuan();
                            } else {
                                Load_DataAsal();
                                Load_DataTujuan();
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
            } else if (StKonversi === 6) {
                $.ajax({
                    type: "DELETE",
                    url: "KonversiBarang/prosesDeleteTujuan",
                    data: {
                        XIdTransaksi: IdTranTujuan,
                        _token: csrfToken,
                    },
                    success: function (response) {
                        if (response.success) {
                            Swal.fire({
                                icon: "success",
                                title: "Success",
                                text: response.success,
                                returnFocus: false, // Mencegah pengembalian fokus ke elemen sebelumnya
                                didOpen: (popup) => {
                                    popup
                                        .querySelector(".swal2-confirm")
                                        .focus(); // Fokus ke tombol OK
                                },
                            });
                            $("#modalAsalKonversi").modal("hide");

                            $("#modalAsalKonversi").on(
                                "hidden.bs.modal",
                                function () {
                                    if (fetchController) {
                                        fetchController.abort();
                                        fetchController = null;
                                    }
                                    $(this).find("input").val("");
                                    objekSelect.val(null).trigger("change");
                                    kelompokUtamaSelect
                                        .val(null)
                                        .trigger("change");
                                    kelompokSelect.val(null).trigger("change");
                                    subKelompokSelect
                                        .val(null)
                                        .trigger("change");
                                    idtypeSelect.val(null).trigger("change");
                                    idtype2Select.val(null).trigger("change");
                                    // namaTypeSelect.val(null).trigger("change");
                                    hargaSatuan.value = 0;
                                    hargaSatuanDiv.style.display = "none";
                                    primerKonversiAsal.value = 0;
                                    sekunderKonversiAsal.value = 0;
                                    triterKonversiAsal.value = 0;
                                },
                            );

                            // $("#modalAsalKonversi").on(
                            //     "hidden.bs.modal",
                            //     function () {
                            //         $(this).find("input").val("");
                            //         primerKonversiAsal.value = 0;
                            //         sekunderKonversiAsal.value = 0;
                            //         triterKonversiAsal.value = 0;
                            //     }
                            // );

                            btn_prosesAsal.disabled = true;

                            clearText();
                            Load_DataKonversi();
                            Load_Data_All_Asal();
                            Load_Data_All_Tujuan();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
            }
        }
    });

    $("#primerKonversiAsal").on("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();

            if (StKonversi === 1 || StKonversi === 2) {
                $.ajax({
                    type: "GET",
                    url: "KonversiBarang/getJumlahAntrian",
                    data: {
                        IdType: idtypeSelect.val() ?? idtype2Select.val(),
                        _token: csrfToken,
                    },
                    success: function (result) {
                        if (result[0]) {
                            keluar = result[0].OutPrimer ?? 0;
                        }

                        if (
                            parseFloat(primerAkhirAsal.value) -
                                (keluar +
                                    parseFloat(primerKonversiAsal.value)) <
                            0
                        ) {
                            Swal.fire({
                                icon: "error",
                                text:
                                    "Saldo primer = " +
                                    String(parseInt(primerAkhirAsal.value)) +
                                    "  Jumlah primer pada transaksi yang belum diacc = " +
                                    String(keluar) +
                                    "  Jadi Saldo primer tinggal = " +
                                    String(
                                        parseInt(primerAkhirAsal.value) -
                                            keluar,
                                    ),
                            }).then(() => {
                                primerKonversiAsal.value = 0;
                                primerKonversiAsal.focus();
                                primerKonversiAsal.select();
                            });
                        } else {
                            sekunderKonversiAsal.focus();
                            sekunderKonversiAsal.select();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
            } else {
                sekunderKonversiAsal.focus();
                sekunderKonversiAsal.select();
            }
        }
    });

    $("#sekunderKonversiAsal").on("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();

            if (StKonversi === 1 || StKonversi === 2) {
                $.ajax({
                    type: "GET",
                    url: "KonversiBarang/getJumlahAntrian",
                    data: {
                        IdType: idtypeSelect.val() ?? idtype2Select.val(),
                        _token: csrfToken,
                    },
                    success: function (result) {
                        if (result[0]) {
                            keluar = result[0].OutSekunder ?? 0;
                        }

                        if (
                            parseFloat(sekunderAkhirAsal.value) -
                                (keluar +
                                    parseFloat(sekunderKonversiAsal.value)) <
                            0
                        ) {
                            Swal.fire({
                                icon: "error",
                                text:
                                    "Saldo sekunder = " +
                                    String(parseInt(sekunderAkhirAsal.value)) +
                                    "  Jumlah sekunder pada transaksi yang belum diacc = " +
                                    String(keluar) +
                                    "  Jadi Saldo sekunder tinggal = " +
                                    String(
                                        parseInt(sekunderAkhirAsal.value) -
                                            keluar,
                                    ),
                            }).then(() => {
                                sekunderKonversiAsal.value = 0;
                                sekunderKonversiAsal.focus();
                                sekunderKonversiAsal.select();
                            });
                        } else {
                            btn_prosesAsal.disabled = false;
                            triterKonversiAsal.focus();
                            triterKonversiAsal.select();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
            } else {
                triterKonversiAsal.focus();
                triterKonversiAsal.select();
                btn_prosesAsal.disabled = false;
            }
        }
    });

    $("#triterKonversiAsal").on("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();

            if (StKonversi === 1 || StKonversi === 2) {
                $.ajax({
                    type: "GET",
                    url: "KonversiBarang/getJumlahAntrian",
                    data: {
                        IdType: idtypeSelect.val() ?? idtype2Select.val(),
                        _token: csrfToken,
                    },
                    success: function (result) {
                        if (result[0]) {
                            keluar = result[0].OutTritier ?? 0;
                        }

                        if (
                            parseFloat(triterAkhirAsal.value) -
                                (keluar +
                                    parseFloat(triterKonversiAsal.value)) <
                            0
                        ) {
                            Swal.fire({
                                icon: "error",
                                text:
                                    "Saldo tritier = " +
                                    String(parseInt(triterAkhirAsal.value)) +
                                    "  Jumlah tritier pada transaksi yang belum diacc = " +
                                    String(keluar) +
                                    "  Jadi Saldo tritier tinggal = " +
                                    String(
                                        parseInt(triterAkhirAsal.value) -
                                            keluar,
                                    ),
                            }).then(() => {
                                triterKonversiAsal.value = 0;
                                triterKonversiAsal.focus();
                                triterKonversiAsal.select();
                            });
                        } else {
                            if (
                                (divisiIdAsal.value === "ABM" &&
                                    objekSelect.val() == "022" &&
                                    subKelompokSelect.val() !== "006193" &&
                                    subKelompokSelect.val() !== "006634" &&
                                    kelompokSelect.val() !== "2543") ||
                                (divisiIdAsal.value === "JBB" &&
                                    objekSelect.val() == "042" &&
                                    kelompokSelect.val() !== "2432") ||
                                (divisiIdAsal.value === "EXT" &&
                                    kelompokSelect.val() == "1259" &&
                                    kelompokUtamaSelect.val() == "1283")
                            ) {
                                Hitung_Hsl_Mtr_Asal();
                                sekunderKonversiAsal.value =
                                    Hitung_Hsl_Mtr *
                                    parseFloat(triterKonversiAsal.value);
                                if (sekunderKonversiAsal.value !== 0) {
                                    sekunderKonversiAsal.value = formatNumber(
                                        sekunderKonversiAsal.value,
                                    );
                                }
                            }
                            if (
                                divisiIdAsal.value === "CIR" &&
                                objekSelect.val() == "043"
                            ) {
                                if (triterKonversiAsal.value > 0) {
                                    Hitung_Hsl_Mtr_Asal();
                                    sekunderKonversiAsal.value =
                                        Hitung_Hsl_Mtr *
                                        parseFloat(triterKonversiAsal.value);
                                    if (sekunderKonversiAsal.value !== 0) {
                                        sekunderKonversiAsal.value =
                                            formatNumber(
                                                sekunderKonversiAsal.value,
                                            );
                                    }
                                }
                            }
                            btn_prosesAsal.disabled = false;
                            btn_prosesAsal.focus();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                    },
                });
            } else {
                if (
                    (divisiIdAsal.value === "ABM" &&
                        objekSelect.val() == "022" &&
                        subKelompokSelect.val() !== "006193" &&
                        subKelompokSelect.val() !== "006634" &&
                        kelompokSelect.val() !== "2543") ||
                    (divisiIdAsal.value === "JBB" &&
                        objekSelect.val() == "042" &&
                        kelompokSelect.val() !== "2432") ||
                    (divisiIdAsal.value === "EXT" &&
                        kelompokSelect.val() == "1259" &&
                        kelompokUtamaSelect.val() == "1283")
                ) {
                    Hitung_Hsl_Mtr_Asal();
                    sekunderKonversiAsal.value =
                        Hitung_Hsl_Mtr * parseFloat(triterKonversiAsal.value);
                    if (sekunderKonversiAsal.value !== 0) {
                        sekunderKonversiAsal.value = formatNumber(
                            sekunderKonversiAsal.value,
                        );
                    }
                }
                if (
                    divisiIdAsal.value === "CIR" &&
                    objekSelect.val() == "043"
                ) {
                    if (triterKonversiAsal.value > 0) {
                        Hitung_Hsl_Mtr_Asal();
                        sekunderKonversiAsal.value =
                            Hitung_Hsl_Mtr *
                            parseFloat(triterKonversiAsal.value);
                        if (sekunderKonversiAsal.value !== 0) {
                            sekunderKonversiAsal.value = formatNumber(
                                sekunderKonversiAsal.value,
                            );
                        }
                    }
                }
                btn_prosesAsal.disabled = false;
                btn_prosesAsal.focus();
            }
        }
    });

    $("#kodeBarangAsal").on("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();

            kodeBarangAsal.value = kodeBarangAsal.value
                .padStart(9, "0")
                .slice(-9);

            $.ajax({
                type: "GET",
                url: "KonversiBarang/cekKodeBarang",
                data: {
                    XKodeBarang: kodeBarangAsal.value,
                    XIdSubKelompok: subkelIdAsal.value,
                    _token: csrfToken,
                },
                success: function (result) {
                    if (parseInt(result[0].Jumlah) === 0) {
                        Swal.fire({
                            icon: "error",
                            text:
                                "Tidak Ada Kode Barang :" +
                                decodeHtmlEntities(kodeBarangAsal.value) +
                                " Pada sub kel : " +
                                decodeHtmlEntities(subkelIdAsal.value),
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                },
            });
        }
    });

    btnBatal.addEventListener("click", function (e) {
        clearText();
        disabledButton();
        btnDivisi.focus();
    });

    function disabledButton() {
        btnIsiAsal.disabled = true;
        btnKoreksiAsal.disabled = true;
        btnHapusAsal.disabled = true;
        btnIsiTujuan.disabled = true;
        btnKoreksiTujuan.disabled = true;
        btnHapusTujuan.disabled = true;
        btnBatal.disabled = true;
    }

    function Hitung_Hsl_Mtr_Asal() {
        console.log(arrayIdType[0][2]);
        console.log(arraySubKel[0]);

        let Lebar = 0,
            waft = 0,
            weft = 0,
            denier = 0,
            jum = 0;

        for (let i = 0; i < arrayIdType[0][2].trim().length; i++) {
            if (arrayIdType[0][2].charAt(i) === "/") {
                jum += 1;
                switch (jum) {
                    case 1:
                        Lebar = parseFloat(arrayIdType[0][2].substr(i + 1, 6));
                        break;
                    case 2:
                        waft = parseFloat(arrayIdType[0][2].substr(i + 1, 5));
                        weft = parseFloat(arrayIdType[0][2].substr(i + 9, 5));
                        break;
                    case 3:
                        denier = parseFloat(arrayIdType[0][2].substr(i + 1, 5));
                        break;
                }
            }
        }

        if (
            arraySubKel[0][0] === "0629" ||
            arraySubKel[0][1].startsWith("KAIN") ||
            arraySubKel[0][1].startsWith("Kain No Lami")
        ) {
            Hitung_Hsl_Mtr =
                10 /
                (Lebar / 2) /
                ((waft + weft) / 20) /
                ((denier * 2) / 2000) /
                0.0175;
        } else {
            Hitung_Hsl_Mtr =
                10 /
                Lebar /
                ((waft + weft) / 20) /
                ((denier * 2) / 2000) /
                0.0175;
        }

        Hitung_Hsl_Mtr = Math.round(Hitung_Hsl_Mtr * 10) / 10;
    }

    function clearText() {
        kodeKonversi.value = "";
        kodeAsal.value = "";
        kodeTujuan.value = "";

        var table = $("#tableData").DataTable();
        var tableAsal = $("#tableAsal").DataTable();
        var tableTujuan = $("#tableTujuan").DataTable();
        table.clear().draw();
        tableAsal.clear().draw();
        tableTujuan.clear().draw();
    }

    function Load_DataKonversi() {
        $.ajax({
            type: "GET",
            url: "KonversiBarang/loadDataKonversi",
            data: {
                _token: csrfToken,
                XIdDivisi: divisiId.value,
            },
            success: function (result) {
                updateDataTable(result, 1);
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }

    function Load_Data_All_Asal() {
        $.ajax({
            type: "GET",
            url: "KonversiBarang/loadAllDataAsal",
            data: {
                _token: csrfToken,
                XIdDivisi: divisiId.value,
            },
            success: function (result) {
                updateDataTable(result, 2);
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }

    function Load_Data_All_Tujuan() {
        $.ajax({
            type: "GET",
            url: "KonversiBarang/loadAllDataTujuan",
            data: {
                _token: csrfToken,
                XIdDivisi: divisiId.value,
            },
            success: function (result) {
                updateDataTable(result, 3);
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }

    function Load_DataAsal() {
        $.ajax({
            type: "GET",
            url: "KonversiBarang/loadDataAsal",
            data: {
                _token: csrfToken,
                XIdDivisi: divisiId.value,
                IdKonversi: kodeKonversi.value,
            },
            success: function (result) {
                updateDataTable(result, 2);
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }

    function Load_DataTujuan() {
        $.ajax({
            type: "GET",
            url: "KonversiBarang/loadDataTujuan",
            data: {
                _token: csrfToken,
                XIdDivisi: divisiId.value,
                IdKonversi: kodeKonversi.value,
            },
            success: function (result) {
                updateDataTable(result, 3);
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            },
        });
    }
});
