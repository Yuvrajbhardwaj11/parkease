import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-icon">P</span>
          <div>
            <strong>ParkEase</strong>
            <span>City-wide intelligent parking ecosystem</span>
          </div>
        </div>
        <div className="footer-meta">
          <p>UCS503P · Thapar Institute of Engineering and Technology</p>
          <p>Submitted to Mr. Jeelani Asif · August 2026</p>
          <p className="footer-team">
            Soham Kumar · Yuvraj Bhardwaj · Tanishk Batra — CSED
          </p>
        </div>
      </div>
    </footer>
  );
}
