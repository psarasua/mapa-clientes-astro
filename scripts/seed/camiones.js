import { crearCamion } from '../../src/lib/camionesService.js';
import { initDB } from '../../src/lib/database.js';

// 5 camiones de ejemplo
const camiones = [
  { nombre: "Camión Reparto Centro" },
  { nombre: "Camión Reparto Norte" },
  { nombre: "Camión Reparto Sur" },
  { nombre: "Camión Reparto Este" },
  { nombre: "Camión Reparto Oeste" }
];

async function seedCamiones() {
  try {
    console.log('🚛 Iniciando seeders para camiones...');
    
    // Asegurar que la base de datos esté inicializada
    console.log('📋 Verificando base de datos...');
    initDB();
    
    console.log('➕ Agregando camiones...');
    let count = 0;
    
    for (const camion of camiones) {
      try {
        const nuevoCamion = crearCamion(camion);
        count++;
        console.log(`  ✅ ${count}. ${camion.nombre} (ID: ${nuevoCamion.id})`);
      } catch (error) {
        // Si hay error de duplicado, continuar
        if (error.message.includes('UNIQUE constraint failed') || error.message.includes('already exists')) {
          console.log(`  ⚠️  ${camion.nombre} ya existe (saltando)`);
        } else {
          console.log(`  ❌ Error creando ${camion.nombre}: ${error.message}`);
        }
      }
    }
    
    console.log(`\n🎉 Seeders de camiones completados!`);
    console.log(`📊 Se agregaron ${count} camiones`);
    console.log(`🚛 Camiones disponibles: Reparto Centro, Norte, Sur, Este, Oeste`);
    console.log(`\n🚀 Ejecuta 'npm run dev' para usar los camiones`);
    
  } catch (error) {
    console.error('❌ Error ejecutando seeders de camiones:', error.message);
    process.exit(1);
  }
}

// Función para limpiar camiones
async function resetCamiones() {
  try {
    console.log('🧹 Limpiando camiones...');
    const { getDB } = await import('../src/lib/database.js');
    const db = getDB();
    
    // Eliminar todos los camiones
    const result = db.prepare('DELETE FROM camiones').run();
    console.log(`🗑️  Eliminados ${result.changes} camiones`);
    
    // Reiniciar el autoincrement
    db.prepare('DELETE FROM sqlite_sequence WHERE name = ?').run('camiones');
    console.log('🔄 Contador de ID reiniciado');
    
    console.log('✅ Camiones limpiados');
  } catch (error) {
    console.error('❌ Error limpiando camiones:', error.message);
    process.exit(1);
  }
}

// Verificar argumentos de línea de comandos
const args = process.argv.slice(2);

if (args.includes('--reset') || args.includes('-r')) {
  console.log('🔄 Modo reset activado');
  resetCamiones().then(() => seedCamiones());
} else if (args.includes('--clean') || args.includes('-c')) {
  console.log('🧹 Solo limpiar camiones');
  resetCamiones();
} else {
  // Ejecutar seeders normalmente
  seedCamiones();
}
