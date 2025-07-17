import { obtenerClientes, crearCliente } from '../../lib/clienteService.js';

export async function GET({ request }) {
  try {
    const clientes = obtenerClientes();
    
    return new Response(JSON.stringify({
      success: true,
      data: clientes
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Error al obtener clientes',
      details: error.message
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
    const clienteData = await request.json();
    
    // Validación básica
    if (!clienteData.nombre || clienteData.nombre.trim() === '') {
      return new Response(JSON.stringify({
        success: false,
        error: 'El nombre es requerido'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const nuevoCliente = crearCliente(clienteData);
    
    return new Response(JSON.stringify({
      success: true,
      data: nuevoCliente,
      message: 'Cliente creado exitosamente'
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Error al crear cliente',
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
