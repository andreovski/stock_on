import { Suspense, useMemo } from "react"
import { useAuth } from "./context/AuthContext"
import AppRoutes from "./routes/AppRoutes"
import AuthRoutes from "./routes/AuthRoutes"
import { useReactQueryConfig } from "./services/reactQueryConfig"

import { SpinnerFull } from "./components/SpinnerFull"

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
    return <SpinnerFull size="lg" />
  }

  return (
    <Suspense fallback={<SpinnerFull size="lg" />}>
      <Component />
    </Suspense>
  )
}

export default App
