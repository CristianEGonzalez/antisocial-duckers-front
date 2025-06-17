import FormRegistro from './components/FormRegistro/FormRegistro';
import { Header } from './components/Header/Header';
// import { Publicacion } from './components/Publicacion/Publicacion';
import PublicacionesRecientes from './components/PublicacionesRecientes/PublicacionesRecientes';

const App = () => {
  return (
    <>
      <Header/>
      <main className="container mt-4">
        <PublicacionesRecientes/>

        <FormRegistro/>

      </main>

    </>
  );
};

export default App;