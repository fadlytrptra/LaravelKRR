$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let btn_supplier = document.getElementById("btn_supplier");
    let btn_proses = document.getElementById("btn_proses");
    let id_supp = document.getElementById("id_supp");
    let nama_supp = document.getElementById("nama_supp");
    let id_penagihan = document.getElementById("id_penagihan");
    let mata_uang = document.getElementById("mata_uang");
    let id_inv = document.getElementById("id_inv");
    let nofaktur_pajak = document.getElementById("nofaktur_pajak");
    let nilai_pajak = document.getElementById("nilai_pajak");
    let pajak = document.getElementById("pajak");
    let nilai_penagihan = document.getElementById("nilai_penagihan");
    let table_atas = $("#table_atas").DataTable();
    let table_bawah = $("#table_bawah").DataTable();
    let terbilang;
    let rowDataArray = [];
    let totalHargaTerbayar = 0;

    nilai_penagihan.style.fontWeight = "bold";
    mata_uang.value = "RUPIAH";
    btn_supplier.focus();

    nofaktur_pajak.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            nilai_pajak.focus();
        }
    });

    nilai_pajak.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            let value = parseFloat(nilai_pajak.value.replace(/,/g, ""));

            nilai_pajak.value = value.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            pajak.focus();
        }
    });

    pajak.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            btn_proses.focus();
        }
    });

    btn_supplier.addEventListener("click", async function (event) {
        event.preventDefault();
        totalHargaTerbayar = 0;
        nilai_penagihan.value = 0;
        rowDataArray = [];
        $("#table_atas tbody input[name='penerimaCheckbox']")
            .prop("checked", false)
            .closest("tr")
            .removeClass("selected");
        try {
            const result = await Swal.fire({
                title: "Select a Supplier",
                html: '<table id="supplierTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>Id_Customer</th></tr></thead><tbody></tbody></table>',
                showCancelButton: true,
                width: "50%",
                preConfirm: () => {
                    const selectedData = $("#supplierTable")
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
                        const table = $("#supplierTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            ajax: {
                                url: "MaintenanceTTKRR1/getSupplier",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [{ data: "NM_SUP" }, { data: "NO_SUP" }],
                        });
                        setTimeout(() => {
                            $("#supplierTable_filter input").focus();
                        }, 300);
                        $("#supplierTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                table.$("tr.selected").removeClass("selected");
                                $(this).addClass("selected");
                            },
                        );
                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydownInSwal(e, "supplierTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    nama_supp.value = escapeHTML(selectedRow.NM_SUP.trim());
                    id_supp.value = escapeHTML(selectedRow.NO_SUP.trim());
                    // if ($.fn.DataTable.isDataTable("#table_atas")) {
                    //     $("#table_atas").DataTable().clear().destroy();
                    // }

                    table_atas = $("#table_atas").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        returnFocus: true,
                        destroy: true,
                        ajax: {
                            url: "MaintenanceTTKRR1/getPO",
                            dataType: "json",
                            type: "GET",
                            data: function (d) {
                                return $.extend({}, d, {
                                    _token: csrfToken,
                                    id_supp: id_supp.value,
                                });
                            },
                        },
                        columns: [
                            {
                                data: "Kd_div",
                                render: function (data) {
                                    return `<input type="checkbox" name="penerimaCheckbox" value="${data}" /> ${data}`;
                                },
                            },
                            { data: "NO_PO" },
                            { data: "No_BTTB" },
                            { data: "Harga_terbayar" },
                            { data: "Kd_brg" },
                            { data: "NAMA_BRG" },
                            { data: "Qty_Terima" },
                            { data: "SatTerima" },
                            { data: "No_terima" },
                            { data: "Hrg_trm" },
                            { data: "Kurs_Rp" },
                            { data: "Disc_trm" },
                            { data: "Ppn_trm" },
                            { data: "Harga_disc" },
                            { data: "Harga_Ppn" },
                            { data: "Sat_Terima" },
                            { data: "hrg_murni" },
                        ],
                        paging: false,
                        scrollY: "400px",
                        scrollX: "150%",
                        scrollCollapse: true,
                        order: [1, "desc"],
                    });
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    $("#table_atas tbody").off("change", 'input[name="penerimaCheckbox"]');
    $("#table_atas tbody").on(
        "change",
        'input[name="penerimaCheckbox"]',
        function () {
            let rowData = table_atas.row($(this).closest("tr")).data();
            let hargaTerbayar = parseFloat(
                rowData.Harga_terbayar.replace(/,/g, ""),
            );

            if (this.checked) {
                $(this).closest("tr").addClass("selected");
                rowDataArray.push(rowData);
                totalHargaTerbayar += hargaTerbayar;
            } else {
                $(this).closest("tr").removeClass("selected");
                const index = rowDataArray.findIndex(
                    (row) => row.Kd_div === rowData.Kd_div,
                );
                if (index > -1) {
                    rowDataArray.splice(index, 1);
                    totalHargaTerbayar -= hargaTerbayar;
                }
            }

            nilai_penagihan.value = numeral(
                parseFloat(totalHargaTerbayar),
            ).format("0,0.00");

            console.log(rowDataArray);
        },
    );

    btn_proses.addEventListener("click", async function (event) {
        event.preventDefault();
        if (mata_uang.value == "RUPIAH") {
            terbilang = convertNumberToWordsRupiah(totalHargaTerbayar);
        } else {
            terbilang = convertNumberToWordsDollar(totalHargaTerbayar);
        }
        console.log(terbilang);
        $.ajax({
            url: "MaintenanceTTKRR1",
            type: "POST",
            data: {
                _token: csrfToken,
                rowDataArray: rowDataArray,
                terbilang: terbilang,
                id_penagihan: id_penagihan.value,
                id_supp: id_supp.value,
                id_inv: id_inv.value,
                mata_uang: mata_uang.value,
                nilai_penagihan: nilai_penagihan.value,
                nofaktur_pajak: nofaktur_pajak.value,
                nilai_pajak: nilai_pajak.value,
                pajak: pajak.value,
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
                        id_penagihan.value = "";
                        id_inv.value = "";
                        nilai_penagihan.value = numeral(0).format("0,0.00");
                        nofaktur_pajak.value = "";
                        nilai_pajak.value = "";
                        pajak.value = "";
                        totalHargaTerbayar = 0;
                        $("#table_atas").DataTable().ajax.reload();
                        btn_supplier.focus();
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "info",
                        title: "Info!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                    id_penagihan.value = "";
                    id_inv.value = "";
                    nilai_penagihan.value = numeral(0).format("0,0.00");
                    nofaktur_pajak.value = "";
                    nilai_pajak.value = "";
                    pajak.value = "";
                    totalHargaTerbayar = 0;
                    $("#table_atas").DataTable().ajax.reload();
                    btn_supplier.focus();
                }
            },
            error: function (xhr) {
                alert(xhr.responseJSON.message);
            },
        });
        rowDataArray = [];
    });
});
