import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export const Header= () => {
  return (
        <header className="bg-white navbar bg-white shadow-sm px-3 sticky-top" style={{ height: '12vh' }}>
      <div className="container-fluid">
        <NavLink to="/">
          <img src={logo} alt="Logo" width="150"/>
        </NavLink>
        <NavBar/>
      </div>
    </header>
  );
};