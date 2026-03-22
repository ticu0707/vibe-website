'use client';

/**
 * 🎯 MENU STARTER - Secțiunea "Meniul Nostru"
 * Tab-uri cu imagini Unsplash + hover effects + smooth fade transition
 */

import { useState } from 'react';

const menu = {
  Espresso: [
    { name: 'Espresso',     price: 12, description: 'Shot dublu de espresso intens',             image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&auto=format&fit=crop&q=80' },
    { name: 'Americano',    price: 14, description: 'Espresso diluat cu apă caldă',               image: 'https://images.unsplash.com/photo-1534687941688-651ccaafbff8?w=400&auto=format&fit=crop&q=80' },
    { name: 'Cappuccino',   price: 16, description: 'Espresso cu lapte spumat',                   image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&auto=format&fit=crop&q=80' },
    { name: 'Flat White',   price: 17, description: 'Microfoam mătăsos peste espresso',           image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&auto=format&fit=crop&q=80' },
    { name: 'Latte',        price: 17, description: 'Espresso cu lapte abundent',                 image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&auto=format&fit=crop&q=80' },
    { name: 'Mocha',        price: 18, description: 'Espresso cu ciocolată și lapte spumat',      image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&auto=format&fit=crop&q=80' },
  ],
  Specialty: [
    { name: 'Caramel Latte',             price: 18, description: 'Latte cu sirop de caramel și frișcă',          image: 'https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?w=400&auto=format&fit=crop&q=80' },
    { name: 'Hazelnut Latte',            price: 18, description: 'Latte cu sirop de alune de pădure',            image: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=400&auto=format&fit=crop&q=80' },
    { name: 'White Chocolate Mocha',     price: 20, description: 'Espresso cu ciocolată albă și lapte spumat',   image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&auto=format&fit=crop&q=80' },
    { name: 'Coconut Latte',             price: 19, description: 'Espresso cu lapte de cocos, tropical',         image: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=400&auto=format&fit=crop&q=80' },
    { name: 'Salted Caramel Cappuccino', price: 19, description: 'Cappuccino cu caramel sărat și spumă densă',   image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&auto=format&fit=crop&q=80' },
    { name: 'Espresso Tonic',            price: 17, description: 'Espresso răcit cu apă tonică și gheață',       image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&auto=format&fit=crop&q=80' },
  ],
  'Cold Brew': [
    { name: 'Cold Brew Classic',  price: 16, description: 'Infuzat 24h la rece, neted și dulce',         image: 'https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=400&auto=format&fit=crop&q=80' },
    { name: 'Cold Brew Tonic',    price: 18, description: 'Cold brew cu apă tonică și portocală',        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&auto=format&fit=crop&q=80' },
    { name: 'Iced Latte',         price: 17, description: 'Espresso cu lapte rece și gheață',            image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&auto=format&fit=crop&q=80' },
    { name: 'Iced Matcha',        price: 18, description: 'Matcha japoneză cu lapte de ovăz',            image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop&q=80' },
    { name: 'Frappé',             price: 19, description: 'Blended cu gheață, sirop și lapte',           image: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=400&auto=format&fit=crop&q=80' },
    { name: 'Nitro Cold Brew',    price: 20, description: 'Infuzat cu azot, cremos ca berea',            image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&auto=format&fit=crop&q=80' },
  ],
  Patiserie: [
    { name: 'Croissant',        price: 12, description: 'Unt franțuzesc, foietaj perfect',               image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop&q=80' },
    { name: 'Pain au Chocolat', price: 14, description: 'Croissant cu ciocolată neagră 70%',             image: 'https://images.unsplash.com/photo-1681218424681-b4f8228ecea9?w=400&auto=format&fit=crop&q=80' },
    { name: 'Cheesecake',       price: 18, description: 'Cremă de brânză pe bază de biscuiți',          image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&auto=format&fit=crop&q=80' },
    { name: 'Tiramisu',         price: 16, description: 'Rețetă italiană tradițională cu mascarpone',    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&auto=format&fit=crop&q=80' },
    { name: 'Brownie',          price: 14, description: 'Ciocolată intensă, interior moale',             image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&auto=format&fit=crop&q=80' },
    { name: 'Muffin Afine',     price: 12, description: 'Pufos, cu afine proaspete și lămâie',          image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&auto=format&fit=crop&q=80' },
  ],
};

type Category = keyof typeof menu;
const categories = Object.keys(menu) as Category[];

export default function MenuStarter() {
  const [activeTab, setActiveTab] = useState<Category>('Espresso');
  const [visible, setVisible] = useState(true);

  const switchTab = (cat: Category) => {
    if (cat === activeTab) return;
    setVisible(false);
    setTimeout(() => {
      setActiveTab(cat);
      setVisible(true);
    }, 180);
  };

  return (
    <section id="menu" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* TITLU */}
        <h2 className="text-5xl font-bold text-center text-gray-900 mb-4">
          Meniul Nostru
        </h2>
        <p className="text-xl text-center text-gray-500 mb-12">
          Selectat cu grijă, preparat cu pasiune
        </p>

        {/* TAB-URI */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => switchTab(cat)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-amber-600 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID PRODUSE */}
        <div
          style={{
            transition: 'opacity 0.18s ease-out, transform 0.18s ease-out',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {menu[activeTab].map((item) => (
            <div
              key={item.name}
              className="group bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              {/* IMAGINE */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>

              {/* TEXT */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold text-gray-900">{item.name}</h3>
                  <span className="text-amber-600 font-bold whitespace-nowrap ml-2">
                    {item.price} RON
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
