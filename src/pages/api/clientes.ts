export const prerender = false;
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
  try {
    const body = await request.json();
    console.log("POST /api/clientes body:", body);
    const { nombre, direccion, telefono } = body;
    if (!nombre || !direccion || !telefono) {
      console.warn("POST /api/clientes datos incompletos:", body);
      return new Response(
        JSON.stringify({ success: false, error: "Datos incompletos" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
    const result = addCliente(nombre, direccion, telefono);
    return new Response(
      JSON.stringify({ success: true, id: result.lastInsertRowid }),
      {
        headers: { "Content-Type": "application/json" },
        status: 201,
      }
    );
  } catch (e) {
    console.error("POST /api/clientes error:", e);
    return new Response(
      JSON.stringify({ success: false, error: "JSON inválido" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { id } = await request.json();
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "ID requerido" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
    const result = deleteCliente(id);
    return new Response(JSON.stringify({ success: result.changes > 0 }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ success: false, error: "JSON inválido" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const { id, nombre, direccion, telefono } = await request.json();
    if (!id || !nombre || !direccion || !telefono) {
      return new Response(
        JSON.stringify({ success: false, error: "Datos incompletos" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
    const result = updateCliente(id, nombre, direccion, telefono);
    return new Response(JSON.stringify({ success: result.changes > 0 }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ success: false, error: "JSON inválido" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
};

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const { id, ...fields } = await request.json();
    if (!id || Object.keys(fields).length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Datos incompletos" }),
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
    const sql = `UPDATE clientes SET ${sets.join(", ")} WHERE id = ?`;
    const db = (await import("../../db/init")).default;
    const result = db.prepare(sql).run(...values);
    return new Response(JSON.stringify({ success: result.changes > 0 }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ success: false, error: "JSON inválido" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
};
