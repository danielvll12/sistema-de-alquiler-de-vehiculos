const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  brand: String,
  model: String,
  year: String,
  pricePerDay: String,
  location: String,
  imageUrl: String,
  description: String,
  features: {
    type: [String],
    default: []
  },
  startDate: String,       // ✅ Solo esta fecha se mantiene
  phoneNumber: String,
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
