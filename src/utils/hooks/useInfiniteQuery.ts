import { useMemo } from "react"
import {
  useInfiniteQuery as useReactInfinityQuery,
  UseInfiniteQueryResult,
} from "react-query"

export type IUseInfinityHook<T = any> = Omit<UseInfiniteQueryResult, "data"> & {
  data: T
}

export const useInfiniteQuery = ({ queryKey, queryFn }): IUseInfinityHook => {
  const queryData = useReactInfinityQuery({
    queryKey: `${queryKey}-list`,
    queryFn: queryFn,
    getNextPageParam: (page: any, pages) => {
      return pages.length * 10 < page.count ? pages.length + 1 : undefined
    },
  })

  const items = useMemo(() => {
    return queryData.data?.pages.reduce((acc, page) => {
      return [...acc, ...page.data]
    }, [])
  }, [queryData.data])

  return { ...queryData, data: items }
}
