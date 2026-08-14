import { useState } from 'react'
import { STATUS_OPTIONS, TYPE_OPTIONS } from '../utils/constants.js'

export default function ObraFormModal({ initialData, isEditing, onSave, onClose }) {
  const [form, setForm] = useState(initialData)

  function handleChange(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) return

    onSave({
      title: form.title.trim(),
      type: form.type,
      year: Number(form.year) || new Date().getFullYear(),
      status: form.status,
      rating: form.rating === '' ? null : Math.max(0, Math.min(10, Number(form.rating))),
      notes: form.notes.trim(),
    })
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          ✕
        </button>
        <h2 className="display">{isEditing ? 'Editar obra' : 'Nova obra'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="title">Nome</label>
            <input
              id="title"
              autoFocus
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Ex: Cidade de Deus"
              required
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="type">Tipo</label>
              <select id="type" value={form.type} onChange={(e) => handleChange('type', e.target.value)}>
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="year">Ano</label>
              <input
                id="year"
                type="number"
                value={form.year}
                onChange={(e) => handleChange('year', e.target.value)}
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="status">Status</label>
              <select id="status" value={form.status} onChange={(e) => handleChange('status', e.target.value)}>
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="rating">Nota (0–10)</label>
              <input
                id="rating"
                type="number"
                min="0"
                max="10"
                step="0.5"
                value={form.rating}
                onChange={(e) => handleChange('rating', e.target.value)}
                placeholder="—"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="notes">O que achei (opcional)</label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Rápido — uma frase já resolve."
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {isEditing ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
