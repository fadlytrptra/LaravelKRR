//#region Variabel DOM Elements
jQuery(function ($) {
    // Frame1
    const OptHarian = document.getElementById("OptHarian");
    const OptProyek = document.getElementById("OptProyek");
    const TNoOd = document.getElementById("TNoOd");
    const TDivisi = document.getElementById("TDivisi");
    const TKdBrg = document.getElementById("TKdBrg");
    const TNoGbr = document.getElementById("TNoGbr");
    const TNamaBrg = document.getElementById("TNamaBrg");
    const TJml = document.getElementById("TJml");
    const TMesin = document.getElementById("TMesin");
    const TUserOrder = document.getElementById("TUserOrder");
    const TKetOrder = document.getElementById("TKetOrder");
    const OdSts = document.getElementById("OdSts");
    // GroupBox1
    const optH = document.getElementById("optH");
    const optP = document.getElementById("optP");
    const TNoOrder = document.getElementById("TNoOrder");
    const TDivisi1 = document.getElementById("TDivisi1");
    const TKdBrg1 = document.getElementById("TKdBrg1");
    const TNoGbr1 = document.getElementById("TNoGbr1");
    const TNamaBrg1 = document.getElementById("TNamaBrg1");
    const TJml1 = document.getElementById("TJml1");
    const TMesin1 = document.getElementById("TMesin1");
    const TUserOrder1 = document.getElementById("TUserOrder1");
    const TKetOrder1 = document.getElementById("TKetOrder1");
    const OdSts1 = document.getElementById("OdSts1");

    const tbodyBagian = document.getElementById("tbodyBagian");
    const btnProses = document.getElementById("btnProses");
    const btnKeluar = document.getElementById("btnKeluar");

    let currentBagianList = [];
//#endregion

    function getJenisOd() {
        return OptHarian.checked ? "H" : "P";
    }
    function getNewJenisOd() {
        return optH.checked ? "H" : "P";
    }


//#region Input & Core Events
    OptHarian.addEventListener("change", function () {
        if (this.checked) resetFrame1();
    });
    OptProyek.addEventListener("change", function () {
        if (this.checked) resetFrame1();
    });
    optH.addEventListener("change", function () {
        if (this.checked) resetFrame2();
    });
    optP.addEventListener("change", function () {
        if (this.checked) resetFrame2();
    });

    btnKeluar.addEventListener("click", function () {
        if (btnKeluar.textContent.trim().toLowerCase() === "keluar") {
            window.location.href = "/GPS";
        } else {
            resetAll();
        }
    });

    TNoOd.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let noOdVal = this.value.trim();
            if (noOdVal !== "") {
                noOdVal = noOdVal.padStart(6, "0").slice(-6);
                this.value = noOdVal;
                loadOrder(noOdVal, getJenisOd(), "frame1");
            } else {
                Swal.fire("Info", "Isi Nomer Ordernya", "info");
            }
        }
    });

    TNoOrder.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            let noOrderVal = this.value.trim();
            if (noOrderVal !== "") {
                noOrderVal = noOrderVal.padStart(6, "0").slice(-6);
                this.value = noOrderVal;

                // Validasi: no order + jenis tidak boleh sama dengan Frame1
                const isSameNoOd = noOrderVal === TNoOd.value.trim();
                const isSameJenis = getNewJenisOd() === getJenisOd();
                if (isSameNoOd && isSameJenis) {
                    Swal.fire(
                        "Pesan",
                        "Tidak boleh... Karena nomor dan jenis order sama.",
                        "warning",
                    );
                    this.value = "";
                    this.focus();
                    return;
                }

                loadOrder(noOrderVal, getNewJenisOd(), "frame2");
            } else {
                Swal.fire("Info", "Isi Nomer Ordernya", "info");
            }
        }
    });

    btnProses.addEventListener("click", function () {
        const checkedItems = getCheckedBagian();
        if (checkedItems.length === 0) {
            Swal.fire(
                "Pesan",
                "Pilih nama bagian yang akan dipindah.",
                "warning",
            );
            return;
        }

        const newNoOd = TNoOrder.value.trim();
        if (!newNoOd) {
            Swal.fire("Info", "Isi nomor order baru terlebih dahulu.", "info");
            return;
        }

        const newJenisOd = getNewJenisOd();

        // Konfirmasi
        Swal.fire({
            title: "Konfirmasi",
            html: `
                <p>Anda akan memindahkan <b>${checkedItems.length}</b> bagian ke:</p>
                <p>No. Order: <b>${newNoOd}</b> (${newJenisOd === "H" ? "Harian" : "Proyek"})</p>
                <p>Lanjutkan?</p>
            `,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, Proses",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                const payload = {
                    newNoOd: newNoOd,
                    newJenisOd: newJenisOd,
                    items: checkedItems.map((it) => ({
                        idBagian: it.idBagian,
                    })),
                };

                ajaxPost(
                    window.pkjOrderConfig.routeStore,
                    payload,
                    null,
                    null,
                    function (response) {
                        Swal.fire("Sukses", response.message, "success").then(
                            () => {
                                // Setelah sukses: clear Frame2, reload ListBagian
                                resetFrame2();
                                loadBagian(TNoOd.value.trim(), getJenisOd());
                                OptHarian.checked = true;
                                optH.checked = true;
                            },
                        );
                    },
                );
            }
        });
    });
//#endregion

//#region Utility & Helper Functions
    function loadOrder(noOd, jenisOd, target) {
        ajaxGet(
            window.pkjOrderConfig.routeGetOrder,
            { noOd: noOd, jenisOd: jenisOd },
            function (data) {
                if (target === "frame1") {
                    TDivisi.value = data.TDivisi;
                    TKdBrg.value = data.TKdBrg;
                    TNamaBrg.value = data.TNamaBrg;
                    TNoGbr.value = data.TNoGbr;
                    TJml.value = data.TJml;
                    OdSts.textContent = data.OdSts;
                    TKetOrder.value = data.TKetOrder;
                    TMesin.value = data.TMesin;
                    TUserOrder.value = data.TUserOrder;

                    btnKeluar.textContent = "Batal";
                    // Load list bagian untuk frame1
                    loadBagian(noOd, jenisOd);
                } else {
                    TDivisi1.value = data.TDivisi;
                    TKdBrg1.value = data.TKdBrg;
                    TNamaBrg1.value = data.TNamaBrg;
                    TNoGbr1.value = data.TNoGbr;
                    TJml1.value = data.TJml;
                    OdSts1.textContent = data.OdSts;
                    TKetOrder1.value = data.TKetOrder;
                    TMesin1.value = data.TMesin;
                    TUserOrder1.value = data.TUserOrder;
                }
            },
        ).fail(function (xhr) {
            if (xhr.status === 400 || xhr.status === 404) {
                if (target === "frame1") {
                    TNoOd.value = "";
                    TNoOd.focus();
                } else {
                    TNoOrder.value = "";
                    TNoOrder.focus();
                }
            }
        });
    }

    function loadBagian(noOd, jenisOd) {
        ajaxGet(
            window.pkjOrderConfig.routeGetBagianList,
            { noOd: noOd, jenisOd: jenisOd },
            function (data) {
                currentBagianList = data;
                renderBagian(data);
            },
        );
    }

    function renderBagian(data) {
        tbodyBagian.innerHTML = "";
        if (!data || data.length === 0) {
            tbodyBagian.innerHTML =
                '<tr><td colspan="2" class="text-center">Tidak ada bagian.</td></tr>';
            return;
        }
        let html = "";
        for (const row of data) {
            html += `<tr class="list-bagian-tr">`;
            html += `<td><input type="checkbox" class="rowCheckbox" style="margin-right: 8px; cursor: pointer;">${row.NamaBagian}</td>`;
            html += `<td style="display:none;">${row.IdBagian}</td>`;
            html += `</tr>`;
        }
        tbodyBagian.innerHTML = html;
    }

    function getCheckedBagian() {
        const items = [];
        tbodyBagian.querySelectorAll("tr").forEach((tr) => {
            const cb = tr.querySelector(".rowCheckbox");
            if (cb && cb.checked) {
                const cells = tr.querySelectorAll("td");
                items.push({
                    idBagian: parseInt(cells[1].textContent.trim()) || 0,
                    namaBagian: cells[0].textContent.trim(),
                });
            }
        });
        return items;
    }

    function resetFrame1() {
        TNoOd.value = "";
        TDivisi.value = "";
        TKdBrg.value = "";
        TNoGbr.value = "";
        TNamaBrg.value = "";
        TJml.value = "";
        TMesin.value = "";
        TUserOrder.value = "";
        TKetOrder.value = "";
        OdSts.textContent = "";
        currentBagianList = [];
        tbodyBagian.innerHTML =
            '<tr><td colspan="2" class="text-center">Belum ada data.</td></tr>';
        TNoOd.focus();
    }

    function resetFrame2() {
        TNoOrder.value = "";
        TDivisi1.value = "";
        TKdBrg1.value = "";
        TNoGbr1.value = "";
        TNamaBrg1.value = "";
        TJml1.value = "";
        TMesin1.value = "";
        TUserOrder1.value = "";
        TKetOrder1.value = "";
        OdSts1.textContent = "";
        TNoOrder.focus();
    }

    function resetAll() {
        resetFrame1();
        resetFrame2();
        OptHarian.checked = true;
        OptProyek.checked = false;
        optH.checked = true;
        optP.checked = false;
        btnKeluar.textContent = "Keluar";
        TNoOd.focus();
    }
});
//#endregion
