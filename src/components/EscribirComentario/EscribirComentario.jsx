import { useState } from 'react';
import { crearComentario } from '../../services/commentApi'

const EscribirComentario = ({ postId, onComentarioCreado, userId }) => {
    const [comentarioTexto, setComentarioTexto] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);

        try {
            const nuevoComentario = { postId: postId, comment: comentarioTexto, userId: userId };
            console.log(nuevoComentario)

            const comentarioCreado = await crearComentario(nuevoComentario);

            setComentarioTexto('')

            // Notificar al componente padre que se creó un comentario
            if (onComentarioCreado) {
                onComentarioCreado(comentarioCreado); // Puedes pasar el comentario creado de vuelta
            }

        } catch (err) {
            console.error('Error al enviar comentario:', err);
            setError(err.message || 'No se pudo crear el comentario. Intenta de nuevo.');
        }
    };

    return (
        <div className="card bg-white p-4 rounded-3 shadow-sm border border-light mb-4">
            <h4 className="mb-3 text-dark">Agregar un comentario</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        id="comentarioTexto"
                        rows="3"
                        placeholder="Escribe tu comentario aquí..."
                        value={comentarioTexto}
                        onChange={(e) => setComentarioTexto(e.target.value)}
                    ></textarea>
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button
                    type="submit"
                    className="btn btn-primary"
                >Comentar
                </button>
            </form>
        </div>
    );
};

export default EscribirComentario;