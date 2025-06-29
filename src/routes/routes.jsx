import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import Dashboard from '../pages/dashboard/index'
import Productos from '../pages/productos/index'
import EditarProducto from '../pages/productos/EditarProducto'
import Ventas from '../pages/ventas/index'
import Insumos from '../pages/insumos/index'
import Produccion from '../pages/produccion/index'
import Pedidos from '../pages/pedidos/index'
import Usuarios from '../pages/usuarios/index'
import Reportes from '../pages/Reportes'
import ReporteDetalle from '../pages/reportes/ReporteDetalle'
import ReporteGeneral from '../pages/reportes/ReporteGeneral'
import ReporteVentas from '../pages/reportes/ReporteVentas'
import ReporteProduccion from '../pages/reportes/ReporteProduccion'
import ReportePedidos from '../pages/reportes/ReportePedidos'
import ReporteInventario from '../pages/reportes/ReporteInventario'
import Login from '../pages/login/index'

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
        path: 'productos/editar/:id', // 👈 nueva ruta para edición
        element: <EditarProducto />
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
        path: 'reportes/:tipo',
        element: <ReporteDetalle />
      }
    ]
  }
])
