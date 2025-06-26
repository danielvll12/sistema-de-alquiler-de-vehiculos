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
    const response = await fetch('https://backend-98mt.onrender.com/api/cars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCar),
    });

    if (!response.ok) {
      throw new Error('Error al guardar el vehículo en el servidor');
    }

    return response.json();
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
      startDate: carData.startDate,
      phoneNumber: carData.phoneNumber,
    };

    try {
      await sendCarToBackend(newCar);
      onAddCar(newCar);
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
        phoneNumber: '',
      });
      alert('¡Vehículo publicado con éxito!');
    } catch (error) {
      console.error(error);
      alert('❌ Error al guardar en el servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div>
        <label htmlFor="brand" className="block text-gray-700 font-medium mb-2">Marca</label>
        <input type="text" id="brand" name="brand" value={carData.brand} onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
      </div>

      <div>
        <label htmlFor="model" className="block text-gray-700 font-medium mb-2">Modelo</label>
        <input type="text" id="model" name="model" value={carData.model} onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
      </div>

      <div>
        <label htmlFor="year" className="block text-gray-700 font-medium mb-2">Año</label>
        <input type="number" id="year" name="year" value={carData.year} onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
      </div>

      <div>
        <label htmlFor="pricePerDay" className="block text-gray-700 font-medium mb-2">Precio por Semana ($)</label>
        <input type="number" id="pricePerDay" name="pricePerDay" value={carData.pricePerDay} onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
      </div>

      <div>
        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">Ubicación</label>
        <input type="text" id="location" name="location" value={carData.location} onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
      </div>

      <div>
        <label htmlFor="imageUpload" className="block text-gray-700 font-medium mb-2">Foto del Vehículo</label>
        <input type="file" id="imageUpload" name="imageUpload" accept="image/*" onChange={handleImageChange}
          className="w-full" required />
        {carData.imageUrl && (
          <img src={carData.imageUrl} alt="Vista previa" className="mt-4 max-h-48 rounded-lg object-cover shadow-md" />
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Descripción</label>
        <textarea id="description" name="description" value={carData.description} onChange={handleChange}
          rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none" required></textarea>
      </div>

      <div>
        <label htmlFor="features" className="block text-gray-700 font-medium mb-2">Características (coma separadas)</label>
        <input type="text" id="features" name="features" value={carData.features} onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">Teléfono</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" value={carData.phoneNumber} onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
      </div>

      <div>
        <label htmlFor="startDate" className="block text-gray-700 font-medium mb-2">Disponible desde</label>
        <input type="date" id="startDate" name="startDate" value={carData.startDate} onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl" required />
      </div>

      <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-700 text-xl font-semibold shadow-lg">
        Publicar Vehículo
      </button>
    </form>
  );
};

export default OwnerForm;
