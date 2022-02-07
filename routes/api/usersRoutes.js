const router = require('express').Router();
const {
    getAllUsers,
    addUser,
    getUserById,
    updateUser,
    removeUser,
} = require('../../controllers/usersController');

router.route('/').get(getAllUsers).post(addUser);

router.route('/:usersId').get(getUserById).put(updateUser).delete(removeUser);

module.exports = router;