const router = require('express').Router();
const { User } = require('../../models');

// TODO: Get Request for User Data
router.get('/:username', async (req, res) => {
    try {
        const findUser = await User.findOne({where: { username: req.params.username } });
        res.status(200).json(findUser);
    }
    catch (err){
        res.status(500).json(err);
    }
})


router.post('/:username', async (req, res) => {
    try {
        const findUser = await User.findOne({ where: { username: req.params.username } });
        const findEmail = await User.findOne({ where: { email: req.body.email}});
        if (findUser !== null) {
            console.log("username is taken");
            req.status(403).message("Username is taken");
        }
        else if (findEmail !== null) {
            console.log("email is taken");
            req.status(403).message("Email is taken");
        }
        else {
            console.log("username and email are unique");
            hasFirstname = req.body.first_name != null;
            hasLastname = req.body.last_name != null;
            hasEmail = req.body.email != null;
            hasPassword = req.body.password != null;
            if (hasFirstname && hasLastname && hasEmail && hasPassword) {
                const userData = await User.create({
                    username: req.params.username,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: req.body.password
                });
                req.session.save(() => {
                    req.session.user_id = userData.id;
                    req.session.username = userData.username;
                    req.session.logged_in = true;
                    req.session.cookie.maxAge = 600000 // 10 minutes
                    res.status(200).json(userData);
                });

            }
            else {
                res.status(400).message("Body does not have all necessary information.")
            }


        }
    } catch (err) {
        res.status(500).json(err);
    }
});




// Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.username = userData.username;
            req.session.cookie.maxAge = 600000 // 10 minutes
            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
