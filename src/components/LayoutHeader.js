import React, { useState } from 'react';

const LayoutHeader = ({ onNavigate, onLogout, isLoggedIn, userRole }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavigate = (page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur shadow-md border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO TITULO CON EFECTO */}
        <h1
          onClick={() => handleNavigate('home')}
          className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition transform"
        >
          AutoRápidoSV
        </h1>

        {/* MENU ESCRITORIO */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => handleNavigate('home')}
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
          >
            Inicio
          </button>

          <button 
            onClick={() => handleNavigate('rent')}
            className="text-gray-700 hover:text-blue-600 transition font-semibold"
          >
            Rentar Vehículo
          </button>

          {/* SOLO ADMIN PUEDE PUBLICAR */}
          {userRole === "admin" && (
            <button 
              onClick={() => handleNavigate('owner')}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md transition"
            >
              Publicar Vehículo
            </button>
          )}

          {/* CERRAR SESION */}
          {isLoggedIn && (
            <button 
              onClick={onLogout}
              className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition"
            >
              Cerrar Sesión
            </button>
          )}
        </nav>

        {/* BOTON MENU MOVIL */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MENU MOVIL DESPLEGABLE */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-fadeDown">
          
          <button
            onClick={() => handleNavigate('home')}
            className="block w-full text-left px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100"
          >
            Inicio
          </button>

          <button
            onClick={() => handleNavigate('rent')}
            className="block w-full text-left px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100"
          >
            Rentar Vehículo
          </button>

          {userRole === "admin" && (
            <button
              onClick={() => handleNavigate('owner')}
              className="block w-full text-left px-5 py-3 font-semibold text-blue-600 hover:bg-blue-50"
            >
              Publicar Vehículo
            </button>
          )}

          {isLoggedIn && (
            <button
              onClick={onLogout}
              className="block w-full text-left px-5 py-3 font-semibold text-red-600 hover:bg-red-50"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default LayoutHeader;
