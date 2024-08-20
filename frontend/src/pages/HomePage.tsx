import React from 'react';
import DeviceList from '../components/DeviceList';

const HomePage = () => {
  return (
    <div className="w-full p-6 bg-gray-900 min-h-screen text-white">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-orange-500">Lista de Dispositivos</h1>
        <p className="text-gray-400">Explora la colección de dispositivos disponibles.</p>
      </header>

      <main>
        <DeviceList />
      </main>
    </div>
  );
};

export default HomePage;
