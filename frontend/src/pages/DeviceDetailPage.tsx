import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerDispositivos } from '../api/deviceService';
import { createComment, deleteComment, updateComment } from '../api/commentService';
import { Comment } from '../api/commentService';
// Define el tipo para un dispositivo
interface Device {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}



const DeviceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>('');

  useEffect(() => {
    const fetchDevice = async () => {
      if (!id) {
        setError('ID de dispositivo no proporcionado');
        setLoading(false);
        return;
      }

      try {
        const dispositivos: Device[] = await obtenerDispositivos();
        const foundDevice = dispositivos.find((device) => device.id === parseInt(id, 10));
        if (foundDevice) {
          setDevice(foundDevice);
        } else {
          setError('Dispositivo no encontrado');
        }
      } catch (error) {
        setError('Error al obtener dispositivos');
        console.error('Error al obtener dispositivos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, [id]);

  const handleAddComment = async () => {
    if (comment.trim() && device) {
      try {
        const newComment = await createComment({ content: comment, deviceId: device.id });
        setComments([...comments, newComment]);
        setComment('');
      } catch (error) {
        console.error('Error al añadir el comentario:', error);
      }
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error('Error al eliminar el comentario:', error);
    }
  };

  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const handleUpdateComment = async () => {
    if (editingCommentId !== null && editingContent.trim()) {
      try {
        const updatedComment = await updateComment(editingCommentId, editingContent);
        setComments(comments.map((c) => (c.id === updatedComment.id ? updatedComment : c)));
        setEditingCommentId(null);
        setEditingContent('');
      } catch (error) {
        console.error('Error al actualizar el comentario:', error);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-white">Cargando...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-white">{error}</div>;
  }

  return (
    <div className="container w-1/2 mx-auto p-4 bg-gray-800 text-orange-500 min-h-screen flex flex-col items-center">
      {device && (
        <>
          <h1 className="text-2xl font-bold mb-4">{device.name}</h1>
          <img src={device.imageUrl} alt={device.name} className="mb-4 w-1/3 h-auto mx-auto" />
          <p className="mb-4">{device.description}</p>
          <div className="mt-4 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-2">Comentarios</h2>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id} className="mb-2">
                  {editingCommentId === comment.id ? (
                    <>
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-2 bg-gray-800 text-orange-500"
                      />
                      <button
                        onClick={handleUpdateComment}
                        className="mt-2 p-2 bg-blue-500 text-white rounded"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setEditingCommentId(null)}
                        className="mt-2 p-2 bg-gray-500 text-white rounded"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      {comment.content}
                      <button
                        onClick={() => handleEditComment(comment)}
                        className="ml-2 text-blue-500"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="ml-2 text-red-500"
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2 bg-gray-800 text-orange-500"
              placeholder="Añadir un comentario"
            />
            <button
              onClick={handleAddComment}
              className="mt-2 p-2 bg-blue-500 text-white rounded"
            >
              Añadir comentario
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeviceDetailPage;