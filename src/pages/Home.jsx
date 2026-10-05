import { useMemo, useState } from 'react';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ProductGrid from '../components/ProductGrid';
import StorySplitSection from '../components/StorySplitSection';
import ImageBanner from '../components/ImageBanner';
import Footer from '../components/Footer';
import { categoryCards } from '../data/categories';
import { products } from '../data/products';

export default function Home({
  cartCount,
  addToCart,
  onOpenSearch,
  mobileOpen,
  onToggleMenu,
  onCloseMenu,
}) {
  const [activeFilter, setActiveFilter] = useState('All');

  const visibleProducts = useMemo(() => {
    if (activeFilter === 'All') return products;
    if (activeFilter === 'Road' || activeFilter === 'Trail') {
      return products.filter((product) => product.type === activeFilter);
    }
    return products.filter((product) => product.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <AnnouncementBar />
      <Navbar
        cartCount={cartCount}
        onOpenSearch={onOpenSearch}
        mobileOpen={mobileOpen}
        onToggleMenu={onToggleMenu}
        onCloseMenu={onCloseMenu}
      />

      <main>
        <Hero />

        <section className="section-spacer">
          <div className="container category-section">
            <div className="section-heading-row">
              <h2>Every discipline. Every distance.</h2>
              <button type="button" className="text-link">
                VIEW ALL COLLECTIONS
              </button>
            </div>

            <div className="category-grid">
              {categoryCards.map((category) => (
                <CategoryCard key={category.name} category={category} />
              ))}
            </div>
          </div>
        </section>

        <section id="new-arrivals" className="section-spacer product-section">
          <div className="container">
            <ProductGrid
              products={visibleProducts}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              onAddToCart={addToCart}
            />
          </div>
        </section>

        <div className="container">
          <StorySplitSection />
        </div>

        <section className="section-spacer banners-wrap">
          <div className="container banner-grid">
            <ImageBanner
              title="Men's Running"
              subtitle="Pace-forward essentials for training days and early miles."
              image="/images/men-running.jpeg"
              altText="Male runner sprinting on a track"
            />
            <ImageBanner
              title="Women's Running"
              subtitle="Lightweight support for speed, strength, and recovery."
              image="/images/women-running.jpeg"
              altText="Female runner on a track"
              reverse
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
