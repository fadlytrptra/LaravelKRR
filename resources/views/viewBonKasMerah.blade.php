<style>
    .modal-tambah-bon-kas {
        max-width: 1400px !important;
        width: 90% !important;
        margin: 30px auto;
    }

    .modal-tambah-bon-kas .modal-content {
        width: 100%;
    }
    #terbilang{
        margin-top: 4px;
        color: #343a40;
        font-weight: 500;
        font-size: 1.25rem;
    }
</style>



{{-- Modal Tambah Bon Kas Merah --}}
<div class="modal fade"
     id="modalViewBonKasMerah"
     tabindex="-1"
     aria-labelledby="modalViewBonKasMerah"
     aria-hidden="true">

    <div class="modal-dialog modal-dialog-scrollable modal-tambah-bon-kas">

        <div class="modal-content">

            {{-- HEADER --}}
            <div class="modal-header bg-danger text-white">

                <div class="row align-items-center w-100">

                    <div class="col-md-6">
                        <h4 class="modal-title mb-0"
                            id="modalViewBonKasMerah">
                            BON KAS MERAH
                        </h4>
                    </div>

                    <div class="col-md-6">
                        <div class="row align-items-center">

                            <label class="col-sm-4 col-form-label text-end fw-bold">
                                Kode Bon Kas
                            </label>

                            <div class="col-sm-7">
                                <input type="text"
                                       id="kodeBonKasForm"
                                       class="form-control"
                                       value="{{ $kodeBonKas ?? '-' }}"
                                       readonly>
                            </div>

                            <div class="col-sm-1 text-end">
                                <button type="button"
                                        class="btn-close btn-close-white"
                                        data-bs-dismiss="modal"
                                        aria-label="Close">
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

            </div>


            {{-- BODY --}}
            <div class="modal-body">

                {{-- ERROR --}}
                @if(session('error'))
                    <div class="alert alert-danger">
                        {{ session('error') }}
                    </div>
                @endif

                @if($errors->any())
                    <div class="alert alert-danger">
                        <ul class="mb-0">
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif


                {{-- FORM --}}
                <form id="formViewBonKasMerah"
                      action="{{ route('bon-kas.store') }}"
                      method="POST"
                      enctype="multipart/form-data">

                    @csrf

                    <input type="hidden"
                           name="JenisBonKas"
                           value="P">

                    <input type="hidden"
                           name="Penerima"
                           value="{{ Auth::user()->NomorUser }}">

                    <input type="hidden"
                           name="action"
                           id="formAction"
                           value="simpan">

                    <input type="hidden"
                           name="Mengetahui"
                           id="formMengetahui">


                    {{-- TANGGAL, JUMLAH, NO PO --}}
                    <div class="row">

                        {{-- TANGGAL & JUMLAH --}}
                        <div class="col-md-6">

                            {{-- TANGGAL --}}
                            <div class="mb-3">

                                <label class="form-label fw-bold">
                                    Tanggal
                                </label>

                                <input type="date"
                                       id="tanggal"
                                       class="form-control"
                                       name="tanggal"
                                       value="{{ date('Y-m-d') }}"
                                       readonly>
                            </div>


                            {{-- JUMLAH --}}
                            <div class="mb-3">
                                <label class="form-label fw-bold">
                                    Jumlah Uang (Rp)
                                </label>

                                <input type="text"
                                       id="jumlah"
                                       class="form-control @error('jumlah') is-invalid @enderror"
                                       name="jumlah"
                                       value="{{ old('jumlah') ? number_format(old('jumlah'), 2, ',', '.') : '' }}"
                                       placeholder="Masukkan jumlah uang"
                                       inputmode="numeric"
                                       autocomplete="off"
                                       tabindex="2"
                                       readonly>

                                @error('jumlah')
                                    <div class="invalid-feedback">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                        </div>


                        {{-- NO PO --}}
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label fw-bold">
                                    No PO
                                    <span class="text-muted">
                                        (Opsional)
                                    </span>
                                </label>

                                <input type="text"
                                       id="noPO"
                                       class="form-control @error('NoPO') is-invalid @enderror"
                                       name="NoPO"
                                       value="{{ old('NoPO') }}"
                                       placeholder="Masukkan Nomor PO"
                                       tabindex="1"
                                       readonly>

                                @error('NoPO')
                                    <div class="invalid-feedback">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>
                        </div>
                    </div>


                    {{-- TERBILANG --}}
                    <div class="row">
                        <div class="col-md-12">
                            <h4 id="terbilang"
                                class="d-block mb-3"
                                style="margin-top:2px;color:#343a40;font-weight:500;">
                                (....................................................................................................................)
                            </h4>
                        </div>
                    </div>


                    {{-- URAIAN --}}
                    <div class="mb-4">
                        <label class="form-label fw-bold">
                            Uraian
                        </label>

                        <textarea
                            id="uraian"
                            class="form-control @error('uraian') is-invalid @enderror"
                            rows="5"
                            name="uraian"
                            placeholder="Masukkan uraian"
                            tabindex="3"
                            readonly>{{ old('uraian') }}</textarea>

                        @error('uraian')
                            <div class="invalid-feedback">
                                {{ $message }}
                            </div>
                        @enderror

                    </div>


                    {{-- TANDA TANGAN --}}
                    <div class="row text-center mt-4">
                        {{-- MENERIMA --}}
                        <div class="col-md-4">
                            <h5>
                                Menerima
                            </h5>

                            <div class="text-center mb-2"
                                 style="height:120px;">

                                @if(!empty(Auth::user()->FotoTtd))

                                    <img
                                        src="data:image/png;base64,{{ Auth::user()->FotoTtd }}"
                                        style="
                                            max-height:100px;
                                            max-width:180px;
                                        "
                                        id="ttdPenerimaModal">

                                @endif

                            </div>

                            <hr class="mb-2">

                            <div class="fw-bold" id="namaPenerima">
                                {{ Auth::user()->NamaUser }}
                            </div>

                        </div>


                        {{-- MENGETAHUI --}}
                        <div class="col-md-4">

                            <h5>
                                Mengetahui
                            </h5>

                            <div class="text-center mb-2" style="height:120px;">
                                <img
                                    id="ttdMengetahuiModal"
                                    style="
                                        display:none;
                                        max-height:100px;
                                        max-width:180px;
                                    ">

                            </div>

                            <hr class="mb-2">

                            <div class="text-muted" id="namaMengetahui">
                                Belum Ditentukan
                            </div>

                        </div>


                        {{-- KASIR --}}
                        <div class="col-md-4">
                            <h5>
                                Kasir
                            </h5>

                           <div class="text-center mb-2" style="height:120px;">

                                <img
                                    id="ttdKasirModal"
                                    style="
                                        display:none;
                                        max-height:100px;
                                        max-width:180px;
                                    ">

                            </div>

                            <hr class="mb-2">

                            <div
                                class="text-muted"
                                id="namaKasir">
                                Belum Ditentukan
                            </div>

                        </div>

                    </div>

                </form>

                <br><br><br>

                {{-- DOKUMENTASI --}}
                <div class="mb-4">
                    <label class="form-label fw-bold">
                        Dokumentasi
                    </label>

                   <div id="listDokumentasi" class="row g-3">
                        <div class="col-12 text-center text-muted" id="tidakAdaDokumentasi">
                            Tidak ada dokumentasi.
                        </div>
                    </div>
                </div>
            </div>


            {{-- FOOTER --}}
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">
                    Close
                </button>
            </div>
        </div>
    </div>
</div>


{{-- MODAL PREVIEW GAMBAR --}}
<div class="modal fade"
     id="modalPreview"
     tabindex="-1"
     aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered modal-xl">

        <div class="modal-content border-0">

            <div class="modal-header border-0 d-flex justify-content-end">

                <button type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close">
                </button>

            </div>

            <div class="modal-body text-center">

                <img id="previewImage"
                     class="img-fluid rounded"
                     style="max-height:80vh;">
            </div>
        </div>
    </div>
</div>

