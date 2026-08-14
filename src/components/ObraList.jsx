import ObraRow from './ObraRow.jsx'

export default function ObraList({ obras, onStatusChange, onRatingChange, onEdit, onDelete }) {
  if (obras.length === 0) {
    return (
      <div className="empty-state">
        Nenhuma obra encontrada. Ajuste os filtros ou adicione uma nova obra.
      </div>
    )
  }

  return (
    <div className="obra-list">
      {obras.map((obra) => (
        <ObraRow
          key={obra.id}
          obra={obra}
          onStatusChange={(status) => onStatusChange(obra.id, status)}
          onRatingChange={(rating) => onRatingChange(obra.id, rating)}
          onEdit={() => onEdit(obra)}
          onDelete={() => onDelete(obra.id)}
        />
      ))}
    </div>
  )
}
