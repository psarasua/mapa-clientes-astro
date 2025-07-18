import db from "./init";

export function getAllRepartos() {
  return db.prepare("SELECT * FROM repartos").all();
}

export function addReparto(camion_id: number, dia_id: number) {
  return db
    .prepare("INSERT INTO repartos (camion_id, dia_id) VALUES (?, ?)")
    .run(camion_id, dia_id);
}

export function deleteReparto(id: number) {
  return db.prepare("DELETE FROM repartos WHERE id = ?").run(id);
}

export function updateReparto(id: number, camion_id: number, dia_id: number) {
  return db
    .prepare("UPDATE repartos SET camion_id = ?, dia_id = ? WHERE id = ?")
    .run(camion_id, dia_id, id);
}
