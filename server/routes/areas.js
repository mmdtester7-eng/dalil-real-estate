// Import necessary modules
const express = require('express');
const router = express.Router();

// Mock data
let areas = [];

// Endpoint to get all areas
router.get('/areas', (req, res) => {
    res.status(200).json(areas);
});

// Endpoint to get a specific area by ID
router.get('/areas/:id', (req, res) => {
    const area = areas.find(a => a.id === parseInt(req.params.id));
    if (!area) return res.status(404).send('Area not found.');
    res.status(200).json(area);
});

// Endpoint to create a new area
router.post('/areas', (req, res) => {
    const area = {
        id: areas.length + 1,
        name: req.body.name
    };
    areas.push(area);
    res.status(201).json(area);
});

// Endpoint to update an existing area
router.put('/areas/:id', (req, res) => {
    const area = areas.find(a => a.id === parseInt(req.params.id));
    if (!area) return res.status(404).send('Area not found.');

    area.name = req.body.name;
    res.status(200).json(area);
});

// Endpoint to delete an area
router.delete('/areas/:id', (req, res) => {
    const areaIndex = areas.findIndex(a => a.id === parseInt(req.params.id));
    if (areaIndex === -1) return res.status(404).send('Area not found.');

    areas.splice(areaIndex, 1);
    res.status(204).send();
});

module.exports = router;