

const checkFcn = async (event) => {
  topCheck = event.target;
  const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
  for (let i=1; i<checkBoxes.length; i++) {
    checkBoxes[i].checked = topCheck.checked;
  }
  if(topCheck.checked) {
    deleteBtn.classList.remove("invisible")
  }
  else {
    deleteBtn.classList.add("invisible")
  }
}

document
  .querySelector('#checkboxall')
  .addEventListener('click', checkFcn)

const deleteBtn = document.querySelector('#delete-contact-btn')
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
for (let i =1; i< checkboxes.length; i++) {
  checkboxes[i].addEventListener('click', () => {
    const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked')
    if (checkedCheckboxes.length > 0) {
      deleteBtn.classList.remove("invisible")
    }
    else {
      deleteBtn.classList.add("invisible")
    }
  })
}
