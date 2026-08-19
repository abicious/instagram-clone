const express = require('express');
const router = express.Router();

// Temporary in-memory user storage
const users = [];

// REGISTER ROUTE
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const existingUser = users.find(u => u.username === username || u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = { username, email, password };
  users.push(newUser);

  return res.status(201).json({ 
    message: "User registered successfully", 
    user: { username: newUser.username } 
  });
});

// LOGIN ROUTE
router.post('/login', (req, res) => {
  const { loginKey, password } = req.body;

  // Checks match against username OR email
  const user = users.find(
    u => (u.username === loginKey || u.email === loginKey) && u.password === password
  );

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  return res.status(200).json({
    token: "mock-jwt-token-12345",
    user: { username: user.username }
  });
});

module.exports = router;