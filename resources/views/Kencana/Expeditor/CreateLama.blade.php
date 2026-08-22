@extends('layouts.appSales') @section('content')
    <link href="{{ asset('css/expeditor.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="expeditor-container">
            <form class="expeditor-form" method="POST" action="{{ url('Expeditor') }}">
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
                        <div class="expeditor-container11"> <input type="text" name="NamaExpeditor" id="NamaExpeditor"
                                placeholder="Nama Expeditor" class="expeditor-textinput input" /></div>
                        <div class="expeditor-container13"> <input type="text" name="ContactPerson" id="ContactPerson"
                                placeholder="Contact Person" class="expeditor-textinput02 input" /> </div>
                        <div class="expeditor-container14">
                            <div class="expeditor-container15"> <input type="text" name="Alamat" id="Alamat"
                                    placeholder="Alamat Kantor" class="expeditor-textinput03 input" /> </div>
                            <div class="expeditor-container16"> <span class="expeditor-text15"> <span>Kode Pos</span> <br />
                                </span> <input type="text" name="KodePos" id="KodePos" placeholder="Kode Pos"
                                    class="expeditor-textinput04 input" /> </div>
                        </div>
                        <div class="expeditor-container17"> <input type="text" name="Kota" placeholder="Kota"
                                id="Kota" class="expeditor-textinput05 input" /> </div>
                        <div class="expeditor-container18"> <input type="text" name="Propinsi" placeholder="Provinsi"
                                id="Propinsi" class="expeditor-textinput06 input" /> </div>
                        <div class="expeditor-container19"> <input type="text" name="Negara" placeholder="Negara"
                                id="Negara" class="expeditor-textinput07 input" /> </div>
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
                        <div class="expeditor-container32"> <input type="text" name="NoTelp1" placeholder="No. Telpon 1"
                                id="NoTelp1" class="expeditor-textinput08 input" /> </div>
                        <div class="expeditor-container33"> <input type="text" name="NoTelp2" placeholder="No. Telpon 2"
                                id="NoTelp2" class="expeditor-textinput09 input" /> </div>
                        <div class="expeditor-container34"> <input type="text" name="NoTelex" placeholder="No. Telex"
                                id="NoTelex" class="expeditor-textinput10 input" /> </div>
                        <div class="expeditor-container35"> <input type="text" name="NoFax1" placeholder="No. Fax 1"
                                id="NoFax1" class="expeditor-textinput11 input" /> </div>
                        <div class="expeditor-container36"> <input type="text" name="NoFax2" placeholder="No. Fax 2"
                                id="NoFax2" class="expeditor-textinput12 input" /> </div>
                        <div class="expeditor-container37"> <input type="text" name="NoHp1" placeholder="No. HP 1"
                                id="NoHp1" class="expeditor-textinput13 input" /> </div>
                        <div class="expeditor-container38"> <input type="text" name="NoHp2" placeholder="No. HP 2"
                                id="NoHp2" class="expeditor-textinput14 input" /> </div>
                        <div class="expeditor-container39"> <input type="text" name="Email" placeholder="Email"
                                id="Email" class="expeditor-textinput15 input" /> </div>
                    </div>
                </div>
                <div class="expeditor-container40"> <button type="submit" class="button">Submit</button></div>
            </form>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Sales/Expeditor.js') }}"></script>
@endsection
