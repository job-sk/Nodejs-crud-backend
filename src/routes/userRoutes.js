const express = require('express');
const router = express.Router();
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser
  } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

router.get('/', validateToken, getUsers);              // GET /api/users
router.post('/', validateToken, createUser);           // POST /api/users
router.put('/:id', validateToken, updateUser);         // PUT /api/users/:id
router.delete('/:id', validateToken, deleteUser);      // DELETE /api/users/:id

module.exports = router;
