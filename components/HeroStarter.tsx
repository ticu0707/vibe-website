'use client';

/**
 * 🎯 HERO STARTER - Versiunea simplă pentru cursanți
 *
 * Aceasta este versiunea MINIMALISTĂ de la care plecăm în curs.
 * Fără animații, fără video, fără JavaScript complex.
 * Doar HTML + Tailwind CSS = fundația de bază.
 */

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};

export default function HeroStarter() {
  const scrollDown = () => scrollToSection('features');

  return (
    <section className="relative min-h-screen flex items-center justify-center">

      {/* ANIMATII CSS - fade-in staggered */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-title    { animation: fadeInUp 0.7s ease-out 0.5s both; }
        .hero-subtitle { animation: fadeInUp 0.7s ease-out 0.8s both; }
        .hero-buttons  { animation: fadeInUp 0.7s ease-out 1.1s both; }
        .hero-scroll   { animation: fadeInUp 0.7s ease-out 1.5s both; }
      `}</style>

      {/* IMAGINE FUNDAL */}
      <img
        src="https://images.unsplash.com/photo-1546863144-358a422ce763?w=1920&auto=format&fit=crop&q=80"
        alt="Cafea preparată artistic"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* OVERLAY semi-transparent */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">

        {/* TITLU PRINCIPAL */}
        <h1
          className="hero-title text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight"
          style={{ textShadow: '0 4px 24px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.8)' }}
        >
          Simte diferența la prima înghițitură
        </h1>

        {/* SUBTITLU */}
        <p
          className="hero-subtitle text-3xl md:text-4xl lg:text-5xl mb-8 text-white/90 font-bold tracking-wide"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
        >
          Nu servim cafea. Creăm momente.
        </p>

        {/* BUTOANE CTA */}
        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">

          {/* BUTON 1 - Primary */}
          <button
            onClick={() => scrollToSection('menu')}
            className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-full border-2 border-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Vezi Meniul
          </button>

          {/* BUTON 2 - Secondary */}
          <a
            href="#locatie"
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/10"
          >
            Vizitează-ne
          </a>

          {/* BUTON 3 - Tertiary */}
          <a
            href="#pickup"
            className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-full border-2 border-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Comandă Pickup
          </a>

        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <button
        onClick={scrollDown}
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 text-white/75 hover:text-white transition-colors duration-300 animate-bounce"
        style={{ color: '#39FF14', filter: 'drop-shadow(0 0 8px #39FF14)' }}
        aria-label="Scroll în jos"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

    </section>
  );
}
