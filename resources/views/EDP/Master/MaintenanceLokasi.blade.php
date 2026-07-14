@extends('layouts.appEDP')
@section('title', 'Maintenance User Master')
@section('content')
    <script>
        function ShowPassword(inputId, iconId) {
            const input = document.getElementById(inputId);
            const icon = document.getElementById(iconId);

            if (input.type === "password") {
                input.type = "text";
                icon.innerHTML = "visibility";
            } else {
                input.type = "password";
                icon.innerHTML = "visibility_off";
            }
        }
    </script>
    {{-- @include('Utility.Master.EditMaintenanceTeknisi') --}}
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                {{-- <button class="acs-icon-btn acs-add-btn acs-float" data-bs-toggle="modal" data-bs-target="#tambahmodal"
                    id="modaltambahteknisi" type="button">
                    <div class="acs-add-icon"></div>
                    <div class="acs-btn-txt">Tambah Teknisi</div>
                </button> --}}
                <div class="card">
                    <div class="card-header">Maintenance User Master</div>
                    <div class="card-body table-responsive mt-1">
                        <table class="table" id="table-teknisi">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">ID User</th>
                                    <th scope="col">Nomor User</th>
                                    <th scope="col">Nama User</th>
                                    <th scope="col">Lokasi</th>
                                    <th scope="col">Is Online</th>
                                    <th scope="col">Is Admin</th>
                                    <th scope="col">Is Admin PDAM</th>
                                    <th scope="col">Is Admin Foto Barang</th>
                                    <th scope="col">Is Active</th>
                                    <th scope="col">No Telp</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="EditUser">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="judul"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="panel-body">
                    <form class="formEditUser" method="POST" enctype="multipart/form-data" action="">
                        {{ csrf_field() }}
                        <div class="modal-body">
                            <div class="input-group">
                                <div class="input-group-addon RDZtextICON">
                                    <a><span class="material-icons form-control RDZICON">key</span></a>
                                </div>
                                <input id="editPassword" type="password"
                                    class="form-control @error('password') is-invalid @enderror" name="editPassword"
                                    autocomplete="current-password" placeholder="Password">

                                <div class="input-group-addon">
                                    <a><span class="material-icons form-control RDZIconPassword"
                                            onclick="ShowPassword('editPassword','showpassword')"
                                            id="showpassword">visibility_off</span></a>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-sm btn-primary" name="submit">Edit</button>
                            <button type="button" class="btn btn-sm btn-default" data-dismiss="modal">Tutup</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="editmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <input type="hidden" id="hiddenIdTeknisi">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row-lg-12 mb-2">
                        <div class="col-lg-12 d-flex">
                            <label for="teknisi">User</label>
                        </div>
                        <div class="col-lg-12 d-flex">
                            <input type="text" class="form-control text-center" id="userEdit" name="userEdit" readonly>
                        </div>
                    </div>
                    <div class="row-lg-12 mb-2">
                        <div class="col-lg-12 d-flex">
                            <label for="lokasi" style="font-weight: bold;">Lokasi</label>
                        </div>
                        <div class="col-lg-12 d-flex flex-column">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="lokasiTropodo" value="TPD">
                                <label class="form-check-label" for="lokasiTropodo">
                                    Tropodo
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="lokasiMojosari" value="MJS">
                                <label class="form-check-label" for="lokasiMojosari">
                                    Mojosari
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="lokasiMlorah" value="MLH">
                                <label class="form-check-label" for="lokasiMlorah">
                                    Mlorah
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="lokasiJekek" value="JKK">
                                <label class="form-check-label" for="lokasiJekek">
                                    Jekek
                                </label>
                            </div>

                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="lokasiJombang" value="JMB">
                                <label class="form-check-label" for="lokasiJombang">
                                    Jombang
                                </label>
                            </div>
                        </div>
                        <br>
                        <div class="col-lg-12 d-flex">
                            <label for="lokasi" style="font-weight: bold;">Is Online</label>
                        </div>
                        <div class="col-lg-12 d-flex flex-column">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="isOnline" value="1">
                                <label class="form-check-label" for="isOnline">
                                    Is Online
                                </label>
                            </div>
                        </div>
                        <br>
                        <div class="col-lg-12 d-flex">
                            <label for="lokasi" style="font-weight: bold;">Is Admin</label>
                        </div>
                        <div class="col-lg-12 d-flex flex-column">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="isAdmin" value="1">
                                <label class="form-check-label" for="isAdmin">
                                    Is Admin
                                </label>
                            </div>
                        </div>
                        <br>
                        <div class="col-lg-12 d-flex">
                            <label for="isAdminPDAM" style="font-weight: bold;">Is Admin PDAM</label>
                        </div>
                        <div class="col-lg-12 d-flex flex-column">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="isAdminPDAM" value="1">
                                <label class="form-check-label" for="isAdminPDAM">
                                    Is Admin PDAM
                                </label>
                            </div>
                        </div>
                        <br>
                         <div class="col-lg-12 d-flex">
                            <label for="isAdminFotoBarang" style="font-weight: bold;">Is Admin Foto Barang</label>
                        </div>
                        <div class="col-lg-12 d-flex flex-column">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="isAdminFotoBarang" value="1">
                                <label class="form-check-label" for="isAdminFotoBarang">
                                    Is Admin Foto Barang
                                </label>
                            </div>
                        </div>
                        <br>
                        <div class="col-lg-12 d-flex">
                            <label for="lokasi" style="font-weight: bold;">Is Active</label>
                        </div>
                        <div class="col-lg-12 d-flex flex-column">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="isActive" value="1">
                                <label class="form-check-label" for="isActive">
                                    Is Active
                                </label>
                            </div>
                        </div>
                        <br>
                        <div class="col-lg-12 d-flex">
                            <label for="nomor" style="font-weight: bold;">Nomor Telp</label>
                        </div>

                        <div class="col-lg-12">
                            <div class="input-group">
                                <select class="form-select" id="kodeNegara" name="kodeNegara" style="max-width: 120px;">
                                    <option value="62" selected>Indonesia (62)</option>
                                    <option value="60">Malaysia (60)</option>
                                    <option value="65">Singapore (65)</option>
                                    <option value="66">Thailand (66)</option>
                                    <option value="84">Vietnam (84)</option>
                                    <option value="63">Philippines (63)</option>
                                    <option value="673">Brunei (673)</option>
                                    <option value="1">United States (1)</option>
                                    <option value="44">United Kingdom (44)</option>
                                    <option value="81">Japan (81)</option>
                                    <option value="82">South Korea (82)</option>
                                    <option value="86">China (86)</option>
                                    <option value="91">India (91)</option>
                                    <option value="61">Australia (61)</option>
                                </select>

                                <input type="text" class="form-control" id="nomor" name="nomor"
                                    placeholder="Contoh: 81234567890">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-end">
                        <button type="button" class="btn btn-success" id="updateButtonTeknisi">Simpan</button>
                        <button type="button text-end" class="btn btn-secondary" data-dismiss="modal">Keluar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/EDP/MaintenanceLokasi.js') }}"></script>
@endsection
