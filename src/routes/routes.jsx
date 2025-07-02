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
import RutaProtegida from '../routes/RutaProtegida'



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
        element: (
          <RutaProtegida rolesPermitidos={['administrador', 'vendedor']}>
            <Dashboard />
          </RutaProtegida>
        )
      },
      {
        path: 'productos',
        element: (
          <RutaProtegida rolesPermitidos={['administrador']}>
            <Productos />
          </RutaProtegida>
        )
      },
      {
        path: 'productos/editar/:id',
        element: (
          <RutaProtegida rolesPermitidos={['administrador']}>
            <EditarProducto />
          </RutaProtegida>
        )
      },
      {
        path: 'ventas',
        element: (
          <RutaProtegida rolesPermitidos={['administrador', 'vendedor']}>
            <Ventas />
          </RutaProtegida>
        )
      },
      {
        path: 'produccion',
        element: (
          <RutaProtegida rolesPermitidos={['administrador']}>
            <Produccion />
          </RutaProtegida>
        )
      },
      {
        path: 'insumos',
        element: (
          <RutaProtegida rolesPermitidos={['administrador']}>
            <Insumos />
          </RutaProtegida>
        )
      },
      {
        path: 'pedidos',
        element: (
          <RutaProtegida rolesPermitidos={['administrador', 'vendedor']}>
            <Pedidos />
          </RutaProtegida>
        )
      },
      {
        path: 'usuarios',
        element: (
          <RutaProtegida rolesPermitidos={['administrador']}>
            <Usuarios />
          </RutaProtegida>
        )
      },
      {
        path: 'reportes',
        element: (
          <RutaProtegida rolesPermitidos={['administrador', 'vendedor']}>
            <Reportes />
          </RutaProtegida>
        )
      },
      {
        path: 'reportes/general',
        element: (
          <RutaProtegida rolesPermitidos={['administrador']}>
            <ReporteGeneral />
          </RutaProtegida>
        )
      },
      {
        path: 'reportes/ventas',
        element: (
          <RutaProtegida rolesPermitidos={['administrador', 'vendedor']}>
            <ReporteVentas />
          </RutaProtegida>
        )
      },
      {
        path: 'reportes/produccion',
        element: (
          <RutaProtegida rolesPermitidos={['administrador']}>
            <ReporteProduccion />
          </RutaProtegida>
        )
      },
      {
        path: 'reportes/pedidos',
        element: (
          <RutaProtegida rolesPermitidos={['administrador']}>
            <ReportePedidos />
          </RutaProtegida>
        )
      },
      {
        path: 'reportes/inventario',
        element: (
          <RutaProtegida rolesPermitidos={['administrador']}>
            <ReporteInventario />
          </RutaProtegida>
        )
      },
      {
        path: 'reportes/:tipo',
        element: (
          <RutaProtegida rolesPermitidos={['administrador']}>
            <ReporteDetalle />
          </RutaProtegida>
        )
      }
    ]
  }
])
