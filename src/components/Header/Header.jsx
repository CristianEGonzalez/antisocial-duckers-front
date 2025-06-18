import { Menu } from "../Menu/Menu";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";

export const Header= () => {
  return (
    <header className="bg-success-subtle navbar navbar-expand-lg bg-white shadow-sm px-3 py-2">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
          <img src={logo} alt="Logo" width="120" className="me-2" />
        </NavLink>
        <Menu />
      </div>
    </header>
  );
};