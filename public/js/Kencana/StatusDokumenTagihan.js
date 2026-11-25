$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_proses = document.getElementById("btn_proses");
    let btn_customer = document.getElementById("btn_customer");
    let btn_status = document.getElementById("btn_status");
    let nama_customer = document.getElementById("nama_customer");
    let id_CDepan = document.getElementById("id_CDepan");
    let idPenagihan = document.getElementById("idPenagihan");
    let statusLama = document.getElementById("statusLama");
    let nama_status = document.getElementById("nama_status");
    let idStatus = document.getElementById("idStatus");
    let idCustomer = document.getElementById("idCustomer");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
    });

    nama_customer.readOnly = true;
    idCustomer.readOnly = true;
    idPenagihan.readOnly = true;
    statusLama.readOnly = true;
    nama_status.readOnly = true;

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "/Kencana/StatusDokumenTagihanKencana",
            type: "POST",
            data: {
                _token: csrfToken,
                idStatus: idStatus.value,
                idPenagihan: idPenagihan.value,
            },
            success: function (response) {
                console.log(response);

                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then(() => {
                        // location.reload();
                        // document
                        //     .querySelectorAll("input")
                        //     .forEach((input) => (input.value = ""));
                        $("#table_atas").DataTable().ajax.reload();
                        // idReferensi.value = response.IdReferensi;
                        // btn_proses.disabled = true;
                        // btn_batal.disabled = true;
                        // btn_isi.disabled = false;
                        // btn_koreksi.disabled = false;
                        // btn_hapus.disabled = false;
                        // btn_ok.click();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                }
            },
            error: function (xhr) {
                alert(xhr.responseJSON.message);
            },
        });
    });

    btn_customer.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Customer",
                html: '<table id="customerTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>ID. Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#customerTable")
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
                    $(document).ready(function () {
                        const table = $("#customerTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/StatusDokumenTagihanKencana/getCustomer",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "NamaCust",
                                },
                                {
                                    data: "IDCust",
                                },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#customerTable_filter input").focus();
                        }, 300);
                        // $("#customerTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#customerTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "customerTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_customer.value = escapeHTML(
                        selectedRow.NamaCust.trim()
                    );
                    idCustomer.value = selectedRow.IDCust.trim().slice(-5);
                    id_CDepan.value = selectedRow.IDCust.trim().substring(0, 3);
                    // id_CBelakang.value = selectedRow.IDCust.trim().slice(-5);

                    table_atas = $("#table_atas").DataTable({
                        responsive: false,
                        processing: true,
                        serverSide: true,
                        destroy: true,
                        scrollX: true,
                        // width: "150%",
                        ajax: {
                            url: "/Kencana/StatusDokumenTagihanKencana/getDocumentStatus",
                            dataType: "json",
                            type: "GET",
                            data: function (d) {
                                return $.extend({}, d, {
                                    _token: csrfToken,
                                    idCustomer: idCustomer.value,
                                });
                            },
                        },
                        columns: [
                            {
                                data: "ID_Penagihan",
                                // render: function (data) {
                                //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                                // },
                            },
                            { data: "tgl_penagihan" },
                            { data: "idstatus" },
                            { data: "status" },
                        ],
                        paging: false,
                        scrollY: "250px",
                        scrollCollapse: true,
                        // columnDefs: [{ targets: [6, 7, 8, 9, 10, 11], visible: false }],
                    });

                    // $.ajax({
                    //     url: "MaintenanceNotaPenjualanTunai/getJenisCustomer",
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

                    // setTimeout(() => {
                    //     btn_noSP.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();
        console.log(data);

        idPenagihan.value = data.ID_Penagihan;
        statusLama.value = data.status;
    });

    btn_status.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Status",
                html: '<table id="statusTable" class="display" style="width:100%"><thead><tr><th>Nama Status</th><th>ID. Status</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#statusTable")
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
                    $(document).ready(function () {
                        const table = $("#statusTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/StatusDokumenTagihanKencana/getStatus",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Status",
                                },
                                {
                                    data: "IdStatus",
                                },
                            ],
                            order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#statusTable_filter input").focus();
                        }, 300);
                        // $("#statusTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#statusTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "statusTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_status.value = escapeHTML(selectedRow.Status.trim());
                    idStatus.value = escapeHTML(selectedRow.IdStatus.trim());
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });
});
