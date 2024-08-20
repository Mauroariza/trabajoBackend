import instance from './axios';

// Función para eliminar un dispositivo (DELETE)
export const eliminarDispositivo = async (id: string): Promise<void> => {
  try {
    await instance.delete(`/devices/${id}`);
    console.log('Dispositivo eliminado');
  } catch (error) {
    console.error('Error al eliminar dispositivo:', error);
    throw error;
  }
};
