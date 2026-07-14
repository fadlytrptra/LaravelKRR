<style>
    .btn-download {
        padding: 6px 10px;
        font-size: 12px;
        line-height: 1.5;
        width: auto;
        display: inline-block;
    }

    .foto-barang-container {
        display: none;
        margin-top: 10px;
        margin-bottom: 15px;
        text-align: center;
    }

    .foto-barang:hover {
        border-color: #007bff;
        transform: scale(1.03);
    }

    .foto-barang-kosong {
        padding: 15px;
        border: 1px dashed #ccc;
        border-radius: 6px;
        color: #777;
        text-align: center;
    }

    .attachment-foto-row {
        display: flex;
        align-items: flex-start;
        gap: 15px;
        margin-top: 10px;
        margin-bottom: 12px;
    }

    #FotoBarangContainer {
        flex: 1;
    }

    .foto-barang {
        display: block;
        max-width: 200px;
        max-height: 150px;
        width: auto;
        height: auto;
        object-fit: contain;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 3px;
        background: #fff;
        cursor: pointer;
        transition: transform 0.2s ease;
    }

    .swal-preview-foto {
        max-width: 85vw ;
        max-height: 80vh;
        width: auto;
        height: auto;
        object-fit: contain;
        margin: 20px auto;
    }
</style>


<div class="modal fade" id="modalDetailApprove" tabindex="-1" data-bs-keyboard="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="judul"></h5>
            </div>
            <div class="panel-body">
                <div id="loading">
                    <br>
                    <div class="loader" style="text-align: center;margin-left: 35%;"></div>
                    <br>
                </div>

                <form class="formDetail" method="POST" enctype="multipart/form-data" action="">
                    {{ csrf_field() }}
                    <div class="modal-body bordered" id="DivDetailData">
                        <p class="RDZCard" id="NamaBarang" onclick="Detail('Kategori_Barang','iconKategoriBarang');">
                        </p>
                        <div id="Kategori_Barang" style="display: none;border: 1px solid;padding-left: 10px">
                            <p class="RDZCard2" id="KategoriUtama"></p>
                            <p class="RDZCard2" id="Kategori"></p>
                            <p class="RDZCard2" id="SubKategori"></p>
                        </div>
                        <p class="RDZCard" id="Qty"></p>
                        <p class="RDZCard" id="Divisi"></p>
                        <p class="RDZCard" id="Pemesan"></p>
                        <p class="RDZCard" id="User"></p>
                        <p class="RDZCard" id="Status"></p>
                        <p class="RDZCard" id="TglButuh"></p>
                        <p class="RDZCard" id="KetOrder"></p>
                        <p class="RDZCard" id="KetInternal"></p>
                        <p class="RDZCard" id="PembelianTerakhir"></p>

                       <div class="attachment-foto-row">
                            {{-- KIRI: DOWNLOAD ATTACHMENT --}}
                            <div>
                                <button type="button"
                                    class="btn RDZButtonCard btn-download"
                                    id="btnDownloadAttachment"
                                    name="action">
                                    Download Attachment
                                </button>
                            </div>

                            {{-- KANAN: FOTO BARANG --}}
                            <div id="FotoBarangContainer" style="display: none;">
                                <img id="FotoBarang"
                                    src=""
                                    alt="Foto Barang"
                                    class="foto-barang">
                            </div>
                        </div>



                        <button type="submit" class="btn btn-sm btn-default RDZButtonCard"
                            style="background-color:#007bff;color: white;" name="action"
                            value="Approve">Approve</button>
                        <button type="submit" class="btn btn-sm btn-default RDZButtonCard"
                            style="background-color:#dc3545;color: white;" name="action" value="Reject">Reject</button>
                        <button type="button" class="btn btn-sm btn-default RDZButtonCard" data-bs-dismiss="modal"
                            style="background-color:gray;color: white;">Tutup</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
