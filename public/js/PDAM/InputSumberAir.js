jQuery(function ($) {
    //#region Get element by ID
    let button_tambahSumber = document.getElementById("button_tambahSumber");
    let tambahSumberAirModal = document.getElementById("tambahSumberAirModal");
    let tambahSumberAirLabel = document.getElementById("tambahSumberAirLabel");
    let namaSumberAir = document.getElementById("namaSumberAir");
    let angkaDibelakangKoma = document.getElementById("angkaDibelakangKoma");
    let select_lokasiSumberAir = document.getElementById("select_lokasiSumberAir"); //prettier-ignore
    let button_modalProses = document.getElementById("button_modalProses");
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore

    let table_sumberAir = $("#table_sumberAir").DataTable({
        processing: true,
        responsive: true,
        data: [],
        columns: [
            { data: "Lokasi", width: "20%" },
            { data: "NamaSumberAir", width: "25%" },
            { data: "AngkaDibelakangKoma", width: "20%" },
            {
                data: "IdSumberAir",
                width: "40%",
                render: function (data, type, full, meta) {
                    let buttonLabel =
                        full.Aktif == 1 ? "Deactivate" : "Activate";

                    let toggleClass =
                        full.Aktif == 1 ? "btn-danger" : "btn-success";

                    return (
                        '<button class="btn btn-secondary btn-edit" ' +
                        'data-id="' + data + '" ' +
                        'data-toggle="modal" ' +
                        'data-target="#tambahSumberAirModal">' +
                        'Edit</button> ' +

                        '<button class="btn ' + toggleClass + ' btn-delete" ' +
                        'data-id="' + data + '" ' +
                        'data-aktif="' + full.Aktif + '" ' +
                        'data-namaSumberAir="' + full.NamaSumberAir + '">' +
                        buttonLabel +
                        '</button> ' +

                        '<button class="btn btn-warning btn-reset-counter" ' +
                        'data-id="' + data + '" ' +
                        'data-namaSumberAir="' + full.NamaSumberAir + '">' +
                        'Reset Counter' +
                        '</button>'
                    );
                },
            },
            {
                data: "Aktif",
                visible: false,
                searchable: false,
            },
        ],
        orderFixed: {
            pre: [3, "desc"],
        },
    });
    //#endregion

    //#region Load Form
    getDataSumberAir();
    //#endregion

    //#region function
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

    function getDataSumberAir() {
        // Fetch the data from your server using an AJAX call
        $.ajax({
            url: "/InputSumberAir/getDataSumberAir",
            type: "GET",
            success: function (response) {
                // Check if response.data is empty
                if (response.data && response.data.length > 0) {
                    // Assuming your server returns an array of objects for the table data
                    table_sumberAir.clear().rows.add(response.data).draw();
                } else {
                    // Clear the table if response.data is empty
                    table_sumberAir.clear().draw();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    }
    //#endregion

    //#region Event Listener
    button_tambahSumber.addEventListener("click", function () {
        $("#button_modalProses").data("id", null);
        tambahSumberAirLabel.innerHTML = "Tambah Sumber Air";
    });

    $("#tambahSumberAirModal").on("hidden.bs.modal", function (event) {
        namaSumberAir.value = "";
        angkaDibelakangKoma.value = 0;
        select_lokasiSumberAir.selectedIndex = 0;
    });

    $("#tambahSumberAirModal").on("shown.bs.modal", function (event) {
        select_lokasiSumberAir.focus();
    });

    namaSumberAir.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            angkaDibelakangKoma.focus(); // Move focus to the next input
        }
    });

    angkaDibelakangKoma.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            if (
                angkaDibelakangKoma.value === "" ||
                angkaDibelakangKoma.value == null
            ) {
                angkaDibelakangKoma.value = 0; // Set default value to 0 if empty
            }
            select_lokasiSumberAir.focus(); // Move focus to the next input
        }
    });

    select_lokasiSumberAir.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            button_modalProses.focus(); // Move focus to the next input
        }
    });

    button_modalProses.addEventListener("click", function () {
        // Temporarily remove Bootstrap 4 modal's focus trap
        $(document).off("focusin.modal");

        let idSumberAir = $(this).data("id");
        const lokasi = select_lokasiSumberAir.selectedIndex;

        if (namaSumberAir.value === "" || namaSumberAir.value == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Nama sumber air tidak boleh kosong",
                didOpen: () => {
                    Swal.getConfirmButton()?.focus();
                },
                returnFocus: false,
            }).then(() => {
                namaSumberAir.focus();
            });
            return;
        }

        if (
            angkaDibelakangKoma.value === "" ||
            angkaDibelakangKoma.value == null
        ) {
            angkaDibelakangKoma.value = 0; // Set default value to 0 if empty
        }

        if (lokasi <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Pilih lokasi sumber air terlebih dahulu",
                returnFocus: false,
            }).then(() => {
                select_lokasiSumberAir.focus();
            });
            return;
        }

        $.ajax({
            url: "/InputSumberAir",
            type: "POST",
            data: {
                jenisStore: idSumberAir ? "update" : "store",
                namaSumberAir: namaSumberAir.value,
                angkaDibelakangKoma: angkaDibelakangKoma.value,
                select_lokasiSumberAir: select_lokasiSumberAir.value,
                idSumberAir: idSumberAir,
                _token: csrfToken,
            },
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Data berhasil ditambahkan",
                    }).then(() => {
                        $("#tambahSumberAirModal").modal("hide");
                        getDataSumberAir();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: response.error,
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error("Error adding data: ", error);
            },
        });
    });

    table_sumberAir.on("click", "tbody tr", function () {
        let data = table_sumberAir.row(this).data();
        console.log(data);

        // alert("You clicked on " + data.IdMesin + "'s row");
    });

    $(document).on("click", ".btn-edit", function (e) {
        var rowID = $(this).data("id");
        $("#button_modalProses").data("id", rowID);
        tambahSumberAirLabel.innerHTML = "Edit Sumber Air";
        $.ajax({
            url: "/InputSumberAir/getDetailSumberAir",
            data: {
                idSumberAir: rowID,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                namaSumberAir.value = response.data[0].NamaSumberAir;
                angkaDibelakangKoma.value =
                    response.data[0].AngkaDibelakangKoma;
                select_lokasiSumberAir.value = response.data[0].Lokasi;
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        var rowID = $(this).data("id");
        var namaSumberAir = $(this).data("namasumberair");
        var isActive = $(this).data("aktif");
        let buttonLabel = isActive ? "Nonaktifkan" : "Aktifkan";

        Swal.fire({
            title: "Yakin untuk mengubah status sumber air?",
            text:
                "Apakah anda yakin untuk " +
                buttonLabel +
                " sumber air " +
                namaSumberAir +
                "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/InputSumberAir/" + rowID,
                    type: "DELETE",
                    data: {
                        _token: csrfToken,
                        aktif: isActive ? 0 : 1,
                    },
                    success: function (response) {
                        if (response.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Terjadi Kesalahan!",
                                text: response.error,
                            });
                        } else {
                            Swal.fire({
                                icon: "success",
                                title: "Berhasil!",
                                text: response.success,
                            });
                            getDataSumberAir();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error fetching data: ", error);
                    },
                });
            } else if (result.isDismissed) {
                // If user cancels, show a message or do nothing
                Swal.fire(
                    "Pemberitahuan",
                    "Status sumber air tidak jadi dirubah :)",
                    "info",
                );
            }
        });
    });

    $(document).on("click", ".btn-reset-counter", function (e) {
        var rowID = $(this).data("id");
        var namaSumberAir = $(this).data("namasumberair");
        var isActive = $(this).data("aktif");
        let buttonLabel = isActive ? "Nonaktifkan" : "Aktifkan";

        Swal.fire({
            title: "Apakah anda yakin untuk reset counter sumber air?",
            // text: "Apakah anda yakin untuk",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/InputSumberAir",
                    type: "POST",
                    data: {
                        jenisStore: "resetCounter",
                        namaSumberAir: namaSumberAir.value,
                        angkaDibelakangKoma: angkaDibelakangKoma.value,
                        select_lokasiSumberAir: select_lokasiSumberAir.value,
                        idSumberAir: rowID,
                        _token: csrfToken,
                    },
                    success: function (response) {
                        if (response.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Terjadi Kesalahan!",
                                text: response.error,
                            });
                        } else {
                            Swal.fire({
                                icon: "success",
                                title: "Berhasil!",
                                text: response.success,
                            });
                            getDataSumberAir();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error fetching data: ", error);
                    },
                });
            } else if (result.isDismissed) {
                // If user cancels, show a message or do nothing
                Swal.fire(
                    "Pemberitahuan",
                    "Counter sumber air tidak jadi dirubah",
                    "info",
                );
            }
        });
    });
});
