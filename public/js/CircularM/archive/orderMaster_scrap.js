function loadBenangWeftFetch() {
    let weft_value = slcBenangWEFT.value;
    let weft_i = slcBenangWEFT.selectedIndex;
    let weft_text = slcBenangWEFT.options[weft_i].text.split(" | ")[1];
    let weft_state = hidProses.value == "3" ? true : false;

    if ((hidProses.value == "1" && adaOrder) || hidProses.value == "2") {
        loadSelect2(
            "/sp-order/Sp_List_Order~10/" + (slcBenangWEFT.value ?? "-"),
            slcBenangWEFT,
            ["KD_BRG", "NAMA_BRG"],
            {
                label: "Benang WEFT",
                postAction: () => {
                    if (hidProses.value !== "1")
                        addOptionToSelect("benang_weft", weft_value, weft_text);
                },
            }
        );
    } else {
        // 1474
        loadSelect2(
            "/sp-order/Sp_Mohon_Beli~5/" + txtIdSubBenang.value,
            slcBenangWEFT,
            ["KD_BRG", "NAMA_BRG"],
            {
                label: "Benang WEFT",
                disable: weft_state,
                postAction: () => {
                    if (hidProses.value !== "1")
                        addOptionToSelect("benang_weft", weft_value, weft_text);
                },
            }
        );
    }
}

/**
 * Dipakai untuk mode proses isi, saat page tidak ingin di-refresh agar bisa melihat data apa yang baru saja ditambahkan.
 * Menurutku tidak perlu karena setelah di-refresh bisa langsung cek kembali select box untuk mengetahui data yang baru ditambahkan.
 */
function temp1() {
    event.preventDefault();
    showToast("Data sedang diproses...");

    fetchStatement("/sp-order/Sp_Maint_Order~1/" + hidData.value, () => {
        disableAllInputs();
        btnBenangStrip.disabled = true;
        toggleButtons(1);
        showToast("Data Berhasil Tersimpan!", "success");

        loadSelect2(
            "/sp-order/Sp_List_Order~3",
            slcIdOrder,
            ["Id_order", "Nama_Barang"],
            {
                label: "Id Order",
                disable: true,
                postAction: () => {
                    let selectElement = document.getElementById("id_order");
                    let options = selectElement.options;

                    // Extract values from options and put them into an array
                    let values = Array.from(options)
                        .map((option) => parseFloat(option.value))
                        .filter((value) => !isNaN(value));

                    // Find the maximum value
                    let maxValue = Math.max(...values);

                    // Find the index of the option with the highest value
                    let maxIndex = values.findIndex(
                        (value) => value === maxValue
                    );

                    // Set the selected attribute of the option with the highest value
                    if (maxIndex !== -1) options[maxIndex + 1].selected = true;

                    btnIsi.classList.remove("btn-clicked-isi");
                },
            }
        );

        // Reset Variables
        adaOrder = false;
        jumlahBenang = 0;
    });
}

function updateTabelWA() {
    clearSelectedClass("table_benang_wa");
    populateTable("table_benang_wa", BNG_listWaft, {
        headers: ["Nama Barang", "Kode Barang", "Jumlah Benang"],
        colSizes: [300, 200, 200],
        keyOrder: ["NamaBarang", "KodeBarang", "JumlahBenang"],
        tableIndex: 1,
        rowEventHandler: (data) => {
            console.log(data);
            addOptionToSelect(
                BNG_slcBenang.id,
                data["Kode Barang"],
                data["Nama Barang"]
            );
            BNG_txtJmlBenang.value = data["Jumlah Benang"];
        },
    });
}

btnKoreksiBenangWa.addEventListener("click", function () {
    if (selectedData && selectedData["TableSource"] === "table_benang_wa") {
        let i = selectedData["NomorKu"];
        showModal(
            "Koreksi jumlah Benang WA: <b>" +
                selectedData["NamaBarang"] +
                "</b>?",
            () => {
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
                        BNG_listWaft[i]["JumlahBenang"] =
                            BNG_txtJmlBenang.value;

                        updateTabelWA();

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
