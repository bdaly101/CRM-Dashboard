
const contactId = document.querySelector("#notes-form").getAttribute('data-contact-id');

const notesFormHandler = async (event) => {
  event.preventDefault();
  console.log(contactId);
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

    if (response.ok) {
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
  console.log(newNoteText)
  // const response = await fetch(`/api/note/${noteId}`, {
  //     method: 'PUT',
  //     body: JSON.stringify({ noteText: newNoteText }),
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  // });

  // if (response.ok) {
  //   window.location.reload();
  // } else {
  //     console.error('Failed to update note');
  // }
};

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
