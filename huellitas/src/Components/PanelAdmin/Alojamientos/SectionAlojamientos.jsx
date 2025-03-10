import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ServiceTable from "./ServiceTable";
import ServiceModal from "./ServiceModal";
import TopBar from "./TopBar";
import "../../../Styles/Administracion.css";
import axios from "axios";

const api = axios.create({
    baseURL: "https://insightful-patience-production.up.railway.app",
});

const Alojamientos = () => {
    const preset_name = "huellitas";
    const cloud_name = "dr8ya7bax";

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagenes, setImagenes] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [modalAbierto, setModalAbierto] = useState(false);
    const [servicioEditando, setServicioEditando] = useState(null);
    const [loading, setLoading] = useState(false);
    const [categoria, setCategoria] = useState("");
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        api.get("/alojamientos")
            .then((response) => {
                console.log("Datos de la API:", response.data);
                if (Array.isArray(response.data)) {
                    setServicios(response.data);
                } else {
                    console.error("La API no devolvió un array:", response.data);
                    setServicios([]); // Evita errores en el map
                }
            })
            .catch((error) => {
                console.error("Error al cargar los servicios:", error);
            });
    }, []);
    

    useEffect(() => {
        api.get("/categorias")
            .then((response) => {
                setCategorias(response.data);
            })
            .catch((error) => {
                console.error("Error al cargar las categorías:", error);
            });
    }, []);

    const uploadImage = async (e) => {
        const files = e.target.files;
        setLoading(true);

        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", preset_name);

                const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                    method: "POST",
                    body: data,
                });

                const result = await response.json();
                if (result.secure_url) {
                    return result.secure_url;
                }
                return null;
            });

            const results = await Promise.all(uploadPromises);
            const validUrls = results.filter((url) => url !== null);
            setImagenes((prevImagenes) => [...prevImagenes, ...validUrls]);
        } catch (error) {
            console.error("Error uploading images:", error);
            Swal.fire({
                title: "Error",
                text: "Error al subir las imágenes. Inténtalo de nuevo.",
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    };
    
    const toggleModal = () => {
        if (modalAbierto) {
            setNombre("");
            setDescripcion("");
            setPrecio("");
            setImagenes([]);
            setServicioEditando(null);
            setCategoria("");
        }
        setModalAbierto(!modalAbierto);
    };
    
    
      const agregarServicio = () => {
        if (!nombre || !descripcion || !precio || imagenes.length === 0 || !categoria) {
            Swal.fire({
                title: "Error",
                text: "Todos los campos son obligatorios, incluida al menos una imagen y la categoría",
                icon: "error",
                customClass: {
                    confirmButton: "mi-boton-ok",
                },
            });
            return;
        }

        if (isNaN(precio) || precio <= 0) {
            Swal.fire({
                title: "Error",
                text: "El precio debe ser un número válido y mayor que 0.",
                icon: "error",
                customClass: {
                    confirmButton: "mi-boton-ok",
                },
            });
            return;
        }
    
        const categoriaId = categorias.find(cat => cat.nombre === categoria)?.id;
    
        if (!categoriaId) {
            Swal.fire({
                title: "Error",
                text: "Categoría no válida",
                icon: "error",
                customClass: {
                    confirmButton: "mi-boton-ok",
                },
            });
            return;
        }
    
        const nuevoServicio = {
            nombre,
            descripcion,
            precio: parseFloat(precio),
            imagenesUrl: imagenes,
            categoriaId: categoriaId,
        };
    
        if (servicioEditando) {
            api.put(`/alojamientos/${servicioEditando}`, nuevoServicio, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                setServicios(prev => prev.map(servicio => servicio.id === servicioEditando ? response.data : servicio));
                Swal.fire({
                    title: "Éxito",
                    text: "Servicio editado correctamente",
                    icon: "success",
                });
            })
            .catch(error => {
                console.error("Error al editar el servicio:", error);
                Swal.fire({
                    title: "Error",
                    text: error.response?.data?.message || "Ocurrió un error al editar el servicio.",
                    icon: "error",
                });
            });

        } else {
            api.post("/alojamientos", nuevoServicio)
                .then(response => {
                    setServicios(prev => [...prev, response.data]);
                    Swal.fire({
                        title: "Éxito",
                        text: "Servicio agregado correctamente",
                        icon: "success",
                        customClass: {
                            confirmButton: "mi-boton-ok",
                        },
                    });
                })
                .catch(error => {
                    console.error("Error al agregar el servicio:", error);
                    Swal.fire({
                        title: "Error",
                        text: "Ocurrió un error al agregar el servicio. Inténtalo nuevamente.",
                        icon: "error",
                        customClass: {
                            confirmButton: "mi-boton-ok",
                        }
                    });
                });
        }
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setImagenes([]);
        setServicioEditando(null);
        setCategoria("");
        setModalAbierto(false);
    };
    
      const handleDelete = (id) => {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "No podrás revertir esta acción!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
          customClass: {
            popup: 'mi-popup',
            title: 'mi-titulo',
            content: 'mi-contenido',
            confirmButton: 'mi-boton-confirmar',
            cancelButton: 'mi-boton-cancelar'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            api.delete(`/alojamientos/${id}`)
              .then(() => {
                setServicios(prev => prev.filter(servicio => servicio.id !== id));
                Swal.fire({
                  title: "Eliminado",
                  text: "El servicio ha sido eliminado",
                  icon: "success",
                  customClass: {
                    popup: 'mi-popup-exito',
                    confirmButton: 'mi-boton-ok'
                  }
                });
              })
              .catch(error => {
                console.error("Error al eliminar el servicio:", error);
                Swal.fire({
                  title: "Error",
                  text: "Ocurrió un error al eliminar el servicio. Inténtalo nuevamente.",
                  icon: "error",
                  customClass: {
                    confirmButton: "mi-boton-ok",
                  }
                });
              });
          }
        });
      };
    
      const handleEdit = (servicio) => {
        Swal.fire({
            title: "¿Quieres editar este servicio?",
            text: `Estás editando: ${servicio.nombre}`,
            icon: "info",
            iconColor: "#f4e3c1",
            showCancelButton: true,
            confirmButtonText: "Continuar",
            cancelButtonText: "Cancelar",
            customClass: {
                popup: "mi-popup",
                title: "mi-titulo",
                content: "mi-contenido",
                confirmButton: "mi-boton-confirmar",
                cancelButton: "mi-boton-cancelar",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setNombre(servicio.nombre || "");
                setDescripcion(servicio.descripcion || "");
                setPrecio(servicio.precio || 0);
                setImagenes(servicio.imagenesUrl || []);
                setServicioEditando(servicio.id);
                setCategoria(servicio.categoriaNombre || "");
                setModalAbierto(true);
            }
        });
    };
    
    
    const eliminarImagen = (index) => {
      setImagenes((prev) => prev.filter((_, i) => i !== index));
    };
    

    return (
        <div className="main-content">
            <TopBar busqueda={busqueda} setBusqueda={setBusqueda} toggleModal={toggleModal} />
            <ServiceTable servicios={servicios} busqueda={busqueda} handleEdit={handleEdit} handleDelete={handleDelete} categorias={categorias}/>
            <ServiceModal
                modalAbierto={modalAbierto}
                toggleModal={toggleModal}
                nombre={nombre}
                setNombre={setNombre}
                descripcion={descripcion}
                setDescripcion={setDescripcion}
                precio={precio}
                setPrecio={setPrecio}
                categoria={categoria}
                setCategoria={setCategoria}
                categorias={categorias}
                imagenes={imagenes}
                uploadImage={uploadImage}
                loading={loading}
                eliminarImagen={eliminarImagen}
                agregarServicio={agregarServicio}
                servicioEditando={servicioEditando}
            />
        </div>
    );
};

export default Alojamientos;
