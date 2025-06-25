import React, { useState } from 'react';

const OwnerForm = ({ onAddCar }) => {
  const [carData, setCarData] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    location: '',
    imageUrl: '',
    description: '',
    features: '',
    startDate: '',
    endDate: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCarData((prevData) => ({
          ...prevData,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const sendCarToBackend = async (newCar) => {
    try {
      const response = await fetch('http://localhost:4000/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCar),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el vehículo en el servidor');
      }

      console.log('Vehículo guardado en el backend');
    } catch (error) {
      console.error(error);
      alert('Error al guardar en el servidor');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCar = {
      id: String(Date.now()),
      ownerId: 'ownerX',
      brand: carData.brand,
      model: carData.model,
      year: parseInt(carData.year),
      pricePerDay: parseFloat(carData.pricePerDay),
      location: carData.location,
      imageUrl: carData.imageUrl,
      description: carData.description,
      features: carData.features.split(',').map((f) => f.trim()),
      availability: {
        startDate: carData.startDate,
        endDate: carData.endDate,
      },
      phoneNumber: carData.phoneNumber,
    };

    onAddCar(newCar);
    await sendCarToBackend(newCar);

    setCarData({
      brand: '',
      model: '',
      year: '',
      pricePerDay: '',
      location: '',
      imageUrl: '',
      description: '',
      features: '',
      startDate: '',
      endDate: '',
      phoneNumber: '',
    });

    alert('¡Vehículo publicado con éxito!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div>
        <label htmlFor="brand" className="block text-gray-700 font-medium mb-2">
          Marca
        </label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={carData.brand}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
          placeholder="Ej: Toyota"
          required
        />
      </div>

      <div>
        <label htmlFor="model" className="block text-gray-700 font-medium mb-2">
          Modelo
        </label>
        <input
          type="text"
          id="model"
          name="model"
          value={carData.model}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
          placeholder="Ej: Corolla"
          required
        />
      </div>

      <div>
        <label htmlFor="year" className="block text-gray-700 font-medium mb-2">
          Año
        </label>
        <input
          type="number"
          id="year"
          name="year"
          value={carData.year}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
          placeholder="Ej: 2020"
          required
        />
      </div>

      <div>
        <label htmlFor="pricePerDay" className="block text-gray-700 font-medium mb-2">
          Precio por Día ($)
        </label>
        <input
          type="number"
          id="pricePerDay"
          name="pricePerDay"
          value={carData.pricePerDay}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
          placeholder="Ej: 35"
          step="0.01"
          required
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
          Ubicación
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={carData.location}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
          placeholder="Ej: San Salvador"
          required
        />
      </div>

      <div>
        <label htmlFor="imageUpload" className="block text-gray-700 font-medium mb-2">
          Foto del Vehículo
        </label>
        <input
          type="file"
          id="imageUpload"
          name="imageUpload"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
          required
        />
        {carData.imageUrl && (
          <img
            src={carData.imageUrl}
            alt="Preview"
            className="mt-4 max-h-48 rounded-lg object-cover shadow-md"
          />
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={carData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none"
          placeholder="Describe tu vehículo y sus beneficios..."
          required
        ></textarea>
      </div>

      <div>
        <label htmlFor="features" className="block text-gray-700 font-medium mb-2">
          Características (separadas por coma)
        </label>
        <input
          type="text"
          id="features"
          name="features"
          value={carData.features}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
          placeholder="Ej: Aire Acondicionado, Automático, 4 Puertas"
          required
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
          Número de Teléfono
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={carData.phoneNumber}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
          placeholder="Ej: +503 7000 0000"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="startDate" className="block text-gray-700 font-medium mb-2">
            Fecha de Inicio de Disponibilidad
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={carData.startDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            required
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-gray-700 font-medium mb-2">
            Fecha de Fin de Disponibilidad
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={carData.endDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-700 transition-colors text-xl font-semibold shadow-lg"
      >
        Publicar Vehículo
      </button>
    </form>
  );
};

export default OwnerForm;
