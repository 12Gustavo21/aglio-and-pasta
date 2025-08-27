// src/components/modal/index.jsx
"use client";

import { useEffect } from 'react';
import AOS from 'aos';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    // Inicializar AOS
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: false
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Refresh AOS quando o modal abrir
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function para restaurar o scroll quando o componente for desmontado
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop com blur elegante e fade-in */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
        data-aos="fade-in"
        data-aos-duration="400"
      />
      
      {/* Modal Content com animação zoom-in-up */}
      <div 
        className="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-lg mx-4 border border-gray-200/50"
        data-aos="zoom-in-up"
        data-aos-duration="500"
        data-aos-delay="100"
      >
        <div className="relative p-8">
          {/* Botão de fechar elegante com animação */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-110"
            data-aos="fade-left"
            data-aos-duration="300"
            data-aos-delay="300"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Decoração sutil com animação */}
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
            data-aos="fade-down"
            data-aos-duration="400"
            data-aos-delay="200"
          ></div>
          
          {/* Container do conteúdo com animação */}
          <div 
            data-aos="fade-up"
            data-aos-duration="500"
            data-aos-delay="250"
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;