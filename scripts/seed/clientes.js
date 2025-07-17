import { initDB, closeDB } from '../../src/lib/database.js';
import { crearCliente, obtenerClientes } from '../../src/lib/clienteService.js';

console.log('👥 Iniciando seeders para clientes...');

const clientesEjemplo = [
  {
    nombre: "Juan Pérez",
    email: "juan.perez@email.com",
    telefono: "+52 555 1234567",
    direccion: "Av. Insurgentes Sur 123, Ciudad de México",
    latitud: 19.432608,
    longitud: -99.133209
  },
  {
    nombre: "María González",
    email: "maria.gonzalez@email.com", 
    telefono: "+52 555 2345678",
    direccion: "Calle Madero 456, Centro Histórico, CDMX",
    latitud: 19.434553,
    longitud: -99.141273
  },
  {
    nombre: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    telefono: "+52 555 3456789",
    direccion: "Paseo de la Reforma 789, Zona Rosa, CDMX",
    latitud: 19.424649,
    longitud: -99.170516
  },
  {
    nombre: "Ana Martínez",
    email: "ana.martinez@email.com",
    telefono: "+52 555 4567890",
    direccion: "Av. Universidad 321, Coyoacán, CDMX",
    latitud: 19.335176,
    longitud: -99.162003
  },
  {
    nombre: "Luis Hernández",
    email: "luis.hernandez@email.com",
    telefono: "+52 555 5678901",
    direccion: "Calzada de Tlalpan 654, Del Valle, CDMX",
    latitud: 19.378835,
    longitud: -99.163132
  },
  {
    nombre: "Carmen López",
    email: "carmen.lopez@email.com",
    telefono: "+52 555 6789012",
    direccion: "Av. Revolución 987, San Ángel, CDMX",
    latitud: 19.346319,
    longitud: -99.187012
  },
  {
    nombre: "Roberto Silva",
    email: "roberto.silva@email.com",
    telefono: "+52 555 7890123",
    direccion: "Polanco 147, Miguel Hidalgo, CDMX",
    latitud: 19.433054,
    longitud: -99.191761
  },
  {
    nombre: "Patricia Morales",
    email: "patricia.morales@email.com",
    telefono: "+52 555 8901234",
    direccion: "Av. Patriotismo 258, Mixcoac, CDMX",
    latitud: 19.376668,
    longitud: -99.187927
  }
];

try {
  // Verificar conexión a base de datos
  console.log('📋 Verificando base de datos...');
  initDB();
  
  // Verificar si ya existen clientes
  const clientesExistentes = obtenerClientes();
  if (clientesExistentes.length > 0) {
    console.log('⚠️  Ya existen clientes en la base de datos');
    console.log(`📊 Total actual: ${clientesExistentes.length} clientes`);
    console.log('🚀 Usa la API para gestionar clientes o borra la base de datos para empezar de nuevo');
    process.exit(0);
  }
  
  console.log('➕ Agregando clientes de ejemplo...');
  
  let contador = 0;
  for (const cliente of clientesEjemplo) {
    try {
      const nuevoCliente = crearCliente(cliente);
      contador++;
      console.log(`  ✅ ${contador}. Cliente ${nuevoCliente.nombre} (ID: ${nuevoCliente.id})`);
    } catch (error) {
      console.log(`  ❌ Error agregando cliente ${cliente.nombre}:`, error.message);
    }
  }
  
  console.log('🎉 Seeders de clientes completados!');
  console.log(`📊 Se agregaron ${contador} clientes de ${clientesEjemplo.length} intentos`);
  console.log('👥 Clientes agregados con ubicaciones en Ciudad de México');
  console.log('🗺️ Todos los clientes tienen coordenadas para mostrar en mapa');
  console.log('🚀 Ejecuta pruebas con: curl http://localhost:4321/api/clientes');

} catch (error) {
  console.error('❌ Error en seeders de clientes:', error);
  process.exit(1);
} finally {
  closeDB();
}
