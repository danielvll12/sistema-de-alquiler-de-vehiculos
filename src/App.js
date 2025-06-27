import React, { useState, useEffect } from 'react';
import LayoutHeader from './components/LayoutHeader';
import CarListings from './components/CarListings';
import CarDetailModal from './components/CarDetailModal';
import OwnerForm from './components/OwnerForm';
import RegisterForm from './components/RegisterForm'; // Asegúrate de usar este nombre
import Login from './components/Login';
import { getToken, getUserRole, saveAuthData, clearAuthData } from './utils/auth';

function FeedbackForm() {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');

    try {
      // Aquí debes poner la URL de tu backend que envíe el correo
      const res = await fetch('https://tu-backend-para-enviar-correo.com/api/feedback', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, comment }),
      });

      if (!res.ok) throw new Error('Error al enviar el feedback.');

      setStatus('¡Gracias por tu comentario!');
      setEmail('');
      setComment('');
    } catch (error) {
      setStatus('Error enviando el comentario. Intenta de nuevo.');
      console.error(error);
    }
  };

  return (
    <section className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-md">
      <h3 className="text-2xl font-semibold mb-4 text-gray-900">Envíanos tu feedback</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700" htmlFor="email">Correo electrónico:</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="tuemail@ejemplo.com"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700" htmlFor="comment">Comentario:</label>
          <textarea
            id="comment"
            required
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows="4"
            placeholder="Escribe tu comentario aquí"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Enviar
        </button>
        {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
      </form>
    </section>
  );
}

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
      .catch(err => {
        console.error(err);
        setCars([]);
      });
  }, [token]);

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
    try {
      const res = await fetch('https://backend-98mt.onrender.com/api/cars', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newCar),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Error al guardar el auto');
        return;
      }

      alert('Vehículo guardado correctamente');
      setCars(prev => [...prev, data]);
      setCurrentPage('rent');
    } catch (err) {
      console.error(err);
      alert('No se pudo guardar el auto (error de red o backend caído)');
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      const res = await fetch(`https://backend-98mt.onrender.com/api/cars/${carId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
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

  const handleLogin = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole);
    saveAuthData(newToken, newRole);
    setCurrentPage('rent');
  };

  const handleLogout = () => {
    setToken(null);
    setRole(null);
    clearAuthData();
    setCurrentPage('home');
  };

  const isAdmin = role === 'admin';

  if (!token) {
    return (
      <div>
        <LayoutHeader onNavigate={handleNavigate} onLogout={handleLogout} isLoggedIn={false} />
        {currentPage === 'login' && <Login onLogin={handleLogin} />}
        {currentPage === 'register' && (
          <RegisterForm onSuccess={() => setCurrentPage('login')} />
        )}
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
      <LayoutHeader
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        isLoggedIn={!!token}
        userRole={role}
      />

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

        {currentPage === 'owner' && role === 'admin' ? (
          <OwnerForm onAddCar={handleAddCar} />
        ) : currentPage === 'owner' && (
          (() => {
            setCurrentPage('home');
            return null;
          })()
        )}
      </main>

      {selectedCar && <CarDetailModal car={selectedCar} onClose={handleCloseModal} />}

      {/* Formulario de Feedback */}
      <FeedbackForm />
    </div>
  );
}

export default App;
