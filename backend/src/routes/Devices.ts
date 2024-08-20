import { Router } from 'express';
import { getAllDevices, createDevice, deleteDevice, updateDevice } from '../controllers/deviceController';

const router = Router();

router.get('/', getAllDevices);
router.post('/', createDevice);
router.put('/:id', updateDevice); // Ruta para actualizar un dispositivo
router.delete('/:id', deleteDevice); // Ruta para borrar un dispositivo

export default router;