import { MutateOptions, useMutation } from "react-query"
import { supabase } from "../supabaseClient"
import { IId } from "./interface"
import { IProfilePostActivePayload, IProfiles } from "./interface/iProfiles"
import { validateRange } from "./utils"

export const queryProfilesGetProfiles = async ({ pageParam = 0 }) => {
  const [min, max] = validateRange(pageParam)

  const { data, count, error } = await supabase
    .from<IProfiles>("profiles")
    .select("*", { count: "exact" })
    .range(min, max)
    .order("name")

  if (error) throw error

  return { data, count }
}

export const useMutationProfilesActiveProfile = (config?: MutateOptions) =>
  useMutation(
    `profilesActiveProfile`,
    async (payload: IProfilePostActivePayload) => {
      const { data, error } = await supabase
        .from("profiles")
        .update({ verified: payload.verified })
        .eq("id", payload.id)
        .single()

      if (error) throw error
      return data
    },
    // @ts-ignore
    { ...config }
  )

//How to delete user auth using supabase in js?

export const useMutationProfilesDeleteProfile = (config?: MutateOptions) =>
  useMutation(
    `profilesDeleteProfile`,
    async (payload: IId) => {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", payload.id)

      if (error) throw error
    },
    // @ts-ignore
    { ...config }
  )
