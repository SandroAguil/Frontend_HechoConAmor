
import { motion } from 'framer-motion'
import { FaFilePdf, FaFileExcel } from 'react-icons/fa'
import { useState } from 'react'
import {
  ComposedChart, BarChart, Bar, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine, LabelList
} from 'recharts'


const datosVentas = [
  { mes: 'Ene', total: 1200 },
  { mes: 'Feb', total: 900 },
  { mes: 'Mar', total: 1400 },
  { mes: 'Abr', total: 800 },
  { mes: 'May', total: 1100 },
  { mes: 'Jun', total: 1500 }
]

const transacciones = [
  { id: 'VNT001', cliente: 'Ana Rojas', fecha: '2025-06-15', total: 120 },
  { id: 'VNT002', cliente: 'Luis Pérez', fecha: '2025-06-16', total: 80 },
  { id: 'VNT003', cliente: 'Sofía Torres', fecha: '2025-06-17', total: 95 }
]

export default function ReporteVentas() {
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  const transaccionesFiltradas = transacciones.filter((t) => {
    const fecha = new Date(t.fecha)
    const inicio = fechaInicio ? new Date(fechaInicio) : null
    const fin = fechaFin ? new Date(fechaFin) : null

    return (!inicio || fecha >= inicio) && (!fin || fecha <= fin)
  })
  
  return (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-brandPrimary">Reporte de Ventas</h1>

<div className="flex gap-4">
  <button
    onClick={() => alert('✅ Exportación a PDF simulada (implementación futura).')}
    className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition"
  >
    <FaFilePdf /> Exportar PDF
  </button>
  <button
    onClick={() => alert('✅ Exportación a Excel simulada (implementación futura).')}
    className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition"
  >
    <FaFileExcel /> Exportar Excel
  </button>
</div>




      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Resumen title="Ventas totales" value="S/ 6,000" color="bg-pastelBlue" />
        <Resumen title="Promedio mensual" value="S/ 1,000" color="bg-pastelMint" />
        <Resumen title="Mejor mes" value="Junio" color="bg-pastelLavender" />
        <Resumen title="Transacciones" value="15" color="bg-pastelPink" />
      </div>

      <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 items-center">
  <div>
    <label className="text-sm text-gray-600">Desde:</label>
    <input
      type="date"
      value={fechaInicio}
      onChange={(e) => setFechaInicio(e.target.value)}
      className="block mt-1 p-2 border rounded w-40"
    />
  </div>
  <div>
    <label className="text-sm text-gray-600">Hasta:</label>
    <input
      type="date"
      value={fechaFin}
      onChange={(e) => setFechaFin(e.target.value)}
      className="block mt-1 p-2 border rounded w-40"
    />
  </div>
</div>

{/* Gráfico avanzado de ventas */}
<div className="bg-white p-6 rounded-xl shadow">
  <h2 className="text-xl font-semibold mb-4 text-gray-800">Análisis de Ventas por Mes</h2>
  <ResponsiveContainer width="100%" height={350}>
    <ComposedChart data={datosVentas}>
      <XAxis dataKey="mes" />
      <YAxis />
      <Tooltip contentStyle={{ backgroundColor: '#f3f4f6', borderRadius: 10 }} />
      <Legend />
      
      {/* Línea de meta */}
      <ReferenceLine y={1300} stroke="red" strokeDasharray="5 5" label="Meta" />

      {/* Barras de ventas */}
      <Bar dataKey="total" fill="#a78bfa" radius={[10, 10, 0, 0]}>
        <LabelList dataKey="total" position="top" />
      </Bar>

      {/* Línea de crecimiento (simulada con otro dataKey opcional si lo tuvieras) */}
      {/* En este caso usaremos el mismo total para mostrar tendencia */}
      <Line type="monotone" dataKey="total" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} />
    </ComposedChart>
  </ResponsiveContainer>
</div>


      {/* Tabla de transacciones */}
      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Últimas transacciones</h2>
        <table className="min-w-full text-sm">
          <thead className="bg-pastelLavender text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Código</th>
              <th className="text-left px-4 py-3">Cliente</th>
              <th className="text-left px-4 py-3">Fecha</th>
              <th className="text-left px-4 py-3">Total</th>
            </tr>
          </thead>
          <tbody>
            {transaccionesFiltradas.map((venta) => (
              <tr key={venta.id} className="border-b hover:bg-pastelCream">
                <td className="px-4 py-3">{venta.id}</td>
                <td className="px-4 py-3">{venta.cliente}</td>
                <td className="px-4 py-3">{venta.fecha}</td>
                <td className="px-4 py-3">S/ {venta.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </motion.div>
  )
}

function Resumen({ title, value, color }) {
  return (
    <div className={`p-5 rounded-xl shadow-md ${color} text-gray-800`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  )
}
