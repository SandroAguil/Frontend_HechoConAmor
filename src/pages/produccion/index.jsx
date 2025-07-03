import { useState, useContext } from 'react'
import { FaPlus, FaTrash, FaEdit, FaBoxOpen, FaCheck, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { DataSimuladaContext } from "../../context/DataSimuladaContext"

export default function Produccion() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [ordenEditando, setOrdenEditando] = useState(null)
  const [ordenEliminando, setOrdenEliminando] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todos')
  const [insumosUsados, setInsumosUsados] = useState([])

  const insumosDisponibles = [
    { id: 1, nombre: 'Cartulina' },
    { id: 2, nombre: 'Flores' },
    { id: 3, nombre: 'Lazo' },
    { id: 4, nombre: 'Caja decorativa' }
  ]

  const {
    ordenesProduccion,
    agregarOrdenProduccion,
    editarOrdenProduccion,
    eliminarOrdenProduccion
  } = useContext(DataSimuladaContext)

  const [nuevaOrden, setNuevaOrden] = useState({
    producto: '',
    fecha: '',
    cantidad: '',
    estado: 'En curso'
  })

  const iniciarEdicion = (codigo) => {
    const orden = ordenesProduccion.find((o) => o.codigo === codigo)
    if (orden) {
      setNuevaOrden({
        producto: orden.producto,
        fecha: orden.fecha,
        cantidad: orden.cantidad,
        estado: orden.estado
      })
      setInsumosUsados(orden.insumos || [])
      setOrdenEditando(codigo)
      setModoEdicion(true)
      setMostrarFormulario(true)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNuevaOrden({ ...nuevaOrden, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (modoEdicion && ordenEditando) {
      editarOrdenProduccion(ordenEditando, {
        ...nuevaOrden,
        insumos: insumosUsados
      })
      toast.success('Orden actualizada correctamente')
    } else {
      agregarOrdenProduccion({
        ...nuevaOrden,
        insumos: insumosUsados
      })
      toast.success('Orden de producción registrada')
    }
    setNuevaOrden({ producto: '', fecha: '', cantidad: '', estado: 'En curso' })
    setMostrarFormulario(false)
    setInsumosUsados([])
    setModoEdicion(false)
    setOrdenEditando(null)
  }

  const filtradas = ordenesProduccion.filter((o) => {
    const coincideBusqueda =
      o.producto.toLowerCase().includes(busqueda.toLowerCase()) ||
      o.codigo.toLowerCase().includes(busqueda.toLowerCase())
    const coincideEstado = filtro === 'Todos' || o.estado === filtro
    return coincideBusqueda && coincideEstado
  })

  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'Finalizado':
        return <span className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs"><FaCheck /> Finalizado</span>
      case 'Cancelado':
        return <span className="flex items-center gap-1 text-red-700 bg-red-100 px-2 py-1 rounded-full text-xs"><FaTimes /> Cancelado</span>
      default:
        return <span className="flex items-center gap-1 text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full text-xs"><FaBoxOpen /> En curso</span>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-brandPrimary">Producción</h1>
        <button
          onClick={() => setMostrarFormulario(true)}
          className="bg-pastelMint hover:bg-pastelBlue text-gray-800 px-4 py-2 rounded-full shadow flex items-center gap-2"
        >
          <FaPlus />
          Orden
        </button>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtradas.map((orden, i) => (
          <motion.div
            key={i}
            className="bg-white shadow-lg rounded-xl p-4 border border-gray-200"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{orden.producto}</h3>
              <div className="flex gap-2">
                <button onClick={() => iniciarEdicion(orden.codigo)} className="text-blue-600 hover:text-blue-800">
                  <FaEdit />
                </button>
                <button
                  onClick={() => setOrdenEliminando(orden)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500">Código: {orden.codigo}</p>
            <p className="text-sm">Fecha: {orden.fecha}</p>
            <p className="text-sm">Cantidad: {orden.cantidad}</p>
            <div className="mt-2">{getEstadoBadge(orden.estado)}</div>
          </motion.div>
        ))}
      </div>

      {/* Modal de Confirmación de Eliminación */}
      <AnimatePresence>
        {ordenEliminando && (
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
              <h3 className="text-xl font-semibold mb-4 text-red-600">¿Eliminar orden?</h3>
              <p className="mb-6">Estás a punto de eliminar <strong>{ordenEliminando.producto}</strong>.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setOrdenEliminando(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    eliminarOrdenProduccion(ordenEliminando.codigo)
                    toast.success("Orden eliminada correctamente")
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

      {/* Formulario */}
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
              <h2 className="text-2xl font-bold mb-4 text-brandPrimary">
                {modoEdicion ? 'Editar Orden' : 'Nueva Orden'}
              </h2>
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
