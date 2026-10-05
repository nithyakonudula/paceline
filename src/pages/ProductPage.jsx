import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AnnouncementBar from '../components/AnnouncementBar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

const formatPrice = (value) => `₹${value.toLocaleString('en-IN')}`;

export default function ProductPage({ onOpenSearch, mobileOpen, onToggleMenu, onCloseMenu, onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { ids, toggleItem, isSaved } = useWishlist();
  const { pushToast } = useToast();
  const product = useMemo(() => products.find((entry) => String(entry.id) === String(id)), [id]);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] ?? 'Black');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? 8);
  const [selectedImage, setSelectedImage] = useState(product?.image ?? '/images/shoe1.jpg');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) return;
    setSelectedColor(product.colors?.[0] ?? 'Black');
    setSelectedSize(product.sizes?.[0] ?? 8);
    setSelectedImage(product.image ?? product.images?.[0]);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const viewed = JSON.parse(window.localStorage.getItem('paceline-recently-viewed') || '[]');
    const updated = [product.id, ...viewed.filter((item) => item !== product.id)].slice(0, 6);
    window.localStorage.setItem('paceline-recently-viewed', JSON.stringify(updated));
  }, [product]);

  if (!product) {
    return (
      <>
        <AnnouncementBar />
        <Navbar
          cartCount={0}
          onOpenSearch={onOpenSearch}
          mobileOpen={mobileOpen}
          onToggleMenu={onToggleMenu}
          onCloseMenu={onCloseMenu}
        />
        <main className="page-shell">
          <div className="container empty-state large">
            <h2>Product not found.</h2>
            <button type="button" className="button-primary" onClick={() => navigate('/shop')}>Back to shop</button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    onAddToCart(product, { size: selectedSize, color: selectedColor, quantity });
  };

  const handleWishlistToggle = () => {
    toggleItem(product.id);
    pushToast(isSaved(product.id) ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`, 'success');
  };

  const handleCompareToggle = () => {
    const existing = JSON.parse(window.localStorage.getItem('paceline-compare') || '[]');
    const next = existing.includes(product.id)
      ? existing.filter((id) => id !== product.id)
      : [...existing, product.id].slice(0, 3);

    window.localStorage.setItem('paceline-compare', JSON.stringify(next));
    pushToast(next.includes(product.id) ? `${product.name} added to compare` : `${product.name} removed from compare`, 'success');
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar
        cartCount={0}
        onOpenSearch={onOpenSearch}
        mobileOpen={mobileOpen}
        onToggleMenu={onToggleMenu}
        onCloseMenu={onCloseMenu}
      />

      <main className="page-shell product-detail-page">
        <div className="container product-detail">
          <div className="product-gallery">
            <div className="product-gallery__main">
              <img src={selectedImage} alt={product.name} />
            </div>
            <div className="product-gallery__thumbs">
              {product.images?.map((image) => (
                <button key={image} type="button" className={`gallery-thumb ${selectedImage === image ? 'is-active' : ''}`} onClick={() => setSelectedImage(image)} aria-label={`View ${product.name} photo`}>
                  <img src={image} alt={product.name} />
                </button>
              ))}
            </div>
          </div>

          <div className="product-detail__content">
            <div className="product-detail__header-row">
              <span className="product-tag">{product.tag}</span>
              <button type="button" className="icon-button" aria-label="Add to wishlist" onClick={handleWishlistToggle}>
                {isSaved(product.id) ? '♥' : '♡'}
              </button>
            </div>

            <h1>{product.name}</h1>
            <div className="rating-row">
              <span>★★★★★</span>
              <span>{product.rating}</span>
              <span>({product.reviews} reviews)</span>
            </div>

            <div className="detail-price-row">
              <p className="price-line">{formatPrice(product.price)}</p>
              {product.originalPrice && <span className="strike">{formatPrice(product.originalPrice)}</span>}
            </div>

            <p className="product-description">{product.description}</p>

            <div className="selection-group">
              <h3>Color</h3>
              <div className="swatch-row">
                {product.colors?.map((color) => (
                  <button key={color} type="button" className={`swatch ${selectedColor === color ? 'selected' : ''}`} onClick={() => setSelectedColor(color)}>
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="selection-group">
              <h3>Size</h3>
              <div className="size-selector">
                {product.sizes?.map((size) => (
                  <button key={size} type="button" className={`size-option ${selectedSize === size ? 'selected' : ''}`} onClick={() => setSelectedSize(size)}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="selection-group quantity-row">
              <h3>Quantity</h3>
              <div className="quantity-stepper">
                <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))}>−</button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity((current) => current + 1)}>+</button>
              </div>
            </div>

            <div className="cta-row">
              <button type="button" className="button-primary large" onClick={handleAddToCart}>Add to Cart</button>
              <button type="button" className="button button-secondary large" onClick={() => navigate('/checkout')}>Buy Now</button>
              <button type="button" className="button button-secondary large" onClick={handleCompareToggle}>Compare</button>
            </div>

            <div className="product-specs">
              <h3>Product specifications</h3>
              <ul>
                {Object.entries(product.specifications || {}).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
