import { getDB } from '../../src/lib/database.js';

// Script para crear la tabla camiones en la base de datos existente
function crearTablaCamiones() {
  try {
    console.log('🗃️ Conectando a la base de datos...');
    const db = getDB();
    
    console.log('🚛 Creando tabla camiones...');
    db.exec(`
      CREATE TABLE IF NOT EXISTS camiones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Tabla camiones creada exitosamente');
    
    // Verificar que la tabla se creó correctamente
    const tableInfo = db.prepare(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='camiones'
    `).get();
    
    if (tableInfo) {
      console.log('🎉 Tabla camiones confirmada en la base de datos');
      
      // Mostrar la estructura de la tabla
      const columns = db.prepare('PRAGMA table_info(camiones)').all();
      console.log('📋 Estructura de la tabla camiones:');
      columns.forEach(col => {
        console.log(`  • ${col.name} (${col.type}) ${col.notnull ? '- NOT NULL' : ''}`);
      });
    } else {
      console.log('❌ La tabla no se pudo crear');
    }
    
  } catch (error) {
    console.error('❌ Error creando tabla camiones:', error.message);
    process.exit(1);
  }
}

// Ejecutar el script
crearTablaCamiones();
