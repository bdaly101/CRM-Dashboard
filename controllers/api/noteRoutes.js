const router = require('express').Router();
const { Note, Contact } = require('../../models');
const withAuth = require('../../utils/auth');


// Get Notes with Contact ID
// :id refrences contact ID
router.get('/contact/:id', withAuth, async (req, res) => {
    try {

        const contactId = req.params.id;

        const contactData = await Contact.findByPk(contactId);

        // Check if the contact exists and belongs to the logged-in user
        if (!contactData || contactData.user_id !== req.session.user_id) {
            res.status(404).send('Contact not found or access denied');
            return;
        }

        const notesData = await Note.findAll({
            where: { contact_id: contactId },
            attributes: ['body']
        });

        const notes = notesData.map(note => note.get({ plain: true }));

        res.status(200).json(notes);

    } catch (err) {
        res.status(500).json(err);
    }
});
// CREATE a new Note post
// :id refrences contact ID
router.post('/contact/:id', withAuth, async (req, res) => {
    try {

        const contactId = req.params.id;

        const contactData = await Contact.findByPk(contactId);
        console.log(contactData);
        // Check if the contact exists and belongs to the logged-in user
        if (!contactData || contactData.user_id !== req.session.user_id) {
            res.status(404).send('Contact not found or access denied');
            return;
        }

        const newNote = await Note.create({
            ...req.body,
            contact_id: contactId,
        });

        res.status(200).json(newNote);


    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a Note post
// :id refrences note ID
router.put('/:id', withAuth, async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findByPk(noteId);

        // Check if the note exists
        if (!note) {
            res.status(404).json({ message: 'No note found with this id!' });
            return;
        }

        // Fetch the contact related to this note
        const contact = await Contact.findByPk(note.contact_id);

        // Check if the contact exists and belongs to the logged-in user
        if (!contact || contact.user_id !== req.session.user_id) {
            res.status(403).json({ message: 'Access denied for this note' });
            return;
        }

        // Update the note
        const updatedNote = await Note.update(req.body, {
            where: {
                id: noteId,
            },
        });

        if (!updatedNote[0]) {
            res.status(404).json({ message: 'Unable to update the note' });
            return;
        }

        res.status(200).json({ message: 'Note updated successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a Note post
// :id refrences note ID
router.delete('/delete/:id', withAuth, async (req, res) => {
    try {

        // Fetch the note to get the contact_id
        const noteId = req.params.id;
        const note = await Note.findByPk(noteId);

        // Check if the note exists
        if (!note) {
            console.log("No note")
            res.status(404).json({ message: 'No note found with this id!' });
            return;
        };

        // Fetch the contact related to this note
        const contact = await Contact.findByPk(note.contact_id);

        // Check if the contact exists and belongs to the logged-in user
        if (!contact || contact.user_id !== req.session.user_id) {
            res.status(403).json({ message: 'Access denied for this note' });
            return;
        };

        // Delete the note
        const deletedNote = await Note.destroy({
            where: {
                id: noteId,
            },
        });

        // Check if the note was deleted successfully
        if (!deletedNote) {
            res.status(404).json({ message: 'Unable to delete the note' });
            return;
        }

        else {
            res.status(200).json({ message: "Note Deleted!" })
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
