import { initDB, executeQuery, closeDB } from '../../src/lib/database.js';

console.log('🧹 Limpiando tabla repartos...');

try {
  initDB();
  
  const result = executeQuery('DELETE FROM repartos');
  console.log('✅ Tabla repartos limpiada exitosamente');
  console.log('📊 Registros eliminados:', result?.changes || 'N/A');
  
} catch (error) {
  console.error('❌ Error limpiando tabla repartos:', error);
  process.exit(1);
} finally {
  closeDB();
}
