    <!DOCTYPE html>
    <html>

    <head>
        <title>Print Dokumentasi</title>

        <style>
            body {
                margin: 20px;
                text-align: center;
            }

            h3 {
                margin-bottom: 20px;
            }

            img {
                max-width: 100%;
                max-height: 100vh;
            }

            iframe {
                width: 100%;
                height: 90vh;
                border: none;
            }

            @media print {
                h3 {
                    margin-top: 0;
                }
            }
        </style>
    </head>

    <body>

        <h3>No Order : {{ $noTrans }}</h3>

        <div id="container"></div>

        <script>
            const noTrans = "{{ $noTrans }}";

            fetch(`/FinalApprove/getDokumentasi/${noTrans}`)
                .then(async response => {

                    if (!response.ok) {
                        document.body.innerHTML = "<h3>Dokumentasi tidak ditemukan</h3>";
                        return;
                    }

                    const blob = await response.blob();

                    let img = document.createElement("img");

                    img.onload = function() {

                        setTimeout(() => {
                            window.print();
                        }, 300);

                    }

                    img.src = URL.createObjectURL(blob);

                    document.getElementById("container").appendChild(img);

                });
        </script>

    </body>

    </html>
