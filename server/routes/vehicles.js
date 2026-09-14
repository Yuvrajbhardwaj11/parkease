const express = require('express');
const Vehicle = require('../models/Vehicle');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { owner, plateNumber, type, isEV } = req.body;

    if (!owner || !plateNumber) {
      return res.status(400).json({ message: 'owner and plateNumber are required' });
    }

    const newVehicle = new Vehicle({ owner, plateNumber, type, isEV });
    await newVehicle.save();

    res.status(201).json(newVehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;