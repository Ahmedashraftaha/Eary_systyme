const express = require('express');
const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');
const UserRepository = require('../models/userRepository');
const AdminController = require('../controllers/AdminController');
const { body, validationResult } = require('express-validator');
const database = require('../db/databaseConfig');
const authorized = require("../middleware/authorized ")
const userRepository = new UserRepository(database);
const userController = new UserController(userRepository);
const userRouter = express.Router();

userRouter.get('/me', authorized, userController.showUserProfile.bind(userController));

userRouter.put('/me', authorized, [
  body('name')
    .notEmpty()
    .isLength({ min: 3, max: 30 })
    .withMessage('Name must be between 3 and 30 characters'),
  body('email')
    .notEmpty()
    .isEmail()
    .withMessage('Invalid email address'),
  body('phone')
    .notEmpty()
    .isLength({ min: 8, max: 15 })
    .withMessage('Phone number must be between 10 and 15 characters')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
}, userController.updateProfile.bind(userController));

module.exports = userRouter;