import { initDB, executeQuery, closeDB } from '../../src/lib/database.js';

console.log('👥 Creando tabla clientes...');

try {
  // Inicializar base de datos
  console.log('📋 Conectando a base de datos...');
  initDB();
  
  // Crear tabla clientes
  console.log('📦 Creando tabla clientes...');
  executeQuery(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT UNIQUE,
      telefono TEXT,
      direccion TEXT,
      latitud REAL,
      longitud REAL,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
      fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  console.log('✅ Tabla clientes creada exitosamente!');
  console.log('📋 Estructura: id, nombre, email, telefono, direccion, latitud, longitud, fecha_creacion, fecha_actualizacion');
  console.log('🗺️ Campos de ubicación: latitud, longitud para mapas');
  
} catch (error) {
  console.error('❌ Error creando tabla clientes:', error);
  process.exit(1);
} finally {
  closeDB();
}
