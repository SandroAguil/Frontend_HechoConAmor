export default function VistaGaleria({ productos }) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
        >
          <img
            src={producto.imageUrl}
            alt={producto.name}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = 'https://via.placeholder.com/300x200?text=Sin+Imagen'
            }}
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">{producto.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {producto.description}
            </p>
            <p className="mt-2 text-green-700 font-semibold">
              S/ {producto.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
