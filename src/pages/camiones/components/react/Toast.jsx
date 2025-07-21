import React from "react";

export default function Toast({
  message,
  type = "success",
  actions = [],
  onClose,
}) {
  return (
    <div
      className={`toast align-items-center text-white bg-${type} border-0 show`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ zIndex: 1080, minWidth: 300 }}
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          aria-label="Cerrar"
          onClick={onClose}
        ></button>
      </div>
      {actions.length > 0 && (
        <div className="d-flex justify-content-end gap-2 px-3 pb-2">
          {actions.map((a, i) => (
            <button
              key={i}
              className={`btn btn-sm ${a.className || "btn-light"}`}
              onClick={a.handler}
            >
              {a.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
