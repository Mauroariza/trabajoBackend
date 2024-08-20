import { Router } from 'express';
import { getAllComments, createComment, updateComment, deleteComment } from '../controllers/commentController';

const router = Router();

router.get('/:deviceId', getAllComments); // Obtener todos los comentarios de un dispositivo
router.post('/', createComment); // Crear un nuevo comentario
router.put('/:id', updateComment); // Actualizar un comentario existente
router.delete('/:id', deleteComment); // Eliminar un comentario

export default router;
