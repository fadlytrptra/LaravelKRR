jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    let btn_ok = document.getElementById("btn_ok");
    let btn_batal = document.getElementById("btn_batal");
    let shift = document.getElementById("shift");
    let tanggal = document.getElementById("tanggal");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [1, 2, 3], visible: false }],
        paging: false,
    });

    tanggal.valueAsDate = new Date();
    shift.focus();

    shift.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            tanggal.focus();
        }
    });

    tanggal.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_ok.focus();
        }
    });

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });

    btn_ok.addEventListener("click", function (event) {
        event.preventDefault();
        $.ajax({
            url: "HasilMeterM/CekHasilMeter",
            type: "GET",
            data: {
                _token: csrfToken,
                shift: shift.value,
                tanggal: tanggal.value,
            },
            success: function (response) {
                console.log(response.message);

                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then((result) => {
                        console.log(result);
                        console.log(response);

                        table_atas = $("#table_atas").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            destroy: true,
                            ajax: {
                                url: "HasilMeterM/ProsesMeter",
                                dataType: "json",
                                type: "GET",
                                data: function (d) {
                                    return $.extend({}, d, {
                                        _token: csrfToken,
                                        shift: shift.value,
                                        tanggal: tanggal.value,
                                    });
                                },
                            },
                            columns: [
                                {
                                    data: "Id_Log",
                                    // render: function (data) {
                                    //     return <input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data};
                                    // },
                                },
                                {
                                    data: "Nama_mesin",
                                    // render: function (data) {
                                    //     return numeral(data).format("0,0.00");
                                    // },
                                },
                                { data: "Ukuran" },
                                { data: "Rajutan" },
                                { data: "D_TEK4" },
                                { data: "D_TEK5" },
                                { data: "Keterangan" },
                                { data: "CounterAwal" },
                                { data: "CounterAkhir" },
                                { data: "AwalJamKerja" },
                                { data: "AkhirJamKerja" },
                                { data: "HasilMeter" },
                            ],
                            order: [[1, "asc"]],
                            // createdRow: function (row, data, dataIndex) {
                            //     if (
                            //         data.Highlight === true ||
                            //         data.Highlight === "true"
                            //     ) {
                            //         $("td", row).each(function () {
                            //             $(this).css("color", "red");
                            //         });
                            //     }
                            // },
                            paging: false,
                            scrollY: "300px",
                            scrollX: "300px"
                        });
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
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });
});