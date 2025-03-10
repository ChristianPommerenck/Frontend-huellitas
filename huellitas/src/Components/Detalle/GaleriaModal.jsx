import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Foto from "./Foto";

function GaleriaModal({ show, alt, setShow, foto = [] }) {
  if (!show) return null;

  return (
    <div className="modal_galeria_ver_más">
      <div className="contenido_galeria_ver_más">
        <div className="header_galeria_ver_más">
          <button
            type="button"
            className="boton_cerrar_galeria_modal btn-close"
            aria-label="Close"
            onClick={() => setShow(false)} 
          ></button>
          <h4>Galería</h4>
        </div>

        <div className="grid_layout_modal">
          {foto.map((foto, index) => (
            <Foto key={index} imagen={foto.urlImagen} tipoFoto="imagen_modal" alt={alt}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GaleriaModal;
