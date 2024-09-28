import { createContext, useContext, useEffect, useState } from 'react'
import { APP_NAME } from '../utils/constanst'
import { User } from '../types/User'

interface IAuthContext {
  isAuthenticated: boolean
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}


const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const cookie = document.cookie

    if (!cookie && cookie.split('=')[0] !== APP_NAME) {
      setIsAuthenticated(false)
      setUser(null)
      return
    }
  }, [isAuthenticated])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}