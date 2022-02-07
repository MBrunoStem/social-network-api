const router = require('express').Router();
const {
    getAllThoughts,
    addThought,
    getThoughtById,
    updateThought,
    removeThought,
} = require('../../controllers/thoughtsController');

router.route('/').get(getAllThoughts).post(addThought);

router.route('/:thoughtsId').get(getThoughtById).put(updateThought).delete(removeThought);

module.exports = router;