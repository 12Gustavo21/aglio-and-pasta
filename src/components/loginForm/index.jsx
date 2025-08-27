"use client";

import { useState, useEffect } from 'react';
import AOS from 'aos';

const LoginForm = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
  };

  return (
    <div className="w-full px-2">
      <div 
        className="text-center mb-8"
        data-aos="fade-down"
        data-aos-duration="400"
        data-aos-delay="300"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2" 
            style={{ fontFamily: "'Playfair Display', serif" }}>
          Bem-vindo de volta
        </h2>
        <p className="text-gray-500 text-sm">Entre na sua conta para continuar</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div 
          className="relative"
          data-aos="fade-right"
          data-aos-duration="400"
          data-aos-delay="400"
        >
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onFocus={() => setFocusedField('username')}
            onBlur={() => setFocusedField(null)}
            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all duration-300 placeholder-transparent peer"
            placeholder="Username"
            required
          />
          <label 
            htmlFor="username"
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              formData.username || focusedField === 'username' 
                ? '-top-2 text-xs text-amber-600 bg-white px-2 rounded' 
                : 'top-3 text-gray-500'
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Username
          </label>
        </div>

        <div 
          className="relative"
          data-aos="fade-left"
          data-aos-duration="400"
          data-aos-delay="500"
        >
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all duration-300 placeholder-transparent peer"
            placeholder="Senha"
            required
          />
          <label 
            htmlFor="password"
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              formData.password || focusedField === 'password' 
                ? '-top-2 text-xs text-amber-600 bg-white px-2 rounded' 
                : 'top-3 text-gray-500'
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Senha
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-4 rounded-xl hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          style={{ fontFamily: "'Inter', sans-serif" }}
          data-aos="zoom-in"
          data-aos-duration="400"
          data-aos-delay="600"
        >
          Entrar
        </button>
      </form>

      <div 
        className="mt-8 text-center"
        data-aos="fade-up"
        data-aos-duration="400"
        data-aos-delay="700"
      >
        <p className="text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
          Não tem uma conta?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-amber-600 hover:text-amber-700 font-medium transition-colors duration-200 underline decoration-amber-400 underline-offset-2"
          >
            Cadastre-se aqui
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;