import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { useDatos } from '../../context/DataSimuladaContext'

export default function Usuarios() {
  const {
    usuarios,
    agregarUsuario,
    editarUsuario,
    eliminarUsuario,
    cambiarEstadoUsuario
  } = useDatos()

  const [nuevoCorreo, setNuevoCorreo] = useState('')
  const [error, setError] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [correoAEliminar, setCorreoAEliminar] = useState(null)
  const [editandoCorreo, setEditandoCorreo] = useState(null)

  const agregarVendedor = () => {
    if (!nuevoCorreo.includes('@') || usuarios.some(u => u.correo === nuevoCorreo)) {
      setError('Correo inválido o ya registrado.')
      return
    }

    agregarUsuario(nuevoCorreo)
    setNuevoCorreo('')
    setError('')
    toast.success('✅ Usuario agregado correctamente.')
  }

  const iniciarEdicion = (correo) => {
    setEditandoCorreo(correo)
  }

  const guardarEdicion = (correoAnterior, nuevoCorreo) => {
    if (!nuevoCorreo.includes('@')) {
      toast.error('Correo inválido.')
      return
    }
    editarUsuario(correoAnterior, nuevoCorreo)
    setEditandoCorreo(null)
    toast.success('Correo actualizado.')
  }

  const cancelarEdicion = () => {
    setEditandoCorreo(null)
  }

  const toggleEstado = (correo) => {
    cambiarEstadoUsuario(correo)
  }

  const confirmarEliminacion = (correo) => {
    setCorreoAEliminar(correo)
    setModalVisible(true)
  }

  const eliminarVendedor = () => {
    eliminarUsuario(correoAEliminar)
    toast.success(`Usuario ${correoAEliminar} eliminado`)
    setModalVisible(false)
    setCorreoAEliminar(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 relative"
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
            Agregar vendedor
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Galería tipo tarjeta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {usuarios.map((u, index) => (
            <div
              key={index}
              className="bg-pastelCream border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="text-sm font-medium text-gray-700 mb-2">
                {editandoCorreo === u.correo ? (
                  <input
                    type="email"
                    defaultValue={u.correo}
                    className="border rounded px-2 py-1 w-full text-sm"
                    onBlur={(e) => guardarEdicion(u.correo, e.target.value)}
                    autoFocus
                  />
                ) : (
                  u.correo
                )}
              </div>

              <div className="mb-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    u.estado === 'activo'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {u.estado}
                </span>
              </div>

              <div className="flex flex-wrap justify-end gap-2 text-sm mt-3">
                {editandoCorreo !== u.correo ? (
                  <>
                    <button
                      onClick={() => iniciarEdicion(u.correo)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => toggleEstado(u.correo)}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      {u.estado === 'activo' ? 'Bloquear' : 'Desbloquear'}
                    </button>
                    <button
                      onClick={() => confirmarEliminacion(u.correo)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={cancelarEdicion}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de confirmación */}
      <AnimatePresence>
        {modalVisible && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full space-y-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <h2 className="text-lg font-bold text-gray-800">¿Eliminar usuario?</h2>
              <p className="text-sm text-gray-600">
                ¿Estás seguro de eliminar <strong>{correoAEliminar}</strong>? Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setModalVisible(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={eliminarVendedor}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
