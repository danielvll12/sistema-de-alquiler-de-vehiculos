import React, { useState, useEffect } from 'react';
import LayoutHeader from './components/LayoutHeader';
import CarListings from './components/CarListings';
import CarDetailModal from './components/CarDetailModal';
import OwnerForm from './components/OwnerForm';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    fetch('https://backend-98mt.onrender.com/api/cars')
      .then(res => res.json())
      .then(setCars)
      .catch(err => {
        console.error(err);
        setCars([]); // o initialCars como respaldo si quieres
      });
  }, []);

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

  const handleAddCar = async (newCar) => {
    setCars(prev => [...prev, newCar]);

    try {
      const res = await fetch('https://backend-98mt.onrender.com/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCar),
      });

      if (!res.ok) throw new Error('Error backend');
    } catch (err) {
      console.error(err);
      alert('No se pudo guardar el auto');
    }

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
