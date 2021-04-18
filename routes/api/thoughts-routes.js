const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought
} = require('../../controllers/thought-controller');
const { getUserById } = require('../../controllers/user-controller');

router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

  router
    .route('/:id')
    .get(getThoughtById);


module.exports = router;