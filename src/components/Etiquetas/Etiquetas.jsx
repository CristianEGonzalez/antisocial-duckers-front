import { useEffect, useState } from "react";
import { obtenerTagsDeUnPost } from "../../services/postApi";

const Etiquetas = ({idPublicacion}) => {
  const [etiquetas, setEtiquetas] = useState([])

  useEffect(() => {
      const fetchEtiquetas = async () => {
        try {
          const listaDeEtiquetas = await obtenerTagsDeUnPost(idPublicacion)
          setEtiquetas(listaDeEtiquetas);
        } catch (err) {
          setError(
            "Error al cargar las etiquetas: " +
              (err.message || "Por favor, intenta de nuevo más tarde.")
          );
        }
      };
  
      fetchEtiquetas();
    }, []);

  return <>
    {etiquetas.length > 0 && (
        <div className="mt-1 mb-2 d-flex flex-wrap gap-2">
        {etiquetas.map((etiqueta, index) => (
            <span
            key={index}
            className="badge bg-success-subtle text-dark px-2 py-2"
            >
            {`#${etiqueta.tag}`}
            </span>
        ))}
        </div>
    )}
  </>
}

export default Etiquetas;