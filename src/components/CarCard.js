import React from 'react';

const CarCard = ({ car, onSelectCar }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-200"
      onClick={() => onSelectCar(car)}
    >
      <img
        src={car.imageUrl}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {car.brand} {car.model} ({car.year})
        </h3>
        <p className="text-gray-700 mb-4">{car.location}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">
            ${car.pricePerDay}
            <span className="text-base font-normal text-gray-600">/semana</span>
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Previene doble clic si el contenedor también tiene onClick
              onSelectCar(car);
            }}
            className="bg-gray-900 text-white px-5 py-2 rounded-xl hover:bg-gray-700 transition-colors text-lg"
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
