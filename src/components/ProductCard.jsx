import { Link } from 'react-router-dom';

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  onCompare,
  isSaved = false,
  isCompared = false,
}) {
  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-card__badge">{product.tag}</span>
        <div className="product-card__actions">
          <button type="button" className="icon-button card-icon" aria-label="Toggle wishlist" onClick={onToggleWishlist}>
            {isSaved ? '♥' : '♡'}
          </button>
          <button type="button" className="icon-button card-icon" aria-label="Quick view" onClick={() => onQuickView?.(product)}>
            ⌕
          </button>
        </div>
      </div>
      <div className="product-card__body">
        <div className="product-card__meta">
          <span>{product.category}</span>
          <span>{product.color}</span>
        </div>
        <h3>{product.name}</h3>
        <div className="product-card__bottom">
          <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
          <div className="product-card__buttons">
            <button type="button" className="mini-button" onClick={() => onAddToCart?.(product)}>
              Add to cart
            </button>
            <button type="button" className="mini-button mini-button--ghost" onClick={() => onCompare?.(product)}>
              {isCompared ? 'Compared' : 'Compare'}
            </button>
          </div>
        </div>
        <div className="product-card__footer-row">
          <Link to={`/product/${product.id}`} className="text-link inline-link">View</Link>
        </div>
      </div>
    </article>
  );
}
