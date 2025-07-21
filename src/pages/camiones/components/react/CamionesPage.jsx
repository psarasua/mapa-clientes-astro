import React, { useEffect, useState } from "react";
import CamionesTable from "./CamionesTable.jsx";
import CamionModal from "./CamionModal.jsx";
import Toast from "./Toast.jsx";

export default function CamionesPage() {
  const [camiones, setCamiones] = useState([]);
  const [modal, setModal] = useState({
    show: false,
    camion: null,
    isEdit: false,
  });
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
    actions: [],
  });
  const [loading, setLoading] = useState(false);

  async function fetchCamiones() {
    const res = await fetch("/api/camiones");
    setCamiones(await res.json());
  }
  useEffect(() => {
    fetchCamiones();
  }, []);

  function handleEdit(camion) {
    setModal({ show: true, camion, isEdit: true });
  }
  function handleDelete(camion) {
    setToast({
      show: true,
      message: "¿Seguro que deseas eliminar este camión?",
      type: "danger",
      actions: [
        {
          text: "Sí",
          className: "btn-danger",
          handler: async () => {
            setToast((t) => ({ ...t, show: false }));
            await fetch("/api/camiones", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: camion.id }),
            });
            fetchCamiones();
          },
        },
        {
          text: "No",
          className: "btn-secondary",
          handler: () => setToast((t) => ({ ...t, show: false })),
        },
      ],
    });
  }
  function handleNew() {
    setModal({ show: true, camion: null, isEdit: false });
  }
  async function handleSubmit(data) {
    setLoading(true);
    const method = data.id ? "PUT" : "POST";
    const res = await fetch("/api/camiones", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setLoading(false);
    if (result.success) {
      setToast({
        show: true,
        message: data.id
          ? "Camión actualizado correctamente"
          : "Camión creado correctamente",
        type: "success",
        actions: [],
      });
      setModal({ show: false, camion: null, isEdit: false });
      fetchCamiones();
    } else {
      setToast({
        show: true,
        message: result.error || "Ocurrió un error al guardar",
        type: "danger",
        actions: [],
      });
    }
  }
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 fw-bold m-0 text-primary">Camiones</h1>
        <button
          className="btn btn-success"
          style={{ minWidth: 120 }}
          onClick={handleNew}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="white"
            viewBox="0 0 16 16"
            style={{ marginRight: 6, marginBottom: 2 }}
          >
            <path d="M8 1a.5.5 0 0 1 .5.5V7.5H14.5a.5.5 0 0 1 0 1H8.5V14.5a.5.5 0 0 1-1 0V8.5H1.5a.5.5 0 0 1 0-1H7.5V1.5A.5.5 0 0 1 8 1z" />
          </svg>
          Nuevo
        </button>
      </div>
      <CamionesTable
        camiones={camiones}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CamionModal
        show={modal.show}
        onClose={() => setModal({ show: false, camion: null, isEdit: false })}
        onSubmit={handleSubmit}
        camion={modal.camion}
        isEdit={modal.isEdit}
        loading={loading}
      />
      {toast.show && (
        <div className="position-fixed bottom-0 end-0 p-3">
          <Toast
            {...toast}
            onClose={() => setToast((t) => ({ ...t, show: false }))}
          />
        </div>
      )}
    </div>
  );
}
