import { useState } from "react";
import { NavLink } from "react-router-dom";

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
            <NavLink to="/"  className="nav-link text-success" >Home</NavLink>
          </li>
          <li className="nav-item text-end">
            <NavLink to="/login"  className="nav-link text-success" >Login</NavLink>
          </li>
          <li className="nav-item text-end">
            <NavLink to="/registro"  className="nav-link text-success" >Registro</NavLink>
          </li>
          <li className="nav-item text-end">
            <NavLink to="/perfil"  className="nav-link text-success" >Perfil</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
