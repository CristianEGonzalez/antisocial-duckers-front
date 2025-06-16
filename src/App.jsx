import { Header } from './components/Header/Header';
import { Publicacion } from './components/Publicacion/Publicacion';

const App = () => {
  return (
    <>
      <Header/>
      <main className="container mt-4">

        {/* Esto debería hacer MAP a las publicaciones recientes */}
      <Publicacion
        nickName={"Pez"}
        titulo="Hola Mundo"
        contenido={"Bienvenidos a la casa de la astrología"}
        imagenes={["chicken1.jpg", "chicken2.jpg", "chicken3.jpg"]}
        etiquetas={["comida", "hamburguesas"]}
        cantidadComentarios={125}
        urlVerMas={"https://www.google.com.ar"}
      />
            <Publicacion
        nickName={"Pez"}
        titulo="Hola Mundo"
        contenido={"Bienvenidos a la casa de la astrología"}
        imagenes={["chicken1.jpg", "chicken2.jpg", "chicken3.jpg"]}
        etiquetas={["comida", "hamburguesas"]}
        cantidadComentarios={125}
        urlVerMas={"https://www.google.com.ar"}
      />
            <Publicacion
        nickName={"Pez"}
        titulo="Hola Mundo"
        contenido={"Bienvenidos a la casa de la astrología"}
        imagenes={["chicken1.jpg", "chicken2.jpg", "chicken3.jpg"]}
        etiquetas={["comida", "hamburguesas"]}
        cantidadComentarios={125}
        urlVerMas={"https://www.google.com.ar"}
      />
            <Publicacion
        nickName={"Pez"}
        titulo="Hola Mundo"
        contenido={"Bienvenidos a la casa de la astrología"}
        imagenes={["chicken1.jpg", "chicken2.jpg", "chicken3.jpg"]}
        etiquetas={["comida", "hamburguesas"]}
        cantidadComentarios={125}
        urlVerMas={"https://www.google.com.ar"}
      />
      </main>

    </>
  );
};

export default App;