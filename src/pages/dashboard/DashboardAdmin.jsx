import React from 'react'
import {
  FaBoxOpen,
  FaClipboardList,
  FaMoneyBillWave,
  FaIndustry,
  FaTools,
  FaChartLine,
  FaUser
} from 'react-icons/fa'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import PageTransition from '../../components/PageTransition'

// 🎨 Colores para el gráfico de pastel
const colores = ['#A0D8EF', '#FADADD', '#E6E6FA']

// ✅ Datos simulados (en reemplazo de useDatos)
const productos = [{}, {}, {}]
const ventas = [
  { total: 100, fecha: '2025-01-15' },
  { total: 200, fecha: '2025-02-10' },
  { total: 300, fecha: '2025-02-15' }
]
const pedidos = [
  { estado: 'completado' },
  { estado: 'pendiente' },
  { estado: 'cancelado' },
  { estado: 'completado' }
]
const produccion = [
  { estado: 'en curso' },
  { estado: 'finalizado' },
  { estado: 'en curso' }
]
const insumos = [{}, {}, {}, {}]
const reportes = [{}, {}]
const usuarios = [{}, {}, {}, {}]

// 🧮 Cálculos
const totalProductos = productos.length
const totalPedidos = pedidos.length
const totalVentas = ventas.reduce((acc, venta) => acc + venta.total, 0)
const totalInsumos = insumos.length
const produccionActiva = produccion.filter(p => p.estado === 'en curso').length
const totalReportes = reportes.length
const totalUsuarios = usuarios.length

const productosTop = [
  {
    nombre: 'Ramos flores amarillas',
    img: 'https://...jpg',
    ventas: 120
  },
  {
    nombre: 'Ramo rojo',
    img: 'https://...jpg',
    ventas: 110
  },
  {
    nombre: 'Ramo rosado',
    img: 'https://...jpg',
    ventas: 105
  },
  {
    nombre: 'Ramo primavera',
    img: 'https://...jpg',
    ventas: 100
  }
]

const ventasMensuales = Array.from({ length: 12 }, (_, i) => {
  const mes = new Date(0, i).toLocaleString('es-PE', { month: 'short' })
  const total = ventas
    .filter(v => new Date(v.fecha).getMonth() === i)
    .reduce((acc, curr) => acc + curr.total, 0)
  return { mes, ventas: total }
})

const estadoPedidos = [
  { name: 'Completados', value: pedidos.filter(p => p.estado === 'completado').length },
  { name: 'Pendientes', value: pedidos.filter(p => p.estado === 'pendiente').length },
  { name: 'Cancelados', value: pedidos.filter(p => p.estado === 'cancelado').length }
]

export default function DashboardAdmin() {
  const { usuario } = useAuth()

  return (
    <PageTransition>
      {/* Bienvenida */}
      <motion.div
        className="bg-gradient-to-r from-white via-pink-100 to-blue-100 p-8 rounded-3xl mb-10 shadow-xl border border-pink-200"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl font-bold text-gray-800">
          💖 Bienvenido, {usuario?.rol === 'administrador' ? 'Administrador' : 'Vendedor'}
        </h1>
        <p className="text-sm text-gray-600 mt-1">Revisa el estado actual de tu emprendimiento con estilo.</p>
      </motion.div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <CardStat title="Productos" value={totalProductos} icon={<FaBoxOpen />} color="from-blue-100 to-blue-50" />
        <CardStat title="Ventas" value={`S/ ${totalVentas}`} icon={<FaMoneyBillWave />} color="from-pink-100 to-pink-50" />
        <CardStat title="Pedidos" value={totalPedidos} icon={<FaClipboardList />} color="from-purple-100 to-purple-50" />
        <CardStat title="Insumos" value={totalInsumos} icon={<FaTools />} color="from-yellow-100 to-yellow-50" />
        <CardStat title="Producción" value={`${produccionActiva} en curso`} icon={<FaIndustry />} color="from-green-100 to-green-50" />
        <CardStat title="Reportes" value={totalReportes} icon={<FaChartLine />} color="from-indigo-100 to-indigo-50" />
        <CardStat title="Usuarios" value={totalUsuarios} icon={<FaUser />} color="from-red-100 to-red-50" />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/70 backdrop-blur-md border border-pink-100 p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-lg font-bold text-gray-700 mb-4">📊 Ventas mensuales</h2>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={ventasMensuales}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventas" fill="#f472b6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/70 backdrop-blur-md border border-blue-100 p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-lg font-bold text-gray-700 mb-4">📦 Estado de pedidos</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={estadoPedidos} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {estadoPedidos.map((entry, index) => (
                  <Cell key={index} fill={colores[index % colores.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Productos más vendidos */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-white to-pink-50 p-6 rounded-2xl shadow-2xl border border-pink-100"
      >
        <h2 className="text-xl font-bold text-gray-700 mb-6">🌟 Productos más vendidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 mb-6">
          {productosTop.map((producto, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="relative rounded-xl overflow-hidden shadow-md border border-pink-100 bg-white"
            >
              <img src={producto.img} alt={producto.nombre} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-md font-bold text-gray-700">{producto.nombre}</h3>
                <p className="text-sm text-pink-500 mt-1">💖 {producto.ventas}+ vendidos</p>
              </div>
              <div className="absolute top-2 right-2 bg-pink-300 text-white text-xs px-3 py-1 rounded-full shadow">
                TOP {i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageTransition>
  )
}

function CardStat({ title, value, icon, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`p-3 rounded-lg bg-gradient-to-br ${color} shadow flex justify-between items-center border border-white/40 backdrop-blur-md`}
    >
      <div>
        <h3 className="text-xs text-gray-600">{title}</h3>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
      </div>
      <div className="text-xl text-gray-600 opacity-50">{icon}</div>
    </motion.div>
  )
}
