import { useState, useEffect } from 'react'
import { FaEdit, FaTrash, FaTh, FaList, FaPlus } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import ModalConfirmacion from './ModalConfirmacion'
import FormularioProducto from './FormularioProducto'
import TablaProductos from './TablaProductos'
import {
  obtenerProductos,
  crearProducto,
  eliminarProductoPorId
} from '../../services/productosService'


export default function Productos() {
  const [vista, setVista] = useState('galeria')
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todos')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
  const [idAEliminar, setIdAEliminar] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [productos, setProductos] = useState([])

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    estado: 'Disponible',
    imagen: '',
  })

  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos()
      setProductos(data)
    } catch (error) {
      toast.error('Error al cargar productos')
      console.error(error)
    }
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  const handleCrearProducto = async (e) => {
    e.preventDefault()
    if (!nuevoProducto.nombre || !nuevoProducto.precio) {
      toast.error('Completa todos los campos')
      return
    }

    setCargando(true)
    try {
      const nuevo = {
        ...nuevoProducto,
        codigo: `PROD${(productos.length + 1).toString().padStart(3, '0')}`,
      }
      await crearProducto(nuevo)
      toast.success('Producto agregado correctamente')
      setMostrarFormulario(false)
      setNuevoProducto({
        nombre: '',
        precio: '',
        stock: '',
        categoria: '',
        estado: 'Disponible',
        imagen: '',
      })
      await cargarProductos()
    } catch (error) {
      toast.error('Error al agregar producto')
      console.error(error)
    } finally {
      setCargando(false)
    }
  }

  const handleEliminar = async () => {
    setCargando(true)
    try {
      await eliminarProductoPorId(idAEliminar)
      toast.success('Producto eliminado correctamente')
      setMostrarConfirmacion(false)
      setIdAEliminar(null)
      await cargarProductos()
    } catch (error) {
      toast.error('Error al eliminar producto')
      console.error(error)
    } finally {
      setCargando(false)
    }
  }

  const productosFiltrados = productos.filter((prod) => {
    const coincideBusqueda =
      prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      prod.categoria.toLowerCase().includes(busqueda.toLowerCase())
    const coincideEstado = filtro === 'Todos' || prod.estado === filtro
    return coincideBusqueda && coincideEstado
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-4xl font-bold text-brandPrimary">Gestión de Productos</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setVista('lista')}
            className={`p-2 rounded-lg shadow ${vista === 'lista' ? 'bg-blue-200' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <FaList className="text-xl text-gray-700" />
          </button>
          <button
            onClick={() => setVista('galeria')}
            className={`p-2 rounded-lg shadow ${vista === 'galeria' ? 'bg-blue-200' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <FaTh className="text-xl text-gray-700" />
          </button>
          <button
            onClick={() => setMostrarFormulario(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            <FaPlus />
            Agregar Producto
          </button>
        </div>
      </div>

      {/* Filtro y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre o categoría"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg shadow"
        />
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full sm:w-1/4 p-2 border border-gray-300 rounded-lg shadow"
        >
          <option value="Todos">Todos</option>
          <option value="Disponible">Disponible</option>
          <option value="Agotado">Agotado</option>
        </select>
      </div>

      {/* Vista dinámica */}
      {vista === 'lista' ? (
        <TablaProductos
          productos={productos}
          busqueda={busqueda}
          filtro={filtro}
          setIdAEliminar={setIdAEliminar}
          setMostrarConfirmacion={setMostrarConfirmacion}
        />
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {productosFiltrados.map((prod) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-transform"
              >
                <img src={prod.imagen} alt={prod.nombre} className="w-full h-40 object-cover" />
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">{prod.nombre}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${prod.estado === 'Disponible' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{prod.estado}</span>
                  </div>
                  <p className="text-sm text-gray-600">Categoría: {prod.categoria}</p>
                  <p className="text-sm font-bold text-blue-600">S/ {prod.precio}</p>
                  <div className="flex justify-end gap-2 mt-2">
                    <Link to={`/productos/editar/${prod.id}`} className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </Link>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => {
                        setIdAEliminar(prod.id)
                        setMostrarConfirmacion(true)
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modal agregar producto */}
      <AnimatePresence>
        {mostrarFormulario && (
<FormularioProducto
  nuevoProducto={nuevoProducto}
  setNuevoProducto={setNuevoProducto}
  onProductoCreado={cargarProductos}
  cargando={cargando}
  setCargando={setCargando}
  cerrar={() => setMostrarFormulario(false)}
/>

        )}
      </AnimatePresence>

      {/* Modal confirmación eliminar */}
      <AnimatePresence>
        {mostrarConfirmacion && (
          <ModalConfirmacion
            onCancelar={() => {
              setMostrarConfirmacion(false)
              setIdAEliminar(null)
            }}
            onEliminar={handleEliminar}
            cargando={cargando}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
