import { Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import RutaProtegida from "./components/common/RutaProtegida";
import Login from "./views/Login";
// 1. Importación obligatoria para que React reconozca el componente
import ListaClientes from "./views/ListaClientes"; 

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* Ruta pública para el Login */}
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida para el Home / Dashboard */}
        <Route
          path="/"
          element = {
            <RutaProtegida>
              <h2>Panel principal</h2>
            </RutaProtegida>
          }
        />

        {/* 2. Ruta protegida para tu Módulo de Clientes */}
        <Route
          path="/clientes"
          element = {
            <RutaProtegida>
              <ListaClientes />
            </RutaProtegida>
          }
        />
      </Routes>
    </>
  );
}

export default App;