const mongoose = require('mongoose');

// Define the Property Schema
const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Property model
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;