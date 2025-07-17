import { 
  obtenerRepartos, 
  crearReparto, 
  obtenerRepartosPorCamion,
  obtenerRepartosPorDia 
} from '../../lib/repartosService.js';

export async function GET({ url }) {
  try {
    const searchParams = new URL(url).searchParams;
    const camionId = searchParams.get('camion_id');
    const diaId = searchParams.get('dia_id');

    let repartos;
    
    if (camionId) {
      repartos = obtenerRepartosPorCamion(parseInt(camionId));
    } else if (diaId) {
      repartos = obtenerRepartosPorDia(parseInt(diaId));
    } else {
      repartos = obtenerRepartos();
    }

    return new Response(JSON.stringify({
      success: true,
      data: repartos
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error en GET /api/repartos:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Error obteniendo repartos'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function POST({ request }) {
  try {
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

    const nuevoReparto = crearReparto(reparto);

    return new Response(JSON.stringify({
      success: true,
      data: nuevoReparto
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error en POST /api/repartos:', error);
    
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
      error: 'Error creando reparto'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
