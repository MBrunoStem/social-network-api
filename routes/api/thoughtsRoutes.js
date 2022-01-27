const router = require('express').Router();
const {
    getAllThoughts,
    addThought,
    getThoughtById,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtsController');

router.route('/').get(getAllThoughts).post(addThought);

router.route('/:thoughtsId').get(getThoughtById).put(updateThought).delete(removeThought);

router.route('/:thoughtsId/reactions').post(addReaction);

router.route('/:thoughtsId/reactionsId').delete(removeReaction);

module.exports = router;