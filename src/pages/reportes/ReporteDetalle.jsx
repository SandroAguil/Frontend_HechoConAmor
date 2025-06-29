import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
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

const colores = ['#86EFAC', '#FCD34D', '#FCA5A5']

export default function ReporteDetalle() {
  const { tipo } = useParams()

  if (tipo === 'ventas') {
    const ventasMensuales = [
      { mes: 'Ene', total: 400 },
      { mes: 'Feb', total: 620 },
      { mes: 'Mar', total: 480 },
      { mes: 'Abr', total: 550 },
      { mes: 'May', total: 710 }
    ]

    const estadosVenta = [
      { name: 'Completadas', value: 20 },
      { name: 'Pendientes', value: 8 },
      { name: 'Canceladas', value: 3 }
    ]

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-10"
      >
        <h1 className="text-3xl font-bold text-brandPrimary">Reporte de Ventas</h1>

        <SeccionGrafico titulo="Ventas por mes" data={ventasMensuales} dataKey="total" />
        <SeccionPie titulo="Estado de las ventas" data={estadosVenta} />

        <TablaResumen
          titulo="Ventas recientes"
          filas={[
            ['VNT001', 'Ana Rojas', '01/06/2025', 'S/ 150.00', 'Completado'],
            ['VNT002', 'Luis Vega', '03/06/2025', 'S/ 200.00', 'Pendiente']
          ]}
          columnas={['Código', 'Cliente', 'Fecha', 'Monto', 'Estado']}
        />
      </motion.div>
    )
  }

  if (tipo === 'produccion') {
    const produccionesPorProducto = [
      { producto: 'Gorro tejido', cantidad: 20 },
      { producto: 'Bufanda', cantidad: 35 },
      { producto: 'Chompa', cantidad: 15 }
    ]

    const estadosProduccion = [
      { name: 'En proceso', value: 4 },
      { name: 'Finalizadas', value: 10 }
    ]

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-10"
      >
        <h1 className="text-3xl font-bold text-brandPrimary">Reporte de Producción</h1>

        <SeccionGrafico titulo="Producción por producto" data={produccionesPorProducto} dataKey="cantidad" xKey="producto" />
        <SeccionPie titulo="Estado de producción" data={estadosProduccion} />

        <TablaResumen
          titulo="Producciones recientes"
          filas={[
            ['PRD001', 'Gorro tejido', '10/06/2025', '20 unidades', 'Finalizado'],
            ['PRD002', 'Bufanda', '12/06/2025', '15 unidades', 'En proceso']
          ]}
          columnas={['Código', 'Producto', 'Inicio', 'Cantidad', 'Estado']}
        />
      </motion.div>
    )
  }

  if (tipo === 'pedidos') {
  const estadoPedidos = [
    { name: 'Pendientes', value: 6 },
    { name: 'Completados', value: 10 },
    { name: 'Cancelados', value: 2 }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-10"
    >
      <h1 className="text-3xl font-bold text-brandPrimary">Reporte de Pedidos</h1>

      <SeccionPie titulo="Estado de los pedidos" data={estadoPedidos} />

      <TablaResumen
        titulo="Pedidos recientes"
        columnas={['Código', 'Cliente', 'Fecha', 'Total', 'Estado']}
        filas={[
          ['PD001', 'Carlos Rojas', '21/06/2025', 'S/ 80.00', 'Pendiente'],
          ['PD002', 'Lucía García', '20/06/2025', 'S/ 150.00', 'Completado']
        ]}
      />
    </motion.div>
  )
}
if (tipo === 'insumos') {
  const estadoInsumos = [
    { name: 'Suficiente', value: 25 },
    { name: 'Bajo', value: 4 },
    { name: 'Sin stock', value: 1 }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-10"
    >
      <h1 className="text-3xl font-bold text-brandPrimary">Reporte de Insumos</h1>

      <SeccionPie titulo="Estado actual del stock de insumos" data={estadoInsumos} />

      <TablaResumen
        titulo="Insumos críticos"
        columnas={['Código', 'Nombre', 'Unidad', 'Stock', 'Estado']}
        filas={[
          ['INS001', 'Lana rosada', 'metros', 30, 'Suficiente'],
          ['INS002', 'Hilo dorado', 'rollos', 5, 'Bajo'],
          ['INS003', 'Tela blanca', 'metros', 0, 'Sin stock']
        ]}
      />
    </motion.div>
  )
}

if (tipo === 'inventario') {
  const estadoInventario = [
    { name: 'Suficiente', value: 20 },
    { name: 'Bajo', value: 5 },
    { name: 'Sin stock', value: 2 }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-10"
    >
      <h1 className="text-3xl font-bold text-brandPrimary">Reporte de Inventario</h1>

      <SeccionPie titulo="Estado del inventario actual" data={estadoInventario} />

      <TablaResumen
        titulo="Productos con bajo o sin stock"
        columnas={['Código', 'Nombre', 'Stock', 'Categoría', 'Estado']}
        filas={[
          ['INV001', 'Chompa tejida', 5, 'Invierno', 'Bajo'],
          ['INV002', 'Bufanda roja', 0, 'Invierno', 'Sin stock']
        ]}
      />
    </motion.div>
  )
}




  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold text-brandPrimary">Reporte no disponible</h1>
      <p className="text-gray-600">Actualmente solo se han implementado algunos reportes.</p>
    </motion.div>
  )
}

function SeccionGrafico({ titulo, data, dataKey, xKey = 'mes' }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">{titulo}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill="#60A5FA" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function SeccionPie({ titulo, data }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">{titulo}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={colores[index % colores.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

function TablaResumen({ titulo, columnas, filas }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">{titulo}</h2>
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            {columnas.map((col, i) => (
              <th key={i} className="px-4 py-2">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, i) => (
            <tr key={i} className="border-t">
              {fila.map((celda, j) => (
                <td key={j} className="px-4 py-2">{celda}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
