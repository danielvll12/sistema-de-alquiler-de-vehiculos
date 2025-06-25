const initialCars = [
  {
    id: '1',
    ownerId: 'owner1',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2020,
    pricePerDay: 30,
    location: 'San Salvador',
    imageUrl: 'https://www.toyota.com.sv/wp-content/uploads/2024/09/SILVER-METALLIC-1F7.png',
    description: 'Toyota Corolla confiable y económico. Ideal para viajes en la ciudad o carretera.',
    features: ['Aire Acondicionado', 'Automático', 'Bluetooth'],
    availability: {
      startDate: '2024-06-01',
      endDate: '2025-06-30',
    },
    phoneNumber: '+503 7000 0001',
  },
  {
    id: '2',
    ownerId: 'owner2',
    brand: 'Honda',
    model: 'Civic',
    year: 2022,
    pricePerDay: 40,
    location: 'Santa Tecla',
    imageUrl: 'https://i.ytimg.com/vi/t-HjHkXznpg/maxresdefault.jpg',
    description: 'Honda Civic moderno con excelente rendimiento y comodidad.',
    features: ['GPS', 'Bluetooth', 'Automático'],
    availability: {
      startDate: '2024-07-01',
      endDate: '2025-07-01',
    },
    phoneNumber: '+503 7000 0002',
  },
  {
    id: '3',
    ownerId: 'owner3',
    brand: 'Mazda',
    model: 'CX-5',
    year: 2021,
    pricePerDay: 50,
    location: 'La Libertad',
    imageUrl: 'https://www.mazdaelsalvador.com/images/mazda-cx5-2021/360/soul_red/soul_red_04.webp',

    description: 'SUV ideal para viajes largos con familia o amigos. Espacioso y seguro.',
    features: ['4x4', 'Aire Acondicionado', 'Sensor de retroceso'],
    availability: {
      startDate: '2024-08-15',
      endDate: '2025-08-15',
    },
    phoneNumber: '+503 7000 0003',
  },
];

export default initialCars;
