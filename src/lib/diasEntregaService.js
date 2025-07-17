import { executeQuery } from './database.js';

// === FUNCIONES PARA DÍAS DE ENTREGA ===

// Obtener todos los días de entrega
export function obtenerDiasEntrega() {
  try {
    const result = executeQuery(`
      SELECT id, descripcion, fecha_creacion, fecha_actualizacion
      FROM diasEntrega 
      ORDER BY id ASC
    `);
    return result.rows;
  } catch (error) {
    console.error('Error obteniendo días de entrega:', error);
    throw error;
  }
}

// Obtener día de entrega por ID
export function obtenerDiaEntregaPorId(id) {
  try {
    const result = executeQuery(
      'SELECT * FROM diasEntrega WHERE id = ?',
      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error obteniendo día de entrega por ID:', error);
    throw error;
  }
}

// Crear nuevo día de entrega
export function crearDiaEntrega(diaEntrega) {
  try {
    const { descripcion } = diaEntrega;
    
    const result = executeQuery(`
      INSERT INTO diasEntrega (descripcion)
      VALUES (?)
    `, [descripcion]);
    
    return result.rows[0];
  } catch (error) {
    console.error('Error creando día de entrega:', error);
    throw error;
  }
}

// Actualizar día de entrega
export function actualizarDiaEntrega(id, diaEntrega) {
  try {
    const { descripcion } = diaEntrega;
    
    executeQuery(`
      UPDATE diasEntrega 
      SET descripcion = ?, fecha_actualizacion = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [descripcion, id]);
    
    return obtenerDiaEntregaPorId(id);
  } catch (error) {
    console.error('Error actualizando día de entrega:', error);
    throw error;
  }
}

// Eliminar día de entrega
export function eliminarDiaEntrega(id) {
  try {
    const diaEntrega = obtenerDiaEntregaPorId(id);
    
    if (diaEntrega) {
      executeQuery('DELETE FROM diasEntrega WHERE id = ?', [id]);
    }
    
    return diaEntrega;
  } catch (error) {
    console.error('Error eliminando día de entrega:', error);
    throw error;
  }
}
