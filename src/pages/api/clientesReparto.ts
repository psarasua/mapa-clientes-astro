import type { APIRoute } from "astro";
import {
  getAllClientesReparto,
  addClienteReparto,
  deleteClienteReparto,
  updateClienteReparto,
} from "../../db/clientesReparto";

export const GET: APIRoute = () => {
  const clientesReparto = getAllClientesReparto();
  return new Response(JSON.stringify(clientesReparto), {
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const { reparto_id, cliente_id } = await request.json();
  const result = addClienteReparto(reparto_id, cliente_id);
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
  const result = deleteClienteReparto(id);
  return new Response(JSON.stringify({ success: result.changes > 0 }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const PUT: APIRoute = async ({ request }) => {
  const { id, reparto_id, cliente_id } = await request.json();
  const result = updateClienteReparto(id, reparto_id, cliente_id);
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
  const sql = `UPDATE clientesReparto SET ${sets.join(", ")} WHERE id = ?`;
  const db = (await import("../../db/init")).default;
  const result = db.prepare(sql).run(...values);
  return new Response(JSON.stringify({ success: result.changes > 0 }), {
    headers: { "Content-Type": "application/json" },
  });
};
