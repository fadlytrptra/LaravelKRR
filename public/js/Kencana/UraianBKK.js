document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let idBKK = document.getElementById("idBKK");
    let idDetail = document.getElementById("idDetail");
    let nilai = document.getElementById("nilai");
    let tabelListBKK = $("#tabelListBKK").DataTable();
    let idBayar = document.getElementById("idBayar");
    let rincian = document.getElementById("rincian");
    let nilaiRincian = document.getElementById("nilaiRincian");
    let kodePerkiraanSelect = document.getElementById("kodePerkiraanSelect");
    let idKodePerkiraan = document.getElementById("idKodePerkiraan");
    let total = document.getElementById("total");
    let btn_kp = document.getElementById("btn_kp");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");

    let btnIsi = document.getElementById("btnIsi");
    // let btnProses = document.getElementById("btnProses");

    let proses;

    btn_proses.disabled = true;
    btn_batal.disabled = true;

    function escapeHTML(text) {
        return text
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'");
    }

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        tabelListBKK.clear().draw();
        idBKK.value = "";
        nilai.value = "";
        idDetail.value = "";
        idBayar.value = "";
        rincian.value = "";
        nilaiRincian.value = "";
        kodePerkiraanSelect.value = "";
        idKodePerkiraan.value = "";
        total.value = "";

        btn_proses.disabled = true;
        btn_batal.disabled = true;
        // kodeBarangAsal.value = "";
        // tanggal.value = "";
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        $.ajax({
            url: "/Kencana/MaintenanceUraianBKKKencana",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: proses,
                idBKK: idBKK.value,
                idDetail: idDetail.value,
                idBayar: idBayar.value,
                rincian: rincian.value,
                nilaiRincian: nilaiRincian.value,
                idKodePerkiraan: idKodePerkiraan.value,
            },
            success: function (response) {
                console.log(response);
                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then(() => {
                        // location.reload();
                        // document
                        //     .querySelectorAll("input")
                        //     .forEach((input) => (input.value = ""));
                        // $("#tabelListBKK").DataTable().ajax.reload();
                        fetch("/Kencana/getCheckBKKIdBKKKencana/" + idBKK.value)
                            .then((response) => response.json())
                            .then((options) => {
                                console.log(options);

                                if (options[0].Ada == 0) {
                                    alert(
                                        "Tidak ada data BKK : " + idBKK.value
                                    );
                                } else {
                                    fetch("/Kencana/getListBKKKencana/" + idBKK.value)
                                        .then((response) => response.json())
                                        .then((data) => {
                                            console.log(data);

                                            nilai.value = numeral(
                                                data[0].Nilai_Pembulatan
                                            ).format("0,0.0000");

                                            tabelListBKK = $(
                                                "#tabelListBKK"
                                            ).DataTable({
                                                destroy: true,
                                                data: data,
                                                columns: [
                                                    {
                                                        title: "Id. Detail",
                                                        data: "Id_Detail_Bayar",
                                                    },
                                                    {
                                                        title: "Rincian",
                                                        data: "Rincian_Bayar",
                                                    },
                                                    {
                                                        title: "Nilai Rincian",
                                                        data: "Nilai_Rincian",
                                                        render: function (
                                                            data,
                                                            type,
                                                            row
                                                        ) {
                                                            return numeral(
                                                                data
                                                            ).format(
                                                                "0,0.0000"
                                                            );
                                                        },
                                                    },
                                                    {
                                                        title: "Kd. Perkiraan",
                                                        data: "Kode_Perkiraan",
                                                    },
                                                    {
                                                        title: "Id. Bayar",
                                                        data: "Id_Pembayaran",
                                                    },
                                                ],
                                            });
                                        });

                                    fetch(
                                        "/Kencana/getListBKKTotalIdBKKKencana/" + idBKK.value
                                    )
                                        .then((response) => response.json())
                                        .then((list) => {
                                            console.log(list);

                                            total.value = numeral(
                                                list[0].Nilai
                                            ).format("0,0.0000");
                                        });
                                }
                            });
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
                Swal.fire({
                    title: "Error!",
                    text: xhr.responseJSON.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            },
        });
    });

    idBKK.addEventListener("keypress", function (event) {
        if (event.key == "Enter") {
            event.preventDefault();

            fetch("/Kencana/getCheckBKKIdBKKKencana/" + idBKK.value)
                .then((response) => response.json())
                .then((options) => {
                    console.log(options);

                    if (options[0].Ada == 0) {
                        alert("Tidak ada data BKK : " + idBKK.value);
                    } else {
                        fetch("/Kencana/getListBKKKencana/" + idBKK.value)
                            .then((response) => response.json())
                            .then((data) => {
                                console.log(data);

                                nilai.value = numeral(
                                    data[0].Nilai_Pembulatan
                                ).format("0,0.0000");

                                tabelListBKK = $("#tabelListBKK").DataTable({
                                    destroy: true,
                                    data: data,
                                    columns: [
                                        {
                                            title: "Id. Detail",
                                            data: "Id_Detail_Bayar",
                                        },
                                        {
                                            title: "Rincian",
                                            data: "Rincian_Bayar",
                                        },
                                        {
                                            title: "Nilai Rincian",
                                            data: "Nilai_Rincian",
                                            render: function (data, type, row) {
                                                return numeral(data).format(
                                                    "0,0.0000"
                                                );
                                            },
                                        },
                                        {
                                            title: "Kd. Perkiraan",
                                            data: "Kode_Perkiraan",
                                        },
                                        {
                                            title: "Id. Bayar",
                                            data: "Id_Pembayaran",
                                        },
                                    ],
                                });
                            });

                        fetch("/Kencana/getListBKKTotalIdBKKKencana/" + idBKK.value)
                            .then((response) => response.json())
                            .then((list) => {
                                console.log(list);

                                total.value = numeral(list[0].Nilai).format(
                                    "0,0.0000"
                                );
                            });
                    }
                });
        }
    });

    let selectedRows = [];

    $("#tabelListBKK tbody").off("click", "tr");
    $("#tabelListBKK tbody").on("click", "tr", function () {
        let checkSelectedRows = $("#tabelListBKK tbody tr.selected");

        if (checkSelectedRows.length > 0) {
            // Remove "selected" class from previously selected rows
            checkSelectedRows.removeClass("selected");
        }
        $(this).toggleClass("selected");
        const table = $("#tabelListBKK").DataTable();
        selectedRows = table.rows(".selected").data().toArray();
        console.log(selectedRows[0]);
    });

    btnIsi.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(selectedRows[0]);

        idBayar.value = selectedRows[0].Id_Pembayaran;
        rincian.focus();
        proses = 1;

        btn_proses.disabled = false;
        btn_batal.disabled = false;
    });

    rincian.addEventListener("keypress", function (event) {
        if (event.key == "Enter") {
            event.preventDefault();
            nilaiRincian.focus();
        }
    });

    nilaiRincian.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(nilaiRincian.value.replace(/,/g, ""));
            nilaiRincian.value = value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            btn_kp.focus();
        }
    });

    // nilaiRincian.addEventListener("keypress", function (event) {
    //     if (event.key == "Enter") {
    //         event.preventDefault();
    //         kodePerkiraanSelect.focus();
    //     }
    // });

    // fetch("/detailkodeperkiraan/" + 1)
    //     .then((response) => response.json())
    //     .then((options) => {
    //         console.log(options);
    //         kodePerkiraanSelect.innerHTML = "";

    //         const defaultOption = document.createElement("option");
    //         defaultOption.disabled = true;
    //         defaultOption.selected = true;
    //         defaultOption.innerText = "Kode Perkiraan";
    //         kodePerkiraanSelect.appendChild(defaultOption);

    //         options.forEach((entry) => {
    //             const option = document.createElement("option");
    //             option.value = entry.NoKodePerkiraan;
    //             option.innerText =
    //                 entry.NoKodePerkiraan + "|" + entry.Keterangan;
    //             kodePerkiraanSelect.appendChild(option);
    //         });
    //     });

    kodePerkiraanSelect.addEventListener("change", function (event) {
        event.preventDefault();
        const selectedOption =
            kodePerkiraanSelect.options[kodePerkiraanSelect.selectedIndex];
        if (selectedOption) {
            const selectedValue = selectedOption.textContent;
            const idMU = selectedValue.split("|")[0];
            idKodePerkiraan.value = idMU;

            btnProses.focus();
        }
    });

    btn_kp.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="kodeperkiraanTable" class="display" style="width:100%"><thead><tr><th>No Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#kodeperkiraanTable")
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
                        const table = $("#kodeperkiraanTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/MaintenanceUraianBKKKencana/getListKP",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "NoKodePerkiraan",
                                },
                                {
                                    data: "Keterangan",
                                },
                            ],
                        });
                        setTimeout(() => {
                            $("#kodeperkiraanTable_filter input").focus();
                        }, 300);
                        // $("#kodeperkiraanTable_filter input").on(
                        //     "keyup",
                        //     function () {
                        //         table
                        //             .columns(1) // Kolom kedua (Kode_KodePerkiraan)
                        //             .search(this.value) // Cari berdasarkan input pencarian
                        //             .draw(); // Perbarui hasil pencarian
                        //     }
                        // );
                        $("#kodeperkiraanTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "kodeperkiraanTable")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    idKodePerkiraan.value = selectedRow.NoKodePerkiraan.trim();
                    kodePerkiraanSelect.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btnKoreksi.addEventListener("click", function (event) {
        event.preventDefault();
        proses = 2;
        console.log(selectedRows[0]);

        btn_proses.disabled = false;
        btn_batal.disabled = false;

        idDetail.value = selectedRows[0].Id_Detail_Bayar;
        rincian.value = selectedRows[0].Rincian_Bayar;
        nilaiRincian.value = selectedRows[0].Nilai_Rincian;
        idBayar.value = selectedRows[0].Id_Pembayaran;
        idKodePerkiraan.value = selectedRows[0].Kode_Perkiraan;

        let KP = idKodePerkiraan.value;
        let opt3 = kodePerkiraanSelect.options;
        for (let i = 0; i < opt3.length; i++) {
            if (opt3[i].value == KP) {
                kodePerkiraanSelect.selectedIndex = i;
                break;
            }
        }
        rincian.focus();
    });

    // btnProses.addEventListener("click", function (event) {
    //     event.preventDefault();

    //     if (proses == 1) {
    //     } else if (proses == 2) {
    //     }
    // });
});
