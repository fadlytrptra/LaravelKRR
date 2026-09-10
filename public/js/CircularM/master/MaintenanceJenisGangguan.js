jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let id_gangguan = document.getElementById("id_gangguan");
    let btn_idGangguan = document.getElementById("btn_idGangguan");
    let jenisGangguan = document.getElementById("jenisGangguan");
    let btn_isi = document.getElementById("btn_isi");
    let btn_koreksi = document.getElementById("btn_koreksi");
    let btn_hapus = document.getElementById("btn_hapus");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let status_gangguan_radios = document.getElementsByName("status_gangguan");
    let proses;

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

    btn_isi.addEventListener("click", async function (event) {
        event.preventDefault();
        proses = 1;
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_idGangguan.disabled = true;
        jenisGangguan.focus();
    });

    btn_koreksi.addEventListener("click", async function (event) {
        event.preventDefault();
        proses = 2;
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_idGangguan.disabled = false;
        btn_idGangguan.focus();
    });

    btn_hapus.addEventListener("click", async function (event) {
        event.preventDefault();
        proses = 3;
        btn_isi.disabled = true;
        btn_koreksi.disabled = true;
        btn_hapus.disabled = true;
        btn_idGangguan.disabled = false;
        btn_idGangguan.focus();
    });

    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        location.reload();
    });

    jenisGangguan.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_proses.focus();
        }
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "MaintenanceJenisGangguanD/ProsesJenisGangguan",
            dataType: "json",
            type: "GET",
            data: {
                _token: csrfToken,
                proses: proses,
                status_gangguan: statusGangguan ? statusGangguan.value : null,
                id_gangguan: id_gangguan.value,
                jenisGangguan: jenisGangguan.value,
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
                        locarion.reload();
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

    let statusGangguan;

    btn_idGangguan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a ID Gangguan",
                html: '<table id="idGangguanTable" class="display" style="width:100%"><thead><tr><th>Nama Mesin</th><th>Shift</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#idGangguanTable")
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
                        const table = $("#idGangguanTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/MaintenanceJenisGangguanD/getListJenisGangguan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Jenis_Gangguan",
                                },
                                {
                                    data: "Id_Jenis_Gangguan",
                                },
                            ],
                            // order: [[1, "asc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#idGangguanTable_filter input").focus();
                        }, 300);
                        // $("#idGangguanTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#idGangguanTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "idGangguanTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    const statusGangguanRadio = document.querySelector(
                        `input[name="status_gangguan"][value="${selectedRow.Status_Gangguan}"]`
                    );
                    if (statusGangguanRadio) {
                        statusGangguanRadio.checked = true;
                    }

                    statusGangguan = document.querySelector(
                        'input[name="status_gangguan"]:checked'
                    );
                    id_gangguan.value = selectedRow.Id_Jenis_Gangguan;
                    jenisGangguan.value = selectedRow.Jenis_Gangguan;
                    if (proses == 2) {
                        setTimeout(() => {
                            jenisGangguan.select();
                            jenisGangguan.focus();
                        }, 300);
                    } else if (proses == 3) {
                        setTimeout(() => {
                            btn_proses.focus();
                        }, 300);
                    }
                    // $.ajax({
                    //     url: "MaintenanceJamGangguan/getIdMesinByNama",
                    //     type: "GET",
                    //     data: {
                    //         _token: csrfToken,
                    //         namaMesin: namaMesin.value,
                    //     },
                    //     success: function (data) {
                    //         console.log(data);
                    //         id_namaMesin.value = data.Id_mesin;
                    //         // jenisCustomer.value = data.TJenisCust;
                    //         // alamat.value = data.TAlamat;
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
    });
});