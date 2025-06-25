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
      availability: {
        startDate: carData.startDate,
        endDate: carData.endDate,
      },
      phoneNumber: carData.phoneNumber,
    };

    try {
      await sendCarToBackend(newCar);
      onAddCar(newCar); // Solo si fue exitoso
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
    } catch (error) {
      console.error(error);
      alert('❌ Error al guardar en el servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      {/* ...todo tu formulario intacto... */}
      {/* No he eliminado ni modificado ningún campo de entrada */}
      {/* Puedes seguir usando tal cual lo tenías */}
      {/* ... */}
    </form>
  );
};

export default OwnerForm;
