import db from "./init";

export function getAllCamiones() {
  return db.prepare("SELECT * FROM camiones").all();
}

export function addCamion(
  matricula: string,
  modelo: string,
  capacidad: number
) {
  return db
    .prepare(
      "INSERT INTO camiones (matricula, modelo, capacidad) VALUES (?, ?, ?)"
    )
    .run(matricula, modelo, capacidad);
}

export function deleteCamion(id: number) {
  return db.prepare("DELETE FROM camiones WHERE id = ?").run(id);
}

export function updateCamion(
  id: number,
  matricula: string,
  modelo: string,
  capacidad: number
) {
  return db
    .prepare(
      "UPDATE camiones SET matricula = ?, modelo = ?, capacidad = ? WHERE id = ?"
    )
    .run(matricula, modelo, capacidad, id);
}
