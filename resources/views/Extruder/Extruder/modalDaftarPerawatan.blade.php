<div class="modal fade" id="form_daftar_rawat" tabindex="-1">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">

            <div class="modal-header">
                <h1 class="modal-title fs-5">Daftar Perawatan</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">
                <h1 id="loading_lbl">
                    <center>Memuat data...</center>
                </h1>

                <table id="table_perawatan" class="hover cell-border hidden">
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Nama</th>
                            <th>Shift</th>
                            <th>Waktu</th>
                            <th>Bagian</th>
                            <th>Mesin</th>
                            <th>No. Winder</th>
                            <th>Gangguan</th>
                            <th>Penyebab</th>
                            <th>Penyelesaian</th>
                            <th>Mulai</th>
                            <th>Selesai</th>
                            {{-- <th>Kode</th> --}}
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>

            <div class="modal-footer">
                <button type="button" id="rw_cancel" class="btn btn-secondary" data-bs-dismiss="modal">CANCEL</button>
                <button type="button" id="rw_confirm" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
            </div>

        </div>
    </div>
</div>

<script src="{{ asset('js/Extruder/ExtruderNet/daftarPerawatan.js') }}"></script>
