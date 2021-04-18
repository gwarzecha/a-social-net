const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtsRoutes = require('./thoughts-routes');

// add the prefix of /users to each route created in user-routes.js
router.use('/users', userRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;