import AnnouncementBar from '../components/AnnouncementBar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import TeamCard from '../components/TeamCard';
import Timeline from '../components/Timeline';

const teamMembers = [
  {
    name: 'Rae Sinclair',
    label: 'HEAD OF DESIGN',
    role: 'Rae builds every silhouette around how real runners move, recover, and keep going.',
    image: '/images/rae.jpeg',
  },
  {
    name: 'Jamie Roy',
    label: 'COMMUNITY LEAD',
    role: 'Jamie connects athletes and crews across cities, trails, and training blocks.',
    image: '/images/jamie.jpeg',
  },
];

export default function OurStory({
  cartCount,
  addToCart,
  onOpenSearch,
  mobileOpen,
  onToggleMenu,
  onCloseMenu,
}) {
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
        <section className="story-page-hero">
          <div className="container">
            <p className="eyebrow centered">OUR STORY</p>
            <h1>Our Story</h1>
            <p className="story-intro-text">
              We set out to build gear that respects the discipline of running without losing the joy in it.
            </p>
            <div className="story-hero__image-wrap">
              <img src="/images/story-group.jpeg" alt="Runners training together in a group" />
            </div>
          </div>
        </section>

        <section className="section-spacer intro-section">
          <div className="container intro-grid">
            <div>
              <p className="eyebrow dark">WE'RE ALL ABOUT THE RUN</p>
              <h2>We're all about the run.</h2>
            </div>
            <div>
              <p>
                Paceline began with an everyday observation: runners wanted products that were honest, useful, and made for the real work of training. We started by listening closely to athletes who care more about rhythm, traction, and consistency than noise.
              </p>
              <p>
                Our collection is built around modern performance essentials that feel equally at home on city streets, mountain switchbacks, and recovery walks. We believe gear should sharpen the experience rather than distract from it.
              </p>
            </div>
          </div>
        </section>

        <section className="section-spacer values-section">
          <div className="container">
            <h2>Three things we won't compromise on.</h2>
            <div className="values-grid">
              <article className="value-card">
                <span className="value-number">01</span>
                <h3>Current, not sold to us.</h3>
                <p>We test what is true now, not what we think a brand should say.</p>
              </article>
              <article className="value-card">
                <span className="value-number">02</span>
                <h3>Community over transaction.</h3>
                <p>Every pair and layer is shaped by the crew that runs, trains, and shares the road.</p>
              </article>
              <article className="value-card">
                <span className="value-number">03</span>
                <h3>Craft in every detail.</h3>
                <p>From foams and shapes to final touches, we design for durability and feel.</p>
              </article>
            </div>
          </div>
        </section>

        <Timeline />

        <section className="section-spacer visit-us">
          <div className="container visit-grid">
            <div className="visit-copy">
              <p className="eyebrow dark">VISIT US</p>
              <h2>Visit us in</h2>
              <p>Brighton Wharf</p>
              <p>24 North Lane</p>
              <p>Hours: Tue–Sun · 9am–6pm</p>
            </div>
            <div className="visit-map-wrap">
              <img src="/images/map.jpeg" alt="Map of the Paceline store location" loading="lazy" />
            </div>
          </div>
        </section>

        <section className="section-spacer team-section">
          <div className="container">
            <h2>The people behind the shop.</h2>
            <div className="team-grid">
              {teamMembers.map((member) => (
                <TeamCard key={member.name} person={member} />
              ))}
            </div>
          </div>
        </section>

        <section className="lime-cta section-spacer">
          <div className="container lime-cta__inner">
            <h2>
              Come find your next
              <span>pair of shoes.</span>
            </h2>
            <div className="hero-buttons lime-buttons">
              <button type="button" className="button button-dark">
                SHOP FOOTWEAR
              </button>
              <button type="button" className="button button-secondary button-secondary--dark">
                READ OUR STORY
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
