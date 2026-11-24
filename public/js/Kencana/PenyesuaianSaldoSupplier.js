document.addEventListener("DOMContentLoaded", function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let radiogrup_hutang = document.getElementById("radiogrup_hutang");
    let radiogrup_tunai = document.getElementById("radiogrup_tunai");
    let btn_ok = document.getElementById("btn_ok");
    let btn_proses1 = document.getElementById("btn_proses1");
    let btn_proses2 = document.getElementById("btn_proses2");
    let checkbox2 = document.getElementById("checkbox2");
    let checkboxAll_ISK = document.getElementById("checkboxAll_ISK");
    let proses1 = 1;
    let proses2 = 2;

    let tableatas = $("#tablepenyesuaian").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "/Kencana/PenyesuaianSaldoSupplierKencana/getData",
            dataType: "json",
            type: "GET",
            data: function (d) {
                return $.extend({}, d, {
                    _token: csrfToken,
                    radio_hutang:
                        $('input[name="radiogrup"]:checked').val() ===
                        "radio_hutang",
                    radio_tunai:
                        $('input[name="radiogrup"]:checked').val() ===
                        "radio_tunai",
                });
            },
        },
        columns: [
            {
                data: "Id_Supplier",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "NM_SUP" },
            { data: "Saldo" },
            { data: "Saldo_Rp" },
            { data: "Nama_MataUang" },
            { data: "SALDO_HUTANG" },
            { data: "SALDO_HUTANG_Rp" },
            { data: "IdTrans" },
        ],
        paging: false,
        scrollY: "400px",
        scrollCollapse: true,
    });

    let tablebawah = $("#tablesaldokosong").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "/Kencana/PenyesuaianSaldoSupplierKencana/getDataKosong",
            dataType: "json",
            type: "GET",
            data: {
                _token: csrfToken,
            },
        },
        columns: [
            {
                data: "Id_Supplier",
                render: function (data) {
                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                },
            },
            { data: "NM_SUP" },
            { data: "SALDO_HUTANG" },
            { data: "SALDO_HUTANG_Rp" },
        ],
        paging: false,
        scrollY: "400px",
        scrollCollapse: true,
    });

    //#region Event Listener
    btn_proses1.addEventListener("click", function (event) {
        event.preventDefault();

        const ids = [];
        $('input[name="penerimaCheckbox"]:checked').each(function () {
            ids.push({
                checked: this.checked,
                id: this.value,
            });
        });

        const selectedRows = $("#tablepenyesuaian tbody tr").filter(
            function () {
                const checkboxId = $(this)
                    .find('input[name="penerimaCheckbox"]')
                    .val();
                return ids.some(function (item) {
                    return item.id === checkboxId && item.checked;
                });
            }
        );

        const formData = {
            _token: csrfToken,
            data: JSON.stringify(
                selectedRows
                    .map(function () {
                        return {
                            IdTrans: $(this).find("td:eq(7)").text(),
                            id: $(this)
                                .find('input[name="penerimaCheckbox"]')
                                .val(),
                        };
                    })
                    .get()
            ),
        };

        $.ajax({
            url: "/Kencana/PenyesuaianSaldoSupplierKencana",
            type: "POST",
            data: $.param(formData) + "&proses1=" + proses1,
            success: function (response) {
                Swal.fire({
                    title: "Success!",
                    text: response.message,
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    // Reload DataTable setelah sukses
                    tableatas.ajax.reload();
                    tablebawah.ajax.reload();
                });
            },
            error: function (xhr) {
                Swal.fire({
                    title: "Error!",
                    text: xhr.responseJSON.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            },
        });
    });

    btn_proses2.addEventListener("click", function (event) {
        event.preventDefault();

        const ids = [];
        $('input[name="penerimaCheckbox"]:checked').each(function () {
            ids.push({
                checked: this.checked,
                id: this.value,
            });
        });

        const selectedRows = $("#tablesaldokosong tbody tr").filter(
            function () {
                const checkboxId = $(this)
                    .find('input[name="penerimaCheckbox"]')
                    .val();
                return ids.some(function (item) {
                    return item.id === checkboxId && item.checked;
                });
            }
        );

        const formData = {
            _token: csrfToken,
            data: JSON.stringify(
                selectedRows
                    .map(function () {
                        return {
                            // IdTrans: $(this).find("td:eq(7)").text(),
                            id: $(this)
                                .find('input[name="penerimaCheckbox"]')
                                .val(),
                        };
                    })
                    .get()
            ),
        };

        $.ajax({
            url: "/Kencana/PenyesuaianSaldoSupplierKencana",
            type: "POST",
            data: $.param(formData),
            success: function (response) {
                console.log(response);

                if (response.message) {
                    Swal.fire({
                        title: "Success!",
                        text: response.message,
                        icon: "success",
                        confirmButtonText: "OK",
                    }).then(() => {
                        // Reload DataTable setelah sukses
                        tableatas.ajax.reload();
                        tablebawah.ajax.reload();
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
                Swal.fire({
                    title: "Error!",
                    text: xhr.responseJSON.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            },
        });
    });

    checkbox2.addEventListener("change", function () {
        const checkboxes = document.querySelectorAll(
            '#tablepenyesuaian input[type="checkbox"][name="penerimaCheckbox"]'
        );
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = checkbox2.checked;
        });
    });

    checkboxAll_ISK.addEventListener("change", function () {
        const checkboxes = document.querySelectorAll(
            '#tablesaldokosong input[type="checkbox"][name="penerimaCheckbox"]'
        );
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = checkboxAll_ISK.checked;
        });
    });

    btn_ok.addEventListener("click", function (event) {
        event.preventDefault();

        var selectedRadio = document.querySelector(
            'input[name="radiogrup"]:checked'
        );
        var radioValue = selectedRadio ? selectedRadio.value : null;
        console.log(radioValue);

        if ($.fn.DataTable.isDataTable("#tablepenyesuaian")) {
            $("#tablepenyesuaian").DataTable().destroy();
        }

        tableatas = $("#tablepenyesuaian").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            ajax: {
                url: "/Kencana/PenyesuaianSaldoSupplierKencana/getData",
                dataType: "json",
                type: "GET",
                data: {
                    _token: csrfToken,
                    radio_hutang: radioValue === "radio_hutang",
                    radio_tunai: radioValue === "radio_tunai",
                },
            },
            columns: [
                {
                    data: "Id_Supplier",
                    render: function (data) {
                        return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                    },
                },
                { data: "NM_SUP" },
                { data: "Saldo" },
                { data: "Saldo_Rp" },
                { data: "Nama_MataUang" },
                { data: "SALDO_HUTANG" },
                { data: "SALDO_HUTANG_Rp" },
                { data: "IdTrans" },
            ],
        });
    });
});
