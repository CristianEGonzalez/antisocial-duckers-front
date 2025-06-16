import { Publicacion } from "../Publicacion/Publicacion"

function PublicacionesRecientes() {
    return (
        <div className="bg-success bg-gradient" style={{ display: 'flex', flexWrap: 'wrap row', justifyContent: "space-between"}}>
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
        </div>
    )
}

export default PublicacionesRecientes