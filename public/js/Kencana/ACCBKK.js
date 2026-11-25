$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_bank = document.getElementById("btn_bank");
    let btn_isi = document.getElementById("btn_isi");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");
    let bank = document.getElementById("bank");
    let id_pembayaran = document.getElementById("id_pembayaran");
    let id_penagihan = document.getElementById("id_penagihan");
    let rincian = document.getElementById("rincian");
    let jenis_pembayaran = document.getElementById("jenis_pembayaran");
    let jumlah_pembayaran = document.getElementById("jumlah_pembayaran");
    let id_jenisbayar = document.getElementById("id_jenisbayar");
    let mataUang = document.getElementById("mataUang");
    let nilaiPenagihan = document.getElementById("nilaiPenagihan");
    let nilaiPenagihanRP = document.getElementById("nilaiPenagihanRP");
    let mata_uangbawah = document.getElementById("mata_uangbawah");
    let nilaidibayarkan = document.getElementById("nilaidibayarkan");
    let nilaikurs = document.getElementById("nilaikurs");
    let mata_uangkanan = document.getElementById("mata_uangkanan");
    let nilaiSudahDibayar = document.getElementById("nilaiSudahDibayar");
    let nilaiBelumDibayar = document.getElementById("nilaiBelumDibayar");
    let id_matauang = document.getElementById("id_matauang");
    let rowData;
    let confirm_lunas;

    btn_proses.style.display = "none";
    nilaidibayarkan.value = 0;
    nilaikurs.value = 1;
    nilaiSudahDibayar.value = 0;
    nilaiBelumDibayar.value = 0;

    let tablepertama = $("#tablepertama").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "/Kencana/MaintenanceACCBKKKencana/getPengajuan",
            dataType: "json",
            type: "GET",
            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                });
            },
        },
        columns: [
            {
                data: "Id_Pembayaran",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "Id_Penagihan" },
            { data: "Id_Bank" },
            { data: "Rincian_Bayar" },
            { data: "Nilai_Pembayaran" },
            { data: "Jenis_Pembayaran" },
            { data: "Nama_MataUang" },
            { data: "Jml_JenisBayar" },
            { data: "Kurs_Bayar",
                render: function (data) {
                    return numeral(data).format("0.00");
                }

            },
            { data: "NM_SUP" },
            { data: "Id_Jenis_Bayar" },
            { data: "Id_MataUang" },
        ],
        columnDefs: [{ targets: [10, 11], visible: false }],
        paging: false,
        scrollY: "300px",
        scrollCollapse: true,
    });

    $("#tablepertama tbody").off("change", 'input[name="penerimaCheckbox"]');

    $("#tablepertama tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowData = tablepertama.row($(this).closest("tr")).data();
                console.log(rowData, this, tablepertama);
                const formatDate = (dateString) => {
                    if (!dateString)
                        return new Date().toISOString().split("T")[0];
                    const date = new Date(dateString);
                    const offset = date.getTimezoneOffset();
                    const adjustedDate = new Date(
                        date.getTime() - offset * 60 * 1000
                    );
                    return adjustedDate.toISOString().split("T")[0];
                };
            }
        }
    );

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_isi.addEventListener("click", function (event) {
        event.preventDefault();
        if (rowData == null && rowData == undefined) {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih data terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        }
        btn_isi.style.display = "none";
        btn_proses.style.display = "block";
        id_pembayaran.value = rowData.Id_Pembayaran;
        id_penagihan.value = rowData.Id_Penagihan;
        rincian.value = rowData.Rincian_Bayar;
        bank.value = rowData.Id_Bank;
        jenis_pembayaran.value = rowData.Jenis_Pembayaran;
        jumlah_pembayaran.value = rowData.Jml_JenisBayar;
        id_jenisbayar.value = rowData.Id_Jenis_Bayar;
        mataUang.value = rowData.Nama_MataUang;
        nilaiPenagihan.value = rowData.Nilai_Pembayaran;
        nilaiPenagihanRP.value = rowData.Nilai_Pembayaran;
        mata_uangbawah.value = rowData.Nama_MataUang;
        nilaidibayarkan.value = rowData.Nilai_Pembayaran;
        nilaikurs.value = numeral(rowData.Kurs_Bayar).format("0.00");
        mata_uangkanan.value = rowData.Nama_MataUang;
        nilaiSudahDibayar.value = rowData.Nilai_Pembayaran;
        id_matauang.value = rowData.Id_MataUang;
        nilaiBelumDibayar.value = "0.00";
    });

    btn_bank.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Bank",
                html: '<table id="bankTable" class="display" style="width:100%"><thead><tr><th>ID Bank</th><th>Nama Bank</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#bankTable")
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
                        const table = $("#bankTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "/Kencana/MaintenanceACCBKKKencana/getBank",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "Id_Bank",
                                },
                                {
                                    data: "Nama_Bank",
                                },
                            ],
                        });
                        $("#bankTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                        });
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    // sp1.value = decodeHtml(selectedRow.Supplier).trim();
                    bank.value = selectedRow.Id_Bank.trim();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_proses.addEventListener("click", function (event) {
        event.preventDefault();
        if (nilaidibayarkan.value !== nilaiPenagihan.value) {
            Swal.fire({
                title: "Dianggap Lunas ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
            }).then((result) => {
                if (result.isConfirmed) {
                    confirm_lunas = "yes";
                    $.ajax({
                        url: "/Kencana/MaintenanceACCBKKKencana",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            confirm_lunas: confirm_lunas,
                            rincian: rincian.value,
                            id_pembayaran: id_pembayaran.value,
                            mataUang: mataUang.value,
                            mata_uangbawah: mata_uangbawah.value,
                            nilaidibayarkan: nilaidibayarkan.value,
                            nilaiPenagihan: nilaiPenagihan.value,
                            id_matauang: id_matauang.value,
                            nilaiPenagihanRP: nilaiPenagihanRP.value,
                            bank: bank.value,
                            id_jenisbayar: id_jenisbayar.value,
                            id_matauang: id_matauang.value,
                            jumlah_pembayaran: jumlah_pembayaran.value,
                            nilaikurs: nilaikurs.value,
                        },
                        success: function (response) {
                            if (response.message) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: response.message,
                                    showConfirmButton: true,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        tablepertama.ajax.reload();
                                        btn_isi.style.display = "block";
                                        btn_proses.style.display = "none";
                                        document
                                            .querySelectorAll("input")
                                            .forEach(
                                                (input) => (input.value = "")
                                            );
                                    } else {
                                        tablepertama.ajax.reload();
                                        btn_isi.style.display = "block";
                                        btn_proses.style.display = "none";
                                        document
                                            .querySelectorAll("input")
                                            .forEach(
                                                (input) => (input.value = "")
                                            );
                                    }
                                });
                            } else if (response.error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: response.error,
                                    showConfirmButton: false,
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            let errorMessage =
                                "Terjadi kesalahan saat memproses data.";
                            if (xhr.responseJSON && xhr.responseJSON.error) {
                                errorMessage = xhr.responseJSON.error;
                            } else if (xhr.responseText) {
                                try {
                                    const response = JSON.parse(
                                        xhr.responseText
                                    );
                                    errorMessage =
                                        response.error || errorMessage;
                                } catch (e) {
                                    console.error(
                                        "Error parsing JSON response:",
                                        e
                                    );
                                }
                            }

                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: errorMessage,
                                showConfirmButton: false,
                            });
                        },
                    });
                } else {
                    confirm_lunas = "no";
                    $.ajax({
                        url: "/Kencana/MaintenanceACCBKKKencana",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            confirm_lunas: confirm_lunas,
                            rincian: rincian.value,
                            id_pembayaran: id_pembayaran.value,
                            mataUang: mataUang.value,
                            mata_uangbawah: mata_uangbawah.value,
                            nilaidibayarkan: nilaidibayarkan.value,
                            nilaiPenagihan: nilaiPenagihan.value,
                            id_matauang: id_matauang.value,
                            nilaiPenagihanRP: nilaiPenagihanRP.value,
                            bank: bank.value,
                            id_jenisbayar: id_jenisbayar.value,
                            id_matauang: id_matauang.value,
                            jumlah_pembayaran: jumlah_pembayaran.value,
                            nilaikurs: nilaikurs.value,
                        },
                        success: function (response) {
                            if (response.message) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: response.message,
                                    showConfirmButton: true,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        tablepertama.ajax.reload();
                                        btn_isi.style.display = "block";
                                        btn_proses.style.display = "none";
                                        document
                                            .querySelectorAll("input")
                                            .forEach(
                                                (input) => (input.value = "")
                                            );
                                    } else {
                                        tablepertama.ajax.reload();
                                        btn_isi.style.display = "block";
                                        btn_proses.style.display = "none";
                                        document
                                            .querySelectorAll("input")
                                            .forEach(
                                                (input) => (input.value = "")
                                            );
                                    }
                                });
                            } else if (response.error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: response.error,
                                    showConfirmButton: false,
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            let errorMessage =
                                "Terjadi kesalahan saat memproses data.";
                            if (xhr.responseJSON && xhr.responseJSON.error) {
                                errorMessage = xhr.responseJSON.error;
                            } else if (xhr.responseText) {
                                try {
                                    const response = JSON.parse(
                                        xhr.responseText
                                    );
                                    errorMessage =
                                        response.error || errorMessage;
                                } catch (e) {
                                    console.error(
                                        "Error parsing JSON response:",
                                        e
                                    );
                                }
                            }

                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: errorMessage,
                                showConfirmButton: false,
                            });
                        },
                    });
                }
            });
        } else if (nilaidibayarkan.value !== nilaiPenagihanRP.value) {
            Swal.fire({
                title: "Dianggap Lunas ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
            }).then((result) => {
                if (result.isConfirmed) {
                    confirm_lunas = "yes";
                    $.ajax({
                        url: "/Kencana/MaintenanceACCBKKKencana",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            confirm_lunas: confirm_lunas,
                            rincian: rincian.value,
                            id_pembayaran: id_pembayaran.value,
                            mataUang: mataUang.value,
                            mata_uangbawah: mata_uangbawah.value,
                            nilaidibayarkan: nilaidibayarkan.value,
                            nilaiPenagihan: nilaiPenagihan.value,
                            id_matauang: id_matauang.value,
                            nilaiPenagihanRP: nilaiPenagihanRP.value,
                            bank: bank.value,
                            id_jenisbayar: id_jenisbayar.value,
                            id_matauang: id_matauang.value,
                            jumlah_pembayaran: jumlah_pembayaran.value,
                            nilaikurs: nilaikurs.value,
                        },
                        success: function (response) {
                            if (response.message) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: response.message,
                                    showConfirmButton: true,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        tablepertama.ajax.reload();
                                        btn_isi.style.display = "block";
                                        btn_proses.style.display = "none";
                                        document
                                            .querySelectorAll("input")
                                            .forEach(
                                                (input) => (input.value = "")
                                            );
                                    } else {
                                        tablepertama.ajax.reload();
                                        btn_isi.style.display = "block";
                                        btn_proses.style.display = "none";
                                        document
                                            .querySelectorAll("input")
                                            .forEach(
                                                (input) => (input.value = "")
                                            );
                                    }
                                });
                            } else if (response.error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: response.error,
                                    showConfirmButton: false,
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            let errorMessage =
                                "Terjadi kesalahan saat memproses data.";
                            if (xhr.responseJSON && xhr.responseJSON.error) {
                                errorMessage = xhr.responseJSON.error;
                            } else if (xhr.responseText) {
                                try {
                                    const response = JSON.parse(
                                        xhr.responseText
                                    );
                                    errorMessage =
                                        response.error || errorMessage;
                                } catch (e) {
                                    console.error(
                                        "Error parsing JSON response:",
                                        e
                                    );
                                }
                            }

                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: errorMessage,
                                showConfirmButton: false,
                            });
                        },
                    });
                } else {
                    confirm_lunas = "no";
                    $.ajax({
                        url: "/Kencana/MaintenanceACCBKKKencana",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            confirm_lunas: confirm_lunas,
                            rincian: rincian.value,
                            id_pembayaran: id_pembayaran.value,
                            mataUang: mataUang.value,
                            mata_uangbawah: mata_uangbawah.value,
                            nilaidibayarkan: nilaidibayarkan.value,
                            nilaiPenagihan: nilaiPenagihan.value,
                            id_matauang: id_matauang.value,
                            nilaiPenagihanRP: nilaiPenagihanRP.value,
                            bank: bank.value,
                            id_jenisbayar: id_jenisbayar.value,
                            id_matauang: id_matauang.value,
                            jumlah_pembayaran: jumlah_pembayaran.value,
                            nilaikurs: nilaikurs.value,
                        },
                        success: function (response) {
                            if (response.message) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: response.message,
                                    showConfirmButton: true,
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        tablepertama.ajax.reload();
                                        btn_isi.style.display = "block";
                                        btn_proses.style.display = "none";
                                        document
                                            .querySelectorAll("input")
                                            .forEach(
                                                (input) => (input.value = "")
                                            );
                                    } else {
                                        tablepertama.ajax.reload();
                                        btn_isi.style.display = "block";
                                        btn_proses.style.display = "none";
                                        document
                                            .querySelectorAll("input")
                                            .forEach(
                                                (input) => (input.value = "")
                                            );
                                    }
                                });
                            } else if (response.error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: response.error,
                                    showConfirmButton: false,
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            let errorMessage =
                                "Terjadi kesalahan saat memproses data.";
                            if (xhr.responseJSON && xhr.responseJSON.error) {
                                errorMessage = xhr.responseJSON.error;
                            } else if (xhr.responseText) {
                                try {
                                    const response = JSON.parse(
                                        xhr.responseText
                                    );
                                    errorMessage =
                                        response.error || errorMessage;
                                } catch (e) {
                                    console.error(
                                        "Error parsing JSON response:",
                                        e
                                    );
                                }
                            }

                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: errorMessage,
                                showConfirmButton: false,
                            });
                        },
                    });
                }
            });
        } else {
            confirm_lunas = "yes";
            $.ajax({
                url: "/Kencana/MaintenanceACCBKKKencana",
                type: "POST",
                data: {
                    _token: csrfToken,
                    confirm_lunas: confirm_lunas,
                    rincian: rincian.value,
                    id_pembayaran: id_pembayaran.value,
                    mataUang: mataUang.value,
                    mata_uangbawah: mata_uangbawah.value,
                    nilaidibayarkan: nilaidibayarkan.value,
                    nilaiPenagihan: nilaiPenagihan.value,
                    id_matauang: id_matauang.value,
                    nilaiPenagihanRP: nilaiPenagihanRP.value,
                    bank: bank.value,
                    id_jenisbayar: id_jenisbayar.value,
                    id_matauang: id_matauang.value,
                    jumlah_pembayaran: jumlah_pembayaran.value,
                    nilaikurs: nilaikurs.value,
                },
                success: function (response) {
                    if (response.message) {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: response.message,
                            showConfirmButton: true,
                        }).then((result) => {
                            if (result.isConfirmed) {
                                tablepertama.ajax.reload();
                                btn_isi.style.display = "block";
                                btn_proses.style.display = "none";
                                document
                                    .querySelectorAll("input")
                                    .forEach((input) => (input.value = ""));
                            } else {
                                tablepertama.ajax.reload();
                                btn_isi.style.display = "block";
                                btn_proses.style.display = "none";
                                document
                                    .querySelectorAll("input")
                                    .forEach((input) => (input.value = ""));
                            }
                        });
                    } else if (response.error) {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: response.error,
                            showConfirmButton: false,
                        });
                    }
                },
                error: function (xhr, status, error) {
                    let errorMessage = "Terjadi kesalahan saat memproses data.";
                    if (xhr.responseJSON && xhr.responseJSON.error) {
                        errorMessage = xhr.responseJSON.error;
                    } else if (xhr.responseText) {
                        try {
                            const response = JSON.parse(xhr.responseText);
                            errorMessage = response.error || errorMessage;
                        } catch (e) {
                            console.error("Error parsing JSON response:", e);
                        }
                    }

                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: errorMessage,
                        showConfirmButton: false,
                    });
                },
            });
        }
    });
});
