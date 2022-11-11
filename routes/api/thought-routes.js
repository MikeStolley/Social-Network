const router = require('express').Router();

const {
    createThoughts,
    getThoughts,
    getThoughtsById,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// GET PUT DELETE and POST thoughts, whether all or by ID
router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts);
router.route('/').get(getThoughts);
router.route('/:userId').post(createThoughts);

// POST and DELETE Reactions
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
