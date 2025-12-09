import React from 'react';
import { getUserRole } from '../utils/auth';

const CarCard = ({ car, onSelectCar, onDeleteCar }) => {
  const role = getUserRole();
  const displayImage = car.images?.[0] || car.imageUrl; // ← Imagen principal

  return (
    <div
      className="
        bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-200
        overflow-hidden cursor-pointer transform transition-all duration-300
        hover:scale-[1.04] hover:shadow-2xl
      "
      onClick={() => onSelectCar(car)}
    >
      {/* Imagen principal */}
      <img
        src={displayImage}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-52 object-cover transition duration-300 hover:brightness-90"
      />

      <div className="p-6 space-y-3">

        <h3 className="text-2xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
          {car.brand} {car.model} —
          <span className="text-blue-600 font-bold"> {car.year}</span>
        </h3>

        <p className="text-gray-600 text-lg font-medium">{car.location}</p>

        {/* Miniaturas de imágenes (SOLO si hay más de 1) */}
        {car.images?.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {car.images.slice(0,4).map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={(e)=>{ 
                  e.stopPropagation(); 
                  onSelectCar(car);
                }}
                className="w-14 h-14 object-cover rounded-xl border cursor-pointer 
                           hover:ring-2 hover:ring-blue-500 transition"
              />
            ))}

            {/* Si hay más de 4 imágenes, indicamos el resto */}
            {car.images.length > 4 && (
              <span className="text-sm text-gray-500 font-bold self-center">
                +{car.images.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="flex justify-between items-center pt-2">

          <span className="text-3xl font-bold text-gray-900">
            ${car.pricePerDay}
            <span className="block text-sm text-gray-500 font-normal">/ semanal</span>
          </span>

          <div className="flex gap-2">

            {/* Ver detalles */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectCar(car);
              }}
              className="
                bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl
                shadow-md font-semibold transition-all hover:scale-105 text-base
              "
            >
              Ver detalles
            </button>

            {/* Eliminar → solo admin */}
            {role === 'admin' && onDeleteCar && (
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  if (window.confirm(`¿Eliminar vehículo ${car.brand} ${car.model}?`)) {
                    await onDeleteCar(car.id);
                  }
                }}
                className="
                  bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl 
                  shadow-md font-semibold transition-all hover:scale-105 text-base
                "
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
