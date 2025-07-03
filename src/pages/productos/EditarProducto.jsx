import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  obtenerProductoPorId,
  actualizarProducto
} from '../../services/productosService'

export default function EditarProducto() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    estado: 'Disponible',
    imagen: ''
  })

  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const data = await obtenerProductoPorId(id)
        setProducto(data)
      } catch (error) {
        toast.error('Error al cargar producto')
      }
    }
    cargarProducto()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProducto({ ...producto, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCargando(true)

    try {
      await actualizarProducto(id, producto)
      toast.success('Producto actualizado correctamente')
      navigate('/productos')
    } catch (error) {
      toast.error('Error al actualizar producto')
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-brandPrimary">Editar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="precio"
          placeholder="Precio"
          value={producto.precio}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="text"
          name="stock"
          placeholder="Stock"
          value={producto.stock}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={producto.categoria}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="imagen"
          placeholder="URL de imagen"
          value={producto.imagen}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <select
          name="estado"
          value={producto.estado}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="Disponible">Disponible</option>
          <option value="Agotado">Agotado</option>
        </select>
        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {cargando ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  )
}
