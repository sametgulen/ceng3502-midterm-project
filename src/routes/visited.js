const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { visitedLandmarks, landmarks } = require('../models/storage');

// Store visiting plans
const visitingPlans = new Map();

// GET all visiting plans
router.get('/plans', (req, res) => {
    try {
        const plans = Array.from(visitingPlans.values()).map(plan => ({
            ...plan,
            landmarks: plan.landmarks.map(item => {
                const landmark = landmarks.get(item.landmark_id);
                return {
                    ...item,
                    name: landmark ? landmark.name : 'Unknown Landmark',
                    category: landmark ? landmark.category : 'Unknown'
                };
            })
        }));
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving visiting plans', error: error.message });
    }
});

// POST new visiting plan
router.post('/plan', (req, res) => {
    try {
        const { plan_name, visitor_name, general_notes, landmarks: planLandmarks } = req.body;

        if (!plan_name || !visitor_name || !planLandmarks || !Array.isArray(planLandmarks)) {
            return res.status(400).json({ message: 'Invalid plan data' });
        }

        const planId = uuidv4();
        const newPlan = {
            plan_id: planId,
            plan_name,
            visitor_name,
            general_notes,
            landmarks: planLandmarks,
            created_date: new Date().toISOString()
        };

        visitingPlans.set(planId, newPlan);
        res.status(201).json(newPlan);
    } catch (error) {
        res.status(500).json({ message: 'Error creating visiting plan', error: error.message });
    }
});

// GET specific visiting plan
router.get('/plan/:id', (req, res) => {
    try {
        const plan = visitingPlans.get(req.params.id);
        if (!plan) {
            return res.status(404).json({ message: 'Visiting plan not found' });
        }
        res.json(plan);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving visiting plan', error: error.message });
    }
});

// DELETE visiting plan
router.delete('/plan/:id', (req, res) => {
    try {
        const planId = req.params.id;
        if (!visitingPlans.has(planId)) {
            return res.status(404).json({ message: 'Visiting plan not found' });
        }
        visitingPlans.delete(planId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting visiting plan', error: error.message });
    }
});

// GET all visited landmarks
router.get('/', (req, res) => {
    try {
        const visitedList = Array.from(visitedLandmarks.values()).map(visit => {
            const landmark = landmarks.get(visit.landmark_id);
            return {
                ...visit,
                landmark: landmark || { message: 'Landmark not found' }
            };
        });
        res.json(visitedList);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving visited landmarks', error: error.message });
    }
});

// GET specific visited landmark
router.get('/:id', (req, res) => {
    try {
        const visited = visitedLandmarks.get(req.params.id);
        if (!visited) {
            return res.status(404).json({ message: 'Visit record not found' });
        }
        const landmark = landmarks.get(visited.landmark_id);
        res.json({
            ...visited,
            landmark: landmark || { message: 'Landmark not found' }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving visit record', error: error.message });
    }
});

// PUT update visited landmark
router.put('/:id', (req, res) => {
    try {
        const id = req.params.id;
        if (!visitedLandmarks.has(id)) {
            return res.status(404).json({ message: 'Visit record not found' });
        }
        
        const existingVisit = visitedLandmarks.get(id);
        const updatedVisit = {
            ...existingVisit,
            ...req.body,
            id,
            updatedAt: new Date().toISOString()
        };

        visitedLandmarks.set(id, updatedVisit);
        
        const landmark = landmarks.get(updatedVisit.landmark_id);
        res.json({
            ...updatedVisit,
            landmark: landmark || { message: 'Landmark not found' }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating visit record', error: error.message });
    }
});

// DELETE visited landmark
router.delete('/:id', (req, res) => {
    try {
        const id = req.params.id;
        if (!visitedLandmarks.has(id)) {
            return res.status(404).json({ message: 'Visit record not found' });
        }
        visitedLandmarks.delete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting visit record', error: error.message });
    }
});

module.exports = router; 