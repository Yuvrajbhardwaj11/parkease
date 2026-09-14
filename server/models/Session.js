const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    required: true,
  },
  facility: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Facility',
    required: true,
  },
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
    required: true,
  },
  slotId: {
    type: String,
    required: true,
  },
  entryTime: {
    type: Date,
    default: Date.now,
  },
  exitRequestTime: {
    type: Date,
  },
  billAmount: {
    type: Number,
  },
  exitTime: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['active', 'exit_requested', 'completed'],
    default: 'active',
  },
});

module.exports = mongoose.model('Session', sessionSchema);