//#region Variabel DOM Elements
jQuery(function ($) {
    const OptHarian   = document.getElementById('OptHarian');
    const OptProyek   = document.getElementById('OptProyek');
    const TNoOd       = document.getElementById('TNoOd');
    const TDivisi     = document.getElementById('TDivisi');
    const TKdBrg      = document.getElementById('TKdBrg');
    const TNamaBrg    = document.getElementById('TNamaBrg');
    const TNoGbr      = document.getElementById('TNoGbr');
    const TJml        = document.getElementById('TJml');
    const OdSts       = document.getElementById('OdSts');
    const TKetOrder   = document.getElementById('TKetOrder');
    const TMesin      = document.getElementById('TMesin');
    const TUserOrder  = document.getElementById('TUserOrder');
    const TBagian     = document.getElementById('TBagian');
    const TIdBagian   = document.getElementById('TIdBagian');
    const btnBagian   = document.getElementById('btnBagian');
    const btnRefresh  = document.getElementById('btnRefresh');
    const btnKeluar   = document.getElementById('btnKeluar');
    const tbodyData   = document.getElementById('tbodyData');
    const TTotal      = document.getElementById('TTotal');
    const TTotalBiaya = document.getElementById('TTotalBiaya');
    const TTotalBiaya1= document.getElementById('TTotalBiaya1');

    const getJenisOd = () => OptHarian.checked ? 'H' : 'P';
//#endregion

//#region Input & Core Events
    OptHarian.addEventListener('change', function () { if (this.checked) resetAll(); });
    OptProyek.addEventListener('change', function () { if (this.checked) resetAll(); });

    btnKeluar.addEventListener('click', function () {
        window.location.href = '/GPS';
    });

    // Enter pada No Order → load header order
    TNoOd.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            let v = TNoOd.value.trim();
            if (v === '') {
                Swal.fire('Info', 'Isi Nomer Ordernya.', 'info');
                return;
            }
            v = v.padStart(6, '0').slice(-6);
            TNoOd.value = v;
            clearOrderDetail();
            loadOrder(v);
        }
    });
//#endregion

//#region Utility & Helper Functions
    // SP_5298_PJW_LIST-ORDER-KERJA / ORDER-PROYEK kode=2
    function loadOrder(noOd) {
        ajaxGet(
            window.spartConfig.routeGetOrder,
            { noOd: noOd, jenisOd: getJenisOd() },
            function (data) {
                TDivisi.value    = data.TDivisi || '';
                TKdBrg.value     = data.TKdBrg || '';
                TNamaBrg.value   = data.TNamaBrg || '';
                TNoGbr.value     = data.TNoGbr || '';
                TJml.value       = data.TJml || '';
                OdSts.textContent= data.OdSts || '';
                TKetOrder.value  = data.TKetOrder || '';
                TMesin.value     = data.TMesin || '';
                TUserOrder.value = data.TUserOrder || '';

                TBagian.value  = '';
                TIdBagian.value = '';
                clearTable();

                btnBagian.focus();
            },
            function (xhr) {
                if (xhr.status === 400 || xhr.status === 404) {
                    clearAll();
                    TNoOd.value = '';
                    TNoOd.focus();
                }
                Swal.fire('Info',
                    (xhr.responseJSON && xhr.responseJSON.error) || 'Order tidak ditemukan.',
                    'info');
            }
        );
    }

    // Lookup bagian
    btnBagian.addEventListener('click', function () {
        const noOd = TNoOd.value.trim();
        if (!noOd) {
            Swal.fire('Info', 'Isi nomor order terlebih dahulu.', 'info');
            return;
        }

        openLookupModal({
            title: 'Pilih Bagian Barang',
            url: window.spartConfig.routeGetBagianList
                + '?noOd=' + encodeURIComponent(noOd)
                + '&jenisOd=' + getJenisOd(),
            headers: ['ID', 'Nama Bagian'],
            columns: ['IdBagian', 'NamaBagian'],
            onSelect: function (row) {
                TIdBagian.value = row.IdBagian;
                TBagian.value   = row.NamaBagian;
                loadSpart();
            }
        });
    });

    // SP_5298_PJW_LIST-SPART-BAGIAN kode=6
    function loadSpart() {
        const noOd  = TNoOd.value.trim();
        const idBag = TIdBagian.value.trim();
        if (!noOd || !idBag) {
            Swal.fire('Info', 'Nomor order dan bagian harus terisi.', 'info');
            return;
        }

        tbodyData.innerHTML = '<tr><td colspan="9" class="text-center text-muted">Memuat data...</td></tr>';
        TTotal.value = '0';
        TTotalBiaya.value = '0';
        TTotalBiaya1.value = '0';

        ajaxGet(
            window.spartConfig.routeGetSpartList,
            { noOd: noOd, idBag: parseInt(idBag), jenisOd: getJenisOd() },
            function (res) {
                renderTable(res.data);
                TTotalBiaya.value  = res.totalBaru || '0';
                TTotalBiaya1.value = res.totalStock || '0';
                TTotal.value       = res.totalSemua || '0';
            },
            function (xhr) {
                tbodyData.innerHTML = '<tr><td colspan="9" class="text-center text-danger">Gagal memuat data.</td></tr>';
                Swal.fire('Error',
                    (xhr.responseJSON && xhr.responseJSON.error) || 'Terjadi kesalahan.',
                    'error');
            }
        );
    }

    btnRefresh.addEventListener('click', function () {
        if (TIdBagian.value) loadSpart();
    });

    function renderTable(data) {
        tbodyData.innerHTML = '';

        if (!data || data.length === 0) {
            tbodyData.innerHTML = '<tr><td colspan="9" class="text-center text-muted">Tidak ada data S/Part untuk bagian ini.</td></tr>';
            return;
        }

        let html = '';
        data.forEach(function (row) {
            // Status == 0 → Stock (biru), selain itu → Baru (hitam)
            const rowClass = (Number(row.Status) === 0) ? 'row-stock' : '';
            html += '<tr class="' + rowClass + '">';
            html += '<td class="tbl-cell">' + esc(row.KdBrg) + '</td>';
            html += '<td class="tbl-cell">' + esc(row.NmBrg) + '</td>';
            html += '<td class="tbl-cell">' + esc(row.SubKategori) + '</td>';
            html += '<td class="tbl-cell text-end">' + esc(row.Jumlah) + '</td>';
            html += '<td class="tbl-cell">' + esc(row.Satuan) + '</td>';
            html += '<td class="tbl-cell text-end">' + esc(row.HargaBaru) + '</td>';
            html += '<td class="tbl-cell text-end">' + esc(row.TotalHargaB) + '</td>';
            html += '<td class="tbl-cell text-end">' + esc(row.HargaStok) + '</td>';
            html += '<td class="tbl-cell text-end">' + esc(row.TotalHargaS) + '</td>';
            html += '</tr>';
        });
        tbodyData.innerHTML = html;
    }

    function clearTable() {
        tbodyData.innerHTML = '<tr><td colspan="9" class="text-center text-muted">Belum ada data.</td></tr>';
        TTotal.value = '0';
        TTotalBiaya.value = '0';
        TTotalBiaya1.value = '0';
    }

    function clearOrderDetail() {
        TDivisi.value = ''; TKdBrg.value = ''; TNamaBrg.value = ''; TNoGbr.value = '';
        TJml.value = ''; OdSts.textContent = ''; TKetOrder.value = '';
        TMesin.value = ''; TUserOrder.value = '';
        TBagian.value = ''; TIdBagian.value = '';
        clearTable();
    }

    function clearAll() {
        clearOrderDetail();
    }

    function resetAll() {
        clearOrderDetail();
        TNoOd.value = '';
        // OptHarian.checked = true;
        // OptProyek.checked = false;
        TNoOd.focus();
    }

    function esc(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
});
//#endregion
