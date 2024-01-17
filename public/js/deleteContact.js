

const deleteSelected = async (event) => {
  console.log("here")
  event.preventDefault();

  console.log("click")
  const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  for (let i = 0; i < checkedCheckboxes.length; i++) {
    const idNumber = checkedCheckboxes[i].dataset.number
    const response = await fetch(`/api/contact/${idNumber}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    checkedCheckboxes[i].checked=false;
    if (!response.ok) {
      alert('Failed to create contact');
    }
  }
  window.location.reload();
}




document
  .querySelector('#delete-contact-btn')
  .addEventListener('click', deleteSelected)