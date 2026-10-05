import { Link } from 'react-router-dom';
import AnnouncementBar from '../components/AnnouncementBar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { products } from '../data/products';

const compareKeys = ['Product', 'Price', 'Rating', 'Category', 'Terrain', 'Weight', 'Cushioning', 'Stability', 'Grip', 'Available sizes'];

function getCompareData() {
  try {
    const ids = JSON.parse(window.localStorage.getItem('paceline-compare') || '[]');
    return products.filter((product) => ids.includes(product.id));
  } catch {
    return [];
  }
}

export default function ComparePage({ onOpenSearch, mobileOpen, onToggleMenu, onCloseMenu }) {
  const items = getCompareData();

  return (
    <>
      <AnnouncementBar />
      <Navbar cartCount={0} onOpenSearch={onOpenSearch} mobileOpen={mobileOpen} onToggleMenu={onToggleMenu} onCloseMenu={onCloseMenu} />
      <main className="page-shell compare-page">
        <div className="container">
          <div className="page-heading-row">
            <h1>Compare</h1>
            <Link to="/shop" className="button button-secondary">Browse products</Link>
          </div>

          {items.length === 0 ? (
            <div className="empty-state large">
              <h2>Select products to compare.</h2>
              <Link to="/shop" className="button-primary">SHOP RUNNING</Link>
            </div>
          ) : (
            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    {items.map((product) => (
                      <th key={product.id}>{product.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Price</td>{items.map((product) => <td key={product.id}>₹{product.price.toLocaleString('en-IN')}</td>)}</tr>
                  <tr><td>Rating</td>{items.map((product) => <td key={product.id}>{product.rating}</td>)}</tr>
                  <tr><td>Category</td>{items.map((product) => <td key={product.id}>{product.category}</td>)}</tr>
                  <tr><td>Terrain</td>{items.map((product) => <td key={product.id}>{product.terrain}</td>)}</tr>
                  <tr><td>Weight</td>{items.map((product) => <td key={product.id}>{product.weight}</td>)}</tr>
                  <tr><td>Cushioning</td>{items.map((product) => <td key={product.id}>{product.cushioning}</td>)}</tr>
                  <tr><td>Stability</td>{items.map((product) => <td key={product.id}>{product.stability}</td>)}</tr>
                  <tr><td>Grip</td>{items.map((product) => <td key={product.id}>{product.grip}</td>)}</tr>
                  <tr><td>Available sizes</td>{items.map((product) => <td key={product.id}>{product.sizes.join(', ')}</td>)}</tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
