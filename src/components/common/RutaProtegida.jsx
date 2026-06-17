import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const RutaProtegida = ({ children }) => {

    const { admin } = useContext(AdminContext);

    if (!admin) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default RutaProtegida;