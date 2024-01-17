

const checkFcn = async (event) => {
  topCheck = event.target;
  console.log(event);
  console.log(topCheck)
  console.log(topCheck.checked)
  const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
  console.log(checkBoxes);
  for (let i=1; i<checkBoxes.length; i++) {
    checkBoxes[i].checked = topCheck.checked;
  }
}

document
  .querySelector('#checkboxall')
  .addEventListener('click', checkFcn)
