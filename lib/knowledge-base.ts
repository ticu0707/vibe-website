/**
 * VIBE CAFFÈ — KNOWLEDGE BASE
 *
 * Toate datele despre cafenea centralizate într-un singur loc.
 * Folosit ca system prompt pentru Barista Bot (ChatWidget AI).
 */

// ---------------------------------------------------------------------------
// TIPURI
// ---------------------------------------------------------------------------

interface Produs {
  nume: string
  pret: number        // RON
  categorie: string
  descriere: string
  ingrediente: string[]
  vegan: boolean
}

interface Categorie {
  nume: string
  emoji: string
}

// ---------------------------------------------------------------------------
// PRODUSE — 24 total (6 per categorie)
// ---------------------------------------------------------------------------

const PRODUSE: Produs[] = [
  // ── ESPRESSO ──────────────────────────────────────────────────────────────
  {
    nume: 'Espresso',
    pret: 12,
    categorie: 'Espresso',
    descriere: 'Shot dublu de espresso intens',
    ingrediente: ['cafea arabica', 'apă'],
    vegan: true,
  },
  {
    nume: 'Americano',
    pret: 14,
    categorie: 'Espresso',
    descriere: 'Espresso diluat cu apă caldă',
    ingrediente: ['cafea arabica', 'apă caldă'],
    vegan: true,
  },
  {
    nume: 'Cappuccino',
    pret: 16,
    categorie: 'Espresso',
    descriere: 'Espresso cu lapte spumat',
    ingrediente: ['cafea arabica', 'lapte', 'spumă lapte'],
    vegan: false,
  },
  {
    nume: 'Flat White',
    pret: 17,
    categorie: 'Espresso',
    descriere: 'Microfoam mătăsos peste espresso',
    ingrediente: ['cafea arabica', 'microfoam lapte'],
    vegan: false,
  },
  {
    nume: 'Latte',
    pret: 17,
    categorie: 'Espresso',
    descriere: 'Espresso cu lapte abundent',
    ingrediente: ['cafea arabica', 'lapte', 'spumă ușoară'],
    vegan: false,
  },
  {
    nume: 'Mocha',
    pret: 18,
    categorie: 'Espresso',
    descriere: 'Espresso cu ciocolată și lapte spumat',
    ingrediente: ['cafea arabica', 'ciocolată', 'lapte', 'spumă lapte'],
    vegan: false,
  },

  // ── SPECIALTY ─────────────────────────────────────────────────────────────
  {
    nume: 'Caramel Latte',
    pret: 18,
    categorie: 'Specialty',
    descriere: 'Latte cu sirop de caramel și frișcă',
    ingrediente: ['cafea arabica', 'lapte', 'sirop caramel', 'frișcă'],
    vegan: false,
  },
  {
    nume: 'Hazelnut Latte',
    pret: 18,
    categorie: 'Specialty',
    descriere: 'Latte cu sirop de alune de pădure',
    ingrediente: ['cafea arabica', 'lapte', 'sirop alune de pădure'],
    vegan: false,
  },
  {
    nume: 'White Chocolate Mocha',
    pret: 20,
    categorie: 'Specialty',
    descriere: 'Espresso cu ciocolată albă și lapte spumat',
    ingrediente: ['cafea arabica', 'ciocolată albă', 'lapte', 'spumă lapte'],
    vegan: false,
  },
  {
    nume: 'Coconut Latte',
    pret: 19,
    categorie: 'Specialty',
    descriere: 'Espresso cu lapte de cocos, tropical',
    ingrediente: ['cafea arabica', 'lapte de cocos'],
    vegan: true,
  },
  {
    nume: 'Salted Caramel Cappuccino',
    pret: 19,
    categorie: 'Specialty',
    descriere: 'Cappuccino cu caramel sărat și spumă densă',
    ingrediente: ['cafea arabica', 'lapte', 'caramel sărat', 'spumă densă'],
    vegan: false,
  },
  {
    nume: 'Espresso Tonic',
    pret: 17,
    categorie: 'Specialty',
    descriere: 'Espresso răcit cu apă tonică și gheață',
    ingrediente: ['cafea arabica', 'apă tonică', 'gheață', 'portocală'],
    vegan: true,
  },

  // ── COLD BREW ─────────────────────────────────────────────────────────────
  {
    nume: 'Cold Brew Classic',
    pret: 16,
    categorie: 'Cold Brew',
    descriere: 'Infuzat 24h la rece, neted și dulce',
    ingrediente: ['cafea cold brew', 'apă'],
    vegan: true,
  },
  {
    nume: 'Cold Brew Tonic',
    pret: 18,
    categorie: 'Cold Brew',
    descriere: 'Cold brew cu apă tonică și portocală',
    ingrediente: ['cafea cold brew', 'apă tonică', 'portocală', 'gheață'],
    vegan: true,
  },
  {
    nume: 'Iced Latte',
    pret: 17,
    categorie: 'Cold Brew',
    descriere: 'Espresso cu lapte rece și gheață',
    ingrediente: ['espresso', 'lapte rece', 'gheață'],
    vegan: false,
  },
  {
    nume: 'Iced Matcha',
    pret: 18,
    categorie: 'Cold Brew',
    descriere: 'Matcha japoneză cu lapte de ovăz',
    ingrediente: ['matcha japoneză', 'lapte de ovăz', 'gheață'],
    vegan: true,
  },
  {
    nume: 'Frappé',
    pret: 19,
    categorie: 'Cold Brew',
    descriere: 'Blended cu gheață, sirop și lapte',
    ingrediente: ['espresso', 'lapte', 'gheață', 'sirop vanilie'],
    vegan: false,
  },
  {
    nume: 'Nitro Cold Brew',
    pret: 20,
    categorie: 'Cold Brew',
    descriere: 'Infuzat cu azot, cremos ca berea',
    ingrediente: ['cafea cold brew', 'azot'],
    vegan: true,
  },

  // ── PATISERIE ─────────────────────────────────────────────────────────────
  {
    nume: 'Croissant',
    pret: 12,
    categorie: 'Patiserie',
    descriere: 'Unt franțuzesc, foietaj perfect',
    ingrediente: ['făină', 'unt', 'ouă', 'drojdie', 'sare'],
    vegan: false,
  },
  {
    nume: 'Pain au Chocolat',
    pret: 14,
    categorie: 'Patiserie',
    descriere: 'Croissant cu ciocolată neagră 70%',
    ingrediente: ['făină', 'unt', 'ouă', 'ciocolată neagră 70%', 'drojdie'],
    vegan: false,
  },
  {
    nume: 'Cheesecake',
    pret: 18,
    categorie: 'Patiserie',
    descriere: 'Cremă de brânză pe bază de biscuiți',
    ingrediente: ['cremă de brânză', 'biscuiți', 'unt', 'ouă', 'zahăr', 'vanilie'],
    vegan: false,
  },
  {
    nume: 'Tiramisu',
    pret: 16,
    categorie: 'Patiserie',
    descriere: 'Rețetă italiană tradițională cu mascarpone',
    ingrediente: ['mascarpone', 'ouă', 'cafea espresso', 'piscoturi', 'cacao', 'zahăr'],
    vegan: false,
  },
  {
    nume: 'Brownie',
    pret: 14,
    categorie: 'Patiserie',
    descriere: 'Ciocolată intensă, interior moale',
    ingrediente: ['ciocolată', 'unt', 'ouă', 'zahăr', 'făină'],
    vegan: false,
  },
  {
    nume: 'Muffin Afine',
    pret: 12,
    categorie: 'Patiserie',
    descriere: 'Pufos, cu afine proaspete și lămâie',
    ingrediente: ['făină', 'ouă', 'unt', 'afine proaspete', 'lămâie', 'zahăr'],
    vegan: false,
  },
]

// ---------------------------------------------------------------------------
// CATEGORII
// ---------------------------------------------------------------------------

const CATEGORII: Categorie[] = [
  { nume: 'Espresso',  emoji: '☕' },
  { nume: 'Specialty', emoji: '✨' },
  { nume: 'Cold Brew', emoji: '🧊' },
  { nume: 'Patiserie', emoji: '🥐' },
]

// ---------------------------------------------------------------------------
// INFO CAFENEA
// ---------------------------------------------------------------------------

const INFO_CAFENEA = {
  nume:    'Vibe Caffè',
  slogan:  'Nu servim cafea. Creăm momente.',
  program: {
    deschidere: '08:00',
    inchidere:  '22:00',
    zile:       'Luni – Duminică',
  },
  locatie: {
    adresa: 'Strada Cafelei 7, București',
    maps:   'https://maps.google.com/?q=Strada+Cafelei+7,+București',
  },
  facilitati: [
    'WiFi gratuit',
    'Pet friendly',
    'Priză la fiecare masă',
    'Muzică live vineri',
  ],
  rezervari: '/rezervari',
}

// ---------------------------------------------------------------------------
// RECOMANDĂRI (calculate din PRODUSE)
// ---------------------------------------------------------------------------

const veganeProduse   = PRODUSE.filter(p => p.vegan)
const pretMin         = Math.min(...PRODUSE.map(p => p.pret))
const pretMax         = Math.max(...PRODUSE.map(p => p.pret))
const celeMaiIeftine  = PRODUSE.filter(p => p.pret === pretMin)
const celeMaiScumpe   = PRODUSE.filter(p => p.pret === pretMax)

const RECOMANDARI = {
  celMaiPopular: 'Cappuccino',
  celeMaiIeftine: celeMaiIeftine.map(p => `${p.nume} (${p.pret} RON)`),
  celeMaiScumpe:  celeMaiScumpe.map(p => `${p.nume} (${p.pret} RON)`),
  optiuniVegane:  veganeProduse.map(p => `${p.nume} (${p.pret} RON)`),
}

// ---------------------------------------------------------------------------
// KNOWLEDGE BASE STRING — folosit ca system prompt
// ---------------------------------------------------------------------------

export const KNOWLEDGE_BASE = `
=== VIBE CAFFÈ — KNOWLEDGE BASE ===

## PERSONALITATE

Nume: Barista Pasionat
Stil: Cald, entuziast, vorbești ca un barista adevărat care iubește cafeaua.
Folosești expresii specifice meseriei (microfoam, extracție, infuzare, note aromatice).
Când recomanzi ceva, ești convingător și personal — "Garantez că te surprinde!",
"Favoritele mele sunt...", "Nu poți să greșești cu...".
Ești mândru de fiecare produs din meniu și transmiți această pasiune în fiecare răspuns.

Tu ești Barista Bot, asistentul virtual al cafenelei Vibe Caffè.
Răspunzi mereu în română, ești cald și entuziast și cunoști meniul pe de rost.
Dacă nu știi ceva, recunoști și oferi să ajuți în alt mod.

---

## INFO CAFENEA

Nume: ${INFO_CAFENEA.nume}
Slogan: "${INFO_CAFENEA.slogan}"
Program: ${INFO_CAFENEA.program.deschidere}–${INFO_CAFENEA.program.inchidere}, ${INFO_CAFENEA.program.zile}
Adresă: ${INFO_CAFENEA.locatie.adresa}
Facilități: ${INFO_CAFENEA.facilitati.join(', ')}
Rezervări online: ${INFO_CAFENEA.rezervari}

---

## MENIU COMPLET

${CATEGORII.map(cat => {
  const produseCat = PRODUSE.filter(p => p.categorie === cat.nume)
  return `### ${cat.emoji} ${cat.nume.toUpperCase()}
${produseCat.map(p =>
  `- ${p.nume} — ${p.pret} RON${p.vegan ? ' [VEGAN]' : ''}
  Descriere: ${p.descriere}
  Ingrediente: ${p.ingrediente.join(', ')}`
).join('\n')}`
}).join('\n\n')}

---

## RECOMANDĂRI

Cel mai popular: ${RECOMANDARI.celMaiPopular}
Cele mai ieftine (${pretMin} RON): ${RECOMANDARI.celeMaiIeftine.join(', ')}
Cele mai scumpe (${pretMax} RON): ${RECOMANDARI.celeMaiScumpe.join(', ')}
Opțiuni vegane (${veganeProduse.length} produse): ${RECOMANDARI.optiuniVegane.join(', ')}

---

## REGULI RĂSPUNS

1. Fii scurt și cald — maxim 3-4 propoziții per răspuns.
2. Când recomanzi un produs, menționează prețul.
3. Dacă întreabă de alergeni, verifică lista de ingrediente și fii precis.
4. Dacă vrea să facă o rezervare, trimite-l la ${INFO_CAFENEA.rezervari}.
5. Nu inventa produse sau prețuri care nu există în meniu.
6. Dacă întreabă de program sau locație, răspunzi cu datele de mai sus.
`.trim()

// ---------------------------------------------------------------------------
// EXPORT DATE STRUCTURATE (opțional, pentru alte componente)
// ---------------------------------------------------------------------------

export { PRODUSE, CATEGORII, INFO_CAFENEA, RECOMANDARI }
