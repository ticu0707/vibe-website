'use client'

import { useState } from 'react'
import Link from 'next/link'

// Time slots 10:00 - 22:00, every 30 min
const TIME_SLOTS: string[] = []
for (let h = 10; h <= 22; h++) {
  TIME_SLOTS.push(`${String(h).padStart(2, '0')}:00`)
  if (h < 22) TIME_SLOTS.push(`${String(h).padStart(2, '0')}:30`)
}

const MONTH_NAMES = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie']
const DAY_NAMES = ['Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm', 'Dum']
const DAY_SHORT = ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm']

function formatDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function formatDateDisplay(date: Date): string {
  return `${DAY_SHORT[date.getDay()]}, ${date.getDate()} ${MONTH_NAMES[date.getMonth()].slice(0, 3)}`
}

function getCalendarDays(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  let startOffset = firstDay.getDay() - 1
  if (startOffset < 0) startOffset = 6

  const days: (Date | null)[] = []
  for (let i = 0; i < startOffset; i++) days.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d))
  while (days.length % 7 !== 0) days.push(null)
  return days
}

type Step = 1 | 2 | 3 | 'success'

interface FormData {
  nume: string
  email: string
  telefon: string
  numar_persoane: number
}

export default function RezervariPage() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const maxDate = new Date(today)
  maxDate.setMonth(maxDate.getMonth() + 6)

  const [step, setStep] = useState<Step>(1)
  const [calendarYear, setCalendarYear] = useState(today.getFullYear())
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({ nume: '', email: '', telefon: '', numar_persoane: 2 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const next14Days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    return d
  })

  const canGoPrev = !(calendarYear === today.getFullYear() && calendarMonth === today.getMonth())
  const canGoNext = !(calendarYear === maxDate.getFullYear() && calendarMonth === maxDate.getMonth())

  function prevMonth() {
    if (!canGoPrev) return
    if (calendarMonth === 0) { setCalendarMonth(11); setCalendarYear(calendarYear - 1) }
    else setCalendarMonth(calendarMonth - 1)
  }

  function nextMonth() {
    if (!canGoNext) return
    if (calendarMonth === 11) { setCalendarMonth(0); setCalendarYear(calendarYear + 1) }
    else setCalendarMonth(calendarMonth + 1)
  }

  function isDateDisabled(date: Date) {
    return date < today || date > maxDate
  }

  function selectDate(date: Date) {
    if (isDateDisabled(date)) return
    setSelectedDate(date)
    // Sync calendar to selected month
    setCalendarYear(date.getFullYear())
    setCalendarMonth(date.getMonth())
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedDate || !selectedTime) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/rezervari', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, data: formatDate(selectedDate), ora: selectedTime }),
      })
      if (!res.ok) throw new Error()
      setStep('success')
    } catch {
      setError('Ceva nu a mers. Încearcă din nou.')
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setStep(1)
    setSelectedDate(null)
    setSelectedTime(null)
    setFormData({ nume: '', email: '', telefon: '', numar_persoane: 2 })
    setError(null)
  }

  const calendarDays = getCalendarDays(calendarYear, calendarMonth)

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 flex items-center justify-center p-4 py-16">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Rezervă o masă</h1>
          <p className="text-amber-400">Vibe Caffè · Experiență autentică</p>
        </div>

        {/* Step indicator */}
        {step !== 'success' && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step === s ? 'bg-amber-600 text-white scale-110' :
                  (typeof step === 'number' && step > s) ? 'bg-amber-800 text-amber-200' :
                  'bg-white/10 text-white/40'
                }`}>
                  {typeof step === 'number' && step > s ? '✓' : s}
                </div>
                {s < 3 && <div className={`w-12 h-0.5 transition-all ${typeof step === 'number' && step > s ? 'bg-amber-600' : 'bg-white/20'}`} />}
              </div>
            ))}
          </div>
        )}

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl">

          {/* ── STEP 1: DATA ── */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Alege data</h2>

              {/* Quick buttons - next 14 days */}
              <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
                {next14Days.map((date) => {
                  const isSelected = selectedDate?.toDateString() === date.toDateString()
                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => selectDate(date)}
                      className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl border transition-all text-sm ${
                        isSelected ? 'bg-amber-600 border-amber-500 text-white' : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
                      }`}
                    >
                      <span className="text-xs opacity-70">{DAY_SHORT[date.getDay()]}</span>
                      <span className="font-bold">{date.getDate()}</span>
                    </button>
                  )
                })}
              </div>

              {/* Calendar */}
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={prevMonth} disabled={!canGoPrev}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xl hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                    ‹
                  </button>
                  <span className="text-white font-semibold">{MONTH_NAMES[calendarMonth]} {calendarYear}</span>
                  <button onClick={nextMonth} disabled={!canGoNext}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xl hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                    ›
                  </button>
                </div>

                <div className="grid grid-cols-7 mb-2">
                  {DAY_NAMES.map((d) => (
                    <div key={d} className="text-center text-xs text-white/40 py-1">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((date, idx) => {
                    if (!date) return <div key={idx} />
                    const disabled = isDateDisabled(date)
                    const isSelected = selectedDate?.toDateString() === date.toDateString()
                    const isCurrentMonth = date.getMonth() === calendarMonth
                    const isTodayDate = date.toDateString() === today.toDateString()
                    return (
                      <button
                        key={idx}
                        onClick={() => !disabled && selectDate(date)}
                        disabled={disabled}
                        className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                          isSelected ? 'bg-amber-600 text-white' :
                          isTodayDate ? 'ring-1 ring-amber-400 text-amber-300 hover:bg-white/10' :
                          disabled ? 'text-white/20 cursor-not-allowed' :
                          isCurrentMonth ? 'text-white hover:bg-white/20' :
                          'text-white/30'
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    )
                  })}
                </div>
              </div>

              <button onClick={() => selectedDate && setStep(2)} disabled={!selectedDate}
                className="mt-6 w-full py-3 bg-amber-600 hover:bg-amber-500 disabled:bg-white/10 disabled:text-white/30 text-white font-semibold rounded-xl transition-all">
                {selectedDate ? `Continuă → ${formatDateDisplay(selectedDate)}` : 'Selectează o dată'}
              </button>
            </div>
          )}

          {/* ── STEP 2: ORA ── */}
          {step === 2 && (
            <div>
              <button onClick={() => setStep(1)} className="text-amber-400 hover:text-amber-300 text-sm mb-4 flex items-center gap-1">
                ← {selectedDate && formatDateDisplay(selectedDate)}
              </button>
              <h2 className="text-xl font-semibold text-white mb-4">Alege ora</h2>

              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((time) => (
                  <button key={time} onClick={() => setSelectedTime(time)}
                    className={`py-2.5 rounded-xl text-sm font-medium transition-all border ${
                      selectedTime === time ? 'bg-amber-600 border-amber-500 text-white' : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20'
                    }`}>
                    {time}
                  </button>
                ))}
              </div>

              <button onClick={() => selectedTime && setStep(3)} disabled={!selectedTime}
                className="mt-6 w-full py-3 bg-amber-600 hover:bg-amber-500 disabled:bg-white/10 disabled:text-white/30 text-white font-semibold rounded-xl transition-all">
                {selectedTime ? `Continuă → ${selectedTime}` : 'Selectează o oră'}
              </button>
            </div>
          )}

          {/* ── STEP 3: DETALII ── */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <button type="button" onClick={() => setStep(2)} className="text-amber-400 hover:text-amber-300 text-sm mb-4 flex items-center gap-1">
                ← {selectedDate && formatDateDisplay(selectedDate)} · {selectedTime}
              </button>
              <h2 className="text-xl font-semibold text-white mb-4">Detaliile tale</h2>

              <div className="space-y-3">
                <input type="text" placeholder="Nume complet" required
                  value={formData.nume} onChange={(e) => setFormData({ ...formData, nume: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 transition-all" />

                <input type="email" placeholder="Email" required
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 transition-all" />

                <input type="tel" placeholder="Telefon" required
                  value={formData.telefon} onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-amber-500 transition-all" />

                {/* Guests */}
                <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 flex items-center justify-between">
                  <span className="text-white/70">Număr persoane</span>
                  <div className="flex items-center gap-3">
                    <button type="button"
                      onClick={() => setFormData({ ...formData, numar_persoane: Math.max(1, formData.numar_persoane - 1) })}
                      className="w-8 h-8 rounded-lg bg-white/20 text-white hover:bg-amber-600 transition-all font-bold">−</button>
                    <span className="text-white font-bold w-4 text-center">{formData.numar_persoane}</span>
                    <button type="button"
                      onClick={() => setFormData({ ...formData, numar_persoane: Math.min(12, formData.numar_persoane + 1) })}
                      className="w-8 h-8 rounded-lg bg-white/20 text-white hover:bg-amber-600 transition-all font-bold">+</button>
                  </div>
                </div>
              </div>

              {error && <p className="mt-3 text-red-400 text-sm text-center">{error}</p>}

              <button type="submit" disabled={loading}
                className="mt-6 w-full py-3 bg-amber-600 hover:bg-amber-500 disabled:bg-white/10 disabled:text-white/30 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Se trimite...
                  </>
                ) : 'Confirmă rezervarea'}
              </button>
            </form>
          )}

          {/* ── SUCCESS ── */}
          {step === 'success' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-white font-bold">
                ✓
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Rezervare confirmată!</h2>
              <p className="text-white/60 mb-1">{selectedDate && formatDateDisplay(selectedDate)} · {selectedTime}</p>
              <p className="text-white/60 mb-6">Te vom contacta la telefon pentru confirmare.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={resetForm}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-all">
                  Rezervare nouă
                </button>
                <Link href="/"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all">
                  Pagina principală
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}
