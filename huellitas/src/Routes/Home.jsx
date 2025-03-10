import ApartadoBusqueda from "../Components/Home/ApartadoBusqueda";
import CategoriasAlojamientos from "../Components/Home/CategoriasAlojamientos";
import RecomendacionesAlojamientos from "../Components/Home/RecomendacionesAlojamientos";
import { useState } from "react";
import "../Styles/App.css";
import "../Styles/Home.scss";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-100">
      <ApartadoBusqueda
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <CategoriasAlojamientos />
      <RecomendacionesAlojamientos searchQuery={searchQuery} />
    </div>
  );
};

export default Home;
