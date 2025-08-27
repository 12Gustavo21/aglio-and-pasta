// src/components/navBar/index.jsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
// Caminhos atualizados para seguir sua estrutura de pastas
import Modal from '@/components/modal';
import LoginForm from '@/components/loginForm';
import RegisterForm from '@/components/registerForm';

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setIsLoginView(true);
    }, 300);
  };

  return (
    <>
      <nav className="container mx-auto px-4 py-6 flex justify-center flex-col items-center">
        <div className="flex justify-between items-center">
          <button className="text-gray-600">
            <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Aglio & Pasta
            </h1>
          </button>
        </div>
        <div className="flex justify-center space-x-8 mt-6">
          <Link href="/" className="text-gray-600 hover:text-gray-900">Home Page</Link>
          <Link href="/categories" className="text-gray-600 hover:text-gray-900">Categories</Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">Products</Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900">About us</Link>
          <button onClick={openModal} className="text-gray-600 hover:text-gray-900 font-semibold">
            Login
          </button>
        </div>
      </nav>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isLoginView ? (
          <LoginForm onSwitchToRegister={() => setIsLoginView(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLoginView(true)} />
        )}
      </Modal>
    </>
  );
};

export default Navbar;