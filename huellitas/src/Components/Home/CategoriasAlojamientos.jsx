import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CategoriaCard from "./CategoriaCard";
import "../../Styles/Home.scss";

const CategoriasCarousel = () => {
    const [categorias, setCategorias] = useState([]);
    const [alojamientos, setAlojamientos] = useState([]);
    const [categoriasConCantidad, setCategoriasConCantidad] = useState([]); // Nuevo estado
    const sliderRef = useRef(null);
    const [index, setIndex] = useState(0);
    const itemsPerPage = 3;
    const cardWidthWithGap = 200;

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/categorias");
                setCategorias(response.data);
            } catch (error) {
                console.error("Error al cargar las categorías:", error);
            }
        };

        const fetchAlojamientos = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/alojamientos");
                setAlojamientos(response.data);
            } catch (error) {
                console.error("Error al cargar los alojamientos:", error);
            }
        };

        fetchCategorias();
        fetchAlojamientos();
    }, []);

    useEffect(() => {
        if (categorias.length > 0 && alojamientos.length > 0) {
            const nuevasCategorias = categorias.map((categoria) => {
                const cantidad = alojamientos.filter(
                    (alojamiento) => alojamiento.categoria && alojamiento.categoria.id === categoria.id
                ).length;
                return { ...categoria, alojamientosCount: cantidad };
            });
            setCategoriasConCantidad(nuevasCategorias); // Actualiza el nuevo estado
        }
    }, [categorias, alojamientos]); // Dependencias: categorias y alojamientos

    const nextSlide = () => {
        if (index < categoriasConCantidad.length - itemsPerPage) {
            setIndex(index + 1);
        }
    };

    const prevSlide = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const translateValue = index * (cardWidthWithGap * itemsPerPage);

    return (
        <section className="main__categorias">
            <h2>Categorías de Alojamientos</h2>
            <div className="carousel-container">
                <button className="prev-btn" onClick={prevSlide} disabled={index === 0}>‹</button>
                
                <div className="carousel-slider" ref={sliderRef}>
                    <div
                        className="carousel-track"
                        style={{ transform: `translateX(-${translateValue}px)` }}
                    >
                        {categoriasConCantidad.map((categoria) => (
                            <CategoriaCard
                                key={categoria.id}
                                nombre={categoria.nombre}
                                imagen={categoria.imagenUrl || "/imagenes/default.jpg"}
                                alt={`Imagen de ${categoria.nombre}`}
                                cantidad={categoria.alojamientosCount}
                            />
                        ))}
                    </div>
                </div>

                <button className="next-btn" onClick={nextSlide} disabled={index >= categoriasConCantidad.length - itemsPerPage}>›</button>
            </div>
        </section>
    );
};

export default CategoriasCarousel;