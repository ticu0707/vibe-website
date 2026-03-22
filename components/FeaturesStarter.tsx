'use client';

/**
 * 🎯 FEATURES STARTER - Secțiunea "De ce Vibe Coffee?"
 * Layout Bento Grid cu imagini Unsplash + hover effects + scroll animations
 */

import { useEffect, useRef, useState } from 'react';

const cards = [
  {
    emoji: '☕',
    title: 'Cafea de Specialitate',
    description: 'Boabe selectate din cele mai renumite origini ale lumii — Ethiopia, Colombia, Guatemala. Prăjite local, proaspăt, pentru fiecare ceașcă în parte.',
    tag: 'Single Origin · Specialty Grade',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Cafea preparată artistic',
  },
  {
    emoji: '🥐',
    title: 'Patiserie Artizanală',
    description: 'Croissante, tarte și prăjituri preparate zilnic în bucătăria noastră. Ingrediente naturale, rețete tradiționale.',
    tag: 'Fresh Daily',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Patiserie artizanală',
  },
  {
    emoji: '🌿',
    title: 'Ambient Relaxant',
    description: 'Un spațiu gândit pentru tine — lumină naturală, muzică ambientală și WiFi rapid. Locul perfect pentru lucru sau relaxare.',
    tag: 'WiFi · Lumină Naturală',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
    imageAlt: 'Interior cafenea modern',
  },
];

function useScrollAnimation(delay: number) {
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

  const style = {
    transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(40px)',
  };

  return { ref, style };
}

export default function FeaturesStarter() {
  const card0 = useScrollAnimation(0);
  const card1 = useScrollAnimation(150);
  const card2 = useScrollAnimation(300);
  const animations = [card0, card1, card2];

  return (
    <section id="features" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        {/* TITLU SECTIUNE */}
        <h2 className="text-5xl font-bold text-center text-gray-900 mb-4">
          De ce Vibe Coffee?
        </h2>

        {/* SUBTITLU */}
        <p className="text-xl text-center text-gray-500 mb-14">
          Experiență unică, ingrediente premium, atmosferă perfectă
        </p>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CARD 1 - MARE STÂNGA */}
          <div
            ref={animations[0].ref}
            style={animations[0].style}
            className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            {/* IMAGINE */}
            <div className="h-56 md:h-64 overflow-hidden">
              <img
                src={cards[0].image}
                alt={cards[0].imageAlt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            {/* TEXT */}
            <div className="p-10 flex flex-col justify-between flex-1">
              <div>
                <span className="text-4xl mb-4 block">{cards[0].emoji}</span>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{cards[0].title}</h3>
                <p className="text-gray-500 text-lg leading-relaxed">{cards[0].description}</p>
              </div>
              <div className="mt-6">
                <span className="inline-block px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
                  {cards[0].tag}
                </span>
              </div>
            </div>
          </div>

          {/* COLOANA DREAPTA */}
          <div className="flex flex-col gap-6">

            {/* CARD 2 - MIC SUS */}
            <div
              ref={animations[1].ref}
              style={animations[1].style}
              className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex-1 flex flex-col"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={cards[1].image}
                  alt={cards[1].imageAlt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-3xl mb-3 block">{cards[1].emoji}</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{cards[1].title}</h3>
                  <p className="text-gray-500 leading-relaxed">{cards[1].description}</p>
                </div>
                <span className="inline-block mt-4 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium w-fit">
                  {cards[1].tag}
                </span>
              </div>
            </div>

            {/* CARD 3 - MIC JOS */}
            <div
              ref={animations[2].ref}
              style={animations[2].style}
              className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex-1 flex flex-col"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={cards[2].image}
                  alt={cards[2].imageAlt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-3xl mb-3 block">{cards[2].emoji}</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{cards[2].title}</h3>
                  <p className="text-gray-500 leading-relaxed">{cards[2].description}</p>
                </div>
                <span className="inline-block mt-4 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium w-fit">
                  {cards[2].tag}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
