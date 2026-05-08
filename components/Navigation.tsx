'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const links = [
  { label: 'Beneficii', href: '#features' },
  { label: 'Meniu',     href: '#menu' },
  { label: 'Despre',    href: '#about' },
  { label: 'Rezervări', href: '/rezervari' },
];

const scrollToAnchor = (href: string) => {
  if (!href.startsWith('#')) return false;
  const el = document.getElementById(href.slice(1));
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });
  return true;
};

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (scrollToAnchor(href)) {
      e.preventDefault();
      setMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-gradient-to-b from-black/40 to-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <a
          href="/"
          className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
            scrolled ? 'text-gray-900' : 'text-white'
          }`}
        >
          Vibe Caffè
        </a>

        {/* LINKS - desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`text-sm font-semibold transition-colors duration-300 hover:text-amber-500 ${
                scrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA - desktop */}
        <a
          href="/rezervari"
          className="hidden md:block px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-full transition-all duration-200 hover:scale-105"
        >
          Rezervă un loc
        </a>

        {/* HAMBURGER - mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-gray-900' : 'text-white'
          }`}
          aria-label="Deschide meniu"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-gray-800 font-semibold py-2 hover:text-amber-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/rezervari"
            className="mt-2 px-5 py-3 bg-amber-600 text-white font-semibold rounded-full text-center hover:bg-amber-500 transition-colors"
          >
            Rezervă un loc
          </a>
        </div>
      )}
    </nav>
  );
}
