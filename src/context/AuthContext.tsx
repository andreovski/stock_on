import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react"

import {
  getRefreshToken,
  removeRefreshToken,
  validateRefreshToke,
} from "../providers/auth"

import { supabase } from "../services/supabaseClient"

interface ISignInData {
  displayName: string
  email: string
  idToken: string
  localId: string
  registered: boolean
  refreshToken?: string
}

interface IAuthContext {
  children: ReactNode
}

interface IUser {
  id: string
  name: string
  email: string
  avatar?: string
  acess_token?: string
  refresh_token?: string
}

interface IAccountAcessData {
  email: string
  password: string
}

interface IAuthContextData {
  user: object
  isAuthenticated: boolean
  signInWithCredetials: (data) => void
  signOut: () => void
}

const AuthContext = createContext({} as IAuthContextData)

export function AuthProvider({ children }: IAuthContext) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>()

  useLayoutEffect(() => {
    const refreshToken = getRefreshToken()

    if (refreshToken) {
      validateRefreshToke({ refreshToken })
        .then(({ data }) => {
          const userData = {
            acess: {
              id: data.id,
              name: data.name,
              email: data.email,
              access_token: data.access_token,
              refresh_token: data.refresh_token,
            },
          }

          setUser(userData)
        })
        .finally(() => setIsAuthenticated(true))
        .catch((err) => {
          console.log(err)
          setIsAuthenticated(false)
        })
    }
  }, [])

  const signInWithCredetials = useCallback(({ user, ...props }) => {
    const userData = {
      id: user.id,
      email: user.email,
      access_token: props.access_token,
      refresh_token: props.refresh_token,
    }

    setUser(userData)
    setIsAuthenticated(true)

    localStorage.setItem("@stock.on/auth", JSON.stringify(userData))
    localStorage.setItem("@stock.on/refreshToken", props.refresh_token)
  }, [])

  const signOut = useCallback(() => {
    removeRefreshToken()
    setIsAuthenticated(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signInWithCredetials,
        isAuthenticated,
        user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
