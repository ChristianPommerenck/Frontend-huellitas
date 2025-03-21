import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import UserTable from "./UserTable";
import UserModal from "./UserModal";
import TopBar from "./TopBar";
import "../../../Styles/Administracion.css";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/usuarios";

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [modalUsuarioAbierto, setModalUsuarioAbierto] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [apellidoUsuario, setApellidoUsuario] = useState("");
    const [contrasenaUsuario, setContrasenaUsuario] = useState("");
    const [emailUsuario, setEmailUsuario] = useState("");
    const [rolUsuario, setRolUsuario] = useState("USER");

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const response = await axios.get(API_URL);
            setUsuarios(response.data);
        } catch (error) {
            console.error("Error al cargar los usuarios:", error);
            Swal.fire("Error", "No se pudieron cargar los usuarios.", "error");
        }
    };

    const toggleModalUsuario = () => {
        if (modalUsuarioAbierto) {
            limpiarFormulario();
        }
        setModalUsuarioAbierto(!modalUsuarioAbierto);
    };

    const limpiarFormulario = () => {
        setNombreUsuario("");
        setApellidoUsuario("");
        setEmailUsuario("");
        setRolUsuario("USER");
        setContrasenaUsuario("");
        setUsuarioEditando(null);
    };

    return (
        <div className="main-content">
            <TopBar toggleModal={toggleModalUsuario} />
            <UserTable
                usuarios={usuarios}
                handleEdit={(usuario) => {
                    setNombreUsuario(usuario.nombre);
                    setApellidoUsuario(usuario.apellido);
                    setEmailUsuario(usuario.email);
                    setRolUsuario(usuario.rol || "USER");
                    setUsuarioEditando(usuario.id);
                    setModalUsuarioAbierto(true);
                }}
                handleDelete={async (id) => {
                    const result = await Swal.fire({
                        title: "¿Estás seguro?",
                        text: "No podrás revertir esto.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Sí, eliminar",
                        cancelButtonText: "Cancelar",
                    });

                    if (result.isConfirmed) {
                        try {
                            await axios.delete(`${API_URL}/${id}`);
                            Swal.fire("Eliminado", "El usuario ha sido eliminado correctamente.", "success");
                            cargarUsuarios();
                        } catch (error) {
                            console.error("Error al eliminar el usuario:", error);
                            Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
                        }
                    }
                }}
            />
            <UserModal
                modalAbierto={modalUsuarioAbierto}
                toggleModal={toggleModalUsuario}
                nombre={nombreUsuario}
                setNombre={setNombreUsuario}
                apellido={apellidoUsuario}
                setApellido={setApellidoUsuario}
                email={emailUsuario}
                setEmail={setEmailUsuario}
                rol={rolUsuario}
                setRol={setRolUsuario}
                usuarioEditando={usuarioEditando}
                setUsuarios={setUsuarios}
                cargarUsuarios={cargarUsuarios}
                limpiarFormulario={limpiarFormulario}
            />
        </div>
    );
};

export default Usuarios;