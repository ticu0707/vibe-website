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
    0%, 100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.5); }
    50%       { box-shadow: 0 0 0 12px rgba(20, 184, 166, 0); }
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

  /* Ascunde butonul floating pe mobil când chat-ul e deschis */
  @media (max-width: 639px) {
    .chat-float-hidden { display: none !important; }
  }

  /* Chat window: full screen pe mobil, floating pe desktop */
  .chat-window {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  @media (min-width: 640px) {
    .chat-window {
      inset: auto;
      bottom: 96px;
      right: 24px;
      width: 390px;
      max-width: 24rem;
      height: 480px;
      border-radius: 1rem;
      border: 1px solid rgba(255,255,255,0.2);
    }
  }
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

interface ChipContextual {
  label: string;
  href?: string;  // dacă există, chipul e link de navigare
}

// Detectează contextul răspunsului și returnează chips contextuale
function getChipsContextuale(text: string): ChipContextual[] | null {
  if (/meniu|cafea|espresso|cappuccino|latte|specialty|cold brew|desert|patiserie|recomand/i.test(text)) {
    return [
      { label: 'Produse vegane' },
      { label: 'Deserturi',  href: '/?tab=Patiserie#menu' },
      { label: 'Cafea rece', href: '/?tab=Cold+Brew#menu' },
      { label: 'Rezervare',  href: '/rezervari' },
    ];
  }
  if (/rezerv/i.test(text)) {
    return [
      { label: 'F\u0103 o rezervare', href: '/rezervari' },
      { label: 'Program' },
    ];
  }
  return null;
}

// #1 — Quick reply chips inițiale
const CHIPS: ChipContextual[] = [
  { label: 'Vezi meniu',  href: '/#menu' },
  { label: 'Recomandări' },
  { label: 'Rezervări',   href: '/rezervari' },
  { label: 'Program' },
];

// Curăță markdown brut (##, **, *) și redă link-urile ca elemente clickabile
function renderMessage(text: string): React.ReactNode {
  const cleaned = text
    .replace(/#{1,6}\s+/g, '')           // ## Titlu → Titlu
    .replace(/\*\*([^*]+)\*\*/g, '$1')   // **bold** → bold
    .replace(/\*([^*]+)\*/g, '$1')        // *italic* → italic
    .replace(/`([^`]+)`/g, '$1');         // `code` → code

  const parts = cleaned.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (match) {
      return (
        <Link
          key={i}
          href={match[2]}
          className="underline text-amber-400 hover:text-amber-300 transition-colors"
        >
          {match[1]}
        </Link>
      );
    }
    return part;
  });
}

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
  const [chipsContextuale, setChipsContextuale] = useState<ChipContextual[] | null>(null);
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
    setChipsContextuale(null);
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
      setChipsContextuale(getChipsContextuale(raspuns));

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
          className="chat-slidein chat-window"
          style={{
            background: 'linear-gradient(160deg, #0F172A 0%, #042F2E 100%)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(20,184,166,0.15)',
          }}
        >
          {/* HEADER */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0"
            style={{ background: 'rgba(20,184,166,0.08)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-teal-500 flex items-center justify-center text-lg shadow-md shrink-0">
                ☕
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-none">Barista Bot</p>
                <p className="text-teal-300 text-xs mt-0.5">Vibe Caffè · online</p>
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
                        ? 'bg-amber-600 text-white rounded-br-sm'
                        : 'bg-white/95 text-gray-800 rounded-bl-sm shadow-md shadow-black/30'
                    }`}
                  >
                    {renderMessage(m.text)}
                  </div>
                </div>

                {/* #5 — CTA Rezervare sub mesajul botului */}
                {m.rol === 'bot' && contineRezervare(m.text) && (
                  <div className="flex justify-start mt-1.5">
                    <Link
                      href="/rezervari"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-xl transition-all active:scale-95"
                      onClick={() => setDeschis(false)}
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

                {/* Chips contextuale — doar sub ultimul mesaj al botului */}
                {m.rol === 'bot' && i === mesaje.length - 1 && chipsContextuale && (
                  <div className="flex flex-wrap gap-2 pt-1 mt-1.5">
                    {chipsContextuale.map(({ label, href }) => {
                      const chipClass = "px-3 py-1.5 bg-white/10 hover:bg-teal-500/20 border border-white/20 hover:border-teal-400/60 text-white/80 hover:text-white text-xs rounded-xl transition-all active:scale-95";
                      if (href) return (
                        <Link key={label} href={href} className={chipClass} onClick={() => setDeschis(false)}>{label}</Link>
                      );
                      return (
                        <button key={label} onClick={() => trimite(label)} className={chipClass}>{label}</button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* #1 — Quick Reply Chips (doar după mesajul inițial) */}
            {chipsAfisate && mesaje.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {CHIPS.map(({ label, href }) => {
                  const chipClass = "px-3 py-1.5 bg-white/10 hover:bg-teal-500/20 border border-white/20 hover:border-teal-400/60 text-white/80 hover:text-white text-xs rounded-xl transition-all active:scale-95";
                  if (href) return (
                    <Link key={label} href={href} className={chipClass} onClick={() => setDeschis(false)}>{label}</Link>
                  );
                  return (
                    <button key={label} onClick={() => trimite(label)} className={chipClass}>{label}</button>
                  );
                })}
              </div>
            )}

            {/* Indicator scriere */}
            {seIncarca && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                  <span className="dot1 w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
                  <span className="dot2 w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
                  <span className="dot3 w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
                </div>
              </div>
            )}
          </div>

          {/* INPUT */}
          <div
            className="px-3 py-3 border-t border-white/10 flex gap-2 items-center shrink-0"
            style={{ background: 'rgba(20,184,166,0.05)' }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Scrie un mesaj..."
              disabled={seIncarca}
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-teal-400 transition-all disabled:opacity-50"
            />
            <button
              onClick={() => trimite()}
              disabled={!input.trim() || seIncarca}
              className="w-9 h-9 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all active:scale-95 shrink-0"
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
        className={`chat-pulse-btn ${!deschis ? 'chat-pulse' : 'chat-float-hidden'}`}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#14B8A6',
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
