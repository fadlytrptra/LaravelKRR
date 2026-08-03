document.addEventListener("DOMContentLoaded", function () {
    const modalElement = document.getElementById("certificateModal");

    const modal = new bootstrap.Modal(modalElement);

    const pdfContainer = document.getElementById("pdf-container");

    const cards = document.querySelectorAll(".certificate-card");

    cards.forEach((card) => {
        card.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });
        card.addEventListener("click", async function () {
            const pdfUrl = this.dataset.pdf;

            pdfContainer.innerHTML = "";

            modal.show();

            try {
                const pdf = await window.pdfjsLib.getDocument(pdfUrl).promise;

                for (let page = 1; page <= pdf.numPages; page++) {
                    const currentPage = await pdf.getPage(page);

                    const viewport = currentPage.getViewport({
                        scale: 1.5,
                    });

                    const canvas = document.createElement("canvas");

                    canvas.classList.add("pdf-page");

                    const context = canvas.getContext("2d");

                    canvas.width = viewport.width;

                    canvas.height = viewport.height;

                    await currentPage.render({
                        canvasContext: context,
                        viewport: viewport,
                    }).promise;

                    // Tambahkan watermark setelah render PDF selesai
                    context.save();

                    context.globalAlpha = 0.15;
                    context.fillStyle = "#000";
                    context.font = "bold 58px Arial";

                    context.translate(canvas.width / 2, canvas.height / 2);
                    context.rotate(-Math.PI / 6);

                    context.textAlign = "center";

                    context.fillText("Property of PT Kerta Rajasa Raya", 0, 0);

                    context.restore();
                    pdfContainer.appendChild(canvas);
                }
            } catch (error) {
                console.error(error);
            }
        });
    });

    modalElement.addEventListener("hidden.bs.modal", function () {
        pdfContainer.innerHTML = "";
    });
});
