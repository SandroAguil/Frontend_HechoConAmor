const BASE_URL = 'https://rest-api-hechoconamor.onrender.com/api/v1/products'

export async function obtenerProductos() {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error('Error al obtener productos')
  return await res.json()
}

export async function crearProducto(producto) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  })

  const data = await res.json()

  if (!res.ok) throw new Error(data.message || 'Error al crear producto')
  return data
}

export async function eliminarProductoPorId(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) throw new Error(data.message || 'Error al eliminar producto')
  return true
}

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

export async function obtenerProductoPorId(id) {
  const res = await fetch(`${BASE_URL}/id/${id}`)

  const data = await res.json()

  if (!res.ok) throw new Error(data.message || 'Error al obtener producto por ID')
  return data
}
