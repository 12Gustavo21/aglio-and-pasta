'use client';

import { useEffect } from 'react';

const CarouselScript = () => {
  useEffect(() => {
    const carouselContainer = document.getElementById("hero-carousel");
    if (!carouselContainer) return;

    const slides = carouselContainer.querySelectorAll(".carousel-item");
    const totalSlides = slides.length;
    let currentSlide = 0;

    const autoSlide = () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      const slideWidth = carouselContainer.offsetWidth;
      carouselContainer.scrollTo({
        left: currentSlide * slideWidth,
        behavior: "smooth",
      });
    };

    const interval = setInterval(autoSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default CarouselScript;