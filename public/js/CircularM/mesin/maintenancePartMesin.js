$(document).ready(function () {
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let kode_barang = document.getElementById("kode_barang");
    let jumlah_tritier = document.getElementById("jumlah_tritier");
    let keterangan = document.getElementById("keterangan");
    let status_lanjut = document.getElementById("status_lanjut");
    let button_tambahLogMaintenance = document.getElementById("button_tambahLogMaintenance"); // prettier-ignore
    let tanggal_maintenance = document.getElementById("tanggal_maintenance");
    let modal_ok = document.getElementById("modal_ok");
    const mesin = $("#mesin");
    const nama_sparepart = $("#nama_sparepart");
    const nama_barang = $("#nama_barang");
    const jenis_maintenance = $("#jenis_maintenance");
    const divisi_barangPendukung = $("#divisi_barangPendukung");
    const kelompokUtama_barangPendukung = $("#kelompokUtama_barangPendukung");
    const subKelompok_barangPendukung = $("#subKelompok_barangPendukung");
    const objek_barangPendukung = $("#objek_barangPendukung");
    const kelompok_barangPendukung = $("#kelompok_barangPendukung");
    let table_barangTambahanMaintenanceMesin = $(
        "#table_barangTambahanMaintenanceMesin"
    ).DataTable({
        paging: false,
        autoWidth: false,
        searching: false,
        info: false,
        columnDefs: [
            {
                target: 8,
                visible: false,
            },
        ],
    });

    function initializeDatatable() {}

    // Setup global AJAX handlers
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

    function initializeSelectElement(tipeInitialisasi) {
        let selectElements = getSelectElementsByType(tipeInitialisasi);
        selectElements.forEach(({ element, placeholder }) => {
            element.select2({
                dropdownParent: $("#form_tambahLogMaintenanceMesin"),
                placeholder: placeholder,
            });
        });

        if (tipeInitialisasi === "initializeModal") {
            mesin.select2({
                dropdownParent: $("#form_tambahLogMaintenanceMesin"),
                placeholder: "Pilih Mesin",
            });
            jenis_maintenance.select2({
                dropdownParent: $("#form_tambahLogMaintenanceMesin"),
                placeholder: "Pilih Jenis Maintenance",
            });
            divisi_barangPendukung.select2({
                dropdownParent: $("#form_tambahLogMaintenanceMesin"),
                placeholder: "Pilih Divisi",
            });
            mesin.val(null).trigger("change");
            jenis_maintenance.val(null).trigger("change");
            divisi_barangPendukung.val(null).trigger("change");
        }
    }

    function clearSelectElement(tipeInitialisasi) {
        // Get the array of select elements based on tipeInitialisasi
        let selectElements = getSelectElementsByType(tipeInitialisasi);

        // Clear each select element and set placeholder
        selectElements.forEach(({ element, placeholder }) => {
            element
                .empty()
                .append(
                    `<option value="" disabled selected>${placeholder}</option>`
                );
        });
    }
    // Helper function to get select elements based on tipeInitialisasi
    function getSelectElementsByType(tipeInitialisasi) {
        const elementSets = {
            initializeModal: [
                { element: nama_sparepart, placeholder: "Pilih Sparepart" },
                { element: nama_barang, placeholder: "Pilih Barang" },
                { element: objek_barangPendukung, placeholder: "Pilih Objek" }, // prettier-ignore
                { element: kelompokUtama_barangPendukung, placeholder: "Pilih Kelompok Utama" }, // prettier-ignore
                { element: kelompok_barangPendukung, placeholder: "Pilih Kelompok" }, // prettier-ignore
                { element: subKelompok_barangPendukung, placeholder: "Pilih Sub Kelompok" }, // prettier-ignore
                { element: nama_sparepart, placeholder: "Pilih Sparepart" }, // prettier-ignore
            ],
        };

        return elementSets[tipeInitialisasi] || [];
    }

    // Initialize DataTable
    $.ajax({
        url: "/MaintenanceLogSparepartMesin/StatusPartMesinOverall",
        type: "GET",
        success: function (response) {
            // Clear the DataTable and add the new data
            table_mesin.clear().rows.add(response.data).draw();
        },
        error: function (xhr, status, error) {
            console.error("Error fetching data: ", error);
        },
    });

    var table_mesin = $("#table_mesin").DataTable({
        processing: true,
        responsive: true,
        autoWidth: false,
        data: [], // The data will be populated via AJAX
        columns: [
            { data: "Nama_mesin" }, // Machine Name
            { data: "SparepartCount" }, // Spare Part Count
            {
                data: "DurabilityPercentage",
                render: function (data, type, row) {
                    return parseFloat(data).toFixed(2); // Format to two decimal places
                },
            },
        ],
        columnDefs: [
            {
                targets: 2,
                createdCell: function (td, cellData, rowData, row, col) {
                    // Append a canvas element only once per cell
                    if (rowData) {
                        if (parseFloat(cellData) > 0) {
                            $(td).html(
                                '<canvas class="performance-chart" width="200" height="30"></canvas>'
                            );
                        }
                    }
                },
                width: "200px",
            },
        ],
        drawCallback: function (settings) {
            // After the table is drawn, initialize Chart.js for each row
            $("#table_mesin tbody tr").each(function (index) {
                var $tr = $(this);

                // Check if a canvas element exists in the row
                var $canvas = $tr.find("canvas");
                if ($canvas.length > 0) {
                    // Access the row's data from DataTables' settings object
                    var rowData = settings.aoData[$tr.index()]._aData;
                    var durability = parseFloat(rowData.DurabilityPercentage); // Get DurabilityPercentage directly from row data

                    var ctx = $canvas[0].getContext("2d");

                    // Initialize Chart.js for each canvas
                    new Chart(ctx, {
                        type: "bar",
                        data: {
                            labels: ["Durability"],
                            datasets: [
                                {
                                    data: [durability],
                                    backgroundColor: ["#00FF00"],
                                },
                            ],
                        },
                        options: {
                            responsive: false,
                            indexAxis: "y", // Horizontal bar
                            elements: {
                                bar: {
                                    borderSkipped: false, // Avoid edges being cut off
                                },
                            },
                            scales: {
                                x: {
                                    max: 100, // Set the maximum to 100%
                                    display: false,
                                },
                                y: {
                                    display: false,
                                },
                            },
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                tooltip: {
                                    enabled: false,
                                },
                            },
                        },
                        plugins: [ChartDataLabels],
                    });
                }
            });
        },
    });

    // Add click event listener to table rows
    $("#table_mesin tbody").on("click", "tr", function () {
        var data = table_mesin.row(this).data();
        console.log("table clicked data row: " + data); // You can use this data to populate the modal

        // $.ajax({
        //     url: "/MaintenanceLogSparepartMesin/selectNamaSparepart",
        //     method: "GET",
        //     data: { Id_Mesin: selectedMesin }, // Pass Kode_Customer to the server
        //     dataType: "json",
        //     success: function (data) {
        //         if (data.length === 0) {
        //             Swal.showValidationMessage(
        //                 "Tidak ada Sparepart untuk mesin: " +
        //                     $("#mesin option:selected").text()
        //             );
        //         } else {
        //             // Show the modal
        //             $("#modal_tambahLogMaintenanceSparepart").modal("show");
        //         }
        //     },
        //     error: function () {
        //         Swal.fire({
        //             icon: "error",
        //             title: "Error",
        //             text: "Failed to load data Sparepart.",
        //         });
        //     },
        // });
    });

    button_tambahLogMaintenance.addEventListener("click", function (event) {
        event.preventDefault();
        $("#modal_tambahLogMaintenanceSparepart").modal("show");
    });

    $("#modal_tambahLogMaintenanceSparepart").on(
        "shown.bs.modal",
        function (event) {
            clearSelectElement("initializeModal");
            initializeSelectElement("initializeModal"); //Initialize Form
            kode_barang.value = "";
            jumlah_tritier.value = "";
            keterangan.value = "";
            status_lanjut.checked = true;
            tanggal_maintenance.valueAsDate = new Date();
            setTimeout(() => {
                mesin.select2("open");
            }, 200);
        }
    );

    mesin.on("select2:select", function () {
        setTimeout(() => {
            jenis_maintenance.select2("open");
        }, 200);
    });

    jenis_maintenance.on("select2:select", function () {
        if (mesin.prop("selectedIndex") < 0) {
            Swal.fire("Warning", "Please select 'Mesin' first.", "warning");
            jenis_maintenance.val(null).trigger("change");
            return; // Exit if 'Mesin' is not selected
        }
        const selectedJenisMaintenance = $(this).val(); // Get selected Jenis Maintenance
        const selectedMesin = mesin.val(); // Get selected Mesin

        if (selectedJenisMaintenance === "Ganti Sparepart") {
            $.ajax({
                url: "/MaintenanceLogSparepartMesin/selectNamaSparepart",
                method: "GET",
                data: { idMesin: selectedMesin }, // Pass Kode_Customer to the server
                dataType: "json",
                success: function (data) {
                    if (data.length === 0) {
                        Swal.showValidationMessage(
                            "Tidak ada Sparepart untuk mesin: " +
                                $("#mesin option:selected").text()
                        );
                    } else {
                        data.forEach(function (sparepart) {
                            nama_sparepart.append(
                                new Option(
                                    sparepart.NamaSparepart,
                                    sparepart.IdSparepart
                                )
                            );
                        });
                        nama_sparepart.select2({
                            dropdownParent: $(
                                "#form_tambahLogMaintenanceMesin"
                            ),
                            placeholder: "Pilih Sparepart",
                        });
                    }
                },
                error: function () {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to load data Sparepart.",
                    });
                },
            }).then(() => {
                setTimeout(() => {
                    nama_sparepart.select2("open");
                }, 200);
            });
        } else {
            keterangan.focus();
        }
    });

    nama_sparepart.on("select2:select", function () {
        const selectedIdSparepart = $(this).val(); // Get selected Jenis Maintenance
        // nama_barang
        //     .empty()
        //     .append(`<option value="" disabled selected>Pilih Barang</option>`);
        // $.ajax({
        //     url: "/MaintenanceLogSparepartMesin/selectKodeBarang",
        //     method: "GET",
        //     data: {
        //         idMesin: mesin.val(),
        //         idSparepart: selectedIdSparepart,
        //     }, // Pass Kode_Customer to the server
        //     dataType: "json",
        //     success: function (data) {
        //         console.log(data);
        //         if (data.length === 0) {
        //             Swal.showValidationMessage(
        //                 "Tidak ada Barang untuk sparepart: " +
        //                     $("#nama_sparepart option:selected").text()
        //             );
        //         } else {
        //             data.forEach(function (barang) {
        //                 nama_barang.append(
        //                     new Option(barang.NAMA_BRG, barang.KodeBarang)
        //                 );
        //             });
        //             nama_barang.select2({
        //                 dropdownParent: $("#form_tambahLogMaintenanceMesin"),
        //                 placeholder: "Pilih Barang",
        //             });
        //         }
        //     },
        //     error: function () {
        //         Swal.fire({
        //             icon: "error",
        //             title: "Error",
        //             text: "Failed to load data Barang.",
        //         });
        //     },
        // }).then(() => {
        //     setTimeout(() => {
        //         nama_barang.select2("open");
        //     }, 200);
        // });
        pemakaianPrimer_barangPendukung.select();
    });

    // nama_barang.on("select2:select", function () {
    //     const selectedBarang = $(this).val(); // Get selected Jenis Maintenance
    //     kode_barang.value = selectedBarang;
    //     jumlah_tritier.select();
    // });

    // jumlah_tritier.addEventListener("keypress", function (event) {
    //     if (event.key === "Enter") {
    //         event.preventDefault();
    //         keterangan.focus();
    //     }
    // });

    modal_ok.addEventListener("click", function (event) {
        event.preventDefault();
        const selectedMesin = mesin.val();
        const selectedJenisMaintenance = jenis_maintenance.val();
        const selectedKeterangan = keterangan.value;
        const selectedStatusLanjut = status_lanjut.value;

        if (mesin === null) {
            Swal.fire("Warning", "Please select 'Mesin'.", "warning");
            return; // Exit if 'Mesin' is not selected
        }
        if (jenis_maintenance === null) {
            Swal.fire(
                "Warning",
                "Please select 'Jenis Maintenance'.",
                "warning"
            );
            return; // Exit if 'Mesin' is not selected
        }
        if (keterangan.textContent == "") {
            Swal.fire("Warning", "Please input 'Keterangan'.", "warning");
            return; // Exit if 'Mesin' is not selected
        }

        if (selectedJenisMaintenance === "Ganti Sparepart") {
            if (selectedIdSparepart === null) {
                Swal.fire(
                    "Warning",
                    "Please select 'Nama Sparepart'.",
                    "warning"
                );
                return; // Exit if 'Mesin' is not selected
            }
            if (kode_barang.value == "") {
                Swal.fire("Warning", "Please select 'Nama Barang'.", "warning");
                return; // Exit if 'Mesin' is not selected
            }
            if (jumlah_tritier.value < 1) {
                Swal.fire(
                    "Warning",
                    "Please input 'Jumlah Pemakaian'.",
                    "warning"
                );
                return; // Exit if 'Mesin' is not selected
            }
        }

        $.ajax({
            url: "/MaintenanceLogSparepartMesin",
            method: "POST",
            data: {
                _token: csrfToken,
                jenisStore: "insertLogMaintenance",
                Id_Mesin: selectedMesin,
                Jenis_Maintenance: selectedJenisMaintenance,
                Id_Sparepart: selectedIdSparepart,
                Kode_Barang: selectedKodeBarang,
                Jumlah_Tritier: selectedJumlahTritier,
                Keterangan: selectedKeterangan,
                Status_Lanjut: selectedStatusLanjut,
            },
            success: function (response) {
                console.log(response);
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: response.message,
                    }).then(() => {
                        $("#modal_tambahLogMaintenanceSparepart").modal("hide");
                        table_mesin.ajax.reload(); // Reload the DataTable
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: response.error,
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to save data.",
                });
            },
        });
    });
});
