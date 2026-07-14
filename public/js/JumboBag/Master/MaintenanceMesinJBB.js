jQuery(function ($) {
    //#region Get element by ID
    let button_modalProses = document.getElementById("button_modalProses"); // prettier-ignore
    let button_tambahMesin = document.getElementById("button_tambahMesin"); // prettier-ignore
    let button_tambahTypeMesin = document.getElementById("button_tambahTypeMesin"); // prettier-ignore
    let closeDetailMesinModal = document.getElementById("closeDetailMesinModal"); // prettier-ignore
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let detailMesinLokasi = document.getElementById("detailMesinLokasi"); // prettier-ignore
    let detailMesinModal = document.getElementById("detailMesinModal"); // prettier-ignore
    let detailMesinModalLabel = document.getElementById("detailMesinModalLabel"); // prettier-ignore
    let detailMesinStatusAktif = document.getElementById("detailMesinStatusAktif"); // prettier-ignore
    let namaMesin = document.getElementById("namaMesin"); // prettier-ignore
    let select_lokasiMesin = document.getElementById("select_lokasiMesin"); // prettier-ignore
    let select_typeMesin = document.getElementById("select_typeMesin"); // prettier-ignore
    let tambahMesinJBBLabel = document.getElementById("tambahMesinJBBLabel"); // prettier-ignore
    let tambahMesinJBBModal = document.getElementById("tambahMesinJBBModal"); // prettier-ignore
    let table_mesinJBB = $("#table_mesinJBB").DataTable({
        processing: true, // Optional, as processing is more relevant for server-side
        responsive: true,
        data: [],
        columns: [
            { data: "Nama_Mesin", width: "25%" },
            { data: "Type_Mesin", width: "15%" },
            { data: "Lokasi", width: "20%" },
            {
                data: "Id_Mesin",
                width: "40%",
                render: function (data, type, full, meta) {
                    let buttonLabel =
                        full.Aktif == 1 ? "Deactivate" : "Activate";
                    let toggleClass =
                        full.Aktif == 1 ? "btn-danger" : "btn-success";
                    return (
                        '<button class="btn btn-primary btn-detail" data-id="' +
                        data +
                        '" data-toggle="modal" data-target="#detailMesinModal" id="button_modalDetailMesin">Lihat Detail</button> ' +
                        '<button class="btn btn-secondary btn-edit" data-id="' +
                        data +
                        '" data-toggle="modal" data-target="#tambahMesinJBBModal" id="button_aktifMesin">Edit</button> ' +
                        '<button class="btn ' +
                        toggleClass +
                        ' btn-delete" data-id="' +
                        data +
                        '" data-aktif="' +
                        full.Aktif +
                        '" data-namaMesin ="' +
                        full.Nama_Mesin +
                        '">' +
                        buttonLabel +
                        "</button>"
                    );
                },
            },
            {
                data: "Aktif", // hidden column
                visible: false, // make it invisible
                searchable: false, // optional, if you don't want it in search
            },
        ],
        orderFixed: {
            pre: [4, "desc"], // Always sort by Aktif first
        },
    });

    //#endregion

    //#region Load Form

    getDataMesin();

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

    function getDataMesin() {
        // Fetch the data from your server using an AJAX call
        $.ajax({
            url: "/MaintenanceMesinJBB/getDataMesin",
            type: "GET",
            success: function (response) {
                // Check if response.data is empty
                if (response.data && response.data.length > 0) {
                    // Assuming your server returns an array of objects for the table data
                    table_mesinJBB.clear().rows.add(response.data).draw();
                } else {
                    // Clear the table if response.data is empty
                    table_mesinJBB.clear().draw();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    }

    function restoreFocusTrap() {
        // Restore Bootstrap 4 modal focus trap after alert
        $(document).on("focusin.modal", function (e) {
            if (
                $(e.target).closest(".modal").length === 0 &&
                $(".modal:visible").length > 0
            ) {
                e.stopPropagation();
                $(".modal:visible").focus();
            }
        });
    }

    function getTypeMesin() {
        $.ajax({
            url: "/MaintenanceMesinJBB/getTypeMesin",
            data: {
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                const select = $("#select_typeMesin");
                select.empty(); // Clear existing options

                // Optional: add a placeholder
                select.append(
                    '<option value="">-- Pilih Type Mesin --</option>'
                );

                // Add options
                $.each(response, function (index, item) {
                    select.append(
                        $("<option>", {
                            value: item.Id_Type_Mesin,
                            text: item.Type_Mesin,
                        })
                    );
                });
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    }

    //#endregion

    //#region Event Listener

    button_tambahMesin.addEventListener("click", function () {
        $("#button_modalProses").data("id", null);
        tambahMesinJBBLabel.innerHTML = "Tambah Mesin";
        getTypeMesin();
    });

    $("#tambahMesinJBBModal").on("hidden.bs.modal", function (event) {
        namaMesin.value = "";
        select_lokasiMesin.selectedIndex = 0;
    });

    $("#tambahMesinJBBModal").on("shown.bs.modal", function (event) {
        namaMesin.select();
    });

    namaMesin.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            select_lokasiMesin.focus(); // Move focus to the next input
        }
    });

    select_lokasiMesin.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            select_typeMesin.focus(); // Move focus to the next input
        }
    });

    select_typeMesin.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission
            button_modalProses.focus(); // Move focus to the next input
        }
    });

    button_tambahTypeMesin.addEventListener("click", function () {
        // Temporarily remove Bootstrap 4 modal's focus trap
        $(document).off("focusin.modal");

        Swal.fire({
            title: "Masukkan Nama Type Mesin",
            input: "text",
            inputAttributes: {
                autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Simpan",
            showLoaderOnConfirm: true,
            preConfirm: async (namaTypeMesin) => {
                if (!namaTypeMesin || namaTypeMesin.trim() === "") {
                    Swal.showValidationMessage(
                        "Nama Type Mesin tidak boleh kosong."
                    );
                    return false;
                }
                try {
                    const response = await fetch("/MaintenanceMesinJBB/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRF-TOKEN": csrfToken,
                        },
                        body: JSON.stringify({
                            jenisStore: "storeTypeMesin",
                            nama_type_mesin: namaTypeMesin,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error("Gagal menyimpan data.");
                    }
                    return await response.json(); // return success response
                } catch (error) {
                    Swal.showValidationMessage(
                        `Request gagal: ${error.message}`
                    );
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            console.log(result);

            if (result.isConfirmed) {
                if (result.value.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan!",
                        text: result.value.error,
                    });
                    restoreFocusTrap();
                    return;
                } else if (result.value.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil disimpan!",
                        text: `Nama Type Mesin: ${
                            result.value.nama_type_mesin ?? "(tidak diketahui)"
                        }`,
                    }).then(() => {
                        getTypeMesin();
                        restoreFocusTrap();
                    });
                }
            }
        });
    });

    button_modalProses.addEventListener("click", function () {
        // Temporarily remove Bootstrap 4 modal's focus trap
        $(document).off("focusin.modal");

        let idMesin = $(this).data("id");
        const lokasi = select_lokasiMesin.value;
        const typeMesin = select_typeMesin.value;

        if (namaMesin.value === "" || namaMesin.value == null) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Nama mesin tidak boleh kosong",
                didOpen: () => {
                    Swal.getConfirmButton()?.focus();
                },
                returnFocus: false,
            }).then(() => {
                restoreFocusTrap();
                namaMesin.focus();
            });
            return;
        }
        if (lokasi <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Pilih lokasi mesin terlebih dahulu",
                returnFocus: false,
            }).then(() => {
                restoreFocusTrap();
                select_lokasiMesin.focus();
            });
            return;
        }
        if (typeMesin <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Pilih type mesin terlebih dahulu",
                returnFocus: false,
            }).then(() => {
                restoreFocusTrap();
                select_typeMesin.focus();
            });
            return;
        }

        $.ajax({
            url: "/MaintenanceMesinJBB",
            type: "POST",
            data: {
                jenisStore: idMesin ? "update" : "store",
                namaMesin: namaMesin.value,
                select_lokasiMesin: lokasi,
                select_typeMesin: typeMesin,
                idMesin: idMesin,
                _token: csrfToken,
            },
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil",
                        text: "Data berhasil ditambahkan",
                    }).then(() => {
                        restoreFocusTrap();
                        $("#tambahMesinJBBModal").modal("hide");
                        getDataMesin();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: response.error,
                    });
                    restoreFocusTrap();
                }
            },
            error: function (xhr, status, error) {
                console.error("Error adding data: ", error);
            },
        });
    });

    table_mesinJBB.on("click", "tbody tr", function () {
        let data = table_mesinJBB.row(this).data();
        console.log(data);

        // alert("You clicked on " + data.IdMesin + "'s row");
    });

    $(document).on("click", ".btn-detail", function (e) {
        var rowID = $(this).data("id");
        $.ajax({
            url: "/MaintenanceMesinJBB/getDetailMesin",
            data: {
                idMesin: rowID,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                console.log(response.dataDetailOrderKerja);
                detailMesinModalLabel.innerHTML =
                    "Detail Mesin " + response[0].NamaMesin;
                detailMesinLokasi.innerHTML = response[0].Lokasi;
                if (response[0].Aktif == 1) {
                    detailMesinStatusAktif.innerHTML = "Aktif";
                    detailMesinStatusAktif.classList.remove("text-danger");
                    detailMesinStatusAktif.classList.add("text-success");
                } else {
                    detailMesinStatusAktif.innerHTML = "Tidak Aktif";
                    detailMesinStatusAktif.classList.remove("text-success");
                    detailMesinStatusAktif.classList.add("text-danger");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-edit", function (e) {
        var rowID = $(this).data("id");
        $("#button_modalProses").data("id", rowID);
        tambahMesinJBBLabel.innerHTML = "Edit Mesin";
        getTypeMesin();
        $.ajax({
            url: "/MaintenanceMesinJBB/getDetailMesin",
            data: {
                idMesin: rowID,
                _token: csrfToken,
            },
            type: "GET",
            success: function (response) {
                console.log(response);
                namaMesin.value = response[0].Nama_Mesin;
                select_lokasiMesin.value = response[0].Id_Lokasi;
                select_typeMesin.value = response[0].Id_Type_Mesin;
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: ", error);
            },
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        var rowID = $(this).data("id");
        var namaMesin = $(this).data("namamesin");
        var isActive = $(this).data("aktif");
        let buttonLabel = isActive ? "Nonaktifkan" : "Aktifkan";

        Swal.fire({
            title: "Yakin untuk mengubah status mesin?",
            text:
                "Apakah anda yakin untuk " +
                buttonLabel +
                " mesin " +
                namaMesin +
                "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/MaintenanceMesinJBB/" + rowID,
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
                            getDataMesin();
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
                    "Status mesin tidak jadi dirubah :)",
                    "info"
                );
            }
        });
    });
    //#endregion
});
