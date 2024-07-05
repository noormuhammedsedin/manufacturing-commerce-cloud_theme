document.addEventListener("DOMContentLoaded", function() {
    // Add the popup HTML and CSS dynamically
    const popupHtml = `
        <style>
            #quote-popup {
                display: none;
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                padding: 20px;
                background-color: white;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                width: 500px;
                height:600px;
                overflow-y:scroll;
            }
            #popup-overlay {
                display: none;
                position: fixed;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 999;
            }
            .popup-form {
                display: flex;
                flex-direction: column;
            }
            .popup-form label {
                margin-top: 10px;
            }
            .popup-form input {
                margin-top: 5px;
                padding: 8px;
                font-size: 1em;
            }
            .popup-form button {
                margin-top: 20px;
                padding: 10px;
                border: none;
                cursor: pointer;
            }
            .popup-close {
                position: absolute;
                right: 10px;
                top: 10px;
                cursor: pointer;
                font-size: 1.2em;
            }
        </style>
        <div id="popup-overlay"></div>
        <div id="quote-popup">
            <span class="popup-close">&times;</span>
            <form id="quote-form" class="popup-form">
                <label for="customer-first-name">First Name</label>
                <input type="text" id="customer-first-name" name="first_name" required>
                <label for="customer-last-name">Last Name</label>
                <input type="text" id="customer-last-name" name="last_name" required>
                <label for="customer-email">Email</label>
                <input type="email" id="customer-email" name="email" required>
                <label for="customer-phone">Phone Number</label>
                <input type="tel" id="customer-phone" name="phone" required>
                <label for="shipping-address">Address</label>
                <input type="text" id="shipping-address" name="address" required>
                <label for="apartment-address">Apartment,suite,etc.</label>
                <input type="text" id="apartment-address" name="apartment" required>
                <label for="city-address">City</label>
                <input type="text" id="city-address" name="city" required>
                <label for="postal-address">Postal code</label>
                <input type="text" id="postal-address" name="postal" required>
                <button type="submit" class="button">Submit</button>
            </form>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHtml);

    const quoteCheckoutButton = document.getElementById('quote_checkout');
    const quotePopup = document.getElementById('quote-popup');
    const popupOverlay = document.getElementById('popup-overlay');
    const quoteForm = document.getElementById('quote-form');
    const popupClose = document.querySelector('.popup-close');

    // Function to show the popup
    const showPopup = () => {
        quotePopup.style.display = 'block';
        popupOverlay.style.display = 'block';
    };

    // Function to hide the popup
    const hidePopup = () => {
        quotePopup.style.display = 'none';
        popupOverlay.style.display = 'none';
    };

    // Show the popup when the button is clicked
    quoteCheckoutButton.addEventListener('click', showPopup);

    // Hide the popup when the overlay or close button is clicked
    popupOverlay.addEventListener('click', hidePopup);
    popupClose.addEventListener('click', hidePopup);

    // Handle form submission
    quoteForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const products = JSON.parse(quoteCheckoutButton.getAttribute('data-items'));
        console.log('Products:', products);

        const formData = {
            products: products,
            customerInfo: {
                firstName: document.getElementById('customer-first-name').value,
                lastName: document.getElementById('customer-last-name').value,
                email: document.getElementById('customer-email').value,
                phone: document.getElementById('customer-phone').value,
                address: document.getElementById('shipping-address').value,
                apartment:document.getElementById('apartment-address').value,
                city:document.getElementById('city-address').value,
                postal:document.getElementById('postal-address').value
            }
        };
        try {
            const response = await fetch('http://localhost:3000/submit-quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Quote submitted successfully!');
                hidePopup();
                quoteForm.reset();
            } else {
                alert('Failed to submit quote. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting quote:', error);
            alert('Error submitting quote. Please try again.');
        }
    });
});
