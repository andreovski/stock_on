import {
  MutateOptions,
  useMutation,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query"
import { supabase } from "../supabaseClient"
import { IId } from "./interface"
import { IWorkers } from "./interface/iWorkers"
import { validateRange } from "./utils"

export const queryWokersGetWorkers = async ({ pageParam = 0 }) => {
  const [min, max] = validateRange(pageParam)

  const { data, count, error } = await supabase
    .from<IWorkers>("workers")
    .select("*", { count: "exact" })
    .range(min, max)

  if (error) throw error

  return { data, count }
}

export const useQueryWorkersGetWorkers = (config?: UseQueryOptions) =>
  useQuery(
    `workersGetWorkers`,
    async () => {
      const { data, error } = await supabase
        .from<IWorkers>("workers")
        .select("*")

      if (error) throw error
      return data
    },
    { ...config }
  ) as UseQueryResult<IWorkers[]>

export const useQueryWorkersGetWorkerById = (
  { id }: IId,
  config?: UseQueryOptions
) =>
  useQuery(
    `workersGetWorkerById/${id}`,
    async () => {
      const { data, error } = await supabase
        .from<IWorkers>("workers")
        .select("*")
        .eq("id", id)
        .single()

      if (error) throw error
      return data
    },
    { ...config }
  ) as UseQueryResult<IWorkers>

export const useMutationWorkersInsertWorker = (config?: MutateOptions) =>
  useMutation(
    `workersInsertWorker`,
    async (payload?: Omit<IWorkers, "id">) => {
      const { data, error } = await supabase
        .from("workers")
        .insert(payload)
        .single()

      if (error) throw error
      return data
    },
    // @ts-ignore
    { ...config }
  )

export const useMutationWorkersEditWorker = (config?: MutateOptions) =>
  useMutation(
    `workersEditWorker`,
    async (payload?: IWorkers) => {
      const { data, error } = await supabase
        .from("workers")
        .update(payload)
        .match({ id: payload.id })

      if (error) throw error
      return data
    },
    // @ts-ignore
    { ...config }
  )

export const useMutationWorkersDeleteWorker = (config?: MutateOptions) =>
  useMutation(
    `WorkersDeleteWorker`,
    async (payload: IId) => {
      const { data, error } = await supabase
        .from("workers")
        .delete()
        .match({ id: payload.id })

      if (error) throw error
      return data
    },
    // @ts-ignore
    { ...config }
  )
