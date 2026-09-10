@extends('Circular.layouts.app')

@section('title')
    Eff Rata-rata Periode
@endsection

@section('content')
    {{-- <div class="card mb-3">
        <div class="card-header">
            Maintenance Order
        </div> --}}

    <div class="container-fluid px-0">
        <div class="row justify-content-center mx-0">
            <div class="col-12 px-0 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Eff Rata-rata Periode</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="form-container col-md-12">
                            @csrf
                            <div class="row">
                                <div class="col-auto">
                                    <label class="form-check-label mb-0" id="labelRedisplay">
                                        Tanggal
                                    </label>
                                </div>
                                <div class="col-2">
                                    <input type="date" class="form-control font-weight-bold" id="tgl_awal"
                                        name="tgl_awal">
                                </div>
                                <div class="col-1" style="text-align: center">
                                    <label class="mb-0">s/d</label>
                                </div>
                                <div class="col-2">
                                    <input type="date" class="form-control font-weight-bold" id="tgl_akhir"
                                        name="tgl_akhir">
                                </div>

                                <!-- RADIO BUTTON -->
                                <div class="col-auto d-flex align-items-center">
                                    <div class="form-check me-2">
                                        <input class="form-check-input" type="radio" name="filter_type" id="rb_grup"
                                            value="grup" checked>
                                        <label class="form-check-label" for="rb_grup">
                                            Grup Mesin
                                        </label>
                                    </div>
                                    <div class="form-check me-2">
                                        <input class="form-check-input" type="radio" name="filter_type" id="rb_mesin"
                                            value="mesin">
                                        <label class="form-check-label" for="rb_mesin">
                                            Mesin
                                        </label>
                                    </div>
                                    <div class="form-check">
                                        <input class="form-check-input" type="radio" name="filter_type" id="rb_order"
                                            value="order">
                                        <label class="form-check-label" for="rb_order">
                                            Order
                                        </label>
                                    </div>
                                </div>

                                <div class="col-sm-2 d-flex align-items-end">
                                    <button class="btn btn-primary" id="btn_redisplay">Redisplay</button>
                                </div>
                            </div>
                            <br>
                            <div class="row pb-2">
                                <div class="col-md-3">
                                    <label>Type Mesin</label>
                                    <select id="type_mesin" class="form-select form-select-sm" style="width: 100%">
                                        <option></option>
                                        @foreach ($filtered as $d)
                                            <option value="{{ $d->IdType_Mesin }}">
                                                {{ $d->IdType_Mesin . ' | ' . $d->Type_Mesin }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <label>Mesin</label>
                                    <select id="nama_mesin" class="form-select form-select-sm" style="width: 100%">
                                        <option></option>
                                    </select>
                                </div>
                                <div class="col-md-7">
                                    <label>Order</label>
                                    <div>
                                        <label>
                                            <input type="radio" name="search_by" value="kd" checked> Kode Barang
                                        </label>
                                        <label>
                                            <input type="radio" name="search_by" value="nama"> Nama Barang
                                        </label>
                                        <label>
                                            <input type="radio" name="search_by" value="tek1"> Ukuran
                                        </label>
                                    </div>
                                    <select id="order" class="form-select form-select-sm" style="width: 100%">
                                        <option></option>
                                        @foreach ($listBarang as $d)
                                            <option value="{{ $d->KD_BRG }}" data-kd="{{ $d->KD_BRG }}"
                                                data-nama="{{ $d->NAMA_BRG }}" data-tek1="{{ $d->D_TEK1 }}">
                                                {{ $d->KD_BRG . ' | ' . $d->NAMA_BRG . ' | ' . $d->D_TEK1 }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <br>
                            <table class="table table-bordered text-center align-middle" id="table_atas">
                                <thead class="table">
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Shift</th>
                                        <th>Type Mesin</th>
                                        <th>Nama Mesin</th>
                                        <th>Nama Barang</th>
                                        <th>Afalan WA</th>
                                        <th>Afalan WE</th>
                                        <th>Hasil Meter</th>
                                        <th>Effisiensi</th>
                                        <th>Hasil KG</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <div class="row pb-2">
                                <div class="col-sm-1">
                                    <label for="rata_eff" class="form-label">Rata-rata Effisiensi</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="rata_eff" name="rata_eff" readonly>
                                </div>
                                <div class="col-sm-1 d-flex justify-content-end">
                                    <label for="total_meter" class="form-label">Total Meter</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="total_meter" name="total_meter" readonly>
                                </div>
                                <div class="col-sm-1 d-flex justify-content-end">
                                    <label for="total_kg" class="form-label">Total KG</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" id="total_kg" name="total_kg" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{ asset('js/Circular/laporanCircular/EffRataPeriode.js') }}"></script>
@endsection
