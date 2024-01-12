const router = require('express').Router();
const userRoutes = require('./userRoutes');
const contactRoutes = require('./contactRoutes');
const noteRoutes = require('./noteRoutes');

router.use('/user', userRoutes);
router.use('/contact', contactRoutes);
router.use('/note', noteRoutes);


module.exports = router;