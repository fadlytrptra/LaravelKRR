//#region Variables

// Modal and its elements
const BNG_txtIdOrder = document.getElementById("bng_id_order");
const BNG_txtJmlBngStrip = document.getElementById("jml_bng_strip");
const BNG_slcSubKategori = document.getElementById("bng_sub_kategori");
const BNG_slcBenang = document.getElementById("bng_benang");
const BNG_txtJmlBenang = document.getElementById("jml_bng");

// Buttons
const btnIsiBenangWa = document.getElementById("btn_wa_isi");
const btnKoreksiBenangWa = document.getElementById("btn_wa_koreksi");
const btnHapusBenangWa = document.getElementById("btn_wa_hapus");
const btnIsiBenangWe = document.getElementById("btn_we_isi");
const btnKoreksiBenangWe = document.getElementById("btn_we_koreksi");
const btnHapusBenangWe = document.getElementById("btn_we_hapus");
const btnModalClose = document.querySelector('[data-bs-dismiss="modal"]');

// Non-elements
var selectedData;
var BNG_post_action;
var idSubKategori = "1474";

const columnsKu = [{ width: "300px" }, { width: "200px" }, { width: "200px" }];

//#endregion

//#region Listeners
$("#" + BNG_slcSubKategori.id).on("select2:select", function () {
    BNG_slcBenang.focus();
    idSubKategori = BNG_slcSubKategori.value.trim();
});

$("#" + BNG_slcBenang.id).on("select2:select", function () {
    BNG_txtJmlBenang.select();
});

btnIsiBenangWa.addEventListener("click", function () {
    if (BNG_slcBenang.selectedIndex !== 0) {
        // Cek apakah sudah pernah diinputkan
        for (let i = 0; i < BNG_listWaft.length; i++) {
            if (BNG_listWaft[i]["KodeBarang"] === BNG_slcBenang.value.trim()) {
                showToast("Data sudah ada!");
                BNG_slcBenang.focus();
                return;
            }
        }

        // Simpan di database
        showModal("Simpan Benang WA?", () => {
            fetchStatement(
                "/sp-order/Sp_Maint_Benang~1/" +
                    BNG_slcBenang.value +
                    "~1~" +
                    BNG_txtJmlBenang.value,
                () => {
                    fetchSelect("/sp-order/GET_ID_DETAIL_BENANG", (data) => {
                        BNG_listOrder.push(data[0]["IdDetail"]);
                        BNG_listWaft.push({
                            NamaBarang:
                                BNG_slcBenang.options[
                                    BNG_slcBenang.selectedIndex
                                ].text.split(" | ")[1],
                            KodeBarang: BNG_slcBenang.value,
                            JumlahBenang: BNG_txtJmlBenang.value,
                            IdDetail: data[0]["IdDetail"],
                        });

                        BNG_txtJmlBngStrip.value = BNG_listOrder.length;

                        updateTabelWA();
                        showToast("Benang WA Berhasil Disimpan!", "success");

                        $("#" + BNG_slcBenang.id)
                            .val(null)
                            .trigger("change");
                        BNG_txtJmlBenang.value = "";
                    });
                }
            );
        });
    }
});

btnKoreksiBenangWa.addEventListener("click", function () {
    if (selectedData && selectedData["TableSource"] === "table_benang_wa") {
        let i = selectedData["NomorKu"];
        showModal("Yakin ingin melakukan koreksi?", () => {
            fetchStatement(
                "/sp-order/Sp_Maint_Benang~2/" +
                    BNG_slcBenang.value +
                    "~" +
                    BNG_listWaft[i]["IdDetail"] +
                    "~" +
                    BNG_txtJmlBenang.value,
                () => {
                    BNG_listWaft[i]["KodeBarang"] = BNG_slcBenang.value;
                    BNG_listWaft[i]["NamaBarang"] =
                        BNG_slcBenang.options[
                            BNG_slcBenang.selectedIndex
                        ].text.split(" | ")[1];
                    BNG_listWaft[i]["JumlahBenang"] = BNG_txtJmlBenang.value;

                    updateTabelWA();
                    showToast("Benang WA Berhasil Dikoreksi!", "success");

                    $("#" + BNG_slcBenang.id)
                        .val(null)
                        .trigger("change");
                    BNG_txtJmlBenang.value = "";
                }
            );
        });
    } else showToast("Belum ada data yang dipilih!", "error");
});

btnHapusBenangWa.addEventListener("click", function () {
    if (selectedData && selectedData["TableSource"] === "table_benang_wa") {
        let indexBenang = selectedData["NomorKu"];
        let indexOrder = BNG_listOrder.indexOf(selectedData["IdDetail"]);
        showModal(
            "Hapus Benang WA: <b>" + selectedData["NamaBarang"] + "</b>?",
            () => {
                fetchStatement(
                    "/sp-order/Sp_Maint_Benang~3/" + selectedData["IdDetail"],
                    () => {
                        BNG_listWaft.splice(indexBenang, 1);
                        BNG_listOrder.splice(indexOrder, 1);

                        updateTabelWA();
                        showToast("Benang WA Berhasil Dihapus!", "success");

                        $("#" + BNG_slcBenang.id)
                            .val(null)
                            .trigger("change");
                        BNG_txtJmlBenang.value = "";
                    }
                );
            }
        );
    } else showToast("Belum ada data yang dipilih!", "error");
});

btnIsiBenangWe.addEventListener("click", function () {
    if (BNG_slcBenang.selectedIndex !== 0) {
        // Cek apakah sudah pernah diinputkan
        for (let i = 0; i < BNG_listWeft.length; i++) {
            if (BNG_listWeft[i]["KodeBarang"] === BNG_slcBenang.value.trim()) {
                showToast("Data sudah ada!");
                BNG_slcBenang.focus();
                return;
            }
        }

        // Simpan di database
        showModal("Simpan Benang WE?", () => {
            fetchStatement(
                "/sp-order/Sp_Maint_Benang~1/" +
                    BNG_slcBenang.value +
                    "~2~" +
                    BNG_txtJmlBenang.value,
                () => {
                    fetchSelect("/sp-order/GET_ID_DETAIL_BENANG", (data) => {
                        BNG_listOrder.push(data[0]["IdDetail"]);
                        BNG_listWeft.push({
                            NamaBarang:
                                BNG_slcBenang.options[
                                    BNG_slcBenang.selectedIndex
                                ].text.split(" | ")[1],
                            KodeBarang: BNG_slcBenang.value,
                            JumlahBenang: BNG_txtJmlBenang.value,
                            IdDetail: data[0]["IdDetail"],
                        });

                        BNG_txtJmlBngStrip.value = BNG_listOrder.length;

                        updateTabelWE();
                        showToast("Benang WE Berhasil Disimpan!", "success");

                        $("#" + BNG_slcBenang.id)
                            .val(null)
                            .trigger("change");
                        BNG_txtJmlBenang.value = "";
                    });
                }
            );
        });
    }
});

btnKoreksiBenangWe.addEventListener("click", function () {
    if (selectedData && selectedData["TableSource"] === "table_benang_we") {
        let i = selectedData["NomorKu"];
        showModal("Yakin ingin melakukan koreksi?", () => {
            fetchStatement(
                "/sp-order/Sp_Maint_Benang~2/" +
                    BNG_slcBenang.value +
                    "~" +
                    BNG_listWeft[i]["IdDetail"] +
                    "~" +
                    BNG_txtJmlBenang.value,
                () => {
                    BNG_listWeft[i]["KodeBarang"] = BNG_slcBenang.value;
                    BNG_listWeft[i]["NamaBarang"] =
                        BNG_slcBenang.options[
                            BNG_slcBenang.selectedIndex
                        ].text.split(" | ")[1];
                    BNG_listWeft[i]["JumlahBenang"] = BNG_txtJmlBenang.value;

                    updateTabelWE();
                    showToast("Benang WE Berhasil Dikoreksi!", "success");

                    $("#" + BNG_slcBenang.id)
                        .val(null)
                        .trigger("change");
                    BNG_txtJmlBenang.value = "";
                }
            );
        });
    } else showToast("Belum ada data yang dipilih!", "error");
});

btnHapusBenangWe.addEventListener("click", function () {
    if (selectedData && selectedData["TableSource"] === "table_benang_we") {
        let indexBenang = selectedData["NomorKu"];
        let indexOrder = BNG_listOrder.indexOf(selectedData["IdDetail"]);
        showModal(
            "Hapus Benang WE: <b>" + selectedData["NamaBarang"] + "</b>?",
            () => {
                fetchStatement(
                    "/sp-order/Sp_Maint_Benang~3/" + selectedData["IdDetail"],
                    () => {
                        BNG_listWeft.splice(indexBenang, 1);
                        BNG_listOrder.splice(indexOrder, 1);

                        updateTabelWE();
                        showToast("Benang WE Berhasil Dihapus!", "success");

                        $("#" + BNG_slcBenang.id)
                            .val(null)
                            .trigger("change");
                        BNG_txtJmlBenang.value = "";
                    }
                );
            }
        );
    } else showToast("Belum ada data yang dipilih!", "error");
});
//#endregion

//#region Functions
function updateTabelWA() {
    console.log(BNG_listOrder);

    updateTable("table_benang_wa", BNG_listWaft, [
        "NamaBarang",
        "KodeBarang",
        "JumlahBenang",
    ]);

    addRowClick(
        "table_benang_wa",
        (_, index) => {
            addOptionToSelect(
                BNG_slcBenang.id,
                BNG_listWaft[index]["KodeBarang"],
                BNG_listWaft[index]["NamaBarang"]
            );

            BNG_slcSubKategori.disabled = true;
            BNG_txtJmlBenang.value = BNG_listWaft[index]["JumlahBenang"];
            selectedData = BNG_listWaft[index];
            selectedData["NomorKu"] = index;
            selectedData["TableSource"] = "table_benang_wa";
        },
        () => {
            BNG_slcSubKategori.disabled = false;
            $("#" + BNG_slcBenang.id)
                .val(null)
                .trigger("change");
            BNG_txtJmlBenang.value = "";
            selectedData = null;
        }
    );
}

function updateTabelWE() {
    console.log(BNG_listOrder);

    updateTable("table_benang_we", BNG_listWeft, [
        "NamaBarang",
        "KodeBarang",
        "JumlahBenang",
    ]);

    addRowClick(
        "table_benang_we",
        (_, index) => {
            addOptionToSelect(
                BNG_slcBenang.id,
                BNG_listWeft[index]["KodeBarang"],
                BNG_listWeft[index]["NamaBarang"]
            );

            BNG_slcSubKategori.disabled = true;
            BNG_txtJmlBenang.value = BNG_listWeft[index]["JumlahBenang"];
            selectedData = BNG_listWeft[index];
            selectedData["NomorKu"] = index;
            selectedData["TableSource"] = "table_benang_we";
        },
        () => {
            BNG_slcSubKategori.disabled = false;
            $("#" + BNG_slcBenang.id)
                .val(null)
                .trigger("change");
            BNG_txtJmlBenang.value = "";
            selectedData = null;
        }
    );
}

function init_benang() {
    const tableWa = initTable("table_benang_wa", columnsKu, 0);
    const tableWe = initTable("table_benang_we", columnsKu, 1);

    tableWa.on("select", function () {
        tableWe.rows({ selected: true }).deselect();
    });
    tableWe.on("select", function () {
        tableWa.rows({ selected: true }).deselect();
    });

    // Jika data belum di-proses, tapi modal dibuka-tutup.
    // Ambil data yang tersimpan secara lokal di array.
    if (BNG_listWaft.length > 0) updateTabelWA();
    if (BNG_listWeft.length > 0) updateTabelWE();

    // Ambil data yang tersimpan di server dilakukan pada orderMaster.js line 285
    // Cari "Sp_List_Benang"

    $("#" + BNG_slcSubKategori.id).select2({
        dropdownParent: $("#modalBenang"),
        placeholder: "-- Pilih Sub Kategori --",
    });

    if (hidProses.value == 3) {
        $("#" + BNG_slcBenang.id).select2({
            dropdownParent: $("#modalBenang"),
            placeholder: "-- Pilih Benang --",
        });

        BNG_slcBenang.disabled = true;
        BNG_slcSubKategori.disabled = true;
        BNG_txtJmlBenang.disabled = true;
        btnIsiBenangWa.disabled = true;
        btnKoreksiBenangWa.disabled = true;
        btnHapusBenangWa.disabled = true;
        btnIsiBenangWe.disabled = true;
        btnKoreksiBenangWe.disabled = true;
        btnHapusBenangWe.disabled = true;
    } else {
        $("#" + BNG_slcBenang.id).select2({
            placeholder: "",
            dropdownParent: $("#modalBenang"),
            ajax: {
                url: url_BenangStrip,
                type: "GET",
                dataType: "json",
                delay: 250,

                data: function (params) {
                    return {
                        searchItem: params.term,
                        page: params.page || 1,
                        subKategori: idSubKategori,
                    };
                },

                processResults: function (data, params) {
                    params.page = params.page || 1;

                    console.log(data.data);

                    data.data.forEach(function (d) {
                        d.id = d.KD_BRG;

                        if (d.KD_BRG && d.NAMA_BRG) {
                            d.text = d.KD_BRG + " | " + d.NAMA_BRG;
                        }
                    });

                    return {
                        results: data.data,
                        pagination: {
                            more: data.current_page < data.last_page,
                        },
                    };
                },
            },

            templateResult: function (data) {
                if (data.loading) {
                    return data.text;
                } else {
                    return data.KD_BRG + " | " + data.NAMA_BRG;
                }
            },

            templateSelection: function (data) {
                return data.text || "-- Pilih Benang --";
            },
        });
    }
}

$("#modalBenang").on("shown.bs.modal", function () {
    init_benang();
});

$("#modalBenang").on("hidden.bs.modal", function () {
    $("#table_benang_wa").DataTable().destroy();
    $("#table_benang_we").DataTable().destroy();

    if (BNG_post_action) BNG_post_action();
});
//#endregion
