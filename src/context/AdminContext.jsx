import { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

    const [admin, setAdmin] = useState(() => {
        const adminGuardado = localStorage.getItem("admin");
        return adminGuardado ? JSON.parse(adminGuardado) : null;
    });

    useEffect(() => {
        if (admin) {
            localStorage.setItem("admin", JSON.stringify(admin));
        } else {
            localStorage.removeItem("admin");
        }
    }, [admin]);

    const login = (datosAdmin) => {
        setAdmin(datosAdmin);
    };

    const logout = () => {
        setAdmin(null);
    };

    return (
        <AdminContext.Provider value={{ admin, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};