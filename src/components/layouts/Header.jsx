import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Button, Badge } from "react-bootstrap";
import "./Header.css"; // Archivo CSS personalizado

const Header = () => {
  const { admin, logout } = useContext(AdminContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" expand="lg" sticky="top" className="shadow-sm navbar-custom">
      <Container>
        <Navbar.Brand href="#" className="fw-bold text-light">
          📊 Panel de Clientes
        </Navbar.Brand>

        <Navbar.Collapse className="justify-content-end">
          {admin && (
            <div className="d-flex align-items-center gap-3">
              {/* Info del Administrador */}
              <div className="text-light">
                <div className="small mb-1">
                  👤 <strong>{admin.nombre}</strong>
                </div>
                <Badge bg={admin.sector === "Gerencia" ? "danger" : "info"}>
                  {admin.sector}
                </Badge>
              </div>

              {/* Separador */}
              <div className="border-start border-light" style={{ height: "30px" }}></div>

              {/* Botón Cerrar Sesión */}
              <Button
                variant="outline-light"
                size="sm"
                onClick={cerrarSesion}
                className="fw-bold"
              >
                🚪 Cerrar Sesión
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;