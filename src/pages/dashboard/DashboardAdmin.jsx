import React, { useEffect, useState } from 'react'
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
import { obtenerProductos } from '../../services/productosService' // ✅ Nuevo

const colores = ['#A0D8EF', '#FADADD', '#E6E6FA']

export default function DashboardAdmin() {
  const { pedidos, ventas, insumos, ordenesProduccion, usuarios, reportes } = useDatos()
  const { usuario } = useAuth()

  // ✅ Estado para productos reales desde la API
  const [productos, setProductos] = useState([])
  const [cargandoProductos, setCargandoProductos] = useState(true)

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await obtenerProductos()
        const productosFiltrados = usuario?.rol === 'administrador'
          ? data
          : data.filter((p) => p.creadoPor === usuario?.id)
        setProductos(productosFiltrados)
      } catch (error) {
        console.error('Error al obtener productos del backend:', error)
      } finally {
        setCargandoProductos(false)
      }
    }

    cargarProductos()
  }, [usuario])

  const totalProductos = productos.length
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
      img: 'https://scontent.flim31-1.fna.fbcdn.net/v/t39.30808-6/492660023_1259926122802458_5134095741125500154_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHfoRmfWIiev2qB4QbM6TzsDoZwFUpIHjcOhnAVSkgeNxdRg8UNVqGVuvL6glGjT3uXnbOHgY8jpH_onrIqx2Ue&_nc_ohc=TgwliWPhXxQQ7kNvwH-X2_b&_nc_oc=Adl8zmUeNp0bMe_kQy_mPmmZNzy4w9460wrrpwDiSW9qDlc15MtiKZHg0TVYx_i-a-rlPSx7BVVbAKL9IohAAW-5&_nc_zt=23&_nc_ht=scontent.flim31-1.fna&_nc_gid=lwSDfuYcguSEmEggiSTkuQ&oh=00_AfMvaF5s0s237nGwvZAm352CaVGkgwYCU9QXqN_BfA_6Sw&oe=686A5F19',
      ventas: 120
    },
    {
      nombre: 'Ramo rojo',
      img: 'https://scontent.flim31-1.fna.fbcdn.net/v/t39.30808-6/491557397_1252442210217516_1258238891102956831_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEYA5o2Aox93DdY9bJQ3HsFjk5P1T-IOh2OTk_VP4g6HfO9A6HbPLXiiINyXwGn8gdFgWvEJ2dIzSgVFbG5U_7C&_nc_ohc=kItrlfmux_EQ7kNvwFDvuQ6&_nc_oc=AdkV2ewvZ4TwvADsYrLMaBxqlZrCAZXozH_trkKydlmQWyFBkgm7FVLpOfekpygWa6US957z5H3uWk4hiOg-YcEr&_nc_zt=23&_nc_ht=scontent.flim31-1.fna&_nc_gid=KIgaO-OdROL7eY-ZDEwVtg&oh=00_AfN15SFSRnwToHPCqSuPRz1zvn_2gYn0stSjFjncqVyFeQ&oe=686A5C13',
      ventas: 110
    },
    {
      nombre: 'Ramo rosado',
      img: 'https://scontent.flim31-1.fna.fbcdn.net/v/t39.30808-6/492148933_1252442266884177_7301925411048297623_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEXch472Ps309vIrqDG0PKkptu4snDb5DKm27iycNvkMnVHTUCyi2S9IQY4RX1KRhm_twPCKe4Y6rkAHYLTM4ab&_nc_ohc=YZzB_0kmyCgQ7kNvwFhMzup&_nc_oc=AdklmHERvw7NftPZdiwWZD3S_QB4uZlEPDYpZumZxq1mZa93iGOnWwjwi7NeG8MRLJp6BRIXq-xTaf2Vrl_XneFa&_nc_zt=23&_nc_ht=scontent.flim31-1.fna&_nc_gid=aVHHs6qSeMMENzYn0AwaVw&oh=00_AfNNif7wmRZdHZofZdmBPQi1Sy5ySRHWhpA8Agli17iXyg&oe=686A3D87',
      ventas: 105
    },
    {
      nombre: 'Ramo primavera',
      img: 'https://scontent.flim31-1.fna.fbcdn.net/v/t39.30808-6/491680176_1252453696883034_2444984827761800657_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF4lZhkJ7Utj-mRZfiXAHlLRGhI9-k0GwBEaEj36TQbACvIwsSTR2drnT5mtWnkoYxzEUgPpQ7aZaUqjjSvi9xI&_nc_ohc=dmC7LI1HCpsQ7kNvwFvsUTQ&_nc_oc=Adm6DDbPVrpa1c2VHDDDus5A39gHb57hiU84rfOIY6yml0iMcfSHIpv1Jhp3h-niziLhr3oF1J4DCg2l6YQSZqwh&_nc_zt=23&_nc_ht=scontent.flim31-1.fna&_nc_gid=UgS_eedr5_awCjzTDCitMg&oh=00_AfMd7WRjBeev_HBEpjjK29MBM-_Odg3ZRtVu1hd3uS7_RQ&oe=686A71F3',
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
        <CardStat title="Productos" value={cargandoProductos ? 'Cargando...' : totalProductos} icon={<FaBoxOpen className="text-blue-500" />} color="from-blue-100 to-blue-50" />
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
