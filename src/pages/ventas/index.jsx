import { useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { useDatos } from '../../context/DataSimuladaContext'

export default function Ventas() {
  const { ventas, agregarVenta, eliminarVenta } = useDatos()

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todas')

  const [nuevaVenta, setNuevaVenta] = useState({
    cliente: '',
    producto: '',
    total: '',
    estado: 'Completada',
  })

  const filtradas = ventas.filter((venta) => {
    const coincideBusqueda =
      venta.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      venta.producto.toLowerCase().includes(busqueda.toLowerCase())

    const coincideEstado = filtro === 'Todas' || venta.estado === filtro

    return coincideBusqueda && coincideEstado
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNuevaVenta({ ...nuevaVenta, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    agregarVenta(nuevaVenta)
    toast.success('Venta registrada correctamente')
    setNuevaVenta({
      cliente: '',
      producto: '',
      total: '',
      estado: 'Completada',
    })
    setMostrarFormulario(false)
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
        <h1 className="text-4xl font-bold text-brandPrimary">Ventas</h1>
        <button
          onClick={() => setMostrarFormulario(true)}
          className="flex items-center gap-2 px-4 py-2 bg-pastelLavender text-gray-800 rounded-lg shadow hover:bg-pastelBlue transition"
        >
          <FaPlus /> Registrar Venta
        </button>
      </div>

      {/* Filtro y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por cliente o producto"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full sm:w-1/2 p-2 border rounded-lg shadow"
        />
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full sm:w-1/4 p-2 border rounded-lg shadow"
        >
          <option value="Todas">Todas</option>
          <option value="Completada">Completada</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Cancelada">Cancelada</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto shadow rounded-xl">
        <table className="min-w-full bg-white text-sm rounded-xl">
          <thead className="bg-pastelLavender text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Cliente</th>
              <th className="text-left px-4 py-3">Producto</th>
              <th className="text-left px-4 py-3">Total</th>
              <th className="text-left px-4 py-3">Fecha</th>
              <th className="text-left px-4 py-3">Estado</th>
              <th className="text-center px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((venta, i) => (
              <tr key={i} className="border-b hover:bg-pastelMint transition">
                <td className="px-4 py-3">{venta.cliente}</td>
                <td className="px-4 py-3">{venta.producto}</td>
                <td className="px-4 py-3">S/ {venta.total}</td>
                <td className="px-4 py-3">{venta.fecha}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      venta.estado === 'Completada'
                        ? 'bg-green-100 text-green-700'
                        : venta.estado === 'Pendiente'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {venta.estado}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => {
                      eliminarVenta(venta.id)
                      toast.success('Venta eliminada correctamente')
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de registrar venta */}
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
              <h2 className="text-2xl font-bold mb-4 text-brandPrimary">Registrar Venta</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="cliente"
                  value={nuevaVenta.cliente}
                  onChange={handleChange}
                  placeholder="Nombre del cliente"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="producto"
                  value={nuevaVenta.producto}
                  onChange={handleChange}
                  placeholder="Producto vendido"
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="total"
                  value={nuevaVenta.total}
                  onChange={handleChange}
                  placeholder="Total de la venta"
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  name="estado"
                  value={nuevaVenta.estado}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="Completada">Completada</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Cancelada">Cancelada</option>
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
    </motion.div>
  )
}
