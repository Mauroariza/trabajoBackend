import { Request, Response } from 'express';
import { Comment } from '../db'; // Asegúrate de que esta importación sea correcta y que el modelo esté inicializado

// Obtener todos los comentarios de un dispositivo
export const getAllComments = async (req: Request, res: Response) => {
  const { deviceId } = req.params;
  try {
    const comments = await Comment.findAll({ where: { deviceId } });
    res.json(comments);
  } catch (error) {
    console.error('Error al obtener los comentarios:', error); // Usar el error
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
};

// Crear un nuevo comentario
export const createComment = async (req: Request, res: Response) => {
  const { content, deviceId } = req.body;
  try {
    const newComment = await Comment.create({ content, deviceId });
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error al crear el comentario:', error); // Usar el error
    res.status(500).json({ error: 'Error al crear el comentario' });
  }
};

// Actualizar un comentario existente
export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const comment = await Comment.findByPk(id);
    if (comment) {
      comment.content = content;
      await comment.save();
      res.json(comment);
    } else {
      res.status(404).json({ error: 'Comentario no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el comentario:', error); // Usar el error
    res.status(500).json({ error: 'Error al actualizar el comentario' });
  }
};

// Eliminar un comentario
export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);
    if (comment) {
      await comment.destroy();
      res.json({ message: 'Comentario eliminado' });
    } else {
      res.status(404).json({ error: 'Comentario no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el comentario:', error); // Usar el error
    res.status(500).json({ error: 'Error al eliminar el comentario' });
  }
};
