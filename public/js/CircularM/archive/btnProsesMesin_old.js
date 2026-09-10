btnProsesMesin.addEventListener("click", function () {
    let daftar_schedule = [];
    for (var id_order in machinePriority) {
        let scheduleKu;
        if (machinePriority.hasOwnProperty(id_order)) {
            let machine = machinePriority[id_order];

            let index_order = listIdOrder.indexOf(id_order.split(" ")[1]);
            let deadline = listOrder[index_order]["RencanaSelesai"];
            let meterKu = listOrder[index_order]["JumlahOrder"];

            let daftar_mesin = [];
            let daftar_kecepatan = {};
            let daftar_mulai = {};
            let daftar_shift = {};
            let daftar_mesin_lama = [];

            console.log(id_order);

            let nama_mesin, tgl_mesin_awal, tgl_mesin_akhir;
            for (let i = 0; i < machine["newDetail"].length; i++) {
                const element = machine["newDetail"][i];
                nama_mesin = element["NamaMesin"];
                let mesinKu = listMesin.find((m) => m.NamaMesin === nama_mesin);

                if (mesinKu) {
                    daftar_mesin_lama.push(mesinKu);
                    tgl_mesin_akhir = new Date(mesinKu.TanggalAkhir);
                    tgl_mesin_awal = new Date(mesinKu.TanggalAwal);
                    let tgl_akhir = new Date(deadline);

                    if (tgl_mesin_akhir < tgl_akhir) {
                        // skenario 1: mesin selesai mengerjakan order lain, dan masih belum deadline
                        listMesin = listMesin.filter(
                            (m) => m.NamaMesin !== nama_mesin
                        );

                        let tanggalKu = mesinKu.TanggalAkhir,
                            shiftKu = "";
                        switch (mesinKu.Shift) {
                            case "P":
                                shiftKu = "S";
                                tanggalKu = mesinKu.TanggalAkhir;
                                break;

                            case "S":
                                shiftKu = "M";
                                tanggalKu = mesinKu.TanggalAkhir;
                                break;

                            case "M":
                                shiftKu = "P";
                                tanggalKu = new Date(mesinKu.TanggalAkhir);
                                tanggalKu.setDate(tanggalKu.getDate() + 1);
                                tanggalKu = tanggalKu
                                    .toISOString()
                                    .split("T")[0];
                                break;

                            default:
                                break;
                        }

                        daftar_shift[nama_mesin] = shiftKu;
                        daftar_mulai[nama_mesin] = tanggalKu;
                    } else if (tgl_akhir < tgl_mesin_awal) {
                        // skenario 2: deadline order sebelum mesin mengerjakan order lain
                        listMesin = listMesin.filter(
                            (m) => m.NamaMesin !== nama_mesin
                        );

                        daftar_mulai[nama_mesin] =
                            listOrder[index_order]["RencanaMulai"];
                        daftar_shift[nama_mesin] = "P";
                    } else {
                        continue;
                    }
                } else {
                    daftar_mulai[nama_mesin] =
                        listOrder[index_order]["RencanaMulai"];
                    daftar_shift[nama_mesin] = "P";
                }

                let speed = parseInt(element["Kecepatan"].split(" / ")[0]);
                let rounded_speed = Math.floor(speed / 10) * 10;
                daftar_kecepatan[nama_mesin] = rounded_speed;
                daftar_mesin.push(nama_mesin);
            }

            scheduleKu = {
                meter: meterKu,
                endDate: deadline,
                machines: daftar_mesin,
                machineStartDates: daftar_mulai,
                machineShifts: daftar_shift,
                machineSpeeds: daftar_kecepatan,
            };

            // console.log("scheduleKu", scheduleKu);
            // console.log("daftar_mesin_lama", daftar_mesin_lama);

            let hasil_produksi = calculateProduction(scheduleKu);

            console.log("scheduleKu", scheduleKu);
            console.log("hasil_produksi", hasil_produksi);

            for (let j = 0; j < hasil_produksi["machines"].length; j++) {
                listMesin.push({
                    NamaMesin: hasil_produksi["machines"][j],
                    TanggalAwal: hasil_produksi["startDates"][j],
                    TanggalAkhir: hasil_produksi["endDates"][j],
                    Shift: hasil_produksi["endShifts"][j],
                });
            }

            // console.log("listMesin", listMesin);

            // Iterate through the second object
            listMesin.forEach((secondMachine) => {
                // Find the matching machine in the first object
                let matchingMachine = daftar_mesin_lama.find(
                    (firstMachine) =>
                        firstMachine.NamaMesin === secondMachine.NamaMesin
                );
                // If a matching machine is found, update the dates in the second object
                if (matchingMachine) {
                    // Compare the start dates and update if the matching machine's start date is earlier
                    if (
                        new Date(matchingMachine.TanggalAwal) <
                        new Date(secondMachine.TanggalAwal)
                    ) {
                        secondMachine.TanggalAwal = matchingMachine.TanggalAwal;
                    }
                    // Compare the end dates and update if the matching machine's end date is later
                    if (
                        new Date(matchingMachine.TanggalAkhir) >
                        new Date(secondMachine.TanggalAkhir)
                    ) {
                        secondMachine.TanggalAkhir =
                            matchingMachine.TanggalAkhir;
                    }
                }
            });

            hasil_produksi["order"] = id_order;
            daftar_schedule.push(hasil_produksi);
        }
    }

    generateTimeTable(daftar_schedule);

    showToast(
        "Data berhasil diproses! Silahkan buka pada menu Timeline Order",
        "success"
    );

    tabWaktu.disabled = false;
    tabWaktu.focus();
});
