const CategoriaCard = ({ nombre, imagen, alt, cantidad }) => {
  return (
      <div className="card__container">
      <div className="categorias__card">
          <img loading="lazy" src={imagen} alt={alt} />
      </div>
      <div className="categorias__card__info">
        <p>{nombre}</p>
        <span className="cantidad">({cantidad})</span>
      </div>
      </div>
  );
};

export default CategoriaCard;
