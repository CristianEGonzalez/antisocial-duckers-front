import { Navigate, Route, Routes } from "react-router-dom"
import { Header } from './components/Header/Header';
import Home from "../src/pages/Home"
import Login from "../src/pages/Login"
import Perfil from "../src/pages/Perfil"
import DetallePublicacion from "../src/pages/DetallePublicacion"
import Registro from "../src/pages/Registro"


const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/perfil" element={ <Perfil /> } />
        <Route path="/registro" element={ <Registro /> } />
        <Route path="/detallepublicacion/:id" element={ <DetallePublicacion /> } />
        <Route path="/*" element={ <Navigate to="/" /> } />
      </Routes>
    </>
  );
};

export default App;