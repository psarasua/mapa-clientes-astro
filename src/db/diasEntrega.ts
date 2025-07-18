import db from "./init";

export function getAllDiasEntrega() {
  return db.prepare("SELECT * FROM diasEntrega").all();
}

export function addDiaEntrega(dia: string) {
  return db.prepare("INSERT INTO diasEntrega (dia) VALUES (?)").run(dia);
}

export function deleteDiaEntrega(id: number) {
  return db.prepare("DELETE FROM diasEntrega WHERE id = ?").run(id);
}

export function updateDiaEntrega(id: number, dia: string) {
  return db.prepare("UPDATE diasEntrega SET dia = ? WHERE id = ?").run(dia, id);
}
