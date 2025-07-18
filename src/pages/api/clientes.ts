import type { APIRoute } from "astro";
import {
  getAllClientes,
  addCliente,
  deleteCliente,
  updateCliente,
} from "../../db/clientes";

export const GET: APIRoute = () => {
  const clientes = getAllClientes();
  return new Response(JSON.stringify(clientes), {
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const { nombre, direccion, telefono } = await request.json();
  const result = addCliente(nombre, direccion, telefono);
  return new Response(
    JSON.stringify({ success: true, id: result.lastInsertRowid }),
    {
      headers: { "Content-Type": "application/json" },
      status: 201,
    }
  );
};

export const DELETE: APIRoute = async ({ request }) => {
  const { id } = await request.json();
  const result = deleteCliente(id);
  return new Response(JSON.stringify({ success: result.changes > 0 }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const PUT: APIRoute = async ({ request }) => {
  const { id, nombre, direccion, telefono } = await request.json();
  const result = updateCliente(id, nombre, direccion, telefono);
  return new Response(JSON.stringify({ success: result.changes > 0 }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const PATCH: APIRoute = async ({ request }) => {
  const { id, ...fields } = await request.json();
  let sets = [];
  let values = [];
  for (const key in fields) {
    sets.push(`${key} = ?`);
    values.push(fields[key]);
  }
  values.push(id);
  const sql = `UPDATE clientes SET ${sets.join(", ")} WHERE id = ?`;
  const db = (await import("../../db/init")).default;
  const result = db.prepare(sql).run(...values);
  return new Response(JSON.stringify({ success: result.changes > 0 }), {
    headers: { "Content-Type": "application/json" },
  });
};
