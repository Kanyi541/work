document.addEventListener('DOMContentLoaded', function() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    const modal = document.getElementById('modal');
    const paymentModal = document.getElementById('payment-modal');
    const closeModal = document.querySelector('.close');
    const closePaymentModal = document.querySelector('.close-payment');
    const modalDownloadButton = document.getElementById('modal-download');
    const payVisaButton = document.getElementById('pay-visa');
    const payMpesaButton = document.getElementById('pay-mpesa');
    const visaForm = document.getElementById('visa-form');
    const mpesaForm = document.getElementById('mpesa-form');

    downloadButtons.forEach(button => { 
        button.addEventListener('click', function() { // populating the books
            modal.style.display = 'block';
            const ebookId = this.getAttribute('data-id');
            const portfolioItem = this.closest('.portfolio-item');
            const title = portfolioItem.dataset.title;
            const author = portfolioItem.dataset.author;
            const description = portfolioItem.dataset.description;
            const imgSrc = portfolioItem.querySelector('img').src;

            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-author').innerText = `Author: ${author}`;
            document.getElementById('modal-description').innerText = description;
            document.getElementById('modal-img').src = imgSrc;
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modalDownloadButton.addEventListener('click', function() {
        modal.style.display = 'none';
        paymentModal.style.display = 'block';
    });

    closePaymentModal.addEventListener('click', function() {
        paymentModal.style.display = 'none';
        visaForm.style.display = 'none';
        mpesaForm.style.display = 'none';
    });

    payVisaButton.addEventListener('click', function() {
        visaForm.style.display = 'block';
        mpesaForm.style.display = 'none';
    });

    payMpesaButton.addEventListener('click', function() {
        mpesaForm.style.display = 'block';
        visaForm.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
        if (event.target == paymentModal) {
            paymentModal.style.display = 'none';
            visaForm.style.display = 'none';
            mpesaForm.style.display = 'none';
        }
    });
});
