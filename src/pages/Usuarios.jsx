import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Usuarios() {
  const [vendedores, setVendedores] = useState([
    'vendedor1@gmail.com',
    'vendedor2@gmail.com'
  ])
  const [nuevoCorreo, setNuevoCorreo] = useState('')
  const [error, setError] = useState('')

  const agregarVendedor = () => {
    if (!nuevoCorreo.includes('@') || vendedores.includes(nuevoCorreo)) {
      setError('Correo inválido o ya registrado.')
      return
    }

    setVendedores([...vendedores, nuevoCorreo])
    setNuevoCorreo('')
    setError('')
  }

  const eliminarVendedor = (correo) => {
    setVendedores(vendedores.filter((v) => v !== correo))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <h1 className="text-4xl font-bold text-brandPrimary">Gestión de Usuarios</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Nuevo correo de vendedor"
            value={nuevoCorreo}
            onChange={(e) => setNuevoCorreo(e.target.value)}
            className="flex-1 px-4 py-2 border rounded focus:ring-2 focus:ring-pastelPink"
          />
          <button
            onClick={agregarVendedor}
            className="bg-pastelBlue px-4 py-2 rounded hover:bg-pastelMint transition font-semibold"
          >
            Agregar
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <table className="w-full mt-4 text-sm bg-white rounded-xl overflow-hidden shadow">
          <thead className="bg-pastelLavender text-left text-gray-700">
            <tr>
              <th className="px-4 py-2">Correo del vendedor</th>
              <th className="px-4 py-2 text-right">Acción</th>
            </tr>
          </thead>
          <tbody>
            {vendedores.map((v, i) => (
              <tr key={i} className="border-t hover:bg-pastelCream">
                <td className="px-4 py-2">{v}</td>
                <td className="px-4 py-2 text-right">
                  <button
                    onClick={() => eliminarVendedor(v)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
