// src/components/CarDetailModal.jsx
import React from 'react';

const CarDetailModal = ({ car, onClose }) => {
  if (!car) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        <img
          src={car.imageUrl}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 className="text-3xl font-bold mb-2">{car.brand} {car.model}</h2>
        <p className="text-gray-700 mb-2">Año: {car.year}</p>
        <p className="text-gray-700 mb-2">Ubicación: {car.location}</p>
        <p className="text-gray-700 mb-2">Precio por semana: ${car.pricePerDay}</p>
        <p className="text-gray-700">{car.description}</p>
      </div>
    </div>
  );
};

export default CarDetailModal;
