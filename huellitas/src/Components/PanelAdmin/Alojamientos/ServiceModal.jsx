import React from "react";

const ServiceModal = ({
    modalAbierto,
    toggleModal,
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    precio,
    setPrecio,
    categoria,
    setCategoria,
    categorias,
    imagenes,
    uploadImage,
    loading,
    eliminarImagen,
    agregarServicio,
    servicioEditando,
}) => {
    if (!modalAbierto) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={toggleModal}>
                    &times;
                </span>
                <h3>{servicioEditando ? "Editar Servicio" : "Agregar Servicio"}</h3>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                <input
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    min="0"
                />
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                    <option value="">Seleccionar Categoría</option>
                    {categorias.length > 0 ? (
                        categorias.map((cat) => (
                            <option key={cat.id} value={cat.nombre}>
                                {cat.nombre}
                            </option>
                        ))
                    ) : (
                        <option disabled>Cargando categorías...</option>
                    )}
                </select>
                <input type="file" accept="image/*" multiple onChange={(e) => uploadImage(e)} />
                {loading ? (
                    <h3>Loading...</h3>
                ) : (
                    <div className="image-preview">
                        {imagenes.map((img, index) => (
                            <div key={index} className="image-container">
                                <img src={img} alt={`Uploaded image ${index}`} className="preview-img" />
                                <button className="delete-img-btn" onClick={() => eliminarImagen(index)}>
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <button className="btn-agregar" onClick={agregarServicio}>
                    Guardar Servicio
                </button>
            </div>
        </div>
    );
};

export default ServiceModal;
