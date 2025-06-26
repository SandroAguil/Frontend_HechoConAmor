import { useState } from 'react'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify' // ✅ Importación para notificación

export default function Insumos() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todos')

  const [insumos, setInsumos] = useState([
    {
      codigo: 'INS001',
      nombre: 'Lana rosada',
      unidad: 'metros',
      stock: 30,
      estado: 'Suficiente'
    },
    {
      codigo: 'INS002',
      nombre: 'Hilo blanco',
      unidad: 'rollos',
      stock: 3,
      estado: 'Bajo'
    }
  ])

  const [nuevoInsumo, setNuevoInsumo] = useState({
    nombre: '',
    unidad: '',
    stock: '',
    estado: 'Suficiente'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNuevoInsumo({ ...nuevoInsumo, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const codigo = `INS${(insumos.length + 1).toString().padStart(3, '0')}`
    setInsumos([...insumos, { ...nuevoInsumo, codigo }])
    setNuevoInsumo({ nombre: '', unidad: '', stock: '', estado: 'Suficiente' })
    setMostrarFormulario(false)

    // ✅ Notificación profesional igual a otros módulos
    toast.success('Insumo agregado correctamente')
  }

  const filtrados = insumos.filter((i) => {
    const coincideBusqueda =
      i.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      i.codigo.toLowerCase().includes(busqueda.toLowerCase())

    const coincideEstado = filtro === 'Todos' || i.estado === filtro

    return coincideBusqueda && coincideEstado
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-4xl font-bold text-brandPrimary">Insumos</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-pastelPink text-gray-800 rounded-lg shadow hover:bg-pastelBlue transition"
          onClick={() => setMostrarFormulario(true)}
        >
          <FaPlus />
          Registrar Insumo
        </button>
      </div>

      {/* Filtro y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre o código"
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
          <option value="Suficiente">Suficiente</option>
          <option value="Bajo">Bajo</option>
          <option value="Sin stock">Sin stock</option>
        </select>
      </div>

      {/* Tabla de insumos */}
      <div className="overflow-x-auto shadow rounded-xl">
        <table className="min-w-full bg-white text-sm rounded-xl">
          <thead className="bg-pastelPink text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Código</th>
              <th className="text-left px-4 py-3">Insumo</th>
              <th className="text-left px-4 py-3">Unidad</th>
              <th className="text-left px-4 py-3">Stock</th>
              <th className="text-left px-4 py-3">Estado</th>
              <th className="text-center px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((insumo, i) => (
              <tr key={i} className="border-b hover:bg-pastelCream transition">
                <td className="px-4 py-3">{insumo.codigo}</td>
                <td className="px-4 py-3">{insumo.nombre}</td>
                <td className="px-4 py-3">{insumo.unidad}</td>
                <td className="px-4 py-3">{insumo.stock}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      insumo.estado === 'Suficiente'
                        ? 'bg-green-100 text-green-700'
                        : insumo.estado === 'Bajo'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {insumo.estado}
                  </span>
                </td>
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

      {/* Modal de registro */}
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
              <h2 className="text-2xl font-bold mb-4 text-brandPrimary">Registrar Insumo</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="nombre"
                  value={nuevoInsumo.nombre}
                  onChange={handleChange}
                  placeholder="Nombre del insumo"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="unidad"
                  value={nuevoInsumo.unidad}
                  onChange={handleChange}
                  placeholder="Unidad de medida"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="stock"
                  value={nuevoInsumo.stock}
                  onChange={handleChange}
                  placeholder="Cantidad en stock"
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  name="estado"
                  value={nuevoInsumo.estado}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="Suficiente">Suficiente</option>
                  <option value="Bajo">Bajo</option>
                  <option value="Sin stock">Sin stock</option>
                </select>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setMostrarFormulario(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pastelPink rounded hover:bg-pastelBlue"
                  >
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
