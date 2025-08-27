"use client";

import { useState, useEffect } from 'react';

const RegisterForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const limits = {
    username: 50,
    email: 30,
    password: 25
  };

  useEffect(() => {
    setMounted(true);
    
    
    const initAOS = async () => {
      if (typeof window !== 'undefined') {
        try {
          const AOS = (await import('aos')).default;
          AOS.refresh();
        } catch (error) {
          console.log('AOS não disponível');
        }
      }
    };
    
    initAOS();
  }, []);

  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const maxLength = password.length <= limits.password;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return {
      minLength,
      maxLength,
      hasUpperCase,
      hasSpecialChar,
      isValid: minLength && maxLength && hasUpperCase && hasSpecialChar
    };
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    
    const maxLength = limits[name];
    const limitedValue = value.slice(0, maxLength);
    
    setFormData({
      ...formData,
      [name]: limitedValue
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username é obrigatório';
    } else if (formData.username.length > limits.username) {
      newErrors.username = `Username deve ter no máximo ${limits.username} caracteres`;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (formData.email.length > limits.email) {
      newErrors.email = `Email deve ter no máximo ${limits.email} caracteres`;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      if (!passwordValidation.maxLength) {
        newErrors.password = `Senha deve ter no máximo ${limits.password} caracteres`;
      } else {
        newErrors.password = 'Senha não atende aos requisitos';
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    
    try {
      setIsSubmitting(true);
      
      const { SUPABASE_URL, SUPABASE_ANON_KEY } = await import('@/lib/supabaseClient');
      const axios = (await import('axios')).default;
      
     
      const userData = {
        nome: formData.username.trim(),
        email: formData.email.trim().toLowerCase(),
        senha: formData.password
      };
      
      console.log('Enviando dados:', userData);
      console.log('URL:', `${SUPABASE_URL}/rest/v1/cliente`);
      
      const response = await axios.post(`${SUPABASE_URL}/rest/v1/cliente`, userData, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        }
      });
      
      console.log('Usuário cadastrado com sucesso!', response.data);
      
      
      setFormData({
        username: '',
        email: '',
        password: ''
      });
      
      setShowPasswordRequirements(false);
      alert('Conta criada com sucesso!');
      
    } catch (error) {
      console.error('Erro completo:', error);
      console.error('Resposta do erro:', error.response?.data);
      console.error('Status do erro:', error.response?.status);
      
      if (error.response?.status === 400) {
        const errorMessage = error.response.data?.message || 'Dados inválidos';
        alert(`Erro 400: ${errorMessage}`);
      } else if (error.response?.status === 409) {
        setErrors({ email: 'Este email já está em uso' });
      } else if (error.response?.status === 401) {
        alert('Erro de autenticação. Verifique as configurações do Supabase.');
      } else {
        alert(`Erro ao criar conta: ${error.response?.status || 'Erro desconhecido'}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordValidation = validatePassword(formData.password);

  
  if (!mounted) {
    return (
      <div className="w-full px-2 flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="w-full px-2">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2" 
            style={{ fontFamily: "'Playfair Display', serif" }}>
          Crie sua conta
        </h2>
        <p className="text-gray-500 text-sm">Junte-se à nossa família gastronômica</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
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
            maxLength={limits.username}
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
          <div className="flex justify-between items-center mt-1">
            {errors.username ? (
              <p className="text-xs text-red-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                {errors.username}
              </p>
            ) : (
              <div></div>
            )}
            <span className={`text-xs ${
              formData.username.length > limits.username * 0.8 ? 'text-amber-600' : 'text-gray-400'
            }`} style={{ fontFamily: "'Inter', sans-serif" }}>
              {formData.username.length}/{limits.username}
            </span>
          </div>
        </div>

        <div className="relative">
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
            maxLength={limits.email}
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
          <div className="flex justify-between items-center mt-1">
            {errors.email ? (
              <p className="text-xs text-red-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                {errors.email}
              </p>
            ) : (
              <div></div>
            )}
            <span className={`text-xs ${
              formData.email.length > limits.email * 0.8 ? 'text-amber-600' : 'text-gray-400'
            }`} style={{ fontFamily: "'Inter', sans-serif" }}>
              {formData.email.length}/{limits.email}
            </span>
          </div>
        </div>

        <div className="relative">
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
            maxLength={limits.password}
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
          <div className="flex justify-between items-center mt-1">
            {errors.password ? (
              <p className="text-xs text-red-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                {errors.password}
              </p>
            ) : (
              <div></div>
            )}
            <span className={`text-xs ${
              formData.password.length > limits.password * 0.8 ? 'text-amber-600' : 'text-gray-400'
            }`} style={{ fontFamily: "'Inter', sans-serif" }}>
              {formData.password.length}/{limits.password}
            </span>
          </div>

          {showPasswordRequirements && (
            <div className="mt-3 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
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
                  passwordValidation.maxLength ? 'text-green-600' : 'text-red-500'
                }`}>
                  <div className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center text-xs font-bold ${
                    passwordValidation.maxLength ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {passwordValidation.maxLength ? '✓' : '!'}
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif" }}>Máximo {limits.password} caracteres</span>
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
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-300 font-medium shadow-lg transform ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 hover:shadow-xl hover:-translate-y-0.5'
          } text-white`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {isSubmitting ? 'Criando conta...' : 'Criar Conta'}
        </button>
      </form>

      <div className="mt-8 text-center">
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