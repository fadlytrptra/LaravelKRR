jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let tanggal = document.getElementById("tanggal");
    let btn_batal = document.getElementById("btn_batal");
    let btn_proses = document.getElementById("btn_proses");
    let btn_type = document.getElementById("btn_type");
    let btn_mesin = document.getElementById("btn_mesin");
    let type_mesin = document.getElementById("type_mesin");
    let idType_mesin = document.getElementById("idType_mesin");
    let nama_mesin = document.getElementById("nama_mesin");
    let id_mesin = document.getElementById("id_mesin");
    let jam_kerja = document.getElementById("jam_kerja");
    let shift = document.getElementById("shift");
    // let table_atas = $("#table_atas").DataTable({
    //     // columnDefs: [{ targets: [5, 6], visible: false }],
    //     paging: false,
    //     scrollY: "300px",
    //     // scrollX: "300px",
    //     scrollCollapse: true,
    // });

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
            btn_type.focus();
        }
    });

    jam_kerja.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_proses.focus();
        }
    });

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        // var data = table_atas.rows().data().toArray();
        $.ajax({
            url: "JamKerjaD",
            type: "POST",
            data: {
                _token: csrfToken,
                tanggal: tanggal.value,
                idType_mesin: idType_mesin.value,
                id_mesin: id_mesin.value,
                jam_kerja: jam_kerja.value,
                shift: shift.value,
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

    btn_type.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Type Mesin",
                html: '<table id="typeTable" class="display" style="width:100%"><thead><tr><th>Type Mesin</th><th>Id Type Mesin</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#typeTable")
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
                        const table = $("#typeTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/JamKerjaD/getTypeMesin",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: 'Type_Mesin',
                                },
                                {
                                    data: 'IdType_Mesin',
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#typeTable_filter input").focus();
                        }, 300);
                        // $("#typeTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#typeTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "typeTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;

                    type_mesin.value = selectedRow.Type_Mesin;
                    idType_mesin.value = selectedRow.IdType_Mesin;
                    setTimeout(() => {
                        btn_mesin.focus();
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

    btn_mesin.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Mesin",
                html: '<table id="mesinTable" class="display" style="width:100%"><thead><tr><th>Nama Mesin</th><th>Id Mesin</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#mesinTable")
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
                        const table = $("#mesinTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/JamKerjaD/getMesin",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idType_mesin: idType_mesin.value,
                                },
                            },
                            columns: [
                                {
                                    data: 'Nama_mesin',
                                },
                                {
                                    data: 'Id_mesin',
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#mesinTable_filter input").focus();
                        }, 300);
                        // $("#mesinTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#mesinTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "mesinTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;

                    nama_mesin.value = selectedRow.Nama_mesin;
                    id_mesin.value = selectedRow.Id_mesin;
                    setTimeout(() => {
                        jam_kerja.focus();
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
