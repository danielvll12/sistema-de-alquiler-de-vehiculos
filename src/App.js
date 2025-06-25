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
        setCars([]); // o initialCars
      });
  }, []);

  const handleNavigate = page => setCurrentPage(page);
  const handleSelectCar = car => setSelectedCar(car);
  const handleCloseModal = () => setSelectedCar(null);

  const handleAddCar = async (newCar) => {
    setCars(prev => [...prev, newCar]);
    try {
      const res = await fetch('https://backend-98mt.onrender.com/api/cars', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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
    <div className="min-h-screen ...">
      <LayoutHeader onNavigate={handleNavigate} />
      <main className="pt-16">
        {currentPage==='home' }&& /* sección home */
        {currentPage==='rent' && <CarListings cars={cars} onSelectCar={handleSelectCar} />}
        {currentPage==='owner' && <OwnerForm onAddCar={handleAddCar} />}
      </main>
      {selectedCar && <CarDetailModal car={selectedCar} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
