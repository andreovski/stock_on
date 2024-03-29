import {
  MutateOptions,
  useMutation,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query"
import { supabase } from "../supabaseClient"
import { IId } from "./interface"
import { IFerramentasSolicitadas } from "./interface/iFerramentas"
import { validateRange } from "./utils"

export const queryFerramentasSolicitadasGetItems = async ({
  pageParam = 0,
}) => {
  const [min, max] = validateRange(pageParam)

  const { data, count, error } = await supabase
    .from<IFerramentasSolicitadas>("ferramentas_solicitadas")
    .select("*, worker(*)", { count: "exact" })
    .range(min, max)

  if (error) throw error

  return { data, count }
}

export const useQueryFerramentasSolicitadasGetItems = (
  config?: UseQueryOptions,
  selectColumns?: string
) =>
  useQuery(
    `FerramentasSolicitadasGetItems`,
    async () => {
      const { data, error } = await supabase
        .from<IFerramentasSolicitadas>("ferramentas_solicitadas")
        .select(selectColumns || "*")

      if (error) throw error
      return data
    },
    { ...config }
  ) as UseQueryResult<IFerramentasSolicitadas[]>

export const useQueryFerramentasSolicitadasGetItemById = (
  { id }: IId,
  config?: UseQueryOptions
) =>
  useQuery(
    `FerramentasSolicitadasGetItemById/${id}`,
    async () => {
      const { data, error } = await supabase
        .from<IFerramentasSolicitadas>("ferramentas_solicitadas")
        .select("*, worker(*)")
        .eq("id", id)
        .single()

      if (error) throw error
      return data
    },
    { ...config }
  ) as UseQueryResult<IFerramentasSolicitadas>

export const useMutationFerramentasSolicitadasInsertItem = (
  config?: MutateOptions
) =>
  useMutation(
    `FerramentasSolicitadasInsertItem`,
    async (payload?: Omit<IFerramentasSolicitadas, "id">) => {
      const { data, error } = await supabase
        .from("ferramentas_solicitadas")
        .insert(payload)
        .single()

      if (error) throw error
      return data
    },
    // @ts-ignore
    { ...config }
  )

export const useMutationFerramentasSolicitadasEditItem = (
  config?: MutateOptions
) =>
  useMutation(
    `FerramentasSolicitadasEditItem`,
    async (payload?: IFerramentasSolicitadas) => {
      const { data, error } = await supabase
        .from("ferramentas_solicitadas")
        .update(payload)
        .match({ id: payload.id })

      if (error) throw error
      return data
    },
    // @ts-ignore
    { ...config }
  )

export const useMutationFerramentasSolicitadasDeleteItem = (
  config?: MutateOptions
) =>
  useMutation(
    `FerramentasSolicitadasDeleteItem`,
    async (payload: IId) => {
      const { data, error } = await supabase
        .from("ferramentas_solicitadas")
        .delete()
        .match({ id: payload.id })

      if (error) throw error
      return data
    },
    // @ts-ignore
    { ...config }
  )
