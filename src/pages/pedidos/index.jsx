import { useState } from 'react'
import { FaPlus, FaEye, FaTrash } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'

export default function Pedidos() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todos')
  const [pedidoEditandoEstado, setPedidoEditandoEstado] = useState(null)
  const [pedidoEliminando, setPedidoEliminando] = useState(null)

  const [pedidos, setPedidos] = useState([
    {
      codigo: 'PED001',
      cliente: 'Carlos Sánchez',
      fecha: '2025-06-24',
      estado: 'Pendiente'
    }
  ])

  const [nuevoPedido, setNuevoPedido] = useState({
    cliente: '',
    fecha: '',
    estado: 'Pendiente'
  })

  const filtrados = pedidos.filter((pedido) => {
    const coincideBusqueda =
      pedido.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      pedido.codigo.toLowerCase().includes(busqueda.toLowerCase())

    const coincideEstado = filtro === 'Todos' || pedido.estado === filtro

    return coincideBusqueda && coincideEstado
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNuevoPedido({ ...nuevoPedido, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const codigo = `PED${(pedidos.length + 1).toString().padStart(3, '0')}`
    setPedidos([...pedidos, { ...nuevoPedido, codigo }])
    setNuevoPedido({ cliente: '', fecha: '', estado: 'Pendiente' })
    setMostrarFormulario(false)

    // ✅ Notificación
    toast.success('Pedido registrado correctamente')
  }

  const handleActualizarEstado = () => {
  setPedidos(pedidos.map(p =>
    p.codigo === pedidoEditandoEstado.codigo
      ? { ...p, estado: pedidoEditandoEstado.estado }
      : p
  ))
  toast.success('Estado actualizado correctamente')
  setPedidoEditandoEstado(null)
}


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Título y botón */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-4xl font-bold text-brandPrimary">Pedidos</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-pastelLavender text-gray-800 rounded-lg shadow hover:bg-pastelBlue transition"
          onClick={() => setMostrarFormulario(true)}
        >
          <FaPlus />
          Registrar Pedido
        </button>
      </div>

      {/* Filtro y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por cliente o código"
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
          <option value="Pendiente">Pendiente</option>
          <option value="En proceso">En proceso</option>
          <option value="Entregado">Entregado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto shadow rounded-xl">
        <table className="min-w-full bg-white text-sm rounded-xl">
          <thead className="bg-pastelLavender text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Código</th>
              <th className="text-left px-4 py-3">Cliente</th>
              <th className="text-left px-4 py-3">Fecha</th>
              <th className="text-left px-4 py-3">Estado</th>
              <th className="text-center px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((pedido, i) => (
              <tr key={i} className="border-b hover:bg-pastelMint transition">
                <td className="px-4 py-3">{pedido.codigo}</td>
                <td className="px-4 py-3">{pedido.cliente}</td>
                <td className="px-4 py-3">{pedido.fecha}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      pedido.estado === 'Pendiente'
                        ? 'bg-yellow-100 text-yellow-700'
                        : pedido.estado === 'En proceso'
                        ? 'bg-blue-100 text-blue-700'
                        : pedido.estado === 'Entregado'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {pedido.estado}
                  </span>
                </td>
<td className="px-4 py-3 text-center flex justify-center gap-3">
  <button className="text-blue-500 hover:text-blue-700" onClick={() => setPedidoEditandoEstado(pedido)}>
    ✏️
  </button>
  <button className="text-red-500 hover:text-red-700" onClick={() => setPedidoEliminando(pedido)}>
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
              <h2 className="text-2xl font-bold mb-4 text-brandPrimary">Registrar Pedido</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="cliente"
                  value={nuevoPedido.cliente}
                  onChange={handleChange}
                  placeholder="Nombre del cliente"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="date"
                  name="fecha"
                  value={nuevoPedido.fecha}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  name="estado"
                  value={nuevoPedido.estado}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Entregado">Entregado</option>
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
                    className="px-4 py-2 bg-pastelLavender rounded hover:bg-pastelBlue"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
  {pedidoEditandoEstado && (
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
        <h2 className="text-2xl font-bold mb-4 text-brandPrimary">Editar Estado</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleActualizarEstado()
          }}
          className="space-y-4"
        >
          <select
            value={pedidoEditandoEstado.estado}
            onChange={(e) =>
              setPedidoEditandoEstado({ ...pedidoEditandoEstado, estado: e.target.value })
            }
            className="w-full p-2 border rounded"
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En proceso">En proceso</option>
            <option value="Entregado">Entregado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setPedidoEditandoEstado(null)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

<AnimatePresence>
  {pedidoEliminando && (
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
        <h3 className="text-xl font-semibold mb-4 text-red-600">¿Eliminar pedido?</h3>
        <p className="mb-6">
          Estás a punto de eliminar el pedido de <strong>{pedidoEliminando.cliente}</strong>.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setPedidoEliminando(null)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              setPedidos(pedidos.filter(p => p.codigo !== pedidoEliminando.codigo))
              setPedidoEliminando(null)
              toast.success('Pedido eliminado correctamente')
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
