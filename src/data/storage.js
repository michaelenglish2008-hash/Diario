/**
 * Camada de persistência.
 *
 * Hoje os dados são salvos no localStorage do navegador.
 * Toda leitura/escrita do app passa por este arquivo — se um dia você
 * quiser trocar por um banco de dados (ex: uma API própria, Supabase,
 * Firebase etc.), basta reescrever as funções abaixo mantendo a mesma
 * assinatura (loadObras / saveObras). O resto do app não precisa mudar.
 */

const STORAGE_KEY = 'diario-cultural:obras'
const STORAGE_VERSION = 1
const VERSION_KEY = 'diario-cultural:version'

/**
 * Lê as obras salvas no localStorage.
 * Retorna `null` quando ainda não existe nada salvo (primeira visita),
 * para que quem chamar saiba que deve usar os dados de exemplo.
 */
export function loadObras() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return null

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null

    return parsed
  } catch (error) {
    console.error('Não foi possível ler os dados salvos:', error)
    return null
  }
}

/**
 * Salva a lista de obras no localStorage.
 */
export function saveObras(obras) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obras))
    localStorage.setItem(VERSION_KEY, String(STORAGE_VERSION))
  } catch (error) {
    console.error('Não foi possível salvar os dados:', error)
  }
}
