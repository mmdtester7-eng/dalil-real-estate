// admin.js

const express = require('express');
const router = express.Router();

// Endpoint for dashboard
router.get('/dashboard', (req, res) => {
    res.send('Admin Dashboard');
});

// Endpoint for property approval
router.post('/property-approval', (req, res) => {
    // Logic for property approval goes here
    res.send('Property Approval Logic');
});

module.exports = router;
