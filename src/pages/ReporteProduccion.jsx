import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const resumenProduccion = [
  { nombre: 'En proceso', valor: 6 },
  { nombre: 'Finalizadas', valor: 12 },
  { nombre: 'Pendientes', valor: 4 }
]

const colores = ['#A0D8EF', '#FADADD', '#E6E6FA']

const producciones = [
  { id: 'PRD001', producto: 'Chalina rosa', inicio: '2025-06-10', cantidad: 30, estado: 'Finalizada' },
  { id: 'PRD002', producto: 'Gorro amarillo', inicio: '2025-06-12', cantidad: 15, estado: 'En proceso' },
  { id: 'PRD003', producto: 'Bufanda gris', inicio: '2025-06-13', cantidad: 20, estado: 'Pendiente' }
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

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Resumen title="Producciones en proceso" value="6" color="bg-pastelPink" />
        <Resumen title="Finalizadas" value="12" color="bg-pastelBlue" />
        <Resumen title="Pendientes" value="4" color="bg-pastelMint" />
      </div>

      {/* Gráfico circular */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Proporción de Estados</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={resumenProduccion}
              dataKey="valor"
              nameKey="nombre"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {resumenProduccion.map((entry, index) => (
                <Cell key={index} fill={colores[index % colores.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de órdenes */}
      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Órdenes recientes</h2>
        <table className="min-w-full text-sm">
          <thead className="bg-pastelLavender text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Código</th>
              <th className="text-left px-4 py-3">Producto</th>
              <th className="text-left px-4 py-3">Inicio</th>
              <th className="text-left px-4 py-3">Cantidad</th>
              <th className="text-left px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {producciones.map((prod) => (
              <tr key={prod.id} className="border-b hover:bg-pastelCream">
                <td className="px-4 py-3">{prod.id}</td>
                <td className="px-4 py-3">{prod.producto}</td>
                <td className="px-4 py-3">{prod.inicio}</td>
                <td className="px-4 py-3">{prod.cantidad}</td>
                <td className="px-4 py-3">{prod.estado}</td>
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
