import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa'
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
  const [nuevoProducto, setNuevoProducto] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    colorId: '',
    materialId: '',
    sizeId: '',
    statusId: '',
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

  const handleEliminar = async () => {
    if (!idAEliminar) return
    setCargando(true)
    try {
      await eliminarProducto(idAEliminar)
      toast.success('Producto eliminado correctamente')
      setProductos(productos.filter((p) => p.id !== idAEliminar))
      setMostrarConfirmacion(false)
    } catch (error) {
      toast.error('Error al eliminar producto')
      console.error(error)
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-pastelLavender">Productos</h1>
        <button
          onClick={() => setMostrarFormulario(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
        >
          <FaPlus /> Agregar
        </button>
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

      <TablaProductos
        productos={productos}
        busqueda={busqueda}
        filtro={filtro}
        setIdAEliminar={setIdAEliminar}
        setMostrarConfirmacion={setMostrarConfirmacion}
      />

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
