import React, { useState, useEffect, useRef } from 'react';
import LayoutHeader from './components/LayoutHeader';
import CarListings from './components/CarListings';
import CarDetailModal from './components/CarDetailModal';
import OwnerForm from './components/OwnerForm';

import initialCars from './mock/cars';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const loadedFromStorage = useRef(false);

  // Cargar vehículos desde el backend o localStorage
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/cars');
        if (!res.ok) throw new Error('Error en el servidor');
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.warn('No se pudo cargar desde el backend. Usando localStorage o datos por defecto.');

        const storedCars = JSON.parse(localStorage.getItem('cars'));
        if (storedCars && storedCars.length > 0) {
          setCars(storedCars);
        } else {
          setCars(initialCars);
        }
      } finally {
        loadedFromStorage.current = true;
      }
    };

    fetchCars();
  }, []);

  // Guardar cambios localmente si se cargó desde localStorage
  useEffect(() => {
    if (loadedFromStorage.current) {
      localStorage.setItem('cars', JSON.stringify(cars));
    }
  }, [cars]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedCar(null);
  };

  const handleSelectCar = (car) => {
    setSelectedCar(car);
  };

  const handleCloseModal = () => {
    setSelectedCar(null);
  };

  const handleAddCar = (newCar) => {
    setCars((prevCars) => [...prevCars, newCar]);
    setCurrentPage('rent');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <LayoutHeader onNavigate={handleNavigate} />

      <main className="pt-16">
        {currentPage === 'home' && (
          <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 text-white text-center px-4">
            <div className="z-10">
              <h2 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                Tu Viaje, Tu Elección
              </h2>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                Encuentra el vehículo perfecto para tu próxima aventura en El Salvador.
              </p>
              <button
                onClick={() => handleNavigate('rent')}
                className="bg-white text-gray-900 px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:bg-gray-200 transition-all transform hover:scale-105"
              >
                Explorar Vehículos
              </button>
            </div>
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{
                backgroundImage:
                  "url('https://via.placeholder.com/1920x1080/333333/EEEEEE?text=El+Salvador+Road')",
              }}
            ></div>
          </section>
        )}

        {currentPage === 'rent' && (
          <CarListings cars={cars} onSelectCar={handleSelectCar} />
        )}

        {currentPage === 'owner' && <OwnerForm onAddCar={handleAddCar} />}
      </main>

      {selectedCar && <CarDetailModal car={selectedCar} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
