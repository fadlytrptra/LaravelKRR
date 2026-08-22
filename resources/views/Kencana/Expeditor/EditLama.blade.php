@extends('layouts.appSales') @section('content')
    <link href="{{ asset('css/expeditor.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="expeditor-container">
            <form class="expeditor-form" method="POST" action="{{ route('expeditor.update', $model->IDExpeditor) }}"
                enctype="multipart/form-data">
                {{ csrf_field() }}
                <div class="expeditor-container01">
                    <div class="expeditor-container02">
                        <div class="expeditor-container03"> <span>Nama Expeditor</span> </div>
                        <div class="expeditor-container04"> <span> <span>Kode Expeditor</span> <br /> </span> </div>
                        <div class="expeditor-container05"> <span> <span>Contact Person</span> <br /> </span> </div>
                        <div class="expeditor-container06"> <span> <span>Alamat Kantor</span> <br /> </span> </div>
                        <div class="expeditor-container07"><span>Kota</span></div>
                        <div class="expeditor-container08"> <span> <span>Provinsi</span> <br /> </span> </div>
                        <div class="expeditor-container09"><span>Negara</span></div>
                    </div>
                    <div class="expeditor-container10">
                        <div class="expeditor-container11"> <input type="text" value="{{ $model->NamaExpeditor }}"
                                name="NamaExpeditor" placeholder="Nama Expeditor" class="expeditor-textinput input" /></div>
                        <div class="expeditor-container13"> <input type="text" value="{{ $model->ContactPerson }}"
                                name="ContactPerson" placeholder="Contact Person" class="expeditor-textinput02 input" />
                        </div>
                        <div class="expeditor-container14">
                            <div class="expeditor-container15"> <input type="text" value="{{ $model->Alamat }}"
                                    name="Alamat" placeholder="Alamat Kantor" class="expeditor-textinput03 input" /> </div>
                            <div class="expeditor-container16"> <span class="expeditor-text15"> <span>Kode Pos</span> <br />
                                </span> <input type="text" value="{{ $model->KodePos }}" name="KodePos"
                                    placeholder="Kode Pos" class="expeditor-textinput04 input" /> </div>
                        </div>
                        <div class="expeditor-container17"> <input type="text" value="{{ $model->Kota }}" name="Kota"
                                placeholder="Kota" class="expeditor-textinput05 input" /> </div>
                        <div class="expeditor-container18"> <input type="text" value="{{ $model->Propinsi }}"
                                name="Propinsi" placeholder="Provinsi" class="expeditor-textinput06 input" /> </div>
                        <div class="expeditor-container19"> <input type="text" value="{{ $model->Negara }}"
                                name="Negara" placeholder="Negara" class="expeditor-textinput07 input" /> </div>
                    </div>
                </div>
                <div class="expeditor-container20"></div>
                <div class="expeditor-container21">
                    <div class="expeditor-container22">
                        <div class="expeditor-container23"><span>No. Telpon 1</span></div>
                        <div class="expeditor-container24"><span>No. Telpon 2</span></div>
                        <div class="expeditor-container25"><span>No. Telex</span></div>
                        <div class="expeditor-container26"><span>No. Fax 1</span></div>
                        <div class="expeditor-container27"><span>No. Fax 2</span></div>
                        <div class="expeditor-container28"><span>No. HP 1</span></div>
                        <div class="expeditor-container29"><span>No. Hp 2</span></div>
                        <div class="expeditor-container30"> <span> <span>Email</span> <br /> </span> </div>
                    </div>
                    <div class="expeditor-container31">
                        <div class="expeditor-container32"> <input type="text" value="{{ $model->NoTelp1 }}"
                                name="NoTelp1" placeholder="No. Telpon 1" class="expeditor-textinput08 input" /> </div>
                        <div class="expeditor-container33"> <input type="text" value="{{ $model->NoTelp2 }}"
                                name="NoTelp2" placeholder="No. Telpon 2" class="expeditor-textinput09 input" /> </div>
                        <div class="expeditor-container34"> <input type="text" value="{{ $model->NoTelex }}"
                                name="NoTelex" placeholder="No. Telex" class="expeditor-textinput10 input" /> </div>
                        <div class="expeditor-container35"> <input type="text" value="{{ $model->NoFax1 }}"
                                name="NoFax1" placeholder="No. Fax 1" class="expeditor-textinput11 input" /> </div>
                        <div class="expeditor-container36"> <input type="text" value="{{ $model->NoFax2 }}"
                                name="NoFax2" placeholder="No. Fax 2" class="expeditor-textinput12 input" /> </div>
                        <div class="expeditor-container37"> <input type="text"
                                value="{{ $model->NoHp1 }}"name="NoHp1" placeholder="No. HP 1"
                                class="expeditor-textinput13 input" /> </div>
                        <div class="expeditor-container38"> <input type="text"
                                value="{{ $model->NoHp2 }}"name="NoHp2" placeholder="No. HP 2"
                                class="expeditor-textinput14 input" /> </div>
                        <div class="expeditor-container39"> <input type="text"
                                value="{{ $model->Email }}"name="Email" placeholder="Email"
                                class="expeditor-textinput15 input" /> </div>
                    </div>
                </div>
                <div class="expeditor-container40"> <button type="submit" class="button">Submit</button></div>
            </form>
        </div>
    </div>
@endsection
