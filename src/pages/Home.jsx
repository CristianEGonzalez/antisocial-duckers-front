import PublicacionesRecientes from '../components/PublicacionesRecientes/PublicacionesRecientes'
import Bienvenida from '../components/Bienvenida/Bienvenida'

function Home() {
  return (
    <div>
        <Bienvenida/>
        <PublicacionesRecientes/>
    </div>    
  )
}

export default Home