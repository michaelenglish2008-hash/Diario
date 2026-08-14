import { STATUS, STATUS_OPTIONS, TYPE } from '../utils/constants.js'

export default function ObraRow({ obra, onStatusChange, onRatingChange, onEdit, onDelete }) {
  const tipo = TYPE[obra.type]
  const status = STATUS[obra.status]

  function handleRatingChange(e) {
    const valor = e.target.value
    if (valor === '') {
      onRatingChange(null)
      return
    }
    const numero = Math.max(0, Math.min(10, Number(valor)))
    onRatingChange(numero)
  }

  return (
    <div className="obra-row">
      <div className="obra-main">
        <div className="obra-type" title={tipo.label}>
          {tipo.emoji}
        </div>
        <div>
          <div className="obra-title">
            {obra.title} <span className="obra-year">({obra.year})</span>
          </div>
          {obra.notes ? (
            <div className="obra-notes">{obra.notes}</div>
          ) : (
            <div className="obra-notes obra-notes--empty">Sem anotação</div>
          )}
        </div>
      </div>

      <select
        className="status-select"
        value={obra.status}
        onChange={(e) => onStatusChange(e.target.value)}
        style={{ color: status.color, borderColor: `${status.color}55` }}
        aria-label={`Status de ${obra.title}`}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="rating-box">
        <span aria-hidden="true">⭐</span>
        <input
          type="number"
          min="0"
          max="10"
          step="0.5"
          value={obra.rating ?? ''}
          placeholder="—"
          onChange={handleRatingChange}
          aria-label={`Nota de ${obra.title}`}
        />
      </div>

      <div className="obra-actions">
        <button className="icon-btn" onClick={onEdit} aria-label={`Editar ${obra.title}`}>
          ✏️
        </button>
        <button className="icon-btn icon-btn--danger" onClick={onDelete} aria-label={`Excluir ${obra.title}`}>
          🗑️
        </button>
      </div>
    </div>
  )
}
