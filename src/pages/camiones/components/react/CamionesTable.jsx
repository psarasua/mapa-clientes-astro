import React from "react";

export default function CamionesTable({ camiones, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped align-middle">
        <thead className="table-primary">
          <tr>
            <th>Matrícula</th>
            <th>Modelo</th>
            <th>Capacidad</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {camiones.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center text-muted">
                No hay camiones registrados.
              </td>
            </tr>
          ) : (
            camiones.map((c) => (
              <tr key={c.id}>
                <td className="fw-semibold text-primary">{c.matricula}</td>
                <td>{c.modelo}</td>
                <td>{c.capacidad}</td>
                <td className="text-center">
                  <div className="d-flex gap-2 justify-content-center">
                    <button
                      className="edit-btn btn btn-outline-warning btn-sm"
                      title="Editar"
                      onClick={() => onEdit(c)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#ffc107"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 3 10.707V13h2.293l7.5-7.5z" />
                      </svg>
                    </button>
                    <button
                      className="delete-btn btn btn-outline-danger btn-sm"
                      title="Eliminar"
                      onClick={() => onDelete(c)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#dc3545"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 5h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5v-7zM4.118 4 4 4.059V13.5A1.5 1.5 0 0 0 5.5 15h5A1.5 1.5 0 0 0 12 13.5V4.059L11.882 4H4.118zM2.5 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1H15a.5.5 0 0 1 0 1h-1v10.5A2.5 2.5 0 0 1 11.5 17h-7A2.5 2.5 0 0 1 2 14.5V4H1a.5.5 0 0 1 0-1h1.5z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
