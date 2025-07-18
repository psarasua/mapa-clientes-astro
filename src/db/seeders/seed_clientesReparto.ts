import { addClienteReparto } from "../clientesReparto";

export function seedClientesReparto() {
  addClienteReparto(1, 1);
  addClienteReparto(1, 2);
  addClienteReparto(2, 3);
}

seedClientesReparto();
console.log("ClientesReparto de ejemplo insertados");
