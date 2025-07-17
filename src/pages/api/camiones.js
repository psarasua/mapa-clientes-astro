import { obtenerCamiones, crearCamion } from '../../lib/camionesService.js';

export async function GET(request) {
  try {
    const camiones = obtenerCamiones();
    
    return new Response(JSON.stringify({
      success: true,
      data: camiones,
      message: 'Camiones obtenidos exitosamente'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error obteniendo camiones:', error);
    
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
    
    const nuevoCamion = crearCamion(data);
    
    return new Response(JSON.stringify({
      success: true,
      data: nuevoCamion,
      message: 'Camión creado exitosamente'
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error creando camión:', error);
    
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
