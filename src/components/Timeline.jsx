const timelineEntries = [
  { year: '2015', title: 'Born', description: 'Two friends and a shared training habit start building a better run.' },
  { year: '2018', title: 'The idea launches.', description: 'A small collection begins to shape the way we think about everyday gear.' },
  { year: '2022', title: 'Weekly runs begin.', description: 'Community training and early product feedback turn into momentum.' },
  { year: '2026', title: 'A new look & counting.', description: 'Paceline grows with more runners,better design and a stronger mission.' },
];

export default function Timeline() {
  return (
    <section className="timeline section-spacer" aria-labelledby="timeline-heading">
      <div className="container">
        <h2 id="timeline-heading">How we got here.</h2>
        <div className="timeline-grid">
          {timelineEntries.map((entry) => (
            <article key={entry.year} className="timeline-card">
              <span className="timeline-year">{entry.year}</span>
              <h3>{entry.title}</h3>
              <p>{entry.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
