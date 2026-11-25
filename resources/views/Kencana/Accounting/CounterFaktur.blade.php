
@extends('layouts.appKencana')

@section('title', 'Counter Faktur')

@section('content')

<style>
    .counter-card {
        max-width: 950px;
        margin: auto;
    }

    fieldset {
        border: 1px solid #bdbdbd !important;
    }

    legend {
        font-size: 18px;
        font-weight: 600;
    }

    .card-body {
        padding: 30px;
    }

    label {
        font-size: 16px;
        font-weight: 500;
    }

    .form-control {
        font-size: 16px;
        height: 42px;
    }

    .text-primary {
        font-size: 14px;
    }

    .btn {
        font-size: 16px;
        padding: 8px 30px;
    }
</style>

<div class="container mt-3">
    <div class="card shadow-sm counter-card">
        <div class="card-body">

            {{-- Sebelum --}}
            <fieldset class="border p-3 mb-4">
                <legend class="float-none w-auto px-2 fs-6">
                    Sebelum
                </legend>

                <div class="row mb-3">
                    <label class="col-md-3 col-form-label">Tahun</label>

                    <div class="col-md-7">
                        <input type="number"
                               class="form-control"
                               id="tahun"
                               value="{{ date('Y') }}"
                               min="1000"
                               max="9999">
                    </div>
                </div>

                <div class="row mb-3">
                    <label class="col-md-3 col-form-label">Counter Faktur</label>

                    <div class="col-md-7">
                        <input type="text"
                               class="form-control"
                               id="counter_sebelum"
                               readonly>
                    </div>
                </div>
            </fieldset>

            {{-- Sesudah --}}
            <fieldset class="border p-3 mb-3">
                <legend class="float-none w-auto px-2 fs-6">
                    Sesudah
                </legend>

                <div class="row mb-3">
                    <label class="col-md-3 col-form-label">Counter Faktur</label>

                    <div class="col-md-7">
                        <input type="number"
                               class="form-control"
                               id="counter_sesudah"
                               min="0">
                    </div>
                </div>
            </fieldset>

            <div class="text-primary fst-italic mb-4">
                * Counter = nomor yang akan dibuat -1
            </div>

            <div class="d-flex justify-content-center gap-3">
                <button class="btn btn-secondary px-4" id="btnRefresh">
                    Refresh
                </button>

                <button class="btn btn-primary px-4" id="btnSimpan">
                    Simpan
                </button>
            </div>

        </div>
    </div>
</div>

<script src="{{ asset('js/Kencana/CounterFaktur.js') }}"></script>

@endsection
