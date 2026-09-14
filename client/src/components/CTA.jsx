import { useEffect, useState } from 'react';
import './CTA.css';

export default function CTA() {
  const [apiStatus, setApiStatus] = useState('checking'); // 'checking' | 'online' | 'offline'

  useEffect(() => {
    let cancelled = false;

    fetch('/api')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(res.status))))
      .then(() => {
        if (!cancelled) setApiStatus('online');
      })
      .catch(() => {
        if (!cancelled) setApiStatus('offline');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="cta" className="cta">
      <div className="container cta-inner">
        <div className="cta-card">
          <h2>Ready to park without the queue?</h2>
          <p>
            Register your vehicle once, find parking near your destination, and let
            ParkEase handle the rest — from reservation to timed exit.
          </p>
          <div className="cta-actions">
            <a href="/register" className="btn btn-primary">
              Create account
            </a>
            <a href="/login" className="btn btn-dark">
              Sign in
            </a>
          </div>
          <p className="cta-note">
            Backend API at <code>/api</code> — auth, facilities, reservations, sessions,
            and payments.{' '}
            <span className={`api-status api-status--${apiStatus}`}>
              {apiStatus === 'checking' && 'Checking connection…'}
              {apiStatus === 'online' && '● Backend online'}
              {apiStatus === 'offline' && '● Backend unreachable'}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
