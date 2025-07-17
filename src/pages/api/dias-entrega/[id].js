import { obtenerDiaEntregaPorId, actualizarDiaEntrega, eliminarDiaEntrega } from '../../../lib/diasEntregaService.js';

export async function GET({ params }) {
  try {
    const { id } = params;
    const diaEntrega = obtenerDiaEntregaPorId(parseInt(id));
    
    if (!diaEntrega) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Día de entrega no encontrado'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: diaEntrega,
      message: 'Día de entrega obtenido exitosamente'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error obteniendo día de entrega:', error);
    
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
    
    // Validar que se incluya la descripción
    if (!data.descripcion) {
      return new Response(JSON.stringify({
        success: false,
        error: 'La descripción es requerida'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    const diaEntregaActualizado = actualizarDiaEntrega(parseInt(id), data);
    
    if (!diaEntregaActualizado) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Día de entrega no encontrado'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: diaEntregaActualizado,
      message: 'Día de entrega actualizado exitosamente'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error actualizando día de entrega:', error);
    
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
    const diaEntregaEliminado = eliminarDiaEntrega(parseInt(id));
    
    if (!diaEntregaEliminado) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Día de entrega no encontrado'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: diaEntregaEliminado,
      message: 'Día de entrega eliminado exitosamente'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error eliminando día de entrega:', error);
    
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
