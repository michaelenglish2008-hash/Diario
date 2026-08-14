export default function Header({ onExport, onImportClick }) {
  return (
    <header className="header">
      <div>
        <h1 className="display">🎬 Diário Cultural</h1>
        <p className="subtitle">Registre e acompanhe os filmes e séries que você assistiu.</p>
      </div>
      <div className="header-actions">
        <button className="btn-ghost" onClick={onExport} title="Baixar um backup em JSON">
          ⬇️ Exportar
        </button>
        <button className="btn-ghost" onClick={onImportClick} title="Restaurar um backup em JSON">
          ⬆️ Importar
        </button>
      </div>
    </header>
  )
}
