export const STATUS = {
  quero: { label: 'Quero assistir', emoji: '🔴', color: '#B5473D' },
  assistindo: { label: 'Assistindo', emoji: '🟡', color: '#B8823F' },
  assistido: { label: 'Assistido', emoji: '🟢', color: '#3F6E52' },
}

export const STATUS_OPTIONS = Object.entries(STATUS).map(([value, s]) => ({
  value,
  label: `${s.emoji} ${s.label}`,
}))

export const TYPE = {
  filme: { label: 'Filme', emoji: '🎬' },
  serie: { label: 'Série', emoji: '📺' },
}

export const TYPE_OPTIONS = Object.entries(TYPE).map(([value, t]) => ({
  value,
  label: `${t.emoji} ${t.label}`,
}))

export const emptyObraForm = {
  title: '',
  type: 'filme',
  year: new Date().getFullYear(),
  status: 'quero',
  rating: '',
  notes: '',
}
