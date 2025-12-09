import React from 'react';
import CarCard from './CarCard';

const CarListings = ({ cars, onSelectCar, onDeleteCar }) => {
  return (
    <div className="container mx-auto px-6 py-10 pt-24">

      <h2 className="text-5xl font-black text-gray-900 text-center mb-12 tracking-tight">
        🚗 Vehículos Disponibles para Renta
      </h2>

      {cars.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">No hay vehículos por ahora...</p>
      ) : (
        <div className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10
        ">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onSelectCar={onSelectCar}
              onDeleteCar={onDeleteCar}   // 🔥 Permiso admin preservado
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default CarListings;
