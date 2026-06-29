import { Form } from "react-bootstrap";

const Buscador = ({ value, onChange, placeholder = "Buscar...", controlId = "searchInput" }) => {
	return (
		<Form.Group controlId={controlId}>
			<Form.Control type="text" placeholder={placeholder} value={value} onChange={onChange} />
		</Form.Group>
	);
};

export default Buscador;
