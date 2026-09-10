jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let tanggal = document.getElementById("tanggal");
    let btn_cek = document.getElementById("btn_cek");
    let tonase = document.getElementById("tonase");
    let kg_afalan = document.getElementById("kg_afalan");
    let jumlah_mesin = document.getElementById("jumlah_mesin");
    let kg_mesin = document.getElementById("kg_mesin");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let cek = 0;

    const slcShift = document.getElementById("shift");

    let table_atas = $("#table_atas").DataTable({
        columnDefs: [{ targets: [0, 10, 11, 12], visible: false }],
    });

    // $.ajaxSetup({
    //     beforeSend: function () {
    //         // Show the loading screen before the AJAX request
    //         $("#loading-screen").css("display", "flex");
    //     },
    //     complete: function () {
    //         // Hide the loading screen after the AJAX request completes
    //         $("#loading-screen").css("display", "none");
    //     },
    // });

    tanggal.focus();
    const today = new Date();
    today.setDate(today.getDate() - 1);
    tanggal.valueAsDate = today;

    //#region Enter
    tanggal.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            shift.focus();
        }
    });

    tonase.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $.ajax({
                url: "ProsesAfalanD/getTonaseEnter",
                dataType: "json",
                type: "GET",
                data: {
                    _token: csrfToken,
                    tanggal: tanggal.value,
                    tonase: tonase.value
                },
                success: function (response) {
                    console.log(response.message)
                    if (response.error) {
                        Swal.fire({
                            icon: "info",
                            title: "Info!",
                            text: response.error,
                            showConfirmButton: false,
                        });
                    } else {

                        table_atas = $("#table_atas").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            destroy: true,
                            ajax: {
                                url: "ProsesAfalanD/getTonaseEnter",
                                dataType: "json",
                                type: "GET",
                                data: function (d) {
                                    return $.extend({}, d, {
                                        _token: csrfToken,
                                        tanggal: tanggal.value,
                                        tonase: tonase.value,
                                    });
                                },
                            },
                            columns: [
                                { data: "Id_Mesin" },
                                { data: "Nama_mesin" },
                                { data: "Id_order" },
                                { data: "KB_BarangJadi" },
                                { data: "NAMA_BRG", width: "800px" },
                                { data: "Spek_BenangWA" },
                                { data: "Spek_BenangWE" },
                                { data: "PerOrder" },
                                { data: "Brt_WA" },
                                { data: "Brt_WE" },
                                { data: "KB_BenangWA" },
                                { data: "KB_BenangWE" },
                                { data: "Denier" },
                            ],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                            columnDefs: [{ targets: [0, 10, 11, 12], visible: false }]
                        });
                    }
                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                },
            });
            $.ajax({
                url: "ProsesAfalanD/getDetailAfalan",
                dataType: "json",
                type: "GET",
                data: {
                    _token: csrfToken,
                    tanggal: tanggal.value,
                    tonase: tonase.value
                },
                success: function (response) {
                    console.log(response.message)
                    if (response.error) {
                        Swal.fire({
                            icon: "info",
                            title: "Info!",
                            text: response.error,
                            showConfirmButton: false,
                        });
                    } else {
                        kg_afalan.value = response.kg;
                        jumlah_mesin.value = response.jumlah_mesin;
                        kg_mesin.value = numeral(response.per_mesin).format('0.00');
                    }
                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                },
            });
        }
    });

    //#region Event Listener
    btn_batal.addEventListener("click", async function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        // btn_proses.disabled = true;
        const allRowsDataAtas = table_atas.rows().data().toArray();
        if (!allRowsDataAtas || allRowsDataAtas.length === 0) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Data Tidak Ada, Isi Tonase Terlebih Dahulu !",
                showConfirmButton: true,
                // timer: 2000
            });
            btn_proses.disabled = false;
            return;
        }
        $.ajax({
            url: "ProsesAfalanD",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                allRowsDataAtas: allRowsDataAtas,
                tanggal: tanggal.value,
                tonase: tonase.value,
                kg_mesin: kg_mesin.value,
                jumlah_mesin: jumlah_mesin.value,
                cek: cek,
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

                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                    // btn_proses.disabled = false;
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
                // btn_proses.disabled = false;
            },
        });
    });

    btn_cek.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Tanggal",
                html: '<table id="tanggalTable" class="display" style="width:100%"><thead><tr><th>Tanggal</th><th>Tonase</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tanggalTable")
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
                        const table = $("#tanggalTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "ProsesAfalanD/getMesinAktif",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    tanggal: tanggal.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Tgl_Log",
                                },
                                {
                                    data: "Tonase",
                                },
                            ],
                            order: [[0, "desc"]],
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                        });
                        setTimeout(() => {
                            $("#tanggalTable_filter input").focus();
                        }, 300);
                        // $("#tanggalTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1)
                        //             .search(this.value)
                        //             .draw();
                        //     }
                        // );
                        $("#tanggalTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tanggalTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    tanggal.value = selectedRow.Tgl_Log.substring(0, 10);
                    tonase.value = selectedRow.Tonase;
                    tonase.readOnly = true;
                    $.ajax({
                        url: "ProsesAfalanD/getDetailAfalan",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            tanggal: tanggal.value,
                            tonase: tonase.value,
                        },
                        success: function (data) {
                            console.log(data);
                            kg_afalan.value = data.kg;
                            jumlah_mesin.value = data.jumlah_mesin;
                            kg_mesin.value = numeral(data.per_mesin).format('0.00');
                            cek = 1;
                            //#region disable
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    table_atas = $("#table_atas").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        destroy: true,
                        ajax: {
                            url: "ProsesAfalanD/getDatatable",
                            dataType: "json",
                            type: "GET",
                            data: function (d) {
                                return $.extend({}, d, {
                                    _token: csrfToken,
                                    tanggal: tanggal.value,
                                    tonase: tonase.value,
                                });
                            },
                        },
                        columns: [
                            { data: "Id_Mesin" },
                            { data: "Nama_mesin" },
                            { data: "Id_order" },
                            { data: "KB_BarangJadi" },
                            { data: "NAMA_BRG", width: "800px" },
                            { data: "Spek_BenangWA" },
                            { data: "Spek_BenangWE" },
                            { data: "PerOrder" },
                            { data: "Brt_WA" },
                            { data: "Brt_WE" },
                            { data: "KB_BenangWA" },
                            { data: "KB_BenangWE" },
                            { data: "Denier" },
                        ],
                        paging: false,
                        scrollY: "400px",
                        scrollCollapse: true,
                        columnDefs: [{ targets: [0, 10, 11, 12], visible: false }]
                    });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });
});