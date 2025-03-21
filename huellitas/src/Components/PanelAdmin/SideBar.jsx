import { FaHome, FaClipboardList, FaCog, FaTags } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

const Sidebar = ({ onSectionChange }) => {
    return (
        <div className="sidebar">
            <h2>Panel de Administración</h2>
            <ul>
                <li onClick={() => onSectionChange("alojamientos")}>
                    <FaHome /> Gestión de Alojamientos
                </li>
                <li onClick={() => onSectionChange("reservas")}>
                    <FaClipboardList /> Gestión de Reservas
                </li>
                <li onClick={() => onSectionChange("usuarios")}>
                    <FaUserGroup /> Gestión de Usuarios
                </li>
                <li onClick={() => onSectionChange("categorias")}>
                <FaTags /> Gestión de Categorías
                </li>
                <li className="config-admin" onClick={() => onSectionChange("configuracion")}>
                    <FaCog /> Configuración del Sitio
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
