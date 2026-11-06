<style>
    .gps-makloon-form {
        padding: 5px;
    }

    .form-label-makloon {
        font-size: 14px;
        font-weight: 600;
        color: #343a40;
        margin-bottom: 4px;
    }
</style>

<template id="gps-biayaMakloon-template">
    <div class="gps-makloon-form text-start">
        <div class="mb-3 border-bottom pb-2">
            <h6 class="fw-bold mb-1">Biaya Proses Makloon</h6>
            <small class="text-muted">Masukkan jumlah barang, harga per PC, dan keterangan PO.</small>
        </div>


        <div class="mb-3">
            <label for="TJml" class="form-label-makloon">Jml Brg</label>
            <input type="text" id="TJml" class="form-control text-end" placeholder="0" aria-label="Jumlah Barang">
        </div>


        <div class="mb-3">
            <label for="THarga" class="form-label-makloon">Harga/PC</label>
            <input type="text" id="THarga" class="form-control text-end" placeholder="0"
                aria-label="Harga per PC">
        </div>


        <div class="mb-3">
            <label for="TKet" class="form-label-makloon">Keterangan</label>
            <input type="text" id="TKet" class="form-control" placeholder="Tuliskan keterangan di sini..."
                maxlength="255">
        </div>
    </div>
</template>
