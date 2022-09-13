import {
  MutateOptions,
  UseBaseQueryOptions,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query"
import { signIn } from "../../providers/auth"
import { supabase } from "../supabaseClient"
import { IUserById } from "./interface"
import { IStock } from "./interface/stock"

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
): UseQueryResult =>
  useQuery(
    `user/${id}`,
    async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single()
      if (error) throw error
      return data
    },
    { ...config }
  )

export const useQueryStockGetItems = (config?: UseQueryOptions) =>
  useQuery(
    `stockGetItems`,
    async () => {
      const { data, error } = await supabase.from<IStock>("stock").select("*")

      if (error) throw error
      return data
    },
    { ...config }
  ) as UseQueryResult<IStock[]>

export const useQueryStockInsertItem = (config?: MutateOptions) =>
  useMutation(
    `stockInsertItem`,
    async (payload?: any) => {
      const { data, error } = await supabase
        .from("stock")
        .insert(payload)
        .single()

      if (error) throw error
      return data
    },
    { ...config }
  )
