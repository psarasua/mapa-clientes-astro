import { obtenerDiasEntrega, obtenerDiaEntregaPorId, crearDiaEntrega } from '../../lib/diasEntregaService.js';

export async function GET(request) {
  try {
    const diasEntrega = obtenerDiasEntrega();
    
    return new Response(JSON.stringify({
      success: true,
      data: diasEntrega,
      message: 'Días de entrega obtenidos exitosamente'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error obteniendo días de entrega:', error);
    
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

export async function POST(request) {
  try {
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
    
    const nuevoDiaEntrega = crearDiaEntrega(data);
    
    return new Response(JSON.stringify({
      success: true,
      data: nuevoDiaEntrega,
      message: 'Día de entrega creado exitosamente'
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error creando día de entrega:', error);
    
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
