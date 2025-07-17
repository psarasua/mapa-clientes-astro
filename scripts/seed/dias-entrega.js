import { crearDiaEntrega } from '../../src/lib/diasEntregaService.js';
import { initDB } from '../../src/lib/database.js';

// Días de entrega de lunes a viernes
const diasEntrega = [
  { descripcion: "Lunes" },
  { descripcion: "Martes" },
  { descripcion: "Miércoles" },
  { descripcion: "Jueves" },
  { descripcion: "Viernes" }
];

async function seedDiasEntrega() {
  try {
    console.log('📅 Iniciando seeders para días de entrega...');
    
    // Asegurar que la base de datos esté inicializada
    console.log('📋 Verificando base de datos...');
    initDB();
    
    console.log('➕ Agregando días de entrega...');
    let count = 0;
    
    for (const dia of diasEntrega) {
      try {
        const nuevoDia = crearDiaEntrega(dia);
        count++;
        console.log(`  ✅ ${count}. ${dia.descripcion} (ID: ${nuevoDia.id})`);
      } catch (error) {
        // Si hay error de duplicado, continuar
        if (error.message.includes('UNIQUE constraint failed') || error.message.includes('already exists')) {
          console.log(`  ⚠️  ${dia.descripcion} ya existe (saltando)`);
        } else {
          console.log(`  ❌ Error creando ${dia.descripcion}: ${error.message}`);
        }
      }
    }
    
    console.log(`\n🎉 Seeders de días de entrega completados!`);
    console.log(`📊 Se agregaron ${count} días de entrega`);
    console.log(`📅 Días disponibles: Lunes a Viernes`);
    console.log(`\n🚀 Ejecuta 'npm run dev' para usar los días de entrega`);
    
  } catch (error) {
    console.error('❌ Error ejecutando seeders de días de entrega:', error.message);
    process.exit(1);
  }
}

// Función para limpiar días de entrega
async function resetDiasEntrega() {
  try {
    console.log('🧹 Limpiando días de entrega...');
    const { getDB } = await import('../src/lib/database.js');
    const db = getDB();
    
    // Eliminar todos los días de entrega
    const result = db.prepare('DELETE FROM diasEntrega').run();
    console.log(`🗑️  Eliminados ${result.changes} días de entrega`);
    
    // Reiniciar el autoincrement
    db.prepare('DELETE FROM sqlite_sequence WHERE name = ?').run('diasEntrega');
    console.log('🔄 Contador de ID reiniciado');
    
    console.log('✅ Días de entrega limpiados');
  } catch (error) {
    console.error('❌ Error limpiando días de entrega:', error.message);
    process.exit(1);
  }
}

// Verificar argumentos de línea de comandos
const args = process.argv.slice(2);

if (args.includes('--reset') || args.includes('-r')) {
  console.log('🔄 Modo reset activado');
  resetDiasEntrega().then(() => seedDiasEntrega());
} else if (args.includes('--clean') || args.includes('-c')) {
  console.log('🧹 Solo limpiar días de entrega');
  resetDiasEntrega();
} else {
  // Ejecutar seeders normalmente
  seedDiasEntrega();
}
