import React, { useState, useEffect } from "react";
import Calendario from "./Calendario";
import "../../Styles/Detalle/Reserva.css"

function Reserva() {
  const [today, setToday] = useState("");

  useEffect(() => {
    const date = new Date();
    setToday(`${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`);
  }, []);

  return (
    <div>
      <p className="d-inline-flex gap-1">
        <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
          Ver disponibilidad
        </a>
      </p>
      <div className="collapse" id="collapseExample">
        <div className="disponibilidad">
          <Calendario mensaje="Elige fecha de ingreso"/>
          <Calendario mensaje="Elige fecha de salida"/>
          <div class="alert alert-danger" role="alert">
            Debes iniciar sesion para poder realizar la reserva. 
          </div>
          <button>Añadir mascota</button>
            <form>
              <input type="text"  placeholder="Nombre de tu mascota" />
           </form>
        </div>

      </div>
    </div>
  );
}

export default Reserva;
