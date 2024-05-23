const express = require('express');
const { register, login } = require('../controller/auth.controller');
const router = express.Router();
const AuthRouter = router

AuthRouter.post('/register', register);
AuthRouter.post('/login', login);

module.exports = AuthRouter;
  