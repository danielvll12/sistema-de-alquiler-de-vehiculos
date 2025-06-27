import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

function FeedbackForm() {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Enviando...');

    const serviceID = 'service_g1yvxkm';       // Cambia aquí
    const templateID = 'template_53dg31h';     // Cambia aquí
    const userID = 'HqHyGQrkK3jsw1Ziz';             // Cambia aquí

    const templateParams = {
      from_email: email,
      message: comment,
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then(() => {
        setStatus('¡Gracias por tu comentario!');
        setEmail('');
        setComment('');
      }, (err) => {
        console.error(err);
        setStatus('Error enviando el comentario. Intenta de nuevo.');
      });
  };

  return (
    <section className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-md">
      <h3 className="text-2xl font-semibold mb-4 text-gray-900">Envíanos tu feedback</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700" htmlFor="email">Correo electrónico:</label>
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
          <label className="block mb-1 text-gray-700" htmlFor="comment">Comentario:</label>
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
}

export default FeedbackForm;
