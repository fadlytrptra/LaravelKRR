// let tabelStatusSupplier = document.getElementById("tabelStatusSupplier");
// let idSupplier = document.getElementById("idSupplier");
// let namaSupplier = document.getElementById("namaSupplier");
// let idJenisSupplier = document.getElementById("idJenisSupplier");
// let namaJenisSupplier = document.getElementById("namaJenisSupplier");

// let btnIsi = document.getElementById("btnIsi");
// // let btnKoreksi = document.getElementById("btnKoreksi");
// let prosesButtonModal = document.getElementById("prosesButtonModal");
// let btnKeluar = document.getElementById("btnKeluar");
// // let btnBatal = document.getElementById("btnBatal");
// let dataTable;

// let formkoreksi = document.getElementById("formkoreksi");
// let methodform = document.getElementById("methodkoreksi");

// // btnKoreksi.addEventListener('click', function (event) {
// //     event.preventDefault();
// // });

// // btnBatal.addEventListener('click', function (event) {
// //     event.preventDefault();
// //     //namaBankselect.selectedIndex = 0;
// //     idSupplier.value = "";
// //     namaSupplier.value = "";
// //     idJenisSupplier.value = "";
// //     namaJenisSupplier.value = "";
// // });

// function clickKoreksi() {
//     btnIsi.disabled = true;
//     // btnKoreksi.disabled = true;
//     prosesButtonModal.style.display = "block";
//     // btnBatal.style.display = "block";
//     proses = 2;
// }

// function clickBatal() {
//     btnIsi.disabled = false;
//     // btnKoreksi.disabled = false;
//     prosesButtonModal.style.display = "none";
//     // btnBatal.style.display = "none";
// }

// fetch("/getTabelStatusSupplier/")
//     .then((response) => response.json())
//     .then((options) => {
//         console.log(options);
//         tabelStatusSupplier = $("#tabelStatusSupplier").DataTable({
//             data: options,
//             columns: [
//                 { title: "id. Supp", data: "NO_SUP" },
//                 { title: "Nama Supplier", data: "NM_SUP" },
//                 { title: "Saldo", data: "SALDO_HUTANG" },
//                 { title: "Saldo Rp", data: "SALDO_HUTANG_Rp" },
//                 { title: "Jns Supp", data: "Nama_MataUang" },
//                 { title: "Jns Bayar", data: "STATUS" },
//             ],
//         });

//         $("#tabelStatusSupplier tbody").off("click", "tr");
//         $("#tabelStatusSupplier tbody").on("click", "tr", function () {
//             let checkSelectedRows = $("#tabelStatusSupplier tbody tr.selected");

//             if (checkSelectedRows.length > 0) {
//                 // Remove "selected" class from previously selected rows
//                 checkSelectedRows.removeClass("selected");
//             }
//             $(this).toggleClass("selected");
//             const table = $("#tabelStatusSupplier").DataTable();
//             let selectedRows = table.rows(".selected").data().toArray();
//             console.log(selectedRows[0]);

//             fetch("/detailStatusSupplier/" + selectedRows[0].NO_SUP)
//                 .then((response) => response.json())
//                 .then((options) => {
//                     console.log(options);

//                     idSupplier.value = options[0].NO_SUP;
//                     namaSupplier.value = options[0].NM_SUP;
//                     idJenisSupplier.value = options[0].ID_MATAUANG;
//                     namaJenisSupplier.value = options[0].Nama_MataUang;
//                 });
//         });
//     });

// // btnProses.addEventListener("keypress", function (event) {
// //     event.preventDefault();
// //     fetch("/detailStatusSupplier/" + idSupplier.value)
// //         .then((response) => response.json())
// //         .then((options) => {
// //             console.log(options);
// //             idSupplier.value = options[0].NO_SUP;
// //             namaSupplier.value = options[0].NM_SUP;
// //         });

// // });

// prosesButtonModal.addEventListener("click", function (event) {
//     event.preventDefault();
//     //console.log("masuk korek");
//     methodform.value = "PUT";
//     formkoreksi.action = "/detailStatusSupplier/" + idSupplier.value;
//     //formkoreksi.append(hiddenInput);
//     formkoreksi.submit();
// });

$(document).ready(function () {
    //#region set up variable
    var csrfToken = $('meta[name="csrf-token"]').attr("content");

    var dataTableStatusSupplier = $("#table_StatusSupplier").DataTable({
        serverSide: true,
        responsive: true,
        processing: true,
        ajax: {
            url: "/Kencana/MaintenanceStatusSupplier/getAllStatusSupplier",
            type: "GET",
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
            error: function () {
                // Hide loading screen and show error message
                $("#loading-screen").css("display", "none");
                Swal.fire({
                    icon: "error",
                    title: "Data Tidak Berhasil Diload!",
                });
            },
        },
        columns: [
            { data: "NO_SUP" },
            { data: "NM_SUP" },
            {
                data: "SALDO_HUTANG",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0,0.0000");
                },
            },
            {
                data: "SALDO_HUTANG_Rp",
                render: function (data) {
                    return numeral(parseFloat(data)).format("0,0.0000");
                },
            },
            { data: "Nama_MataUang" },
            {
                data: "STATUS",
                render: function (data) {
                    if (data == null) {
                        return "[KOSONG]";
                    } else {
                        return data;
                    }
                },
            },
            {
                data: "NO_SUP",
                render: function (data, type, full, meta) {
                    var rowID = data;
                    return (
                        '<button id="editButtonStatusSupplier' +
                        rowID +
                        '" class="btn btn-primary" data-StatusSupplier-id="' +
                        rowID +
                        '" data-bs-toggle="modal" data-typeForm="koreksi" data-bs-target="#modalStatusSupplier" type="button">Ubah Status</button>'
                    );
                },
            },
        ],
    });

    let modalStatusSupplier = document.getElementById("modalStatusSupplier");
    let idSupplier = document.getElementById("idSupplier");
    let namaSupplier = document.getElementById("namaSupplier");
    let namaMataUang = document.getElementById("namaMataUang");
    let rbH = document.getElementById("rbH");
    let rbT = document.getElementById("rbT");
    let rbI = document.getElementById("rbI");
    let namaSupplierSelect = document.getElementById("namaSupplierSelect");
    let buttonSwitchNamaSupplier = document.getElementById(
        "buttonSwitchNamaSupplier"
    );
    let labelCatatanSelectSupplier = document.getElementById(
        "labelCatatanSelectSupplier"
    );
    let prosesButtonModal = document.getElementById("prosesButtonModal");
    let statusSupplier;
    let refreshSelect = false;

    //#endregion

    //#region Function

    function loadCertainSupplier(idsup) {
        $.ajax({
            //Get data Mata Uang menurut ID
            url: "/Kencana/MaintenanceStatusSupplier/getCertainSupplier",
            method: "GET",
            data: {
                idSupplier: idsup,
            },
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (response) {
                console.log(response);
                namaMataUang.value = response[0].Nama_MataUang;
                namaSupplier.value = response[0].NM_SUP;
                statusSupplier = response[0].STATUS ?? null;
                if (statusSupplier == "H" || statusSupplier == null) {
                    rbH.checked = true;
                } else if (statusSupplier == "T") {
                    rbT.checked = true;
                } else if (statusSupplier == "I") {
                    rbI.checked = true;
                }
                prosesButtonModal.disabled = false;
            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Data Tidak Berhasil Diload!",
                });
                console.error("Error saving data:", error);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
    }

    function refreshModal() {
        idSupplier.value = "";
        namaMataUang.value = "";
        namaSupplier.value = "";
        rbH.checked = true;
        namaSupplierSelect.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.innerText = "-- Pilih Supplier --";
        namaSupplierSelect.appendChild(defaultOption);
        $.ajax({
            //Get data Mata Uang menurut ID
            url: "/Kencana/MaintenanceStatusSupplier/getSupplierNullStatus",
            method: "GET",
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (response) {
                console.log(response);

                response.forEach((entry) => {
                    const option = document.createElement("option");
                    option.value = entry.NO_SUP;
                    option.innerText = entry.NM_SUP;
                    namaSupplierSelect.appendChild(option);
                });
                prosesButtonModal.disabled = false;
            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Data Tidak Berhasil Diload!",
                });
                console.error("Error saving data:", error);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
    }
    //#endregion

    //#region Add Event Listener

    modalStatusSupplier.addEventListener("shown.bs.modal", function (event) {
        button = $(event.relatedTarget); // Button that triggered the modal
        idSupplier.value = button.data("statussupplierId");
        prosesButtonModal.disabled = true;
        loadCertainSupplier(idSupplier.value);
    });

    modalStatusSupplier.addEventListener("hidden.bs.modal", function (event) {
        refreshSelect = false;
        namaSupplierSelect.selectedIndex = 0;
        namaSupplierSelect.style.display = "none";
        namaSupplier.style.display = "block";
        rbH.checked = true;
        namaMataUang.value = "";
        namaSupplier.value = "";
    });

    buttonSwitchNamaSupplier.addEventListener("click", function (e) {
        e.preventDefault();
        if (namaSupplierSelect.style.display !== "none") {
            namaSupplierSelect.style.display = "none";
            namaSupplier.style.display = "block";
            labelCatatanSelectSupplier.style.display = "none";
        } else if (namaSupplierSelect.style.display == "none") {
            namaSupplierSelect.style.display = "block";
            namaSupplier.style.display = "none";
            labelCatatanSelectSupplier.style.display = "block";
        }
    });

    namaSupplierSelect.addEventListener("change", function (e) {
        e.preventDefault();
        loadCertainSupplier(this.value);
        idSupplier.value = this.value;
        namaSupplier.value = this.options[this.selectedIndex].innerHTML;
        refreshSelect = true;
    });

    prosesButtonModal.addEventListener("click", function (e) {
        e.preventDefault();
        prosesButtonModal.disabled = true;
        if (rbH.checked == true) {
            statusSupplier = "H";
        } else if (rbI.checked == true) {
            statusSupplier = "I";
        } else if (rbT.checked == true) {
            statusSupplier = "T";
        }
        $.ajax({
            //Get data Mata Uang menurut ID
            url: "/Kencana/MaintenanceStatusSupplier/" + idSupplier.value,
            method: "PUT",
            data: {
                Status: statusSupplier,
            },
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: response.success,
                    });
                }
                if (!refreshSelect) {
                    prosesButtonModal.disabled = false;
                }
                dataTableStatusSupplier.ajax.reload();
            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: success.error,
                });
                console.error("Error saving data:", error);
            },
            complete: function () {
                // Hide loading screen
                if (!refreshSelect) {
                    $("#loading-screen").css("display", "none");
                } else if (refreshSelect) {
                    refreshModal();
                }
            },
        });
    });
    //#endregion
});
