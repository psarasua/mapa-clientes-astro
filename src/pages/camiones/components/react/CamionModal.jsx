import React, { useEffect, useRef } from "react";

export default function CamionModal({
  show,
  onClose,
  onSubmit,
  camion,
  isEdit,
  loading,
}) {
  const ref = useRef();
  useEffect(() => {
    if (show) setTimeout(() => ref.current?.focus(), 200);
  }, [show]);
  function handleSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    // Convertir capacidad a número y limpiar strings vacíos
    if (data.capacidad !== undefined) {
      data.capacidad = Number(data.capacidad);
      if (isNaN(data.capacidad) || data.capacidad <= 0) delete data.capacidad;
    }
    // Eliminar campos vacíos
    Object.keys(data).forEach((k) => {
      if (typeof data[k] === "string" && data[k].trim() === "") delete data[k];
    });
    onSubmit(data);
  }
  return (
    <div
      className={`modal fade${show ? " show d-block" : ""}`}
      tabIndex="-1"
      style={{ background: show ? "rgba(0,0,0,0.5)" : "none" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="modal-header">
              <h5 className="modal-title">
                {isEdit ? "Editar camión" : "Nuevo camión"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <input
                  name="matricula"
                  ref={ref}
                  placeholder="Matrícula"
                  className="form-control"
                  required
                  minLength={3}
                  defaultValue={camion?.matricula || ""}
                />
                <div className="invalid-feedback">
                  La matrícula es obligatoria.
                </div>
              </div>
              <div className="mb-3">
                <input
                  name="modelo"
                  placeholder="Modelo"
                  className="form-control"
                  required
                  defaultValue={camion?.modelo || ""}
                />
                <div className="invalid-feedback">
                  El modelo es obligatorio.
                </div>
              </div>
              <div className="mb-3">
                <input
                  name="capacidad"
                  placeholder="Capacidad"
                  type="number"
                  className="form-control"
                  required
                  min={1}
                  defaultValue={camion?.capacidad || ""}
                />
                <div className="invalid-feedback">
                  La capacidad debe ser mayor a 0.
                </div>
              </div>
              <input type="hidden" name="id" value={camion?.id || ""} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' viewBox='0 0 16 16'><path d='M8 1a.5.5 0 0 1 .5.5V7.5H14.5a.5.5 0 0 1 0 1H8.5V14.5a.5.5 0 0 1-1 0V8.5H1.5a.5.5 0 0 1 0-1H7.5V1.5A.5.5 0 0 1 8 1z'/></svg>",
                  }}
                ></span>
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
