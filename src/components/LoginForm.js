// src/components/LoginForm.js

import React, { useState } from 'react';
import { saveToken } from '../utils/auth';

const LoginForm = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('https://backend-98mt.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) return setError(data.error || 'Credenciales incorrectas');

      saveToken(data.token, data.role);
      onLoginSuccess();
    } catch {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">

      {/* 🔥 Fondo borroso con overlay oscuro */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg')"
        }}
      />

      {/* 🧊 Card Glass */}
      <div className="relative z-10 w-[90%] max-w-md bg-white/15 backdrop-blur-xl p-10
                      rounded-2xl shadow-2xl border border-gray-200/30 text-white">

        <h2 className="text-4xl font-bold text-center mb-5 drop-shadow-lg">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/20 text-white placeholder-gray-200
                      rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/20 text-white placeholder-gray-200
                      rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          {error && <p className="text-red-300 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700
                      font-bold rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
