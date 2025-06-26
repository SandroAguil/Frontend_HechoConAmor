import {
  FaBoxOpen,
  FaClipboardList,
  FaMoneyBillWave,
  FaIndustry
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
import PageTransition from '../components/PageTransition'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const ventasMensuales = [
    { mes: 'Ene', ventas: 1200 },
    { mes: 'Feb', ventas: 1900 },
    { mes: 'Mar', ventas: 950 },
    { mes: 'Abr', ventas: 1750 },
    { mes: 'May', ventas: 2200 }
  ]

  const estadoPedidos = [
    { name: 'Completados', value: 18 },
    { name: 'Pendientes', value: 7 },
    { name: 'Cancelados', value: 3 }
  ]

  const colores = ['#A0D8EF', '#FADADD', '#E6E6FA']

  return (
    <PageTransition>
      {/* Imagen principal */}
      <div className="relative h-52 rounded-xl overflow-hidden shadow-md">
        <img
          src="https://i.imgur.com/SDqkr9P.jpeg"
          alt="Bienvenida"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl text-white font-bold shadow-md text-center">
            ¡Bienvenido al sistema de gestión <br /> <span className="text-pastelPink">Hecho con Amor</span>!
          </h1>
        </div>
      </div>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Productos" value="154" icon={<FaBoxOpen />} color="bg-pastelBlue" />
        <Card title="Ventas" value="S/ 8,500" icon={<FaMoneyBillWave />} color="bg-pastelPink" />
        <Card title="Pedidos" value="35" icon={<FaClipboardList />} color="bg-pastelLavender" />
        <Card title="Producción" value="12 en curso" icon={<FaIndustry />} color="bg-pastelMint" />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Ventas mensuales</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ventasMensuales}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ventas" fill="#f472b6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Estado de pedidos</h2>
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
                  <Cell key={index} fill={colores[index % colores.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageTransition>
  )
}

function Card({ title, value, icon, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-5 rounded-xl shadow-md ${color} text-gray-800 flex items-center justify-between`}
    >
      <div>
        <h3 className="text-md font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-4xl opacity-50">{icon}</div>
    </motion.div>
  )
}
