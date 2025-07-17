import { buscarClientesCercanos } from '../../../lib/clienteService.js';

export async function GET({ url }) {
  try {
    const searchParams = new URL(url).searchParams;
    const latitud = parseFloat(searchParams.get('lat'));
    const longitud = parseFloat(searchParams.get('lng'));
    const radio = parseFloat(searchParams.get('radio')) || 10;
    
    if (isNaN(latitud) || isNaN(longitud)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Latitud y longitud son requeridas y deben ser números válidos'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    const clientesCercanos = buscarClientesCercanos(latitud, longitud, radio);
    
    return new Response(JSON.stringify({
      success: true,
      data: clientesCercanos,
      meta: {
        total: clientesCercanos.length,
        radio: radio,
        centro: { latitud, longitud }
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Error al buscar clientes cercanos',
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
