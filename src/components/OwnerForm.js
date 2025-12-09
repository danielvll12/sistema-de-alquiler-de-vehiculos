import React, { useState } from 'react';

const OwnerForm = ({ onAddCar }) => {
  const [carData, setCarData] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    location: '',
    images: [], 
    description: '',
    features: '',
    startDate: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData(prev => ({ ...prev, [name]: value }));
  };

  /** 📌 SUBIR MÚLTIPLES IMÁGENES **/
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCarData(prev => ({
          ...prev,
          images: [...prev.images, reader.result] //⬅ Se agregan todas
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  /** ❌ ELIMINAR IMAGEN POR CLICK EN LA X **/
  const removeImage = (index) => {
    setCarData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  /** 📤 Enviar al backend */
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
        images: [],
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

      {/* Fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage:"url('https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg')" }}
      ></div>

      <form 
        onSubmit={handleSubmit}
        className="relative z-10 w-[90%] md:w-[50%] lg:w-[40%] p-10
        bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl text-white space-y-5"
      >
        <h2 className="text-4xl font-extrabold text-center drop-shadow mb-4">
          🚘 Publicar nuevo vehículo
        </h2>

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

        {/* 📌 IMÁGENES */}
        <div>
          <label className="block font-semibold mb-1">Fotos del Vehículo</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange}
            className="text-white w-full py-2 cursor-pointer"
          />

          {/* Vista con eliminar X */}
          {carData.images.length > 0 && (
            <div className="flex gap-3 mt-3 overflow-x-auto">
              {carData.images.map((img, i) => (
                <div key={i} className="relative group">
                  
                  {/* Miniatura */}
                  <img src={img} className="h-20 w-20 object-cover rounded-xl shadow-md" />

                  {/* ❌ Botón para eliminar */}
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 
                               text-white rounded-full w-6 h-6 flex items-center 
                               justify-center text-xs font-bold opacity-90"
                  >
                    ✕
                  </button>

                </div>
              ))}
            </div>
          )}
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

export default OwnerForm;
