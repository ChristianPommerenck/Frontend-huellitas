import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const CategoriaTable = ({ categorias, handleEditCategory, handleDeleteCategory }) => {
    return (
        <div className="table-container">
            <div className="table-header">
                <h2>Categorías</h2>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.length > 0 ? (
                        categorias.map((categoria) => (
                            <tr key={categoria.id}>
                                <td>{categoria.id}</td>
                                <td>
                                    <img
                                        src={categoria.imagenUrl || "https://via.placeholder.com/50"}
                                        alt={`Imagen de ${categoria.nombre}`}
                                        style={{
                                            width: "25px",
                                            height: "25px",
                                            objectFit: "cover",
                                            borderRadius: "5px",
                                            border: "1px solid #ddd",
                                        }}
                                    />
                                </td>
                                <td>{categoria.nombre}</td>
                                <td>{categoria.descripcion}</td>
                                <td>
                                    <FaEdit className="edit-icon" onClick={() => handleEditCategory(categoria)} />
                                    <FaTrash className="delete-icon" onClick={() => handleDeleteCategory(categoria.id)} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay categorías disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CategoriaTable;
