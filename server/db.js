const mongoose = require('mongoose');

// Serverless functions can be invoked many times without a fresh process,
// so we cache the connection on the global object to avoid opening a new
// MongoDB connection on every request (which quickly exhausts Atlas's
// connection limit on free/shared tiers).
let cached = global._mongooseConn;
if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not set. Add it in your Vercel project env vars.');
    }
    cached.promise = mongoose
      .connect(process.env.MONGO_URI)
      .then((mongooseInstance) => mongooseInstance);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null; // allow retry on next request instead of caching a failure
    throw err;
  }

  return cached.conn;
}

module.exports = connectDB;
