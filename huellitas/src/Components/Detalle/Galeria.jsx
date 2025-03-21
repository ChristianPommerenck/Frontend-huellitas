import { useState } from 'react';
import { Button } from "react-bootstrap";
import Foto from './Foto';
import '../../Styles/Galeria.css';
import GaleriaModal from './GaleriaModal';

function Galeria({ imagenes = [] }) { // Valor por defecto
  const [show, setShow] = useState(false);

  // Verifica si hay imágenes
  if (!Array.isArray(imagenes) || imagenes.length === 0) {
    return <p>No hay imágenes disponibles.</p>;
  }

  return (
    <div className='grid_layout_galeria'>
      {imagenes.slice(0, 5).map((imagen, index) => (
        <Foto
          key={index}
          tipoFoto={index === 0 ? "imagen_principal" : "imagen_secundaria"}
          imagen={imagen} // Pasamos el objeto de imagen completo
          alt={`Imagen ${index + 1}`}
        />
      ))}

      {!show && ( 
        <Button className="boton_vermas_galeria" variant="primary"
          onClick={() => setShow(true)}>Ver más</Button>
      )}
      
      {/* Modal con todas las imágenes */}
      {show && <GaleriaModal show={show} setShow={setShow} fotos={imagenes} dialogClassName="custom-modal" />}
    </div>
  );
}

export default Galeria;



