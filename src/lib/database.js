import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta de la base de datos SQLite
const dbPath = join(__dirname, '../../data/clientes.db');

// Crear conexión a la base de datos SQLite
let db = null;

export function getDB() {
  if (!db) {
    try {
      db = new Database(dbPath);
      db.pragma('journal_mode = WAL'); // Mejor rendimiento
      console.log('✅ Conectado a SQLite:', dbPath);
    } catch (error) {
      console.error('❌ Error conectando a SQLite:', error);
      throw error;
    }
  }
  return db;
}

// Inicializar tablas
export function initDB() {
  const database = getDB();
  
  try {
    // Crear tabla de clientes
    database.exec(`
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

    // Crear índice para optimizar consultas geográficas
    database.exec(`
      CREATE INDEX IF NOT EXISTS idx_clientes_coordenadas 
      ON clientes (latitud, longitud)
    `);

    console.log('✅ Base de datos SQLite inicializada correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error inicializando la base de datos:', error);
    throw error;
  }
}

// Función para ejecutar consultas preparadas
export function executeQuery(query, params = []) {
  const database = getDB();
  
  try {
    if (query.trim().toUpperCase().startsWith('SELECT')) {
      // Para consultas SELECT
      const stmt = database.prepare(query);
      return { rows: stmt.all(params) };
    } else {
      // Para INSERT, UPDATE, DELETE
      const stmt = database.prepare(query);
      const result = stmt.run(params);
      
      // Para INSERT, devolver el registro insertado
      if (query.trim().toUpperCase().startsWith('INSERT')) {
        const selectStmt = database.prepare('SELECT * FROM clientes WHERE id = ?');
        const insertedRow = selectStmt.get(result.lastInsertRowid);
        return { rows: [insertedRow] };
      }
      
      // Para UPDATE/DELETE, devolver el número de filas afectadas
      return { rows: [], changes: result.changes };
    }
  } catch (error) {
    console.error('❌ Error ejecutando consulta:', error);
    throw error;
  }
}

// Cerrar la base de datos (útil para testing)
export function closeDB() {
  if (db) {
    db.close();
    db = null;
  }
}
