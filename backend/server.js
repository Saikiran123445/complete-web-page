const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const galleryRoutes = require('./routes/gallery');
const servicesRoutes = require('./routes/services');
const inquiryRoutes = require('./routes/inquiry');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/gallery', galleryRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/inquiry', inquiryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
