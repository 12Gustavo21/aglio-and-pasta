"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaRegHeart, FaCartPlus, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/supabaseClient';
const Offers = ({ onAddToCart }) => {
  const [itemsParaMostrar, setItemsParaMostrar] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
    const calcularDesconto = (preco, desconto) => {
    const tirar = (100 - desconto) / 100;
    let valorFinal = preco * tirar;
    valorFinal = Math.ceil(valorFinal);
    return (valorFinal - 0.1).toFixed(2);
  };

  const addToCart = (item) => {
    const stored = localStorage.getItem("cart");
    let cart = stored ? JSON.parse(stored) : [];
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      cart.push({ ...item, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    if (onAddToCart) onAddToCart();
  };

  const renderizarEstrelas = (nota) => {
    const estrelas = [];
    const estrelasCheias = Math.floor(nota / 2);
    const temMeiaEstrela = nota % 2 !== 0;
    const estrelasVazias = 5 - estrelasCheias - (temMeiaEstrela ? 1 : 0);

    for (let i = 0; i < estrelasCheias; i++) {
      estrelas.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }

    if (temMeiaEstrela) {
      estrelas.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }

    for (let i = 0; i < estrelasVazias; i++) {
      estrelas.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500" />);
    }

    return estrelas;
  };

  const toggleFavorito = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  useEffect(() => {
    axios.get(`${SUPABASE_URL}/rest/v1/promotions?select=*`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    })
    .then(response => {
      setItemsParaMostrar(response.data.slice(0, 8));
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <section className="container mx-auto px-4 mb-16" id="delicious">
      <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
        House Offers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {itemsParaMostrar.map((item, index) => (
          <div 
            key={index}
            className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            data-aos="fade-up"
          >
            <div className="relative">
              <img 
                src={item.imagepath} 
                alt={item.name} 
                className="w-full h-48 object-cover" 
              />
              
              <div className="absolute top-3 right-3 bg-black/50 text-white text-[10px] font-semibold py-1 px-2 rounded-md">
                {item.desconto}% OFF
              </div>
              
              <button 
                className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 transition-colors"
                onClick={() => toggleFavorito(index)}
              >
                {favorites[index] ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h3>
                </div>
                <div className="flex mt-1">
                  {renderizarEstrelas(item.rating)}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-baseline space-x-2">
                  <span className="text-xl font-bold text-gray-900">
                    R${calcularDesconto(item.price, item.desconto)}
                  </span>
                  <del className="text-gray-400 text-sm">R${item.price}</del>
                </div>
              <button
                className="bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white transition-all duration-300 font-bold w-10 h-10 rounded-full flex items-center justify-center"
                onClick={() => addToCart(item)}
                title="Adicionar ao carrinho"
              >
                <FaCartPlus />
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offers;







