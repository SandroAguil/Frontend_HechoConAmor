import { useAuth } from '../../context/AuthContext'
import DashboardAdmin from './DashboardAdmin'
import DashboardVendedor from './DashboardVendedor'

export default function Dashboard() {
  const { usuario } = useAuth()

  if (usuario?.rol === 'administrador') {
    return <DashboardAdmin />
  }

  if (usuario?.rol === 'vendedor') {
    return <DashboardVendedor />
  }

  return <div>No tienes acceso al dashboard</div>
}
