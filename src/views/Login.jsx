import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
// Importamos los componentes de React Bootstrap
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";

const Login = () => {
    const { login } = useContext(AdminContext);
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [sector, setSector] = useState("Soporte");

    const ingresar = (e) => {
        e.preventDefault();

        // Guarda los datos en el Contexto y LocalStorage
        login({
            nombre,
            sector
        });

        // Redirige automáticamente a la lista de clientes
        navigate("/clientes");
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="shadow-lg border-0 p-4">
                        <Card.Body>
                            <h3 className="text-center mb-4 text-primary fw-bold">Panel de Control</h3>
                            <p className="text-muted text-center mb-4 small">Ingresa tus credenciales de Administrador</p>
                            
                            <Form onSubmit={ingresar}>
                                {/* Campo: Nombre */}
                                <Form.Group className="mb-3" controlId="formNombre">
                                    <Form.Label className="fw-semibold">Nombre del Administrador</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ej. Viviana"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                {/* Campo: Sector */}
                                <Form.Group className="mb-4" controlId="formSector">
                                    <Form.Label className="fw-semibold">Sector de la Empresa</Form.Label>
                                    <Form.Select
                                        value={sector}
                                        onChange={(e) => setSector(e.target.value)}
                                    >
                                        <option value="Soporte">Soporte</option>
                                        <option value="Gerencia">Gerencia</option>
                                    </Form.Select>
                                </Form.Group>

                                {/* Botón de Envío */}
                                <Button variant="primary" type="submit" className="w-100 py-2 fw-bold shadow-sm">
                                    Ingresar
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;