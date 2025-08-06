import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import categoriesData from '../../data/categories';

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>
          Our Menu Categories
        </h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {categoriesData.map((category, index) => (
            <Link 
              href={`/categories/${category.name.toLowerCase()}`} 
              key={index}
              className="category-card flex flex-col items-center text-center cursor-pointer"
              data-aos="fade-up"
            >
              <div className="category-image mb-4 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center rounded-full w-32 h-32">
                <Image 
                  src={category.imagePath} 
                  alt={category.name}
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
              <h3 className="title-category text-lg font-semibold text-gray-900">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;