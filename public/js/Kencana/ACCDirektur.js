jQuery(function ($) {
    //#region Variables
    let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content"); // prettier-ignore
    let table_suratPesanan = $("#table_suratPesanan").DataTable({
        order: [[2, "desc"]],
        columnDefs: [
            { targets: 0, orderable: false },
            {
                targets: 2,
                render: function (data, type) {
                    if (type === "display") {
                        return moment(data).format("MM-DD-YYYY");
                    }
                    return data;
                },
            },
        ],
    });
    let jenisSP = document.getElementById("jenisSP");
    let id_jenisSP = document.getElementById("id_jenisSP");
    let nama_barangSP = document.getElementById("nama_barangSP");
    let quantitySP = document.getElementById("quantitySP");
    let satuanSP = document.getElementById("satuanSP");
    let harga_satuanSP = document.getElementById("harga_satuanSP");
    let uraianSP = document.getElementById("uraianSP");
    let tgl_deliverySP = document.getElementById("tgl_deliverySP");
    let button_browseJenisSP = document.getElementById("button_browseJenisSP");
    let button_submitSelected = document.getElementById(
        "button_submitSelected",
    );
    //#endregion

    //#region Functions
    $.ajaxSetup({
        beforeSend: function () {
            // Show the loading screen before the AJAX request
            $("#loading-screen").css("display", "flex");
        },
        complete: function () {
            // Hide the loading screen after the AJAX request completes
            $("#loading-screen").css("display", "none");
        },
    });

    // fungsi swal select pake arrow
    function handleTableKeydown(e, tableId) {
        const table = $(`#${tableId}`).DataTable();
        const rows = $(`#${tableId} tbody tr`);
        const rowCount = rows.length;

        if (e.key === "Enter") {
            e.preventDefault();
            const selectedRow = table.row(".selected").data();
            if (selectedRow) {
                Swal.getConfirmButton().click();
            } else {
                const firstRow = $(`#${tableId} tbody tr:first-child`);
                if (firstRow.length) {
                    firstRow.click();
                    Swal.getConfirmButton().click();
                }
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (currentIndex === null || currentIndex >= rowCount - 1) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            rows.removeClass("selected");
            const selectedRow = $(rows[currentIndex]).addClass("selected");
            scrollRowIntoView(selectedRow[0]);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (currentIndex === null || currentIndex <= 0) {
                currentIndex = rowCount - 1;
            } else {
                currentIndex--;
            }
            rows.removeClass("selected");
            const selectedRow = $(rows[currentIndex]).addClass("selected");
            scrollRowIntoView(selectedRow[0]);
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            const pageInfo = table.page.info();
            if (pageInfo.page < pageInfo.pages - 1) {
                table
                    .page("next")
                    .draw("page")
                    .on("draw", function () {
                        currentIndex = 0;
                        const newRows = $(`#${tableId} tbody tr`);
                        const selectedRow = $(newRows[currentIndex]).addClass(
                            "selected",
                        );
                        scrollRowIntoView(selectedRow[0]);
                    });
            }
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            const pageInfo = table.page.info();
            if (pageInfo.page > 0) {
                table
                    .page("previous")
                    .draw("page")
                    .on("draw", function () {
                        currentIndex = 0;
                        const newRows = $(`#${tableId} tbody tr`);
                        const selectedRow = $(newRows[currentIndex]).addClass(
                            "selected",
                        );
                        scrollRowIntoView(selectedRow[0]);
                    });
            }
        }
    }

    // Helper function to scroll selected row into view
    function scrollRowIntoView(rowElement) {
        rowElement.scrollIntoView({ block: "nearest" });
    }

    function checkboxHtml(id, checked = false) {
        return `
        <input type="checkbox"
               class="check-surat-pesanan"
               data-id="${id}"
               ${checked ? "checked" : ""}>
    `;
    }

    function getDataSuratPesanan() {
        table_suratPesanan.clear().draw();
        $.ajax({
            url: "/Kencana/SuratPesananDirektur/getDataSuratPesanan",
            method: "GET",
            data: {
                _token: csrfToken,
                idJenisSP: id_jenisSP.value,
            },
            dataType: "json",
            success: function (data) {
                if (!data) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000,
                        text: "fetching data Surat Pesanan failed ",
                        returnFocus: false,
                    });
                } else {
                    data.forEach((suratPesanan) => {
                        table_suratPesanan.row
                            .add([
                                checkboxHtml(suratPesanan.IDSuratPesanan),
                                `<a class="DetailSP" style="color: #3490dc; cursor: pointer;"
                                            data-id="${suratPesanan.IDSuratPesanan}">${suratPesanan.IDSuratPesanan}</a>`,
                                suratPesanan.Tgl_Pesan,
                                suratPesanan.NamaCust,
                                suratPesanan.NO_PO,
                                suratPesanan.NO_PI,
                                suratPesanan.NamaSales,
                            ])
                            .draw();
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to load Surat Pesanan.",
                });
            },
        });
    }

    function previewSuratPesanan(noSP) {
        $("#modalPreviewSP").modal("show");
        $("#preview_table_sp tbody").empty();
        $("#loading-screen").css("display", "flex");

        fetch("/Kencana/viewprint/" + noSP)
            .then(res => res.json())
            .then(data => {
                let h = data[0];

                /* ================= HEADER ================= */
                $("#preview_no_sp").text("No. " + h.NO_SP);
                $("#preview_tgl_sp").text(moment(h.TGL_SP).format("DD-MM-YYYY"));
                $("#preview_tgl_po").text(
                    h.Tgl_PO ? moment(h.Tgl_PO).format("DD-MM-YYYY") : "-"
                );
                $("#preview_no_po").text(h.NO_PO ?? "-");

                $("#preview_customer").text(h.NamaCust);
                $("#preview_alamat").text(h.Alamat);
                $("#preview_alamat_kirim").text(
                    h.AlamatKirim ?? h.Alamat
                );

                $("#preview_jenis_bayar").text(h.NamaPembayaran);
                $("#preview_syarat_bayar").text(
                    h.SyaratBayar ? h.SyaratBayar + " Hari" : "-"
                );
                $("#preview_ppn").text(h.PPN ?? "-");

                /* ================= DETAIL BARANG ================= */
                data.forEach((row, i) => {
                    $("#preview_table_sp tbody").append(`
                        <tr>
                            <td class="text-center">${i + 1}</td>
                            <td>
                                <b>${row.JnsBarang}</b><br>
                                ${row.NamaType}
                            </td>
                            <td>${row.KodeBarang}</td>
                            <td class="text-end">
                                ${numeral(row.JmlOrder).format("0,0.00")} ${row.Satuan}
                            </td>
                            <td class="text-end">
                                ${row.Symbol} ${numeral(row.HargaSatuan).format("0,0.00")}
                            </td>
                        </tr>
                    `);
                });

                /* ================= FOOTER ================= */
                $("#preview_jenis_bayar").text(h.NamaPembayaran ?? "-");
                $("#preview_syarat_bayar").text(
                    h.SyaratBayar ? h.SyaratBayar + " Hari" : "-"
                );
                $("#preview_ppn").text(h.PPN ?? "-");

                $("#preview_rencana_kirim").text(
                    h.TglRencanaKirim
                        ? moment(h.TglRencanaKirim).format("MM-DD-YYYY")
                        : "-"
                );

                $("#preview_keterangan").html(
                    h.Ket && h.Ket.trim() !== ""
                        ? h.Ket.replace(/\r\n/g, "<br>")
                        : "-"
                );
                /* ================= TANDA TANGAN ================= */
                $("#preview_sales").text(h.Sales ?? "");
                $("#preview_manager").text(h.Manager ?? "");
                $("#preview_direktur").text(h.Direktur ?? "");
            })
            .finally(() => {
                $("#loading-screen").css("display", "none");
            });
    }


    //#endregion

    //#region Event Listener
    button_browseJenisSP.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: "Pilih Jenis SP",
                html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Jenis</th>
                            <th scope="col">Jenis SP</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
                preConfirm: () => {
                    const selectedData = $("#table_list")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                width: "40%",
                returnFocus: false,
                showCloseButton: true,
                showConfirmButton: true,
                confirmButtonText: "Select",
                didOpen: () => {
                    $(document).ready(function () {
                        const table = $("#table_list").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            paging: false,
                            scrollY: "400px",
                            scrollCollapse: true,
                            order: [0, "asc"],
                            ajax: {
                                url: "/Kencana/SuratPesananDirektur/getDataJenisSP",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                { data: "IDJnsSuratPesanan" },
                                { data: "JnsSuratPesanan" },
                            ],
                            columnDefs: [
                                {
                                    targets: 0,
                                    width: "30%",
                                },
                            ],
                        });

                        $("#table_list tbody").on("click", "tr", function () {
                            table.$("tr.selected").removeClass("selected");
                            $(this).addClass("selected");
                            scrollRowIntoView(this);
                        });

                        const searchInput = $("#table_list_filter input");
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydown(e, "table_list"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    jenisSP.value = result.value.JnsSuratPesanan.trim();
                    id_jenisSP.value = result.value.IDJnsSuratPesanan.trim();
                    getDataSuratPesanan();
                }
            });
        } catch (error) {
            console.error(error);
        }
    });

    // $(document).on("click", ".DetailSP", function (e) {
    //     let no_spValue = $(this).data("id");
    //     $.ajax({
    //         url: "/SuratPesananDirektur/getDetailSP",
    //         type: "GET",
    //         data: {
    //             _token: csrfToken,
    //             no_spValue: no_spValue,
    //         },
    //         success: function (response) {
    //             console.log(response);

    //             if (response.length > 0) {
    //                 $("#detailSPModal").modal("show");
    //                 nama_barangSP.value = response[0].NamaType;
    //                 quantitySP.value = numeral(response[0].Qty).format(
    //                     "0,0.00",
    //                 );
    //                 satuanSP.value = response[0].Satuan;
    //                 harga_satuanSP.value = numeral(
    //                     response[0].HargaSatuan,
    //                 ).format("0,0.0000");
    //                 uraianSP.value = response[0].UraianPesanan ?? "";
    //                 tgl_deliverySP.value = moment(
    //                     response[0].TglRencanaKirim,
    //                 ).format("YYYY-MM-DD");
    //             } else if (response.error || response.length < 1) {
    //                 Swal.fire({
    //                     icon: "info",
    //                     title: "Info!",
    //                     text: response.error,
    //                     showConfirmButton: false,
    //                 });
    //             }
    //         },
    //         error: function (xhr, status, error) {
    //             var err = eval("(" + xhr.responseText + ")");
    //             alert(err.Message);
    //         },
    //     });
    // });

    $(document).on("click", ".DetailSP", function (e) {
        e.preventDefault();
        let noSP = $(this).data("id");
        previewSuratPesanan(noSP);
    });


    $("#checkAllSuratPesanan").on("change", function () {
        let isChecked = this.checked;

        table_suratPesanan.rows().every(function () {
            let rowData = this.data();
            let id = $(rowData[0]).data("id");

            rowData[0] = checkboxHtml(id, isChecked);
            this.data(rowData);
        });

        table_suratPesanan.rows().every(function () {
            console.log(this.data()[0]); // checkbox HTML with checked
        });

        table_suratPesanan.draw(false);
    });

    $("#table_suratPesanan tbody").on(
        "change",
        ".check-surat-pesanan",
        function () {
            let $row = $(this).closest("tr");
            let row = table_suratPesanan.row($row);

            let rowData = row.data();
            let id = $(this).data("id");
            let isChecked = this.checked;

            // Update DataTables cell data
            rowData[0] = checkboxHtml(id, isChecked);
            row.data(rowData).draw(false);
        },
    );

    button_submitSelected.addEventListener("click", function (e) {
        e.preventDefault();

        let selectedSuratPesanan = [];
        table_suratPesanan.rows().every(function () {
            let rowData = this.data();
            let $checkbox = $(rowData[0]);
            if ($checkbox.is(":checked")) {
                let id = $checkbox.data("id");
                selectedSuratPesanan.push(id);
            }
        });

        if (selectedSuratPesanan.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "No Selection",
                text: "Please select at least one Surat Pesanan to approve.",
            });
            return;
        }

        $.ajax({
            url: "/Kencana/SuratPesananDirektur",
            method: "POST",
            data: {
                _token: csrfToken,
                jenisProses: "ACC Direktur",
                suratPesananIds: selectedSuratPesanan,
            },
            success: function (response) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text:
                        response.message ||
                        "Selected Surat Pesanan have been approved.",
                });
                getDataSuratPesanan();
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while approving Surat Pesanan.",
                });
            },
        });
    });
    //#endregion
});
