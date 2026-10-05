import { Link } from 'react-router-dom';

export default function StorySplitSection() {
  return (
    <section className="story-split section-spacer">
      <div className="story-split__image-wrap">
        <img src="/images/story-mountain.jpeg" alt="Runner on a scenic mountain ridge" loading="lazy" />
      </div>
      <div className="story-split__content">
        <p className="eyebrow dark">BUILT TO LAST</p>
        <h2>
          Built by runners.
          <span>Worn on every terrain.</span>
        </h2>
        <p>
          From our first local group runs to the roads and trails we still race on today, Paceline is rooted in the everyday rhythm of training, recovery, and showing up.
        </p>
        <div className="stats-row">
          <div>
            <strong>10+</strong>
            <span>years</span>
          </div>
          <div>
            <strong>40+</strong>
            <span>countries</span>
          </div>
          <div>
            <strong>1</strong>
            <span>mission</span>
          </div>
        </div>
        <Link to="/our-story" className="button button-tertiary">
          READ THE FULL STORY
        </Link>
      </div>
    </section>
  );
}
