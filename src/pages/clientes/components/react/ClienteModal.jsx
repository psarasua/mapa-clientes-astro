import React, { useEffect, useRef } from "react";

export default function ClienteModal({
  show,
  onClose,
  onSubmit,
  cliente,
  isEdit,
  loading,
}) {
  const ref = useRef();
  useEffect(() => {
    if (show) {
      setTimeout(() => ref.current?.focus(), 200);
    }
  }, [show]);
  function handleSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
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
                {isEdit ? "Editar cliente" : "Nuevo cliente"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-2 text-primary">
                  {/* Icono usuario */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="#0d6efd"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </span>
                <input
                  name="nombre"
                  ref={ref}
                  placeholder="Nombre"
                  className="form-control ps-5"
                  required
                  minLength={3}
                  defaultValue={cliente?.nombre || ""}
                />
                <div className="invalid-feedback">
                  El nombre debe tener al menos 3 letras.
                </div>
              </div>
              <div className="mb-3 position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-2 text-success">
                  {/* Icono dirección */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="#198754"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                </span>
                <input
                  name="direccion"
                  placeholder="Dirección"
                  className="form-control ps-5"
                  required
                  defaultValue={cliente?.direccion || ""}
                />
                <div className="invalid-feedback">
                  La dirección es obligatoria.
                </div>
              </div>
              <div className="mb-3 position-relative">
                <span className="position-absolute top-50 start-0 translate-middle-y ms-2 text-warning">
                  {/* Icono teléfono */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="#ffc107"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.654 1.328a.678.678 0 0 1 1.018-.063l2.29 2.29c.329.329.445.81.302 1.234l-.547 1.64a.678.678 0 0 0 .145.67l2.457 2.457a.678.678 0 0 0 .67.145l1.64-.547a1.745 1.745 0 0 1 1.234.302l2.29 2.29a.678.678 0 0 1-.063 1.018l-2.013 1.51a2.745 2.745 0 0 1-2.89.326c-1.12-.56-2.68-2.12-3.24-3.24a2.745 2.745 0 0 1 .326-2.89l1.51-2.013z" />
                  </svg>
                </span>
                <input
                  name="telefono"
                  placeholder="Teléfono"
                  className="form-control ps-5"
                  required
                  pattern="\d{8,}"
                  maxLength={15}
                  defaultValue={cliente?.telefono || ""}
                />
                <div className="invalid-feedback">
                  El teléfono debe tener al menos 8 dígitos y solo números.
                </div>
              </div>
              <input type="hidden" name="id" value={cliente?.id || ""} />
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
