import { useToast } from "@chakra-ui/react"
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { useNavigate } from "react-router-dom"

import { validateUser, signOut } from "../providers/auth"
import { useQueryUserGetUserById } from "../services/api"
import { IProfiles } from "../services/api/interface/iProfiles"
import { supabase } from "../services/supabaseClient"

interface IAuthContext {
  children: ReactNode
}

interface IAuthContextData {
  eu: IProfiles
  setUser: any
  isAuthenticated: boolean
  signInWithCredetials: (data) => void
  handleSignOut: () => void
  isLogging: boolean
}

const AuthContext = createContext({} as IAuthContextData)

export function AuthProvider({ children }: IAuthContext) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLogging, setIsLogging] = useState(true)
  const [user, setUser] = useState<any>()

  const navigate = useNavigate()
  const toast = useToast()

  const { data: eu } = useQueryUserGetUserById(
    { id: user?.id },
    {
      enabled: !!user,
      useErrorBoundary: false,
      onError: (err: any) => {
        if (err.code === "PGRST116") {
          navigate("/finishRegister", { state: user })
        }
      },
    }
  )

  useEffect(() => {
    setIsLogging(true)
    validateUser()
      .then((data) => [setUser(data), setIsAuthenticated(true)])
      .finally(() => setIsLogging(false))
  }, [])

  const validateIfUserIsVerified = async (id: number): Promise<boolean> => {
    const { data } = await supabase
      .from("profiles")
      .select("verified")
      .eq("id", id)
      .single()

    return data?.verified
  }

  const handleSignOut = useCallback(async () => {
    await signOut()
    setIsAuthenticated(false)
  }, [])

  const signInWithCredetials = useCallback(
    async (data) => {
      const isVerified = await validateIfUserIsVerified(data.id)

      if (isVerified) {
        setIsAuthenticated(true)
        setUser(data)

        navigate("/dashboard")
      } else {
        handleSignOut()

        toast({
          status: "error",
          title: "Usuário não validado pelo administrador do sistema",
          duration: 8000,
          isClosable: true,
          description:
            "Entre em contato com seu administrador para a ativação do cadastro atual.",
        })
      }
    },
    [handleSignOut, navigate, toast]
  )

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
