$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_ok = document.getElementById("btn_ok");
    let btn_perkiraan = document.getElementById("btn_perkiraan");
    let btn_proses = document.getElementById("btn_proses");
    let radio_kecil = document.getElementById("radio_kecil");
    let radio_besar = document.getElementById("radio_besar");
    let bulan = document.getElementById("bulan");
    let tahun = document.getElementById("tahun");
    let rincianPembayaran = document.getElementById("rincianPembayaran");
    let nilaiRincian = document.getElementById("nilaiRincian");
    let idKodePerkiraan = document.getElementById("idKodePerkiraan");
    let ketKodePerkiraan = document.getElementById("ketKodePerkiraan");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6, 7], visible: false }],
    });
    let table_bawah = $("#table_bawah").DataTable({
        // columnDefs: [{ targets: [5, 6, 7], visible: false }],
    });
    let kode = 5;
    let rowDataPertama;

    let tanggalSekarang = new Date();
    let bulanSekarang = String(tanggalSekarang.getMonth() + 1).padStart(2, "0");
    let tahunSekarang = tanggalSekarang.getFullYear();
    bulan.value = bulanSekarang;
    tahun.value = tahunSekarang;
    radio_kecil.click();

    radio_kecil.addEventListener("click", function (event) {
        kode = 5;
    });

    radio_besar.addEventListener("click", function (event) {
        kode = 6;
    });

    btn_ok.addEventListener("click", async function (event) {
        event.preventDefault();
        if (kode == 5 || kode == 6) {
            table_atas = $("#table_atas").DataTable({
                responsive: true,
                processing: true,
                serverSide: true,
                destroy: true,
                ajax: {
                    url: "/Kencana/KodePerkiraanBKMKencana/getPelunasan",
                    dataType: "json",
                    type: "GET",
                    data: function (d) {
                        return $.extend({}, d, {
                            _token: csrfToken,
                            bulan: bulan.value,
                            tahun: tahun.value,
                            kode: kode,
                        });
                    },
                },
                columns: [
                    {
                        data: "Id_BKM",
                        // render: function (data) {
                        //     return `<input type="checkbox" name="penerimaCheckboxM" value="${data}" /> ${data}`;
                        // },
                    },
                    { data: "Id_bank" },
                    { data: "Jenis_Pembayaran" },
                    { data: "Symbol" },
                    { data: "Nilai_Pelunasan" },
                ],
                paging: false,
                scrollY: "400px",
                scrollCollapse: true,
                // columnDefs: [{ targets: [3, 4], visible: false }],
            });
        } else {
            Swal.fire({
                icon: "info",
                title: "Info!",
                text: "Pilih dulu kas kecil atau besar!",
                showConfirmButton: true,
            });
        }
    });

    $("#table_atas tbody").on("click", "tr", function () {
        // Remove the 'selected' class from any previously selected row
        $("#table_atas tbody tr").removeClass("selected");

        // Add the 'selected' class to the clicked row
        $(this).addClass("selected");

        // Get data from the clicked row
        var data = table_atas.row(this).data();

        table_bawah = $("#table_bawah").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "/Kencana/KodePerkiraanBKMKencana/listBKM",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        Id_BKM: data.Id_BKM,
                    });
                },
            },
            columns: [
                {
                    data: "ID_Penagihan",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "Nilai_Lunas" },
                { data: "KodePerkiraan" },
                { data: "ID_Detail_Pelunasan" },
                { data: "Id_Pelunasan" },
            ],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
            // columnDefs: [{ targets: [3, 4], visible: false }],
        });
    });

    let rowDataArray = [];

    // Handle checkbox change events
    $("#table_bawah tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_bawah tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            if (this.checked) {
                $('input[name="penerimaCheckbox"]')
                    .not(this)
                    .prop("checked", false);
                rowDataPertama = table_bawah.row($(this).closest("tr")).data();

                // Add the selected row data to the array
                // rowDataArray.push(rowDataPertama);
                rowDataArray = [rowDataPertama];

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_bawah);

                rincianPembayaran.value = rowDataPertama.ID_Penagihan;
                nilaiRincian.value = rowDataPertama.Nilai_Lunas;
                idKodePerkiraan.value = rowDataPertama.KodePerkiraan;
            } else {
                // Remove the unchecked row data from the array
                rowDataPertama = null;
                rincianPembayaran.value = "";
                nilaiRincian.value = "";
                idKodePerkiraan.value = "";
                // rowDataPertama = table_bawah.row($(this).closest("tr")).data();

                rowDataArray = rowDataArray.filter(
                    (row) => row !== rowDataPertama
                );

                console.log(rowDataArray);
                console.log(rowDataPertama, this, table_bawah);
            }
        }
    );

    btn_perkiraan.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Kode Perkiraan",
                html: '<table id="tableKira" class="display" style="width:100%"><thead><tr><th>Kode Perkiraan</th><th>Keterangan</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#tableKira")
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
                        const table = $("#tableKira").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "/Kencana/KodePerkiraanBKMKencana/getKira",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "NoKodePerkiraan" },
                                { data: "Keterangan" },
                            ],
                        });
                        $("#tableKira tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "tableKira")
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    idKodePerkiraan.value = escapeHTML(
                        selectedRow.NoKodePerkiraan.trim()
                    );
                    ketKodePerkiraan.value = escapeHTML(
                        selectedRow.Keterangan.trim()
                    );
                    // setTimeout(() => {
                    //     no_bukti.focus();
                    // }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "/Kencana/KodePerkiraanBKMKencana",
            type: "POST",
            data: {
                _token: csrfToken,
                ID_Detail_Pelunasan: rowDataPertama.ID_Detail_Pelunasan,
                KodePerkiraan: idKodePerkiraan.value,
                Id_Pelunasan: rowDataPertama.Id_Pelunasan,
            },
            success: function (response) {
                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then(() => {
                        // document
                        //     .querySelectorAll("input")
                        //     .forEach((input) => (input.value = ""));
                        $("#table_bawah").DataTable().ajax.reload();
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
            error: function (xhr) {
                alert(xhr.responseJSON.message);
            },
        });
    });
});
