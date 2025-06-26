// src/components/LayoutHeader.jsx
import React from 'react';

const LayoutHeader = ({ onNavigate, onLogout, isLoggedIn }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md flex items-center justify-between px-6 h-16 z-50">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => onNavigate('home')}
      >
        CarRentSV
      </h1>

      <nav className="flex items-center gap-4">
        <button
          className="text-gray-700 hover:text-gray-900"
          onClick={() => onNavigate('home')}
        >
          Inicio
        </button>
        <button
          className="text-gray-700 hover:text-gray-900"
          onClick={() => onNavigate('rent')}
        >
          Vehículos
        </button>
        <button
          className="text-gray-700 hover:text-gray-900"
          onClick={() => onNavigate('owner')}
        >
          Publicar Vehículo
        </button>

        {isLoggedIn ? (
          <button
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
            onClick={onLogout}
          >
            Cerrar Sesión
          </button>
        ) : null}
      </nav>
    </header>
  );
};

export default LayoutHeader;
