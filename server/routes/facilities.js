const express = require('express');
const Facility = require('../models/Facility');
const Slot = require('../models/Slot');
const router = express.Router();

// Create a facility (you'll use this to seed test data)
router.post('/', async (req, res) => {
  try {
    const facility = new Facility(req.body);
    await facility.save();
    res.status(201).json(facility);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// List all facilities, sorted by most available slots first
// Haversine formula: calculates distance in km between two lat/lng points
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const toRad = (val) => (val * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

router.get('/', async (req, res) => {
  try {
    const { lat, lng, evOnly } = req.query;

    // No location given → admin view, everything, unranked
    if (!lat || !lng) {
      const all = await Facility.find();
      return res.json(all);
    }

    // Customer view → rank by distance + availability
    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    let facilities = await Facility.find({ isActive: true, availableSlots: { $gt: 0 } });

    if (evOnly === 'true') {
      facilities = facilities.filter((f) => f.hasEV);
    }

    const ranked = facilities
      .map((f) => {
        const distanceKm = getDistanceKm(userLat, userLng, f.latitude, f.longitude);
        return { ...f.toObject(), distanceKm: Math.round(distanceKm * 100) / 100 };
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);

    res.json(ranked);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// GET /api/facilities/:id — read one facility by id
router.get('/:id', async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    res.json(facility);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// PATCH /api/facilities/:id — admin updates a facility's settings
router.patch('/:id', async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    const allowedFields = [
      'name', 'address', 'ratePerHour', 'hasEV', 'isActive',
      'operatingHours', 'closedDates', 'maintenanceMode',
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        facility[field] = req.body[field];
      }
    });

    await facility.save();
    res.json(facility);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/facilities/:id/slots/bulk — admin uploads many slots at once
router.post('/:id/slots/bulk', async (req, res) => {
  try {
    const facilityId = req.params.id;
    const { slots } = req.body;

    if (!Array.isArray(slots) || slots.length === 0) {
      return res.status(400).json({ message: 'slots must be a non-empty array' });
    }

    const facility = await Facility.findById(facilityId);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    const slotDocs = slots.map((s) => ({
      facility: facilityId,
      floor: s.floor,
      slotNumber: s.slotNumber,
      isEV: s.isEV || false,
      distanceFromEntrance: s.distanceFromEntrance,
      isOccupied: false,
    }));

    const inserted = await Slot.insertMany(slotDocs);

    facility.totalSlots = await Slot.countDocuments({ facility: facilityId });
    facility.availableSlots = await Slot.countDocuments({ facility: facilityId, isOccupied: false });
    await facility.save();

    res.status(201).json({ insertedCount: inserted.length, facility });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;