export default function TeamCard({ person }) {
  return (
    <article className="team-card">
      <img src={person.image} alt={person.name} loading="lazy" />
      <div className="team-card__body">
        <span className="team-label">{person.label}</span>
        <h3>{person.name}</h3>
        <p>{person.role}</p>
      </div>
    </article>
  );
}
