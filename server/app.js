const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const authRoutes = require('./routes/auth');
const vehicleRoutes = require('./routes/vehicles');
const facilityRoutes = require('./routes/facilities');
const reservationRoutes = require('./routes/reservations');
const paymentRoutes = require('./routes/payments');
const sessionRoutes = require('./routes/sessions');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());
app.use(express.json());

// Make sure the DB connection (cached after the first call) is ready
// before any route handler that needs it runs. This also means a cold
// serverless invocation reports a clean 500 instead of hanging/crashing
// if MONGO_URI is missing or unreachable.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    res.status(500).json({ message: 'Database connection failed' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello ParkEase');
});

app.get('/api', (req, res) => {
  res.json({ status: 'ok', service: 'ParkEase API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
