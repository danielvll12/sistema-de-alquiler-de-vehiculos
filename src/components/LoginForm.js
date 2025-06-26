// src/components/LoginForm.js

import React, { useState } from 'react';
import { saveToken } from '../utils/auth';

const LoginForm = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

      if (!res.ok) {
        setError(data.error || 'Error al iniciar sesión');
        return;
      }

      saveToken(data.token, data.role);
      onLoginSuccess();
    } catch (err) {
      setError('Error en el servidor');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 p-8 bg-white shadow-md rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
