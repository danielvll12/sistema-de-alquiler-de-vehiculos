import React, { useState } from 'react';

const LayoutHeader = ({ onNavigate, onLogout, isLoggedIn, userRole }) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNavigate = (page) => {
    onNavigate(page);
    setMenuOpen(false); // cierra menú al navegar
  };

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1
          className="text-2xl font-bold text-gray-900 cursor-pointer"
          onClick={() => handleNavigate('home')}
        >
          CarRentSv
        </h1>

        {/* Menú escritorio */}
        <nav className="hidden md:flex space-x-6 items-center">
          <button
            onClick={() => handleNavigate('home')}
            className="text-gray-600 hover:text-gray-900 transition-colors text-lg font-medium"
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavigate('rent')}
            className="text-gray-600 hover:text-gray-900 transition-colors text-lg font-medium"
          >
            Rentar un Vehículo
          </button>
       {userRole === 'admin' && (
  <button
    onClick={() => onNavigate('owner')}
    className="text-white px-4 py-2 hover:text-yellow-300"
  >
    Publicar Vehículo
  </button>
)}


          {/* BOTÓN CERRAR SESIÓN - Solo si está logueado */}
          {isLoggedIn && (
            <button
              onClick={() => {
                onLogout();
                setMenuOpen(false);
              }}
              className="ml-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Cerrar Sesión
            </button>
          )}
        </nav>

        {/* Botón hamburguesa móvil */}
        <div className="md:hidden flex items-center gap-4">
          {/* Si está logueado, mostrar botón cerrar sesión también en móvil */}
          {isLoggedIn && (
            <button
              onClick={() => {
                onLogout();
                setMenuOpen(false);
              }}
              className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
            >
              Cerrar Sesión
            </button>
          )}

          <button
            onClick={toggleMenu}
            aria-label="Abrir menú"
            className="text-gray-600 focus:outline-none"
          >
            {menuOpen ? (
              // Icono cerrar (X)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Icono hamburguesa (3 líneas)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <nav className="md:hidden bg-white shadow-md border-t border-gray-200">
          <button
            onClick={() => handleNavigate('home')}
            className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100"
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavigate('rent')}
            className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100"
          >
            Rentar un Vehículo
          </button>
          <button
            onClick={() => handleNavigate('owner')}
            className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100"
          >
            Publicar mi Vehículo
          </button>
        </nav>
      )}
    </header>
  );
};

export default LayoutHeader;
