import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AnnouncementBar from '../components/AnnouncementBar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';

const categoryOptions = ['Road Running', 'Trail Running', 'Apparel', 'Accessories'];
const genderOptions = ['Men', 'Women', 'Unisex'];
const priceOptions = ['Under ₹5,000', '₹5,000–₹10,000', '₹10,000+'];
const sizeOptions = ['6', '7', '8', '9', '10', '11'];
const availabilityOptions = ['In Stock', 'Out of Stock'];

function QuickViewModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="quick-view-backdrop" onClick={onClose}>
      <div className="quick-view-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${product.name} quick view`}>
        <button type="button" className="menu-close quick-view-close" aria-label="Close quick view" onClick={onClose}>×</button>
        <div className="quick-view-grid">
          <img src={product.image} alt={product.name} />
          <div>
            <span className="product-tag">{product.tag}</span>
            <h3>{product.name}</h3>
            <div className="rating-row">
              <span>★★★★★</span>
              <span>{product.rating}</span>
              <span>({product.reviews} reviews)</span>
            </div>
            <p className="price-line">₹{product.price.toLocaleString('en-IN')}</p>
            <p className="quick-view-desc">{product.description}</p>
            <div className="size-selector compact">
              {product.sizes?.slice(0, 5).map((size) => (
                <button type="button" key={size} className="size-option">{size}</button>
              ))}
            </div>
            <div className="quick-view-actions">
              <button type="button" className="button-primary" onClick={() => { onAddToCart(product, { size: product.sizes?.[0] ?? 8, color: product.colors?.[0] ?? 'Default' }); onClose(); }}>
                Add to Cart
              </button>
              <Link to={`/product/${product.id}`} className="button button-secondary" onClick={onClose}>View Full Details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage({ onOpenSearch, mobileOpen, onToggleMenu, onCloseMenu, onAddToCart }) {
  const [sortBy, setSortBy] = useState('featured');
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [genderFilters, setGenderFilters] = useState([]);
  const [priceFilters, setPriceFilters] = useState([]);
  const [sizeFilters, setSizeFilters] = useState([]);
  const [availabilityFilters, setAvailabilityFilters] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addItem } = useCart();
  const { pushToast } = useToast();
  const { ids, toggleItem, isSaved } = useWishlist();

  const getComparedIds = () => {
    try {
      return JSON.parse(window.localStorage.getItem('paceline-compare') || '[]');
    } catch {
      return [];
    }
  };

  const toggleCompare = (product) => {
    const existing = getComparedIds();
    const next = existing.includes(product.id)
      ? existing.filter((id) => id !== product.id)
      : [...existing, product.id].slice(0, 3);

    window.localStorage.setItem('paceline-compare', JSON.stringify(next));
    pushToast(next.includes(product.id) ? `${product.name} added to compare` : `${product.name} removed from compare`, 'success');
  };

  const toggleFilter = (value, setter, current) => {
    setter(current.includes(value) ? current.filter((entry) => entry !== value) : [...current, value]);
  };

  const filteredProducts = useMemo(() => {
    const matches = products.filter((product) => {
      if (categoryFilters.length && !categoryFilters.includes(product.category)) return false;
      if (genderFilters.length && !genderFilters.includes(product.gender)) return false;
      if (availabilityFilters.length) {
        const availability = product.inStock ? 'In Stock' : 'Out of Stock';
        if (!availabilityFilters.includes(availability)) return false;
      }
      if (sizeFilters.length && !product.sizes?.some((size) => sizeFilters.includes(String(size)))) return false;

      if (priceFilters.length) {
        const price = product.price;
        const matchesPrice = priceFilters.some((filter) => {
          if (filter === 'Under ₹5,000') return price < 5000;
          if (filter === '₹5,000–₹10,000') return price >= 5000 && price <= 10000;
          if (filter === '₹10,000+') return price > 10000;
          return true;
        });

        if (!matchesPrice) return false;
      }

      return true;
    });

    const sorted = [...matches];

    if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    }

    return sorted;
  }, [categoryFilters, genderFilters, priceFilters, sizeFilters, availabilityFilters, sortBy]);

  const clearAllFilters = () => {
    setCategoryFilters([]);
    setGenderFilters([]);
    setPriceFilters([]);
    setSizeFilters([]);
    setAvailabilityFilters([]);
  };

  const handleWishlistToggle = (product) => {
    toggleItem(product.id);
    pushToast(
      ids.includes(product.id) ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`,
      ids.includes(product.id) ? 'success' : 'success',
    );
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar
        cartCount={useCart().cartCount}
        onOpenSearch={onOpenSearch}
        mobileOpen={mobileOpen}
        onToggleMenu={onToggleMenu}
        onCloseMenu={onCloseMenu}
        cartOpen={false}
        onToggleCart={() => {}}
      />

      <main className="page-shell shop-page">
        <div className="container shop-page__layout">
          <aside className={`shop-filters ${drawerOpen ? 'is-open' : ''}`}>
            <div className="shop-filters__header">
              <h3>Filters</h3>
              <button type="button" className="text-link" onClick={clearAllFilters}>Clear All Filters</button>
            </div>

            <FilterGroup title="Category" options={categoryOptions} selected={categoryFilters} onToggle={(value) => toggleFilter(value, setCategoryFilters, categoryFilters)} />
            <FilterGroup title="Gender" options={genderOptions} selected={genderFilters} onToggle={(value) => toggleFilter(value, setGenderFilters, genderFilters)} />
            <FilterGroup title="Price" options={priceOptions} selected={priceFilters} onToggle={(value) => toggleFilter(value, setPriceFilters, priceFilters)} />
            <FilterGroup title="Size" options={sizeOptions} selected={sizeFilters} onToggle={(value) => toggleFilter(value, setSizeFilters, sizeFilters)} />
            <FilterGroup title="Availability" options={availabilityOptions} selected={availabilityFilters} onToggle={(value) => toggleFilter(value, setAvailabilityFilters, availabilityFilters)} />
          </aside>

          <section className="shop-results">
            <div className="shop-toolbar">
              <div className="shop-toolbar__title">
                <h1>Shop</h1>
                <span>{filteredProducts.length} products</span>
              </div>

              <div className="shop-toolbar__controls">
                <button type="button" className="button button-secondary mobile-filter-toggle" onClick={() => setDrawerOpen((open) => !open)}>
                  Filters
                </button>
                <label className="sort-box">
                  <span>Sort by</span>
                  <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </label>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="empty-state large">
                <h2>No products match your filters.</h2>
                <button type="button" className="button-primary" onClick={clearAllFilters}>Clear filters</button>
              </div>
            ) : (
              <div className="product-grid shop-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(selectedProductForCart) => {
                      const chosenSize = selectedProductForCart.sizes?.[0] ?? 8;
                      const chosenColor = selectedProductForCart.colors?.[0] ?? 'Default';
                      onAddToCart(selectedProductForCart, { size: chosenSize, color: chosenColor, quantity: 1 });
                    }}
                    onQuickView={setSelectedProduct}
                    isSaved={isSaved(product.id)}
                    isCompared={getComparedIds().includes(product.id)}
                    onToggleWishlist={() => handleWishlistToggle(product)}
                    onCompare={toggleCompare}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
      <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={(product) => { const chosenSize = product.sizes?.[0] ?? 8; const chosenColor = product.colors?.[0] ?? 'Default'; onAddToCart(product, { size: chosenSize, color: chosenColor, quantity: 1 }); }} />
    </>
  );
}

function FilterGroup({ title, options, selected, onToggle }) {
  return (
    <div className="filter-group">
      <h4>{title}</h4>
      <div className="filter-group__options">
        {options.map((option) => (
          <label key={option} className="filter-option">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
