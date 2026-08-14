import { useEffect, useState } from 'react'
import { loadObras, saveObras } from '../data/storage.js'
import { seedObras } from '../data/seedData.js'

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `obra-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

/**
 * Hook responsável por toda a lógica de dados do app:
 * carregar, adicionar, editar, excluir, importar e exportar obras.
 * Qualquer alteração é automaticamente salva no localStorage.
 */
export function useObras() {
  const [obras, setObras] = useState(() => {
    const salvas = loadObras()
    // `null` quer dizer "nunca salvou nada antes" -> usa os dados de exemplo.
    // Um array vazio é um estado válido (usuário excluiu tudo) e é respeitado.
    return salvas !== null ? salvas : seedObras
  })

  useEffect(() => {
    saveObras(obras)
  }, [obras])

  function addObra(dados) {
    const novaObra = { ...dados, id: generateId() }
    setObras((prev) => [novaObra, ...prev])
  }

  function updateObra(id, alteracoes) {
    setObras((prev) => prev.map((o) => (o.id === id ? { ...o, ...alteracoes } : o)))
  }

  function deleteObra(id) {
    setObras((prev) => prev.filter((o) => o.id !== id))
  }

  function importObras(novasObras) {
    setObras(novasObras)
  }

  return { obras, addObra, updateObra, deleteObra, importObras }
}
