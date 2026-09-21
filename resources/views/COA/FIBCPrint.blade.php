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
                    <div class="card-header">FIBC Print</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="acs-div-container">
                            <div class="acs-div-container1">
                                <div class="form-row">
                                    <div class="form-group col-8">
                                        <label for="refNo">Tahun:</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="tahun" readonly>
                                            <div class="input-group-append">
                                                <button type="button" id="btn_tahun" class="btn btn-info">...</button>
                                            </div>
                                        </div>

                                        <label for="refNo">Reference No:</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="refNo" name="refNo"
                                                readonly>
                                            <div class="input-group-append">
                                                <button type="button" id="btn_info" class="btn btn-info">...</button>
                                            </div>
                                        </div>

                                        <label for="customer">Customer:</label>
                                        <input type="text" class="form-control" id="customer" name="customer" readonly>
                                    </div>
                                    <div class="form-group col-4 d-flex align-items-center justify-content-center">
                                        <div class="text-center">
                                            <button type="button" id="btn_detail" class="btn btn-primary"
                                                style="width: 150px;" disabled>Detail</button>
                                        </div>
                                    </div>

                                    <div class="row mb-3">
                                        <div class="col-sm-2">
                                            <button id="printPdf" class="btn btn-primary" disabled>Print</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="container preview">
                                    <div class="row">
                                        <div class="col-sm-6 d-flex align-items-center justify-content-center bordered">
                                            <div>
                                                <h3 style="margin: 0" class="text-center"><strong>PT. KERTA RAJASA
                                                        RAYA</strong>
                                                </h3>
                                                <div class="text-center"> Woven Bag - Jumbo Bag Industrial<br>
                                                    FM-8.2-04-QC-01-11</div>

                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="row bordered">
                                                <div class="col-3">Reference No.</div>
                                                <div class="col-1">:</div>
                                                <div class="col-8">
                                                    <span id="refNumPreview">Ref no</span>
                                                </div>
                                            </div>
                                            <div class="row bordered">
                                                <div class="col-3">Rev No. :</div>
                                                <div class="col-1">:</div>
                                                <div class="col-8">
                                                    <span id="revNoPreview"></span>
                                                </div>
                                            </div>
                                            <div class="row bordered">
                                                <div class="col-3">Date:</div>
                                                <div class="col-1">:</div>
                                                <div class="col-8">
                                                    <span id="datePreview">Date</span>
                                                </div>
                                            </div>
                                            <div class="row bordered">
                                                <div class="col-3">Page:</div>
                                                <div class="col-1">:</div>
                                                <div class="col-8">
                                                    <span id="pagePreview">1</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-sm-6 d-flex align-items-center justify-content-center bordered">
                                            <h4 style="margin: 0"><strong>FIBC TEST REPORT</strong></h4>
                                        </div>
                                        <div class="col-sm-6 d-flex align-items-center justify-content-center bordered">
                                            <h4 style="margin: 0"><strong>FORMAT</strong></h4>
                                        </div>
                                    </div>

                                    <div class="row mt-1 bordered">
                                        <div class="col-sm-12 d-flex align-items-center justify-content-center bordered"
                                            style="background-color: lightgoldenrodyellow">
                                            <h5 style="margin: 0"><strong>FIBC DETAIL</strong></h5>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <!-- First Column -->
                                        <div class="col-sm-6 bordered">
                                            <div class="row">
                                                <div class="col-3">Customer</div>:
                                                <div class="col-8">
                                                    <span id="customerName">Customer Name</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3">Bag Code</div>:
                                                <div class="col-8">
                                                    <span id="bagCode">Bag Code Value</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3">Bag Type</div>:
                                                <div class="col-8">
                                                    <span id="bagType">Bag Type Value</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3">Po. No.</div>:
                                                <div class="col-8">
                                                    <span id="poNo">PO Number</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3">Prod. Date</div>:
                                                <div class="col-8">
                                                    <span id="prodDate">Production Date</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3">Testing Date</div>:
                                                <div class="col-8">
                                                    <span id="testingDate">Testing Date</span>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Second Column -->
                                        <div class="col-sm-6 bordered">
                                            <div class="row">
                                                <div class="col-3">Size</div>:
                                                <div class="col-8">
                                                    <span id="size">Size Value</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3">Reinforced</div>:
                                                <div class="col-8">
                                                    <span id="reinforced">Reinforced Value</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3">Colour</div>:
                                                <div class="col-8">
                                                    <span id="colour">Colour Value</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3">Weight 1</div>:
                                                <div class="col-8">
                                                    <span id="weight1">Weight 1 Value</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3">Weight 2</div>:
                                                <div class="col-8">
                                                    <span id="weight2">Weight 2 Value</span>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-3">SWL / S.F.</div>:
                                                <div class="col-8">
                                                    <span id="swlSf">SWL / S.F. Value</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {{--  --}}
                                    {{--  --}}
                                    {{--  --}}
                                    {{-- preview biasa --}}
                                    <div class="previewBiasa">
                                        <div class="row mt-1 bordered">
                                            <div class="col-sm-4">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="sample"
                                                        disabled>
                                                    <label class="form-check-label" for="sample">Sample</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="production"
                                                        disabled>
                                                    <label class="form-check-label" for="production">Production</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="trial"
                                                        disabled>
                                                    <label class="form-check-label" for="trial">Trial</label>
                                                </div>
                                            </div>
                                            <!-- Second row of checkboxes -->
                                            <div class="col-sm-4">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="preProduction"
                                                        disabled>
                                                    <label class="form-check-label"
                                                        for="preProduction">Pre-production</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox" id="specModification"
                                                        disabled>
                                                    <label class="form-check-label" for="specModification">Spec.
                                                        Modification</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-4">
                                                <div class="form-check">
                                                    <input class="form-check-input" type="checkbox"
                                                        id="sampleFromCustomer" disabled>
                                                    <label class="form-check-label" for="sampleFromCustomer">Sample
                                                        dari
                                                        Customer</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mt-1 bordered">
                                            <div class="col-sm-12 d-flex align-items-center justify-content-center bordered"
                                                style="background-color: lightgoldenrodyellow">
                                                <h5 style="margin: 0"><strong>TEST RESULT</strong></h5>
                                            </div>
                                        </div>

                                        <div class=" row bordered">
                                            <div class="col-md-12">


                                                {{-- CYCLIC TEST --}}
                                                <div class="row m-0 mt-1">
                                                    <!-- First row of checkboxes -->
                                                    <div class="col-sm-2 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="cyclicTestCyclic" disabled>
                                                            <label class="form-check-label"
                                                                for="cyclicTest"><strong>Cyclic
                                                                    Test</strong></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">Lift At:</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="singleLoopsCyclic" disabled>
                                                            <label class="form-check-label" for="singleLoopsCyclic">Single
                                                                Loops</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="fourLoopsCyclic" disabled>
                                                            <label class="form-check-label" for="fourLoopsCyclic">Four
                                                                Loops</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="twoLoopsCyclic" disabled>
                                                            <label class="form-check-label" for="twoLoopsCyclic">Two
                                                                Loops</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="stevedoreCyclic" disabled>
                                                            <label class="form-check-label"
                                                                for="stevedoreCyclic">Stevedore</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="auxiliaryCyclic" disabled>
                                                            <label class="form-check-label"
                                                                for="auxiliaryCyclic">Auxiliary</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row m-0">
                                                    <!-- Second row -->
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check">
                                                            <label class="form-check-label">Result</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div
                                                            class="form-check d-flex align-items-center justify-content-center">
                                                            <label class="form-check-label">:</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="noVisibleDamageCyclic" disabled>
                                                            <label class="form-check-label" for="noVisibleDamageCyclic">No
                                                                visible
                                                                damage
                                                                occurred</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                {{-- <div class="row m-0">
                                                    <!-- Third row -->
                                                    <div class="col-sm-3 offset-sm-2 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="visibleDamagesCyclic" disabled>
                                                            <label class="form-check-label"
                                                                for="visibleDamagesCyclic">Visible
                                                                damages
                                                                found
                                                                at</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6 p-0">
                                                        <input type="text" class="form-control" disabled
                                                            id="visibleDamageCyclicInput">
                                                    </div>
                                                </div> --}}

                                                <div class="row m-0">
                                                    <!-- Second row -->
                                                   <div class="col-sm-8 offset-sm-3 p-0 d-flex align-items-center">
                                                        <div class="form-check mb-0">
                                                            <input class="form-check-input"
                                                                type="checkbox"
                                                                id="visibleDamagesCyclic"
                                                                disabled>

                                                            <label class="form-check-label"
                                                                for="visibleDamagesCyclic">
                                                                Visible damages found at
                                                            </label>
                                                        </div>
                                                        <span id="visibleDamageCyclicInput" class="ms-2"></span>
                                                    </div>
                                                </div>


                                                {{-- TOP LIFT --}}
                                                <div class="row m-0 mt-1">
                                                    <!-- First row of checkboxes -->
                                                    <div class="col-sm-2 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="topLiftTest" disabled>
                                                            <label class="form-check-label" for="topLiftTest"><strong>Top
                                                                    Lift
                                                                    Test</strong></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">Lift At:</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="singleLoopsTop" disabled>
                                                            <label class="form-check-label" for="singleLoopsTop">Single
                                                                Loops</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="fourLoopsTop" disabled>
                                                            <label class="form-check-label" for="fourLoopsTop">Four
                                                                Loops</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="twoLoopsTop" disabled>
                                                            <label class="form-check-label" for="twoLoopsTop">Two
                                                                Loops</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="stevedoreTop" disabled>
                                                            <label class="form-check-label"
                                                                for="stevedoreTop">Stevedore</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="auxiliaryTop" disabled>
                                                            <label class="form-check-label"
                                                                for="auxiliaryTop">Auxiliary</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row m-0">
                                                    <!-- Second row -->
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check">
                                                            <label class="form-check-label">Result</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div
                                                            class="form-check d-flex align-items-center justify-content-center">
                                                            <label class="form-check-label">:</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <span id="angkaBerat"><strong>berat value</strong></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row m-0">
                                                    <!-- Third row -->
                                                    <div class="col-sm-2 p-0">
                                                        <div class="form-check">
                                                            <label class="form-check-label">Breakage
                                                                Location&nbsp;&nbsp;&nbsp;:</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-3 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="bodyFabric" disabled>
                                                            <label class="form-check-label" for="bodyFabric">Body
                                                                Fabric</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-3 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="petal" disabled>
                                                            <label class="form-check-label" for="petal">Petal</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-3 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="sideBodyThread" disabled>
                                                            <label class="form-check-label" for="sideBodyThread">Side
                                                                body's
                                                                thread</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row m-0">
                                                    <!-- Fourth row -->
                                                    <div class="col-sm-3 p-0 offset-sm-2">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="bottomFabric" disabled>
                                                            <label class="form-check-label" for="bottomFabric">Bottom
                                                                Fabric</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-3 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="liftingBelt" disabled>
                                                            <label class="form-check-label" for="liftingBelt">Lifting
                                                                Belt</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-3 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="bottomBodyThread" disabled>
                                                            <label class="form-check-label" for="bottomBodyThread">Bottom
                                                                body's
                                                                thread</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row m-0">
                                                    <!-- Fifth row -->
                                                    <div class="col-sm-3 p-0 offset-sm-2">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="starcutBottomSprout" disabled>
                                                            <label class="form-check-label"
                                                                for="starcutBottomSprout">Starcut of
                                                                bottom
                                                                sprout</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-3 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="liftingBeltThread" disabled>
                                                            <label class="form-check-label"
                                                                for="liftingBeltThread">Lifting belt's
                                                                thread</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-3 p-0 d-flex align-items-center">
                                                        <div class="form-check mb-0">
                                                            <input class="form-check-input"
                                                                type="checkbox"
                                                                id="others"
                                                                disabled>

                                                            <label class="form-check-label"
                                                                for="others">
                                                                Others:
                                                            </label>
                                                        </div>

                                                        <span id="topLiftOthers" class="ms-2"></span>

                                                    </div>
                                                </div>


                                                {{-- CHART --}}
                                                <div class="row">
                                                    <div class="col-sm-10 offset-sm-1">
                                                        <br>
                                                        <canvas class='bordered align-items-center justify-content-center'
                                                            id="dataChart"></canvas>
                                                    </div>
                                                </div>

                                                {{-- DROP TEST 80CM --}}
                                                <div class="row m-0 mt-1">
                                                    <!-- First row of checkboxes -->
                                                    <div class="col-sm-2 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="dropTest" disabled>
                                                            <label class="form-check-label" for="dropTest"><strong>Drop
                                                                    Test
                                                                    (80 cm)</strong></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">Result</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4 p-0">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="noVisibleDamageDrop" disabled>
                                                            <label class="form-check-label" for="noVisibleDamageDrop">No
                                                                visible
                                                                damage
                                                                occurred</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row m-0">
                                                    <!-- Second row -->
                                                   <div class="col-sm-8 offset-sm-3 p-0 d-flex align-items-center">
                                                        <div class="form-check mb-0">
                                                            <input class="form-check-input"
                                                                type="checkbox"
                                                                id="visibleDamageDrop"
                                                                disabled>

                                                            <label class="form-check-label"
                                                                for="visibleDamageDrop">
                                                                Visible damages found at
                                                            </label>
                                                        </div>
                                                        <span id="visibleDamageDropInput" class="ms-2"></span>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>

                                        <div class="row bordered">
                                            <div class="col-md-12">

                                                <div class="row mt-2 bordered">
                                                    <div class="col-sm-12 d-flex align-items-center justify-content-center bordered"
                                                        style="background-color: lightgoldenrodyellow">
                                                        <h5 style="margin: 0"><strong>PICTURE OF BREAKAGE</strong></h5>
                                                    </div>
                                                </div>

                                                <div class="row bordered empatGambar">
                                                    <div
                                                        class="col-sm-3 d-flex align-items-center justify-content-center bordered">
                                                        <h6 style="margin: 0"><strong>Before Test</strong></h6>
                                                    </div>
                                                    <div
                                                        class="col-sm-3 d-flex align-items-center justify-content-center bordered">
                                                        <h6 style="margin: 0"><strong>After Cyclic Test</strong></h6>
                                                    </div>
                                                    <div
                                                        class="col-sm-3 d-flex align-items-center justify-content-center bordered">
                                                        <h6 style="margin: 0"><strong>After Top Lift Test</strong></h6>
                                                    </div>
                                                    <div
                                                        class="col-sm-3 d-flex align-items-center justify-content-center bordered">
                                                        <h6 style="margin: 0"><strong>Test Result Display</strong></h6>
                                                    </div>
                                                </div>
                                                <div class="row bordered empatGambar">
                                                    <div class="col-sm-3 p-0 d-flex align-items-center justify-content-center bordered"
                                                        style="width: 225px; height: 175px;">
                                                        <img id="beforeTest" alt="Test Result 1"
                                                            style="width: 100%; height: 100%;">
                                                    </div>
                                                    <div class="col-sm-3 p-0 d-flex align-items-center justify-content-center bordered"
                                                        style="width: 225px; height: 175px;">
                                                        <img id="afterCyclic" alt="Test Result 2"
                                                            style="width: 100%; height: 100%;">
                                                    </div>
                                                    <div class="col-sm-3 p-0 d-flex align-items-center justify-content-center bordered"
                                                        style="width: 225px; height: 175px;">
                                                        <img id="afterTop" alt="Test Result 3"
                                                            style="width: 100%; height: 100%;">
                                                    </div>
                                                    <div class="col-sm-3 p-0 d-flex align-items-center justify-content-center bordered"
                                                        style="width: 225px; height: 175px;">
                                                        <img id="testResult" alt="Test Result 4"
                                                            style="width: 100%; height: 100%;">
                                                    </div>
                                                </div>

                                                <div class="row bordered tigaGambar">
                                                    <div
                                                        class="col-sm-4 d-flex align-items-center justify-content-center bordered">
                                                        <h6 style="margin: 0"><strong>Before Test</strong></h6>
                                                    </div>
                                                    <div
                                                        class="col-sm-4 d-flex align-items-center justify-content-center bordered">
                                                        <h6 style="margin: 0"><strong>After Top Lift Test</strong></h6>
                                                    </div>
                                                    <div
                                                        class="col-sm-4 d-flex align-items-center justify-content-center bordered">
                                                        <h6 style="margin: 0"><strong>Test Result Display</strong></h6>
                                                    </div>
                                                </div>
                                                <div class="row bordered tigaGambar">
                                                    <div class="col-sm-4 d-flex align-items-center justify-content-center bordered"
                                                        style="width: 225px; height: 175px;">
                                                        <img id="beforeTest3" alt="Test Result 1"
                                                            style="max-width: 100%; max-height: 100%;">
                                                    </div>
                                                    <div class="col-sm-4 d-flex align-items-center justify-content-center bordered"
                                                        style="width: 225px; height: 175px;">
                                                        <img id="afterCyclic3" alt="Test Result 3"
                                                            style="max-width: 100%; max-height: 100%;">
                                                    </div>
                                                    <div class="col-sm-4 d-flex align-items-center justify-content-center bordered"
                                                        style="width: 225px; height: 175px;">
                                                        <img id="afterTop3" alt="Test Result 4"
                                                            style="max-width: 100%; max-height: 100%;">
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div class="row mt-2 passed">
                                            <div class="col-sm-12 d-flex align-items-center justify-content-center bordered"
                                                style="background-color: lightgoldenrodyellow">
                                                <h5 style="margin: 0"><strong>TEST RESULT</strong></h5>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="row bordered">
                                                    <div class="col-sm-5 d-flex align-items-center justify-content-center "
                                                        style="height: 100px;">
                                                        <span id="comments"
                                                            class="circle-border h3"><strong>Pass</strong></span>

                                                    </div>
                                                    <div class="col-sm-1 d-flex align-items-center justify-content-center "
                                                        style="height: 100px;">
                                                        <span id="comments" class="h3"><strong>/</strong></span>
                                                    </div>
                                                    <div class="col-sm-5 d-flex align-items-center justify-content-center"
                                                        style="height: 100px;">
                                                        <span id="comments" class="h3"><strong>Fail</strong></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mt-2 failed">
                                            <div class="col-sm-12 d-flex align-items-center justify-content-center bordered"
                                                style="background-color: lightgoldenrodyellow">
                                                <h5 style="margin: 0"><strong>TEST RESULT</strong></h5>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="row bordered">
                                                    <div class="col-sm-5 d-flex align-items-center justify-content-center "
                                                        style="height: 100px;">
                                                        <span id="comments" class="h3"><strong>Pass</strong></span>

                                                    </div>
                                                    <div class="col-sm-1 d-flex align-items-center justify-content-center "
                                                        style="height: 100px;">
                                                        <span id="comments" class="h3"><strong>/</strong></span>
                                                    </div>
                                                    <div class="col-sm-5 d-flex align-items-center justify-content-center"
                                                        style="height: 100px;">
                                                        <span id="comments"
                                                            class="circle-border h3"><strong>Fail</strong></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {{-- close preview biasa --}}
                                    {{--  --}}
                                    {{--  --}}
                                    {{--  --}}

                                    {{-- ------------------------------------------------------------------------------------ --}}

                                    {{--  --}}
                                    {{--  --}}
                                    {{--  --}}
                                    {{-- preview detail --}}

                                    <div class="previewDetail">
                                        <div class="row mt-1">
                                            <div class="col-sm-12 d-flex align-items-center justify-content-center bordered"
                                                style="background-color: lightgoldenrodyellow">
                                                <h5 style="margin: 0"><strong>Bag Detail</strong></h5>
                                            </div>
                                        </div>

                                        <div class="row bordered">
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-sm-2">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label"><strong>A. Lifting
                                                                    Belt</strong></label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-sm-2 offset-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">Type</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-5 p-0">
                                                        <div class="form-check p-0">
                                                            <span id='liftingBeltType'class="form-check-label"></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row mt-2">
                                                    <div class="col-sm-2">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label"><strong>B. Sewing
                                                                    Thread</strong></label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-sm-2 offset-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">Type</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-5 p-0">
                                                        <div class="form-check p-0">
                                                            <span id='sewingThreadType'class="form-check-label"></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row mt-2">
                                                    <div class="col-sm-2 offset-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">Strength / Elo</label>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">: Top</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <span id='topKg1' class="form-check-label">--</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">/</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <span id='topPersen1' class="form-check-label">--</span>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-1">
                                                        <div class="form-check">
                                                            <label class="form-check-label">Bottom</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0 offset-sm-1">
                                                        <div class="form-check p-0">
                                                            <span id='bottomKg1' class="form-check-label">--</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">/</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <span id='bottomPersen1' class="form-check-label">--</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-sm-1 p-0 offset-sm-4">
                                                        <div class="form-check p-0">
                                                            <span id="topKg2" class="form-check-label">--</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">/</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <span id="topPersen2" class="form-check-label">--</span>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-1 p-0 offset-sm-2">
                                                        <div class="form-check p-0">
                                                            <span id="bottomKg2" class="form-check-label">--</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">/</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <span id="bottomPersen2" class="form-check-label">--</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-sm-1 p-0 offset-sm-4">
                                                        <div class="form-check p-0">
                                                            <span id="topKg3" class="form-check-label">--</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">/</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <span id="topPersen3" class="form-check-label">--</span>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-1 p-0 offset-sm-2">
                                                        <div class="form-check p-0">
                                                            <span id="bottomKg3" class="form-check-label">--</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">/</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <span id="bottomPersen3" class="form-check-label">--</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-sm-1 p-0 offset-sm-4">
                                                        <div class="form-check p-0">
                                                            <span id="topKg4" class="form-check-label">--</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">/</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <span id="topPersen4" class="form-check-label">--</span>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-1 p-0 offset-sm-2">
                                                        <div class="form-check p-0">
                                                            <span id="bottomKg4" class="form-check-label">--</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">/</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <span id="bottomPersen4" class="form-check-label">--</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-sm-1 p-0 offset-sm-4">
                                                        <div class="form-check p-0">
                                                            <span id="topKg5" class="form-check-label">--</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">/</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <span id="topPersen5" class="form-check-label">--</span>
                                                        </div>
                                                    </div>

                                                    <div class="col-sm-1 p-0 offset-sm-2">
                                                        <div class="form-check p-0">
                                                            <span id="bottomKg5" class="form-check-label">--</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">/</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1 p-0">
                                                        <div class="form-check p-0">
                                                            <span id="bottomPersen5" class="form-check-label">--</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row mt-3">
                                                    <div class="col-sm-2">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label"><strong>C. Sewing
                                                                    Method</strong></label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-2 offset-sm-1">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="mitsumaki" disabled>
                                                            <label class="form-check-label"
                                                                for="mitsumaki">Mitsumaki</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="ogami" disabled>
                                                            <label class="form-check-label" for="ogami">Ogami</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-2 offset-sm-1">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="halfMitsumaki" disabled>
                                                            <label class="form-check-label" for="halfMitsumaki">Half
                                                                Mitsumaki</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="otherSewingMethod" disabled>
                                                            <label class="form-check-label"
                                                                for="otherSewingMethod">Other</label>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div class="row mt-3">
                                                    <div class="col-sm-2">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label"><strong>D. Stitch
                                                                    Approx.</strong></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="bottomApprox" disabled>
                                                            <label class="form-check-label"
                                                                for="bottomApprox">Bottom</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-2"> </div>
                                                    <div class="col-sm-2">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="sideBodyApprox" disabled>
                                                            <label class="form-check-label" for="sideBodyApprox">Side
                                                                Body</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-2"> </div>
                                                    <div class="col-sm-2">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="liftingBeltApprox" disabled>
                                                            <label class="form-check-label"
                                                                for="liftingBeltApprox">Lifting
                                                                Belt</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row mt-3">
                                                    <div class="col-sm-3">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label"><strong>E. Fit to drawing
                                                                    Spec.?</strong></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="fitDrawYes" disabled>
                                                            <label class="form-check-label" for="fitDrawYes">Yes</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-2 offset-sm-3">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="fitDrawNo" disabled>
                                                            <label class="form-check-label" for="fitDrawNo">No</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row mt-2">
                                            <div class="col-sm-12 d-flex align-items-center justify-content-center bordered"
                                                style="background-color: lightgoldenrodyellow">
                                                <h5 style="margin: 0"><strong>Test Method Detail</strong></h5>
                                            </div>
                                        </div>

                                        <div class="row bordered">
                                            <div class="col-md-12">

                                                <div class="row mt-2">
                                                    <div class="col-sm-2">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label"><strong>A. Test
                                                                    Condition</strong></label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-4 p-0 offset-sm-1">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">Filling with plastic
                                                                granule at
                                                                height approx.</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2 p-0">
                                                        <div class="form-check p-0">
                                                            <span id="heightApprox"
                                                                class="form-check-label">.....Cm</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-2 p-0 offset-sm-1">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label">Pressure plate
                                                                dimension: </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="diaPressure" disabled>
                                                            <label class="form-check-label" for="diaPressure">Dia =
                                                            </label>

                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2 p-0 offset-sm-1">
                                                        <span class="form-check-label"
                                                            id="testDia">...............cm</span>
                                                    </div>
                                                    <div class="col-sm-2">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox"
                                                                id="squarePressure" disabled>
                                                            <label class="form-check-label"
                                                                for="squarePressure">Square:</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2 p-0">
                                                        <span class="form-check-label" id="testSquare">............... x
                                                            ...............cm</span>
                                                    </div>
                                                </div>

                                                <div class="row mt-1">
                                                    <div class="col-sm-2">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label"><strong>B. Cyclic
                                                                    Test</strong></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <div class="form-check">
                                                            <label class="form-check-label">: <strong>30X</strong>
                                                                cycles of load
                                                                application to approx.</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6 p-0">
                                                        <div class="form-check">
                                                            <span id="cycleLoadApprox" class="form-check-label">.....kg (2
                                                                x
                                                                SWL)</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row mt-1">
                                                    <div class="col-sm-2">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label"><strong>C. Top Lift
                                                                    Test</strong></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-2">
                                                        <div class="form-check">
                                                            <label class="form-check-label">: Load speed: </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4 p-0">
                                                        <div class="form-check">
                                                            <span id="loadSpeed" class="form-check-label">.....cm /
                                                                mnt (Bag
                                                                dalam keadaan kosong)</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row mt-1">
                                                    <div class="col-sm-2">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label"><strong>D. Cyclic Top Lift
                                                                    Data</strong></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1">
                                                        <div class="form-check">
                                                            <label class="form-check-label">: </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div id="tableContainer"></div>
                                                    </div>
                                                </div>

                                                <div class="row mt-1">
                                                    <div class="col-sm-2">
                                                        <div class="form-check p-0">
                                                            <label class="form-check-label"><strong>E. Drop Test (80
                                                                    cm)</strong></label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-1">
                                                        <div class="form-check">
                                                            <label class="form-check-label">: </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-9">
                                                        <div class="form-check">
                                                            <span id="dropTestDetail"
                                                                class="form-check-label">..................................................................................................................................................</label>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                    {{-- close preview detail --}}
                                    {{--  --}}
                                    {{--  --}}
                                    {{--  --}}

                                    <div class="row mt-2">
                                        <div class="col-md-12">
                                            <div class="row bordered">
                                                <div
                                                    class="col-sm-8 d-flex align-items-center justify-content-center bordered">
                                                    <h6 style="margin: 0"><strong>Comments</strong></h6>
                                                </div>
                                                <div
                                                    class="col-sm-2 d-flex align-items-center justify-content-center bordered">
                                                    <h6 style="margin: 0"><strong>Prepared By</strong></h6>
                                                </div>
                                                <div
                                                    class="col-sm-2 d-flex align-items-center justify-content-center bordered">
                                                    <h6 style="margin: 0"><strong>Approved By</strong></h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="row bordered">
                                                <div class="col-sm-8 d-flex align-items-center justify-content-center bordered"
                                                    style="height: 100px;">
                                                    <span id="comments" class="h6"><strong></strong></span>
                                                </div>
                                                <div
                                                    class="col-sm-2 d-flex flex-column align-items-center justify-content-center bordered">
                                                    <span id="idSpv" class="h6"><strong></strong></span>
                                                </div>
                                                <div
                                                    class="col-sm-2 d-flex flex-column align-items-center justify-content-center bordered">
                                                    <span id="idMng" class="h6"><strong></strong></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="row">
                                                <div class="col-sm-8 d-flex flex-column justify-content-center bordered">
                                                    <h6 style="margin: 0"><strong>*This certificate was printed by
                                                            protected system therefore no signature is required</strong>
                                                    </h6>

                                                </div>
                                                <div
                                                    class="col-sm-2 d-flex flex-column align-items-center justify-content-center bordered">
                                                    <h6 style="margin: 0"><strong>QC Spv</strong></h6>
                                                </div>
                                                <div
                                                    class="col-sm-2 d-flex flex-column align-items-center justify-content-center bordered">
                                                    <h6 style="margin: 0"><strong>QC Manager</strong></h6>
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
    </div>


    <script src="{{ asset('js/COA/FIBCPrint.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/COA/FIBCPrint.css') }}">
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
    {{-- <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> --}}
    <script src="{{ asset('js/chart.js') }}"></script>
@endsection
