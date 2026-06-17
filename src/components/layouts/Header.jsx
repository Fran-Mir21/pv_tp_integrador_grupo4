import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const { admin, logout } = useContext(AdminContext);

    const navigate = useNavigate();

    const cerrarSesion = () => {
        logout();
        navigate("/login");
    };

    return (
        <header>

            <h1>Panel de Clientes</h1>

            {
                admin && (
                    <>
                        <p>Administrador: {admin.nombre}</p>

                        <p>Sector: {admin.sector}</p>

                        <button onClick={cerrarSesion}>
                            Cerrar sesión
                        </button>
                    </>
                )
            }

        </header>
    );
};

export default Header;