import { addReparto } from "../repartos";

export function seedRepartos() {
  addReparto(1, 1);
  addReparto(2, 2);
  addReparto(3, 3);
}

seedRepartos();
console.log("Repartos de ejemplo insertados");
