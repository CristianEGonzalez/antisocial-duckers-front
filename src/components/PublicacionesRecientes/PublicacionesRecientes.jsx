import { Publicacion } from "../Publicacion/Publicacion"

function PublicacionesRecientes() {
    return (
        <div className="bg-success bg-gradient" style={{ display: 'flex', flexWrap: 'wrap row', justifyContent: "space-between"}}>
            {/* Esto debería hacer MAP a las publicaciones recientes */}
            <Publicacion
                idPublicacion={"jo9c67f435"}
                nickName={"Pez"}
                titulo="Hola Mundo"
                contenido={"Bienvenidos a la casa de la astrología"}
                imagenes={["chicken1.jpg", "chicken2.jpg", "chicken3.jpg"]}
                etiquetas={["comida", "hamburguesas"]}
                cantidadComentarios={125}
                urlVerMas={"https://www.google.com.ar"}
            />
            <Publicacion
                idPublicacion={"vfdo7h64eh5"}
                nickName={"Pez"}
                titulo="Hola Mundo"
                contenido={"Bienvenidos a la casa de la astrología"}
                imagenes={["chicken1.jpg", "chicken2.jpg", "chicken3.jpg"]}
                etiquetas={["comida", "hamburguesas"]}
                cantidadComentarios={125}
                urlVerMas={"https://www.google.com.ar"}
            />
            <Publicacion
                idPublicacion={"fq43jo8734"}
                nickName={"Pez"}
                titulo="Hola Mundo"
                contenido={"Bienvenidos a la casa de la astrología"}
                imagenes={["chicken1.jpg", "chicken2.jpg", "chicken3.jpg"]}
                etiquetas={["comida", "hamburguesas"]}
                cantidadComentarios={125}
                urlVerMas={"https://www.google.com.ar"}
            />
            <Publicacion
                idPublicacion={"fgdae4q3wa"}
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