import React, { useState, useEffect } from 'react';
import LayoutHeader from './components/LayoutHeader';
import CarListings from './components/CarListings';
import CarDetailModal from './components/CarDetailModal';
import OwnerForm from './components/OwnerForm';
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import FeedbackForm from './components/FeedbackForm';
import { getToken, getUserRole, saveAuthData, clearAuthData } from './utils/auth';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  const [token, setToken] = useState(getToken());
  const [role, setRole] = useState(getUserRole());

  useEffect(() => {
    fetch('https://backend-98mt.onrender.com/api/cars')
      .then(res => res.json())
      .then(setCars)
      .catch(() => setCars([]));
  }, [token]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedCar(null);
  };

  const handleLogin = (newToken, newRole) => {
    saveAuthData(newToken, newRole);
    setToken(newToken);
    setRole(newRole);
    setCurrentPage('rent');
  };

  const handleLogout = () => {
    clearAuthData();
    setToken(null);
    setRole(null);
    setCurrentPage('home');
  };

  const handleAddCar = async (newCar) => {
    try {
      const res = await fetch('https://backend-98mt.onrender.com/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(newCar),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error || 'Error al guardar el auto');

      setCars(prev => [...prev, data]);
      alert('Vehículo agregado correctamente');
    } catch {
      alert('Error de red al agregar vehículo');
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      const res = await fetch(`https://backend-98mt.onrender.com/api/cars/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error || 'No se pudo eliminar');

      setCars(prev => prev.filter(car => car.id !== id));
    } catch {
      alert('Error en eliminación');
    }
  };

  const isAdmin = role === 'admin';

  /* ===========================================================
     PANTALLAS SIN SESIÓN (HOME / LOGIN / REGISTER)
  =========================================================== */
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">

        {currentPage === 'home' && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60 pointer-events-none"
              style={{ backgroundImage: "url('https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg')" }}
            ></div>

            <div className="relative z-20 text-center p-10 bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-xl w-[90%] md:w-[45%]">

              <h1 className="text-5xl font-extrabold text-white drop-shadow-md">
                AutoRápidoSV
              </h1>
              <p className="text-gray-200 mt-2">
                Alquila y publica vehículos fácilmente.
              </p>

              <div className="flex gap-4 justify-center mt-8">
                <button
                  onClick={() => setCurrentPage('login')}
                  className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => setCurrentPage('register')}
                  className="px-6 py-3 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Registrarse
                </button>
              </div>
            </div>
          </>
        )}

        {currentPage === 'login' && (
          <Login
            onLogin={handleLogin}
            onClose={() => setCurrentPage('home')}    // <-- aquí está la X funcionando
            onNavigate={setCurrentPage}              // opcional si tu Login usa onNavigate
          />
        )}

        {currentPage === 'register' && (
          <RegisterForm
            onSuccess={() => setCurrentPage('login')}
            onClose={() => setCurrentPage('home')} 
            onNavigate={setCurrentPage}             // opcional si tu Register usa onNavigate
          />
        )}
      </div>
    );
  }

  /* ===========================================================
     SISTEMA UNA VEZ LOGUEADO
  =========================================================== */
  return (
    <div className="min-h-screen bg-gray-50">

      <LayoutHeader
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        isLoggedIn={!!token}
        userRole={role}
      />

      <main className="pt-16">
        {/* HOME */}
        {currentPage === 'home' && (
          <section className="h-[60vh] w-full flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-600 text-white">
            <div>
              <h2 className="text-5xl font-bold mb-3">Tu viaje comienza aquí</h2>
              <button onClick={() => handleNavigate('rent')} className="bg-white text-black px-8 py-3 rounded-lg mt-6">
                Ver vehículos
              </button>
            </div>
          </section>
        )}

        {/* LISTADO */}
        {currentPage === 'rent' && (
          <CarListings
            cars={cars}
            onSelectCar={setSelectedCar}
            onDeleteCar={isAdmin ? handleDeleteCar : null}
          />
        )}

        {/* ADMIN → Subir vehículos */}
        {currentPage === 'owner' && isAdmin && (
          <OwnerForm onAddCar={handleAddCar} />
        )}

        <FeedbackForm />
      </main>

      {selectedCar && (
        <CarDetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </div>
  );
}

export default App;
