import './Features.css';

const features = [
  {
    title: 'Real-time occupancy',
    desc: 'Live visibility into open, occupied, and reserved capacity across all connected facilities.',
    tag: 'Core',
  },
  {
    title: 'Conditional reservation',
    desc: 'Reservations enabled only when sufficient capacity exists and demand is below rush-hour threshold.',
    tag: 'Core',
  },
  {
    title: 'Dynamic slot allocation',
    desc: 'Exact slot assigned on arrival using live occupancy — not fixed long before you get there.',
    tag: 'Core',
  },
  {
    title: 'Customizable preferences',
    desc: 'Filter by vehicle type, EV charging, proximity to destination, and floor preference.',
    tag: 'Core',
  },
  {
    title: 'Timed exit window',
    desc: 'After payment, a configurable grace period lets you reach the exit without rushing.',
    tag: 'Core',
  },
  {
    title: 'ParkEase Wallet',
    desc: 'FASTag-style automatic deduction for frequent users — skip manual payment at exit.',
    tag: 'Future',
  },
  {
    title: 'Hybrid access',
    desc: 'One-time visitors use flexible digital pay; locals use wallet-based auto-deduction.',
    tag: 'Future',
  },
  {
    title: 'ANPR-based access',
    desc: 'Automatic number plate recognition at entry and exit — no paper tickets or manual checks.',
    tag: 'Core',
  },
];

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="container">
        <span className="section-label">Capabilities</span>
        <h2 className="section-title">Built for minimum effort, maximum ease</h2>
        <p className="section-subtitle">
          The initial release focuses on the core parking journey. Advanced features
          like predictive occupancy, ML ranking, and cross-city interoperability come
          after the foundation is validated.
        </p>

        <div className="features-grid">
          {features.map((f) => (
            <article key={f.title} className="feature-card">
              <span className={`feature-tag tag-${f.tag.toLowerCase()}`}>{f.tag}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
