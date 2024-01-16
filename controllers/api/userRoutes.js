const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// Delete user
router.delete('/:username', withAuth, async (req, res) => {
    try {

        if (!req.session.username) {
            res.status(401).json("You cannot delete an account you aren't logged into")
        }

        const findUser = await User.findOne({ where: { username: req.params.username } });
        if (findUser == null) {
            res.status(404).json("Cannot find user")
        }
        else {
            await findUser.destroy();
            req.session.destroy(() => {
                res.status(204).end();
            });
        }
    }
    catch (err) {
        res.status(500).json(err.message)
    }
})

// Update User data
router.put('/', withAuth, async (req, res) => {
    try {
        if (!req.session.username) {
            res.status(401).json("You cannot update an account you aren't logged into")
        }

        const findUser = await User.findOne({ where: { username: req.params.username } });
        if (findUser == null) {
            res.status(404).json("Cannot find user")
        }
        else {
            if (req.body.username !== null) {
                findUser.username = req.body.username;
            }
            if (req.body.first_name !== null) {
                findUser.first_name = req.body.first_name;
            }
            if (req.body.last_name !== null) {
                findUser.last_name = req.body.last_name;
            }
            if (req.body.email !== null) {
                findUser.email = req.body.email;
            }
            if (req.body.password !== null) {
                findUser.password = req.body.password;
            }
            await findUser.save();
            res.status(202).json("Update Successful!")
        }
    }
    catch (err) {
        res.status(500).json(err.message)
    }
})
// Get User Info
router.get('/', withAuth, async (req, res) => {
    try {
        if (!req.session.username) {
            res.status(401).json
        }
        const findUser = await User.findOne({ where: { username: req.params.username } });
        if (findUser == null) {
            res.status(404).json("Cannot find user")
        }
        else {
            res.status(200).json(findUser);
        }
    }
    catch (err) {
        res.status(500).json(err.message);
    }
})

// Create User
router.post('/', async (req, res) => {
    try {
        const findUser = await User.findOne({ where: { username: req.body.username } });
        const findEmail = await User.findOne({ where: { email: req.body.email } });
        if (findUser !== null) {
            res.status(403).json("Username is taken");
        }
        else if (findEmail !== null) {
            res.status(403).json("Email is taken");
        }
        else {
            hasFirstname = req.body.first_name != null;
            hasLastname = req.body.last_name != null;
            hasEmail = req.body.email != null;
            hasPassword = req.body.password != null;
            if (hasFirstname && hasLastname && hasEmail && hasPassword) {
                const userData = await User.create({
                    username: req.body.username,
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
                    res.status(201).json("Creation Successful!");
                });

            }
            else {
                res.status(400).json("Body does not have all necessary information.")
            }


        }
    } catch (err) {
        res.status(500).json(err.message);
        console.error(err.message)
    }
});




// Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.username = userData.username;
            req.session.cookie.maxAge = 600000 // 10 minutes
            res.json({ user: userData, message: 'You are now logged in!' });
        });

    }
    catch (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ message: 'Login failed. Please try again later.' });
    }
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

module.exports = router;
