jQuery(function ($) {
    let csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    let labelProses = document.getElementById("labelProses");
    let tanggal = document.getElementById("tanggal");
    let tgl_awal = document.getElementById("tgl_awal");
    let tgl_akhir = document.getElementById("tgl_akhir");
    let btn_redisplay = document.getElementById("btn_redisplay");
    let btn_simpanKet = document.getElementById("btn_simpanKet");
    let btn_simpanKetD = document.getElementById("btn_simpanKetD");
    //#region Inisialisasi ID Laporan
    let referensi = document.getElementById("referensi");
    let halaman = document.getElementById("halaman");
    let effisiensi = document.getElementById("effisiensi");
    // let shiftSelector = document.getElementById("shiftSelector");
    let shiftValue = document.getElementById("shiftValue");
    let timeStart = document.getElementById("timeStart");
    let timeEnd = document.getElementById("timeEnd");
    let spek_mesin = document.getElementById("spek_mesin");
    let spek_benang = document.getElementById("spek_benang");
    let timeA = document.getElementById("timeA");
    let timeB = document.getElementById("timeB");
    let timeC = document.getElementById("timeC");
    let timeD = document.getElementById("timeD");
    let timeE = document.getElementById("timeE");
    let timeF = document.getElementById("timeF");
    let timeG = document.getElementById("timeG");
    let c1A = document.getElementById("c1A");
    let c1B = document.getElementById("c1B");
    let c1C = document.getElementById("c1C");
    let c1D = document.getElementById("c1D");
    let c1E = document.getElementById("c1E");
    let c1F = document.getElementById("c1F");
    let c1G = document.getElementById("c1G");
    let c2A = document.getElementById("c2A");
    let c2B = document.getElementById("c2B");
    let c2C = document.getElementById("c2C");
    let c2D = document.getElementById("c2D");
    let c2E = document.getElementById("c2E");
    let c2F = document.getElementById("c2F");
    let c2G = document.getElementById("c2G");
    let c3A = document.getElementById("c3A");
    let c3B = document.getElementById("c3B");
    let c3C = document.getElementById("c3C");
    let c3D = document.getElementById("c3D");
    let c3E = document.getElementById("c3E");
    let c3F = document.getElementById("c3F");
    let c3G = document.getElementById("c3G");
    let c4A = document.getElementById("c4A");
    let c4B = document.getElementById("c4B");
    let c4C = document.getElementById("c4C");
    let c4D = document.getElementById("c4D");
    let c4E = document.getElementById("c4E");
    let c4F = document.getElementById("c4F");
    let c4G = document.getElementById("c4G");
    let c5A = document.getElementById("c5A");
    let c5B = document.getElementById("c5B");
    let c5C = document.getElementById("c5C");
    let c5D = document.getElementById("c5D");
    let c5E = document.getElementById("c5E");
    let c5F = document.getElementById("c5F");
    let c5G = document.getElementById("c5G");
    let c6A = document.getElementById("c6A");
    let c6B = document.getElementById("c6B");
    let c6C = document.getElementById("c6C");
    let c6D = document.getElementById("c6D");
    let c6E = document.getElementById("c6E");
    let c6F = document.getElementById("c6F");
    let c6G = document.getElementById("c6G");
    let c7A = document.getElementById("c7A");
    let c7B = document.getElementById("c7B");
    let c7C = document.getElementById("c7C");
    let c7D = document.getElementById("c7D");
    let c7E = document.getElementById("c7E");
    let c7F = document.getElementById("c7F");
    let c7G = document.getElementById("c7G");
    let c8A = document.getElementById("c8A");
    let c8B = document.getElementById("c8B");
    let c8C = document.getElementById("c8C");
    let c8D = document.getElementById("c8D");
    let c8E = document.getElementById("c8E");
    let c8F = document.getElementById("c8F");
    let c8G = document.getElementById("c8G");
    let flA = document.getElementById("flA");
    let flB = document.getElementById("flB");
    let flC = document.getElementById("flC");
    let flD = document.getElementById("flD");
    let flE = document.getElementById("flE");
    let flF = document.getElementById("flF");
    let flG = document.getElementById("flG");
    let scA = document.getElementById("scA");
    let scB = document.getElementById("scB");
    let scC = document.getElementById("scC");
    let scD = document.getElementById("scD");
    let scE = document.getElementById("scE");
    let scF = document.getElementById("scF");
    let scG = document.getElementById("scG");
    let jnA = document.getElementById("jnA");
    let jnB = document.getElementById("jnB");
    let jnC = document.getElementById("jnC");
    let jnD = document.getElementById("jnD");
    let jnE = document.getElementById("jnE");
    let jnF = document.getElementById("jnF");
    let jnG = document.getElementById("jnG");
    let d1A = document.getElementById("d1A");
    let d1B = document.getElementById("d1B");
    let d1C = document.getElementById("d1C");
    let d1D = document.getElementById("d1D");
    let d1E = document.getElementById("d1E");
    let d1F = document.getElementById("d1F");
    let d1G = document.getElementById("d1G");
    let d2A = document.getElementById("d2A");
    let d2B = document.getElementById("d2B");
    let d2C = document.getElementById("d2C");
    let d2D = document.getElementById("d2D");
    let d2E = document.getElementById("d2E");
    let d2F = document.getElementById("d2F");
    let d2G = document.getElementById("d2G");
    let d3A = document.getElementById("d3A");
    let d3B = document.getElementById("d3B");
    let d3C = document.getElementById("d3C");
    let d3D = document.getElementById("d3D");
    let d3E = document.getElementById("d3E");
    let d3F = document.getElementById("d3F");
    let d3G = document.getElementById("d3G");
    let d4A = document.getElementById("d4A");
    let d4B = document.getElementById("d4B");
    let d4C = document.getElementById("d4C");
    let d4D = document.getElementById("d4D");
    let d4E = document.getElementById("d4E");
    let d4F = document.getElementById("d4F");
    let d4G = document.getElementById("d4G");
    let d5A = document.getElementById("d5A");
    let d5B = document.getElementById("d5B");
    let d5C = document.getElementById("d5C");
    let d5D = document.getElementById("d5D");
    let d5E = document.getElementById("d5E");
    let d5F = document.getElementById("d5F");
    let d5G = document.getElementById("d5G");
    let d6A = document.getElementById("d6A");
    let d6B = document.getElementById("d6B");
    let d6C = document.getElementById("d6C");
    let d6D = document.getElementById("d6D");
    let d6E = document.getElementById("d6E");
    let d6F = document.getElementById("d6F");
    let d6G = document.getElementById("d6G");
    let srA = document.getElementById("srA");
    let srB = document.getElementById("srB");
    let srC = document.getElementById("srC");
    let srD = document.getElementById("srD");
    let srE = document.getElementById("srE");
    let srF = document.getElementById("srF");
    let srG = document.getElementById("srG");
    let mrA = document.getElementById("mrA");
    let mrB = document.getElementById("mrB");
    let mrC = document.getElementById("mrC");
    let mrD = document.getElementById("mrD");
    let mrE = document.getElementById("mrE");
    let mrF = document.getElementById("mrF");
    let mrG = document.getElementById("mrG");
    let mvA = document.getElementById("mvA");
    let mvB = document.getElementById("mvB");
    let mvC = document.getElementById("mvC");
    let mvD = document.getElementById("mvD");
    let mvE = document.getElementById("mvE");
    let mvF = document.getElementById("mvF");
    let mvG = document.getElementById("mvG");
    let mpp1A = document.getElementById("mpp1A");
    let mpp1B = document.getElementById("mpp1B");
    let mpp1C = document.getElementById("mpp1C");
    let mpp1D = document.getElementById("mpp1D");
    let mpp1E = document.getElementById("mpp1E");
    let mpp1F = document.getElementById("mpp1F");
    let mpp1G = document.getElementById("mpp1G");
    let mpp2A = document.getElementById("mpp2A");
    let mpp2B = document.getElementById("mpp2B");
    let mpp2C = document.getElementById("mpp2C");
    let mpp2D = document.getElementById("mpp2D");
    let mpp2E = document.getElementById("mpp2E");
    let mpp2F = document.getElementById("mpp2F");
    let mpp2G = document.getElementById("mpp2G");
    let qbA = document.getElementById("qbA");
    let qbB = document.getElementById("qbB");
    let qbC = document.getElementById("qbC");
    let qbD = document.getElementById("qbD");
    let qbE = document.getElementById("qbE");
    let qbF = document.getElementById("qbF");
    let qbG = document.getElementById("qbG");
    let fewA = document.getElementById("fewA");
    let fewB = document.getElementById("fewB");
    let fewC = document.getElementById("fewC");
    let fewD = document.getElementById("fewD");
    let fewE = document.getElementById("fewE");
    let fewF = document.getElementById("fewF");
    let fewG = document.getElementById("fewG");
    let swA = document.getElementById("swA");
    let swB = document.getElementById("swB");
    let swC = document.getElementById("swC");
    let swD = document.getElementById("swD");
    let swE = document.getElementById("swE");
    let swF = document.getElementById("swF");
    let swG = document.getElementById("swG");
    let noyA = document.getElementById("noyA");
    let noyB = document.getElementById("noyB");
    let noyC = document.getElementById("noyC");
    let noyD = document.getElementById("noyD");
    let noyE = document.getElementById("noyE");
    let noyF = document.getElementById("noyF");
    let noyG = document.getElementById("noyG");
    let wgA = document.getElementById("wgA");
    let wgB = document.getElementById("wgB");
    let wgC = document.getElementById("wgC");
    let wgD = document.getElementById("wgD");
    let wgE = document.getElementById("wgE");
    let wgF = document.getElementById("wgF");
    let wgG = document.getElementById("wgG");
    let rs1A = document.getElementById("rs1A");
    let rs1B = document.getElementById("rs1B");
    let rs1C = document.getElementById("rs1C");
    let rs1D = document.getElementById("rs1D");
    let rs1E = document.getElementById("rs1E");
    let rs1F = document.getElementById("rs1F");
    let rs1G = document.getElementById("rs1G");
    let rs2A = document.getElementById("rs2A");
    let rs2B = document.getElementById("rs2B");
    let rs2C = document.getElementById("rs2C");
    let rs2D = document.getElementById("rs2D");
    let rs2E = document.getElementById("rs2E");
    let rs2F = document.getElementById("rs2F");
    let rs2G = document.getElementById("rs2G");
    let rs3A = document.getElementById("rs3A");
    let rs3B = document.getElementById("rs3B");
    let rs3C = document.getElementById("rs3C");
    let rs3D = document.getElementById("rs3D");
    let rs3E = document.getElementById("rs3E");
    let rs3F = document.getElementById("rs3F");
    let rs3G = document.getElementById("rs3G");
    let strA = document.getElementById("strA");
    let strB = document.getElementById("strB");
    let strC = document.getElementById("strC");
    let strD = document.getElementById("strD");
    let strE = document.getElementById("strE");
    let strF = document.getElementById("strF");
    let strG = document.getElementById("strG");
    let rA = document.getElementById("rA");
    let rB = document.getElementById("rB");
    let rC = document.getElementById("rC");
    let rD = document.getElementById("rD");
    let rE = document.getElementById("rE");
    let rF = document.getElementById("rF");
    let rG = document.getElementById("rG");
    let uotA = document.getElementById("uotA");
    let uotB = document.getElementById("uotB");
    let uotC = document.getElementById("uotC");
    let uotD = document.getElementById("uotD");
    let uotE = document.getElementById("uotE");
    let uotF = document.getElementById("uotF");
    let uotG = document.getElementById("uotG");
    let lotA = document.getElementById("lotA");
    let lotB = document.getElementById("lotB");
    let lotC = document.getElementById("lotC");
    let lotD = document.getElementById("lotD");
    let lotE = document.getElementById("lotE");
    let lotF = document.getElementById("lotF");
    let lotG = document.getElementById("lotG");
    let at1A = document.getElementById("at1A");
    let at1B = document.getElementById("at1B");
    let at1C = document.getElementById("at1C");
    let at1D = document.getElementById("at1D");
    let at1E = document.getElementById("at1E");
    let at1F = document.getElementById("at1F");
    let at1G = document.getElementById("at1G");
    let at2A = document.getElementById("at2A");
    let at2B = document.getElementById("at2B");
    let at2C = document.getElementById("at2C");
    let at2D = document.getElementById("at2D");
    let at2E = document.getElementById("at2E");
    let at2F = document.getElementById("at2F");
    let at2G = document.getElementById("at2G");
    let at3A = document.getElementById("at3A");
    let at3B = document.getElementById("at3B");
    let at3C = document.getElementById("at3C");
    let at3D = document.getElementById("at3D");
    let at3E = document.getElementById("at3E");
    let at3F = document.getElementById("at3F");
    let at3G = document.getElementById("at3G");
    let time1 = document.getElementById("time1");
    let remark1 = document.getElementById("remark1");
    let time2 = document.getElementById("time2");
    let remark2 = document.getElementById("remark2");
    let time3 = document.getElementById("time3");
    let remark3 = document.getElementById("remark3");
    let time4 = document.getElementById("time4");
    let remark4 = document.getElementById("remark4");
    let time5 = document.getElementById("time5");
    let remark5 = document.getElementById("remark5");
    let time6 = document.getElementById("time6");
    let remark6 = document.getElementById("remark6");
    let kwhM1 = document.getElementById("kwhM1");
    let kwhM2 = document.getElementById("kwhM2");
    let jamProd = document.getElementById("jamProd");
    let ppA = document.getElementById("ppA");
    let ppB = document.getElementById("ppB");
    let ppC = document.getElementById("ppC");
    let ppD = document.getElementById("ppD");
    let cacA = document.getElementById("cacA");
    let cacB = document.getElementById("cacB");
    let cacC = document.getElementById("cacC");
    let cacD = document.getElementById("cacD");
    let cacE = document.getElementById("cacE");
    let cacF = document.getElementById("cacF");
    let mbA = document.getElementById("mbA");
    let mbB = document.getElementById("mbB");
    let mbC = document.getElementById("mbC");
    let mbD = document.getElementById("mbD");
    let mbE = document.getElementById("mbE");
    let mbF = document.getElementById("mbF");
    let uvA = document.getElementById("uvA");
    let uvB = document.getElementById("uvB");
    let uvC = document.getElementById("uvC");
    let uvD = document.getElementById("uvD");
    let uvE = document.getElementById("uvE");
    let uvF = document.getElementById("uvF");
    let asbA = document.getElementById("asbA");
    let asbB = document.getElementById("asbB");
    let asbC = document.getElementById("asbC");
    let asbD = document.getElementById("asbD");
    let asbE = document.getElementById("asbE");
    let asbF = document.getElementById("asbF");
    let llA = document.getElementById("llA");
    let llB = document.getElementById("llB");
    let llC = document.getElementById("llC");
    let llD = document.getElementById("llD");
    let llF = document.getElementById("llF");
    let bhn1A = document.getElementById("bhn1A");
    let bhn1B = document.getElementById("bhn1B");
    let bhn1C = document.getElementById("bhn1C");
    let bhn1D = document.getElementById("bhn1D");
    let bhn1E = document.getElementById("bhn1E");
    let bhn1F = document.getElementById("bhn1F");
    let bhn2A = document.getElementById("bhn2A");
    let bhn2B = document.getElementById("bhn2B");
    let bhn2C = document.getElementById("bhn2C");
    let bhn2D = document.getElementById("bhn2D");
    let bhn2E = document.getElementById("bhn2E");
    let bhn2F = document.getElementById("bhn2F");
    let mbAT = document.getElementById("mbAT");
    let uvAT = document.getElementById("uvAT");
    let asbAT = document.getElementById("asbAT");
    let llAT = document.getElementById("llAT");
    let bngM = document.getElementById("bngM");
    let prongM = document.getElementById("prongM");
    let silM = document.getElementById("silM");
    let bngL = document.getElementById("bngL");
    let prongL = document.getElementById("prongL");
    let silL = document.getElementById("silL");
    let bngMe = document.getElementById("bngMe");
    let prongMe = document.getElementById("prongMe");
    let silMe = document.getElementById("silMe");
    let bngGB = document.getElementById("bngGB");
    let prongGB = document.getElementById("prongGB");
    let silGB = document.getElementById("silGB");
    let bngLL = document.getElementById("bngLL");
    let prongLL = document.getElementById("prongLL");
    let silLL = document.getElementById("silLL");
    let total = document.getElementById("total");
    let keterangan = document.getElementById("keterangan");

    //#region Inisialisasi ID Lohia
    let referensiD = document.getElementById("referensiD");
    let tanggalD = document.getElementById("tanggalD");
    let effisiensiD = document.getElementById("effisiensiD");
    let shiftValueD = document.getElementById("shiftValueD");
    let timeStartD = document.getElementById("timeStartD");
    let timeEndD = document.getElementById("timeEndD");
    let spek_mesinD = document.getElementById("spek_mesinD");
    let spek_benangD = document.getElementById("spek_benangD");
    let timeAD = document.getElementById("timeAD");
    let timeBD = document.getElementById("timeBD");
    let timeCD = document.getElementById("timeCD");
    let timeDD = document.getElementById("timeDD");
    let timeED = document.getElementById("timeED");
    let timeFD = document.getElementById("timeFD");
    let bz1AD = document.getElementById("bz1AD");
    let bz1BD = document.getElementById("bz1BD");
    let bz1CD = document.getElementById("bz1CD");
    let bz1DD = document.getElementById("bz1DD");
    let bz1ED = document.getElementById("bz1ED");
    let bz1FD = document.getElementById("bz1FD");
    let bz2AD = document.getElementById("bz2AD");
    let bz2BD = document.getElementById("bz2BD");
    let bz2CD = document.getElementById("bz2CD");
    let bz2DD = document.getElementById("bz2DD");
    let bz2ED = document.getElementById("bz2ED");
    let bz2FD = document.getElementById("bz2FD");
    let bz3AD = document.getElementById("bz3AD");
    let bz3BD = document.getElementById("bz3BD");
    let bz3CD = document.getElementById("bz3CD");
    let bz3DD = document.getElementById("bz3DD");
    let bz3ED = document.getElementById("bz3ED");
    let bz3FD = document.getElementById("bz3FD");
    let bz4AD = document.getElementById("bz4AD");
    let bz4BD = document.getElementById("bz4BD");
    let bz4CD = document.getElementById("bz4CD");
    let bz4DD = document.getElementById("bz4DD");
    let bz4ED = document.getElementById("bz4ED");
    let bz4FD = document.getElementById("bz4FD");
    let bz5AD = document.getElementById("bz5AD");
    let bz5BD = document.getElementById("bz5BD");
    let bz5CD = document.getElementById("bz5CD");
    let bz5DD = document.getElementById("bz5DD");
    let bz5ED = document.getElementById("bz5ED");
    let bz5FD = document.getElementById("bz5FD");
    let bz6AD = document.getElementById("bz6AD");
    let bz6BD = document.getElementById("bz6BD");
    let bz6CD = document.getElementById("bz6CD");
    let bz6DD = document.getElementById("bz6DD");
    let bz6ED = document.getElementById("bz6ED");
    let bz6FD = document.getElementById("bz6FD");
    let scAD = document.getElementById("scAD");
    let scBD = document.getElementById("scBD");
    let scCD = document.getElementById("scCD");
    let scDD = document.getElementById("scDD");
    let scED = document.getElementById("scED");
    let scFD = document.getElementById("scFD");
    let mpAD = document.getElementById("mpAD");
    let mpBD = document.getElementById("mpBD");
    let mpCD = document.getElementById("mpCD");
    let mpDD = document.getElementById("mpDD");
    let mpED = document.getElementById("mpED");
    let mpFD = document.getElementById("mpFD");
    let ad1AD = document.getElementById("ad1AD");
    let ad1BD = document.getElementById("ad1BD");
    let ad1CD = document.getElementById("ad1CD");
    let ad1DD = document.getElementById("ad1DD");
    let ad1ED = document.getElementById("ad1ED");
    let ad1FD = document.getElementById("ad1FD");
    let ad2AD = document.getElementById("ad2AD");
    let ad2BD = document.getElementById("ad2BD");
    let ad2CD = document.getElementById("ad2CD");
    let ad2DD = document.getElementById("ad2DD");
    let ad2ED = document.getElementById("ad2ED");
    let ad2FD = document.getElementById("ad2FD");
    let wpheAD = document.getElementById("wpheAD");
    let wpheBD = document.getElementById("wpheBD");
    let wpheCD = document.getElementById("wpheCD");
    let wpheDD = document.getElementById("wpheDD");
    let wpheED = document.getElementById("wpheED");
    let wpheFD = document.getElementById("wpheFD");
    let ipheAD = document.getElementById("ipheAD");
    let ipheBD = document.getElementById("ipheBD");
    let ipheCD = document.getElementById("ipheCD");
    let ipheDD = document.getElementById("ipheDD");
    let ipheED = document.getElementById("ipheED");
    let ipheFD = document.getElementById("ipheFD");
    let mtAD = document.getElementById("mtAD");
    let mtBD = document.getElementById("mtBD");
    let mtCD = document.getElementById("mtCD");
    let mtDD = document.getElementById("mtDD");
    let mtED = document.getElementById("mtED");
    let mtFD = document.getElementById("mtFD");
    let dz1AD = document.getElementById("dz1AD");
    let dz1BD = document.getElementById("dz1BD");
    let dz1CD = document.getElementById("dz1CD");
    let dz1DD = document.getElementById("dz1DD");
    let dz1ED = document.getElementById("dz1ED");
    let dz1FD = document.getElementById("dz1FD");
    let dz2AD = document.getElementById("dz2AD");
    let dz2BD = document.getElementById("dz2BD");
    let dz2CD = document.getElementById("dz2CD");
    let dz2DD = document.getElementById("dz2DD");
    let dz2ED = document.getElementById("dz2ED");
    let dz2FD = document.getElementById("dz2FD");
    let dz3AD = document.getElementById("dz3AD");
    let dz3BD = document.getElementById("dz3BD");
    let dz3CD = document.getElementById("dz3CD");
    let dz3DD = document.getElementById("dz3DD");
    let dz3ED = document.getElementById("dz3ED");
    let dz3FD = document.getElementById("dz3FD");
    let dz4AD = document.getElementById("dz4AD");
    let dz4BD = document.getElementById("dz4BD");
    let dz4CD = document.getElementById("dz4CD");
    let dz4DD = document.getElementById("dz4DD");
    let dz4ED = document.getElementById("dz4ED");
    let dz4FD = document.getElementById("dz4FD");
    let dz5AD = document.getElementById("dz5AD");
    let dz5BD = document.getElementById("dz5BD");
    let dz5CD = document.getElementById("dz5CD");
    let dz5DD = document.getElementById("dz5DD");
    let dz5ED = document.getElementById("dz5ED");
    let dz5FD = document.getElementById("dz5FD");
    let haoAD = document.getElementById("haoAD");
    let haoBD = document.getElementById("haoBD");
    let haoCD = document.getElementById("haoCD");
    let haoDD = document.getElementById("haoDD");
    let haoED = document.getElementById("haoED");
    let haoFD = document.getElementById("haoFD");
    let unitAD = document.getElementById("unitAD");
    let unitBD = document.getElementById("unitBD");
    let unitCD = document.getElementById("unitCD");
    let unitDD = document.getElementById("unitDD");
    let unitED = document.getElementById("unitED");
    let unitFD = document.getElementById("unitFD");
    let mp2AD = document.getElementById("mp2AD");
    let mp2BD = document.getElementById("mp2BD");
    let mp2CD = document.getElementById("mp2CD");
    let mp2DD = document.getElementById("mp2DD");
    let mp2ED = document.getElementById("mp2ED");
    let mp2FD = document.getElementById("mp2FD");
    let extAD = document.getElementById("extAD");
    let extBD = document.getElementById("extBD");
    let extCD = document.getElementById("extCD");
    let extDD = document.getElementById("extDD");
    let extED = document.getElementById("extED");
    let extFD = document.getElementById("extFD");
    let niprAD = document.getElementById("niprAD");
    let niprBD = document.getElementById("niprBD");
    let niprCD = document.getElementById("niprCD");
    let niprDD = document.getElementById("niprDD");
    let niprED = document.getElementById("niprED");
    let niprFD = document.getElementById("niprFD");
    let trAD = document.getElementById("trAD");
    let trBD = document.getElementById("trBD");
    let trCD = document.getElementById("trCD");
    let trDD = document.getElementById("trDD");
    let trED = document.getElementById("trED");
    let trFD = document.getElementById("trFD");
    let huAD = document.getElementById("huAD");
    let huBD = document.getElementById("huBD");
    let huCD = document.getElementById("huCD");
    let huDD = document.getElementById("huDD");
    let huED = document.getElementById("huED");
    let huFD = document.getElementById("huFD");
    let isuAD = document.getElementById("isuAD");
    let isuBD = document.getElementById("isuBD");
    let isuCD = document.getElementById("isuCD");
    let isuDD = document.getElementById("isuDD");
    let isuED = document.getElementById("isuED");
    let isuFD = document.getElementById("isuFD");
    let suAD = document.getElementById("suAD");
    let suBD = document.getElementById("suBD");
    let suCD = document.getElementById("suCD");
    let suDD = document.getElementById("suDD");
    let suED = document.getElementById("suED");
    let suFD = document.getElementById("suFD");
    let pauAD = document.getElementById("pauAD");
    let pauBD = document.getElementById("pauBD");
    let pauCD = document.getElementById("pauCD");
    let pauDD = document.getElementById("pauDD");
    let pauED = document.getElementById("pauED");
    let pauFD = document.getElementById("pauFD");
    let auAD = document.getElementById("auAD");
    let auBD = document.getElementById("auBD");
    let auCD = document.getElementById("auCD");
    let auDD = document.getElementById("auDD");
    let auED = document.getElementById("auED");
    let auFD = document.getElementById("auFD");
    let wgAD = document.getElementById("wgAD");
    let wgBD = document.getElementById("wgBD");
    let wgCD = document.getElementById("wgCD");
    let wgDD = document.getElementById("wgDD");
    let wgED = document.getElementById("wgED");
    let wgFD = document.getElementById("wgFD");
    let fewAD = document.getElementById("fewAD");
    let fewBD = document.getElementById("fewBD");
    let fewCD = document.getElementById("fewCD");
    let fewDD = document.getElementById("fewDD");
    let fewED = document.getElementById("fewED");
    let fewFD = document.getElementById("fewFD");
    let noyAD = document.getElementById("noyAD");
    let noyBD = document.getElementById("noyBD");
    let noyCD = document.getElementById("noyCD");
    let noyDD = document.getElementById("noyDD");
    let noyED = document.getElementById("noyED");
    let noyFD = document.getElementById("noyFD");
    let swAD = document.getElementById("swAD");
    let swBD = document.getElementById("swBD");
    let swCD = document.getElementById("swCD");
    let swDD = document.getElementById("swDD");
    let swED = document.getElementById("swED");
    let swFD = document.getElementById("swFD");
    let totrAD = document.getElementById("totrAD");
    let totrBD = document.getElementById("totrBD");
    let totrCD = document.getElementById("totrCD");
    let totrDD = document.getElementById("totrDD");
    let totrED = document.getElementById("totrED");
    let totrFD = document.getElementById("totrFD");
    let relaxAD = document.getElementById("relaxAD");
    let relaxBD = document.getElementById("relaxBD");
    let relaxCD = document.getElementById("relaxCD");
    let relaxDD = document.getElementById("relaxDD");
    let relaxED = document.getElementById("relaxED");
    let relaxFD = document.getElementById("relaxFD");
    let tp2AD = document.getElementById("tp2AD");
    let tp2BD = document.getElementById("tp2BD");
    let tp2CD = document.getElementById("tp2CD");
    let tp2DD = document.getElementById("tp2DD");
    let tp2ED = document.getElementById("tp2ED");
    let tp2FD = document.getElementById("tp2FD");
    let tp1AD = document.getElementById("tp1AD");
    let tp1BD = document.getElementById("tp1BD");
    let tp1CD = document.getElementById("tp1CD");
    let tp1DD = document.getElementById("tp1DD");
    let tp1ED = document.getElementById("tp1ED");
    let tp1FD = document.getElementById("tp1FD");
    let tp3AD = document.getElementById("tp3AD");
    let tp3BD = document.getElementById("tp3BD");
    let tp3CD = document.getElementById("tp3CD");
    let tp3DD = document.getElementById("tp3DD");
    let tp3ED = document.getElementById("tp3ED");
    let tp3FD = document.getElementById("tp3FD");
    let at1AD = document.getElementById("at1AD");
    let at1BD = document.getElementById("at1BD");
    let at1CD = document.getElementById("at1CD");
    let at1DD = document.getElementById("at1DD");
    let at1ED = document.getElementById("at1ED");
    let at1FD = document.getElementById("at1FD");
    let at2AD = document.getElementById("at2AD");
    let at2BD = document.getElementById("at2BD");
    let at2CD = document.getElementById("at2CD");
    let at2DD = document.getElementById("at2DD");
    let at2ED = document.getElementById("at2ED");
    let at2FD = document.getElementById("at2FD");
    let tfAD = document.getElementById("tfAD");
    let tfBD = document.getElementById("tfBD");
    let tfCD = document.getElementById("tfCD");
    let tfDD = document.getElementById("tfDD");
    let tfED = document.getElementById("tfED");
    let tfFD = document.getElementById("tfFD");
    let ldAD = document.getElementById("ldAD");
    let ldBD = document.getElementById("ldBD");
    let ldCD = document.getElementById("ldCD");
    let ldDD = document.getElementById("ldDD");
    let ldED = document.getElementById("ldED");
    let ldFD = document.getElementById("ldFD");
    let time1D = document.getElementById("time1D");
    let remark1D = document.getElementById("remark1D");
    let time2D = document.getElementById("time2D");
    let remark2D = document.getElementById("remark2D");
    let time3D = document.getElementById("time3D");
    let remark3D = document.getElementById("remark3D");
    let time4D = document.getElementById("time4D");
    let remark4D = document.getElementById("remark4D");
    let kwhM1D = document.getElementById("kwhM1D");
    let kwhM2D = document.getElementById("kwhM2D");
    let jamProdD = document.getElementById("jamProdD");
    let ppAD = document.getElementById("ppAD");
    let ppBD = document.getElementById("ppBD");
    let ppCD = document.getElementById("ppCD");
    let ppDD = document.getElementById("ppDD");
    let cacAD = document.getElementById("cacAD");
    let cacBD = document.getElementById("cacBD");
    let cacCD = document.getElementById("cacCD");
    let cacDD = document.getElementById("cacDD");
    let cacED = document.getElementById("cacED");
    let cacFD = document.getElementById("cacFD");
    let mbATD = document.getElementById("mbATD");
    let mbAD = document.getElementById("mbAD");
    let mbBD = document.getElementById("mbBD");
    let mbCD = document.getElementById("mbCD");
    let mbDD = document.getElementById("mbDD");
    let mbED = document.getElementById("mbED");
    let mbFD = document.getElementById("mbFD");
    let uvATD = document.getElementById("uvATD");
    let uvAD = document.getElementById("uvAD");
    let uvBD = document.getElementById("uvBD");
    let uvCD = document.getElementById("uvCD");
    let uvDD = document.getElementById("uvDD");
    let uvED = document.getElementById("uvED");
    let uvFD = document.getElementById("uvFD");
    let asbATD = document.getElementById("asbATD");
    let asbAD = document.getElementById("asbAD");
    let asbBD = document.getElementById("asbBD");
    let asbCD = document.getElementById("asbCD");
    let asbDD = document.getElementById("asbDD");
    let asbED = document.getElementById("asbED");
    let asbFD = document.getElementById("asbFD");
    let llATD = document.getElementById("llATD");
    let llAD = document.getElementById("llAD");
    let llBD = document.getElementById("llBD");
    let llCD = document.getElementById("llCD");
    let llDD = document.getElementById("llDD");
    let llFD = document.getElementById("llFD");
    let bngMD = document.getElementById("bngMD");
    let prongMD = document.getElementById("prongMD");
    let silMD = document.getElementById("silMD");
    let bngLD = document.getElementById("bngLD");
    let prongLD = document.getElementById("prongLD");
    let silLD = document.getElementById("silLD");
    let bngMeD = document.getElementById("bngMeD");
    let prongMeD = document.getElementById("prongMeD");
    let silMeD = document.getElementById("silMeD");
    let bngGBD = document.getElementById("bngGBD");
    let prongGBD = document.getElementById("prongGBD");
    let silGBD = document.getElementById("silGBD");
    let bngLLD = document.getElementById("bngLLD");
    let prongLLD = document.getElementById("prongLLD");
    let silLLD = document.getElementById("silLLD");
    let totalD = document.getElementById("totalD");
    let keteranganD = document.getElementById("keteranganD");
    let table_atas = $("#table_atas").DataTable({
        // columnDefs: [{ targets: [5, 6], visible: false }],
        // headerCallback: function (thead, data, start, end, display) {
        //     $(thead).find("th")
        //         .css("font-family", "Arial") 
        //         .css("font-size", "14px")
        //         .css("text-align", "center");
        // },
        // columnDefs: [{ targets: [5, 6], visible: false }],
        paging: false,
        scrollY: "400px",
        scrollX: "400px",
        scrollCollapse: true,
    });

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

    const slcLokasi = document.getElementById("lokasi");

    tgl_awal.valueAsDate = new Date();
    tgl_akhir.valueAsDate = new Date();

    btn_simpanKet.style.display = "none";
    btn_simpanKetD.style.display = "none";

    function getTextColor(element) {
        if (!element) {
            return "black";
        }

        const text = element.textContent.trim().toLowerCase();

        if (text.includes("red")) {
            return "red";
        }

        return "black";
    }

    function setFieldCheck(element, value, color, status, checkValue) {

        // Jika value NULL / kosong
        if (value === null || value === undefined || value === "") {

            element.innerHTML = `
            <div contenteditable="true" style="text-align:center;">
                ${formatPrint(value)}
            </div>
        `;

            element.style.color = color === "red" ? "red" : "black";

            return;
        }

        // Jika merah, hanya tampilkan nilai
        if (color === "red") {

            element.innerHTML = `
            <div contenteditable="true" style="text-align:center;">
                ${formatPrint(value)}
            </div>
        `;

            element.style.color = "red";

            return;
        }

        // =========================
        // STATUS
        // =========================

        // Jika status kosong / NULL → OK
        if (status === null || status === undefined || status === "") {
            status = "OK";
        }

        // =========================
        // CHECK VALUE
        // =========================

        // Jika checkValue kosong → ""
        if (checkValue === null || checkValue === undefined) {
            checkValue = "";
        }

        // Status NG
        var isNG = status === "NG";

        element.style.color = "black";

        element.innerHTML = `
        <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            gap:5px;
        ">

            <!-- Nilai utama -->
            <div contenteditable="true" style="text-align:center;">
                ${value}
            </div>

            <!-- Slash + Input -->
            <div style="
                display:flex;
                align-items:center;
                gap:2px;
            ">

                <span class="check-slash"
                      style="
                          display:${isNG ? "inline" : "none"};
                      ">
                    /
                </span>

                <input type="text"
                       class="check-input"
                       data-field="${element.id}"
                       value="${isNG ? checkValue : ""}"
                       style="
                           display:${isNG ? "block" : "none"};
                           width:40px;
                           height:18px;
                           padding:1px 3px;
                           text-align:center;
                           box-sizing:border-box;
                       ">
            </div>

        </div>

        <!-- Radio OK / NG -->
        <div contenteditable="false"
             style="
                 text-align:center;
                 font-size:9px;
                 margin-top:2px;
             ">

            <label style="
                cursor:pointer;
                margin-right:4px;
            ">
                <input type="radio"
                       name="${element.id}_status"
                       value="OK"
                       class="check-status"
                       ${status === "OK" ? "checked" : ""}
                       style="
                           width:10px;
                           height:10px;
                           margin:0 2px 0 0;
                           vertical-align:middle;
                       ">
                OK
            </label>

            <label style="cursor:pointer;">
                <input type="radio"
                       name="${element.id}_status"
                       value="NG"
                       class="check-status"
                       ${status === "NG" ? "checked" : ""}
                       style="
                           width:10px;
                           height:10px;
                           margin:0 2px 0 0;
                           vertical-align:middle;
                       ">
                NG
            </label>

        </div>
    `;

        // =========================
        // EVENT OK / NG
        // =========================

        element.querySelectorAll(".check-status").forEach(function (radio) {

            radio.addEventListener("change", function () {

                var input = element.querySelector(".check-input");
                var slash = element.querySelector(".check-slash");

                if (this.value === "NG") {

                    // Tampilkan slash
                    slash.style.display = "inline";

                    // Tampilkan input
                    input.style.display = "block";

                } else {

                    // Sembunyikan slash
                    slash.style.display = "none";

                    // Sembunyikan input
                    input.style.display = "none";

                    // Kosongkan input
                    input.value = "";
                }
            });

        });
    }

    function applyColorGroup(fields, color) {
        fields.forEach(id => {
            let el = document.getElementById(id);
            if (el) el.style.color = color;
        });
    }

    function convertToSQLDatetime(dateInput, timeElement) {
        let tgl = dateInput.value;
        if (!tgl) {
            alert("Tanggal belum diisi!");
            return null;
        }

        let jamStr = timeElement.trim();
        if (!jamStr) {
            alert(`${timeElement.id} belum diisi!`);
            return null;
        }

        // Ubah titik jadi titik dua
        jamStr = jamStr.replace('.', ':');

        // Jika belum ada menit, tambahkan :00
        if (!jamStr.includes(':')) {
            jamStr += ':00';
        }

        // Format SQL Server
        let datetimeSQL = `${tgl} ${jamStr}:00`;

        // Validasi tanggal
        let d = new Date(datetimeSQL);
        if (isNaN(d.getTime())) {
            // alert(`Format jam pada ${timeElement.id} tidak valid!`);
            alert(`Format jam tidak valid! Contoh 10.30 atau 10:30`);
            return null;
        }

        // Simpan hasilnya ke value elemen
        timeElement.value = datetimeSQL;

        return datetimeSQL;
    }

    function formatPrint(val) {
        if (val === '' || val === null || isNaN(val)) return '';

        let num = parseFloat(val);

        // 10.00 → 10
        if (Number.isInteger(num)) return numeral(num).format('0');

        // **Jika angka punya lebih dari 1 decimal yang bukan .x0 atau .75 → tampilkan apa adanya**
        let decimal = (num.toString().split('.')[1] || '');
        if (decimal.length > 1 && decimal !== '75' && decimal !== '70') {
            return numeral(num).format('0.00');  // contoh: 10.23 → 10.23
        }

        // 10.75 → 10.75
        if (decimal === '75') return numeral(num).format('0.00');

        // 10.70 → 10.7
        return numeral(num).format('0.[0]');
    }

    function hitungTotal() {
        const elements = [
            bngM, prongM, silM,
            bngL, prongL, silL,
            bngMe, prongMe, silMe,
            bngGB, prongGB, silGB,
            bngLL, prongLL, silLL
        ];

        let totalValue = 0;

        elements.forEach(element => {
            totalValue += numeral(element.textContent).value() || 0;
        });

        total.textContent = numeral(totalValue).format("0,0.00");
    }

    function hitungTotalD() {
        const elements = [
            bngMD, prongMD, silMD,
            bngLD, prongLD, silLD,
            bngMeD, prongMeD, silMeD,
            bngGBD, prongGBD, silGBD,
            bngLLD, prongLLD, silLLD
        ];

        let totalValue = 0;

        elements.forEach(element => {
            totalValue += numeral(element.textContent).value() || 0;
        });

        totalD.textContent = numeral(totalValue).format("0,0.00");
    }

    function highlightRow(prefix) {
        const suffixes = ["A", "B", "C", "D", "E", "F", "G"];

        let baseElement = null;
        let baseValue = "";
        let baseSuffix = null;

        // Reset semua highlight terlebih dahulu
        suffixes.forEach(suffix => {
            const el = document.getElementById(prefix + suffix);

            if (el) {
                el.style.backgroundColor = "";
            }
        });

        for (let i = 0; i < suffixes.length; i++) {
            const suffix = suffixes[i];
            const el = document.getElementById(prefix + suffix);

            if (!el) continue;

            // Ambil HANYA nilai utama
            const valueElement = el.querySelector('[contenteditable="true"]');

            const value = valueElement
                ? valueElement.textContent.trim()
                : el.textContent.trim();

            // Cek apakah kolom ini berwarna merah
            const color = window.getComputedStyle(el).color;

            // Jika warna merah, jadikan sebagai BASE baru
            if (
                color === "rgb(255, 0, 0)" ||
                color === "red"
            ) {
                baseElement = el;
                baseValue = value;
                baseSuffix = suffix;

                continue;
            }

            // Belum ada base merah
            if (!baseElement) {
                continue;
            }

            // Jika kosong, abaikan
            if (value === "") {
                continue;
            }

            // Bandingkan dengan BASE merah terakhir
            if (value !== baseValue) {

                // Base merah juga ikut kuning
                baseElement.style.backgroundColor = "yellow";

                // Kolom yang berbeda ikut kuning
                el.style.backgroundColor = "yellow";
            }
        }
    }

    function highlightRowD(prefix) {
        const pairs = [
            ["A", "B"],
            ["C", "D"],
            ["E", "F"]
        ];

        // Reset semua highlight
        pairs.forEach(([baseSuffix, compareSuffix]) => {
            const baseElement = document.getElementById(prefix + baseSuffix + "D");
            const compareElement = document.getElementById(prefix + compareSuffix + "D");

            if (baseElement) {
                baseElement.style.backgroundColor = "";
            }

            if (compareElement) {
                compareElement.style.backgroundColor = "";
            }
        });

        // Cek setiap pasangan
        pairs.forEach(([baseSuffix, compareSuffix]) => {
            const baseId = prefix + baseSuffix + "D";
            const compareId = prefix + compareSuffix + "D";

            const baseElement = document.getElementById(baseId);
            const compareElement = document.getElementById(compareId);

            if (!baseElement || !compareElement) {
                console.log(
                    "Element tidak ditemukan:",
                    !baseElement ? baseId : compareId
                );
                return;
            }

            // Ambil element nilai utama
            const baseValueElement = baseElement.querySelector(
                '[contenteditable="true"]'
            );

            const compareValueElement = compareElement.querySelector(
                '[contenteditable="true"]'
            );

            // Ambil nilai utama
            const baseValue = baseValueElement
                ? baseValueElement.textContent.trim()
                : baseElement.textContent.trim();

            const compareValue = compareValueElement
                ? compareValueElement.textContent.trim()
                : compareElement.textContent.trim();

            console.log(
                `${baseId}: ${baseValue} | ${compareId}: ${compareValue}`
            );

            // Kalau nilai pembanding kosong, abaikan
            if (compareValue === "") {
                return;
            }

            // Kalau nilai utama berbeda, keduanya kuning
            if (baseValue !== compareValue) {
                console.log(
                    "Beda!",
                    `${baseId} = ${baseValue}`,
                    `${compareId} = ${compareValue}`
                );

                baseElement.style.backgroundColor = "yellow";
                compareElement.style.backgroundColor = "yellow";
            }
        });
    }

    $("#" + slcLokasi.id).select2({
        placeholder: "-- Pilih Lokasi --"
    });

    $("#" + slcLokasi.id).on("change", function () {

        const val = $(this).val();
        let allowedType = [];
        switch (val) {
            case "1":
                // Lokasi 1 boleh semua
                btn_redisplay.click();
                allowedType = ["1", "2"];
                // btn_batal.click();
                // $("#labelProses").text("Input Data");
                // $("#btn_proses").text("PROSES");
                break;

            case "2":
                // Lokasi 2 hanya type tertentu
                btn_redisplay.click();
                allowedType = ["3"];
                // btn_batal.click();
                // $("#labelProses").text("Input Data");
                // $("#btn_proses").text("PROSES");
                break;

            case "3":
                // Lokasi 3 hanya type tertentu
                btn_redisplay.click();
                allowedType = ["4", "5", "6"];
                // btn_batal.click();
                // $("#labelProses").text("Input Data");
                // $("#btn_proses").text("PROSES");
                break;
        }
    });

    // default lokasi = 1
    $("#" + slcLokasi.id).val("1").trigger("change");

    btn_simpanKet.addEventListener("click", async function (event) {
        event.preventDefault();

        const hasilCheck = {};
        document.querySelectorAll(".check-status:checked").forEach(function (radio) {
            const field = radio.name.replace("_status", "");
            const element = document.getElementById(field);
            const input = element?.querySelector(".check-input");
            hasilCheck[field] = {
                status: radio.value,
                value: input ? input.value : ""
            };
        });

        $.ajax({
            url: "VerifikasiSM",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: 2,
                idLaporan: idLapKoreksi,
                keterangan: keterangan.innerHTML,
                hasilCheck: hasilCheck,
            },
            success: function (response) {
                console.log(response.message);
                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then((result) => {
                        $("#table_atas").DataTable().ajax.reload();
                        $("#modalLaporan").modal("hide");
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    btn_simpanKetD.addEventListener("click", async function (event) {
        event.preventDefault();

        const hasilCheck = {};
        document.querySelectorAll(".check-status:checked").forEach(function (radio) {
            const field = radio.name.replace("_status", "");
            const element = document.getElementById(field);
            const input = element?.querySelector(".check-input");
            hasilCheck[field] = {
                status: radio.value,
                value: input ? input.value : ""
            };
        });

        $.ajax({
            url: "VerifikasiSM",
            dataType: "json",
            type: "POST",
            data: {
                _token: csrfToken,
                proses: 3,
                idLaporan: idLapKoreksi,
                keterangan: keteranganD.innerHTML,
                hasilCheck: hasilCheck,
            },
            success: function (response) {
                console.log(response.message);
                if (response.message) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: response.message,
                        showConfirmButton: true,
                    }).then((result) => {
                        $("#table_atas").DataTable().ajax.reload();
                        $("#modalLaporan").modal("hide");
                    });
                } else if (response.error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: response.error,
                        showConfirmButton: false,
                    });
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            },
        });
    });

    btn_redisplay.addEventListener("click", async function (event) {
        event.preventDefault();
        // if ($("#" + slcTypeKain.id).val() == 1) {
        table_atas = $("#table_atas").DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            destroy: true,
            ajax: {
                url: "ACCVSM/getDataExt",
                dataType: "json",
                type: "GET",
                data: function (d) {
                    return $.extend({}, d, {
                        _token: csrfToken,
                        tgl_awal: tgl_awal.value,
                        tgl_akhir: tgl_akhir.value,
                        id_lokasi: $("#" + slcLokasi.id).val(),
                    });
                },
            },
            columns: [
                {
                    data: "idLaporan",
                    render: function (data, type, row) {
                        if (type === "display") {
                            return `
                    <a href="javascript:void(0)"
                       class="link-idheader text-primary"
                       data-id="${data}">
                        ${data}
                    </a>
                    `;
                        }
                        return data; // penting untuk sorting & searching
                    },
                },
                { data: "shiftValue" },
                {
                    data: "tanggal_raw", // Data asli untuk sorting
                    render: function (data, type, row) {
                        // type === 'display' digunakan saat menampilkan di tabel
                        if (type === "display") {
                            return row.tanggal; // tampilkan versi m/d/Y
                        }
                        return data; // untuk sorting & filtering (yyyy-mm-dd)
                    },
                },
                { data: "spek_mesin" },
                { data: "spek_benang" },
                { data: "bahanPP" },
                { data: "userInput" },
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    render: function (data, type, row) {

                        // jika sudah ada user verified
                        if (
                            row.userACCSPV !== null &&
                            row.userACCSPV !== ""
                        ) {
                            return `
                            <div style="display: flex; flex-direction: column; align-items: center; gap: 5px;">
                                <span style="color: green; font-weight: bold;">
                                    Sudah diACC ${row.userACCSPV}
                                </span>

                                <button
                                    class="btn btn-sm btn-danger btn-batal-verifikasi"
                                    style="width: 130px;"
                                    data-id="${row.idLaporan}">
                                    <i class="fa fa-times"></i> Batal ACC
                                </button>
                            </div>
                        `;
                        }

                        // jika belum diverifikasi
                        return `
                        <button
                            class="btn btn-sm btn-success btn-verifikasi"
                            style="width: 100px;"
                            data-id="${row.idLaporan}">
                            <i class="fa fa-edit"></i> ACC
                        </button>
                    `;
                    },
                },
            ],
            createdRow: function (row, data, dataIndex) {
                $(row)
                    .find("td")
                    .css({
                        "font-family": "Arial",
                        "font-size": "14px",
                        "text-align": "center",
                        "vertical-align": "middle"
                    });
            },
            headerCallback: function (thead, data, start, end, display, tdata) {
                $(thead, tdata)
                    .find("th")
                    .css("font-family", "Arial")
                    .css("font-size", "14px")
                    .css("text-align", "center");
            },
            // order: [[1, "asc"]],
            paging: false,
            scrollY: "400px",
            scrollCollapse: true,
        });
    });

    $("#table_atas").on("click", ".btn-batal-verifikasi", function () {
        const id = $(this).data("id");
        console.log(id);
        Swal.fire({
            title: "Apakah anda yakin ingin batal ACC id laporan " + id + "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                if ($("#" + slcLokasi.id).val() == "3") {
                    $.ajax({
                        url: "ACCVSM",
                        dataType: "json",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            proses: 4,
                            idLaporan: id,
                        },
                        success: function (response) {
                            console.log(response.message);
                            if (response.message) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: response.message,
                                    showConfirmButton: true,
                                }).then((result) => {
                                    $("#table_atas").DataTable().ajax.reload();
                                    console.log(result);
                                });
                            } else if (response.error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: response.error,
                                    showConfirmButton: false,
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                } else {
                    $.ajax({
                        url: "ACCVSM",
                        dataType: "json",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            proses: 3,
                            idLaporan: id,
                        },
                        success: function (response) {
                            console.log(response.message);
                            if (response.message) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: response.message,
                                    showConfirmButton: true,
                                }).then((result) => {
                                    $("#table_atas").DataTable().ajax.reload();
                                    console.log(result);
                                });
                            } else if (response.error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: response.error,
                                    showConfirmButton: false,
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
        });
    });

    $("#table_atas").on("click", ".btn-verifikasi", function () {
        const id = $(this).data("id");
        console.log(id);
        Swal.fire({
            title: "Apakah anda yakin ingin ACC verifikasi id laporan " + id + "?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                if ($("#" + slcLokasi.id).val() == "3") {
                    $.ajax({
                        url: "ACCVSM",
                        dataType: "json",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            proses: 2,
                            idLaporan: id,
                        },
                        success: function (response) {
                            console.log(response.message);
                            if (response.message) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: response.message,
                                    showConfirmButton: true,
                                }).then((result) => {
                                    $("#table_atas").DataTable().ajax.reload();
                                    console.log(result);
                                });
                            } else if (response.error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: response.error,
                                    showConfirmButton: false,
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                } else {
                    $.ajax({
                        url: "ACCVSM",
                        dataType: "json",
                        type: "POST",
                        data: {
                            _token: csrfToken,
                            proses: 1,
                            idLaporan: id,
                        },
                        success: function (response) {
                            console.log(response.message);
                            if (response.message) {
                                Swal.fire({
                                    icon: "success",
                                    title: "Success!",
                                    text: response.message,
                                    showConfirmButton: true,
                                }).then((result) => {
                                    $("#table_atas").DataTable().ajax.reload();
                                    console.log(result);
                                });
                            } else if (response.error) {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: response.error,
                                    showConfirmButton: false,
                                });
                            }
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.Message);
                        },
                    });
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            }
        });
    });

    let idLapKoreksi = null;
    $("#table_atas").on("click", ".link-idheader", function () {
        const id = $(this).data('id');
        idLapKoreksi = id;
        console.log('Koreksi data ID:', id);
        $("#modalLabelCustomer").text("Preview Laporan");
        $("#modalLabelL").text("Preview Laporan");
        $("#modalLaporan")
            .find("input, select, textarea, td[contenteditable], div[contenteditable]")
            .each(function () {
                const type = $(this).attr("type");

                if (type === "checkbox" || type === "radio") {
                    $(this).prop("checked", false);
                } else if ($(this).is("select")) {
                    $(this).prop("selectedIndex", 0);
                } else if ($(this).is("td[contenteditable], div[contenteditable]")) {
                    $(this).text("");
                } else {
                    $(this).val("");
                }
            });
        $("#modalLohia")
            .find("input, select, textarea, td[contenteditable], div[contenteditable]")
            .each(function () {
                const type = $(this).attr("type");

                if (type === "checkbox" || type === "radio") {
                    $(this).prop("checked", false);
                } else if ($(this).is("select")) {
                    $(this).prop("selectedIndex", 0);
                } else if ($(this).is("td[contenteditable], div[contenteditable]")) {
                    $(this).text("");
                } else {
                    $(this).val("");
                }
            });
        $("#modalLaporan .shift-option").removeClass("active");
        $("#modalLohia .shift-optionD").removeClass("active");
        $("#modalLaporan #shiftValue").val("");
        $("#modalLaporan #shiftValueD").val("");
        timeA.textContent = "";
        timeB.textContent = "";
        timeC.textContent = "";
        timeD.textContent = "";
        timeE.textContent = "";
        timeF.textContent = "";
        timeG.textContent = "";
        timeAD.textContent = "";
        timeBD.textContent = "";
        timeCD.textContent = "";
        timeDD.textContent = "";
        timeED.textContent = "";
        timeFD.textContent = "";
        if ($("#" + slcLokasi.id).val() == "3") {
            $.ajax({
                url: "VerifikasiSM/getPrintLaporanL",
                type: "GET",
                data: {
                    _token: csrfToken,
                    idLaporan: id,
                },
                success: function (data) {
                    console.log(data);
                    
                    if (data.data[0].userVerified !== null) {
                        btn_simpanKetD.disabled = true;
                    } else {
                        btn_simpanKetD.disabled = false;
                    }

                    if (data.data && data.data.length > 0) {
                        $("#ttd_qcD")
                            .text(data.data[0].userVerified)
                            .show();
                    } else {
                        $("#ttd_qcD")
                            .text("")
                            .hide();
                    }

                    if (data.data && data.data.length > 0) {
                        $("#ttd_spvqcD")
                            .text(data.data[0].userACCSPV)
                            .show();
                    } else {
                        $("#ttd_spvqcD")
                            .text("")
                            .hide();
                    }

                    // if (data.ttd.FotoTtd && data.ttd.FotoTtd !== "") {

                    //     let ttd = data.ttd.FotoTtd;

                    //     // pastikan ada prefix base64
                    //     if (!ttd.startsWith("data:image")) {
                    //         ttd = "data:image/png;base64," + ttd;
                    //     }
                    //     // $("#ttd_cogD").val(data.data[0].user_input);
                    //     /* ====== TAMPIL KE IMG ====== */
                    //     $("#ttd_cogD")
                    //         .attr("src", ttd)
                    //         .show();
                    // } else {
                    //     $("#ttd_cogD")
                    //         .attr("src", "")
                    //         .show();
                    // }

                    referensiD.textContent = data.data[0].referensi;
                    if (data.data[0].tanggal) {
                        const tgl = data.data[0].tanggal.split(' ')[0];
                        document.getElementById("tanggalD").value = tgl;
                    }
                    document.getElementById("halamanD").innerHTML = '1&emsp;Dari&emsp;1';
                    effisiensiD.textContent = data.data[0].effisiensi;
                    if (data.data[0].shiftValue) {
                        document.getElementById("shiftValueD").value = data.data[0].shiftValue;
                        const targetShift = document.querySelector(`.shift-optionD[data-value="${data.data[0].shiftValue}"]`);
                        if (targetShift) targetShift.classList.add("active");
                    }
                    if (data.data[0].timeStart) {
                        const date = new Date(data.data[0].timeStart);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            document.getElementById("timeStartD").value = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].timeStart.match(/(\d{2}):(\d{2})/);
                            if (match) document.getElementById("timeStartD").value = `${match[1]}:${match[2]}`;
                        }
                    }
                    if (data.data[0].timeEnd) {
                        const date = new Date(data.data[0].timeEnd);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            document.getElementById("timeEndD").value = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].timeEnd.match(/(\d{2}):(\d{2})/);
                            if (match) document.getElementById("timeEndD").value = `${match[1]}:${match[2]}`;
                        }
                    }
                    spek_mesinD.textContent = data.data[0].spek_mesin;
                    spek_benangD.textContent = data.data[0].spek_benang;
                    if (data.data[0].timeA) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].timeA);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].timeA.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("timeAD").textContent = jamMenit;
                    }
                    if (data.data[0].timeB) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].timeB);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].timeB.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("timeBD").textContent = jamMenit;
                    }
                    if (data.data[0].timeC) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].timeC);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].timeC.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("timeCD").textContent = jamMenit;
                    }
                    if (data.data[0].timeD) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].timeD);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].timeD.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("timeDD").textContent = jamMenit;
                    }
                    if (data.data[0].timeE) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].timeE);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].timeE.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("timeED").textContent = jamMenit;
                    }
                    if (data.data[0].timeF) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].timeF);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].timeF.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("timeFD").textContent = jamMenit;
                    }
                    bz1AD.textContent = formatPrint(data.data[0].bz1A);
                    setFieldCheck(bz1BD, formatPrint(data.data[0].bz1B), data.data[0].colorB, data.data2?.[0]?.bz1B_status || "OK", formatPrint(data.data2?.[0]?.bz1B_value || ""));
                    bz1CD.textContent = formatPrint(data.data[0].bz1C);
                    setFieldCheck(bz1DD, formatPrint(data.data[0].bz1D), data.data[0].colorB, data.data2?.[0]?.bz1D_status || "OK", formatPrint(data.data2?.[0]?.bz1D_value || ""));
                    bz1ED.textContent = formatPrint(data.data[0].bz1E);
                    setFieldCheck(bz1FD, formatPrint(data.data[0].bz1F), data.data[0].colorB, data.data2?.[0]?.bz1F_status || "OK", formatPrint(data.data2?.[0]?.bz1F_value || ""));
                    bz2AD.textContent = formatPrint(data.data[0].bz2A);
                    setFieldCheck(bz2BD, formatPrint(data.data[0].bz2B), data.data[0].colorB, data.data2?.[0]?.bz2B_status || "OK", formatPrint(data.data2?.[0]?.bz2B_value || ""));
                    bz2CD.textContent = formatPrint(data.data[0].bz2C);
                    setFieldCheck(bz2DD, formatPrint(data.data[0].bz2D), data.data[0].colorB, data.data2?.[0]?.bz2D_status || "OK", formatPrint(data.data2?.[0]?.bz2D_value || ""));
                    bz2ED.textContent = formatPrint(data.data[0].bz2E);
                    setFieldCheck(bz2FD, formatPrint(data.data[0].bz2F), data.data[0].colorB, data.data2?.[0]?.bz2F_status || "OK", formatPrint(data.data2?.[0]?.bz2F_value || ""));
                    bz3AD.textContent = formatPrint(data.data[0].bz3A);
                    setFieldCheck(bz3BD, formatPrint(data.data[0].bz3B), data.data[0].colorB, data.data2?.[0]?.bz3B_status || "OK", formatPrint(data.data2?.[0]?.bz3B_value || ""));
                    bz3CD.textContent = formatPrint(data.data[0].bz3C);
                    setFieldCheck(bz3DD, formatPrint(data.data[0].bz3D), data.data[0].colorB, data.data2?.[0]?.bz3D_status || "OK", formatPrint(data.data2?.[0]?.bz3D_value || ""));
                    bz3ED.textContent = formatPrint(data.data[0].bz3E);
                    setFieldCheck(bz3FD, formatPrint(data.data[0].bz3F), data.data[0].colorB, data.data2?.[0]?.bz3F_status || "OK", formatPrint(data.data2?.[0]?.bz3F_value || ""));
                    bz4AD.textContent = formatPrint(data.data[0].bz4A);
                    setFieldCheck(bz4BD, formatPrint(data.data[0].bz4B), data.data[0].colorB, data.data2?.[0]?.bz4B_status || "OK", formatPrint(data.data2?.[0]?.bz4B_value || ""));
                    bz4CD.textContent = formatPrint(data.data[0].bz4C);
                    setFieldCheck(bz4DD, formatPrint(data.data[0].bz4D), data.data[0].colorB, data.data2?.[0]?.bz4D_status || "OK", formatPrint(data.data2?.[0]?.bz4D_value || ""));
                    bz4ED.textContent = formatPrint(data.data[0].bz4E);
                    setFieldCheck(bz4FD, formatPrint(data.data[0].bz4F), data.data[0].colorB, data.data2?.[0]?.bz4F_status || "OK", formatPrint(data.data2?.[0]?.bz4F_value || ""));
                    bz5AD.textContent = formatPrint(data.data[0].bz5A);
                    setFieldCheck(bz5BD, formatPrint(data.data[0].bz5B), data.data[0].colorB, data.data2?.[0]?.bz5B_status || "OK", formatPrint(data.data2?.[0]?.bz5B_value || ""));
                    bz5CD.textContent = formatPrint(data.data[0].bz5C);
                    setFieldCheck(bz5DD, formatPrint(data.data[0].bz5D), data.data[0].colorB, data.data2?.[0]?.bz5D_status || "OK", formatPrint(data.data2?.[0]?.bz5D_value || ""));
                    bz5ED.textContent = formatPrint(data.data[0].bz5E);
                    setFieldCheck(bz5FD, formatPrint(data.data[0].bz5F), data.data[0].colorB, data.data2?.[0]?.bz5F_status || "OK", formatPrint(data.data2?.[0]?.bz5F_value || ""));
                    bz6AD.textContent = formatPrint(data.data[0].bz6A);
                    setFieldCheck(bz6BD, formatPrint(data.data[0].bz6B), data.data[0].colorB, data.data2?.[0]?.bz6B_status || "OK", formatPrint(data.data2?.[0]?.bz6B_value || ""));
                    bz6CD.textContent = formatPrint(data.data[0].bz6C);
                    setFieldCheck(bz6DD, formatPrint(data.data[0].bz6D), data.data[0].colorB, data.data2?.[0]?.bz6D_status || "OK", formatPrint(data.data2?.[0]?.bz6D_value || ""));
                    bz6ED.textContent = formatPrint(data.data[0].bz6E);
                    setFieldCheck(bz6FD, formatPrint(data.data[0].bz6F), data.data[0].colorB, data.data2?.[0]?.bz6F_status || "OK", formatPrint(data.data2?.[0]?.bz6F_value || ""));
                    scAD.textContent = formatPrint(data.data[0].scA);
                    setFieldCheck(scBD, formatPrint(data.data[0].scB), data.data[0].colorB, data.data2?.[0]?.scB_status || "OK", formatPrint(data.data2?.[0]?.scB_value || ""));
                    scCD.textContent = formatPrint(data.data[0].scC);
                    setFieldCheck(scDD, formatPrint(data.data[0].scD), data.data[0].colorB, data.data2?.[0]?.scD_status || "OK", formatPrint(data.data2?.[0]?.scD_value || ""));
                    scED.textContent = formatPrint(data.data[0].scE);
                    setFieldCheck(scFD, formatPrint(data.data[0].scF), data.data[0].colorB, data.data2?.[0]?.scF_status || "OK", formatPrint(data.data2?.[0]?.scF_value || ""));
                    mpAD.textContent = formatPrint(data.data[0].mpA);
                    setFieldCheck(mpBD, formatPrint(data.data[0].mpB), data.data[0].colorB, data.data2?.[0]?.mpB_status || "OK", formatPrint(data.data2?.[0]?.mpB_value || ""));
                    mpCD.textContent = formatPrint(data.data[0].mpC);
                    setFieldCheck(mpDD, formatPrint(data.data[0].mpD), data.data[0].colorB, data.data2?.[0]?.mpD_status || "OK", formatPrint(data.data2?.[0]?.mpD_value || ""));
                    mpED.textContent = formatPrint(data.data[0].mpE);
                    setFieldCheck(mpFD, formatPrint(data.data[0].mpF), data.data[0].colorB, data.data2?.[0]?.mpF_status || "OK", formatPrint(data.data2?.[0]?.mpF_value || ""));
                    ad1AD.textContent = formatPrint(data.data[0].ad1A);
                    setFieldCheck(ad1BD, formatPrint(data.data[0].ad1B), data.data[0].colorB, data.data2?.[0]?.ad1B_status || "OK", formatPrint(data.data2?.[0]?.ad1B_value || ""));
                    ad1CD.textContent = formatPrint(data.data[0].ad1C);
                    setFieldCheck(ad1DD, formatPrint(data.data[0].ad1D), data.data[0].colorB, data.data2?.[0]?.ad1D_status || "OK", formatPrint(data.data2?.[0]?.ad1D_value || ""));
                    ad1ED.textContent = formatPrint(data.data[0].ad1E);
                    setFieldCheck(ad1FD, formatPrint(data.data[0].ad1F), data.data[0].colorB, data.data2?.[0]?.ad1F_status || "OK", formatPrint(data.data2?.[0]?.ad1F_value || ""));
                    ad2AD.textContent = formatPrint(data.data[0].ad2A);
                    setFieldCheck(ad2BD, formatPrint(data.data[0].ad2B), data.data[0].colorB, data.data2?.[0]?.ad2B_status || "OK", formatPrint(data.data2?.[0]?.ad2B_value || ""));
                    ad2CD.textContent = formatPrint(data.data[0].ad2C);
                    setFieldCheck(ad2DD, formatPrint(data.data[0].ad2D), data.data[0].colorB, data.data2?.[0]?.ad2D_status || "OK", formatPrint(data.data2?.[0]?.ad2D_value || ""));
                    ad2ED.textContent = formatPrint(data.data[0].ad2E);
                    setFieldCheck(ad2FD, formatPrint(data.data[0].ad2F), data.data[0].colorB, data.data2?.[0]?.ad2F_status || "OK", formatPrint(data.data2?.[0]?.ad2F_value || ""));
                    wpheAD.textContent = data.data[0].wpheA;
                    setFieldCheck(wpheBD, data.data[0].wpheB, data.data[0].colorB, data.data2?.[0]?.wpheB_status || "OK", data.data2?.[0]?.wpheB_value || "");
                    wpheCD.textContent = data.data[0].wpheC;
                    setFieldCheck(wpheDD, data.data[0].wpheD, data.data[0].colorB, data.data2?.[0]?.wpheD_status || "OK", data.data2?.[0]?.wpheD_value || "");
                    wpheED.textContent = data.data[0].wpheE;
                    setFieldCheck(wpheFD, data.data[0].wpheF, data.data[0].colorB, data.data2?.[0]?.wpheF_status || "OK", data.data2?.[0]?.wpheF_value || "");
                    ipheAD.textContent = data.data[0].ipheA;
                    setFieldCheck(ipheBD, data.data[0].ipheB, data.data[0].colorB, data.data2?.[0]?.ipheB_status || "OK", data.data2?.[0]?.ipheB_value || "");
                    ipheCD.textContent = data.data[0].ipheC;
                    setFieldCheck(ipheDD, data.data[0].ipheD, data.data[0].colorB, data.data2?.[0]?.ipheD_status || "OK", data.data2?.[0]?.ipheD_value || "");
                    ipheED.textContent = data.data[0].ipheE;
                    setFieldCheck(ipheFD, data.data[0].ipheF, data.data[0].colorB, data.data2?.[0]?.ipheF_status || "OK", data.data2?.[0]?.ipheF_value || "");
                    mtAD.textContent = data.data[0].mtA;
                    setFieldCheck(mtBD, data.data[0].mtB, data.data[0].colorB, data.data2?.[0]?.mtB_status || "OK", data.data2?.[0]?.mtB_value || "");
                    mtCD.textContent = data.data[0].mtC;
                    setFieldCheck(mtDD, data.data[0].mtD, data.data[0].colorB, data.data2?.[0]?.mtD_status || "OK", data.data2?.[0]?.mtD_value || "");
                    mtED.textContent = data.data[0].mtE;
                    setFieldCheck(mtFD, data.data[0].mtF, data.data[0].colorB, data.data2?.[0]?.mtF_status || "OK", data.data2?.[0]?.mtF_value || "");
                    dz1AD.textContent = formatPrint(data.data[0].dz1A);
                    setFieldCheck(dz1BD, formatPrint(data.data[0].dz1B), data.data[0].colorB, data.data2?.[0]?.dz1B_status || "OK", formatPrint(data.data2?.[0]?.dz1B_value || ""));
                    dz1CD.textContent = formatPrint(data.data[0].dz1C);
                    setFieldCheck(dz1DD, formatPrint(data.data[0].dz1D), data.data[0].colorB, data.data2?.[0]?.dz1D_status || "OK", formatPrint(data.data2?.[0]?.dz1D_value || ""));
                    dz1ED.textContent = formatPrint(data.data[0].dz1E);
                    setFieldCheck(dz1FD, formatPrint(data.data[0].dz1F), data.data[0].colorB, data.data2?.[0]?.dz1F_status || "OK", formatPrint(data.data2?.[0]?.dz1F_value || ""));
                    dz2AD.textContent = formatPrint(data.data[0].dz2A);
                    setFieldCheck(dz2BD, formatPrint(data.data[0].dz2B), data.data[0].colorB, data.data2?.[0]?.dz2B_status || "OK", formatPrint(data.data2?.[0]?.dz2B_value || ""));
                    dz2CD.textContent = formatPrint(data.data[0].dz2C);
                    setFieldCheck(dz2DD, formatPrint(data.data[0].dz2D), data.data[0].colorB, data.data2?.[0]?.dz2D_status || "OK", formatPrint(data.data2?.[0]?.dz2D_value || ""));
                    dz2ED.textContent = formatPrint(data.data[0].dz2E);
                    setFieldCheck(dz2FD, formatPrint(data.data[0].dz2F), data.data[0].colorB, data.data2?.[0]?.dz2F_status || "OK", formatPrint(data.data2?.[0]?.dz2F_value || ""));
                    dz3AD.textContent = formatPrint(data.data[0].dz3A);
                    setFieldCheck(dz3BD, formatPrint(data.data[0].dz3B), data.data[0].colorB, data.data2?.[0]?.dz3B_status || "OK", formatPrint(data.data2?.[0]?.dz3B_value || ""));
                    dz3CD.textContent = formatPrint(data.data[0].dz3C);
                    setFieldCheck(dz3DD, formatPrint(data.data[0].dz3D), data.data[0].colorB, data.data2?.[0]?.dz3D_status || "OK", formatPrint(data.data2?.[0]?.dz3D_value || ""));
                    dz3ED.textContent = formatPrint(data.data[0].dz3E);
                    setFieldCheck(dz3FD, formatPrint(data.data[0].dz3F), data.data[0].colorB, data.data2?.[0]?.dz3F_status || "OK", formatPrint(data.data2?.[0]?.dz3F_value || ""));
                    dz4AD.textContent = formatPrint(data.data[0].dz4A);
                    setFieldCheck(dz4BD, formatPrint(data.data[0].dz4B), data.data[0].colorB, data.data2?.[0]?.dz4B_status || "OK", formatPrint(data.data2?.[0]?.dz4B_value || ""));
                    dz4CD.textContent = formatPrint(data.data[0].dz4C);
                    setFieldCheck(dz4DD, formatPrint(data.data[0].dz4D), data.data[0].colorB, data.data2?.[0]?.dz4D_status || "OK", formatPrint(data.data2?.[0]?.dz4D_value || ""));
                    dz4ED.textContent = formatPrint(data.data[0].dz4E);
                    setFieldCheck(dz4FD, formatPrint(data.data[0].dz4F), data.data[0].colorB, data.data2?.[0]?.dz4F_status || "OK", formatPrint(data.data2?.[0]?.dz4F_value || ""));
                    dz5AD.textContent = formatPrint(data.data[0].dz5A);
                    setFieldCheck(dz5BD, formatPrint(data.data[0].dz5B), data.data[0].colorB, data.data2?.[0]?.dz5B_status || "OK", formatPrint(data.data2?.[0]?.dz5B_value || ""));
                    dz5CD.textContent = formatPrint(data.data[0].dz5C);
                    setFieldCheck(dz5DD, formatPrint(data.data[0].dz5D), data.data[0].colorB, data.data2?.[0]?.dz5D_status || "OK", formatPrint(data.data2?.[0]?.dz5D_value || ""));
                    dz5ED.textContent = formatPrint(data.data[0].dz5E);
                    setFieldCheck(dz5FD, formatPrint(data.data[0].dz5F), data.data[0].colorB, data.data2?.[0]?.dz5F_status || "OK", formatPrint(data.data2?.[0]?.dz5F_value || ""));
                    haoAD.textContent = formatPrint(data.data[0].haoA);
                    setFieldCheck(haoBD, formatPrint(data.data[0].haoB), data.data[0].colorB, data.data2?.[0]?.haoB_status || "OK", formatPrint(data.data2?.[0]?.haoB_value || ""));
                    haoCD.textContent = formatPrint(data.data[0].haoC);
                    setFieldCheck(haoDD, formatPrint(data.data[0].haoD), data.data[0].colorB, data.data2?.[0]?.haoD_status || "OK", formatPrint(data.data2?.[0]?.haoD_value || ""));
                    haoED.textContent = formatPrint(data.data[0].haoE);
                    setFieldCheck(haoFD, formatPrint(data.data[0].haoF), data.data[0].colorB, data.data2?.[0]?.haoF_status || "OK", formatPrint(data.data2?.[0]?.haoF_value || ""));
                    unitAD.textContent = data.data[0].unitA;
                    setFieldCheck(unitBD, data.data[0].unitB, data.data[0].colorB, data.data2?.[0]?.unitB_status || "OK", data.data2?.[0]?.unitB_value || "");
                    unitCD.textContent = data.data[0].unitC;
                    setFieldCheck(unitDD, data.data[0].unitD, data.data[0].colorB, data.data2?.[0]?.unitD_status || "OK", data.data2?.[0]?.unitD_value || "");
                    unitED.textContent = data.data[0].unitE;
                    setFieldCheck(unitFD, data.data[0].unitF, data.data[0].colorB, data.data2?.[0]?.unitF_status || "OK", data.data2?.[0]?.unitF_value || "");
                    mp2AD.textContent = data.data[0].mp2A;
                    setFieldCheck(mp2BD, data.data[0].mp2B, data.data[0].colorB, data.data2?.[0]?.mp2B_status || "OK", data.data2?.[0]?.mp2B_value || "");
                    mp2CD.textContent = data.data[0].mp2C;
                    setFieldCheck(mp2DD, data.data[0].mp2D, data.data[0].colorB, data.data2?.[0]?.mp2D_status || "OK", data.data2?.[0]?.mp2D_value || "");
                    mp2ED.textContent = data.data[0].mp2E;
                    setFieldCheck(mp2FD, data.data[0].mp2F, data.data[0].colorB, data.data2?.[0]?.mp2F_status || "OK", data.data2?.[0]?.mp2F_value || "");
                    extAD.textContent = data.data[0].extA;
                    setFieldCheck(extBD, data.data[0].extB, data.data[0].colorB, data.data2?.[0]?.extB_status || "OK", data.data2?.[0]?.extB_value || "");
                    extCD.textContent = data.data[0].extC;
                    setFieldCheck(extDD, data.data[0].extD, data.data[0].colorB, data.data2?.[0]?.extD_status || "OK", data.data2?.[0]?.extD_value || "");
                    extED.textContent = data.data[0].extE;
                    setFieldCheck(extFD, data.data[0].extF, data.data[0].colorB, data.data2?.[0]?.extF_status || "OK", data.data2?.[0]?.extF_value || "");
                    niprAD.textContent = data.data[0].niprA;
                    setFieldCheck(niprBD, data.data[0].niprB, data.data[0].colorB, data.data2?.[0]?.niprB_status || "OK", data.data2?.[0]?.niprB_value || "");
                    niprCD.textContent = data.data[0].niprC;
                    setFieldCheck(niprDD, data.data[0].niprD, data.data[0].colorB, data.data2?.[0]?.niprD_status || "OK", data.data2?.[0]?.niprD_value || "");
                    niprED.textContent = data.data[0].niprE;
                    setFieldCheck(niprFD, data.data[0].niprF, data.data[0].colorB, data.data2?.[0]?.niprF_status || "OK", data.data2?.[0]?.niprF_value || "");
                    trAD.textContent = data.data[0].trA;
                    setFieldCheck(trBD, data.data[0].trB, data.data[0].colorB, data.data2?.[0]?.trB_status || "OK", data.data2?.[0]?.trB_value || "");
                    trCD.textContent = data.data[0].trC;
                    setFieldCheck(trDD, data.data[0].trD, data.data[0].colorB, data.data2?.[0]?.trD_status || "OK", data.data2?.[0]?.trD_value || "");
                    trED.textContent = data.data[0].trE;
                    setFieldCheck(trFD, data.data[0].trF, data.data[0].colorB, data.data2?.[0]?.trF_status || "OK", data.data2?.[0]?.trF_value || "");
                    huAD.textContent = data.data[0].huA;
                    setFieldCheck(huBD, data.data[0].huB, data.data[0].colorB, data.data2?.[0]?.huB_status || "OK", data.data2?.[0]?.huB_value || "");
                    huCD.textContent = data.data[0].huC;
                    setFieldCheck(huDD, data.data[0].huD, data.data[0].colorB, data.data2?.[0]?.huD_status || "OK", data.data2?.[0]?.huD_value || "");
                    huED.textContent = data.data[0].huE;
                    setFieldCheck(huFD, data.data[0].huF, data.data[0].colorB, data.data2?.[0]?.huF_status || "OK", data.data2?.[0]?.huF_value || "");
                    isuAD.textContent = data.data[0].isuA;
                    setFieldCheck(isuBD, data.data[0].isuB, data.data[0].colorB, data.data2?.[0]?.isuB_status || "OK", data.data2?.[0]?.isuB_value || "");
                    isuCD.textContent = data.data[0].isuC;
                    setFieldCheck(isuDD, data.data[0].isuD, data.data[0].colorB, data.data2?.[0]?.isuD_status || "OK", data.data2?.[0]?.isuD_value || "");
                    isuED.textContent = data.data[0].isuE;
                    setFieldCheck(isuFD, data.data[0].isuF, data.data[0].colorB, data.data2?.[0]?.isuF_status || "OK", data.data2?.[0]?.isuF_value || "");
                    suAD.textContent = data.data[0].suA;
                    setFieldCheck(suBD, data.data[0].suB, data.data[0].colorB, data.data2?.[0]?.suB_status || "OK", data.data2?.[0]?.suB_value || "");
                    suCD.textContent = data.data[0].suC;
                    setFieldCheck(suDD, data.data[0].suD, data.data[0].colorB, data.data2?.[0]?.suD_status || "OK", data.data2?.[0]?.suD_value || "");
                    suED.textContent = data.data[0].suE;
                    setFieldCheck(suFD, data.data[0].suF, data.data[0].colorB, data.data2?.[0]?.suF_status || "OK", data.data2?.[0]?.suF_value || "");
                    pauAD.textContent = data.data[0].pauA;
                    setFieldCheck(pauBD, data.data[0].pauB, data.data[0].colorB, data.data2?.[0]?.pauB_status || "OK", data.data2?.[0]?.pauB_value || "");
                    pauCD.textContent = data.data[0].pauC;
                    setFieldCheck(pauDD, data.data[0].pauD, data.data[0].colorB, data.data2?.[0]?.pauD_status || "OK", data.data2?.[0]?.pauD_value || "");
                    pauED.textContent = data.data[0].pauE;
                    setFieldCheck(pauFD, data.data[0].pauF, data.data[0].colorB, data.data2?.[0]?.pauF_status || "OK", data.data2?.[0]?.pauF_value || "");
                    auAD.textContent = data.data[0].auA;
                    setFieldCheck(auBD, data.data[0].auB, data.data[0].colorB, data.data2?.[0]?.auB_status || "OK", data.data2?.[0]?.auB_value || "");
                    auCD.textContent = data.data[0].auC;
                    setFieldCheck(auDD, data.data[0].auD, data.data[0].colorB, data.data2?.[0]?.auD_status || "OK", data.data2?.[0]?.auD_value || "");
                    auED.textContent = data.data[0].auE;
                    setFieldCheck(auFD, data.data[0].auF, data.data[0].colorB, data.data2?.[0]?.auF_status || "OK", data.data2?.[0]?.auF_value || "");
                    wgAD.textContent = data.data[0].wgA;
                    setFieldCheck(wgBD, data.data[0].wgB, data.data[0].colorB, data.data2?.[0]?.wgB_status || "OK", data.data2?.[0]?.wgB_value || "");
                    wgCD.textContent = data.data[0].wgC;
                    setFieldCheck(wgDD, data.data[0].wgD, data.data[0].colorB, data.data2?.[0]?.wgD_status || "OK", data.data2?.[0]?.wgD_value || "");
                    wgED.textContent = data.data[0].wgE;
                    setFieldCheck(wgFD, data.data[0].wgF, data.data[0].colorB, data.data2?.[0]?.wgF_status || "OK", data.data2?.[0]?.wgF_value || "");
                    fewAD.textContent = data.data[0].fewA;
                    setFieldCheck(fewBD, data.data[0].fewB, data.data[0].colorB, data.data2?.[0]?.fewB_status || "OK", data.data2?.[0]?.fewB_value || "");
                    fewCD.textContent = data.data[0].fewC;
                    setFieldCheck(fewDD, data.data[0].fewD, data.data[0].colorB, data.data2?.[0]?.fewD_status || "OK", data.data2?.[0]?.fewD_value || "");
                    fewED.textContent = data.data[0].fewE;
                    setFieldCheck(fewFD, data.data[0].fewF, data.data[0].colorB, data.data2?.[0]?.fewF_status || "OK", data.data2?.[0]?.fewF_value || "");
                    noyAD.textContent = data.data[0].noyA;
                    setFieldCheck(noyBD, data.data[0].noyB, data.data[0].colorB, data.data2?.[0]?.noyB_status || "OK", data.data2?.[0]?.noyB_value || "");
                    noyCD.textContent = data.data[0].noyC;
                    setFieldCheck(noyDD, data.data[0].noyD, data.data[0].colorB, data.data2?.[0]?.noyD_status || "OK", data.data2?.[0]?.noyD_value || "");
                    noyED.textContent = data.data[0].noyE;
                    setFieldCheck(noyFD, data.data[0].noyF, data.data[0].colorB, data.data2?.[0]?.noyF_status || "OK", data.data2?.[0]?.noyF_value || "");
                    swAD.textContent = data.data[0].swA;
                    setFieldCheck(swBD, data.data[0].swB, data.data[0].colorB, data.data2?.[0]?.swB_status || "OK", data.data2?.[0]?.swB_value || "");
                    swCD.textContent = data.data[0].swC;
                    setFieldCheck(swDD, data.data[0].swD, data.data[0].colorB, data.data2?.[0]?.swD_status || "OK", data.data2?.[0]?.swD_value || "");
                    swED.textContent = data.data[0].swE;
                    setFieldCheck(swFD, data.data[0].swF, data.data[0].colorB, data.data2?.[0]?.swF_status || "OK", data.data2?.[0]?.swF_value || "");
                    totrAD.textContent = data.data[0].totrA;
                    setFieldCheck(totrBD, data.data[0].totrB, data.data[0].colorB, data.data2?.[0]?.totrB_status || "OK", data.data2?.[0]?.totrB_value || "");
                    totrCD.textContent = data.data[0].totrC;
                    setFieldCheck(totrDD, data.data[0].totrD, data.data[0].colorB, data.data2?.[0]?.totrD_status || "OK", data.data2?.[0]?.totrD_value || "");
                    totrED.textContent = data.data[0].totrE;
                    setFieldCheck(totrFD, data.data[0].totrF, data.data[0].colorB, data.data2?.[0]?.totrF_status || "OK", data.data2?.[0]?.totrF_value || "");
                    relaxAD.textContent = data.data[0].relaxA;
                    setFieldCheck(relaxBD, data.data[0].relaxB, data.data[0].colorB, data.data2?.[0]?.relaxB_status || "OK", data.data2?.[0]?.relaxB_value || "");
                    relaxCD.textContent = data.data[0].relaxC;
                    setFieldCheck(relaxDD, data.data[0].relaxD, data.data[0].colorB, data.data2?.[0]?.relaxD_status || "OK", data.data2?.[0]?.relaxD_value || "");
                    relaxED.textContent = data.data[0].relaxE;
                    setFieldCheck(relaxFD, data.data[0].relaxF, data.data[0].colorB, data.data2?.[0]?.relaxF_status || "OK", data.data2?.[0]?.relaxF_value || "");
                    tp2AD.textContent = data.data[0].tp2A;
                    setFieldCheck(tp2BD, data.data[0].tp2B, data.data[0].colorB, data.data2?.[0]?.tp2B_status || "OK", data.data2?.[0]?.tp2B_value || "");
                    tp2CD.textContent = data.data[0].tp2C;
                    setFieldCheck(tp2DD, data.data[0].tp2D, data.data[0].colorB, data.data2?.[0]?.tp2D_status || "OK", data.data2?.[0]?.tp2D_value || "");
                    tp2ED.textContent = data.data[0].tp2E;
                    setFieldCheck(tp2FD, data.data[0].tp2F, data.data[0].colorB, data.data2?.[0]?.tp2F_status || "OK", data.data2?.[0]?.tp2F_value || "");
                    tp1AD.textContent = data.data[0].tp1A;
                    setFieldCheck(tp1BD, data.data[0].tp1B, data.data[0].colorB, data.data2?.[0]?.tp1B_status || "OK", data.data2?.[0]?.tp1B_value || "");
                    tp1CD.textContent = data.data[0].tp1C;
                    setFieldCheck(tp1DD, data.data[0].tp1D, data.data[0].colorB, data.data2?.[0]?.tp1D_status || "OK", data.data2?.[0]?.tp1D_value || "");
                    tp1ED.textContent = data.data[0].tp1E;
                    setFieldCheck(tp1FD, data.data[0].tp1F, data.data[0].colorB, data.data2?.[0]?.tp1F_status || "OK", data.data2?.[0]?.tp1F_value || "");
                    tp3AD.textContent = data.data[0].tp3A;
                    setFieldCheck(tp3BD, data.data[0].tp3B, data.data[0].colorB, data.data2?.[0]?.tp3B_status || "OK", data.data2?.[0]?.tp3B_value || "");
                    tp3CD.textContent = data.data[0].tp3C;
                    setFieldCheck(tp3DD, data.data[0].tp3D, data.data[0].colorB, data.data2?.[0]?.tp3D_status || "OK", data.data2?.[0]?.tp3D_value || "");
                    tp3ED.textContent = data.data[0].tp3E;
                    setFieldCheck(tp3FD, data.data[0].tp3F, data.data[0].colorB, data.data2?.[0]?.tp3F_status || "OK", data.data2?.[0]?.tp3F_value || "");
                    at1AD.textContent = data.data[0].at1A;
                    setFieldCheck(at1BD, data.data[0].at1B, data.data[0].colorB, data.data2?.[0]?.at1B_status || "OK", data.data2?.[0]?.at1B_value || "");
                    at1CD.textContent = data.data[0].at1C;
                    setFieldCheck(at1DD, data.data[0].at1D, data.data[0].colorB, data.data2?.[0]?.at1D_status || "OK", data.data2?.[0]?.at1D_value || "");
                    at1ED.textContent = data.data[0].at1E;
                    setFieldCheck(at1FD, data.data[0].at1F, data.data[0].colorB, data.data2?.[0]?.at1F_status || "OK", data.data2?.[0]?.at1F_value || "");
                    at2AD.textContent = data.data[0].at2A;
                    setFieldCheck(at2BD, data.data[0].at2B, data.data[0].colorB, data.data2?.[0]?.at2B_status || "OK", data.data2?.[0]?.at2B_value || "");
                    at2CD.textContent = data.data[0].at2C;
                    setFieldCheck(at2DD, data.data[0].at2D, data.data[0].colorB, data.data2?.[0]?.at2D_status || "OK", data.data2?.[0]?.at2D_value || "");
                    at2ED.textContent = data.data[0].at2E;
                    setFieldCheck(at2FD, data.data[0].at2F, data.data[0].colorB, data.data2?.[0]?.at2F_status || "OK", data.data2?.[0]?.at2F_value || "");
                    tfAD.textContent = data.data[0].tfA;
                    setFieldCheck(tfBD, data.data[0].tfB, data.data[0].colorB, data.data2?.[0]?.tfB_status || "OK", data.data2?.[0]?.tfB_value || "");
                    tfCD.textContent = data.data[0].tfC;
                    setFieldCheck(tfDD, data.data[0].tfD, data.data[0].colorB, data.data2?.[0]?.tfD_status || "OK", data.data2?.[0]?.tfD_value || "");
                    tfED.textContent = data.data[0].tfE;
                    setFieldCheck(tfFD, data.data[0].tfF, data.data[0].colorB, data.data2?.[0]?.tfF_status || "OK", data.data2?.[0]?.tfF_value || "");
                    ldAD.textContent = data.data[0].ldA;
                    setFieldCheck(ldBD, data.data[0].ldB, data.data[0].colorB, data.data2?.[0]?.ldB_status || "OK", data.data2?.[0]?.ldB_value || "");
                    ldCD.textContent = data.data[0].ldC;
                    setFieldCheck(ldDD, data.data[0].ldD, data.data[0].colorB, data.data2?.[0]?.ldD_status || "OK", data.data2?.[0]?.ldD_value || "");
                    ldED.textContent = data.data[0].ldE;
                    setFieldCheck(ldFD, data.data[0].ldF, data.data[0].colorB, data.data2?.[0]?.ldF_status || "OK", data.data2?.[0]?.ldF_value || "");
                    if (data.data[0].time1) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].time1);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].time1.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("time1D").textContent = jamMenit;
                    }
                    remark1D.textContent = data.data[0].remark1;
                    if (data.data[0].time2) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].time2);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].time2.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("time2D").textContent = jamMenit;
                    }
                    remark2D.textContent = data.data[0].remark2;
                    if (data.data[0].time3) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].time3);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].time3.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("time3D").textContent = jamMenit;
                    }
                    remark3D.textContent = data.data[0].remark3;
                    if (data.data[0].time4) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].time4);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].time4.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("time4D").textContent = jamMenit;
                    }
                    remark4D.textContent = data.data[0].remark4;

                    kwhM1D.textContent = data.data[0].kwhM1;
                    kwhM2D.textContent = data.data[0].kwhM2;
                    if (data.data[0].jamProd) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].jamProd);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].jamProd.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("jamProdD").textContent = jamMenit;
                    }
                    ppAD.textContent = data.data[0].ppA;
                    ppBD.textContent = data.data[0].ppB;
                    ppCD.textContent = data.data[0].ppC;
                    ppDD.textContent = data.data[0].ppD;
                    cacAD.textContent = data.data[0].cacA;
                    cacBD.textContent = data.data[0].cacB;
                    cacCD.textContent = data.data[0].cacC;
                    cacDD.textContent = data.data[0].cacD;
                    cacED.textContent = data.data[0].cacE;
                    cacFD.textContent = data.data[0].cacF;
                    mbATD.textContent = data.data[0].mbAT;
                    mbAD.textContent = data.data[0].mbA;
                    mbBD.textContent = data.data[0].mbB;
                    mbCD.textContent = data.data[0].mbC;
                    mbDD.textContent = data.data[0].mbD;
                    mbED.textContent = data.data[0].mbE;
                    mbFD.textContent = data.data[0].mbF;
                    uvATD.textContent = data.data[0].uvAT;
                    uvAD.textContent = data.data[0].uvA;
                    uvBD.textContent = data.data[0].uvB;
                    uvCD.textContent = data.data[0].uvC;
                    uvDD.textContent = data.data[0].uvD;
                    uvED.textContent = data.data[0].uvE;
                    uvFD.textContent = data.data[0].uvF;
                    asbATD.textContent = data.data[0].asbAT;
                    asbAD.textContent = data.data[0].asbA;
                    asbBD.textContent = data.data[0].asbB;
                    asbCD.textContent = data.data[0].asbC;
                    asbDD.textContent = data.data[0].asbD;
                    asbED.textContent = data.data[0].asbE;
                    asbFD.textContent = data.data[0].asbF;
                    llATD.textContent = data.data[0].llAT;
                    llAD.textContent = data.data[0].llA;
                    llBD.textContent = data.data[0].llB;
                    llCD.textContent = data.data[0].llC;
                    llDD.textContent = data.data[0].llD;
                    llFD.textContent = data.data[0].llF;
                    bngMD.textContent = data.data[0].bngM ?? numeral(0).format("0,0.00");
                    prongMD.textContent = data.data[0].prongM ?? numeral(0).format("0,0.00");
                    silMD.textContent = data.data[0].silM ?? numeral(0).format("0,0.00");
                    bngLD.textContent = data.data[0].bngL ?? numeral(0).format("0,0.00");
                    prongLD.textContent = data.data[0].prongL ?? numeral(0).format("0,0.00");
                    silLD.textContent = data.data[0].silL ?? numeral(0).format("0,0.00");
                    bngMeD.textContent = data.data[0].bngMe ?? numeral(0).format("0,0.00");
                    prongMeD.textContent = data.data[0].prongMe ?? numeral(0).format("0,0.00");
                    silMeD.textContent = data.data[0].silMe ?? numeral(0).format("0,0.00");
                    bngGBD.textContent = data.data[0].bngGB ?? numeral(0).format("0,0.00");
                    prongGBD.textContent = data.data[0].prongGB ?? numeral(0).format("0,0.00");
                    silGBD.textContent = data.data[0].silGB ?? numeral(0).format("0,0.00");
                    bngLLD.textContent = data.data[0].bngLL ?? numeral(0).format("0,0.00");
                    prongLLD.textContent = data.data[0].prongLL ?? numeral(0).format("0,0.00");
                    silLLD.textContent = data.data[0].silLL ?? numeral(0).format("0,0.00");
                    // totalD.textContent = data.data[0].total;
                    if (data.data[0].total != null && data.data[0].total !== "") {
                        totalD.textContent = data.data[0].total;
                    } else {
                        hitungTotalD();
                    }
                    document.getElementById("ketHeadD").textContent = "Keterangan"
                    highlightRowD("bz1");
                    highlightRowD("bz2");
                    highlightRowD("bz3");
                    highlightRowD("bz4");
                    highlightRowD("bz5");
                    highlightRowD("bz6");

                    highlightRowD("sc");
                    highlightRowD("mp");
                    highlightRowD("ad1");
                    highlightRowD("ad2");
                    highlightRowD("wphe");
                    highlightRowD("iphe");
                    highlightRowD("mt");

                    highlightRowD("dz1");
                    highlightRowD("dz2");
                    highlightRowD("dz3");
                    highlightRowD("dz4");
                    highlightRowD("dz5");

                    highlightRowD("hao");
                    highlightRowD("unit");

                    highlightRowD("mp2");
                    highlightRowD("ext");
                    highlightRowD("nipr");
                    highlightRowD("tr");
                    highlightRowD("hu");
                    highlightRowD("isu");
                    highlightRowD("su");
                    highlightRowD("pau");
                    highlightRowD("au");
                    highlightRowD("wg");
                    highlightRowD("few");
                    highlightRowD("noy");
                    highlightRowD("sw");
                    highlightRowD("totr");
                    highlightRowD("relax");

                    highlightRowD("tp2");
                    highlightRowD("tp1");
                    highlightRowD("tp3");
                    highlightRowD("at1");
                    highlightRowD("at2");
                    highlightRowD("tf");
                    highlightRowD("ld");
                    keteranganD.innerHTML = data.data[0].keterangan
                        ? data.data[0].keterangan.replace(/\n/g, "<br>")
                        : "<br><br><br><br><br>";
                    $("#modalLohia").modal("show");

                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                },
            });
        } else {
            $.ajax({
                url: "VerifikasiSM/getDataPrint",
                type: "GET",
                data: {
                    _token: csrfToken,
                    idLaporan: id,
                    keterangan: keterangan.value
                },
                success: function (data) {
                    console.log(data.data[0].userVerified, data.data[0].userACCSPV);
                    
                    if (data.data[0].userVerified !== null) {
                        btn_simpanKet.disabled = true;
                    } else {
                        btn_simpanKet.disabled = false;
                    }

                    if (data.data && data.data.length > 0) {
                        $("#ttd_qc")
                            .text(data.data[0].userVerified)
                            .show();
                    } else {
                        $("#ttd_qc")
                            .text("")
                            .hide();
                    }

                    if (data.data && data.data.length > 0) {
                        $("#ttd_spvqc")
                            .text(data.data[0].userACCSPV)
                            .show();
                    } else {
                        $("#ttd_spvqc")
                            .text("")
                            .hide();
                    }
                    // if (data.ttd && data.ttd.FotoTtd && data.ttd.FotoTtd !== "") {

                    //     let ttd = data.ttd.FotoTtd;

                    //     // pastikan ada prefix base64
                    //     if (!ttd.startsWith("data:image")) {
                    //         ttd = "data:image/png;base64," + ttd;
                    //     }

                    //     /* ====== TAMPIL KE IMG ====== */
                    //     $("#ttd_qc")
                    //         .attr("src", ttd)
                    //         .show();
                    // } else {
                    //     $("#ttd_qc")
                    //         .attr("src", "")
                    //         .show();
                    // }
                    const fieldsB = [
                        "timeB", "c1B", "c2B", "c3B", "c4B", "c5B", "c6B", "c7B", "c8B",
                        "flB", "scB", "jnB", "d1B", "d2B", "d3B", "d4B", "d5B", "d6B",
                        "srB", "mrB", "mvB", "mpp1B", "mpp2B", "qbB", "fewB", "swB",
                        "noyB", "wgB", "rs1B", "rs2B", "rs3B", "strB", "rB", "uotB",
                        "lotB", "at1B", "at2B", "at3B"
                    ];

                    const fieldsC = [
                        "timeC", "c1C", "c2C", "c3C", "c4C", "c5C", "c6C", "c7C", "c8C",
                        "flC", "scC", "jnC", "d1C", "d2C", "d3C", "d4C", "d5C", "d6C",
                        "srC", "mrC", "mvC", "mpp1C", "mpp2C", "qbC", "fewC", "swC",
                        "noyC", "wgC", "rs1C", "rs2C", "rs3C", "strC", "rC", "uotC",
                        "lotC", "at1C", "at2C", "at3C"
                    ];

                    const fieldsD = [
                        "timeD", "c1D", "c2D", "c3D", "c4D", "c5D", "c6D", "c7D", "c8D",
                        "flD", "scD", "jnD", "d1D", "d2D", "d3D", "d4D", "d5D", "d6D",
                        "srD", "mrD", "mvD", "mpp1D", "mpp2D", "qbD", "fewD", "swD",
                        "noyD", "wgD", "rs1D", "rs2D", "rs3D", "strD", "rD", "uotD",
                        "lotD", "at1D", "at2D", "at3D"
                    ];

                    const fieldsE = [
                        "timeE", "c1E", "c2E", "c3E", "c4E", "c5E", "c6E", "c7E", "c8E",
                        "flE", "scE", "jnE", "d1E", "d2E", "d3E", "d4E", "d5E", "d6E",
                        "srE", "mrE", "mvE", "mpp1E", "mpp2E", "qbE", "fewE", "swE",
                        "noyE", "wgE", "rs1E", "rs2E", "rs3E", "strE", "rE", "uotE",
                        "lotE", "at1E", "at2E", "at3E"
                    ];

                    const fieldsF = [
                        "timeF", "c1F", "c2F", "c3F", "c4F", "c5F", "c6F", "c7F", "c8F",
                        "flF", "scF", "jnF", "d1F", "d2F", "d3F", "d4F", "d5F", "d6F",
                        "srF", "mrF", "mvF", "mpp1F", "mpp2F", "qbF", "fewF", "swF",
                        "noyF", "wgF", "rs1F", "rs2F", "rs3F", "strF", "rF", "uotF",
                        "lotF", "at1F", "at2F", "at3F"
                    ];

                    const fieldsG = [
                        "timeG", "c1G", "c2G", "c3G", "c4G", "c5G", "c6G", "c7G", "c8G",
                        "flG", "scG", "jnG", "d1G", "d2G", "d3G", "d4G", "d5G", "d6G",
                        "srG", "mrG", "mvG", "mpp1G", "mpp2G", "qbG", "fewG", "swG",
                        "noyG", "wgG", "rs1G", "rs2G", "rs3G", "strG", "rG", "uotG",
                        "lotG", "at1G", "at2G", "at3G"
                    ];

                    // ======== Kolom B ========
                    let colorB = data.data[0].colorB === "red" ? "red" : "black";
                    applyColorGroup(fieldsB, colorB);
                    // set radio
                    let rowB = document.querySelector(`input[name="colorB"][value="${colorB}"]`);
                    if (rowB) {
                        rowB.checked = true;
                        rowB.dispatchEvent(new Event("change"));
                    }

                    // ======== Kolom C ========
                    let colorC = data.data[0].colorC === "red" ? "red" : "black";
                    applyColorGroup(fieldsC, colorC);
                    let rowC = document.querySelector(`input[name="colorC"][value="${colorC}"]`);
                    if (rowC) {
                        rowC.checked = true;
                        rowC.dispatchEvent(new Event("change"));
                    }

                    // ======== Kolom D ========
                    let colorD = data.data[0].colorD === "red" ? "red" : "black";
                    applyColorGroup(fieldsD, colorD);
                    let rowD = document.querySelector(`input[name="colorD"][value="${colorD}"]`);
                    if (rowD) {
                        rowD.checked = true;
                        rowD.dispatchEvent(new Event("change"));
                    }

                    // ======== Kolom E ========
                    let colorE = data.data[0].colorE === "red" ? "red" : "black";
                    applyColorGroup(fieldsE, colorE);
                    let rowE = document.querySelector(`input[name="colorE"][value="${colorE}"]`);
                    if (rowE) {
                        rowE.checked = true;
                        rowE.dispatchEvent(new Event("change"));
                    }

                    // ======== Kolom F ========
                    let colorF = data.data[0].colorF === "red" ? "red" : "black";
                    applyColorGroup(fieldsF, colorF);
                    let rowF = document.querySelector(`input[name="colorF"][value="${colorF}"]`);
                    if (rowF) {
                        rowF.checked = true;
                        rowF.dispatchEvent(new Event("change"));
                    }

                    // ======== Kolom G ========
                    let colorG = data.data[0].colorG === "red" ? "red" : "black";
                    applyColorGroup(fieldsG, colorG);
                    let rowG = document.querySelector(`input[name="colorG"][value="${colorG}"]`);
                    if (rowG) {
                        rowG.checked = true;
                        rowG.dispatchEvent(new Event("change"));
                    }

                    referensi.textContent = data.data[0].referensi;
                    if (data.data[0].tanggal) {
                        const tgl = data.data[0].tanggal.split(' ')[0];
                        document.getElementById("tanggal").value = tgl;
                    }
                    halaman.innerHTML = '1&emsp;Dari&emsp;1';
                    effisiensi.textContent = data.data[0].effisiensi;
                    if (data.data[0].shiftValue) {
                        document.getElementById("shiftValue").value = data.data[0].shiftValue;
                        const targetShift = document.querySelector(`.shift-option[data-value="${data.data[0].shiftValue}"]`);
                        if (targetShift) targetShift.classList.add("active");
                    }
                    if (data.data[0].timeStart) {
                        const date = new Date(data.data[0].timeStart);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            document.getElementById("timeStart").value = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].timeStart.match(/(\d{2}):(\d{2})/);
                            if (match) document.getElementById("timeStart").value = `${match[1]}:${match[2]}`;
                        }
                    }
                    if (data.data[0].timeEnd) {
                        const date = new Date(data.data[0].timeEnd);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            document.getElementById("timeEnd").value = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].timeEnd.match(/(\d{2}):(\d{2})/);
                            if (match) document.getElementById("timeEnd").value = `${match[1]}:${match[2]}`;
                        }
                    }
                    spek_mesin.textContent = data.data[0].spek_mesin;
                    spek_benang.textContent = data.data[0].spek_benang;
                    if (data.data[0].timeA) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].timeA);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].timeA.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("timeA").textContent = jamMenit;
                    }
                    if (data.data[0].timeB) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].timeB);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].timeB.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("timeB").textContent = jamMenit;
                    }
                    if (data.data[0].timeC) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].timeC);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].timeC.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("timeC").textContent = jamMenit;
                    }
                    if (data.data[0].timeD) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].timeD);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].timeD.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("timeD").textContent = jamMenit;
                    }
                    if (data.data[0].timeE) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].timeE);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].timeE.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("timeE").textContent = jamMenit;
                    }
                    if (data.data[0].timeF) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].timeF);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].timeF.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("timeF").textContent = jamMenit;
                    }
                    if (data.data[0].timeG) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].timeG);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].timeG.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("timeG").textContent = jamMenit;
                    }
                    c1A.textContent = formatPrint(data.data[0].c1A);
                    setFieldCheck(c1B, formatPrint(data.data[0].c1B), data.data[0].colorB, data.data2?.[0]?.c1B_status || "OK", formatPrint(data.data2?.[0]?.c1B_value || ""));
                    setFieldCheck(c1C, formatPrint(data.data[0].c1C), data.data[0].colorC, data.data2?.[0]?.c1C_status || "OK", formatPrint(data.data2?.[0]?.c1C_value || ""));
                    setFieldCheck(c1D, formatPrint(data.data[0].c1D), data.data[0].colorD, data.data2?.[0]?.c1D_status || "OK", formatPrint(data.data2?.[0]?.c1D_value || ""));
                    setFieldCheck(c1E, formatPrint(data.data[0].c1E), data.data[0].colorE, data.data2?.[0]?.c1E_status || "OK", formatPrint(data.data2?.[0]?.c1E_value || ""));
                    setFieldCheck(c1F, formatPrint(data.data[0].c1F), data.data[0].colorF, data.data2?.[0]?.c1F_status || "OK", formatPrint(data.data2?.[0]?.c1F_value || ""));
                    setFieldCheck(c1G, formatPrint(data.data[0].c1G), data.data[0].colorG, data.data2?.[0]?.c1G_status || "OK", formatPrint(data.data2?.[0]?.c1G_value || ""));
                    c2A.textContent = formatPrint(data.data[0].c2A);
                    setFieldCheck(c2B, formatPrint(data.data[0].c2B), data.data[0].colorB, data.data2?.[0]?.c2B_status || "OK", formatPrint(data.data2?.[0]?.c2B_value || ""));
                    setFieldCheck(c2C, formatPrint(data.data[0].c2C), data.data[0].colorC, data.data2?.[0]?.c2C_status || "OK", formatPrint(data.data2?.[0]?.c2C_value || ""));
                    setFieldCheck(c2D, formatPrint(data.data[0].c2D), data.data[0].colorD, data.data2?.[0]?.c2D_status || "OK", formatPrint(data.data2?.[0]?.c2D_value || ""));
                    setFieldCheck(c2E, formatPrint(data.data[0].c2E), data.data[0].colorE, data.data2?.[0]?.c2E_status || "OK", formatPrint(data.data2?.[0]?.c2E_value || ""));
                    setFieldCheck(c2F, formatPrint(data.data[0].c2F), data.data[0].colorF, data.data2?.[0]?.c2F_status || "OK", formatPrint(data.data2?.[0]?.c2F_value || ""));
                    setFieldCheck(c2G, formatPrint(data.data[0].c2G), data.data[0].colorG, data.data2?.[0]?.c2G_status || "OK", formatPrint(data.data2?.[0]?.c2G_value || ""));
                    c3A.textContent = formatPrint(data.data[0].c3A);
                    setFieldCheck(c3B, formatPrint(data.data[0].c3B), data.data[0].colorB, data.data2?.[0]?.c3B_status || "OK", formatPrint(data.data2?.[0]?.c3B_value || ""));
                    setFieldCheck(c3C, formatPrint(data.data[0].c3C), data.data[0].colorC, data.data2?.[0]?.c3C_status || "OK", formatPrint(data.data2?.[0]?.c3C_value || ""));
                    setFieldCheck(c3D, formatPrint(data.data[0].c3D), data.data[0].colorD, data.data2?.[0]?.c3D_status || "OK", formatPrint(data.data2?.[0]?.c3D_value || ""));
                    setFieldCheck(c3E, formatPrint(data.data[0].c3E), data.data[0].colorE, data.data2?.[0]?.c3E_status || "OK", formatPrint(data.data2?.[0]?.c3E_value || ""));
                    setFieldCheck(c3F, formatPrint(data.data[0].c3F), data.data[0].colorF, data.data2?.[0]?.c3F_status || "OK", formatPrint(data.data2?.[0]?.c3F_value || ""));
                    setFieldCheck(c3G, formatPrint(data.data[0].c3G), data.data[0].colorG, data.data2?.[0]?.c3G_status || "OK", formatPrint(data.data2?.[0]?.c3G_value || ""));
                    c4A.textContent = formatPrint(data.data[0].c4A);
                    setFieldCheck(c4B, formatPrint(data.data[0].c4B), data.data[0].colorB, data.data2?.[0]?.c4B_status || "OK", formatPrint(data.data2?.[0]?.c4B_value || ""));
                    setFieldCheck(c4C, formatPrint(data.data[0].c4C), data.data[0].colorC, data.data2?.[0]?.c4C_status || "OK", formatPrint(data.data2?.[0]?.c4C_value || ""));
                    setFieldCheck(c4D, formatPrint(data.data[0].c4D), data.data[0].colorD, data.data2?.[0]?.c4D_status || "OK", formatPrint(data.data2?.[0]?.c4D_value || ""));
                    setFieldCheck(c4E, formatPrint(data.data[0].c4E), data.data[0].colorE, data.data2?.[0]?.c4E_status || "OK", formatPrint(data.data2?.[0]?.c4E_value || ""));
                    setFieldCheck(c4F, formatPrint(data.data[0].c4F), data.data[0].colorF, data.data2?.[0]?.c4F_status || "OK", formatPrint(data.data2?.[0]?.c4F_value || ""));
                    setFieldCheck(c4G, formatPrint(data.data[0].c4G), data.data[0].colorG, data.data2?.[0]?.c4G_status || "OK", formatPrint(data.data2?.[0]?.c4G_value || ""));
                    c5A.textContent = formatPrint(data.data[0].c5A);
                    setFieldCheck(c5B, formatPrint(data.data[0].c5B), data.data[0].colorB, data.data2?.[0]?.c5B_status || "OK", formatPrint(data.data2?.[0]?.c5B_value || ""));
                    setFieldCheck(c5C, formatPrint(data.data[0].c5C), data.data[0].colorC, data.data2?.[0]?.c5C_status || "OK", formatPrint(data.data2?.[0]?.c5C_value || ""));
                    setFieldCheck(c5D, formatPrint(data.data[0].c5D), data.data[0].colorD, data.data2?.[0]?.c5D_status || "OK", formatPrint(data.data2?.[0]?.c5D_value || ""));
                    setFieldCheck(c5E, formatPrint(data.data[0].c5E), data.data[0].colorE, data.data2?.[0]?.c5E_status || "OK", formatPrint(data.data2?.[0]?.c5E_value || ""));
                    setFieldCheck(c5F, formatPrint(data.data[0].c5F), data.data[0].colorF, data.data2?.[0]?.c5F_status || "OK", formatPrint(data.data2?.[0]?.c5F_value || ""));
                    setFieldCheck(c5G, formatPrint(data.data[0].c5G), data.data[0].colorG, data.data2?.[0]?.c5G_status || "OK", formatPrint(data.data2?.[0]?.c5G_value || ""));
                    c6A.textContent = formatPrint(data.data[0].c6A);
                    setFieldCheck(c6B, formatPrint(data.data[0].c6B), data.data[0].colorB, data.data2?.[0]?.c6B_status || "OK", formatPrint(data.data2?.[0]?.c6B_value || ""));
                    setFieldCheck(c6C, formatPrint(data.data[0].c6C), data.data[0].colorC, data.data2?.[0]?.c6C_status || "OK", formatPrint(data.data2?.[0]?.c6C_value || ""));
                    setFieldCheck(c6D, formatPrint(data.data[0].c6D), data.data[0].colorD, data.data2?.[0]?.c6D_status || "OK", formatPrint(data.data2?.[0]?.c6D_value || ""));
                    setFieldCheck(c6E, formatPrint(data.data[0].c6E), data.data[0].colorE, data.data2?.[0]?.c6E_status || "OK", formatPrint(data.data2?.[0]?.c6E_value || ""));
                    setFieldCheck(c6F, formatPrint(data.data[0].c6F), data.data[0].colorF, data.data2?.[0]?.c6F_status || "OK", formatPrint(data.data2?.[0]?.c6F_value || ""));
                    setFieldCheck(c6G, formatPrint(data.data[0].c6G), data.data[0].colorG, data.data2?.[0]?.c6G_status || "OK", formatPrint(data.data2?.[0]?.c6G_value || ""));
                    c7A.textContent = formatPrint(data.data[0].c7A);
                    setFieldCheck(c7B, formatPrint(data.data[0].c7B), data.data[0].colorB, data.data2?.[0]?.c7B_status || "OK", formatPrint(data.data2?.[0]?.c7B_value || ""));
                    setFieldCheck(c7C, formatPrint(data.data[0].c7C), data.data[0].colorC, data.data2?.[0]?.c7C_status || "OK", formatPrint(data.data2?.[0]?.c7C_value || ""));
                    setFieldCheck(c7D, formatPrint(data.data[0].c7D), data.data[0].colorD, data.data2?.[0]?.c7D_status || "OK", formatPrint(data.data2?.[0]?.c7D_value || ""));
                    setFieldCheck(c7E, formatPrint(data.data[0].c7E), data.data[0].colorE, data.data2?.[0]?.c7E_status || "OK", formatPrint(data.data2?.[0]?.c7E_value || ""));
                    setFieldCheck(c7F, formatPrint(data.data[0].c7F), data.data[0].colorF, data.data2?.[0]?.c7F_status || "OK", formatPrint(data.data2?.[0]?.c7F_value || ""));
                    setFieldCheck(c7G, formatPrint(data.data[0].c7G), data.data[0].colorG, data.data2?.[0]?.c7G_status || "OK", formatPrint(data.data2?.[0]?.c7G_value || ""));
                    c8A.textContent = formatPrint(data.data[0].c8A);
                    setFieldCheck(c8B, formatPrint(data.data[0].c8B), data.data[0].colorB, data.data2?.[0]?.c8B_status || "OK", formatPrint(data.data2?.[0]?.c8B_value || ""));
                    setFieldCheck(c8C, formatPrint(data.data[0].c8C), data.data[0].colorC, data.data2?.[0]?.c8C_status || "OK", formatPrint(data.data2?.[0]?.c8C_value || ""));
                    setFieldCheck(c8D, formatPrint(data.data[0].c8D), data.data[0].colorD, data.data2?.[0]?.c8D_status || "OK", formatPrint(data.data2?.[0]?.c8D_value || ""));
                    setFieldCheck(c8E, formatPrint(data.data[0].c8E), data.data[0].colorE, data.data2?.[0]?.c8E_status || "OK", formatPrint(data.data2?.[0]?.c8E_value || ""));
                    setFieldCheck(c8F, formatPrint(data.data[0].c8F), data.data[0].colorF, data.data2?.[0]?.c8F_status || "OK", formatPrint(data.data2?.[0]?.c8F_value || ""));
                    setFieldCheck(c8G, formatPrint(data.data[0].c8G), data.data[0].colorG, data.data2?.[0]?.c8G_status || "OK", formatPrint(data.data2?.[0]?.c8G_value || ""));
                    flA.textContent = formatPrint(data.data[0].flA);
                    setFieldCheck(flB, formatPrint(data.data[0].flB), data.data[0].colorB, data.data2?.[0]?.flB_status || "OK", formatPrint(data.data2?.[0]?.flB_value || ""));
                    setFieldCheck(flC, formatPrint(data.data[0].flC), data.data[0].colorC, data.data2?.[0]?.flC_status || "OK", formatPrint(data.data2?.[0]?.flC_value || ""));
                    setFieldCheck(flD, formatPrint(data.data[0].flD), data.data[0].colorD, data.data2?.[0]?.flD_status || "OK", formatPrint(data.data2?.[0]?.flD_value || ""));
                    setFieldCheck(flE, formatPrint(data.data[0].flE), data.data[0].colorE, data.data2?.[0]?.flE_status || "OK", formatPrint(data.data2?.[0]?.flE_value || ""));
                    setFieldCheck(flF, formatPrint(data.data[0].flF), data.data[0].colorF, data.data2?.[0]?.flF_status || "OK", formatPrint(data.data2?.[0]?.flF_value || ""));
                    setFieldCheck(flG, formatPrint(data.data[0].flG), data.data[0].colorG, data.data2?.[0]?.flG_status || "OK", formatPrint(data.data2?.[0]?.flG_value || ""));
                    scA.textContent = formatPrint(data.data[0].scA);
                    setFieldCheck(scB, formatPrint(data.data[0].scB), data.data[0].colorB, data.data2?.[0]?.scB_status || "OK", formatPrint(data.data2?.[0]?.scB_value || ""));
                    setFieldCheck(scC, formatPrint(data.data[0].scC), data.data[0].colorC, data.data2?.[0]?.scC_status || "OK", formatPrint(data.data2?.[0]?.scC_value || ""));
                    setFieldCheck(scD, formatPrint(data.data[0].scD), data.data[0].colorD, data.data2?.[0]?.scD_status || "OK", formatPrint(data.data2?.[0]?.scD_value || ""));
                    setFieldCheck(scE, formatPrint(data.data[0].scE), data.data[0].colorE, data.data2?.[0]?.scE_status || "OK", formatPrint(data.data2?.[0]?.scE_value || ""));
                    setFieldCheck(scF, formatPrint(data.data[0].scF), data.data[0].colorF, data.data2?.[0]?.scF_status || "OK", formatPrint(data.data2?.[0]?.scF_value || ""));
                    setFieldCheck(scG, formatPrint(data.data[0].scG), data.data[0].colorG, data.data2?.[0]?.scG_status || "OK", formatPrint(data.data2?.[0]?.scG_value || ""));
                    jnA.textContent = formatPrint(data.data[0].jnA);
                    setFieldCheck(jnB, formatPrint(data.data[0].jnB), data.data[0].colorB, data.data2?.[0]?.jnB_status || "OK", formatPrint(data.data2?.[0]?.jnB_value || ""));
                    setFieldCheck(jnC, formatPrint(data.data[0].jnC), data.data[0].colorC, data.data2?.[0]?.jnC_status || "OK", formatPrint(data.data2?.[0]?.jnC_value || ""));
                    setFieldCheck(jnD, formatPrint(data.data[0].jnD), data.data[0].colorD, data.data2?.[0]?.jnD_status || "OK", formatPrint(data.data2?.[0]?.jnD_value || ""));
                    setFieldCheck(jnE, formatPrint(data.data[0].jnE), data.data[0].colorE, data.data2?.[0]?.jnE_status || "OK", formatPrint(data.data2?.[0]?.jnE_value || ""));
                    setFieldCheck(jnF, formatPrint(data.data[0].jnF), data.data[0].colorF, data.data2?.[0]?.jnF_status || "OK", formatPrint(data.data2?.[0]?.jnF_value || ""));
                    setFieldCheck(jnG, formatPrint(data.data[0].jnG), data.data[0].colorG, data.data2?.[0]?.jnG_status || "OK", formatPrint(data.data2?.[0]?.jnG_value || ""));
                    d1A.textContent = formatPrint(data.data[0].d1A);
                    setFieldCheck(d1B, formatPrint(data.data[0].d1B), data.data[0].colorB, data.data2?.[0]?.d1B_status || "OK", formatPrint(data.data2?.[0]?.d1B_value || ""));
                    setFieldCheck(d1C, formatPrint(data.data[0].d1C), data.data[0].colorC, data.data2?.[0]?.d1C_status || "OK", formatPrint(data.data2?.[0]?.d1C_value || ""));
                    setFieldCheck(d1D, formatPrint(data.data[0].d1D), data.data[0].colorD, data.data2?.[0]?.d1D_status || "OK", formatPrint(data.data2?.[0]?.d1D_value || ""));
                    setFieldCheck(d1E, formatPrint(data.data[0].d1E), data.data[0].colorE, data.data2?.[0]?.d1E_status || "OK", formatPrint(data.data2?.[0]?.d1E_value || ""));
                    setFieldCheck(d1F, formatPrint(data.data[0].d1F), data.data[0].colorF, data.data2?.[0]?.d1F_status || "OK", formatPrint(data.data2?.[0]?.d1F_value || ""));
                    setFieldCheck(d1G, formatPrint(data.data[0].d1G), data.data[0].colorG, data.data2?.[0]?.d1G_status || "OK", formatPrint(data.data2?.[0]?.d1G_value || ""));
                    d2A.textContent = formatPrint(data.data[0].d2A);
                    setFieldCheck(d2B, formatPrint(data.data[0].d2B), data.data[0].colorB, data.data2?.[0]?.d2B_status || "OK", formatPrint(data.data2?.[0]?.d2B_value || ""));
                    setFieldCheck(d2C, formatPrint(data.data[0].d2C), data.data[0].colorC, data.data2?.[0]?.d2C_status || "OK", formatPrint(data.data2?.[0]?.d2C_value || ""));
                    setFieldCheck(d2D, formatPrint(data.data[0].d2D), data.data[0].colorD, data.data2?.[0]?.d2D_status || "OK", formatPrint(data.data2?.[0]?.d2D_value || ""));
                    setFieldCheck(d2E, formatPrint(data.data[0].d2E), data.data[0].colorE, data.data2?.[0]?.d2E_status || "OK", formatPrint(data.data2?.[0]?.d2E_value || ""));
                    setFieldCheck(d2F, formatPrint(data.data[0].d2F), data.data[0].colorF, data.data2?.[0]?.d2F_status || "OK", formatPrint(data.data2?.[0]?.d2F_value || ""));
                    setFieldCheck(d2G, formatPrint(data.data[0].d2G), data.data[0].colorG, data.data2?.[0]?.d2G_status || "OK", formatPrint(data.data2?.[0]?.d2G_value || ""));
                    d3A.textContent = formatPrint(data.data[0].d3A);
                    setFieldCheck(d3B, formatPrint(data.data[0].d3B), data.data[0].colorB, data.data2?.[0]?.d3B_status || "OK", formatPrint(data.data2?.[0]?.d3B_value || ""));
                    setFieldCheck(d3C, formatPrint(data.data[0].d3C), data.data[0].colorC, data.data2?.[0]?.d3C_status || "OK", formatPrint(data.data2?.[0]?.d3C_value || ""));
                    setFieldCheck(d3D, formatPrint(data.data[0].d3D), data.data[0].colorD, data.data2?.[0]?.d3D_status || "OK", formatPrint(data.data2?.[0]?.d3D_value || ""));
                    setFieldCheck(d3E, formatPrint(data.data[0].d3E), data.data[0].colorE, data.data2?.[0]?.d3E_status || "OK", formatPrint(data.data2?.[0]?.d3E_value || ""));
                    setFieldCheck(d3F, formatPrint(data.data[0].d3F), data.data[0].colorF, data.data2?.[0]?.d3F_status || "OK", formatPrint(data.data2?.[0]?.d3F_value || ""));
                    setFieldCheck(d3G, formatPrint(data.data[0].d3G), data.data[0].colorG, data.data2?.[0]?.d3G_status || "OK", formatPrint(data.data2?.[0]?.d3G_value || ""));
                    d4A.textContent = formatPrint(data.data[0].d4A);
                    setFieldCheck(d4B, formatPrint(data.data[0].d4B), data.data[0].colorB, data.data2?.[0]?.d4B_status || "OK", formatPrint(data.data2?.[0]?.d4B_value || ""));
                    setFieldCheck(d4C, formatPrint(data.data[0].d4C), data.data[0].colorC, data.data2?.[0]?.d4C_status || "OK", formatPrint(data.data2?.[0]?.d4C_value || ""));
                    setFieldCheck(d4D, formatPrint(data.data[0].d4D), data.data[0].colorD, data.data2?.[0]?.d4D_status || "OK", formatPrint(data.data2?.[0]?.d4D_value || ""));
                    setFieldCheck(d4E, formatPrint(data.data[0].d4E), data.data[0].colorE, data.data2?.[0]?.d4E_status || "OK", formatPrint(data.data2?.[0]?.d4E_value || ""));
                    setFieldCheck(d4F, formatPrint(data.data[0].d4F), data.data[0].colorF, data.data2?.[0]?.d4F_status || "OK", formatPrint(data.data2?.[0]?.d4F_value || ""));
                    setFieldCheck(d4G, formatPrint(data.data[0].d4G), data.data[0].colorG, data.data2?.[0]?.d4G_status || "OK", formatPrint(data.data2?.[0]?.d4G_value || ""));
                    d5A.textContent = formatPrint(data.data[0].d5A);
                    setFieldCheck(d5B, formatPrint(data.data[0].d5B), data.data[0].colorB, data.data2?.[0]?.d5B_status || "OK", formatPrint(data.data2?.[0]?.d5B_value || ""));
                    setFieldCheck(d5C, formatPrint(data.data[0].d5C), data.data[0].colorC, data.data2?.[0]?.d5C_status || "OK", formatPrint(data.data2?.[0]?.d5C_value || ""));
                    setFieldCheck(d5D, formatPrint(data.data[0].d5D), data.data[0].colorD, data.data2?.[0]?.d5D_status || "OK", formatPrint(data.data2?.[0]?.d5D_value || ""));
                    setFieldCheck(d5E, formatPrint(data.data[0].d5E), data.data[0].colorE, data.data2?.[0]?.d5E_status || "OK", formatPrint(data.data2?.[0]?.d5E_value || ""));
                    setFieldCheck(d5F, formatPrint(data.data[0].d5F), data.data[0].colorF, data.data2?.[0]?.d5F_status || "OK", formatPrint(data.data2?.[0]?.d5F_value || ""));
                    setFieldCheck(d5G, formatPrint(data.data[0].d5G), data.data[0].colorG, data.data2?.[0]?.d5G_status || "OK", formatPrint(data.data2?.[0]?.d5G_value || ""));
                    d6A.textContent = formatPrint(data.data[0].d6A);
                    setFieldCheck(d6B, formatPrint(data.data[0].d6B), data.data[0].colorB, data.data2?.[0]?.d6B_status || "OK", formatPrint(data.data2?.[0]?.d6B_value || ""));
                    setFieldCheck(d6C, formatPrint(data.data[0].d6C), data.data[0].colorC, data.data2?.[0]?.d6C_status || "OK", formatPrint(data.data2?.[0]?.d6C_value || ""));
                    setFieldCheck(d6D, formatPrint(data.data[0].d6D), data.data[0].colorD, data.data2?.[0]?.d6D_status || "OK", formatPrint(data.data2?.[0]?.d6D_value || ""));
                    setFieldCheck(d6E, formatPrint(data.data[0].d6E), data.data[0].colorE, data.data2?.[0]?.d6E_status || "OK", formatPrint(data.data2?.[0]?.d6E_value || ""));
                    setFieldCheck(d6F, formatPrint(data.data[0].d6F), data.data[0].colorF, data.data2?.[0]?.d6F_status || "OK", formatPrint(data.data2?.[0]?.d6F_value || ""));
                    setFieldCheck(d6G, formatPrint(data.data[0].d6G), data.data[0].colorG, data.data2?.[0]?.d6G_status || "OK", formatPrint(data.data2?.[0]?.d6G_value || ""));
                    srA.textContent = data.data[0].srA;
                    setFieldCheck(srB, data.data[0].srB, data.data[0].colorB, data.data2?.[0]?.srB_status || "OK", data.data2?.[0]?.srB_value || "");
                    setFieldCheck(srC, data.data[0].srC, data.data[0].colorC, data.data2?.[0]?.srC_status || "OK", data.data2?.[0]?.srC_value || "");
                    setFieldCheck(srD, data.data[0].srD, data.data[0].colorD, data.data2?.[0]?.srD_status || "OK", data.data2?.[0]?.srD_value || "");
                    setFieldCheck(srE, data.data[0].srE, data.data[0].colorE, data.data2?.[0]?.srE_status || "OK", data.data2?.[0]?.srE_value || "");
                    setFieldCheck(srF, data.data[0].srF, data.data[0].colorF, data.data2?.[0]?.srF_status || "OK", data.data2?.[0]?.srF_value || "");
                    setFieldCheck(srG, data.data[0].srG, data.data[0].colorG, data.data2?.[0]?.srG_status || "OK", data.data2?.[0]?.srG_value || "");
                    mrA.textContent = data.data[0].mrA;
                    setFieldCheck(mrB, data.data[0].mrB, data.data[0].colorB, data.data2?.[0]?.mrB_status || "OK", data.data2?.[0]?.mrB_value || "");
                    setFieldCheck(mrC, data.data[0].mrC, data.data[0].colorC, data.data2?.[0]?.mrC_status || "OK", data.data2?.[0]?.mrC_value || "");
                    setFieldCheck(mrD, data.data[0].mrD, data.data[0].colorD, data.data2?.[0]?.mrD_status || "OK", data.data2?.[0]?.mrD_value || "");
                    setFieldCheck(mrE, data.data[0].mrE, data.data[0].colorE, data.data2?.[0]?.mrE_status || "OK", data.data2?.[0]?.mrE_value || "");
                    setFieldCheck(mrF, data.data[0].mrF, data.data[0].colorF, data.data2?.[0]?.mrF_status || "OK", data.data2?.[0]?.mrF_value || "");
                    setFieldCheck(mrG, data.data[0].mrG, data.data[0].colorG, data.data2?.[0]?.mrG_status || "OK", data.data2?.[0]?.mrG_value || "");
                    mvA.textContent = data.data[0].mvA;
                    setFieldCheck(mvB, data.data[0].mvB, data.data[0].colorB, data.data2?.[0]?.mvB_status || "OK", data.data2?.[0]?.mvB_value || "");
                    setFieldCheck(mvC, data.data[0].mvC, data.data[0].colorC, data.data2?.[0]?.mvC_status || "OK", data.data2?.[0]?.mvC_value || "");
                    setFieldCheck(mvD, data.data[0].mvD, data.data[0].colorD, data.data2?.[0]?.mvD_status || "OK", data.data2?.[0]?.mvD_value || "");
                    setFieldCheck(mvE, data.data[0].mvE, data.data[0].colorE, data.data2?.[0]?.mvE_status || "OK", data.data2?.[0]?.mvE_value || "");
                    setFieldCheck(mvF, data.data[0].mvF, data.data[0].colorF, data.data2?.[0]?.mvF_status || "OK", data.data2?.[0]?.mvF_value || "");
                    setFieldCheck(mvG, data.data[0].mvG, data.data[0].colorG, data.data2?.[0]?.mvG_status || "OK", data.data2?.[0]?.mvG_value || "");
                    mpp1A.textContent = data.data[0].mpp1A;
                    setFieldCheck(mpp1B, data.data[0].mpp1B, data.data[0].colorB, data.data2?.[0]?.mpp1B_status || "OK", data.data2?.[0]?.mpp1B_value || "");
                    setFieldCheck(mpp1C, data.data[0].mpp1C, data.data[0].colorC, data.data2?.[0]?.mpp1C_status || "OK", data.data2?.[0]?.mpp1C_value || "");
                    setFieldCheck(mpp1D, data.data[0].mpp1D, data.data[0].colorD, data.data2?.[0]?.mpp1D_status || "OK", data.data2?.[0]?.mpp1D_value || "");
                    setFieldCheck(mpp1E, data.data[0].mpp1E, data.data[0].colorE, data.data2?.[0]?.mpp1E_status || "OK", data.data2?.[0]?.mpp1E_value || "");
                    setFieldCheck(mpp1F, data.data[0].mpp1F, data.data[0].colorF, data.data2?.[0]?.mpp1F_status || "OK", data.data2?.[0]?.mpp1F_value || "");
                    setFieldCheck(mpp1G, data.data[0].mpp1G, data.data[0].colorG, data.data2?.[0]?.mpp1G_status || "OK", data.data2?.[0]?.mpp1G_value || "");
                    mpp2A.textContent = data.data[0].mpp2A;
                    setFieldCheck(mpp2B, data.data[0].mpp2B, data.data[0].colorB, data.data2?.[0]?.mpp2B_status || "OK", data.data2?.[0]?.mpp2B_value || "");
                    setFieldCheck(mpp2C, data.data[0].mpp2C, data.data[0].colorC, data.data2?.[0]?.mpp2C_status || "OK", data.data2?.[0]?.mpp2C_value || "");
                    setFieldCheck(mpp2D, data.data[0].mpp2D, data.data[0].colorD, data.data2?.[0]?.mpp2D_status || "OK", data.data2?.[0]?.mpp2D_value || "");
                    setFieldCheck(mpp2E, data.data[0].mpp2E, data.data[0].colorE, data.data2?.[0]?.mpp2E_status || "OK", data.data2?.[0]?.mpp2E_value || "");
                    setFieldCheck(mpp2F, data.data[0].mpp2F, data.data[0].colorF, data.data2?.[0]?.mpp2F_status || "OK", data.data2?.[0]?.mpp2F_value || "");
                    setFieldCheck(mpp2G, data.data[0].mpp2G, data.data[0].colorG, data.data2?.[0]?.mpp2G_status || "OK", data.data2?.[0]?.mpp2G_value || "");
                    qbA.textContent = data.data[0].qbA;
                    setFieldCheck(qbB, data.data[0].qbB, data.data[0].colorB, data.data2?.[0]?.qbB_status || "OK", data.data2?.[0]?.qbB_value || "");
                    setFieldCheck(qbC, data.data[0].qbC, data.data[0].colorC, data.data2?.[0]?.qbC_status || "OK", data.data2?.[0]?.qbC_value || "");
                    setFieldCheck(qbD, data.data[0].qbD, data.data[0].colorD, data.data2?.[0]?.qbD_status || "OK", data.data2?.[0]?.qbD_value || "");
                    setFieldCheck(qbE, data.data[0].qbE, data.data[0].colorE, data.data2?.[0]?.qbE_status || "OK", data.data2?.[0]?.qbE_value || "");
                    setFieldCheck(qbF, data.data[0].qbF, data.data[0].colorF, data.data2?.[0]?.qbF_status || "OK", data.data2?.[0]?.qbF_value || "");
                    setFieldCheck(qbG, data.data[0].qbG, data.data[0].colorG, data.data2?.[0]?.qbG_status || "OK", data.data2?.[0]?.qbG_value || "");
                    fewA.textContent = data.data[0].fewA;
                    setFieldCheck(fewB, data.data[0].fewB, data.data[0].colorB, data.data2?.[0]?.fewB_status || "OK", data.data2?.[0]?.fewB_value || "");
                    setFieldCheck(fewC, data.data[0].fewC, data.data[0].colorC, data.data2?.[0]?.fewC_status || "OK", data.data2?.[0]?.fewC_value || "");
                    setFieldCheck(fewD, data.data[0].fewD, data.data[0].colorD, data.data2?.[0]?.fewD_status || "OK", data.data2?.[0]?.fewD_value || "");
                    setFieldCheck(fewE, data.data[0].fewE, data.data[0].colorE, data.data2?.[0]?.fewE_status || "OK", data.data2?.[0]?.fewE_value || "");
                    setFieldCheck(fewF, data.data[0].fewF, data.data[0].colorF, data.data2?.[0]?.fewF_status || "OK", data.data2?.[0]?.fewF_value || "");
                    setFieldCheck(fewG, data.data[0].fewG, data.data[0].colorG, data.data2?.[0]?.fewG_status || "OK", data.data2?.[0]?.fewG_value || "");
                    swA.textContent = data.data[0].swA;
                    setFieldCheck(swB, data.data[0].swB, data.data[0].colorB, data.data2?.[0]?.swB_status || "OK", data.data2?.[0]?.swB_value || "");
                    setFieldCheck(swC, data.data[0].swC, data.data[0].colorC, data.data2?.[0]?.swC_status || "OK", data.data2?.[0]?.swC_value || "");
                    setFieldCheck(swD, data.data[0].swD, data.data[0].colorD, data.data2?.[0]?.swD_status || "OK", data.data2?.[0]?.swD_value || "");
                    setFieldCheck(swE, data.data[0].swE, data.data[0].colorE, data.data2?.[0]?.swE_status || "OK", data.data2?.[0]?.swE_value || "");
                    setFieldCheck(swF, data.data[0].swF, data.data[0].colorF, data.data2?.[0]?.swF_status || "OK", data.data2?.[0]?.swF_value || "");
                    setFieldCheck(swG, data.data[0].swG, data.data[0].colorG, data.data2?.[0]?.swG_status || "OK", data.data2?.[0]?.swG_value || "");
                    noyA.textContent = data.data[0].noyA;
                    setFieldCheck(noyB, data.data[0].noyB, data.data[0].colorB, data.data2?.[0]?.noyB_status || "OK", data.data2?.[0]?.noyB_value || "");
                    setFieldCheck(noyC, data.data[0].noyC, data.data[0].colorC, data.data2?.[0]?.noyC_status || "OK", data.data2?.[0]?.noyC_value || "");
                    setFieldCheck(noyD, data.data[0].noyD, data.data[0].colorD, data.data2?.[0]?.noyD_status || "OK", data.data2?.[0]?.noyD_value || "");
                    setFieldCheck(noyE, data.data[0].noyE, data.data[0].colorE, data.data2?.[0]?.noyE_status || "OK", data.data2?.[0]?.noyE_value || "");
                    setFieldCheck(noyF, data.data[0].noyF, data.data[0].colorF, data.data2?.[0]?.noyF_status || "OK", data.data2?.[0]?.noyF_value || "");
                    setFieldCheck(noyG, data.data[0].noyG, data.data[0].colorG, data.data2?.[0]?.noyG_status || "OK", data.data2?.[0]?.noyG_value || "");
                    wgA.textContent = data.data[0].wgA;
                    setFieldCheck(wgB, data.data[0].wgB, data.data[0].colorB, data.data2?.[0]?.wgB_status || "OK", data.data2?.[0]?.wgB_value || "");
                    setFieldCheck(wgC, data.data[0].wgC, data.data[0].colorC, data.data2?.[0]?.wgC_status || "OK", data.data2?.[0]?.wgC_value || "");
                    setFieldCheck(wgD, data.data[0].wgD, data.data[0].colorD, data.data2?.[0]?.wgD_status || "OK", data.data2?.[0]?.wgD_value || "");
                    setFieldCheck(wgE, data.data[0].wgE, data.data[0].colorE, data.data2?.[0]?.wgE_status || "OK", data.data2?.[0]?.wgE_value || "");
                    setFieldCheck(wgF, data.data[0].wgF, data.data[0].colorF, data.data2?.[0]?.wgF_status || "OK", data.data2?.[0]?.wgF_value || "");
                    setFieldCheck(wgG, data.data[0].wgG, data.data[0].colorG, data.data2?.[0]?.wgG_status || "OK", data.data2?.[0]?.wgG_value || "");
                    rs1A.textContent = data.data[0].rs1A;
                    setFieldCheck(rs1B, data.data[0].rs1B, data.data[0].colorB, data.data2?.[0]?.rs1B_status || "OK", data.data2?.[0]?.rs1B_value || "");
                    setFieldCheck(rs1C, data.data[0].rs1C, data.data[0].colorC, data.data2?.[0]?.rs1C_status || "OK", data.data2?.[0]?.rs1C_value || "");
                    setFieldCheck(rs1D, data.data[0].rs1D, data.data[0].colorD, data.data2?.[0]?.rs1D_status || "OK", data.data2?.[0]?.rs1D_value || "");
                    setFieldCheck(rs1E, data.data[0].rs1E, data.data[0].colorE, data.data2?.[0]?.rs1E_status || "OK", data.data2?.[0]?.rs1E_value || "");
                    setFieldCheck(rs1F, data.data[0].rs1F, data.data[0].colorF, data.data2?.[0]?.rs1F_status || "OK", data.data2?.[0]?.rs1F_value || "");
                    setFieldCheck(rs1G, data.data[0].rs1G, data.data[0].colorG, data.data2?.[0]?.rs1G_status || "OK", data.data2?.[0]?.rs1G_value || "");
                    rs2A.textContent = data.data[0].rs2A;
                    setFieldCheck(rs2B, data.data[0].rs2B, data.data[0].colorB, data.data2?.[0]?.rs2B_status || "OK", data.data2?.[0]?.rs2B_value || "");
                    setFieldCheck(rs2C, data.data[0].rs2C, data.data[0].colorC, data.data2?.[0]?.rs2C_status || "OK", data.data2?.[0]?.rs2C_value || "");
                    setFieldCheck(rs2D, data.data[0].rs2D, data.data[0].colorD, data.data2?.[0]?.rs2D_status || "OK", data.data2?.[0]?.rs2D_value || "");
                    setFieldCheck(rs2E, data.data[0].rs2E, data.data[0].colorE, data.data2?.[0]?.rs2E_status || "OK", data.data2?.[0]?.rs2E_value || "");
                    setFieldCheck(rs2F, data.data[0].rs2F, data.data[0].colorF, data.data2?.[0]?.rs2F_status || "OK", data.data2?.[0]?.rs2F_value || "");
                    setFieldCheck(rs2G, data.data[0].rs2G, data.data[0].colorG, data.data2?.[0]?.rs2G_status || "OK", data.data2?.[0]?.rs2G_value || "");
                    rs3A.textContent = data.data[0].rs3A;
                    setFieldCheck(rs3B, data.data[0].rs3B, data.data[0].colorB, data.data2?.[0]?.rs3B_status || "OK", data.data2?.[0]?.rs3B_value || "");
                    setFieldCheck(rs3C, data.data[0].rs3C, data.data[0].colorC, data.data2?.[0]?.rs3C_status || "OK", data.data2?.[0]?.rs3C_value || "");
                    setFieldCheck(rs3D, data.data[0].rs3D, data.data[0].colorD, data.data2?.[0]?.rs3D_status || "OK", data.data2?.[0]?.rs3D_value || "");
                    setFieldCheck(rs3E, data.data[0].rs3E, data.data[0].colorE, data.data2?.[0]?.rs3E_status || "OK", data.data2?.[0]?.rs3E_value || "");
                    setFieldCheck(rs3F, data.data[0].rs3F, data.data[0].colorF, data.data2?.[0]?.rs3F_status || "OK", data.data2?.[0]?.rs3F_value || "");
                    setFieldCheck(rs3G, data.data[0].rs3G, data.data[0].colorG, data.data2?.[0]?.rs3G_status || "OK", data.data2?.[0]?.rs3G_value || "");
                    strA.textContent = data.data[0].strA;
                    setFieldCheck(strB, data.data[0].strB, data.data[0].colorB, data.data2?.[0]?.strB_status || "OK", data.data2?.[0]?.strB_value || "");
                    setFieldCheck(strC, data.data[0].strC, data.data[0].colorC, data.data2?.[0]?.strC_status || "OK", data.data2?.[0]?.strC_value || "");
                    setFieldCheck(strD, data.data[0].strD, data.data[0].colorD, data.data2?.[0]?.strD_status || "OK", data.data2?.[0]?.strD_value || "");
                    setFieldCheck(strE, data.data[0].strE, data.data[0].colorE, data.data2?.[0]?.strE_status || "OK", data.data2?.[0]?.strE_value || "");
                    setFieldCheck(strF, data.data[0].strF, data.data[0].colorF, data.data2?.[0]?.strF_status || "OK", data.data2?.[0]?.strF_value || "");
                    setFieldCheck(strG, data.data[0].strG, data.data[0].colorG, data.data2?.[0]?.strG_status || "OK", data.data2?.[0]?.strG_value || "");
                    rA.textContent = data.data[0].rA;
                    setFieldCheck(rB, data.data[0].rB, data.data[0].colorB, data.data2?.[0]?.rB_status || "OK", data.data2?.[0]?.rB_value || "");
                    setFieldCheck(rC, data.data[0].rC, data.data[0].colorC, data.data2?.[0]?.rC_status || "OK", data.data2?.[0]?.rC_value || "");
                    setFieldCheck(rD, data.data[0].rD, data.data[0].colorD, data.data2?.[0]?.rD_status || "OK", data.data2?.[0]?.rD_value || "");
                    setFieldCheck(rE, data.data[0].rE, data.data[0].colorE, data.data2?.[0]?.rE_status || "OK", data.data2?.[0]?.rE_value || "");
                    setFieldCheck(rF, data.data[0].rF, data.data[0].colorF, data.data2?.[0]?.rF_status || "OK", data.data2?.[0]?.rF_value || "");
                    setFieldCheck(rG, data.data[0].rG, data.data[0].colorG, data.data2?.[0]?.rG_status || "OK", data.data2?.[0]?.rG_value || "");
                    uotA.textContent = data.data[0].uotA;
                    setFieldCheck(uotB, data.data[0].uotB, data.data[0].colorB, data.data2?.[0]?.uotB_status || "OK", data.data2?.[0]?.uotB_value || "");
                    setFieldCheck(uotC, data.data[0].uotC, data.data[0].colorC, data.data2?.[0]?.uotC_status || "OK", data.data2?.[0]?.uotC_value || "");
                    setFieldCheck(uotD, data.data[0].uotD, data.data[0].colorD, data.data2?.[0]?.uotD_status || "OK", data.data2?.[0]?.uotD_value || "");
                    setFieldCheck(uotE, data.data[0].uotE, data.data[0].colorE, data.data2?.[0]?.uotE_status || "OK", data.data2?.[0]?.uotE_value || "");
                    setFieldCheck(uotF, data.data[0].uotF, data.data[0].colorF, data.data2?.[0]?.uotF_status || "OK", data.data2?.[0]?.uotF_value || "");
                    setFieldCheck(uotG, data.data[0].uotG, data.data[0].colorG, data.data2?.[0]?.uotG_status || "OK", data.data2?.[0]?.uotG_value || "");
                    lotA.textContent = data.data[0].lotA;
                    setFieldCheck(lotB, data.data[0].lotB, data.data[0].colorB, data.data2?.[0]?.lotB_status || "OK", data.data2?.[0]?.lotB_value || "");
                    setFieldCheck(lotC, data.data[0].lotC, data.data[0].colorC, data.data2?.[0]?.lotC_status || "OK", data.data2?.[0]?.lotC_value || "");
                    setFieldCheck(lotD, data.data[0].lotD, data.data[0].colorD, data.data2?.[0]?.lotD_status || "OK", data.data2?.[0]?.lotD_value || "");
                    setFieldCheck(lotE, data.data[0].lotE, data.data[0].colorE, data.data2?.[0]?.lotE_status || "OK", data.data2?.[0]?.lotE_value || "");
                    setFieldCheck(lotF, data.data[0].lotF, data.data[0].colorF, data.data2?.[0]?.lotF_status || "OK", data.data2?.[0]?.lotF_value || "");
                    setFieldCheck(lotG, data.data[0].lotG, data.data[0].colorG, data.data2?.[0]?.lotG_status || "OK", data.data2?.[0]?.lotG_value || "");
                    at1A.textContent = data.data[0].at1A;
                    setFieldCheck(at1B, data.data[0].at1B, data.data[0].colorB, data.data2?.[0]?.at1B_status || "OK", data.data2?.[0]?.at1B_value || "");
                    setFieldCheck(at1C, data.data[0].at1C, data.data[0].colorC, data.data2?.[0]?.at1C_status || "OK", data.data2?.[0]?.at1C_value || "");
                    setFieldCheck(at1D, data.data[0].at1D, data.data[0].colorD, data.data2?.[0]?.at1D_status || "OK", data.data2?.[0]?.at1D_value || "");
                    setFieldCheck(at1E, data.data[0].at1E, data.data[0].colorE, data.data2?.[0]?.at1E_status || "OK", data.data2?.[0]?.at1E_value || "");
                    setFieldCheck(at1F, data.data[0].at1F, data.data[0].colorF, data.data2?.[0]?.at1F_status || "OK", data.data2?.[0]?.at1F_value || "");
                    setFieldCheck(at1G, data.data[0].at1G, data.data[0].colorG, data.data2?.[0]?.at1G_status || "OK", data.data2?.[0]?.at1G_value || "");
                    at2A.textContent = data.data[0].at2A;
                    setFieldCheck(at2B, data.data[0].at2B, data.data[0].colorB, data.data2?.[0]?.at2B_status || "OK", data.data2?.[0]?.at2B_value || "");
                    setFieldCheck(at2C, data.data[0].at2C, data.data[0].colorC, data.data2?.[0]?.at2C_status || "OK", data.data2?.[0]?.at2C_value || "");
                    setFieldCheck(at2D, data.data[0].at2D, data.data[0].colorD, data.data2?.[0]?.at2D_status || "OK", data.data2?.[0]?.at2D_value || "");
                    setFieldCheck(at2E, data.data[0].at2E, data.data[0].colorE, data.data2?.[0]?.at2E_status || "OK", data.data2?.[0]?.at2E_value || "");
                    setFieldCheck(at2F, data.data[0].at2F, data.data[0].colorF, data.data2?.[0]?.at2F_status || "OK", data.data2?.[0]?.at2F_value || "");
                    setFieldCheck(at2G, data.data[0].at2G, data.data[0].colorG, data.data2?.[0]?.at2G_status || "OK", data.data2?.[0]?.at2G_value || "");
                    at3A.textContent = data.data[0].at3A;
                    setFieldCheck(at3B, data.data[0].at3B, data.data[0].colorB, data.data2?.[0]?.at3B_status || "OK", data.data2?.[0]?.at3B_value || "");
                    setFieldCheck(at3C, data.data[0].at3C, data.data[0].colorC, data.data2?.[0]?.at3C_status || "OK", data.data2?.[0]?.at3C_value || "");
                    setFieldCheck(at3D, data.data[0].at3D, data.data[0].colorD, data.data2?.[0]?.at3D_status || "OK", data.data2?.[0]?.at3D_value || "");
                    setFieldCheck(at3E, data.data[0].at3E, data.data[0].colorE, data.data2?.[0]?.at3E_status || "OK", data.data2?.[0]?.at3E_value || "");
                    setFieldCheck(at3F, data.data[0].at3F, data.data[0].colorF, data.data2?.[0]?.at3F_status || "OK", data.data2?.[0]?.at3F_value || "");
                    setFieldCheck(at3G, data.data[0].at3G, data.data[0].colorG, data.data2?.[0]?.at3G_status || "OK", data.data2?.[0]?.at3G_value || "");
                    if (data.data[0].time1) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].time1);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].time1.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("time1").textContent = jamMenit;
                    }
                    remark1.textContent = data.data[0].remark1;
                    if (data.data[0].time2) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].time2);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].time2.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("time2").textContent = jamMenit;
                    }
                    remark2.textContent = data.data[0].remark2;
                    if (data.data[0].time3) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].time3);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].time3.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("time3").textContent = jamMenit;
                    }
                    remark3.textContent = data.data[0].remark3;
                    if (data.data[0].time4) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].time4);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].time4.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("time4").textContent = jamMenit;
                    }
                    remark4.textContent = data.data[0].remark4;
                    if (data.data[0].time5) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].time5);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].time5.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("time5").textContent = jamMenit;
                    }
                    remark5.textContent = data.data[0].remark5;
                    if (data.data[0].time6) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].time6);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].time6.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("time6").textContent = jamMenit;
                    }
                    remark6.textContent = data.data[0].remark6;
                    kwhM1.textContent = data.data[0].kwhM1 ?? 0;
                    kwhM2.textContent = data.data[0].kwhM2 ?? 0;
                    if (data.data[0].jamProd) {
                        let jamMenit = "";
                        const date = new Date(data.data[0].jamProd);
                        if (!isNaN(date)) {
                            const jam = String(date.getHours()).padStart(2, "0");
                            const menit = String(date.getMinutes()).padStart(2, "0");
                            jamMenit = `${jam}:${menit}`;
                        } else {
                            const match = data.data[0].jamProd.match(/(\d{2}):(\d{2})/);
                            if (match) jamMenit = `${match[1]}:${match[2]}`;
                        }
                        if (jamMenit) document.getElementById("jamProd").textContent = jamMenit;
                    }
                    ppA.textContent = data.data[0].ppA;
                    ppB.textContent = data.data[0].ppB;
                    ppC.textContent = data.data[0].ppC;
                    ppD.textContent = data.data[0].ppD;
                    cacA.textContent = data.data[0].cacA;
                    cacB.textContent = data.data[0].cacB;
                    cacC.textContent = data.data[0].cacC;
                    cacD.textContent = data.data[0].cacD;
                    cacE.textContent = data.data[0].cacE ?? 0;
                    cacF.textContent = data.data[0].cacF;
                    mbA.textContent = data.data[0].mbA;
                    mbB.textContent = data.data[0].mbB;
                    mbC.textContent = data.data[0].mbC;
                    mbD.textContent = data.data[0].mbD;
                    mbE.textContent = data.data[0].mbE ?? 0;
                    mbF.textContent = data.data[0].mbF ?? 0;
                    uvA.textContent = data.data[0].uvA;
                    uvB.textContent = data.data[0].uvB;
                    uvC.textContent = data.data[0].uvC;
                    uvD.textContent = data.data[0].uvD;
                    uvE.textContent = data.data[0].uvE ?? 0;
                    uvF.textContent = data.data[0].uvF ?? 0;
                    asbA.textContent = data.data[0].asbA;
                    asbB.textContent = data.data[0].asbB;
                    asbC.textContent = data.data[0].asbC;
                    asbD.textContent = data.data[0].asbD;
                    asbE.textContent = data.data[0].asbE ?? 0;
                    asbF.textContent = data.data[0].asbF ?? 0;
                    llA.textContent = data.data[0].llA;
                    llB.textContent = data.data[0].llB;
                    llC.textContent = data.data[0].llC;
                    llD.textContent = data.data[0].llD;
                    llF.textContent = data.data[0].llF;
                    bhn1A.textContent = data.data[0].bhn1A;
                    bhn1B.textContent = data.data[0].bhn1B;
                    bhn1C.textContent = data.data[0].bhn1C;
                    bhn1D.textContent = data.data[0].bhn1D;
                    bhn1E.textContent = data.data[0].bhn1E;
                    bhn1F.textContent = data.data[0].bhn1F;
                    bhn2A.textContent = data.data[0].bhn2A;
                    bhn2B.textContent = data.data[0].bhn2B;
                    bhn2C.textContent = data.data[0].bhn2C;
                    bhn2D.textContent = data.data[0].bhn2D;
                    bhn2E.textContent = data.data[0].bhn2E;
                    bhn2F.textContent = data.data[0].bhn2F;
                    mbAT.textContent = data.data[0].mbAT;
                    uvAT.textContent = data.data[0].uvAT;
                    asbAT.textContent = data.data[0].asbAT;
                    llAT.textContent = data.data[0].llAT;
                    bngM.textContent = data.data[0].bngM ?? numeral(0).format("0,0.00");
                    prongM.textContent = data.data[0].prongM ?? numeral(0).format("0,0.00");
                    silM.textContent = data.data[0].silM ?? numeral(0).format("0,0.00");
                    bngL.textContent = data.data[0].bngL ?? numeral(0).format("0,0.00");
                    prongL.textContent = data.data[0].prongL ?? numeral(0).format("0,0.00");
                    silL.textContent = data.data[0].silL ?? numeral(0).format("0,0.00");
                    bngMe.textContent = data.data[0].bngMe ?? numeral(0).format("0,0.00");
                    prongMe.textContent = data.data[0].prongMe ?? numeral(0).format("0,0.00");
                    silMe.textContent = data.data[0].silMe ?? numeral(0).format("0,0.00");
                    bngGB.textContent = data.data[0].bngGB ?? numeral(0).format("0,0.00");
                    prongGB.textContent = data.data[0].prongGB ?? numeral(0).format("0,0.00");
                    silGB.textContent = data.data[0].silGB ?? numeral(0).format("0,0.00");
                    bngLL.textContent = data.data[0].bngLL ?? numeral(0).format("0,0.00");
                    prongLL.textContent = data.data[0].prongLL ?? numeral(0).format("0,0.00");
                    silLL.textContent = data.data[0].silLL ?? numeral(0).format("0,0.00");
                    if (data.data[0].total != null && data.data[0].total !== "") {
                        total.textContent = data.data[0].total;
                    } else {
                        hitungTotal();
                    }
                    highlightRow("c1");
                    highlightRow("c2");
                    highlightRow("c3");
                    highlightRow("c4");
                    highlightRow("c5");
                    highlightRow("c6");
                    highlightRow("c7");
                    highlightRow("c8");

                    highlightRow("fl");
                    highlightRow("sc");
                    highlightRow("jn");

                    highlightRow("d1");
                    highlightRow("d2");
                    highlightRow("d3");
                    highlightRow("d4");
                    highlightRow("d5");
                    highlightRow("d6");

                    highlightRow("sr");
                    highlightRow("mr");
                    highlightRow("mv");

                    highlightRow("mpp1");
                    highlightRow("mpp2");

                    highlightRow("qb");
                    highlightRow("few");
                    highlightRow("sw");
                    highlightRow("noy");
                    highlightRow("wg");

                    highlightRow("rs1");
                    highlightRow("rs2");
                    highlightRow("rs3");

                    highlightRow("str");
                    highlightRow("r");
                    highlightRow("uot");
                    highlightRow("lot");

                    highlightRow("at1");
                    highlightRow("at2");
                    highlightRow("at3");
                    document.getElementById("ketHead").textContent = "Keterangan"
                    keterangan.innerHTML = data.data[0].keterangan
                        ? data.data[0].keterangan.replace(/\n/g, "<br>")
                        : "<br><br><br><br><br>";
                    $("#modalLaporan").modal("show");
                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.Message);
                },
            });
        }
        // let modal = new bootstrap.Modal(
        //     document.getElementById("modalLaporan"),
        // );
        // modal.show();

        // });
    });
});