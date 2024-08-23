document.addEventListener('DOMContentLoaded', function() {
    // Select background element (body in this case)
    const body = document.body;
    const backgroundImages = [
        'url("Assets/Images/background7.jpg")',
        'url("Assets/Images/background8.jpg")',
        'url("Assets/Images/background9.jpg")',
        'url("Assets/Images/background10.jpg")',
        'url("Assets/Images/background11.jpg")',
        'url("Assets/Images/background12.jpg")'
        
    ];
    let currentIndex = 0;

    // Function to change the background image
    function changeBackgroundImage() {
        currentIndex = (currentIndex + 1) % backgroundImages.length;
        body.style.backgroundImage = backgroundImages[currentIndex];
    }

    // Change background image every 5 minutes (120000 ms)
    setInterval(changeBackgroundImage, 60000);
    changeBackgroundImage(); // Initial call to set the first background

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

// Navbar toggle functionality
const navToggleBtn = document.querySelector('[data-nav-toggle-btn]');
const navbar = document.querySelector('[data-navbar]');

// Add event listener to the button
navToggleBtn.addEventListener('click', () => {
  // Toggle the 'active' class on the navbar
  navbar.classList.toggle('active');
});

// Optional: Add CSS to style the active state of the navbar
const style = document.createElement('style');
style.innerHTML = `
  .navbar {
    display: none;
  }
  .navbar.active {
    display: block;
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function () {
    const reviewForm = document.getElementById('reviewForm');
    const confirmationMessage = document.getElementById('confirmation');

    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const comment = document.getElementById('comment').value;
        const rating = document.querySelector('input[name="rating"]:checked');

        if (!rating) {
            alert('Please select a rating.');
            return;
        }

        const ratingValue = rating.value;

        // Simulate submission (you can replace this with actual form submission logic)
        setTimeout(function () {
            // Display confirmation message
            reviewForm.reset();
            confirmationMessage.classList.remove('hidden');

            // Hide confirmation message after 3 seconds
            setTimeout(function () {
                confirmationMessage.classList.add('hidden');
            }, 3000);
        }, 1000);
    });
});
