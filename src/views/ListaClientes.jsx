import { useEffect, useState } from "react";
import axios from "ajax"; // Nota: si usaban axios común, dejalos como "axios"
import { Container, Table, Spinner, Alert } from "react-bootstrap";

const ListaClientes = () => {
  // --- Estados del Módulo B (Tu parte) ---
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  // --- Tabla de Clientes ---
  return (
    <Container className="mt-4">
      <h2 className="mb-4">Módulo B: Listado de Clientes</h2>

      <Table striped bordered hover responsive shadow-sm>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td className="text-capitalize">
                  {cliente.name?.firstname} {cliente.name?.lastname}
                </td>
                <td>{cliente.email}</td>
                <td>{cliente.phone}</td>
                <td className="text-capitalize">{cliente.address?.city}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted py-3">
                No hay clientes disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default ListaClientes;