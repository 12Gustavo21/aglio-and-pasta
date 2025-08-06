// src/components/Hero.jsx
'use client';

import { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    // Adiciona o CSS necessário para o gradiente da bandeira
    const style = document.createElement('style');
    style.innerHTML = `
      .italian-flag-gradient {
        background: linear-gradient(to right, 
          #008C45 0%, #008C45 33.33%, 
          #F4F5F0 33.33%, #F4F5F0 66.66%, 
          #CD212A 66.66%, #CD212A 100%);
      }
      .italian-text-shadow {
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div id="hero-carousel" className="carousel carousel-center w-full h-[550px] overflow-hidden shadow-2xl relative">
      {/* Slides do carrossel */}
      {[
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
      ].map((slide) => (
        <div key={slide.id} id={slide.id} className="carousel-item relative w-full">
          <div className="absolute inset-0">
            <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
          <div className="absolute top-4 right-4 w-16 h-10 italian-flag-gradient rounded shadow-lg"></div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h2 
              className="text-5xl font-bold mb-4 flex flex-col italian-text-shadow" 
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {slide.title} <span className={slide.color}>{slide.subtitle}</span>
            </h2>
            <p className="text-xl italic opacity-90">{slide.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;