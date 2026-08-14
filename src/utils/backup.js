/**
 * Gera e baixa um arquivo .json com todas as obras salvas.
 */
export function exportObrasToFile(obras) {
  const conteudo = JSON.stringify(obras, null, 2)
  const blob = new Blob([conteudo], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const dataHoje = new Date().toISOString().slice(0, 10)
  const link = document.createElement('a')
  link.href = url
  link.download = `diario-cultural-backup-${dataHoje}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Lê um arquivo .json escolhido pelo usuário e devolve a lista de obras.
 * Faz uma validação simples da estrutura antes de aceitar os dados.
 */
export function importObrasFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      try {
        const dados = JSON.parse(reader.result)

        if (!Array.isArray(dados)) {
          reject(new Error('O arquivo precisa conter uma lista de obras.'))
          return
        }

        const valido = dados.every(
          (item) =>
            item &&
            typeof item.title === 'string' &&
            (item.type === 'filme' || item.type === 'serie') &&
            (item.status === 'quero' || item.status === 'assistindo' || item.status === 'assistido')
        )

        if (!valido) {
          reject(new Error('O arquivo não tem o formato esperado do Diário Cultural.'))
          return
        }

        // Garante que cada obra tenha um id, mesmo que o arquivo não tenha.
        const comId = dados.map((item, index) => ({
          ...item,
          id: item.id || `import-${Date.now()}-${index}`,
        }))

        resolve(comId)
      } catch (error) {
        reject(new Error('Não foi possível ler este arquivo como JSON válido.'))
      }
    }

    reader.onerror = () => reject(new Error('Falha ao ler o arquivo.'))
    reader.readAsText(file)
  })
}
