const express = require('express');
const AuthController = require('../controllers/authController');
const UserRepository = require('../models/userRepository');
const database = require('../db/databaseConfig');
const { registerValidationRules, loginValidationRules, validateRegister, validateLogin } = require('../validation/inputValidation');

const authRouter = express.Router();

const userRepository = new UserRepository(database);
const authController = new AuthController(userRepository);

authRouter.post('/register', registerValidationRules, validateRegister, authController.register.bind(authController));
authRouter.post('/login', loginValidationRules, validateLogin, authController.login.bind(authController));

module.exports = authRouter;