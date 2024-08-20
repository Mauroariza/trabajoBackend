import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Dispositivo, crearDispositivo } from '../api/deviceCreate';
import { obtenerDispositivos } from '../api/deviceService';
import { actualizarDispositivo } from '../api/deviceUpdate';
import { eliminarDispositivo } from '../api/deviceDelete';

const AdminPanel: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Dispositivo>();
  const [devices, setDevices] = useState<Dispositivo[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<Dispositivo | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const dispositivos = await obtenerDispositivos();
        setDevices(dispositivos);
      } catch (error) {
        console.error('Error al obtener dispositivos:', error);
      }
    };

    fetchDevices();
  }, []);

  const onSubmit: SubmitHandler<Dispositivo> = async (data) => {
    if (isUpdating && currentDevice) {
      // Actualizar dispositivo
      try {
        const dispositivoActualizado = await actualizarDispositivo(currentDevice.id, data);
        setDevices((prevDevices) => prevDevices.map(device => 
          device.id === currentDevice.id ? dispositivoActualizado : device
        ));
        console.log('Dispositivo actualizado:', dispositivoActualizado);
        setIsUpdating(false);
        setCurrentDevice(null);
      } catch (error) {
        console.error('Error al actualizar dispositivo:', error);
      }
    } else {
      // Crear nuevo dispositivo
      try {
        const dispositivoCreado = await crearDispositivo(data);
        setDevices((prevDevices) => [...prevDevices, dispositivoCreado]);
        console.log('Dispositivo creado:', dispositivoCreado);
      } catch (error) {
        console.error('Error al crear dispositivo:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await eliminarDispositivo(id);
      setDevices((prevDevices) => prevDevices.filter(device => device.id !== id));
      console.log('Dispositivo eliminado');
    } catch (error) {
      console.error('Error al eliminar dispositivo:', error);
    }
  };

  const openUpdateForm = (device: Dispositivo) => {
    setCurrentDevice(device);
    setValue('id', device.id);
    setValue('name', device.name);
    setValue('description', device.description);
    setValue('details', device.details);
    setValue('imageUrl', device.imageUrl);
    setIsUpdating(true);
  };

  return (
    <div className="admin-panel min-h-screen flex bg-gray-900 text-white">
      <div className="form-container p-8 flex-1" style={{ backgroundColor: isUpdating ? '#333' : '#1a1a1a' }}>
        <h1 className="text-3xl font-bold mb-6 text-center">{isUpdating ? 'Actualizar Dispositivo' : 'Añadir Dispositivo'}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-orange-500">ID del dispositivo</label>
            <input
              {...register('id', { required: 'El ID es obligatorio' })}
              placeholder="ID del dispositivo"
              className="mt-1 p-2 w-full border rounded-md bg-gray-700 text-white"
              disabled={isUpdating}
            />
            {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-orange-500">Nombre del dispositivo</label>
            <input
              {...register('name', { required: 'El nombre es obligatorio' })}
              placeholder="Nombre del dispositivo"
              className="mt-1 p-2 w-full border rounded-md bg-gray-700 text-white"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-orange-500">Descripción del dispositivo</label>
            <textarea
              {...register('description', { required: 'La descripción es obligatoria' })}
              placeholder="Descripción del dispositivo"
              className="mt-1 p-2 w-full border rounded-md bg-gray-700 text-white"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-orange-500">Detalles del dispositivo</label>
            <textarea
              {...register('details', { required: 'Los detalles son obligatorios' })}
              placeholder="Detalles del dispositivo"
              className="mt-1 p-2 w-full border rounded-md bg-gray-700 text-white"
            />
            {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-orange-500">URL de la imagen</label>
            <input
              {...register('imageUrl', { required: 'La URL de la imagen es obligatoria' })}
              placeholder="URL de la imagen"
              className="mt-1 p-2 w-full border rounded-md bg-gray-700 text-white"
            />
            {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>}
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition duration-200">
            {isUpdating ? 'Guardar Cambios' : 'Añadir Dispositivo'}
          </button>
          {isUpdating && (
            <button type="button" onClick={() => { setIsUpdating(false); setCurrentDevice(null); }} className="mt-2 w-full bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 transition duration-200">
              Cancelar
            </button>
          )}
        </form>
      </div>

      <div className="device-list-container p-8 flex-1 bg-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">Lista de Dispositivos</h2>
        <ul className="bg-gray-700 p-6 rounded-lg shadow-md">
          {devices.length === 0 ? (
            <li className="text-center">No hay dispositivos disponibles.</li>
          ) : (
            devices.map((device) => (
              <li key={device.id} className="mb-2 flex justify-between items-center">
                <div>
                  <strong className="text-lg">{device.name}</strong>: {device.description}
                </div>
                <div>
                  <button onClick={() => openUpdateForm(device)} className="ml-4 text-orange-500 hover:underline">Actualizar</button>
                  <button onClick={() => handleDelete(device.id)} className="ml-2 text-red-500 hover:underline">Eliminar</button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
