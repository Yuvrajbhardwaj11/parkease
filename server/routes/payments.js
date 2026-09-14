const express = require('express');
const Payment = require('../models/Payment');
const Reservation = require('../models/Reservation');
const Facility = require('../models/Facility');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { reservationId, amount, method } = req.body;

    if (!reservationId || !amount || !method) {
      return res.status(400).json({ message: 'reservationId, amount, and method are required' });
    }

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    if (reservation.status !== 'pending') {
      return res.status(409).json({ message: `Reservation is already ${reservation.status}, cannot pay again` });
    }

    // Simulated gateway: always succeeds for now. Real Stripe/PSP call goes here later.
    const paymentSucceeded = true;

    const payment = new Payment({
      reservation: reservationId,
      amount,
      method,
      status: paymentSucceeded ? 'succeeded' : 'failed',
    });
    await payment.save();

    if (paymentSucceeded) {
      reservation.status = 'active';
      await reservation.save();
    } else {
      reservation.status = 'cancelled';
      await reservation.save();
      const facility = await Facility.findById(reservation.facility);
      facility.availableSlots += 1;
      await facility.save();
    }

    res.status(201).json({ payment, reservation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;