import { useState } from 'react'
import { FaPlus, FaEye, FaTrash } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export default function Ventas() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null)
  const [ventaEliminando, setVentaEliminando] = useState(null)

  const [ventas, setVentas] = useState([
    {
      codigo: 'VNT001',
      cliente: 'Ana Rodríguez',
      fecha: '2025-06-24',
      total: 'S/ 120.00',
      estado: 'Completado'
    }
  ])

  const [nuevaVenta, setNuevaVenta] = useState({
    cliente: '',
    fecha: '',
    total: '',
    estado: 'Completado'
  })

  const [filtro, setFiltro] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')

  const filtradas = ventas.filter((v) => {
    const coincideBusqueda =
      v.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.codigo.toLowerCase().includes(busqueda.toLowerCase())
    const coincideEstado = filtro === 'Todos' || v.estado === filtro

    return coincideBusqueda && coincideEstado
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNuevaVenta({ ...nuevaVenta, [name]: value })
  }
  const validarVenta = () => {
  const { cliente, fecha, total } = nuevaVenta

  if (!cliente.trim()) {
    toast.error('El cliente no puede estar vacío')
    return false
  }

  if (!fecha) {
    toast.error('Debes seleccionar una fecha')
    return false
  }

  if (!total.trim() || !/^S\/\s?\d+(\.\d{2})?$/.test(total)) {
    toast.error('El total debe tener el formato: S/ 120.00')
    return false
  }

  return true
}

  const handleSubmit = (e) => {
  e.preventDefault()
  if (!validarVenta()) return

  const codigo = `VNT${(ventas.length + 1).toString().padStart(3, '0')}`
  setVentas([...ventas, { ...nuevaVenta, codigo }])
  toast.success('Venta registrada con éxito')
  setNuevaVenta({ cliente: '', fecha: '', total: '', estado: 'Completado' })
  setMostrarFormulario(false)
}

  const exportarPDF = () => {
    const doc = new jsPDF()
    doc.text('Reporte de Ventas', 14, 15)

    autoTable(doc, {
      startY: 20,
      head: [['Código', 'Cliente', 'Fecha', 'Total', 'Estado']],
      body: filtradas.map(v => [v.codigo, v.cliente, v.fecha, v.total, v.estado])
    })

    doc.save('reporte_ventas.pdf')
  }

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filtradas)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Ventas')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(data, 'reporte_ventas.xlsx')
  }

 const handleEliminarVenta = () => {
  setVentas(ventas.filter(v => v.codigo !== ventaEliminando.codigo))
  toast.success('Venta eliminada correctamente')
  setVentaEliminando(null)
}


  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-4xl font-bold text-brandPrimary">Ventas</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={exportarPDF}
            className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Exportar PDF
          </button>
          <button
            onClick={exportarExcel}
            className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
          >
            Exportar Excel
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-pastelBlue text-gray-800 rounded-lg shadow hover:bg-pastelPink transition"
            onClick={() => setMostrarFormulario(true)}
          >
            <FaPlus />
            Registrar Venta
          </button>
        </div>
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
          <option value="Completado">Completado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto shadow rounded-xl">
        <table className="min-w-full bg-white text-sm rounded-xl">
          <thead className="bg-pastelBlue text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Código</th>
              <th className="text-left px-4 py-3">Cliente</th>
              <th className="text-left px-4 py-3">Fecha</th>
              <th className="text-left px-4 py-3">Total</th>
              <th className="text-left px-4 py-3">Estado</th>
              <th className="text-center px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((venta, i) => (
              <tr key={i} className="border-b hover:bg-pastelCream transition">
                <td className="px-4 py-3">{venta.codigo}</td>
                <td className="px-4 py-3">{venta.cliente}</td>
                <td className="px-4 py-3">{venta.fecha}</td>
                <td className="px-4 py-3">{venta.total}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      venta.estado === 'Completado'
                        ? 'bg-green-100 text-green-700'
                        : venta.estado === 'Cancelado'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {venta.estado}
                  </span>
                </td>
                <td className="px-4 py-3 text-center flex justify-center gap-3">
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => setVentaSeleccionada(venta)}
                  >
                    <FaEye />
                  </button>
                  <button
 className="text-red-500 hover:text-red-700"
  onClick={() => setVentaEliminando(venta)}
>
  <FaTrash />
</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Registrar venta */}
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
                  type="date"
                  name="fecha"
                  value={nuevaVenta.fecha}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="total"
                  value={nuevaVenta.total}
                  onChange={handleChange}
                  placeholder="Total (ej: S/ 100.00)"
                  className="w-full p-2 border rounded"
                  required
                />
                <select
                  name="estado"
                  value={nuevaVenta.estado}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="Completado">Completado</option>
                  <option value="Pendiente">Pendiente</option>
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
                    className="px-4 py-2 bg-pastelBlue rounded hover:bg-pastelPink"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal: Detalles de venta */}
      <AnimatePresence>
        {ventaSeleccionada && (
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
              <h2 className="text-2xl font-bold mb-4 text-brandPrimary">Detalle de Venta</h2>
              <div className="space-y-2 text-sm">
                <p><strong>Código:</strong> {ventaSeleccionada.codigo}</p>
                <p><strong>Cliente:</strong> {ventaSeleccionada.cliente}</p>
                <p><strong>Fecha:</strong> {ventaSeleccionada.fecha}</p>
                <p><strong>Total:</strong> {ventaSeleccionada.total}</p>
                <p><strong>Estado:</strong> {ventaSeleccionada.estado}</p>
                <div>
                  <strong>Productos:</strong>
                  <p className="text-gray-500 text-xs italic">Productos no disponibles en esta demo.</p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setVentaSeleccionada(null)}
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
  {ventaEliminando && (
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
        <h3 className="text-xl font-semibold mb-4 text-red-600">¿Eliminar venta?</h3>
        <p className="mb-6">Estás a punto de eliminar la venta de <strong>{ventaEliminando.cliente}</strong>.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setVentaEliminando(null)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleEliminarVenta}
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
