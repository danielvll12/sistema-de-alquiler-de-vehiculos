import React, { useState, useEffect } from "react";

const CarDetailModal = ({ car, onClose }) => {
  if (!car) return null;

  // Soporte universal imágenes
  const images = car.images?.length > 0 ? car.images : [car.imageUrl];
  const [index, setIndex] = useState(0);

  const next = () => setIndex(prev => (prev + 1) % images.length);
  const prev = () => setIndex(prev => (prev - 1 + images.length) % images.length);

  // Evita scroll de fondo cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">

      {/* Caja modal */}
      <div className="bg-white/95 rounded-3xl shadow-2xl overflow-hidden w-full max-w-3xl max-h-[92vh] animate-scaleIn relative">

        {/* Cerrar con X — estilo exacto que pediste */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-xl font-bold hover:text-red-400 transition-all z-50"
        >
          ✕
        </button>

        {/* Scroll interno seguro */}
        <div className="p-6 md:p-10 overflow-y-auto max-h-[92vh]">

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 drop-shadow-sm">
            {car.brand} {car.model} — {car.year}
          </h2>

          {/* Galería */}
          <div className="relative w-full h-72 md:h-80 rounded-xl overflow-hidden shadow-lg border border-gray-200">

            <img
              src={images[index]}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-white text-4xl font-bold hover:text-red-400 transition select-none"
                >
                  ‹
                </button>

                <button
                  onClick={next}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-white text-4xl font-bold hover:text-red-400 transition select-none"
                >
                  ›
                </button>
              </>
            )}

            <div className="absolute bottom-3 w-full flex justify-center gap-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
                    index === i ? "bg-red-400 scale-110" : "bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="text-lg space-y-2">
              <p><span className="font-bold">Ubicación:</span> {car.location}</p>
              <p><span className="font-bold">Precio:</span>
                <span className="text-blue-600 font-bold"> ${car.pricePerDay}/semana</span>
              </p>
              <p><span className="font-bold">Disponible desde:</span> {car.startDate ?? car.availability?.startDate}</p>
            </div>

            {car.features?.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2">Características</h3>
                <ul className="list-inside list-disc text-gray-700 space-y-1">
                  {car.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            )}
          </div>

          {/* Descripción */}
          {car.description && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Descripción</h3>
              <p className="text-gray-700 leading-relaxed">{car.description}</p>
            </div>
          )}

          {/* Contacto */}
          <div className="flex flex-col md:flex-row gap-4 mt-10">

            {car.phoneNumber && (
              <a href={`tel:${car.phoneNumber}`}
                 className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-bold rounded-xl text-center shadow-md transition">
                ☎ Llamar
              </a>
            )}

            {car.phoneNumber && (
              <a
                href={`https://wa.me/503${car.phoneNumber.replace(/\D/g,'')}?text=Hola, estoy interesado(a) en tu vehículo ${car.brand} ${car.model}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-bold rounded-xl text-center shadow-md transition">
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
