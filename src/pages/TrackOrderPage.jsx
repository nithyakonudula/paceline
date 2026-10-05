import { useState } from 'react';
import AnnouncementBar from '../components/AnnouncementBar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const orderStages = [
  'Order Placed',
  'Confirmed',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

export default function TrackOrderPage({ onOpenSearch, mobileOpen, onToggleMenu, onCloseMenu }) {
  const [orderNumber, setOrderNumber] = useState('PL20261005');

  return (
    <>
      <AnnouncementBar />
      <Navbar cartCount={0} onOpenSearch={onOpenSearch} mobileOpen={mobileOpen} onToggleMenu={onToggleMenu} onCloseMenu={onCloseMenu} />
      <main className="page-shell track-order-page">
        <div className="container track-order-box">
          <h1>Track Order</h1>
          <label className="track-order-form">
            <span>Order Number</span>
            <input value={orderNumber} onChange={(event) => setOrderNumber(event.target.value)} placeholder="Enter order number" />
          </label>

          <div className="order-timeline" aria-label="Order status timeline">
            {orderStages.map((stage, index) => (
              <div key={stage} className={`timeline-step ${index <= 2 ? 'is-active' : ''}`}>
                <span className="timeline-dot" />
                <span>{stage}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
