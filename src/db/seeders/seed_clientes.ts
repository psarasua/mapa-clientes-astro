import { addCliente } from "../clientes";

export function seedClientes() {
  addCliente("Cliente A", "Calle 1", "123456789");
  addCliente("Cliente B", "Calle 2", "987654321");
  addCliente("Cliente C", "Calle 3", "555555555");
}

seedClientes();
console.log("Clientes de ejemplo insertados");
