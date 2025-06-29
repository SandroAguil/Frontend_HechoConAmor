import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function EditarProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    const productos = JSON.parse(localStorage.getItem('productos')) || []
    const productoEncontrado = productos.find(p => p.id === Number(id))

    if (!productoEncontrado) {
      toast.error('Producto no encontrado.')
      navigate('/productos')
    } else {
      setProducto(productoEncontrado)
    }
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProducto({ ...producto, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setCargando(true)

    const productos = JSON.parse(localStorage.getItem('productos')) || []
    const actualizados = productos.map(p =>
      p.id === producto.id ? producto : p
    )

    localStorage.setItem('productos', JSON.stringify(actualizados))

    setTimeout(() => {
      toast.success('Producto actualizado correctamente.')
      navigate('/productos')
    }, 1000)
  }

  if (!producto) return null

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded-xl mt-10">
      <h1 className="text-3xl font-bold text-brandPrimary mb-6">Editar Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} placeholder="Nombre" className="w-full p-2 border rounded" required />
        <input type="number" name="precio" value={producto.precio} onChange={handleChange} placeholder="Precio" className="w-full p-2 border rounded" required />
        <input type="number" name="stock" value={producto.stock} onChange={handleChange} placeholder="Stock" className="w-full p-2 border rounded" required />
        <input type="text" name="categoria" value={producto.categoria} onChange={handleChange} placeholder="Categoría" className="w-full p-2 border rounded" required />
        <input type="text" name="imagen" value={producto.imagen} onChange={handleChange} placeholder="URL de la imagen" className="w-full p-2 border rounded" required />
        <select name="estado" value={producto.estado} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="Disponible">Disponible</option>
          <option value="Agotado">Agotado</option>
        </select>
        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate('/productos')} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2 justify-center"
            disabled={cargando}
          >
            {cargando && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {cargando ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  )
}
