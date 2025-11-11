const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['office','industrial','residential','agricultural','commercial','recreational'], default: 'residential' },
  category: { type: String, enum: ['buy','rent','new','commercial','plots'], default: 'buy' },
  price: { type: Number, required: true },
  area: { type: Number, required: true },
  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  amenities: {
    parking: { type: Boolean, default: false },
    garden: { type: Boolean, default: false },
    pool: { type: Boolean, default: false },
    balcony: { type: Boolean, default: false }
  },
  isNegotiable: { type: Boolean, default: false },
  images: [String],
  documents: [String],
  status: { type: String, enum: ['active', 'sold', 'pending'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
