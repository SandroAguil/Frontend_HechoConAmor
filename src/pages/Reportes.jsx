import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const reportes = [
  { tipo: 'ventas', titulo: 'Reporte de Ventas', color: 'bg-pastelBlue' },
  { tipo: 'produccion', titulo: 'Reporte de Producción', color: 'bg-pastelLavender' },
  { tipo: 'pedidos', titulo: 'Reporte de Pedidos', color: 'bg-pastelPink' },
  { tipo: 'inventario', titulo: 'Reporte de Inventario', color: 'bg-pastelMint' },
  { tipo: 'general', titulo: 'Reporte General', color: 'bg-pastelCream' }
]

export default function Reportes() {
  const { usuario } = useAuth()

  if (!usuario || usuario.rol !== 'administrador') {
    return (
      <div className="text-center text-red-500 text-xl mt-10 font-semibold">
        Solo los administradores pueden acceder a reportes avanzados.
      </div>
    )
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-brandPrimary">Reportes del Sistema</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportes.map((reporte) => (
          <Link
            key={reporte.tipo}
            to={`/reportes/${reporte.tipo}`}
            className={`p-6 rounded-xl shadow-lg text-center font-semibold text-lg ${reporte.color} hover:scale-105 transition-transform duration-300`}
          >
            {reporte.titulo}
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
