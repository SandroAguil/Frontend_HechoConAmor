import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import Dashboard from '../pages/Dashboard'
import Productos from '../pages/Productos'
import Ventas from '../pages/Ventas'
import Insumos from '../pages/Insumos'
import Produccion from '../pages/Produccion'
import Pedidos from '../pages/Pedidos'
import Usuarios from '../pages/Usuarios'
import Reportes from '../pages/Reportes'
import ReporteDetalle from '../pages/ReporteDetalle'
import ReporteGeneral from '../pages/ReporteGeneral'
import ReporteVentas from '../pages/ReporteVentas'
import ReporteProduccion from '../pages/ReporteProduccion'
import ReportePedidos from '../pages/ReportePedidos'
import ReporteInventario from '../pages/ReporteInventario'
import Login from '../pages/Login'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'productos',
        element: <Productos />
      },
      {
        path: 'ventas',
        element: <Ventas />
      },
      {
        path: 'produccion',
        element: <Produccion />
      },
      {
        path: 'insumos',
        element: <Insumos />
      },
      {
        path: 'pedidos',
        element: <Pedidos />
      },
      {
        path: 'usuarios',
        element: <Usuarios />
      },
      {
        path: 'reportes',
        element: <Reportes />
      },
      {
        path: 'reportes/general',
        element: <ReporteGeneral />
      },
      {
        path: 'reportes/ventas',
        element: <ReporteVentas />
      },
      {
        path: 'reportes/produccion',
        element: <ReporteProduccion />
      },
      {
        path: 'reportes/pedidos',
        element: <ReportePedidos />
      },
      {
        path: 'reportes/inventario',
        element: <ReporteInventario />
      },
      {
        path: 'reportes/:tipo', // ruta dinámica (opcional si usas ReporteDetalle)
        element: <ReporteDetalle />
      }
    ]
  }
])
