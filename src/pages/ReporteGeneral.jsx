import { useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { FaFilePdf, FaFileExcel } from 'react-icons/fa'

const dataSimulada = [
  { mes: 'Ene', ventas: 400, pedidos: 10, produccion: 5 },
  { mes: 'Feb', ventas: 500, pedidos: 12, produccion: 8 },
  { mes: 'Mar', ventas: 350, pedidos: 8, produccion: 6 },
  { mes: 'Abr', ventas: 600, pedidos: 15, produccion: 10 },
]

export default function ReporteGeneral() {
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  const exportarPDF = () => {
    alert('✅ Exportación a PDF simulada (implementación futura).')
  }

  const exportarExcel = () => {
    alert('✅ Exportación a Excel simulada (implementación futura).')
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-brandPrimary">Reporte General</h1>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-wrap items-center gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600">Desde:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="block mt-1 p-2 border rounded w-40"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Hasta:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="block mt-1 p-2 border rounded w-40"
          />
        </div>
        <button className="bg-pastelPink px-4 py-2 rounded-lg shadow hover:bg-pastelMint transition">
          Generar Reporte
        </button>
      </div>

      {/* Tabla resumen */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Resumen Mensual</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-pastelLavender text-gray-700">
              <tr>
                <th className="px-4 py-2">Mes</th>
                <th className="px-4 py-2">Ventas (S/)</th>
                <th className="px-4 py-2">Pedidos</th>
                <th className="px-4 py-2">Producción</th>
              </tr>
            </thead>
            <tbody>
              {dataSimulada.map((fila, idx) => (
                <tr key={idx} className="border-b hover:bg-pastelCream">
                  <td className="px-4 py-2">{fila.mes}</td>
                  <td className="px-4 py-2">S/ {fila.ventas}</td>
                  <td className="px-4 py-2">{fila.pedidos}</td>
                  <td className="px-4 py-2">{fila.produccion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Ventas por Mes</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataSimulada}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ventas" fill="#f472b6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Exportación */}
      <div className="flex gap-4">
        <button
          onClick={exportarPDF}
          className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition"
        >
          <FaFilePdf /> Exportar PDF
        </button>
        <button
          onClick={exportarExcel}
          className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition"
        >
          <FaFileExcel /> Exportar Excel
        </button>
      </div>
    </div>
  )
}
