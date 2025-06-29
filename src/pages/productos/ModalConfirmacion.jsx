import { motion } from 'framer-motion'

export default function ModalConfirmacion({ onCancelar, onEliminar, cargando }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">¿Estás seguro?</h2>
        <p className="text-gray-600 mb-6">Esta acción no se puede deshacer.</p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onCancelar}
            disabled={cargando}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-2 justify-center"
            onClick={onEliminar}
            disabled={cargando}
          >
            {cargando && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {cargando ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
