import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Workflow from './components/Workflow';
import Features from './components/Features';
import TechStack from './components/TechStack';
import CTA from './components/CTA';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Workflow />
        <Features />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
