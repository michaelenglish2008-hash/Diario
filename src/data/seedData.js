/**
 * Dados de exemplo, usados apenas na primeira vez que o app é aberto
 * (quando ainda não existe nada salvo no localStorage).
 *
 * Cada obra segue este formato:
 * {
 *   id: string,
 *   title: string,
 *   type: 'filme' | 'serie',
 *   year: number,
 *   status: 'quero' | 'assistindo' | 'assistido',
 *   rating: number | null,   // de 0 a 10, com passos de 0.5
 *   notes: string,           // opcional
 * }
 */
export const seedObras = [
  {
    id: 'seed-1',
    title: 'Duna: Parte Dois',
    type: 'filme',
    year: 2024,
    status: 'assistido',
    rating: 9,
    notes: 'Épico visual, trilha sonora impecável.',
  },
  {
    id: 'seed-2',
    title: 'Succession',
    type: 'serie',
    year: 2018,
    status: 'assistido',
    rating: 10,
    notes: 'Melhor roteiro que já vi numa série.',
  },
  {
    id: 'seed-3',
    title: 'Oppenheimer',
    type: 'filme',
    year: 2023,
    status: 'assistido',
    rating: 8.5,
    notes: '',
  },
  {
    id: 'seed-4',
    title: 'The Bear',
    type: 'serie',
    year: 2022,
    status: 'assistindo',
    rating: null,
    notes: 'Ansiedade boa.',
  },
  {
    id: 'seed-5',
    title: 'Poor Things',
    type: 'filme',
    year: 2023,
    status: 'quero',
    rating: null,
    notes: '',
  },
  {
    id: 'seed-6',
    title: 'Dark',
    type: 'serie',
    year: 2017,
    status: 'assistido',
    rating: 10,
    notes: 'Linha do tempo perfeita.',
  },
]
