$(document).ready(function () {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let redisplay = document.getElementById("button_redisplay");
    let formCekRedisplay = document.getElementById("formCekRedisplay");
    let formApprove = document.getElementById("formApprove");
    let supplier_select = document.getElementById("supplier_select");
    let matauang_select = document.getElementById("matauang_select");
    let ppn_select = document.getElementById("ppn_select");
    let ppn = document.getElementById("ppn");
    let dpp_nilaiLain = document.getElementById("dpp_nilaiLain");
    let idr_dpp = document.getElementById("idr_dpp");
    let kurs = document.getElementById("kurs");
    let harga_unit = document.getElementById("harga_unit");
    let harga_sub_total = document.getElementById("harga_sub_total");
    let idr_sub_total = document.getElementById("idr_sub_total");
    let idr_ppn = document.getElementById("idr_ppn");
    let harga_total = document.getElementById("harga_total");
    let idr_harga_total = document.getElementById("idr_harga_total");
    let qty_delay = document.getElementById("qty_delay");
    let qty_order = document.getElementById("qty_order");
    let btn_clear = document.getElementById("btn_clear");
    let btn_approve = document.getElementById("btn_approve");
    let btn_reject = document.getElementById("btn_reject");
    let keterangan_internal = document.getElementById("keterangan_internal");
    let keterangan_order = document.getElementById("keterangan_order");
    let user_input = document.getElementById("user_input");
    let sub_kategori = document.getElementById("sub_kategori");
    let nama_barang = document.getElementById("nama_barang");
    let kode_barang = document.getElementById("kode_barang");
    let divisi = document.getElementById("divisi");
    let no_po = document.getElementById("no_po");
    let idr_unit = document.getElementById("idr_unit");
    let alasan_reject = document.getElementById("alasan_reject");
    let tanggal_dibutuhkan = document.getElementById("tanggal_dibutuhkan");
    $("#table_IsiHarga").DataTable({
        searching: false,
        lengthChange: false,
    });

    let jenisSupplier;
    let fixValueQTYOrder;

    // let csrfToken = $('meta[name="csrf-token"]').attr("content");
    let url = window.location.href;
    let segments = url.split("/");
    let id = segments[segments.length - 1];

    setInputFilter(
        document.getElementById("qty_delay"),
        function (value) {
            var numericValue = parseFloat(value);

            return (
                value === "" ||
                (!isNaN(numericValue) &&
                    numericValue >= 0 &&
                    numericValue <= fixValueQTYOrder)
            );
        },
        "Tidak boleh ketik karakter dan angka di bawah 0, harus angka di atas 0 dan tidak boleh lebih dari angka awal.",
    );

    tanggal_dibutuhkan.valueAsDate = new Date();
    formCekRedisplay.addEventListener("change", function (event) {
        redisplay.disabled = !radioButtonIsSelected();
        redisplay.focus();
    });
    btn_reject.disabled = true;
    btn_approve.disabled = true;
    alasan_reject.addEventListener("input", function (event) {
        if (alasan_reject.value.trim() !== "") {
            btn_reject.disabled = false;
        } else {
            btn_reject.disabled = true;
        }
    });

    alasan_reject.addEventListener("keypress", function (event) {
        if (event.key == "Enter") {
            if (alasan_reject.value.trim() !== "") {
                btn_reject.focus();
            }
        }
    });

    btn_reject.addEventListener("click", function (event) {
        btn_reject.disabled = true;
        $.ajax({
            url: "/IsiSupplierHarga/" + id + "/Reject",
            type: "PUT",
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            data: {
                noTrans: no_po.value,
                alasan: alasan_reject.value,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (response) {
                Swal.fire({
                    icon: "success",
                    title: "Data Berhasil DiReject!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.log(response);
                clearData();
                $("#table_IsiHarga").DataTable().ajax.reload();
            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Data Tidak Berhasil DiReject!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.error("Error Send Data:", error);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
    });

    function clearData() {
        tanggal_dibutuhkan.valueAsDate = new Date();
        btn_approve.disabled = true;
        btn_reject.disabled = true;
        no_po.value = "";
        divisi.value = "";
        kode_barang.value = "";
        nama_barang.value = "";
        sub_kategori.value = "";
        user_input.value = "";
        keterangan_order.value = "-";
        keterangan_internal.value = "-";
        supplier_select.selectedIndex = 0;
        for (let i = 0; i < ppn_select.options.length; i++) {
            if (ppn_select.options[i].value.replace(/\s/g, "") == "6") {
                ppn_select.selectedIndex = i;
                $("#ppn_select").trigger("change");
            }
        }
        matauang_select.selectedIndex = 0;
        qty_delay.value = 0;
        qty_order.value = 0;
        harga_unit.value = 0;
        idr_unit.value = 0;
        harga_sub_total.value = 0;
        idr_sub_total.value = 0;
        dpp_nilaiLain.value = 0;
        idr_dpp.value = 0;
        ppn.value = 0;
        idr_ppn.value = 0;
        harga_total.value = "";
        idr_harga_total.value = "";
        kurs.value = 1;
        alasan_reject.value = "";
    }

    btn_clear.addEventListener("click", function (event) {
        clearData();
    });
    btn_approve.addEventListener("click", function (event) {
        btn_approve.disabled = true;
        $.ajax({
            url: "/IsiSupplierHarga/" + id + "/Approve",
            type: "PUT",
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            data: {
                Qty: numeral(qty_order.value).value(),
                QtyDelay: numeral(qty_delay.value).value(),
                idsup: supplier_select.value,
                kurs: kurs.value,
                pUnit: numeral(harga_unit.value).value(),
                pSub: numeral(harga_sub_total.value).value(),
                idPPN: ppn_select.value,
                pPPN: numeral(ppn.value).value(),
                pTOT: numeral(harga_total.value).value(),
                pIDRUnit: numeral(idr_unit.value).value(),
                pIDRSub: numeral(idr_sub_total.value).value(),
                pIDRPPN: numeral(idr_ppn.value).value(),
                pIDRTot: numeral(idr_harga_total.value).value(),
                mtUang: matauang_select.value,
                noTrans: no_po.value,
                jns_beli: jenisSupplier,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            success: function (response) {
                Swal.fire({
                    icon: "success",
                    title: "Data Berhasil DiApprove!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.log(response);
                clearData();
                $("#table_IsiHarga").DataTable().ajax.reload();
            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Data Tidak Berhasil DiApprove!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                console.error("Error Send Data:", error);
            },
            complete: function () {
                // Hide loading screen
                $("#loading-screen").css("display", "none");
            },
        });
    });

    redisplay.addEventListener("click", function (event) {
        if (radioButtonIsSelected()) {
            let radioButtonChecked = radioButtonIsSelected();
            let value = getSelectedInputValue();
            if (radioButtonChecked === "AllOrder") {
                $("#table_IsiHarga").DataTable().clear().destroy();
                redisplayData(null, null, 24);
            } else if (radioButtonChecked === "NomorOrder") {
                $("#table_IsiHarga").DataTable().clear().destroy();
                redisplayData(value, null, 11);
            } else if (radioButtonChecked === "User") {
                $("#table_IsiHarga").DataTable().clear().destroy();
                redisplayData(null, value, 23);
            }
        } else {
            alert("Silahkan Mengisi Form Input");
        }
    });

    function radioButtonIsSelected() {
        let radioButtons = document.getElementsByName("filter_radioButton");

        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                return radioButtons[i].value;
            }
        }
        return false;
    }

    function getSelectedInputValue() {
        let radioButtons = document.getElementsByName("filter_radioButton");

        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                if (radioButtons[i].value !== "AllOrder") {
                    let inputText = document.getElementsByName(
                        "search_" + radioButtons[i].value,
                    )[0];
                    return inputText.value.trim();
                } else {
                    return radioButtons[i].value;
                }
            }
        }
        return false;
    }

    function redisplayData(noTrans, requester, kd) {
        let table = $("#table_IsiHarga").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            scrollX: true,
            searching: false,
            scrollY: "255px",
            // paging: false,
            lengthChange: false,
            pageLength: 100,
            ajax: {
                url: "/IsiSupplierHarga/" + id + "/Redisplay",
                type: "GET",
                data: function (data) {
                    ((data.noTrans = noTrans),
                        (data.requester = requester),
                        (data.kd = kd));
                },
            },
            columns: [
                { data: "No_trans" },
                { data: "StatusPembelian" },
                { data: "Kd_brg" },
                { data: "NAMA_BRG" },
                { data: "nama_sub_kategori" },
                {
                    data: "Qty",
                    render: function (data) {
                        return numeral(parseFloat(data)).format("0,0.0000"); // Format with thousand separators and two decimal places
                    },
                },
                { data: "Nama_satuan" },
                { data: "Nama" },
                { data: "Kd_div" },
                {
                    data: "Tgl_Dibutuhkan",
                    render: function (data, type, row) {
                        let parts = data.split(" ")[0].split("-");

                        let tgl = parts[2] + "-" + parts[1] + "-" + parts[0];
                        return tgl;
                    },
                },
                {
                    data: "keterangan",
                    render: function (data) {
                        return data == "-"
                            ? '<p style="text-align:center;font-size: 14px;">-</p>'
                            : data ||
                            '<p style="text-align:center;font-size: 14px;">-</p>';
                    },
                },
                {
                    data: "Ket_Internal",
                    render: function (data) {
                        return data == "-"
                            ? '<p style="text-align:center;font-size: 14px;">-</p>'
                            : data ||
                            '<p style="text-align:center;font-size: 14px;">-</p>';
                    },
                },
                {
                    data: "Tgl_acc",
                    render: function (data, type, row) {
                        let parts = data.split(" ")[0].split("-");
                        let time = data.split(" ")[1].split(".");
                        console.log(parts);

                        let tgl =
                            parts[2] +
                            "-" +
                            parts[1] +
                            "-" +
                            parts[0] +
                            " " +
                            time[0];
                        return tgl;
                    },
                },
            ],
            rowCallback: function (row, data) {
                $(row).on("dblclick", function (event) {
                    clearData();
                    no_po.value = data.No_trans;
                    document.getElementById(
                        "status_beliPengadaanPembelian",
                    ).checked = data.StatusPembelian === "Pengadaan Pembelian";
                    document.getElementById("status_beliBeliSendiri").checked =
                        data.StatusPembelian === "Beli Sendiri";
                    tanggal_dibutuhkan.value = data.Tgl_Dibutuhkan.split(" ")[0];
                    divisi.value = data.Kd_div;
                    kode_barang.value = data.Kd_brg;
                    nama_barang.value = data.NAMA_BRG.replace(/&lt;/g, "<")
                        .replace(/&gt;/g, ">")
                        .replace(/&quot;/g, '"');
                    sub_kategori.value = data.nama_sub_kategori;
                    qty_order.value = parseFloat(data.Qty);
                    user_input.value = data.Nama;
                    keterangan_order.value = data.keterangan || "-";
                    keterangan_internal.value = data.Ket_Internal || "-";
                    fixValueQTYOrder = data.Qty;
                    qty_order.focus();
                });
            },
        });

        table.on("dblclick", "tbody tr", (e) => {
            const classList = e.currentTarget.classList;

            if (classList.contains("selected")) {
                classList.remove("selected");
            } else {
                table
                    .rows(".selected")
                    .nodes()
                    .each((row) => row.classList.remove("selected"));
                classList.add("selected");
            }
        });
        btn_clear.addEventListener("click", function () {
            table.row(".selected").remove().draw(false);
        });
    }
    $(document).ready(function () {
        $.ajax({
            url: "/IsiSupplierHarga/" + id + "/DaftarData",
            type: "GET",
            success: function (data) {
                let matauang = data.matauang;
                let supplier = data.supplier;
                let ppn = data.ppn;
                matauang.forEach(function (data) {
                    let option = document.createElement("option");
                    option.value = data.Id_MataUang;
                    option.text = data.Nama_MataUang;
                    matauang_select.add(option);
                });
                supplier.forEach(function (data) {
                    let option = document.createElement("option");
                    option.value = data.NO_SUP;
                    option.text = data.NM_SUP + " (" + data.NO_SUP + ")";
                    supplier_select.add(option);
                });
                ppn.forEach(function (data) {
                    let option = document.createElement("option");
                    option.value = data.IdPPN;
                    option.text = (data.JumPPN * 1).toFixed(5);

                    switch (data.IdPPN) {
                        case "6":
                            option.text += " (Tidak Pakai PPN)";
                            option.selected = true; // Automatically select this option
                            break;
                        case "16":
                            option.text += " (PPN Impor)";
                        case "17":
                            option.text += " (Barang Mewah)";
                            break;
                        case "19":
                            option.text += " (DPP FULL)";
                            break;
                    }

                    ppn_select.add(option);
                });
            },
            error: function (error) {
                console.error("Error Fetch Data:", error);
            },
        });

        qty_delay.addEventListener("input", function (event) {
            let qtyDelay = parseFloat(fixValueQTYOrder - qty_delay.value);
            console.log(qtyDelay);

            if (qtyDelay <= fixValueQTYOrder && qtyDelay >= 0) {
                qty_order.value = numeral(qtyDelay).format("0,0.0000");
            }
            updateIdrUnit();
            updateSubTotal();
            updateIDRSubTotal();
            updateDPPNilaiLain();
            updateIDRDPPNilaiLain();
            updateIDRPPN();
            updatePPN();
            updateHargaTotal();
            updateIDRHargaTotal();
        });

        qty_order.addEventListener("input", function (event) {
            let qtyOrder = parseFloat(fixValueQTYOrder - qty_order.value);
            if (qtyOrder <= fixValueQTYOrder && qtyOrder >= 0) {
                qty_delay.value = parseFloat(qtyOrder).format("0,0.0000");
            }
            updateIdrUnit();
            updateSubTotal();
            updateIDRSubTotal();
            updateDPPNilaiLain();
            updateIDRDPPNilaiLain();
            updateIDRPPN();
            updatePPN();
            updateHargaTotal();
            updateIDRHargaTotal();
        });

        kurs.addEventListener("input", function (event) {
            setInputFilter(
                document.getElementById("kurs"),
                function (value) {
                    return /^-?\d*[.,]?\d*$/.test(value);
                },
                "Tidak boleh character, harus angka",
            );
            updateIdrUnit();
            updateSubTotal();
            updateIDRSubTotal();
            updateDPPNilaiLain();
            updateIDRDPPNilaiLain();
            updateIDRPPN();
            updatePPN();
            updateHargaTotal();
            updateIDRHargaTotal();
        });

        harga_unit.addEventListener("input", function (event) {
            setInputFilter(
                document.getElementById("harga_unit"),
                function (value) {
                    return /^-?\d*([.,]\d*)*$/.test(value);
                },
                "Tidak boleh character, harus angka",
            );
            updateIdrUnit();
            updateSubTotal();
            updateIDRSubTotal();
            updateDPPNilaiLain();
            updateIDRDPPNilaiLain();
            updateIDRPPN();
            updatePPN();
            updateHargaTotal();
            updateIDRHargaTotal();
        });

        $("#ppn_select").select2({
            width: "100%",
            placeholder: "Pilih PPN",
            allowClear: false
        });

        $("#ppn_select").on("change", function () {
            updateDPPNilaiLain();
            updateIDRDPPNilaiLain();
            updatePPN();
            updateIDRPPN();
            updateHargaTotal();
            updateIDRHargaTotal();
        });

        // Saat Select2 dibuka
        $("#ppn_select").on("select2:open", function () {

            let searchInput = $(".select2-container--open .select2-search__field");

            searchInput.off("keydown.ppnSelect");

            searchInput.on("keydown.ppnSelect", function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();
                    event.stopPropagation();

                    $("#ppn_select").select2("close");

                    setTimeout(function () {
                        btn_approve.focus();
                    }, 200);
                }
            });
        });

        // ppn_select.addEventListener("change", function (event) {
        //     updateDPPNilaiLain();
        //     updateIDRDPPNilaiLain();
        //     updatePPN();
        //     updateIDRPPN();
        //     updateHargaTotal();
        //     updateIDRHargaTotal();
        //     // btn_approve.focus();
        // });

        // ppn_select.addEventListener("keypress", function (event) {
        //     if (event.key == "Enter") {
        //         event.preventDefault();
        //         btn_approve.focus();
        //     }
        // });

        qty_order.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                let numeralValue = numeral(qty_order.value).value();
                this.value = numeral(numeralValue).format("0,0.0000");
                qty_delay.focus();
                qty_delay.select();
            }
        });
        qty_delay.addEventListener("keypress", function (event) {
            if (event.key == "Enter") {
                let numeralValue = numeral(qty_delay.value).value();
                this.value = numeral(numeralValue).format("0,0.0000");
                supplier_select.focus();
            }
        });
        supplier_select.addEventListener("change", function (event) {
            if (supplier_select.selectedIndex !== 0) {
                btn_approve.disabled = !supplier_select.selectedIndex === 0;
                $.ajax({
                    url: "/IsiSupplierHarga/" + id + "/DaftarSupplier",
                    type: "GET",
                    data: {
                        idsup: supplier_select.value,
                    },
                    success: function (response) {
                        for (let i = 0; i < matauang_select.options.length; i++) {
                            if (
                                matauang_select.options[i].value.replace(
                                    /\s/g,
                                    "",
                                ) === response[0].Id_MataUang.replace(/\s/g, "")
                            ) {
                                matauang_select.selectedIndex = i;
                            }
                        }
                        let jenisSupplier = response[0].JNS_SUP;

                        let firstChar = kode_barang.value.substring(0, 1);
                        let validFirstPrefixes = ["4", "1"];

                        if (!validFirstPrefixes.includes(firstChar)) {
                            harga_unit.focus();
                            harga_unit.select();
                            return;
                        }

                        let secondChar = kode_barang.value.substring(1, 2);
                        let validSecondPrefixes = ["0", "1"];
                        if (
                            jenisSupplier == "01" &&
                            validSecondPrefixes.includes(secondChar)
                        ) {
                            // Kode yang dijalankan jika jenisSupplier adalah "01" dan secondChar valid
                            // Bisa memilih lokal
                        } else if (
                            jenisSupplier == "01" &&
                            !validSecondPrefixes.includes(secondChar)
                        ) {
                            Swal.fire({
                                icon: "info",
                                title: "Info!",
                                text: "Supplier Harus Impor",
                                showConfirmButton: true,
                            });
                            supplier_select.selectedIndex = 0;
                        } else if (
                            jenisSupplier == "02" &&
                            validSecondPrefixes.includes(secondChar)
                        ) {
                            Swal.fire({
                                icon: "info",
                                title: "Info!",
                                text: "Supplier Harus Lokal",
                                showConfirmButton: true,
                            });
                            supplier_select.selectedIndex = 0;
                        } else if (
                            jenisSupplier == "02" &&
                            !validSecondPrefixes.includes(secondChar)
                        ) {
                            // Tambahkan logika tambahan di sini jika diperlukan
                        }
                        console.log(response[0]);
                        // if (response[0].ID_MATAUANG != 1) {
                        //     kurs.focus();
                        // } else {
                        let eventEnter = new KeyboardEvent("keypress", {
                            key: "Enter",
                            code: "Enter",
                            keyCode: 13,
                            which: 13,
                            bubbles: true,
                            cancelable: true,
                        });
                        kurs.dispatchEvent(eventEnter);
                        harga_unit.focus();
                        harga_unit.select();
                        // }
                    },
                    error: function (error) {
                        console.error("Error Send Data:", error);
                    },
                });
            }
        });
        kurs.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                kurs.value = parseFloat(kurs.value).toFixed(4);
                harga_unit.focus();
                harga_unit.select();
            }
        });

        harga_unit.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                const data = numeral(harga_unit.value).value();
                harga_unit.value = numeral(data).format("0,0.0000");
                ppn_select.focus();
            }
        });
    });

    function updateIdrUnit() {
        let kurs = numeral(document.getElementById("kurs").value).value();
        let hargaUnit = numeral(
            document.getElementById("harga_unit").value,
        ).value();
        if (!isNaN(kurs) && !isNaN(hargaUnit)) {
            let idrUnitValue = hargaUnit * kurs;
            idr_unit.value = numeral(idrUnitValue).format("0,0.0000");
        }
    }

    function updateSubTotal() {
        let qty_order = numeral(document.getElementById("qty_order").value).value();
        let hargaUnit = numeral(
            document.getElementById("harga_unit").value,
        ).value();
        if (!isNaN(qty_order) && !isNaN(hargaUnit)) {
            let SubTotalValue = hargaUnit * qty_order;
            harga_sub_total.value = numeral(SubTotalValue).format("0,0.0000");
        }
    }

    function updateIDRSubTotal() {
        let kurs = numeral(document.getElementById("kurs").value).value();
        let hargaSubTotal = numeral(
            document.getElementById("harga_sub_total").value,
        ).value();
        if (!isNaN(kurs) && !isNaN(hargaSubTotal)) {
            let idrSubTotalValue = hargaSubTotal * kurs;
            idr_sub_total.value = numeral(idrSubTotalValue).format("0,0.0000");
        }
    }

    function updateDPPNilaiLain() {
        let harga_subTotal = numeral(harga_sub_total.value).value();
        let DPPValue = 0;
        if (!isNaN(harga_subTotal) && ppn_select.value == "15") {
            DPPValue = (harga_subTotal * 11) / 12;
            dpp_nilaiLain.value = numeral(DPPValue).format("0,0.0000");
        } else if (ppn_select.value == "18") {
            DPPValue = harga_subTotal / 10;
            dpp_nilaiLain.value = numeral(DPPValue).format("0,0.0000");
        } else if (ppn_select.value == "19") {
            DPPValue = harga_subTotal;
            dpp_nilaiLain.value = numeral(DPPValue).format("0,0.0000");
        } else if (ppn_select.value == "16" || ppn_select.value == "6") {
            dpp_nilaiLain.value = numeral(0).format("0,0.0000");
        } else {
            dpp_nilaiLain.value = numeral(harga_subTotal).format("0,0.0000");
        }
    }

    function updateIDRDPPNilaiLain() {
        let idr_hargaSubTotal = numeral(idr_sub_total.value).value();
        let IDRDPPValue = 0;
        if (!isNaN(idr_hargaSubTotal) && ppn_select.value == "15") {
            IDRDPPValue = (idr_hargaSubTotal * 11) / 12;
            idr_dpp.value = numeral(IDRDPPValue).format("0,0.0000");
        } else if (ppn_select.value == "18") {
            IDRDPPValue = idr_hargaSubTotal / 10;
            idr_dpp.value = numeral(IDRDPPValue).format("0,0.0000");
        } else if (ppn_select.value == "19") {
            DPPValue = idr_hargaSubTotal;
            idr_dpp.value = numeral(DPPValue).format("0,0.0000");
        } else if (ppn_select.value == "16" || ppn_select.value == "6") {
            idr_dpp.value = numeral(0).format("0,0.0000");
        } else {
            idr_dpp.value = numeral(idr_hargaSubTotal).format("0,0.0000");
        }
    }

    function updatePPN() {
        let selectedOptionText = ppn_select.options[ppn_select.selectedIndex].text;
        let numericPart = selectedOptionText.split(" ")[0]; // Extract the numeric part
        let textPart = selectedOptionText.split(" (")[1]; // Extract the text part

        if (textPart) {
            textPart = textPart.replace(")", ""); // Remove the closing parenthesis
        }
        let selectedPPN = numeral(numericPart).value();
        let DPPValue = numeral(dpp_nilaiLain.value).value();

        if (!isNaN(selectedPPN) && !isNaN(DPPValue)) {
            if (ppn_select.value == "18") {
                //untuk ppn 1.2%
                selectedPPN = 12;
            }
            let jumPPN = (DPPValue * selectedPPN) / 100;
            ppn.value = numeral(jumPPN).format("0,0.0000");
        }
    }

    function updateIDRPPN() {
        let selectedOptionText = ppn_select.options[ppn_select.selectedIndex].text;
        let numericPart = selectedOptionText.split(" ")[0]; // Extract the numeric part
        let textPart = selectedOptionText.split(" (")[1]; // Extract the text part
        
        if (textPart) {
            textPart = textPart.replace(")", ""); // Remove the closing parenthesis
        }
        let selectedPPN = numeral(numericPart).value();
        let kurs = numeral(document.getElementById("kurs").value).value();
        let IDRDPPValue = numeral(idr_dpp.value).value();

        if (!isNaN(selectedPPN) && !isNaN(IDRDPPValue)) {
            if (ppn_select.value == "18") {
                //untuk ppn 1.2%
                selectedPPN = 12;
            }
            let jumPPN = (IDRDPPValue * selectedPPN) / 100;
            let idrPPNValue = jumPPN * kurs;
            idr_ppn.value = numeral(idrPPNValue).format("0,0.0000");
        }
        if (textPart == "PPN Custom") {
            idr_ppn.readOnly = false;
        } else {
            idr_ppn.readOnly = true;
        }
    }

    function updateHargaTotal() {
        let ppn = numeral(document.getElementById("ppn").value).value();
        let hargaSubTotal = numeral(
            document.getElementById("harga_sub_total").value,
        ).value();
        if (!isNaN(ppn) && !isNaN(hargaSubTotal)) {
            let hargaTotalValue = hargaSubTotal + ppn;
            harga_total.value = numeral(hargaTotalValue).format("0,0.0000");
        }
    }

    function updateIDRHargaTotal() {
        let kurs = numeral(document.getElementById("kurs").value).value();
        let hargaTotal = numeral(
            document.getElementById("harga_total").value,
        ).value();
        if (!isNaN(kurs) && !isNaN(hargaTotal)) {
            let IDRHargaTotalValue = hargaTotal * kurs;
            idr_harga_total.value = numeral(IDRHargaTotalValue).format("0,0.0000");
        }
    }
});