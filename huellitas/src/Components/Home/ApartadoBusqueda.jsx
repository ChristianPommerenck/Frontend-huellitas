import BarraBusqueda from "./BarraBusqueda";

const ApartadoBusqueda = (props) => {
  return (
    <section className="main__buscar w-100">
      <p>Encuentra un alojamiento para tu pequeño</p>
      <BarraBusqueda
        searchQuery={props.searchQuery}
        setSearchQuery={props.setSearchQuery}
      />
    </section>
  );
};

export default ApartadoBusqueda;
