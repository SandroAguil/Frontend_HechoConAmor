import { useEffect, useState } from 'react'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

import ModalConfirmacion from './ModalConfirmacion'
import FormularioProducto from './FormularioProducto' // Asegúrate de que este nombre coincida con tu archivo

export default function Productos() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState('Todos')
  const [idAEliminar, setIdAEliminar] = useState(null)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
  const [cargando, setCargando] = useState(false)

  const [productos, setProductos] = useState(() => {
    const almacenados = localStorage.getItem('productos')
    return almacenados
      ? JSON.parse(almacenados)
      : [
          {
            id: 1,
            codigo: 'PROD001',
            nombre: 'Ramo flores amarillas',
            precio: '45.00',
            stock: '10',
            categoria: 'Decoración',
            estado: 'Disponible',
            imagen: 'https://i.imgur.com/kPIqtFP.jpeg',
          },
        ]
  })

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos))
  }, [productos])

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    estado: 'Disponible',
    imagen: '',
  })

  const productosFiltrados = productos.filter((prod) => {
    const coincideBusqueda =
      prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      prod.categoria.toLowerCase().includes(busqueda.toLowerCase())
    const coincideEstado = filtro === 'Todos' || prod.estado === filtro
    return coincideBusqueda && coincideEstado
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNuevoProducto({ ...nuevoProducto, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setCargando(true)

    const { nombre, precio, stock, categoria, imagen } = nuevoProducto
    const nombreTrim = nombre.trim()
    const categoriaTrim = categoria.trim()
    const imagenTrim = imagen.trim()

    if (!nombreTrim || !precio || !stock || !categoriaTrim || !imagenTrim) {
      toast.error('Por favor, completa todos los campos.')
      return setTimeout(() => setCargando(false), 1000)
    }

    if (nombreTrim.length < 3 || nombreTrim.length > 50) {
      toast.error('El nombre debe tener entre 3 y 50 caracteres.')
      return setTimeout(() => setCargando(false), 1000)
    }

    if (categoriaTrim.length < 3 || categoriaTrim.length > 50) {
      toast.error('La categoría debe tener entre 3 y 50 caracteres.')
      return setTimeout(() => setCargando(false), 1000)
    }

    if (isNaN(precio) || Number(precio) <= 0) {
      toast.error('El precio debe ser un número mayor que cero.')
      return setTimeout(() => setCargando(false), 1000)
    }

    if (isNaN(stock) || Number(stock) < 0) {
      toast.error('El stock debe ser un número igual o mayor que cero.')
      return setTimeout(() => setCargando(false), 1000)
    }

    try {
      new URL(imagenTrim)
    } catch {
      toast.error('Ingresa una URL válida.')
      return setTimeout(() => setCargando(false), 1000)
    }

    const yaExiste = productos.some(
      (prod) =>
        prod.nombre.trim().toLowerCase() === nombreTrim.toLowerCase()
    )
    if (yaExiste) {
      toast.error('Ya existe un producto con ese nombre.')
      return setTimeout(() => setCargando(false), 1000)
    }

    const id = Date.now()
    const codigo = `PROD${(productos.length + 1)
      .toString()
      .padStart(3, '0')}`
    const nuevo = {
      ...nuevoProducto,
      id,
      codigo,
      nombre: nombreTrim,
      categoria: categoriaTrim,
      imagen: imagenTrim,
    }

    const actualizados = [...productos, nuevo]
    setProductos(actualizados)
    localStorage.setItem('productos', JSON.stringify(actualizados))

    setTimeout(() => {
      setNuevoProducto({
        nombre: '',
        precio: '',
        stock: '',
        categoria: '',
        estado: 'Disponible',
        imagen: '',
      })
      setMostrarFormulario(false)
      toast.success('Producto agregado correctamente')
      setCargando(false)
    }, 1500)
  }

  const handleEliminar = () => {
    setCargando(true)
    const actualizados = productos.filter((p) => p.id !== idAEliminar)
    setProductos(actualizados)
    localStorage.setItem('productos', JSON.stringify(actualizados))
    setTimeout(() => {
      toast.success('Producto eliminado correctamente')
      setMostrarConfirmacion(false)
      setIdAEliminar(null)
      setCargando(false)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-4xl font-bold text-brandPrimary">Productos</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-pastelPink text-gray-800 rounded-lg shadow hover:bg-pastelBlue transition"
          onClick={() => setMostrarFormulario(true)}
        >
          <FaPlus />
          Agregar Producto
        </button>
      </div>

      {/* Filtro y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre o categoría"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full sm:w-1/2 p-2 border rounded-lg shadow"
        />
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="w-full sm:w-1/4 p-2 border rounded-lg shadow"
        >
          <option value="Todos">Todos</option>
          <option value="Disponible">Disponible</option>
          <option value="Agotado">Agotado</option>
        </select>
      </div>

      {/* Tabla de productos */}
      <div className="overflow-x-auto shadow rounded-xl">
        <table className="min-w-full bg-white text-sm rounded-xl">
          <thead className="bg-pastelLavender text-gray-700">
            <tr>
              <th className="text-left px-4 py-3">Imagen</th>
              <th className="text-left px-4 py-3">Código</th>
              <th className="text-left px-4 py-3">Nombre</th>
              <th className="text-left px-4 py-3">Precio</th>
              <th className="text-left px-4 py-3">Stock</th>
              <th className="text-left px-4 py-3">Categoría</th>
              <th className="text-left px-4 py-3">Estado</th>
              <th className="text-center px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((prod) => (
              <tr key={prod.id} className="border-b hover:bg-pastelMint transition">
                <td className="px-4 py-3">
                  <img
                    src={prod.imagen}
                    alt={prod.nombre}
                    className="w-12 h-12 object-cover rounded shadow"
                  />
                </td>
                <td className="px-4 py-3">{prod.codigo}</td>
                <td className="px-4 py-3">{prod.nombre}</td>
                <td className="px-4 py-3">S/ {prod.precio}</td>
                <td className="px-4 py-3">{prod.stock}</td>
                <td className="px-4 py-3">{prod.categoria}</td>
                <td className="px-4 py-3">{prod.estado}</td>
                <td className="px-4 py-3 text-center flex justify-center gap-3">
                  <Link
                    to={`/productos/editar/${prod.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      setIdAEliminar(prod.id)
                      setMostrarConfirmacion(true)
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {productosFiltrados.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No se encontraron productos que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal agregar producto */}
      <AnimatePresence>
        {mostrarFormulario && (
          <FormularioProducto
            nuevoProducto={nuevoProducto}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            cargando={cargando}
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
