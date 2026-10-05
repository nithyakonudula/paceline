import { Link, useNavigate } from 'react-router-dom';
import AnnouncementBar from '../components/AnnouncementBar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

export default function CartPage({ onOpenSearch, mobileOpen, onToggleMenu, onCloseMenu }) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const shipping = items.length ? 100 : 0;
  const discount = 900;
  const total = subtotal + shipping - discount;

  return (
    <>
      <AnnouncementBar />
      <Navbar
        cartCount={items.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenSearch={onOpenSearch}
        mobileOpen={mobileOpen}
        onToggleMenu={onToggleMenu}
        onCloseMenu={onCloseMenu}
      />

      <main className="page-shell cart-page">
        <div className="container cart-layout">
          <section className="cart-items-panel">
            <div className="page-heading-row">
              <h1>Your cart</h1>
              <Link to="/shop" className="button button-secondary">Continue shopping</Link>
            </div>

            {items.length === 0 ? (
              <div className="empty-state large">
                <h2>Your cart is waiting for its next run.</h2>
                <Link to="/shop" className="button-primary">SHOP RUNNING</Link>
              </div>
            ) : (
              <div className="cart-list">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item__details">
                      <h3>{item.name}</h3>
                      <p>{item.color} · Size {item.size}</p>
                      <div className="cart-item__meta">
                        <div className="quantity-stepper">
                          <button type="button" onClick={() => updateQuantity(item.id, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>
                        <button type="button" className="text-link danger" onClick={() => removeItem(item.id)}>Remove</button>
                      </div>
                    </div>
                    <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
                  </div>
                ))}
              </div>
            )}
          </section>

          <aside className="summary-panel">
            <h2>Order Summary</h2>
            <div className="summary-row"><span>Subtotal</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></div>
            <div className="summary-row"><span>Shipping</span><strong>₹{shipping.toLocaleString('en-IN')}</strong></div>
            <div className="summary-row"><span>Discount</span><strong>-₹{discount.toLocaleString('en-IN')}</strong></div>
            <div className="summary-row total"><span>Total</span><strong>₹{total.toLocaleString('en-IN')}</strong></div>
            <button type="button" className="button-primary full" onClick={() => navigate('/checkout')} disabled={items.length === 0}>Proceed to Checkout</button>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
