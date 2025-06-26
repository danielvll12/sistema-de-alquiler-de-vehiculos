import React from 'react';
import CarCard from './CarCard';

const CarListings = ({ cars, onSelectCar, onDeleteCar }) => {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">
        Vehículos Disponibles para Rentar
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onSelectCar={onSelectCar}
            onDeleteCar={onDeleteCar}  // <-- Aquí se pasa la función
          />
        ))}
      </div>
    </div>
  );
};

export default CarListings;
