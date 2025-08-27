'use client';

import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 'slide1',
      img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-4.0.3&w=1200',
      title: 'Spaghetti',
      subtitle: 'Carbonara',
      description: 'Tradizione romana autentica',
      color: 'text-yellow-300'
    },
    {
      id: 'slide2',
      img: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?ixlib=rb-4.0.3&w=1200',
      title: 'Fettuccine',
      subtitle: 'Alfredo',
      description: 'Cremosa eleganza romana',
      color: 'text-green-300'
    },
    {
      id: 'slide3',
      img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&w=1200',
      title: 'Panna Cotta',
      subtitle: 'ai Frutti',
      description: 'Dolcezza setosa del Piemonte',
      color: 'text-red-300'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[550px] overflow-hidden shadow-2xl">
      <div 
        className="flex w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative w-full h-full flex-shrink-0">
            <div className="absolute inset-0">
              <img 
                src={slide.img} 
                alt={slide.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>

            <div 
              className="absolute top-4 right-4 w-16 h-10 rounded shadow-lg"
              style={{
                background: 'linear-gradient(to right, #008C45 0%, #008C45 33.33%, #F4F5F0 33.33%, #F4F5F0 66.66%, #CD212A 66.66%, #CD212A 100%)'
              }}
            ></div>

            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h2 
                className="text-5xl font-bold mb-4 flex flex-col"
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                }}
              >
                {slide.title} 
                <span className={slide.color}>{slide.subtitle}</span>
              </h2>
              <p className="text-xl italic opacity-90">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;