const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = 'your_jwt_secret_key_here';

// Register logic
exports.register = async (req, res) => {
  try {
    const { contact, password, month, day, year, fullName, username } = req.body;

    if (!contact || !password || !fullName || !username) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const existingUser = User.findByContactOrUsername(username) || User.findByContactOrUsername(contact);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Encrypt password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = User.create({
      id: Date.now(),
      contact,
      password: hashedPassword,
      birthday: { month, day, year },
      fullName,
      username
    });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// Login logic
exports.login = async (req, res) => {
  try {
    const { loginKey, password } = req.body;

    const user = User.findByContactOrUsername(loginKey);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Sign JWT Token
    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { username: user.username, fullName: user.fullName }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};