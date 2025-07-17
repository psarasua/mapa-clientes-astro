import { initDB, executeQuery, closeDB } from '../../src/lib/database.js';

console.log('🧹 Limpiando tabla camiones...');

try {
  initDB();
  
  const result = executeQuery('DELETE FROM camiones');
  console.log('✅ Tabla camiones limpiada exitosamente');
  console.log('📊 Registros eliminados:', result?.changes || 'N/A');
  
} catch (error) {
  console.error('❌ Error limpiando tabla camiones:', error);
  process.exit(1);
} finally {
  closeDB();
}
