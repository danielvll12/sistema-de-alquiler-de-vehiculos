import React, { useState, useEffect } from 'react';
import LayoutHeader from './components/LayoutHeader';
import CarListings from './components/CarListings';
import CarDetailModal from './components/CarDetailModal';
import OwnerForm from './components/OwnerForm';
import Register from './components/RegisterForm';

import { getToken, getUserRole, saveAuthData, clearAuthData } from './utils/auth';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  // Estados para autenticación usando utils/auth.js
  const [token, setToken] = useState(getToken());
  const [role, setRole] = useState(getUserRole());

  // Cargar autos desde backend, y refrescar cuando cambia token (login/logout)
  useEffect(() => {
    fetch('https://backend-98mt.onrender.com/api/cars')
      .then(res => res.json())
      .then(setCars)
      .catch(err => {
        console.error(err);
        setCars([]);
      });
  }, [token]); // recarga autos cuando cambia token

  // Navegación simple
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

  // Agregar nuevo auto
  const handleAddCar = async (newCar) => {
    try {
      const res = await fetch('https://backend-98mt.onrender.com/api/cars', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newCar),
      });

      if (!res.ok) throw new Error('Error backend');
      const savedCar = await res.json();

      setCars(prev => [...prev, savedCar]);
      setCurrentPage('rent');
    } catch (err) {
      console.error(err);
      alert('No se pudo guardar el auto');
    }
  };

  // Eliminar auto (solo admins)
  const handleDeleteCar = async (carId) => {
    if (!token) {
      alert('Debes iniciar sesión como administrador para eliminar autos');
      return;
    }

    try {
      const res = await fetch(`https://backend-98mt.onrender.com/api/cars/${carId}`, {
        method: 'DELETE',
        headers: { 
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Error al eliminar vehículo');
        return;
      }

      setCars(prev => prev.filter(car => car.id !== carId));
      alert('Vehículo eliminado correctamente');
    } catch (err) {
      console.error(err);
      alert('Error al eliminar vehículo');
    }
  };

  // Login: guardar token y rol usando utils/auth.js
  const handleLogin = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole);
    saveAuthData(newToken, newRole);
    setCurrentPage('rent');
  };

  // Logout: limpiar token y rol usando utils/auth.js
  const handleLogout = () => {
    setToken(null);
    setRole(null);
    clearAuthData();
    setCurrentPage('home');
  };

  const isAdmin = role === 'admin';

  // Renderizar según autenticación
  if (!token) {
    return (
      <div>
        <LayoutHeader onNavigate={handleNavigate} onLogout={handleLogout} isLoggedIn={false} />
        {currentPage === 'login' && <Login onLogin={handleLogin} />}
        {currentPage === 'register' && <Register onRegister={() => setCurrentPage('login')} />}
        {(currentPage === 'home' || !['login', 'register'].includes(currentPage)) && (
          <div className="text-center mt-20">
            <h1 className="text-4xl font-bold mb-4">Bienvenido a CarRentSV</h1>
            <button
              onClick={() => setCurrentPage('login')}
              className="bg-blue-600 text-white px-6 py-3 rounded-md"
            >
              Iniciar Sesión
            </button>{' '}
            <button
              onClick={() => setCurrentPage('register')}
              className="bg-green-600 text-white px-6 py-3 rounded-md"
            >
              Registrarse
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <LayoutHeader onNavigate={handleNavigate} onLogout={handleLogout} isLoggedIn={true} />

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
          <CarListings 
            cars={cars} 
            onSelectCar={handleSelectCar} 
            onDeleteCar={isAdmin ? handleDeleteCar : null} 
          />
        )}

        {currentPage === 'owner' && <OwnerForm onAddCar={handleAddCar} />}
      </main>

      {selectedCar && <CarDetailModal car={selectedCar} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
