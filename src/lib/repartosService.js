import { executeQuery } from './database.js';

// Obtener todos los repartos
export function obtenerRepartos() {
  try {
    const repartos = executeQuery(`
      SELECT r.id, r.camion_id, r.dia_entrega_id, r.created_at, r.updated_at,
             c.descripcion as camion_nombre,
             d.descripcion as dia_nombre
      FROM repartos r
      LEFT JOIN camiones c ON r.camion_id = c.id
      LEFT JOIN diasEntrega d ON r.dia_entrega_id = d.id
      ORDER BY r.id ASC
    `);
    
    // Manejar respuesta de la base de datos
    const result = repartos?.rows || repartos || [];
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error('Error obteniendo repartos:', error);
    throw error;
  }
}

// Obtener reparto por ID
export function obtenerRepartoPorId(id) {
  try {
    const reparto = executeQuery(`
      SELECT r.id, r.camion_id, r.dia_entrega_id, r.created_at, r.updated_at,
             c.descripcion as camion_nombre,
             d.descripcion as dia_nombre
      FROM repartos r
      LEFT JOIN camiones c ON r.camion_id = c.id
      LEFT JOIN diasEntrega d ON r.dia_entrega_id = d.id
      WHERE r.id = ?
    `, [id]);
    
    // Manejar respuesta de la base de datos
    const result = reparto?.rows || reparto || [];
    return Array.isArray(result) ? result[0] : result;
  } catch (error) {
    console.error('Error obteniendo reparto por ID:', error);
    throw error;
  }
}

// Crear nuevo reparto
export function crearReparto(reparto) {
  try {
    const { camion_id, dia_entrega_id } = reparto;
    
    executeQuery(`
      INSERT INTO repartos (camion_id, dia_entrega_id)
      VALUES (?, ?)
    `, [camion_id, dia_entrega_id]);
    
    const nuevoReparto = executeQuery(`
      SELECT r.id, r.camion_id, r.dia_entrega_id, r.created_at, r.updated_at,
             c.descripcion as camion_nombre,
             d.descripcion as dia_nombre
      FROM repartos r
      LEFT JOIN camiones c ON r.camion_id = c.id
      LEFT JOIN diasEntrega d ON r.dia_entrega_id = d.id
      ORDER BY r.id DESC 
      LIMIT 1
    `);
    
    // Manejar respuesta de la base de datos
    const result = nuevoReparto?.rows || nuevoReparto || [];
    return Array.isArray(result) ? result[0] : result;
  } catch (error) {
    console.error('Error creando reparto:', error);
    throw error;
  }
}

// Actualizar reparto
export function actualizarReparto(id, reparto) {
  try {
    const { camion_id, dia_entrega_id } = reparto;
    
    executeQuery(`
      UPDATE repartos 
      SET camion_id = ?, dia_entrega_id = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [camion_id, dia_entrega_id, id]);
    
    return obtenerRepartoPorId(id);
  } catch (error) {
    console.error('Error actualizando reparto:', error);
    throw error;
  }
}

// Eliminar reparto
export function eliminarReparto(id) {
  try {
    const reparto = obtenerRepartoPorId(id);
    
    if (reparto) {
      executeQuery('DELETE FROM repartos WHERE id = ?', [id]);
    }
    
    return reparto;
  } catch (error) {
    console.error('Error eliminando reparto:', error);
    throw error;
  }
}

// Obtener repartos por camión
export function obtenerRepartosPorCamion(camionId) {
  try {
    const repartos = executeQuery(`
      SELECT r.id, r.camion_id, r.dia_entrega_id, r.created_at, r.updated_at,
             c.descripcion as camion_nombre,
             d.descripcion as dia_nombre
      FROM repartos r
      LEFT JOIN camiones c ON r.camion_id = c.id
      LEFT JOIN diasEntrega d ON r.dia_entrega_id = d.id
      WHERE r.camion_id = ?
      ORDER BY r.id ASC
    `, [camionId]);
    
    // Manejar respuesta de la base de datos
    const result = repartos?.rows || repartos || [];
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error('Error obteniendo repartos por camión:', error);
    throw error;
  }
}

// Obtener repartos por día de entrega
export function obtenerRepartosPorDia(diaId) {
  try {
    const repartos = executeQuery(`
      SELECT r.id, r.camion_id, r.dia_entrega_id, r.created_at, r.updated_at,
             c.descripcion as camion_nombre,
             d.descripcion as dia_nombre
      FROM repartos r
      LEFT JOIN camiones c ON r.camion_id = c.id
      LEFT JOIN diasEntrega d ON r.dia_entrega_id = d.id
      WHERE r.dia_entrega_id = ?
      ORDER BY r.id ASC
    `, [diaId]);
    
    // Manejar respuesta de la base de datos
    const result = repartos?.rows || repartos || [];
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.error('Error obteniendo repartos por día:', error);
    throw error;
  }
}
