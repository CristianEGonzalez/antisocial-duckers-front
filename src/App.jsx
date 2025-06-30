import { Navigate, Route, Routes } from "react-router-dom"
import { Header } from './components/Header/Header';
import Home from "../src/pages/Home"
import Login from "../src/pages/Login"
import Perfil from "../src/pages/Perfil"
import DetallePublicacionId from "../src/pages/DetallePublicacionId"
import Registro from "../src/pages/Registro"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Publicaciones from "../src/pages/Publicaciones";
import CrearPublicacion from "../src/components/CrearPublicacion/CrearPublicacion";

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/registro" element={ <Registro /> } />
        <Route path="/detallepublicacionid/:id" element={ <DetallePublicacionId /> } />
        <Route path="/publicaciones" element={<Publicaciones />} />
        <Route path="/*" element={ <Navigate to="/" /> } />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/crearPublicacion"
          element={
            <PrivateRoute>
              <CrearPublicacion/>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;