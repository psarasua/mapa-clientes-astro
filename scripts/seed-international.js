import { crearCliente } from '../src/lib/clienteService.js';
import { initDB } from '../src/lib/database.js';

// Datos de ejemplo internacionales
const clientesInternacionales = [
  {
    nombre: "John Smith",
    email: "john.smith@company.com",
    telefono: "+1 555 123 4567",
    direccion: "123 Broadway, New York, NY, USA",
    latitud: 40.7589,
    longitud: -73.9851
  },
  {
    nombre: "Marie Dubois",
    email: "marie.dubois@entreprise.fr",
    telefono: "+33 1 42 86 83 26",
    direccion: "15 Avenue des Champs-Élysées, Paris, France",
    latitud: 48.8698,
    longitud: 2.3075
  },
  {
    nombre: "Giuseppe Rossi",
    email: "giuseppe.rossi@azienda.it",
    telefono: "+39 06 6782 1234",
    direccion: "Via del Corso 45, Roma, Italia",
    latitud: 41.9028,
    longitud: 12.4964
  },
  {
    nombre: "Hans Mueller",
    email: "hans.mueller@unternehmen.de",
    telefono: "+49 30 12345678",
    direccion: "Unter den Linden 77, Berlin, Germany",
    latitud: 52.5170,
    longitud: 13.3888
  },
  {
    nombre: "Yuki Tanaka",
    email: "yuki.tanaka@kaisha.jp",
    telefono: "+81 3 1234 5678",
    direccion: "1-1-1 Shibuya, Tokyo, Japan",
    latitud: 35.6762,
    longitud: 139.6503
  },
  {
    nombre: "Sarah Johnson",
    email: "sarah.johnson@company.co.uk",
    telefono: "+44 20 7946 0958",
    direccion: "10 Downing Street, London, UK",
    latitud: 51.5034,
    longitud: -0.1276
  },
  {
    nombre: "Carlos Silva",
    email: "carlos.silva@empresa.com.br",
    telefono: "+55 11 9876 5432",
    direccion: "Avenida Paulista 1578, São Paulo, Brasil",
    latitud: -23.5505,
    longitud: -46.6333
  },
  {
    nombre: "Ahmed Hassan",
    email: "ahmed.hassan@company.ae",
    telefono: "+971 4 123 4567",
    direccion: "Dubai Marina, Dubai, UAE",
    latitud: 25.2048,
    longitud: 55.2708
  },
  {
    nombre: "Anna Kowalski",
    email: "anna.kowalski@firma.pl",
    telefono: "+48 22 123 45 67",
    direccion: "Plac Zamkowy 4, Warsaw, Poland",
    latitud: 52.2297,
    longitud: 21.0122
  },
  {
    nombre: "Pedro Morales",
    email: "pedro.morales@empresa.mx",
    telefono: "+52 55 1234 5678",
    direccion: "Paseo de la Reforma 222, Ciudad de México, México",
    latitud: 19.4326,
    longitud: -99.1332
  }
];

async function seedInternational() {
  try {
    console.log('🌍 Iniciando seeders internacionales...');
    
    // Asegurar que la base de datos esté inicializada
    console.log('📋 Verificando base de datos...');
    initDB();
    
    console.log('🌐 Agregando clientes internacionales...');
    let count = 0;
    
    for (const cliente of clientesInternacionales) {
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
    
    console.log(`\n🎉 Seeders internacionales completados!`);
    console.log(`📊 Se agregaron ${count} clientes internacionales`);
    console.log(`🌍 Clientes distribuidos globalmente:`);
    console.log(`   • América del Norte (2 clientes)`);
    console.log(`   • Europa (4 clientes)`);
    console.log(`   • Asia (1 cliente)`);
    console.log(`   • América del Sur (1 cliente)`);
    console.log(`   • Medio Oriente (1 cliente)`);
    console.log(`   • Europa del Este (1 cliente)`);
    console.log(`\n🗺️  Perfecto para probar búsquedas geográficas globales`);
    
  } catch (error) {
    console.error('❌ Error ejecutando seeders internacionales:', error.message);
    process.exit(1);
  }
}

seedInternational();
