import './TechStack.css';

const stack = [
  { name: 'React', role: 'Frontend application' },
  { name: 'Node.js + Express', role: 'REST API backend' },
  { name: 'MongoDB', role: 'Application & parking data' },
  { name: 'Redis / WebSockets', role: 'Real-time occupancy' },
  { name: 'ANPR / OCR', role: 'Automatic vehicle recognition' },
  { name: 'Payment gateway', role: 'Digital payments & wallet' },
];

export default function TechStack() {
  return (
    <section id="tech" className="tech">
      <div className="container tech-inner">
        <div className="tech-copy">
          <span className="section-label">Architecture</span>
          <h2 className="section-title">Modular, scalable by design</h2>
          <p className="section-subtitle">
            Frontend, backend, database, real-time services, and hardware integrations
            are separated into modular components — ready to scale from one facility to
            a city-wide network.
          </p>
        </div>

        <ul className="tech-list">
          {stack.map((item) => (
            <li key={item.name}>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
