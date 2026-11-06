@extends('layouts.appGPS')

@section('title')
    Maintenance Material Type
@endsection

@section('content')
    <style>
        .GPS_root {
            width: 100%;
        }

        #maint_material_form {
            max-width: 720px;
            margin: 40px auto;
            padding: 20px;
        }

        .lookup-btn {
            cursor: pointer;
            background: #e9ecef;
            border: 1px solid #ced4da;
            border-left: none;
            border-radius: 0 0.25rem 0.25rem 0;
            padding: 0 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .lookup-btn:hover {
            background: #dee2e6;
        }

        .input-group-lookup .form-control {
            border-radius: 0.25rem 0 0 0.25rem;
        }
    </style>

    <div class="GPS_root">
        <div id="maint_material_form" class="form border rounded p-4 shadow-sm" data-aos="fade-up">

            <h4 class="mb-4 fw-bold border-bottom pb-2">
                <i class="bi bi-box-seam me-2"></i>Maintenance Material Type
            </h4>

            <fieldset id="Frame2" disabled>
                <div class="row mt-3">
                    <div class="col-lg-3 aligned-text">Material Type:</div>
                    <div class="col-lg-9">
                        <div class="input-group input-group-lookup">
                            <input type="text" id="TMaterial" class="form-control"
                                placeholder="Ketik Material Type atau klik ...">
                            <button class="lookup-btn" id="btnMat" title="Cari Material">
                                <i class="bi bi-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <input type="hidden" id="TNoMat" value="">
            </fieldset>

            <div class="row mt-4 pt-3 border-top">
                <div class="col-md-8">
                    <button type="button" id="btnIsiM" class="btn btn-primary fw-bold me-2">
                        <i class="bi bi-plus-circle"></i> ISI
                    </button>
                    <button type="button" id="btnKoreksiM" class="btn btn-warning fw-bold text-dark me-2">
                        <i class="bi bi-pencil-square"></i> KOREKSI
                    </button>
                    <button type="button" id="btnHapusM" class="btn btn-danger fw-bold me-2">
                        <i class="bi bi-trash"></i> HAPUS
                    </button>
                    <button type="button" id="btnProsesM" class="btn btn-success fw-bold" disabled>
                        PROSES
                    </button>
                </div>
                <div class="col-md-4 text-end">
                    <button type="button" id="btnKeluar" class="btn btn-secondary fw-bold px-4">KELUAR</button>
                </div>
            </div>

        </div>
    </div>

    <script>
        window.maintMaterialConfig = {
            routeGetMaterialList: "{{ route('GPS.pengerjaanMaterialType.get-material-list') }}",
            routeStore: "{{ route('GPS.pengerjaanMaterialType.store') }}"
        };
    </script>

    <script src="{{ asset('js/GPS/JadwalPengerjaan/pengerjaanMaterialType.js') }}"></script>
@endsection
