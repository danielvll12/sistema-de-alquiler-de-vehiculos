import React from 'react';

const CarDetailModal = ({ car, onClose }) => {
  if (!car) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100">

        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              {car.brand} {car.model} ({car.year})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <img
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-64 object-cover rounded-xl mb-6 shadow-md"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-gray-600 text-lg mb-2">
                <span className="font-semibold text-gray-800">Ubicación:</span>{' '}
                {car.location}
              </p>
              <p className="text-gray-600 text-lg mb-2">
                <span className="font-semibold text-gray-800">Precio:</span> $
                {car.pricePerDay}/día
              </p>
              <p className="text-gray-600 text-lg mb-2">
                <span className="font-semibold text-gray-800">
                  Disponible de:
                </span>{' '}
                {car.startDate}
              </p>
              <p className="text-gray-600 text-lg">
                <span className="font-semibold text-gray-800">Hasta:</span>{' '}
                {car.endDate}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Características:
              </h3>
              <ul className="list-disc list-inside text-gray-700 text-lg space-y-1">
                {car.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Descripción:
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {car.description}
          </p>

          {/* BOTONES DE CONTACTO */}
          <div className="flex flex-col md:flex-row gap-4">
            <a
              href={`tel:${car.phoneNumber}`}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors text-xl font-semibold text-center"
            >
              Llamar al Propietario
            </a>

            <a
              href={`https://wa.me/503${(car.phoneNumber || '').replace(/\D/g, '')}?text=Hola, estoy interesado en rentar tu vehículo ${car.brand} ${car.model}.`}

              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors text-xl font-semibold text-center"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailModal;
