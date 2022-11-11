const router = require('express').Router();

//Used same req. from user-controller
const {
    createUser,
    getAllUsers,
    getUsersById,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller')

// Routes to GET, POST, PUT, and DELETE 
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUsersById).put(updateUser).delete(deleteUser);

module.exports = router;