import { useState } from 'react'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useDatos } from '../../context/DataSimuladaContext'

export default function Insumos() {
  const {
    insumos,
    agregarInsumo,
    editarInsumo,
    eliminarInsumo,
  } = useDatos()

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [insumoEditando, setInsumoEditando] = useState(null)
  const [insumoEliminando, setInsumoEliminando] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todos')
  const [orden, setOrden] = useState({ campo: 'codigo', direccion: 'asc' })

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

  const ordenarPorColumna = (campo) => {
    const direccion = orden.campo === campo && orden.direccion === 'asc' ? 'desc' : 'asc'
    setOrden({ campo, direccion })
  }

  const filtrados = [...insumos.filter(i => {
    const coincideBusqueda = i.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                             i.codigo.toLowerCase().includes(busqueda.toLowerCase())
    const coincideEstado = filtro === 'Todos' || i.estado === filtro
    return coincideBusqueda && coincideEstado
  })].sort((a, b) => {
    const valorA = a[orden.campo].toString().toLowerCase()
    const valorB = b[orden.campo].toString().toLowerCase()
    if (valorA < valorB) return orden.direccion === 'asc' ? -1 : 1
    if (valorA > valorB) return orden.direccion === 'asc' ? 1 : -1
    return 0
  })

  const exportarExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filtrados)
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
      body: filtrados.map(i => [i.codigo, i.nombre, i.unidad, i.stock, i.estado]),
      styles: { fontSize: 10 }
    })
    doc.save('insumos.pdf')
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
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
        <input type="text" placeholder="Buscar por nombre o código" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-full sm:w-1/2 p-2 border rounded-lg shadow" />
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)} className="w-full sm:w-1/4 p-2 border rounded-lg shadow">
          <option value="Todos">Todos</option>
          <option value="Suficiente">Suficiente</option>
          <option value="Bajo">Bajo</option>
          <option value="Sin stock">Sin stock</option>
        </select>
      </div>

      {/* Botones exportación */}
      <div className="flex flex-wrap gap-4 mt-2">
        <button onClick={exportarExcel} className="px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200">Exportar Excel</button>
        <button onClick={exportarPDF} className="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200">Exportar PDF</button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto shadow rounded-xl">
        <table className="min-w-full bg-white text-sm rounded-xl">
          <thead className="bg-pastelPink text-gray-700">
            <tr>
              {['codigo', 'nombre', 'unidad', 'stock', 'estado'].map(col => (
                <th key={col} className="text-left px-4 py-3 cursor-pointer" onClick={() => ordenarPorColumna(col)}>
                  {col.charAt(0).toUpperCase() + col.slice(1)} {orden.campo === col && (orden.direccion === 'asc' ? '↑' : '↓')}
                </th>
              ))}
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
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    insumo.estado === 'Suficiente' ? 'bg-green-100 text-green-700' :
                    insumo.estado === 'Bajo' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {insumo.estado}
                  </span>
                </td>
                <td className="px-4 py-3 text-center flex justify-center gap-3">
                  <button className="text-blue-500 hover:text-blue-700" onClick={() => setInsumoEditando(insumo)}><FaEdit /></button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => setInsumoEliminando(insumo)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal registro */}
      <AnimatePresence>
        {mostrarFormulario && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
              <h2 className="text-2xl font-bold mb-4 text-brandPrimary">Registrar Insumo</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="nombre" value={nuevoInsumo.nombre} onChange={handleChange} placeholder="Nombre del insumo" className="w-full p-2 border rounded" required />
                <input type="text" name="unidad" value={nuevoInsumo.unidad} onChange={handleChange} placeholder="Unidad de medida" className="w-full p-2 border rounded" required />
                <input type="number" name="stock" value={nuevoInsumo.stock} onChange={handleChange} placeholder="Cantidad en stock" className="w-full p-2 border rounded" required />
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setMostrarFormulario(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                  <button type="submit" className="px-4 py-2 bg-pastelPink rounded hover:bg-pastelBlue">Guardar</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal editar */}
      <AnimatePresence>
        {insumoEditando && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
              <h2 className="text-2xl font-bold mb-4 text-brandPrimary">Editar Insumo</h2>
              <form onSubmit={handleEditarSubmit} className="space-y-4">
                <input type="text" value={insumoEditando.nombre} onChange={(e) => setInsumoEditando({ ...insumoEditando, nombre: e.target.value })} placeholder="Nombre del insumo" className="w-full p-2 border rounded" required />
                <input type="text" value={insumoEditando.unidad} onChange={(e) => setInsumoEditando({ ...insumoEditando, unidad: e.target.value })} placeholder="Unidad de medida" className="w-full p-2 border rounded" required />
                <input type="number" value={insumoEditando.stock} onChange={(e) => setInsumoEditando({ ...insumoEditando, stock: e.target.value, estado: calcularEstado(e.target.value) })} placeholder="Cantidad en stock" className="w-full p-2 border rounded" required />
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setInsumoEditando(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                  <button type="submit" className="px-4 py-2 bg-pastelPink rounded hover:bg-pastelBlue">Guardar cambios</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal eliminar */}
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
