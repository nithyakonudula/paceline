import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import TrackOrderPage from './pages/TrackOrderPage';
import ComparePage from './pages/ComparePage';
import FindYourShoePage from './pages/FindYourShoePage';
import StoresPage from './pages/StoresPage';
import AccountPage from './pages/AccountPage';
import NotFoundPage from './pages/NotFoundPage';
import { products } from './data/products';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider, useToast } from './context/ToastContext';

function SearchModal({ open, onClose, query, onChange }) {
  const navigate = useNavigate();

  if (!open) return null;

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) {
      return products.slice(0, 6);
    }

    return products.filter((product) => {
      const haystack = [
        product.name,
        product.category,
        product.type,
        product.gender,
        product.description,
        ...(product.tags || []),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [query]);

  return (
    <div className="search-modal" role="dialog" aria-modal="true" aria-label="Search products">
      <div className="search-modal__panel">
        <div className="search-modal__header">
          <h2>Search</h2>
          <button type="button" className="menu-close" aria-label="Close search" onClick={onClose}>×</button>
        </div>

        <label htmlFor="site-search" className="sr-only">
          Search products
        </label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search products..."
          autoFocus
        />

        <div className="search-results">
          {!query ? (
            <div>
              <p className="search-label">Popular Searches</p>
              <div className="popular-searches">
                {['Running Shoes', 'Trail', 'Road', 'Men', 'Women'].map((term) => (
                  <button key={term} type="button" className="popular-search" onClick={() => { onChange(term); }}>
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.slice(0, 6).map((product) => (
              <button
                key={product.id}
                type="button"
                className="search-result"
                onClick={() => {
                  onClose();
                  navigate(`/product/${product.id}`);
                }}
              >
                <span>{product.name}</span>
                <span>₹{product.price.toLocaleString('en-IN')}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function CartDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const { items, subtotal } = useCart();

  if (!open) return null;

  return (
    <div className="cart-drawer-backdrop" onClick={onClose}>
      <aside className="cart-drawer" aria-label="Cart summary" onClick={(event) => event.stopPropagation()}>
        <div className="cart-drawer__header">
          <h3>Bag</h3>
          <button type="button" className="menu-close" aria-label="Close cart" onClick={onClose}>×</button>
        </div>

        {items.length === 0 ? (
          <p className="empty-state small">Your cart is waiting for its next run.</p>
        ) : (
          <>
            <div className="cart-drawer__items">
              {items.slice(0, 3).map((item) => (
                <div key={item.id} className="cart-drawer__item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.size} / {item.color}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
                </div>
              ))}
            </div>
            <div className="cart-drawer__footer">
              <div>
                <span>Total</span>
                <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
              </div>
              <div className="cart-drawer__actions">
                <button type="button" onClick={() => { onClose(); navigate('/cart'); }}>View Cart</button>
                <button type="button" className="button-primary" onClick={() => { onClose(); navigate('/checkout'); }}>Checkout</button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function ToastContainer() {
  const { toasts } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.type}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
}

function AppContent() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const { addItem } = useCart();
  const { pushToast } = useToast();

  useEffect(() => {
    setSearchOpen(false);
    setMobileOpen(false);
    setCartOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setMobileOpen(false);
        setCartOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  const handleAddToCart = (product, options = {}) => {
    addItem(product, options);
    pushToast(`${product.name} added to cart`, 'success');
    setCartOpen(true);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home onOpenSearch={() => setSearchOpen(true)} mobileOpen={mobileOpen} onToggleMenu={() => setMobileOpen((open) => !open)} onCloseMenu={() => setMobileOpen(false)} onAddToCart={handleAddToCart} />} />
        <Route path="/shop" element={<ShopPage onOpenSearch={() => setSearchOpen(true)} mobileOpen={mobileOpen} onToggleMenu={() => setMobileOpen((open) => !open)} onCloseMenu={() => setMobileOpen(false)} onAddToCart={handleAddToCart} />} />
        <Route path="/product/:id" element={<ProductPage onAddToCart={handleAddToCart} onOpenSearch={() => setSearchOpen(true)} mobileOpen={mobileOpen} onToggleMenu={() => setMobileOpen((open) => !open)} onCloseMenu={() => setMobileOpen(false)} />} />
        <Route path="/wishlist" element={<WishlistPage onOpenSearch={() => setSearchOpen(true)} mobileOpen={mobileOpen} onToggleMenu={() => setMobileOpen((open) => !open)} onCloseMenu={() => setMobileOpen(false)} onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<CartPage onOpenSearch={() => setSearchOpen(true)} mobileOpen={mobileOpen} onToggleMenu={() => setMobileOpen((open) => !open)} onCloseMenu={() => setMobileOpen(false)} />} />
        <Route path="/checkout" element={<CheckoutPage onOpenSearch={() => setSearchOpen(true)} mobileOpen={mobileOpen} onToggleMenu={() => setMobileOpen((open) => !open)} onCloseMenu={() => setMobileOpen(false)} />} />
        <Route path="/order-success" element={<OrderSuccessPage onOpenSearch={() => setSearchOpen(true)} mobileOpen={mobileOpen} onToggleMenu={() => setMobileOpen((open) => !open)} onCloseMenu={() => setMobileOpen(false)} />} />
        <Route path="/track-order" element={<TrackOrderPage onOpenSearch={() => setSearchOpen(true)} mobileOpen={mobileOpen} onToggleMenu={() => setMobileOpen((open) => !open)} onCloseMenu={() => setMobileOpen(false)} />} />
        <Route path="/compare" element={<ComparePage onOpenSearch={() => setSearchOpen(true)} mobileOpen={mobileOpen} onToggleMenu={() => setMobileOpen((open) => !open)} onCloseMenu={() => setMobileOpen(false)} />} />
        <Route path="/find-your-shoe" element={<FindYourShoePage onOpenSearch={() => setSearchOpen(true)} mobileOpen={mobileOpen} onToggleMenu={() => setMobileOpen((open) => !open)} onCloseMenu={() => setMobileOpen(false)} />} />
        <Route path="/stores" element={<StoresPage onOpenSearch={() => setSearchOpen(true)} mobileOpen={mobileOpen} onToggleMenu={() => setMobileOpen((open) => !open)} onCloseMenu={() => setMobileOpen(false)} />} />
        <Route path="/account" element={<AccountPage onOpenSearch={() => setSearchOpen(true)} mobileOpen={mobileOpen} onToggleMenu={() => setMobileOpen((open) => !open)} onCloseMenu={() => setMobileOpen(false)} />} />
        <Route path="/our-story" element={<OurStory onOpenSearch={() => setSearchOpen(true)} mobileOpen={mobileOpen} onToggleMenu={() => setMobileOpen((open) => !open)} onCloseMenu={() => setMobileOpen(false)} onAddToCart={handleAddToCart} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} query={searchQuery} onChange={setSearchQuery} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <ToastContainer />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <CartProvider>
          <WishlistProvider>
            <ToastProvider>
              <AppContent />
            </ToastProvider>
          </WishlistProvider>
        </CartProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
