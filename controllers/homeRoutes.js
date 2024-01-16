const router = require('express').Router();
const { User, Note, Contact } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
        
        // Check if the user is not logged in
        if (req.session.logged_in) {
            // Redirect to the profile page
            res.redirect(`/dashboard`);
            return;
        }
        res.render('login')
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        if (!req.session.logged_in) {
            // Redirect to the login page
            res.render('login');
            return;
        };

        if (!req.session.username) {
            res.status(401).render('unauthorized');
            return;
        };

        const userData = await User.findByPk(req.session.user_id, {
                attributes: { exclude: ['password'] },
                include: [{ model: Contact }],
        });

        if(!userData) {
            req.status(402).send('User not found');
            return;
        }

        const user = userData.get({ plain: true });

        // Gets user contacts data
        console.log(user)
        // const contactsData = await Contact.findAll({
        //     where: { user_id: req.session.user_id },
        //     attributes: ['id', 'first_name', 'last_name', 'email', 'company', 'phone_number']
        // });

        // const contacts = contactsData.map(contact => contact.get({ plain: true }));

        //Render User dashboard 

        res.render('dashboard', {
            ...user,
            // contacts,        
            logged_in: req.session.logged_in
        });
            
        
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/contacts', async (req, res) => {
    try {
        // Check right user is logged in
        if (!req.session.username) {
            res.status(401).render('unauthorized');
            return;
        }
        //console.log(req.session.user_id)
        const contactsData = await Contact.findAll({
            where: { user_id: req.session.user_id },
            attributes: ['id', 'first_name', 'last_name', 'email', 'company', 'phone_number']
        });

        const contacts = contactsData.map(contact => contact.get({ plain: true }));

        //Render contacts page
        //console.log("HERE: \n\n", contacts);
        res.render('contacts', {
            contacts,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/contacts/:id', async (req, res) => {
    try {
        // Check right user is logged in
        if (!req.session.username) {
            res.status(401).render('unauthorized');
            return;
        }
        const contactId = req.params.id;
        // User.findByPK(
        //     where the fk is req.session.user_id,
        //     and where id of the contact is the req.param.id
        // )
        const contactData = await User.findByPk({
            where: {
                
            }
        
            
            

            //attributes: ['first_name', 'last_name', 'email', 'company', 'phone_number']
        });
    
        if (!contactData) {
            res.status(404).send('Contact not found');
            return;
        };

        // Serialize Data
        const contact = contactData.get({ plain: true });
        console.log(contact)

        const notesData = await Note.findAll({
            where: { contact_id: contactId },
            attributes: ['body']
        });

        const notes = notesData.map(note => note.get({ plain: true }));

        res.status(200).render('singleContact', {
            ...contact,
            notes,
            logged_in: req.session.logged_in
        });
        
        
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;