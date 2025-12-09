// src/components/FeedbackForm.jsx
import React, { useState } from 'react';

const FeedbackForm = () => {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando comentario...');

    try {
      const res = await fetch('https://formsubmit.co/ajax/danielvallec98@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ email, comment })
      });

      if (!res.ok) throw new Error('Error al enviar respuesta.');

      setStatus('¡Gracias por tu comentario! 📨');
      setEmail('');
      setComment('');
    } catch (error) {
      setStatus('❌ Error al enviar, intenta nuevamente.');
    }
  };

  return (
    <section
      className="
        max-w-md mx-auto my-16 p-8 bg-white 
        shadow-lg rounded-2xl border border-gray-200
        transition-all duration-300 hover:shadow-2xl
      "
    >
      <h3 className="text-3xl font-bold text-center mb-6 text-gray-900">
        📩 Envíanos tu opinión
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Email */}
        <div>
          <label htmlFor="email" className="text-gray-700 font-semibold block mb-1">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="ejemplo@email.com"
            className="
              w-full px-4 py-2.5 rounded-lg border 
              focus:ring-2 focus:ring-blue-500 focus:outline-none
              text-gray-700 shadow-sm
            "
          />
        </div>

        {/* Comentario */}
        <div>
          <label htmlFor="comment" className="text-gray-700 font-semibold block mb-1">
            Comentario
          </label>
          <textarea
            id="comment"
            required
            rows="4"
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Escribe tu experiencia, sugerencia u opinión..."
            className="
              w-full px-4 py-2.5 rounded-lg border 
              focus:ring-2 focus:ring-blue-500 focus:outline-none
              text-gray-700 shadow-sm resize-none
            "
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="
            w-full bg-blue-600 text-white py-3 rounded-xl 
            text-lg font-semibold transition-all duration-200
            hover:bg-blue-700 active:scale-95
          "
        >
          Enviar Opinión
        </button>

        {/* Estado */}
        {status && (
          <p className="text-center text-sm font-medium mt-2 text-gray-700">
            {status}
          </p>
        )}
      </form>
    </section>
  );
};

export default FeedbackForm;
