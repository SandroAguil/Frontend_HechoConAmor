import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const resumenPedidos = [
  { estado: 'Pendiente', cantidad: 8 },
  { estado: 'Completado', cantidad: 15 },
  { estado: 'Cancelado', cantidad: 4 }
]

const pedidos = [
  { id: 'PED001', cliente: 'Ana Torres', fecha: '2025-06-15', total: 'S/ 95.00', estado: 'Pendiente' },
  { id: 'PED002', cliente: 'Luis García', fecha: '2025-06-14', total: 'S/ 130.00', estado: 'Completado' },
  { id: 'PED003', cliente: 'Lucía Pérez', fecha: '2025-06-13', total: 'S/ 78.00', estado: 'Cancelado' }
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

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Resumen title="Pedidos pendientes" value="8" color="bg-pastelMint" />
        <Resumen title="Completados" value="15" color="bg-pastelBlue" />
        <Resumen title="Cancelados" value="4" color="bg-pastelPink" />
      </div>

      {/* Gráfico de barras */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Estado de Pedidos</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={resumenPedidos}>
            <XAxis dataKey="estado" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#f472b6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de pedidos */}
      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Pedidos recientes</h2>
        <table className="min-w-full text-sm">
          <thead className="bg-pastelLavender text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Código</th>
              <th className="text-left px-4 py-3">Cliente</th>
              <th className="text-left px-4 py-3">Fecha</th>
              <th className="text-left px-4 py-3">Total</th>
              <th className="text-left px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id} className="border-b hover:bg-pastelCream">
                <td className="px-4 py-3">{pedido.id}</td>
                <td className="px-4 py-3">{pedido.cliente}</td>
                <td className="px-4 py-3">{pedido.fecha}</td>
                <td className="px-4 py-3">{pedido.total}</td>
                <td className="px-4 py-3">{pedido.estado}</td>
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
