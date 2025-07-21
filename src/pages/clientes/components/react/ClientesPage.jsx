import React, { useEffect, useState } from "react";
import ClientesTable from "./ClientesTable.jsx";
import ClienteModal from "./ClienteModal.jsx";
import Toast from "./Toast.jsx";

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [modal, setModal] = useState({
    show: false,
    cliente: null,
    isEdit: false,
  });
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
    actions: [],
  });
  const [loading, setLoading] = useState(false);

  async function fetchClientes() {
    const res = await fetch("/api/clientes");
    setClientes(await res.json());
  }
  useEffect(() => {
    fetchClientes();
  }, []);

  function handleEdit(cliente) {
    setModal({ show: true, cliente, isEdit: true });
  }
  function handleDelete(cliente) {
    setToast({
      show: true,
      message: "¿Seguro que deseas eliminar este cliente?",
      type: "danger",
      actions: [
        {
          text: "Sí",
          className: "btn-danger",
          handler: async () => {
            setToast((t) => ({ ...t, show: false }));
            await fetch("/api/clientes", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: cliente.id }),
            });
            fetchClientes();
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
    setModal({ show: true, cliente: null, isEdit: false });
  }
  async function handleSubmit(data) {
    setLoading(true);
    const method = data.id ? "PUT" : "POST";
    const res = await fetch("/api/clientes", {
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
          ? "Cliente actualizado correctamente"
          : "Cliente creado correctamente",
        type: "success",
        actions: [],
      });
      setModal({ show: false, cliente: null, isEdit: false });
      fetchClientes();
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
        <h1 className="h4 fw-bold m-0 text-primary">Clientes</h1>
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
      <ClientesTable
        clientes={clientes}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ClienteModal
        show={modal.show}
        onClose={() => setModal({ show: false, cliente: null, isEdit: false })}
        onSubmit={handleSubmit}
        cliente={modal.cliente}
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
