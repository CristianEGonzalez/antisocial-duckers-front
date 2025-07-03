import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import hoverSound from "../../assets/hover-sound.mp3"; // Importá tu sonido
import { useRef } from "react";

export const Header = () => {
  const audioRef = useRef(null);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
  }
  };

  return (
        <header className="navbar px-3 sticky-top shadow-sm" style={{ height: '100px', backgroundColor: "#fff"}}>
      <div className="container-fluid">
        <NavLink to="/" onClick={handleClick}>
          <img src={logo} alt="Logo" width="120"/>
        </NavLink>
        <audio ref={audioRef} src={hoverSound} preload="auto" />
        <NavBar/>
      </div>
    </header>
  );
};