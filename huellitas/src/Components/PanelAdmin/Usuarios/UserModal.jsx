import React, { useState, useEffect} from "react";
import Swal from "sweetalert2";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/usuarios";

const UserModal = ({
    modalAbierto,
    toggleModal,
    nombre,
    setNombre,
    apellido,
    setApellido,
    email,
    setEmail,
    rol,
    setRol,
    usuarioEditando,
    setUsuarios,
    cargarUsuarios,
    limpiarFormulario
}) => {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    useEffect(() => {
        console.log("🔍 Rol actual en el modal:", rol);
    }, [rol]);

    const guardarUsuario = async () => {
        const nombreTrim = nombre.trim();
        const apellidoTrim = apellido.trim();
        const emailTrim = email.trim();
        const rolTrim = rol.trim();
        console.log(nombreTrim, apellidoTrim, emailTrim, rolTrim);

        if (!nombreTrim || !apellidoTrim || !emailTrim || !rolTrim) {
            Swal.fire("Error", "Por favor, completa todos los campos.", "error");
            return;
        }

        if (!isValidEmail(emailTrim)) {
            Swal.fire("Error", "Por favor, introduce un email válido.", "error");
            return;
        }

        if (!usuarioEditando && (!password || password.length < 6)) {
            Swal.fire("Error", "La contraseña es obligatoria y debe tener al menos 6 caracteres.", "error");
            return;
        }

        setLoading(true);
    try {
        let usuarioData = {
            nombre: nombreTrim,
            apellido: apellidoTrim,
            email: emailTrim,
            rol: rolTrim,
            contrasena: password
        };

        if (usuarioEditando) {
            await axios.put(`${API_URL}/${usuarioEditando}`, usuarioData, {
                headers: { "Content-Type": "application/json" }
            });
            Swal.fire("Usuario Actualizado", "El usuario ha sido actualizado correctamente.", "success");
        } else {
            await axios.post(API_URL, usuarioData, {
                headers: { "Content-Type": "application/json" }
            });
            Swal.fire("Usuario Agregado", "El usuario ha sido agregado correctamente.", "success");
        }

        cargarUsuarios();
        limpiarFormulario();
        setPassword("");
        toggleModal();
    } catch (error) {
        console.error("❌ Error al guardar el usuario:", error);
        Swal.fire("Error", `No se pudo guardar el usuario: ${error.response?.data?.message || error.message}`, "error");
    } finally {
        setLoading(false);
    }
    };

    if (!modalAbierto) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={toggleModal}>
                    &times;
                </span>
                <h3>{usuarioEditando ? "Editar Usuario" : "Agregar Usuario"}</h3>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <select value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value="USER">Usuario</option>
                    <option value="ADMIN">Administrador</option>
                </select>
                {!usuarioEditando && (
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                )}
                {loading ? (
                    <h3>Cargando...</h3>
                ) : (
                    <button className="btn-agregar" onClick={guardarUsuario}>
                        Guardar Usuario
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserModal;
