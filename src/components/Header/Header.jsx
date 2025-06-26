import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export const Header= () => {
  return (
        <header className="bg-white navbar shadow-sm px-3 sticky-top" style={{ height: '100px' }}>
      <div className="container-fluid">
        <NavLink to="/">
          <img src={logo} alt="Logo" width="120"/>
        </NavLink>
        <NavBar/>
      </div>
    </header>
  );
};