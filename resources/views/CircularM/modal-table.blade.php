<!-- Button trigger modal -->
{{-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    Launch static backdrop modal
</button> --}}

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="md_title">Modal Table</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <center>
                    <h1 id="loading_label">Memuat Data...</h1>
                </center>

                <div id="table_container">
                    <table id="myTable" class="table table-bordered table-hover">
                        <thead></thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" id="modal_ok" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('js/circular/modal-table.js') }}"></script>
