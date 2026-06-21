import { Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import RutaProtegida from "./components/common/RutaProtegida";
import Login from "./views/Login";
import ListaClientes from "./views/ListaClientes";
// 👇 LÍNEA NUEVA 1: Importar DetalleCliente
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
              <h2>Panel principal</h2>
            </RutaProtegida>
          }
        />

        {/* Ruta protegida para tu Módulo de Clientes */}
        <Route
          path="/clientes"
          element={
            <RutaProtegida>
              <ListaClientes />
            </RutaProtegida>
          }
        />

        {/* 👇 LÍNEA NUEVA 2: Ruta para DetalleCliente */}
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