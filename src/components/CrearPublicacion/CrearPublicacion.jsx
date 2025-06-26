import React, { useState } from 'react';
import './CrearPublicacion.css'; // Importa el archivo CSS

const CrearPublicacion = ({ tagsExistentes = [], onSubmit }) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [urlsImagenes, setUrlsImagenes] = useState(['', '', '', '', '']); // 5 campos para URLs
  const [tagsSeleccionados, setTagsSeleccionados] = useState([]);

  const handleImagenChange = (index, value) => {
    const newUrls = [...urlsImagenes];
    newUrls[index] = value;
    setUrlsImagenes(newUrls);
  };

  const handleTagsChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setTagsSeleccionados(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const publicacion = {
      titulo,
      contenido,
      // Filtramos las URLs vacías antes de enviarlas
      urlsImagenes: urlsImagenes.filter(url => url.trim() !== ''),
      tags: tagsSeleccionados,
    };
    onSubmit(publicacion);
    // Opcional: Reiniciar el formulario después del envío
    setTitulo('');
    setContenido('');
    setUrlsImagenes(['', '', '', '', '']);
    setTagsSeleccionados([]);
  };

  return (
    <form onSubmit={handleSubmit} className="publicacion-form">
      <h2>Crear Nueva Publicación</h2>

      <div className="form-group">
        <label htmlFor="titulo">Título:</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="contenido">Contenido:</label>
        <textarea
          id="contenido"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          rows="6"
          required
        />
      </div>

      <div className="form-group">
        <label>URLs de Imágenes (hasta 5):</label>
        {urlsImagenes.map((url, index) => (
          <input
            key={index}
            type="url"
            placeholder={`URL de Imagen ${index + 1}`}
            value={url}
            onChange={(e) => handleImagenChange(index, e.target.value)}
          />
        ))}
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags:</label>
        <select
          id="tags"
          multiple
          value={tagsSeleccionados}
          onChange={handleTagsChange}
        >
          {tagsExistentes.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <small className="help-text">
          Mantén 'Ctrl' (o 'Cmd' en Mac) para seleccionar múltiples tags.
        </small>
      </div>

      <button type="submit" className="submit-button">Crear Publicación</button>
    </form>
  );
};

export default CrearPublicacion;