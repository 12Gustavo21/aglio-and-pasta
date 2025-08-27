'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/supabaseClient';

const CategoriesContent = () => {
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
      setCategories(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  return (
    <section className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
        Our Menu Categories
      </h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {categories.map((category, index) => (
          <Link 
            href={`/categories/${category.name.toLowerCase()}`} 
            key={category.id || index}
            className="category-card flex flex-col items-center text-center cursor-pointer"
            data-aos="fade-up"
          >
            <div className="relative mb-4 rounded-full w-32 h-32 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
              <Image 
                src={category.imagepath} 
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="title-category text-lg font-semibold text-gray-900">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

const DynamicCategoriesContent = dynamic(() => Promise.resolve(CategoriesContent), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">Carregando...</div>
});

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DynamicCategoriesContent />
    </div>
  );
};

export default CategoriesPage;