const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Import routes for different functionalities
const landmarkRoutes = require('./routes/landmarks');
const visitedRoutes = require('./routes/visited');
const visitingPlanRoutes = require('./routes/visitingPlans');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// API routes
app.use('/api/landmarks', landmarkRoutes); // Routes for landmarks
app.use('/api/visited', visitedRoutes); // Routes for visited landmarks
app.use('/api/visiting-plans', visitingPlanRoutes); // Routes for visiting plans

// Fallback route to serve the frontend
app.get('*', (req, res) => {
    // Return 404 for unmatched API routes
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ message: 'API endpoint not found' });
    }
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});