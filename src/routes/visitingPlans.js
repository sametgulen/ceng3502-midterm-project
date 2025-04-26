const express = require('express');
const router = express.Router();
const crypto = require('crypto'); // For generating unique IDs

// In-memory store for visiting plans (Replace with database logic later)
let visitingPlans = [];

// GET /api/visiting-plans - Retrieve all visiting plans
router.get('/', (req, res) => {
    try {
        res.status(200).json(visitingPlans);
    } catch (error) {
        console.error("Error fetching visiting plans:", error);
        res.status(500).json({ message: "Error fetching visiting plans", error: error.message });
    }
});

// POST /api/visiting-plans - Create a new visiting plan
router.post('/', (req, res) => {
    try {
        const { plan_name, visitor_name, general_notes, landmarks } = req.body;

        // Validate required fields
        if (!plan_name || !visitor_name || !landmarks || !Array.isArray(landmarks)) {
            return res.status(400).json({ message: "Missing required fields: plan_name, visitor_name, and landmarks array." });
        }

        // Create a new visiting plan
        const newPlan = {
            _id: crypto.randomUUID(), // Generate a unique ID
            plan_name,
            visitor_name,
            general_notes: general_notes || '',
            landmarks: landmarks.map(lm => ({
                landmark_id: lm.landmark_id,
                name: lm.name || 'Unknown Landmark',
                category: lm.category,
                notes: lm.notes || ''
            })),
            created_at: new Date()
        };

        visitingPlans.push(newPlan);
        console.log("Created new plan:", newPlan);
        res.status(201).json(newPlan);

    } catch (error) {
        console.error("Error creating visiting plan:", error);
        res.status(500).json({ message: "Error creating visiting plan", error: error.message });
    }
});

// DELETE /api/visiting-plans/:id - Delete a visiting plan by ID
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const initialLength = visitingPlans.length;
        visitingPlans = visitingPlans.filter(plan => plan._id !== id);

        if (visitingPlans.length === initialLength) {
            return res.status(404).json({ message: "Visiting plan not found with the specified ID." });
        }

        console.log("Deleted plan with ID:", id);
        res.status(204).send();

    } catch (error) {
        console.error("Error deleting visiting plan:", error);
        res.status(500).json({ message: "Error deleting visiting plan", error: error.message });
    }
});

module.exports = router;