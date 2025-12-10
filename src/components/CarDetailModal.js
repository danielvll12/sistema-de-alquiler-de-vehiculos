import React from "react";

const CarDetailModal = ({ car, onClose }) => {
  if (!car) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      
      {/* CONTENEDOR CARD MODAL */}
      <div className="bg-white/95 rounded-3xl shadow-2xl overflow-hidden w-full max-w-3xl max-h-[92vh] animate-scaleIn relative">

        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 shadow transition"
        >
          ✕
        </button>

        <div className="p-6 md:p-10 overflow-y-auto max-h-[92vh]">
          
          {/* TÍTULO */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 drop-shadow-sm">
            {car.brand} {car.model} — {car.year}
          </h2>

          {/* IMAGEN DEL VEHÍCULO */}
          <img
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-72 md:h-80 object-cover rounded-xl shadow-lg border border-gray-200"
          />

          {/* INFORMACIÓN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            
            {/* DETALLES */}
            <div className="text-lg space-y-2">
              <p><span className="font-bold text-gray-900">Ubicación:</span> {car.location}</p>
              <p>
                <span className="font-bold text-gray-900">Precio:</span> 
                <span className="text-blue-600 font-bold"> ${car.pricePerDay}/semana</span>
              </p>
              <p>
                <span className="font-bold text-gray-900">Disponible desde:</span>{" "}
                {car.startDate ?? car.availability?.startDate}
              </p>
            </div>

            {/* CARACTERISTICAS */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Características</h3>
              <ul className="list-inside list-disc text-gray-700 space-y-1">
                {car.features?.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Descripción</h3>
            <p className="text-gray-700 leading-relaxed">
              {car.description}
            </p>
          </div>

          {/* BOTONES DE CONTACTO */}
          <div className="flex flex-col md:flex-row gap-4 mt-10">
            {car.phoneNumber && (
              <a
                href={`tel:${car.phoneNumber}`}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-bold rounded-xl shadow-md text-center transition"
              >
                ☎ Llamar
              </a>
            )}

            {car.phoneNumber && (
              <a
                href={`https://wa.me/503${car.phoneNumber.replace(/\D/g, '')}?text=Hola, estoy interesado(a) en tu vehículo ${car.brand} ${car.model}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-bold rounded-xl shadow-md text-center transition"
              >
                💬 WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailModal;
