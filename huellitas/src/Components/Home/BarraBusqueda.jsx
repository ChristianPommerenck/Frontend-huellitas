import { useState } from "react";

const BarraBusqueda = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.setSearchQuery(searchInput);
  };

  return (
    <form className="main__buscar__fields" onSubmit={handleSubmit}>
      <input
        className="main__buscar__fields__texto"
        type="text"
        name="buscar"
        id="buscar"
        value={searchInput}
        placeholder="Buscar..."
        onInput={(e) => {
          e.preventDefault();
          setSearchInput(e.target.value);
        }}
      />
      <input
        className="main__buscar__fields__fecha form-control-sm "
        type="date"
        name="fecha-buscar"
        id="fecha-buscar"
      />
      <button
        className="main__buscar__fields__submit"
        type="submit"
        onClick={handleSubmit}
      >
        Buscar
      </button>
    </form>
  );
};

export default BarraBusqueda;
