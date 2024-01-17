

const notesFormHandler = async (event) => {
    event.preventDefault();
    const notes_text = document.querySelector('#notes-text').value.trim();

    if (notes_text) {

        const contactId = event.target.getAttribute('data-contact-id');
        
        const response = await fetch(`/api/note/contact/${contactId}`, {
            method: 'POST',
            body: JSON.stringify({ noteText }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/contacts/${id}`);
        } else {
            console.error('Failed to add note');
        }
    }
};


const delNoteHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/note/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Refresh page
        document.location.replace(`/contacts/${id}`);
      } else {
        alert('Failed to delete project');
      }
    }
  };

  //TO DO: Add edit button
  const editNoteHandler = async (event) => {
    
  };