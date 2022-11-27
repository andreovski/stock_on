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

export const useQueryFerramentasSolicitadasGetFerramentasSolicitadas = (
  config?: UseQueryOptions
) =>
  useQuery(
    `FerramentasSolicitadasGetFerramentasSolicitadas`,
    async () => {
      const { data, error } = await supabase
        .from<IFerramentasSolicitadas>("ferramentas_solicitadas")
        .select("*")

      if (error) throw error
      return data
    },
    { ...config }
  ) as UseQueryResult<IFerramentasSolicitadas[]>

export const useQueryFerramentasSolicitadasGetFerramentaSolicitadaById = (
  { id }: IId,
  config?: UseQueryOptions
) =>
  useQuery(
    `FerramentasSolicitadasGetFerramentaSolicitadaById/${id}`,
    async () => {
      const { data, error } = await supabase
        .from<IFerramentasSolicitadas>("ferramentas_solicitadas")
        .select("*")
        .eq("id", id)
        .single()

      if (error) throw error
      return data
    },
    { ...config }
  ) as UseQueryResult<IFerramentasSolicitadas>

export const useMutationFerramentasSolicitadasInsertFerramentaSolicitada = (
  config?: MutateOptions
) =>
  useMutation(
    `FerramentasSolicitadasInsertFerramentaSolicitada`,
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

export const useMutationFerramentasSolicitadasEditFerramentaSolicitada = (
  config?: MutateOptions
) =>
  useMutation(
    `FerramentasSolicitadasEditFerramentaSolicitada`,
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
