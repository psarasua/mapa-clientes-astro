import { initDB, closeDB } from '../../src/lib/database.js';
import { crearReparto, obtenerRepartos } from '../../src/lib/repartosService.js';

console.log('🚚 Iniciando seeders para repartos...');

const repartosEjemplo = [
  // Camión Centro (ID: 1) - Todos los días
  { camion_id: 1, dia_entrega_id: 1 }, // Centro - Lunes
  { camion_id: 1, dia_entrega_id: 2 }, // Centro - Martes
  { camion_id: 1, dia_entrega_id: 3 }, // Centro - Miércoles
  { camion_id: 1, dia_entrega_id: 4 }, // Centro - Jueves
  { camion_id: 1, dia_entrega_id: 5 }, // Centro - Viernes
  
  // Camión Norte (ID: 2) - Todos los días
  { camion_id: 2, dia_entrega_id: 1 }, // Norte - Lunes
  { camion_id: 2, dia_entrega_id: 2 }, // Norte - Martes
  { camion_id: 2, dia_entrega_id: 3 }, // Norte - Miércoles
  { camion_id: 2, dia_entrega_id: 4 }, // Norte - Jueves
  { camion_id: 2, dia_entrega_id: 5 }, // Norte - Viernes
  
  // Camión Sur (ID: 3) - Todos los días
  { camion_id: 3, dia_entrega_id: 1 }, // Sur - Lunes
  { camion_id: 3, dia_entrega_id: 2 }, // Sur - Martes
  { camion_id: 3, dia_entrega_id: 3 }, // Sur - Miércoles
  { camion_id: 3, dia_entrega_id: 4 }, // Sur - Jueves
  { camion_id: 3, dia_entrega_id: 5 }, // Sur - Viernes
  
  // Camión Este (ID: 4) - Todos los días
  { camion_id: 4, dia_entrega_id: 1 }, // Este - Lunes
  { camion_id: 4, dia_entrega_id: 2 }, // Este - Martes
  { camion_id: 4, dia_entrega_id: 3 }, // Este - Miércoles
  { camion_id: 4, dia_entrega_id: 4 }, // Este - Jueves
  { camion_id: 4, dia_entrega_id: 5 }, // Este - Viernes
  
  // Camión Oeste (ID: 5) - Todos los días
  { camion_id: 5, dia_entrega_id: 1 }, // Oeste - Lunes
  { camion_id: 5, dia_entrega_id: 2 }, // Oeste - Martes
  { camion_id: 5, dia_entrega_id: 3 }, // Oeste - Miércoles
  { camion_id: 5, dia_entrega_id: 4 }, // Oeste - Jueves
  { camion_id: 5, dia_entrega_id: 5 }, // Oeste - Viernes
];

try {
  // Verificar conexión a base de datos
  console.log('📋 Verificando base de datos...');
  initDB();
  
  // Verificar si ya existen repartos
  const repartosExistentes = obtenerRepartos();
  if (repartosExistentes.length > 0) {
    console.log('⚠️  Ya existen repartos en la base de datos');
    console.log(`📊 Total actual: ${repartosExistentes.length} repartos`);
    console.log('🚀 Usa la API para gestionar repartos o borra la base de datos para empezar de nuevo');
    process.exit(0);
  }
  
  console.log('➕ Agregando repartos de ejemplo...');
  
  let contador = 0;
  for (const reparto of repartosEjemplo) {
    try {
      const nuevoReparto = crearReparto(reparto);
      contador++;
      console.log(`  ✅ ${contador}. Reparto ${nuevoReparto.camion_nombre} - ${nuevoReparto.dia_nombre} (ID: ${nuevoReparto.id})`);
    } catch (error) {
      console.log(`  ❌ Error agregando reparto ${reparto.camion_id}-${reparto.dia_entrega_id}:`, error.message);
    }
  }
  
  console.log('🎉 Seeders de repartos completados!');
  console.log(`📊 Se agregaron ${contador} repartos de ${repartosEjemplo.length} intentos`);
  console.log('🚚 Distribución completa (cada camión tiene todos los días):');
  console.log('   - Camión Centro: Lunes, Martes, Miércoles, Jueves, Viernes');
  console.log('   - Camión Norte: Lunes, Martes, Miércoles, Jueves, Viernes');
  console.log('   - Camión Sur: Lunes, Martes, Miércoles, Jueves, Viernes');
  console.log('   - Camión Este: Lunes, Martes, Miércoles, Jueves, Viernes');
  console.log('   - Camión Oeste: Lunes, Martes, Miércoles, Jueves, Viernes');
  console.log(`📈 Total: 5 camiones × 5 días = 25 repartos`);
  console.log('🚀 Ejecuta pruebas con: curl http://localhost:4321/api/repartos');

} catch (error) {
  console.error('❌ Error en seeders de repartos:', error);
  process.exit(1);
} finally {
  closeDB();
}
