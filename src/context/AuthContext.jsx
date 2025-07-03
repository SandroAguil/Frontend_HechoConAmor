import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  const login = (rol, correo) => {
    // ✅ AÑADIMOS EL ID
    const id = rol === 'administrador' ? 'admin1' : 'vendedor1'
    setUsuario({ id, nombre: 'Usuario', rol, correo })
  }

  const logout = () => setUsuario(null)

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
