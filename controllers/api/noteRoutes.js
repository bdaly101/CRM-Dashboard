const router = require('express').Router();
const { Note, Contact } = require('../../models');
const withAuth = require('../../utils/auth');

// * Review
// ? Get Notes with Contact ID -> Needs validation check for the contact itself
router.get('/:id', async (req, res) => {
    try {
        // Get all notes and JOIN with user data
        const noteData = await Note.findAll({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: Contact,
                    attributes: ['id'],
                },
            ],
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a new Note post
router.post('/', withAuth, async (req, res) => {
    try {
        const newNote = await Note.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newNote);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a Note post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const noteData = await Note.update({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!noteData) {
            res.status(404).json({ message: 'No Note found with this id!' });
            return;
        }

        res.status(200).json(noteData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a Note post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const noteData = await Note.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!noteData) {
            res.status(404).json({ message: 'No note found with this id!' });
            return;
        }

        res.status(200).json(noteData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
