import './Hero.css';

const stats = [
  { value: '1', label: 'Unified city view' },
  { value: '0', label: 'Paper tickets' },
  { value: 'Live', label: 'Slot availability' },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
      </div>

      <div className="container hero-content">
        <div className="hero-copy">
          <p className="hero-badge">UCS503P · Thapar Institute</p>
          <h1>
            City-wide intelligent &amp;{' '}
            <span className="hero-accent">queue-less</span> parking
          </h1>
          <p className="hero-desc">
            ParkEase connects parking facilities across a city into one platform.
            Discover nearby spots, reserve when capacity allows, pay digitally, and
            enter with ANPR — no circling blocks, no entrance queues.
          </p>
          <div className="hero-actions">
            <a href="#cta" className="btn btn-primary">
              Start parking smarter
            </a>
            <a href="#workflow" className="btn btn-outline">
              See the workflow
            </a>
          </div>
          <div className="hero-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="hero-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="phone-mock">
            <div className="phone-notch" />
            <div className="phone-screen">
              <p className="phone-label">Nearby parking</p>
              <div className="facility-card active">
                <div>
                  <strong>Piazza Navona Garage</strong>
                  <span>0.4 km · 12 slots open</span>
                </div>
                <span className="facility-rate">₹40/hr</span>
              </div>
              <div className="facility-card">
                <div>
                  <strong>Trastevere Central Park</strong>
                  <span>0.9 km · 8 slots · EV</span>
                </div>
                <span className="facility-rate">₹35/hr</span>
              </div>
              <div className="facility-card">
                <div>
                  <strong>Termini Station Deck</strong>
                  <span>1.2 km · 5 slots open</span>
                </div>
                <span className="facility-rate">₹50/hr</span>
              </div>
              <div className="phone-cta">Reserve &amp; navigate →</div>
            </div>
          </div>

          <div className="floating-chip chip-anpr">
            <span className="chip-dot" />
            ANPR verified
          </div>
          <div className="floating-chip chip-slot">
            Slot B2-14 assigned
          </div>
        </div>
      </div>
    </section>
  );
}
