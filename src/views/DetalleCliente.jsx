// src/views/DetalleCliente.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { Container, Card, Button, Alert, Spinner, Row, Col, Badge } from 'react-bootstrap';

function DetalleCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext);
  
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  const esGerencia = admin?.sector === 'Gerencia';

  // Obtener datos del cliente
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://fakestoreapi.com/users/${id}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudo obtener el cliente`);
        }
        const data = await response.json();
        setCliente(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, [id]);

  // Eliminar cliente (solo Gerencia)
  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de eliminar este cliente?')) return;

    try {
      setDeleting(true);
      
      // Verificar si es un cliente personalizado (guardado en localStorage)
      const clientesGuardados = localStorage.getItem("clientesPersonalizados");
      const clientesLocales = clientesGuardados ? JSON.parse(clientesGuardados) : [];
      const esClientePersonalizado = clientesLocales.some(c => c.id === parseInt(id));
      
      if (esClientePersonalizado) {
        // Eliminar del localStorage
        const clientesFiltrados = clientesLocales.filter(c => c.id !== parseInt(id));
        localStorage.setItem("clientesPersonalizados", JSON.stringify(clientesFiltrados));
      } else {
        // Para clientes de la API, hacer DELETE (simula la acción)
        const response = await fetch(`https://fakestoreapi.com/users/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudo eliminar`);
        }
      }

      setAlertVariant('success');
      setAlertMessage('✅ Cliente eliminado correctamente. Regresando...');
      setShowAlert(true);

      // Redirigir después de 1.5 segundos
      setTimeout(() => {
        navigate('/clientes', { replace: true });
      }, 1500);
    } catch (err) {
      setDeleting(false);
      setAlertVariant('danger');
      setAlertMessage(`❌ ${err.message}`);
      setShowAlert(true);
    }
  };

  // Estados de carga y error
  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Cargando datos del cliente...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => navigate('/clientes')}>
            Volver a Clientes
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!cliente) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          <Alert.Heading>Cliente no encontrado</Alert.Heading>
          <p>No se encontró el cliente con ID: {id}</p>
          <Button variant="outline-warning" onClick={() => navigate('/clientes')}>
            Volver a Clientes
          </Button>
        </Alert>
      </Container>
    );
  }

  // Render principal
  return (
    <Container className="mt-4">
      {/* Alert de notificación */}
      <Alert 
        variant={alertVariant} 
        show={showAlert} 
        onClose={() => setShowAlert(false)}
        dismissible
        className="mb-3"
      >
        {alertMessage}
      </Alert>

      <Card className="shadow-lg">
        <Card.Header as="h4" className="bg-dark text-white">
          Ficha Completa del Cliente
          <Badge bg="light" text="dark" className="ms-3">
            ID: {cliente.id}
          </Badge>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <h5 className="border-bottom pb-2">Datos Personales</h5>
              <p><strong>Nombre Completo:</strong> {cliente.name?.firstname} {cliente.name?.lastname}</p>
              <p><strong>Email:</strong> {cliente.email}</p>
              <p><strong>Teléfono:</strong> {cliente.phone || 'No disponible'}</p>
            </Col>
            <Col md={6}>
              <h5 className="border-bottom pb-2">Dirección</h5>
              <p><strong>Calle:</strong> {cliente.address?.street || 'N/A'}</p>
              <p><strong>Número:</strong> {cliente.address?.number || 'N/A'}</p>
              <p><strong>Ciudad:</strong> {cliente.address?.city || 'N/A'}</p>
              <p><strong>Código Postal:</strong> {cliente.address?.zipcode || 'N/A'}</p>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h5 className="border-bottom pb-2">Credenciales de Acceso</h5>
              <p><strong>Username:</strong> {cliente.username}</p>
              <p><strong>Password:</strong> {cliente.password}</p>
            </Col>
          </Row>

          <hr className="my-3" />

          {/* Botones de acción */}
          <div className="d-flex gap-3 flex-wrap">
            <Button variant="outline-secondary" onClick={() => navigate('/clientes')}>
              Volver a Clientes
            </Button>

            {esGerencia && (
              <Button
                variant="danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                    Eliminando...
                  </>
                ) : (
                  'Eliminar Cliente de la Base de Datos'
                )}
              </Button>
            )}
          </div>

          {!esGerencia && (
            <Alert variant="info" className="mt-3">
              Estás en modo <strong>Soporte</strong>: solo puedes visualizar los datos.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DetalleCliente;