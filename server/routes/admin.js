const express = require('express');
const Slot = require('../models/Slot');
const Facility = require('../models/Facility');
const Session = require('../models/Session');
const authenticateAdmin = require('../middleware/authenticateAdmin');

const router = express.Router();

router.use(authenticateAdmin);
// GET /api/admin/occupancy — live occupancy across all facilities
router.get('/occupancy', async (req, res) => {
  try {
    const facilities = await Facility.find();

    const occupancy = await Promise.all(
      facilities.map(async (f) => {
        const total = await Slot.countDocuments({ facility: f._id });
        const occupied = await Slot.countDocuments({ facility: f._id, isOccupied: true });
        const evTotal = await Slot.countDocuments({ facility: f._id, isEV: true });
        const evOccupied = await Slot.countDocuments({ facility: f._id, isEV: true, isOccupied: true });

        return {
          facilityId: f._id,
          name: f.name,
          totalSlots: total,
          occupiedSlots: occupied,
          freeSlots: total - occupied,
          occupancyRate: total > 0 ? Math.round((occupied / total) * 100) : 0,
          evSlots: evTotal,
          evOccupied,
        };
      })
    );

    res.json(occupancy);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// GET /api/admin/revenue — total revenue from completed sessions, grouped by facility
router.get('/revenue', async (req, res) => {
  try {
    const revenue = await Session.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: '$facility',
          totalRevenue: { $sum: '$billAmount' },
          completedSessions: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'facilities',
          localField: '_id',
          foreignField: '_id',
          as: 'facilityInfo',
        },
      },
      { $unwind: '$facilityInfo' },
      {
        $project: {
          _id: 0,
          facilityId: '$_id',
          facilityName: '$facilityInfo.name',
          totalRevenue: 1,
          completedSessions: 1,
        },
      },
    ]);

    res.json(revenue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;