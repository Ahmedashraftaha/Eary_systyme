const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/userClass');

class AuthController {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(req, res) {
    const { name, email, password, phone } = req.body;
  
    // Check that all required fields are present
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    // Check if the email already exists in the database
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }
  
    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    // Generate a unique token using crypto
    const token = crypto.randomBytes(16).toString('hex');
  
    // Create a new User object with the provided data
    const user = new User(null, name, email, hashedPassword, phone, '0', '0', token);
  
    // Save the user to the database
    const createdUser = await this.userRepository.createUser(user);
  
    // Return a response indicating success
    res.status(201).json({ message: 'User created successfully' });
  }

  async login(req, res) {
    console.log("here")
    const { email, password } = req.body;
  
    // Check that both email and password are present
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing email or password' });
    }
  
    // Retrieve the user from the database using the provided email
    const user = await this.userRepository.getUserByEmail(email);
  
    // If the user is not found, return an error response
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
    // Check if the user's status is "0" (not approved)
    if (user.status === '0') {
      return res.status(401).json({ error: 'Your account has not been approved yet' });
    }
  
    // Compare the provided password with the hashed password stored in the user object
    const passwordMatch = await bcrypt.compare(password, user.password);
  
    // If the passwords don't match, return an error response
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  
 const token = user.token;
    
    // Return a response with the generated token
    res.status(200).json({ token ,msg:"Now you are Logged" });
  }
}
module.exports = AuthController;