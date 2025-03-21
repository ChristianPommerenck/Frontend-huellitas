import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../Styles/Detalle.scss";

const ReservaCalendario = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [fechasOcupadas, setFechasOcupadas] = useState([]);
  const [mensajeError, setMensajeError] = useState("");

  // Cargar las fechas ocupadas desde la API
  useEffect(() => {
    fetch("http://localhost:5179/api/fechas-ocupadas")
      .then((res) => res.json())
      .then((data) => setFechasOcupadas(data))
      .catch((error) => console.error("Error al cargar fechas ocupadas:", error));
  }, []);

  // Función para resaltar los días en el calendario
  const marcarFechas = ({ date, view }) => {
    if (view === "month") {
      const fechaStr = date.toISOString().split("T")[0];
      if (fechasOcupadas.includes(fechaStr)) {
        return "fecha-ocupada"; // Rojo
      }
      return "fecha-disponible"; // Verde
    }
  };

  // Función para reservar
  const realizarReserva = async () => {
    if (!fechaSeleccionada) return;
    const fechaFormateada = fechaSeleccionada.toISOString().split("T")[0];

    try {
      const respuesta = await fetch("http://localhost:5179/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fecha: fechaFormateada }),
      });

      if (!respuesta.ok) {
        throw new Error("Error en la reserva");
      }

      alert(`Reserva confirmada para: ${fechaFormateada}`);
    } catch (error) {
      console.error("Error en la reserva:", error);
      setMensajeError("Hubo un problema al realizar la reserva. Intenta de nuevo.");
    }
  };

  return (
    <div className="contenedor-calendario">
      <h2>Selecciona una fecha para reservar</h2>
      <Calendar
        onChange={setFechaSeleccionada}
        value={fechaSeleccionada}
        tileClassName={marcarFechas}
      />
      {mensajeError && <p className="error">{mensajeError}</p>}
      <div className="botones">
        <button onClick={realizarReserva} disabled={!fechaSeleccionada}>
          Confirmar reserva
        </button>
        <button onClick={() => setFechaSeleccionada(null)}>Cancelar</button>
      </div>
    </div>
  );
};

export default ReservaCalendario;
