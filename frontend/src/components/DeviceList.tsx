import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerDispositivos } from '../api/deviceService';

// Define el tipo para un dispositivo
interface Device {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const DeviceList = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const dispositivos = await obtenerDispositivos();
        setDevices(dispositivos);
      } catch (error) {
        setError('Error al obtener dispositivos');
        console.error('Error al obtener dispositivos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleDetailClick = (id: number) => {
    navigate(`/device/${id}`);
  };

  if (loading) {
    return <div className="text-white">Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {devices.map((device) => (
        <div key={device.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-orange-500">{device.name}</h2>
          <p className="text-gray-400">{device.description}</p>
          <img
            src={device.imageUrl}
            alt="Device"
            className="w-full h-58 mt-4 rounded-lg shadow-md"
          />
          <button
            onClick={() => handleDetailClick(device.id)}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-200"
          >
            Ver Detalles
          </button>
        </div>
      ))}
    </div>
  );
};

export default DeviceList;
