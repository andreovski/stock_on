import {
  MutateOptions,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query"
import { signIn } from "../../providers/auth"
import { supabase } from "../supabaseClient"
import { IId, IUserById } from "./interface"
import { IProfiles } from "./interface/iProfiles"
import { IStock, IStockGetItemById } from "./interface/iStock"
import { validateRange } from "./utils"

export const useMutationAuthSignInWithCredentials = (
  config?: MutateOptions<any, any>
): UseMutationResult =>
  useMutation("AuthSignInWithCredentials", (body: any) => signIn(body), {
    ...config,
  })

export const useMutationAuthSignInWithRefreshToken = (
  queryParams?: any,
  config?: UseQueryOptions
) =>
  useQuery(
    "AuthSignInWithRefreshToken",
    async () => {
      const { user, error } = await supabase.auth.signIn(queryParams)
      if (error) throw error
      return user
    },
    { ...config }
  )

export const useMutationAuthSignUpWithCredentials = (config?: MutateOptions) =>
  useMutation(
    "AuthSignUpWithCredentials",
    async (payload: any) => {
      const { user, error } = await supabase.auth.signUp(payload)
      if (error) throw error
      return user
    },
    { ...config }
  )

export const useMutationAuthFinishRegister = (config?: MutateOptions) =>
  useMutation(
    "authFinishRegister",
    async (payload: any) => {
      const { data, error } = await supabase.from("profiles").insert(payload)
      if (error) throw error
      return data
    },
    { ...config }
  )

export const useQueryUserGetUserById = (
  { id }: IUserById,
  config?: UseQueryOptions
) =>
  useQuery(
    `user/${id}`,
    async () => {
      const { data, error } = await supabase
        .from<IProfiles>("profiles")
        .select("*")
        .eq("id", id)
        .single()
      if (error) throw error
      return data
    },
    { ...config }
  ) as UseQueryResult<IProfiles>

export const queryStockGetItems = async ({ pageParam = 0 }) => {
  const [min, max] = validateRange(pageParam)

  const { data, count, error } = await supabase
    .from<IStock>("stock")
    .select("*", { count: "exact" })
    .range(min, max)

  if (error) throw error

  return { data, count }
}

export const useQueryStockGetItems = (config?: UseQueryOptions) =>
  useQuery(
    `StockGetItems`,
    async () => {
      const { data, error } = await supabase.from<IStock>("stock").select("*")

      if (error) throw error
      return data
    },
    { ...config }
  ) as UseQueryResult<IStock[]>

export const useQueryStockGetItemById = (
  { id }: IStockGetItemById,
  config?: UseQueryOptions
) =>
  useQuery(
    `StockGetItemsById/${id}`,
    async () => {
      const { data, error } = await supabase
        .from<IStock>("stock")
        .select("*")
        .eq("id", id)
        .single()

      if (error) throw error
      return data
    },
    { ...config }
  ) as UseQueryResult<IStock>

export const useMutationStockInsertItem = (config?: MutateOptions) =>
  useMutation(
    `StockInsertItem`,
    async (payload?: Omit<IStock, "id">) => {
      const { data, error } = await supabase
        .from("stock")
        .insert(payload)
        .single()

      if (error) throw error
      return data
    },
    // @ts-ignore
    { ...config }
  )

export const useMutationStockEditItem = (config?: MutateOptions) =>
  useMutation(
    `StockInsertItem`,
    async (payload?: IStock) => {
      const { data, error } = await supabase
        .from("stock")
        .update(payload)
        .match({ id: payload.id })

      if (error) throw error
      return data
    },
    // @ts-ignore
    { ...config }
  )

export const useMutationStockDeleteItem = (config?: MutateOptions) =>
  useMutation(
    `StockDeleteItem`,
    async (payload: IId) => {
      const { data, error } = await supabase
        .from("stock")
        .delete()
        .match({ id: payload.id })

      if (error) throw error
      return data
    },
    // @ts-ignore
    { ...config }
  )
