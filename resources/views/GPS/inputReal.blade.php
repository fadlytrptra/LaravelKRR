<style>
    .gps-input-real-form {
        padding: 5px;
    }

    .gps-time-separator {
        font-size: 18px;
        font-weight: bold;
        align-self: center;
        color: #495057;
    }

    .form-label-custom {
        font-size: 14px;
        font-weight: 600;
        color: #343a40;
        margin-bottom: 4px;
    }
</style>

<template id="gps-inputReal-template">
    <div class="gps-input-real-form text-start">
        <div class="mb-3 border-bottom pb-2">
            <h6 class="fw-bold mb-1">Form Input Real Time</h6>
            {{-- <small class="text-muted">Masukkan data aktual pengerjaan jadwal konstruksi.</small> --}}
        </div>

        <div class="mb-3">
            <label for="TJml" class="form-label-custom">Jumlah Selesai</label>
            <input type="text" id="TJml" class="form-control" placeholder="0" aria-label="Jumlah Selesai">
        </div>

        <div class="mb-3">
            <label for="TKet" class="form-label-custom">Keterangan / Alasan</label>
            <textarea id="TKet" class="form-control" rows="3" placeholder="Tuliskan keterangan pengerjaan di sini..."
                maxlength="255"></textarea>
        </div>

        <div class="mb-3">
            <label class="form-label-custom">Waktu Realisasi (Jam : Menit)</label>
            <div class="d-flex gap-2">
                <div class="flex-fill">
                    <input type="text" id="TEstTime" class="form-control text-center" placeholder="00" maxlength="3"
                        aria-label="Jam Kerja Realisasi">
                </div>
                <div class="gps-time-separator">:</div>
                <div class="flex-fill">
                    <input type="text" id="TEstTime1" class="form-control text-center" placeholder="00"
                        maxlength="2" aria-label="Menit Kerja Realisasi">
                </div>
            </div>
        </div>

    </div>
</template>
