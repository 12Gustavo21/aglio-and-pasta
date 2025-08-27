"use client";
import { useState } from "react";
import Navbar from '../components/navBar';
import Hero from '../components/hero';
import Categories from '../components/categories';
import Offers from '../components/offers';
import PopularPastas from '../components/popularPastas';
import Footer from '../components/footer';
import CarouselScript from '../components/carrouselScript';
import ShopCart from '../components/shopCart';
import { FaShoppingCart } from "react-icons/fa";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [cartVersion, setCartVersion] = useState(0);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  // Função chamada ao adicionar ao carrinho
  const handleAddToCart = () => {
    setShowNotif(true);
    setCartVersion(v => v + 1);
    setTimeout(() => setShowNotif(false), 2000);
  };

  return (
    <div>
      {/* Botão */}
      <button
        className="fixed top-6 right-6 z-50 bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition"
        onClick={openCart}
        title="Abrir carrinho"
      >
        <FaShoppingCart size={22} />
      </button>
      <ShopCart open={cartOpen} onClose={closeCart} cartVersion={cartVersion} />

      {/* Notificação */}
      {showNotif && (
        <div className="fixed top-6 right-28 z-50 bg-green-500 text-white px-4 py-2 rounded shadow transition-all animate-bounce">
          Item adicionado ao carrinho!
        </div>
      )}

      <Navbar />
      <Hero />
      <Categories />
      <Offers onAddToCart={handleAddToCart} />
      <PopularPastas />
      <Footer />
      <CarouselScript />
    </div>
  );
}