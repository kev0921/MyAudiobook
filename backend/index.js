const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const audiobookRoutes = require('./routes/audiobook');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Sample route
app.use('/api/audiobooks', audiobookRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});