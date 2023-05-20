const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');
const UserRepository = require('../models/userRepository');
const AdminController = require('../controllers/AdminController');
const database = require('../db/databaseConfig');
const admin=require("../middleware/admin");
const {
  registerValidationRules,
  validateRegister,
} = require('../validation/inputValidation');

const adminRouter = express.Router();

const userRepository = new UserRepository(database); 
const adminController = new AdminController(userRepository); 

// Admin routes
adminRouter.post(
  '/users',
  admin,
  registerValidationRules,
  validateRegister,
  adminController.createUser.bind(adminController)
); // bind the createUser method to the adminController instance
adminRouter.put('/users/:id', admin, adminController.updateUser.bind(adminController)); 
adminRouter.delete('/users/:id', admin, adminController.deleteUser.bind(adminController)); 
adminRouter.get('/users', admin, adminController.getAllUsers.bind(adminController)); 
adminRouter.get('/users/:id', admin, adminController.getUserById.bind(adminController)); 
module.exports = adminRouter;