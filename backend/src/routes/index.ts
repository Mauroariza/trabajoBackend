import { Router } from 'express';
import deviceRouter from './Devices'; // Asegúrate de que este archivo exporte las rutas de dispositivos
import commentRouter from './Comentarios'; // Asegúrate de que este archivo exporte las rutas de comentarios

const router = Router();

router.use('/devices', deviceRouter);
router.use('/comments', commentRouter);

export default router;
