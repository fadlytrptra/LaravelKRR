document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let bulan = document.getElementById("bulan");
    let tahun = document.getElementById("tahun");
    let idPenagihan = document.getElementById("idPenagihan");
    let supplier = document.getElementById("supplier");
    let btn_id = document.getElementById("btn_id");
    let mataUang = document.getElementById("mataUang");
    let nilaiTagihan = document.getElementById("nilaiTagihan");
    let statusPenagihan = document.getElementById("statusPenagihan");
    let alasan = document.getElementById("alasan");
    let btn_proses = document.getElementById("btn_proses");

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    bulan.value = currentMonth;
    tahun.value = currentYear;
    bulan.focus();

    if (successMessage) {
        Swal.fire({
            icon: "success",
            title: "Success!",
            text: successMessage,
            showConfirmButton: false,
        });
    } else if (errorMessage) {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: errorMessage,
            showConfirmButton: false,
        });
    }

    //#region Event Listener
    btn_id.addEventListener("click", async function (event) {
        event.preventDefault();
        if (bulan.value.trim() === "") {
            Swal.fire({
                icon: "warning",
                title: "Warning!",
                text: "Isi bulan terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        }
        if (tahun.value.trim() === "") {
            Swal.fire({
                icon: "warning",
                title: "Warning!",
                text: "Isi tahun terlebih dahulu",
                showConfirmButton: true,
            });
            return;
        }
        try {
            const result = await Swal.fire({
                title: "Select a ID Penagihan",
                html: '<table id="idpenagihanTable" class="display" style="width:100%"><thead><tr><th>ID</th><th>Nama Supplier</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#idpenagihanTable")
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
                        const table = $("#idpenagihanTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "BatalPenagihanKencana/getIdPenagihan",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    tahun: tahun.value,
                                    bulan: bulan.value,
                                },
                            },
                            columns: [
                                { data: "Id_Penagihan" },
                                { data: "NM_SUP" },
                            ],
                        });
                        $("#idpenagihanTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            }
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "idpenagihanTable")
                        );
                    });
                },
            }).then(async (result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    idPenagihan.value = selectedRow.Id_Penagihan.trim();
                    supplier.value = selectedRow.NM_SUP.trim();

                    $.ajax({
                        url: "BatalPenagihanKencana/getDetail",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            idPenagihan: idPenagihan.value,
                            supplier: supplier.value,
                        },
                        success: function (data) {
                            console.log(data.data[0]);
                            mataUang.value = data.data[0].Nama_MataUang;
                            nilaiTagihan.value = data.data[0].Nilai_Penagihan;
                            statusPenagihan.value = data.data[0].Status;

                            // Handle numeric values and format them
                            // panjang_body.value = parseFloat(
                            //     data.data[0].Panjang_BB
                            // ).toFixed(2);
                            // diameter_body.value = parseFloat(
                            //     data.data[0].Diameter_BB
                            // ).toFixed(2);
                            // lebar_body.value = parseFloat(
                            //     data.data[0].Lebar_BB
                            // ).toFixed(2);
                            // tinggi_body.value = parseFloat(
                            //     data.data[0].Tinggi_BB
                            // ).toFixed(2);
                            // bentuk_body.value = data.data[0].Bentuk_BB;
                            // bentuk_body.readOnly = true;

                            // qty_sisa.value = data.ada ? data.ada : 0;
                            // qty_sisa.focus();
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });

                    setTimeout(() => {
                        alasan.focus();
                    }, 300);
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    bulan.addEventListener("keypress", function (event) {
        if (event.key == "Enter") {
            event.preventDefault();
            tahun.focus();
        }
    });

    tahun.addEventListener("keypress", function (event) {
        if (event.key == "Enter") {
            event.preventDefault();
            btn_id.focus();
        }
    });

    alasan.addEventListener("keypress", function (event) {
        if (event.key == "Enter") {
            event.preventDefault();
            btn_proses.focus();
        }
    });

    // $(document).ready(function() {
    //     $('#btn_proses').click(function() {
    //         Swal.fire({
    //             title: 'Konfirmasi',
    //             text: "Apakah Anda yakin ingin memproses?",
    //             icon: 'question',
    //             showCancelButton: true,
    //             confirmButtonColor: '#3085d6',
    //             cancelButtonColor: '#d33',
    //             confirmButtonText: 'Ya, Proses!'
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 $.ajax({
    //                     url: '/BatalPenagihanKencana',
    //                     method: 'POST',
    //                     data: {
    //                         confirmation: 'yes'
    //                     },
    //                     success: function(response) {
    //                         Swal.fire({
    //                             title: 'Sukses!',
    //                             text: response.message,
    //                             icon: 'success'
    //                         });
    //                     },
    //                     error: function(error) {
    //                         console.error('Error:', error);
    //                         Swal.fire({
    //                             title: 'Oops...',
    //                             text: 'Terjadi kesalahan!',
    //                             icon: 'error'
    //                         });
    //                     }
    //                 });
    //             }
    //         });
    //     });
    // });

    // btn_proses.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     $.ajax({
    //         url: "/BatalPenagihanKencana",
    //         type: "POST",
    //         data: {
    //             _token: csrfToken,
    //             idPenagihan: idPenagihan.value,
    //             alasan: alasan.value,
    //         },
    //         success: function (data) {
    //             console.log(data.data[0]);
    //             // tanggalu.value = data.data[0].Tgl_Update;
    //             // user.value = data.data[0].Nama_User;

    //             // Handle numeric values and format them
    //             // panjang_body.value = parseFloat(
    //             //     data.data[0].Panjang_BB
    //             // ).toFixed(2);
    //             // diameter_body.value = parseFloat(
    //             //     data.data[0].Diameter_BB
    //             // ).toFixed(2);
    //             // lebar_body.value = parseFloat(
    //             //     data.data[0].Lebar_BB
    //             // ).toFixed(2);
    //             // tinggi_body.value = parseFloat(
    //             //     data.data[0].Tinggi_BB
    //             // ).toFixed(2);
    //             // bentuk_body.value = data.data[0].Bentuk_BB;
    //             // bentuk_body.readOnly = true;

    //             // qty_sisa.value = data.ada ? data.ada : 0;
    //             // qty_sisa.focus();
    //         },
    //         error: function (xhr, status, error) {
    //             var err = eval("(" + xhr.responseText + ")");
    //             alert(err.Message);
    //         },
    //     });
    // });

    // idPenagihan.addEventListener("change", function () {
    //     if (this.selectedIndex !== 0) {
    //         this.classList.add("input-error");
    //         this.setCustomValidity("Tekan Enter!");
    //         this.reportValidity();
    //     }
    // });

    // idPenagihan.addEventListener("keypress", function (event) {
    //     if (event.key == "Enter") {
    //         event.preventDefault();
    //         fetch("/detailpenagihan/" + idPenagihan.value)
    //             .then((response) => response.json())
    //             .then((options) => {
    //                 console.log(options);
    //                 idPenagihan.value = options[0].Id_Penagihan;
    //             });
    //     }
    // });
});
