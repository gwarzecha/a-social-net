const router = require('express').Router();
const userRoutes = require('./user-routes');

// add the prefix of /users to each route created in user-routes.js
router.use('/users', userRoutes);

module.exports = router;