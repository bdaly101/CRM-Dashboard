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

router.get('/:username/dashboard', async (req, res) => {
    try {
       //TO DO: Render User dashboard
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:username/contact/:id', async (req, res) => {
    try {
        // Check right user is logged in
        if (req.params.username !== req.session.username) {
            res.status(401).render('unauthorized');
        }
        else {
            //TO DO Render contact page
            res.status(200).render(...)
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;