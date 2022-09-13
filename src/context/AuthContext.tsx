import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import { validateUser, signOut } from "../providers/auth"
import { useQueryUserGetUserById } from "../services/api"

interface IAuthContext {
  children: ReactNode
}

interface IAuthContextData {
  eu: any
  setUser: any
  isAuthenticated: boolean
  signInWithCredetials: (data) => void
  handleSignOut: () => void
  isLogging: boolean
}

const AuthContext = createContext({} as IAuthContextData)

export function AuthProvider({ children }: IAuthContext) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLogging, setIsLogging] = useState(false)
  const [user, setUser] = useState<any>()

  const { data: eu } = useQueryUserGetUserById(
    { id: user?.id },
    {
      enabled: !!user,
    }
  )

  useEffect(() => {
    setIsLogging(true)
    validateUser()
      .then((data) => [setUser(data), setIsAuthenticated(true)])
      .finally(() => setIsLogging(false))
  }, [])

  const signInWithCredetials = useCallback((data) => {
    setIsAuthenticated(true)
    setUser(data)
  }, [])

  const handleSignOut = useCallback(async () => {
    await signOut()
    setIsAuthenticated(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signInWithCredetials,
        isAuthenticated,
        eu,
        setUser,
        handleSignOut,
        isLogging,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
