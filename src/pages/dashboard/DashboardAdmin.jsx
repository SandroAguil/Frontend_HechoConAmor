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
import { useDatos } from '../../context/DataSimuladaContext'

const colores = ['#A0D8EF', '#FADADD', '#E6E6FA']

export default function DashboardAdmin() {
  const { productos, pedidos, ventas, insumos, ordenesProduccion, usuarios, reportes } = useDatos()
  const { usuario } = useAuth()

  const productosFiltrados = usuario?.rol === 'administrador'
    ? productos
    : productos.filter((p) => p.creadoPor === usuario.id)

  const totalProductos = productosFiltrados.length
  const totalUsuarios = usuarios.length
  const totalPedidos = pedidos.length
  const totalVentas = ventas
    .filter((v) => v.estado === 'Completada')
    .reduce((acc, v) => acc + parseFloat(v.total), 0)
  const totalInsumos = insumos.length
  const produccionActiva = ordenesProduccion.filter(p => p.estado === 'En curso').length
  const totalReportes = reportes.length

  const productosTop = [
    {
      nombre: 'Ramos flores amarillas',
      img: 'https://scontent.flim31-1.fna.fbcdn.net/v/t39.30808-6/492509511_1259926162802454_8205964272300312641_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEZuXz4-irqcUtEamfCNdPqodJHTVrXWBKh0kdNWtdYEvKSeYmIYE9XEZaCHDBWAEvhn52MzOvfJzvSBFom_yVj&_nc_ohc=w2L35dCJ1OIQ7kNvwGc0j3N&_nc_oc=Adl-fbtCXe5djjRX19STFMlShUduneEao-yCWhyEnALvPPVo1Bb5SetF5sq36Zb5DnKpVkZpF1I1TSZtg34lLZoO&_nc_zt=23&_nc_ht=scontent.flim31-1.fna&_nc_gid=03cMC9pylSl4qbVB55uNdQ&oh=00_AfMUQqe_T00DYCausWKWhPA6xPB927WJipfSCFuSuH-aeA&oe=686BE4A7',
      ventas: 120
    },
    {
      nombre: 'Ramo rojo',
      img: 'https://scontent.flim31-1.fna.fbcdn.net/v/t39.30808-6/491557397_1252442210217516_1258238891102956831_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEYA5o2Aox93DdY9bJQ3HsFjk5P1T-IOh2OTk_VP4g6HfO9A6HbPLXiiINyXwGn8gdFgWvEJ2dIzSgVFbG5U_7C&_nc_ohc=kItrlfmux_EQ7kNvwGjwJSQ&_nc_oc=AdkwvpldTk3KMeuO7XCnQuBuM5Zqin5Lt8eYWs7eodkN1iXUmxnJ0AhUBYxl7b7SWT-eLq_1ejt9EqN58mb8W85Z&_nc_zt=23&_nc_ht=scontent.flim31-1.fna&_nc_gid=h51tgYMOrSx8e9loin37ww&oh=00_AfOoVWRrDmp5xjk9lAfdwOYJPjhSM0NP7RJOaOiVL8g4cw&oe=686BE5D3',
      ventas: 110
    },
    {
      nombre: 'Ramo rosado',
      img: 'https://scontent.flim31-1.fna.fbcdn.net/v/t39.30808-6/492148933_1252442266884177_7301925411048297623_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEXch472Ps309vIrqDG0PKkptu4snDb5DKm27iycNvkMnVHTUCyi2S9IQY4RX1KRhm_twPCKe4Y6rkAHYLTM4ab&_nc_ohc=YZzB_0kmyCgQ7kNvwGOVAna&_nc_oc=Adk8Y2fV__S0ueSQoXGRfnqfH_OdmPvoOc-_vgO5Rk403grLCGyDe1CsZqNrtlxX-hJnUQ0HCmgxfRHfl9rWI1g8&_nc_zt=23&_nc_ht=scontent.flim31-1.fna&_nc_gid=mCKMs5v8Uf2rFl2XTwVJsQ&oh=00_AfPOnJLLPMYA-oGHaa_cp43TLWTLxjIzY7vBMYuB-TWHGw&oe=686BC747',
      ventas: 105
    },
    {
      nombre: 'Ramo primavera',
      img: 'https://scontent.flim31-1.fna.fbcdn.net/v/t39.30808-6/491680176_1252453696883034_2444984827761800657_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF4lZhkJ7Utj-mRZfiXAHlLRGhI9-k0GwBEaEj36TQbACvIwsSTR2drnT5mtWnkoYxzEUgPpQ7aZaUqjjSvi9xI&_nc_ohc=dmC7LI1HCpsQ7kNvwE96oMZ&_nc_oc=AdmFzIBQE6pjaQipDiOWimujwh2t87SHHYOYH-0JGIKFuq0h0XZpovIy94T21jdTdVAAPBz-FMGLJqFO43XGlc6r&_nc_zt=23&_nc_ht=scontent.flim31-1.fna&_nc_gid=zyYgS_E62nyLJV6pmGy_2Q&oh=00_AfOebM8hlajS7VJNDUsRC-rPnBjlGpzdEUY7GfSR0dYXgQ&oe=686BC373',
      ventas: 100
    }
  ]

  const ventasMensuales = Array.from({ length: 12 }, (_, i) => {
    const mes = new Date(0, i).toLocaleString('es-PE', { month: 'short' })
    const total = ventas
      .filter(v => new Date(v.fecha).getMonth() === i && v.estado === 'Completada')
      .reduce((acc, v) => acc + parseFloat(v.total), 0)

    return { mes, ventas: total }
  })

const estadoPedidos = [
  { name: 'Completados', value: pedidos.filter(p => p.estado?.toLowerCase() === 'completado').length },
  { name: 'Pendientes', value: pedidos.filter(p => p.estado?.toLowerCase() === 'pendiente').length },
  { name: 'Cancelados', value: pedidos.filter(p => p.estado?.toLowerCase() === 'cancelado').length }
]


  return (
    <PageTransition>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <CardStat title="Productos" value={totalProductos} icon={<FaBoxOpen className="text-blue-500" />} color="from-blue-100 to-blue-50" />
        <CardStat title="Ventas" value={`S/ ${totalVentas}`} icon={<FaMoneyBillWave className="text-green-500" />} color="from-pink-100 to-pink-50" />
        <CardStat title="Pedidos" value={totalPedidos} icon={<FaClipboardList className="text-purple-500" />} color="from-purple-100 to-purple-50" />
        <CardStat title="Insumos" value={totalInsumos} icon={<FaTools className="text-yellow-500" />} color="from-yellow-100 to-yellow-50" />
        <CardStat title="Producción" value={`${produccionActiva} en curso`} icon={<FaIndustry className="text-emerald-500" />} color="from-green-100 to-green-50" />
        <CardStat title="Reportes" value={totalReportes} icon={<FaChartLine className="text-indigo-500" />} color="from-indigo-100 to-indigo-50" />
        <CardStat title="Usuarios" value={totalUsuarios} icon={<FaUser className="text-rose-500" />} color="from-red-100 to-red-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/70 backdrop-blur-md border border-pink-100 p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-lg font-bold text-gray-700 mb-4">📊 Ventas mensuales</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ventasMensuales} margin={{ top: 20 }}>
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
      <Pie
        data={estadoPedidos}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label
      >
        {estadoPedidos.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</motion.div>

      </div>

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
      <div className="text-xl">{icon}</div>
    </motion.div>
  )
}