const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thought-controller');
const { getUserById } = require('../../controllers/user-controller');

router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThought);

router
  .route('/:thoughtId/reactions')
  .post(createReaction);

router  
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);
  

module.exports = router;