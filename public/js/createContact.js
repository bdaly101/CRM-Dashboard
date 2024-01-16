// Get the modal
const modal = document.getElementById("myModal");


// Function that opens and closes create contact modal
const createContactModal = () => {
    // When the user clicks on the button, open the modal
    modal.style.display = "block";

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
};

// Function that captures contact form data and passes it to database
const createContact = async (event) => {
    event.preventDefault();

    // Collect values from the add contact form 
    const firstName = document.querySelector('#contact-first-name').value.trim();
    const lastName = document.querySelector('#contact-last-name').value.trim();
    const email = document.querySelector('#contact-email').value.trim();
    const phoneNumber = document.querySelector('#contact-phone-number').value.trim();
    const companyName = document.querySelector('#contact-company-name').value.trim();

    // console.log(firstName)
    // console.log(lastName)
    // console.log(email)
    // console.log(phoneNumber)
    // console.log(companyName)

    if (firstName && lastName && email && phoneNumber && companyName) {
        const response = await fetch(`/api/contact`, {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, email, companyName, phoneNumber }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to create contact');
        }
    }

}


document
    .querySelector('#create-contact-btn')
    .addEventListener('click', createContactModal);

// Needs to grab the FORM, not the button
document
    .querySelector('#modal-form')
    .addEventListener('submit', createContact)