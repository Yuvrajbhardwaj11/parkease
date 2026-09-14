import './Navbar.css';

const links = [
  { href: '#problem', label: 'Problem' },
  { href: '#workflow', label: 'How it works' },
  { href: '#features', label: 'Features' },
  { href: '#tech', label: 'Tech' },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#" className="brand">
          <span className="brand-icon">P</span>
          <span className="brand-text">ParkEase</span>
        </a>

        <nav className="nav-links" aria-label="Main">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a href="#cta" className="btn btn-primary nav-cta">
            Get started
          </a>
        </div>
      </div>
    </header>
  );
}
