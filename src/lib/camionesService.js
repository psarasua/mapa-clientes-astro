import { executeQuery } from './database.js';

// === FUNCIONES PARA CAMIONES ===

// Obtener todos los camiones
export function obtenerCamiones() {
  try {
    const result = executeQuery(`
      SELECT id, descripcion as nombre, created_at as fecha_creacion, updated_at as fecha_actualizacion
      FROM camiones 
      ORDER BY id ASC
    `);
    return result.rows;
  } catch (error) {
    console.error('Error obteniendo camiones:', error);
    throw error;
  }
}

// Obtener camión por ID
export function obtenerCamionPorId(id) {
  try {
    const result = executeQuery(
      'SELECT * FROM camiones WHERE id = ?',
      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error obteniendo camión por ID:', error);
    throw error;
  }
}

// Crear nuevo camión
export function crearCamion(camion) {
  try {
    const { nombre } = camion;
    
    executeQuery(`
      INSERT INTO camiones (descripcion)
      VALUES (?)
    `, [nombre]);
    
    const nuevoCamion = executeQuery(`
      SELECT id, descripcion as nombre, created_at, updated_at 
      FROM camiones 
      ORDER BY id DESC 
      LIMIT 1
    `);
    
    return Array.isArray(nuevoCamion) ? nuevoCamion[0] : nuevoCamion;
  } catch (error) {
    console.error('Error creando camión:', error);
    throw error;
  }
}

// Actualizar camión
export function actualizarCamion(id, camion) {
  try {
    const { nombre } = camion;
    
    executeQuery(`
      UPDATE camiones 
      SET descripcion = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [nombre, id]);
    
    return obtenerCamionPorId(id);
  } catch (error) {
    console.error('Error actualizando camión:', error);
    throw error;
  }
}

// Eliminar camión
export function eliminarCamion(id) {
  try {
    const camion = obtenerCamionPorId(id);
    
    if (camion) {
      executeQuery('DELETE FROM camiones WHERE id = ?', [id]);
    }
    
    return camion;
  } catch (error) {
    console.error('Error eliminando camión:', error);
    throw error;
  }
}
