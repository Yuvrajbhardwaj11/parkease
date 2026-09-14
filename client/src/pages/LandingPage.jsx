import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Problems from '../components/Problems';
import Workflow from '../components/Workflow';
import Features from '../components/Features';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing">
      <Navbar />
      <main>
        <Hero />
        <Problems />
        <Workflow />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
