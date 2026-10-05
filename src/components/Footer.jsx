import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);

    if (!valid) {
      setStatus('Please enter a valid email address.');
      return;
    }

    setStatus('Thanks for joining the Paceline club.');
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="container footer-newsletter">
        <div>
          <p className="eyebrow dark">JOIN THE PACELINE CLUB</p>
          <h2>Join the Paceline club.</h2>
        </div>
        <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            aria-label="Email address"
          />
          <button type="submit" className="button button-primary footer-submit">
            SUBSCRIBE
          </button>
        </form>
        {status && <p className="newsletter-status" aria-live="polite">{status}</p>}
      </div>

      <div className="container footer-columns">
        <div>
          <h3>PACELINE</h3>
          <ul>
            <li>About</li>
            <li>Contact</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h3>SHOP</h3>
          <ul>
            <li>Men</li>
            <li>Women</li>
            <li>Footwear</li>
            <li>Apparel</li>
            <li>Accessories</li>
          </ul>
        </div>
        <div>
          <h3>HELP</h3>
          <ul>
            <li>Shipping</li>
            <li>Returns</li>
            <li>FAQ</li>
            <li>Size Guide</li>
          </ul>
        </div>
        <div>
          <h3>COMPANY</h3>
          <ul>
            <li>Our Story</li>
            <li>Journal</li>
            <li>Sustainability</li>
            <li>Stores</li>
          </ul>
        </div>
        <div>
          <h3>FOLLOW</h3>
          <ul>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 Paceline</p>
        <div className="legal-links">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Cookies</span>
        </div>
      </div>
    </footer>
  );
}
