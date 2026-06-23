import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Spinner, Alert, Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListaClientes = () => {
  // --- Estados del Módulo B ---
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  // --- Consumo GET de clientes ---
  useEffect(() => {
    obtenerClientes();
  }, []);

  const obtenerClientes = async () => {
    try {
      setLoading(true);
      setError(false);
      const respuesta = await axios.get("https://fakestoreapi.com/users");
      setClientes(respuesta.data);
    } catch (err) {
      console.error("Error al traer los usuarios:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // --- Lógica del Buscador (Filtra por apellido o ciudad) ---
  const clientesFiltrados = clientes.filter((cliente) => {
    const apellido = cliente.name?.lastname?.toLowerCase() || "";
    const ciudad = cliente.address?.city?.toLowerCase() || "";
    const termino = busqueda.toLowerCase();

    return apellido.includes(termino) || ciudad.includes(termino);
  });
  // --- Estados de Carga y Error ---
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Cargando el listado de clientes...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error de Conexión</Alert.Heading>
          <p>Hubo un fallo al intentar conectar con la API de clientes.</p>
        </Alert>
      </Container>
    );
  }

  // --- Renderizado de la Vista ---
  return (
    <Container className="mt-4">
      <h2 className="mb-4">Módulo B: Listado de Clientes</h2>

      {/* Barra de Búsqueda */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group controlId="searchClient">
            <Form.Control
              type="text"
              placeholder="🔍 Buscar por apellido o ciudad..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Tabla de Clientes */}
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Ciudad</th>
            <th>Acciones</th> {/* Columna nueva para el botón */}
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.length > 0 ? (
            clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td className="text-capitalize">
                  {cliente.name?.firstname} {cliente.name?.lastname}
                </td>
                <td>{cliente.email}</td>
                <td>{cliente.phone}</td>
                <td className="text-capitalize">{cliente.address?.city}</td>
                <td>
                  {/* 3. AGREGADO: Botón para viajar a la ficha profunda */}
                  <Link to={`/clientes/${cliente.id}`}>
                    <Button variant="info" size="sm" className="text-white">
                      Ver Ficha Completa
                    </Button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted py-3">
                No se encontraron clientes que coincidan con la búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListaClientes;