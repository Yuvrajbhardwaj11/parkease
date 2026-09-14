import './Problem.css';

const problems = [
  {
    icon: '🗺️',
    title: 'No city-wide view',
    desc: 'Every facility runs its own system. Drivers cannot see available parking near their destination in one place.',
  },
  {
    icon: '⏱️',
    title: 'Wasted time & fuel',
    desc: 'Drivers circle blocks searching for space, burning time and fuel in high-density cities like Rome and Paris.',
  },
  {
    icon: '🚧',
    title: 'Entrance queues',
    desc: 'Paper tickets, gates, and manual checks create bottlenecks at parking entrances during peak hours.',
  },
  {
    icon: '💳',
    title: 'Slow checkout & exit',
    desc: 'Cash and card payments at the exit add another delay after the parking session ends.',
  },
  {
    icon: '📅',
    title: 'Unreliable reservations',
    desc: 'Advance bookings fail when demand is high. ParkEase enables reservations only when capacity allows.',
  },
];

export default function Problem() {
  return (
    <section id="problem" className="problem">
      <div className="container">
        <span className="section-label">The challenge</span>
        <h2 className="section-title">Urban parking is fragmented</h2>
        <p className="section-subtitle">
          In dense cities, parking facilities operate independently. Drivers lack a
          unified view of availability — and the journey from search to exit is full of
          friction.
        </p>

        <div className="problem-grid">
          {problems.map((item) => (
            <article key={item.title} className="problem-card">
              <span className="problem-icon" aria-hidden="true">
                {item.icon}
              </span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
