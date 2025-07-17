import { crearCliente } from '../src/lib/clienteService.js';
import { initDB } from '../src/lib/database.js';

// Datos de ejemplo para España
const clientesEjemplo = [
  {
    nombre: "María García López",
    email: "maria.garcia@email.com",
    telefono: "+34 600 123 456",
    direccion: "Calle Gran Vía 25, Madrid",
    latitud: 40.4200,
    longitud: -3.7038
  },
  {
    nombre: "Carlos Rodríguez Pérez",
    email: "carlos.rodriguez@empresa.com",
    telefono: "+34 665 789 012",
    direccion: "Passeig de Gràcia 85, Barcelona",
    latitud: 41.3904,
    longitud: 2.1640
  },
  {
    nombre: "Ana Martín Fernández",
    email: "ana.martin@gmail.com",
    telefono: "+34 677 345 678",
    direccion: "Calle Larios 8, Málaga",
    latitud: 36.7213,
    longitud: -4.4214
  },
  {
    nombre: "David Sánchez Gil",
    email: "david.sanchez@hotmail.com",
    telefono: "+34 612 456 789",
    direccion: "Plaza del Ayuntamiento 1, Valencia",
    latitud: 39.4700,
    longitud: -0.3774
  },
  {
    nombre: "Laura González Ruiz",
    email: "laura.gonzalez@outlook.com",
    telefono: "+34 654 321 987",
    direccion: "Calle del Arenal 15, Sevilla",
    latitud: 37.3886,
    longitud: -5.9823
  },
  {
    nombre: "Miguel Ángel Torres",
    email: "miguel.torres@empresa.es",
    telefono: "+34 698 765 432",
    direccion: "Rúa do Franco 25, Santiago de Compostela",
    latitud: 42.8805,
    longitud: -8.5456
  },
  {
    nombre: "Carmen Jiménez Morales",
    email: "carmen.jimenez@yahoo.es",
    telefono: "+34 645 234 567",
    direccion: "Calle Betis 47, Sevilla",
    latitud: 37.3838,
    longitud: -5.9973
  },
  {
    nombre: "José Luis Herrera",
    email: "joseluis.herrera@gmail.com",
    telefono: "+34 633 567 890",
    direccion: "Gran Vía de Colón 12, Granada",
    latitud: 37.1809,
    longitud: -3.6009
  },
  {
    nombre: "Isabel Romero Castro",
    email: "isabel.romero@empresa.com",
    telefono: "+34 687 123 456",
    direccion: "Calle Sierpes 65, Sevilla",
    latitud: 37.3927,
    longitud: -5.9973
  },
  {
    nombre: "Antonio Ruiz Delgado",
    email: "antonio.ruiz@hotmail.es",
    telefono: "+34 676 890 123",
    direccion: "Paseo del Prado 28, Madrid",
    latitud: 40.4138,
    longitud: -3.6921
  },
  {
    nombre: "Elena Vázquez Moreno",
    email: "elena.vazquez@gmail.com",
    telefono: "+34 659 456 789",
    direccion: "Rambla de Catalunya 75, Barcelona",
    latitud: 41.3926,
    longitud: 2.1641
  },
  {
    nombre: "Francisco Navarro López",
    email: "francisco.navarro@empresa.es",
    telefono: "+34 642 789 012",
    direccion: "Calle Alcalá 150, Madrid",
    latitud: 40.4254,
    longitud: -3.6731
  },
  {
    nombre: "Pilar Mendoza Ortega",
    email: "pilar.mendoza@outlook.com",
    telefono: "+34 693 234 567",
    direccion: "Avenida de la Constitución 18, Sevilla",
    latitud: 37.3858,
    longitud: -5.9934
  },
  {
    nombre: "Roberto Silva Campos",
    email: "roberto.silva@yahoo.com",
    telefono: "+34 671 567 890",
    direccion: "Calle de Uría 55, Oviedo",
    latitud: 43.3619,
    longitud: -5.8494
  },
  {
    nombre: "Cristina Flores Jiménez",
    email: "cristina.flores@gmail.com",
    telefono: "+34 684 123 456",
    direccion: "Plaza Mayor 15, Salamanca",
    latitud: 40.9701,
    longitud: -5.6635
  },
  {
    nombre: "Alejandro Peña Vargas",
    email: "alejandro.pena@empresa.com",
    telefono: "+34 657 890 123",
    direccion: "Calle Ancha 28, Cádiz",
    latitud: 36.5297,
    longitud: -6.2929
  },
  {
    nombre: "Mónica Guerrero Santos",
    email: "monica.guerrero@hotmail.com",
    telefono: "+34 695 456 789",
    direccion: "Avenida del Cid 85, Valencia",
    latitud: 39.4561,
    longitud: -0.3545
  },
  {
    nombre: "Raúl Medina Álvarez",
    email: "raul.medina@outlook.es",
    telefono: "+34 648 234 567",
    direccion: "Calle Real 142, A Coruña",
    latitud: 43.3623,
    longitud: -8.4115
  },
  {
    nombre: "Beatriz Castro Ramos",
    email: "beatriz.castro@gmail.com",
    telefono: "+34 682 567 890",
    direccion: "Plaza de España 8, Zaragoza",
    latitud: 41.6488,
    longitud: -0.8891
  },
  {
    nombre: "Sergio Molina Herrera",
    email: "sergio.molina@empresa.es",
    telefono: "+34 639 123 456",
    direccion: "Calle Mayor 33, Palma de Mallorca",
    latitud: 39.5696,
    longitud: 2.6502
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Iniciando seeders...');
    
    // Asegurar que la base de datos esté inicializada
    console.log('📋 Verificando base de datos...');
    initDB();
    
    console.log('➕ Agregando clientes de ejemplo...');
    let count = 0;
    
    for (const cliente of clientesEjemplo) {
      try {
        const nuevoCliente = crearCliente(cliente);
        count++;
        console.log(`  ✅ ${count}. ${cliente.nombre} - ${cliente.direccion}`);
      } catch (error) {
        // Si hay error de email duplicado, continuar
        if (error.message.includes('UNIQUE constraint failed')) {
          console.log(`  ⚠️  ${cliente.nombre} ya existe (saltando)`);
        } else {
          console.log(`  ❌ Error creando ${cliente.nombre}: ${error.message}`);
        }
      }
    }
    
    console.log(`\n🎉 Seeders completados!`);
    console.log(`📊 Se agregaron ${count} clientes`);
    console.log(`🗺️  Los clientes están distribuidos por España:`);
    console.log(`   • Madrid (4 clientes)`);
    console.log(`   • Barcelona (2 clientes)`);
    console.log(`   • Sevilla (3 clientes)`);
    console.log(`   • Valencia (2 clientes)`);
    console.log(`   • Otras ciudades (9 clientes)`);
    console.log(`\n🚀 Ejecuta 'npm run dev' para ver los datos en la aplicación`);
    
  } catch (error) {
    console.error('❌ Error ejecutando seeders:', error.message);
    process.exit(1);
  }
}

// Función para limpiar la base de datos
async function resetDatabase() {
  try {
    console.log('🧹 Limpiando base de datos...');
    const { getDB } = await import('../src/lib/database.js');
    const db = getDB();
    
    // Eliminar todos los clientes
    const result = db.prepare('DELETE FROM clientes').run();
    console.log(`🗑️  Eliminados ${result.changes} clientes`);
    
    // Reiniciar el autoincrement
    db.prepare('DELETE FROM sqlite_sequence WHERE name = "clientes"').run();
    console.log('🔄 Contador de ID reiniciado');
    
    console.log('✅ Base de datos limpiada');
  } catch (error) {
    console.error('❌ Error limpiando base de datos:', error.message);
    process.exit(1);
  }
}

// Verificar argumentos de línea de comandos
const args = process.argv.slice(2);

if (args.includes('--reset') || args.includes('-r')) {
  console.log('🔄 Modo reset activado');
  resetDatabase().then(() => seedDatabase());
} else if (args.includes('--clean') || args.includes('-c')) {
  console.log('🧹 Solo limpiar base de datos');
  resetDatabase();
} else {
  // Ejecutar seeders normalmente
  seedDatabase();
}
