import { NextResponse } from 'next/server'
import { citesteRezervari } from '@/lib/rezervari'

export async function GET() {
  try {
    const rezervari = await citesteRezervari()
    return NextResponse.json({ rezervari })
  } catch {
    return NextResponse.json({ error: 'Eroare la citire' }, { status: 500 })
  }
}
