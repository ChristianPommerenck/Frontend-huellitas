import { useState, useEffect } from "react";
import Card from "../Home/CardRecomendaciones";

const RecomendacionesAlojamientos = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [alojamientos, setAlojamientos] = useState([]);
  const cardsPerPage = 10;
  const totalCards = 19;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const [filteredAlojamientos, setFilteredAlojamientos] = useState([]);

  useEffect(() => {
    const fetchAlojamientos = async () => {
      const response = await fetch("https://insightful-patience-production.up.railway.app/alojamientos"); 
      const data = await response.json();

      const shuffledAlojamientos = data
        .map((a) => a)
        .sort(() => Math.random() - 0.5);

      setAlojamientos(shuffledAlojamientos);
    };
    fetchAlojamientos();
  }, []);

  useEffect(() => {
    if (props.searchQuery && props.searchQuery.length) {
      const filtered = alojamientos.filter((alojamiento) =>
        alojamiento.nombre
          .toLowerCase()
          .includes(props.searchQuery.toLowerCase())
      );
      setFilteredAlojamientos(filtered);
    } else {
      setFilteredAlojamientos(alojamientos);
    }
  }, [props.searchQuery, alojamientos]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderCards = () => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return alojamientos.slice(startIndex, endIndex).map((alojamiento) => (
      <Card
        key={alojamiento.id}
        id={alojamiento.id}
        title={alojamiento.nombre}
        description={alojamiento.descripcion}
        price={alojamiento.precio}
        imagenes={alojamiento.imagenes} 
      />
    ));
  };

  return (
    <main className="main__recomendaciones">
      <section className="main__recomendaciones__grid">
        {filteredAlojamientos.length ? (
          renderCards()
        ) : (
          <p>No se han encontrado resultados</p>
        )}
      </section>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </main>
  );
};

export default RecomendacionesAlojamientos;
