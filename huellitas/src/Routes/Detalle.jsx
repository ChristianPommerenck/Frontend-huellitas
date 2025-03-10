import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../Styles/Detalle.scss";
import Galeria from "../Components/Detalle/Galeria";

const Detalle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [alojamiento, setAlojamiento] = useState(null);  

  const url = `https://insightful-patience-production.up.railway.app/alojamientos/${id}`;

  useEffect(() => {
    if (!location.state) {
      axios.get(url)
        .then(response => {
          setAlojamiento(response.data);  
        })
        .catch(error => console.error("Error cargando los detalles:", error));
    } else {
      setAlojamiento(location.state);
    }
  }, [id, location.state]);

  const makeReservation = () => {
    alert("¡Reserva solicitada! Nos pondremos en contacto contigo.");
  };

  if (!alojamiento) {
    return <div>Cargando...</div>; 
  }

  return (
    <div>
      <button className="back-button" onClick={() => navigate("/")}>
        ⬅ Volver
      </button>

      <div className="container-detalle">
        <div className="content">
          <div className="service-container">
            <h2 className="hospedaje-premium">{alojamiento.nombre}</h2>
            <Galeria imagenes={alojamiento.imagenes} /> 
            <div className="servicio-detalle">
              <h4>Descripción:</h4>
              <p>{alojamiento.descripcion}</p>
              <p>{alojamiento.precio}</p>
              <div className="servicio-categoria">             
              </div>
            </div>
            <button className="reserve-button" onClick={makeReservation}>
                Reservar ahora
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
