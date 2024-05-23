const express = require('express');
const { verifyToken } = require('../controller/auth.controller');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controller/user.controller');

const UserRouter = express.Router();

UserRouter.post('/create', verifyToken, createUser);
UserRouter.get('/all', verifyToken, getUsers);
UserRouter.get('/:id', verifyToken, getUserById);
UserRouter.put('/update/:id', verifyToken, updateUser);
UserRouter.delete('/delete/:id', verifyToken, deleteUser);

module.exports = UserRouter;