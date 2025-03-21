/*
import { useState } from "react";
import RecomendacionesAlojamientos from "./RecomendacionesAlojamientos";
const Buscador = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
  
    console.log(" Sugerencias en Buscador.jsx:", suggestions); 
  
    return (
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar alojamientos..."
          list="suggestions-list"
        />
        

        <ul>
            {suggestions.length > 0 ? (
             suggestions.map((suggestion, index) => (
                <li key={index}>
                 {typeof suggestion === "string" ? suggestion : JSON.stringify(suggestion)}
                </li>
             ))  ) : 
             (
                <li>(Sin sugerencias) </li>
             )}
        </ul>
  
    
        <RecomendacionesAlojamientos searchQuery={searchQuery} setSuggestions={setSuggestions} />
      </div>
    );
  };
  
  export default Buscador;
  */
  import { useState } from 'react';
  import RecomendacionesAlojamientos from './RecomendacionesAlojamientos';
  import '../Styles/Buscador.css';
  
  const Buscador = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);  // Este estado debe pasarse correctamente
  
    const handleSearchQueryChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleSuggestionClick = (suggestion) => {
      setSearchQuery(suggestion);
      setSuggestions([]); // Ocultar sugerencias después de seleccionar una
    };
  
    return (
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Buscar alojamiento..."
          className="search-input"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <RecomendacionesAlojamientos
          searchQuery={searchQuery}
          setSuggestions={setSuggestions}  // 🔹 Aquí nos aseguramos de pasar correctamente la función
        />
      </div>
    );
  };
  
  export default Buscador;
  