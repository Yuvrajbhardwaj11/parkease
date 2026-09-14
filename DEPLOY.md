# Deploying ParkEase to Vercel

## ⚠️ Do this first — rotate your MongoDB credentials

Your original repo had **no `.gitignore`**, so `server/.env` (containing your real
MongoDB Atlas password and JWT secret) was committed to your **public** GitHub repo.
That password is compromised the moment it's on a public repo, regardless of what
you do next. Before deploying:

1. Go to MongoDB Atlas → Database Access → edit the user `yuvraj180711_db_user` →
   change the password (or delete it and create a new DB user).
2. Pick a new, random `JWT_SECRET` (don't reuse `parkease_dev_secret_change_later`).
3. From here on, secrets only ever go into Vercel's Environment Variables UI or
   your local (git-ignored) `.env` — never into a committed file.

This zip already removes the real `server/.env` and replaces it with
`server/.env.example` (placeholders only), and adds a `.gitignore` that excludes
`.env`, `node_modules`, and build output going forward.

## What was fixed to make this deployable

1. **Case-sensitive require() bug (would crash on Vercel):** routes did
   `require('../models/Slot')` etc. (capitalized) but the files on disk were
   `slot.js` (lowercase). This works on Windows/Mac (case-insensitive filesystem)
   but throws `Cannot find module` on Vercel's Linux runtime. Fixed by renaming
   the model/middleware files to match: `User.js`, `Vehicle.js`, `Facility.js`,
   `Reservation.js`, `Payment.js`, `Session.js`, `Slot.js`,
   `middleware/authenticateAdmin.js`.
2. **Split the Express app from the server bootstrap** so it can be reused by
   both local dev and the Vercel serverless function:
   - `server/app.js` — the Express app itself (routes, middleware), no `listen()`.
   - `server/index.js` — local dev only: loads `.env`, connects, calls `app.listen()`.
   - `server/db.js` — caches the Mongoose connection on `global`, so a serverless
     cold start doesn't open a fresh MongoDB connection on every single request.
   - `api/index.js` — the actual Vercel serverless function; just imports and
     exports the Express app from `server/app.js`.
3. **`vercel.json`** builds the Vite client as the static site and rewrites all
   `/api/*` traffic to the serverless function, so one Vercel project serves both.
4. **Root `package.json`** exists purely so Vercel's install step pulls in the
   backend deps (`express`, `mongoose`, `cors`, `jsonwebtoken`, `bcryptjs`,
   `dotenv`) that `api/index.js` needs.
5. **Live connectivity check:** the landing page's CTA section now actually
   `fetch('/api')` on load and shows "● Backend online" / "● Backend unreachable" —
   previously nothing in the React app called the backend at all, so there was no
   visible proof the two halves were connected.

## Deploy steps

1. Push this project to a GitHub repo (rotate credentials first — see above).
2. In Vercel: **Add New → Project → Import** your repo.
3. Leave **Root Directory** as the repo root (not `client/`) — `vercel.json`
   handles the client subfolder itself.
4. Framework Preset: "Other" (vercel.json's `buildCommand`/`outputDirectory`
   override this anyway).
5. Add Environment Variables (Project Settings → Environment Variables):
   - `MONGO_URI` — your new connection string
   - `JWT_SECRET` — your new random secret
6. Deploy. You'll get one URL serving:
   - `/` — the landing page
   - `/api` — health check (`{"status":"ok","service":"ParkEase API"}`)
   - `/api/auth/register`, `/api/auth/login`, `/api/facilities`, etc. — the full API

## Local development (unchanged workflow)

```bash
# terminal 1 — backend
cd server
cp .env.example .env     # fill in your MONGO_URI and JWT_SECRET
npm install
npm run dev               # http://localhost:5000

# terminal 2 — frontend
cd client
npm install
npm run dev                # http://localhost:3000, proxies /api to :5000
```

## Seeding sample parking slot data

```bash
cd server
node seed.js   # uses MONGO_URI from server/.env
```
Note: `seed.js` references hard-coded facility ObjectIds — you'll need matching
`Facility` documents in your DB first (create via `POST /api/facilities`) or
edit the IDs in `seed.js` to match facilities you've actually created.
