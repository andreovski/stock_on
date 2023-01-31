//* Range to use with infiniteQuery
export const validateRange = (pageParam = 0) => {
  const min = !pageParam ? 0 : pageParam * (10 + 1)
  const max = !pageParam ? 10 : pageParam * 10

  return [min, max]
}
