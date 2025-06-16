import { useState } from "react";

export const Menu = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <button
        className="bg-light navbar-toggler"
        type="button"
        onClick={() => setExpanded(!expanded)}
        aria-controls="navbarNav"
        aria-expanded={expanded}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`collapse navbar-collapse justify-content-end ${expanded ? "show" : ""}`}
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item text-end">
            <a className="nav-link text-success" href="#usuarios">Usuarios</a>
          </li>
          <li className="nav-item text-end">
            <a className="nav-link text-success" href="#publicaciones">Publicaciones</a>
          </li>
          <li className="nav-item text-end">
            <a className="nav-link text-success" href="#comentarios">Comentarios</a>
          </li>
          <li className="nav-item text-end">
            <a className="nav-link text-success" href="#etiquetas">Etiquetas</a>
          </li>
        </ul>
      </div>
    </>
  );
};
