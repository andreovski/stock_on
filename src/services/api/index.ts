import axios from "axios"

import { AxiosInstance, AxiosRequestConfig } from "axios"
import {
  MutateOptions,
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query"
import { signIn } from "../../providers/auth"

interface IMutateFunction {
  api: AxiosInstance
  method?: string
  url: string
  queryParams?: object
  apiConfig?: AxiosRequestConfig
  body?: [{}]
}

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_SUPABASE_URL}/rest/v1`,
  headers: {
    apiKey: process.env.REACT_APP_SUPABASE_ANON_KEY,
  },
})

export const auth = axios.create({
  baseURL: `${process.env.REACT_APP_SUPABASE_URL}/auth/v1`,
  headers: {
    apiKey: process.env.REACT_APP_SUPABASE_ANON_KEY,
  },
})

const requestFn = async (options, url, pathParams, queryParams) => {
  const urlPathParams = url.match(/{([^}]+)}/g)

  if (urlPathParams) {
    url = urlPathParams.reduce(
      (acc, param) => acc.replace(param, pathParams[param.replace(/{|}/g, "")]),
      url
    )
  } else {
    queryParams = pathParams
  }

  if (url.charAt(0) === "/") {
    url = url.replace("/", "")
  }

  try {
    const { data } = await api(url, {
      params: {
        select: "*",
        ...queryParams,
      },
      ...options,
    })

    return data
  } catch (error) {
    throw error.response.data
  }
}

const queryFn =
  (options = {}) =>
  (url, pathParams = {}, queryParams = {}) =>
    requestFn(options, url, pathParams, queryParams)

const mutateFn = async ({
  api,
  method = "POST",
  url,
  queryParams,
  apiConfig = {},
  body,
}: IMutateFunction) => {
  apiConfig = { ...apiConfig, method }

  if (Array.isArray(body)) {
    queryParams = { ...queryParams, ...(body[0] || {}) }
    body = undefined
  }

  try {
    const { data } = await api(url, {
      params: queryParams,
      data: body,
      ...apiConfig,
    })

    return data
  } catch (error) {
    throw error.response.data
  }
}

export const useQueryAccountUsers = (
  pathParams?,
  queryParams?,
  config?,
  options?
): UseQueryResult<any> =>
  useQuery(
    `/users/${queryParams}`,
    () => queryFn(options)("users", pathParams, queryParams),
    { ...config }
  )

export const useMutationSignInWithCredentials = (
  config?: MutateOptions<any, any>
): UseMutationResult =>
  useMutation("SignIn", (body: any) => signIn(body), { ...config })

export const useMutationSignUpWithCredentials = (
  queryParams,
  config?: MutateOptions<void, void>
): UseMutationResult =>
  useMutation(
    (body?: any) =>
      mutateFn({
        api: auth,
        url: "signup",
        queryParams: { ...queryParams },
        body,
      }),
    { ...config }
  )

export const useQueryAccountGetProfileById = (
  queryParams?,
  config?,
  options?
): UseQueryResult<any> =>
  useQuery(`/profile`, () => queryFn(options)(`/profiles`, queryParams), {
    ...config,
  })

// export const useMutationSignUp = (
//   queryParams,
//   config?: MutateOptions<void, void>
// ): UseMutationResult =>
//   useMutation(
//     (body?: any) =>
//       mutateFn({
//         api: accounts,
//         url: "accounts:signUp",
//         queryParams,
//         body,
//       }),
//     { ...config }
//   )

// export const useMutationAccountControllerValidateRefreshToken = (
//   queryParams,
//   config?: MutateOptions<void, void>
// ): UseMutationResult =>
//   useMutation(
//     (body?: any) =>
//       mutateFn({
//         api: secureToken,
//         url: "token",
//         queryParams,
//         body,
//       }),
//     { ...config }
//   )
