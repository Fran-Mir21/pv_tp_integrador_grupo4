import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Spinner, Alert, Form, Row, Col, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const ListaClientes = () => {
  // --- Estados del Módulo B ---
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  // --- Estados del Módulo C (Formulario POST) ---
  const [showModal, setShowModal] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    street: "",
    number: "",
    city: "",
    zipcode: "",
    username: "",
    password: "",
  });

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

  // --- Función para manejar cambios en el formulario ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- Función para enviar el formulario (Módulo C: POST) ---
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setEnviando(true);

    try {
      // Estructurar los datos según la API
      const nuevoCliente = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        name: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
        phone: formData.phone,
        address: {
          street: formData.street,
          number: parseInt(formData.number) || 0,
          city: formData.city,
          zipcode: formData.zipcode,
        },
      };

      // Hacer POST a la API
      const response = await axios.post("https://fakestoreapi.com/users", nuevoCliente);
      
      // Agregar cliente nuevo al estado local (simular persistencia)
      const clienteConId = {
        id: response.data.id,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        name: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
        phone: formData.phone,
        address: {
          street: formData.street,
          number: parseInt(formData.number) || 0,
          city: formData.city,
          zipcode: formData.zipcode,
        },
      };
      
      setClientes([...clientes, clienteConId]);
      
      // Mostrar mensaje de éxito
      setAlertSuccess(`✅ Cliente agregado exitosamente. ID asignado: ${response.data.id}`);
      
      // Limpiar formulario
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        street: "",
        number: "",
        city: "",
        zipcode: "",
        username: "",
        password: "",
      });

      // Cerrar modal
      setShowModal(false);

      // Desaparecer alerta después de 5 segundos
      setTimeout(() => setAlertSuccess(""), 5000);
    } catch (err) {
      console.error("Error al crear cliente:", err);
      setAlertSuccess(`❌ Error al crear cliente: ${err.message}`);
      setTimeout(() => setAlertSuccess(""), 5000);
    } finally {
      setEnviando(false);
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

      {/* Alert de éxito/error temporal (Módulo C) */}
      {alertSuccess && (
        <Alert variant={alertSuccess.includes("✅") ? "success" : "danger"} dismissible onClose={() => setAlertSuccess("")}>
          {alertSuccess}
        </Alert>
      )}

      {/* Barra de Búsqueda y Botón Agregar */}
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
        <Col md={6} className="text-end">
          <Button variant="success" onClick={() => setShowModal(true)}>
            + Agregar Nuevo Cliente
          </Button>
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
            <th>Acciones</th>
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

      {/* Modal de Formulario para Alta de Clientes (Módulo C) */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitForm}>
            {/* Datos Personales */}
            <h6 className="mb-3 border-bottom pb-2">📋 Datos Personales</h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Dirección */}
            <h6 className="mb-3 border-bottom pb-2">🏠 Dirección</h6>
            <Form.Group className="mb-3">
              <Form.Label>Calle</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Número</Form.Label>
                  <Form.Control
                    type="number"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Código Postal</Form.Label>
                  <Form.Control
                    type="text"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Credenciales */}
            <h6 className="mb-3 border-bottom pb-2">🔐 Credenciales</h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="success"
            onClick={handleSubmitForm}
            disabled={enviando}
          >
            {enviando ? (
              <>
                <Spinner as="span" animation="border" size="sm" className="me-2" />
                Guardando...
              </>
            ) : (
              "Guardar Cliente"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ListaClientes;