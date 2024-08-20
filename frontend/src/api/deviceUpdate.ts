import instance from './axios';

// Definición de la interfaz Dispositivo
export interface Dispositivo {
  id: string;
  name: string;
  description: string;
  details: string;
  imageUrl: string;
}

// Función para actualizar un dispositivo existente (PUT)
export const actualizarDispositivo = async (id: string, datosActualizados: Partial<Dispositivo>): Promise<Dispositivo> => {
  try {
    const response = await instance.put(`/devices/${id}`, datosActualizados);
    return response.data; // Devuelve los datos del dispositivo actualizado
  } catch (error) {
    console.error('Error al actualizar dispositivo:', error);
    throw error;
  }
};
