jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let tanggal = document.getElementById("tanggal");
    let btn_tampil = document.getElementById("btn_tampil");
    let id_log = document.getElementById("id_log");
    let nama_mesin = document.getElementById("nama_mesin");
    let afalan_warp = document.getElementById("afalan_warp");
    let nama_order = document.getElementById("nama_order");
    let afalan_weft = document.getElementById("afalan_weft");
    let weft_end = document.getElementById("weft_end");
    let btn_proses = document.getElementById("btn_proses");
    let btn_batal = document.getElementById("btn_batal");

    const slcShift = document.getElementById("shift");

    let table_atas = $("#table_atas").DataTable({
    });

    // $.ajaxSetup({
    //     beforeSend: function () {
    //         // Show the loading screen before the AJAX request
    //         $("#loading-screen").css("display", "flex");
    //     },
    //     complete: function () {
    //         // Hide the loading screen after the AJAX request completes
    //         $("#loading-screen").css("display", "none");
    //     },
    // });

    tanggal.focus();
    const today = new Date();
    today.setDate(today.getDate() - 1);
    tanggal.valueAsDate = today;

    //#region Enter
    tanggal.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            shift.focus();
        }
    });

    afalan_warp.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            afalan_weft.select();
        }
    });

    afalan_weft.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            weft_end.select();
        }
    });

    weft_end.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_proses.focus();
        }
    });

    //#region Select2
    $("#" + slcShift.id).select2({ placeholder: "-- Pilih Shift --" });

    $("#" + slcShift.id).on("change", function () {
        setTimeout(() => {
            btn_tampil.focus();
        }, 300);
    });

    //#region Event Listener
    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        // btn_proses.disabled = true;
        const allRowsDataAtas = table_atas.rows().data().toArray();

        $.ajax({
            url: "AfalanKarungD",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                id_log: id_log.value,
                afalan_warp: afalan_warp.value,
                afalan_weft: afalan_weft.value,
                weft_end: weft_end.value,
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
                        $("#table_atas").DataTable().ajax.reload();
                        id_log.value = "";
                        nama_mesin.value = "";
                        afalan_warp.value = "";
                        nama_order.value = "";
                        afalan_weft.value = "";
                        weft_end.value = "";
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                    // btn_proses.disabled = false;
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
                // btn_proses.disabled = false;
            },
        });
    });

    btn_tampil.addEventListener("click", function (event) {
        event.preventDefault();
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "AfalanKarungD/getListLogMesin",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tanggal: tanggal.value,
                        shift: $("#" + slcShift.id).val(),
                    });
                },
            },
            columns: [
                {
                    data: "Id_Log",
                    // render: function (data) {
                    //     return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    // },
                },
                { data: 'NAMA_BRG' },
                { data: "Nama_mesin" },
                { data: "Afalan_Wa" },
                { data: "Afalan_We" },
                { data: "Weft_End" },
            ],
            // order: [[1, "asc"]],
            paging: false,
            scrollY: "300px",
            scrollCollapse: true,
        });
    });

    let selectedRow = null;
    $("#table_atas tbody").on("click", "tr", function () {
        if (!table_atas.row(this).data()) {
            return;
        }

        $("#table_atas tbody tr").removeClass("selected");
        $(this).addClass("selected");
        selectedRow = this;

        let data = table_atas.row(this).data();
        console.log(data);

        id_log.value = data.Id_Log;
        nama_mesin.value = data.Nama_mesin;
        afalan_warp.value = data.Afalan_Wa;
        nama_order.value = data.NAMA_BRG;
        afalan_weft.value = data.Afalan_We;
        weft_end.value = data.Weft_End;

        afalan_warp.select();
    });

    btn_batal.addEventListener("click", function (event) {
        event.preventDefault();
        location.reload();
    });
}); 