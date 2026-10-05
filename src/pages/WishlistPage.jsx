import { Link } from 'react-router-dom';
import AnnouncementBar from '../components/AnnouncementBar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistPage({ onOpenSearch, mobileOpen, onToggleMenu, onCloseMenu, onAddToCart }) {
  const { ids, toggleItem } = useWishlist();
  const { pushToast } = useToast();
  const savedProducts = products.filter((product) => ids.includes(product.id));

  return (
    <>
      <AnnouncementBar />
      <Navbar
        cartCount={useCart().cartCount}
        onOpenSearch={onOpenSearch}
        mobileOpen={mobileOpen}
        onToggleMenu={onToggleMenu}
        onCloseMenu={onCloseMenu}
      />

      <main className="page-shell">
        <div className="container">
          <div className="page-heading-row">
            <h1>My Wishlist</h1>
            <Link to="/shop" className="button button-secondary">Explore Products</Link>
          </div>

          {savedProducts.length === 0 ? (
            <div className="empty-state large">
              <h2>Your wishlist is empty.</h2>
              <Link to="/shop" className="button-primary">EXPLORE PRODUCTS</Link>
            </div>
          ) : (
            <div className="product-grid wishlist-grid">
              {savedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => onAddToCart(product)}
                  isSaved={true}
                  onToggleWishlist={() => {
                    toggleItem(product.id);
                    pushToast(`${product.name} removed from wishlist`, 'success');
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
