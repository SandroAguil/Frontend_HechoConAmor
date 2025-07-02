import { motion } from 'framer-motion'
import PageTransition from '../../components/PageTransition'
import { useAuth } from '../../context/AuthContext'

export default function DashboardVendedor() {
  const { usuario } = useAuth()

  return (
    <PageTransition>
      <motion.div
        className="bg-gradient-to-r from-white via-pastelPink to-pastelBlue p-8 rounded-3xl mb-10 shadow-xl border border-pink-200"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-gray-800">🛍️ Bienvenido, {usuario?.rol}</h1>
        <p className="text-sm text-gray-600 mt-1">Este es tu panel personal de ventas y pedidos.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white/70 backdrop-blur-md border border-pink-100 p-6 rounded-2xl shadow-xl"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-lg font-bold text-gray-700 mb-2">💰 Tus ventas del mes</h2>
          <p className="text-2xl font-semibold text-pink-600">S/ 2,350</p>
        </motion.div>

        <motion.div
          className="bg-white/70 backdrop-blur-md border border-blue-100 p-6 rounded-2xl shadow-xl"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-lg font-bold text-gray-700 mb-2">📦 Tus pedidos activos</h2>
          <p className="text-2xl font-semibold text-blue-600">12</p>
        </motion.div>
      </div>
    </PageTransition>
  )
}
