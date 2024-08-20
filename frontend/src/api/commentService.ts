// commentService.ts
import instance from './axios';

// Tipos para los comentarios
export interface Comment {
  id?: number;
  content: string;
  deviceId: number;
}

// Crear un nuevo comentario
export const createComment = async (comment: Comment): Promise<Comment> => {
  try {
    const response = await instance.post<Comment>('/comments', comment);
    return response.data;
  } catch (error) {
    console.error('Error al crear el comentario:', error);
    throw error;
  }
};

// Actualizar un comentario existente
export const updateComment = async (id: number, content: string): Promise<Comment> => {
  try {
    const response = await instance.put<Comment>(`/comments/${id}`, { content });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el comentario:', error);
    throw error;
  }
};

// Eliminar un comentario
export const deleteComment = async (id: number): Promise<void> => {
  try {
    await instance.delete(`/comments/${id}`);
  } catch (error) {
    console.error('Error al eliminar el comentario:', error);
    throw error;
  }
};
