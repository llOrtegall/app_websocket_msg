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

    if (cookie.includes('chat_app_token')) {
      axios.get('/profile') 
        .then(res => {
          if(res.status === 200){
            setUser(res.data)
            setIsAuthenticated(true)
          }
        })
        .catch(err => {
          if (err.response.status === 401 && err.response.data.message === 'jwt expired') {
            document.cookie = 'chat_app_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          }
        })
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