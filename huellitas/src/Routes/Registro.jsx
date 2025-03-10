import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Registro.scss";

const API_URL = "https://insightful-patience-production.up.railway.app/api/auth/registro"; // Asegúrate de que esta URL es correcta

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
  });

  const [errors, setErrors] = useState({});
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const navigate = useNavigate();
  const [errorMensaje, setErrorMensaje] = useState("");

  const validate = () => {
    let newErrors = {};
    if (!formData.nombre) newErrors.nombre = "El nombre es requerido";
    if (!formData.apellido) newErrors.apellido = "El apellido es requerido";
    if (!formData.email) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }
    if (!formData.contrasena || formData.contrasena.length < 6) {
      newErrors.contrasena = "La contraseña debe tener al menos 6 caracteres";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMensaje("");
    if (validate()) {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 409) { // Email ya registrado
                    setErrorMensaje(errorData.message || "El email ya está registrado.");
                } else {
                    setErrorMensaje("Hubo un error en el registro: " + (errorData.message || "Intenta nuevamente."));
                }
                return;
            }

            const data = await response.json();
            console.log("Registro exitoso:", data);
            setRegistroExitoso(true);
            setTimeout(() => {
                setRegistroExitoso(false);
                navigate("/login");
            }, 2000);
        } catch (error) {
            console.error("Error en el registro:", error);
            setErrorMensaje("Hubo un error al registrar el usuario. Intenta nuevamente.");
        }
    }
};

  return (
    <div className="registro-container">
      <div className="registro-card">
        <h2 className="registro-title">Registro</h2>

        {/* Mensaje de error general */}
        {errorMensaje && <p className="error-text">{errorMensaje}</p>}

        <form onSubmit={handleSubmit} className="registro-form">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errors.nombre ? "input-error" : "input"}
          />
          {errors.nombre && <p className="error-text">{errors.nombre}</p>}

          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            className={errors.apellido ? "input-error" : "input"}
          />
          {errors.apellido && <p className="error-text">{errors.apellido}</p>}

          <input
            type="email"
            name="email"
            placeholder="Ingresa tu Correo"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : "input"}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <input
            type="password"
            name="contrasena"
            placeholder="Contraseña"
            value={formData.contrasena}
            onChange={handleChange}
            className={errors.contrasena ? "input-error" : "input"}
          />
          {errors.contrasena && <p className="error-text">{errors.contrasena}</p>}

          <button type="submit" className="registro-button">Registrarse</button>

          {registroExitoso && (
            <div class="alert alert-success" role="alert">
            ✅ Registro exitoso. Redirigiendo... </div> 
          )}
        </form>
      </div>
    </div>
  );
}

