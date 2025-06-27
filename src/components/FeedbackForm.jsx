// src/components/FeedbackForm.jsx
import React, { useState } from 'react';

const FeedbackForm = () => {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');

    try {
      const res = await fetch('https://formsubmit.co/ajax/danielvallec98@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          email,
          comment
        })
      });

      if (!res.ok) throw new Error('Error al enviar el feedback.');

      setStatus('¡Gracias por tu comentario!');
      setEmail('');
      setComment('');
    } catch (error) {
      console.error(error);
      setStatus('Error enviando el comentario. Intenta de nuevo.');
    }
  };

  return (
    <section className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-md">
      <h3 className="text-2xl font-semibold mb-4 text-gray-900">Envíanos tu feedback</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 text-gray-700">Correo electrónico:</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="tuemail@ejemplo.com"
          />
        </div>

        <div>
          <label htmlFor="comment" className="block mb-1 text-gray-700">Comentario:</label>
          <textarea
            id="comment"
            required
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows="4"
            placeholder="Escribe tu comentario aquí"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Enviar
        </button>
        {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
      </form>
    </section>
  );
};

export default FeedbackForm;
