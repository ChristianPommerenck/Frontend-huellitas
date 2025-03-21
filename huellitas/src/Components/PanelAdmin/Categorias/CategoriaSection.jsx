import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import CategoriaTable from "./CategoriaTable";
import TopBar from "./TopBar";
import "../../../Styles/Administracion.css";
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

const preset_name = "huellitas";
const cloud_name = "dr8ya7bax";

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [loading, setLoading] = useState(false); // ✅ Para mostrar si la imagen está subiendo

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = () => {
        api.get("/categorias")
            .then((response) => setCategorias(response.data))
            .catch((error) => console.error("Error al cargar las categorías:", error));
    };

    // ✅ Función de subida de imágenes usando la lógica de "Alojamientos"
    const uploadImage = async (file) => {
        setLoading(true); // ✅ Activa el estado de carga

        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", preset_name);

            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: "POST",
                body: data,
            });

            const result = await response.json();
            setLoading(false); // ✅ Desactiva la carga

            return result.secure_url || null; // ✅ Devuelve la URL o null si falló
        } catch (error) {
            setLoading(false);
            console.error("Error al subir la imagen:", error);
            return null;
        }
    };

    const agregarCategoria = () => {
        let imagenUrl = ""; // ✅ Estado para la URL de la imagen

        Swal.fire({
            title: "Agregar Categoría",
            html: `
                <input id="swal-nombre" class="swal2-input" placeholder="Nombre">
                <input id="swal-descripcion" class="swal2-input" placeholder="Descripción">
                <input type="file" id="swal-icono" class="swal2-file">
                <div id="swal-loading" style="display: none;">Subiendo imagen...</div>
            `,
            showCancelButton: true,
            confirmButtonText: "Guardar",
            preConfirm: async () => {
                const nombre = document.getElementById("swal-nombre").value;
                const descripcion = document.getElementById("swal-descripcion").value;
                const file = document.getElementById("swal-icono").files[0];

                if (!nombre || !descripcion || !file) {
                    Swal.showValidationMessage("Todos los campos son obligatorios");
                    return false;
                }

                document.getElementById("swal-loading").style.display = "block"; // ✅ Muestra el mensaje de carga

                imagenUrl = await uploadImage(file); // ✅ Sube la imagen a Cloudinary
                if (!imagenUrl) {
                    Swal.showValidationMessage("Error al subir la imagen");
                    return false;
                }

                return { nombre, descripcion, imagenUrl };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                api.post("/categorias", result.value)
                    .then(() => {
                        cargarCategorias();
                        Swal.fire("Éxito", "Categoría agregada correctamente", "success");
                    })
                    .catch(() => Swal.fire("Error", "No se pudo agregar la categoría", "error"));
            }
        });
    };

    const editarCategoria = (categoria) => {
        let imagenUrl = categoria.imagenUrl; // ✅ Se mantiene la imagen actual si no se cambia

        Swal.fire({
            title: "Editar Categoría",
            html: `
                <input id="swal-nombre" class="swal2-input" value="${categoria.nombre}" placeholder="Nombre">
                <input id="swal-descripcion" class="swal2-input" value="${categoria.descripcion}" placeholder="Descripción">
                <input type="file" id="swal-icono" class="swal2-file">
                <div id="swal-loading" style="display: none;">Subiendo imagen...</div>
            `,
            showCancelButton: true,
            confirmButtonText: "Actualizar",
            preConfirm: async () => {
                const nombre = document.getElementById("swal-nombre").value;
                const descripcion = document.getElementById("swal-descripcion").value;
                const file = document.getElementById("swal-icono").files[0];

                if (!nombre || !descripcion) {
                    Swal.showValidationMessage("Todos los campos son obligatorios");
                    return false;
                }

                if (file) {
                    document.getElementById("swal-loading").style.display = "block"; // ✅ Muestra el mensaje de carga
                    const uploadedUrl = await uploadImage(file);
                    if (!uploadedUrl) {
                        Swal.showValidationMessage("Error al subir la imagen");
                        return false;
                    }
                    imagenUrl = uploadedUrl;
                }

                return { id: categoria.id, nombre, descripcion, imagenUrl };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                api.put(`/categorias/${categoria.id}`, result.value)
                    .then(() => {
                        cargarCategorias();
                        Swal.fire("Éxito", "Categoría actualizada correctamente", "success");
                    })
                    .catch(() => Swal.fire("Error", "No se pudo actualizar la categoría", "error"));
            }
        });
    };

    const eliminarCategoria = (id) => {
        Swal.fire({
            title: "¿Eliminar esta categoría?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/categorias/${id}`)
                    .then(() => {
                        cargarCategorias();
                        Swal.fire("Eliminado", "Categoría eliminada correctamente", "success");
                    })
                    .catch(() => Swal.fire("Error", "No se pudo eliminar la categoría", "error"));
            }
        });
    };

    return (
        <div className="main-content">
            <TopBar busqueda={busqueda} setBusqueda={setBusqueda} toggleModal={agregarCategoria} />
            {loading && <p>Cargando imagen...</p>} {/* ✅ Muestra mensaje si está cargando */}
            <CategoriaTable 
                categorias={categorias} 
                handleEditCategory={editarCategoria} 
                handleDeleteCategory={eliminarCategoria} 
            />
        </div>
    );
};

export default Categorias;
