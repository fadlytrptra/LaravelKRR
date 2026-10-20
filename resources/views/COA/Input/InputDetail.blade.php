@extends('layouts.appCOA')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @elseif (Session::has('error'))
                    <div class="alert alert-danger">
                        {{ Session::get('error') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-header">Input FIBC Detail</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="top">
                            <div class="form-group">
                                <label>Tanggal :</label>
                                <div class="input-group">
                                    <input type="date" class="form-control" id="tanggal">
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Tahun :</label>
                                <input type="text" id="year" name="year" class="form-control">
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-2">
                                    <label>Ref No :</label>
                                    <input type="text" id="No." name="No." class="form-control">
                                </div>
                                <div class="form-group col-md-10" style="margin-top: 24px;">
                                    <div class="input-group">
                                        <input type="text" id="refNo" name="refNo" class="form-control">
                                        <div class="input-group-append">
                                            <button type="button" id="btn_RefNo" class="btn btn-info" >...</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {{-- FIBC Detail --}}
                        <label>FIBC Detail</label>
                        <div class="form-row" id="fibc_detail">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="customer">Customer</label>
                                    <label style="display: none">Nama Customer</label>
                                    <input type="text" class="form-control" id="customer" name="customer">
                                </div>
                                <div class="form-group">
                                    <label for="bag-code">Bag Code</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="bag-code" name="bag-code">
                                        <div class="input-group-append">
                                            <button type="button" id="btn_BagCode" class="btn btn-info">...</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="bag-type">Bag Type</label>
                                    <input type="text" class="form-control" id="bag-type" name="bag-type">
                                </div>
                                <div class="form-group">
                                    <label for="po-no">PO No</label>
                                    <input type="text" class="form-control" id="po-no" name="po-no">
                                </div>
                                <div class="form-group">
                                    <label for="prod-date">Prod. Date</label>
                                    <input type="date" class="form-control" id="prod-date" name="prod-date">
                                </div>
                                <div class="form-group">
                                    <label for="testing-date">Testing Date</label>
                                    <input type="date" class="form-control" id="testing-date" name="testing-date">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="size">Size</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="size" name="size">
                                        <div class="input-group-append">
                                            <span class="input-group-text">cm</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="reinforced">Reinforced</label>
                                    <select class="form-control" id="reinforced" name="reinforced">
                                        <option value="-">-</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="colour">Colour</label>
                                    <input type="text" class="form-control" id="colour" name="colour">
                                </div>

                                <div class="form-group">
                                    <label for="swl">SWL</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="swl" name="swl">
                                        <div class="input-group-append">
                                            <span class="input-group-text">kg</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="sf">S.F.</label>
                                    <input type="text" class="form-control" id="sf" name="sf">
                                </div>
                            </div>

                            {{-- weight --}}
                            <div class="col-md-4 mt-1">
                                <div class="form-group text-center">
                                    <div>
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="radio" name="weight"
                                                id="radioWeight1" value="radioWeight1">
                                            <label class="form-check-label" for="radioWeight1">Weight 1</label>
                                        </div>
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="radio" name="weight"
                                                id="radioWeight2" value="radioWeight2">
                                            <label class="form-check-label" for="radioWeight2">Weight 2</label>
                                        </div>
                                    </div>
                                    <label id="weightLabel" class="text-center mt-2"></label>
                                </div>
                                {{-- Form untuk Weight 1 --}}
                                <div id="formWeight1">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="Panjang">Panjang</label>
                                                <input type="text" class="form-control" id="Panjang"
                                                    name="Panjang">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="Lebar">Lebar</label>
                                                <input type="text" class="form-control" id="Lebar"
                                                    name="Lebar">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="Waft">Waft</label>
                                                <input type="text" class="form-control" id="Waft"
                                                    name="Waft">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="Weft">Weft</label>
                                                <input type="text" class="form-control" id="Weft"
                                                    name="Weft">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="Denier_Waft">Denier Waft</label>
                                                <input type="text" class="form-control" id="Denier_Waft"
                                                    name="Denier_Waft">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="Denier_Weft">Denier Weft</label>
                                                <input type="text" class="form-control" id="Denier_Weft"
                                                    name="Denier_Weft">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="weight1">Weight</label>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="weight1"
                                                        name="weight1" readonly>
                                                    <div class="input-group-append">
                                                        <span class="input-group-text">gsm</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Form untuk Weight 2 (default hidden) -->
                                <div id="formWeight2" style="display: none;">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="Panjang2">Panjang</label>
                                                <input type="text" class="form-control" id="Panjang2"
                                                    name="Panjang2">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="Lebar2">Lebar</label>
                                                <input type="text" class="form-control" id="Lebar2"
                                                    name="Lebar2">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="Waft2">Waft</label>
                                                <input type="text" class="form-control" id="Waft2"
                                                    name="Waft2">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="Weft2">Weft</label>
                                                <input type="text" class="form-control" id="Weft2"
                                                    name="Weft2">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="Denier_Waft2">Denier Waft</label>
                                                <input type="text" class="form-control" id="Denier_Waft2"
                                                    name="Denier_Waft2">
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="Denier_Weft2">Denier Weft</label>
                                                <input type="text" class="form-control" id="Denier_Weft2"
                                                    name="Denier_Weft2">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label for="weight2">Weight</label>
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="weight2"
                                                        name="weight2" readonly>
                                                    <div class="input-group-append">
                                                        <span class="input-group-text">gsm</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {{-- jenis FIBC --}}
                        <div class="form-row mt-1 mb-2 text-center" id="jenis"
                            style="border: 1px solid #ddd; padding: 10px 10px;">
                            <div class="col-md-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="Sample" name="Sample">
                                    <label class="form-check-label" for="Sample">Sample</label>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="Pre-production"
                                        name="Pre-production">
                                    <label class="form-check-label" for="Pre-production">Pre-Production</label>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="Production" name="Production">
                                    <label class="form-check-label" for="Production">Production</label>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="Spec. Modification"
                                        name="Spec. Modification">
                                    <label class="form-check-label" for="Spec. Modification">Spec. Modification</label>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="Trial" name="Trial">
                                    <label class="form-check-label" for="Trial">Trial</label>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="Sample dari Customer"
                                        name="Sample dari Customer">
                                    <label class="form-check-label" for="Sample dari Customer">Sample dari Customer</label>
                                </div>
                            </div>
                        </div>




                        {{-- Bag Detail --}}
                        <label>Bag Detail</label>
                        <div class="form-row" id="bag_detail">
                            <div class="col-md-12">
                                <label for="liftBeltType"><strong>A. Lifting Belt</strong></label>
                                <div class="form-group">
                                    <label>Type :</label>
                                    <input type="text" class="form-control" id="liftBeltType" name="liftBeltType">
                                </div>

                                <label><strong>B. Sewing Thread</strong></label>
                                <div class="form-group">
                                    <label for="sewingThreadType">Type :</label>
                                    <input type="text" class="form-control" id="sewingThreadType"
                                        name="sewingThreadType">
                                </div>

                                {{-- top & bottom --}}
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="row">
                                            <div class="col-12">
                                                <label>Strength / Elo :</label>
                                            </div>
                                            <div class="col-6">
                                                <label>Top</label>
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="topS1"
                                                        name="topS1" placeholder="kg">
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <label>&nbsp;</label>
                                                    <input type="text" class="form-control mb-2" id="topE1"
                                                        name="topE1" placeholder="%">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="topS2"
                                                        name="topS2" placeholder="kg">
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="topE2"
                                                        name="topE2" placeholder="%">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="topS3"
                                                        name="topS3" placeholder="kg">
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="topE3"
                                                        name="topE3" placeholder="%">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="topS4"
                                                        name="topS4" placeholder="kg">
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="topE4"
                                                        name="topE4" placeholder="%">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="topS5"
                                                        name="topS5" placeholder="kg">
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="topE5"
                                                        name="topE5" placeholder="%">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="row">
                                            <div class="col-12">
                                                <label>&nbsp;</label>
                                            </div>
                                            <div class="col-6">
                                                <label>Bottom</label>
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="bottomS1"
                                                        name="bottomS1" placeholder="kg">
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <label>&nbsp;</label>
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="bottomE1"
                                                        name="bottomE1" placeholder="%">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="bottomS2"
                                                        name="bottomS2" placeholder="kg">
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="bottomE2"
                                                        name="bottomE2" placeholder="%">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="bottomS3"
                                                        name="bottomS3" placeholder="kg">
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="bottomE3"
                                                        name="bottomE3" placeholder="%">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="bottomS4"
                                                        name="bottomS4" placeholder="kg">
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="bottomE4"
                                                        name="bottomE4" placeholder="%">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="bottomS5"
                                                        name="bottomS5" placeholder="kg">
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="form-group">
                                                    <input type="text" class="form-control mb-2" id="bottomE5"
                                                        name="bottomE5" placeholder="%">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group" id="sewingMethod">
                                    <label><strong>C. Sewing Method</strong></label>
                                    <div class="ml-3">
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Mitsumaki"
                                                id="Mitsumaki" value="Mitsumaki">
                                            <label class="form-check-label" for="Mitsumaki">Mitsumaki</label>
                                        </div>
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Half Mitsumaki"
                                                id="Half Mitsumaki" value="Hal fMitsumaki">
                                            <label class="form-check-label" for="Half Mitsumaki">Half
                                                Mitsumaki</label>
                                        </div>
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Ogami"
                                                id="Ogami" value="Ogami">
                                            <label class="form-check-label" for="Ogami">Ogami</label>
                                        </div>
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Other"
                                                id="Other" value="Other">
                                            <label class="form-check-label" for="Other">Other</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group" id="stitchApprox">
                                    <label><strong>D. Stitch Approx.</strong></label>
                                    <div class="ml-3">
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Bottom"
                                                id="Bottom" value="Bottom">
                                            <label class="form-check-label" for="Bottom">Bottom</label>
                                        </div>
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Side Body"
                                                id="Side Body" value="Side Body">
                                            <label class="form-check-label" for="Side Body">Side Body</label>
                                        </div>
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Lifting Belt"
                                                id="Lifting Belt" value="Lifting Belt">
                                            <label class="form-check-label" for="Lifting Belt">Lifting Belt</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group" id="fitDraw">
                                    <label><strong>E. Fit to drawing spec.?</strong></label>
                                    <div class="ml-3">
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="Yes"
                                                id="Yes" value="Yes">
                                            <label class="form-check-label" for="Yes">Yes</label>
                                        </div>
                                        <div class="form-check-inline">
                                            <input class="form-check-input" type="checkbox" name="No"
                                                id="No" value="No">
                                            <label class="form-check-label" for="No">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="button" id="btn_isi" class="btn btn-outline-secondary">Isi</button>
                        <button type="button" id="btn_simpan" class="btn btn-outline-secondary">Simpan</button>
                        <button type="button" id="btn_batal" class="btn btn-outline-secondary">Batal</button>
                        <button type="button" id="btn_koreksi" class="btn btn-outline-secondary">Koreksi</button>
                        <button type="button" id="btn_hapus" class="btn btn-outline-secondary">Hapus</button>

                    </div>
                </div>
            </div>
        </div>
    </div>


    <script src="{{ asset('js/COA/Input/InputDetail.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/COA/Input/InputDetail.css') }}">
@endsection
