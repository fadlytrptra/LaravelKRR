<style>
    #tableLookupGeneric tbody tr:hover {
            background-color: #f1f1f1;
        }

        #tableLookupGeneric tbody tr:focus {
            outline: none
        }

        #tableLookupGeneric tbody tr:focus td {
            background-color: #0d6efd !important;
            color: white !important;
        }

        .input-group>.form-control,
        .input-group>.btn,
        .input-group>.input-group-text {
            height: 38px !important;
            display: flex;
            align-items: center;
        }

        input[type="number"].form-control {
            display: block;
        }
</style>

<div class="modal fade" id="form_rincian_konversi" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">

            <div class="modal-header">
                <h1 class="modal-title fs-5">Rincian Konversi</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">
                <div id="asal_konv" class="card">
                    <div class="card-header">Asal Konversi</div>

                    <div class="card-body" style="background: ghostwhite">
                        <div class="row">
                            <div class="col-lg-4">
                                <label for="kelut_rk">Kelompok Utama:</label>
                                <div class="input-group mb-3">
                                    <input type="text" id="id_kelut_rk" class="form-control col-3" style="width: 30%; border-right: none;"
                                        disabled>
                                    <input type="text" id="nama_kelut_rk" class="form-control col-7"
                                        style="width: 70%; border-left: none;" disabled>
                                </div>

                                <label for="kel_rk">Kelompok:</label>
                                <div class="input-group mb-3">
                                    <input type="text" id="id_kel_rk" class="form-control col-3" style="width: 30%; border-right: none;"
                                        disabled>
                                    <input type="text" id="nama_kel_rk" class="form-control col-7" style="width: 70%; border-left: none;"
                                        disabled>
                                </div>

                                <label for="subkel_rk">Sub-kelompok:</label>
                                <div class="input-group mb-3">
                                    <input type="text" id="id_subkel_rk" class="form-control col-3"
                                        style="width: 30%; border-right: none;" disabled>
                                    <input type="text" id="nama_subkel_rk" class="form-control col-7"
                                        style="width: 70%; border-left: none;" disabled>
                                </div>

                                <label for="type_rk">Type:</label>
                                <div class="input-group mb-3">
                                    <input type="text" id="id_type_rk" class="form-control col-3" style="width: 30%; border-right: none;"
                                        disabled>
                                    <input type="text" id="nama_type_rk" class="form-control col-7"
                                        style="width: 70%; border-left: none;" disabled>
                                </div>
                            </div>

                            <div class="col-lg-8 d-flex align-items-center">
                                <div class="card">
                                    <div class="card-header">Saldo Akhir</div>

                                    <div class="card-body" style="padding: 35px var(--bs-card-spacer-x)">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="row">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Primer:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="saldo_primer_asal"
                                                            class="form-control" placeholder="0" disabled>
                                                        <span id="sat_primer_asal" class="input-group-text">NULL</span>
                                                    </div>
                                                </div>

                                                <div class="row mt-4">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Sekunder:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="saldo_sekunder_asal"
                                                            class="form-control" placeholder="0" disabled>
                                                        <span id="sat_sekunder_asal"
                                                            class="input-group-text">NULL</span>
                                                    </div>
                                                </div>

                                                <div class="row mt-4">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Tritier:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="saldo_tritier_asal"
                                                            class="form-control" placeholder="0" disabled>
                                                        <span id="sat_tritier_asal" class="input-group-text">NULL</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-lg-6">
                                                <div class="row">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Primer:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="primer_asal" class="form-control"
                                                            placeholder="0">
                                                    </div>
                                                </div>

                                                <div class="row mt-4">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Sekunder:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="sekunder_asal" class="form-control"
                                                            placeholder="0">
                                                    </div>
                                                </div>

                                                <div class="row mt-4">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Tritier:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="tritier_asal" class="form-control"
                                                            placeholder="0">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="tujuan_konv" class="card mt-3">
                    <div class="card-header">Tujuan Konversi</div>

                    <div class="card-body" style="background: ghostwhite">
                        <div class="row">
                            <div class="col-lg-4">
                                <label for="txt_kelut_tujuan_rk">Kelompok Utama:</label>
                                <div class="input-group rounded mb-3">
                                    <input type="hidden" id="id_kelut_tujuan_rk">
                                    <input type="text" id="txt_kelut_tujuan_rk" class="form-control rounded-start"
                                        placeholder="Pilih Kelompok Utama..." disabled>
                                    <button type="button" class="btn btn-secondary rounded-end"
                                        id="btn_lookup_kelut_rk" disabled>...</button>
                                </div>

                                <label for="txt_kel_tujuan_rk">Kelompok:</label>
                                <div class="input-group rounded mb-3">
                                    <input type="hidden" id="id_kel_tujuan_rk">
                                    <input type="text" id="txt_kel_tujuan_rk" class="form-control rounded-start"
                                        placeholder="Pilih Kelompok..." disabled>
                                    <button type="button" class="btn btn-secondary rounded-end"
                                        id="btn_lookup_kel_rk" disabled>...</button>
                                </div>

                                <label for="txt_subkel_tujuan_rk">Sub-kelompok:</label>
                                <div class="input-group rounded mb-3">
                                    <input type="hidden" id="id_subkel_tujuan_rk">
                                    <input type="text" id="txt_subkel_tujuan_rk"
                                        class="form-control rounded-start" placeholder="Pilih Sub-kelompok..."
                                        disabled>
                                    <button type="button" class="btn btn-secondary rounded-end"
                                        id="btn_lookup_subkel_rk" disabled>...</button>
                                </div>

                                <label for="txt_type_tujuan_rk">Type:</label>
                                <div class="input-group rounded mb-3">
                                    <input type="hidden" id="id_type_tujuan_rk">
                                    <input type="text" id="txt_type_tujuan_rk" class="form-control rounded-start"
                                        placeholder="Pilih Type..." disabled>
                                    <button type="button" class="btn btn-secondary rounded-end"
                                        id="btn_lookup_type_rk" disabled>...</button>
                                </div>
                            </div>

                            <div class="col-lg-8 d-flex align-items-center">
                                <div class="card">
                                    <div class="card-header">Saldo Akhir</div>

                                    <div class="card-body" style="padding: 35px var(--bs-card-spacer-x)">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="row">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Primer:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="saldo_primer_tujuan"
                                                            class="form-control" placeholder="0" disabled>
                                                        <span id="sat_primer_tujuan"
                                                            class="input-group-text">NULL</span>
                                                    </div>
                                                </div>

                                                <div class="row mt-4">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Sekunder:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="saldo_sekunder_tujuan"
                                                            class="form-control" placeholder="0" disabled>
                                                        <span id="sat_sekunder_tujuan"
                                                            class="input-group-text">NULL</span>
                                                    </div>
                                                </div>

                                                <div class="row mt-4">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Tritier:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="saldo_tritier_tujuan"
                                                            class="form-control" placeholder="0" disabled>
                                                        <span id="sat_tritier_tujuan"
                                                            class="input-group-text">NULL</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-lg-6">
                                                <div class="row">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Primer:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="primer_tujuan" class="form-control"
                                                            placeholder="0">
                                                    </div>
                                                </div>

                                                <div class="row mt-4">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Sekunder:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="sekunder_tujuan"
                                                            class="form-control" placeholder="0">
                                                    </div>
                                                </div>

                                                <div class="row mt-4">
                                                    <span class="aligned-text col-3"
                                                        style="width: 30%; font-size: initial;">Tritier:</span>
                                                    <div class="input-group col-7" style="width: 65%">
                                                        <input type="number" id="tritier_tujuan"
                                                            class="form-control" placeholder="0">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" id="rk_cancel" class="btn btn-secondary"
                    data-bs-dismiss="modal">CANCEL</button>
                <button type="button" id="rk_confirm" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
            </div>

        </div>
    </div>
</div>

<div class="modal fade" id="modalLookupGeneric" tabindex="-1" aria-labelledby="modalLookupGenericLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content border-0 shadow-lg">

            <div class="modal-header bg-light border-bottom">
                <h5 class="modal-title fw-semibold text-dark fs-5" id="lookupTitle">
                    <i class="bi bi-view-list text-primary me-2"></i>Pilih Data
                </h5>
                <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>

            <div class="modal-body p-4">
                <div class="row g-3 align-items-center mb-3">
                    <div class="col-12 col-md-auto">
                        <div class="d-flex align-items-center text-muted small">
                            <span class="me-2">Tampilkan</span>
                            <select id="showPerPage" class="form-select form-select-sm shadow-none"
                                style="width: 75px;">
                                <option value="5">5</option>
                                <option value="10" selected>10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                            <span class="ms-2">baris</span>
                        </div>
                    </div>
                    <div class="col-12 col-md-auto ms-md-auto">
                        <div class="input-group input-group-sm shadow-sm">
                            <span class="input-group-text bg-white text-muted border-end-0">
                                <i class="bi bi-search"></i>
                            </span>
                            <input type="text" id="lookupSearch" class="form-control border-start-0 shadow-none"
                                placeholder="Cari komposisi...">
                        </div>
                    </div>
                </div>

                <div class="table-responsive border rounded-3">
                    <table class="table table-hover align-middle mb-0" id="tableLookupGeneric">
                        <thead class="table-light text-muted">
                            <tr id="lookupHeaders">
                            </tr>
                        </thead>
                        <tbody id="lookupBody" class="border-top-0">
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="modal-footer d-flex flex-column flex-sm-row justify-content-between bg-light border-top">
                <nav aria-label="Navigasi Halaman" class="mb-3 mb-sm-0">
                    <ul class="pagination pagination-sm mb-0" id="paginationControls">
                    </ul>
                </nav>
                <button type="button" class="btn btn-secondary btn-sm px-4" data-bs-dismiss="modal">Tutup</button>
            </div>

        </div>
    </div>
</div>

<script src="{{ asset('js/Extruder/ExtruderNet/rincianKonversi.js') }}"></script>
