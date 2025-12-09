import React, { useState } from 'react';

const Login = ({ onLogin, onClose }) => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://backend-98mt.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Credenciales incorrectas");

      onLogin(data.token, data.role);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center font-sans">

      {/* Fondo oscuro igual que register */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg')"
        }}
      ></div>

      {/* ❌ X IGUAL QUE REGISTER — fuera del card */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-white text-xl font-bold
                   hover:text-red-400 transition-all"
      >
        ✕
      </button>

      {/* Card Login */}
      <div className="relative z-10 bg-white/15 backdrop-blur-xl rounded-2xl px-10 py-12 
                      shadow-2xl border border-white/30 w-[85%] md:w-[430px] text-white">

        <h1 className="text-4xl font-bold text-center drop-shadow-md">
          Bienvenido de vuelta
        </h1>
        <p className="text-center text-gray-200 mt-2 mb-6">
          Ingresa tus credenciales para continuar
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-semibold">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 rounded-lg bg-white/20 text-white
                        placeholder-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="ejemplo@gmail.com"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 rounded-lg bg-white/20 text-white
                        placeholder-gray-200 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-red-400 text-center py-1">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 mt-3 rounded-lg bg-blue-600 text-white font-bold
                      hover:bg-blue-700 active:scale-95 transition-all shadow-lg hover:scale-105"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
