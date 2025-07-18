import type { APIRoute } from "astro";
import {
  getAllRepartos,
  addReparto,
  deleteReparto,
  updateReparto,
} from "../../db/repartos";

export const GET: APIRoute = () => {
  const repartos = getAllRepartos();
  return new Response(JSON.stringify(repartos), {
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const { camion_id, dia_id } = await request.json();
  const result = addReparto(camion_id, dia_id);
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
  const result = deleteReparto(id);
  return new Response(JSON.stringify({ success: result.changes > 0 }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const PUT: APIRoute = async ({ request }) => {
  const { id, camion_id, dia_id } = await request.json();
  const result = updateReparto(id, camion_id, dia_id);
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
  const sql = `UPDATE repartos SET ${sets.join(", ")} WHERE id = ?`;
  const db = (await import("../../db/init")).default;
  const result = db.prepare(sql).run(...values);
  return new Response(JSON.stringify({ success: result.changes > 0 }), {
    headers: { "Content-Type": "application/json" },
  });
};
