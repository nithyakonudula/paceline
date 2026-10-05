import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero-section">
      <div
        className="hero-image"
        role="img"
        aria-label="Runner racing across a rugged desert landscape"
        style={{ backgroundImage: "url('/images/hero-runner.jpeg')" }}
      >
        <div className="hero-overlay" />
      </div>
      <div className="container hero-content">
        <p className="eyebrow">AUTUMN/WINTER 2026</p>
        <h1>
          Chase
          <span>Every Second.</span>
        </h1>
        <p className="hero-copy">
          Built for the miles you own and the ones still waiting to be earned.
        </p>
        <div className="hero-buttons">
          <a href="#new-arrivals" className="button button-primary">
            SHOP NEW ARRIVALS
          </a>
          <Link to="/our-story" className="button button-secondary">
            READ OUR STORY
          </Link>
        </div>
      </div>
    </section>
  );
}
