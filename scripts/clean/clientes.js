import { initDB, executeQuery, closeDB } from '../../src/lib/database.js';

console.log('🧹 Limpiando tabla clientes...');

try {
  initDB();
  
  const result = executeQuery('DELETE FROM clientes');
  console.log('✅ Tabla clientes limpiada exitosamente');
  console.log('📊 Registros eliminados:', result?.changes || 'N/A');
  
} catch (error) {
  console.error('❌ Error limpiando tabla clientes:', error);
  process.exit(1);
} finally {
  closeDB();
}
