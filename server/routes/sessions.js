const express = require('express');
const Session = require('../models/Session');
const Reservation = require('../models/Reservation');
const Slot = require('../models/Slot');
const Facility = require('../models/Facility');

const router = express.Router();

// POST /api/sessions/entry — simulated ANPR trigger, allocates the nearest matching slot
router.post('/entry', async (req, res) => {
  try {
    const { reservationId, facilityId, preferEV } = req.body;

    if (!reservationId || !facilityId) {
      return res.status(400).json({ message: 'reservationId and facilityId are required' });
    }

    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    if (reservation.status !== 'active') {
      return res.status(409).json({ message: `Reservation is ${reservation.status}, not ready for entry` });
    }

    const filter = { facility: facilityId, isOccupied: false };
    if (preferEV === true) {
      filter.isEV = true;
    }

    let slot = await Slot.findOne(filter).sort({ distanceFromEntrance: 1 });

    if (!slot && preferEV === true) {
      slot = await Slot.findOne({ facility: facilityId, isOccupied: false }).sort({ distanceFromEntrance: 1 });
    }

    if (!slot) {
      return res.status(409).json({ message: 'No available slots at this facility' });
    }

    slot.isOccupied = true;
    await slot.save();

    const session = new Session({
      reservation: reservation._id,
      facility: facilityId,
      slot: slot._id,
      slotId: `F${slot.floor}-${slot.slotNumber}`,
    });
    await session.save();

    res.status(201).json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/sessions/:id/slot — polling fallback
router.get('/:id/slot', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'No slot allocated yet' });
    }
    res.json({
      sessionId: session._id,
      slotId: session.slotId,
      slot: session.slot,
      facilityId: session.facility,
      entryTime: session.entryTime,
      status: session.status,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/sessions/:id/exit-request — driver taps "leave", bill gets calculated
router.post('/:id/exit-request', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate('facility');
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    if (session.status !== 'active') {
      return res.status(409).json({ message: `Session is already ${session.status}` });
    }

    const now = new Date();
    const minutesParked = Math.max(1, Math.ceil((now - session.entryTime) / 60000));
    const rate = session.facility.ratePerHour;
    const billAmount = Math.round((minutesParked / 60) * rate * 100) / 100;

    session.status = 'exit_requested';
    session.exitRequestTime = now;
    session.billAmount = billAmount;
    await session.save();

    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/sessions/:id/bill — read the computed bill
router.get('/:id/bill', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    if (session.billAmount == null) {
      return res.status(409).json({ message: 'Exit not yet requested, no bill calculated' });
    }
    res.json({
      sessionId: session._id,
      entryTime: session.entryTime,
      exitRequestTime: session.exitRequestTime,
      billAmount: session.billAmount,
      status: session.status,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/sessions/:id/release — after payment + exit ANPR scan, free the slot
router.post('/:id/release', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    if (session.status !== 'exit_requested') {
      return res.status(409).json({ message: `Session must be exit_requested to release, currently ${session.status}` });
    }

    const slot = await Slot.findById(session.slot);
    slot.isOccupied = false;
    await slot.save();

    const facility = await Facility.findById(session.facility);
    facility.availableSlots += 1;
    await facility.save();

    session.status = 'completed';
    session.exitTime = new Date();
    await session.save();

    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
