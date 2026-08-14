/**
 * Calcula as estatísticas exibidas no topo da página,
 * sempre a partir da lista completa de obras (não filtrada).
 */
export function calculateStats(obras) {
  const assistidos = obras.filter((o) => o.status === 'assistido')
  const filmesAssistidos = assistidos.filter((o) => o.type === 'filme').length
  const seriesAssistidas = assistidos.filter((o) => o.type === 'serie').length

  const notas = assistidos
    .map((o) => o.rating)
    .filter((r) => typeof r === 'number' && !Number.isNaN(r))

  const notaMedia = notas.length
    ? notas.reduce((soma, n) => soma + n, 0) / notas.length
    : null

  return {
    filmesAssistidos,
    seriesAssistidas,
    totalAssistidas: assistidos.length,
    notaMedia,
  }
}
