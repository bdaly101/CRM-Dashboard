
const contactId = document.querySelector("#notes-form").getAttribute('data-contact-id');

const notesFormHandler = async (event) => {
  event.preventDefault();
  console.log(contactId);
  const contact_id = window.location.href.split('/')[4].split('?')[0]

  const notes_text = document.querySelector('#note-text').value.trim();
  //const notes_form = document.querySelector("#notes-form").getAttribute('data-contact-id');
  console.log(`notes_text: ${notes_text}`);
  //console.log(`notes_form: ${notes_form}`);
  if (notes_text) {
    const response = await fetch(`/api/note/contact/${contactId}`, {
      method: 'POST',
      body: JSON.stringify({ body: notes_text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response2 = await fetch(`/api/contact/${contact_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok && response2.ok) {
      console.log("Note Added");
      window.location.reload();
    } else {
      console.error('Failed to add note');
    }
  }
};




const delNoteHandler = async (event) => {
  console.log("delete")
  if (event.target.hasAttribute('data-id')) {
    const noteId = event.target.getAttribute('data-id');
    console.log("B2")
    const response = await fetch(`/api/note/delete/${noteId}`, {
      method: 'DELETE',
    });
    console.log("A1")
    console.log(response)
    if (response.ok) {
      console.log("Here")
      window.location.reload();
    } else {
      alert('Failed to delete note');
    }
  }
};

const editNoteHandler = async (event) => {
  console.log("click")
  console.log(event.target)
  const id = event.target.dataset.id
  console.log(id)
  const old_text = event.target.parentElement.children[0].textContent
  console.log(old_text)
  const editModal = document.querySelector('#myEditModal')
  console.log(editModal);
  editModal.children[0].children[2].children[0][0].value = id
  editModal.children[0].children[2].children[0][1].value = old_text

  editModal.style.display = "block";

  const span = document.getElementsByClassName("close")[0];
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
const editFormHandler = async (event) => {
  event.preventDefault();
  console.log(event.target);
  console.log("click here");
  console.log("Children", event.target.children)
  const note_id = event.target.children[0].children[1].value
  console.log("note id", note_id)
  const new_text = event.target.children[1].children[0].children[1].value
  console.log("new-Text:", new_text)
  const contact_id = window.location.href.split('/')[4].split('?')[0]
  const response = await fetch(`/api/note/${note_id}`, {
    method: 'PUT',
    body: JSON.stringify({ body: new_text }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response2 = await fetch(`/api/contact/${contact_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok && response2.ok) {
    window.location.reload();
  } else {
    console.error('Failed to update note');
  }
}

document
  .querySelector('#notes-form')
  .addEventListener('submit', notesFormHandler);

const deleteBtns = document.querySelectorAll('.delete-note-btn')

for (let i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].addEventListener('click', delNoteHandler);
}

const editBtns = document.querySelectorAll('.edit-note-btn')

for (let i = 0; i < editBtns.length; i++) {
  editBtns[i].addEventListener('click', editNoteHandler);
}


document
  .querySelector('#edit-modal-form')
  .addEventListener('submit', editFormHandler)