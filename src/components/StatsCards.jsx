export default function StatsCards({ stats }) {
  const cards = [
    { label: '🎬 Filmes assistidos', value: stats.filmesAssistidos },
    { label: '📺 Séries assistidas', value: stats.seriesAssistidas },
    { label: '🎞️ Total de obras assistidas', value: stats.totalAssistidas },
    { label: '⭐ Nota média', value: stats.notaMedia !== null ? stats.notaMedia.toFixed(1) : '—' },
  ]

  return (
    <section className="stats-grid" aria-label="Estatísticas">
      {cards.map((card) => (
        <div className="stat-card" key={card.label}>
          <div className="stat-label">{card.label}</div>
          <div className="stat-value">{card.value}</div>
        </div>
      ))}
    </section>
  )
}
