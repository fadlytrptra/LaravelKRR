jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let rb_grup = document.getElementById("rb_grup");
    let rb_mesin = document.getElementById("rb_mesin");
    let rb_order = document.getElementById("rb_order");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let total_meter = document.getElementById("total_meter");
    let total_kg = document.getElementById("total_kg");
    let rata_eff = document.getElementById("rata_eff");
    let proses = 0;

    const slcTypeMesin = document.getElementById("type_mesin");
    const slcMesin = $("#nama_mesin");
    const slcOrder = document.getElementById("order");

    let table_atas = $("#table_atas").DataTable({
    });

    $.ajaxSetup({
        beforeSend: function () {
            $("#loading-screen").css("display", "flex");
        },
        complete: function () {
            $("#loading-screen").css("display", "none");
        },
    });

    function handleGrup() {
        slcTypeMesin.disabled = false;
        slcMesin.prop("disabled", true);
        slcOrder.disabled = true;

        $("#" + slcTypeMesin.id).val(null).trigger("change");
        slcMesin.val(null).trigger("change");
        $("#" + slcOrder.id).val(null).trigger("change");
    }

    // event radio
    rb_grup.addEventListener("change", function () {
        handleGrup();
    });

    // LANGSUNG JALANKAN SAAT LOAD
    if (rb_grup.checked) {
        handleGrup();
    }

    rb_mesin.addEventListener("change", async function (event) {
        event.preventDefault();
        slcTypeMesin.disabled = false;
        slcMesin.prop("disabled", false);
        slcOrder.disabled = true;
        $("#" + slcTypeMesin.id).val(null).trigger("change");
        slcMesin.val(null).trigger("change");
        $("#" + slcOrder.id).val(null).trigger("change");
    });

    rb_order.addEventListener("change", async function (event) {
        event.preventDefault();
        slcTypeMesin.disabled = true;
        slcMesin.prop("disabled", true);
        slcOrder.disabled = false;
        $("#" + slcTypeMesin.id).val(null).trigger("change");
        slcMesin.val(null).trigger("change");
        $("#" + slcOrder.id).val(null).trigger("change");
    });

    tgl_awal.focus();
    const now = new Date();
    // const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    // const pad = (n) => n.toString().padStart(2, "0");
    // tgl_awal.value = `${firstDay.getFullYear()}-${pad(firstDay.getMonth() + 1)}-${pad(firstDay.getDate())}`;
    tgl_awal.valueAsDate = now;
    tgl_akhir.valueAsDate = now;

    $("#" + slcTypeMesin.id).select2({ placeholder: "-- Pilih Type Mesin --" });
    $("#" + slcTypeMesin.id).on("select2:select", function () {
        $("#" + slcMesin.id)
            .empty()
            .append(new Option())
            .trigger("change");

        slcMesin.disabled = false;
        slcMesin.focus();
        const val = $(this).val();

        setTimeout(() => {
            fetchDataMesin("/getMesinSelectCirD/" + $("#" + slcTypeMesin.id).val());
        }, 300);
    });

    slcMesin.disabled = true;
    function fetchDataMesin(endpoint, idNama_mesin) {
        fetch(endpoint)
            .then((response) => response.json())
            .then((options) => {
                slcMesin
                    .empty()
                    .append(
                        `<option disabled selected>-- Pilih Mesin --</option>`
                    );

                Promise.all(
                    options.map((entry) => {
                        return new Promise((resolve) => {
                            const displayText = `${entry.Id_mesin} | ${entry.Nama_mesin}`;
                            slcMesin.append(
                                new Option(displayText, entry.Id_mesin)
                            );
                            resolve(); // Resolve after appending
                        });
                    })
                ).then(() => {
                    slcMesin.select2("open");
                    // if (labelProses.textContent == "Input Data") {
                    //     slcMesin.select2("open");
                    // } else {
                    //     slcMesin.val(idNama_mesin).trigger("change");
                    // }
                });
            });
    }

    slcMesin.select2({
        // dropdownParent: $("#modalAsalKonversi"),
        placeholder: "-- Pilih Mesin --",
    });
    slcMesin.on("change", function () {
        const selectedMesin = $(this).val();
        console.log(selectedMesin);
        if (selectedMesin) {

        }
    });

    $("#" + slcOrder.id).select2({
        placeholder: "-- Pilih Order --",
        matcher: function (params, data) {

            if ($.trim(params.term) === '') {
                return data;
            }

            if (!data.element) {
                return null;
            }

            const keyword = params.term.toLowerCase();

            const selectedSearch = $("input[name='search_by']:checked").val();

            const kd = String($(data.element).data('kd') || '').toLowerCase();
            const nama = String($(data.element).data('nama') || '').toLowerCase();
            const tek1 = String($(data.element).data('tek1') || '').toLowerCase();

            if (selectedSearch === 'kd' && kd.includes(keyword)) {
                return data;
            }

            if (selectedSearch === 'nama' && nama.includes(keyword)) {
                return data;
            }

            if (selectedSearch === 'tek1' && tek1.includes(keyword)) {
                return data;
            }

            return null;
        }
    });

    $("input[name='search_by']").on("change", function () {
        $("#" + slcOrder.id).val(null).trigger("change");
    });

    btn_redisplay.addEventListener("click", async function (event) {
        event.preventDefault();
        // btn_redisplay.disabled = true;
        // let nilaiLPT = lpt.checked ? 'Y' : 'T';

        if (rb_grup.checked) {
            if ($("#" + slcTypeMesin.id).val() === "" || $("#" + slcTypeMesin.id).val() === null) {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Pilih dulu Type Mesinnya!",
                    showConfirmButton: true,
                    // timer: 2000 
                });
                // btn_redisplay.disabled = false;
                return;
            }
        } else if (rb_mesin.checked) {
            if (slcMesin.val() === "" || slcMesin.val() === null) {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Pilih dulu Mesinnya!",
                    showConfirmButton: true,
                    // timer: 2000 
                });
                // btn_redisplay.disabled = false;
                return;
            }
        } else if (rb_order.checked) {
            if ($("#" + slcOrder.id).val() === "" || $("#" + slcOrder.id).val() === null) {
                Swal.fire({
                    icon: "info",
                    title: "Info!",
                    text: "Pilih dulu Ordernya!",
                    showConfirmButton: true,
                    // timer: 2000 
                });
                // btn_redisplay.disabled = false;
                return;
            }
        }

        if (rb_grup.checked) {
            proses = 1;
        } else if (rb_mesin.checked) {
            proses = 2;
        } else if (rb_order.checked) {
            proses = 3;
        }

        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: false,
            processing: true,
            destroy: true,
            ajax: {
                url: "EffRataPeriodeD/getData",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        proses: proses,
                        tgl_awal: tgl_awal.value,
                        tgl_akhir: tgl_akhir.value,
                        type_mesin: $("#" + slcTypeMesin.id).val(),
                        mesin: slcMesin.val(),
                        order: $("#" + slcOrder.id).val(),
                    });
                },
                dataSrc: function (json) {
                    let totalMeter = 0;
                    let totalKg = 0;
                    let totalEff = 0;

                    let data = json.data;
                    let jumlahData = data.length;

                    data.forEach(function (item) {
                        totalMeter += parseFloat(item.Hasil_Meter) || 0;
                        totalKg += parseFloat(item.Hasil_Kg) || 0;
                        totalEff += parseFloat(item.Effisiensi) || 0;
                    });

                    let avgEff = jumlahData > 0 ? (totalEff / jumlahData) : 0;

                    // isi ke input
                    $("#total_meter").val(totalMeter);
                    $("#total_kg").val(totalKg.toFixed(2));
                    $("#rata_eff").val(avgEff.toFixed(2));

                    return data;
                }
            },
            columns: [
                {
                    data: 'Tgl_Log_raw', // Data asli untuk sorting
                    render: function (data, type, row) {
                        // type === 'display' digunakan saat menampilkan di tabel
                        if (type === 'display') {
                            return row.Tgl_Log; // tampilkan versi m/d/Y
                        }
                        return data; // untuk sorting & filtering (yyyy-mm-dd)
                    }
                },
                { data: "Shift" },
                { data: "Type_Mesin" },
                { data: "Nama_mesin" },
                { data: "NAMA_BRG" },
                {
                    data: "AfalanWA",
                    render: data => numeral(data || 0).format('0.00')
                },
                {
                    data: "AfalanWE",
                    render: data => numeral(data || 0).format('0.00')
                },
                { data: "Hasil_Meter" },
                { data: "Effisiensi" },
                { data: "Hasil_Kg" },
            ],
            columnDefs: [
                {
                    targets: 4,
                    width: "1000px"
                }
            ],
            // order: [[1, "asc"]],
            paging: false,
            scrollY: "550px",
            scrollCollapse: true,
        });
    });
});