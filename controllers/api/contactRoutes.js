// TODO: Edit to Interface with the db

const router = require('express').Router();
const { Contact, User } = require('../../models');
const withAuth = require('../../utils/auth');

// TODO: Get Request for Contacts given Username
// ? Don't think this is right.
router.get('/', async (req, res) => {
    try {
        // Get all contacts and JOIN with user data
        const contactData = await Contact.findAll({
            include: [
                {
                    model: User,
                    attributes: ['userName'],
                },
            ],
        });

        // Serialize data so the template can read it
        const contacts = contactData.map((project) => project.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('contacts', {
            contacts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE a new Contact
router.post('/', withAuth, async (req, res) => {
    try {
        // TODO: This input needs to be formatting more
        // Validation, etc.
        const newContact = await Contact.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newContact);
    } catch (err) {
        res.status(400).json(err);
    }
});

// UPDATE a Contact
router.put('/:id', withAuth, async (req, res) => {
    try {
        // TODO: Double check the update hooks
        const ContactData = await Contact.update({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!ContactData) {
            res.status(404).json({ message: 'No Contact found with this id!' });
            return;
        }

        res.status(200).json(ContactData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a Contact post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const ContactData = await Contact.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!ContactData) {
            res.status(404).json({ message: 'No Contact found with this id!' });
            return;
        }

        res.status(200).json(ContactData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
