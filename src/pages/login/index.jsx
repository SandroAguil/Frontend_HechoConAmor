import { useState } from 'react'
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const adminEmail = 'hechoconamor@gmail.com'
const adminPassword = 'admin123'

const vendedoresAutorizados = [
  { correo: 'vendedor1@gmail.com', password: 'vendedor123' },
  { correo: 'vendedor2@gmail.com', password: 'vendedor123' }
]

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!correo || !password) {
      setError('Completa todos los campos.')
      return
    }

    if (correo === adminEmail && password === adminPassword) {
      login('administrador')
      navigate('/')
      return
    }

    const vendedorValido = vendedoresAutorizados.find(
      (v) => v.correo === correo && v.password === password
    )

    if (vendedorValido) {
      login('vendedor')
      navigate('/')
      return
    }

    setError('Correo o contraseña incorrectos.')
  }

  return (
    <div className="min-h-screen flex">
      {/* Imagen izquierda */}
      <div className="w-2/3 hidden lg:block">
        <img
          src="https://i.imgur.com/RgzCNkz.jpeg"
          alt="Fondo"
          className="w-full h-full object-cover rounded-r-3xl"
        />
      </div>

      {/* Login Form */}
      <div className="w-full lg:w-1/3 flex items-start justify-center bg-white px-8 pt-44 shadow-lg">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md space-y-6"
        >
          <div className="flex flex-col items-center -mt-6">
            <img
              src="https://i.imgur.com/VTQsnCI.png"
              alt="Logo"
              className="w-44 h-44 rounded-full mb-2"
            />
            <h1 className="text-2xl font-bold text-gray-800">Hecho con Amor</h1>
            <p className="text-sm text-gray-500">Bienvenido nuevamente</p>
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-gray-700 text-sm">Correo electrónico</label>
            <input
              type="email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pastelPink"
              placeholder="ejemplo@gmail.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-gray-700 text-sm">Contraseña</label>
            <input
              type="password"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pastelPink"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-pastelPink hover:bg-pastelBlue text-gray-800 font-semibold py-2 rounded-lg transition"
          >
            Iniciar sesión
          </button>

          <p className="text-xs text-center text-gray-500 mt-2">
            © {new Date().getFullYear()} Hecho con Amor
          </p>
        </motion.form>
      </div>
    </div>
  )
}
