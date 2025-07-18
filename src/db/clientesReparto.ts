import db from "./init";

export function getAllClientesReparto() {
  return db.prepare("SELECT * FROM clientesReparto").all();
}

export function addClienteReparto(reparto_id: number, cliente_id: number) {
  return db
    .prepare(
      "INSERT INTO clientesReparto (reparto_id, cliente_id) VALUES (?, ?)"
    )
    .run(reparto_id, cliente_id);
}

export function deleteClienteReparto(id: number) {
  return db.prepare("DELETE FROM clientesReparto WHERE id = ?").run(id);
}

export function updateClienteReparto(
  id: number,
  reparto_id: number,
  cliente_id: number
) {
  return db
    .prepare(
      "UPDATE clientesReparto SET reparto_id = ?, cliente_id = ? WHERE id = ?"
    )
    .run(reparto_id, cliente_id, id);
}
