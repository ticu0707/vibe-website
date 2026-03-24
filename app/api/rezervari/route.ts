import { NextRequest, NextResponse } from 'next/server'
import { salveazaRezervare, actualizeazaStatus, stergeRezervare, StatusRezervare } from '@/lib/rezervari'

const STATUSURI_VALIDE: StatusRezervare[] = ['în așteptare', 'confirmat', 'respins']

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nume, email, telefon, numar_persoane, data, ora } = body

    if (!nume || !email || !telefon || !numar_persoane || !data || !ora) {
      return NextResponse.json({ error: 'Câmpuri lipsă' }, { status: 400 })
    }

    const rezervare = await salveazaRezervare({ nume, email, telefon, numar_persoane, data, ora })
    return NextResponse.json({ success: true, rezervare })
  } catch {
    return NextResponse.json({ error: 'Eroare la salvare' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ error: 'ID și status sunt obligatorii' }, { status: 400 })
    }

    if (!STATUSURI_VALIDE.includes(status)) {
      return NextResponse.json({ error: `Status invalid. Valori acceptate: ${STATUSURI_VALIDE.join(', ')}` }, { status: 400 })
    }

    const rezervare = await actualizeazaStatus(Number(id), status)
    return NextResponse.json({ success: true, rezervare })
  } catch {
    return NextResponse.json({ error: 'Eroare la actualizare' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID este obligatoriu' }, { status: 400 })
    }

    await stergeRezervare(Number(id))
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Eroare la ștergere' }, { status: 500 })
  }
}
