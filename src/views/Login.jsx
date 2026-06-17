import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { login } = useContext(AdminContext);
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [sector, setSector] = useState("Soporte");

    const ingresar = (e) => {
        e.preventDefault();

        login({
            nombre,
            sector
        });

        navigate("/clientes");
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={ingresar}>

                <div>
                    <label>Nombre</label>
                    <br />
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Sector</label>
                    <br />
                    <select
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                    >
                        <option>Soporte</option>
                        <option>Gerencia</option>
                    </select>
                </div>

                <br />

                <button type="submit">
                    Ingresar
                </button>

            </form>

        </div>
    );
};

export default Login;