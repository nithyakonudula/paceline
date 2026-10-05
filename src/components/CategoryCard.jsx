export default function CategoryCard({ category }) {
  return (
    <article className="category-card">
      <div className="category-card__image-wrap">
        <img src={category.image} alt={category.name} loading="lazy" />
      </div>
      <div className="category-card__content">
        <h3>{category.name}</h3>
        <p>{category.description}</p>
      </div>
    </article>
  );
}
