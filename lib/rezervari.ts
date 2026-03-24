import { supabase } from './supabase'

export interface RezervareData {
  nume: string
  email: string
  telefon: string
  numar_persoane: number
  data: string  // format: YYYY-MM-DD
  ora: string   // format: HH:MM
}

export async function salveazaRezervare(date: RezervareData) {
  const { data, error } = await supabase
    .from('rezervari')
    .insert([date])
    .select()

  if (error) throw error

  return data[0]
}

export async function citesteRezervari() {
  const { data, error } = await supabase
    .from('rezervari')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error

  return data
}

export type StatusRezervare = 'în așteptare' | 'confirmat' | 'respins'

export async function actualizeazaStatus(id: number, status: StatusRezervare) {
  const { data, error } = await supabase
    .from('rezervari')
    .update({ status })
    .eq('id', id)
    .select()

  if (error) throw error

  return data[0]
}

export async function stergeRezervare(id: number) {
  const { error } = await supabase
    .from('rezervari')
    .delete()
    .eq('id', id)

  if (error) throw error
}
