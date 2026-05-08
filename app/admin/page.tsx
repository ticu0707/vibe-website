'use client'

import { useEffect, useState } from 'react'

interface Rezervare {
  id: number
  nume: string
  email: string
  telefon: string
  numar_persoane: number
  data: string
  ora: string
  status: 'în așteptare' | 'confirmat' | 'respins'
  created_at: string
}

type FiltruStatus = 'toate' | 'în așteptare' | 'confirmat' | 'respins'

const STATUS_STYLE: Record<string, string> = {
  'în așteptare': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'confirmat':    'bg-amber-600/20 text-amber-300 border-amber-600/30',
  'respins':      'bg-red-500/20 text-red-300 border-red-500/30',
}

function formatData(data: string) {
  const [y, m, d] = data.split('-')
  const luni = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${d} ${luni[parseInt(m) - 1]} ${y}`
}

function formatOra(ora: string) {
  return ora.slice(0, 5)
}

const ADMIN_PASSWORD = 'vibe2026'

export default function AdminPage() {
  const [autentificat, setAutentificat] = useState(false)
  const [parola, setParola] = useState('')
  const [parolaGresita, setParolaGresita] = useState(false)
  const [rezervari, setRezervari] = useState<Rezervare[]>([])
  const [loading, setLoading] = useState(true)
  const [filtru, setFiltru] = useState<FiltruStatus>('toate')
  const [cautare, setCautare] = useState('')
  const [actiune, setActiune] = useState<number | null>(null)

  async function incarcaRezervari() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/rezervari')
      const json = await res.json()
      setRezervari(json.rezervari ?? [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { incarcaRezervari() }, [])

  async function schimbaStatus(id: number, status: 'confirmat' | 'respins') {
    setActiune(id)
    try {
      await fetch('/api/rezervari', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      await incarcaRezervari()
    } finally {
      setActiune(null)
    }
  }

  async function sterge(id: number) {
    if (!confirm('Ștergi rezervarea?')) return
    setActiune(id)
    try {
      await fetch(`/api/rezervari?id=${id}`, { method: 'DELETE' })
      await incarcaRezervari()
    } finally {
      setActiune(null)
    }
  }

  const filtrate = rezervari.filter((r) => {
    const potrivitStatus = filtru === 'toate' || r.status === filtru
    const potrivitNume = r.nume.toLowerCase().includes(cautare.toLowerCase())
    return potrivitStatus && potrivitNume
  })

  const numarDupa: Record<FiltruStatus, number> = {
    'toate':        rezervari.length,
    'în așteptare': rezervari.filter(r => r.status === 'în așteptare').length,
    'confirmat':    rezervari.filter(r => r.status === 'confirmat').length,
    'respins':      rezervari.filter(r => r.status === 'respins').length,
  }

  if (!autentificat) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <p className="text-4xl mb-3">☕</p>
            <h1 className="text-2xl font-bold text-white mb-1">Panou Admin</h1>
            <p className="text-amber-400 text-sm">Vibe Caffè · Acces restricționat</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (parola === ADMIN_PASSWORD) {
                setAutentificat(true)
              } else {
                setParolaGresita(true)
                setParola('')
              }
            }}
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl"
          >
            <input
              type="password"
              placeholder="Parolă admin"
              value={parola}
              onChange={(e) => { setParola(e.target.value); setParolaGresita(false) }}
              autoFocus
              className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none transition-all mb-3 ${
                parolaGresita ? 'border-red-400 focus:border-red-400' : 'border-white/20 focus:border-amber-500'
              }`}
            />
            {parolaGresita && (
              <p className="text-red-400 text-sm mb-3 text-center">Parolă incorectă. Încearcă din nou.</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-all"
            >
              Intră în panou
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 p-4 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">Admin · Rezervări</h1>
          <p className="text-amber-300">Vibe Caffè</p>
        </div>

        {/* Filtre + Căutare */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 mb-6 flex flex-col sm:flex-row gap-4">
          {/* Filtre status */}
          <div className="flex flex-wrap gap-2">
            {(['toate', 'în așteptare', 'confirmat', 'respins'] as FiltruStatus[]).map((f) => (
              <button key={f} onClick={() => setFiltru(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                  filtru === f
                    ? 'bg-amber-600 border-amber-500 text-white'
                    : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/20'
                }`}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
                <span className="ml-1.5 opacity-60">({numarDupa[f]})</span>
              </button>
            ))}
          </div>

          {/* Căutare */}
          <input
            type="text"
            placeholder="Caută după nume..."
            value={cautare}
            onChange={(e) => setCautare(e.target.value)}
            className="sm:ml-auto bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 transition-all text-sm w-full sm:w-64"
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16 text-white/50">
            <svg className="animate-spin w-8 h-8 mx-auto mb-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Se încarcă...
          </div>
        )}

        {/* Gol */}
        {!loading && filtrate.length === 0 && (
          <div className="text-center py-16 text-white/40">
            Nicio rezervare găsită.
          </div>
        )}

        {/* TABEL — desktop */}
        {!loading && filtrate.length > 0 && (
          <div className="hidden md:block bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {['Nume', 'Contact', 'Data & Ora', 'Persoane', 'Status', 'Acțiuni'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrate.map((r, idx) => (
                  <tr key={r.id} className={`border-b border-white/5 hover:bg-white/5 transition-all ${idx % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                    <td className="px-4 py-3 text-white font-medium">{r.nume}</td>
                    <td className="px-4 py-3">
                      <div className="text-white/80 text-sm">{r.email}</div>
                      <div className="text-white/50 text-xs">{r.telefon}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-white/80 text-sm">{formatData(r.data)}</div>
                      <div className="text-white/50 text-xs">{formatOra(r.ora)}</div>
                    </td>
                    <td className="px-4 py-3 text-white/80 text-sm">{r.numar_persoane} pers.</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${STATUS_STYLE[r.status]}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {r.status !== 'confirmat' && (
                          <button onClick={() => schimbaStatus(r.id, 'confirmat')} disabled={actiune === r.id}
                            className="px-2 py-1 bg-amber-600/20 hover:bg-amber-600/40 text-amber-300 rounded-lg text-xs font-medium transition-all disabled:opacity-40">
                            Confirmă
                          </button>
                        )}
                        {r.status !== 'respins' && (
                          <button onClick={() => schimbaStatus(r.id, 'respins')} disabled={actiune === r.id}
                            className="px-2 py-1 bg-orange-500/20 hover:bg-orange-500/40 text-orange-300 rounded-lg text-xs font-medium transition-all disabled:opacity-40">
                            Respinge
                          </button>
                        )}
                        <button onClick={() => sterge(r.id)} disabled={actiune === r.id}
                          className="px-2 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg text-xs font-medium transition-all disabled:opacity-40">
                          Șterge
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CARDURI — mobile */}
        {!loading && filtrate.length > 0 && (
          <div className="md:hidden space-y-3">
            {filtrate.map((r) => (
              <div key={r.id} className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-white font-semibold">{r.nume}</p>
                    <p className="text-white/50 text-xs">{r.email} · {r.telefon}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${STATUS_STYLE[r.status]}`}>
                    {r.status}
                  </span>
                </div>

                <div className="flex gap-4 mb-4 text-sm">
                  <span className="text-white/70">📅 {formatData(r.data)}</span>
                  <span className="text-white/70">🕐 {formatOra(r.ora)}</span>
                  <span className="text-white/70">👥 {r.numar_persoane}</span>
                </div>

                <div className="flex gap-2">
                  {r.status !== 'confirmat' && (
                    <button onClick={() => schimbaStatus(r.id, 'confirmat')} disabled={actiune === r.id}
                      className="flex-1 py-2 bg-amber-600/20 hover:bg-amber-600/40 text-amber-300 rounded-xl text-sm font-medium transition-all disabled:opacity-40">
                      Confirmă
                    </button>
                  )}
                  {r.status !== 'respins' && (
                    <button onClick={() => schimbaStatus(r.id, 'respins')} disabled={actiune === r.id}
                      className="flex-1 py-2 bg-orange-500/20 hover:bg-orange-500/40 text-orange-300 rounded-xl text-sm font-medium transition-all disabled:opacity-40">
                      Respinge
                    </button>
                  )}
                  <button onClick={() => sterge(r.id)} disabled={actiune === r.id}
                    className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-xl text-sm font-medium transition-all disabled:opacity-40">
                    Șterge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  )
}
