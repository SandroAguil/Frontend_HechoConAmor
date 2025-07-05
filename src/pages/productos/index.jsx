import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaPlus, FaTh, FaList } from 'react-icons/fa'
import TablaProductos from './TablaProductos'
import FormularioProducto from './FormularioProducto'
import ModalConfirmacion from './ModalConfirmacion'
import {
  obtenerProductos,
  eliminarProducto,
} from '../../services/productosService'

export default function ProductosPage() {
  const [productos, setProductos] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
  const [idAEliminar, setIdAEliminar] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todos')
  const [cargando, setCargando] = useState(false)
  const [modoGaleria, setModoGaleria] = useState(true)
  const [nuevoProducto, setNuevoProducto] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    categoryId: '',
    colorId: '',
    materialId: '',
    sizeId: '',
    statusId: '',
  })

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos()

      // Combinar productos reales con los guardados localmente para mostrar imagenes
      const locales = JSON.parse(localStorage.getItem('productosLocales') || '[]')
      const todos = [...data, ...locales]

      setProductos(todos)
    } catch (error) {
      toast.error('Error al cargar productos')
      console.error(error)
    }
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  const handleEliminar = async () => {
    if (!idAEliminar) return
    setCargando(true)
    try {
      await eliminarProducto(idAEliminar)
      toast.success('Producto eliminado correctamente')
      setProductos(productos.filter((p) => p.id !== idAEliminar))

      // También eliminar del localStorage si es local
      const productosLocales = JSON.parse(localStorage.getItem('productosLocales') || '[]')
      const nuevosLocales = productosLocales.filter((p) => p.id !== idAEliminar)
      localStorage.setItem('productosLocales', JSON.stringify(nuevosLocales))

      setMostrarConfirmacion(false)
    } catch (error) {
      toast.error('Error al eliminar producto')
      console.error(error)
    } finally {
      setCargando(false)
    }
  }

  // Filtrado
  const productosFiltrados = productos
    .filter((p) =>
      p.name?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.category?.toLowerCase().includes(busqueda.toLowerCase())
    )
    .filter((p) => {
      if (filtro === 'Todos') return true
      return p.status?.name === filtro || p.status === filtro
    })

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-pastelLavender">Productos</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setModoGaleria(!modoGaleria)}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-600"
          >
            {modoGaleria ? <FaList /> : <FaTh />}
            {modoGaleria ? 'Ver Lista' : 'Ver Galería'}
          </button>
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
          >
            <FaPlus /> Agregar
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full sm:w-1/2 p-2 border rounded-lg"
        />
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="Todos">Todos</option>
          <option value="Disponible">Disponible</option>
          <option value="Agotado">Agotado</option>
          <option value="Descontinuado">Descontinuado</option>
        </select>
      </div>

      {/* Vista Galería o Tabla */}
      {modoGaleria ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productosFiltrados.map((prod) => (
            <motion.div
              key={prod.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="h-48 w-full bg-gray-200 overflow-hidden">
                {prod.imageUrl ? (
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Sin imagen
                  </div>
                )}
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{prod.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {prod.description}
                </p>
                <p className="text-green-600 font-bold">
                  S/ {parseFloat(prod.price).toFixed(2)}
                </p>
                <span className="text-xs text-gray-500">
                  Estado: {prod.status?.name || prod.status || 'N/A'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <TablaProductos
          productos={productos}
          busqueda={busqueda}
          filtro={filtro}
          setIdAEliminar={setIdAEliminar}
          setMostrarConfirmacion={setMostrarConfirmacion}
        />
      )}

      {/* Modal para crear nuevo producto */}
      <AnimatePresence>
        {mostrarFormulario && (
          <FormularioProducto
            nuevoProducto={nuevoProducto}
            setNuevoProducto={setNuevoProducto}
            onProductoCreado={cargarProductos}
            cargando={cargando}
            setCargando={setCargando}
            cerrar={() => {
              setMostrarFormulario(false)
              setNuevoProducto({
                name: '',
                description: '',
                price: '',
                imageUrl: '',
                categoryId: '',
                colorId: '',
                materialId: '',
                sizeId: '',
                statusId: '',
              })
            }}
          />
        )}
      </AnimatePresence>

      {/* Modal de confirmación para eliminar */}
      <AnimatePresence>
        {mostrarConfirmacion && (
          <ModalConfirmacion
            onCancelar={() => setMostrarConfirmacion(false)}
            onEliminar={handleEliminar}
            cargando={cargando}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
