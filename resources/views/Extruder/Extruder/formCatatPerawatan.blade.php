@extends('layouts.appExtruder')

@section('title')
    Pencatatan Perawatan
@endsection

@section('content')
    <div class="extruder_root">
        <input type="hidden" id="nama_gedung" value="{{ $formData['namaGedung'] }}">
        <input type="hidden" id="form_rw_return">

        <div id="tropodo_perawatan" class="form" data-aos="fade-up">
            <div class="card mt-3">
                <div id="group_box1" class="card-body">
                    <div class="row">
                        <div class="col-lg-2">
                            <span class="aligned-text">Tanggal:</span>
                        </div>
                        <div class="col-lg-2">
                            <input type="date" id="tanggal" class="form-control" disabled>
                        </div>
                        <div class="col-lg-1">
                            <span class="spn_enter">Enter</span>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-2">
                            <span class="aligned-text">Nama:</span>
                        </div>
                        <div class="col-lg-6">
                            <input type="text" id="nama" class="form-control" disabled>
                        </div>
                        <div class="col-lg-1">
                            <span class="spn_enter">Enter</span>
                        </div>
                        <div class="col-lg-2">
                            <input type="text" id="kode" class="form-control hidden">
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-2">
                            <span class="aligned-text">Shift:</span>
                        </div>
                        <div class="col-lg-2">
                            <input type="text" id="shift" class="form-control" disabled>
                        </div>
                        <div class="col-lg-1">
                            <span class="spn_enter">Enter</span>
                        </div>

                        <div class="col-lg-1">
                            <span class="aligned-text">Jam:</span>
                        </div>
                        <div class="col-lg-2">
                            <select id="select_jam" class="form-select" disabled>
                                <option selected>-- Pilih Jam --</option>
                                <option value="07:00_-_15:00__">07.00 - 15.00</option>
                                <option value="15:00_-_23:00__">15.00 - 23.00</option>
                                <option value="23:00_-_07:00__">23.00 - 07.00</option>
                            </select>
                        </div>
                        <div class="col-lg-1">
                            <span class="spn_enter">Enter</span>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-2">
                            <span class="aligned-text">Bagian:</span>
                        </div>
                        <div class="col-lg-6">
                            {{-- <select id="select_bagian" class="form-select" disabled>
                            <option selected disabled>-- Pilih Bagian --</option>
                            @foreach ($formData['listPerawatan'] as $d)
                                <option value="{{ $d->IdPerawatan }}">{{ $d->IdPerawatan . ' | ' . $d->NamaPerawatan }}
                                </option>
                            @endforeach
                        </select> --}}
                            <div class="input-group">
                                <input type="text" class="form-control" id="id_perawatan"
                                    style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                                <input type="text" class="form-control" id="nama_perawatan" style="border-left: none;"
                                    placeholder="Nama Perawatan..." disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_perawatan"
                                    disabled>
                                    ...
                                </button>
                            </div>


                        </div>
                        <div class="col-lg-1">
                            <span class="spn_enter">Enter</span>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-2">
                            <span class="aligned-text">Mesin:</span>
                        </div>
                        <div class="col-lg-6">
                            {{-- <select id="select_mesin" class="form-select" disabled>
                            <option selected disabled>-- Pilih Mesin --</option>
                            @foreach ($formData['listMesin'] as $d)
                                <option value="{{ $d->IdMesin }}">{{ $d->IdMesin . ' | ' . $d->TypeMesin }}</option>
                            @endforeach
                        </select> --}}
                            <div class="input-group">
                                <input type="text" class="form-control" id="id_mesin"
                                    style="max-width: 150px; border-right: none;" placeholder="ID" disabled>
                                <input type="text" class="form-control" id="nama_mesin" style="border-left: none;"
                                    placeholder="Nama Mesin..." disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_mesin" disabled>
                                    ...
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-1">
                            <span class="spn_enter">Enter</span>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-2">
                            <span class="aligned-text">No. Winder:</span>
                        </div>
                        <div class="col-lg-4">
                            {{-- <select id="select_winder" class="form-select" disabled>
                            <option selected disabled>-- Pilih Nomor Winder --</option>
                        </select> --}}
                            <div class="input-group">
                                <input type="text" class="form-control" id="id_winder" placeholder="ID" disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_winder"
                                    disabled>
                                    ...
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-1">
                            <span class="spn_enter">Enter</span>
                        </div>
                        <div class="col-lg-4">
                            {{-- <input type="text" id="winder" class="form-control" placeholder="Winder"> --}}
                            <input type="text" class="form-control" id="nama_winder" placeholder="Nama Winder..."
                                disabled>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mt-3">
                <div id="group_box2" class="card-body">
                    <div class="row">
                        <div class="col-lg-2">
                            <span class="aligned-text">Gangguan:</span>
                        </div>
                        <div class="col-lg-7">
                            {{-- <select id="select_gangguan" class="form-select" disabled>
                            <option selected disabled>-- Pilih Gangguan --</option>
                        </select> --}}
                            <div class="input-group rounded">
                                <input type="hidden"id="id_gangguan">
                                <input type="text" class="form-control rounded-start" id="nama_gangguan"
                                    placeholder="Nama Gangguan..." disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_gangguan"
                                    disabled>
                                    ...
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <span class="spn_enter">Enter</span>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-2">
                            <span class="aligned-text">Penyebab:</span>
                        </div>
                        <div class="col-lg-7">
                            {{-- <select id="select_penyebab" class="form-select" disabled>
                            <option selected disabled>-- Pilih Penyebab --</option>
                        </select> --}}
                            <div class="input-group rounded">
                                <input type="hidden"id="id_penyebab">
                                <input type="text" class="form-control rounded-start" id="nama_penyebab"
                                    placeholder="Nama Penyebab..." disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_penyebab"
                                    disabled>
                                    ...
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <span class="spn_enter">Enter</span>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-2">
                            <span class="aligned-text">Penyelesaian:</span>
                        </div>
                        <div class="col-lg-7">
                            {{-- <select id="select_penyelesaian" class="form-select" disabled>
                            <option selected disabled>-- Pilih Penyelesaian --</option>
                        </select> --}}
                            <div class="input-group rounded">
                                <input type="hidden"id="id_penyelesaian">
                                <input type="text" class="form-control rounded-start" id="nama_penyelesaian"
                                    placeholder="Nama Penyelesaian..." disabled>
                                <button type="button" class="btn btn-secondary rounded-end" id="btn_lookup_penyelesaian"
                                    disabled>
                                    ...
                                </button>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <span class="spn_enter">Enter</span>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-2">
                            <span class="aligned-text">Waktu Mulai:</span>
                        </div>
                        <div class="col-lg-2">
                            <input type="time" id="waktu_mulai" class="form-control" disabled>
                        </div>
                        <div class="col-lg-2">
                            <span class="spn_enter">Enter</span>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-lg-2">
                            <span class="aligned-text">Waktu Selesai:</span>
                        </div>
                        <div class="col-lg-2">
                            <input type="time" id="waktu_selesai" class="form-control" disabled>
                        </div>
                        <div class="col-lg-2">
                            <span class="spn_enter">Enter</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-5 text-center">
                    <button type="button" id="btn_isi" class="btn btn-success">Isi</button>
                    <button type="button" id="btn_koreksi" class="btn btn-warning">Koreksi</button>
                    <button type="button" id="btn_hapus" class="btn btn-danger">Hapus</button>
                </div>
                <div class="col-md-2"></div>
                <div class="col-md-5 text-center">
                    <button type="button" id="btn_proses" class="btn btn-primary">Proses</button>
                    <button type="button" id="btn_keluar" class="btn btn-secondary">Keluar</button>
                </div>
            </div>
        </div>
    </div>

    @include('Extruder.Extruder.modalLookUp')
    @include('Extruder.Extruder.modalDaftarPerawatan')

    <script src="{{ asset('js/Extruder/ExtruderNet/catatPerawatan.js') }}"></script>
@endsection
