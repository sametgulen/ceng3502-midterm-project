const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Import routes
const landmarkRoutes = require('./routes/landmarks');
const visitedRoutes = require('./routes/visited');
const visitingPlanRoutes = require('./routes/visitingPlans');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/landmarks', landmarkRoutes);
app.use('/api/visited', visitedRoutes);
app.use('/api/visiting-plans', visitingPlanRoutes);

// Serve index.html for any other GET request not handled by API routes
app.get('*', (req, res) => {
    // Avoid sending HTML for API-like paths that weren't matched
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ message: 'API endpoint not found' });
    }
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 