// src/components/RegisterForm.js

import React, { useState } from 'react';

const RegisterForm = ({ onSuccess, onClose }) => {   // ← AQUI SE AGREGA onClose
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'user',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://backend-98mt.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al registrar usuario');

      setSuccess('Registro exitoso ✔ Redirigiendo al inicio sesión...');
      setForm({ email: '', password: '', role: 'user' });

      setTimeout(() => onSuccess && onSuccess(), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">

      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg')"
        }}
      />

      {/* ❌ BOTÓN PARA CERRAR REGISTRO */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-white text-xl font-bold
                   hover:text-red-400 transition-all"
      >
        ✕
      </button>

      {/* CARD */}
      <div className="relative z-10 w-[90%] max-w-md bg-white/15 backdrop-blur-xl p-10
                      rounded-2xl shadow-2xl border border-gray-200/30 text-white">

        <h2 className="text-4xl font-bold text-center mb-6 drop-shadow-md">
          Crear Cuenta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/20 text-white placeholder-gray-200
                      rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/20 text-white placeholder-gray-200
                      rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/20 text-white rounded-lg
                      focus:ring-2 focus:ring-green-400 outline-none"
          >
            <option className="text-black" value="user">Usuario</option>
            <option className="text-black" value="admin">Administrador</option>
          </select>

          {error && <p className="text-red-300 text-center">{error}</p>}
          {success && <p className="text-green-300 text-center">{success}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 font-bold
                      rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            Registrarse
          </button>
        </form>

      </div>
    </div>
  );
};

export default RegisterForm;
