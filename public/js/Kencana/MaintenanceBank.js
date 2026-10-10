var csrfToken = $('meta[name="csrf-token"]').attr("content");

$(document).ready(function () {
    //#region Set up Variable

    var dataTableBank = $("#table_Bank").DataTable({
        serverSide: true,
        responsive: true,
        processing: true,
        ajax: {
            url: "/Kencana/MaintenanceBank/getAllBank",
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
            { data: "Id_Bank" },
            { data: "Nama_Bank" },
            // { data: "IdUserMaster" },
            {
                data: "Id_Bank",
                render: function (data, type, full, meta) {
                    var rowID = data;
                    return (
                        '<button id="editButtonBank' +
                        rowID +
                        '" class="btn btn-primary" data-Bank-id="' +
                        rowID +
                        '" data-bs-toggle="modal" data-typeForm="koreksi" data-bs-target="#modalBank" type="button">Edit</button>' +
                        '<button class="btn btn-danger" data-id="' +
                        rowID +
                        '">Non-aktif</button>'
                    );
                },
            },
        ],
    });
    // variabel element halaman maintenance bank
    let table_Bank = document.getElementById("table_Bank");

    // variabel element modal maintenance bank
    let modalBank = document.getElementById("modalBank");
    let modalLabelBank = document.getElementById("modalLabelBank");
    let formMaintenanceBank = document.getElementById("formMaintenanceBank");
    let idBank = document.getElementById("idBank");
    let isiNamaBank = document.getElementById("isiNamaBank");
    let jenisBankSelect_E = document.getElementById("jenisBankSelect_E");
    let jenisBankSelect_I = document.getElementById("jenisBankSelect_I");
    let ketKodePerkiraan = document.getElementById("ketKodePerkiraan");
    let kodePerkiraanSelect = document.getElementById("kodePerkiraanSelect");
    let noRekening = document.getElementById("noRekening");
    let saldoBank = document.getElementById("saldoBank");
    let alamat = document.getElementById("alamat");
    let kota = document.getElementById("kota");
    let telp = document.getElementById("telp");
    let person = document.getElementById("person");
    let hp = document.getElementById("hp");
    let prosesButtonModal = document.getElementById("prosesButtonModal");
    let button;
    let bankData;
    let typeform;
    let form;

    //#endregion

    //#region Function Mantap-mantap

    // Define the hapusBank function
    function hapusBank(event) {
        // Get the button element that triggered the event
        var button = event.target;
        // Retrieve the data-id attribute
        var dataId = button.getAttribute("data-id");
        // Log or use the dataId as needed
        console.log(dataId);

        $.ajax({
            url: "/Kencana/MaintenanceBank/" + dataId,
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
        dataTableBank.ajax.reload();
    }

    // Function to handle keypress events
    function ModalBankHandleEnterKeypress(e) {
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
            "#modalBank input:not([type='hidden']), #modalBank select, #modalBank button"
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

    modalBank.addEventListener("shown.bs.modal", function (event) {
        button = $(event.relatedTarget); // Button that triggered the modal
        bankData = button.data();
        typeform = button.data("typeform");
        form = $("#formMaintenanceBank");
        let inputElements = modalBank.querySelectorAll(
            "input, select, textarea"
        );
        // Add event listeners to all input elements within the modal
        inputElements.forEach(function (element) {
            element.addEventListener("keypress", ModalBankHandleEnterKeypress);
        });

        if (typeform == "koreksi") {
            //setting up modal supaya bisa koreksi
            modalLabelBank.innerHTML = "Koreksi Bank";
            idBank.value = button.data("bankId");
            idBank.readOnly = true;
            isiNamaBank.style.display = "block";
            isiNamaBank.focus();
            prosesButtonModal.disabled = true;
            form.attr("action", "/MaintenanceBank/" + idBank.value);
            form.attr("method", "PUT");

            $.ajax({
                //Get data bank menurut ID
                url: "/Kencana/MaintenanceBank/getCertainBank",
                method: "GET",
                data: {
                    idBank: idBank.value,
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
                    isiNamaBank.value = response[0].Nama_Bank;
                    kodePerkiraanSelect.value = response[0].KodePerkiraan;
                    if (kodePerkiraanSelect.value) {
                        ketKodePerkiraan.value =
                            kodePerkiraanSelect.options[
                                kodePerkiraanSelect.selectedIndex
                            ].text.split(" | ")[1]; // Nilai dari opsi yang dipilih (format: "id | nama")
                    }
                    noRekening.value = response[0].No_Rekening;
                    saldoBank.value = parseFloat(response[0].SaldoBank);
                    alamat.value = response[0].Alamat;
                    kota.value = response[0].Kota;
                    telp.value = response[0].No_Telp;
                    person.value = response[0].Nama_Person;
                    hp.value = response[0].No_HP;
                    if (response[0].Jenis_Bank == "E") {
                        jenisBankSelect_E.checked = true;
                    } else {
                        jenisBankSelect_I.checked = true;
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
        } else if (typeform == "tambah") {
            modalLabelBank.innerHTML = "Tambah Bank";
            form.attr("action", "/MaintenanceBank/");
            form.attr("method", "POST");
            idBank.focus();
        }
    });

    modalBank.addEventListener("hidden.bs.modal", function (event) {
        // Clear all input fields
        jenisBankSelect_E.checked = true;
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
        let inputElements = modalBank.querySelectorAll(
            "input, select, textarea"
        );

        inputElements.forEach(function (element) {
            element.removeEventListener(
                "keypress",
                ModalBankHandleEnterKeypress
            );
        });
    });

    kodePerkiraanSelect.addEventListener("change", function (event) {
        event.preventDefault();
        if (kodePerkiraanSelect.selectedIndex > 0) {
            ketKodePerkiraan.value = kodePerkiraanSelect.options[
                kodePerkiraanSelect.selectedIndex
            ].innerText
                .split("|")[1]
                .trim(); // Nilai dari opsi yang dipilih (format: "id | nama")
        }
    });

    prosesButtonModal.addEventListener("click", function (event) {
        event.preventDefault();
        if (typeform == "koreksi") {
            console.log(
                isiNamaBank.value,
                jenisBankSelect_E.checked ? "E" : "I",
                alamat.value,
                kota.value,
                telp.value,
                person.value,
                hp.value,
                saldoBank.value,
                noRekening.value,
                kodePerkiraanSelect.value
            );
            $.ajax({
                url: "/Kencana/MaintenanceBank/" + idBank.value,
                method: "PUT",
                data: {
                    namaBankSelect: isiNamaBank.value,
                    jenisBankSelect: jenisBankSelect_E.checked ? "E" : "I",
                    alamat: alamat.value,
                    kota: kota.value,
                    telp: telp.value,
                    person: person.value,
                    hp: hp.value,
                    saldoBank: saldoBank.value,
                    norekening: noRekening.value,
                    kodePerkiraanSelect: kodePerkiraanSelect.value,
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
                            console.log(modalBank);
                            $('#modalBank').modal('hide');
                            dataTableBank.ajax.reload();
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: response.error,
                        }).then((result) => {
                            $('#modalBank').modal('hide');
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
                data: new FormData(formMaintenanceBank),
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
                        }).then((result) => {
                            $('#modalBank').modal('hide');
                            dataTableBank.ajax.reload();
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: response.error,
                        }).then((result) => {
                            $('#modalBank').modal('hide');
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

    // Attach a click event listener to the table
    table_Bank.addEventListener("click", function (event) {
        // Check if the clicked element is a button with class 'btn btn-danger'
        if (event.target && event.target.classList.contains("btn-danger")) {
            hapusBank(event);
        }
    });

    //#endregion
});
