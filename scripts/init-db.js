import { mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { initDB } from '../src/lib/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function init() {
  try {
    console.log('🚀 Inicializando base de datos SQLite...');
    
    // Crear directorio data si no existe
    const dataDir = join(__dirname, '../data');
    try {
      await mkdir(dataDir, { recursive: true });
      console.log('📁 Directorio data creado');
    } catch (error) {
      if (error.code !== 'EEXIST') {
        console.log('📁 Directorio data ya existe');
      }
    }
    
    // Inicializar base de datos
    initDB();
    
    console.log('✅ Base de datos SQLite inicializada correctamente');
    console.log('\n📝 Pasos siguientes:');
    console.log('1. ✅ Base de datos SQLite configurada (archivo local)');
    console.log('2. Ejecuta: npm run dev');
    console.log('\n🌍 La aplicación estará disponible en: http://localhost:4321');
    console.log('\n🗃️ Base de datos ubicada en: data/clientes.db');
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error.message);
    console.log('\n🔧 Verifica que:');
    console.log('- Tienes permisos de escritura en el directorio');
    console.log('- El directorio data puede ser creado');
    process.exit(1);
  }
}

init();
