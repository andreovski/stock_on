import { useToast } from "@chakra-ui/react"
import { useQueryClient } from "react-query"

export const useReactQueryConfig = () => {
  const snackbar = useToast()

  const queryClient = useQueryClient()

  queryClient.setDefaultOptions({
    mutations: {
      onError: (err: any) => {
        snackbar({
          title: "Error",
          description: err?.message || "Try again",
          status: "error",
        })
      },
      useErrorBoundary: undefined,
    },
    queries: {
      suspense: true,
      refetchInterval: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      useErrorBoundary: undefined,
      onError: (err: any) => {
        snackbar({
          title: "Error",
          description: err?.message || "Try again",
          status: "error",
        })
      },
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 0,
      cacheTime: 5 * 60 * 1000, // 5 min
    },
  })
}
