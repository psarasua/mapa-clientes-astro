import { addCamion } from "../camiones";

export function seedCamiones() {
  addCamion("ABC123", "Modelo X", 1000);
  addCamion("DEF456", "Modelo Y", 1500);
  addCamion("GHI789", "Modelo Z", 2000);
}

seedCamiones();
console.log("Camiones de ejemplo insertados");
