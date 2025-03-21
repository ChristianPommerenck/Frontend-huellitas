import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CardRecomendaciones = ({ id, title, description, imagenes, price, alojamiento }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Navegar a la página de detalles
    navigate(`/alojamiento/${id}`, { state: alojamiento });

    // Forzar una recarga de la página para asegurarse de que el contenido se actualice
    window.location.reload();
  };

  return (
    <div className="card__recomendaciones" onClick={handleCardClick}>
      {imagenes ? (
        <img
          loading="lazy"
          src={imagenes.length > 0 ? imagenes[0].urlImagen : "/ruta/imagen-por-defecto.jpg"}
          alt="Comfort perruno"
          className="card__image"
        />
      ) : (
        <img
          loading="lazy"
          src="/placeholder.jpg"
          alt="Placeholder"
          className="card__image card__image--placeholder"
        />
      )}
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
        <p className="card__price">${price}</p>
      </div>
    </div>
  );
};

CardRecomendaciones.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imagenes: PropTypes.array,
  alojamiento: PropTypes.object,
};

export default CardRecomendaciones;
