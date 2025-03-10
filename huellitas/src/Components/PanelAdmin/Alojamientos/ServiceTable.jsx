import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ServiceTable = ({ servicios, busqueda, handleEdit, handleDelete, categorias }) => {
    // Asegurar que busqueda nunca sea null o undefined
    const busquedaLimpia = busqueda ? busqueda.toLowerCase() : "";

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {servicios && servicios.length > 0 ? (
    servicios
        .filter((servicio) =>
            servicio?.nombre?.toLowerCase().includes(busqueda.toLowerCase())
        )
        .map((servicio) => {
            if (!servicio) return null;
            const categoriaNombre = servicio?.categoria?.nombre || "Categoría no encontrada";

            return (
                <tr key={servicio.id}>
                    <td>{servicio.id}</td>
                    <td>{servicio.nombre || "Nombre no disponible"}</td>
                    <td>{servicio.descripcion || "Descripción no disponible"}</td>
                    <td>${servicio.precio || "Precio no disponible"}</td>
                    <td>{categoriaNombre}</td>
                    <td>
    {servicio.imagenes && servicio.imagenes.length > 0 ? (
        <img 
            src={servicio.imagenes[0].urlImagen} 
            alt="Servicio" 
            className="preview-img-table" 
            style={{ width: "50px", height: "50px", objectFit: "cover" }} 
        />
    ) : (
        "No hay imagen"
    )}
</td>

                    <td>
                        <FaEdit className="edit-icon" onClick={() => handleEdit(servicio)} />
                        <FaTrash className="delete-icon" onClick={() => handleDelete(servicio.id)} />
                    </td>
                </tr>
            );
        })
) : (
    <tr>
        <td colSpan="7">No hay servicios disponibles</td>
    </tr>
)}

</tbody>

            </table>
        </div>
    );
};

export default ServiceTable;
