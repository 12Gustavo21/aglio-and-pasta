"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/supabaseClient';
const PopularPastas = () => {
  const [itemsParaMostrar, setItemsParaMostrar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${SUPABASE_URL}/rest/v1/favorites_massas?select=*`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })
    .then(response => {
      setItemsParaMostrar(response.data.slice(0, 8));
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <section className="container mx-auto px-4 mb-16" id="collections">
      <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
        Most popular pastas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {itemsParaMostrar.map((item, index) => (
          <div 
            key={index}
            className="relative h-64 rounded-lg overflow-hidden group shadow-lg hover:shadow-xl transition-shadow duration-300"
            data-aos="fade-up"
          >
            <img
              src={item.imagepath}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            
            <div className="absolute inset-0 flex items-end p-6">
              <div className="transform transition-transform duration-300 ease-in-out group-hover:-translate-y-2">
                <h3 className="text-white text-xl font-bold mb-2">
                  {item.name}
                </h3>
                <button className="bg-white text-black px-4 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularPastas;