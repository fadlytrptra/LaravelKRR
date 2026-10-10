$(document).ready(function () {
    //#region set up variable
    var csrfToken = $('meta[name="csrf-token"]').attr("content");

    var dataTableMataUang = $("#table_MataUang").DataTable({
        serverSide: true,
        responsive: true,
        processing: true,
        ajax: {
            url: "Kencana/MaintenanceMataUang/getAllMataUang",
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
            { data: "Id_MataUang_BC" },
            { data: "Nama_MataUang" },
            { data: "Symbol" },
            {
                data: "Id_MataUang",
                render: function (data, type, full, meta) {
                    var rowID = data;
                    return (
                        '<button id="editButtonMataUang' +
                        rowID +
                        '" class="btn btn-primary" data-MataUang-id="' +
                        rowID +
                        '" data-bs-toggle="modal" data-typeForm="koreksi" data-bs-target="#modalMataUang" type="button">Edit</button>' +
                        '<button class="btn btn-danger" data-id="' +
                        rowID +
                        '">Delete</button>'
                    );
                },
            },
        ],
    });

    // variabel element halaman maintenance mata uang
    let table_MataUang = document.getElementById("table_MataUang");

    // variabel element modal maintenance mata uang
    let modalMataUang = document.getElementById("modalMataUang");
    let modalLabelMataUang = document.getElementById("modalLabelMataUang");
    let idMataUang = document.getElementById("idMataUang");
    let kodeMataUang = document.getElementById("kodeMataUang");
    let namaMataUang = document.getElementById("namaMataUang");
    let symbol = document.getElementById("symbol");
    let prosesButtonModal = document.getElementById("prosesButtonModal");

    //#endregion

    //#region Function

    // Define the hapusBank function
    function hapusMataUang(event) {
        // Get the button element that triggered the event
        var button = event.target;
        // Retrieve the data-id attribute
        var dataId = button.getAttribute("data-id");
        // Log or use the dataId as needed
        console.log(dataId);

        $.ajax({
            url: "/Kencana/MaintenanceMataUang/" + dataId,
            method: "DELETE",
            processData: false,
            contentType: false,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (response) {
                console.log(response);
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: response.success,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: response.error,
                    });
                }
            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: error.statusText,
                });
                console.error("Error saving data:", error);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
        dataTableMataUang.ajax.reload();
    }

    // Function to handle keypress events
    function ModalMataUangHandleEnterKeypress(e) {
        if (e.key == "Enter") {
            e.preventDefault(); // Prevent the default action of the Enter key

            if (this.value == "") {
                this.value = "-";
            }

            // Find the next input element that is not readonly or disabled
            let nextElement = getNextFocusableElement(this);
            if (nextElement) {
                nextElement.focus();
            }
        }
    }

    // Function to get the next focusable element
    function getNextFocusableElement(currentElement) {
        let elements = document.querySelectorAll(
            "#modalMataUang input:not([type='hidden']), #modalMataUang select, #modalMataUang button"
        );
        let currentIndex = Array.prototype.indexOf.call(
            elements,
            currentElement
        );

        for (let i = currentIndex + 1; i < elements.length; i++) {
            if (!elements[i].readOnly && !elements[i].disabled) {
                return elements[i];
            }
        }
        return null;
    }

    //#endregion

    //#region Add Event Listener

    table_MataUang.addEventListener("click", function (event) {
        // Check if the clicked element is a button with class 'btn btn-danger'
        if (event.target && event.target.classList.contains("btn-danger")) {
            hapusMataUang(event);
        }
    });

    modalMataUang.addEventListener("shown.bs.modal", function (event) {
        button = $(event.relatedTarget); // Button that triggered the modal
        mataUangData = button.data();
        typeform = button.data("typeform");
        form = $("#formMaintenanceMataUang");
        idMataUang.value = button.data("matauangId");
        console.log(mataUangData);
        let inputElements = modalMataUang.querySelectorAll("input");
        // Add event listeners to all input elements within the modal
        inputElements.forEach(function (element) {
            element.addEventListener(
                "keypress",
                ModalMataUangHandleEnterKeypress
            );
        });

        if (typeform == "koreksi") {
            //setting up modal supaya bisa koreksi
            modalLabelMataUang.innerHTML = "Koreksi Mata Uang";
            prosesButtonModal.disabled = true;

            $.ajax({
                //Get data Mata Uang menurut ID
                url: "/Kencana/MaintenanceMataUang/getCertainMataUang",
                method: "GET",
                data: {
                    idMataUang: idMataUang.value,
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
                    kodeMataUang.value = response[0].Id_MataUang_BC;
                    namaMataUang.value = response[0].Nama_MataUang;
                    symbol.value = response[0].Symbol;
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
        } else if (typeform == "tambah") {
            modalLabelMataUang.innerHTML = "Tambah Mata Uang";
            kodeMataUang.focus();
        }
    });

    modalMataUang.addEventListener("hidden.bs.modal", function (event) {
        // Clear all input fields
        formMaintenanceBank.querySelectorAll("input").forEach(function (input) {
            input.value = "";
            input.readOnly = false;
        });

        // Reset all select elements to their first option
        formMaintenanceBank
            .querySelectorAll("select")
            .forEach(function (select) {
                select.selectedIndex = 0;
            });

        // Optionally, reset textareas if you have any
        formMaintenanceBank
            .querySelectorAll("textarea")
            .forEach(function (textarea) {
                textarea.value = "";
            });

        // Remove event listeners when the modal is hidden to prevent memory leaks
        let inputElements = modalMataUang.querySelectorAll(
            "input, select, textarea"
        );

        inputElements.forEach(function (element) {
            element.removeEventListener(
                "keypress",
                ModalMataUangHandleEnterKeypress
            );
        });
    });

    prosesButtonModal.addEventListener("click", function (event) {
        event.preventDefault();
        if (typeform == "koreksi") {
            $.ajax({
                url: "/Kencana/MaintenanceBank/" + idBank.value,
                method: "PUT",
                data: {
                    IdMataUang: idMataUang.value,
                    NamaMataUang: namaMataUang.value,
                    Symbol: symbol.value,
                    IdMataUangBC: kodeMataUang.value,
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
                    if (response.success) {
                        Swal.fire({
                            icon: "success",
                            title: response.success,
                        }).then((result) => {
                            console.log(modalMataUang);
                            $("#modalMataUang").modal("hide");
                            dataTableBank.ajax.reload();
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: response.error,
                        }).then((result) => {
                            $("#modalMataUang").modal("hide");
                            dataTableBank.ajax.reload();
                        });
                    }
                },
                error: function (error) {
                    Swal.fire({
                        icon: "error",
                        title: error.statusText,
                    });
                    console.error(error);
                },
                complete: function () {
                    // Hide loading screen
                    $("#loading-screen").css("display", "none");
                },
            });
        } else if (typeform == "tambah") {
            $.ajax({
                //Get data bank menurut ID
                url: "/Kencana/MaintenanceBank/",
                method: "POST",
                data: {
                    NamaMataUang: namaMataUang.value,
                    Symbol: symbol.value,
                    IdMataUangBC: kodeMataUang.value,
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
                    if (response.success) {
                        Swal.fire({
                            icon: "success",
                            title: response.success,
                        }).then((result) => {
                            $("#modalMataUang").modal("hide");
                            dataTableBank.ajax.reload();
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: response.error,
                        }).then((result) => {
                            $("#modalMataUang").modal("hide");
                            dataTableBank.ajax.reload();
                        });
                    }
                },
                error: function (error) {
                    Swal.fire({
                        icon: "error",
                        title: error.statusText,
                    });
                    console.error("Error saving data:", error);
                },
                complete: function () {
                    // Hide loading screen
                    $("#loading-screen").css("display", "none");
                },
            });
        }
    });

    //#endregion
});
