const BASE_URL = 'https://rest-api-hechoconamor.onrender.com/api/v1/products'

// Obtener todos los productos
export async function obtenerProductos() {
  const res = await fetch(BASE_URL)
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Error al obtener productos')
  }

  return data
}

// Luego vienen las funciones
export async function crearProducto(producto) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Error al crear producto');
  }

  return data;
}

// Eliminar producto por ID
export async function eliminarProductoPorId(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) throw new Error('Error al eliminar producto')
  return true
}

// Actualizar producto por ID
export async function actualizarProducto(id, productoActualizado) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productoActualizado),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Error al actualizar producto')
  return data
}

// Obtener producto por ID
export async function obtenerProductoPorId(id) {
  const res = await fetch(`${BASE_URL}/id/${id}`)
  const data = await res.json()

  if (!res.ok) throw new Error(data.message || 'Error al obtener producto')
  return data
}
