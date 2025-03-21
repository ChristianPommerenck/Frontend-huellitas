import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import axios from "axios";
import { useAuth } from "../Context/Auth.Context";
import { setToken, setUser, setRol } from "../Reducers/authReducer"



const API_URL = import.meta.env.VITE_BACKEND_URL  + "/api/auth/login";
const ROL_URL = import.meta.env.VITE_BACKEND_URL + "/usuarios/rol";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { dispatch } = useAuth();
    const [inicioExitoso, setInicioExitoso] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, contrasena: password }),
            });

            if (!response.ok) {
                throw new Error("Correo o contraseña incorrectos.");
            }

            const data = await response.json();
            console.log("Datos del backend:", data);

            if (data.jwt && data.usuario) {
                const { id, nombre, apellido, email } = data.usuario;
                const user = { id, nombre, apellido, email };
                dispatch(setToken(data.jwt));
                dispatch(setUser(user));
                if (rememberMe) {
                    localStorage.setItem("token", data.jwt);
                    localStorage.setItem("user", JSON.stringify(user));
                } else {
                    sessionStorage.setItem("token", data.jwt);
                    localStorage.setItem("user", JSON.stringify(user));
                }
                setInicioExitoso(true);
                console.log("Inicio de sesión exitoso:", user);
                window.dispatchEvent(new Event("storage"));
                             
                axios.get(`${ROL_URL}/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${data.jwt}`,
                    },
                })
                    .then((rolResponse) => {
                        const rol = rolResponse.data;
                        dispatch(setRol(rol));
                        localStorage.setItem("rol", rol);
                        if (rol === "ADMIN") {
                            navigate("/administracion");
                        } else {
                            navigate("/");
                        }
                    })
                    .catch((rolError) => {
                        console.error("Error al obtener el rol:", rolError);
                        navigate("/");
                    });
            } else {
                throw new Error("Respuesta del servidor inválida.");
            }
        } catch (err) {
            console.error("Error en la autenticación:", err);
            setError("Correo o contraseña incorrectos. Verifica tus datos.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Iniciar Sesión</h2>

                {error && (
                    <div className="error-message">
                        <span>⚠️ {error}</span>
                        <br />
                        <Link to="/Registro" className="register-link">Regístrate aquí</Link>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Ingresa tu correo"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contrasena">Contraseña</label>
                        <input
                            type="password"
                            id="contrasena"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>
                    <div className="remember-me">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label htmlFor="rememberMe">Recordarme</label>
                    </div>
                    <button type="submit" className="login-button">Iniciar Sesión</button>
                    {inicioExitoso && (<div className="alert alert-success" role="alert">
                         ✅ Inicio de sesíon exitoso. Redirigiendo...
                    </div>)} 
                </form>

                <div className="extra-links">
                    <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;