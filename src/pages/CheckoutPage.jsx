import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnnouncementBar from '../components/AnnouncementBar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const couponMap = {
  PACER10: 0.1,
  RUN20: 0.2,
  WELCOME: 500,
};

export default function CheckoutPage({ onOpenSearch, mobileOpen, onToggleMenu, onCloseMenu }) {
  const { items, subtotal, clearCart } = useCart();
  const { pushToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', pin: '' });
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const shipping = items.length ? 100 : 0;

  const applyCoupon = () => {
    if (!couponMap[coupon]) {
      pushToast('Invalid coupon code', 'error');
      setDiscount(0);
      setAppliedCoupon('');
      return;
    }

    const rate = couponMap[coupon];
    const nextDiscount = coupon === 'WELCOME' ? 500 : subtotal * rate;
    setDiscount(nextDiscount);
    setAppliedCoupon(coupon);
    pushToast('Coupon applied successfully', 'success');
  };

  const total = subtotal + shipping - discount;

  const handleSubmit = (event) => {
    event.preventDefault();

    const missing = Object.values(form).some((value) => !value.trim());
    if (missing) {
      pushToast('Please complete all required checkout details.', 'error');
      return;
    }

    pushToast('Order placed successfully', 'success');
    clearCart();
    navigate('/order-success');
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar cartCount={items.reduce((sum, item) => sum + item.quantity, 0)} onOpenSearch={onOpenSearch} mobileOpen={mobileOpen} onToggleMenu={onToggleMenu} onCloseMenu={onCloseMenu} />

      <main className="page-shell checkout-page">
        <div className="container checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h1>Checkout</h1>

            <section className="checkout-block">
              <h2>Contact Information</h2>
              <div className="input-grid two-col">
                <label><span>Name</span><input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
                <label><span>Email</span><input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
                <label className="full"><span>Phone</span><input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>
              </div>
            </section>

            <section className="checkout-block">
              <h2>Shipping Address</h2>
              <div className="input-grid two-col">
                <label className="full"><span>Address</span><input value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} /></label>
                <label><span>City</span><input value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} /></label>
                <label><span>State</span><input value={form.state} onChange={(event) => setForm({ ...form, state: event.target.value })} /></label>
                <label><span>PIN Code</span><input value={form.pin} onChange={(event) => setForm({ ...form, pin: event.target.value })} /></label>
              </div>
            </section>

            <section className="checkout-block">
              <h2>Payment Method</h2>
              <div className="payment-options">
                {['UPI', 'Credit/Debit Card', 'Cash on Delivery'].map((option) => (
                  <label key={option} className="payment-option">
                    <input type="radio" name="payment" defaultChecked={option === 'UPI'} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </section>
          </form>

          <aside className="summary-panel checkout-summary">
            <h2>Order Summary</h2>
            <div className="checkout-item-list">
              {items.map((item) => (
                <div key={item.id} className="checkout-item">
                  <span>{item.name}</span>
                  <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
                </div>
              ))}
            </div>

            <div className="coupon-box">
              <label>
                <span>PROMO CODE</span>
                <div className="coupon-row">
                  <input value={coupon} onChange={(event) => setCoupon(event.target.value.toUpperCase())} placeholder="Enter code" />
                  <button type="button" className="button-secondary" onClick={applyCoupon}>APPLY</button>
                </div>
              </label>
              {appliedCoupon && <p className="coupon-status success">✓ Coupon applied successfully</p>}
            </div>

            <div className="summary-row"><span>Subtotal</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></div>
            <div className="summary-row"><span>Shipping</span><strong>₹{shipping.toLocaleString('en-IN')}</strong></div>
            <div className="summary-row"><span>Discount</span><strong>-₹{discount.toLocaleString('en-IN')}</strong></div>
            <div className="summary-row total"><span>Total</span><strong>₹{(subtotal + shipping - discount).toLocaleString('en-IN')}</strong></div>
            <button type="submit" className="button-primary full" onClick={handleSubmit}>Place Order</button>
            <Link to="/shop" className="button button-secondary full">Continue Shopping</Link>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
