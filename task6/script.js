// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {

    // Get references to the form and its elements
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Get references to the error message containers
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');

    // Add a submit event listener to the form
    form.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        
        // Validate the form inputs
        const isFormValid = validateForm();

        // If the form is valid, show a success message and reset the form
        if (isFormValid) {
            successMessage.textContent = 'Thank you! Your message has been sent.';
            form.reset(); // Clear all input fields
            // Optionally, you could submit the form data to a server here
            // e.g., using fetch()
        }
    });

    /**
     * Validates all form fields and displays error messages.
     * @returns {boolean} - True if all fields are valid, false otherwise.
     */
    function validateForm() {
        // Clear previous error and success messages
        clearErrors();
        let isValid = true;

        // --- 1. Name Validation ---
        // Trim whitespace from the input value
        const nameValue = nameInput.value.trim();
        if (nameValue === '') {
            nameError.textContent = 'Name is required.';
            isValid = false;
        }

        // --- 2. Email Validation ---
        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            emailError.textContent = 'Email is required.';
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // --- 3. Message Validation ---
        const messageValue = messageInput.value.trim();
        if (messageValue === '') {
            messageError.textContent = 'Message is required.';
            isValid = false;
        } else if (messageValue.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters long.';
            isValid = false;
        }

        return isValid;
    }

    /**
     * Clears all error and success messages from the form.
     */
    function clearErrors() {
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        successMessage.textContent = '';
    }

    /**
     * Validates an email address using a regular expression.
     * @param {string} email - The email string to validate.
     * @returns {boolean} - True if the email format is valid.
     */
    function isValidEmail(email) {
        // A simple regex for email validation
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});
