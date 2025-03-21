import React from 'react';
import { useState } from "react";

const Foto = ({ imagen, tipoFoto, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    console.error("Error cargando la imagen");
    setIsLoaded(false); // Marca que no se ha cargado correctamente
  };

  console.log(imagen); // Verifica si la URL es correcta

  return (
    <div className={tipoFoto}>
      {!isLoaded && <p>Cargando imagen...</p>}
      <img
        className="foto"
        src={imagen}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={handleError} // Maneja el error si no se puede cargar la imagen
        style={{ display: isLoaded ? "block" : "none" }}
      />
    </div>
  );
};


export default Foto;