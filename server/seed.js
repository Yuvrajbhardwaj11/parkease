require('dotenv').config();
const mongoose = require('mongoose');
const Slot = require('./models/Slot');

const facilityIds = [
  '6a8211cb6139bd7fcda3fb50', // Piazza Navona Garage
  '6a8211d06139bd7fcda3fb51', // Trastevere Central Park
  '6a8211d56139bd7fcda3fb52', // Termini Station Deck
];

async function seedSlots() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected for seeding...');

  await Slot.deleteMany({ facility: { $in: facilityIds } });

  const slots = [];

  for (const facilityId of facilityIds) {
    let counter = 1;
    for (let floor = 1; floor <= 4; floor++) {
      for (let spot = 1; spot <= 5; spot++) {
        slots.push({
          facility: facilityId,
          floor,
          slotNumber: String(spot),
          isEV: counter % 5 === 0,
          distanceFromEntrance: floor * 10 + spot,
          isOccupied: false,
        });
        counter++;
      }
    }
  }

  await Slot.insertMany(slots);
  console.log(`Seeded ${slots.length} slots across ${facilityIds.length} facilities`);

  await mongoose.disconnect();
}

seedSlots().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});