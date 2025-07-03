import { useState } from 'react';
import { crearComentario } from '../../services/commentApi'

const EscribirComentario = ({ postId, onComentarioCreado, userId }) => {
    const [comentarioTexto, setComentarioTexto] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        setError(null);

        try {
            const nuevoComentario = { postId: postId, comment: comentarioTexto, userId: userId };
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

    // Función para que reconozca la tecla Enter y haga submit del comentario
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Evita salto de línea
            handleSubmit();
        }
    };

    return (
        <div className="bg-white p-4 rounded-3 shadow-sm">
            <h4 className="mb-3">Agregar un comentario</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        id="comentarioTexto"
                        rows="3"
                        placeholder="Escribe tu comentario aquí..."
                        value={comentarioTexto}
                        onChange={(e) => setComentarioTexto(e.target.value)}
                        onKeyDown={handleKeyDown} //submit con Enter
                    ></textarea>
                </div>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <button type="submit" className="btn btn-success">Comentar</button>
            </form>
        </div>
    );
};

export default EscribirComentario;