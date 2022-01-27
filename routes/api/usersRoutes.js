const router = require('express').Router();
const {
    getAllUsers,
    addUser,
    getUserById,
    updateUser,
    removeUser,
    addFriend,
    removeFriend
} = require('../../controllers/usersController');

router.route('/').get(getAllUsers).post(addUser);

router.route('/:usersId').get(getUserById).put(updateUser).delete(removeUser);

router.route('/:usersId/friends').post(addFriend);

router.route('/:usersId/friendsId').delete(removeFriend);

module.exports = router;