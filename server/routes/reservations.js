const express = require('express');
const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');
const Facility = require('../models/Facility');

const router = express.Router();

router.post('/', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { user, vehicle, facility } = req.body;

    if (!user || !vehicle || !facility) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'user, vehicle, and facility are required' });
    }

    const facilityDoc = await Facility.findById(facility).session(session);
    if (!facilityDoc || facilityDoc.availableSlots <= 0) {
      await session.abortTransaction();
      return res.status(409).json({ message: 'No capacity available at this facility' });
    }

    facilityDoc.availableSlots -= 1;
    await facilityDoc.save({ session });

    const reservation = new Reservation({ user, vehicle, facility, status: 'pending' });
    await reservation.save({ session });

    await session.commitTransaction();
    res.status(201).json(reservation);
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  } finally {
    session.endSession();
  }
});

module.exports = router;