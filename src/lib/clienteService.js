import { executeQuery } from './database.js';

// Obtener todos los clientes
export function obtenerClientes() {
  try {
    const result = executeQuery(`
      SELECT id, nombre, email, telefono, direccion, latitud, longitud,
             fecha_creacion, fecha_actualizacion 
      FROM clientes 
      ORDER BY fecha_creacion DESC
    `);
    return result.rows;
  } catch (error) {
    console.error('Error obteniendo clientes:', error);
    throw error;
  }
}

// Obtener cliente por ID
export function obtenerClientePorId(id) {
  try {
    const result = executeQuery(
      'SELECT * FROM clientes WHERE id = ?',
      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error obteniendo cliente por ID:', error);
    throw error;
  }
}

// Crear nuevo cliente
export function crearCliente(cliente) {
  try {
    const { nombre, email, telefono, direccion, latitud, longitud } = cliente;
    
    const result = executeQuery(`
      INSERT INTO clientes (nombre, email, telefono, direccion, latitud, longitud)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [nombre, email, telefono, direccion, latitud, longitud]);
    
    return result.rows[0];
  } catch (error) {
    console.error('Error creando cliente:', error);
    throw error;
  }
}

// Actualizar cliente
export function actualizarCliente(id, cliente) {
  try {
    const { nombre, email, telefono, direccion, latitud, longitud } = cliente;
    
    executeQuery(`
      UPDATE clientes 
      SET nombre = ?, email = ?, telefono = ?, direccion = ?, 
          latitud = ?, longitud = ?, fecha_actualizacion = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [nombre, email, telefono, direccion, latitud, longitud, id]);
    
    return obtenerClientePorId(id);
  } catch (error) {
    console.error('Error actualizando cliente:', error);
    throw error;
  }
}

// Eliminar cliente
export function eliminarCliente(id) {
  try {
    const cliente = obtenerClientePorId(id);
    
    if (cliente) {
      executeQuery('DELETE FROM clientes WHERE id = ?', [id]);
    }
    
    return cliente;
  } catch (error) {
    console.error('Error eliminando cliente:', error);
    throw error;
  }
}

// Buscar clientes cercanos usando fórmula de haversine
export function buscarClientesCercanos(latitud, longitud, radio = 10) {
  try {
    const result = executeQuery(`
      SELECT *, 
        (6371 * acos(
          cos(radians(?)) * cos(radians(latitud)) * 
          cos(radians(longitud) - radians(?)) + 
          sin(radians(?)) * sin(radians(latitud))
        )) AS distancia
      FROM clientes 
      WHERE latitud IS NOT NULL AND longitud IS NOT NULL
      ORDER BY distancia ASC
    `, [latitud, longitud, latitud]);
    
    // Filtrar por radio
    const clientesCercanos = result.rows.filter(cliente => cliente.distancia <= radio);
    
    return clientesCercanos;
  } catch (error) {
    console.error('Error buscando clientes cercanos:', error);
    throw error;
  }
}
