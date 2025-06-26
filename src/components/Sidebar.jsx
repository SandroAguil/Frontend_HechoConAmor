import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext' // 👈 importa el contexto

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Productos', path: '/productos' },
  { name: 'Ventas', path: '/ventas' },
  { name: 'Pedidos', path: '/pedidos' }, // ✅ Agregado
  { name: 'Insumos', path: '/insumos' },
  { name: 'Producción', path: '/produccion' },
  { name: 'Reportes', path: '/reportes' },
  
]

export default function Sidebar() {
  const location = useLocation()
  const { usuario } = useAuth() // 👈 accede al rol del usuario

  return (
    <div className="w-64 h-full bg-pastelLavender p-6 shadow-md">
      <h1 className="text-2xl font-bold text-brandPrimary mb-6 text-center">Hecho con Amor</h1>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`block p-3 rounded-lg transition-all font-medium ${
              location.pathname === item.path
                ? 'bg-brandPrimary text-white'
                : 'hover:bg-pastelPink hover:text-black'
            }`}
          >
            {item.name}
          </Link>
        ))}

        {/* 👥 Solo para administradores */}
        {usuario?.rol === 'administrador' && (
          <Link
            to="/usuarios"
            className={`block p-3 rounded-lg transition-all font-medium ${
              location.pathname === '/usuarios'
                ? 'bg-brandPrimary text-white'
                : 'hover:bg-pastelPink hover:text-black'
            }`}
          >
            👥 Usuarios
          </Link>
        )}
      </nav>
    </div>
  )
}
