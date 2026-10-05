import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 16L21 21" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 19c2.2-3.3 5.5-4.9 8-4.9S17.8 15.7 20 19" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon({ count }) {
  return (
    <span className="bag-wrap" aria-label={`Shopping bag with ${count} items`}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 9h12l-1 11H7L6 9Z" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 9V7a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      {count > 0 && <span className="cart-badge">{count}</span>}
    </span>
  );
}

export default function Navbar({ cartCount, onOpenSearch, mobileOpen, onToggleMenu, onCloseMenu, onToggleCart }) {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link to="/" className="logo" aria-label="Paceline home">
          PACELINE
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <Link to="/shop">Shop</Link>
          <Link to="/compare">Compare</Link>
          <Link to="/find-your-shoe">Find Your Shoe</Link>
          <Link to="/stores">Stores</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/our-story">About</Link>
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <button type="button" className="nav-icon" aria-label="Open search" onClick={onOpenSearch}>
            <SearchIcon />
          </button>
          <Link to="/account" className="nav-icon" aria-label="Account">
            <UserIcon />
          </Link>
          <button type="button" className="nav-icon bag-button" aria-label="Shopping bag" onClick={onToggleCart}>
            <BagIcon count={cartCount} />
          </button>

          <button
            type="button"
            className="nav-toggle"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={onToggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={onCloseMenu} />
    </header>
  );
}
