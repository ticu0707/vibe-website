'use client';

/**
 * 📖 ABOUT STARTER - Povestea cafenelei Vibe Caffè
 * Layout: imagine stânga + text dreapta, responsive
 */

import { useEffect, useRef, useState } from 'react';

export default function AboutStarter() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* LABEL */}
        <p className="text-center text-amber-600 font-semibold tracking-widest uppercase text-sm mb-4">
          Povestea noastră
        </p>

        {/* TITLU */}
        <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">
          Despre Vibe Caffè
        </h2>

        {/* GRID: imagine + text */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-12 items-start"
          style={{
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
          }}
        >

          {/* IMAGINE */}
          <div className="rounded-3xl overflow-hidden shadow-2xl md:sticky md:top-24">
            <img
              src="/about-cafe.png"
              alt="Doi oameni la masă în Vibe Caffè"
              className="w-full h-auto hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* TEXT */}
          <div className="flex flex-col gap-6">

            <p className="text-gray-700 text-lg leading-relaxed">
              Nu sunt locul în care intri, spui „ce bine arată" și pleci mai departe. Sunt locul în care îți lași geaca pe spătar, pui telefonul cu ecranul în jos și nu te mai ridici când ai zis că te ridici.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Mă recunoști după lucruri mici: ceașca pusă pe masă, scaunul tras mai aproape, cheile lăsate lângă farfurioară, prima propoziție spusă din mers și a doua spusă deja mai încet.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Nu sunt aici ca să mă privești. Sunt aici ca să poți fi atent la cine ai în față.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Sunt multe locuri frumoase care te țin încordat. Te fac să stai prea drept, să vorbești prea jos, să simți că ești mai mult în trecere decât la masă. Eu n-am vrut asta.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              De aceea tot ce ține de mine e făcut să nu intre între oameni: liniile sunt clare, lumina cade bine, mesele au destul loc între ele, nimic nu apasă pe privire. Nu ca să par impecabil, ci ca să nu-ți cer nimic.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Să poți intra exact cum vii din ziua ta și, după câteva minute, să nu mai aduci toată graba cu tine.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Mă înțelegi cel mai bine când vii cu cineva. Unul ajunge primul și își ține palmele în jurul ceștii. Celălalt intră cu un „scuze, am întârziat puțin", trage scaunul, mută paharul mai aproape și se așază.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              La început se vorbește despre drum, despre zi, despre ce mai e de făcut. După aceea, masa se schimbă. Vocile se așază. Râsul vine mai repede. Pauzele nu mai trebuie umplute. Nimeni nu se mai uită la ceas din zece în zece minute.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Aici nu contează doar ce e în ceașcă. Contează că, în jurul ei, oamenii ajung să stea unii cu alții mai bine decât au venit.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Poate de asta oamenii nu se întorc doar pentru cafea. Se întorc pentru felul în care se întâmplă lucrurile aici: fără teatru, fără răceală, fără senzația că trebuie să fii altfel ca să-ți găsești locul.
            </p>

            <p className="text-gray-700 text-lg leading-relaxed">
              Eu nu vreau să te pun în poză. Vreau să te pun bine la masă. Iar dacă pleci mai târziu decât ți-ai propus, e semn bun. Înseamnă că n-ai trecut pe aici. <strong>Ai stat.</strong>
            </p>

            <p className="text-gray-700 text-lg leading-relaxed italic">
              Și uneori asta se vede simplu: în două cești goale, uitate pe masă, și în nimeni care nu se grăbește încă să le împingă spre margine.
            </p>

            {/* STATISTICI */}
            <div className="grid grid-cols-3 gap-4 mt-4 pt-6 border-t border-gray-100">
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-600">3+</p>
                <p className="text-gray-500 text-sm mt-1">Ani de experiență</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-600">24</p>
                <p className="text-gray-500 text-sm mt-1">Produse în meniu</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-600">∞</p>
                <p className="text-gray-500 text-sm mt-1">Momente create</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
