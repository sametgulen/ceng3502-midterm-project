const express = require('express');
const router = express.Router();
const { landmarks } = require('../models/storage');

// GET all landmarks
router.get('/', (req, res) => {
    try {
        const landmarkList = Array.from(landmarks.values());
        res.json(landmarkList);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving landmarks', error: error.message });
    }
});

// GET specific landmark
router.get('/:id', (req, res) => {
    try {
        const landmark = landmarks.get(req.params.id);
        if (!landmark) {
            return res.status(404).json({ message: 'Landmark not found' });
        }
        res.json(landmark);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving landmark', error: error.message });
    }
});

// POST new landmark
router.post('/', (req, res) => {
    try {
        const { id, name, location, description, notes, category } = req.body;

        if (!name || !location || !id) {
            return res.status(400).json({ message: 'ID, name, and location are required' });
        }

        // Check if ID already exists
        if (landmarks.has(id)) {
            return res.status(400).json({ message: 'A landmark with this ID already exists' });
        }

        const newLandmark = {
            id,
            name,
            location,
            description: description || '',
            notes: notes || '',
            category: category || 'uncategorized',
            visited: false,
            createdAt: new Date().toISOString()
        };

        landmarks.set(id, newLandmark);
        res.status(201).json(newLandmark);
    } catch (error) {
        res.status(500).json({ message: 'Error creating landmark', error: error.message });
    }
});

// PUT update landmark
router.put('/:id', (req, res) => {
    try {
        const id = req.params.id;
        if (!landmarks.has(id)) {
            return res.status(404).json({ message: 'Landmark not found' });
        }
        
        const existingLandmark = landmarks.get(id);
        const updatedLandmark = {
            ...existingLandmark,
            ...req.body,
            id,
            updatedAt: new Date().toISOString()
        };

        // If marking as visited, add visited date
        if (req.body.visited && !existingLandmark.visited) {
            updatedLandmark.visited_date = new Date().toISOString();
        }

        landmarks.set(id, updatedLandmark);
        res.json(updatedLandmark);
    } catch (error) {
        res.status(500).json({ message: 'Error updating landmark', error: error.message });
    }
});

// DELETE landmark
router.delete('/:id', (req, res) => {
    try {
        const id = req.params.id;
        if (!landmarks.has(id)) {
            return res.status(404).json({ message: 'Landmark not found' });
        }
        landmarks.delete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting landmark', error: error.message });
    }
});

module.exports = router; 