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
  startDate: String,       // ✅ Fecha directa
  endDate: String,         // ✅ Fecha directa
  phoneNumber: String,     // ✅ Teléfono del propietario

  // Opcional: por compatibilidad con estructuras anteriores
  availability: {
    startDate: String,
    endDate: String
  }

}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);
