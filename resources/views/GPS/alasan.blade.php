<style>
    ```css .gps-alasan-form {
        padding: 2px;
    }

    .gps-alasan-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
        border: 1px solid #dee2e6;
        border-radius: 10px;
        background: #fff;
        cursor: pointer;
        transition: border-color .2s ease,
            background-color .2s ease,
            box-shadow .2s ease;
    }

    .gps-alasan-option:hover {
        border-color: #86b7fe;
        background: #f8fbff;
    }

    .gps-alasan-option:has(input:checked) {
        border-color: #0d6efd;
        background: #f0f6ff;
        box-shadow: 0 0 0 2px rgba(13, 110, 253, .08);
    }

    .gps-alasan-option input[type="radio"] {
        position: absolute;
        opacity: 0;
        pointer-events: none;
    }

    .gps-alasan-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 42px;
        height: 42px;
        border-radius: 9px;
        background: #f1f3f5;
        font-size: 20px;
    }

    .gps-alasan-option:has(input:checked) .gps-alasan-icon {
        background: #dbeafe;
    }

    .gps-alasan-content {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 3px;
    }

    .gps-alasan-title {
        color: #212529;
        font-size: 14px;
        font-weight: 600;
    }

    .gps-alasan-content small {
        color: #6c757d;
        font-size: 12px;
        line-height: 1.4;
    }

    .gps-alasan-check {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
        border: 2px solid #ced4da;
        border-radius: 50%;
        position: relative;
    }

    .gps-alasan-option:has(input:checked) .gps-alasan-check {
        border-color: #0d6efd;
    }

    .gps-alasan-option:has(input:checked) .gps-alasan-check::after {
        content: "";
        position: absolute;
        inset: 3px;
        border-radius: 50%;
        background: #0d6efd;
    }

    #gps-alasan-lainnya {
        border-radius: 9px;
        font-size: 14px;
        padding: 11px 12px;
    }

    #gps-alasan-lainnya:focus {
        border-color: #86b7fe;
        box-shadow: 0 0 0 .2rem rgba(13, 110, 253, .15);
    }

    ```
</style>
<template id="gps-alasan-template">
    <div class="gps-alasan-form text-start">
        <div class="mb-3">
            <h6 class="fw-bold mb-1">Pilih Alasan</h6>
            <small class="text-muted">
                Pilih alasan yang paling sesuai dengan kondisi saat ini.
            </small>
        </div>

        <div class="gps-alasan-options d-flex flex-column gap-2">

            <label class="gps-alasan-option">
                <input type="radio" name="gpsAlasan" value="Menunggu Contoh">
                <span class="gps-alasan-icon">📄</span>
                <span class="gps-alasan-content">
                    <span class="gps-alasan-title">Menunggu Contoh</span>
                    <small>Menunggu contoh atau referensi gambar.</small>
                </span>
                <span class="gps-alasan-check"></span>
            </label>

            <label class="gps-alasan-option">
                <input type="radio" name="gpsAlasan" value="Komputer Rusak">
                <span class="gps-alasan-icon">💻</span>
                <span class="gps-alasan-content">
                    <span class="gps-alasan-title">Komputer Rusak</span>
                    <small>Komputer mengalami gangguan teknis.</small>
                </span>
                <span class="gps-alasan-check"></span>
            </label>

            <label class="gps-alasan-option">
                <input type="radio" name="gpsAlasan" value="Listrik Mati">
                <span class="gps-alasan-icon">⚡</span>
                <span class="gps-alasan-content">
                    <span class="gps-alasan-title">Listrik Mati</span>
                    <small>Terjadi pemadaman listrik.</small>
                </span>
                <span class="gps-alasan-check"></span>
            </label>

            <label class="gps-alasan-option">
                <input type="radio" name="gpsAlasan" value="Instruksi">
                <span class="gps-alasan-icon">📋</span>
                <span class="gps-alasan-content">
                    <span class="gps-alasan-title">Instruksi</span>
                    <small>Menunggu instruksi atau arahan.</small>
                </span>
                <span class="gps-alasan-check"></span>
            </label>

            <label class="gps-alasan-option">
                <input type="radio" name="gpsAlasan" value="Lain-lain">
                <span class="gps-alasan-icon">💬</span>
                <span class="gps-alasan-content">
                    <span class="gps-alasan-title">Lain-lain</span>
                    <small>Alasan di luar pilihan yang tersedia.</small>
                </span>
                <span class="gps-alasan-check"></span>
            </label>
        </div>

        <input type="text" id="gps-alasan-lainnya" class="form-control mt-3" placeholder="Tuliskan alasan lainnya..."
            aria-label="Alasan lainnya" maxlength="255" style="display: none;">
    </div>
</template>
