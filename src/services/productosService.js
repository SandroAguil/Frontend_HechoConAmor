// src/services/productosService.js

const API_URL = 'https://rest-api-hechoconamor.onrender.com/api/v1/products' // Actualiza si tu backend tiene otra URL

export async function obtenerProductos() {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error('Error al obtener productos')
  return res.json()
}

export async function obtenerProductoPorId(id) {
  const res = await fetch(`${API_URL}/${id}`)
  if (!res.ok) throw new Error('Error al obtener producto')
  return res.json()
}

export async function crearProducto(producto) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  })
  if (!res.ok) throw new Error('Error al crear producto')
  return res.json()
}

export async function actualizarProducto(id, producto) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  })
  if (!res.ok) throw new Error('Error al actualizar producto')
  return res.json()
}

export async function eliminarProducto(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Error al eliminar producto')
}
