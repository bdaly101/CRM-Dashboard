const router = require('express').Router();
const { Contact } = require('../../models');
const withAuth = require('../../utils/auth');

// Get SINGLE contact by ID
router.get('/:id', withAuth, async (req, res) => {
    try {
        const getSingleContact = await Contact.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        })

        if (!getSingleContact) {
            res.status(404).json({ message: 'No contact found with this id!' });
            return;
        }

        res.render('contacts', {
            ...getSingleContact,
            logged_in: req.session.logged_in
        });
        
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// Get COUNT of all contacts
router.get('/', withAuth, async (req, res) => {
    try {
        const { count, rows } = await Contact.findAndCountAll({
            where: {
                user_id: req.session.user_id,
            }
        })

        // return count
        console.log(rows)
        res.status(200).json(count)

    } catch (err) {
        res.status(500).json(err.message);
    }
});

// CREATE a new Contact
router.post('/', withAuth, async (req, res) => {
    try {
        console.log("HIT THIS ENDPOINT: \n\n", req.body)
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
        const ContactData = await Contact.update(
            { ...req.body },
            {
                where: {
                    id: req.params.id,
                    user_id: req.sesssion.user_id,
                }

            });

        if (!ContactData) {
            res.status(404).json({ message: 'No Contact found with this id!' });
            return;
        }

        res.status(200).json(ContactData);
    } catch (err) {
        res.status(500).json(err.message);
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
