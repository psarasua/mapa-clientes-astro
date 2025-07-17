import { obtenerClientePorId, actualizarCliente, eliminarCliente } from '../../../lib/clienteService.js';

export async function GET({ params }) {
  try {
    const { id } = params;
    const cliente = obtenerClientePorId(parseInt(id));
    
    if (!cliente) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Cliente no encontrado'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: cliente
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Error al obtener cliente',
      details: error.message
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
    const clienteData = await request.json();
    
    const clienteActualizado = actualizarCliente(parseInt(id), clienteData);
    
    if (!clienteActualizado) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Cliente no encontrado'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: clienteActualizado,
      message: 'Cliente actualizado exitosamente'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Error al actualizar cliente',
      details: error.message
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
    const clienteEliminado = eliminarCliente(parseInt(id));
    
    if (!clienteEliminado) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Cliente no encontrado'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    return new Response(JSON.stringify({
      success: true,
      data: clienteEliminado,
      message: 'Cliente eliminado exitosamente'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Error al eliminar cliente',
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
