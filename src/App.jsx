import { Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header";
import RutaProtegida from "./components/common/RutaProtegida";
import Login from "./views/Login";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <RutaProtegida>
              <h2>Panel principal</h2>
            </RutaProtegida>
          }
        />
      </Routes>
    </>
  );
}

export default App;