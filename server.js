const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const stageRoutes = require('./routes/stageRoutes');
const setupSwagger = require('./swagger'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/stages', stageRoutes);

// ✅ Initialize Swagger BEFORE starting the server
// This ensures the route is registered correctly on Vercel
setupSwagger(app, PORT);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Export app for Vercel
module.exports = app;
