let kd_barang = document.getElementById("kd_barang");
let select_kategori_utama = document.getElementById("select_kategori_utama");
let select_kategori = document.getElementById("select_kategori");
let select_subKategori = document.getElementById("select_subKategori");
let ket_khusus = document.getElementById("ket_khusus");
let nama_Barang = document.getElementById("nama_Barang");
let ket_barang = document.getElementById("ket_barang");
let tambah_kategori = document.getElementById("tambah_kategori");
let tambah_subKategori = document.getElementById("tambah_subKategori");
let select_jenisPembelian = document.getElementById("select_jenisPembelian");
let check_round = document.getElementById("check_round");
let check_export = document.getElementById("check_export");
let check_barangSama = document.getElementById("check_barangSama");
let check_spek = document.getElementById("check_spek");
let org_penjaluk = document.getElementById("org_penjaluk");
let select_satuanPrimer = document.getElementById("select_satuanPrimer");
let select_satuanSekunder = document.getElementById("select_satuanSekunder");
let select_satuanTritier = document.getElementById("select_satuanTritier");
let select_satuanUmum = document.getElementById("select_satuanUmum");
let select_spek = document.getElementById("select_spek");
let textBox1 = document.getElementById("textBox1");
let textBox2 = document.getElementById("textBox2");
let textBox3 = document.getElementById("textBox3");
let textBox4 = document.getElementById("textBox4");
let textBox5 = document.getElementById("textBox5");
let textBox6 = document.getElementById("textBox6");
let textBox7 = document.getElementById("textBox7");
let textBox8 = document.getElementById("textBox8");
let textBox9 = document.getElementById("textBox9");
let textBox10 = document.getElementById("textBox10");
let textBox11 = document.getElementById("textBox11");
let textBox12 = document.getElementById("textBox12");
let textBox13 = document.getElementById("textBox13");
let textBox14 = document.getElementById("textBox14");
let textBox15 = document.getElementById("textBox15");
let textBox16 = document.getElementById("textBox16");
let labelExport = document.getElementById("labelExport");
let groupSpek = document.getElementById("groupSpek");
let btn_batal = document.getElementById("btn_batal");
let btn_isi = document.getElementById("btn_isi");
let btn_koreksi = document.getElementById("btn_koreksi");
let btn_hapus = document.getElementById("btn_hapus");
let btn_proses = document.getElementById("btn_proses");
let btn_tambah_kategoriUtama = document.getElementById(
    "btn_tambah_kategoriUtama"
);
let btn_tambah_kategori = document.getElementById("btn_tambah_kategori");
let btn_tambah_subKategori = document.getElementById("btn_tambah_subKategori");
let btn_tambahKategori = document.getElementById("btn_tambahKategori");
let btn_tambahSubKategori = document.getElementById("btn_tambahSubKategori");
let btn_cekNamaBarang = document.getElementById("btn_cekNamaBarang");
let btn_namaBarang = document.getElementById("btn_namaBarang");
let btn_closeCekBarang = document.getElementById("btn_closeCekBarang");

let csrfToken = $('meta[name="csrf-token"]').attr("content");

let requestCekNamaBarang;
let dataRes;
let kdBarangAslinya = "";
let btnActive = "batal";
let tamValueNamaBrg = "";
const SpesifikasiType = {
    Gelondongan: 1097,
    BenangExtruder: 1474,
    InnerGelondongan: 1516,
    PolybagGelondonganLDPE: 1852,
    PolybagGelondonganLLDPE: 1896,
    PolybagHDPE: 187,
    PolybagPE: 188,
    PolybagLLDPE: 350,
    PolybagLDPE: 187,
    PolybagLDPP: 187,
    KarungWovenBag: 1508,
};

btn_isi.focus();

check_export.disabled = true;
labelExport.style.display = "none";
groupSpek.style.display = "none";
select_satuanTritier.addEventListener("change", function (e) {
    for (let i = 0; i < select_satuanUmum.options.length; i++) {
        if (
            select_satuanUmum.options[i].value.replace(/\s/g, "") ==
            select_satuanTritier.value.replace(/\s/g, "")
        ) {
            select_satuanUmum.selectedIndex = i;
        }
    }
});

setInputFilter(
    document.getElementById("kd_barang"),
    function (value) {
        return /^\d*$/.test(value);
    },
    "Tidak boleh character, harus angka"
);

kd_barang.addEventListener("input", function (event) {
    if (kd_barang.value != "") {
        btn_proses.disabled = false;
    } else {
        btn_proses.disabled = true;
    }
});

kd_barang.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        btn_cari_kdBarang.click();
    }
});
nama_Barang.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        console.log(nama_Barang.value.replace(/\s/g, ""));
        MySpesifikasi = parseInt(
            select_subKategori.options[select_subKategori.selectedIndex].value
        );
        switch (MySpesifikasi) {
            case SpesifikasiType.BenangExtruder:
                PecahBenang(nama_Barang.value.replace(/\s/g, ""));
                break;
            case SpesifikasiType.Gelondongan:
                PecahGelondongan(nama_Barang.value.replace(/\s/g, ""));
                break;
            case SpesifikasiType.InnerGelondongan:
                PecahInnerGelondongan(nama_Barang.value.replace(/\s/g, ""));
                break;
            case SpesifikasiType.PolybagGelondonganLDPE:
                PecahInnerGelondongan(nama_Barang.value.replace(/\s/g, ""));
                break;
            case SpesifikasiType.PolybagGelondonganLLDPE:
                PecahInnerGelondongan(nama_Barang.value.replace(/\s/g, ""));
                break;
            case SpesifikasiType.PolybagHDPE:
                PecahInnerHasilPotong(nama_Barang.value.replace(/\s/g, ""));
                break;
            case SpesifikasiType.PolybagLDPE:
                PecahInnerHasilPotong(nama_Barang.value.replace(/\s/g, ""));
                break;
            case SpesifikasiType.PolybagLDPP:
                PecahInnerHasilPotong(nama_Barang.value.replace(/\s/g, ""));
                break;
            case SpesifikasiType.PolybagLLDPE:
                PecahInnerHasilPotong(nama_Barang.value.replace(/\s/g, ""));
                break;
            case SpesifikasiType.PolybagPE:
                PecahInnerHasilPotong(nama_Barang.value.replace(/\s/g, ""));
                break;
            case SpesifikasiType.KarungWovenBag:
                PecahKarungWovenBag(nama_Barang.value.replace(/\s/g, ""));
                break;
            default:
                break;
        }
    }
});
check_barangSama.addEventListener("click", function (event) {
    if (check_barangSama.checked == true) {
        select_kategori.disabled = true;
        select_kategori_utama.disabled = true;
        select_subKategori.disabled = true;
    } else {
        if (select_kategori_utama.selectedIndex == 0) {
            select_kategori_utama.disabled = false;
        } else if (select_kategori.selectedIndex == 0) {
            select_kategori_utama.disabled = false;
            select_kategori.disabled = false;
        } else {
            select_kategori_utama.disabled = false;
            select_kategori.disabled = false;
            select_subKategori.disabled = false;
        }
    }
});

btn_isi.addEventListener("click", function () {
    enableElements();
    btnActive = "isi";
    btn_cekNamaBarang.disabled = true;
    btn_isi.disabled = true;
    btn_koreksi.disabled = true;
    btn_hapus.disabled = true;
    kd_barang.focus();
});

btn_koreksi.addEventListener("click", function () {
    enableElements();
    btnActive = "koreksi";
    btn_isi.disabled = true;
    btn_koreksi.disabled = true;
    btn_hapus.disabled = true;
    kd_barang.focus();
});

btn_hapus.addEventListener("click", function () {
    enableElements();
    btnActive = "hapus";
    btn_isi.disabled = true;
    btn_koreksi.disabled = true;
    btn_hapus.disabled = true;
    kd_barang.focus();
});

btn_proses.addEventListener("click", function (event) {
    if (btnActive == "isi") {
        let barangSama = "N";
        let round = "N";
        let kdSpek = null;
        let barangEksport = "N";
        if (check_barangSama.checked == true) {
            barangSama = "Y";
        } else {
            barangSama = "N";
        }
        if (check_round.checked == true) {
            round = "Y";
        }
        if (check_spek.checked == true) {
            kdSpek = select_spek.value;
        }
        if (check_export.checked == true) {
            barangEksport = "Y";
        }
        $.ajax({
            url: "/Maintenance/Isi",
            type: "POST",
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            data: {
                Kriteria: select_kategori_utama.value[0],
                Jenis_Pembelian: select_jenisPembelian.value,
                BrgSama: barangSama,
                KodeBrgAslinya: kd_barang.value.replace(/\s/g, ""),
                NO_SUB_KATEGORI: select_subKategori.value,
                NAMA_BRG: nama_Barang.value,
                KET: ket_barang.value,
                KET_KHUSUS: ket_khusus.value,
                ST_TRI: select_satuanTritier.value,
                ST_SEK: select_satuanSekunder.value,
                ST_PRIM: select_satuanPrimer.value,
                NO_SATUAN_UMUM: select_satuanUmum.value,
                ROUND: round,
                D_Tek0: textBox1.value,
                D_Tek1: textBox2.value,
                D_Tek2: textBox3.value,
                D_Tek3: textBox4.value,
                D_Tek4: textBox5.value,
                D_Tek5: textBox6.value,
                D_Tek6: textBox7.value,
                D_Tek7: textBox8.value,
                D_Tek8: textBox9.value,
                D_Tek9: textBox10.value,
                D_Tek10: textBox11.value,
                D_Tek11: textBox12.value,
                D_Tek12: textBox13.value,
                D_Tek13: textBox14.value,
                Ket_Tek0: textBox15.value,
                Ket_Tek1: textBox16.value,
                KdSpec: kdSpek,
                Penjaluk: org_penjaluk.value,
                Barang_Export: barangEksport,
            },
            success: function (response) {
                if (response.errorInfo == undefined) {
                    Swal.fire({
                        icon: "success",
                        title:
                            "Data Berhasil DiTambahkan! Kode Barang = " +
                            response.kd,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Data Tidak Berhasil DiTambahkan Karena Data Sudah Ada!",
                        showConfirmButton: false,
                        timer: "5000",
                    });
                }
                clearData();
                btnActive = "batal";
                disableAll();
                btn_isi.disabled = false;
                btn_koreksi.disabled = false;
                btn_hapus.disabled = false;
            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Data Tidak Berhasil DiTambahkan!",
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
    } else if (btnActive == "koreksi") {
        let round = "N";
        let kdSpek = null;
        let barangEksport = "N";

        if (check_round.checked == true) {
            round = "Y";
        }
        if (check_spek.checked == true) {
            kdSpek = select_spek.value;
        }
        if (check_export.checked == true) {
            barangEksport = "Y";
        }

        $.ajax({
            url: "/Maintenance/Koreksi",
            type: "POST",
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            data: {
                KD_BRG: kd_barang.value.replace(/\s/g, ""),
                NO_SUB_KATEGORI: select_subKategori.value,
                NAMA_BRG: nama_Barang.value,
                KET: ket_barang.value,
                KET_KHUSUS: ket_khusus.value,
                ST_TRI: select_satuanTritier.value,
                ST_SEK: select_satuanSekunder.value,
                ST_PRIM: select_satuanPrimer.value,
                NO_SATUAN_UMUM: select_satuanUmum.value,
                ROUND: round,
                D_Tek0: textBox1.value,
                D_Tek1: textBox2.value,
                D_Tek2: textBox3.value,
                D_Tek3: textBox4.value,
                D_Tek4: textBox5.value,
                D_Tek5: textBox6.value,
                D_Tek6: textBox7.value,
                D_Tek7: textBox8.value,
                D_Tek8: textBox9.value,
                D_Tek9: textBox10.value,
                D_Tek10: textBox11.value,
                D_Tek11: textBox12.value,
                D_Tek12: textBox13.value,
                D_Tek13: textBox14.value,
                Ket_Tek0: textBox15.value,
                Ket_Tek1: textBox16.value,
                KdSpec: kdSpek,
                Penjaluk: org_penjaluk.value,
                Barang_Export: barangEksport,
            },
            success: function (response) {
                Swal.fire({
                    icon: "success",
                    title: "Data Berhasil DiTambahkan!",
                    showConfirmButton: false,
                    timer: "2000",
                });

                clearData();
                btnActive = "batal";
                disableAll();
                btn_isi.disabled = false;
                btn_koreksi.disabled = false;
                btn_hapus.disabled = false;
            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Data Tidak Berhasil DiTambahkan!",
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
    } else if (btnActive == "hapus") {
        $.ajax({
            url: "/Maintenance/ProsesHapus",
            type: "POST",
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            beforeSend: function () {
                // Show loading screen
                $("#loading-screen").css("display", "flex");
            },
            data: {
                KD_BRG0: kd_barang.value.replace(/\s/g, ""),
            },
            success: function (response) {
                Swal.fire({
                    icon: "success",
                    title: "Data Berhasil DiHapuskan!",
                    showConfirmButton: false,
                    timer: "2000",
                });
                clearData();
                btnActive = "batal";
                disableAll();
                btn_isi.disabled = false;
                btn_koreksi.disabled = false;
                btn_hapus.disabled = false;
            },
            error: function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Data Tidak Berhasil DiHapuskan!",
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
    }
});

btn_closeCekBarang.addEventListener("click", function (event) {
    abortCekNamaBarang();
    $("#table_cekNamaBarang").DataTable().clear().destroy();
});

btn_cari_kdBarang.addEventListener("click", function (event) {
    cariKodeBarang(kd_barang.value.replace(/\s/g, ""));
    kd_barang.value = kdBarangAslinya;
});

btn_batal.addEventListener("click", function (event) {
    clearData();
    btnActive = "batal";
    disableAll();
    btn_isi.disabled = false;
    btn_koreksi.disabled = false;
    btn_hapus.disabled = false;
});

btn_tambahKategori.addEventListener("click", function (event) {
    let myValue = select_kategori_utama.value.slice(1);
    $.ajax({
        url: "/Maintenance/TambahKategori",
        type: "POST",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        beforeSend: function () {
            // Show loading screen
            $("#loading-screen").css("display", "flex");
        },
        data: {
            no_kat_utama: myValue,
            nama_kategori: tambah_kategori.value,
        },
        success: function (response) {
            Swal.fire({
                icon: "success",
                title: "Data Berhasil DiTambahkan!",
                showConfirmButton: false,
                timer: "2000",
            });
            tambah_kategori.value = "";
            optionClr();
            kategori(myValue, function () {});
        },
        error: function (error) {
            Swal.fire({
                icon: "error",
                title: "Data Tidak Berhasil DiTambahkan!",
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
btn_tambahSubKategori.addEventListener("click", function (event) {
    $.ajax({
        url: "/Maintenance/TambahSubKategori",
        type: "POST",
        headers: {
            "X-CSRF-TOKEN": csrfToken,
        },
        beforeSend: function () {
            // Show loading screen
            $("#loading-screen").css("display", "flex");
        },
        data: {
            no_kategori: select_kategori.value,
            nama_sub_kategori: tambah_subKategori.value,
        },
        success: function (response) {
            Swal.fire({
                icon: "success",
                title: "Data Berhasil DiTambahkan!",
                showConfirmButton: false,
                timer: "2000",
            });
            tambah_subKategori.value = "";
            select_subKategori.selectedIndex = 0;
            clearOptions(select_subKategori);
            $("#table_namaBarang").DataTable().clear().destroy();
            subKategori(select_kategori.value, function () {});
        },
        error: function (error) {
            Swal.fire({
                icon: "error",
                title: "Data Tidak Berhasil DiTambahkan!",
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
btn_namaBarang.addEventListener("click", function (event) {
    let table = $("#table_cekNamaBarang").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        destroy: true,
        ajax: {
            url: "/Maintenance/CekNamaBarang",
            type: "GET",
            data: function (data) {
                data.namaBarang = nama_Barang.value.trim();
            },
            beforeSend: function (xhr) {
                requestCekNamaBarang = xhr;
            },
        },
        columns: [
            { data: "nama_sub_kategori" },
            { data: "KD_BRG" },
            { data: "NAMA_BRG" },
        ],
    });
});

function abortCekNamaBarang() {
    if (requestCekNamaBarang) {
        requestCekNamaBarang.abort();
    }
}

select_kategori_utama.addEventListener("change", function (event) {
    optionClr();
    let myValue = select_kategori_utama.value.slice(1);
    kategori(myValue, function () {
        select_kategori.disabled = false;
        btn_tambah_kategori.disabled = false;
        select_subKategori.disabled = true;
        btn_cekNamaBarang.disabled = true;
    });
});

select_kategori.addEventListener("change", function (event) {
    select_subKategori.selectedIndex = 0;
    clearOptions(select_subKategori);
    $("#table_namaBarang").DataTable().clear().destroy();
    let myValue = select_kategori.value;
    subKategori(myValue, function () {
        select_subKategori.disabled = false;
        btn_tambah_subKategori.disabled = false;
        btn_cekNamaBarang.disabled = true;
    });
});

select_subKategori.addEventListener("change", function (event) {
    $("#table_namaBarang").DataTable().clear().destroy();
    let myValue = select_subKategori.value;
    namaBarang(myValue);
    if (btnActive == "isi") {
        btn_cekNamaBarang.disabled = true;
    } else {
        btn_cekNamaBarang.disabled = false;
    }
});

function clearOptions(selectElement) {
    let length = selectElement.options.length;

    for (let i = length - 1; i > 0; i--) {
        selectElement.remove(i);
    }
}
function optionClr() {
    select_kategori.selectedIndex = 0;
    clearOptions(select_kategori);
    select_subKategori.selectedIndex = 0;
    clearOptions(select_subKategori);
    $("#table_namaBarang").DataTable().clear().destroy();
}
function clearData() {
    labelExport.style.display = "none";
    tamValueNamaBrg = "";
    kd_barang.value = "";
    nama_Barang.value = "";
    ket_khusus.value = "";
    org_penjaluk.value = "";
    ket_barang.value = "";
    select_kategori_utama.selectedIndex = 0;
    optionClr();
    select_jenisPembelian.selectedIndex = 0;
    select_satuanPrimer.selectedIndex = 0;
    select_satuanSekunder.selectedIndex = 0;
    select_satuanTritier.selectedIndex = 0;
    select_satuanUmum.selectedIndex = 0;
    select_spek.selectedIndex = 0;
    check_barangSama.checked = false;
    check_round.checked = false;
    check_export.checked = false;
    check_spek.checked = false;
    textBox1.value = "";
    textBox2.value = "";
    textBox3.value = "";
    textBox4.value = "";
    textBox5.value = "";
    textBox6.value = "";
    textBox7.value = "";
    textBox8.value = "";
    textBox9.value = "";
    textBox10.value = "";
    textBox11.value = "";
    textBox12.value = "";
    textBox13.value = "";
    textBox14.value = "";
    textBox15.value = "";
    textBox16.value = "";
}

function cariKodeBarang(kd_barang) {
    while (kd_barang.length < 9) {
        kd_barang = "0" + kd_barang;
    }
    kdBarangAslinya = kd_barang;
    $.ajax({
        url: "/Maintenance/KodeBarang",
        type: "GET",
        data: {
            kodeBarang: kd_barang,
        },
        beforeSend: function () {
            // Show loading screen
            $("#loading-screen").css("display", "flex");
        },
        success: function (response) {
            dataRes = response[0];
            console.log(response);
            if (response.length == 0) {
                alert(`Kode barang ${kd_barang} tidak dapat ditemukan`);
                clearData();
                btn_tambah_kategori.disabled = true;
                btn_tambah_subKategori.disabled = true;
                btn_cekNamaBarang.disabled = true;
                select_kategori.disabled = true;
                select_subKategori.disabled = true;
                document.getElementById("kd_barang").focus();
            } else {
                btn_tambah_kategori.disabled = false;
                btn_tambah_subKategori.disabled = false;
                select_kategori.disabled = false;
                select_subKategori.disabled = false;
                kategori(response[0].no_kat_utama, function () {
                    for (let i = 0; i < select_kategori.options.length; i++) {
                        if (
                            select_kategori.options[i].text.replace(
                                /\s/g,
                                ""
                            ) === response[0].nama_kategori.replace(/\s/g, "")
                        ) {
                            select_kategori.selectedIndex = i;
                        }
                    }
                });

                subKategori(response[0].no_kategori, function () {
                    for (
                        let i = 0;
                        i < select_subKategori.options.length;
                        i++
                    ) {
                        if (
                            select_subKategori.options[i].text.replace(
                                /\s/g,
                                ""
                            ) ===
                            response[0].nama_sub_kategori.replace(/\s/g, "")
                        ) {
                            select_subKategori.selectedIndex = i;
                        }
                    }
                });
                nama_Barang.value = response[0].NAMA_BRG;
                if (btnActive != "isi") {
                    $("#table_namaBarang").DataTable().clear().destroy();
                    namaBarang(response[0].no_sub_kategori);
                } else {
                }

                for (let i = 0; i < select_kategori_utama.options.length; i++) {
                    if (
                        select_kategori_utama.options[i].text.replace(
                            /\s/g,
                            ""
                        ) === response[0].nama.replace(/\s/g, "")
                    ) {
                        select_kategori_utama.selectedIndex = i;
                    }
                }
                if (response[0].KDSPEC != null) {
                    check_spek.checked = true;
                    for (let i = 0; i < select_spek.options.length; i++) {
                        if (
                            select_spek.options[i].value.replace(/\s/g, "") ===
                            response[0].KDSPEC.replace(/\s/g, "")
                        ) {
                            select_spek.selectedIndex = i;
                        }
                    }
                } else {
                    check_spek.checked = false;
                    select_spek.selectedIndex = 0;
                }
                ket_khusus.value = response[0].KET_KHUSUS;
                ket_barang.value = response[0].KET;
                org_penjaluk.value = response[0].PENJALUK;
                if (response[0].kriteria != 0) {
                    select_jenisPembelian.selectedIndex = 1;
                } else {
                    select_jenisPembelian.selectedIndex = 0;
                }

                if (response[0].no_kategori == "011") {
                    check_export.disabled = false;
                    labelExport.style.display = "block";
                } else {
                    check_export.disabled = true;
                    labelExport.style.display = "none";
                }
                if (response[0].Barang_Eksport == "Y") {
                    check_export.checked = true;
                } else {
                    check_export.checked = false;
                }
                if (response[0].ROUND == "Y") {
                    check_round.checked = true;
                } else {
                    check_round.checked = false;
                }
                for (let i = 0; i < select_satuanPrimer.options.length; i++) {
                    if (
                        select_satuanPrimer.options[i].value ===
                        response[0].ST_PRIM
                    ) {
                        select_satuanPrimer.selectedIndex = i;
                    }
                }
                for (let i = 0; i < select_satuanSekunder.options.length; i++) {
                    if (
                        select_satuanSekunder.options[i].value ===
                        response[0].ST_SEK
                    ) {
                        select_satuanSekunder.selectedIndex = i;
                    }
                }
                for (let i = 0; i < select_satuanTritier.options.length; i++) {
                    if (
                        select_satuanTritier.options[i].value ===
                        response[0].ST_TRI
                    ) {
                        select_satuanTritier.selectedIndex = i;
                    }
                }
                for (let i = 0; i < select_satuanUmum.options.length; i++) {
                    if (
                        select_satuanUmum.options[i].value ===
                        response[0].NO_SATUAN_UMUM
                    ) {
                        select_satuanUmum.selectedIndex = i;
                    }
                }
                MySpesifikasi = parseInt(response[0].no_sub_kategori);
                switch (MySpesifikasi) {
                    case SpesifikasiType.BenangExtruder:
                        PecahBenang(response[0].NAMA_BRG.replace(/\s/g, ""));
                        break;
                    case SpesifikasiType.Gelondongan:
                        PecahGelondongan(
                            response[0].NAMA_BRG.replace(/\s/g, "")
                        );
                        break;
                    case SpesifikasiType.InnerGelondongan:
                        PecahInnerGelondongan(
                            response[0].NAMA_BRG.replace(/\s/g, "")
                        );
                        break;
                    case SpesifikasiType.PolybagGelondonganLDPE:
                        PecahInnerGelondongan(
                            response[0].NAMA_BRG.replace(/\s/g, "")
                        );
                        break;
                    case SpesifikasiType.PolybagGelondonganLLDPE:
                        PecahInnerGelondongan(
                            response[0].NAMA_BRG.replace(/\s/g, "")
                        );
                        break;
                    case SpesifikasiType.PolybagHDPE:
                        PecahInnerHasilPotong(
                            response[0].NAMA_BRG.replace(/\s/g, "")
                        );
                        break;
                    case SpesifikasiType.PolybagLDPE:
                        PecahInnerHasilPotong(
                            response[0].NAMA_BRG.replace(/\s/g, "")
                        );
                        break;
                    case SpesifikasiType.PolybagLDPP:
                        PecahInnerHasilPotong(
                            response[0].NAMA_BRG.replace(/\s/g, "")
                        );
                        break;
                    case SpesifikasiType.PolybagLLDPE:
                        PecahInnerHasilPotong(
                            response[0].NAMA_BRG.replace(/\s/g, "")
                        );
                        break;
                    case SpesifikasiType.PolybagPE:
                        PecahInnerHasilPotong(
                            response[0].NAMA_BRG.replace(/\s/g, "")
                        );
                        break;
                    case SpesifikasiType.KarungWovenBag:
                        PecahKarungWovenBag(
                            response[0].NAMA_BRG.replace(/\s/g, "")
                        );
                        break;
                    default:
                        break;
                }
                nama_Barang.focus();
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
        complete: function () {
            // Hide loading screen
            $("#loading-screen").css("display", "none");
        },
    });
    if (btnActive == "isi") {
        btn_cekNamaBarang.disabled = true;
    } else {
        btn_cekNamaBarang.disabled = false;
    }
}

function kategori(MyValue, callback) {
    $.ajax({
        url: "/Maintenance/Kategori",
        type: "GET",
        data: {
            MyValue: MyValue,
        },
        success: function (response) {
            response.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.no_kategori;
                option.text = data.nama_kategori;
                select_kategori.add(option);
            });
            if (typeof callback === "function") {
                callback();
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
}
function subKategori(MyValue, callback) {
    $.ajax({
        url: "/Maintenance/SubKategori",
        type: "GET",
        data: {
            MyValue: MyValue,
        },
        success: function (response) {
            response.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.no_sub_kategori;
                option.text = data.nama_sub_kategori;
                select_subKategori.add(option);
            });
            if (typeof callback === "function") {
                callback();
            }
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
}
function namaBarang(MyValue) {
    let table = $("#table_namaBarang").DataTable({
        responsive: true,
        processing: true,
        serverSide: true,
        ajax: {
            url: "/Maintenance/NamaBarang",
            type: "GET",
            data: function (data) {
                data.MyValue = MyValue;
            },
        },
        columns: [{ data: "KD_BRG" }, { data: "NAMA_BRG" }],
        rowCallback: function (row, data) {
            $(row).on("click", function (event) {
                clearData();
                cariKodeBarang(data.KD_BRG);
                kd_barang.value = data.KD_BRG;
            });
        },
    });
}

function PecahBenang(TypeBrg) {
    try {
        let MyStart = 0;
        let MySearchChar = "";
        let MyPos = 0;
        let LongOfMyString = TypeBrg.length;

        // E
        MyStart = 0;
        MySearchChar = "-";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let E = TypeBrg.substring(MyStart, MyPos);
        textBox1.value = E;

        // Ukuran
        MyStart = MyPos + 1;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Ukuran = TypeBrg.substring(MyStart, MyPos);
        textBox2.value = Ukuran;

        // Denier
        MyStart = MyPos + 1;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Denier = TypeBrg.substring(MyStart, MyPos);
        textBox3.value = Denier;

        // Warna
        MyStart = MyPos + 1;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Warna = TypeBrg.substring(MyStart, MyPos);
        textBox4.value = Warna;

        // Good-NoGood
        MyStart = MyPos + 1;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let GoodNoGood = TypeBrg.substring(MyStart, MyPos);
        textBox5.value = GoodNoGood;

        // UV-NoUV
        MyStart = MyPos + 1;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let UVNoUV = "";
        let AntiStatic = "";
        let WithDB = "";

        if (MyPos === -1) {
            UVNoUV = TypeBrg.substring(MyStart);
            textBox6.value = UVNoUV;
            textBox7.value = "";
        } else {
            UVNoUV = TypeBrg.substring(MyStart, MyPos);
            textBox6.value = UVNoUV;

            // AntiStatic
            MyStart = MyPos + 1;
            MyPos = TypeBrg.indexOf(MySearchChar, MyStart);

            if (MyPos === -1) {
                AntiStatic = TypeBrg.substring(MyStart);
                textBox7.value = AntiStatic;
            } else {
                AntiStatic = TypeBrg.substring(MyStart, MyPos);
                textBox7.value = AntiStatic;
            }

            if (MyPos !== -1) {
                // With DB
                MyStart = MyPos + 1;
                MyPos = TypeBrg.indexOf(MySearchChar, MyStart);

                if (MyPos === -1) {
                    WithDB = TypeBrg.substring(MyStart);
                    textBox8.value = WithDB;
                } else {
                    WithDB = TypeBrg.substring(MyStart, MyPos);
                    textBox8.value = WithDB;
                }
            }
        }

        if (AntiStatic !== "") {
            if (WithDB !== "") {
                tamValueNamaBrg =
                    E +
                    "-" +
                    Ukuran +
                    "-" +
                    Denier +
                    "-" +
                    Warna +
                    "-" +
                    GoodNoGood +
                    "-" +
                    UVNoUV +
                    "-" +
                    AntiStatic +
                    "-" +
                    WithDB;
            } else {
                tamValueNamaBrg =
                    E +
                    "-" +
                    Ukuran +
                    "-" +
                    Denier +
                    "-" +
                    Warna +
                    "-" +
                    GoodNoGood +
                    "-" +
                    UVNoUV +
                    "-" +
                    AntiStatic;
            }
        } else {
            tamValueNamaBrg =
                E +
                "-" +
                Ukuran +
                "-" +
                Denier +
                "-" +
                Warna +
                "-" +
                GoodNoGood +
                "-" +
                UVNoUV;
        }
    } catch (error) {
        console.error(error.message);
        alert("Error: " + error.message);
    }
}
function PecahGelondongan(TypeBrg) {
    try {
        let MyStart = 0;
        let MySearchChar = "";
        let MyPos = 0;
        let LongOfMyString = TypeBrg.length;

        let BeforePoint = "";
        let AfterPoint = "";
        let LongOfValue = 0;
        let MyInStart = 0;
        let MyInPos = 0;

        // No.Order
        MyStart = 0;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let NoOrder = TypeBrg.substring(MyStart, MyPos);
        textBox1.value = NoOrder;

        // Lebar
        let Lebar = "";
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        Lebar = TypeBrg.substring(MyStart, MyPos).trim();
        try {
            MySearchChar = ".";
            MyInStart = 0;
            MyInPos = Lebar.indexOf(MySearchChar, MyInStart);
            BeforePoint = Lebar.substring(0, MyInPos).trim().padStart(3, " ");
            AfterPoint = Lebar.substring(MyInPos + 1, MyInPos + 3)
                .trim()
                .padEnd(2, "0");
            Lebar = BeforePoint + "." + AfterPoint;
        } catch (error) {
            Lebar = Lebar.trim().padStart(3, " ") + ".00";
        }
        textBox2.value = Lebar;

        // Wapf
        let Wapf = "";
        MyStart = MyPos + 1;
        MySearchChar = "X";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        Wapf = TypeBrg.substring(MyStart, MyPos).trim();
        try {
            MySearchChar = ".";
            MyInStart = 0;
            MyInPos = Wapf.indexOf(MySearchChar, MyInStart);
            BeforePoint = Wapf.substring(0, MyInPos).trim().padStart(2, "0");
            AfterPoint = Wapf.substring(MyInPos + 1, MyInPos + 3)
                .trim()
                .padEnd(2, "0");
            Wapf = BeforePoint + "." + AfterPoint + " ";
        } catch (error) {
            Wapf = Wapf.trim().padStart(2, "0") + ".00 ";
        }
        textBox3.value = Wapf;

        // Wepf
        let Wepf = "";
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        Wepf = TypeBrg.substring(MyStart, MyPos).trim();
        try {
            MySearchChar = ".";
            MyInStart = 0;
            MyInPos = Wepf.indexOf(MySearchChar, MyInStart);
            BeforePoint = Wepf.substring(0, MyInPos).trim().padStart(2, "0");
            AfterPoint = Wepf.substring(MyInPos + 1, MyInPos + 3)
                .trim()
                .padEnd(2, "0");
            Wepf = " " + BeforePoint + "." + AfterPoint;
        } catch (error) {
            Wepf = " " + Wepf.trim().padStart(2, "0") + ".00";
        }
        textBox4.value = Wepf;

        // Denier
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Denier = TypeBrg.substring(MyStart, MyPos).trim().padStart(5, " ");
        textBox5.value = Denier;

        // Corak
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Corak = TypeBrg.substring(MyStart, MyPos).trim().padEnd(7, " ");
        textBox6.value = Corak;

        // Bahan
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Bahan = TypeBrg.substring(MyStart, MyPos).trim().padEnd(4, " ");
        textBox7.value = Bahan;

        // Keterangan
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Keterangan = TypeBrg.substring(MyStart, MyPos).trim();
        let LReinf = "0";
        let JmlReinf = "0";
        let WrnReinf = "  ";
        let JmlStripReinf = "00";
        let JrkReinf = "00";
        let WrnStrip = "  ";
        let JmlStripReinf2 = "00";
        let Keterangan2 = "-";
        let PanjangPotongan = "0";

        if (MyPos === -1) {
            Keterangan = TypeBrg.substring(MyStart).trim();
            textBox8.value = Keterangan;
            textBox9.value = LReinf;
            textBox10.value = JmlReinf;
            textBox11.value = WrnReinf;
            textBox12.value = JmlStripReinf;
            textBox13.value = JrkReinf;
            textBox14.value = WrnStrip;
            textBox15.value = JmlStripReinf2;
            textBox16.value = Keterangan2;
            return;
        } else {
            Keterangan = TypeBrg.substring(MyStart, MyPos).trim();
            textBox8.value = Keterangan;
        }

        // LReinf
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            LReinf = TypeBrg.substring(MyStart).trim();
            textBox9.value = LReinf;
            textBox10.value = JmlReinf;
            textBox11.value = WrnReinf;
            textBox12.value = JmlStripReinf;
            textBox13.value = JrkReinf;
            textBox14.value = WrnStrip;
            textBox15.value = JmlStripReinf2;
            textBox16.value = Keterangan2;
            return;
        } else {
            LReinf = TypeBrg.substring(MyStart, MyPos).trim();
            textBox9.value = LReinf;
        }

        // JmlReinf
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            JmlReinf = TypeBrg.substring(MyStart).trim();
            textBox10.value = JmlReinf;
            textBox11.value = WrnReinf + "-" + JmlStripReinf;
            textBox12.value = JrkReinf;
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
            textBox14.value = Keterangan2;
            return;
        } else {
            JmlReinf = TypeBrg.substring(MyStart, MyPos).trim();
            textBox10.value = JmlReinf;
        }

        // WarnaReinf
        MyStart = MyPos + 1;
        MySearchChar = "-";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            WrnReinf = TypeBrg.substring(MyStart)
                .trim()
                .padStart(2, " ")
                .substr(0, 2);
            textBox11.value = WrnReinf + "-" + JmlStripReinf;
            textBox12.value = JrkReinf;
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
            textBox14.value = Keterangan2;
            return;
        } else {
            WrnReinf = TypeBrg.substring(MyStart, MyPos).trim().padEnd(2, " ");
            textBox11.value = WrnReinf + "-" + JmlStripReinf;
        }

        // Jumlah strip Reinf
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            JmlStripReinf = TypeBrg.substring(MyStart).trim();
            textBox11.value = WrnReinf + "-" + JmlStripReinf;
            textBox12.value = JrkReinf;
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
            textBox14.value = Keterangan2;
            return;
        } else {
            JmlStripReinf = TypeBrg.substring(MyStart, MyPos).trim();
            textBox11.value = WrnReinf + "-" + JmlStripReinf;
        }

        // Jarak Reinf
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            JrkReinf = TypeBrg.substring(MyStart).trim();
            textBox12.value = JrkReinf;
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
            textBox14.value = Keterangan2;
            return;
        } else {
            JrkReinf = TypeBrg.substring(MyStart, MyPos).trim();
            textBox12.value = JrkReinf;
        }

        // Warna Strip
        MyStart = MyPos + 1;
        MySearchChar = "-";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            WrnStrip = TypeBrg.substring(MyStart).trim().padEnd(2, " ");
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
            textBox14.value = Keterangan2;
            return;
        } else {
            WrnStrip = TypeBrg.substring(MyStart, MyPos).trim().padEnd(2, " ");
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
        }

        // jmlstrip reinforce 2
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            JmlStripReinf2 = TypeBrg.substring(MyStart).trim();
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
            textBox14.value = Keterangan2;
            return;
        } else {
            JmlStripReinf2 = TypeBrg.substring(MyStart, MyPos).trim();
            textBox13.value = WrnStrip + "-" + JmlStripReinf2;
        }

        // keterangan2
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            Keterangan2 = TypeBrg.substring(MyStart).trim();
            textBox14.value = Keterangan2;
            return;
        } else {
            Keterangan2 = TypeBrg.substring(MyStart, MyPos).trim();
            textBox14.value = Keterangan2;
        }

        // panjang potongan (cm)
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            PanjangPotongan = TypeBrg.substring(MyStart).trim();
            textBox15.value = PanjangPotongan;
            return;
        } else {
            PanjangPotongan = TypeBrg.substring(MyStart, MyPos).trim();
            textBox15.value = PanjangPotongan;
        }

        tamValueNamaBrg =
            NoOrder +
            "/" +
            Lebar +
            "/" +
            Wapf +
            "X" +
            Wepf +
            "/" +
            Denier +
            "/" +
            Corak +
            "/" +
            Bahan +
            "/" +
            Keterangan +
            "/" +
            LReinf +
            "/" +
            JmlReinf +
            "/" +
            WrnReinf +
            "-" +
            JmlStripReinf +
            "/" +
            JrkReinf +
            "/" +
            WrnStrip +
            "-" +
            JmlStripReinf2 +
            "/" +
            Keterangan2 +
            "/" +
            PanjangPotongan;
    } catch (error) {
        switch (error.number) {
            case 5:
                textBox1.value = "";
                textBox2.value = "";
                textBox3.value = "";
                break;
            default:
                alert(error.message + ". Error# " + error.number);
        }
    }
}
function PecahInnerGelondongan(TypeBrg) {
    try {
        let MyStart = 0;
        let MySearchChar = "/";
        let MyPos = 0;
        let LongOfMyString = TypeBrg.length;

        // Tebal
        MyStart = 0;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Tebal = TypeBrg.substring(MyStart, MyPos).trim();
        textBox1.value = Tebal;

        // Lebar
        MyStart = MyPos + 1;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Lebar = TypeBrg.substring(MyStart, MyPos).trim();
        // Lebar = Lebar.substring(Lebar.length - 4);
        textBox2.value = Lebar;

        // Warna
        MyStart = MyPos + 1;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Warna = TypeBrg.substring(MyStart, MyPos).trim();
        textBox3.value = Warna;

        // Bahan
        MyStart = MyPos + 1;
        MySearchChar = "-";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Bahan = "";
        if (MyPos === -1) {
            Bahan = TypeBrg.substring(MyStart).trim();
        } else {
            Bahan = TypeBrg.substring(MyStart, MyPos).trim();
        }
        textBox4.value = Bahan;
        tamValueNamaBrg = Tebal + "/" + Lebar + "/" + Warna + "/" + Bahan;
    } catch (error) {
        alert(error.message);
    }
}

function PecahInnerHasilPotong(TypeBrg) {
    try {
        let MyStart = 0;
        let MySearchChar = "/";
        let MyPos = 0;
        let LongOfMyString = TypeBrg.length;

        // Tebal
        MyStart = 0;
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Tebal = TypeBrg.substring(MyStart, MyPos).trim();
        textBox1.value = Tebal;

        // Panjang
        MyStart = MyPos + 1;
        MySearchChar = "X";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Panjang = TypeBrg.substring(MyStart, MyPos).trim();
        textBox2.value = Panjang;

        // Lebar
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Lebar = TypeBrg.substring(MyStart, MyPos).trim();
        textBox3.value = Lebar;

        // Seal
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Seal = TypeBrg.substring(MyStart, MyPos).trim();
        textBox4.value = Seal;

        // Warna
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Warna = TypeBrg.substring(MyStart, MyPos).trim();
        textBox5.value = Warna;

        // Bahan
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Bahan = "";
        if (MyPos === -1) {
            Bahan = TypeBrg.substring(MyStart).trim();
        } else {
            Bahan = TypeBrg.substring(MyStart, MyPos).trim();
        }
        textBox6.value = Bahan;
        tamValueNamaBrg =
            Tebal +
            "/" +
            Panjang +
            "X" +
            Lebar +
            "/" +
            Seal +
            "/" +
            Warna +
            "/" +
            Bahan;
    } catch (error) {
        alert(error.message);
    }
}
function PecahKarungWovenBag(TypeBrg) {
    try {
        let MyStart = 0;
        let MySearchChar = "/";
        let MyPos = 0;
        let LongOfMyString = TypeBrg.length;

        let BeforePoint = "";
        let AfterPoint = "";
        let LongOfValue = 0;
        let MyInStart = 0;
        let MyInPos = 0;

        // Lebar
        let Lebar = "";
        MySearchChar = "+";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        Lebar = TypeBrg.substring(MyStart, MyPos).trim();
        LongOfValue = Lebar.length;
        try {
            MySearchChar = ".";
            MyInPos = Lebar.indexOf(MySearchChar, MyInStart);
            BeforePoint = Lebar.substring(MyInStart, MyInPos).trim();
            AfterPoint = Lebar.substring(MyInPos + 1, MyInPos + 2).trim();
            Lebar = BeforePoint + "." + AfterPoint;
        } catch (error) {
            Lebar = Lebar + ".0";
        }
        textBox1.value = Lebar;

        // Gaset
        let Gaset = "";
        MyStart = MyPos + 1;
        MySearchChar = "X";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        Gaset = TypeBrg.substring(MyStart, MyPos).trim();
        LongOfValue = Gaset.length;
        try {
            MySearchChar = ".";
            MyInPos = Gaset.indexOf(MySearchChar, MyInStart);
            BeforePoint = Gaset.substring(MyInStart, MyInPos).trim();
            AfterPoint = Gaset.substring(MyInPos + 1, MyInPos + 2).trim();
            Gaset = BeforePoint + "." + AfterPoint;
        } catch (ex) {
            Gaset = Gaset + ".0";
        }
        textBox2.value = Gaset;

        // Panjang
        let Panjang = "";
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        Panjang = TypeBrg.substring(MyStart, MyPos).trim();
        LongOfValue = Panjang.length;
        try {
            MySearchChar = ".";
            MyInPos = Panjang.indexOf(MySearchChar, MyInStart);
            BeforePoint = Panjang.substring(MyInStart, MyInPos).trim();
            AfterPoint = Panjang.substring(MyInPos + 1, MyInPos + 2).trim();
            Panjang = BeforePoint + "." + AfterPoint;
        } catch (error) {
            Panjang = Panjang + ".0";
        }
        textBox3.value = Panjang;

        // Wapf
        let Wapf = "";
        MyStart = MyPos + 1;
        MySearchChar = "X";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        Wapf = TypeBrg.substring(MyStart, MyPos).trim();
        LongOfValue = Wapf.length;
        try {
            MySearchChar = ".";
            MyInPos = Wapf.indexOf(MySearchChar, MyInStart);
            BeforePoint = Wapf.substring(MyInStart, MyInPos).trim();
            AfterPoint = Wapf.substring(MyInPos + 1, MyInPos + 2).trim();
            Wapf = BeforePoint + "." + AfterPoint;
        } catch (error) {
            Wapf = Wapf + ".0";
        }
        textBox4.value = Wapf;

        // Weft
        let Weft = "";
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        Weft = TypeBrg.substring(MyStart, MyPos).trim();
        LongOfValue = Weft.length;
        try {
            MySearchChar = ".";
            MyInPos = Weft.indexOf(MySearchChar, MyInStart);
            BeforePoint = Weft.substring(MyInStart, MyInPos).trim();
            AfterPoint = Weft.substring(MyInPos + 1, MyInPos + 2).trim();
            Weft = BeforePoint + "." + AfterPoint;
        } catch (ex) {
            Weft = Weft + ".0";
        }
        textBox5.value = Weft;

        // Denier
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Denier = TypeBrg.substring(MyStart, MyPos).trim();
        textBox6.value = Denier;

        // Warna / Corak
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Warna = TypeBrg.substring(MyStart, MyPos).trim();
        textBox7.value = Warna;

        // Mark
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        let Mark = "";
        let Keterangan = "";
        let Lami = "-";
        let Inner = "-";
        let Ass = "-";
        if (MyPos === -1) {
            Mark = TypeBrg.substring(MyStart).trim();
            textBox8.value = Mark;
            Keterangan = "-";
            textBox9.value = Keterangan;
            textBox10.value = Inner;
            return;
        } else {
            Mark = TypeBrg.substring(MyStart, MyPos).trim();
            textBox8.value = Mark;
        }

        // Type Jahit
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            Keterangan = TypeBrg.substring(MyStart).trim();
            textBox9.value = Keterangan;
            textBox10.value = Inner;
            return;
        } else {
            Keterangan = TypeBrg.substring(MyStart, MyPos).trim();
            textBox9.value = Keterangan;
        }

        // Lami
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            Lami = TypeBrg.substring(MyStart).trim();
            textBox10.value = Lami;
            return;
        } else {
            Lami = TypeBrg.substring(MyStart, MyPos).trim();
            textBox10.value = Lami;
        }

        // Inner
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            Inner = TypeBrg.substring(MyStart).trim();
            textBox11.value = Inner;
            return;
        } else {
            Inner = TypeBrg.substring(MyStart, MyPos).trim();
            textBox11.value = Inner;
        }

        // Assesories
        MyStart = MyPos + 1;
        MySearchChar = "/";
        MyPos = TypeBrg.indexOf(MySearchChar, MyStart);
        if (MyPos === -1) {
            Ass = TypeBrg.substring(MyStart).trim();
            textBox12.value = Ass;
            return;
        } else {
            Ass = TypeBrg.substring(MyStart, MyPos).trim();
            textBox12.value = Ass;
        }

        let TextNamaBarang =
            Lebar +
            "+" +
            Gaset +
            "X" +
            Panjang +
            "/" +
            Wapf +
            "X" +
            Weft +
            "/" +
            Denier +
            "/" +
            Warna +
            "/" +
            Mark +
            "/" +
            Keterangan +
            "/" +
            Inner +
            "/" +
            Lami +
            "/" +
            Ass;
        tamValueNamaBrg = TextNamaBarang;
    } catch (error) {
        alert(error.message);
    }
}

function disableAll() {
    kd_barang.disabled = true;
    select_kategori_utama.disabled = true;
    select_kategori.disabled = true;
    select_subKategori.disabled = true;
    ket_khusus.disabled = true;
    btn_cekNamaBarang.disabled = true;
    nama_Barang.disabled = true;
    ket_barang.disabled = true;
    select_jenisPembelian.disabled = true;
    check_barangSama.disabled = true;
    check_round.disabled = true;
    org_penjaluk.disabled = true;
    select_satuanPrimer.disabled = true;
    select_satuanSekunder.disabled = true;
    select_satuanTritier.disabled = true;
    select_satuanUmum.disabled = true;
    btn_cari_kdBarang.disabled = true;
    btn_tambah_kategoriUtama.disabled = true;
    btn_tambah_kategori.disabled = true;
    btn_tambah_subKategori.disabled = true;
    btn_namaBarang.disabled = true;
    btn_proses.disabled = true;
    btn_batal.disabled = true;
}
function enableElements() {
    kd_barang.disabled = false;
    select_kategori_utama.disabled = false;
    ket_khusus.disabled = false;
    ket_barang.disabled = false;
    select_jenisPembelian.disabled = false;
    check_barangSama.disabled = false;
    check_round.disabled = false;
    org_penjaluk.disabled = false;
    select_satuanPrimer.disabled = false;
    select_satuanSekunder.disabled = false;
    select_satuanTritier.disabled = false;
    select_satuanUmum.disabled = false;
    btn_cari_kdBarang.disabled = false;
    btn_tambah_kategoriUtama.disabled = false;
    btn_namaBarang.disabled = false;
    btn_batal.disabled = false;
    nama_Barang.disabled = false;
}

$(document).ready(function () {
    disableAll();

    $.ajax({
        url: "/Maintenance/Data",
        type: "GET",
        success: function (response) {
            let kategoriUtama = response.kategoriUtama;
            let jenisPembelian = response.jenisPembelian;
            let satuanList = response.satuanList;
            let spek = response.spek;
            kategoriUtama.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.no_kat_utama;
                option.text = data.nama;
                select_kategori_utama.add(option);
            });
            jenisPembelian.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.kode;
                option.text = data.keterangan;
                select_jenisPembelian.add(option);
            });
            satuanList.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.No_satuan;
                option.text = data.Nama_satuan;
                select_satuanPrimer.add(option);
            });
            satuanList.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.No_satuan;
                option.text = data.Nama_satuan;
                select_satuanSekunder.add(option);
            });
            satuanList.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.No_satuan;
                option.text = data.Nama_satuan;
                select_satuanTritier.add(option);
            });
            satuanList.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.No_satuan;
                option.text = data.Nama_satuan;
                select_satuanUmum.add(option);
            });
            spek.forEach(function (data) {
                let option = document.createElement("option");
                option.value = data.KDSPEC;
                option.text = data.RAJUTAN;
                select_spek.add(option);
            });
        },
        error: function (error) {
            console.error("Error Fetch Data:", error);
        },
    });
});
