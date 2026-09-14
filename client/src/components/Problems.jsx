import './Problems.css';

const problems = [
  {
    icon: '🗺️',
    title: 'No city-wide view',
    description:
      'Every facility runs its own system. Drivers cannot see available parking near their destination in one place.',
  },
  {
    icon: '⏱️',
    title: 'Wasted time & fuel',
    description:
      'Circling blocks and checking multiple locations burns time and fuel before you even park.',
  },
  {
    icon: '🚧',
    title: 'Entrance queues',
    description:
      'Paper tickets, gates, and manual checks create bottlenecks at parking entrances during peak hours.',
  },
  {
    icon: '💳',
    title: 'Slow checkout & exit',
    description:
      'Cash, cards, and manual payment at exit add another delay after your parking session ends.',
  },
  {
    icon: '📅',
    title: 'Unreliable reservations',
    description:
      'Advance booking during rush hour reduces flexibility. ParkEase enables reservations only when capacity allows.',
  },
];

export default function Problems() {
  return (
    <section id="problem" className="problems">
      <div className="container">
        <p className="section-label">The problem</p>
        <h2 className="section-title">
          Urban parking is fragmented, slow, and frustrating
        </h2>
        <p className="section-subtitle">
          In high-density cities, drivers lack a unified view of parking options.
          ParkEase addresses these pain points with one connected platform.
        </p>
        <div className="problems-grid">
          {problems.map((item) => (
            <article key={item.title} className="problem-card">
              <span className="problem-icon" aria-hidden="true">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
