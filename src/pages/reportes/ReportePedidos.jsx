import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'
import { motion } from 'framer-motion'
import { FaFilePdf, FaFileExcel } from 'react-icons/fa'

const resumen = [
  { estado: 'Pendiente', cantidad: 8 },
  { estado: 'Enviado', cantidad: 12 },
  { estado: 'Entregado', cantidad: 25 }
]

const pedidos = [
  { id: 'PED001', cliente: 'Carlos Ruiz', fecha: '2025-06-12', total: 150 },
  { id: 'PED002', cliente: 'Lucía Gómez', fecha: '2025-06-13', total: 80 },
  { id: 'PED003', cliente: 'Jorge Díaz', fecha: '2025-06-14', total: 120 }
]

const datosPedidosMensuales = [
  { mes: 'Ene', pedidos: 10 },
  { mes: 'Feb', pedidos: 8 },
  { mes: 'Mar', pedidos: 15 },
  { mes: 'Abr', pedidos: 9 },
  { mes: 'May', pedidos: 11 },
  { mes: 'Jun', pedidos: 17 }
]

export default function ReportePedidos() {
  return (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-brandPrimary">Reporte de Pedidos</h1>

      {/* Botones de exportación */}
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
        <Resumen title="Pendientes" value="8" color="bg-pastelPink" />
        <Resumen title="Enviados" value="12" color="bg-pastelBlue" />
        <Resumen title="Entregados" value="25" color="bg-pastelMint" />
      </div>

      {/* Gráfico mejorado */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Pedidos por Mes</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={datosPedidosMensuales}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="pedidos" stroke="#a78bfa" fill="#ddd6fe" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de pedidos */}
      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Últimos pedidos</h2>
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
            {pedidos.map((p) => (
              <tr key={p.id} className="border-b hover:bg-pastelCream">
                <td className="px-4 py-3">{p.id}</td>
                <td className="px-4 py-3">{p.cliente}</td>
                <td className="px-4 py-3">{p.fecha}</td>
                <td className="px-4 py-3">S/ {p.total}</td>
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
