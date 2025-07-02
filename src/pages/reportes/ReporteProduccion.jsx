import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'
import { motion } from 'framer-motion'
import { FaFilePdf, FaFileExcel } from 'react-icons/fa'

const resumen = [
  { estado: 'En proceso', cantidad: 15 },
  { estado: 'Terminado', cantidad: 30 },
  { estado: 'Pendiente', cantidad: 5 }
]

const produccion = [
  { id: 'PRD001', producto: 'Bufanda', fecha: '2025-06-12', cantidad: 10, estado: 'Terminado' },
  { id: 'PRD002', producto: 'Chullo', fecha: '2025-06-13', cantidad: 8, estado: 'En proceso' },
  { id: 'PRD003', producto: 'Poncho', fecha: '2025-06-14', cantidad: 5, estado: 'Pendiente' }
]

const datosProduccionMensual = [
  { mes: 'Ene', cantidad: 12 },
  { mes: 'Feb', cantidad: 10 },
  { mes: 'Mar', cantidad: 16 },
  { mes: 'Abr', cantidad: 9 },
  { mes: 'May', cantidad: 13 },
  { mes: 'Jun', cantidad: 20 }
]

export default function ReporteProduccion() {
  return (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-brandPrimary">Reporte de Producción</h1>

      {/* Botones PDF/Excel */}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Resumen title="En proceso" value="15" color="bg-pastelBlue" />
        <Resumen title="Terminado" value="30" color="bg-pastelMint" />
        <Resumen title="Pendiente" value="5" color="bg-pastelPink" />
      </div>

      {/* Gráfico de línea */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Producción por Mes</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={datosProduccionMensual}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="cantidad" stroke="#34d399" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de producción */}
      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Última producción</h2>
        <table className="min-w-full text-sm">
          <thead className="bg-pastelLavender text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Código</th>
              <th className="text-left px-4 py-3">Producto</th>
              <th className="text-left px-4 py-3">Fecha</th>
              <th className="text-left px-4 py-3">Cantidad</th>
              <th className="text-left px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {produccion.map((p) => (
              <tr key={p.id} className="border-b hover:bg-pastelCream">
                <td className="px-4 py-3">{p.id}</td>
                <td className="px-4 py-3">{p.producto}</td>
                <td className="px-4 py-3">{p.fecha}</td>
                <td className="px-4 py-3">{p.cantidad}</td>
                <td className="px-4 py-3">{p.estado}</td>
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
