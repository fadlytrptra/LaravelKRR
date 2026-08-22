@extends('layouts.appSales') @section('content')
    <link href="{{ asset('css/billing.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <div class="col-md-10 RDZMobilePaddingLR0">
        <div class="billing-container">
            <form class="billing-form" method="POST" action="{{ url('Billing') }}">
                {{ csrf_field() }}
                <div class="billing-container01">
                    <div class="billing-container02">
                        <div class="billing-container03"><span>Nama Billing</span></div>
                        <div class="billing-container05"> <span> <span>Contact Person</span> <br /> </span> </div>
                        <div class="billing-container06"> <span> <span>Alamat Kantor</span> <br /> </span> </div>
                        <div class="billing-container07"><span>Kota</span></div>
                        <div class="billing-container08"> <span> <span>Provinsi</span> <br /> </span> </div>
                        <div class="billing-container09"><span>Negara</span></div>
                    </div>
                    <div class="billing-container10">
                        <div class="billing-container11"> <input type="text" name="NamaBill" id="NamaBill" placeholder="Nama Billing"
                                class="billing-textinput input" /> </div>
                        <div class="billing-container13"> <input type="text" name="ContactPerson" id="ContactPerson"
                                placeholder="Contact Person" class="billing-textinput02 input" /> </div>
                        <div class="billing-container14">
                            <div class="billing-container15"> <input type="text" name="Alamat" id="Alamat"
                                    placeholder="Alamat Kantor" class="billing-textinput03 input" /> </div>
                            <div class="billing-container16"> <span class="billing-text15"> <span>Kode Pos</span> <br />
                                </span> <input type="text" name="KodePos" id="KodePos" placeholder="Kode Pos"
                                    class="billing-textinput04 input" />
                            </div>
                        </div>
                        <div class="billing-container17"> <input type="text" name="Kota" id="Kota" placeholder="Kota"
                                class="billing-textinput05 input" /> </div>
                        <div class="billing-container18"> <input type="text" name="Provinsi" id="Provinsi" placeholder="Provinsi"
                                class="billing-textinput06 input" /> </div>
                        <div class="billing-container19"> <input type="text" name="Negara" id="Negara" placeholder="Negara"
                                class="billing-textinput07 input" /> </div>
                    </div>
                </div>
                <div>
                    <hr style="border-top: 1px solid #000000">
                </div>
                <div class="billing-container21">
                    <div class="billing-container22">
                        <div class="billing-container23"><span>No. Telpon 1</span></div>
                        <div class="billing-container24"><span>No. Telpon 2</span></div>
                        <div class="billing-container25"><span>No. Telex</span></div>
                        <div class="billing-container26"><span>No. Fax 1</span></div>
                        <div class="billing-container27"><span>No. Fax 2</span></div>
                        <div class="billing-container28"><span>No. HP 1</span></div>
                        <div class="billing-container29"><span>No. Hp 2</span></div>
                        <div class="billing-container30"> <span> <span>Email</span> <br /> </span> </div>
                    </div>
                    <div class="billing-container31">
                        <div class="billing-container32"> <input type="text" name="NoTelp1" id="NoTelp1" placeholder="No. Telpon 1"
                                class="billing-textinput08 input" /> </div>
                        <div class="billing-container33"> <input type="text" name="NoTelp2" id="NoTelp2" placeholder="No. Telpon 2"
                                class="billing-textinput09 input" /> </div>
                        <div class="billing-container34"> <input type="text" name="NoTelex" id="NoTelex" placeholder="No. Telex"
                                class="billing-textinput10 input" /> </div>
                        <div class="billing-container35"> <input type="text" name="NoFax1" id="NoFax1" placeholder="No. Fax 1"
                                class="billing-textinput11 input" /> </div>
                        <div class="billing-container36"> <input type="text" name="NoFax2" id="NoFax2" placeholder="No. Fax 2"
                                class="billing-textinput12 input" /> </div>
                        <div class="billing-container37"> <input type="text" name="NoHp1" id="NoHp1" placeholder="No. HP 1"
                                class="billing-textinput13 input" /> </div>
                        <div class="billing-container38"> <input type="text" name="NoHp2" id="NoHp2" placeholder="No. HP 2"
                                class="billing-textinput14 input" /> </div>
                        <div class="billing-container39"> <input type="text" name="Email" id="Email" placeholder="Email"
                                class="billing-textinput15 input" /> </div>
                    </div>
                </div>
                <div class="billing-container40">
                    <button type="submit" class="button">Submit</button>
                </div>
            </form>
        </div>
    </div>
    <script type="text/javascript" src="{{ asset('js/Sales/Billing.js') }}"></script>
@endsection
