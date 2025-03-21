import React, { useState, useEffect } from "react";
import Sidebar from "../Components/PanelAdmin/SideBar";
import "../Styles/Administracion.css";
import Alojamientos from "../Components/PanelAdmin/Alojamientos/SectionAlojamientos";
import Usuarios from "../Components/PanelAdmin/Usuarios/UserSection";
import Categorias from "../Components/PanelAdmin/Categorias/CategoriaSection";
import { useAuth } from "../Context/Auth.Context";
import { useNavigate } from "react-router-dom";

const PanelAdmin = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [seccion, setSeccion] = useState("alojamientos");
    const { state } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!state.isAuthenticated || state.user?.rol !== "ADMIN") {
            navigate("/login");
        }
    }, [state, navigate]);

    const handleSectionChange = (seccion) => {
        setSeccion(seccion);
    };

    const renderSeccion = () => {
        switch (seccion) {
            case "alojamientos":
                return <Alojamientos />;
            case "usuarios":
                return <Usuarios />;
            case "categorias":
                return <Categorias />;
            default:
                return <Alojamientos />;
        }
    };

    if (isMobile) {
        return <div className="mobile-warning">El panel de administración no está disponible en dispositivos móviles.</div>;
    }

    return (
        <div className="admin-container">
            <Sidebar onSectionChange={handleSectionChange} />
            <div className="main-content">
                {renderSeccion()}
            </div>
        </div>
    );
};

export default PanelAdmin;