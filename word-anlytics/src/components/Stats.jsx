export default function Stats() {
  return (
    <section className="stats">
      <Stat number={0} label="Words" />
      <Stat number={0} label="Characters" />
      <Stat number={280} label="Instagram" />
      <Stat number={2200} label="Facebook" />
    </section>
  )
}

function Stat({ number, label }) {
  return (
    <section className="stat">
      <span className="stat__number">{number}</span>
      <h2 className="second-heading">{label}</h2>
    </section>
  )
}
