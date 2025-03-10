import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const CardRecomendaciones = ({ id, title, description, imagenes , price}) => {
  return (
    <div className="card__recomendaciones" >
      <Link to={"/alojamiento/" + id}>
      {imagenes ? (
        <img loading="lazy" 
        src={imagenes.length > 0 ? imagenes[0].urlImagen : "/ruta/imagen-por-defecto.jpg"} 
        alt="Comfort perruno" 
        className="card__image" />
   
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
      </Link>
    </div>
  );
};

CardRecomendaciones.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.array,
};

export default CardRecomendaciones;
