import { initDB, executeQuery, closeDB } from '../../src/lib/database.js';

console.log('🚚 Creando tabla repartos...');

try {
  // Inicializar base de datos
  console.log('📋 Conectando a base de datos...');
  initDB();
  
  // Crear tabla repartos
  console.log('📦 Creando tabla repartos...');
  executeQuery(`
    CREATE TABLE IF NOT EXISTS repartos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      camion_id INTEGER NOT NULL,
      dia_entrega_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (camion_id) REFERENCES camiones(id) ON DELETE CASCADE,
      FOREIGN KEY (dia_entrega_id) REFERENCES diasEntrega(id) ON DELETE CASCADE,
      UNIQUE(camion_id, dia_entrega_id)
    )
  `);
  
  console.log('✅ Tabla repartos creada exitosamente!');
  console.log('📋 Estructura: id, camion_id, dia_entrega_id, created_at, updated_at');
  console.log('🔗 Relaciones: camiones(id) <-> repartos <-> diasEntrega(id)');
  
} catch (error) {
  console.error('❌ Error creando tabla repartos:', error);
  process.exit(1);
} finally {
  closeDB();
}
