import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../Styles/ApartadoBusqueda.css";
import { FaPaw } from "react-icons/fa";

const ApartadoBusqueda = ({ searchQuery, setSearchQuery, alojamientos = [] }) => {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [sugerencias, setSugerencias] = useState([]);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const nuevasSugerencias = Array.isArray(alojamientos)
        ? alojamientos.filter((alojamiento) =>
            alojamiento.nombre && searchQuery &&
            alojamiento.nombre.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];
      setSugerencias(nuevasSugerencias);
      setMostrarSugerencias(nuevasSugerencias.length > 0);
    } else {
      setSugerencias([]);
      setMostrarSugerencias(false);
    }
  }, [searchQuery, alojamientos]);

  return (
    <div className="busqueda-container">
      <div className="busqueda-input-container">
        <FaPaw className="busqueda-icono" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder=" Buscar alojamiento..."
          className="busqueda-input"
          onFocus={() => setMostrarSugerencias(true)}
          onBlur={() => setTimeout(() => setMostrarSugerencias(false), 200)}
        />
        {mostrarSugerencias && (
          <ul className="busqueda-sugerencias">
            {sugerencias.map((sugerencia, index) => (
              <li key={index} onClick={() => setSearchQuery(sugerencia.nombre)}>
                <span className="busqueda-sugerencia-item">
                  <FaPaw className="sugerencia-icono" />
                  <strong>{sugerencia.nombre}</strong>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="busqueda-fechas">
        <DatePicker
          selected={fechaInicio}
          onChange={(date) => setFechaInicio(date)}
          selectsStart
          startDate={fechaInicio}
          endDate={fechaFin}
          placeholderText="  Fecha de inicio"
          className="busqueda-input"
          dateFormat="MM/dd/yyyy"
          portalId="root-portal"
        />
        <DatePicker
          selected={fechaFin}
          onChange={(date) => setFechaFin(date)}
          selectsEnd
          startDate={fechaInicio}
          endDate={fechaFin}
          minDate={fechaInicio}
          placeholderText="  Fecha de fin"
          className="busqueda-input"
          dateFormat="MM/dd/yyyy"
          portalId="root-portal"
        />
      </div>

      <button className="busqueda-boton">Busqueda</button>
    </div>
  );
};

ApartadoBusqueda.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  alojamientos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ApartadoBusqueda;