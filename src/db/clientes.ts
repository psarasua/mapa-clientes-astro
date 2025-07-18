import db from "./init";

// Aquí puedes agregar funciones para interactuar con la tabla clientes
export function getAllClientes() {
  return db.prepare("SELECT * FROM clientes").all();
}

export function addCliente(
  nombre: string,
  direccion: string,
  telefono: string
) {
  return db
    .prepare(
      "INSERT INTO clientes (nombre, direccion, telefono) VALUES (?, ?, ?)"
    )
    .run(nombre, direccion, telefono);
}

export function deleteCliente(id: number) {
  return db.prepare("DELETE FROM clientes WHERE id = ?").run(id);
}

export function updateCliente(
  id: number,
  nombre: string,
  direccion: string,
  telefono: string
) {
  return db
    .prepare(
      "UPDATE clientes SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?"
    )
    .run(nombre, direccion, telefono, id);
}

// ...puedes agregar más funciones según sea necesario
