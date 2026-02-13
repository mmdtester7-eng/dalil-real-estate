const express = require('express');
const router = express.Router();

// Mock database for properties
let properties = [];

// Create a new property
router.post('/', (req, res) => {
    const { name, location, price } = req.body;
    const newProperty = { id: properties.length + 1, name, location, price };
    properties.push(newProperty);
    res.status(201).json(newProperty);
});

// Read all properties
router.get('/', (req, res) => {
    res.json(properties);
});

// Read a specific property
router.get('/:id', (req, res) => {
    const property = properties.find(p => p.id === parseInt(req.params.id));
    if (!property) return res.status(404).send('Property not found.');
    res.json(property);
});

// Update a property
router.put('/:id', (req, res) => {
    const property = properties.find(p => p.id === parseInt(req.params.id));
    if (!property) return res.status(404).send('Property not found.');

    const { name, location, price } = req.body;
    property.name = name || property.name;
    property.location = location || property.location;
    property.price = price || property.price;

    res.json(property);
});

// Delete a property
router.delete('/:id', (req, res) => {
    const propertyIndex = properties.findIndex(p => p.id === parseInt(req.params.id));
    if (propertyIndex === -1) return res.status(404).send('Property not found.');
    properties.splice(propertyIndex, 1);
    res.status(204).send();
});

module.exports = router;