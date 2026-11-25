$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let kasKecil = document.getElementById("kasKecil");
    let kasBesar = document.getElementById("kasBesar");
    let btnOK = document.getElementById("btnOK");
    let bulan = document.getElementById("bulan");
    let tahun = document.getElementById("tahun");
    let BlnThn = document.getElementById("BlnThn");
    let tabelatas = $("#tabelatas").DataTable();
    let tabelbawah = $("#tabelbawah").DataTable();
    let rincianPembayaran = document.getElementById("rincianPembayaran");
    let nilaiRincian = document.getElementById("nilaiRincian");
    let kodePerkiraanSelect = document.getElementById("kodePerkiraanSelect");
    let kodePerkiraanSelect2 = $("#kodePerkiraanSelect");
    let idKodePerkiraan = document.getElementById("idKodePerkiraan");
    let idDetail = document.getElementById("idDetail");
    let idBayar = document.getElementById("idBayar");
    let idBKK = document.getElementById("idBKK");

    let btnProses = document.getElementById("btnProses");

    let methodkoreksi = document.getElementById("methodkoreksi");
    let formkoreksi = document.getElementById("formkoreksi");

    let currentDate = new Date();
    let currentMonth = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    let currentYear = currentDate.getFullYear();
    bulan.value = currentMonth;
    tahun.value = value = currentYear;
    bulan.focus();

    bulan.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            tahun.focus();
        }
    });

    tahun.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btnOK.focus();
        }
    });

    fetch("/Kencana/getkodeperkiraanKencana/")
        .then((response) => response.json())
        .then((options) => {
            console.log(options);
            kodePerkiraanSelect.innerHTML = "";

            const defaultOption = document.createElement("option");
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.innerText = "Kode Perkiraan";
            kodePerkiraanSelect.appendChild(defaultOption);

            options.forEach((entry) => {
                const option = document.createElement("option");
                option.value = entry.NoKodePerkiraan;
                option.innerText =
                    entry.NoKodePerkiraan + " | " + entry.Keterangan;
                kodePerkiraanSelect.appendChild(option);
            });
        });

    // Inisialisasi Select2
    kodePerkiraanSelect2.select2({
        placeholder:
            $("#kodePerkiraanSelect").children().length > 0
                ? "Pilih kode perkiraan"
                : "Tidak ada kode perkiraan",
        width: "100%",
    });

    // Event listener untuk Select2
    $("#kodePerkiraanSelect").on("select2:select", function (event) {
        event.preventDefault();
        const selectedOption = $(this).find(":selected");
        if (selectedOption.length) {
            const selectedValue = selectedOption.val();
            const idkp = selectedValue.split(" | ")[0];
            $("#idKodePerkiraan").val(idkp);
            btnProses.focus();
        }
    });

    btnOK.addEventListener("click", function (event) {
        event.preventDefault();
        BlnThn.value =
            bulan.value.toString() + tahun.value.substring(2).toString();

        // Hapus data yang ada dalam tabel sebelum menambahkan data baru
        if (tabelatas) {
            tabelatas.clear().draw();
        }

        // Memanggil fungsi untuk menampilkan data sesuai dengan radiobutton yang dicentang
        if (kasKecil.checked) {
            fetchData("/Kencana/getIdBKKKdPrkKencana/" + BlnThn.value);
        } else if (kasBesar.checked) {
            fetchData("/Kencana/getIdBKKKdPrk2Kencana/" + BlnThn.value);
        }
    });

    function fetchData(url) {
        console.log(url);
        fetch(url)
            .then((response) => response.json())
            .then((options) => {
                // // Filter data berdasarkan ID_BKM yang dipilih
                // // const filteredOptions = options.filter(option => selectedIdBKKs.includes(option.Id_BKK));
                console.log(options);
                // Menambahkan data ke dalam tabel
                tabelatas = $("#tabelatas").DataTable({
                    destroy: true,
                    data: options,
                    columns: [
                        { title: "Id. BKK", data: "Id_BKK" },
                        { title: "Bank", data: "Id_Bank" },
                        { title: "Jns.Bayar", data: "Jenis_Pembayaran" },
                        { title: "Mata Uang", data: "Symbol" },
                        {
                            title: "Nilai Pembayaran",
                            data: function (row) {
                                return numeral(row.Nilai_Pembulatan).format(
                                    "0,0.00"
                                );
                            },
                        },
                    ],
                    paging: false,
                    scrollY: "320px",
                    scrollCollapse: true,
                });
            });
    }

    $("#tabelatas tbody").off("click", "tr");
    $("#tabelatas tbody").on("click", "tr", function () {
        let checkSelectedRows = $("#tabelatas tbody tr.selected");

        if (checkSelectedRows.length > 0) {
            // Remove "selected" class from previously selected rows
            checkSelectedRows.removeClass("selected");
        }
        $(this).toggleClass("selected");
        const table = $("#tabelatas").DataTable();
        let selectedRows = table.rows(".selected").data().toArray();
        console.log(selectedRows[0]);
        idBKK.value = selectedRows[0].Id_BKK;
        fetch("/Kencana/getTabelRincianBKKKencana/" + idBKK.value)
            .then((response) => response.json())
            .then((options) => {
                console.log(options);

                tabelbawah = $("#tabelbawah").DataTable({
                    destroy: true,
                    data: options,
                    columns: [
                        { title: "Rincian Bayar", data: "Rincian_Bayar" },
                        {
                            title: "Nilai Rincian",
                            data: function (row) {
                                return numeral(row.Nilai_Rincian).format(
                                    "0,0.00"
                                );
                            },
                        },
                        { title: "Kd. Perkiraan", data: "Kode_Perkiraan" },
                        { title: "Id. Detail", data: "Id_Detail_Bayar" },
                        { title: "Id. Bayar", data: "Id_Pembayaran" },
                    ],
                    paging: false,
                    scrollY: "320px",
                    scrollCollapse: true,
                });
            });
    });

    $("#tabelbawah tbody").off("click", "tr");
    $("#tabelbawah tbody").on("click", "tr", function () {
        let checkSelectedRows = $("#tabelbawah tbody tr.selected");

        if (checkSelectedRows.length > 0) {
            // Remove "selected" class from previously selected rows
            checkSelectedRows.removeClass("selected");
        }
        $(this).toggleClass("selected");
        const table = $("#tabelbawah").DataTable();
        let selectedRows = table.rows(".selected").data().toArray();
        console.log(selectedRows[0]);

        rincianPembayaran.value = selectedRows[0].Rincian_Bayar;
        nilaiRincian.value = numeral(selectedRows[0].Nilai_Rincian).format(
            "0,0.00"
        );
        idDetail.value = selectedRows[0].Id_Detail_Bayar;
        idBayar.value = selectedRows[0].Id_Pembayaran;

        const kodePerkiraan = selectedRows[0].Kode_Perkiraan;
        const options2 = kodePerkiraanSelect.options;
        for (let i = 0; i < options2.length; i++) {
            if (options2[i].value === kodePerkiraan) {
                // Setel select option jenisPembayaranSelect sesuai dengan opsi yang cocok
                kodePerkiraanSelect.selectedIndex = i;
                const selectedOption =
                    kodePerkiraanSelect.options[
                        kodePerkiraanSelect.selectedIndex
                    ];
                if (selectedOption) {
                    const selectedValue = selectedOption.value; // Nilai dari opsi yang dipilih (format: "id | nama")
                    const idkp = selectedValue.split(" | ")[0];
                    idKodePerkiraan.value = idkp;
                }
                break;
            }
        }

        kodePerkiraanSelect.focus();
        btnProses.disabled = false;
    });

    // btnProses.addEventListener("click", function (event) {
    //     event.preventDefault();

    //     methodkoreksi.value = "PUT";
    //     //console.log(methodkoreksi.value);
    //     formkoreksi.action = "/KodePerkiraanBKK/" + idDetail.value;
    //     // console.log(idBayar.value);
    //     formkoreksi.submit();
    // });

    btnProses.addEventListener("click", async function (event) {
        event.preventDefault();
        $.ajax({
            url: "/Kencana/KodePerkiraanBKKKencana",
            type: "POST",
            data: {
                _token: csrfToken,
                idDetail: idDetail.value,
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
                        // $("#tabelbawah").DataTable().ajax.reload();
                        // location.reload();
                        // document
                        //     .querySelectorAll("input")
                        //     .forEach((input) => (input.value = ""));
                        // Reselect baris yang sebelumnya dipilih di tabel atas
                        const tableAtas = $("#tabelatas").DataTable();
                        const selectedRows = tableAtas
                            .rows(".selected")
                            .data()
                            .toArray(); // Ambil baris yang dipilih

                        if (selectedRows.length > 0) {
                            const selectedId = selectedRows[0].Id_BKK;
                            idBKK.value = selectedId;

                            // Iterasi melalui semua baris di tabel atas
                            tableAtas
                                .rows()
                                .every(function (rowIdx, tableLoop, rowLoop) {
                                    const rowData = this.data();

                                    if (rowData.Id_BKK === selectedId) {
                                        // Pilih kembali baris jika ID cocok
                                        $(this.node()).addClass("selected");
                                        fetch(
                                            "/Kencana/getTabelRincianBKKKencana/" + idBKK.value
                                        )
                                            .then((response) => response.json())
                                            .then((options) => {
                                                console.log(options);

                                                tabelbawah = $(
                                                    "#tabelbawah"
                                                ).DataTable({
                                                    destroy: true,
                                                    data: options,
                                                    columns: [
                                                        {
                                                            title: "Rincian Bayar",
                                                            data: "Rincian_Bayar",
                                                        },
                                                        {
                                                            title: "Nilai Rincian",
                                                            data: function (
                                                                row
                                                            ) {
                                                                return numeral(
                                                                    row.Nilai_Rincian
                                                                ).format(
                                                                    "0,0.00"
                                                                );
                                                            },
                                                        },
                                                        {
                                                            title: "Kd. Perkiraan",
                                                            data: "Kode_Perkiraan",
                                                        },
                                                        {
                                                            title: "Id. Detail",
                                                            data: "Id_Detail_Bayar",
                                                        },
                                                        {
                                                            title: "Id. Bayar",
                                                            data: "Id_Pembayaran",
                                                        },
                                                    ],
                                                    paging: false,
                                                    scrollY: "320px",
                                                    scrollCollapse: true,
                                                });
                                            });
                                    }
                                });
                        }
                        rincianPembayaran.value = "";
                        nilaiRincian.value = "";
                        idKodePerkiraan.value = "";
                        kodePerkiraanSelect2.val(null).trigger("change");
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
            },
        });
    });
});
