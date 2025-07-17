import { obtenerCamionPorId, actualizarCamion, eliminarCamion } from '../../../lib/camionesService.js';

export async function GET({ params }) {
  try {
    const { id } = params;
    const camion = obtenerCamionPorId(parseInt(id));
    
    if (!camion) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Camión no encontrado'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: camion,
      message: 'Camión obtenido exitosamente'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error obteniendo camión:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Error interno del servidor'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function PUT({ params, request }) {
  try {
    const { id } = params;
    const data = await request.json();
    
    // Validar que se incluya el nombre
    if (!data.nombre) {
      return new Response(JSON.stringify({
        success: false,
        error: 'El nombre del camión es requerido'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    const camionActualizado = actualizarCamion(parseInt(id), data);
    
    if (!camionActualizado) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Camión no encontrado'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: camionActualizado,
      message: 'Camión actualizado exitosamente'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error actualizando camión:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Error interno del servidor'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function DELETE({ params }) {
  try {
    const { id } = params;
    const camionEliminado = eliminarCamion(parseInt(id));
    
    if (!camionEliminado) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Camión no encontrado'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: camionEliminado,
      message: 'Camión eliminado exitosamente'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error eliminando camión:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Error interno del servidor'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
