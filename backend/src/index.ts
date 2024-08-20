import 'dotenv/config';
import sequelize from './db'; // Asegúrate de que este archivo exporte la instancia de Sequelize configurada
import server from './server'; // Asegúrate de que este archivo configure y exporte tu aplicación Express

const PORT = process.env.PORT || 3001; // Uso del .env para el puerto

sequelize
  .sync()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('Error al sincronizar la base de datos', error.message);
  });
