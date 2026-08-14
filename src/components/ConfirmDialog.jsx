export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
