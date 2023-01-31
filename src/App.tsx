import { Suspense, useMemo } from "react"
import { useAuth } from "./context/AuthContext"
import { useReactQueryConfig } from "./services/reactQueryConfig"

import { SpinnerFull } from "./components/SpinnerFull"
import { Box } from "@chakra-ui/react"

import AppRoutes from "./routes/AppRoutes"
import AuthRoutes from "./routes/AuthRoutes"

function App() {
  const { isAuthenticated, isLogging } = useAuth()

  useReactQueryConfig()

  const Component = useMemo(() => {
    if (isLogging) return null

    if (isAuthenticated) {
      return AppRoutes
    }

    return AuthRoutes
  }, [isAuthenticated, isLogging])

  if (isLogging) {
    return (
      <Box w="100vw" h="100vh">
        <SpinnerFull size="lg" />
      </Box>
    )
  }

  return (
    <Suspense fallback={<SpinnerFull size="lg" />}>
      <Component />
    </Suspense>
  )
}

export default App
