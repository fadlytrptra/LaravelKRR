jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let tanggal = document.getElementById("tanggal");
    let shift = document.getElementById("shift");
    let kode_pegawai = document.getElementById("kode_pegawai");
    let nama_pegawai = document.getElementById("nama_pegawai");
    let btn_pegawai = document.getElementById("btn_pegawai");
    let btn_pegawaiNew = document.getElementById("btn_pegawaiNew");
    let kode_pegawaiNew = document.getElementById("kode_pegawaiNew");
    let nama_pegawaiNew = document.getElementById("nama_pegawaiNew");
    let btn_batal = document.getElementById("btn_batal");
    let btn_proses = document.getElementById("btn_proses");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "300px",
        // scrollX: "300px",
        scrollCollapse: true,
    });
    let checkbox_all = document.getElementById("checkbox_all");

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

    tanggal.valueAsDate = new Date();
    kode_pegawai.readOnly = true;
    nama_pegawai.readOnly = true;
    kode_pegawaiNew.readOnly = true;
    nama_pegawaiNew.readOnly = true;
    tanggal.focus();

    tanggal.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            shift.focus();
        }
    });

    shift.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_pegawai.focus();
        }
    });

    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "/orderD/store",
            type: "POST",
            data: {
                _token: csrfToken,
                rowDataArray: rowDataArray,
                kode_pegawaiNew: kode_pegawaiNew.value,
                kodeProses: "ProsesMaintenanceKodePegawai",
            },
            success: function (response) {
                console.log(response.message);

                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then((result) => {
                        console.log(result);
                        $("#table_atas").DataTable().ajax.reload();
                        kode_pegawaiNew.value = "";
                        nama_pegawaiNew.value = "";
                        $("#checkbox_all").prop("checked", false);
                        rowDataArray = [];
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    btn_pegawai.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Karyawan",
                html: '<table id="pegawaiOldTable" class="display" style="width:100%"><thead><tr><th>Nama Pegawai</th><th>Id Karyawan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#pegawaiOldTable")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    jQuery(function ($) {
                        const table = $("#pegawaiOldTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/orderD/show/getPegawaiOld",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    tanggal: tanggal.value,
                                    shift: shift.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_Peg",
                                },
                                {
                                    data: "Id_karyawan",
                                },
                            ],
                            // order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#pegawaiOldTable_filter input").focus();
                        }, 300);
                        // $("#pegawaiOldTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#pegawaiOldTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "pegawaiOldTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kode_pegawai.value = selectedRow.Id_karyawan;
                    nama_pegawai.value = selectedRow.Nama_Peg;
                    // setTimeout(() => {
                    //     btn_tanggal.focus();
                    // }, 300);
                    table_atas = $("#table_atas").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        destroy: true,
                        ajax: {
                            url: "/orderD/show/getLogPegawai",
                            dataType: "json",
                            type: "GET",
                            data: function (d) {
                                return $.extend({}, d, {
                                    _token: csrfToken,
                                    shift: shift.value,
                                    tanggal: tanggal.value,
                                    kode_pegawai: kode_pegawai.value,
                                });
                            },
                        },
                        columns: [
                            {
                                data: "Id_Log",
                                render: function (data) {
                                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                                },
                            },
                            {
                                data: "Nama_mesin",
                                // render: function (data) {
                                //     return numeral(data).format("0,0.00");
                                // },
                            },
                            { data: "Keterangan" },
                            { data: "Id_karyawan" },
                            { data: "Nama_Peg" },
                        ],
                        // order: [[1, "asc"]],
                        paging: false,
                        scrollY: "300px",
                        scrollCollapse: true,
                    });
                    // $.ajax({
                    //     url: "PenagihanPenjualanLokal/getJenisCustomer",
                    //     type: "GET",
                    //     data: {
                    //         _token: csrfToken,
                    //         idCustomer: idCustomer.value,
                    //     },
                    //     success: function (data) {
                    //         console.log(data);
                    //         jenisCustomer.value = data.TJenisCust;
                    //         alamat.value = data.TAlamat;
                    //     },
                    //     error: function (xhr, status, error) {
                    //         var err = eval("(" + xhr.responseText + ")");
                    //         alert(err.Message);
                    //     },
                    // });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    let rowData;
    let rowDataArray = [];

    // Handle checkbox change events
    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]');
                // .not(this)
                // .prop("checked", false);
                rowData = table_atas.row($(this).closest("tr")).data();

                // Add the selected row data to the array
                rowDataArray.push(rowData);
                // rowDataArray = [rowData];

                console.log(rowDataArray);
                console.log(rowData, this, table_atas);
            } else {
                // rowData = null;
                // Remove the unchecked row data from the array
                rowData = table_atas.row($(this).closest("tr")).data();

                // Filter out the row with matching Id_Log
                rowDataArray = rowDataArray.filter(
                    (row) => row.Id_Log !== rowData.Id_Log
                );

                console.log(rowDataArray);
                console.log(rowData, this, table_atas);
            }
        }
    );

    checkbox_all.addEventListener("change", function () {
        const checkboxes = document.querySelectorAll(
            '#table_atas input[type="checkbox"][name="penerimaCheckbox"]'
        );
        rowDataArray = []; // Reset rowDataArray when selecting/deselecting all

        checkboxes.forEach(function (checkbox) {
            checkbox.checked = checkbox_all.checked;

            if (checkbox_all.checked) {
                let row = table_atas.row($(checkbox).closest("tr")).data();
                rowDataArray.push(row); // Track all selected rows with full data

                // console.log(rowDataArray);
            }
        });
    });

    btn_pegawaiNew.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Karyawan",
                html: '<table id="pegawaiNewTable" class="display" style="width:100%"><thead><tr><th>Nama Pegawai</th><th>Id Karyawan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#pegawaiNewTable")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didOpen: () => {
                    jQuery(function ($) {
                        const table = $("#pegawaiNewTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/orderD/show/getPegawaiNew",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_Peg",
                                },
                                {
                                    data: "Kd_Pegawai",
                                },
                            ],
                            // order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#pegawaiNewTable_filter input").focus();
                        }, 300);
                        // $("#pegawaiNewTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#pegawaiNewTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "pegawaiNewTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    kode_pegawaiNew.value = selectedRow.Kd_Pegawai;
                    nama_pegawaiNew.value = selectedRow.Nama_Peg;
                    setTimeout(() => {
                        btn_proses.focus();
                    }, 300);
                    // $.ajax({
                    //     url: "PenagihanPenjualanLokal/getJenisCustomer",
                    //     type: "GET",
                    //     data: {
                    //         _token: csrfToken,
                    //         idCustomer: idCustomer.value,
                    //     },
                    //     success: function (data) {
                    //         console.log(data);
                    //         jenisCustomer.value = data.TJenisCust;
                    //         alamat.value = data.TAlamat;
                    //     },
                    //     error: function (xhr, status, error) {
                    //         var err = eval("(" + xhr.responseText + ")");
                    //         alert(err.Message);
                    //     },
                    // });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });
});
