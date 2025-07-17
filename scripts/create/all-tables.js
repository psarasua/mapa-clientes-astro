import { initDB, executeQuery, closeDB } from '../../src/lib/database.js';

console.log('🏗️ Creando todas las tablas...');

try {
  // Inicializar base de datos
  console.log('📋 Conectando a base de datos...');
  initDB();
  
  console.log('📦 Creando tablas...');
  
  // Crear tabla clientes
  console.log('👥 Creando tabla clientes...');
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
  
  // Crear tabla diasEntrega
  console.log('📅 Creando tabla diasEntrega...');
  executeQuery(`
    CREATE TABLE IF NOT EXISTS diasEntrega (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descripcion TEXT NOT NULL UNIQUE,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
      fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Crear tabla camiones
  console.log('🚛 Creando tabla camiones...');
  executeQuery(`
    CREATE TABLE IF NOT EXISTS camiones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descripcion TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Crear tabla repartos
  console.log('🚚 Creando tabla repartos...');
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
  
  console.log('✅ Todas las tablas creadas exitosamente!');
  console.log('📋 Tablas: clientes, diasEntrega, camiones, repartos');
  console.log('🔗 Relaciones: repartos conecta camiones con diasEntrega');
  
} catch (error) {
  console.error('❌ Error creando tablas:', error);
  process.exit(1);
} finally {
  closeDB();
}
