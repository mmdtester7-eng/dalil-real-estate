const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

areaSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Area', areaSchema);