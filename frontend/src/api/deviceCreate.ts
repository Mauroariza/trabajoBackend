// deviceService.js
import instance from './axios';

// Definición de la interfaz Dispositivo
export interface Dispositivo {
    id: string;
    name: string;
    description: string;
    details:string;
    imageUrl: string;
  }
// Función para crear un nuevo dispositivo (POST)
export const crearDispositivo = async (nuevoDispositivo: Dispositivo) => {
  try {
    const response = await instance.post('/devices', nuevoDispositivo);
    return response.data; // Devuelve los datos del dispositivo creado
  } catch (error) {
    console.error('Error al crear dispositivo:', error);
    throw error;
  }
};
