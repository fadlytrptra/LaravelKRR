let table_sparepart_container = document.getElementById("table_sparepart_container"); // prettier-ignore
let button_tambahSparepart = document.getElementById("button_tambahSparepart");
const namaSparepart = document.getElementById("namaSparepart");
const identificationNumber = document.getElementById("identificationNumber");
const keterangan = document.getElementById("keterangan");
let modal_ok = document.getElementById("modal_ok");
let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
let table_sparepart = $("#table_sparepart").DataTable({
    processing: true, // Optional, as processing is more relevant for server-side
    responsive: true,
    ordering: false,
    autoWidth: false,
    data: [], // This will be populated with client-side data
    columns: [
        { data: "NamaSparepart" },
        {
            data: "IdentificationNumber",
            render: function (data, type, full, meta) {
                if (data == "" || data == null) {
                    // If the data is empty or null, return a message
                    return '<span class="text-danger">Tidak ada</span>';
                } else {
                    return data;
                }
            },
        },
        { data: "Keterangan" },
        {
            data: "IdSparepart",
            render: function (data, type, full, meta) {
                return (
                    '<button class="btn btn-primary btn-edit" data-id="' +
                    data +
                    '">Edit</button> ' +
                    '<button class="btn btn-danger btn-delete" data-id="' +
                    data +
                    '">Hapus</button>'
                );
            },
        },
    ],
});

getDataPermohonan();

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

function getDataPermohonan() {
    // Fetch the data from your server using an AJAX call
    $.ajax({
        url: "/MaintenanceAllJenisSparepart/selectAllJenisSparepart",
        type: "GET",
        success: function (response) {
            // Check if response.data is empty
            if (response.data && response.data.length > 0) {
                // Assuming your server returns an array of objects for the table data
                table_sparepart.clear().rows.add(response.data).draw();
            } else {
                // Clear the table if response.data is empty
                table_sparepart.clear().draw();
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching data: ", error);
        },
    });
}

$(document).ready(function () {
    button_tambahSparepart.addEventListener("click", function (event) {
        event.preventDefault();
        $("#modal_tambahSparepart").modal("show");
        namaSparepart.disabled = false;
        identificationNumber.disabled = false;
        keterangan.disabled = false;
    });

    $("#modal_tambahSparepart").on("shown.bs.modal", function (event) {
        namaSparepart.focus();
    });

    $("#modal_tambahSparepart").on("hidden.bs.modal", function (event) {
        namaSparepart.value = "";
        identificationNumber.value = "";
        keterangan.value = "";
        namaSparepart.disabled = true;
        identificationNumber.disabled = true;
        keterangan.disabled = true;
        modal_ok.setAttribute("data-id", null);
    });

    modal_ok.addEventListener("click", function (event) {
        event.preventDefault();
        let dataId = $(this).data("id");
        console.log(dataId);
        if (dataId != null || dataId != "" || dataId != undefined) {
            $.ajax({
                url: "/MaintenanceAllJenisSparepart",
                type: "POST",
                data: {
                    idStore: "editJenisSparepart",
                    idJenisSparepart: dataId,
                    namaSparepart: namaSparepart.value,
                    identificationNumber: identificationNumber.value,
                    keterangan: keterangan.value,
                    _token: csrfToken,
                },
                success: function (response) {
                    if (response.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Terjadi Kesalahan",
                            text: response.error,
                            showConfirmButton: false,
                        });
                    } else {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: response.success,
                            showConfirmButton: false,
                        });
                        $("#modal_tambahSparepart").modal("hide");
                        getDataPermohonan();
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: error,
                        showConfirmButton: false,
                    });
                },
            });
        } else {
            $.ajax({
                url: "/MaintenanceAllJenisSparepart",
                type: "POST",
                data: {
                    idStore: "tambahJenisSparepart",
                    namaSparepart: namaSparepart.value,
                    identificationNumber: identificationNumber.value,
                    keterangan: keterangan.value,
                    _token: csrfToken,
                },
                success: function (response) {
                    if (response.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Terjadi Kesalahan",
                            text: response.error,
                            showConfirmButton: false,
                        });
                    } else {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: response.success,
                            showConfirmButton: false,
                        });
                        $("#modal_tambahSparepart").modal("hide");
                        getDataPermohonan();
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Terjadi Kesalahan",
                        text: error,
                        showConfirmButton: false,
                    });
                },
            });
        }
    });

    $(document).on("click", ".btn-edit", function (e) {
        e.preventDefault();
        let rowID = $(this).data("id");
        $("#modal_tambahSparepart").modal("show");
        $.ajax({
            type: "GET",
            url: "/MaintenanceAllJenisSparepart/selectJenisSparepart",
            data: {
                _token: csrfToken,
                idJenisSparepart: rowID,
            },
            success: function (response) {
                if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                } else {
                    namaSparepart.value = response.data[0].NamaSparepart;
                    identificationNumber.value = response.data[0].IdentificationNumber; // prettier-ignore
                    keterangan.value = response.data[0].Keterangan;
                    modal_ok.setAttribute("data-id", rowID);
                    namaSparepart.disabled = false;
                    identificationNumber.disabled = false;
                    keterangan.disabled = false;
                }
            },
            error: function (xhr, status, error) {
                console.error(error);
            },
        });
    });

    $(document).on("click", ".btn-delete", function (e) {
        e.preventDefault();
        let dataId = $(this).data("id");
        Swal.fire({
            title: "Yakin untuk menghapus?",
            text: "Apakah anda yakin untuk menghapus data sparepart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "/MaintenanceAllJenisSparepart",
                    type: "POST",
                    data: {
                        idStore: "deleteJenisSparepart",
                        idJenisSparepart: dataId,
                        _token: csrfToken,
                    },
                    success: function (response) {
                        if (response.error) {
                            Swal.fire({
                                icon: "error",
                                title: "Terjadi Kesalahan",
                                text: response.error,
                                showConfirmButton: false,
                            });
                        } else {
                            Swal.fire({
                                icon: "success",
                                title: "Success!",
                                text: response.success,
                                showConfirmButton: false,
                            });
                            getDataPermohonan();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("Error:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Terjadi Kesalahan",
                            text: error,
                            showConfirmButton: false,
                        });
                    },
                });
            } else if (result.isDismissed) {
                // If user cancels, show a message
                Swal.fire(
                    "Pemberitahuan",
                    "Data sparepart tidak jadi dihapus :)",
                    "info"
                );
            }
        });
    });
});
