const router = require('express').Router();
const { User, Note, Contact } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    try {
        // Check if the user is not logged in
        if (!req.session.logged_in) {
            // Redirect to the login page
            res.render('login');
        } else {
            // Redirect to dashboard
            res.redirect(`/${req.session.username}/dashboard`);
            
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:username/dashboard', withAuth, async (req, res) => {
    try {

       //TO DO: Render User dashboard
        const userData = await User.findByPk(req.params.username, {
            include: [
                {
                    model: User,
                    attributes: ['first_name', 'last_name', 'email']
                },
            ],
        });

        const contactData = await



       res.render('dashboard', {
        
       });
    } catch (err) {
        res.status(500).json(err);
    }
});

// TO DO add notes
router.get('/:username/contact/:id', async (req, res) => {
    try {
        // Check right user is logged in
        if (req.params.username !== req.session.username) {
            res.status(401).render('unauthorized');
        }
        else {
            //TO DO Render contact page
            const contactData = await Contact.findByPk(req.params.id, {
                include: [
                    {
                        model: Contact,
                        attributes: ['first_name', 'last_name', 'email', 'company', 'phone_number']
                    },
                ],
            });

            const contact = contactData.get({ plain: true });

            res,status(200).render('contact', {
                ...contact,
                logged_in: req.session.logged_in
            });
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;