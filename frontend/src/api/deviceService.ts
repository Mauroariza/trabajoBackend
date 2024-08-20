// deviceService.js
import instance from './axios'; 

export const obtenerDispositivos = async () => {
  try {
    const response = await instance.get('/devices');
    return response.data; // Devuelve los datos de los dispositivos
  } catch (error) {
    console.error('Error al obtener dispositivos:', error);
    throw error; // Lanza el error para que sea manejado por quien llame a la función
  }
};
