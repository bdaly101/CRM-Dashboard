

// Get the modal
const editModal = document.getElementById("myEditModal");


// Function that opens and closes create contact modal
const editContactModal = async (event) => {
  id = event.target.parentElement.children[0].dataset.number;
  console.log(id)
  document.querySelector('#contact-id').value = id
  full_name = event.target.parentElement.parentElement.children[1].children[0].textContent.split(' ')
  console.log(full_name)
  first_name = full_name[0]
  document.querySelector('#edit-contact-first-name').value = first_name;
  last_name = full_name[1]
  document.querySelector('#edit-contact-last-name').value = last_name;

  email = event.target.parentElement.parentElement.children[2].children[0].textContent
  document.querySelector('#edit-contact-email').value = email;
  console.log(email);

  phone_number = event.target.parentElement.parentElement.children[3].children[0].textContent
  document.querySelector('#edit-contact-phone-number').value = phone_number;
  console.log(phone_number);

  company = event.target.parentElement.parentElement.children[4].children[0].textContent
  document.querySelector('#edit-contact-company-name').value = company;
  console.log(company);

  // When the user clicks on the button, open the modal
  editModal.style.display = "block";

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[1];
  console.log(span)
  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    editModal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == editModal) {
      editModal.style.display = "none";
    }
  }
};

// Function that captures contact form data and passes it to database
const editContact = async (event) => {
  console.log("HEREv2");
  event.preventDefault();

  // Collect values from the add contact form 
  const id = document.querySelector('#contact-id').value;
  document.querySelector('#contact-id').value = '';

  const first_name = document.querySelector('#edit-contact-first-name').value.trim();
  document.querySelector('#edit-contact-first-name').value = '';
  const last_name = document.querySelector('#edit-contact-last-name').value.trim();
  document.querySelector('#edit-contact-last-name').value = '';
  const email = document.querySelector('#edit-contact-email').value.trim();
  document.querySelector('#edit-contact-email').value = '';
  const phone_number = document.querySelector('#edit-contact-phone-number').value.trim();
  document.querySelector('#edit-contact-phone-number').value = '';
  const company = document.querySelector('#edit-contact-company-name').value.trim();
  document.querySelector('#edit-contact-company-name').value = '';

  // console.log(firstName)
  // console.log(lastName)
  // console.log(email)
  // console.log(phoneNumber)
  // console.log(companyName)
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
    const response = await fetch(`/api/contact/${id}`, {
      method: 'PUT',
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




const editBtns = document.querySelectorAll('.editbtn')
for (let i = 0; i < editBtns.length; i++) {
  editBtns[i].addEventListener('click', editContactModal);
}

// Needs to grab the FORM, not the button
document
  .querySelector('#edit-modal-form')
  .addEventListener('submit', editContact)
