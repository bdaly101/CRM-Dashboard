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
    const first_name = document.querySelector('#contact-first-name').value.trim();
    document.querySelector('#contact-first-name').value = '';
    const last_name = document.querySelector('#contact-last-name').value.trim();
    document.querySelector('#contact-last-name').value = '';
    const email = document.querySelector('#contact-email').value.trim();
    document.querySelector('#contact-email').value = '';
    const phone_number = document.querySelector('#contact-phone-number').value.trim();
    document.querySelector('#contact-phone-number').value = '';
    const company = document.querySelector('#contact-company-name').value.trim();
    document.querySelector('#contact-company-name').value = '';

    let body = {};
    if (first_name != '') {
        body.first_name = first_name
    }
    if (last_name != '') {
        body.last_name = last_name
    }
    if (email != '') {
        body.email = email
    } 
    if (phone_number != '') {
        body.phone_number = phone_number
    }
    if (company != '') {
        body.company = company
    }
    body = JSON.stringify(body);
    console.log(body);
    if (first_name || last_name || email || phone_number || company) {
        const response = await fetch(`/api/contact`, {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            window.location.reload();
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
