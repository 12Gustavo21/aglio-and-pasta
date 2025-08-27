"use client";

import { useState, useEffect } from 'react';
import AOS from 'aos';

const RegisterForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    AOS.refresh();
  }, []);

  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      minLength,
      hasUpperCase,
      hasSpecialChar,
      isValid: minLength && hasUpperCase && hasSpecialChar
    };
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username é obrigatório';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = 'Senha não atende aos requisitos';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    console.log('Register data:', formData);
  };

  const passwordValidation = validatePassword(formData.password);

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
          Crie sua conta
        </h2>
        <p className="text-gray-500 text-sm">Junte-se à nossa família gastronômica</p>
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
            className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:bg-white focus:outline-none transition-all duration-300 placeholder-transparent peer ${
              errors.username ? 'ring-2 ring-red-400 focus:ring-red-400' : 'focus:ring-2 focus:ring-amber-400'
            }`}
            placeholder="Username"
            required
          />
          <label 
            htmlFor="username"
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              formData.username || focusedField === 'username' 
                ? `-top-2 text-xs ${errors.username ? 'text-red-600' : 'text-amber-600'} bg-white px-2 rounded` 
                : 'top-3 text-gray-500'
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Username
          </label>
          {errors.username && (
            <p className="mt-1 text-xs text-red-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              {errors.username}
            </p>
          )}
        </div>

        <div 
          className="relative"
          data-aos="fade-left"
          data-aos-duration="400"
          data-aos-delay="500"
        >
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:bg-white focus:outline-none transition-all duration-300 placeholder-transparent peer ${
              errors.email ? 'ring-2 ring-red-400 focus:ring-red-400' : 'focus:ring-2 focus:ring-amber-400'
            }`}
            placeholder="Email"
            required
          />
          <label 
            htmlFor="email"
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              formData.email || focusedField === 'email' 
                ? `-top-2 text-xs ${errors.email ? 'text-red-600' : 'text-amber-600'} bg-white px-2 rounded` 
                : 'top-3 text-gray-500'
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Email
          </label>
          {errors.email && (
            <p className="mt-1 text-xs text-red-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              {errors.email}
            </p>
          )}
        </div>

        <div 
          className="relative"
          data-aos="fade-right"
          data-aos-duration="400"
          data-aos-delay="600"
        >
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => {
              setFocusedField('password');
              setShowPasswordRequirements(true);
            }}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:bg-white focus:outline-none transition-all duration-300 placeholder-transparent peer ${
              errors.password ? 'ring-2 ring-red-400 focus:ring-red-400' : 'focus:ring-2 focus:ring-amber-400'
            }`}
            placeholder="Senha"
            required
          />
          <label 
            htmlFor="password"
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              formData.password || focusedField === 'password' 
                ? `-top-2 text-xs ${errors.password ? 'text-red-600' : 'text-amber-600'} bg-white px-2 rounded` 
                : 'top-3 text-gray-500'
            }`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Senha
          </label>
          

          {showPasswordRequirements && (
            <div 
              className="mt-3 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100"
              data-aos="fade-up"
              data-aos-duration="300"
              data-aos-delay="100"
            >
              <p className="text-sm font-medium text-gray-700 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                Requisitos da senha:
              </p>
              <div className="space-y-2">
                <div className={`flex items-center text-sm transition-colors duration-200 ${
                  passwordValidation.minLength ? 'text-green-600' : 'text-gray-500'
                }`}>
                  <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center text-xs font-bold ${
                    passwordValidation.minLength ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {passwordValidation.minLength ? '✓' : '○'}
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif" }}>Pelo menos 6 caracteres</span>
                </div>
                <div className={`flex items-center text-sm transition-colors duration-200 ${
                  passwordValidation.hasUpperCase ? 'text-green-600' : 'text-gray-500'
                }`}>
                  <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center text-xs font-bold ${
                    passwordValidation.hasUpperCase ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {passwordValidation.hasUpperCase ? '✓' : 'A'}
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif" }}>Pelo menos 1 letra maiúscula</span>
                </div>
                <div className={`flex items-center text-sm transition-colors duration-200 ${
                  passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-gray-500'
                }`}>
                  <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center text-xs font-bold ${
                    passwordValidation.hasSpecialChar ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {passwordValidation.hasSpecialChar ? '✓' : '@'}
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif" }}>Pelo menos 1 caractere especial</span>
                </div>
              </div>
            </div>
          )}
          
          {errors.password && (
            <p className="mt-1 text-xs text-red-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          style={{ fontFamily: "'Inter', sans-serif" }}
          data-aos="zoom-in"
          data-aos-duration="400"
          data-aos-delay="700"
        >
          Criar Conta
        </button>
      </form>

      <div 
        className="mt-8 text-center"
        data-aos="fade-up"
        data-aos-duration="400"
        data-aos-delay="800"
      >
        <p className="text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
          Já tem uma conta?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-amber-600 hover:text-amber-700 font-medium transition-colors duration-200 underline decoration-amber-400 underline-offset-2"
          >
            Faça login aqui
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;