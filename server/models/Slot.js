const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  facility: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Facility',
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
  slotNumber: {
    type: String,
    required: true,
  },
  isEV: {
    type: Boolean,
    default: false,
  },
  distanceFromEntrance: {
    type: Number,
    required: true,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Slot', slotSchema);