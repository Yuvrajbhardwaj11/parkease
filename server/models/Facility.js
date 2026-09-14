const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  ratePerHour: {
    type: Number,
    required: true,
  },
  totalSlots: {
    type: Number,
    required: true,
  },
  availableSlots: {
    type: Number,
    required: true,
  },
  hasEV: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
    operatingHours: {
    open: { type: String, default: '00:00' },
    close: { type: String, default: '23:59' },
  },
  closedDates: [
    {
      type: String,
    },
  ],
  maintenanceMode: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Facility', facilitySchema);