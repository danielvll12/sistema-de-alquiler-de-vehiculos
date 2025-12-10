const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  brand: String,
  model: String,
  year: Number,
  pricePerDay: Number,
  location: String,

  /** ARRAY de URLs de imágenes */
  images: {
    type: [String],
    default: ["https://via.placeholder.com/500?text=Vehículo"] // Imagen por defecto si no se sube ninguna
  },

  description: String,
  features: {
    type: [String],
    default: []
  },

  startDate: String,
  phoneNumber: String,

}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
