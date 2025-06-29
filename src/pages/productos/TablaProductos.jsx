import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function TablaProductos({
  productos,
  busqueda,
  filtro,
  setIdAEliminar,
  setMostrarConfirmacion
}) {
  const productosFiltrados = productos.filter((prod) => {
    const coincideBusqueda =
      prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      prod.categoria.toLowerCase().includes(busqueda.toLowerCase())
    const coincideEstado = filtro === 'Todos' || prod.estado === filtro
    return coincideBusqueda && coincideEstado
  })

  return (
    <div className="overflow-x-auto shadow rounded-xl">
      <table className="min-w-full bg-white text-sm rounded-xl">
        <thead className="bg-pastelLavender text-gray-700">
          <tr>
            <th className="text-left px-4 py-3">Imagen</th>
            <th className="text-left px-4 py-3">Código</th>
            <th className="text-left px-4 py-3">Nombre</th>
            <th className="text-left px-4 py-3">Precio</th>
            <th className="text-left px-4 py-3">Stock</th>
            <th className="text-left px-4 py-3">Categoría</th>
            <th className="text-left px-4 py-3">Estado</th>
            <th className="text-center px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((prod) => (
            <tr key={prod.id} className="border-b hover:bg-pastelMint transition">
              <td className="px-4 py-3">
                <img
                  src={prod.imagen}
                  alt={prod.nombre}
                  className="w-12 h-12 object-cover rounded shadow"
                />
              </td>
              <td className="px-4 py-3">{prod.codigo}</td>
              <td className="px-4 py-3">{prod.nombre}</td>
              <td className="px-4 py-3">S/ {prod.precio}</td>
              <td className="px-4 py-3">{prod.stock}</td>
              <td className="px-4 py-3">{prod.categoria}</td>
              <td className="px-4 py-3">{prod.estado}</td>
              <td className="px-4 py-3 text-center flex justify-center gap-3">
                <Link
                  to={`/productos/editar/${prod.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </Link>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => {
                    setIdAEliminar(prod.id)
                    setMostrarConfirmacion(true)
                  }}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}

          {productosFiltrados.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center py-6 text-gray-500">
                No se encontraron productos que coincidan con la búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
