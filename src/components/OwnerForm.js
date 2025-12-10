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
    setCarData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCarData(prev => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const sendCarToBackend = async (newCar) => {
    const token = localStorage.getItem('token');

    const res = await fetch('https://backend-98mt.onrender.com/api/cars', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(newCar)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || "Error al guardar");
    }

    return res.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCar = {
      id: String(Date.now()),
      ...carData,
      year: parseInt(carData.year),
      pricePerDay: parseFloat(carData.pricePerDay),
      features: carData.features.split(',').map(f => f.trim()),
    };

    try {
      await sendCarToBackend(newCar);
      onAddCar(newCar);
      alert("🚗 Vehículo publicado exitosamente 🙌");

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

    } catch (error) {
      alert(`❌ ${error.message}`);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Fondo estilo Home principal */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage:"url('https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg')" }}
      ></div>

      {/* Contenedor con blur + luz + transparencia */}
      <form 
        onSubmit={handleSubmit}
        className="relative z-10 w-[90%] md:w-[50%] lg:w-[40%] p-10
        bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl text-white animate-fadeIn space-y-5"
      >
        <h2 className="text-4xl font-extrabold text-center drop-shadow mb-4">
          🚘 Publicar nuevo vehículo
        </h2>

        {/* Inputs */}
        {[
          {id:'brand',label:'Marca'},
          {id:'model',label:'Modelo'},
          {id:'year',label:'Año',type:'number'},
          {id:'pricePerDay',label:'Precio por Semana ($)',type:'number'},
          {id:'location',label:'Ubicación'},
          {id:'phoneNumber',label:'Teléfono'},
          {id:'startDate',label:'Disponible desde',type:'date'},
        ].map(f=>(
          <div key={f.id}>
            <label className="block mb-1 font-semibold">{f.label}</label>
            <input 
              type={f.type||'text'} name={f.id} value={carData[f.id]} onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white outline-none border border-white/40 focus:border-yellow-300"
              required
            />
          </div>
        ))}

        <div>
          <label className="block font-semibold mb-1">Foto del Vehículo</label>
          <input type="file" accept="image/*" onChange={handleImageChange}
            className="text-white w-full py-2 cursor-pointer" required
          />
          {carData.imageUrl && <img src={carData.imageUrl} className="mt-3 rounded-xl shadow-lg max-h-52 w-full object-cover" />}
        </div>

        <div>
          <label className="block font-semibold mb-1">Descripción</label>
          <textarea name="description" value={carData.description} onChange={handleChange} rows="3"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/40 focus:border-yellow-300 resize-none"
            required></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-1">Características (coma separadas)</label>
          <input name="features" value={carData.features} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/40 focus:border-yellow-300" required
          />
        </div>

        <button className="w-full py-3 rounded-xl text-xl font-bold 
        bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-105 duration-200 shadow-xl">
          🚀 Publicar Vehículo
        </button>
      </form>
    </div>
  );
};

export default OwnerForm ;