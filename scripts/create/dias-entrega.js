import { initDB, executeQuery, closeDB } from '../../src/lib/database.js';

console.log('📅 Creando tabla diasEntrega...');

try {
  // Inicializar base de datos
  console.log('📋 Conectando a base de datos...');
  initDB();
  
  // Crear tabla diasEntrega
  console.log('📦 Creando tabla diasEntrega...');
  executeQuery(`
    CREATE TABLE IF NOT EXISTS diasEntrega (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descripcion TEXT NOT NULL UNIQUE,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
      fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  console.log('✅ Tabla diasEntrega creada exitosamente!');
  console.log('📋 Estructura: id, descripcion, fecha_creacion, fecha_actualizacion');
  console.log('📅 Para almacenar días de la semana: Lunes, Martes, Miércoles, Jueves, Viernes');
  
} catch (error) {
  console.error('❌ Error creando tabla diasEntrega:', error);
  process.exit(1);
} finally {
  closeDB();
}
