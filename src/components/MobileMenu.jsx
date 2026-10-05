import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function MobileMenu({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Main menu">
      <div className="mobile-menu__header">
        <span>PACELINE</span>
        <div className="mobile-menu__actions">
          <ThemeToggle mobile />
          <button type="button" className="menu-close" aria-label="Close menu" onClick={onClose}>×</button>
        </div>
      </div>
      <nav className="mobile-menu__nav" aria-label="Mobile navigation">
        <Link to="/shop" onClick={onClose}>Shop</Link>
        <Link to="/compare" onClick={onClose}>Compare</Link>
        <Link to="/find-your-shoe" onClick={onClose}>Find Your Shoe</Link>
        <Link to="/stores" onClick={onClose}>Stores</Link>
        <Link to="/wishlist" onClick={onClose}>Wishlist</Link>
        <Link to="/cart" onClick={onClose}>Cart</Link>
        <Link to="/our-story" onClick={onClose}>About</Link>
      </nav>
    </div>
  );
}
