import AnnouncementBar from '../components/AnnouncementBar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const mockAccount = {
  name: 'Aarav Rao',
  email: 'aarav@paceline.run',
  city: 'Bengaluru',
  memberSince: 'September 2024',
};

export default function AccountPage({ onOpenSearch, mobileOpen, onToggleMenu, onCloseMenu }) {
  return (
    <>
      <AnnouncementBar />
      <Navbar cartCount={0} onOpenSearch={onOpenSearch} mobileOpen={mobileOpen} onToggleMenu={onToggleMenu} onCloseMenu={onCloseMenu} />
      <main className="page-shell account-page">
        <div className="container account-grid">
          <aside className="account-panel">
            <h2>Profile</h2>
            <div className="account-card">
              <strong>{mockAccount.name}</strong>
              <p>{mockAccount.email}</p>
              <p>{mockAccount.city}</p>
              <small>Member since {mockAccount.memberSince}</small>
            </div>
          </aside>
          <section className="account-content">
            <div className="account-tabs">
              <span>Profile</span>
              <span>Orders</span>
              <span>Wishlist</span>
              <span>Saved Addresses</span>
              <span>Preferences</span>
            </div>
            <div className="account-card large">
              <h3>Demo account interface</h3>
              <p> This is a frontend-only account panel for Paceline. No real authentication is connected.</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
