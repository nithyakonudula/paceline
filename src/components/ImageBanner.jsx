export default function ImageBanner({ title, subtitle, image, altText, reverse = false }) {
  return (
    <article className={reverse ? 'image-banner image-banner--reverse' : 'image-banner'}>
      <div className="image-banner__image-wrap">
        <img src={image} alt={altText} loading="lazy" />
      </div>
      <div className="image-banner__content">
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <button type="button" className="inline-link">
          Explore now
        </button>
      </div>
    </article>
  );
}
