import ProductCard from './ProductCard';

export default function ProductGrid({ products, activeFilter, onFilterChange, onAddToCart }) {
  const filters = ['All', 'Men', 'Women', 'Road', 'Trail'];

  return (
    <div className="products-shell">
      <div className="section-heading-row">
        <h2>New arrivals for the run.</h2>
        <div className="filter-pills" aria-label="Product category filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={filter === activeFilter ? 'filter-pill active' : 'filter-pill'}
              onClick={() => onFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}
