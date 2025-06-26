import React, { useState } from 'react';

const RegisterForm = ({ onSuccess }) => {
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

      if (!res.ok) throw new Error(data.error || 'Error al registrar');

      setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
      setForm({ email: '', password: '', role: 'user' });

      if (onSuccess) onSuccess(); // Callback opcional
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Registro de Usuario</h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-gray-700">Correo electrónico:</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md px-4 py-2"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Contraseña:</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md px-4 py-2"
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Rol:</span>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md px-4 py-2"
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </label>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
