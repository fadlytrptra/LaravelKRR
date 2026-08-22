<div
    class="modal fade"
    id="modalCustomer"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true">

    <div class="modal-dialog custom-modal-width">

        <div class="modal-content">

            <div class="modal-header">

                <h5
                    class="modal-title"
                    id="modalLabelCustomer">
                    Tambah
                </h5>

                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close">
                </button>

            </div>

            <div class="modal-body">

                <div class="form-container col-md-12">

                    <form
                        class="permohonan-do-form"
                        method="POST"
                        action="{{ route('Kencana.Customer.store') }}"
                        id="FormCustomer">

                        @csrf

                        <input
                            type="hidden"
                            name="id_pesanan"
                            id="id_pesanan_hidden"
                            value="">

                        <input
                            type="hidden"
                            name="_method"
                            id="methodkoreksi"
                            value="">

                        <input
                            type="hidden"
                            name="typeKegiatanForm"
                            id="typeKegiatanForm"
                            value="tambah">

                        <div
                            id="div_deliveryOrder"
                            class="permohonan-do-form">

                            <div class="acs-form">

                                {{-- =========================
                                     KOLOM 1
                                     ========================= --}}
                                <div class="acs-form1">

                                    <div class="acs-div-filter">
                                        <label for="JnsCust">
                                            Jenis Customer
                                        </label>

                                        <select
                                            name="JnsCust"
                                            id="JnsCust"
                                            class="input">

                                            <option
                                                selected
                                                disabled>
                                                -- Pilih Jenis Customer --
                                            </option>

                                            @foreach ($jnscust as $data)

                                                <option
                                                    value="{{ $data->IDJnsCust }}"
                                                    {{ ($model->JnsCust ?? null) == $data->IDJnsCust ? 'selected' : '' }}>

                                                    {{ $data->IDJnsCust }}
                                                    -
                                                    {{ $data->NamaJnsCust }}

                                                </option>

                                            @endforeach

                                        </select>
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="NamaCust">
                                            Nama Customer
                                        </label>

                                        <input
                                            type="text"
                                            name="NamaCust"
                                            id="NamaCust"
                                            class="input"
                                            value="{{ $model->NamaCust ?? '' }}"
                                            placeholder="Nama Customer">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="KodeCust">
                                            Initial Customer
                                        </label>

                                        <input
                                            type="text"
                                            name="KodeCust"
                                            id="KodeCust"
                                            class="input"
                                            value="{{ $model->KodeCust ?? '' }}"
                                            placeholder="Initial Customer">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="ContactPerson">
                                            Contact Person
                                        </label>

                                        <input
                                            type="text"
                                            name="ContactPerson"
                                            id="ContactPerson"
                                            value="{{ $model->ContactPerson ?? '' }}"
                                            placeholder="Contact Person"
                                            class="input">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="LimitBeli">
                                            Limit Pembelian
                                        </label>

                                        <input
                                            type="text"
                                            name="LimitBeli"
                                            id="LimitBeli"
                                            value="{{ $model->LimitBeli ?? '' }}"
                                            placeholder="Limit Pembelian"
                                            class="input">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="Alamat">
                                            Alamat Kantor
                                        </label>

                                        <textarea
                                            name="Alamat"
                                            id="Alamat"
                                            cols="30"
                                            rows="3"
                                            placeholder="Alamat Kantor">{{ $model->Alamat ?? '' }}</textarea>
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="Kota">
                                            Kota
                                        </label>

                                        <input
                                            type="text"
                                            name="Kota"
                                            id="Kota"
                                            value="{{ $model->Kota ?? '' }}"
                                            placeholder="Kota"
                                            class="input">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="Province">
                                            Provinsi
                                        </label>

                                        <input
                                            type="text"
                                            name="Province"
                                            id="Province"
                                            value="{{ $model->Propinsi ?? '' }}"
                                            placeholder="Provinsi"
                                            class="input">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="Negara">
                                            Negara
                                        </label>

                                        <input
                                            type="text"
                                            name="Negara"
                                            id="Negara"
                                            value="{{ $model->Negara ?? '' }}"
                                            placeholder="Negara"
                                            class="input">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="KodePos">
                                            Kode Pos
                                        </label>

                                        <input
                                            type="text"
                                            name="KodePos"
                                            id="KodePos"
                                            value="{{ $model->KodePos ?? '' }}"
                                            placeholder="Kode Pos"
                                            class="input">
                                    </div>

                                </div>


                                {{-- =========================
                                     KOLOM 2
                                     ========================= --}}
                                <div class="acs-form1">

                                    <div class="acs-div-filter">
                                        <label for="NoTelp1">
                                            No Telpon 1
                                        </label>

                                        <input
                                            type="text"
                                            name="NoTelp1"
                                            id="NoTelp1"
                                            value="{{ $model->NoTelp1 ?? '' }}"
                                            placeholder="No Telpon 1"
                                            class="input">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="NoTelp2">
                                            No Telpon 2
                                        </label>

                                        <input
                                            type="text"
                                            name="NoTelp2"
                                            id="NoTelp2"
                                            value="{{ $model->NoTelp2 ?? '' }}"
                                            placeholder="No Telpon 2"
                                            class="input">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="NoTelex">
                                            No Telex
                                        </label>

                                        <input
                                            type="text"
                                            name="NoTelex"
                                            id="NoTelex"
                                            value="{{ $model->NoTelex ?? '' }}"
                                            placeholder="No Telex"
                                            class="input">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="NoFax1">
                                            No Fax 1
                                        </label>

                                        <input
                                            type="text"
                                            name="NoFax1"
                                            id="NoFax1"
                                            value="{{ $model->NoFax1 ?? '' }}"
                                            placeholder="No Fax 1"
                                            class="input">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="NoFax2">
                                            No Fax 2
                                        </label>

                                        <input
                                            type="text"
                                            name="NoFax2"
                                            id="NoFax2"
                                            value="{{ $model->NoFax2 ?? '' }}"
                                            placeholder="No Fax 2"
                                            class="input">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="NoHp1">
                                            No. HP 1
                                        </label>

                                        <input
                                            type="text"
                                            name="NoHp1"
                                            id="NoHp1"
                                            value="{{ $model->NoHp1 ?? '' }}"
                                            placeholder="No. HP 1"
                                            class="input">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="NoHp2">
                                            No. HP 2
                                        </label>

                                        <input
                                            type="text"
                                            name="NoHp2"
                                            id="NoHp2"
                                            value="{{ $model->NoHp2 ?? '' }}"
                                            placeholder="No. HP 2"
                                            class="input">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="Email">
                                            Email
                                        </label>

                                        <input
                                            type="text"
                                            name="Email"
                                            id="Email"
                                            value="{{ $model->Email ?? '' }}"
                                            placeholder="Email"
                                            class="input">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="AlamatKirim">
                                            Alamat Kirim
                                        </label>

                                        <textarea
                                            name="AlamatKirim"
                                            id="AlamatKirim"
                                            cols="30"
                                            rows="3"
                                            placeholder="Alamat Kirim">{{ $model->AlamatKirim ?? '' }}</textarea>
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="KotaKirim">
                                            Kota Kirim
                                        </label>

                                        <input
                                            type="text"
                                            name="KotaKirim"
                                            id="KotaKirim"
                                            value="{{ $model->KotaKirim ?? '' }}"
                                            placeholder="Kota Kirim"
                                            class="input">
                                    </div>

                                </div>


                                {{-- =========================
                                     KOLOM 3
                                     ========================= --}}
                                <div class="acs-form1">

                                    <div class="acs-div-filter">
                                        <label for="NPWP">
                                            No. NPWP
                                        </label>

                                        <input
                                            type="text"
                                            name="NPWP"
                                            id="NPWP"
                                            value="{{ $model->NPWP ?? '' }}"
                                            placeholder="No. NPWP"
                                            class="input">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="NamaNPWP">
                                            Nama di NPWP
                                        </label>

                                        <input
                                            type="text"
                                            name="NamaNPWP"
                                            id="NamaNPWP"
                                            value="{{ $model->NamaNPWP ?? '' }}"
                                            placeholder="Nama di NPWP"
                                            class="input">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="AlamatNPWP">
                                            Alamat di NPWP
                                        </label>

                                        <textarea
                                            name="AlamatNPWP"
                                            id="AlamatNPWP"
                                            cols="30"
                                            rows="10"
                                            placeholder="Alamat di NPWP">{{ $model->AlamatNPWP ?? '' }}</textarea>
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="NITKU">
                                            NITKU
                                        </label>

                                        <input
                                            type="text"
                                            name="NITKU"
                                            id="NITKU"
                                            value="{{ $model->NITKU ?? '' }}"
                                            placeholder="NITKU"
                                            class="input">
                                    </div>


                                    <div class="acs-div-filter">
                                        <label for="IdPembeliCoretax">
                                            ID Pembeli
                                        </label>

                                        <input
                                            type="text"
                                            name="IdPembeliCoretax"
                                            id="IdPembeliCoretax"
                                            value="{{ $model->IdPembeliCoretax ?? '' }}"
                                            placeholder="ID Pembeli"
                                            class="input">
                                    </div>

                                </div>

                            </div>
                        </div>


                        <div class="acs-div-btn">

                            <button
                                id="submit_btn"
                                type="submit"
                                class="btn btn-primary">

                                <span>Submit</span>

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    </div>
</div>