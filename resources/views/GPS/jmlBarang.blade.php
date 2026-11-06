<style>
    .gps-jmlkerja-form {
        padding: 5px;
    }

    .form-label-jmlkerja {
        font-size: 14px;
        font-weight: 600;
        color: #343a40;
        margin-bottom: 4px;
    }
</style>

<template id="gps-jmlKerja-template">
    <div class="gps-jmlkerja-form text-start">
        <div class="mb-3 border-bottom pb-2">
            <h6 class="fw-bold mb-1">Input Jml Brg yg dikerjakan</h6>
            <small class="text-muted">Masukkan jumlah barang aktual yang sedang diproses.</small>
        </div>

        <div class="mb-3">
            <label for="TJml" class="form-label-jmlkerja">Jml Brg</label>
            <input type="text" id="TJml" class="form-control text-end" placeholder="0"
                aria-label="Jumlah Barang Kerja">
        </div>
    </div>
</template>
