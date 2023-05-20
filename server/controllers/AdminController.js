const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User=require('../models/userClass')
class AdminController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(req, res) {
    const { name, email, password, phone, status, role } = req.body;
  
   
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }
  
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const token = crypto.randomBytes(20).toString('hex');
    const user = new User(null, name, email, hashedPassword, phone, status, role, token);
    const createdUser = await this.userRepository.createUser(user);
    res.json(createdUser);
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password, phone, status, role } = req.body;
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    if (name) {
      user.setName(name);
    }
    if (email) {
      user.setEmail(email);
    }
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.setPassword(hashedPassword);
    }
    if (phone) {
      user.setPhone(phone);
    }
    if (status) {
      user.setStatus(status);
    }
    if (role) {
      user.setRole(role);
    }
    const updatedUser = await this.userRepository.updateUser(user);
    res.json(updatedUser);
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    await this.userRepository.deleteUser(id);
    res.status(200).json("deleted Succesfully");
  }

  async getUserById(req, res) {
    const { id } = req.params;
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  }

  async getAllUsers(req, res) {
    const users = await this.userRepository.getAllUsers();
    res.json(users);
  }

  async getUserByToken(req, res) {
    const { token } = req.params;
    const user = await this.userRepository.getUserByToken(token);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  }
}

module.exports = AdminController;