import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"

import { QueryClient, QueryClientProvider } from "react-query"

import { ReactQueryDevtools } from "react-query/devtools"

import { AuthProvider } from "../context/AuthContext"
const queryClient = new QueryClient()

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
