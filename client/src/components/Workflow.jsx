import './Workflow.css';

const steps = [
  { num: '01', title: 'Register once', desc: 'Create an account and register your vehicle.' },
  { num: '02', title: 'Enter destination', desc: 'Tell ParkEase where you need to go.' },
  { num: '03', title: 'Check eligibility', desc: 'System checks capacity and rush-hour demand before enabling reservation.' },
  { num: '04', title: 'Get recommendation', desc: 'Receive a ranked facility based on proximity, EV needs, and live availability.' },
  { num: '05', title: 'Reserve & pay', desc: 'Reserve capacity when allowed, pay digitally, and navigate to the facility.' },
  { num: '06', title: 'ANPR entry', desc: 'Camera scans your plate at the gate — no paper ticket needed.' },
  { num: '07', title: 'Dynamic slot', desc: 'Exact slot assigned on arrival using live occupancy, not stale pre-assignments.' },
  { num: '08', title: 'Park', desc: 'Barrier opens. Pull into your assigned spot.' },
  { num: '09', title: 'Exit request', desc: 'Request exit when your session is complete.' },
  { num: '10', title: 'Auto billing', desc: 'Charge calculated from actual parking duration.' },
  { num: '11', title: 'Pay or wallet', desc: 'Digital payment or automatic ParkEase Wallet deduction.' },
  { num: '12', title: 'Timed exit', desc: 'Exit authorization granted. Slot released after ANPR verification.' },
];

export default function Workflow() {
  return (
    <section id="workflow" className="workflow">
      <div className="container">
        <div className="workflow-header">
          <div>
            <span className="section-label">Core workflow</span>
            <h2 className="section-title">From search to exit — one connected journey</h2>
            <p className="section-subtitle">
              ParkEase integrates discovery, reservation, ANPR access, dynamic slot
              allocation, billing, and timed exit into a single seamless flow.
            </p>
          </div>
        </div>

        <div className="workflow-track">
          {steps.map((step, i) => (
            <article key={step.num} className="workflow-step">
              <div className="step-marker">
                <span className="step-num">{step.num}</span>
                {i < steps.length - 1 && <span className="step-line" aria-hidden="true" />}
              </div>
              <div className="step-body">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
