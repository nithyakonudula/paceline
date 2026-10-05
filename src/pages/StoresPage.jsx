import AnnouncementBar from '../components/AnnouncementBar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const stores = [
  { name: 'Paceline Chennai', address: 'Express Avenue, Chennai', hours: 'Mon-Sun · 9:00 AM - 9:00 PM', phone: '+91 98765 43210' },
  { name: 'Paceline Bangalore', address: 'UB City, Bengaluru', hours: 'Mon-Sun · 10:00 AM - 9:00 PM', phone: '+91 99887 66554' },
  { name: 'Paceline Hyderabad', address: 'Inorbit Mall, Hyderabad', hours: 'Mon-Sun · 10:00 AM - 8:00 PM', phone: '+91 98765 11223' },
  { name: 'Paceline Mumbai', address: 'Phoenix Marketcity, Mumbai', hours: 'Mon-Sun · 11:00 AM - 9:00 PM', phone: '+91 99222 33445' },
  { name: 'Paceline Delhi', address: 'Select Citywalk, Delhi', hours: 'Mon-Sun · 10:00 AM - 9:00 PM', phone: '+91 99111 77889' },
];

export default function StoresPage({ onOpenSearch, mobileOpen, onToggleMenu, onCloseMenu }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar cartCount={0} onOpenSearch={onOpenSearch} mobileOpen={mobileOpen} onToggleMenu={onToggleMenu} onCloseMenu={onCloseMenu} />
      <main className="page-shell stores-page">
        <div className="container">
          <h1>Find a Paceline Store</h1>
          <div className="stores-grid">
            {stores.map((store) => (
              <article key={store.name} className="store-card">
                <h2>{store.name}</h2>
                <p>{store.address}</p>
                <p>{store.hours}</p>
                <p>{store.phone}</p>
                <button type="button" className="button-secondary">Get Directions</button>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
