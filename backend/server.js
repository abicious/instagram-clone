const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Explicitly handle OPTIONS preflight
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

const users = [];

app.get('/', (req, res) => {
  res.send("Backend server is running");
});

app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  users.push({ username, email, password });
  return res.status(201).json({ message: "Registered successfully!", user: { username } });
});

app.post('/api/login', (req, res) => {
  const { loginKey, password } = req.body;

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

if (process.env.NODE_ENV !== 'production') {
  app.listen(5000, () => console.log('Server running on port 5000'));
}

module.exports = app;