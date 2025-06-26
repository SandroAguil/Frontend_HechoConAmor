import { useState } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'

export default function Productos() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todos')

  const [productos, setProductos] = useState([
    {
      codigo: 'PROD001',
      nombre: 'Ramo flores amarillas',
      precio: '45.00',
      stock: '10',
      categoria: 'Decoración',
      estado: 'Disponible',
      imagen: 'https://i.imgur.com/kPIqtFP.jpeg'
    }
  ])

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    estado: 'Disponible',
    imagen: ''
  })

  const productosFiltrados = productos.filter((prod) => {
    const coincideBusqueda =
      prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      prod.categoria.toLowerCase().includes(busqueda.toLowerCase())

    const coincideEstado = filtro === 'Todos' || prod.estado === filtro

    return coincideBusqueda && coincideEstado
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNuevoProducto({ ...nuevoProducto, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const codigo = `PROD${(productos.length + 1).toString().padStart(3, '0')}`
    setProductos([...productos, { ...nuevoProducto, codigo }])
    setNuevoProducto({
      nombre: '',
      precio: '',
      stock: '',
      categoria: '',
      estado: 'Disponible',
      imagen: ''
    })
    setMostrarFormulario(false)

    toast.success('Producto agregado correctamente')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-4xl font-bold text-brandPrimary">Productos</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-pastelPink text-gray-800 rounded-lg shadow hover:bg-pastelBlue transition"
          onClick={() => setMostrarFormulario(true)}
        >
          <FaPlus />
          Agregar Producto
        </button>
      </div>

      {/* Filtro y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre o categoría"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full sm:w-1/2 p-2 border rounded-lg shadow"
        />
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full sm:w-1/4 p-2 border rounded-lg shadow"
        >
          <option value="Todos">Todos</option>
          <option value="Disponible">Disponible</option>
          <option value="Agotado">Agotado</option>
        </select>
      </div>

      {/* Tabla */}
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
            {productosFiltrados.map((prod, i) => (
              <tr key={i} className="border-b hover:bg-pastelMint transition">
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
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {mostrarFormulario && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-brandPrimary">Nuevo Producto</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="nombre"
                  value={nuevoProducto.nombre}
                  onChange={handleChange}
                  placeholder="Nombre"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="precio"
                  value={nuevoProducto.precio}
                  onChange={handleChange}
                  placeholder="Precio"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="stock"
                  value={nuevoProducto.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="categoria"
                  value={nuevoProducto.categoria}
                  onChange={handleChange}
                  placeholder="Categoría"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="imagen"
                  value={nuevoProducto.imagen}
                  onChange={handleChange}
                  placeholder="URL de la imagen"
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  name="estado"
                  value={nuevoProducto.estado}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="Disponible">Disponible</option>
                  <option value="Agotado">Agotado</option>
                </select>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setMostrarFormulario(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="px-4 py-2 bg-pastelBlue rounded hover:bg-pastelMint">
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
