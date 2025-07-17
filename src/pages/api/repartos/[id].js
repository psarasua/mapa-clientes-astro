import { 
  obtenerRepartoPorId, 
  actualizarReparto, 
  eliminarReparto 
} from '../../../lib/repartosService.js';

export async function GET({ params }) {
  try {
    const { id } = params;
    const reparto = obtenerRepartoPorId(parseInt(id));

    if (!reparto) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Reparto no encontrado'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      data: reparto
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error en GET /api/repartos/[id]:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Error obteniendo reparto'
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
    const reparto = await request.json();

    // Validar datos requeridos
    if (!reparto.camion_id || !reparto.dia_entrega_id) {
      return new Response(JSON.stringify({
        success: false,
        error: 'camion_id y dia_entrega_id son requeridos'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const repartoActualizado = actualizarReparto(parseInt(id), reparto);

    if (!repartoActualizado) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Reparto no encontrado'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      data: repartoActualizado
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error en PUT /api/repartos/[id]:', error);
    
    // Manejar error de constraint UNIQUE
    if (error.message && error.message.includes('UNIQUE constraint failed')) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Ya existe un reparto para este camión en este día'
      }), {
        status: 409,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Error actualizando reparto'
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
    const repartoEliminado = eliminarReparto(parseInt(id));

    if (!repartoEliminado) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Reparto no encontrado'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      data: repartoEliminado
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error en DELETE /api/repartos/[id]:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Error eliminando reparto'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
