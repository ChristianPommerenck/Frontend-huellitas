
import "../Styles/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "/media/svg/logo-svg.svg";

const Header = () => {
  

 
    console.log("Header renderizado");
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedRol = localStorage.getItem("rol");
  
      if (!storedUser || !storedRol) {
        setUser(null);
        return;
      }
  
      const userData = JSON.parse(storedUser);
      const response = await fetch(`https://insightful-patience-production.up.railway.app/usuarios/${userData.id}`);
      
      if (!response.ok) throw new Error("Error al obtener usuario");
  
      const data = await response.json();
      setUser({ ...data, rol: storedRol });
    } catch (error) {
      console.error("Error obteniendo usuario:", error);
      setUser(null);
    }
  };
  

  useEffect(() => {
    fetchUser();
  }, [localStorage.getItem("user")]); // Se ejecuta cada vez que cambia el usuario en localStorage
  

  useEffect(() => {
    console.log("Usuario cargado:", user);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("rol");
    window.dispatchEvent(new Event("storage"));
    setUser(null);
    navigate("/");
  };
  

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <Link className="brand-link" to="/">
            <img src={logo} alt="Huellitas Logo" className="logo-img" />
            <span className="nav-text">Un hogar para tu mascota</span>
          </Link>
        </div>

        {/* Botón del menú responsive */}
        <button className="menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </button>

        {/* Contenedor de enlaces y usuario */}
        <div className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
          {user ? (
            <div className="user-info">
              <div className="avatar" onClick={() => setMenuOpen(!menuOpen)}>
                {user.nombre ? user.nombre.charAt(0).toUpperCase() : ""}
                {user.apellido ? user.apellido.charAt(0).toUpperCase() : ""}
              </div>
              {menuOpen && (
                <div className="user-menu">
                  <p>{user.nombre} {user.apellido}</p>
                  <p>{user.email}</p>
                  <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
              )}
            </div>
          ):(
            <div className="auth-buttons">
              <button
                className="crear-cuenta-button"
                onClick={() => navigate("/registro")}
              >
                Crear Cuenta
              </button>
              <Link to="/login" className="btn">Iniciar Sesión</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;