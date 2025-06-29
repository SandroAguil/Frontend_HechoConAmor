import { motion } from 'framer-motion'

export default function FormularioProducto({ nuevoProducto, handleChange, handleSubmit, cargando, cerrar }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
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
        <h2 className="text-2xl font-bold mb-4 text-brandPrimary">Nuevo Producto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="nombre" value={nuevoProducto.nombre} onChange={handleChange} placeholder="Nombre" className="w-full p-2 border rounded" required />
          <input type="number" name="precio" value={nuevoProducto.precio} onChange={handleChange} placeholder="Precio" className="w-full p-2 border rounded" required />
          <input type="number" name="stock" value={nuevoProducto.stock} onChange={handleChange} placeholder="Stock" className="w-full p-2 border rounded" required />
          <input type="text" name="categoria" value={nuevoProducto.categoria} onChange={handleChange} placeholder="Categoría" className="w-full p-2 border rounded" required />
          <input type="text" name="imagen" value={nuevoProducto.imagen} onChange={handleChange} placeholder="URL de la imagen" className="w-full p-2 border rounded" required />
          <select name="estado" value={nuevoProducto.estado} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="Disponible">Disponible</option>
            <option value="Agotado">Agotado</option>
          </select>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={cerrar} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pastelBlue rounded hover:bg-pastelMint flex items-center gap-2 justify-center"
              disabled={cargando}
            >
              {cargando && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {cargando ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
