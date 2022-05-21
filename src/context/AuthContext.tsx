import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import { validateUser, signOut } from "../providers/auth"
import { useQueryAccountGetProfileById } from "../services/api"
import { supabase } from "../services/supabaseClient"

interface IAuthContext {
  children: ReactNode
}

interface IAuthContextData {
  user: object
  isAuthenticated: boolean
  signInWithCredetials: () => void
  handleSignOut: () => void
}

const AuthContext = createContext({} as IAuthContextData)

export function AuthProvider({ children }: IAuthContext) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>()

  useEffect(() => {
    const isLogged = validateUser()

    if (isLogged) {
      setIsAuthenticated(true)
      setUser(isLogged)
    }
  }, [])

  const { data } = useQueryAccountGetProfileById(
    { id: `eq.${user?.id}` },
    { enabled: !!user }
  )

  console.log(data)

  const signInWithCredetials = useCallback(() => {
    setIsAuthenticated(true)
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
        user,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
