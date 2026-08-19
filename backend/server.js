  const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// Mount authentication routes under /api
app.use('/api', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000 with MVC pattern'));