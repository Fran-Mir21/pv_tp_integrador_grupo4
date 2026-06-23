import { Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import RutaProtegida from "./components/common/RutaProtegida";
import Login from "./views/Login";
import ListaClientes from "./views/ListaClientes";
import DetalleCliente from "./views/DetalleCliente";

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
          element={
            <RutaProtegida>
              <div className="container mt-4">
                <h2>Panel Principal / Dashboard</h2>
              </div>
            </RutaProtegida>
          }
        />

        {/* Ruta protegida para el Módulo de Clientes */}
        <Route
          path="/clientes"
          element={
            <RutaProtegida>
              <ListaClientes />
            </RutaProtegida>
          }
        />

        {/* Ruta dinámica protegida para la Ficha Profunda (Módulo D) */}
        <Route
          path="/clientes/:id"
          element={
            <RutaProtegida>
              <DetalleCliente />
            </RutaProtegida>
          }
        />
      </Routes>
    </>
  );
}

export default App;