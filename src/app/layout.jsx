// src/app/layout.jsx
'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './global.css';

export const metadata = {
  title: 'Aglio & Pasta',
  description: 'Italian Restaurant',
};

export default function RootLayout({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <html lang="pt-br">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
        <link rel="shortcut icon" href="/Logo.svg" type="image/x-icon" />
      </head>
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}