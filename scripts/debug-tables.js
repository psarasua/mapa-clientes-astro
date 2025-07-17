import { initDB, executeQuery, closeDB } from '../src/lib/database.js';

console.log('🔍 Verificando estructura de tablas...');

try {
  initDB();
  
  console.log('\n📋 Tabla diasEntrega:');
  const diasSchema = executeQuery('PRAGMA table_info(diasEntrega)');
  console.log(diasSchema);
  
  console.log('\n🚚 Tabla camiones:');
  const camionesSchema = executeQuery('PRAGMA table_info(camiones)');
  console.log(camionesSchema);
  
  console.log('\n🚛 Tabla repartos:');
  const repartosSchema = executeQuery('PRAGMA table_info(repartos)');
  console.log(repartosSchema);
  
  console.log('\n📊 Contenido de diasEntrega:');
  const dias = executeQuery('SELECT * FROM diasEntrega LIMIT 5');
  console.log(dias);
  
  console.log('\n📊 Contenido de camiones:');
  const camiones = executeQuery('SELECT * FROM camiones LIMIT 5');
  console.log(camiones);
  
  console.log('\n📊 Contenido de repartos:');
  const repartos = executeQuery('SELECT * FROM repartos');
  console.log(repartos);

} catch (error) {
  console.error('❌ Error verificando tablas:', error);
} finally {
  closeDB();
}
