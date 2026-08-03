@extends('layouts.appComPro')
@section('title', 'Sertifikasi | Kerta Rajasa Raya')
@section('content')
<link href="{{ asset('css/sertifikasi.css') }}" rel="stylesheet">

<section class="certification-page">
    <div class="certification-hero">
        <div class="hero-overlay">
            <div class="hero-content">
                <h1>{{ __('sertifikasi.judul') }}</h1>
            </div>
        </div>
    </div>

    {{-- CONTENT --}}
    <div class="certification-container">
        <div class="container">
            <div class="row g-4">

                {{-- Sertifikat 3 --}}
                <div class="col-lg-4 col-md-6">
                    <div
                        class="card border-0 h-100 certificate-card"
                        data-pdf="{{ asset('images/certificates/sertifikat_3.pdf') }}">

                        <img
                            src="{{ asset('images/certificates/sertifikat_3.png') }}"
                            class="card-img-top"
                            alt="Sertifikat TKDN"
                        >

                        <div class="card-body">
                            <h5>
                                {{ __('sertifikasi.sertifikat3') }}
                            </h5>
                        </div>
                    </div>
                </div>

                {{-- Sertifikat 4 --}}
                <div class="col-lg-4 col-md-6">
                    <div
                        class="card border-0 h-100 certificate-card"
                        data-pdf="{{ asset('images/certificates/sertifikat_4.pdf') }}">

                        <img
                            src="{{ asset('images/certificates/sertifikat_4.png') }}"
                            class="card-img-top"
                            alt="Sertifikat Produk"
                        >

                        <div class="card-body">
                            <h5>
                                {{ __('sertifikasi.sertifikat4') }}
                            </h5>
                        </div>
                    </div>
                </div>

                {{-- Sertifikat 5 --}}
                <div class="col-lg-4 col-md-6">
                    <div
                        class="card border-0 h-100 certificate-card"
                        data-pdf="{{ asset('images/certificates/sertifikat_5.pdf') }}">

                        <img
                            src="{{ asset('images/certificates/sertifikat_5.png') }}"
                            class="card-img-top"
                            alt="Sertifikat Lainnya"
                        >

                        <div class="card-body">
                            <h5>
                                {{ __('sertifikasi.sertifikat5') }}
                            </h5>
                        </div>
                    </div>
                </div>

                {{-- Sertifikat 1 --}}
                <div class="col-lg-4 col-md-6">
                    <div
                        class="card border-0 h-100 certificate-card"
                        data-pdf="{{ asset('images/certificates/sertifikat_1.pdf') }}">

                        <img
                            src="{{ asset('images/certificates/sertifikat_1.png') }}"
                            class="card-img-top"
                            alt="Sertifikat Halal"
                        >

                        <div class="card-body">
                            <h5>
                                {{ __('sertifikasi.sertifikat1') }}
                            </h5>
                        </div>
                    </div>
                </div>

                {{-- Sertifikat 2 --}}
                <div class="col-lg-4 col-md-6">
                    <div
                        class="card border-0 h-100 certificate-card"
                        data-pdf="{{ asset('images/certificates/sertifikat_2.pdf') }}">

                        <img
                            src="{{ asset('images/certificates/sertifikat_2.png') }}"
                            class="card-img-top"
                            alt="Sertifikat ISO"
                        >
                        <div class="card-body">
                            <h5>
                                {{ __('sertifikasi.sertifikat2') }}
                            </h5>
                        </div>
                    </div>
                </div>

                {{-- Sertifikat 10 --}}
                <div class="col-lg-4 col-md-6">
                    <div
                        class="card border-0 h-100 certificate-card"
                        data-pdf="{{ asset('images/certificates/sertifikat_10.pdf') }}">

                        <img
                            src="{{ asset('images/certificates/sertifikat_10.png') }}"
                            class="card-img-top"
                            alt="Sertifikat Lainnya"
                        >

                        <div class="card-body">
                            <h5>
                                {{ __('sertifikasi.sertifikat10') }}
                            </h5>
                        </div>
                    </div>
                </div>

                {{-- Sertifikat 6 --}}
                <div class="col-lg-4 col-md-6">
                    <div
                        class="card border-0 h-100 certificate-card"
                        data-pdf="{{ asset('images/certificates/sertifikat_6.pdf') }}">

                        <img
                            src="{{ asset('images/certificates/sertifikat_6.png') }}"
                            class="card-img-top"
                            alt="Sertifikat Lainnya"
                        >

                        <div class="card-body">
                            <h5>
                                {{ __('sertifikasi.sertifikat6') }}
                            </h5>
                        </div>
                    </div>
                </div>

                {{-- Sertifikat 7 --}}
                <div class="col-lg-4 col-md-6">
                    <div
                        class="card border-0 h-100 certificate-card"
                        data-pdf="{{ asset('images/certificates/sertifikat_7.pdf') }}">

                        <img
                            src="{{ asset('images/certificates/sertifikat_7.png') }}"
                            class="card-img-top"
                            alt="Sertifikat Lainnya"
                        >

                        <div class="card-body">
                            <h5>
                                {{ __('sertifikasi.sertifikat7') }}
                            </h5>
                        </div>
                    </div>
                </div>

                {{-- Sertifikat 8 --}}
                <div class="col-lg-4 col-md-6">
                    <div
                        class="card border-0 h-100 certificate-card"
                        data-pdf="{{ asset('images/certificates/sertifikat_8.pdf') }}">

                        <img
                            src="{{ asset('images/certificates/sertifikat_8.png') }}"
                            class="card-img-top"
                            alt="Sertifikat Lainnya"
                        >

                        <div class="card-body">
                            <h5>
                                {{ __('sertifikasi.sertifikat8') }}
                            </h5>
                        </div>
                    </div>
                </div>

                {{-- Sertifikat 9 --}}
                <div class="col-lg-4 col-md-6">
                    <div
                        class="card border-0 h-100 certificate-card"
                        data-pdf="{{ asset('images/certificates/sertifikat_9.pdf') }}">

                        <img
                            src="{{ asset('images/certificates/sertifikat_9.png') }}"
                            class="card-img-top"
                            alt="Sertifikat Lainnya"
                        >

                        <div class="card-body">
                            <h5>
                                {{ __('sertifikasi.sertifikat9') }}
                            </h5>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</section>

{{-- MODAL PDF --}}
<div class="modal fade" id="certificateModal" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content border-0">
            <div class="modal-header">
                <h5 class="modal-title">
                    {{ __('sertifikasi.modal') }}
                </h5>

                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                ></button>

            </div>

            <div class="modal-body p-0">
                <div id="pdf-container">
                </div>
            </div>
        </div>
    </div>
</div>

{{-- CONTACT --}}
<section id="contact" class="section">
    <div class="contact-box">
        <h2>
            {!! __('sertifikasi.contact_footer', [
                'company' => 'Kerta Rajasa Raya'
            ]) !!}
        </h2>

        <div class="contact-buttons">

            <a href="https://www.google.com/maps/search/?api=1&query=PT+Kerta+Rajasa+Raya+Tropodo"
                target="_blank"
                class="contact-btn">
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M12 2c-4.41 0-8 3.59-8 8-.03 6.44 7.12 11.6 7.42 11.82.17.12.38.19.58.19s.41-.06.58-.19c.3-.22 7.45-5.37 7.42-11.82 0-4.41-3.59-8-8-8m0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4"></path>
                </svg>
                {{ __('sertifikasi.maps') }}
            </a>

            <a
                href="mailto:sales@kertarajasa.co.id"
                class="contact-btn">
                <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    fill="currentColor" viewBox="0 0 24 24" >
                    <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free-->
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v.25l10 7.5 10-7.5V6c0-1.1-.9-2-2-2"></path><path d="M12 16c-.21 0-.42-.07-.6-.2L2 8.75V18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8.75l-9.4 7.05c-.18.13-.39.2-.6.2"></path>
                </svg>
                sales@kertarajasa.co.id
            </a>

            <a href="https://wa.me/62818510828"
                target="_blank"
                rel="noopener noreferrer"
                class="contact-btn">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M18.41 22h.37c.31-.01.6-.17.78-.43l2.27-3.27c.15-.22.21-.49.16-.76a1 1 0 0 0-.43-.65l-4.91-3.27c-.41-.27-.96-.21-1.29.15l-1.88 2.03c-.76-.45-2.03-1.26-3.03-2.26s-1.81-2.27-2.26-3.02l2.03-1.88c.36-.33.43-.88.15-1.29L7.1 2.44c-.15-.22-.38-.38-.64-.43-.27-.05-.54 0-.76.16L2.43 4.43c-.26.18-.42.47-.43.78-.03.71-.16 7.04 4.79 11.98 4.46 4.46 10.04 4.8 11.62 4.8Z"></path>
                    </svg>
                    {{ __('navbar.pesan') }}
            </a>
        </div>
    </div>
</section>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js"></script>

<script>
    pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
</script>

<script src="{{ asset('js/sertifikasi.js') }}"></script>

@endsection
