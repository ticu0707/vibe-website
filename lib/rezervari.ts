export interface RezervareData {
  nume: string
  email: string
  telefon: string
  numar_persoane: number
  data: string  // YYYY-MM-DD
  ora: string   // HH:MM
}

export interface Rezervare extends RezervareData {
  id: number
  status: StatusRezervare
  created_at: string
}

export type StatusRezervare = 'în așteptare' | 'confirmat' | 'respins'

// In-memory store — persists while the dev server runs
const store: Rezervare[] = []
let nextId = 1

export async function salveazaRezervare(date: RezervareData): Promise<Rezervare> {
  const rezervare: Rezervare = {
    id: nextId++,
    ...date,
    status: 'în așteptare',
    created_at: new Date().toISOString(),
  }
  store.push(rezervare)
  return rezervare
}

export async function citesteRezervari(): Promise<Rezervare[]> {
  return [...store].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )
}

export async function actualizeazaStatus(id: number, status: StatusRezervare): Promise<Rezervare> {
  const r = store.find((r) => r.id === id)
  if (!r) throw new Error('Rezervare negăsită')
  r.status = status
  return r
}

export async function stergeRezervare(id: number): Promise<void> {
  const idx = store.findIndex((r) => r.id === id)
  if (idx === -1) throw new Error('Rezervare negăsită')
  store.splice(idx, 1)
}
