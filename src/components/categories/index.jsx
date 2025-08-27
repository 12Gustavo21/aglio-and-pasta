"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/supabaseClient';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${SUPABASE_URL}/rest/v1/categories?select=*`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })
    .then(response => {
      setCategories(response.data.slice(0, 6));
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <section className="container mx-auto px-6 my-8 md:my-12">
      <h2 className="text-4xl font-bold text-left text-gray-800 mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
        Popular Categories
      </h2>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
        {categories.map((category, index) => (
          <Link href="/categories" key={index} className="group block text-center" data-aos="fade-up">
            <figure>
              <div className="relative w-24 h-24 md:w-40 md:h-40 mx-auto">
                <Image 
                  src={category.imagepath} 
                  alt={category.name}
                  width={160}
                  height={160}
                  className="rounded-full shadow-md transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <figcaption className="mt-4">
                <span className="font-semibold text-gray-700 transition-colors group-hover:text-red-600">
                  {category.name}
                </span>
              </figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;