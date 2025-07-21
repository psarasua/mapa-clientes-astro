export const prerender = false;
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
  let body;
  try {
    body = await request.json();
    // DEBUG: log temporal para depuración
    console.log("[API camiones] Body recibido:", body);
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "JSON inválido" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
  const { matricula, modelo, capacidad } = body || {};
  if (!matricula || !modelo || !capacidad) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Faltan campos obligatorios",
        bodyRecibido: body,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
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
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "JSON inválido" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
  const { id } = body || {};
  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: "ID requerido" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
  const result = deleteCamion(id);
  return new Response(JSON.stringify({ success: result.changes > 0 }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const PUT: APIRoute = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "JSON inválido" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
  const { id, matricula, modelo, capacidad } = body || {};
  if (!id || !matricula || !modelo || !capacidad) {
    return new Response(
      JSON.stringify({ success: false, error: "Faltan campos obligatorios" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
  const result = updateCamion(id, matricula, modelo, capacidad);
  return new Response(JSON.stringify({ success: result.changes > 0 }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const PATCH: APIRoute = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "JSON inválido" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
  const { id, ...fields } = body || {};
  if (!id || Object.keys(fields).length === 0) {
    return new Response(
      JSON.stringify({ success: false, error: "ID y campos requeridos" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
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
