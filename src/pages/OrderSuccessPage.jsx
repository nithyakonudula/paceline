import { Link } from 'react-router-dom';
import AnnouncementBar from '../components/AnnouncementBar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function OrderSuccessPage({ onOpenSearch, mobileOpen, onToggleMenu, onCloseMenu }) {
  const orderNumber = `PL${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`;

  return (
    <>
      <AnnouncementBar />
      <Navbar cartCount={0} onOpenSearch={onOpenSearch} mobileOpen={mobileOpen} onToggleMenu={onToggleMenu} onCloseMenu={onCloseMenu} />
      <main className="page-shell order-success-page">
        <div className="container centered-panel">
          <div className="success-mark">🎉</div>
          <h1>Order Confirmed!</h1>
          <p>Order #{orderNumber}</p>
          <div className="success-list">
            <span>✓ Order Placed</span>
            <span>✓ Payment Confirmed</span>
            <span>✓ Preparing</span>
            <span>○ Shipped</span>
            <span>○ Delivered</span>
          </div>
          <div className="cta-row center-row">
            <Link to="/shop" className="button-primary">CONTINUE SHOPPING</Link>
            <Link to="/track-order" className="button button-secondary">TRACK ORDER</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
