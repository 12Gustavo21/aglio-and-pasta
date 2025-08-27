"use client";
import { useEffect, useState } from "react";

const ShopCart = ({ open, onClose, cartVersion }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (open || cartVersion !== undefined) {
      const stored = localStorage.getItem("cart");
      setCart(stored ? JSON.parse(stored) : []);
    }
  }, [open, cartVersion]);

  const updateQty = (id, delta) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const finalizarCompra = () => {
    alert("Compra finalizada! Obrigado :)");
    setCart([]);
    localStorage.removeItem("cart");
    onClose();
  };

  const total = cart.reduce(
    (sum, item) => sum + (item.price * (item.qty || 1)),
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ transition: "transform 0.3s" }}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Carrinho</h2>
        <button onClick={onClose} className="text-2xl">&times;</button>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-gray-500">Seu carrinho está vazio.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-center mb-4">
              <img src={item.imagepath} alt={item.name} className="w-14 h-14 rounded object-cover mr-3" />
              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-500">R${item.price}</div>
                <div className="flex items-center mt-1">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                    onClick={() => updateQty(item.id, -1)}
                  >-</button>
                  <span className="px-3">{item.qty || 1}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                    onClick={() => updateQty(item.id, 1)}
                  >+</button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-lg ml-2"
                title="Remover"
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between font-bold mb-3">
            <span>Total:</span>
            <span>R${total.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded transition"
            onClick={finalizarCompra}
          >
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopCart;