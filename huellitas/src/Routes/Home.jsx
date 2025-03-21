/*
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
*/
import { useState, useEffect } from "react";
import ApartadoBusqueda from "../Components/Home/ApartadoBusqueda";
import CategoriasAlojamientos from "../Components/Home/CategoriasAlojamientos";
import RecomendacionesAlojamientos from "../Components/Home/RecomendacionesAlojamientos";
import "../Styles/App.css";
import "../Styles/Home.scss";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [suggestions, setSuggestions] = useState([]);
  const [alojamientos, setAlojamientos] = useState([]); // 🔹 Agregar estado para alojamientos

  useEffect(() => {
    const fetchAlojamientos = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_BACKEND_URL + "/alojamientos"
        );
        const data = await response.json();
        setAlojamientos(data); // 🔹 Guardar alojamientos en el estado
      } catch (error) {
        console.error("Error fetching alojamientos:", error);
      }
    };

    fetchAlojamientos();
  }, []);

  return (
    <div className="w-100">
      <ApartadoBusqueda
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        alojamientos={alojamientos} // 🔹 Pasar alojamientos si es requerido
      />
      <CategoriasAlojamientos />
      <RecomendacionesAlojamientos
        searchQuery={searchQuery}
        setSuggestions={setSuggestions}
        alojamientos={alojamientos} // 🔹 Pasar alojamientos si es requerido
      />
    </div>
  );
};

export default Home;
