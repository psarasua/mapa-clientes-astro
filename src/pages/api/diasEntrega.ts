import type { APIRoute } from "astro";
import {
  getAllDiasEntrega,
  addDiaEntrega,
  deleteDiaEntrega,
  updateDiaEntrega,
} from "../../db/diasEntrega";

export const GET: APIRoute = () => {
  const dias = getAllDiasEntrega();
  return new Response(JSON.stringify(dias), {
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const { dia } = await request.json();
  const result = addDiaEntrega(dia);
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
  const result = deleteDiaEntrega(id);
  return new Response(JSON.stringify({ success: result.changes > 0 }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const PUT: APIRoute = async ({ request }) => {
  const { id, dia } = await request.json();
  const result = updateDiaEntrega(id, dia);
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
  const sql = `UPDATE diasEntrega SET ${sets.join(", ")} WHERE id = ?`;
  const db = (await import("../../db/init")).default;
  const result = db.prepare(sql).run(...values);
  return new Response(JSON.stringify({ success: result.changes > 0 }), {
    headers: { "Content-Type": "application/json" },
  });
};
