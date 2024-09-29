import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '../types/User'
import axios from 'axios'

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

    if (cookie.includes('token')) {
      axios.get('/profile') 
        .then(res => console.log(res))
        .catch(err => console.log(err))
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