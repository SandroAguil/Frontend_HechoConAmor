import { useState } from 'react'
import { FaPlus, FaEdit, FaTrash, FaFilePdf, FaFileExcel } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useDatos } from '../../context/DataSimuladaContext'

export default function Insumos() {
  const { insumos, agregarInsumo, editarInsumo, eliminarInsumo } = useDatos()

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [insumoEditando, setInsumoEditando] = useState(null)
  const [insumoEliminando, setInsumoEliminando] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todos')

  const [nuevoInsumo, setNuevoInsumo] = useState({
    nombre: '', unidad: '', stock: '', estado: 'Suficiente'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNuevoInsumo({ ...nuevoInsumo, [name]: value })
  }

  const calcularEstado = (stock) => {
    const n = Number(stock)
    if (n === 0) return 'Sin stock'
    if (n <= 5) return 'Bajo'
    return 'Suficiente'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { nombre, unidad, stock } = nuevoInsumo

    if (!nombre || nombre.trim().length < 2) return toast.error('El nombre del insumo es muy corto.')
    if (!unidad || unidad.trim().length < 2) return toast.error('La unidad de medida es muy corta.')
    if (isNaN(stock) || Number(stock) < 0) return toast.error('El stock debe ser un número válido mayor o igual a 0.')

    const nombreNormalizado = nombre.trim().toLowerCase()
    const yaExiste = insumos.some(insumo => insumo.nombre.trim().toLowerCase() === nombreNormalizado)
    if (yaExiste) return toast.error('Ya existe un insumo con ese nombre.')

    const estado = calcularEstado(stock)

    if (estado === 'Bajo') toast.warning('El insumo tiene poco stock.')
    if (estado === 'Sin stock') toast.error('El insumo está sin stock.')

    agregarInsumo({ ...nuevoInsumo, estado })
    setNuevoInsumo({ nombre: '', unidad: '', stock: '', estado: 'Suficiente' })
    setMostrarFormulario(false)
    toast.success('Insumo agregado correctamente')
  }

  const handleEditarSubmit = (e) => {
    e.preventDefault()
    const { nombre, unidad, stock } = insumoEditando

    if (!nombre || nombre.trim().length < 2) return toast.error('El nombre del insumo es muy corto.')
    if (!unidad || unidad.trim().length < 2) return toast.error('La unidad de medida es muy corta.')
    if (isNaN(stock) || Number(stock) < 0) return toast.error('El stock debe ser un número válido mayor o igual a 0.')

    editarInsumo(insumoEditando)
    setInsumoEditando(null)
    toast.success('Insumo editado correctamente')
  }

  const handleEliminar = () => {
    eliminarInsumo(insumoEliminando.codigo)
    toast.success('Insumo eliminado correctamente')
    setInsumoEliminando(null)
  }

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(insumos)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Insumos')
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(data, 'insumos.xlsx')
  }

  const exportarPDF = () => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text('Reporte de Insumos', 14, 20)
    doc.autoTable({
      startY: 30,
      head: [['Código', 'Nombre', 'Unidad', 'Stock', 'Estado']],
      body: insumos.map(i => [i.codigo, i.nombre, i.unidad, i.stock, i.estado]),
      styles: { fontSize: 10 }
    })
    doc.save('insumos.pdf')
  }

  const filtrados = insumos.filter(i => {
    const coincideBusqueda = i.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                             i.codigo.toLowerCase().includes(busqueda.toLowerCase())
    const coincideEstado = filtro === 'Todos' || i.estado === filtro
    return coincideBusqueda && coincideEstado
  })

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-4xl font-bold text-[#6D6875]">Insumos</h1>
        <button onClick={() => setMostrarFormulario(true)} className="flex items-center gap-2 px-4 py-2 bg-[#FFB4A2] text-white rounded-lg shadow hover:bg-[#FF8FAB] transition">
          <FaPlus />
          Registrar Insumo
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <input type="text" placeholder="Buscar..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-full sm:w-1/2 p-2 border rounded-lg shadow" />
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full sm:w-1/4 p-2 border rounded-lg shadow">
          <option value="Todos">Todos</option>
          <option value="Suficiente">Suficiente</option>
          <option value="Bajo">Bajo</option>
          <option value="Sin stock">Sin stock</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-3 mt-2">
        <button onClick={exportarExcel} className="flex items-center gap-2 px-4 py-2 bg-green-200 text-green-800 rounded hover:bg-green-300">
          <FaFileExcel /> Exportar Excel
        </button>
        <button onClick={exportarPDF} className="flex items-center gap-2 px-4 py-2 bg-red-200 text-red-800 rounded hover:bg-red-300">
          <FaFilePdf /> Exportar PDF
        </button>
      </div>

      {/* Galería */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtrados.map((insumo, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-md flex flex-col justify-between">

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-[#6D6875]">{insumo.nombre}</h2>
              <p className="text-sm text-[#7B6F72]"><strong>Código:</strong> {insumo.codigo}</p>
              <p className="text-sm text-[#7B6F72]"><strong>Unidad:</strong> {insumo.unidad}</p>
              <p className="text-sm text-[#7B6F72]"><strong>Stock:</strong> {insumo.stock}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                insumo.estado === 'Suficiente' ? 'bg-green-200 text-green-800' :
                insumo.estado === 'Bajo' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'
              }`}>
                {insumo.estado}
              </span>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button className="text-blue-500 hover:text-blue-700" onClick={() => setInsumoEditando(insumo)}><FaEdit /></button>
              <button className="text-red-500 hover:text-red-700" onClick={() => setInsumoEliminando(insumo)}><FaTrash /></button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modales */}
      <AnimatePresence>
        {mostrarFormulario && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
              <h2 className="text-2xl font-bold mb-4 text-[#6D6875]">Registrar Insumo</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="nombre" value={nuevoInsumo.nombre} onChange={handleChange} placeholder="Nombre del insumo" className="w-full p-2 border rounded" required />
                <input type="text" name="unidad" value={nuevoInsumo.unidad} onChange={handleChange} placeholder="Unidad de medida" className="w-full p-2 border rounded" required />
                <input type="number" name="stock" value={nuevoInsumo.stock} onChange={handleChange} placeholder="Cantidad en stock" className="w-full p-2 border rounded" required />
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setMostrarFormulario(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                  <button type="submit" className="px-4 py-2 bg-[#FFB4A2] text-white rounded hover:bg-[#FF8FAB]">Guardar</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {insumoEditando && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
              <h2 className="text-2xl font-bold mb-4 text-[#6D6875]">Editar Insumo</h2>
              <form onSubmit={handleEditarSubmit} className="space-y-4">
                <input type="text" value={insumoEditando.nombre} onChange={(e) => setInsumoEditando({ ...insumoEditando, nombre: e.target.value })} placeholder="Nombre del insumo" className="w-full p-2 border rounded" required />
                <input type="text" value={insumoEditando.unidad} onChange={(e) => setInsumoEditando({ ...insumoEditando, unidad: e.target.value })} placeholder="Unidad de medida" className="w-full p-2 border rounded" required />
                <input type="number" value={insumoEditando.stock} onChange={(e) => setInsumoEditando({ ...insumoEditando, stock: e.target.value, estado: calcularEstado(e.target.value) })} placeholder="Cantidad en stock" className="w-full p-2 border rounded" required />
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setInsumoEditando(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                  <button type="submit" className="px-4 py-2 bg-[#FFB4A2] text-white rounded hover:bg-[#FF8FAB]">Guardar cambios</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {insumoEliminando && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
              <h3 className="text-xl font-semibold mb-4 text-red-600">¿Eliminar insumo?</h3>
              <p className="mb-6">Estás a punto de eliminar <strong>{insumoEliminando.nombre}</strong>.</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setInsumoEliminando(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                <button onClick={handleEliminar} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Eliminar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
