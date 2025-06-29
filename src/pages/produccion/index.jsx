import { useState } from 'react'
import { FaPlus, FaCheck, FaTrash } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'

export default function Produccion() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [ordenEliminando, setOrdenEliminando] = useState(null)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)

  
  const [ordenes, setOrdenes] = useState([
    {
      codigo: 'PRD001',
      producto: 'Ramo flores amarillas',
      fecha: '2025-06-25',
      cantidad: 10,
      estado: 'En curso'
    }
  ])

  const [insumosUsados, setInsumosUsados] = useState([])
const insumosDisponibles = [
  { id: 1, nombre: 'Cartulina' },
  { id: 2, nombre: 'Flores' },
  { id: 3, nombre: 'Lazo' },
  { id: 4, nombre: 'Caja decorativa' }
]



  const [nuevaOrden, setNuevaOrden] = useState({
    producto: '',
    fecha: '',
    cantidad: '',
    estado: 'En curso'
  })

  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todos')

  const filtradas = ordenes.filter((o) => {
    const coincideBusqueda =
      o.producto.toLowerCase().includes(busqueda.toLowerCase()) ||
      o.codigo.toLowerCase().includes(busqueda.toLowerCase())

    const coincideEstado =
      filtro === 'Todos' || o.estado === filtro

    return coincideBusqueda && coincideEstado
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNuevaOrden({ ...nuevaOrden, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const codigo = `PRD${(ordenes.length + 1).toString().padStart(3, '0')}`
    setOrdenes([
  ...ordenes,
  {
    ...nuevaOrden,
    codigo,
    insumos: insumosUsados
  }
])
    toast.success('Orden de producción registrada')
    setNuevaOrden({ producto: '', fecha: '', cantidad: '', estado: 'En curso' })
    setMostrarFormulario(false)
    setInsumosUsados([])
  }

const eliminarOrden = (codigo) => {
  setOrdenes(ordenes.filter((orden) => orden.codigo !== codigo));
  toast.success("Orden eliminada correctamente");
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-4xl font-bold text-brandPrimary">Producción</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-pastelMint text-gray-800 rounded-lg shadow hover:bg-pastelBlue transition"
          onClick={() => setMostrarFormulario(true)}
        >
          <FaPlus />
          Nueva Orden
        </button>
      </div>

      {/* Filtro y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por producto o código"
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
          <option value="En curso">En curso</option>
          <option value="Finalizado">Finalizado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto shadow rounded-xl">
        <table className="min-w-full bg-white text-sm rounded-xl">
          <thead className="bg-pastelMint text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Código</th>
              <th className="text-left px-4 py-3">Producto</th>
              <th className="text-left px-4 py-3">Fecha</th>
              <th className="text-left px-4 py-3">Cantidad</th>
              <th className="text-left px-4 py-3">Estado</th>
              <th className="text-center px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((orden, i) => (
              <tr key={i} className="border-b hover:bg-pastelCream transition">
                <td className="px-4 py-3">{orden.codigo}</td>
                <td className="px-4 py-3">{orden.producto}</td>
                <td className="px-4 py-3">{orden.fecha}</td>
                <td className="px-4 py-3">{orden.cantidad}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      orden.estado === 'Finalizado'
                        ? 'bg-green-100 text-green-700'
                        : orden.estado === 'Cancelado'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {orden.estado}
                  </span>
                </td>
                <td className="px-4 py-3 text-center flex justify-center gap-3">
                  <button className="text-green-600 hover:text-green-800">
                    <FaCheck />
                  </button>
<button
  className="text-red-500 hover:text-red-700"
  onClick={() => {
    setOrdenEliminando(orden)
    setMostrarConfirmacion(true)
  }}
>
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
              <h2 className="text-2xl font-bold mb-4 text-brandPrimary">Nueva Orden</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="producto"
                  value={nuevaOrden.producto}
                  onChange={handleChange}
                  placeholder="Nombre del producto"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="date"
                  name="fecha"
                  value={nuevaOrden.fecha}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="cantidad"
                  value={nuevaOrden.cantidad}
                  onChange={handleChange}
                  placeholder="Cantidad"
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  name="estado"
                  value={nuevaOrden.estado}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="En curso">En curso</option>
                  <option value="Finalizado">Finalizado</option>
                  <option value="Cancelado">Cancelado</option>
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
                    className="px-4 py-2 bg-pastelMint rounded hover:bg-pastelBlue"
                  >
                    Guardar
                  </button>
                </div>
              </form>
              <div className="space-y-2">
  <h3 className="font-semibold">Insumos utilizados</h3>
  {insumosUsados.map((item, i) => (
    <div key={i} className="flex gap-2">
      <select
        value={item.id}
        onChange={(e) => {
          const nuevos = [...insumosUsados]
          nuevos[i].id = parseInt(e.target.value)
          setInsumosUsados(nuevos)
        }}
        className="w-1/2 border p-2 rounded"
        required
      >
        <option value="">Seleccionar insumo</option>
        {insumosDisponibles.map((insumo) => (
          <option key={insumo.id} value={insumo.id}>
            {insumo.nombre}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Cantidad"
        value={item.cantidad}
        onChange={(e) => {
          const nuevos = [...insumosUsados]
          nuevos[i].cantidad = parseInt(e.target.value)
          setInsumosUsados(nuevos)
        }}
        className="w-1/2 border p-2 rounded"
        required
        min="1"
      />
    </div>
  ))}

  <button
    type="button"
    onClick={() =>
      setInsumosUsados([...insumosUsados, { id: '', cantidad: '' }])
    }
    className="text-sm text-blue-600 hover:underline"
  >
    + Añadir insumo
  </button>
</div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
  {mostrarConfirmacion && ordenEliminando && (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <h2 className="text-xl font-bold text-red-600 mb-2">
          ¿Eliminar orden?
        </h2>
        <p className="mb-4">
          Estás a punto de eliminar la orden de{" "}
          <span className="font-semibold">
            {ordenEliminando.producto}
          </span>
          .
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setMostrarConfirmacion(false)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              setOrdenes((prev) =>
                prev.filter((o) => o.codigo !== ordenEliminando.codigo)
              )
              toast.success("Orden eliminada correctamente")
              setMostrarConfirmacion(false)
              setOrdenEliminando(null)
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </motion.div>
  )
}
