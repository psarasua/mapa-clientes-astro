import { initDB, executeQuery, closeDB } from '../../src/lib/database.js';

console.log('🧹 Limpiando tabla diasEntrega...');

try {
  initDB();
  
  const result = executeQuery('DELETE FROM diasEntrega');
  console.log('✅ Tabla diasEntrega limpiada exitosamente');
  console.log('📊 Registros eliminados:', result?.changes || 'N/A');
  
} catch (error) {
  console.error('❌ Error limpiando tabla diasEntrega:', error);
  process.exit(1);
} finally {
  closeDB();
}
