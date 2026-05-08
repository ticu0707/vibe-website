/**
 * 🦶 FOOTER STARTER - Footer minimal pentru cursanți
 *
 * Footer simplu cu copyright.
 * Fără rețele sociale, fără linkuri complexe.
 */

export default function FooterStarter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* BRAND */}
          <div>
            <p className="text-xl font-bold mb-2">Vibe Caffè</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Cafea de specialitate, patiserie artizanală și un ambient care te face să rămâi mai mult decât ai plănuit.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <p className="font-semibold mb-3 text-gray-200">Navigare</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/#features" className="hover:text-amber-400 transition-colors">De ce Vibe?</a></li>
              <li><a href="/#menu" className="hover:text-amber-400 transition-colors">Meniu</a></li>
              <li><a href="/#about" className="hover:text-amber-400 transition-colors">Despre noi</a></li>
              <li><a href="/rezervari" className="hover:text-amber-400 transition-colors">Rezervări</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <p className="font-semibold mb-3 text-gray-200">Contact</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Strada Cafelei 7, București</li>
              <li>Luni – Vineri: 07:00 – 21:00</li>
              <li>Weekend: 08:00 – 22:00</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          © 2026 Vibe Caffè. Toate drepturile rezervate.
        </div>
      </div>
    </footer>
  );
}
