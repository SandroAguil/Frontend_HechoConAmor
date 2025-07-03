import { useState } from 'react'
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { useDatos } from '../../context/DataSimuladaContext'

export default function Pedidos() {
  const { pedidos, agregarPedido, eliminarPedido, editarPedido } = useDatos()

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todos')
  const [pedidoEditandoEstado, setPedidoEditandoEstado] = useState(null)
  const [pedidoEliminando, setPedidoEliminando] = useState(null)

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
    agregarPedido(nuevoPedido)
    setNuevoPedido({ cliente: '', fecha: '', estado: 'Pendiente' })
    setMostrarFormulario(false)
    toast.success('Pedido registrado correctamente')
  }

  const handleActualizarEstado = () => {
    editarPedido(pedidoEditandoEstado)
    toast.success('Estado actualizado correctamente')
    setPedidoEditandoEstado(null)
  }

  return (
    <motion.div
      className="p-4 space-y-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-4xl font-bold text-[#567ace]">Gestión de Pedidos</h1>
        <button
          className="bg-[#ff8fa3] hover:bg-[#ffb5a7] text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow transition"
          onClick={() => setMostrarFormulario(true)}
        >
          <FaPlus />
          Nuevo Pedido
        </button>
      </div>

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

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
  {filtrados.map((pedido) => (
    <div
      key={pedido.id}
      className="bg-white text-[#2f2f3f] p-4 rounded-xl shadow-lg flex flex-col justify-between"
    >
      <div className="mb-3 space-y-1">
        <h2 className="text-lg font-semibold">{pedido.cliente}</h2>
        <p className="text-sm opacity-90">Código: {pedido.codigo}</p>
        <p className="text-sm opacity-90">Fecha: {pedido.fecha}</p>
        <p className={`text-sm font-bold mt-2 px-3 py-1 inline-block rounded-full ${
          pedido.estado === 'Pendiente' ? 'bg-yellow-300 text-yellow-800' :
          pedido.estado === 'En proceso' ? 'bg-blue-300 text-blue-800' :
          pedido.estado === 'Entregado' ? 'bg-green-300 text-green-800' :
          'bg-red-300 text-red-800'
        }`}>
          {pedido.estado}
        </p>
      </div>
      <div className="flex justify-end gap-3 mt-3">
        <button
          className="text-blue-600 hover:text-blue-800"
          onClick={() => setPedidoEditandoEstado(pedido)}
        >
          <FaEdit />
        </button>
        <button
          className="text-red-600 hover:text-red-800"
          onClick={() => setPedidoEliminando(pedido)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  ))}
</div>


      {/* MODALES (Formulario, Editar Estado, Eliminar) */}
      <AnimatePresence>
        {mostrarFormulario && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <motion.div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-[#567ace]">Registrar Pedido</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="cliente" value={nuevoPedido.cliente} onChange={handleChange} placeholder="Nombre del cliente" className="w-full p-2 border rounded" required />
                <input type="date" name="fecha" value={nuevoPedido.fecha} onChange={handleChange} className="w-full p-2 border rounded" required />
                <select name="estado" value={nuevoPedido.estado} onChange={handleChange} className="w-full p-2 border rounded">
                  <option value="Pendiente">Pendiente</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Entregado">Entregado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setMostrarFormulario(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
                  <button type="submit" className="bg-[#567ace] text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pedidoEditandoEstado && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <motion.div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-[#567ace]">Editar Estado</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleActualizarEstado() }} className="space-y-4">
                <select value={pedidoEditandoEstado.estado} onChange={(e) => setPedidoEditandoEstado({ ...pedidoEditandoEstado, estado: e.target.value })} className="w-full p-2 border rounded">
                  <option value="Pendiente">Pendiente</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Entregado">Entregado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setPedidoEditandoEstado(null)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
                  <button type="submit" className="bg-[#567ace] text-white px-4 py-2 rounded hover:bg-blue-700">Guardar cambios</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pedidoEliminando && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <motion.div className="bg-white p-6 rounded-xl shadow-xl text-center w-full max-w-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-red-600">¿Eliminar pedido?</h3>
              <p className="mb-4">Estás a punto de eliminar el pedido de <strong>{pedidoEliminando.cliente}</strong>.</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setPedidoEliminando(null)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
                <button onClick={() => { eliminarPedido(pedidoEliminando.id); setPedidoEliminando(null); toast.success('Pedido eliminado correctamente') }} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Eliminar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
