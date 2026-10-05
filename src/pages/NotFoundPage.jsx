import { Link } from 'react-router-dom';
import AnnouncementBar from '../components/AnnouncementBar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function NotFoundPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar cartCount={0} onOpenSearch={() => {}} mobileOpen={false} onToggleMenu={() => {}} onCloseMenu={() => {}} />
      <main className="page-shell not-found-page">
        <div className="container centered-panel">
          <h1>Looks like you took a wrong turn.</h1>
          <p>The trail you're looking for doesn't exist.</p>
          <div className="cta-row center-row">
            <Link to="/" className="button-primary">BACK HOME</Link>
            <Link to="/shop" className="button button-secondary">SHOP RUNNING</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
