const router = require('express').Router();

const apiRoutes = require('./api');
const usernameRoutes = require('./usernameRoutes');

router.use('/', usernameRoutes);
router.use('/api', apiRoutes);

module.exports = router;