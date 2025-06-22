import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export const Header= () => {
  return (
        <header className="bg-white navbar navbar-expand-lg bg-white shadow-sm px-3 py-2">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="Logo" width="120" className="me-2" />
        </NavLink>
        <NavBar/>
      </div>
    </header>
  );
};