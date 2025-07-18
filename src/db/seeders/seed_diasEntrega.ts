import { addDiaEntrega } from "../diasEntrega";

export function seedDiasEntrega() {
  addDiaEntrega("Lunes");
  addDiaEntrega("Miércoles");
  addDiaEntrega("Viernes");
}

seedDiasEntrega();
console.log("Días de entrega de ejemplo insertados");
