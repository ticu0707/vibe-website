'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// ---------------------------------------------------------------------------
// TIPURI
// ---------------------------------------------------------------------------

interface Mesaj {
  rol: 'user' | 'bot';
  text: string;
}

// ---------------------------------------------------------------------------
// ANIMAȚII CSS
// ---------------------------------------------------------------------------

const STYLES = `
  @keyframes chatPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.5); }
    50%       { box-shadow: 0 0 0 12px rgba(217, 119, 6, 0); }
  }
  @keyframes chatSlideIn {
    from { opacity: 0; transform: translateY(16px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes dotBounce {
    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
    40%            { transform: translateY(-6px); opacity: 1; }
  }
  @keyframes badgePop {
    from { transform: scale(0); }
    to   { transform: scale(1); }
  }
  .chat-pulse   { animation: chatPulse 2s ease-in-out infinite; }
  .chat-slidein { animation: chatSlideIn 0.25s ease-out both; }
  .dot1 { animation: dotBounce 1.2s infinite 0s; }
  .dot2 { animation: dotBounce 1.2s infinite 0.2s; }
  .dot3 { animation: dotBounce 1.2s infinite 0.4s; }
  .badge-pop { animation: badgePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
`;

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

// #3 — Salut contextual după ora zilei
function getSalutInitial(): string {
  const ora = new Date().getHours();
  if (ora >= 6 && ora < 11) return 'Bună dimineața! ☀️ Ce cafea începem ziua?';
  if (ora >= 11 && ora < 18) return 'Bună ziua! ☕ Ce pot să-ți recomand azi?';
  return 'Bună seara! ✨ Cafeaua de seară te așteaptă.';
}

// #5 — Detectează dacă răspunsul botului menționează rezervările
function contineRezervare(text: string): boolean {
  return /rezerv/i.test(text);
}

// #1 — Quick reply chips
const CHIPS = [
  'Ce recomandați?',
  'Opțiuni vegane?',
  'Program & locație',
  'Fac o rezervare',
];

// ---------------------------------------------------------------------------
// COMPONENTA PRINCIPALĂ
// ---------------------------------------------------------------------------

export default function ChatWidget() {
  const [deschis, setDeschis]           = useState(false);
  const [mesaje, setMesaje]             = useState<Mesaj[]>([
    { rol: 'bot', text: getSalutInitial() },
  ]);
  const [input, setInput]               = useState('');
  const [seIncarca, setSeIncarca]       = useState(false);
  const [chipsAfisate, setChipsAfisate] = useState(true);
  // #2 — Badge mesaje necitite
  const [mesajeNecitite, setMesajeNecitite] = useState(0);

  const mesajeRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Scroll automat la ultimul mesaj
  useEffect(() => {
    if (mesajeRef.current) {
      mesajeRef.current.scrollTop = mesajeRef.current.scrollHeight;
    }
  }, [mesaje, seIncarca]);

  // Focus input + resetare badge când se deschide chat-ul
  useEffect(() => {
    if (deschis) {
      setMesajeNecitite(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [deschis]);

  // ---------------------------------------------------------------------------
  // TRIMITERE MESAJ
  // ---------------------------------------------------------------------------

  async function trimite(textPredefinit?: string) {
    const text = (textPredefinit ?? input).trim();
    if (!text || seIncarca) return;

    setInput('');
    setChipsAfisate(false);
    setMesaje(prev => [...prev, { rol: 'user', text }]);
    setSeIncarca(true);

    try {
      const res  = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ mesaj: text, istoric: mesaje.slice(-6) }),
      });
      const json = await res.json();
      const raspuns = json.raspuns ?? 'Îmi pare rău, a apărut o eroare. Încearcă din nou!';

      setMesaje(prev => [...prev, { rol: 'bot', text: raspuns }]);

      // #2 — Incrementăm badge dacă chat-ul e închis
      if (!deschis) setMesajeNecitite(prev => prev + 1);
    } catch {
      setMesaje(prev => [...prev, {
        rol: 'bot',
        text: 'Conexiunea a eșuat. Verifică internetul și încearcă din nou.',
      }]);
    } finally {
      setSeIncarca(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      trimite();
    }
  }

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  return (
    <>
      <style>{STYLES}</style>

      {/* ── FEREASTRA DE CHAT ─────────────────────────────────────────────── */}
      {deschis && (
        <div
          className="chat-slidein fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm flex flex-col rounded-2xl overflow-hidden border border-white/20"
          style={{
            height: '480px',
            background: 'linear-gradient(160deg, #1c1917 0%, #0f2027 100%)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)',
          }}
        >
          {/* HEADER */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-600 flex items-center justify-center text-lg shadow-md shrink-0">
                ☕
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-none">Barista Bot</p>
                <p className="text-amber-400 text-xs mt-0.5">Vibe Caffè · online</p>
              </div>
            </div>
            <button
              onClick={() => setDeschis(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Închide chat"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* ZONA MESAJE */}
          <div
            ref={mesajeRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.15) transparent' }}
          >
            {mesaje.map((m, i) => (
              <div key={i}>
                <div className={`flex ${m.rol === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      m.rol === 'user'
                        ? 'bg-teal-600 text-white rounded-br-sm'
                        : 'bg-white/95 text-gray-800 rounded-bl-sm shadow-md shadow-black/30'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>

                {/* #5 — CTA Rezervare sub mesajul botului */}
                {m.rol === 'bot' && contineRezervare(m.text) && (
                  <div className="flex justify-start mt-1.5">
                    <Link
                      href="/rezervari"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl transition-all active:scale-95"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      Rezervă acum →
                    </Link>
                  </div>
                )}
              </div>
            ))}

            {/* #1 — Quick Reply Chips (doar după mesajul inițial) */}
            {chipsAfisate && mesaje.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {CHIPS.map(chip => (
                  <button
                    key={chip}
                    onClick={() => trimite(chip)}
                    className="px-3 py-1.5 bg-white/10 hover:bg-amber-600/30 border border-white/20 hover:border-amber-500/50 text-white/80 hover:text-white text-xs rounded-xl transition-all active:scale-95"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Indicator scriere */}
            {seIncarca && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                  <span className="dot1 w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                  <span className="dot2 w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                  <span className="dot3 w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                </div>
              </div>
            )}
          </div>

          {/* INPUT */}
          <div
            className="px-3 py-3 border-t border-white/10 flex gap-2 items-center shrink-0"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Scrie un mesaj..."
              disabled={seIncarca}
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-amber-500 transition-all disabled:opacity-50"
            />
            <button
              onClick={() => trimite()}
              disabled={!input.trim() || seIncarca}
              className="w-9 h-9 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all active:scale-95 shrink-0"
              aria-label="Trimite mesaj"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── BUTON FLOATING ────────────────────────────────────────────────── */}
      <button
        onClick={() => setDeschis(prev => !prev)}
        className={`chat-pulse-btn ${!deschis ? 'chat-pulse' : ''}`}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#d97706',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          border: 'none',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}
        aria-label={deschis ? 'Închide chat' : 'Deschide chat Barista Bot'}
      >
        {deschis ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}

        {/* #2 — Badge mesaje necitite */}
        {mesajeNecitite > 0 && !deschis && (
          <span className="badge-pop absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center pointer-events-none">
            {mesajeNecitite > 9 ? '9+' : mesajeNecitite}
          </span>
        )}
      </button>
    </>
  );
}
