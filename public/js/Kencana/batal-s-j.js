$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let customer = document.getElementById("customer");
    let idCustomer = document.getElementById("idCustomer");
    let list_customerButton = document.getElementById("list_customerButton");
    let surat_pesanan = document.getElementById("surat_pesanan");
    let list_suratpesananButton = document.getElementById(
        "list_suratpesananButton"
    );
    let idJenisSuratJalan = document.getElementById("idJenisSuratJalan");
    let jenisSuratJalan = document.getElementById("jenisSuratJalan");
    let list_jenisSuratJalanButton = document.getElementById(
        "list_jenisSuratJalanButton"
    );
    let surat_jalan = document.getElementById("surat_jalan");
    let alasan_batal = document.getElementById("alasan_batal");
    let proses_button = document.getElementById("proses_button");

    list_customerButton.focus();

    list_customerButton.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Select Customer",
                html: '<table id="customerTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>Id Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                returnFocus: false,
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
                            ajax: {
                                url: "BatalSJ/getAllCustomer",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [{ data: "IDCust" }, { data: "NamaCust" }],
                        });
                        $("#customerTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
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
                if (result.isConfirmed) {
                    list_suratpesananButton.disabled = false;
                    idCustomer.value = result.value.IDCust.split("-")[1].trim();
                    customer.value = result.value.NamaCust;
                    setTimeout(list_suratpesananButton.focus(), 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    list_suratpesananButton.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Select Surat Pesanan",
                html: '<table id="suratPesananTable" class="display" style="width:100%"><thead><tr><th>Nomor Surat Pesanan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                returnFocus: false,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#suratPesananTable")
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
                        const table = $("#suratPesananTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "BatalSJ/getSPBasedOnCustomer",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    IdCust: idCustomer.value,
                                },
                            },
                            columns: [{ data: "IDSuratPesanan" }],
                        });
                        $("#suratPesananTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "suratPesananTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    surat_pesanan.value = result.value.IDSuratPesanan;
                    list_jenisSuratJalanButton.disabled = false;
                    setTimeout(list_jenisSuratJalanButton.focus(), 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    list_jenisSuratJalanButton.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Select Jenis SJ",
                html: '<table id="jenisSJTable" class="display" style="width:100%"><thead><tr><th>Jenis Surat Jalan</th><th>Id Jenis SJ</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                returnFocus: false,
                preConfirm: () => {
                    const selectedData = $("#jenisSJTable")
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
                        const table = $("#jenisSJTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "BatalSJ/getJenisSJ",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "NamaJnsSuratJalan" },
                                { data: "IDJnsSuratJalan" },
                            ],
                        });
                        $("#jenisSJTable tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "jenisSJTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    idJenisSuratJalan.value = result.value.IDJnsSuratJalan;
                    jenisSuratJalan.value = result.value.NamaJnsSuratJalan;
                    setTimeout(surat_jalan.focus(), 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    surat_jalan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            alasan_batal.focus();
        }
    });

    proses_button.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default form submission

        let inputs = document.querySelectorAll("input, textarea"); // Select all input and textarea elements
        let allFilled = true; // Assume all inputs are filled
        let emptyInput = null; // Variable to hold the first empty input

        inputs.forEach(function (input) {
            // Ignore readonly inputs as they cannot be filled by the user
            if (input.value.trim() === "") {
                allFilled = false; // Set to false if any input is empty
                if (!emptyInput) {
                    emptyInput = input; // Store the first empty input
                }
            }
        });

        if (!allFilled) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Semua kolom harap diisi !",
                returnFocus: false,
            }).then((result) => {
                switch (emptyInput.id) {
                    case "customer":
                        setTimeout(list_customerButton.focus(), 300);
                        break;
                    case "surat_pesanan":
                        setTimeout(list_suratpesananButton.focus(), 300);
                        break;
                    case "jenisSuratJalan":
                        setTimeout(list_jenisSuratJalanButton.focus(), 300);
                        break;
                    default:
                        emptyInput.classList.add("input-error");
                        emptyInput.setCustomValidity(
                            "Please fill out this field."
                        );
                        emptyInput.reportValidity(); // This triggers the browser's validation message
                        setTimeout(emptyInput.focus(), 300);
                        break;
                }
            });
        } else {
            let formData = new FormData();
            inputs.forEach((input) => {
                formData.append(input.name, input.value);
            });
            // Append CSRF token to the FormData object
            formData.append("_token", csrfToken);

            $.ajax({
                type: "POST", // or 'GET' depending on your server setup
                url: "BatalSJ", // Specify the URL of your controller
                data: formData, // Directly pass the FormData object
                contentType: false, // Prevent jQuery from setting content type
                processData: false, // Prevent jQuery from processing data
                beforeSend: function () {
                    // Show loading screen
                    $("#loading-screen").css("display", "flex");
                },
                complete: function () {
                    // Hide loading screen
                    $("#loading-screen").css("display", "none");
                },
                success: function (response) {
                    // Handle the successful response from the controller
                    if (response.success) {
                        Swal.fire({
                            icon: "success",
                            title: "Pemberitahuan",
                            text: response.success,
                        });
                    }
                    console.log(response);
                },
                error: function (xhr, status, error) {
                    console.error(error); // Handle errors
                },
            });
        }
    });
});
