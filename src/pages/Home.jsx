import PublicacionesRecientes from '../components/PublicacionesRecientes/PublicacionesRecientes'
import Bienvenida from '../components/Bienvenida/Bienvenida'

function Home() {
  return (
    <div className="container mt-4">
        <Bienvenida/>
        <PublicacionesRecientes/>
    </div>    
  )
}

export default Home