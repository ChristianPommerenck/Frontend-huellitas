import React from 'react';
import { useState } from "react";

const Foto = ({ imagen, tipoFoto, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(imagen); // Verifica si la URL es correcta

  return (
    <div className={tipoFoto}>
      {!isLoaded && <p>Cargando imagen...</p>}
      <img
        className="foto"
        src={imagen}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        style={{ display: isLoaded ? "block" : "none" }}
      />
    </div>
  );
};


export default Foto;