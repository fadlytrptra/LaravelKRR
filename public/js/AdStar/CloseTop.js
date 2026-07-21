jQuery(function ($) {
    //#region Get element by ID
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let nomorUser = document.getElementById("nomorUser");
    let idProduct = document.getElementById("idProduct");
    let productStarpak = document.getElementById("productStarpak");
    let productAdstar = document.getElementById("productAdstar");
    let idCustomer = document.getElementById("idCustomer");
    let namaCustomer = document.getElementById("namaCustomer");
    let btnBrowseCustomer = document.getElementById("btnBrowseCustomer");
    let btnJenisBag = document.getElementById("btnJenisBag");
    let productType1 = document.getElementById("productType1");
    let productType2 = document.getElementById("productType2");
    let btnBrowseProduct = document.getElementById("btnBrowseProduct");
    let tanggalPembuatan = document.getElementById("tanggalPembuatan");
    // let designedBy = document.getElementById("designedBy");
    let keterangan = document.getElementById("keterangan");
    let printingFront = document.getElementById("printingFront");
    let printingTopPatch = document.getElementById("printingTopPatch");
    let printingBack = document.getElementById("printingBack");
    let printingBottomPatch = document.getElementById("printingBottomPatch");
    let valveSeal = document.getElementById("valveSeal");
    let valveLength = document.getElementById("valveLength");
    let sizeW1 = document.getElementById("sizeW1");
    let sizeH1 = document.getElementById("sizeH1");
    let sizeBB1 = document.getElementById("sizeBB1");
    let meshWA = document.getElementById("meshWA");
    let meshWE = document.getElementById("meshWE");
    let yarnWidth = document.getElementById("yarnWidth");
    let denier = document.getElementById("denier");
    let colour = document.getElementById("colour");
    let lamination = document.getElementById("lamination");
    let OPP = document.getElementById("OPP");
    let kertas = document.getElementById("kertas");
    let inner = document.getElementById("inner");
    let spoonbond = document.getElementById("spoonbond");
    let airPermeability = document.getElementById("airPermeability");
    let tinggiBagBerdiri = document.getElementById("tinggiBagBerdiri");
    let gambarInputW = document.getElementById("gambarInputW");
    let gambarInputH = document.getElementById("gambarInputH");
    let gambarInputVS = document.getElementById("gambarInputVS");
    let gambarInputVL = document.getElementById("gambarInputVL");
    let gambarInputBB = document.getElementById("gambarInputBB");
    let gambarInputBC = document.getElementById("gambarInputBC");
    let gambarInputFA = document.getElementById("gambarInputFA");
    let tableHitungan = document.getElementById("tableHitungan");
    let tableHitungan_StdWidth = document.getElementById("tableHitungan_StdWidth"); //prettier-ignore
    let tableHitungan_StdHeight = document.getElementById("tableHitungan_StdHeight"); //prettier-ignore
    let tableHitungan_StdTW = document.getElementById("tableHitungan_StdTW");
    let tableHitungan_StdTL = document.getElementById("tableHitungan_StdTL");
    let tableHitungan_StdBW = document.getElementById("tableHitungan_StdBW");
    let tableHitungan_StdBL = document.getElementById("tableHitungan_StdBL");
    let tableHitungan_StdVS = document.getElementById("tableHitungan_StdVS");
    let tableHitungan_StdVL = document.getElementById("tableHitungan_StdVL");
    let tableHitungan_StdBB = document.getElementById("tableHitungan_StdBB");
    let tableHitungan_StdBC = document.getElementById("tableHitungan_StdBC");
    let tableHitungan_StdTO = document.getElementById("tableHitungan_StdTO");
    let tableHitungan_StdBO = document.getElementById("tableHitungan_StdBO");
    let tableHitungan_S1 = document.getElementById("tableHitungan_S1");
    let tableHitungan_S2 = document.getElementById("tableHitungan_S2");
    let tableHitungan_yarn1 = document.getElementById("tableHitungan_yarn1");
    let tableHitungan_yarn2 = document.getElementById("tableHitungan_yarn2");
    let tableHitungan_WA1 = document.getElementById("tableHitungan_WA1");
    let tableHitungan_Denier1 = document.getElementById("tableHitungan_Denier1"); //prettier-ignore
    let tableHitungan_C1 = document.getElementById("tableHitungan_C1");
    let tableHitungan_CW1 = document.getElementById("tableHitungan_CW1");
    let tableHitungan_OPP1 = document.getElementById("tableHitungan_OPP1");
    let tableHitungan_LW1 = document.getElementById("tableHitungan_LW1");
    let tableHitungan_ST1 = document.getElementById("tableHitungan_ST1");
    let tableHitungan_WE1 = document.getElementById("tableHitungan_WE1");
    let tableHitungan_Denier2 = document.getElementById("tableHitungan_Denier2"); //prettier-ignore
    let tableHitungan_C2 = document.getElementById("tableHitungan_C2");
    let tableHitungan_S3 = document.getElementById("tableHitungan_S3");
    let tableHitungan_S4 = document.getElementById("tableHitungan_S4");
    let tableHitungan_yarn3 = document.getElementById("tableHitungan_yarn3");
    let tableHitungan_yarn4 = document.getElementById("tableHitungan_yarn4");
    let tableHitungan_WA2 = document.getElementById("tableHitungan_WA2");
    let tableHitungan_Denier3 = document.getElementById("tableHitungan_Denier3"); //prettier-ignore
    let tableHitungan_C3 = document.getElementById("tableHitungan_C3");
    let tableHitungan_CW2 = document.getElementById("tableHitungan_CW2");
    let tableHitungan_OPP2 = document.getElementById("tableHitungan_OPP2");
    let tableHitungan_LW2 = document.getElementById("tableHitungan_LW2");
    let tableHitungan_ST2 = document.getElementById("tableHitungan_ST2");
    let tableHitungan_WE2 = document.getElementById("tableHitungan_WE2");
    let tableHitungan_Denier4 = document.getElementById("tableHitungan_Denier4"); //prettier-ignore
    let tableHitungan_C4 = document.getElementById("tableHitungan_C4");
    let tableHitungan_S5 = document.getElementById("tableHitungan_S5");
    let tableHitungan_S6 = document.getElementById("tableHitungan_S6");
    let tableHitungan_yarn5 = document.getElementById("tableHitungan_yarn5");
    let tableHitungan_yarn6 = document.getElementById("tableHitungan_yarn6");
    let tableHitungan_WA3 = document.getElementById("tableHitungan_WA3");
    let tableHitungan_Denier5 = document.getElementById("tableHitungan_Denier5"); //prettier-ignore
    let tableHitungan_C5 = document.getElementById("tableHitungan_C5");
    let tableHitungan_CW3 = document.getElementById("tableHitungan_CW3");
    let tableHitungan_OPP3 = document.getElementById("tableHitungan_OPP3");
    let tableHitungan_LW3 = document.getElementById("tableHitungan_LW3");
    let tableHitungan_ST3 = document.getElementById("tableHitungan_ST3");
    let tableHitungan_WE3 = document.getElementById("tableHitungan_WE3");
    let tableHitungan_Denier6 = document.getElementById("tableHitungan_Denier6"); //prettier-ignore
    let tableHitungan_C6 = document.getElementById("tableHitungan_C6");
    let tableHitungan_S7 = document.getElementById("tableHitungan_S7");
    let tableHitungan_S8 = document.getElementById("tableHitungan_S8");
    let tableHitungan_yarn7 = document.getElementById("tableHitungan_yarn7");
    let tableHitungan_yarn8 = document.getElementById("tableHitungan_yarn8");
    let tableHitungan_WA4 = document.getElementById("tableHitungan_WA4");
    let tableHitungan_Denier7 = document.getElementById("tableHitungan_Denier7"); //prettier-ignore
    let tableHitungan_C7 = document.getElementById("tableHitungan_C7");
    let tableHitungan_CW4 = document.getElementById("tableHitungan_CW4");
    let tableHitungan_OPP4 = document.getElementById("tableHitungan_OPP4");
    let tableHitungan_LW4 = document.getElementById("tableHitungan_LW4");
    let tableHitungan_ST4 = document.getElementById("tableHitungan_ST4");
    let tableHitungan_WE4 = document.getElementById("tableHitungan_WE4");
    let tableHitungan_Denier8 = document.getElementById("tableHitungan_Denier8"); //prettier-ignore
    let tableHitungan_C8 = document.getElementById("tableHitungan_C8");
    let tableHitungan_S9 = document.getElementById("tableHitungan_S9");
    let tableHitungan_S10 = document.getElementById("tableHitungan_S10");
    let tableHitungan_ST5 = document.getElementById("tableHitungan_ST5");
    let tableHitungan_S11 = document.getElementById("tableHitungan_S11");
    let tableHitungan_S12 = document.getElementById("tableHitungan_S12");
    let tableHitungan_ST6 = document.getElementById("tableHitungan_ST6");
    let tableHitungan_S13 = document.getElementById("tableHitungan_S13");
    let tableHitungan_S14 = document.getElementById("tableHitungan_S14");
    let tableHitungan_ST7 = document.getElementById("tableHitungan_ST7");
    let tableHitungan_CWTotal = document.getElementById("tableHitungan_CWTotal"); //prettier-ignore
    let tableHitungan_OPPTotal = document.getElementById("tableHitungan_OPPTotal"); //prettier-ignore
    let tableHitungan_LWTotal = document.getElementById("tableHitungan_LWTotal"); //prettier-ignore
    let tableHitungan_STTotal = document.getElementById("tableHitungan_STTotal"); //prettier-ignore
    let addButton = document.getElementById("addButton");
    let saveButton = document.getElementById("saveButton");
    let updateButton = document.getElementById("updateButton");
    let cancelButton = document.getElementById("cancelButton");
    let deleteButton = document.getElementById("deleteButton");
    let mode = "";
    //#endregion

    //#region Load Form
    addButton.focus();
    tanggalPembuatan.valueAsDate = new Date();
    productType1.value = "STR";
    // designedBy.value = nomorUser.value.trim();
    printingFront.value = "NONE";
    printingBack.value = "NONE";
    printingTopPatch.value = "NONE";
    printingBottomPatch.value = "NONE";
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

    function roundBankers(num) {
        const floor = Math.floor(num);
        const diff = num - floor;

        if (diff < 0.5) return floor;
        if (diff > 0.5) return Math.ceil(num);

        // exactly .5
        return floor % 2 === 0 ? floor : floor + 1;
    }

    function clearAllInputs() {
        const container = document.querySelector(".card-body");

        // Clear all text inputs & textarea
        container.querySelectorAll("input, textarea").forEach((el) => {
            if (el.type === "radio" || el.type === "checkbox") {
                if (el.id == "productAdstar") {
                    el.checked = false;
                } else if (el.id == "productStarpak") {
                    el.checked = true;
                }
            } else if (el.type === "date") {
                el.valueAsDate = new Date();
            } else if (el.type !== "button" && el.type !== "submit") {
                if (el.id == "productType1") {
                    el.value = "STR";
                } else if (
                    el.id == "printingFront" ||
                    el.id == "printingBack" ||
                    el.id == "printingTopPatch" ||
                    el.id == "printingBottomPatch"
                ) {
                    el.value = "NONE";
                }
                // else if (el.id == "designedBy") {
                //     el.value = nomorUser.value.trim();
                // }
                else {
                    el.value = "";
                }
            }
        });

        // Clear all table text (td that contains numbers like "0")
        container.querySelectorAll("td").forEach((td) => {
            if (!td.querySelector("input") && td.id) {
                td.textContent = "0";
            }
        });
    }

    function setInputsState(container, enabled) {
        container.querySelectorAll("input, textarea, button").forEach((el) => {
            // Skip buttons that control mode
            if (
                el.id === "addButton" ||
                el.id === "updateButton" ||
                el.id === "deleteButton" ||
                el.id === "saveButton" ||
                el.id === "cancelButton"
            ) {
                return;
            }

            if (el.classList.contains("readonly-field")) {
                el.disabled = !enabled;
                el.readOnly = true;
                return;
            }
            el.disabled = !enabled;
        });
    }

    function setButtonVisibility(config) {
        document.getElementById("addButton").style.display = config.add
            ? "inline-block"
            : "none";
        document.getElementById("updateButton").style.display = config.update
            ? "inline-block"
            : "none";
        document.getElementById("deleteButton").style.display = config.delete
            ? "inline-block"
            : "none";
        document.getElementById("saveButton").style.display = config.process
            ? "inline-block"
            : "none";
        document.getElementById("cancelButton").style.display = config.cancel
            ? "inline-block"
            : "none";
    }

    function enableInputs(jenisInput) {
        const container = document.querySelector(".card-body");
        if (jenisInput === "Add") {
            gambarInputW.disabled = false;
            gambarInputW.value = 0;
            btnBrowseCustomer.disabled = false;
            btnJenisBag.disabled = false;
            productStarpak.disabled = false;
            productAdstar.disabled = false;
            setButtonVisibility({
                add: false,
                update: false,
                delete: false,
                process: true,
                cancel: true,
            });
        } else if (jenisInput === "Update") {
            setInputsState(container, true);

            setButtonVisibility({
                add: false,
                update: false,
                delete: false,
                process: true,
                cancel: true,
            });
        } else if (jenisInput === "Delete") {
            // Usually delete = no input editing
            setInputsState(container, true);

            setButtonVisibility({
                add: false,
                update: false,
                delete: false,
                process: true,
                cancel: true,
            });
        } else if (jenisInput === "Cancel") {
            setInputsState(container, false);

            setButtonVisibility({
                add: true,
                update: true,
                delete: true,
                process: false,
                cancel: false,
            });
        }
        return Promise.resolve();
    }

    function hitung() {
        let gambarHeight = numeral(gambarInputH.value).value();
        let gambarWidth = numeral(gambarInputW.value).value();
        let gambarBB = numeral(gambarInputBB.value).value();
        let gambarBC = numeral(gambarInputBC.value).value();
        let gambarVS = numeral(gambarInputVS.value).value();
        let gambarVL = numeral(gambarInputVL.value).value();

        if (gambarHeight > 0 && gambarBB > 0) {
            tinggiBagBerdiri.value = numeral(gambarHeight - gambarBB).format("0,0.00"); //prettier-ignore
        }

        if (gambarHeight > 0 && gambarWidth > 0 && gambarBB > 0) {
            if (productType2.value.includes("TB")) {
                tableHitungan_S1.value = gambarWidth * 2 + 4;
            } else {
                tableHitungan_StdWidth.innerHTML = gambarWidth;
                tableHitungan_S1.value = gambarWidth;
            }
            tableHitungan_StdHeight.innerHTML = gambarHeight;
            tableHitungan_StdTW.innerHTML = gambarBB - 0.5;
            if (valveSeal.value <= 0.5) {
                tableHitungan_StdTL.innerHTML = gambarWidth - gambarBB - 0.5;
            } else {
                tableHitungan_StdTL.innerHTML =
                    gambarWidth - gambarBB - 0.5 + valveSeal.value;
            }
            tableHitungan_StdBW.innerHTML = gambarBB - 0.5;
            tableHitungan_StdBL.innerHTML = gambarWidth - gambarBB - 0.5;
            tableHitungan_StdVS.innerHTML = numeral(gambarVS).value() ?? 0; //prettier-ignore
            tableHitungan_StdVL.innerHTML = numeral(gambarVL).value() ?? 0; //prettier-ignore
            tableHitungan_StdBB.innerHTML = gambarBB;
            tableHitungan_StdBC.innerHTML = gambarBC;
            tableHitungan_StdTO.innerHTML = 1;
            tableHitungan_StdBO.innerHTML = 1;
            tableHitungan_S2.value = gambarHeight + (gambarBB + gambarBC) / 2 + 2; //prettier-ignore
            tableHitungan_S3.value = numeral(tableHitungan_StdTW.innerHTML).value(); //prettier-ignore
            tableHitungan_S4.value = numeral(tableHitungan_StdTL.innerHTML).value(); //prettier-ignore
            tableHitungan_S5.value = numeral(tableHitungan_StdBW.innerHTML).value(); //prettier-ignore
            tableHitungan_S6.value = numeral(tableHitungan_StdBL.innerHTML).value(); //prettier-ignore
            tableHitungan_S7.value = gambarBB * 2 + 1.5; //prettier-ignore
            tableHitungan_S8.value = gambarVS + gambarVL; //prettier-ignore
            tableHitungan_yarn1.value = numeral(yarnWidth.value).value();
            tableHitungan_yarn2.value = numeral(yarnWidth.value).value();
            tableHitungan_yarn3.value = numeral(yarnWidth.value).value();
            tableHitungan_yarn4.value = numeral(yarnWidth.value).value();
            tableHitungan_yarn5.value = numeral(yarnWidth.value).value();
            tableHitungan_yarn6.value = numeral(yarnWidth.value).value();
            tableHitungan_yarn7.value = numeral(yarnWidth.value).value();
            tableHitungan_yarn8.value = numeral(yarnWidth.value).value();
            tableHitungan_WA1.value = numeral(meshWA.value).value();
            tableHitungan_WE1.value = numeral(meshWE.value).value();
            tableHitungan_WA2.value = numeral(meshWA.value).value();
            tableHitungan_WE2.value = numeral(meshWE.value).value();
            tableHitungan_WA3.value = numeral(meshWA.value).value();
            tableHitungan_WE3.value = numeral(meshWE.value).value();
            tableHitungan_WA4.value = numeral(meshWA.value).value();
            tableHitungan_WE4.value = numeral(meshWE.value).value();
            tableHitungan_Denier1.value = numeral(denier.value).value();
            tableHitungan_Denier2.value = numeral(denier.value).value();
            tableHitungan_Denier3.value = numeral(denier.value).value();
            tableHitungan_Denier4.value = numeral(denier.value).value();
            tableHitungan_Denier5.value = numeral(denier.value).value();
            tableHitungan_Denier6.value = numeral(denier.value).value();
            tableHitungan_Denier7.value = numeral(denier.value).value();
            tableHitungan_Denier8.value = numeral(denier.value).value();
            tableHitungan_C1.value = colour.value;
            tableHitungan_C2.value = colour.value;
            tableHitungan_C3.value = colour.value;
            tableHitungan_C4.value = colour.value;
            tableHitungan_C5.value = colour.value;
            tableHitungan_C6.value = colour.value;
            tableHitungan_C7.value = colour.value;
            tableHitungan_C8.value = colour.value;

            let S1 = numeral(tableHitungan_S1.value).value();
            let S2 = numeral(tableHitungan_S2.value).value();
            let WA1 = numeral(tableHitungan_WA1.value).value();
            let WE1 = numeral(tableHitungan_WE1.value).value();
            let D1 = numeral(tableHitungan_Denier1.value).value();
            let D2 = numeral(tableHitungan_Denier2.value).value();
            let lami = numeral(lamination.value).value();
            let OPPValue = numeral(OPP.value).value();
            let kertasValue = numeral(kertas.value).value();
            let innerValue = numeral(inner.value).value();
            let spoonbondValue = numeral(spoonbond.value).value();

            tableHitungan_CW1.innerHTML = numeral((S1 * S2 * ((WA1 + WE1) * ((D1 + D2) / 2))) / 1143000).format("0,0.00"); //prettier-ignore

            if (productType2.value.includes("TB")) {
                tableHitungan_CW1.innerHTML = numeral(numeral(tableHitungan_CW1.innerHTML).value() / 2).format("0,0.00"); //prettier-ignore
                tableHitungan_LW1.innerHTML = numeral((S1 * S2 * lami * 0.92) / 10000).format("0,0.00"); //prettier-ignore
                tableHitungan_OPP1.innerHTML = numeral(((S1 - 3.5) * S2 * OPPValue * 0.92) / 10000).format("0,0.00"); //prettier-ignore
            } else {
                tableHitungan_LW1.innerHTML = numeral(((S1 + 1) * S2 * lami * 0.184) / 1000).format("0,0.00"); //prettier-ignore
                if (productType2.value.includes("O-")) {
                    tableHitungan_OPP1.innerHTML = numeral((S1 + 1) * S2 * 0.92 * 2 / 1000).format("0,0.00");
                } else {
                    tableHitungan_OPP1.innerHTML = numeral((S1 - 3.5) * S2 * OPPValue * 0.184 / 1000).format("0,0.00"); //prettier-ignore
                }
            }

            let S3 = numeral(tableHitungan_S3.value).value();
            let S4 = numeral(tableHitungan_S4.value).value();
            let WA2 = numeral(tableHitungan_WA2.value).value();
            let WE2 = numeral(tableHitungan_WE2.value).value();
            let D3 = numeral(tableHitungan_Denier3.value).value();
            let D4 = numeral(tableHitungan_Denier4.value).value();

            tableHitungan_CW2.innerHTML = numeral((((S3 * S4 / 2) * (WA2 + WE2)) * ((D3 + D4) / 2)) / 1143000).format("0,0.00"); //prettier-ignore
            tableHitungan_LW2.innerHTML = numeral(((S3 * S4 * lami * 0.092) / 1000) * 2).format("0,0.00"); //prettier-ignore
            tableHitungan_OPP2.innerHTML = numeral((S3 * S4 * OPPValue * 0.092) / 1000).format("0,0.00"); //prettier-ignore

            let S5 = numeral(tableHitungan_S5.value).value();
            let S6 = numeral(tableHitungan_S6.value).value();
            let WA3 = numeral(tableHitungan_WA3.value).value();
            let WE3 = numeral(tableHitungan_WE3.value).value();
            let D5 = numeral(tableHitungan_Denier5.value).value();
            let D6 = numeral(tableHitungan_Denier6.value).value();

            tableHitungan_CW3.innerHTML = numeral((((S5 * S6 / 2) * (WA3 + WE3)) * ((D5 + D6) / 2)) / 1143000).format("0,0.00"); //prettier-ignore
            tableHitungan_LW3.innerHTML = numeral(((S5 * S6 * lami * 0.092) / 1000) * 2).format("0,0.00"); //prettier-ignore
            tableHitungan_OPP3.innerHTML = numeral((S5 * S6 * OPPValue * 0.092) / 1000).format("0,0.00"); //prettier-ignore

            let S7 = numeral(tableHitungan_S7.value).value();
            let S8 = numeral(tableHitungan_S8.value).value();
            let WA4 = numeral(tableHitungan_WA4.value).value();
            let WE4 = numeral(tableHitungan_WE4.value).value();
            let D7 = numeral(tableHitungan_Denier7.value).value();
            let D8 = numeral(tableHitungan_Denier8.value).value();

            tableHitungan_CW4.innerHTML = numeral((((S7 * S8 / 2) * (WA4 + WE4)) * ((D7 + D8) / 2)) / 1143000).format("0,0.00"); //prettier-ignore
            // tableHitungan_CW4.innerHTML = numeral((S7 * S8 * ((WA4 + WE4) * ((D7 + D8) / 2))) / 1143000).format("0,0.00"); //prettier-ignore
            tableHitungan_LW4.innerHTML = numeral(((S7 * S8 * lami * 0.092) / 1000) * 2).format("0,0.00"); //prettier-ignore
            tableHitungan_OPP4.innerHTML = numeral(0).format("0,0.00"); //numeral((S5  * S6 * OPPValue * 0.092) / 1000).format("0,0.00"); //prettier-ignore

            let CW1 = numeral(tableHitungan_CW1.innerHTML).value();
            let CW2 = numeral(tableHitungan_CW2.innerHTML).value();
            let CW3 = numeral(tableHitungan_CW3.innerHTML).value();
            let CW4 = numeral(tableHitungan_CW4.innerHTML).value();
            tableHitungan_CWTotal.innerHTML = numeral(CW1 + CW2 + CW3 + CW4).format("0,0.00"); //prettier-ignore

            let LW1 = numeral(tableHitungan_LW1.innerHTML).value();
            let LW2 = numeral(tableHitungan_LW2.innerHTML).value();
            let LW3 = numeral(tableHitungan_LW3.innerHTML).value();
            let LW4 = numeral(tableHitungan_LW4.innerHTML).value();
            tableHitungan_LWTotal.innerHTML = numeral(LW1 + LW2 + LW3 + LW4).format("0,0.00"); //prettier-ignore

            let OPP1 = numeral(tableHitungan_OPP1.innerHTML).value();
            let OPP2 = numeral(tableHitungan_OPP2.innerHTML).value();
            let OPP3 = numeral(tableHitungan_OPP3.innerHTML).value();
            let OPP4 = numeral(tableHitungan_OPP4.innerHTML).value();
            tableHitungan_OPPTotal.innerHTML = numeral(OPP1 + OPP2 + OPP3 + OPP4).format("0,0.00"); //prettier-ignore

            tableHitungan_ST1.innerHTML = numeral(CW1 + LW1 + OPP1).format("0,0.00"); //prettier-ignore
            tableHitungan_ST2.innerHTML = numeral(CW2 + LW2 + OPP2).format("0,0.00"); //prettier-ignore
            tableHitungan_ST3.innerHTML = numeral(CW3 + LW3 + OPP3).format("0,0.00"); //prettier-ignore
            tableHitungan_ST4.innerHTML = numeral(CW4 + LW4 + OPP4).format("0,0.00"); //prettier-ignore

            let S9 = numeral(tableHitungan_S9.innerHTML).value();
            let S10 = numeral(tableHitungan_S10.innerHTML).value();
            let S11 = numeral(tableHitungan_S11.innerHTML).value();
            let S12 = numeral(tableHitungan_S12.innerHTML).value();
            let S13 = numeral(tableHitungan_S13.innerHTML).value();
            let S14 = numeral(tableHitungan_S14.innerHTML).value();
            // sub total kertas
            tableHitungan_ST5.innerHTML = numeral(((S9 * S10) / 10000) * kertasValue).format("0,0.00"); //prettier-ignore
            let constanta = 1.84;
            if (productType2.value.includes("TBOI")) {
                constanta = 0.92;
            }
            // sub total inner
            tableHitungan_ST6.innerHTML = numeral((S11 * S12 * innerValue * constanta) / 10000).format("0,0.00"); //prettier-ignore
            // sub total spoonbond
            tableHitungan_ST7.innerHTML = numeral(((S13 * S14) / 10000) * spoonbondValue).format("0,0.00"); //prettier-ignore
            let CWT = numeral(tableHitungan_CWTotal.innerHTML).value();
            let LWT = numeral(tableHitungan_LWTotal.innerHTML).value();
            let OPPT = numeral(tableHitungan_OPPTotal.innerHTML).value(); //prettier-ignore
            let subTotalKertas = numeral(tableHitungan_ST5.innerHTML).value(); //prettier-ignore
            let subTotalInner = numeral(tableHitungan_ST6.innerHTML).value(); //prettier-ignore
            let subTotalSpoonbond = numeral(tableHitungan_ST7.innerHTML).value(); //prettier-ignore
            tableHitungan_STTotal.innerHTML = numeral(CWT + LWT + OPPT + subTotalKertas + subTotalInner + subTotalSpoonbond).format("0,0.00"); //prettier-ignore
        }
    }

    function hitungWidthHeight() {
        let S1 = numeral(tableHitungan_S1.value).value();
        let S2 = numeral(tableHitungan_S2.value).value();
        let WA1 = numeral(tableHitungan_WA1.value).value();
        let WE1 = numeral(tableHitungan_WE1.value).value();
        let D1 = numeral(tableHitungan_Denier1.value).value();
        let D2 = numeral(tableHitungan_Denier2.value).value();
        let lami = numeral(lamination.value).value();
        let OPPValue = numeral(OPP.value).value();
        let kertasValue = numeral(kertas.value).value();
        let innerValue = numeral(inner.value).value();
        let spoonbondValue = numeral(spoonbond.value).value();
        tableHitungan_S1.value = S1;
        tableHitungan_S2.value = S2;
        tableHitungan_WA1.value = WA1;
        tableHitungan_WE1.value = WE1;
        tableHitungan_Denier1.value = D1;
        tableHitungan_Denier2.value = D2;
        lamination.value = lami;
        OPP.value = OPPValue;
        kertas.value = kertasValue;
        inner.value = innerValue;
        spoonbond.value = spoonbondValue;
        tableHitungan_CW1.innerHTML = numeral((S1 * S2 * ((WA1 + WE1) * ((D1 + D2) / 2))) / 1143000).format("0,0.00"); //prettier-ignore

        if (productType2.value.includes("TB")) {
            tableHitungan_CW1.innerHTML = numeral(tableHitungan_CW1.innerHTML).value() / 2; //prettier-ignore
            tableHitungan_LW1.innerHTML = numeral((S1 * S2 * lami * 0.92) / 10000).format("0,0.00"); //prettier-ignore
            tableHitungan_OPP1.innerHTML = numeral(((S1 - 3.5) * S2 * OPPValue * 0.92) / 10000).format("0,0.00"); //prettier-ignore
        } else {
            tableHitungan_LW1.innerHTML = numeral(((S1 + 1) * S2 * lami * 0.184) / 1000).format("0,0.00"); //prettier-ignore
            if (productType2.value.includes("O-")) {
                tableHitungan_OPP1.innerHTML = numeral((S1 + 1) * S2 * 0.92 * 2 / 1000).format("0,0.00");
            } else {
                tableHitungan_OPP1.innerHTML = numeral((S1 - 3.5) * S2 * OPPValue * 0.184 / 1000).format("0,0.00"); //prettier-ignore
            }
        }

        let CW1 = numeral(tableHitungan_CW1.innerHTML).value();
        let CW2 = numeral(tableHitungan_CW2.innerHTML).value();
        let CW3 = numeral(tableHitungan_CW3.innerHTML).value();
        let CW4 = numeral(tableHitungan_CW4.innerHTML).value();
        tableHitungan_CWTotal.innerHTML = numeral(CW1 + CW2 + CW3 + CW4).format("0,0.00"); //prettier-ignore

        let LW1 = numeral(tableHitungan_LW1.innerHTML).value();
        let LW2 = numeral(tableHitungan_LW2.innerHTML).value();
        let LW3 = numeral(tableHitungan_LW3.innerHTML).value();
        let LW4 = numeral(tableHitungan_LW4.innerHTML).value();
        tableHitungan_LWTotal.innerHTML = numeral(LW1 + LW2 + LW3 + LW4).format("0,0.00"); //prettier-ignore

        let OPP1 = numeral(tableHitungan_OPP1.innerHTML).value();
        let OPP2 = numeral(tableHitungan_OPP2.innerHTML).value();
        let OPP3 = numeral(tableHitungan_OPP3.innerHTML).value();
        let OPP4 = numeral(tableHitungan_OPP4.innerHTML).value();
        tableHitungan_OPPTotal.innerHTML = numeral(OPP1 + OPP2 + OPP3 + OPP4).format("0,0.00"); //prettier-ignore

        tableHitungan_ST1.innerHTML = numeral(CW1 + LW1 + OPP1).format("0,0.00"); //prettier-ignore

        let S9 = numeral(tableHitungan_S9.innerHTML).value();
        let S10 = numeral(tableHitungan_S10.innerHTML).value();
        let S11 = numeral(tableHitungan_S11.innerHTML).value();
        let S12 = numeral(tableHitungan_S12.innerHTML).value();
        let S13 = numeral(tableHitungan_S13.innerHTML).value();
        let S14 = numeral(tableHitungan_S14.innerHTML).value();
        // sub total kertas
        tableHitungan_ST5.innerHTML = numeral(((S9 * S10) / 10000) * kertasValue).format("0,0.00"); //prettier-ignore
        let constanta = 1.84;
        if (productType2.value.includes("TBOI")) {
            constanta = 0.92;
        }
        // sub total inner
        tableHitungan_ST6.innerHTML = numeral((S11 * S12 * innerValue * constanta) / 10000).format("0,0.00"); //prettier-ignore
        // sub total spoonbond
        tableHitungan_ST7.innerHTML = numeral(((S13 * S14) / 10000) * spoonbondValue).format("0,0.00"); //prettier-ignore
        let CWT = numeral(tableHitungan_CWTotal.innerHTML).value();
        let LWT = numeral(tableHitungan_LWTotal.innerHTML).value();
        let OPPT = numeral(tableHitungan_OPPTotal.innerHTML).value(); //prettier-ignore
        let subTotalKertas = numeral(tableHitungan_ST5.innerHTML).value(); //prettier-ignore
        let subTotalInner = numeral(tableHitungan_ST6.innerHTML).value(); //prettier-ignore
        let subTotalSpoonbond = numeral(tableHitungan_ST7.innerHTML).value(); //prettier-ignore
        tableHitungan_STTotal.innerHTML = numeral(CWT + LWT + OPPT + subTotalKertas + subTotalInner + subTotalSpoonbond).format("0,0.00"); //prettier-ignore
    }

    function hitungTopWidthLength() {
        let S3 = numeral(tableHitungan_S3.value).value();
        let S4 = numeral(tableHitungan_S4.value).value();
        let WA2 = numeral(tableHitungan_WA2.value).value();
        let WE2 = numeral(tableHitungan_WE2.value).value();
        let D3 = numeral(tableHitungan_Denier3.value).value();
        let D4 = numeral(tableHitungan_Denier4.value).value();
        let lami = numeral(lamination.value).value();
        let OPPValue = numeral(OPP.value).value();
        let kertasValue = numeral(kertas.value).value();
        let innerValue = numeral(inner.value).value();
        let spoonbondValue = numeral(spoonbond.value).value();

        tableHitungan_CW2.innerHTML = numeral((((S3 * S4 / 2) * (WA2 + WE2)) * ((D3 + D4) / 2)) / 1143000).format("0,0.00"); //prettier-ignore
        tableHitungan_LW2.innerHTML = numeral(((S3 * S4 * lami * 0.092) / 1000) * 2).format("0,0.00"); //prettier-ignore
        tableHitungan_OPP2.innerHTML = numeral((S3 * S4 * OPPValue * 0.092) / 1000).format("0,0.00"); //prettier-ignore
        let CW1 = numeral(tableHitungan_CW1.innerHTML).value();
        let CW2 = numeral(tableHitungan_CW2.innerHTML).value();
        let CW3 = numeral(tableHitungan_CW3.innerHTML).value();
        let CW4 = numeral(tableHitungan_CW4.innerHTML).value();
        tableHitungan_CWTotal.innerHTML = numeral(CW1 + CW2 + CW3 + CW4).format("0,0.00"); //prettier-ignore

        let LW1 = numeral(tableHitungan_LW1.innerHTML).value();
        let LW2 = numeral(tableHitungan_LW2.innerHTML).value();
        let LW3 = numeral(tableHitungan_LW3.innerHTML).value();
        let LW4 = numeral(tableHitungan_LW4.innerHTML).value();
        tableHitungan_LWTotal.innerHTML = numeral(LW1 + LW2 + LW3 + LW4).format("0,0.00"); //prettier-ignore

        let OPP1 = numeral(tableHitungan_OPP1.innerHTML).value();
        let OPP2 = numeral(tableHitungan_OPP2.innerHTML).value();
        let OPP3 = numeral(tableHitungan_OPP3.innerHTML).value();
        let OPP4 = numeral(tableHitungan_OPP4.innerHTML).value();
        tableHitungan_OPPTotal.innerHTML = numeral(OPP1 + OPP2 + OPP3 + OPP4).format("0,0.00"); //prettier-ignore

        tableHitungan_ST2.innerHTML = numeral(CW2 + LW2 + OPP2).format("0,0.00"); //prettier-ignore

        let S9 = numeral(tableHitungan_S9.innerHTML).value();
        let S10 = numeral(tableHitungan_S10.innerHTML).value();
        let S11 = numeral(tableHitungan_S11.innerHTML).value();
        let S12 = numeral(tableHitungan_S12.innerHTML).value();
        let S13 = numeral(tableHitungan_S13.innerHTML).value();
        let S14 = numeral(tableHitungan_S14.innerHTML).value();
        // sub total kertas
        tableHitungan_ST5.innerHTML = numeral(((S9 * S10) / 10000) * kertasValue).format("0,0.00"); //prettier-ignore
        let constanta = 1.84;
        if (productType2.value.includes("TBOI")) {
            constanta = 0.92;
        }
        // sub total inner
        tableHitungan_ST6.innerHTML = numeral((S11 * S12 * innerValue * constanta) / 10000).format("0,0.00"); //prettier-ignore
        // sub total spoonbond
        tableHitungan_ST7.innerHTML = numeral(((S13 * S14) / 10000) * spoonbondValue).format("0,0.00"); //prettier-ignore
        let CWT = numeral(tableHitungan_CWTotal.innerHTML).value();
        let LWT = numeral(tableHitungan_LWTotal.innerHTML).value();
        let OPPT = numeral(tableHitungan_OPPTotal.innerHTML).value(); //prettier-ignore
        let subTotalKertas = numeral(tableHitungan_ST5.innerHTML).value(); //prettier-ignore
        let subTotalInner = numeral(tableHitungan_ST6.innerHTML).value(); //prettier-ignore
        let subTotalSpoonbond = numeral(tableHitungan_ST7.innerHTML).value(); //prettier-ignore
        tableHitungan_STTotal.innerHTML = numeral(CWT + LWT + OPPT + subTotalKertas + subTotalInner + subTotalSpoonbond).format("0,0.00"); //prettier-ignore
    }

    function hitungBottomWidthLength() {
        let S5 = numeral(tableHitungan_S5.value).value();
        let S6 = numeral(tableHitungan_S6.value).value();
        let WA3 = numeral(tableHitungan_WA3.value).value();
        let WE3 = numeral(tableHitungan_WE3.value).value();
        let D5 = numeral(tableHitungan_Denier5.value).value();
        let D6 = numeral(tableHitungan_Denier6.value).value();
        let lami = numeral(lamination.value).value();
        let OPPValue = numeral(OPP.value).value();
        let kertasValue = numeral(kertas.value).value();
        let innerValue = numeral(inner.value).value();
        let spoonbondValue = numeral(spoonbond.value).value();

        tableHitungan_CW3.innerHTML = numeral((((S5 * S6 / 2) * (WA3 + WE3)) * ((D5 + D6) / 2)) / 1143000).format("0,0.00"); //prettier-ignore
        tableHitungan_LW3.innerHTML = numeral(((S5 * S6 * lami * 0.092) / 1000) * 2).format("0,0.00"); //prettier-ignore
        tableHitungan_OPP3.innerHTML = numeral((S5 * S6 * OPPValue * 0.092) / 1000).format("0,0.00"); //prettier-ignore
        let CW1 = numeral(tableHitungan_CW1.innerHTML).value();
        let CW2 = numeral(tableHitungan_CW2.innerHTML).value();
        let CW3 = numeral(tableHitungan_CW3.innerHTML).value();
        let CW4 = numeral(tableHitungan_CW4.innerHTML).value();
        tableHitungan_CWTotal.innerHTML = numeral(CW1 + CW2 + CW3 + CW4).format("0,0.00"); //prettier-ignore

        let LW1 = numeral(tableHitungan_LW1.innerHTML).value();
        let LW2 = numeral(tableHitungan_LW2.innerHTML).value();
        let LW3 = numeral(tableHitungan_LW3.innerHTML).value();
        let LW4 = numeral(tableHitungan_LW4.innerHTML).value();
        tableHitungan_LWTotal.innerHTML = numeral(LW1 + LW2 + LW3 + LW4).format("0,0.00"); //prettier-ignore

        let OPP1 = numeral(tableHitungan_OPP1.innerHTML).value();
        let OPP2 = numeral(tableHitungan_OPP2.innerHTML).value();
        let OPP3 = numeral(tableHitungan_OPP3.innerHTML).value();
        let OPP4 = numeral(tableHitungan_OPP4.innerHTML).value();
        tableHitungan_OPPTotal.innerHTML = numeral(OPP1 + OPP2 + OPP3 + OPP4).format("0,0.00"); //prettier-ignore

        tableHitungan_ST3.innerHTML = numeral(CW3 + LW3 + OPP3).format("0,0.00"); //prettier-ignore

        let S9 = numeral(tableHitungan_S9.innerHTML).value();
        let S10 = numeral(tableHitungan_S10.innerHTML).value();
        let S11 = numeral(tableHitungan_S11.innerHTML).value();
        let S12 = numeral(tableHitungan_S12.innerHTML).value();
        let S13 = numeral(tableHitungan_S13.innerHTML).value();
        let S14 = numeral(tableHitungan_S14.innerHTML).value();
        // sub total kertas
        tableHitungan_ST5.innerHTML = numeral(((S9 * S10) / 10000) * kertasValue).format("0,0.00"); //prettier-ignore
        let constanta = 1.84;
        if (productType2.value.includes("TBOI")) {
            constanta = 0.92;
        }
        // sub total inner
        tableHitungan_ST6.innerHTML = numeral((S11 * S12 * innerValue * constanta) / 10000).format("0,0.00"); //prettier-ignore
        // sub total spoonbond
        tableHitungan_ST7.innerHTML = numeral(((S13 * S14) / 10000) * spoonbondValue).format("0,0.00"); //prettier-ignore
        let CWT = numeral(tableHitungan_CWTotal.innerHTML).value();
        let LWT = numeral(tableHitungan_LWTotal.innerHTML).value();
        let OPPT = numeral(tableHitungan_OPPTotal.innerHTML).value(); //prettier-ignore
        let subTotalKertas = numeral(tableHitungan_ST5.innerHTML).value(); //prettier-ignore
        let subTotalInner = numeral(tableHitungan_ST6.innerHTML).value(); //prettier-ignore
        let subTotalSpoonbond = numeral(tableHitungan_ST7.innerHTML).value(); //prettier-ignore
        tableHitungan_STTotal.innerHTML = numeral(CWT + LWT + OPPT + subTotalKertas + subTotalInner + subTotalSpoonbond).format("0,0.00"); //prettier-ignore
    }

    function hitungValveSealLength() {
        let S7 = numeral(tableHitungan_S7.value).value();
        let S8 = numeral(tableHitungan_S8.value).value();
        let WA4 = numeral(tableHitungan_WA4.value).value();
        let WE4 = numeral(tableHitungan_WE4.value).value();
        let D7 = numeral(tableHitungan_Denier7.value).value();
        let D8 = numeral(tableHitungan_Denier8.value).value();
        let lami = numeral(lamination.value).value();
        let OPPValue = numeral(OPP.value).value();
        let kertasValue = numeral(kertas.value).value();
        let innerValue = numeral(inner.value).value();
        let spoonbondValue = numeral(spoonbond.value).value();

        tableHitungan_CW4.innerHTML = numeral((((S7 * S8 / 2) * (WA4 + WE4)) * ((D7 + D8) / 2)) / 1143000).format("0,0.00"); //prettier-ignore
        tableHitungan_LW4.innerHTML = numeral(((S7 * S8 * lami * 0.092) / 1000) * 2).format("0,0.00"); //prettier-ignore
        tableHitungan_OPP4.innerHTML = numeral((S7 * S8 * OPPValue * 0.092) / 1000).format("0,0.00"); //prettier-ignore
        let CW1 = numeral(tableHitungan_CW1.innerHTML).value();
        let CW2 = numeral(tableHitungan_CW2.innerHTML).value();
        let CW3 = numeral(tableHitungan_CW3.innerHTML).value();
        let CW4 = numeral(tableHitungan_CW4.innerHTML).value();
        tableHitungan_CWTotal.innerHTML = numeral(CW1 + CW2 + CW3 + CW4).format("0,0.00"); //prettier-ignore

        let LW1 = numeral(tableHitungan_LW1.innerHTML).value();
        let LW2 = numeral(tableHitungan_LW2.innerHTML).value();
        let LW3 = numeral(tableHitungan_LW3.innerHTML).value();
        let LW4 = numeral(tableHitungan_LW4.innerHTML).value();
        tableHitungan_LWTotal.innerHTML = numeral(LW1 + LW2 + LW3 + LW4).format("0,0.00"); //prettier-ignore

        let OPP1 = numeral(tableHitungan_OPP1.innerHTML).value();
        let OPP2 = numeral(tableHitungan_OPP2.innerHTML).value();
        let OPP3 = numeral(tableHitungan_OPP3.innerHTML).value();
        let OPP4 = numeral(tableHitungan_OPP4.innerHTML).value();
        tableHitungan_OPPTotal.innerHTML = numeral(OPP1 + OPP2 + OPP3 + OPP4).format("0,0.00"); //prettier-ignore

        tableHitungan_ST2.innerHTML = numeral(CW2 + LW2 + OPP2).format("0,0.00"); //prettier-ignore

        let S9 = numeral(tableHitungan_S9.innerHTML).value();
        let S10 = numeral(tableHitungan_S10.innerHTML).value();
        let S11 = numeral(tableHitungan_S11.innerHTML).value();
        let S12 = numeral(tableHitungan_S12.innerHTML).value();
        let S13 = numeral(tableHitungan_S13.innerHTML).value();
        let S14 = numeral(tableHitungan_S14.innerHTML).value();
        // sub total kertas
        tableHitungan_ST5.innerHTML = numeral(((S9 * S10) / 10000) * kertasValue).format("0,0.00"); //prettier-ignore
        let constanta = 1.84;
        if (productType2.value.includes("TBOI")) {
            constanta = 0.92;
        }
        // sub total inner
        tableHitungan_ST6.innerHTML = numeral((S11 * S12 * innerValue * constanta) / 10000).format("0,0.00"); //prettier-ignore
        // sub total spoonbond
        tableHitungan_ST7.innerHTML = numeral(((S13 * S14) / 10000) * spoonbondValue).format("0,0.00"); //prettier-ignore
        let CWT = numeral(tableHitungan_CWTotal.innerHTML).value();
        let LWT = numeral(tableHitungan_LWTotal.innerHTML).value();
        let OPPT = numeral(tableHitungan_OPPTotal.innerHTML).value(); //prettier-ignore
        let subTotalKertas = numeral(tableHitungan_ST5.innerHTML).value(); //prettier-ignore
        let subTotalInner = numeral(tableHitungan_ST6.innerHTML).value(); //prettier-ignore
        let subTotalSpoonbond = numeral(tableHitungan_ST7.innerHTML).value(); //prettier-ignore
        tableHitungan_STTotal.innerHTML = numeral(CWT + LWT + OPPT + subTotalKertas + subTotalInner + subTotalSpoonbond).format("0,0.00"); //prettier-ignore
    }

    function hitungKertas() {
        let S9 = numeral(tableHitungan_S9.value ?? 0).value();
        let S10 = numeral(tableHitungan_S10.value ?? 0).value();
        let kertasValue = numeral(kertas.value).value();

        tableHitungan_ST5.innerHTML = numeral(((S9 * S10) / 10000) * kertasValue).format("0,0.00"); //prettier-ignore

        tableHitungan_S9.value = S9;
        tableHitungan_S10.value = S10;
        let CWT = numeral(tableHitungan_CWTotal.innerHTML).value();
        let LWT = numeral(tableHitungan_LWTotal.innerHTML).value();
        let OPPT = numeral(tableHitungan_OPPTotal.innerHTML).value(); //prettier-ignore
        let subTotalKertas = numeral(tableHitungan_ST5.innerHTML).value(); //prettier-ignore
        let subTotalInner = numeral(tableHitungan_ST6.innerHTML).value(); //prettier-ignore
        let subTotalSpoonbond = numeral(tableHitungan_ST7.innerHTML).value(); //prettier-ignore
        tableHitungan_STTotal.innerHTML = numeral(CWT + LWT + OPPT + subTotalKertas + subTotalInner + subTotalSpoonbond).format("0,0.00"); //prettier-ignore
    }

    function hitungInner() {
        let S11 = numeral(tableHitungan_S11.value ?? 0).value();
        let S12 = numeral(tableHitungan_S12.value ?? 0).value();
        let innerValue = numeral(inner.value).value();
        let productTypeUppercase = productType2.value.toUpperCase();

        if (productTypeUppercase.includes("TBOI")) {
            tableHitungan_ST6.innerHTML = numeral((S11 * S12 * innerValue * 0.92) / 10000).format("0,0.00"); //prettier-ignore
        } else if (
            (productTypeUppercase.includes("TBO") && S11 > 0) ||
            (productTypeUppercase.includes("TBO") && S12 > 0)
        ) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan",
                text: "Terdeteksi tipe produk TBO!",
                returnFocus: false,
            });
        } else if (productTypeUppercase.includes("TBI")) {
            tableHitungan_ST6.innerHTML = numeral((S11 * S12 * innerValue * 1.84) / 10000).format("0,0.00"); //prettier-ignore
        }
        console.log(S11, S12, innerValue);
        tableHitungan_S11.value = S11;
        tableHitungan_S12.value = S12;
        let CWT = numeral(tableHitungan_CWTotal.innerHTML).value();
        let LWT = numeral(tableHitungan_LWTotal.innerHTML).value();
        let OPPT = numeral(tableHitungan_OPPTotal.innerHTML).value(); //prettier-ignore
        let subTotalKertas = numeral(tableHitungan_ST5.innerHTML).value(); //prettier-ignore
        let subTotalInner = numeral(tableHitungan_ST6.innerHTML).value(); //prettier-ignore
        let subTotalSpoonbond = numeral(tableHitungan_ST7.innerHTML).value(); //prettier-ignore
        tableHitungan_STTotal.innerHTML = numeral(CWT + LWT + OPPT + subTotalKertas + subTotalInner + subTotalSpoonbond).format("0,0.00"); //prettier-ignore
    }

    function hitungSpoonBond() {
        let S13 = numeral(tableHitungan_S13.value ?? 0).value();
        let S14 = numeral(tableHitungan_S14.value ?? 0).value();
        let spoonbondValue = numeral(spoonbond.value).value();

        tableHitungan_ST7.innerHTML = numeral(((S13 * S14) / 10000) * spoonbondValue).format("0,0.00"); //prettier-ignore

        tableHitungan_S13.value = S13;
        tableHitungan_S14.value = S14;
        let CWT = numeral(tableHitungan_CWTotal.innerHTML).value();
        let LWT = numeral(tableHitungan_LWTotal.innerHTML).value();
        let OPPT = numeral(tableHitungan_OPPTotal.innerHTML).value(); //prettier-ignore
        let subTotalKertas = numeral(tableHitungan_ST5.innerHTML).value(); //prettier-ignore
        let subTotalInner = numeral(tableHitungan_ST6.innerHTML).value(); //prettier-ignore
        let subTotalSpoonbond = numeral(tableHitungan_ST7.innerHTML).value(); //prettier-ignore
        tableHitungan_STTotal.innerHTML = numeral(CWT + LWT + OPPT + subTotalKertas + subTotalInner + subTotalSpoonbond).format("0,0.00"); //prettier-ignore
    }

    function saveData() {
        $.ajax({
            url: "AdStarCloseTop",
            type: "POST",
            dataType: "json",
            data: {
                _token: csrfToken,
                jenisStore: mode,
                idProduct: idProduct.value,
                idCustomer: idCustomer.value,
                namaCustomer: namaCustomer.value,
                typeProduct: productStarpak.checked ? 1 : 2,
                namaBarang: productType1.value + "-" + productType2.value,
                tanggalPembuatan: tanggalPembuatan.value,
                //designedBy: designedBy.value, //dihilangkan karena otomatis diisi dengan session user yang login
                keterangan: keterangan.value,
                gambarWidth: numeral(gambarInputW.value).value(), //prettier-ignore
                gambarHeight: numeral(gambarInputH.value).value(), //prettier-ignore
                gambarBB: numeral(gambarInputBB.value).value(), //prettier-ignore
                gambarBC: numeral(gambarInputBC.value).value(), //prettier-ignore
                gambarVS: numeral(gambarInputVS.value).value(), //prettier-ignore
                gambarVL: numeral(gambarInputVL.value).value(), //prettier-ignore
                gambarFA: gambarInputFA.value,
                valveSeal: numeral(valveSeal.value).value(), //prettier-ignore
                valveLength: numeral(valveLength.value).value(), //prettier-ignore
                meshWA: numeral(meshWA.value).value(), //prettier-ignore
                meshWE: numeral(meshWE.value).value(), //prettier-ignore
                yarnWidth: numeral(yarnWidth.value).value(), //prettier-ignore
                denier: numeral(denier.value).value(), //prettier-ignore
                colour: colour.value,
                lamination: numeral(lamination.value).value(), //prettier-ignore
                OPP: numeral(OPP.value).value(), //prettier-ignore
                kertas: numeral(kertas.value).value(), //prettier-ignore
                inner: numeral(inner.value).value(), //prettier-ignore
                spoonbond: numeral(spoonbond.value).value(), //prettier-ignore
                printingFront: printingFront.value,
                printingBack: printingBack.value,
                printingTopPatch: printingTopPatch.value,
                printingBottomPatch: printingBottomPatch.value,
                airPermeability: numeral(airPermeability.value).value(), //prettier-ignore
                tinggiBagBerdiri: numeral(tinggiBagBerdiri.value).value(), //prettier-ignore
                tableHitungan_StdTW: numeral(tableHitungan_StdTW.innerHTML).value(), //prettier-ignore
                tableHitungan_StdTL: numeral(tableHitungan_StdTL.innerHTML).value(), //prettier-ignore
                tableHitungan_StdBW: numeral(tableHitungan_StdBW.innerHTML).value(), //prettier-ignore
                tableHitungan_StdBL: numeral(tableHitungan_StdBL.innerHTML).value(), //prettier-ignore
                tableHitungan_StdTO: numeral(tableHitungan_StdTO.innerHTML).value(), //prettier-ignore
                tableHitungan_StdBO: numeral(tableHitungan_StdBO.innerHTML).value(), //prettier-ignore
                tableHitungan_S1: numeral(tableHitungan_S1.value).value(), //prettier-ignore
                tableHitungan_S2: numeral(tableHitungan_S2.value).value(), //prettier-ignore
                tableHitungan_S3: numeral(tableHitungan_S3.value).value(), //prettier-ignore
                tableHitungan_S4: numeral(tableHitungan_S4.value).value(), //prettier-ignore
                tableHitungan_S5: numeral(tableHitungan_S5.value).value(), //prettier-ignore
                tableHitungan_S6: numeral(tableHitungan_S6.value).value(), //prettier-ignore
                tableHitungan_S7: numeral(tableHitungan_S7.value).value(), //prettier-ignore
                tableHitungan_S8: numeral(tableHitungan_S8.value).value(), //prettier-ignore
                tableHitungan_yarn1: numeral(tableHitungan_yarn1.value).value(), //prettier-ignore
                tableHitungan_yarn2: numeral(tableHitungan_yarn2.value).value(), //prettier-ignore
                tableHitungan_yarn3: numeral(tableHitungan_yarn3.value).value(), //prettier-ignore
                tableHitungan_yarn4: numeral(tableHitungan_yarn4.value).value(), //prettier-ignore
                tableHitungan_yarn5: numeral(tableHitungan_yarn5.value).value(), //prettier-ignore
                tableHitungan_yarn6: numeral(tableHitungan_yarn6.value).value(), //prettier-ignore
                tableHitungan_yarn7: numeral(tableHitungan_yarn7.value).value(), //prettier-ignore
                tableHitungan_yarn8: numeral(tableHitungan_yarn8.value).value(), //prettier-ignore
                tableHitungan_WA1: numeral(tableHitungan_WA1.value).value(), //prettier-ignore
                tableHitungan_WE1: numeral(tableHitungan_WE1.value).value(), //prettier-ignore
                tableHitungan_WA2: numeral(tableHitungan_WA2.value).value(), //prettier-ignore
                tableHitungan_WE2: numeral(tableHitungan_WE2.value).value(), //prettier-ignore
                tableHitungan_WA3: numeral(tableHitungan_WA3.value).value(), //prettier-ignore
                tableHitungan_WE3: numeral(tableHitungan_WE3.value).value(), //prettier-ignore
                tableHitungan_WA4: numeral(tableHitungan_WA4.value).value(), //prettier-ignore
                tableHitungan_WE4: numeral(tableHitungan_WE4.value).value(), //prettier-ignore
                tableHitungan_Denier1: numeral(tableHitungan_Denier1.value).value(), //prettier-ignore
                tableHitungan_Denier2: numeral(tableHitungan_Denier2.value).value(), //prettier-ignore
                tableHitungan_Denier3: numeral(tableHitungan_Denier3.value).value(), //prettier-ignore
                tableHitungan_Denier4: numeral(tableHitungan_Denier4.value).value(), //prettier-ignore
                tableHitungan_Denier5: numeral(tableHitungan_Denier5.value).value(), //prettier-ignore
                tableHitungan_Denier6: numeral(tableHitungan_Denier6.value).value(), //prettier-ignore
                tableHitungan_Denier7: numeral(tableHitungan_Denier7.value).value(), //prettier-ignore
                tableHitungan_Denier8: numeral(tableHitungan_Denier8.value).value(), //prettier-ignore
                tableHitungan_C1: tableHitungan_C1.value, //prettier-ignore
                tableHitungan_C2: tableHitungan_C2.value, //prettier-ignore
                tableHitungan_C3: tableHitungan_C3.value, //prettier-ignore
                tableHitungan_C4: tableHitungan_C4.value, //prettier-ignore
                tableHitungan_C5: tableHitungan_C5.value, //prettier-ignore
                tableHitungan_C6: tableHitungan_C6.value, //prettier-ignore
                tableHitungan_C7: tableHitungan_C7.value, //prettier-ignore
                tableHitungan_C8: tableHitungan_C8.value, //prettier-ignore
                tableHitungan_S9: numeral(tableHitungan_S9.value || 0).value(), //prettier-ignore
                tableHitungan_S10: numeral(tableHitungan_S10.value || 0).value(), //prettier-ignore
                tableHitungan_S11: numeral(tableHitungan_S11.value || 0).value(), //prettier-ignore
                tableHitungan_S12: numeral(tableHitungan_S12.value || 0).value(), //prettier-ignore
                tableHitungan_S13: numeral(tableHitungan_S13.value || 0).value(), //prettier-ignore
                tableHitungan_S14: numeral(tableHitungan_S14.value || 0).value(), //prettier-ignore
                tableHitungan_CW1: numeral(tableHitungan_CW1.innerHTML).value(), //prettier-ignore
                tableHitungan_CW2: numeral(tableHitungan_CW2.innerHTML).value(), //prettier-ignore
                tableHitungan_CW3: numeral(tableHitungan_CW3.innerHTML).value(), //prettier-ignore
                tableHitungan_CW4: numeral(tableHitungan_CW4.innerHTML).value(), //prettier-ignore
                tableHitungan_CWTotal: numeral(tableHitungan_CWTotal.innerHTML).value(), //prettier-ignore
                tableHitungan_LW1: numeral(tableHitungan_LW1.innerHTML).value(), //prettier-ignore
                tableHitungan_LW2: numeral(tableHitungan_LW2.innerHTML).value(), //prettier-ignore
                tableHitungan_LW3: numeral(tableHitungan_LW3.innerHTML).value(), //prettier-ignore
                tableHitungan_LW4: numeral(tableHitungan_LW4.innerHTML).value(), //prettier-ignore
                tableHitungan_LWTotal: numeral(tableHitungan_LWTotal.innerHTML).value(), //prettier-ignore
                tableHitungan_OPP1: numeral(tableHitungan_OPP1.innerHTML).value(), //prettier-ignore
                tableHitungan_OPP2: numeral(tableHitungan_OPP2.innerHTML).value(), //prettier-ignore
                tableHitungan_OPP3: numeral(tableHitungan_OPP3.innerHTML).value(), //prettier-ignore
                tableHitungan_OPP4: numeral(tableHitungan_OPP4.innerHTML).value(), //prettier-ignore
                tableHitungan_OPPTotal: numeral(tableHitungan_OPPTotal.innerHTML).value(), //prettier-ignore
                tableHitungan_ST1: numeral(tableHitungan_ST1.innerHTML).value(), //prettier-ignore
                tableHitungan_ST2: numeral(tableHitungan_ST2.innerHTML).value(), //prettier-ignore
                tableHitungan_ST3: numeral(tableHitungan_ST3.innerHTML).value(), //prettier-ignore
                tableHitungan_ST4: numeral(tableHitungan_ST4.innerHTML).value(), //prettier-ignore
                tableHitungan_ST5: numeral(tableHitungan_ST5.innerHTML).value(), //prettier-ignore
                tableHitungan_ST6: numeral(tableHitungan_ST6.innerHTML).value(), //prettier-ignore
                tableHitungan_ST7: numeral(tableHitungan_ST7.innerHTML).value(), //prettier-ignore
                tableHitungan_STTotal: numeral(tableHitungan_STTotal.innerHTML).value(), //prettier-ignore
            },
            success: function (response) {
                console.log(response);
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: response.success,
                    }).then(() => {
                        mode = "";
                        enableInputs("Cancel").then(() => {
                            addButton.focus();
                        });
                        clearAllInputs();
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            response.error ||
                            response.message ||
                            "An error occurred while saving data.",
                    });
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while fetching data.",
                });
            },
        });
    }

    function displayData(idp) {
        $.ajax({
            url: "AdStarCloseTop/getDataTabelHitungan",
            type: "GET",
            dataType: "json",
            data: {
                _token: csrfToken,
                idProduct: idp,
            },
            success: function (response) {
                console.log(response);
                if (response.data) {
                    const data = response.data[0];
                    tanggalPembuatan.value = moment(data.Tanggal).format("YYYY-MM-DD"); //prettier-ignore
                    keterangan.value = data.keterangan;
                    sizeW1.value = numeral(data.Width).value(); //prettier-ignore
                    sizeH1.value = numeral(data.Height).value(); //prettier-ignore
                    sizeBB1.value = numeral(data.BlockBottom).value(); //prettier-ignore
                    gambarInputW.value = numeral(data.Width).value(); //prettier-ignore
                    gambarInputH.value = numeral(data.Height).value(); //prettier-ignore
                    gambarInputBB.value = numeral(data.BlockBottom).value(); //prettier-ignore
                    gambarInputBC.value = numeral(data.BlockCover).value(); //prettier-ignore
                    gambarInputVS.value = numeral(data.ValveSeal).value(); //prettier-ignore
                    gambarInputVL.value = numeral(data.ValveLength).value(); //prettier-ignore
                    gambarInputFA.value = data.frontarea;
                    meshWA.value = numeral(data.Warp).value(); //prettier-ignore
                    meshWE.value = numeral(data.Weft).value(); //prettier-ignore
                    yarnWidth.value = numeral(data.Yarn).value(); //prettier-ignore
                    denier.value = numeral(data.Denier).value(); //prettier-ignore
                    colour.value = data.Colour.trim();
                    lamination.value = numeral(data.Lami).value(); //prettier-ignore
                    OPP.value = numeral(data.OPP).value(); //prettier-ignore
                    kertas.value = numeral(data.Kertas).value(); //prettier-ignore
                    inner.value = numeral(data.Inner).value(); //prettier-ignore
                    spoonbond.value = numeral(data.spoonbond).value(); //prettier-ignore
                    printingFront.value = data.PrintFront;
                    printingBack.value = data.PrintBack;
                    printingTopPatch.value = data.PrintTop;
                    printingBottomPatch.value = data.PrintBottom;
                    airPermeability.value = numeral(data.Air).value(); //prettier-ignore
                    tinggiBagBerdiri.value = numeral(numeral(data.Height).value() - numeral(data.BlockBottom).value()).value(); //prettier-ignore
                    tableHitungan_StdWidth.innerHTML = numeral(data.Width).value(); //prettier-ignore
                    tableHitungan_StdHeight.innerHTML = numeral(data.Height).value(); //prettier-ignore
                    tableHitungan_StdTW.innerHTML = numeral(data.TopWidth).value(); //prettier-ignore
                    tableHitungan_StdTL.innerHTML = numeral(data.TopLength).value(); //prettier-ignore
                    tableHitungan_StdBW.innerHTML = numeral(data.BotWidth).value(); //prettier-ignore
                    tableHitungan_StdBL.innerHTML = numeral(data.BotLength).value(); //prettier-ignore
                    tableHitungan_StdVS.innerHTML = numeral(data.ValveSeal).value(); //prettier-ignore
                    tableHitungan_StdVL.innerHTML = numeral(data.ValveLength).value(); //prettier-ignore
                    tableHitungan_StdBB.innerHTML = numeral(data.BlockBottom).value(); //prettier-ignore
                    tableHitungan_StdBC.innerHTML = numeral(data.BlockCover).value(); //prettier-ignore
                    tableHitungan_StdTO.innerHTML = numeral(data.TopOverlap).value(); //prettier-ignore
                    tableHitungan_StdBO.innerHTML = numeral(data.BotOverLap).value(); //prettier-ignore
                    tableHitungan_S1.value = numeral(data.BodyWidth).value(); //prettier-ignore
                    tableHitungan_S2.value = numeral(data.BodyHeight).value(); //prettier-ignore
                    tableHitungan_S3.value = numeral(data.BotWidth).value(); //prettier-ignore
                    tableHitungan_S4.value = numeral(data.BotLength).value(); //prettier-ignore
                    tableHitungan_S5.value = numeral(data.BotWidth).value(); //prettier-ignore
                    tableHitungan_S6.value = numeral(data.BotLength).value(); //prettier-ignore
                    tableHitungan_S7.value = numeral(data.ValveWidth).value(); //prettier-ignore
                    tableHitungan_S8.value = numeral(data.ValveHeight).value(); //prettier-ignore
                    tableHitungan_S9.value = numeral(data.PanjangKertas).value(); //prettier-ignore
                    tableHitungan_S10.value = numeral(data.LebarKertas).value(); //prettier-ignore
                    tableHitungan_S11.value = numeral(data.PanjangInner).value(); //prettier-ignore
                    tableHitungan_S12.value = numeral(data.LebarInner).value(); //prettier-ignore
                    tableHitungan_S13.value = numeral(data.panjangspoonbond).value(); //prettier-ignore
                    tableHitungan_S14.value = numeral(data.lebarspoonbond).value(); //prettier-ignore
                    tableHitungan_yarn1.value = numeral(data.Yarn).value(); //prettier-ignore
                    tableHitungan_yarn2.value = numeral(data.Yarn).value(); //prettier-ignore
                    tableHitungan_yarn3.value = numeral(data.Yarn_TW).value(); //prettier-ignore
                    tableHitungan_yarn4.value = numeral(data.Yarn_TL).value(); //prettier-ignore
                    tableHitungan_yarn5.value = numeral(data.Yarn_BW).value(); //prettier-ignore
                    tableHitungan_yarn6.value = numeral(data.Yarn_BL).value(); //prettier-ignore
                    tableHitungan_yarn7.value = numeral(data.Yarn_VS).value(); //prettier-ignore
                    tableHitungan_yarn8.value = numeral(data.Yarn_VL).value(); //prettier-ignore
                    tableHitungan_WA1.value = numeral(data.Warp).value(); //prettier-ignore
                    tableHitungan_WE1.value = numeral(data.Weft).value(); //prettier-ignore
                    tableHitungan_WA2.value = numeral(data.Warp2).value(); //prettier-ignore
                    tableHitungan_WE2.value = numeral(data.Weft2).value(); //prettier-ignore
                    tableHitungan_WA3.value = numeral(data.Warp3).value(); //prettier-ignore
                    tableHitungan_WE3.value = numeral(data.Weft2).value(); //prettier-ignore
                    tableHitungan_WA4.value = numeral(data.Warp4).value(); //prettier-ignore
                    tableHitungan_WE4.value = numeral(data.Weft2).value(); //prettier-ignore
                    tableHitungan_Denier1.value = numeral(data.Denier).value(); //prettier-ignore
                    tableHitungan_Denier2.value = numeral(data.Denier).value(); //prettier-ignore
                    tableHitungan_Denier3.value = numeral(data.Denier_TW).value(); //prettier-ignore
                    tableHitungan_Denier4.value = numeral(data.Denier_TL).value(); //prettier-ignore
                    tableHitungan_Denier5.value = numeral(data.Denier_BW).value(); //prettier-ignore
                    tableHitungan_Denier6.value = numeral(data.Denier_BL).value(); //prettier-ignore
                    tableHitungan_Denier7.value = numeral(data.Denier_VS).value(); //prettier-ignore
                    tableHitungan_Denier8.value = numeral(data.Denier_VL).value(); //prettier-ignore
                    tableHitungan_C1.value = data.Colour.trim(); //prettier-ignore
                    tableHitungan_C2.value = data.Colour.trim(); //prettier-ignore
                    tableHitungan_C3.value = data.Colour_TW.trim(); //prettier-ignore
                    tableHitungan_C4.value = data.Colour_TL.trim(); //prettier-ignore
                    tableHitungan_C5.value = data.Colour_BW.trim(); //prettier-ignore
                    tableHitungan_C6.value = data.Colour_BL.trim(); //prettier-ignore
                    tableHitungan_C7.value = data.Colour_VS.trim(); //prettier-ignore
                    tableHitungan_C8.value = data.Colour_VL.trim(); //prettier-ignore
                    tableHitungan_CW1.innerHTML = numeral(data.WeightBodyCloth).format("0,0.00"); //prettier-ignore
                    tableHitungan_CW2.innerHTML = numeral(data.WeightTopCloth).format("0,0.00"); //prettier-ignore
                    tableHitungan_CW3.innerHTML = numeral(data.WeightBotCloth).format("0,0.00"); //prettier-ignore
                    tableHitungan_CW4.innerHTML = numeral(data.WeightValveCloth).format("0,0.00"); //prettier-ignore
                    let CW1 = numeral(tableHitungan_CW1.innerHTML).value();
                    let CW2 = numeral(tableHitungan_CW2.innerHTML).value();
                    let CW3 = numeral(tableHitungan_CW3.innerHTML).value();
                    let CW4 = numeral(tableHitungan_CW4.innerHTML).value();
                    tableHitungan_CWTotal.innerHTML = numeral(CW1 + CW2 + CW3 + CW4).format("0,0.00"); //prettier-ignore
                    tableHitungan_LW1.innerHTML = numeral(data.WeightBodyLami).format("0,0.00"); //prettier-ignore
                    tableHitungan_LW2.innerHTML = numeral(data.WeightTopLami).format("0,0.00"); //prettier-ignore
                    tableHitungan_LW3.innerHTML = numeral(data.WeightBotLami).format("0,0.00"); //prettier-ignore
                    tableHitungan_LW4.innerHTML = numeral(data.WeightvalveLami).format("0,0.00"); //prettier-ignore
                    let LW1 = numeral(tableHitungan_LW1.innerHTML).value();
                    let LW2 = numeral(tableHitungan_LW2.innerHTML).value();
                    let LW3 = numeral(tableHitungan_LW3.innerHTML).value();
                    let LW4 = numeral(tableHitungan_LW4.innerHTML).value();
                    tableHitungan_LWTotal.innerHTML = numeral(LW1 + LW2 + LW3 + LW4).format("0,0.00"); //prettier-ignore
                    tableHitungan_OPP1.innerHTML = numeral(data.WeightBodyOPP).format("0,0.00"); //prettier-ignore
                    tableHitungan_OPP2.innerHTML = numeral(data.WeightTopOPP).format("0,0.00"); //prettier-ignore
                    tableHitungan_OPP3.innerHTML = numeral(data.WeightBotOPP).format("0,0.00"); //prettier-ignore
                    tableHitungan_OPP4.innerHTML = numeral(data.WeightValveOPP).format("0,0.00"); //prettier-ignore
                    let OPP1 = numeral(tableHitungan_OPP1.innerHTML).value();
                    let OPP2 = numeral(tableHitungan_OPP2.innerHTML).value();
                    let OPP3 = numeral(tableHitungan_OPP3.innerHTML).value();
                    let OPP4 = numeral(tableHitungan_OPP4.innerHTML).value();
                    tableHitungan_OPPTotal.innerHTML = numeral(OPP1 + OPP2 + OPP3 + OPP4).format("0,0.00"); //prettier-ignore
                    tableHitungan_ST1.innerHTML = numeral(CW1 + OPP1 + LW1).format("0,0.00"); //prettier-ignore
                    tableHitungan_ST2.innerHTML = numeral(CW2 + OPP2 + LW2).format("0,0.00"); //prettier-ignore
                    tableHitungan_ST3.innerHTML = numeral(CW3 + OPP3 + LW3).format("0,0.00"); //prettier-ignore
                    tableHitungan_ST4.innerHTML = numeral(CW4 + OPP4 + LW4).format("0,0.00"); //prettier-ignore
                    let S9 = numeral(tableHitungan_S9.value).value();
                    let S10 = numeral(tableHitungan_S10.value).value();
                    let S11 = numeral(tableHitungan_S11.value).value();
                    let S12 = numeral(tableHitungan_S12.value).value();
                    let S13 = numeral(tableHitungan_S13.value).value();
                    let S14 = numeral(tableHitungan_S14.value).value();
                    tableHitungan_ST5.innerHTML = numeral(((S9 * S10) / 10000) * kertas.value).format("0,0.00"); //prettier-ignore
                    let constanta = 1.84;
                    if (productType2.value.toUpperCase().includes("TBOI")) {
                        constanta = 0.92;
                    }
                    tableHitungan_ST6.innerHTML = numeral((S11 * S12 * inner.value * constanta) / 10000).format("0,0.00"); //prettier-ignore
                    tableHitungan_ST7.innerHTML = numeral(((S13 * S14) / 10000) * spoonbond.value).format("0,0.00"); //prettier-ignore
                    let CWTotal = numeral(tableHitungan_CWTotal.innerHTML).value(); //prettier-ignore
                    let LWTotal = numeral(tableHitungan_LWTotal.innerHTML).value(); //prettier-ignore
                    let OPPTotal = numeral(tableHitungan_OPPTotal.innerHTML).value(); //prettier-ignore
                    let ST5 = numeral(tableHitungan_ST5.innerHTML).value();
                    let ST6 = numeral(tableHitungan_ST6.innerHTML).value();
                    let ST7 = numeral(tableHitungan_ST7.innerHTML).value();
                    tableHitungan_STTotal.innerHTML = numeral(CWTotal + LWTotal + OPPTotal + ST5 + ST6 + ST7).format("0,0.00"); //prettier-ignore
                    console.log(
                        response.data[0].Tanggal,
                        moment(data.Tanggal).format("YYYY-MM-DD"),
                    );
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text:
                            response.error ||
                            "An error occurred while fetching data to show.",
                    });
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while fetching data.",
                });
            },
        });
    }
    //#endregion

    //#region Event Listeners
    gambarInputW.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            sizeW1.value = this.value;
            gambarInputH.disabled = false;
            gambarInputH.select();
            gambarInputH.focus();
        }
    });

    gambarInputH.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            sizeH1.value = this.value;
            gambarInputVS.disabled = false;
            gambarInputVS.select();
            gambarInputVS.focus();
        }
    });

    gambarInputVS.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            // sizeH1.value = this.value;
            gambarInputVL.disabled = false;
            gambarInputVL.select();
            gambarInputVL.focus();
        }
    });

    gambarInputVL.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            // sizeH1.value = this.value;
            gambarInputBB.disabled = false;
            gambarInputBB.select();
            gambarInputBB.focus();
        }
    });

    gambarInputBB.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            sizeBB1.value = this.value;
            gambarInputBC.disabled = false;
            gambarInputBC.select();
            gambarInputBC.focus();
        }
    });

    gambarInputBC.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            // sizeBB1.value = this.value;
            gambarInputFA.disabled = false;
            gambarInputFA.select();
            gambarInputFA.focus();
        }
    });

    gambarInputFA.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            btnBrowseCustomer.disabled = false;
            productStarpak.disabled = false;
            productAdstar.disabled = false;
            productType1.disabled = false;
            productType1.readOnly = true;
            if (!idCustomer.value) {
                btnBrowseCustomer.focus();
            } else if (productType2.value == "") {
                productType2.focus();
            } else {
                tanggalPembuatan.disabled = false;
                tanggalPembuatan.focus();
            }
        }
    });

    $('input[name="jenisProduct"]').on("change", function () {
        const map = {
            Adstar: "ADS",
            Starpak: "STR",
        };

        if ($(this).is(":checked")) {
            $("#productType1").val(map[$(this).val()]);
        }
    });

    btnBrowseCustomer.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Customer",
                html: '<table id="customerTable" class="display" style="width:100%"><thead><tr><th>Nama Customer</th><th>IDCust</th></tr></thead><tbody></tbody></table>',
                returnFocus: false,
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#customerTable")
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
                        let url =
                            mode == "Add"
                                ? "AdStarCloseTop/getListCustomerAdd"
                                : "AdStarCloseTop/getListCustomerUpdate";
                        let dataNamaCust =
                            mode == "Add" ? "NAMACUST" : "NamaCust";
                        const table = $("#customerTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: url,
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: dataNamaCust,
                                    width: "70%",
                                },
                                {
                                    data: "IDCust",
                                    width: "30%",
                                },
                            ],
                        });
                        $("#customerTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                                scrollRowIntoView(this);
                            },
                        );
                        const searchInput = $("#customerTable_filter input");
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydown(e, "customerTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    let dataNamaCust = mode == "Add" ? "NAMACUST" : "NamaCust";

                    namaCustomer.value = decodeHtmlEntities(selectedRow[dataNamaCust]).trim(); //prettier-ignore
                    if (dataNamaCust == "NAMACUST") {
                        idCustomer.value =
                            selectedRow.IDCust.trim().split(" -")[1];
                    } else if (dataNamaCust == "NamaCust") {
                        idCustomer.value =
                            selectedRow.IDCust.trim().split(" ")[1];
                    }
                    console.log(mode);

                    if (mode == "Add" && namaCustomer.value != "") {
                        btnJenisBag.disabled = false;
                        productType2.disabled = false;
                        productType2.readOnly = false;
                        productType2.focus();
                        productType2.select();
                    } else {
                        btnBrowseProduct.disabled = false;
                        btnBrowseProduct.focus();
                    }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btnJenisBag.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Bag Type",
                html: '<table id="jenisBagTable" class="display" style="width:100%"><thead><tr><th>Jenis Bag</th><th>Kode</th></tr></thead><tbody></tbody></table>',
                returnFocus: false,
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#jenisBagTable")
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
                        const table = $("#jenisBagTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "AdStarCloseTop/getListJenisBag",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                },
                            },
                            columns: [
                                {
                                    data: "JenisBag",
                                },
                                {
                                    data: "Kode",
                                },
                            ],
                        });
                        $("#jenisBagTable tbody").on(
                            "click",
                            "tr",
                            function () {
                                // Remove 'selected' class from all rows
                                table.$("tr.selected").removeClass("selected");
                                // Add 'selected' class to the clicked row
                                $(this).addClass("selected");
                                scrollRowIntoView(this);
                            },
                        );
                        const searchInput = $("#jenisBagTable_filter input");
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydown(e, "jenisBagTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    if (productType2.value == "") {
                        productType2.value = selectedRow.Kode.trim() + "-";
                    } else {
                        let dashIndex = productType2.value.indexOf("-");

                        if (dashIndex >= 0) {
                            // Replace everything before the first dash
                            productType2.value =
                                selectedRow.Kode.trim() +
                                productType2.value.substring(dashIndex);
                        } else {
                            // No dash found, just prepend kode + "-"
                            productType2.value = selectedRow.Kode.trim() + "-";
                        }
                    }
                    productType2.focus();
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    btnBrowseProduct.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            const result = await Swal.fire({
                title: "Select a Product",
                html: '<table id="productTable" class="display" style="width:100%"><thead><tr><th>Nama Product</th><th>Kode</th></tr></thead><tbody></tbody></table>',
                returnFocus: false,
                showCancelButton: true,
                preConfirm: () => {
                    const selectedData = $("#productTable")
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
                        const table = $("#productTable").DataTable({
                            responsive: true,
                            processing: true,
                            serverSide: true,
                            returnFocus: true,
                            ajax: {
                                url: "AdStarCloseTop/getListProduct",
                                dataType: "json",
                                type: "GET",
                                data: {
                                    _token: csrfToken,
                                    idCustomer: idCustomer.value,
                                },
                            },
                            columns: [
                                {
                                    data: "Nama_brg",
                                },
                                {
                                    data: "id",
                                },
                            ],
                        });
                        $("#productTable tbody").on("click", "tr", function () {
                            // Remove 'selected' class from all rows
                            table.$("tr.selected").removeClass("selected");
                            // Add 'selected' class to the clicked row
                            $(this).addClass("selected");
                            scrollRowIntoView(this);
                        });
                        const searchInput = $("#productTable_filter input");
                        if (searchInput.length > 0) {
                            searchInput.focus();
                        }

                        currentIndex = null;
                        Swal.getPopup().addEventListener("keydown", (e) =>
                            handleTableKeydown(e, "productTable"),
                        );
                    });
                },
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    const selectedRow = result.value;
                    const firstDashIndex = selectedRow.Nama_brg.indexOf("-");
                    const jenisProduct = selectedRow.Nama_brg.substring(0, firstDashIndex); //prettier-ignore
                    const namaProduct = selectedRow.Nama_brg.substring(firstDashIndex + 1); //prettier-ignore

                    if (jenisProduct.includes("ADS")) {
                        productAdstar.checked = true;
                        productStarpak.checked = false;
                    } else if (jenisProduct.includes("STR")) {
                        productAdstar.checked = false;
                        productStarpak.checked = true;
                    }

                    productAdstar.disabled = true;
                    productStarpak.disabled = true;
                    productType1.value = jenisProduct.trim();
                    productType2.value = namaProduct.trim();
                    productType2.readOnly = true;

                    kertas.value = 0;
                    inner.value = 0;
                    spoonbond.value = 0;
                    tableHitungan_S9.value = numeral(0).format("0,0.00");
                    tableHitungan_S10.value = numeral(0).format("0,0.00");
                    tableHitungan_S11.value = numeral(0).format("0,0.00");
                    tableHitungan_S12.value = numeral(0).format("0,0.00");
                    tableHitungan_S13.value = numeral(0).format("0,0.00");
                    tableHitungan_S14.value = numeral(0).format("0,0.00");
                    console.log(
                        productType2.value.includes("TBOI"),
                        productType2.value.includes("TBOIK"),
                    );

                    if (productType2.value.includes("TBOI")) {
                        kertas.readOnly = false;
                        inner.readOnly = false;
                        spoonbond.readOnly = true;
                        tableHitungan_S9.readOnly = false;
                        tableHitungan_S10.readOnly = false;
                        tableHitungan_S11.readOnly = false;
                        tableHitungan_S12.readOnly = false;
                        tableHitungan_S13.readOnly = true;
                        tableHitungan_S14.readOnly = true;
                    } else if (productType2.value.includes("TBOS")) {
                        kertas.readOnly = true;
                        inner.readOnly = true;
                        spoonbond.readOnly = false;
                        tableHitungan_S9.readOnly = true;
                        tableHitungan_S10.readOnly = true;
                        tableHitungan_S11.readOnly = true;
                        tableHitungan_S12.readOnly = true;
                        tableHitungan_S13.readOnly = false;
                        tableHitungan_S14.readOnly = false;
                    } else if (productType2.value.includes("TBI")) {
                        kertas.readOnly = true;
                        inner.readOnly = false;
                        spoonbond.readOnly = true;
                        tableHitungan_S9.readOnly = true;
                        tableHitungan_S10.readOnly = true;
                        tableHitungan_S11.readOnly = false;
                        tableHitungan_S12.readOnly = false;
                        tableHitungan_S13.readOnly = true;
                        tableHitungan_S14.readOnly = true;
                    } else if (productType2.value.includes("TBO")) {
                        kertas.readOnly = false;
                        inner.readOnly = true;
                        spoonbond.readOnly = true;
                        tableHitungan_S9.readOnly = false;
                        tableHitungan_S10.readOnly = false;
                        tableHitungan_S11.readOnly = true;
                        tableHitungan_S12.readOnly = true;
                        tableHitungan_S13.readOnly = true;
                        tableHitungan_S14.readOnly = true;
                    } else {
                        kertas.readOnly = false;
                        inner.readOnly = false;
                        spoonbond.readOnly = false;
                        tableHitungan_S9.readOnly = false;
                        tableHitungan_S10.readOnly = false;
                        tableHitungan_S11.readOnly = false;
                        tableHitungan_S12.readOnly = false;
                        tableHitungan_S13.readOnly = false;
                        tableHitungan_S14.readOnly = false;
                    }
                    idProduct.value = selectedRow.id;
                    displayData(idProduct.value);
                    if (mode == "Add" || mode == "Update") {
                        tanggalPembuatan.focus();
                    } else if (mode == "Delete") {
                        saveButton.focus();
                    }
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
        // console.log(selectedRow);
    });

    productType2.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            tanggalPembuatan.disabled = false;
            tanggalPembuatan.focus();
            tanggalPembuatan.select();
        }
    });

    tanggalPembuatan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            e.preventDefault();
            // designedBy.disabled = false;
            // designedBy.focus();
            // designedBy.select();
            keterangan.disabled = false;
            keterangan.select();
            keterangan.focus();
        }
    });

    // designedBy.addEventListener("keypress", function (e) {
    //     if (e.key == "Enter") {
    //         keterangan.disabled = false;
    //         keterangan.select();
    //         keterangan.focus();
    //     }
    // });

    keterangan.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            sizeW1.disabled = false;
            sizeW1.readOnly = true;
            sizeH1.disabled = false;
            sizeH1.readOnly = true;
            sizeBB1.disabled = false;
            sizeBB1.readOnly = true;
            meshWA.disabled = false;
            meshWA.focus();
            meshWA.select();
        }
    });

    meshWA.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            meshWE.disabled = false;
            meshWE.focus();
            meshWE.select();
        }
    });

    meshWE.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            yarnWidth.disabled = false;
            yarnWidth.focus();
            yarnWidth.select();
        }
    });

    yarnWidth.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            denier.disabled = false;
            denier.focus();
            denier.select();
        }
    });

    denier.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            colour.disabled = false;
            colour.focus();
            colour.select();
        }
    });

    colour.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            lamination.disabled = false;
            lamination.focus();
            lamination.select();
        }
    });

    lamination.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            OPP.disabled = false;
            OPP.focus();
            OPP.select();
        }
    });

    OPP.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            kertas.disabled = false;
            kertas.focus();
            kertas.select();
        }
    });

    kertas.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            inner.disabled = false;
            inner.focus();
            inner.select();
        }
    });

    inner.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            spoonbond.disabled = false;
            spoonbond.focus();
            spoonbond.select();
        }
    });

    spoonbond.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            printingFront.disabled = false;
            printingFront.focus();
            printingFront.select();
        }
    });

    printingFront.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            printingBack.disabled = false;
            printingBack.focus();
            printingBack.select();
        }
    });

    printingBack.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            printingTopPatch.disabled = false;
            printingTopPatch.focus();
            printingTopPatch.select();
        }
    });

    printingTopPatch.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            printingBottomPatch.disabled = false;
            printingBottomPatch.focus();
            printingBottomPatch.select();
        }
    });

    printingBottomPatch.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            airPermeability.disabled = false;
            airPermeability.focus();
            airPermeability.select();
        }
    });

    airPermeability.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            tinggiBagBerdiri.disabled = false;
            tinggiBagBerdiri.readOnly = true;
            btnCalculate.disabled = false;
            btnCalculate.focus();
        }
    });

    btnCalculate.addEventListener("click", function (e) {
        hitung();
        const tableHitunganSelector = document.querySelector("#tableHitungan");
        tableHitunganSelector.querySelectorAll("input").forEach((el) => {
            // Skip buttons that control mode
            console.log();
            if (el.classList.contains("readonly-field")) {
                el.disabled = false;
                el.readOnly = true;
                return;
            }
            el.disabled = false;
        });
        tableHitungan_S2.select();
        tableHitungan_S2.focus();
    });

    tableHitungan_S1.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungWidthHeight();
            tableHitungan_S2.select();
            tableHitungan_S2.focus();
        }
    });

    tableHitungan_S2.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungWidthHeight();
            tableHitungan_WA2.select();
            tableHitungan_WA2.focus();
        }
    });

    tableHitungan_WA2.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungTopWidthLength();
            tableHitungan_WE2.select();
            tableHitungan_WE2.focus();
        }
    });

    tableHitungan_WE2.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungTopWidthLength();
            tableHitungan_yarn3.select();
            tableHitungan_yarn3.focus();
        }
    });

    tableHitungan_yarn3.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungTopWidthLength();
            tableHitungan_Denier3.select();
            tableHitungan_Denier3.focus();
        }
    });

    tableHitungan_Denier3.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungTopWidthLength();
            tableHitungan_C3.select();
            tableHitungan_C3.focus();
        }
    });

    tableHitungan_C3.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            tableHitungan_yarn4.select();
            tableHitungan_yarn4.focus();
        }
    });

    tableHitungan_yarn4.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungTopWidthLength();
            tableHitungan_Denier4.select();
            tableHitungan_Denier4.focus();
        }
    });

    tableHitungan_Denier4.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungTopWidthLength();
            tableHitungan_C4.select();
            tableHitungan_C4.focus();
        }
    });

    tableHitungan_C4.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            tableHitungan_WA3.select();
            tableHitungan_WA3.focus();
        }
    });

    tableHitungan_WA3.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungBottomWidthLength();
            tableHitungan_WE3.select();
            tableHitungan_WE3.focus();
        }
    });

    tableHitungan_WE3.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungBottomWidthLength();
            tableHitungan_yarn5.select();
            tableHitungan_yarn5.focus();
        }
    });

    tableHitungan_yarn5.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungBottomWidthLength();
            tableHitungan_Denier5.select();
            tableHitungan_Denier5.focus();
        }
    });

    tableHitungan_Denier5.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungBottomWidthLength();
            tableHitungan_C5.select();
            tableHitungan_C5.focus();
        }
    });

    tableHitungan_C5.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungBottomWidthLength();
            tableHitungan_yarn6.select();
            tableHitungan_yarn6.focus();
        }
    });

    tableHitungan_yarn6.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungBottomWidthLength();
            tableHitungan_Denier6.select();
            tableHitungan_Denier6.focus();
        }
    });

    tableHitungan_Denier6.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungBottomWidthLength();
            tableHitungan_C6.select();
            tableHitungan_C6.focus();
        }
    });

    tableHitungan_C6.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            tableHitungan_WA4.select();
            tableHitungan_WA4.focus();
        }
    });

    tableHitungan_WA4.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungValveSealLength();
            tableHitungan_WE4.select();
            tableHitungan_WE4.focus();
        }
    });

    tableHitungan_WE4.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungValveSealLength();
            tableHitungan_yarn7.select();
            tableHitungan_yarn7.focus();
        }
    });

    tableHitungan_yarn7.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungValveSealLength();
            tableHitungan_Denier7.select();
            tableHitungan_Denier7.focus();
        }
    });

    tableHitungan_Denier7.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungValveSealLength();
            tableHitungan_C7.select();
            tableHitungan_C7.focus();
        }
    });

    tableHitungan_C7.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            tableHitungan_yarn8.select();
            tableHitungan_yarn8.focus();
        }
    });

    tableHitungan_yarn8.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungValveSealLength();
            tableHitungan_Denier8.select();
            tableHitungan_Denier8.focus();
        }
    });

    tableHitungan_Denier8.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            hitungValveSealLength();
            tableHitungan_C8.select();
            tableHitungan_C8.focus();
        }
    });

    tableHitungan_C8.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            tableHitungan_S9.select();
            tableHitungan_S9.focus();
        }
    });

    tableHitungan_S9.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            hitungKertas();
            tableHitungan_S10.select();
            tableHitungan_S10.focus();
        }
    });

    tableHitungan_S10.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            hitungKertas();
            tableHitungan_S11.select();
            tableHitungan_S11.focus();
        }
    });

    tableHitungan_S11.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            hitungInner();
            tableHitungan_S12.select();
            tableHitungan_S12.focus();
        }
    });

    tableHitungan_S12.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            hitungInner();
            tableHitungan_S13.select();
            tableHitungan_S13.focus();
        }
    });

    tableHitungan_S13.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            hitungSpoonBond();
            tableHitungan_S14.select();
            tableHitungan_S14.focus();
        }
    });

    tableHitungan_S14.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            if (this.value == "") {
                this.value = numeral(0).format("0,0.00");
            } else {
                this.value = numeral(this.value).format("0,0.00");
            }
            hitungSpoonBond();
            saveButton.focus();
        }
    });

    saveButton.addEventListener("click", function () {
        if (mode == "Add" || mode == "Update") {
            swal.fire({
                icon: "question",
                title: "Have you calculate the data before saving?",
                returnFocus: false,
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
            }).then((response) => {
                if (response.isConfirmed) {
                    saveData();
                    btnCalculate.focus();
                } else {
                    return;
                }
            });
        } else if (mode == "Delete") {
            swal.fire({
                icon: "question",
                title: "Apakah yakin data akan dihapus?",
                returnFocus: false,
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No",
            }).then((response) => {
                if (response.isConfirmed) {
                    saveData();
                    btnCalculate.focus();
                } else {
                    return;
                }
            });
        }
    });

    addButton.addEventListener("click", () => {
        // Focus on the first input after enabling
        mode = "Add";
        enableInputs("Add").then(() => {
            gambarInputW.focus();
            gambarInputW.select();
        });
    });

    updateButton.addEventListener("click", () => {
        mode = "Update";
        enableInputs("Update").then(() => {
            btnBrowseCustomer.focus();
        });
    });

    deleteButton.addEventListener("click", () => {
        mode = "Delete";
        enableInputs("Delete").then(() => {
            btnBrowseCustomer.focus();
        });
    });

    cancelButton.addEventListener("click", () => {
        mode = "";
        enableInputs("Cancel").then(() => {
            addButton.focus();
        });
        clearAllInputs();
    });
    //#endregion
});
