import { createContext, useContext, useState, useEffect } from 'react'

export const DataSimuladaContext = createContext()


export function DataSimuladaProvider({ children }) {
  // ------------------ PRODUCTOS ------------------
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

  const agregarProducto = (nuevoProducto) => {
    const id = Date.now()
    const codigo = `PROD${(productos.length + 1).toString().padStart(3, '0')}`
    const productoFormateado = { ...nuevoProducto, id, codigo }
    setProductos([...productos, productoFormateado])
  }

  const eliminarProducto = (id) => {
    const actualizados = productos.filter((p) => p.id !== id)
    setProductos(actualizados)
  }

  const editarProducto = (productoEditado) => {
    const actualizados = productos.map((p) =>
      p.id === productoEditado.id ? productoEditado : p
    )
    setProductos(actualizados)
  }

  // ------------------ PEDIDOS ------------------
  const [pedidos, setPedidos] = useState(() => {
    const almacenados = localStorage.getItem('pedidos')
    return almacenados
      ? JSON.parse(almacenados)
      : [
          {
            id: 1,
            codigo: 'PED001',
            cliente: 'Carlos Sánchez',
            fecha: '2025-06-24',
            estado: 'Pendiente',
          },
        ]
  })

  useEffect(() => {
    localStorage.setItem('pedidos', JSON.stringify(pedidos))
  }, [pedidos])

  const agregarPedido = (nuevoPedido) => {
    const id = Date.now()
    const codigo = `PED${(pedidos.length + 1).toString().padStart(3, '0')}`
    const pedidoFormateado = { ...nuevoPedido, id, codigo }
    setPedidos([...pedidos, pedidoFormateado])
  }

  const eliminarPedido = (id) => {
    const actualizados = pedidos.filter((p) => p.id !== id)
    setPedidos(actualizados)
  }

  const editarPedido = (pedidoEditado) => {
    const actualizados = pedidos.map((p) =>
      p.id === pedidoEditado.id ? pedidoEditado : p
    )
    setPedidos(actualizados)
  }

  // ------------------ VENTAS ------------------
  const [ventas, setVentas] = useState(() => {
    const almacenadas = localStorage.getItem('ventas')
    return almacenadas
      ? JSON.parse(almacenadas)
      : [
          {
            id: 1,
            cliente: 'Juan Pérez',
            producto: 'Ramo de rosas',
            total: 120,
            fecha: '2025-07-01',
            estado: 'Completada',
          },
        ]
  })

  useEffect(() => {
    localStorage.setItem('ventas', JSON.stringify(ventas))
  }, [ventas])

  const agregarVenta = (nuevaVenta) => {
    const id = Date.now()
    const ventaFormateada = {
      ...nuevaVenta,
      id,
      fecha: new Date().toISOString().split('T')[0],
    }
    setVentas([...ventas, ventaFormateada])
  }

  const eliminarVenta = (id) => {
    const actualizadas = ventas.filter((v) => v.id !== id)
    setVentas(actualizadas)
  }

  const editarVenta = (ventaEditada) => {
    const actualizadas = ventas.map((v) =>
      v.id === ventaEditada.id ? ventaEditada : v
    )
    setVentas(actualizadas)
  }

  // ------------------ INSUMOS ------------------
const [insumos, setInsumos] = useState(() => {
  const almacenados = localStorage.getItem('insumos')
  return almacenados
    ? JSON.parse(almacenados)
    : [
        {
          codigo: 'INS001',
          nombre: 'Lana rosada',
          unidad: 'metros',
          stock: 30,
          estado: 'Suficiente',
        },
        {
          codigo: 'INS002',
          nombre: 'Hilo blanco',
          unidad: 'rollos',
          stock: 3,
          estado: 'Bajo',
        },
      ]
})

useEffect(() => {
  localStorage.setItem('insumos', JSON.stringify(insumos))
}, [insumos])

const agregarInsumo = (nuevo) => {
  const codigo = `INS${(insumos.length + 1).toString().padStart(3, '0')}`
  const nuevoInsumo = {
    ...nuevo,
    codigo,
    estado: calcularEstado(nuevo.stock),
  }
  setInsumos([...insumos, nuevoInsumo])
}

const editarInsumo = (editado) => {
  const actualizados = insumos.map((i) =>
    i.codigo === editado.codigo ? { ...editado, estado: calcularEstado(editado.stock) } : i
  )
  setInsumos(actualizados)
}

const eliminarInsumo = (codigo) => {
  const actualizados = insumos.filter((i) => i.codigo !== codigo)
  setInsumos(actualizados)
}

const calcularEstado = (stock) => {
  const n = Number(stock)
  if (n === 0) return 'Sin stock'
  if (n <= 5) return 'Bajo'
  return 'Suficiente'
}

// 📦 PRODUCCIÓN
// Datos simulados y funciones para gestionar órdenes de producción

const [ordenesProduccion, setOrdenesProduccion] = useState([
  {
    codigo: 'PRD001',
    producto: 'Ramo flores amarillas',
    fecha: '2025-06-25',
    cantidad: 10,
    estado: 'En curso',
    insumos: [
      { id: 1, cantidad: 2 },
      { id: 2, cantidad: 5 }
    ]
  }
])

const agregarOrdenProduccion = (nuevaOrden) => {
  const nuevoCodigo = `PRD${(ordenesProduccion.length + 1).toString().padStart(3, '0')}`
  const ordenConCodigo = { ...nuevaOrden, codigo: nuevoCodigo }
  setOrdenesProduccion([...ordenesProduccion, ordenConCodigo])
}

const editarOrdenProduccion = (codigo, datosActualizados) => {
  const ordenesActualizadas = ordenesProduccion.map((orden) =>
    orden.codigo === codigo
      ? { ...orden, ...datosActualizados }
      : orden
  )
  setOrdenesProduccion(ordenesActualizadas)
}

const eliminarOrdenProduccion = (codigo) => {
  const filtradas = ordenesProduccion.filter((orden) => orden.codigo !== codigo)
  setOrdenesProduccion(filtradas)
}

// ------------------ USUARIOS ------------------
const [usuarios, setUsuarios] = useState(() => {
  const almacenados = localStorage.getItem('usuarios')
  return almacenados
    ? JSON.parse(almacenados)
    : [
        { correo: 'vendedor1@gmail.com', estado: 'activo' },
        { correo: 'vendedor2@gmail.com', estado: 'bloqueado' }
      ]
})

useEffect(() => {
  localStorage.setItem('usuarios', JSON.stringify(usuarios))
}, [usuarios])

const agregarUsuario = (nuevoCorreo) => {
  const nuevo = { correo: nuevoCorreo, estado: 'activo' }
  setUsuarios([...usuarios, nuevo])
}

const editarUsuario = (correoAnterior, nuevoCorreo) => {
  const actualizados = usuarios.map((u) =>
    u.correo === correoAnterior ? { ...u, correo: nuevoCorreo } : u
  )
  setUsuarios(actualizados)
}

const eliminarUsuario = (correo) => {
  const filtrados = usuarios.filter((u) => u.correo !== correo)
  setUsuarios(filtrados)
}

const cambiarEstadoUsuario = (correo) => {
  const actualizados = usuarios.map((u) =>
    u.correo === correo
      ? { ...u, estado: u.estado === 'activo' ? 'bloqueado' : 'activo' }
      : u
  )
  setUsuarios(actualizados)
}

// ------------------ REPORTES ------------------
const [reportes, setReportes] = useState(() => {
  const almacenados = localStorage.getItem('reportes')
  return almacenados
    ? JSON.parse(almacenados)
    : [
        {
          id: 1,
          titulo: 'Reporte de ventas junio',
          fecha: '2025-06-30',
          tipo: 'Ventas',
        }
      ]
})

useEffect(() => {
  localStorage.setItem('reportes', JSON.stringify(reportes))
}, [reportes])

const agregarReporte = (nuevoReporte) => {
  const id = Date.now()
  const reporteFormateado = {
    ...nuevoReporte,
    id,
    fecha: new Date().toISOString().split('T')[0]
  }
  setReportes([...reportes, reporteFormateado])
}

const eliminarReporte = (id) => {
  const actualizados = reportes.filter((r) => r.id !== id)
  setReportes(actualizados)
}


  return (
    <DataSimuladaContext.Provider
      value={{
        // Productos
        productos,
        agregarProducto,
        eliminarProducto,
        editarProducto,

        // Pedidos
        pedidos,
        agregarPedido,
        eliminarPedido,
        editarPedido,

        // Ventas
        ventas,
        agregarVenta,
        eliminarVenta,
        editarVenta,
        
      // Insumos
         insumos,
        agregarInsumo,
        editarInsumo,
        eliminarInsumo,

// Producción
ordenesProduccion,
agregarOrdenProduccion,
editarOrdenProduccion,
eliminarOrdenProduccion,

usuarios,
agregarUsuario,
editarUsuario,
eliminarUsuario,
cambiarEstadoUsuario,


// Reportes
reportes,
agregarReporte,
eliminarReporte,


      }}
    >
      {children}
    </DataSimuladaContext.Provider>
  )



}

export function useDatos() {
  return useContext(DataSimuladaContext)
}
