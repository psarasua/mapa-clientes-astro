import type { APIRoute } from "astro";
import {
  getAllCamiones,
  addCamion,
  deleteCamion,
  updateCamion,
} from "../../db/camiones";

export const GET: APIRoute = () => {
  const camiones = getAllCamiones();
  return new Response(JSON.stringify(camiones), {
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const { matricula, modelo, capacidad } = await request.json();
  const result = addCamion(matricula, modelo, capacidad);
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
  const result = deleteCamion(id);
  return new Response(JSON.stringify({ success: result.changes > 0 }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const PUT: APIRoute = async ({ request }) => {
  const { id, matricula, modelo, capacidad } = await request.json();
  const result = updateCamion(id, matricula, modelo, capacidad);
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
  const sql = `UPDATE camiones SET ${sets.join(", ")} WHERE id = ?`;
  const db = (await import("../../db/init")).default;
  const result = db.prepare(sql).run(...values);
  return new Response(JSON.stringify({ success: result.changes > 0 }), {
    headers: { "Content-Type": "application/json" },
  });
};
