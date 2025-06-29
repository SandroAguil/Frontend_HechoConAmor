import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const resumen = [
  { categoria: 'Invierno', stock: 50 },
  { categoria: 'Verano', stock: 20 },
  { categoria: 'Accesorios', stock: 35 }
]

const productos = [
  { id: 'INV001', nombre: 'Chompa tejida', categoria: 'Invierno', stock: 5, estado: 'Bajo' },
  { id: 'INV002', nombre: 'Gorro azul', categoria: 'Accesorios', stock: 0, estado: 'Sin stock' },
  { id: 'INV003', nombre: 'Poncho andino', categoria: 'Invierno', stock: 18, estado: 'Suficiente' }
]

export default function ReporteInventario() {
  return (
    <motion.div
      className="space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-brandPrimary">Reporte de Inventario</h1>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Resumen title="Total productos" value="105" color="bg-pastelBlue" />
        <Resumen title="Stock bajo" value="6" color="bg-pastelPink" />
        <Resumen title="Sin stock" value="2" color="bg-pastelLavender" />
      </div>

      {/* Gráfico de barras */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Stock por Categoría</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={resumen}>
            <XAxis dataKey="categoria" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stock" fill="#86efac" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de inventario */}
      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Productos destacados</h2>
        <table className="min-w-full text-sm">
          <thead className="bg-pastelMint text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Código</th>
              <th className="text-left px-4 py-3">Nombre</th>
              <th className="text-left px-4 py-3">Categoría</th>
              <th className="text-left px-4 py-3">Stock</th>
              <th className="text-left px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id} className="border-b hover:bg-pastelCream">
                <td className="px-4 py-3">{prod.id}</td>
                <td className="px-4 py-3">{prod.nombre}</td>
                <td className="px-4 py-3">{prod.categoria}</td>
                <td className="px-4 py-3">{prod.stock}</td>
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
